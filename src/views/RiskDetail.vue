<template>
  <section v-if="risk._isLoaded">
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">View Risk #{{ risk.id }}</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns" :key="field.id" v-for="field in risk.values">
        <div class="column is-half">
            <generic-field error="" readonly="true" :schema="field"></generic-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import GenericField from '@/components/GenericField.vue';

export default {
  name: 'add-risk',
  components: {
    GenericField,
  },
  computed: {
    ...mapGetters([
      'risk',
    ]),
  },
  methods: {
    ...mapActions([
      'getRisk',
    ]),
  },
  created() {
    this.getRisk(this.$route.params.id);
    document.title = 'View Risk';
  },
};
</script>
