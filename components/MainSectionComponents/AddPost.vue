<template>
    <div class="flex flex-col gap-10 px-5">
    <div class="image_input flex  gap-5 ">
        <div v-if="user_data != null">
            <img @click="navigateTo('/profile')" class="w-10 h-10 rounded-full cursor-pointer" :src="user_data.user_login.profileImage" />
        </div>
        <div class="self-center basis-9/12 ">
            <textarea v-model="text_field" class="border-none outline-none w-full" type="text" placeholder="What's happening" />
        </div>
    </div>
    <div v-if="imageURL.length != 0">
        <img class="w-full rounded-lg" :src="imageURL" />
    </div>
    <div class="media_buttons md:pl-5 flex justify-between">
        <div class="d-none " style="display: none;">
            <input type="file" ref="imageInput" @change="fileUploade" hidden>
        </div>
        <div class="icons flex self-center gap-5">
            <span >
               <ImageFrameIcon class="cursor-pointer" @click="openFiles" /> 
            </span>
            <span>
               <GifIcon class="cursor-pointer" /> 
            </span>
            <span>
               <EmojiIcon class="cursor-pointer" /> 
            </span>
            <span>
               <ChartIcon class="cursor-pointer" /> 
            </span>
            <span>
               <CalenderIcon class="cursor-pointer" /> 
            </span>
           
          
        </div>
        <div class="button self-center">

            <button v-if="!post_loader" :disabled="text_field.trim().length == 0" class="bg-blue-400 disabled:bg-blue-200 add_tweet_button text-sm font-semibold py-1 px-5 text-white rounded-full" @click="addTweetPost">Twitter</button>



            <button v-if="post_loader" class="bg-blue-400 text-sm font-semibold py-1 px-10 text-white rounded-full">
                <LoaderIcon class="w-6 h-6" />
            
            </button>

        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const tweetStore = useTweetStore();

const {user_data} = storeToRefs(authStore)
const imageInput = ref();
const imageuploader = useState(() => null) as any;
const imageURL = ref('') as any;
const post_loader = useState(() => false ) as any;
const text_field  = useState(() => '') as any;

const addTweetPost = async () => {
    post_loader.value = true;
if(text_field.value.trim().length == 0){
    alert("Please Add Something !!")
    return
}
const formData = new FormData();
formData.append('text', text_field.value);
formData.append('userId', toRaw(user_data.value).user_login.id);
formData.append('image', imageuploader.value);
  const {posted} = await tweetStore.addTweet(formData) as any;
  if(posted == true){
    text_field.value = '';
    imageURL.value = '';
    imageuploader.value = '';
    post_loader.value = false
  } else {
    post_loader.value = false

  }






}


const openFiles = () => {
    imageInput.value.click();
}

const fileUploade = (event:any) => {
    console.log("EVent ",event);
    const file = event.target.files[0];
    imageuploader.value = event.target.files[0]
    if (file) {
        const reader = new FileReader();

        reader.onload = (e:any) => {
            imageURL.value = e.target.result as string;
        };

        reader.readAsDataURL(file);
    }
    
}

</script>

<style scoped>

</style>