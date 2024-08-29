<template>
  <div class="w-full h-full ">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2 w-full rounded-2xl ">
        <div class="w-full bg-gray-800 rounded-2xl p-4 ">
          <div class="pt-2 text-3xl text-white font-serif font-extrabold">
            Projects Details
          </div>
        </div>
        <div class="mytable bg-gray-800 rounded-2xl p-4 w-full">
          <table class=" text-white w-full">
            <thead>
                <tr>
                  <th class="px-4 py-2 w-1/4">Name</th>
                  <th class="px-4 py-2 w-1/4">Position</th>
                  <th class="px-4 py-2 w-1/4">Number of Task</th>
                  <th class="px-4 py-2 w-1/4">Action</th>
                </tr>
            </thead>
            <tbody class=" bg-gray-700" v-for="item1 in users" :key="item1.id">
              <tr class="m-2 p-2 snap-y" v-for="item in FTable" :key="item.id">
                <template>
                  <td class="p-2 w-1/6 scroll-pl-6">
                    {{ item.FirstName }} {{ item.MiddleI }} {{ item.LastName }}</td>
                  <td class="p-2 w-1/6 scroll-pl-6">
                    {{ item.position }}
                  </td>
                  <td class="p-2 w-1/6 snap-start">{{ pjc }}</td>
                  <!-- <td class="p-2 w-1/4 snap-start"
                  :style="{ color: getDueDateColor(item.due) }">
                    {{ item.due }}
                  </td> -->
                </template>
                <td class="p-2 w-1/6 snap-start">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div >
        <Component2 v-if="showChild" :filteredProjects="filteredProjects"
        :filteredProjects3="filteredProjects3" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore, collection, deleteDoc, doc, setDoc, onSnapshot,
  // getDocs, query, where,
} from 'firebase/firestore';
import Component2 from '@/components/BatangasCompt.vue';
// import { getAuth } from 'firebase/auth';

export default {
  name: 'ComponentItem1',
  components: {
    Component2,
  },
  props: {
    filteredProjects2: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      db: '',
      FTable: [],
      title: '',
      pj: '',
      pjc: 0,
      des: '',
      due: '',
      stat: '',
      project: [],
      showChild: 'true',
      Admin: 'Admin',
      users: [],
      user1: '',
      projectCodes1: [
        { label: '2023-01-BATANGASLGU-00', value: '2023-01-BATANGASLGU-00' },
        { label: '2021-02-CABANATOAN-09', value: '2021-02-CABANATOAN-09' },
        { label: '2019-04-LEYTE-08', value: '2019-04-LEYTE-08' },
        { label: '2024-07-BORRACAY-01', value: '2024-07-BORRACAY-01' },
      ],
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
    },
    async saveitem(item) {
      const docRef = doc(this.db, 'projects', item.id);
      await setDoc(docRef, item);
    },
    async fetchdata() {
      try {
        const querySnapshot1 = collection(this.db, 'users');
        onSnapshot(querySnapshot1, (snapshot1) => {
          snapshot1.forEach((doc2) => {
            this.users = [];
            const data2 = doc2.data();
            data2.id = doc2.id;
            const use1 = this.$store.state.user;
            const pjcd = data2.ProjectCode;
            const pjt = this.filteredProjects2;
            pjcd.forEach((cd) => {
              if (use1.email === data2.email) {
                this.users.push(data2);
              }
              if (pjt === cd) {
                if (data2.Status === 'Admin') {
                  this.FTable.push(data2);
                } else {
                  this.FTable.push(data2);
                }
                const pjc2 = data2.ProjectCode.length;
                this.pjc = pjc2;
              }
            });
          });
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
      // try {
      //   const querySnapshot1 = collection(this.db, 'users');
      //   onSnapshot(querySnapshot1, (snapshot1) => {
      //     this.table_2 = [];
      //     this.pjc = 0;
      //     snapshot1.forEach((doc2) => {
      //       const data1 = doc2.data();
      //       data1.id = doc2.id;
      //       const pjcd = data1.ProjectCode;
      //       const pjt = this.projectCodes1;
      //       pjcd.forEach((cd) => {
      //         if (pjt === cd) {
      //           const pjc2 = data1.ProjectCode.length;
      //           this.pjc = pjc2;
      //         }
      //       });
      //     });
      //   });
      // } catch (error) {
      //   console.error('Error fetching todos:', error);
      // }
      // this.table_1 = [];
      // this.projectCodes1.forEach((doc1) => {
      //   const data2 = doc1.data();
      //   data2.id = doc1.id;
      //   data2.edit = false;
      //   this.table_1.push(data2);
      //   this.projectCodes.forEach((pjs2) => {
      //     if (data2.pj === pjs2) {
      //       this.table_2.push(data2);
      //     }
      //   });
      // });
      return this.user1;
    },
    async shareData(item) {
      const make = item.task;
      this.project = make;
      this.stat = this.filteredProjects2;
      this.showChild = false;
      const intervalId = setInterval(() => {
        this.showChild = true;
      }, 100);
      return intervalId;
    },
    async logouts() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    filteredProjects() {
      return this.project;
    },
    filteredProjects3() {
      return this.stat;
    },
  },
};
</script>

<style>
.mytable {
  height: 550px ;
}
</style>

<!--
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
</template> -->
