<template>
    <div class="flex gap-5 p-10 bg-gray-300 h-screen">
        <!-- <h1 class="py-5 px-5 text-red-400">Error Page</h1> -->
        <div class="bg-blue-400 p-5 w-full gap-10 text-white flex flex-col sm:flex-col md:flex-row lg:flex-row justify-around py-10 items-center shadow-xl rounded-2xl">

      
        <div>
            <img class="rounded-full shadow-2xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA1ssGUJCLWaMSTrgUyg9FWjMScEeuWzX_0A&usqp=CAU" alt="" >
        </div>
        <div class="bg-gray-200 text-black w-full h-full md:w-96 md:h-96 rounded-xl shadow-2xl flex gap-5 justify-center items-center flex-col">
            <h1 class="text-lg font-semibold">Page Not Found</h1>
            <!-- <h3 class="text-lg font-semibold">404 Not Found</h3> -->
            <button @click="navigateTo('/')" class="py-2 text-white px-10 bg-blue-500 shadow-2xl rounded-3xl text-sm font-semibold">Go To Home</button>
        </div> 
    </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>