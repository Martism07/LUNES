<template>
  <div class="sign_in font-serif w-full h-full">
    <nav class="flex justify-center">
      <div class="bg-slate-100 rounded-3xl w-[62rem] h-23">
        <div class="bg-gray-800 m-2 rounded-2xl text-white p-4 w-[61rem]">
          <div class="pt-2 text-3xl font-serif font-extrabold">
            Project Management Tool
          </div>
        </div>
      </div>
    </nav>
    <template v-if="signups">
      <div class="box-border gap-4 px-10 mt-16">
        <div class="flex justify-center">
          <div class=" bg-slate-200
            w-96 shadow-inner rounded-3xl p-4">
            <div class="bg-slate-100 mx-14 mb-7 mt-5 shadow-2xl h-10 w-64 rounded-3xl">
              <div class="bg-gray-800 rounded-2xl mb-5 mt-3
              text-white ">
                <h1 class="font-bold text-2xl ">Sign In</h1>
              </div>
            </div>
            <form @submit.prevent="register">
              <label for="email">
                <input class="rounded-xl p-2 w-48" type="text"
                placeholder="Email" v-model="email" required/>
              </label><br><br>
              <label for="pass">
                <input class="rounded-xl p-2 w-48" type="password" placeholder="Password"
                v-model="password" required/>
              </label><br><br>
              <button class="bg-slate-300 hover:bg-slate-400 rounded-3xl px-3"
              type="submit">Submit</button>
            </form>
            <br><br>
            <div class="p-6">
              <b>Create an account?</b>
              <!-- <a href="./views/Sign_Up.vue"
              class="underline hover:decoration-2">Sign Up</a> -->
              <button class="underline hover:decoration-2"
              @click="signUp">Sign Up</button>
            </div>
          </div>
          <!-- <button @click="signInWithGoogle">Sign In With Google</button> -->
        </div>
      </div>
    </template>
    <template v-else>
      <div class="box-border gap-4 px-10 mt-16">
        <div class="flex justify-center">
          <div class=" bg-slate-200
            w-96 shadow-2xl rounded-3xl p-4">
            <button class='bx bx-arrow-back text-2xl'
            @click="signUp"></button>
            <div class="bg-slate-100 mx-14 mb-7 mt-5 shadow-2xl h-10 w-64 rounded-3xl">
              <div class="bg-gray-800 rounded-2xl
              text-white ">
                <h1 class="font-bold text-2xl ">Create a Account</h1>
              </div>
            </div>
            <form @submit.prevent="register2">
              <label for="Fname">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="First Name"
                  v-model="fname" required/>
              </label><br><br>
              <label for="mname">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="Middle Initial"
                  v-model="mname" required/>
              </label><br><br>
              <label for="lname">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="Last Name"
                  v-model="lname" required/>
              </label><br><br>
              <label for="projectCodes">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="Null"
                  v-model="projectCodes" readonly/>
              </label><br><br>
              <label for="status">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="Employee"
                  v-model="status" readonly/>
              </label><br><br>
              <label for="email">
                  <input class="rounded-xl p-2 w-48" type="text" placeholder="Email"
                  v-model="email2" required/>
              </label><br><br>
              <label for="password2">
                  <input class="rounded-xl p-2 w-48" type="password" placeholder="Password"
                  v-model="password2" required/>
              </label><br><br>
              <button class="bg-slate-300 hover:bg-slate-400 rounded-3xl px-3"
              type="submit">Submit</button>
            </form>
            <br><br>
          </div>
          <!-- <button @click="signInWithGoogle">Sign In With Google</button> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { useStore } from 'vuex';

export default {
  data() {
    return {
      db: '',
      email: '',
      password: '',
      fname: '',
      mname: '',
      lname: '',
      projectCodes: ['null'],
      status: 'Employee',
      email2: '',
      password2: '',
      signups: 'true',
    };
  },
  async mounted() {
    this.db = getFirestore();
  },
  methods: {
    async register() {
      this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password,
      });
    },
    async signUp() {
      this.signups = !this.signups;
    },
    async register2() {
      const usersMessage = {
        FirstName: this.fname,
        MiddleI: this.mname,
        LastName: this.lname,
        ProjectCode: this.projectCodes,
        Status: this.status,
        email: this.email2,
        password: this.password2,
      };
      this.$store.dispatch('signupUser', {
        email: this.email2,
        password: this.password2,
        db: this.db,
        newuser: usersMessage,
      });
    },
  },
};
</script>

<!-- <style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->

<!-- // const auth = getAuth();
// const gar = await signInWithEmailAndPassword(auth, this.email, this.password);
// console.log(gar); -->
<!-- // .then(() => {
//   this.$router.push('/');
// }).catch((error) => {
//   switch (error.code) {
//     case 'auth/user-not-found':
//       alert('User not found');
//       break;
//     case 'auth/wrong-password':
//       alert('Wrong password');
//       break;
//     default:
//       alert('Something went wrong');
//   }
// });
//   commit('SET_USER', auth.currentUser); -->
