<template>
  <div class="w-full">
    <div class="flex justify-between gap-5 pb-5 bg-white py-5 rounded-xl px-5">
      <!-- <UserIcon class="w-6 h-6 cursor-pointer" /> -->
      <img class="rounded-full h-7 w-7 cursor-pointer" @click="navigateTo('/profile')" :src="user_data.user_login.profileImage" alt="" srcset="">
      <div class="flex gap-5">
        <AddIcon class="w-6 h-6 cursor-pointer" />
        <ModeIcon class="w-6 h-6 cursor-pointer" />
      </div>
    </div>
    <div class="my-3">
      <input
        type="text"
        placeholder="Search"
        class="border border-white outline-none px-5 py-2 w-full flex rounded-3xl"
      />
    </div>

    <div class="my-3 bg-white side_chat rounded-3xl py-5 px-5 flex flex-col gap-5">

      <div v-if="all_users != null">
        <div v-for="user in all_users.user_data" :key="user.id">

          <div v-if="user_data.user_login.id != user.id" class="ChatProfile flex gap-5 mb-5 cursor-pointer" @click="() => clickUser(user)" >
        <div v-if="user.profileImage != null" style="width: 3rem !important;">
          <img
          class="rounded-full w-10 h-10"

            :src="user.profileImage"
            alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&usqp=CAU"
            @error="onImageError"
          />
        </div>
        <!-- <div v-if="user.profileImage == null" style="width: 3rem !important;">
          <img
          class="rounded-full w-12 h-12"

            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&usqp=CAU"
          />
        </div> -->
        <div class="flex flex-col w-full">
          <span class="text-sm font-semibold"> {{ user.name }} </span>
          <div class="flex justify-between w-full">
            <span class="text-sm text-gray-300"> Last message </span>
          <span class="text-sm text-gray-300">Today</span>
          </div>
          
        </div>
      </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

const tweetStore = useTweetStore();
const authStore = useAuthStore();
const {user_data} = storeToRefs(authStore);

const {all_users} = storeToRefs(tweetStore) as any;
onBeforeMount(() => {
    
 tweetStore.getAllUser() as any;


});
if(all_users != null){
  console.log("Test All User : ",toRaw(all_users.value));
}

const clickUser = (data:any) => {
  tweetStore.updateUserChat(data);
}
const onImageError =(event:any) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&usqp=CAU';
  }
</script>

<style scoped>
.side_chat {
  overflow-y: scroll;
  height: 600px;
}
.side_chat::-webkit-scrollbar {
    display: none;
}
</style>
