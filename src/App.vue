<template>
  <div id="app">
    <div class="container">
      <div class="tabs">
        <ul>
          <router-link active-class="is-active" tag="li" :to="{name: 'risk-type-list'}" exact>
            <a>View Risk Types</a>
          </router-link>
          <router-link active-class="is-active" tag="li" :to="{name: 'risk-list'}" exact>
            <a>View Risks</a>
          </router-link>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@charset "utf-8";
@import "../node_modules/bulma/bulma.sass";
</style>
