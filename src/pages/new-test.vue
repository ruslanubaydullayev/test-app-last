<template>
  <div>
    <!-- <pre>{{ createdQuestions }}</pre> -->
    <div v-if="showTheResult">
      <h1>Result</h1>
      <h2>{{ countCorrectAnswers }} / {{ createdQuestions?.length }}</h2>
    </div>
    <v-card
      v-else-if="createdQuestions && createdQuestions.length > 0"
      v-show="showQuestion(index)"
      v-for="(question, index) in createdQuestions"
      v-bind:key="question?.qid"
      class=".quiz-inner-block mx-auto"
    >
      <pre>{{ qIndex + 1 }} / {{ createdQuestions.length }}</pre>
      <div v-if="question?.type == 'single'">
        <div class="bg-[#42b983] p-4 my-2">
          <h4>{{ question?.question }}</h4>
          <v-radio-group column required>
            <v-radio
              class="q-radio ma-1"
              v-for="option in question?.options"
              :key="option?.oid"
              :label="option?.answer"
              :value="option?.oid"
              color="blue"
              @click="selectedAnswer(question, option.oid)"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div v-else-if="question?.type == 'text'">
        <div class="p-4 my-2">
          <h4>{{ question?.question }}</h4>
          <v-text-field
            v-model="textQuestion"
            label="Answer"
            required
            class="mt-3"
          ></v-text-field>
          <button
            @click="selectAnswer(question, textQuestion)"
            class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
          >
            Next
          </button>
        </div>
      </div>
      <v-container v-else fluid>
        <h4>{{ question.question }}</h4>
        <v-checkbox
          v-for="(option, index) in question?.options"
          :key="index"
          v-model="selected"
          :label="option"
          :value="option"
        ></v-checkbox>
        <button
          @click="selectedMultiple(question, selected)"
          class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
        >
          Next
        </button>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "NewTestView",
  components: {},
  data() {
    return {
      qIndex: 0,
      countCorrectAnswers: 0,
      showTheResult: false,
      textQuestion: "",
      selected: [],
      sortedQ: [],
      sortedS: [],
      questions: [],
    };
  },
  methods: {
    showQuestion(index) {
      return this.qIndex == index;
    },
    showResult() {
      this.showTheResult = true;
    },
    selectedAnswer(q, oId) {
      for (let i = 0; i < q.options.length; i++) {
        if (q.options[i].oid == oId) {
          if (q.options[i].correct) {
            this.countCorrectAnswers++;
          }
        }
      }
      if (this.qIndex == this.createdQuestions.length - 1) {
        this.showResult();
      } else {
        this.qIndex++;
        this.$router.push({ query: { question: oId } });
      }
    },
    selectAnswer(q, text) {
      if (q.answer == text) {
        this.countCorrectAnswers++;
      }
      if (this.qIndex == this.createdQuestions.length - 1) {
        this.showResult();
      } else {
        this.qIndex++;
      }
    },
    selectedMultiple(q, selected) {
      this.sortedQ = q.answer.sort(function (a, b) {
        return a - b;
      });
      this.sortedS = selected.sort(function (a, b) {
        return a - b;
      });
      console.log(this.sortedQ, this.sortedS);
      if (JSON.stringify(this.sortedQ) == JSON.stringify(this.sortedS)) {
        this.countCorrectAnswers++;
      }
      if (this.qIndex == this.createdQuestions.length - 1) {
        this.showResult();
      } else {
        this.qIndex++;
        this.selected = [];
      }
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
};
</script>

<style scoped>
.quiz-inner-block {
  max-width: 1000px;
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.16);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.16);
}
.quiz-inner-block .title-quiz {
  background-color: #e4edfd;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  display: flex;
}

.quiz-inner-block .title-h1 {
  padding: 30px;
  flex: 1;
}
.q-chip {
  background-color: #c2dfff;
  color: #fff;
  line-height: 26px;
  font-size: 16px;
  border-radius: 20px;
  padding: 5px 10px;
  -webkit-box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
  font-weight: 700;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.6);
}
.question {
  font-size: 19px;
  font-family: Roboto, sans-serif;
  line-height: 32px;
  margin: 0 0 0 10px;
  color: rgba(0, 0, 0, 0.6);
}
.q-radio {
  background-color: #f3f3f3;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  color: #818181;
}
.q-btn {
  color: white !important;
  font-family: Roboto, sans-serif;
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.42857;
  padding: 10px 25px;
  cursor: pointer;
  display: inline-block;
  border: 1px solid transparent;
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  margin-bottom: 0;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  background-image: none;
}
.q-alert {
  margin: 0 auto;
  width: 90%;
  padding: 8px;
  border-radius: 10px !important;
}
.q-pad {
  padding: 8px !important;
}
.quiz-inner-block
  .v-selection-control-group
  .v-selection-control
  .v-label--clickable {
  white-space: wrap !important;
}

.style-checkbox {
  color: red;
}

.v-application .primary--text {
  color: #1867c0 !important;
  caret-color: #1867c0 !important;
}
</style>
