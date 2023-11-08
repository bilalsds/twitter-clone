<template>
  <div class="flex flex-col px-5" v-if="tweet_details != null && tweet_details.statusCode == 200">
    <div class="flex gap-2 items-center">
      <span>
        <ReturnIcon class="font-bold text-lg cursor-pointer text-blue-400" @click="navigateTo('/')" />
      </span>
    <h1 class="font-semibold">Tweet</h1>

    </div>
    <div class="tweet_post">
      <div class="image_name_time flex justify-between gap-2">
        <div class="flex gap-2 py-5">
          <div class="image cursor-pointer" @click="profileHandler">
            <img
              class="w-10 h-10 rounded-full"
              :src="tweet_details?.all_tweets?.author?.profileImage"
            />
          </div>

          <div class="flex flex-col">
            <div class="flex gap-2">
              <div class="name text-sm">
            <span>{{ tweet_details?.all_tweets?.author?.name }}</span>
          </div>
          <div class="username text-sm">
            <span class="text-gray-400">{{ tweet_details?.all_tweets?.author?.username }}</span>
          </div>
          <div class="time text-sm">
            <span class="text-gray-400 text-sm">{{ timeAgoFormate(tweet_details?.all_tweets?.author?.createdAt) }}</span>
          </div>
            </div>
            <div v-if="tweet_details?.all_tweets?.replyTo != null" class="flex gap-2 cursor-pointer" @click="navigateTo(`/${tweet_details?.all_tweets?.replyTo?.id}`)" >
              <span class="text-sm text-gray-400">Replying to </span>
            <span class="text-sm text-blue-400">{{ tweet_details?.all_tweets?.replyTo?.author?.username }}</span>
            </div>
          </div>

       


        </div>
      </div>

      <div class="description">
        <span class="text-sm pb-5 flex justify-start">
          {{ tweet_details?.all_tweets?.text }}
        </span>
      </div>
      <div class="banner_image" v-if="tweet_details?.all_tweets?.media.length != 0">
        <img
          class="w-full h-full rounded-xl"
          :src="tweet_details?.all_tweets?.media[0]?.url"
        />
      </div>
      <div class="comments pt-8 flex gap-2 justify-around">
        <div class="flex gap-3">
          <span>
            <MessageIcon class="h-8 w-8 cursor-pointer" />
          </span>
          <span class="text-sm self-center"> 3 </span>
        </div>
        <div class="flex gap-3">
          <span>
            <Retweet class="h-8 w-8 cursor-pointer" />
          </span>
          <span class="text-sm self-center"> {{ tweet_details?.all_tweets?.replies?.length }} </span>
        </div>
        <div class="flex gap-3">
          <span>
            <Fav class="h-8 w-8 cursor-pointer" />
          </span>
          <span class="text-sm self-center"> 3 </span>
        </div>
        <div class="flex gap-3">
          <span>
            <ShareIcon class="h-8 w-8 cursor-pointer" />
          </span>
          <span class="text-sm self-center"> 3 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tweetStore = useTweetStore();
const params = useRoute();
const authStore = useAuthStore();
const {user_data} = storeToRefs(authStore) as any;
const { tweet_details } = storeToRefs(tweetStore) as any;

watch(tweet_details, () => {
  console.log("tweet_detailstweet_details : ", toRaw(tweet_details.value));
  if(toRaw(tweet_details.value).statusCode != 200){
    navigateTo('/');
  }
});

const profileHandler = () => {
  if(toRaw(tweet_details.value)?.all_tweets?.author?.id == toRaw(user_data.value).user_login.id){
    navigateTo(`/profile`)
  } else {
    navigateTo(`/profile/${toRaw(tweet_details.value)?.all_tweets?.author?.id}`)
  }
}
</script>

<style scoped></style>
