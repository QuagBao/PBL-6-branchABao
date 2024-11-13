<template>
    <div class="container-fluid topper">
        <div class="row">
            <div class="text-center text-lg-start">
                <div class="d-inline-flex align-items-center row" style="height: 50px; padding: 0 10px;">
                    <button v-for="button in buttons" :key="button.key" class="col me-3">
                        {{ button.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@fortawesome/fontawesome-free/css/all.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
import topButton_ViewModel from '../viewModels/topButton_ViewModel';
    export default {
        name: "Top_Button",
        props: {
            name: String
        },
        setup(props){
            const { buttons } = topButton_ViewModel(props.name);
            
            return {
                buttons
            }
        }
    }
</script>
<style scoped>
.container-fluid {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #13357B;
    background-color: #EDF6F9;
    z-index: 99;
}
.topper {
    margin-top: 90px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #13357B;
    z-index: 99;
}

.topper{
    padding-top: 20px;
    padding-bottom: 5px;
}
.topper button {
    position: relative;
    color: #13357B;
    padding: 6px 20px;
    border: none;
    width: 200px;
    background-color: transparent;
}

.topper button:hover {
    color: #EDF6F9;
    background-color: #13357B;
    border-radius: 10px;
}


.topper button:focus {
    outline: none; /* Loại bỏ đường viền focus mặc định */
}

.topper button:focus::after {
    content: "";
    position: absolute;
    bottom: -13.75px; /* Điều chỉnh khoảng cách từ nút đến đường viền */
    left: 0;
    right: 0;
    height: 3px;
    background-color: #13357B;
    border-radius: 1px; /* Bo tròn hai đầu của đường viền dưới */
}

.topper button.active {
    content: "";
    position: absolute;
    bottom: -13.75px; /* Điều chỉnh khoảng cách từ nút đến đường viền */
    left: 0;
    right: 0;
    height: 3px;
    background-color: #13357B;
    border-radius: 1px; /* Bo tròn hai đầu của đường viền dưới */
}

</style>