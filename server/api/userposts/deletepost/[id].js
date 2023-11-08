import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {

const prisma = new PrismaClient();

const deletePost = await prisma.tweet.delete({
    include:{
        author:true,
        media:true,
    },
    where:{
        id:event.context.params.id
    }
});

return {
    statusCode:200,
    all_tweets:deletePost
}

});
