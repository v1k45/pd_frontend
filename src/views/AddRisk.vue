<template>
  <section class="section" v-if="riskType._isLoaded">
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ riskType.name }}</h1>
          <h2 class="subtite">{{ riskType.description }}</h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns" :key="field.id" v-for="(field, idx) in risk.values">
        <div class="column is-half">
            <generic-field :error="getError(idx)" :schema="field"></generic-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <div class="control">
            <button class="button is-primary" @click="submitRisk">
              Submit
            </button>
          </div>
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
      'riskType', 'risk', 'getError',
    ]),
  },
  watch: {
    riskType(newRiskType) {
      if (newRiskType.name) {
        document.title = `Add Risk for ${newRiskType.name}`;
      }
    },
  },
  methods: {
    ...mapActions([
      'getRiskType', 'resetRiskType', 'submitRisk',
    ]),
  },
  created() {
    this.getRiskType(this.$route.params.id);
    document.title = 'Add Risk';
  },
  destroyed() {
    this.resetRiskType();
  },
};
</script>
