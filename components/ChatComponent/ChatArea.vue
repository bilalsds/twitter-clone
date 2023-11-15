<template>
  <div class="w-full h-full flex flex-col gap-5">


    <div v-if="user_chats == null" class="h-full ">
      <div class="flex justify-center  items-center h-full">
        
        <div class="px-40 py-40 rounded-lg shadow-md bg-white flex flex-col justify-center gap-5">

          <h1 class="text-3xl font-bold text-blue-500">Welcome to twitter chat !!</h1>

        </div>


      </div>

    </div>


    <div v-if="user_chats != null">
    


    <div class="flex justify-between gap-5 pb-5 bg-white py-5 rounded-xl px-5 mb-5">
      <div class="ChatProfile flex gap-5">
        <div class="w-20">
          <img
            class="cursor-pointer "
            :src="user_chats.profileImage"
            @error="onImageError"
            @click="navigateTo(`/profile/${user_chats.id}`)"
          />
        </div>
        <div class="flex flex-col w-full">
          <span class="text-sm font-semibold"> {{ user_chats.name }} </span>
          <span class="text-sm text-gray-300"> Today </span>
        </div>
      </div>
      <div class="flex gap-5">
        <DeleteIcon class="w-6 h-6 cursor-pointer" />
      </div>
    </div>

    <div
      class="bg-white relative rounded-2xl h-full flex flex-col gap-5 py-5 px-5"
    >
   <div :ref="chat_containerRef" id="chatContainerUniqueIdForScrollable" class="flex gap-5 messagesContainer flex-col">

    <div v-if="all_user_messages != null && !messages_loader && all_user_messages.user_data.length == 0" class="flex justify-center items-center h-full">
      <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVJu9km693TD3IqTJrT_ZqOL5H6MJ_uiLvg&usqp=CAU" alt="">
    </div>


    <div  v-if="all_user_messages != null && !messages_loader" v-for="message in all_user_messages.user_data" class="flex gap-5  flex-col">


      <div 
  :class="message.sender == user_data.user_login.id ? 'message self-end flex gap-5 bg-gray-100 w-fit px-5 rounded-xl py-5' : 'message flex self-start gap-5 bg-blue-100 w-fit px-5 rounded-xl py-5'"
>

        <div class="flex flex-col">
          <span class="text-sm mb-2 font-semibold"> {{ message.sender == user_data.user_login.id ? user_data.user_login.name : user_chats.name }} </span>
          <span class="text-sm"> {{ message.text }} </span>
          <span class="text-sm text-gray-400 self-end mt-3"> {{ chattimeformate(message.createdAt) }} </span>
        </div>
      </div>

    </div>

    <div v-if="messages_loader" class="flex justify-center items-center h-full">
      <div>
       <img class="w-40 h-40" src="https://assets-v2.lottiefiles.com/a/3306dd18-1152-11ee-bf1b-03d1df356cb9/eepB2zWuvW.gif" alt="">
      </div>
    </div>

   </div>

      <div class="absolute bottom-5 w-full">
        <div class="SendMessage items-end">
          <form @submit="sendMessageHandler">
            <input
            type="text"
            placeholder="type message... "
            class="border border-gray-300 w-full py-2 px-5 rounded-3xl outline-none"
            v-model="message_text"
          />
          <span class="">
            <SendIcon class="w-6 h-6 cursor-pointer" @click="sendMessageHandler" />
          </span>


          </form>
         
        </div>
      </div>
    </div>


  </div>

  </div>
</template>

<script setup lang="ts">

const tweetStore = useTweetStore();
const authStore = useAuthStore();
const {user_chats,all_user_messages,messages_loader,chat_containerRef} = storeToRefs(tweetStore) as any;
const {user_data} = storeToRefs(authStore);
// const {$io} = useNuxtApp() as any;;
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/'); // Replace with your server URL


const message_text = useState("message_text",() => "") as any;


console.log("Test User_Chats : ",toRaw(user_chats.value));

const onImageError =(event:any) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&usqp=CAU';
  }

  onBeforeMount(() => {
    // tweetStore.getAllMessages({
    //   reciever:user_chats.id,
      
    // })
  })
  onMounted(() => {

  
  })

const sendMessageHandler = async (e:any) => {
  e.preventDefault();

  if(toRaw(message_text.value).trim().length == 0){

  } else {
  console.log("Test Message : ",toRaw(message_text.value));
    await tweetStore.sendMessage(message_text);
    
  }
  

}

watch(all_user_messages,() => {
  const chatContainer = document.getElementsByClassName('messagesContainer') as any;
  // if (chatContainer.length > 0) {
    // const chatContainers = chatContainer[0]; // Get the first element
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
  // }
});
watchEffect(() => {
  socket.on('new-message', (newMessage) => {
  console.log("Test Socket Add New Message : ",newMessage);
});
})

</script>

<style scoped>
.ChatProfile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.SendMessage {
  position: relative;
  width: calc(100% - 40px);
}
.SendMessage span {
  position: absolute;
  right: 15px;
  top: 10px;
}
.messagesContainer {
    overflow-y:scroll;
    height:500px;
}
.messagesContainer::-webkit-scrollbar {
    display: none;
}
</style>
