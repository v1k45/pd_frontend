<template>
  <section v-if="riskType._isLoaded">
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
          <generic-field :disabled="risk._isSubmitting" :error="getError(idx)" :schema="field"></generic-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <div class="control">
            <button class="button is-primary" :class="{'is-loading': risk._isSubmitting}" @click="submitRisk">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <loading v-else />
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import GenericField from '@/components/GenericField.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'add-risk',
  components: {
    GenericField, Loading
  },
  computed: {
    ...mapGetters([
      'riskType', 'getError', 'risk'
    ]),
  },
  watch: {
    riskType(newRiskType) {
      if (newRiskType.name) {
        document.title = `Add Risk for ${newRiskType.name}`;
      }
    },
    risk(newRisk, oldRisk) {
      // redirect to the risk page if the risk object was saved successfully
      if (!oldRisk._isSaved && newRisk._isSaved) {
        this.$router.push({ name: 'view-risk', params: {id: newRisk.id}});
      }
    }
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
