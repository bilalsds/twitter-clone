<template>
  <div class="tweet_post px-5">
    <div class="image_name_time flex justify-between gap-2">
      <div class="flex gap-2">
        <div class="image cursor-pointer" @click="profileHandler">
          <img
            class="w-10 h-10 rounded-full"
            :src="tweetItem.author.profileImage"
          />
        </div>

        <div class="flex flex-col">
          <div class="flex gap-2">
            <div class="name text-sm">
              <span>{{ tweetItem.author.name }}</span>
            </div>
            <div class="username text-sm">
              <span class="text-gray-400">{{ tweetItem.author.username }}</span>
            </div>
            <div class="time text-sm">
              <span class="text-gray-400 text-sm">{{
                timeAgoFormate(tweetItem.createdAt)
              }}</span>
            </div>
          </div>
          <div v-if="retweet == true" class="flex gap-2">
            <span class="text-sm text-gray-400">Replying to </span>
            <span class="text-sm text-blue-400">{{ tweet_details?.all_tweets?.author?.username }}</span>
          </div>
          <div v-if="retweet == false && tweetItem.replyTo != null" class="flex gap-2 cursor-pointer" @click="navigateTo(`/${tweetItem?.replyTo?.id}`)">
            <span class="text-sm text-gray-400">Replying to </span>
            <span class="text-sm text-blue-400">{{ tweetItem?.replyTo?.author?.username }}</span>
          </div>
        </div>
      </div>

      <div v-if="profileCard == 'active'" class="relative">
        <DotsIcon
          class="cursor-pointer"
          @click="() => deleteDropdownHandler(tweetItem.id)"
        />

        <div
          @click="() => deleteTweet(tweetItem.id)"
          v-if="showDropdown == tweetItem.id"
          class="absolute deleteDropdown bg-gray-200 px-5 py-1 rounded-md"
        >
          <span>Delete</span>
        </div>
      </div>
    </div>

    <div class="description " >
      <span class="text-sm py-5 flex justify-start">
        {{ tweetItem.text }}
      </span>
    </div>
    <div
      class="banner_image"
      v-if="tweetItem.media.length != 0"
     
    >
      <img class="w-full h-full rounded-xl" :src="tweetItem.media[0].url" />
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
          <Retweet class="h-8 w-8 cursor-pointer" @click="navigateTo(`/${tweetItem?.id}`)" />
        </span>
        <span class="text-sm self-center"> {{ tweetItem?.replies?.length }} </span>
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
</template>

<script setup lang="ts">
import { timeAgoFormate } from "#imports";

// defineProps(["tweetItem", "profileCard", "retweet"]);

const props = defineProps({
  tweetItem: Object as PropType<any>,
  profileCard: String,
  retweet: Boolean
})

const tweetStore = useTweetStore();

const { tweet_details } = storeToRefs(tweetStore) as any;
const { deleteTweet } = useTweetStore();
const authStore = useAuthStore();
const {user_data} = storeToRefs(authStore) as any;

const showDropdown = useState(() => "");

const deleteDropdownHandler = (text: any) => {
  if (showDropdown.value == text) {
    showDropdown.value = "";
  } else {
    showDropdown.value = text;
  }
};

const visitProfile = computed(() => {
  if(props.tweetItem.author.id == toRaw(user_data.value).user_login.id){
    return true
  } else {
    return false
  }
});


const profileHandler = () => {
  if(props.tweetItem.author.id == toRaw(user_data.value).user_login.id){
    navigateTo(`/profile`)
  } else {
    navigateTo(`/profile/${props.tweetItem.author.id}`)
  }
}


</script>

<style scoped>
.deleteDropdown {
  left: -71px !important;
  cursor: pointer;
}
</style>
