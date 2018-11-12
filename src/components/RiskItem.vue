<template>
  <ul>
    <li :key="item.id" v-for="item in items">
      <router-link :to="{ name: 'view-risk', params: { id: item.id }}">
        Risk Item #{{ item.id }}
      </router-link>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'risk-item',
  props: ['items'],
};
</script>
