<template>
  <div class="container mx-auto">
    <div class="max-w-[500px] mx-auto">
      <h2 class="page-title">Login</h2>
      <form @submit.prevent="submit">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
          for="login"
          >Login</label
        >
        <input
          type="text"
          id="login"
          v-model="form.login"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <span v-if="wrongLogin" class="text-[red] text-sm block text-right"
          >Login is incorrect</span
        >
        <br />
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
          for="password"
          >Password</label
        >
        <div class="relative">
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="button"
            class="absolute right-2 top-2"
            @click="togglePasswordVisibility"
          >
            <img
              v-if="!visiblePassword"
              @click="visiblePass"
              class="max-w-[24px] h-auto"
              src="@/assets/eye.png"
            />
            <img
              v-if="visiblePassword"
              @click="visiblePass"
              class="max-w-[24px] h-auto"
              src="@/assets/eye-hidden.png"
            />
          </button>
          <span v-if="wrongPassword" class="text-[red] text-sm block text-right"
            >Password is incorrect</span
          >
        </div>
        <button
          type="submit"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  name: "LoginView",
  components: {},
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
      visiblePassword: false,
      wrongLogin: false,
      wrongPassword: false,
    };
  },
  methods: {
    visiblePass() {
      this.visiblePassword = !this.visiblePassword;
      if (document.getElementById("password").type == "text") {
        document.getElementById("password").type = "password";
      } else {
        document.getElementById("password").type = "text";
      }
    },
    submit() {
      if (this.form.login != this.$store.state.MY_LOGIN) {
        this.wrongLogin = true;
      } else {
        this.wrongLogin = false;
      }
      if (this.form.password != this.$store.state.MY_PASSWORD) {
        this.wrongPassword = true;
      } else {
        this.wrongPassword = false;
      }
      if (
        this.form.login == this.$store.state.MY_LOGIN &&
        this.form.password == this.$store.state.MY_PASSWORD
      ) {
        this.$store.commit("login", this.form.login);
        this.toast.success("You are logged in!");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
