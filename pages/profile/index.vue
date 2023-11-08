<template>
  <div class="">
    <div
      v-if="token == null"
      class="flex justify-center items-center bg-gray-200 fixed left-0 right-0 bottom-0 top-0"
    >
      <Loader />
    </div>
    <div class="twiter_app">
      <div class="grid gap-0 lg:grid-cols-3 sm:grid-col-1">
        <div class="hidden lg:block text-center">
          <Leftsection profile="active" />
        </div>
        <div class="main_section">
          <ProfileNavbar :tweets="user_posts" />
          <ProfileSection />
            <div class="py-5">
          <AddPost />

            </div>
          <div
            v-for="tweet in user_posts?.all_tweets"
            class="py-5 border border-t-gray-300 border-b-gray-300"
          >
            <TweetPost :tweetItem="tweet" :retweet="false" profileCard="active" />
          </div>
        </div>
        <div class="hidden lg:block">
          <Rightsection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "profile",
  layout: "default",
});

const token = useState("token", () => null) as any;
const tweetStore = useTweetStore();
const { user_posts } = storeToRefs(tweetStore) as any;

onBeforeMount(() => {
  tweetStore.getUserTweets();

  token.value = localStorage.getItem("authStore");
});
</script>

<style scoped>

.main_section {
    overflow-y: scroll;
    height: 100vh;
}
.main_section::-webkit-scrollbar{
    display: none;
}</style>
