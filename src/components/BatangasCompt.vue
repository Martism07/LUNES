<template>
  <div class="batangas">
    <div class="flex flex-col gap-2 w-full rounded-2xl ">
      <div class="w-full bg-gray-800 rounded-2xl p-4 ">
        <div class="pt-2 text-3xl text-white font-serif font-extrabold">
          Task
        </div>
      </div>
      <div class="mytable bg-gray-800 rounded-2xl p-4 w-full">
        <table class=" text-white w-full">
          <thead>
              <tr>
              <th class=" px-4 py-2 w-1/5">Project Code</th>
              <th class=" px-4 py-2 w-1/5">Title</th>
              <th class=" px-8 py-2 w-1/5">Description</th>
              <th class=" px-4 py-2 w-1/5">Due</th>
              <th class=" px-4 py-2 w-1/5" v-if="status === Admin">Action</th>
              </tr>
          </thead>
          <tbody class=" bg-gray-700 ">
            <tr class="m-2 p-2 " v-for="itemTable in table_2"
            :key="itemTable.id">
              <template v-if="!itemTable.edit">
                <td class="p-2 w-1/4">{{ itemTable.pj }}
                </td>
                <td class="p-2 w-1/4">{{ itemTable.title }}
                </td>
                <td class="p-2 w-1/4">{{ itemTable.des }}
                </td>
                <td class="p-2 w-1/4" :style="{ color:
                    getDueDateColor(itemTable.due) }">{{ itemTable.due }}
                </td>
              </template>
              <template v-else>
                <td class="p-2 w-1/4">
                  <label for="pj">
                    <input class="rounded-xl text-black p-2 w-full"
                    type="text" v-model="itemTable.pj" readonly >
                  </label>
                </td>
                <td class="p-2 w-1/4">
                  <label for="title">
                    <input class="rounded-xl text-black p-2 w-full"
                    type="text" v-model="itemTable.title" >
                  </label>
                </td>
                <td class="p-2 w-1/4">
                  <label for="des">
                    <input class="rounded-xl text-black p-2 w-full"
                    type="text" v-model="itemTable.des" >
                  </label>
                </td>
                <td class="p-2 w-1/4">
                  <label for="due">
                    <input class="rounded-xl text-black p-2 w-full"
                    type="date" v-model="itemTable.due" >
                  </label>
                </td>
              </template>
              <td class="p-2 w-1/4">
                <div v-if="status === Admin">
                  <div class="gap-2 flex flex-cols-auto justify-center">
                    <button v-if="!itemTable.edit" class="p-2 rounded-full bg-emerald-700"
                    @click="toggleEdit(itemTable)">U</button>
                    <button v-else class="p-2 rounded-full bg-cyan-700"
                    @click="saveitem(itemTable)">S</button>
                    <button class="p-2 rounded-full bg-rose-700"
                    @click="deleteitem(itemTable.id)">D</button>
                  </div>
                </div>
                <div v-else>
                  <div class="justify-center">
                    <!-- <button
                    class='bx bx-right-arrow-alt bx-burst rounded-full bg-cyan-700'
                    @click="shareData(itemTable)" /> -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex place-content-end h-full w-full">
          <button @click="popUp" class='bx bxs-file-plus text-5xl text-white' />
          <div v-if="!popUps" class="fixed inset-0 bg-gray-800
          bg-opacity-50 flex justify-center items-center">
            <div>
              <button @click="popUp" class='bx bx-x-circle text-3xl text-white' />
              <Component2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore, collection, deleteDoc, doc, setDoc, onSnapshot,
} from 'firebase/firestore';
import Component2 from '@/components/AddToDo.vue';

export default {
  name: 'ChildComponent',
  components: {
    Component2,
  },
  props: {
    filteredProjects: {
      type: Array,
      required: true,
    },
    filteredProjects3: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      db: '',
      title: '',
      pj: '',
      des: '',
      due: '',
      Admin: 'Admin',
      status: '',
      user: '',
      popUps: 'true',
      users: [],
      table_2: [],
    };
  },
  mounted() {
    this.db = getFirestore();
    this.fetchData();
  },
  methods: {
    getDueDateColor(due) {
      const currentDate = new Date();
      const itDueDate = new Date(due);

      if (itDueDate.getDate() === currentDate.getDate()) {
        return 'orange';
      } if (itDueDate < currentDate) {
        return 'red';
      }
      return 'green';
    },
    async deleterow(id) {
      await deleteDoc(doc(this.db, 'todos', id));
    },
    async editMe(itemTable) {
      const index = this.table_2.findIndex((i) => (i.id) === (itemTable.id));
      if (index !== -1) {
        const updatedItem = { ...this.table_2[index], edit: !this.table_2[index].edit };
        this.$set(this.table_2, index, updatedItem);
      }
    },
    async saveit(itemTable) {
      const docRef = doc(this.db, 'todos', itemTable.id);
      await setDoc(docRef, itemTable);
    },
    async fetchData() {
      try {
        onSnapshot(collection(this.db, 'todos'), (snapshot) => {
          this.table_2 = [];
          snapshot.forEach((doc1) => {
            const data = doc1.data();
            data.id = doc1.id;
            data.edit = false;
            const datapj = data.id;

            // .forEach((project) => {
            const fppj = this.filteredProjects;
            const fppj3 = this.filteredProjects3;
            fppj.forEach((pjs2) => {
              // console.log('sdaly21', pjs.pj);
              if (datapj === pjs2) {
                // console.log('sdaly', pjs2);
                // console.log('sdaly21', pjs.pj);
                if (data.pj === fppj3) {
                  // console.log('sdaly', pjs2);
                  this.table_2.push(data);
                }
              }
            });
            // if (datapj === fppj) {
            //   this.table_2.push(data);
            // }
            // });
          });
        });
        onSnapshot(collection(this.db, 'users'), (snapshot1) => {
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
    async popUp() {
      this.popUps = !this.popUps;
    },
  },
};
</script>

<style>
.mytable {
  height: 550px ;
}
</style>
<!-- // this.table_2 = [];
// // Fetch todos collection
// const querySnapshot = collection(this.db, 'todos');

// onSnapshot(querySnapshot, (snapshot) => {
// // Iterate over each document in the collection
//   snapshot.forEach((doc1) => {
//   // Get data from the document
//     const data = doc1.data();
//     data.id = doc1.id;
//     data.edit = false; -->
<!-- status: [
{'Employee'},
{'Project Manager'},
{'Admin'},

if (realUser === data2.email) {
  this.users.push(data2);
  pjcd.forEach((cd) => {
    this.projectCodes.push(cd);
  });
}-->
