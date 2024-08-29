<template>
  <div class="">
    <div class="px-6 py-4 w-full rounded-2xl bg-gray-900 ">
      <h1 class="text-white text-2xl p-4">Add Employee to Projects</h1>
      <div class="flex flex-col gap-2">
        <label for="user">
          <select class="rounded-xl p-2 w-full" max="10" v-model="user" required>
            <option value="">Employee Email</option>
            <option v-for="use in users" :key="use.id"
            :value="use.email">{{ use.email }}</option>
          </select>
        </label>
        <label for="pj">
          <select class="rounded-xl p-2 w-full" max="10" v-model="pj" required>
            <option value="">Select Project Code</option>
            <option v-for="code1 in projectCodes" :key="code1.value"
            :value="code1.value">{{ code1.label }}</option>
          </select>
        </label>
        <!-- <label for="des">
          <input class="rounded-xl p-2 w-full" type="text" v-model="des"
          required placeholder="Details">
        </label>
        <label for="due">
          <input class="rounded-xl p-2 w-full" type="date" v-model="due"z
          required placeholder="due">
        </label> -->
        <button class="rounded-xl p-2 mt-2 bg-emerald-700
          text-white font-bold transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-95 hover:bg-blue-500 duration-300"
          @click="handleSubmit()" >Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore, doc, updateDoc, onSnapshot, collection,
} from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

export default {
  data() {
    return {
      users: [],
      user: '',
      pj: '',
      des: '',
      due: '',
      projectCodes: [
        { label: '2023-01-BATANGASLGU-00', value: '2023-01-BATANGASLGU-00' },
        { label: '2021-02-CABANATOAN-09', value: '2021-02-CABANATOAN-09' },
        { label: '2019-04-LEYTE-08', value: '2019-04-LEYTE-08' },
        { label: '2024-07-BORRACAY-01', value: '2024-07-BORRACAY-01' },
      ],
    };
  },
  async mounted() {
    this.db = getFirestore();
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        onSnapshot(collection(this.db, 'users'), (snapshot) => {
          this.users = [];
          snapshot.forEach((doc1) => {
            const data = doc1.data();
            data.id = doc1.id;
            data.edit = false;
            this.users.push(data);
          });
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async handleSubmit() {
      const docRef = doc(this.db, 'users', this.user);
      await updateDoc(docRef, {
        ProjectCode: this.projectCodes,
      });
      console.log('Document successfully updated!');
    },
  },
};
</script>

<!--
<style>
.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 6px;
}
.menu-items > * {
  margin-top: 40px;
}yyyty
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

span{
  color: white;
}
</style> -->
<!-- async signout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      }).catch((error) => {
  //     const errorMessage = error.message;
  //     console.error('Sign out error:', errorMessage);
  //     throw error;
  //   });
  //   this.$router.push('/');
  // },
  // logout() {
  //   const auth = getAuth();
  //   this.$store.signOut(auth).then(() => {
  //     // Redirect or perform actions upon successful logout
  //   }).catch((error) => {
  //     const errorMessage = error.message;
  //     console.error('Sign out error:', errorMessage);
  //     throw error;
  //   });
  // }, -->
<!-- <template>
  <div class="home">
    <div>
      <HelloWorld />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script> -->
