import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

export default class Server{

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin:true,
                credentials: true
            }
        });

        this.escucharSockets();
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log(`Cliente conectado ${cliente.id}`);
            
        });
    
    }

    start(callback:any){
        this.httpServer.listen(this.port, callback);
    }

}

