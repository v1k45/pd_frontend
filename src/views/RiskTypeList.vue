<template>
  <div class="risk-type-list">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Risk Types</h1>
          <h2 class="subtite">Select a risk type to get started.</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <risk-type-item :items="riskTypes"></risk-type-item>
    </div>
  </div>
</template>

<script>
import RiskTypeItem from '@/components/RiskTypeItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'risk-type-list',
  components: {
    RiskTypeItem,
  },
  computed: {
    riskTypes() {
      return this.$store.state.riskTypes;
    },
  },
  methods: {
    ...mapActions([
      'getRiskTypes',
    ]),
  },
  created() {
    document.title = 'Risk Types';
    this.getRiskTypes();
  },
};
</script>
