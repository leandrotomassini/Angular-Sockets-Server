import { Router, Request, Response } from 'express';

import Server from '../classes/server';

import { usuariosConectados } from '../sockets/socket';


const router = Router();


router.get('/mensajes', (req: Request, resp: Response) => {
    resp.status(200).json({
        ok: true,
        mensaje: 'Todo está bien !!!'
    });
});

router.post('/mensajes', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    // Tiene la propiedad de socket.io para mandar mensajes
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    resp.status(200).json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    // Tiene la propiedad de socket.io para mandar mensajes
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload);

    resp.status(200).json({
        ok: true,
        cuerpo,
        de,
        id
    });
});


router.get('/usuarios', (req: Request, resp: Response) => {

    const server = Server.instance;

    server.io.allSockets().then((clientes) => {
        resp.json({
            ok: true,
            clientes: Array.from(clientes)
        })
    }).catch((error) => {
        resp.json({
            ok: false,
            error
        })
    });

});

router.get('/usuarios/detalle', (req: Request, resp: Response) => {

    resp.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

});

export default router;