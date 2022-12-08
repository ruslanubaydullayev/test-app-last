<template>
  <div class="container mx-auto">
    <h1>create-test</h1>
    <br />
    <v-select label="Select" :items="items" v-model="type"></v-select>
    <div v-if="type == 'multiple'">
      <h1>Multiple</h1>
      <v-text-field
        clearable
        label="Question"
        v-model="question"
      ></v-text-field>
      <v-text-field clearable label="Option 1" v-model="option"></v-text-field>
      <button
        @click="addOption(option)"
        class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
      >
        Add option
      </button>
      <v-container v-if="options.length > 0" fluid>
        <h4>Choose correct answers</h4>
        <v-checkbox
          v-for="(item, index) in options"
          :key="index"
          v-model="selectedOption"
          :label="item"
          :value="item"
        ></v-checkbox>
        <button
          @click="addToQuestions()"
          class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
        >
          Add to questions
        </button>
      </v-container>
    </div>
    <div v-if="type == 'single'">
      <h1>Single</h1>
      <v-text-field
        clearable
        label="Question"
        v-model="question"
      ></v-text-field>
      <v-text-field clearable label="Option 1" v-model="option"></v-text-field>
      <button
        @click="addOption(option)"
        class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
      >
        Add option
      </button>
      <v-container v-if="options.length > 0" fluid>
        <h4>Choose correct answer</h4>
        <v-radio-group column required>
          <v-radio
            class="q-radio ma-1"
            v-for="option in options"
            :key="option"
            :label="option"
            :value="option"
            color="blue"
            @click="selectedOption = option"
          ></v-radio>
        </v-radio-group>
        <button
          class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
          @click="addToQuestions()"
        >
          Add to questions
        </button>
      </v-container>
    </div>
    <div v-if="type == 'text'">
      <h1>Text</h1>
      <v-text-field
        clearable
        label="Question"
        v-model="question"
      ></v-text-field>
      <v-text-field clearable label="Answer" v-model="answer"></v-text-field>
      <button
        @click="addTextQuestions()"
        class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
      >
        Add to questions
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-test",
  data() {
    return {
      items: ["multiple", "text", "single"],
      type: null,
      question: "",
      answer: "",
      option: "",
      options: [],
      selectedOption: [],
    };
  },
  methods: {
    addOption(option) {
      this.options.push(option);
      this.option = "";
    },
    addToQuestions() {
      this.$store.commit("addCreatedQuestion", {
        question: this.question,
        options: this.options,
        answer: this.selectedOption,
        type: this.type,
      });
      this.question = "";
      this.options = [];
      this.selectedOption = [];
    },
    addTextQuestions() {
      this.$store.commit("addCreatedQuestion", {
        question: this.question,
        answer: this.answer,
        type: this.type,
      });
      this.question = "";
      this.answer = "";
    },
  },
  created() {
    this.$store.commit("initCreatedQuestions");
  },
};
</script>

<style lang="scss" scoped></style>
