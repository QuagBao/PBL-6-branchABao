import axios from 'axios';

  export async function fetchDestinationsByCity(cityId) {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?city_id=${cityId}&is_popular=true&get_rating=true`);
      const filteredDestinations = response.data.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);

    // Chỉ map qua các destination đã lọc
      return response.data.map(destination => ({
        id: destination.id,
        name: destination.name,
        user_id: destination.user_id,
        price_bottom: destination.price_bottom,
        price_top: destination.price_top,
        age: destination.age,
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        date_create: destination.date_create,
        address: {
          city_id: destination.address.city_id,
          district: destination.address.district,
          ward: destination.address.ward,
          street: destination.address.street,
        },
        hotel_id: destination.hotel_id,
        hotel: destination.hotel,
        restaurant_id: destination.restaurant_id,
        restaurant: destination.restaurant,
        tags: destination.tags,
        images: destination.images,
        rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
        numOfReviews: destination.numOfReviews,
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  };

  export async function fetchAttractions() {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?is_popular=true&get_rating=true`);
      const filteredDestinations = response.data.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);

    // Chỉ map qua các destination đã lọc
      return filteredDestinations.map(destination => ({
        id: destination.id,
        name: destination.name,
        user_id: destination.user_id,
        price_bottom: destination.price_bottom,
        price_top: destination.price_top,
        age: destination.age,
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        date_create: destination.date_create,
        address: destination.address,
        images: destination.images,
        hotel_id: destination.hotel_id,
        hotel: destination.hotel,
        restaurant_id: destination.restaurant_id,
        restaurant: destination.restaurant,
        tags: destination.tags,
        rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
        numOfReviews: destination.numOfReviews,
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  };


  const generateStars = (rating) => {
    const fullStar = new URL('@/assets/star_full.svg', import.meta.url).href;
    const halfStar = new URL('@/assets/star_half.svg', import.meta.url).href;
    const emptyStar = new URL('@/assets/star_none.svg', import.meta.url).href;

    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(fullStar);
      } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  };

  return {
    fetchImages,
    heartFull,
    heartEmpty,
    fullDescription,
    getTruncatedDescription,
    getDescription,
    buttons,
    fetchEntertainments,
    generateStars
  };
}