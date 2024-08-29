<template>
  <div id="app">
    <div class="bgbody bg-cover box-border h-lvh p-2 ">
      <!-- <router-view v-else></router-view> -->
      <div class=" w-full h-full" v-if="logging1">
        <home/>
      </div>
      <div class="w-full h-full" v-else>
        <login/>
      </div>
    </div>
  </div>
</template>

<script>
// import { onBeforeMount } from 'vue';
// import { getFirestore } from 'firebase/firestore';
import { mapGetters } from 'vuex';
import home from './views/HomeView.vue';
import login from './views/Sign_In.vue';

export default {
  components: {
    home,
    login,
  },
  computed: {
    ...mapGetters({
      logging1: 'logging',
    }),
  },
};
</script>

<!-- <nav>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
</nav> -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  ;
}
body {
  box-sizing: border-box;
}
.bgbody {
  background-image: url("./images/lone-tree.jpg");
  /* background-size: 100%; */
}
</style>

<!-- // data() {
//   return {
//     db: '',
//   };
// },
// async mounted() {
//   this.db = getFirestore();
// },
//   user() {
//     return this.$store.state.user;
//   },
// }, -->

<!-- nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} -->
