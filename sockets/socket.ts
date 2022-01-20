import { Socket } from "socket.io";

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', ()=>{
        console.log(`Cliente desconectado ${cliente.id}`);
        
    });

}