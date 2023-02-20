<template>
  <div class="col wrapper">
    <SalesTabs
      v-bind:tabMenuData="$store.state.sales.QuotationTabMenuData"
      type="salesQuotation"
    />
  </div>
</template>

<script>
export default {};
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
