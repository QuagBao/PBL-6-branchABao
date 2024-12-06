<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div>

    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid frame-list">
                        <div class="frame-filter">
                            <Filter/>
                        </div>
                        <div class="frame-list-items">
                            <Tour_Item/>
                            <Tour_Item/>
                            <Tour_Item/>
                            <Tour_Item/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../Header.vue';
import Top_Button from '../../Top_Button.vue';
import Scroll_Bar_Component from '../../Scroll_Bar_Component.vue';
import Filter from './Filter.vue';
import Tour_Item from './Tour_Item.vue';
export default {    
    name: "List_Tour",
    components: {
        Header, Top_Button, Filter, Tour_Item
    }
}
</script>



<style scoped>
.frame-list {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 20% 75%;
    gap: 100px;
}
.frame-list-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 60px;
    margin-bottom: 30px;
}

</style>