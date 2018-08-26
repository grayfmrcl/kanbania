<template>
  <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Task Card</span>
          <v-spacer></v-spacer>
          <v-menu bottom left v-if="cardKey">
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile @click="confirmDialog=true" color="blue darken-1">
                  <v-list-tile-title>Delete</v-list-tile-title>
                </v-list-tile>
              </v-list-tile>
            </v-list>
          </v-menu>
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
                    max="12"
                    min="0"
                    messages="*break the task if the estimated time is more than 12 hours"
                    ></v-slider>
              </v-flex>
              <v-flex xs2>
                <v-text-field v-model="estimated" suffix="hours" class="mt-0"></v-text-field>
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
                  :items="['', 'low', 'high']"
                  label="Priority"
                  v-model="priority"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs4>
              <v-btn 
                v-if="cardKey && prevColumnKey" 
                class="kanban-prev-btn" 
                color="blue darken-1" 
                flat
                @click="moveToPrevColumn"
              >Previous</v-btn>
            </v-flex>
            <v-flex xs4 justify-center>
              <v-btn 
                color="blue darken-1" 
                class="kanban-save-btn" 
                flat 
                @click.native="saveCard"
              >Save</v-btn>
            </v-flex>
            <v-flex xs4>
              <v-btn 
                v-if="cardKey && nextColumnKey" 
                class="kanban-next-btn" 
                color="blue darken-1" 
                flat
                @click="moveToNextColumn"
              >Next</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="confirmDialog" max-width="400">
        <v-card>
          <v-card-title>
             <span class="title">Are you sure to delete?</span>
          </v-card-title>
          <v-card-text>
            <span class="subheading">{{activity}}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="deleteCard">Yes</v-btn>
            <v-btn color="blue darken-1" flat @click="confirmDialog=false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-dialog>
</template>

<script>
export default {
  name: "KanbanCardDetail",
  props: ["columns"],
  data() {
    return {
      cardKey: "",
      columnKey: "",
      activity: "",
      estimated: 0,
      priority: "",
      color: "",
      confirmDialog: false
    };
  },
  methods: {
    saveCard() {
      this.$store.dispatch("saveCard", this.mapCard());
    },
    deleteCard() {
      this.confirmDialog = false;
      this.$store.dispatch("deleteCard", {
        cardKey: this.cardKey,
        columnKey: this.columnKey
      });
    },
    moveToNextColumn() {
      this.$store.dispatch(
        "moveCardToColumn",
        Object.assign({ newColumnKey: this.nextColumnKey }, this.mapCard())
      );
    },
    moveToPrevColumn() {
      this.$store.dispatch(
        "moveCardToColumn",
        Object.assign({ newColumnKey: this.prevColumnKey }, this.mapCard())
      );
    },
    mapCard() {
      return {
        cardKey: this.cardKey,
        columnKey: this.columnKey,
        activity: this.activity,
        estimated: this.estimated,
        priority: this.priority,
        color: this.color
      };
    }
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
    },
    currentColumnIndex() {
      return this.columns.map(col => col.key).indexOf(this.card.columnKey);
    },
    nextColumnKey() {
      let nextColumn = this.columns[this.currentColumnIndex + 1];
      return nextColumn ? nextColumn.key : null;
    },
    prevColumnKey() {
      let prevColumn = this.columns[this.currentColumnIndex - 1];
      return prevColumn ? prevColumn.key : null;
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
        this.color = this.card.color || "grey";
      }
    }
  }
};
</script>
  
<style>
.kanban-prev-btn {
  display: block;
  margin-right: auto !important;
}
.kanban-save-btn {
  display: block;
  margin-left: auto !important;
  margin-right: auto !important;
}
.kanban-next-btn {
  display: block;
  margin-left: auto !important;
}
</style>
