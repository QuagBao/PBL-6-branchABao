<template>
    <div class="frame-item">
        <div class="frame-image">
            <img class="img" :src="place?.images[0]?.url ? place?.images[0]?.url: '/blue-image.jpg'" alt="">
            <div class="container">
                <btn_heart class="heart" :destID="place?.id"/>
            </div> 
        </div>
        
        <div class="container-fluid frame-info d-flex flex-column justify-content-start">
            <h4>{{ place?.name }}</h4>
            <div class="frame-rating">
                <div class="rating">
                    <img v-for="(star, index) in generateStars(place?.rating)" :src="star" :key="index" class="circle-icon" />
                </div>
                <div class="reviews">
                    <p>/{{ place?.review_count }} {{place?.review_count > 1 ? 'reviews' : 'review'}} </p>
                </div>
            </div>
            <div class="frame-description d-flex align-items-start gap-3">
                <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>bling_line</title>
                    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Editor" transform="translate(-144.000000, 0.000000)" fill-rule="nonzero">
                            <g id="bling_line" transform="translate(144.000000, 0.000000)">
                                <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                                <path d="M10.077,2.61445 C10.414725,1.8547065 11.4559488,1.8167103 11.8639379,2.50048712 L11.9229,2.61445 L12.9649,4.95885 C13.8758895,7.00850053 15.3902729,8.72789543 17.3016897,9.89018275 L17.6239,10.0787 L19.4747,11.1197 C20.1230611,11.4844444 20.1590812,12.3862472 19.5827602,12.8105806 L19.4747,12.8803 L17.6239,13.9214 C15.6690053,15.0210105 14.0996795,16.6904482 13.1222832,18.702691 L12.9649,19.0412 L11.9229,21.3856 C11.58527,22.145315 10.544051,22.1833008 10.1359764,21.4995572 L10.077,21.3856 L9.03507,19.0412 C8.12411842,16.9915684 6.60968319,15.2721296 4.69823529,14.1099057 L4.37602,13.9214 L2.52521,12.8803 C1.87690556,12.51565 1.84087972,11.6138525 2.41715777,11.1894352 L2.52521,11.1197 L4.37602,10.0787 C6.33094316,8.97901368 7.90032427,7.3096169 8.87769233,5.2973616 L9.03507,4.95885 L10.077,2.61445 Z M11,5.46224 C9.75577,8.26169 7.71421,10.4956 5.03971,12 C7.71421,13.5044 9.75577,15.7384 11,18.5378 C12.2475,15.7308 14.29,13.5021 16.9602,12 C14.2857,10.4956 12.2442,8.26169 11,5.46224 Z M19.2205,2.12106 C19.719,3.24286 20.5603,4.19019 21.6347,4.79454 C21.7949,4.88467 21.7949,5.11536 21.6347,5.20549 C20.5603,5.80984 19.719,6.75718 19.2205,7.87897 C19.1356,8.07 18.8644,8.07 18.7795,7.87897 C18.281,6.75717 17.4397,5.80984 16.3653,5.20549 C16.2051,5.11536 16.2051,4.88467 16.3653,4.79454 C17.4397,4.1902 18.281,3.24286 18.7795,2.12106 C18.8644,1.93003 19.1356,1.93003 19.2205,2.12106 Z" id="形状" fill="#13357B"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                <div class="description">
                    <p class="text-break" style="max-width: 450px;">
                        {{ place?.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import generate_ratingViewModel from '@/components/viewModels/generate_ratingViewModel';
const { generateStars } = generate_ratingViewModel();
</script>
<script>
import btn_heart from '../../btn_heart.vue';
export default {
    name: "Saved_Item",
    components: {
        btn_heart
    },
    props: {
        place: Object
    }
}
</script>

<style scoped>
.frame-item {
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 15px;
    transition: 0.7ms ease-in-out;
}
.frame-item:hover {
    cursor: pointer;
    transition: 0.7ms ease-in-out;
    transform: translateY(-5px);
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    border-radius: 15px;
}
.frame-image {
    display: flex;
}
.img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}
.heart {
    margin-left: -82px;
    margin-top: 10px;
}
.frame-info {
    color:#13357B;
    border-bottom: 1px solid #13357B;
    margin-bottom: 10px;
}
h4 {
    background-color: #D7DAF9;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 600;
    width: fit-content;
}
.frame-rating {
    display: flex;
    gap: 10px;
    font-size: 20px;
    margin-top: -5px;
}
.frame-rating img {
    width: 20px;
    height: 20px;
}
.reviews {
        margin-top: 3px;
}
.frame-tags{
    margin-top: -10px;
}
.frame-description svg {
    width: 54.3px;
    height: 30px;
}
.frame-description{
    margin-top: 10px;
}
.rating-stars{
    display: flex;
    gap: 3px;
}
.circle-icon{
    width: 20px;
    height: 20px;
}
</style>