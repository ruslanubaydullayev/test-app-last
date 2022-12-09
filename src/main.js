import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import "./main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
createApp(App).use(store).use(router).use(Toast).use(vuetify).mount("#app");
