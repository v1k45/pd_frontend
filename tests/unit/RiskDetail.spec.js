import moxios from 'moxios';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import store from '@/store';
import RiskDetail from '@/views/RiskDetail.vue';
import GenericField from '@/components/GenericField.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    id: 1
  }
}

describe('RiskDetail.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('loads api response into vuex store', (done) => {

    // selected risktype hasn't loaded.
    expect(store.state.selectedRisk._isLoaded).toBe(false);
    expect(store.state.selectedRisk.values.length).toBe(0);

    const wrapper = shallowMount(RiskDetail, {
      store, localVue,
      mocks: {
        $route,
      }
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      expect(request.url).toContain('/api/risks/1/')

      request.respondWith({
        status: 200,
        response: {
          id: 1,
          values: [
            { id: 1, field: {id: 22, name: 'Name', field_type: 'text' }, field_id: 22, value: "Name Value"},
            { id: 3, field: {id: 32, name: 'Model No.', field_type: 'number' }, field_id: 32, value: "Model Number Value"},
          ]
        },
      }).then(() => {

        // risk type detail has loaded
        expect(store.state.selectedRisk._isLoaded).toBe(true);
        expect(store.state.selectedRisk.values.length).toBe(2);

        expect(store.state.selectedRisk.id).toBe(1)

        expect(store.state.selectedRisk.values[0].id).toBe(1)
        expect(store.state.selectedRisk.values[0].field_id).toBe(22)
        expect(store.state.selectedRisk.values[0].value).toBe("Name Value")

        expect(store.state.selectedRisk.values[1].id).toBe(3)
        expect(store.state.selectedRisk.values[1].field_id).toBe(32)
        expect(store.state.selectedRisk.values[1].value).toBe("Model Number Value")

        expect(wrapper.html()).toContain('Risk #1');

        expect(wrapper.find(GenericField).exists()).toBe(true);

        done();

      });
    });

  });

});
