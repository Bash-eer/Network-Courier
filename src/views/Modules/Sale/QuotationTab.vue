<template>
  <div
    class="wrapper"
    v-if="$store.state['sales']['quotationTableData'].length == 0"
  >
    <div class="img-wrap flex align-items-center justify-content-center">
      <img src="/images/quotation-body.png" alt="" />
    </div>
    <div class="text">+ Create Quotation</div>
  </div>
  <SalesTables
    v-if="$store.state['sales']['quotationTableData'].length != 0"
    :key="$store.state['sales']['quotationTableData']"
    tableClass="p-datatable-sm QuotationTabTable"
    tableDataName="QuotationTabData"
    :overlayData="$store.state['sales']['quotationOverlayData']"
    tableName="QuotationTabTable"
    :tableData="$store.state['sales']['quotationTableData']"
    :tableColumns="$store.state['sales']['quotationTableColumnData']"
    dataKey="quotation_id"
  />
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("companyID")) {
      this.$store.state.sales.salesCompanyid =
        localStorage.getItem("companyID");
    }
    this.$store.state.masters.expressRegionsTripTableData = null;
    if (this.$store.state.sales.salesCompanyid != null) {
      let apiPath =
        "?type=sales_company&type_id=" + this.$store.state.sales.salesCompanyid;
      this.$store.dispatch("sales/loadContactsApi", {
        apiPath: apiPath,
      });
      this.$store.dispatch("sales/loadQuotationApi", {
        id: this.$store.state.sales.salesCompanyid,
      });
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/main.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 50vh !important;
  width: auto;
}
.img-wrap {
  width: 94px;
  height: 94px;
  background: #edf1f7;
  border-radius: 50%;
}
.text {
  color: #79b907;
  background: transparent;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
}
</style>
