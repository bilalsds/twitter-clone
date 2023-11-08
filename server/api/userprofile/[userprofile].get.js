import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {


const prisma = new PrismaClient();

const get_user = await prisma.user.findUnique({
    include:{
       tweet:{
        include:{
            replies:true,
            media:true,
            author:true,
            replyTo:{
                include:{
                    author:true
                }
            }
        }
       },
       
    },
    where:{
        id:event.context.params.userprofile
    }
});

console.log("Test Get User : ",get_user);


return {
    statusCode:200,
    user_data:get_user
}

});
