<template>
  <v-container class="quiz-inner-block">
    <div class="title-quiz"><h1>Vue.js Basic Quiz Results</h1></div>
    <v-card>
      <v-card-title class="headline text-center" primary-title>
        <span class="question"
          >You have successfully completed the quiz. Below are the results</span
        >
      </v-card-title>
      <v-spacer />
      <v-card-text>
        <pre
          >{{ getFinalResult.datasets[0].data[0] }} / {{
            $store.state.questionsLength
          }}</pre
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FinishView",
  components: {},
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Final Result",
          fontSize: 16,
        },
      },
    };
  },
  computed: {
    ...mapState(["questions", "answers"]),
    getFinalResult: function () {
      let correctOptions = this.questions.map(function (data) {
        let correctOption = data.options.filter(function (option) {
          return option.correct == true;
        });
        return [data.qid, correctOption[Object.keys(correctOption)[0]].oid];
      });
      let correctAnswers = {};
      correctOptions.forEach(function (item) {
        correctAnswers[item[0]] = item[1];
      });
      let finalResult = { correct: 0, incorrect: this.questions.length };
      this.answers.forEach(function (item) {
        if (correctAnswers[item.qid] == item.oid) {
          finalResult.correct++;
          finalResult.incorrect--;
        }
      });
      return {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            label: "Results",
            backgroundColor: ["#41B883", "#E46651"],
            data: Object.values(finalResult),
          },
        ],
      };
    },
  },
  created() {
    localStorage.removeItem("quizStarted");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-inner-block {
  max-width: 820px;
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.16);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.16);
}
.quiz-inner-block .title-quiz {
  background-color: #e4edfd;
  text-align: center;
  padding: 16px 0;
  margin: 0;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.question {
  font-size: 19px;
  font-family: Roboto, sans-serif;
  line-height: 32px;
  margin: 0 0 0 100px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
