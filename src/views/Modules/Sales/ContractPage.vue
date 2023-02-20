<template>
  <MainTab v-bind:tabMenuData="tabMenuData" type="salesHome" />
</template>

<script>
import MainTab from "../../../components/Sales/Contract/ContractMainTab.vue";
import { SalesContractTabMenuData } from "../../../components/Sales/Contract/Const";
export default {
  name: "SalesHome",
  components: { MainTab },

  data: () => ({
    tabMenuData: SalesContractTabMenuData,
  }),
};
</script>

<style scoped></style>
