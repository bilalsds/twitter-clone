<template>
    <div class="w-full py-5" >
        <h1 class="font-semibold px-5">Home</h1>
        <div class="add_post border-b-2 py-5 w-full border-gray-400">
            <AddPost />
        </div>
        <div v-if="all_tweets != null" v-for="tweet in all_tweets.all_tweets" class="add_post border-b-2 py-5 w-full border-gray-400">
            <TweetPost :tweet-item="tweet" :retweet="false" />
        </div>
    </div>
</template>

<script setup lang="ts">

const tweetStore = useTweetStore();

const {all_tweets} = storeToRefs(tweetStore) as any;
onBeforeMount(() => {
    tweetStore.getAllTweets();

});







</script>

<style scoped>

</style>