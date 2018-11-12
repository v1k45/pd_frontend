import { shallowMount } from '@vue/test-utils';
import RiskTypeItem from '@/components/RiskTypeItem.vue';


describe('RiskTypeItem.vue', () => {
  it('renders props.items when passed', () => {
    const items = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
    ];
    const wrapper = shallowMount(RiskTypeItem, {
      stubs: ['router-link', 'router-view'],
      propsData: { items },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('ul')).toBe(true);
    expect(wrapper.findAll('li').length).toBe(2);

    expect(wrapperHtml).toContain('Item 1');
    expect(wrapperHtml).toContain('Item 2');
  });
});
