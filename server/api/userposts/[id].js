import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {


const prisma = new PrismaClient();

const get_all = await prisma.tweet.findMany({
    include:{
        author:true,
        media:true,
        replies:true,
        replyTo:{
            include:{
                author:true
            }
        }
    },
    where:{
        authorId:event.context.params.id
    }
});

return {
    statusCode:200,
    all_tweets:get_all.reverse()
}

});
