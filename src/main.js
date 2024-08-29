import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // Import getAuth
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import 'boxicons/css/boxicons.min.css';

Vue.use(VueRouter);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBScv_a-EFnialQUqYzu2Ixs9g4ekxoif0',
  authDomain: 'todo-list-3ae11.firebaseapp.com',
  projectId: 'todo-list-3ae11',
  storageBucket: 'todo-list-3ae11.appspot.com',
  messagingSenderId: '35233160081',
  appId: '1:35233160081:web:a5ac4776cbe9e093199830',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app); // Initialize auth instance

// Navigation guard for authentication check
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') { // Check if route requires authentication
    if (!store.getters.user) {
      next('/login');
    }
  }
  next(); // Allow navigation if authenticated or to sign-in page
});

// Check for persisted user on app load
auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user); // Update Vuex state with user object
  } else {
    store.commit('clearUser'); // Clear user state if not authenticated
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

// Redirect to sign-in if not authenticated
// if (to.fullPath !== '/sign_up') {
//   next('/sign_up');
//   return;
// }
