import Vue from 'vue';
import Vuex from 'vuex';

import { db } from './firebase.js';
import { watch } from 'fs';

const projectsRef = db.ref('projects');
const columnsRef = db.ref('columns');
const cardsRef = db.ref('cards')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project_id: '',
    columns: {},
    cards: {},
    card: {},
    cardDialog: false
  },
  mutations: {
    PROJECT_INITIALIZED(state, projectId) {
      state.project_id = projectId
    },
    COLUMNS_FETCHED(state, columns) {
      state.columns = columns
    },
    CARDS_FETCHED(state, cards) {
      state.cards = cards
    },
    CARD_UNSELECTED(state) {
      state.cardDialog = false
      state.card = {}
    },
    CARD_SELECTED(state, payload) {
      state.cardDialog = true
      state.card = Object.assign({
        columnKey: payload.columnKey,
        key: payload.cardKey
      },
        state.cards[payload.columnKey][payload.cardKey])
    },
    ADD_CARD(state, payload) {
      state.card.columnKey = payload.columnKey
      state.cardDialog = true
    }
  },
  actions: {
    initProject({ dispatch, commit }) {
      const project_id = 'project1';
      columnsRef.child(project_id).set(defaultColumns)
        .then(() => {
          commit('PROJECT_INITIALIZED', project_id);
          dispatch('fetchColumns')
          dispatch('fetchCards')
        })
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
    selectCard({ commit }, payload) {
      commit('CARD_SELECTED', payload)
    },
    saveCard({ state, commit }, payload) {
      commit('CARD_UNSELECTED')
      let card = mapCard(payload)
      if (payload.cardKey) {
        cardsRef
          .child(`${state.project_id}/${payload.columnKey}/${payload.cardKey}`)
          .update(card)
      } else {
        cardsRef
          .child(`${state.project_id}/${payload.columnKey}`)
          .push(card)
        columnsRef.child(`${state.project_id}/${payload.columnKey}/count`)
          .transaction(val => (val || 0) + 1)
      }
    },
    deleteCard({ state, commit }, payload) {
      commit('CARD_UNSELECTED')
      if (payload.cardKey && payload.columnKey) {
        cardsRef
          .child(`${state.project_id}/${payload.columnKey}/${payload.cardKey}`)
          .remove()
        columnsRef.child(`${state.project_id}/${payload.columnKey}/count`)
          .transaction(val => (val || 0) - 1)
      }
    },
    moveCardToColumn({ state, commit }, payload) {
      commit('CARD_UNSELECTED')
      if (payload.cardKey && payload.newColumnKey) {
        let card = mapCard(payload)
        cardsRef.child(`${state.project_id}/${payload.columnKey}/${payload.cardKey}`)
          .remove()
        columnsRef.child(`${state.project_id}/${payload.columnKey}/count`)
          .transaction(val => (val || 0) - 1)
        cardsRef.child(`${state.project_id}/${payload.newColumnKey}/${payload.cardKey}`)
          .set(card)
        columnsRef.child(`${state.project_id}/${payload.newColumnKey}/count`)
          .transaction(val => (val || 0) + 1)
      }
    }
  },
  getters: {
    columns: state => state.columns,
    cards: state => columnKey => state.cards[columnKey],
    cardDialog: state => state.cardDialog,
    card: state => state.card
  }
});

const mapCard = payload => {
  return {
    activity: payload.activity,
    estimated: payload.estimated,
    priority: payload.priority,
    color: payload.color
  }
}

const defaultColumns = {
  backlog: {
    title: `Backlog`,
    order: 1,
    count: 0
  },
  todo: {
    title: `To Do`,
    order: 2,
    count: 0
  },
  inprogress: {
    title: `In Progress`,
    order: 3,
    count: 0,
  },
  done: {
    title: `Done`,
    order: 4,
    count: 0,
  }
}
