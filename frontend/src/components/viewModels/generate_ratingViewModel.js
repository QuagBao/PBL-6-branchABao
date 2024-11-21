import { ref, computed, onMounted } from 'vue';
export default function () {
    class RatingModel {
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
    const ratingModel = new RatingModel(3422, 2122, 5622, 2100, 300);
    const generateStars = (rating) => {
        const fullStar = new URL('@/assets/svg/star_full.svg', import.meta.url).href;
        const halfStar = new URL('@/assets/svg/star_half.svg', import.meta.url).href;
        const emptyStar = new URL('@/assets/svg/star_none.svg', import.meta.url).href;
    
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
    
      // Tạo danh sách hình tròn
      const generateCircle = (rating) => {
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
      const stars = ref(generateStars(ratingModel.getAverageRating()));
  const circles = ref(generateCircle(ratingModel.getAverageRating()));

  // Tính tỷ lệ phần trăm cho mỗi loại đánh giá
  const ratings = {
    'Excellent': {
      count: ratingModel.excellent,
      percentage: ratingModel.getPercentage(ratingModel.excellent),
    },
    'Very Good': {
      count: ratingModel.veryGood,
      percentage: ratingModel.getPercentage(ratingModel.veryGood),
    },
    'Medium': {
      count: ratingModel.medium,
      percentage: ratingModel.getPercentage(ratingModel.medium),
    },
    'Bad': {
      count: ratingModel.bad,
      percentage: ratingModel.getPercentage(ratingModel.bad),
    },
    'Terrible': {
      count: ratingModel.terrible,
      percentage: ratingModel.getPercentage(ratingModel.terrible),
    },
  };

  const rating = ref(ratingModel.getAverageRating());
  const totalRating = ref(ratingModel.getTotal());

      return {
        generateStars,
        generateCircle,
        stars,
        circles,
        rating,
        ratings,
        totalRating,
      }
}