<script setup lang="ts">
import * as zod from "zod";
const authStore = useAuthStore();
const { login_loader } = storeToRefs(authStore);
const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty("Username is required")
      .startsWith("@", { message: "Must be start from @" }),
    password: zod
      .string()
      .nonempty("This is required")
      .min(8, { message: "Min 8 characters " }),
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: emails } = useField("email");
const { value: passwords } = useField("password");
const onSubmit = handleSubmit((values) => {
  console.log("Test Login Values : ", values);
  const login_Inputs = {
    username: values.email,
    password: values.password,
  };

  authStore.userLoginHandler(login_Inputs);
});

const model = useState(() => false) as any;
const register_form = useState(() => true) as any;


const openModel = (login: any) => {
  model.value = true;
  if (login == "register") {
    register_form.value = true;
  } else {
    register_form.value = false;
  }
};

const closeModel = () => {
  model.value = false;
};

const closedRegister = (callback: any) => {
  register_form.value = callback;
};
</script>
<template>
  <div class="p-5 grid md:grid-cols-2 sm:mb-10 sm:grid-cols-1">
    <div class="w-50%">
      <TweetLogo />
    </div>
    <div class="flex flex-col my-auto justify-center align-middle gap-10">
      <div class="self-center flex gap-10 flex-col">
        <h1 class="text-4xl font-extrabold">Happening now</h1>

        <h1 class="text-4xl font-bold">Join today.</h1>
        <div>
          <button
            class="bg-blue-400 px-20 py-2 rounded-3xl text-white"
            @click="() => openModel('register')"
          >
            Create account
          </button>
        </div>
        <h3 class="font-bold">Already have an account ?</h3>
        <div>
          <button
            class="border border-blue-400 px-28 py-2 text-blue-400 rounded-3xl"
            @click="() => openModel('login')"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>

    <!-- Model  -->

    <div v-if="model" class="login_model flex justify-center align-middle">
      <div
        class="model_body flex flex-col gap-10 lg:w-2/5 md:w-3/5 sm:w-4/5 bg-white py-10"
      >
        <div class="cross_icon px-10 text-gray-400 flex justify-end">
          <CloseIcon class="cursor-pointer text-2xl" @click="closeModel" />
        </div>

        <div class="flex flex-col gap-6 px-20">
          <template v-if="register_form">
            <Register @closedRegister="closedRegister" />
          </template>

          <template v-if="!register_form">
            <form @submit="onSubmit" class="flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
                  placeholder="Enter your username"
                  v-model="emails"
                />
                <span class="text-sm text-red-500">{{ errors.email }}</span>
              </div>

              <div>
                <input
                  type="password"
                  class="border rounded-md outline-none border-gray-300 px-4 py-2 w-full"
                  placeholder="Enter your password"
                  v-model="passwords"
                />
                <span class="text-sm text-red-500">{{ errors.password }}</span>
              </div>
              <!-- @click="loginHandler" -->

              <div>
                <button
                  v-if="!login_loader"
                  class="border border-blue-400 px-28 py-2 text-blue-400 rounded-3xl"
                  type="submit"
                >
                  Login
                </button>
                <button
                  v-if="login_loader"
                  class="border border-blue-400 px-28 py-2 text-blue-400 rounded-3xl"
                >
                  <LoaderIcon class="w-6 h-6" />
                </button>
              </div>
            </form>
          </template>

          <h3 v-if="register_form" class="font-bold">
            Already have an account ?
          </h3>
          <h3 v-if="!register_form" class="font-bold">
            Don't have an account ?
          </h3>
          <div v-if="register_form">
            <button
              class="border border-blue-400 px-28 py-2 text-blue-400 rounded-3xl"
              @click="() => openModel('login')"
            >
              Sign In
            </button>
          </div>
          <div v-if="!register_form">
            <button
              class="bg-blue-400 px-20 py-2 rounded-3xl text-white"
              @click="() => openModel('register')"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.login_model {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
