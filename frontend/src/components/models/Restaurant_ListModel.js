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
    const fullCircle = new URL('@/assets/svg/circle-full.svg', import.meta.url).href;
    const halfCircle = new URL('@/assets/svg/circle-half.svg', import.meta.url).href;
    const emptyCircle = new URL('@/assets/svg/circle-none.svg', import.meta.url).href;

    let circles = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
        circles.push(fullCircle);
        } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
            circles.push(halfCircle);
        } else {
            circles.push(emptyCircle);
        }
    }
    return circles;
  };

  return {
    heartFull,
    heartEmpty,
    
    buttons,
    fetchEntertainments,
    generateStars
  };
}