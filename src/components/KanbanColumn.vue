<template>
  <v-flex xs3>
    <v-toolbar :color="columnColor" dark>
      <v-toolbar-title>{{column.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="addCard">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card :class="columnColor" class="lighten-4">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <KanbanCard 
              v-for="card in cards" 
              :key="card.key" 
              :card="card" />
          </v-layout>
        </v-container>
      </v-card>
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
      let card = { title: "Another task" };
      this.$store.dispatch("addCard", {
        columnKey: "selected",
        content: card
      });
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
</style>
