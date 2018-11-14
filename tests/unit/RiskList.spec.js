import moxios from 'moxios';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import store from '@/store';
import RiskList from '@/views/RiskList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('RiskList.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('loads api response into vuex store', (done) => {
    // initial count is 0
    expect(store.state.risks.length).toBe(0);

    const wrapper = shallowMount(RiskList, {
      store, localVue,
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          { id: 1, values: []},
          { id: 2, values: []},
        ],
      }).then(() => {

        // item count is same
        expect(store.state.risks.length).toBe(2);
        expect(wrapper.vm.risks.length).toBe(2);

        // values are same too.
        expect(store.state.risks[0].id).toBe(1);
        expect(store.state.risks[1].id).toBe(2);

        done();
      });
    });
  });
});
