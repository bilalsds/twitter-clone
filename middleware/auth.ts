export default defineNuxtRouteMiddleware((to, from) => {


  let user_token;
  if (!process.server) {
    user_token = localStorage.getItem("authStore");
  }


  if (to.fullPath == "/") {
    if (user_token !== null) {
      return true;
    } else {
      return navigateTo("/login");
    }
  }

  if (to.fullPath == "/login") {
    if (user_token == null) {
      return true;
    } else {
      return navigateTo("/");
    }
  }
});
