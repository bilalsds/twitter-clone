import { PrismaClient } from "@prisma/client";
import { Server as SocketIOServer } from 'socket.io';

export default defineEventHandler(async (event) => {
    const io = new SocketIOServer({
        cors:{
            origin:'http://localhost:3000/',
            credentials:true,
            methods:['GET','POST']
        }
      });
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
      
        // You can define other events as needed
      });

  const { from, to, message } = await readBody(event);

  const prisma = new PrismaClient();

  const sendMessage = await prisma.message.create({
    data: {
      text: message,
      sender: from,
      reciever: to,
      usersid: from + to,
    },
  });


  io.emit('new-message', sendMessage);

  return {
    statusCode: 200,
    user_data: sendMessage,
  };
});
