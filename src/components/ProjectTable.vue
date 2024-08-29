<template>
    <div class="w-full h-full ">
    <div class="grid grid-cols-6 gap-2">
        <div class="flex flex-col gap-2 col-span-2 w-full rounded-2xl ">
          <div class="w-full bg-gray-800 rounded-2xl p-4 ">
            <div class="pt-2 text-3xl text-white font-serif font-extrabold">
              Projects
            </div>
          </div>
          <div class="mytable bg-gray-800 rounded-2xl p-4 w-full">
            <table class=" text-white h-auto">
              <thead>
                  <tr>
                    <th class=" px-4 py-2 w-1/5">Project Code</th>
                    <th class=" px-4 py-2 w-1/5">Title</th>
                    <th class=" px-8 py-2 w-1/5">Description</th>
                    <th class=" px-4 py-2 w-1/5">Due</th>
                    <th class=" px-4 py-2 w-1/5">Action</th>
                  </tr>
              </thead>
              <tbody class=" bg-gray-700" v-for="item1 in users" :key="item1.id">
                <template v-if="item1.Status === Admin">
                  <tr class="m-2 p-2 snap-y" v-for="item in table_1" :key="item.id">
                    <template v-if="!item.edit">
                      <td class="p-2 w-1/4 scroll-pl-6">{{ item.pj }}</td>
                      <td class="p-2 w-1/4 scroll-pl-6">{{ item.title }}</td>
                      <td class="p-2 w-1/4 snap-start">{{ item.des }}</td>
                      <td class="p-2 w-1/4 snap-start"
                      :style="{ color: getDueDateColor(item.due) }">
                        {{ item.due }}
                      </td>
                    </template>
                    <template v-else>
                      <td class="p-2 w-1/4">
                        <label for="pj">
                          <select class="rounded-xl p-2 text-black snap-start w-full"
                            v-model="item.pj">
                            <option value="2023-01-BATANGASLGU-00">2023-01-BATANGASLGU-00</option>
                            <option value="2021-02-CABANATOAN-09">2021-02-CABANATOAN-09</option>
                            <option value="2019-04-LEYTE-08">2019-04-LEYTE-08</option>
                            <option value="2024-07-BORRACAY-01">2024-07-BORRACAY-01</option>
                          </select>
                        </label>
                      </td>
                      <td class="p-2 w-1/4">
                        <label for="title1">
                          <input class="rounded-xl text-black snap-start p-2 w-full" type="text"
                          v-model="item.title" >
                        </label>
                      </td>
                      <td class="p-2 w-1/4">
                        <label for="des1">
                          <input class="rounded-xl text-black snap-start p-2 w-full" type="text"
                          v-model="item.des" >
                        </label>
                      </td>
                      <td class="p-2 w-1/4">
                        <label for="due1">
                          <input class="rounded-xl text-black snap-start p-2 w-full" type="date"
                          v-model="item.due" >
                        </label>
                      </td>
                    </template>
                    <td class="p-2 w-1/4 snap-start">
                      <div v-if="item1.email === user1">
                        <div v-if="item1.Status === Admin">
                          <div class="gap-2 flex flex-cols-auto justify-center">
                            <button v-if="!item.edit" class="p-2 rounded-full bg-emerald-700"
                            @click="toggleEdit(item)">U</button>
                            <button v-else class="p-2 rounded-full bg-cyan-700"
                            @click="saveitem(item)">S</button>
                            <button class="p-2 rounded-full bg-rose-700"
                            @click="deleteitem(item.id)">D</button>
                            <button class='bx bx-right-arrow-alt bx-burst rounded-full bg-cyan-700'
                            @click="shareData(item)" />
                          </div>
                        </div>
                        <div v-else>
                          <div class="justify-center">
                            <button
                            class='bx bx-right-arrow-alt bx-burst rounded-full bg-cyan-700'
                            @click="shareData(item)" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr class="m-2 p-2 snap-y" v-for="item in table_2" :key="item.id">
                    <template v-if="!item.edit">
                      <td class="p-2 w-1/4 scroll-pl-6">{{ item.pj }}</td>
                      <td class="p-2 w-1/4 scroll-pl-6">{{ item.title }}</td>
                      <td class="p-2 w-1/4 snap-start">{{ item.des }}</td>
                      <td class="p-2 w-1/4 snap-start"
                      :style="{ color: getDueDateColor(item.due) }">
                        {{ item.due }}
                      </td>
                    </template>
                    <template v-else>
                      <td class="p-2">
                        <label for="pj">
                          <select class="rounded-xl p-2 text-black snap-start w-1/4"
                            v-model="item.pj">
                            <option value="2023-01-BATANGASLGU-00">2023-01-BATANGASLGU-00</option>
                            <option value="2021-02-CABANATOAN-09">2021-02-CABANATOAN-09</option>
                            <option value="2019-04-LEYTE-08">2019-04-LEYTE-08</option>
                            <option value="2024-07-BORRACAY-01">2024-07-BORRACAY-01</option>
                          </select>
                        </label>
                      </td>
                      <td class="p-2">
                        <label for="title1">
                          <input class="rounded-xl text-black snap-start p-2 w-1/4" type="text"
                          v-model="item.title" >
                        </label>
                      </td>
                      <td class="p-2">
                        <label for="des1">
                          <input class="rounded-xl text-black snap-start p-2 w-1/4" type="text"
                          v-model="item.des" >
                        </label>
                      </td>
                      <td class="p-2">
                        <label for="due1">
                          <input class="rounded-xl text-black snap-start p-2 w-1/4" type="date"
                          v-model="item.due" >
                        </label>
                      </td>
                    </template>
                    <td class="p-2 w-1/4 snap-start">
                      <div v-if="item1.email === user1">
                        <div v-if="item1.Status === Admin">
                          <div class="gap-2 flex flex-cols-auto justify-center">
                            <button v-if="!item.edit" class="p-2 rounded-full bg-emerald-700"
                            @click="toggleEdit(item)">U</button>
                            <button v-else class="p-2 rounded-full bg-cyan-700"
                            @click="saveitem(item)">S</button>
                            <button class="p-2 rounded-full bg-rose-700"
                            @click="deleteitem(item.id)">D</button>
                            <button class='bx bx-right-arrow-alt bx-burst rounded-full bg-cyan-700'
                            @click="shareData(item)" />
                          </div>
                        </div>
                        <div v-else>
                          <div class="justify-center">
                            <button
                            class='bx bx-right-arrow-alt bx-burst rounded-full bg-cyan-700'
                            @click="shareData(item)" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div>
              <div class="flex place-content-end h-80 w-full">
                <button @click="popUp" class='bx bxs-file-plus text-5xl text-white' />
              </div>
              <div v-if="!popUps" class="fixed inset-0 bg-gray-800
              bg-opacity-50 flex justify-center items-center">
                <div>
                  <button @click="popUp" class='bx bx-x-circle text-3xl text-white' />
                  <Component1 />
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="col-span-4 " >
        <ChildComponent v-if="showChild" :filteredProjects2="filteredProjects" />
      </div>
    </div>
    </div>
</template>

<script>
import {
  getFirestore, collection, deleteDoc, doc, setDoc, onSnapshot,
  // getDocs, query, where,
} from 'firebase/firestore';
import ChildComponent from '@/components/AboutProject.vue';
import Component1 from '@/components/AddProject.vue';
// import { getAuth } from 'firebase/auth';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent,
    Component1,
  },
  data() {
    return {
      db: '',
      table_1: [],
      table_2: [],
      title: '',
      pj: '',
      des: '',
      due: '',
      project: '',
      showChild: 'false',
      Admin: 'Admin',
      users: [],
      user1: '',
      popUps: 'true',
      projectCodes: [],
    };
  },
  async mounted() {
    this.db = getFirestore();
    this.fetchdata();
  },
  methods: {
    getDueDateColor(due) {
      const currentDate = new Date();
      const itemDueDate = new Date(due);

      if (itemDueDate.getDate() === currentDate.getDate()) {
        // Due today
        return 'orange'; // Change text color to orange
      }
      if (itemDueDate < currentDate) {
        // Overdue items (past due date)
        return 'red';
        // Change text color to red
      }
      return 'green'; // Change text color to green
    },
    async deleteitem(id) {
      await deleteDoc(doc(this.db, 'projects', id));
    },
    async toggleEdit(item) {
      const index = this.table_1.findIndex((i) => (i.id) === (item.id));
      if (index !== -1) {
        const updatedItem = { ...this.table_1[index], edit: !this.table_1[index].edit };
        this.$set(this.table_1, index, updatedItem);
      }
      // const sr = this.edit;
      // const docRef = doc(this.db, 'projects', item.id, item.edit(sr));
      // await setDoc(docRef, item);
    },
    async saveitem(item) {
      const docRef = doc(this.db, 'projects', item.id);
      await setDoc(docRef, item);
    },
    async fetchdata() {
      try {
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
      try {
        const querySnapshot = collection(this.db, 'projects');
        onSnapshot(querySnapshot, (snapshot) => {
          this.table_1 = [];
          this.table_2 = [];
          snapshot.forEach((doc1) => {
            const data2 = doc1.data();
            data2.id = doc1.id;
            data2.edit = false;
            // this.pj = data.pj;
            // const pjmn = this.projectCodes;
            // const pjf = data;
            // console.log('sda', pjf);
            // this.table_.push(data);
            this.table_1.push(data2);
            // this.table_2.forEach((pjs) => {
            this.projectCodes.forEach((pjs2) => {
              // console.log('sdaly21', pjs.pj);
              if (data2.pj === pjs2) {
                // console.log('sdaly', pjs2);
                this.table_2.push(data2);
              }
            });
            // });
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
    async shareData(item) {
      const make = String(item.pj);
      this.project = make;
      this.showChild = false;
      const intervalId = setInterval(() => {
        this.showChild = true;
      }, 100);
      return intervalId;
    },
    async popUp() {
      this.popUps = !this.popUps;
    },
    async logouts() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    filteredProjects() {
      return this.project;
    },
    // user1() {
    //   return this.$store.state.user;
    // },
  },
};
</script>

<style>
.mytable {
  height: 550px ;
}
</style>
