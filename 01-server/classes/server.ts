import express from 'express';

// Sockets
import socketIO from 'socket.io';
import http from 'http';

import { SERVER_PORT } from '../global/enviroment';


export default class Server {

    // Sockets
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    // Sockets 
    public io: socketIO.Server;
    private httpServer: http.Server;

    // Poner privado el constructor
    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        // Sockets
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer,
            { cors: { origin: true, credentials: true } }
        );
    }

    // Sockets patron singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: any) {

        // Sockets
        this.httpServer.listen(this.port, callback);
    }

    // Sockets
    private escucharSockets() {
        console.log(`Esuchando conexiones - Sockets.`);

        this.io.on('connection', cliente => {
            console.log('Cliente conectado.');
        });
    }

}