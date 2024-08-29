import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import SignIn from '../views/Sign_In.vue';
// import SignUp from '../views/Sign_Up.vue';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/sign_up',
  //   component: SignUp,
  //   meta: {
  //     allowSignup: true,
  //   },
  // },
  {
    path: '/login',
    name: 'login',
    component: SignIn,
  },
  {
    path: '/home',
    component: HomeView,
    meta: {
      requiresAuth: true, // Protected route, requires authentication
    },
  },
  {
    path: '/batangas',
    name: 'batangas',
    component: () => import('../components/BatangasCompt.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   // Check for authentication requirement
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//   // Fetch user authentication status asynchronously (if applicable)
//   const users = await store.dispatch('checkUser'); // Assuming a dispatch action
//   const allowSignup = to.matched.some((record) => record.meta.allowSignup);
//   // const users = !store.getters.user;
//   if (requiresAuth && users) {
//     next(users ? next() : '/login');
//   } else if (allowSignup) {
//     next('/sign_up');
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  // const allowSignups = to.matched.some((record) => record.meta.allowSignup);

  if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters.user) {
    // if (!allowSignups) {
    // } else {
    //   next('/sign_up');
    //   }
    next('/login');
  } else {
    next('/home');
  }
});

export default router;

// {
//   component: HomeView,
//   beforeEnter: (to, from, next) => {
//     const auth = getAuth();
//     auth.onAuthStateChanged((logging) => {
//       if (logging) {
//         next('/home'); // User is logged in, proceed with navigation
//       } else {
//         next('/login'); // User is not logged in, redirect to login
//       }
//     });
//   },
// },

// import initializeApp from 'firebase/app';
// import firebase from 'firebase/app';
// import  'firebase/auth';
// import { getAuth } from 'firebase/auth';

// router.beforeEach((to, from, next) => {
//   const auth = getAuth();
//   const unsubscribe = auth.onAuthStateChanged((user) => {
//     // If user is logged in
//     if (user) {
//       // Check for required auth on route
//       if (to.matched.some((record) => record.meta.requiresAuth)) {
//         next('/home'); // User is logged in, proceed
//       } else {
//         next('/login');
//       }
//     } else {
//       next('/login');
//     }
//     // if (to.matched.some((record) => record.meta.requiresAuth)) {
//     //   next('/login'); // Redirect to login
//     // }
//     unsubscribe(); // Unsubscribe from listener after checking
//   });
// });

// router.beforeEach((to, from, next) => {
//   // if (getAuth.currentUser) {
//   //   next('/');
//   //   return;
//   // }
//   if (to.matched.some((record) => record.meta.requiresAuth) && !getAuth.currentUser) {
//     next('/');
//     return;
//   }
//   next();
// });
// router.beforeEach((to, from, next) => {
//   const currentUser = auth.currentUser;

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!currentUser) {
//       next('/login');
//     } else {
//       next();
//     }
//   } else if (to.path === '/login') {
//     if (currentUser) {
//       next('/');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
