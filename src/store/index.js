import { createStore } from "vuex";
import router from "../router";
import axios from "axios";
import config from "../config/index.js";
export default createStore({
  state: {
    email: "",
    MY_LOGIN: "admin",
    MY_PASSWORD: "pass1234",
    students: [],
    dialog: false,
    quizStarted: false,
    quizFinished: false,
    questions: [],
    answers: [],
  },
  getters: {
    getStatus(state) {
      return state.quizStarted;
    },
  },
  mutations: {
    updateQuizStarted(state, status) {
      state.quizStarted = status;
    },
    updateQuizFinished(state, status) {
      state.quizFinished = status;
    },
    updateDialog(state, status) {
      state.dialog = status;
    },
    updateAnswer(state, currentAnswer) {
      state.answers.push(currentAnswer);
    },
    updateQuestions(state, questions) {
      let n = config.TOTAL_QUESTIONS;
      var result = new Array(n),
        len = questions.questions.length,
        taken = new Array(len);
      if (n > len) {
        console.log(n, len);
        throw new RangeError("getRandom: more elements taken than available");
      }
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = questions.questions[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      state.questions = result;
    },
    login(state, email) {
      state.email = email;
      localStorage.setItem("login", email);
      router.push("/");
    },
    logout(state) {
      state.email = "";
      localStorage.removeItem("login");
      router.push("/login");
    },
    initStore(state) {
      if (localStorage.getItem("login")) {
        state.email = localStorage.getItem("login");
      }
    },
    addStudent(state, student) {
      state.students.push(student);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    removeStudent(state, item) {
      for (let i = 0; i < state.students.length; i++) {
        if (state.students[i] === item) {
          state.students.splice(i, 1);
        }
      }
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    editStudent(state, student) {
      for (let i = 0; i < state.students.length; i++) {
        if (state.students[i] == student) {
          state.students[i] = student;
        }
      }
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    initStudents(state) {
      if (localStorage.getItem("students")) {
        state.students = JSON.parse(localStorage.getItem("students"));
      }
    },
  },
  actions: {
    refreshDialog({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("updateDialog", true);
          resolve();
        }, 1000);
      });
    },
    updateQuizStarted(context, status) {
      context.commit("updateQuizStarted", status);
    },
    updateQuizFinished(context, status) {
      context.commit("updateQuizFinished", status);
    },
    updateDialog(context, status) {
      context.commit("updateDialog", status);
    },
    updateAnswer(context, currentAnswer) {
      context.commit("updateAnswer", currentAnswer);
    },
    loadData({ commit }) {
      axios.get("/questions.json").then((response) => {
        commit("updateQuestions", response.data);
      });
    },
  },
  modules: {},
});
