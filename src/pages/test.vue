<template>
  <v-container class="quiz-inner-block">
    <div class="title-quiz">
      <h1 class="title-h1">TEST</h1>
    </div>
    <v-card
      v-show="showQuestion(index)"
      v-for="(question, index) in questions"
      v-bind:key="question.qid"
      class="mx-auto"
    >
      <v-card-title class="headline text-center" primary-title>
        <v-chip class="q-chip ma-2" color="blue" text-color="white">
          {{ index + 1 }} / {{ questions.length }}
        </v-chip>
        <span class="question">{{ question.question }}</span>
      </v-card-title>
      <v-alert v-if="alert" class="q-alert" type="error">
        Please select one answer
      </v-alert>
      <div v-if="question.type == 'single'">
        <v-card-text class="q-pad">
          <v-radio-group
            column
            :rules="[(v) => !!v || 'Item is required']"
            required
          >
            <v-radio
              class="q-radio ma-1"
              v-for="option in question.options"
              :key="option.oid"
              :label="option.answer"
              :value="option.oid"
              color="blue"
              @change="selectedAnswer(question.qid, option.oid)"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <button
          v-show="qIndex + 1 < questions.length"
          @click="goToNextQuestion()"
          class="bg-[#42b983] text-white px-4 py-2 rounded-md hover:bg-[#3b9f6d] focus:outline-none focus:ring-2 focus:ring-[#42b983] focus:ring-opacity-50"
        >
          Next
        </button>
        <v-btn
          v-show="qIndex + 1 === questions.length"
          @click="finishQuiz()"
          right
          large
          color="success"
          dark
        >
          Finish
        </v-btn>
      </div>
      <div v-else-if="question.type == 'multiple'"></div>
      <div v-else>
        <v-text-field
          v-model="textQuestion"
          label="Write your answer here"
        ></v-text-field>
        <button
          v-show="qIndex + 1 < questions.length"
          @click="goToNextTextQuestion()"
          class="bg-[#42b983] text-white px-4 py-2 rounded-md hover:bg-[#3b9f6d] focus:outline-none focus:ring-2 focus:ring-[#42b983] focus:ring-opacity-50"
        >
          Next
        </button>
        <v-btn
          v-show="qIndex + 1 === questions.length"
          @click="finishTestQuiz()"
          right
          large
          color="success"
          dark
        >
          Finish
        </v-btn>
      </div>

      <div>
        <div class="flex items-center justify-end">
          <pre>{{ qIndex }}</pre>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TestView",
  components: {},
  data() {
    return {
      alert: false,
      qIndex: 0,
      currentAnswer: null,
      textQuestion: "",
    };
  },
  methods: {
    ...mapActions(["updateQuizFinished", "updateAnswer", "loadData"]),
    showQuestion(index) {
      return this.qIndex == index;
    },
    storeAnswer(currentAnswer) {
      this.updateAnswer(currentAnswer);
    },
    goToNextQuestion() {
      if (this.currentAnswer == null) {
        this.alert = true;
        return false;
      }
      this.storeAnswer(this.currentAnswer);
      this.qIndex++;
      this.currentAnswer = null;
      this.alert = false;
    },
    // for text question
    goToNextTextQuestion() {
      if (this.textQuestion == "" || this.textQuestion == null) {
        this.alert = true;
        return false;
      }
      this.storeAnswer(this.textQuestion);
      this.qIndex++;
      this.textQuestion = null;
      this.alert = false;
    },
    selectedAnswer(qid, oid) {
      this.currentAnswer = { qid, oid };
    },
    finishQuiz() {
      if (this.currentAnswer == null) {
        this.alert = true;
        return false;
      }
      this.goToNextQuestion();
      if (this.qIndex == this.answers.length) {
        this.updateQuizFinished(true);
        this.$router.push({ name: "FinishView" });
        this.$router.reload();
      }
    },

    finishTestQuiz() {
      if (this.textQuestion == null || this.textQuestion == "") {
        this.alert = true;
        return false;
      }
      this.goToNextQuestion();
      if (this.qIndex == this.answers.length) {
        this.updateQuizFinished(true);
        this.$router.push({ name: "FinishView" });
      }
    },
  },
  created() {
    this.loadData();
  },
  computed: {
    ...mapState(["questions", "answers", "dialog"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
