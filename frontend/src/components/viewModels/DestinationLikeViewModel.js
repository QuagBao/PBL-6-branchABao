import { ref, onMounted, watch, nextTick } from 'vue';
import { setLikeForDestination , setUnLikeForDestination , checkLikeForDestination } from '../models/destinationModel';
import SignInModel from '../models/SignInModel';
import { useToast } from "vue-toastification";
export default function (){
    const toast = useToast();
    const user = ref(null);
    const token = sessionStorage.getItem('access_token');
    const loadUser = async () => {
        const signInModel = new SignInModel("", "");
        try{
            if(token){
                const userResult = await signInModel.fetchCurrentUser(token);
                if(userResult.success){
                    user.value = userResult.user;
                } else {
                console.error('Cannot get user:', error);
                }
            }
      
        } catch (error) {
            console.error('An error occurred during authentication:', error);
            return { success: false, message: error.message || 'An error occurred' };
        }
    
    }

    const like = async (destination_id) => {
        if(!user.value){
            return;
        }
        const result = await setLikeForDestination(user.value.id,destination_id);
        if(result.success){
            console.log('Like success');
        } else {
            console.error('Cannot like destination:', error);
        }
    }

    const unlike = async (destination_id) => {
        if(!user.value){
            return;
        }
        const result = await setUnLikeForDestination(user.value.id,destination_id);
        if(result.success){
            console.log('Unlike success');
        } else {
            console.error('Cannot unlike destination:', error);
        }
    }

    const checkLike = async (destination_id) => {
        try {
      
          // Load user nếu chưa có
          if (!user.value) {
            const signInModel = new SignInModel("", "");
            const token = sessionStorage.getItem("access_token");
      
            if (!token) {
              console.error("No access token found. Cannot authenticate user.");
              return false;
            }
      
            const userResult = await signInModel.fetchCurrentUser(token);
      
            if (userResult.success) {
              user.value = userResult.user;
            } else {
              return false;
            }
          }
      
          // Gọi API kiểm tra trạng thái like
          const result = await checkLikeForDestination(user.value.id, destination_id);
          return result; // Trả về giá trị boolean trực tiếp
        } catch (error) {
          return false; // Trả về false nếu có lỗi
        }
      };

    return {
        user,
        loadUser,
        like,
        unlike,
        checkLike
    }

}