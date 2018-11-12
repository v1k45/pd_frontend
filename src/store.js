import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    riskTypes: [],
  },
  mutations: {
    setRiskTypes(state, riskTypes) {
      state.riskTypes = [...riskTypes];
    },
  },
  actions: {
    async getRiskTypes({ commit }) {
      const response = await Api.riskTypes.all();
      commit('setRiskTypes', response.data);
    },
  },
});
