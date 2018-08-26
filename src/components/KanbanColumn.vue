<template>
  <v-flex xs12 lg3 md4 sm6 class="kanban-column">
    <v-container fluid grid-list-lg>
      <div class="kanban-column-header">
        <div class="title" style="margin: auto">
          <span>{{column.title}}</span>
          <span v-if="column.count > 0"> ({{column.count}})</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon @click="addCard">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <v-layout row wrap>
        <KanbanCard 
          v-for="card in cards" 
          :key="card.key"
          :card="card"
          :columnkey="column.key" />
      </v-layout>
    </v-container>
    
  </v-flex>
</template>

<script>
import KanbanCard from "@/components/KanbanCard";

export default {
  name: "KanbanColumn",
  components: {
    KanbanCard
  },
  props: ["column"],
  methods: {
    addCard() {
      this.$store.commit("ADD_CARD", { columnKey: this.column.key });
    }
  },
  computed: {
    columnColor() {
      return this.column.color || "grey";
    },
    cards() {
      let cardsObj = this.$store.getters.cards(this.column.key);
      if (cardsObj) {
        return Object.keys(cardsObj)
          .map(key => Object.assign({ key }, cardsObj[key]))
          .sort((a, b) => {
            return a.priority === "high" ? -1 : a.priority === "low" ? 0 : 1;
          });
      } else {
        return [];
      }
    }
  }
};
</script>

<style>
.kanban-column-header {
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 1rem;
}
</style>
