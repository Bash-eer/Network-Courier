<template>
  <RatesTabs
    v-bind:tabMenuData="$store.state.masters.expressMultiTierRatesTabMenuData"
    type="expressMultiTierRates"
  />
</template>

<script>
export default {
  name: "ExpressMultiTierPage",
};
</script>

<style></style>
