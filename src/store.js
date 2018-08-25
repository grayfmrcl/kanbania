import Vue from 'vue';
import Vuex from 'vuex';

import { db } from './firebase.js';

const projectsRef = db.ref('projects');
const columnsRef = db.ref('columns');
const cardsRef = db.ref('tasks')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project_id: 'project1',
    columns: {},
    cards: {},
    card: {},
    cardDialog: false
  },
  mutations: {
    COLUMNS_FETCHED(state, columns) {
      state.columns = columns
    },
    CARDS_FETCHED(state, cards) {
      state.cards = cards
    },
    CARD_SELECTED(state, card) {
      state.cardDialog = true
    }
  },
  actions: {
    initProjects({ commit }) {
      const defaultColumns = './default_columns.json';
      const project_id = 'project1';
      Promise.all([
        projectsRef.child(project_id).set({ title: 'Initial project' }),
        columnsRef.child(project_id).push(defaultColumns),
      ])
        .then(() => {
          commit('PROJECT_INITIALIZED');
        });
    },
    fetchColumns({ state, commit }) {
      columnsRef
        .child(state.project_id)
        .on('value', (snapshot) => {
          commit('COLUMNS_FETCHED', snapshot.val());
        });
    },
    fetchCards({ state, commit }) {
      cardsRef
        .child(state.project_id)
        .on('value', (snapshot) => {
          commit('CARDS_FETCHED', snapshot.val())
        })
    },
    addCard({ state }, newCard) {
      columnsRef
        .child(`${state.project_id}/${newCard.columnKey}/cards`)
        .push(newCard.content)
    },
    selectCard({ state, commit }) {
      commit('CARD_SELECTED')
    }
  },
  getters: {
    columns: state => state.columns,
    cards: state => columnKey => state.cards[columnKey]
  }
});
