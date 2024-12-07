<template>
    <div class="schedule">
        <h3>Itineray</h3>
        <div class="itinerary">
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>You'll get picked up</p>
                    <span>Pass by Da Nang</span>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>Hai Van Pass</p>
                    <span>Stop: 15 minutes</span>
                    <div class="infor-location">
                        <Schedule_Item/>
                        <span>Chỉ hiển thị khi bấm see details & photos</span>
                    </div>
                    <button class="read-more-or-less">See less</button>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>Lap An Lagoon</p>
                    <span>Stop: 20 minutes</span>
                    <button class="read-more-or-less">See details & photo</button>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>Thien Mu Pagoda</p>
                    <span>Stop: 60 minutes</span>
                    <button class="read-more-or-less">See details & photo</button>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>Tomb of Khai Dinh</p>
                    <span>Stop: 60 minutes</span>
                    <button class="read-more-or-less">See details & photo</button>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>Hue Imperial City (The Citadel)</p>
                    <span>Stop: 90 minutes</span>
                    <button class="read-more-or-less">See details & photo</button>
                </div>
            </div>
            <div class="location">
                <svg width="30" fill="#13357B" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 56.3 (81716) - https://sketch.com -->
                    <circle cx="15" cy="15" r="5"/>
                </svg>
                <div class="detail-location">
                    <p>You'll return to the starting point</p>
                    <span>Stop: 15 minutes</span>
                    <button class="read-more-or-less">See details & photo</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Info_Card from '../../Things_To_Do/Info_Card.vue';
import Schedule_Item from './Schedule_Item.vue';
export default {
    name: "Schedule",
    components: {
        Info_Card, Schedule_Item
    }
}
</script>

<style scoped>
.schedule {
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 5px 30px rgba(19, 53, 123, 0.2);
}
h3 {
    font-weight: 900;
}
.itinerary{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.location {
    display: grid;
    grid-template-columns: 10% 90%;
}
.location p {
    font-weight: 900;
    font-size: 20px;
}
.detail-location {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
}
.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    margin-left: -0.5%;
    font-size: 15px;
    font-weight: 700;
    appearance: none;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
    width: fit-content;
    margin-left: -8px;
}
.read-more-or-less:hover{
    color: #729AE9;
}
</style>