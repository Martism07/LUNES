<template>
    <div class="batangas">
        <div class="px-6 py-4 w-full rounded-2xl bg-gray-900 ">
            <h1 class="text-white text-2xl p-4">To-Do</h1>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
                <label for="title">
                    <input class="rounded-xl p-2 w-full" type="text"
                    v-model="title" placeholder="Title" required>
                </label>
                <label v-for="item1 in users" :key="item1.id" for="pj">
                  <template v-if="item1.Status === Admin">
                    <select class="rounded-xl p-2 w-full" max="10" v-model="pj" required>
                      <option value="">Select Project Code</option>
                      <option v-for="code1 in projectCodes1" :key="code1"
                      :value="code1.value">{{ code1.label }}</option>
                    </select>
                  </template>
                  <template v-else>
                    <select class="rounded-xl p-2 w-full" max="10" v-model="pj" required>
                      <option value="">Select Project Code</option>
                      <option v-for="code1 in projectCodes" :key="code1"
                      :value="code1">{{ code1 }}</option>
                    </select>
                  </template>
                </label>
                <label for="details">
                    <input class="rounded-xl p-2 w-full" type="text"
                    v-model="des" placeholder="Details" required>
                </label>
                <label for="due">
                    <input class="rounded-xl p-2 w-full" type="date"
                    v-model="due" placeholder="due" required>
                </label>
                <button class="rounded-xl p-2 mt-2 bg-emerald-700
                text-white font-bold transition ease-in-out delay-150
                hover:-translate-y-1 hover:scale-95 hover:bg-blue-500 duration-300"
                type="submit">Add</button>
            </form>
        </div>
    </div>
</template>

<script>
import {
  getFirestore, addDoc, collection, onSnapshot,
} from 'firebase/firestore';

export default {
  data() {
    return {
      db: '',
      title: '',
      pj: '',
      des: '',
      due: '',
      users: [],
      user1: '',
      Admin: 'Admin',
      projectCodes: [],
      projectCodes1: [
        { label: '2023-01-BATANGASLGU-00', value: '2023-01-BATANGASLGU-00' },
        { label: '2021-02-CABANATOAN-09', value: '2021-02-CABANATOAN-09' },
        { label: '2019-04-LEYTE-08', value: '2019-04-LEYTE-08' },
        { label: '2024-07-BORRACAY-01', value: '2024-07-BORRACAY-01' },
      ],
    };
  },
  mounted() {
    this.db = getFirestore();
    this.fetchdata();
  },
  methods: {
    async handleSubmit() {
      try {
        const userMessage = {
          title: this.title,
          pj: this.pj,
          des: this.des,
          due: this.due,
          edit: false,
        };
        await addDoc(
          collection(
            this.db,
            'todos',
          ),
          userMessage,
        );
        this.title = '';
        this.des = '';
        this.pj = '';
        this.due = '';
        alert('Successfully');
      } catch (error) {
        // Handle sign-up errors
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Add to do error:', errorMessage);
        throw error; // Rethrow the error to handle it outside this function
      }
    },
    async fetchdata() {
      try {
        // console.log(use);
        const querySnapshot1 = collection(this.db, 'users');
        onSnapshot(querySnapshot1, (snapshot1) => {
          this.users = [];
          this.projectCodes = [];
          snapshot1.forEach((doc2) => {
            const data1 = doc2.data();
            data1.id = doc2.id;
            const use = this.$store.state.user;
            this.user1 = use.email;
            // console.log(this.user1);
            const realUser = this.user1;
            if (realUser === data1.email) {
              this.users.push(data1);
              const pjcd = data1.ProjectCode;
              pjcd.forEach((cd) => {
                this.projectCodes.push(cd);
              });
            }
          });
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
  },
};
</script>
