<template>
  <ul>
    <li :key="item.id" v-for="item in items">
      <router-link :to="{ name: 'add-risk', params: { id: item.id }}">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'risk-type-item',
  props: ['items'],
};
</script>
