<template>
  <v-container fluid>
    <v-layout column align-center>
      <h1>Board</h1>
    </v-layout>
    <v-container fluid grid-list-lg>
      <v-layout row wrap class="kanban-columns">
        <KanbanColumn 
          v-for="column in columns" 
          :key="column.key" 
          :column="column" />
      </v-layout>
    <KanbanCardDetail :columns="columns" />
    </v-container>
  </v-container>
</template>

<script>
import KanbanColumn from "@/components/KanbanColumn";
import KanbanCardDetail from "@/components/KanbanCardDetail";

export default {
  name: "KanbanBoard",
  components: {
    KanbanColumn,
    KanbanCardDetail
  },
  created() {
    this.$store.dispatch("initProject");
  },
  computed: {
    columns: function() {
      let columnObj = this.$store.getters.columns;
      return Object.keys(columnObj)
        .map(key => Object.assign({ key }, columnObj[key]))
        .sort((a, b) => a.order > b.order);
    }
  }
};
</script>

<style>
.kanban-columns .kanban-column:not(:last-child) {
  border-right: 1px solid #ddd;
}
</style>
