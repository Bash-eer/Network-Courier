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
import { normalRegionRatesTabMenuData } from "../../const/const.js";

export default {
  name: "NormalRegionRates",
  components: {},
  data: () => ({
    tabMenuData: normalRegionRatesTabMenuData,
  }),
};
</script>

<style></style>
