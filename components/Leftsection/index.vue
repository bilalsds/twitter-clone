<template>
    <div class="py-6 px-5 h-full flex flex-col gap-5 border-r-2">
        <div class="flex justify-end">
            <img src="~/assets/icons8-twitter.gif" class="mr-10" alt="" srcset="">

        </div>

        <div class="flex justify-end gap-10">
            <div class="Icons flex flex-col gap-5">
            <span class="self-center cursor-pointer">
                <HomeIcon class="w-6 h-6" @click="navigateTo('/')" />
            </span>
            <span class="self-center">
                <HashIcon class="w-6 h-6" />
            </span>
            <span class="self-center">
                <BellIcon class="w-6 h-6" />
            </span>
            <span class="self-center">
                <MessageIcon class="w-6 h-6" />
            </span>
            <span class="self-center">
                <BookMarkIcon class="w-6 h-6" />
            </span>
            <span class="self-center">
                <ListIcon class="w-6 h-6" />
            </span>
            <span class="self-center cursor-pointer" @click="navigateTo('/profile')">
                <ProfileIcon class="w-6 h-6 " />
            </span>
            <span class="self-center">
                <MoreIcon class="w-6 h-6" />
            </span>
        </div>

        <div class="Tags self-start flex flex-col gap-5 justify-start">
            <span class="font-bold self-start cursor-pointer" @click="navigateTo('/')">
                Home
            </span>
            <span class="self-start">
                Explore
            </span>
            <span class=" self-start">
                Notifications
            </span>
            <span class="self-start">
                Messages
            </span>
            <span class="self-start">
                Bookmarks
            </span>
            <span class="self-start">
                Lists
            </span>
            <span class="self-start cursor-pointer" @click="navigateTo('/profile')">
                Profile
            </span>
            <span class="self-start">
                More
            </span>
        </div>
        </div>
       

        <div class="py-5 flex justify-end">
            <button class="bg-blue-400 font-semibold py-2 px-10 text-white rounded-full">Twitter</button>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps(['profile'])

</script>

<style scoped>

</style>