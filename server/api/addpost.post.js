import { PrismaClient } from "@prisma/client";

import formadible from 'formidable';

export default defineEventHandler(async (event) => {


    const prisma = new PrismaClient();

    const form = formadible({});

    const response = await new Promise((resolve,reject) => {
        form.parse(event.req,(err,fields,files) => {
            if(err){
                reject(err)
            } else {
                resolve({fields,files})
            }

        })
    });

    const {fields,files} = response;

    // Create Tweet 
console.log("Fields Fields : ",fields);
    const post_tweet = fields.replyTo != undefined ? {
        authorId: fields.userId[0],
        text :fields.text[0],
        replytoId:fields.replyTo[0],
    } : {
        authorId: fields.userId[0],
        text :fields.text[0],
    }

    console.log("Test Post Tweet : ",post_tweet);

    const addTweet = await prisma.tweet.create({
        data:post_tweet
    });

    
    const file_promises = Object.keys(files).map(async key => {

        const file = files[key];
        
       const cloudinaryImageUpload = await ImageUploade(file[0].filepath);


       console.log("Upload Image : ",cloudinaryImageUpload);

       const psot_media = {
        url:cloudinaryImageUpload.secure_url,
        providerId:cloudinaryImageUpload.public_id,
        userId:addTweet.authorId,
        tweetId:addTweet.id
    }

        return  prisma.mediafiles.create({
            data :psot_media
        })
    });

    const mediaFiless = await Promise.all(file_promises);

    return {
        statusCode :200 ,
        message:'Post successfully Added',
        data :addTweet,
    }
 

 
});
