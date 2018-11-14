import { shallowMount } from '@vue/test-utils';
import Datepicker from 'vuejs-datepicker';
import GenericField from '@/components/GenericField.vue';


describe('GenericField.vue', () => {

  it('renders text field correctly', () => {
    const schema = {
      id: 1,
      field_type: 'text',
      value: 'Text Value',
    }
    const error = null;
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('input')).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');

    expect(wrapper.vm.value).toBe('Text Value');

  });

  it('renders number field correctly', () => {
    const schema = {
      id: 1,
      field_type: 'number',
      value: 123,
    }
    const error = null;
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('input')).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');

    expect(wrapper.vm.value).toBe(123);

  });

  it('renders options field correctly', () => {
    const schema = {
      id: 1,
      field_type: 'enum',
      value: 3,
      options: [
        { id: 1, value: 'Red'},
        { id: 2, value: 'Yellow'},
        { id: 3, value: 'Green'},
      ],
    }
    const error = null;
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error },
    });

    const wrapperHtml = wrapper.html();
    expect(wrapper.contains('select')).toBe(true);
    expect(wrapper.find('select').html()).toContain('Red');
    expect(wrapper.find('select').html()).toContain('Yellow');
    expect(wrapper.find('select').html()).toContain('Green');
    expect(wrapper.vm.value).toBe(3);
  });

  it('renders date field correctly', () => {
    const schema = {
      id: 1,
      field_type: 'date',
      value: '1970-01-01',
    }
    const error = null;
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error },
    });

    const wrapperHtml = wrapper.html();
    expect(wrapper.contains(Datepicker)).toBe(true);
    expect(wrapper.vm.value).toBe('1970-01-01');
  });

  it('renders text instead of input for readonly field correctly', () => {
    const schema = {
      id: 1,
      field_type: 'text',
      value: 'Text Value',
    }
    const error = null;
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error, readonly: true },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('input')).toBe(false);
    expect(wrapper.contains('p')).toBe(true);
    expect(wrapper.find('p').html()).toContain('Text Value');

  });

  it('renders field errors correctly', () => {
    const schema = {
      id: 1,
      field_type: 'text',
      value: 'Text Value',
    }
    const error = 'This field is required.';
    const wrapper = shallowMount(GenericField, {
      propsData: { schema, error, readonly: false },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapper.contains('input')).toBe(true);
    expect(wrapper.find('input').attributes('class')).toBe('input is-danger');
    expect(wrapper.contains('p.is-danger')).toBe(true);
    expect(wrapper.find('p.is-danger').html()).toContain('This field is required.');

  });

});
