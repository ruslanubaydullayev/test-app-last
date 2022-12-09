<template>
  <div>
    <h3>Edit test</h3>
    <pre>{{ createdQuestions }}</pre>
    <div v-for="(item, index) in createdQuestions" :key="index">
      <v-card>
        <v-card-title>
          <h3>{{ item.question }}</h3>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped></style>
