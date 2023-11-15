import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { sender, reciever } = await getQuery(event);

  const prisma = new PrismaClient();

  const allmessages = await prisma.message.findMany({
    where: {
      usersid: (sender + reciever).toString(),
    },
  });
  const all_messages = await prisma.message.findMany({
    where: {
      usersid: (reciever + sender).toString(),
    },
  });
  const allMessages = allmessages.concat(all_messages);

  allMessages.sort((a, b) => a.createdAt - b.createdAt);

  return {
    statusCode: 200,
    user_data: allMessages,
  };
});
