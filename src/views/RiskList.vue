<template>
  <div class="risk-list">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Risks</h1>
          <h2 class="subtite">Select a risk to view data.</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <risk-item :items="risks"></risk-item>
    </div>
  </div>
</template>

<script>
import RiskItem from '@/components/RiskItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'risk-list',
  components: {
    RiskItem,
  },
  computed: {
    risks() {
      return this.$store.state.risks;
    },
  },
  methods: {
    ...mapActions([
      'getRisks',
    ]),
  },
  created() {
    document.title = 'Risks';
    this.getRisks();
  },
};
</script>
