<template>
  <div class="HomeView w-full h-full">
    <nav class="flex justify-center ">
      <div class="bg-orange-300 shadow-2xl rounded-3xl w-full flex flex-row
      justify-around items-center">
        <div class="rounded-2xl text-white p-4 w-full">
          <div class=" text-3xl font-serif font-extrabold">
            Project Management
          </div>
        </div>
        <div class="flex flex-row bg-orange-500 text-white
        rounded-2xl jusify-center items-center p-2 mr-2">
          <div>
            <div>
              <div class="flex flex-row justify-center items-center gap-2">
               <p>Welcome,</p>
               <b>{{ status }}</b> {{ user }}</div>
              </div>
          </div>
          <div>
            <button @click="logouts">
              <i class='bx bx-log-out bx-flip-horizontal ml-2 text-3xl'
              style='color:white'></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="  rounded-2xl p-4 w-full h-3/4" id="bg">
      <div v-if="status === Admin">
        <projectTable />
      </div>
      <div v-else>
        <projectTableEmp />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';
// import Sidebar from '../components/SideBar.vue';
import projectTable from '../components/ProjectTable.vue';
import projectTableEmp from '../components/ProjectTableEmp.vue';

export default {
  name: 'dashboard-Home',
  components: {
    projectTable,
    projectTableEmp,
  },
  data() {
    return {
      user: '',
      status: '',
      users: [],
      Admin: 'Admin',
      project: '',
    };
  },
  async mounted() {
    this.db = getFirestore();
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      try {
        const querySnapshot1 = collection(this.db, 'users');
        onSnapshot(querySnapshot1, (snapshot1) => {
          this.users = [];
          snapshot1.forEach((doc2) => {
            const data1 = doc2.data();
            data1.id = doc2.id;
            const use = this.$store.state.user;
            this.user = use.email;
            const realUser = this.user;
            if (realUser === data1.email) {
              this.status = data1.Status;
              this.users.push(data1);
            }
          });
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async logouts() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style>
.dashboard {
    display: grid;
    background-color: teal;
}
nav {
  padding-bottom: 30px;
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

#bg{
  background-color: rgba(206, 128, 98, 0.59);
}
</style>

<!--<div class="grid-cols-1 bg-slate-100">
  <div class="mt-6 mr-2 ml-4">
    <button class="closeButton text-black bg-white rounded-3xl h-8"
    @click="closeLinks= !closeLinks">
        <svg v-if="closeLinks" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
  </div>
  <div class="mt-20 mr-2 ml-5">
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="2.5" stroke="white" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166
        1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75
        0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11
        1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25
        2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057
        1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
    </button>
  </div>
  <div class="mt-16 mr-2 ml-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="2.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166
      1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75
      0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11
      1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25
      2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057
      1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  </div>
  <div class="mt-16 mr-2 ml-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="2.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166
      1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75
      0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11
      1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25
      2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057
      1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  </div>
  <div class="mt-20 mr-2 ml-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="2.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166
      1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75
      0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11
      1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25
      2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057
      1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  </div>
  <div class="mt-20 mr-2 ml-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="2.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166
      1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75
      0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11
      1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25
      2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057
      1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  </div>
  <div class="mt-20 mr-2 ml-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="2" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057
      1.123-.08M15.75 18H18a2.25 2.25 0
      002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0
      00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125
      0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0
      0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8
      0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621
      0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0
      1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
    </svg>
  </div>
</div> -->
