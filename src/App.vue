<template>
  <v-app id="app">
    <v-content>
      <KanbanBoard/>
    </v-content>
  </v-app>
</template>

<script>
import KanbanBoard from "./components/KanbanBoard.vue";

export default {
  name: "app",
  components: {
    KanbanBoard
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
