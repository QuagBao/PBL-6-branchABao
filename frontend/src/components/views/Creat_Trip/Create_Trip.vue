<template>
    <div class="container-fluid">
        <Page_1/>
    </div>
</template>

<script>
import Form_Search from '../Form_Search.vue';
import Page_1 from './Page_1.vue';
export default {
    name: "Create_Trip",
    components: {
        Form_Search, Page_1
    }
}
</script>
