import moxios from 'moxios';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import store from '@/store';
import RiskTypeList from '@/views/RiskTypeList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('RiskTypeList.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('loads api response into vuex store', (done) => {
    // initial count is 0
    expect(store.state.riskTypes.length).toBe(0);

    const wrapper = shallowMount(RiskTypeList, {
      store, localVue,
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          { id: 1, name: 'Item 1', description: 'Description 1' },
          { id: 1, name: 'Item 2', description: 'Description 2' },
        ],
      }).then(() => {
        // item count is same
        expect(store.state.riskTypes.length).toBe(2);
        expect(wrapper.vm.riskTypes.length).toBe(2);

        // values are same too.
        expect(store.state.riskTypes[0].name).toBe('Item 1');
        expect(store.state.riskTypes[0].description).toBe('Description 1');
        expect(store.state.riskTypes[1].name).toBe('Item 2');
        expect(store.state.riskTypes[1].description).toBe('Description 2');

        done();
      });
    });
  });
});
