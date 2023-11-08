<template>
    <div class=""  >
        <div v-if="token == null" class="flex justify-center  items-center bg-gray-200 fixed left-0 right-0 bottom-0 top-0">
            <Loader />
        </div>
        <!-- <h1 class="text-dim-500 dark:text-red-500">Twitter Clone !!</h1> -->
        <div class="twiter_app">
            <div class="grid gap-0 lg:grid-cols-3 sm:grid-col-1">
                <div class="hidden lg:block text-center ">
                    <Leftsection />
                </div>
                <div v-if="loader" class="flex flex-col gap-5 py-20 h-full justify-center items-center ">
                        <h1 >
                            <LoaderIcon class="font-bold text-blue-400 w-10 h-10 text-4xl" />
                        </h1>
                    </div>
                <div v-if="!loader"  class="flex flex-col gap-5 py-5 main_section">
                    
                    <div>
                        <RetweetPost />
                    </div>
                    <div>
                        <AddRetweet />
                    </div>
                    <div>
                        <RetweetList />
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
    middleware:'retweet',
    layout:'default'
});

const tweetStore = useTweetStore();
const params = useRoute();
const {tweet_details_loader,tweet_details} = storeToRefs(tweetStore);
const loader = ref(false);


const token = useState('token',() => null) as any;

onBeforeMount(() => {

    token.value = localStorage.getItem('authStore');
    
});
async function getTweetDetails (){
    loader.value=true
    const {getit} = await  tweetStore.getTweetById(params.params.retweets) as any;
  if(getit){
    loader.value = false
  } else {
    loader.value = false
  }
}
onBeforeMount(async() => {
  
    getTweetDetails();

});

watch(tweet_details,() => {
    if(toRaw(tweet_details.value)?.statusCode != 200){
        navigateTo('/')
    }
})



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