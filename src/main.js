import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Configure axios
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("API Base URL:", axios.defaults.baseURL);
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Toast configuration
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);
app.mount("#app");
