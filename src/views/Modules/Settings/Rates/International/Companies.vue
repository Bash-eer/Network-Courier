<template>
  <RatesTabs
    v-bind:tabMenuData="$store.state.masters.internationalCompaniesTabMenuData"
    type="companies"
  />
</template>

<script>
export default {
  name: "Companies",
};
</script>

<style></style>
