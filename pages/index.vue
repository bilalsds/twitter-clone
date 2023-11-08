<template>
    <div class=""  >
        <div v-if="token == null" class="flex justify-center  items-center bg-gray-200 fixed left-0 right-0 bottom-0 top-0">
            <Loader />
        </div>
        <!-- <h1 class="text-dim-500 dark:text-red-500">Twitter Clone !!</h1> -->
        <div class="tweetir_navbar lg:hidden">

            <Navbar />
        </div>
        <div class="twiter_app">
            <div class="grid gap-0 lg:grid-cols-3 sm:grid-col-1">
                <div class="hidden lg:block text-center ">
                    <Leftsection />
                </div>
                <div class=" main_section">
                    <Mainsection />
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
    middleware:'auth',
    layout:'default'
});



const token = useState('token',() => null) as any;

onBeforeMount(() => {

    token.value = localStorage.getItem('authStore');
    // if(token == null || token == undefined){
    //     navigateTo('/login')
    // }
    
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