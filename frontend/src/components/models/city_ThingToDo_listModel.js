import axios from 'axios';
export default function () {
  
  const heartFull = new URL('@/assets/heart-full.svg', import.meta.url).href;
  const heartEmpty = new URL('@/assets/heart-none.svg', import.meta.url).href;
  
  

  const buttons = ['Drink', 'Museum', 'Outdoor', 'Adventure', 'Beach', 'Hotel', 'Food', 'F&B', 'Movie'];

  const fetchEntertainments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/entertainments');
      return response.data.map(entertainment => ({
        id: entertainment.id,
        name: entertainment.name,
        reviewNumber: entertainment.reviewNumber,
        tag: entertainment.tag,
        rating: entertainment.rating,
        description: entertainment.description,
        imageUrl: entertainment.imageUrl,
      }));
    } catch (error) {
      console.error('Error fetching entertainments:', error);
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
    heartFull,
    heartEmpty,
    
    buttons,
    fetchEntertainments,
    generateStars
  };
}