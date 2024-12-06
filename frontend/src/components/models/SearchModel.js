import axios from 'axios';

export async function getSearchResult(text) {
    try {
      const response = await fetch(
        `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/dashboard/search?text=${text}`
      );
      const data = await response.json();

      return { 
        cities: data.cities,
        destinations: data.destinations,
      };
    } catch (error) {
      console.error("Error fetching search Result:", error);
      return []; // Hoặc bạn có thể xử lý khác tùy ý
    }
  }