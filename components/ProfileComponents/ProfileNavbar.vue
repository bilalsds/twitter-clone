<template>
    <div>
        
        <div class="flex justify-between items-center px-2 py-3 gap-5 bg-gray-50">

            <div class="flex justify-start gap-5">

                <div class="self-center text-blue-400 cursor-pointer">
                <BackIcon class="text-lg" @click="navigateTo('/')" />
            </div>
            <div v-if="user_data != null" class=" flex flex-col">
                <span class="font-semibold">

                {{ user_data?.user_login?.name }}

                </span>
                <span class="text-sm text-gray-500">{{ tweets != null ? tweets?.all_tweets?.length : '0' }} Tweets</span>
            
            </div>
            </div>
            <div>

                <button v-if="logout != true" @click="logoutHandler"   class="border border-blue-400 px-7 py-1 text-blue-400 rounded-3xl">Logout</button>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

defineProps(['tweets','logout']);

const authStore = useAuthStore();

const {user_data} = storeToRefs(authStore)

const logoutHandler = () => {
    localStorage.removeItem('authStore');
    navigateTo('/login');
    window.location.reload();
}



</script>

<style scoped>

</style>