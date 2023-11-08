import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {

const prisma = new PrismaClient();

const get_all = await prisma.tweet.findMany({
    include:{
        author:true,
        media:true,
        
    },
});
const filter_search = get_all.filter((item) => {
    return item.text.toLocaleLowerCase().trim().includes(decodeURIComponent(event.context.params.autocomplete.toLocaleLowerCase()));
}).map((item) => {
    return {
        id:item.id,
        text:item.text,
        image:item.author.profileImage
    }
});


return {
    statusCode:200,
    search_result:filter_search.reverse()
}

});
