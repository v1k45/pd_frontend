<template>
  <div class="field" v-if="schema.field_type === 'text'">
    <label class="label">
      {{ schema.name }}
    </label>
    <div class="control">
      <input class="input" :class="{'is-danger': error}" type="text" v-model="value">
    </div>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>

  <div class="field" v-else-if="schema.field_type === 'number'">
    <label class="label">
      {{ schema.name }}
    </label>
    <div class="control">
      <input class="input"  :class="{'is-danger': error}" type="text" v-model="value">
    </div>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>

  <div class="field" v-else-if="schema.field_type === 'date'">
    <label class="label">
      {{ schema.name }}
    </label>
    <Datepicker
      wrapper-class="control"
      v-bind:input-class="{ input: schema, 'is-danger': error }"
      v-model="value">
    </Datepicker>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>

  <div class="field" v-else-if="schema.field_type === 'enum'">
    <label class="label">
      {{ schema.name }}
    </label>
    <div class="select" :class="{'is-danger': error}">
      <select v-model="value">
        <option disabled value="">Select a {{ schema.name }}</option>
        <option v-for="optionValue in schema.options" :value="optionValue.id" :key="optionValue.id">
          {{ optionValue.value }}
        </option>
      </select>
    </div>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'generic-field',
  components: {
    Datepicker,
  },
  props: ['schema', 'error'],
  computed: {
    // getter and setter for form value
    value: {
      get() {
        return this.schema.value;
      },
      set(value) {
        this.$store.dispatch(
          'updateField',
          // clean/validate value before saving to store
          { fieldId: this.schema.id, value: this.cleanValue(value) },
        );
      },
    },
  },
  methods: {
    cleanValue(value) {
      switch (this.schema.field_type) {
        case 'number':
          if (value.length) {
            const numberValue = parseInt(value);
            return isNaN(numberValue) ? this.schema.value : numberValue;
          }
          return '';

        case 'date':
          return value.toISOString().split('T')[0];

        default:
          return value;
      }
    },
  },
};
</script>
