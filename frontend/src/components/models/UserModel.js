import axios from 'axios';

export async function getUserById(userId) {
    try {
  
      // Fetch the basic user information based on userId
      const response = await axios.get(
        `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/user/${userId}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
  
      const user = response.data;
  
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        userInfo: user.user_info,
        role: user.role,
        status: user.status,
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      return null; // Return null or handle as needed
    }
  }