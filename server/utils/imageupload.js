import {v2 as _cloudinary } from 'cloudinary';


export const ImageUploade = async (image) => {
    return await new Promise((resolve,reject) => {
        const config = useRuntimeConfig();

        _cloudinary.config({
            cloud_name:config.cloud_name,
            api_key:config.cloud_apikey,
            api_secret:config.cloud_secret
        });


        _cloudinary.uploader.upload(image,(error,data) => {
            if(error){
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}