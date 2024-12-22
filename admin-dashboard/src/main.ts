import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

app.use(VueApexCharts);
app.mount("#app");
