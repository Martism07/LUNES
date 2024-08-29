<template>
    <div class="sign_up font-serif">
      <div class="box-border gap-4 px-10 mt-32">
        <div class="flex justify-center">
          <div class=" bg-slate-200
            w-96 shadow-2xl rounded-3xl p-4">
            <div class="bg-slate-100 mx-14 mb-7 mt-5 shadow-2xl h-10 w-64 rounded-3xl">
              <div class="bg-gray-800 rounded-2xl
              text-white ">
                <h1 class="font-bold text-2xl ">Create a Account</h1>
              </div>
            </div>
            <label for="email">
                <input class="rounded-xl p-2 w-48"
                type="text" placeholder="Email" v-model="email"/>
            </label><br><br>
            <label for="pass">
                <input class="rounded-xl p-2 w-48"
                type="password" placeholder="Password" v-model="password"/>
            </label><br><br>
            <button class="bg-slate-300 hover:bg-slate-400 rounded-3xl px-3"
            @click="register">Submit</button>
            <br><br>
          </div>
          <!-- <button @click="signInWithGoogle">Sign In With Google</button> -->
        </div>
      </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import router from 'vue-router';

export default {
  data() {
    return {
      db: '',
      email: '',
      password: '',
    };
  },
  async mounted() {
    this.db = getFirestore();
  },
  methods: {
    async register() {
      const auth = getAuth();
      try {
        // Create user with email and password
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        // console.log(userCredential);
        alert('Successfully');
        // this.$router.push('/login');
      } catch (error) {
        // Handle sign-up errors
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign up error:', errorMessage);
        throw error; // Rethrow the error to handle it outside this function
      }
    },
  },
};
</script>
