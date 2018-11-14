import { shallowMount } from '@vue/test-utils';
import RiskItem from '@/components/RiskItem.vue';


describe('RiskItem.vue', () => {
  it('renders props.items when passed', () => {
    const items = [
      { id: 1, fields: []},
      { id: 2, fields: []},
    ];
    const wrapper = shallowMount(RiskItem, {
      stubs: ['router-link', 'router-view'],
      propsData: { items },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('ul')).toBe(true);
    expect(wrapper.findAll('li').length).toBe(2);

    expect(wrapperHtml).toContain('Risk Item #1');
    expect(wrapperHtml).toContain('Risk Item #2');
  });
});
