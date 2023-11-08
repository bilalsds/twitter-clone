<template>
    <div>
        <!-- <p>Profile Section !!</p> -->
        <div v-if="user_data != null" class="flex flex-col justify-between  items-start gap-4 px-5 py-3">

            <div class="Image">
                <img class="w-40 h-40 rounded-full" :src="user_data.user_login.profileImage" alt="missing" />

            </div>
            <div class="flex justify-between w-full">
                <div class="Name">
                <div v-if="user_data != null" class=" flex flex-col gap-2">
                <span class="font-semibold">

                {{ user_data?.user_login?.name }}

                </span>
                <span class="text-sm text-gray-500">{{ user_data.user_login.username }}</span>
                <span class="text-sm text-gray-500">
                Joined on {{ dateFormate(user_data.user_login.createdAt) }}

                </span>
                <div class="flex gap-5 font-semibold text-sm my-5">

                <span>0 Followings </span>
                <span>0 Followers</span>
            </div>
            
            </div>

            </div>

            <div class="EditProfileButton">

                <button v-if="editprofile != true" class="bg-blue-400 font-semibold py-2 px-10 text-white rounded-full">Edit Profile</button>


            </div>
            </div>
            


        </div>
    </div>
</template>

<script setup lang="ts">

defineProps(['logout','editprofile'])
const authStore = useAuthStore();

const {user_data} = storeToRefs(authStore);

const editModel = () => {
    
}

</script>

<style scoped>

</style>