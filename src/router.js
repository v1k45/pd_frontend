import Vue from 'vue';
import Router from 'vue-router';
import RiskTypeList from './views/RiskTypeList.vue';
import AddRisk from './views/AddRisk.vue';
import RiskDetail from './views/RiskDetail.vue';
import RiskList from './views/RiskList.vue';

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
      path: '/risks',
      name: 'risk-list',
      component: RiskList,
    },
    {
      path: '/risks/:id',
      name: 'view-risk',
      component: RiskDetail,
    },
    {
      path: '/:id',
      name: 'add-risk',
      component: AddRisk,
    },
  ],
});
