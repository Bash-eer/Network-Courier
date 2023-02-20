<template>
  <div class="col wrapper">
    <MainTab v-bind:tabMenuData="tabMenuData" type="salesQuotation" />
  </div>
</template>

<script>
import MainTab from "../MainTab.vue";
import {QuotationContractTabMenuData} from "../Const.js";
export default {
  components: {MainTab},
  data() {
    return {
      tabMenuData: QuotationContractTabMenuData,
    };
  },
  created() {
    this.$store.dispatch("salesSales/loadQuotationTabTableData", {
      id: this.$route.params.id,
    });
    this.$store.dispatch("salesInternationalAdhoc/loadCountryDropDownData");
    this.$store.dispatch(
      "salesInternationalAdhoc/loadDestinationCountryDropDownData"
    );
    this.$store.dispatch("salesInternationalAdhoc/loadServiceProvider");
  },
};
</script>

<style scoped>
::v-deep .QuotationTabTable .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
/* .wrapper {
  background-color: #fff;
  height:  !important;
} */
</style>
