<template>
  <v-container>
    <v-toolbar color="pink" dark>
      <v-toolbar-title> Column 1</v-toolbar-title>
      <v-spacer></v-spacer>
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
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "KanbanColumn"
};
</script>

<style>
</style>
