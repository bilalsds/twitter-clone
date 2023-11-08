<template>
    <div class="flex px-10 justify-between py-4 items-center  w-full bg-gray-100">
        <div>
            <AccountIcon class="hover:text-blue-400 text-lg font-semibold  cursor-pointer" @click="navigateTo('/profile')"  />
        </div>
        
        <div class="">
            <div class="Input w-full">
            <input type="text" v-model="searchTweet" @input="changeHandler" class="w--full placeholder:text-sm border-gray-400 bg-gray-400 py-1 rounded-full text-white outline-0 px-5 placeholder:text-white" placeholder="Search Twitter">
            <div v-if="searchTweet.length !== 0" class="bg-gray-100 w-80 searchResultTweetPost rounded-lg px-5 py-3 flex flex-col gap-4 absolute">
                
                
                <div v-if="search_posts != null" v-for="tweet in search_posts.search_result" :key="tweet.id" class="flex gap-2 items-center cursor-pointer">
                    <span @click="() => clickSearch(tweet.id)">
                        <img class="w-7 h-7 rounded-full" :src="tweet.image" >
                    </span>
                    <span class="text-sm" @click="() => clickSearch(tweet.id)">{{ tweet.text }}</span>
                </div>

                <div  v-if="search_posts != null">
                    <span v-if="search_posts.search_result.length == 0" class="py-2 text-gray-400 text-sm"> No tweets found !!</span>
                </div>
                
            </div>
        </div>
        </div>
        <div>
            <BirdIcon @click="navigateTo('/')" class="text-semibold cursor-pointer text-lg text-blue-400" />
        </div>
    </div>
</template>

<script setup lang="ts">
const searchTweet = useState('searchTweet',() => '');
const tweetStore = useTweetStore();
const {search_posts} = storeToRefs(tweetStore);


const changeHandler = async () => {
    tweetStore.getSearchData(toRaw(searchTweet.value));
};

watch(search_posts,() => {
    console.log("Test Search Posts : ",toRaw(search_posts.value));
    
});

const clickSearch = (id:any) => {

    navigateTo(`/${id}`);
    searchTweet.value = '';

}
</script>

<style scoped>
/* .Input input {
    width: 300px !important;
} */

</style>