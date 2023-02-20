<template>
  <!--LEVEL TWO TABS-->
  <ExpressContractPageTabs
    v-bind:tabMenuData="tabMenuData"
    type="regionRates"
    defaultTab="Bike"
    storePath=""
  />
  <!--LEVEL TWO TABS-->
</template>

<script>
//data imports
import { eCommerceRegionRatesTabMenuData } from "../../const/const.js";

export default {
  components: {},
  data: () => ({
    tabMenuData: eCommerceRegionRatesTabMenuData,
  }),
};
</script>

<style></style>
