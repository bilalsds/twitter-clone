<template>
    <div>
        <div v-if="isAuthenticate" class="flex justify-center  items-center bg-gray-200 fixed left-0 right-0 bottom-0 top-0">
            <Loader />
        </div>
        <Login />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout:'login',
    middleware:'login'
});
const token = useState(() => false) as any;
const authStore = useAuthStore();
const {isAuthenticate} = storeToRefs(authStore);

onBeforeMount(() => {
    token.value = isAuthenticate;

})

</script>

<style scoped>

</style>