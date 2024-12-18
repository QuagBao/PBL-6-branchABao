<template>
    <div class="container-fluid top-rating">
        <div class="container-fluid name-of-table">
            <h4>Top Ratings</h4>
        </div>
        <table class="table table-responsive">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th class="location-col">Location</th>
                    <th>Rating</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img class="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" alt=""></td>
                    <td>Doe</td>
                    <td class="location">31 Hoang Hoa Tham, Hoa Khe, Thanh Khe, Da Nang</td>
                    <td>4.6</td>
                    <td>
                        <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td><img class="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(22).jpg" alt=""></td>
                    <td>Doe</td>
                    <td class="location">31 Hoang Hoa Tham, Hoa Khe, Thanh Khe, Da Nang</td>
                    <td>4.6</td>
                    <td>
                        <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td><img class="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg" alt=""></td>
                    <td>Doe</td>
                    <td class="location">31 Hoang Hoa Tham, Hoa Khe, Thanh Khe, Da Nang</td>
                    <td>4.6</td>
                    <td>
                        <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td><img class="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg" alt=""></td>
                    <td>Doe</td>
                    <td class="location">31 Hoang Hoa Tham, Hoa Khe, Thanh Khe, Da Nang</td>
                    <td>4.6</td>
                    <td>
                        <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td><img class="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" alt=""></td>
                    <td>Doe</td>
                    <td class="location">31 Hoang Hoa Tham, Hoa Khe, Thanh Khe, Da Nang</td>
                    <td>4.6</td>
                    <td>
                        <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
</script>

<style scoped>
.top-rating h4{
    color: #13357B;
    font-weight: 900;
    margin-bottom: 20px;
}
tbody {
    max-height: 200px ;
}
th {
    border-color: #13357B !important;
    color: #13357B;
    background-color: #8ECAE6 !important;
    text-align: center; 
    padding: .5rem 1.5rem;
    font-weight: 900 !important;
}
tr {
    vertical-align: middle !important;
    text-align: center !important;
    border-color: rgba(19, 53, 123, 0.4) !important;
}
td {
    color: #13357B !important;
    background-color: #EDF6F9 !important;
}
.location {
    text-align: left !important;
}
.img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
}
.svg{
    stroke: #13357B;
}
.svg:hover {
    stroke: #8ECAE6;
    cursor: pointer;
}
</style>