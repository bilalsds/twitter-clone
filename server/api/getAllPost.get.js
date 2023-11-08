import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async () => {

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
    }
});

return {
    statusCode:200,
    all_tweets:get_all.reverse()
}


});
