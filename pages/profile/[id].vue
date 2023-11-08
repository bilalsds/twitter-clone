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
        <div v-if="user_info == null" class="w-full main_section flex justify-center items-center">
          <div class="w-full h-full flex justify-center py-20">
            <LoaderIcon class="font-bold text-blue-400 text-4xl" />
          </div>
        </div>
        <div class="main_section" v-if="user_info != null">
          <div>
            <div
              class="flex justify-between items-center px-2 py-3 gap-5 bg-gray-50"
            >
              <div class="flex justify-start gap-5">
                <div class="self-center text-blue-400 cursor-pointer">
                  <BackIcon class="text-lg" @click="navigateTo('/')" />
                </div>

                <div v-if="user_info != null" class="flex flex-col">
                  <span class="font-semibold">
                    {{ user_info?.user_data?.name }}
                  </span>
                  <span class="text-sm text-gray-500"
                    >{{
                      user_info != null
                        ? user_info?.user_data?.tweet?.length
                        : "0"
                    }}
                    Tweets</span
                  >
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="profileSection">
            <div
              v-if="user_info != null"
              class="flex flex-col justify-between items-start gap-4 px-5 py-3"
            >
              <div class="Image">
                <img
                  class="w-40 h-40 rounded-full"
                  :src="user_info.user_data.profileImage"
                  alt="missing"
                />
              </div>
              <div class="flex justify-between w-full">
                <div class="Name">
                  <div v-if="user_info != null" class="flex flex-col gap-2">
                    <span class="font-semibold">
                      {{ user_info?.user_data?.name }}
                    </span>
                    <span class="text-sm text-gray-500">{{
                      user_info.user_data.username
                    }}</span>
                    <span class="text-sm text-gray-500">
                      Joined on {{ dateFormate(user_info.user_data.createdAt) }}
                    </span>
                    <div class="flex gap-5 font-semibold text-sm my-5">
                      <span>0 Followings </span>
                      <span>0 Followers</span>
                    </div>
                  </div>
                </div>

                <div class="EditProfileButton"></div>
              </div>
            </div>
          </div>
          <div class="py-5">
            <!-- <AddPost /> -->
          </div>
          <div
            v-for="tweet in user_info?.user_data?.tweet"
            class="py-5 border border-t-gray-300 border-b-gray-300"
          >
            <TweetPost :tweetItem="tweet" :retweet="false" />
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
const param = useRoute();

const token = useState("token", () => null) as any;
const tweetStore = useTweetStore();
const { user_posts, user_info } = storeToRefs(tweetStore) as any;

onBeforeMount(() => {
  tweetStore.getUserTweets();
  tweetStore.getUserData(param.params.id);
  token.value = localStorage.getItem("authStore");
});

watch(user_info, () => {
  console.log("Test User Profile Info : ", toRaw(user_info.value));
});
</script>

<style scoped>
.main_section {
    overflow-y: scroll;
    height: 100vh;
}
.main_section::-webkit-scrollbar{
    display: none;
}
</style>
