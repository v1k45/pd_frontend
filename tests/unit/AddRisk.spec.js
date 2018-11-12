import moxios from 'moxios';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import store from '@/store';
import AddRisk from '@/views/AddRisk.vue';
import GenericField from '@/components/GenericField.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    id: 1
  }
}

describe('AddRisk.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('loads api response into vuex store', (done) => {

    // selected risktype hasn't loaded.
    expect(store.state.selectedRiskType._isLoaded).toBe(false);
    expect(store.state.selectedRiskType.fields.length).toBe(0);

    const wrapper = shallowMount(AddRisk, {
      store, localVue,
      mocks: {
        $route,
      }
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      expect(request.url).toContain('/api/risk_types/1/')

      request.respondWith({
        status: 200,
        response: {
          id: 1,
          name: 'Risk Name',
          description: 'Risk Description',
          fields: [
            { id: 1, name: 'Name', field_type: 'text' },
            { id: 2, name: 'Serial No.', field_type: 'number' },
          ]
        },
      }).then(() => {

        // risk type detail has loaded
        expect(store.state.selectedRiskType._isLoaded).toBe(true);
        expect(store.state.selectedRiskType.fields.length).toBe(2);

        expect(store.state.selectedRiskType.fields[0].id).toBe(1)
        expect(store.state.selectedRiskType.fields[0].name).toBe('Name')
        expect(store.state.selectedRiskType.fields[0].field_type).toBe('text')

        expect(store.state.selectedRiskType.fields[1].id).toBe(2)
        expect(store.state.selectedRiskType.fields[1].name).toBe('Serial No.')
        expect(store.state.selectedRiskType.fields[1].field_type).toBe('number')

        expect(wrapper.html()).toContain('Risk Name');
        expect(wrapper.html()).toContain('Risk Description');

        expect(wrapper.find(GenericField).exists()).toBe(true);

        done();

      });
    });

  });

});
