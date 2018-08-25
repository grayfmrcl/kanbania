import Vue from 'vue';
import Vuex from 'vuex';

import { db } from './firebase.js';

import {
  INITIALIZE_PROJECT,
  PROJECT_INITIALIZED,
  FETCH_COLUMNS,
  COLUMNS_FETCHED,
} from './mutation_types';
import { stat } from 'fs';

const projectsRef = db.ref('projects');
const columnsRef = db.ref('columns');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project_id: 'project1',
    columns: [],
  },
  mutations: {
    [COLUMNS_FETCHED](state, snapshot) {
      snapshot.forEach(child => {
        state.columns.push(child.val())
      })
    },
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
          commit(PROJECT_INITIALIZED);
        });
    },
    fetchColumns({ state, commit }) {
      let project_id = state.project_id
      columnsRef
        .child(project_id)
        .orderByChild('order')
        .once('value', (snapshot) => {
          commit(COLUMNS_FETCHED, snapshot);
        });
    },
  },
  getters: {
    columns: state => state.columns
  }
});
