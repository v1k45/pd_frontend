<template>
  <ul>
    <li :key="item.id" v-for="item in items">
      {{ item.name }}
    </li>
  </ul>
</template>


<script>
export default {
  name: 'risk-type-item',
  props: ['items'],
};
</script>
