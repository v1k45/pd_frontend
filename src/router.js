import Vue from 'vue';
import Router from 'vue-router';
import RiskTypeList from './views/RiskTypeList.vue';
import AddRisk from './views/AddRisk.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'risk-type-list',
      component: RiskTypeList,
    },
    {
      path: '/:id',
      name: 'add-risk',
      component: AddRisk,
    },
  ],
});
