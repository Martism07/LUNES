<template>
  <div class="Sidebar mt-100 mx-10">
    <div class="mt-5 pt-2 text-center bg-gray-800 rounded-3xl">
      <div v-for="item in users" :key="item.id">
        <center>
          <h1 v-if="item.email === user1"
            class="text-white font-bold pb-3">
            {{ item.FirstName }} {{ item.MiddleI }} {{ item.LastName }} | {{ item.Status }}
            <hr class="w-10/12 rounded-3xl">
          </h1>
        </center>
      </div>
    </div>
    <div v-for="item in users" :key="item.id" class="menu-items align-middle" >
      <div v-if="item.email === user1">
        <div v-if="item.Status === ProjectManager" >
          <AddToDo />
        </div>
        <!-- <div v-if="item.Status === ProjectManager">
          <AddProject />
        </div> -->
        <div v-if="item.Status === Admin">
          <AddProject v-if="change" />
          <AddToDo v-else/>
          <button v-if="!change" class="rounded-xl mt-5 p-2 bg-emerald-700
          text-white font-bold transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300"
          @click="changeMe()">Add Project</button>
          <!-- <button v-if="!change" class="rounded-xl mt-5 p-2 bg-emerald-700
          text-white font-bold transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300"
          @click="empToPro()">Add Emp to Project</button> -->
          <button v-else class="rounded-xl mt-5 p-2 bg-emerald-700
          text-white font-bold transition ease-in-out delay-150
          hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300"
          @click="changeMe()">Add ToDo</button>
        </div>
        <div>
          <EmpToProject/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore, collection, onSnapshot,
} from 'firebase/firestore';
import AddProject from './AddProject.vue';
import AddToDo from './AddToDo.vue';
import EmpToProject from './EmpToProject.vue';

export default {
  components: {
    AddProject,
    AddToDo,
    EmpToProject,
  },
  data() {
    return {
      Employee: 'Employee',
      ProjectManager: 'Project Manager',
      Admin: 'Admin',
      users: [],
      user1: '',
      change: 'false',
    };
  },
  async mounted() {
    this.db = getFirestore();
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      try {
        // console.log(use);
        const querySnapshot = collection(this.db, 'users');
        onSnapshot(querySnapshot, (snapshot) => {
          this.users = [];
          snapshot.forEach((doc1) => {
            const data = doc1.data();
            data.id = doc1.id;
            // this.pj = data.pj;
            this.users.push(data);
          });
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
      const use = this.$store.state.user;
      this.user1 = use.email;
      // console.log(this.user1);
      return this.user1;
      // return this.$store.state.isLoggedIn;
    },
    async changeMe() {
      this.change = !this.change;
    },
  },
};

</script>

<style>
.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 6px;
}
.menu-items > * {
  margin-top: 40px;
}
</style>
