
<template>
    <form @submit="onSubmit" class="flex flex-col gap-5">
        <div>
            <input
              type="text"
              class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
              placeholder="Enter your name"
              v-model="name"
            />
            <span class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>
          <div>
            <input
              type="text"
              class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
              placeholder="Enter your username"
              v-model="username"

            />
            <span class="text-red-500 text-sm">{{ errors.username }}</span>

          </div>
          <div>
            <input
              type="email"
              class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
              placeholder="Enter your email"
              v-model="email"

            />
            <span class="text-red-500 text-sm">{{ errors.email }}</span>

          </div>
          <div>
            <input
              type="password"
              class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
              placeholder="Enter your password"
              v-model="password"

            />
            <span class="text-red-500 text-sm">{{ errors.password }}</span>

          </div>
          <div>
            <input
              type="text"
              class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
              placeholder="Enter your Image link"
              v-model="image"
              
            />
            <span class="text-red-500 text-sm">{{ errors.image }}</span>

          </div>
          <div>
            <button type="submit" v-if="!loader" class="bg-blue-400 px-20 py-2 rounded-3xl text-white">
              Register
            </button>
            <button v-if="loader"  class="bg-blue-400 px-20 py-2 rounded-3xl text-white">
              <LoaderIcon class="w-6 h-6" />
            </button>
          </div>
    </form>
</template>

<script setup lang="ts">
import * as zod from 'zod';

const emit = defineEmits(['closedRegister']);

const validationSchema = toTypedSchema(
  zod.object({
    name:zod.string().trim().nonempty('Name is required'),
    username: zod.string().nonempty('Username is required').startsWith('@',{message:'Must be start from @'}),
    password: zod.string().trim().nonempty('Password is required').min(8, { message: 'Min 8 characters ' }),
    email:zod.string().nonempty('Email is required').email({message:'Email must be valid'}),
    image:zod.string().nonempty('Image is required').url('Must be valid Image Url')
  
  })
);
const { handleSubmit, errors, } = useForm({
  validationSchema,
});
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: username } = useField('username');
const { value: name } = useField('name');
const { value: image } = useField('image');

const loader = useState("loader_register",() => false) as any;

const onSubmit = handleSubmit(async(values) => {
  loader.value = true
  const register_Inputs = {
        name:values.name,
        username:values.username,
        email:values.email,
        password:values.password,
        profileImage:values.image
    }
    const {data,pending } = await useFetch('/api/register',{
        method:'POST',
        body:register_Inputs
    }) as any;
    if(toRaw(data.value).register_user !== undefined){
      alert("User Register Successfully !!");
      loader.value = false

      emit('closedRegister',false)
    } else {
      alert('Something went wrong with request try again !!');
      loader.value = false

    }
});

</script>

<style scoped>

</style>