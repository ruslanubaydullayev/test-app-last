<template>
  <div class="container mx-auto">
    <h1>create-test</h1>
    <br />
    <v-select label="Select" :items="items" v-model="selected"></v-select>
    <pre>{{ selected }}</pre>
    <div v-if="selected == 'multiple'">
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
      <pre>{{ options }}</pre>
      <v-container fluid>
        <p>{{ selectedOption }}</p>
        <v-checkbox
          v-for="(item, index) in options"
          :key="index"
          v-model="selectedOption"
          :label="item"
          :value="item"
        ></v-checkbox>
      </v-container>
      <button @click="addToQuestions()">Add to questions</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-test",
  data() {
    return {
      items: ["multiple", "text", "single"],
      selected: null,
      question: "",
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
        type: "multiple",
      });
      this.question = "";
      this.options = [];
      this.selectedOption = [];
    },
  },
  created() {
    this.$store.commit("initCreatedQuestions");
  },
};
</script>

<style lang="scss" scoped></style>
