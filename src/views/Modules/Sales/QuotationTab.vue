<template>
  <div
    class="wrapper"
    v-if="$store.state['salesSales']['QuotationTabTableData'].length == 0"
  >
    <div class="img-wrap flex align-items-center justify-content-center">
      <img src="/images/quotation-body.png" alt="" />
    </div>
    <br />
    <div class="text" @click="OpenCreateQuotation">+ Create Quotation</div>
  </div>
  <QuotationTable
    v-if="$store.state['salesSales']['QuotationTabTableData'].length != 0"
    :key="$store.state['sales']['quotationTableData']"
    tableClass="p-datatable-sm QuotationTabTable"
    tableDataName="QuotationTabData"
    :overlayData="$store.state['sales']['quotationOverlayData']"
    tableName="QuotationTabTable"
    :tableData="$store.state['salesSales']['QuotationTabTableData']"
    :tableColumns="$store.state['salesSales']['quotationTabTableColumnData']"
    dataKey="id"
    type="Quotation"
  />
</template>

<script>
import QuotationTable from "../../../components/Sales/Common/QuotationTable.vue";
export default {
  components: { QuotationTable },
  mounted() {
    // if (localStorage.getItem("companyID")) {
    //   this.$store.state.sales.salesCompanyid =
    //     localStorage.getItem("companyID");
    // }
    // this.$store.state.masters.expressRegionsTripTableData = null;
    // if (this.$store.state.sales.salesCompanyid != null) {
    //   let apiPath =
    //     "?type=sales_company&type_id=" + this.$store.state.sales.salesCompanyid;
    //   this.$store.dispatch("sales/loadContactsApi", {
    //     apiPath: apiPath,
    //   });
    //   this.$store.dispatch("sales/loadQuotationApi", {
    //     id: this.$store.state.sales.salesCompanyid,
    //   });
    // }
  },
  methods:{
    OpenCreateQuotation(){
      document.getElementById("CreateNewQuotationSec").click()
    }
  }
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