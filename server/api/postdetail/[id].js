import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const tweetId = event.context.params.id;

    // Check if the ID is a valid ObjectID format
    if (!tweetId || tweetId.length !== 24) {
        return {
            statusCode: 400,
            error: "Invalid tweet ID format."
        };
    }

    const prisma = new PrismaClient();

    let tweetdetail;
    try {
        tweetdetail = await prisma.tweet.findUnique({
            include: {
                author: true,
                media: true,
                replyTo: {
                    include:{
                        author:true
                    }
                },
                replies: {
                    include: {
                        author: true,
                        media: true,
                        replyTo: true,
                        replies:true
                    }
                }
            },
            where: {
                id: tweetId
            }
        });
    } catch (error) {
        // Handle any other errors that might occur
        console.error("Error fetching tweet details:", error);
        return {
            statusCode: 500,
            error: "An error occurred while fetching tweet details."
        };
    }

    if (!tweetdetail) {
        // If tweetdetail is null, the tweet does not exist
        return {
            statusCode: 404,
            error: "The tweet does not exist."
        };
    }

    // If everything is okay, return the tweet details
    return {
        statusCode: 200,
        all_tweets: tweetdetail
    };
});
