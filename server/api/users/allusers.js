import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {


const prisma = new PrismaClient();

const all_users = await prisma.user.findMany({
    include:{
        mediafiles:true,
    }
});

return {
    statusCode:200,
    user_data:all_users
}

});
