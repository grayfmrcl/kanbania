<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Task Card</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Activity" v-model="activity" clearable></v-text-field>
              </v-flex>
              <v-flex xs10>
                  <v-slider 
                    v-model="estimated"
                    messages="*break the task if the estimated time is more than 12 hours"
                    max="12"
                    min="0"
                    ></v-slider>
              </v-flex>
              <v-flex xs2>
                <span>{{ estimated }} hours</span>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['grey', 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown']"
                  label="Color"
                  v-model="color"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['low', 'high']"
                  label="Priority"
                  v-model="priority"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveCard">Save</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
</template>

<script>
export default {
  name: "KanbanCardDetail",
  data() {
    return {
      columnKey: "",
      cardKey: "",
      activity: "",
      estimated: 0,
      color: "grey",
      priority: ""
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters.cardDialog;
      },
      set(value) {
        this.$store.commit("CARD_UNSELECTED");
      }
    },
    card() {
      return this.$store.getters.card;
    }
  },
  methods: {
    saveCard() {
      this.dialog = false;
      this.$store.dispatch("saveCard", {
        cardKey: this.cardKey,
        columnKey: this.columnKey,
        activity: this.activity,
        estimated: this.estimated > 0 ? this.estimated : null,
        priority: this.priority.length > 1 ? this.priority : null,
        color: this.color ? this.color : "grey"
      });
    }
  },
  watch: {
    dialog(selected) {
      if (selected) {
        this.cardKey = this.card.key;
        this.columnKey = this.card.columnKey;
        this.activity = this.card.activity;
        this.estimated = this.card.estimated || 0;
        this.priority = this.card.priority || "";
        this.color = this.card.color;
      }
    }
  }
};
</script>

<style>
</style>
