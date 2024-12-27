import { ref, onMounted, watch, nextTick } from 'vue';
import { getTripByUserID } from '../models/TripModel'
import SignInModel from '../models/SignInModel';

export default function () {
    const user = ref(null);
    
    const loadUser = async () => {
        const signInModel = new SignInModel("", "");
        const token = sessionStorage.getItem('access_token');
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

      const fetchTripByUser = async () => {
        await loadUser();
        let trips = await getTripByUserID(user.value.id);
        trips = trips.sort((a, b) => b.id - a.id);
        return trips;
    }

    return {
        fetchTripByUser,
    }

}