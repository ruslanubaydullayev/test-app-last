<template>
  <div class="container mx-auto">
    <h2 class="page-title">List of students</h2>
    <form @submit.prevent="addStudent(student)">
      <div class="grid gap-6 my-6 md:grid-cols-3">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            v-model="student.name"
            name="name"
            type="text"
            required
            placeholder="Name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone</label
          >
          <input
            v-model="student.phone"
            placeholder="+998 90 123-45-67"
            name="phone"
            required
            v-mask="'+### ## ###-##-##'"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Course</label
          >
          <select
            v-model="student.course"
            id="countries"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="focus:outline-none w-[200px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
      >
        Add
      </button>
    </form>
    <div class="mt-4">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Student name</th>
            <th scope="col" class="py-3 px-6">Birth date</th>
            <th scope="col" class="py-3 px-6">Course</th>
            <th scope="col" class="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in students"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item?.name }}
            </th>
            <td class="py-4 px-6">
              {{ item?.phone }}
            </td>
            <td class="py-4 px-6">
              {{ item?.course }}
            </td>
            <td class="py-4 px-6">
              <button
                @click="editStudentModal(item)"
                class="btn bg-[#3c68e0] text-white p-3 mx-2"
              >
                Edit
              </button>
              <button
                @click="removeStudent(item)"
                class="btn bg-[#df1111] text-white p-3 mx-2"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="flex items-center justify-between">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                v-model="editingStudent.name"
                name="name"
                type="text"
                required
                placeholder="Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone</label
              >
              <input
                v-model="editingStudent.phone"
                placeholder="+998 90 123-45-67"
                name="phone"
                required
                v-mask="'+### ## ###-##-##'"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Course</label
              >
              <select
                v-model="editingStudent.course"
                id="countries"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <button
            @click="editStudent(editingStudent)"
            class="mt-2 self-end focus:outline-none w-[200px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mask } from "vue-the-mask";
import { Modal } from "usemodal-vue3";
export default {
  directives: { mask, Modal },
  data() {
    return {
      student: {
        name: "",
        phone: "",
        course: "",
      },
      editingStudent: {
        name: "",
        phone: "",
        course: "",
      },
      show: false,
    };
  },
  computed: {
    students() {
      return this.$store.state.students;
    },
  },
  mounted() {
    this.$store.commit("initStudents");
  },
  methods: {
    addStudent(student) {
      this.$store.commit("addStudent", student);
      this.student = {
        name: "",
        phone: "",
        course: "",
      };
    },
    removeStudent(item) {
      this.$store.commit("removeStudent", item);
    },
    editStudentModal(item) {
      this.show = true;
      this.editingStudent = item;
    },
    editStudent(item) {
      this.$store.commit("editStudent", item);
      this.show = false;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
