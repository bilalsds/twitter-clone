export const useAuthStore = defineStore('authStore',() => {

    const isAuthenticate = useState('auth',() => false);
    const user_data = useState('user_data',() => null) as any;
    const login_loader = useState('auth_loader',() => false);


    const userLoginHandler = async (login_Inputs:any) => {
      login_loader.value = true;
        if( login_Inputs.username.length == 0  || login_Inputs.password.length == 0 ){
            alert("Both Fields are required !!");
            login_loader.value = false
            return
          }
          const {data,pending } = await useFetch('/api/login',{
              method:'POST',
              body:login_Inputs
          }) as any;
          // login_loader.value = pending;
          if(toRaw(data.value).statusCode == 404){
            alert("Invalid username & password !!")
            login_loader.value = false
          } else {
            user_data.value =data.value;
            alert("Account is Login !!");
            isAuthenticate.value = true
            navigateTo('/');
            login_loader.value = false
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
    }


    const my_auth_store = {
        isAuthenticate,
        user_data,
        userLoginHandler,
        login_loader
    }

    return my_auth_store;


},{
    persist:{
        storage:persistedState.localStorage
    }
})