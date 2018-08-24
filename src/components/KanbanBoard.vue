<template>
  <v-container fluid>
    <KanbanColumn />
  </v-container>
</template>

<script>
import KanbanColumn from "@/components/KanbanColumn.vue";

export default {
  name: "KanbanBoard",
  components: {
    KanbanColumn
  }
};
</script>

<style>
</style>
