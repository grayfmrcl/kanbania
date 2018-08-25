<template>
  <v-container fluid>
    <v-layout column align-center>
      <h1>Kanban Board</h1>
    </v-layout>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
      <KanbanColumn v-for="(column, key) in columns" :key="key" :column="column" />
    </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import KanbanColumn from "@/components/KanbanColumn";

export default {
  name: "KanbanBoard",
  components: {
    KanbanColumn
  },
  created() {
    this.$store.dispatch("fetchColumns");
  },
  computed: {
    columns: function() {
      return this.$store.getters.columns;
    }
  }
};
</script>

<style>
</style>
