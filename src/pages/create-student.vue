<template>
  <div id="app">
    <h2 class="page-title">Create student</h2>
    <div class="container mx-auto my-5">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name</label
            >
            <Field
              name="name"
              type="text"
              placeholder="Name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback text-[red] text-sm mt-1">
              {{ errors.name }}
            </div>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Date of Birth</label
            >
            <Field
              :mask="'##/##/####'"
              name="dob"
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'is-invalid': errors.dob }"
            />
            <div class="invalid-feedback text-[red] text-sm mt-1">
              {{ errors.dob }}
            </div>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
            >
            <Field
              name="email"
              placeholder="Email"
              type="mail"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback text-[red] text-sm mt-1">
              {{ errors.email }}
            </div>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Phone</label
            >
            <Field
              placeholder="+998 90 123-45-67"
              name="phone"
              v-mask="'+### ## ###-##-##'"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback text-[red] text-sm mt-1">
              {{ errors.phone }}
            </div>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >PNFL</label
            >
            <Field
              placeholder="12345678901234"
              name="pnfl"
              type="text"
              v-mask="'##############'"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback text-[red] text-sm mt-1">
              {{ errors.pnfl }}
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-1"
        >
          Register
        </button>
        <button
          type="reset"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import { mask } from "vue-the-mask";
import * as Yup from "yup";

export default {
  directives: { mask },
  computed: {
    students() {
      return this.$store.state.students;
    },
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      dob: Yup.string()
        .required("Date of Birth is required")
        .matches(
          /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
          "Date of Birth must be a valid date in the format YYYY-MM-DD"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^\+\d{3}\s\d{2}\s\d{3}-\d{2}-\d{2}$/,
          "Phone must be a valid phone number in the format +XXX XX XXX-XX-XX"
        ),
      pnfl: Yup.string()
        .required("PNFL is required")
        .matches(/^[0-9]{14}$/, "PNFL must be 14 digits"),
    });

    return {
      schema,
    };
  },
  components: {
    Form,
    Field,
  },
  methods: {
    onSubmit(values) {
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
    },
    addStudent(form) {
      this.$store.commit("ADD_STUDENT", form);
      form.name = "";
      form.phone = "";
      form.course = "";
    },
  },
};
</script>

<style>
.form-control {
}
</style>
