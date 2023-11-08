<template>
    <div>
        <div v-if="tweet_details != null" v-for="tweet in tweet_details?.all_tweets?.replies.reverse()" class="add_post border-b-2 py-5 w-full border-gray-400">
            <TweetPost :tweet-item="tweet" :retweet="true" />
        </div>
    </div>
</template>

<script setup lang="ts">
const tweetStore = useTweetStore();

const {tweet_details} = storeToRefs(tweetStore) as any;
onBeforeMount(() => {
    tweetStore.getAllTweets();

});
</script>

<style scoped>

</style>