import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    riskTypes: [],
    // risk type with full field data
    selectedRiskType: {
      fields: [],
      _isLoaded: false,
    },
    risks: [],
    // risk item which is being edited or viewed
    selectedRisk: {
      risk_type: null,
      values: [],
      errors: {values: []},
    },
  },
  getters: {
    riskType: state => state.selectedRiskType,
    risk: state => state.selectedRisk,
    // get value field error by index
    getError: state => index => {
      if (state.selectedRisk.errors.values.length) {
        let errors = state.selectedRisk.errors.values[index] || {};
        return errors.value ? errors.value.join(' ') : null;
      }
      return null;
    },
  },
  mutations: {
    setRiskTypes(state, riskTypes) {
      state.riskTypes = [...riskTypes];
    },
    setSelectedRiskType(state, riskType) {
      // load selected risk type into store
      state.selectedRiskType = { ...riskType, _isLoaded: true };
      state.selectedRisk = {
        risk_type: riskType.id,
        values: riskType.fields.map(field => ({ ...field, field: field.id, value: '' })),
        errors: {values: []},
      };
    },
    setRisks(state, risks) {
      state.risks = [...risks];
    },
    setSelectedRisk(state, risk) {
      // load selected risk into store
      state.selectedRisk = {
        ...risk,
        values: risk.values.map(value => {
          return {...value.field, value: value.value};
        }),
        _isLoaded: true,
        errors: {values: []},
      };
    },
    resetSelectedRiskType(state) {
      state.selectedRiskType = { fields: [], _isLoaded: false, errors: {} };
    },
    updateField(state, { fieldId, value }) {
      // update field value by id
      const oldFieldIdx = state.selectedRisk.values.findIndex(v => v.field === fieldId);
      const newField = { ...state.selectedRisk.values[oldFieldIdx], value };
      state.selectedRisk.values.splice(oldFieldIdx, 1, newField);
    },
    setRiskError(state, errors) {
      state.selectedRisk.errors = {...errors};
    },
  },
  actions: {
    async getRiskTypes({ commit }) {
      const response = await Api.riskTypes.all();
      commit('setRiskTypes', response.data);
    },
    async getRiskType({ state, commit }, id) {
      let riskType = state.riskTypes.find(r => r === id);
      if (!riskType) {
        const response = await Api.riskTypes.get(id);
        riskType = response.data;
      }
      commit('setSelectedRiskType', riskType);
    },
    async getRisks({ commit }) {
      const response = await Api.risks.all();
      commit('setRisks', response.data);
    },
    async getRisk({ commit }, id) {
      const response = await Api.risks.get(id);
      commit('setSelectedRisk', response.data);
    },
    submitRisk({ state, commit }) {
      // create list of values compatible with the API
      let values = state.selectedRisk.values.map(value => {
        return {field_id: value.field, value: value.value !== '' ? value.value : undefined};
      });
      // final payload for creating risk object
      let payload = {risk_type: state.selectedRisk.risk_type, values};

      // send payload to API
      Api.risks.create(payload)
        .then(response => {
          // TODO: redirect to saved risk or show success response
          console.log("Successfully created");
        })
        .catch(error => {
          // there was a validation error, show it to user
          if (error.response.status === 400) {
            commit('setRiskError', error.response.data);
          }
        });
    },
    resetRiskType({ commit }) {
      commit('resetSelectedRiskType');
    },
    updateField({ state, commit }, { fieldId, value }) {
      commit('updateField', { fieldId, value });
    },
  },
});
