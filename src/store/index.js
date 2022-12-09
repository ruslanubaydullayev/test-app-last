import { createStore } from "vuex";
import router from "../router";
export default createStore({
  state: {
    email: "",
    MY_LOGIN: "admin",
    MY_PASSWORD: "pass1234",
    students: [],
    questions: [],
    answers: [],
    createdQuestions: [],
  },
  getters: {},
  mutations: {
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
    addCreatedQuestion(state, question) {
      state.createdQuestions.push(question);
      localStorage.setItem(
        "createdQuestions",
        JSON.stringify(state.createdQuestions)
      );
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
    editCreatedQuestion(state, question) {
      for (let i = 0; i < state.createdQuestions.length; i++) {
        if (state.createdQuestions[i] == question) {
          state.createdQuestions[i] = question;
        }
      }
      localStorage.setItem(
        "createdQuestions",
        JSON.stringify(state.createdQuestions)
      );
    },
    removeCreatedQuestion(state, item) {
      for (let i = 0; i < state.createdQuestions.length; i++) {
        if (state.createdQuestions[i] === item) {
          state.createdQuestions.splice(i, 1);
        }
      }
      localStorage.setItem(
        "createdQuestions",
        JSON.stringify(state.createdQuestions)
      );
    },
    initStudents(state) {
      if (localStorage.getItem("students")) {
        state.students = JSON.parse(localStorage.getItem("students"));
      }
    },
    initCreatedQuestions(state) {
      if (localStorage.getItem("createdQuestions")) {
        state.createdQuestions = JSON.parse(
          localStorage.getItem("createdQuestions")
        );
      }
    },
  },
  actions: {},
  modules: {},
});
