<template>
  <nav class="flex items-center gap-4 items-center justify-center">
    <router-link v-if="$store.state.email" to="/create-test"
      >Create test</router-link
    >
    <router-link v-if="$store.state.email" to="/edit-test"
      >Edit tests</router-link
    >
    <router-link v-if="$store.state.email" to="/new-test"
      >Start test</router-link
    >
    <router-link v-if="$store.state.email" to="/create-student"
      >Create student</router-link
    >
    <router-link v-if="$store.state.email" to="/list-of-students"
      >List of students</router-link
    >
    <router-link v-if="!$store.state.email" to="/login">Login</router-link>
    <a
      class="cursor-pointer duration-300 hover:text-green-500"
      v-if="$store.state.email"
      @click="logout"
      >Log out</a
    >
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    transition-duration: 300;
    &:hover {
      @apply text-green-500;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  name: "AppRoot",
  components: {},
  methods: {
    logout() {
      this.$store.commit("logout");
      this.toast.info("You're logged out");
    },
  },
  mounted() {
    this.$store.commit("initStore");
  },
};
</script>
