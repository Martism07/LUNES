import {
  getAuth, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Vue from 'vue';
import Vuex from 'vuex';
// import initializeApp from 'firebase/app';
// import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logging: false,
    user: null,
    error: null,
  },
  mutations: {
    setUser(state, user1) {
      state.user = user1;
      state.logging = true;
      state.error = null;
    },
    clearUser(state) {
      state.logging = false;
      state.user = null;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async checkUser({ commit }) {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('clearUser');
        }
      });
    },
    async loginUser({ commit }, { email, password }) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user1 = userCredential.user;
        commit('setUser', user1);
        localStorage.setItem('user', JSON.stringify(user1));
      } catch (error) {
        commit('setError', error.message); // Set error message in state
        switch (error.code) {
          case 'auth/invalid-credential':
            alert('Wrong password or Username');
            break;
          default:
            alert('Something went wrong');
        }
      }
    },
    async signupUser({ commit }, {
      email, password, db, newuser,
    }) {
      try {
        const auth = getAuth();
        const newUserLog = await createUserWithEmailAndPassword(auth, email, password);
        if (newUserLog.user) {
          await addDoc(
            collection(
              db,
              'users',
            ),
            newuser,
          );
          alert('Successfull');
        } else {
          alert('UnSuccessfull');
        }
        await signOut(auth);
        commit('clearUser');
        localStorage.removeItem('user');
      } catch (error) {
        commit('setError', error.message);
      }
    },
    async logout({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearUser');
      localStorage.removeItem('user');
    },
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
    logging: (state) => state.logging,
  },
});

// setloggingIn(state, logging) {
//   state.logging = logging;
// },
// commit('setloggingIn', false);

// auth.onAuthStateChanged((user2) => {
//   if (user2 === null) {
//     commit('clearUser');
//   } else {
//     commit('setUser', user2);
//     if (router.isReady() && router.currentRoute.value.path === '/login') {
//       this.$router.push('/login');
//     }
//   }
// });
// async signIn({ commit }, { email, password }) {
//   const userCredential =
//   await initializeApp.auth().signInWithEmailAndPassword(email, password);
//   const { user } = userCredential.user;
//   commit('setUser', user);
//   return user;
// },
// async signOut({ commit }) {
//   await initializeApp.auth().signOut();
//   commit('clearUser');
// },
// async autoSignIn({ commit }, user) {
//   commit('setUser', user);
// },

// modules: {
// },
