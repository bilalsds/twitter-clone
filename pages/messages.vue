<template>
    <div class="p-5 flex gap-5 bg-gray-100">
        <!-- <h1>Chat App</h1> -->

        <div class="basis basis-1/4">
            <Sidebar />

        </div>
        <div class="basis basis-3/4 w-full">
            <ChatArea />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware:'retweet',
    layout:'default'
});
const tweetStore = useTweetStore();
const {user_chats} = storeToRefs(tweetStore);

onUnmounted(() => {
    user_chats.value = null
});




</script>

<style scoped>

</style>