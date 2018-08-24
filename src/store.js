import Vue from 'vue';
import Vuex from 'vuex';

import { db } from './firebase.js'

const projectsRef = db.ref('projects')
const columnsRef = db.ref('columns')

Vue.use(Vuex);

import {
  INITIALIZE_PROJECT,
  PROJECT_INITIALIZED,
  FETCH_COLUMNS,
  COLUMNS_FETCHED
} from './mutation_types'

export default new Vuex.Store({
  state: {
    project_id: '',
    columns: {}
  },
  mutations: {
    [PROJECT_INITIALIZED](state, columns) {
      state.columns = columns

    }
  },
  actions: {
    initProjects({ commit }) {
      const defaultColumns = './default_columns.json'
      let project_id = 'project1'
      Promise.all([
        projectsRef.child(project_id).set({ title: `Initial project` }),
        columnsRef.child(project_id).push(defaultColumns)
      ])
        .then(() => {
          commit(PROJECT_INITIALIZED)
        })
    },
    getColumns() {
      columnsRef.child(state.project_id)
        .on('value', function (snapshot) {
          store.commit(COLUMNS_FETCHED, snapshot.val())
        })
    }
  },
  getters: {
    columns: () => state.columns
  }
});
