<template>
  <v-flex xs12 @click="selectCard">
    <v-card color="white" tile hover>
      <div class="kanban-card-layout">
      <div class="kanban-card-border" :class="cardColor"></div>
      <div class="kanban-card-content">
          <v-card-title primary-title>
          <div class="title">{{card.activity}}</div>
        </v-card-title>
        <v-card-actions>
        <v-chip v-if="card.estimated" :color="cardColor" text-color="white">
          <v-avatar class="darken-3" :class="cardColor">{{card.estimated}}</v-avatar>
          hours
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip 
          v-if="card.priority"
          outline 
          :color="priorityColor">
          <v-icon>warning</v-icon>
        </v-chip>
        </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "KanbanCard",
  props: ["card", "columnkey"],
  data() {
    return {};
  },
  methods: {
    selectCard() {
      this.$store.dispatch("selectCard", {
        columnKey: this.columnkey,
        cardKey: this.card.key
      });
    }
  },
  computed: {
    priorityColor() {
      return this.card.priority === "high" ? "red" : "orange";
    },
    cardColor() {
      return this.card.color || "grey";
    }
  }
};
</script>

<style>
.kanban-card-layout {
  display: flex;
}
.kanban-card-border {
  padding: 0.5rem;
}
.kanban-card-content {
  width: 100%;
}
</style>
