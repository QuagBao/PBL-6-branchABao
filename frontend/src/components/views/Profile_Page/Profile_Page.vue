<template>
    <div class="header-container">
        <Header/>
        <Top_Button/>
    </div>

    <div class="info-user">
        <div class="cover-photo">
            <img src="@/assets/images/bg.webp" alt="Cover Photo" class="img-fluid"/>
        </div>
        <div class="avatar">
            <img :src="userInfo?.user_info?.image ? userInfo.user_info.image.url : '/blue-image.jpg'" alt="Avatar" class="ava"/>
        </div>
        <div class="cover-button-photo">
            <Cover_photo_btn></Cover_photo_btn>
        </div>
        <div class="change-ava">
            <Icon></Icon>
        </div>
        <div class="infor-user">
            <Info_User :username = "userInfo.username"
                        :gmail = "userInfo.gmail"/>
        </div>
    </div>
    <div class="main-content">
        <div class="group-tag">
            <Group_tag @change-tab="handleTabChange"></Group_tag>
        </div>
        
        <div class="content-1">
            <component :is="currentComponent"></component>
        </div>
    </div>
    
</template> 

<script>
    import ProfileViewModel from '@/components/viewModels/Profile_Page_ViewModel/profilePage_ViewModel';

    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue'; 
    import Top_Button from '../Top_Button.vue';
    import Cover_photo_btn from './Cover_photo_btn.vue';
    import Icon from './Icon.vue';
    import Info_User from './Info_User.vue';
    import Group_tag from './Group_tag.vue';
    import Trips_Profile from './Trips_Profile.vue';
    import Favourite_Profile from './Favourite_Profile.vue';
    import Setting_Profile from './Setting_Profile.vue';
    import Reviews_Profile from './Reviews_Profile.vue';

    
    export default {
        name: "Profile_Page",
        components: {
            Header, Scroll_Bar_Component, Top_Button, Cover_photo_btn, Icon,
            Info_User, Group_tag, Reviews_Profile,
            Trips_Profile, Favourite_Profile, Setting_Profile
        },
        data () {   
            return {
                viewModel: new ProfileViewModel(), // Quản lý danh sách tab
                currentComponent: 'Trips_Profile', // Component mặc định
                userInfo: {
                    username: '',
                    gmail: '',
                    dateJoined: '',
                    location: '',
                    user_info: {},
                },
            };
        },
        async created() {
            await this.viewModel.loadUserInfo();
            this.userInfo = this.viewModel.getUserInfo();
        },
        methods: {
            handleTabChange(tabName) {
                console.log('Tab Name:', tabName);
                this.viewModel.changeTab(tabName); // Thay đổi tab mà không duyệt danh sách
                this.currentComponent = this.viewModel.getCurrentComponent(); // Cập nhật component hiển thị
                console.log('Current Component:', this.currentComponent);
            },
        },
    }
</script>
<style>
*,*::before,*::after{
    box-sizing: border-box;
}
body{
    background-color: #EDF6F9;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
}

.header-container {
    display: flex;
    flex-direction: column; /* Sắp xếp theo chiều dọc */
    z-index: 1;
    width: 100vw;
}

.info-user { 
    width: 100vw;
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.info-user .cover-photo {
    display: flex;
    align-items: center;
}

.info-user .cover-photo img {
    border-radius: 20px;
    width: 80vw;
    height: 420px;
    object-fit: cover;
    z-index: 1;
}

.avatar {
    display: flex;
    margin-top: -180px;
    margin-left: -1000px;
    height: 250px;
    width: 250px;
    border-radius: 50%;
    background-color: #EDF6F9;
    z-index: 15;
}
.ava {
    height: 240px;
    width: 240px;
    border-radius: 50%;
    object-fit: cover;
    transform: translate(5px, 5px); 
    z-index: 15;
}

.cover-button-photo {
    display: inline;
    margin-top: -150px;
    margin-left: 1100px;
    z-index: 15;
}
.change-ava {
    display: flex;
    margin-top: 20px;
    margin-left: -850px;
    z-index: 15;
}
.infor-user {
    display: flex;
    margin: -20px 0 -50px 20px;    
    z-index: 15;
}
.main-content {
    width: 90vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Căn giữa theo trục dọc */
    align-items: center;    /* Căn giữa theo trục ngang */
    padding: 20px;
    margin: 0 auto;         /* Đảm bảo căn giữa theo chiều ngang trong trường hợp container không chiếm toàn bộ không gian */
}
.group-tag {
    margin-top: -20px;
    padding: 20px;
    width: 90vw;
}
.content-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>