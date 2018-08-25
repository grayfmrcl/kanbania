<template>
  <v-flex xs3>
    <v-toolbar :color="column.color" dark>
      <v-toolbar-title>{{column.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>

            <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          </v-layout>
        </v-container>
      </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "KanbanColumn",
  data() {
    return {};
  },
  props: ["column"]
};
</script>

<style>
</style>
