<template>
  <div>
    <h3>Edit test</h3>
    <div v-for="(item, index) in createdQuestions" :key="index">
      <v-card @click="openModal(item)">
        <v-card-title>
          <h3>{{ index + 1 }}. {{ item.question }}</h3>
        </v-card-title>
      </v-card>
    </div>
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div
              v-if="question.type == 'multiple'"
              class="flex flex-col items-center justify-between"
            >
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Question</label
                >
                <input
                  v-model="question.question"
                  name="question"
                  type="text"
                  required
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label
                  class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Answers</label
                >
                <v-checkbox
                  v-for="(item, index) in question.options"
                  :key="index"
                  v-model="question.answer"
                  :label="item"
                  :value="item"
                ></v-checkbox>
              </div>
            </div>
            <div v-else-if="question.type == 'single'">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Question</label
                >
                <input
                  v-model="question.question"
                  name="question"
                  type="text"
                  required
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Answer</label
                >
                <v-radio-group column required>
                  <v-radio
                    class="q-radio ma-1"
                    v-for="option in question.options"
                    :key="option"
                    :label="option"
                    :value="option"
                    color="blue"
                  ></v-radio>
                </v-radio-group>
              </div>
            </div>
            <div v-else>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Question</label
                >
                <input
                  v-model="question.question"
                  name="question"
                  type="text"
                  required
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Answer</label
                >
                <input
                  v-model="question.answer"
                  name="answer"
                  type="text"
                  required
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <button
              @click="removeQuestion(question)"
              class="mt-2 self-end focus:outline-none w-[200px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:red:bg-green-700 dark:focus:ring-red-800 mr-1"
            >
              Delete question
            </button>
            <button
              @click="editStudent(question)"
              class="mt-2 self-end focus:outline-none w-[200px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { Modal } from "usemodal-vue3";

export default {
  directives: { Modal },
  methods: {
    openModal(item) {
      this.show = true;
      this.question = item;
    },
    editStudent(question) {
      this.$store.commit("editCreatedQuestion", question);
      this.show = false;
    },
    removeQuestion() {
      this.$store.commit("removeCreatedQuestion", this.question);
      this.show = false;
    },
  },
  computed: {
    createdQuestions() {
      return this.$store.state.createdQuestions;
    },
  },
  mounted() {
    this.$store.commit("initCreatedQuestions");
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss">
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
