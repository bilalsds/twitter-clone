// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // spaLoadingTemplate:false
  modules:['@nuxtjs/tailwindcss','@pinia/nuxt','@formkit/nuxt','@pinia-plugin-persistedstate/nuxt','@vee-validate/nuxt',],
  veeValidate:{
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  
  components:[{
    path:'~/components/',
    pathPrefix:false
  }],
  runtimeConfig:{
    jwtsecret:process.env.JWT_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME,
    cloud_apikey:process.env.CLOUDINARY_APIKEY,
    cloud_secret:process.env.CLOUDINARY_APISECRETKEY

  },
  css:['~/assets/css/global.css']
  
})
