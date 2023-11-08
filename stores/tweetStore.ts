export const useTweetStore = defineStore('tweetStore',() => {

    const user_posts = useState('user_post',() => []) as any;
    const all_tweets = useState('tweets',() => null) as any;
    const tweet_details = useState('details',() => null) as any;
    const tweet_details_loader = useState('loader',() => false) as any;
    const search_posts = useState('searchPost',() => null) as any;
    const user_info = useState('userData',() => null)  as any;
    const authStore = useAuthStore();
    const {user_data} = storeToRefs(authStore);
    const getTweetId = useState("tweetID",() => null) as any

    const getUserTweets = async () => {
        const {data } = await useFetch(`/api/userposts/${user_data.value?.user_login?.id}`,{
            lazy:false,
            server:true
        }) as any;
        
        user_posts.value = data;
    };

    const getAllTweets = async () => {
        const {data } = await useFetch('/api/getAllPost',{
            lazy:false,
            server:true
        }) as any;

        all_tweets.value = data;
        
    }

    const addTweet = async (formdata:any) => {
     
        const {data} = await useFetch('/api/addpost', {
            method: 'POST',
            body: formdata
        }) as any;
        
        if (data.value) {

            alert("Your Tweet is Posted !!");

          getAllTweets();
          getUserTweets();
          getTweetById(toRaw(getTweetId.value))
            return {
                posted:true
            }
            
        } else {
            alert('Something Went Wrong !! ');

            console.log("Test Add Tweet Response : ",toRaw(data.value));
            return {
                posted:false
            }
        }
    }

    const deleteTweet = async(id:any) => {

        const {data } = await useFetch(`/api/userposts/deletepost/${id}`,{
            lazy:true,
            server:false
        }) as any;

        if(toRaw(data.value).statusCode == 200) {
           alert("Tweet Deleted !!");
           getUserTweets()
        }
        
    }

    const getTweetById = async(id:any) => {
        getTweetId.value = id
      
        const {data} = await useFetch(`/api/postdetail/${id}`,{
            lazy:false,
            server:true,
        }) as any;
        console.log("Test Get Tweet By Id : ",toRaw(data.value));
        
        
            tweet_details.value = data;
            if(data.value){
               return {
                getit:true
               }
            } else {
                return {
                    getit:false
                }
            }
         
    } 
    
    const getSearchData = async(text:any) => {
        
        const {data} = await useFetch(`/api/autocomplete/${text}`,{
            server:false,
            lazy:true
        });
        search_posts.value = data
    }

    const getUserData = async (id:any) => {
        const {data} = await useFetch(`/api/userprofile/${id}`);
        user_info.value = data

        if(!data.value){
            navigateTo('/')
        }
    }

    return {
        getAllTweets,
        getUserTweets,
        user_posts,
        all_tweets,
        addTweet,
        deleteTweet,
        getTweetById,
        tweet_details,
        tweet_details_loader,
        getSearchData,
        search_posts,
        getUserData,
        user_info
    }


})