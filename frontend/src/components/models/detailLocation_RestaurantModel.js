import axios from 'axios';

export class RatingModel {
    constructor(excellent, veryGood, medium, bad, terrible) {
        this.excellent = excellent;
        this.veryGood = veryGood;
        this.medium = medium;
        this.bad = bad;
        this.terrible = terrible;
    }

    // Tính tổng số đánh giá
    getTotal() {
        return (
            this.excellent + this.veryGood + this.medium + this.bad + this.terrible
        );
    }

    // Tính phần trăm cho mỗi loại đánh giá
    getPercentage(value) {
        return ((value / this.getTotal()) * 100).toFixed(2);
    }

    // Tính tổng rating
    getAverageRating() {
        const total =
            this.excellent * 5 +
            this.veryGood * 4 +
            this.medium * 3 +
            this.bad * 2 +
            this.terrible;
        return (total / this.getTotal()).toFixed(1);
    }
}

export class Comment {
    constructor(personalImage, user, rating, title, day, comment, picture) {
        this.personalImage = personalImage;
        this.user = user;
        this.rating = rating;
        this.title = title;
        this.day = day;
        this.comment = comment;
        this.picture = picture;
    }
}

export class ImageModel {
    constructor(id, imageUrl) {
        this.id = id; // ID của hình ảnh
        this.imageUrl = imageUrl; // Đường dẫn hình ảnh
    }

    // Phương thức lấy hình ảnh
    static async fetchImages() {
        try {
            const response = await axios.get('http://localhost:3000/images');
            return response.data.map(image => new ImageModel(image.id, image.imageUrl));
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }
}


export async function getRestaurantById(restaurantID) {
    try {
      const response = await axios.get(
        `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurantID}`
      );
  
      const restaurant = response.data;
      return {
        id: restaurant.id,
        name: restaurant.name,
        price_bottom: restaurant.price_bottom,
        price_top: restaurant.price_top,
        age: restaurant.age,
        opentime: restaurant.opentime,
        duration: restaurant.duration,
        description: restaurant.description,
        date_create: restaurant.date_create,
        address: restaurant.address,
        images: restaurant.images,
        restaurant_id: restaurant.restaurant_id,
        restaurant: restaurant.restaurant,
      };
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      return []; // Hoặc bạn có thể xử lý khác tùy ý
    }
  }

  
export const mockComments = [
    new Comment(
        new URL('@/assets/svg/personal.svg', import.meta.url).href,
        'Linh L',
        3,
        'Chuyến đi chơi siêu đáng iu',
        'August 2024',
        'That interesting place to do',
        ''
    ),
    new Comment(
        new URL('@/assets/images/ava.png', import.meta.url).href,
        'Dương L',
        5,
        'Chuyến đi chơi hấp dẫn',
        'August 2024',
        'Riding a motorbike late at night on the lake is quite fun. That interesting place to do',
        new URL('@/assets/images/background_picture.png', import.meta.url).href
    ),
];
