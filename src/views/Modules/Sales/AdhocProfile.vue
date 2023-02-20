<template>
  <div class="wrapper" v-if="adhoc_pro_TableData.length == 0">
    <div class="img-wrap flex align-items-center justify-content-center">
      <img src="/images/quotation-body.png" alt="" />
    </div>
    <br />
    <div class="text" @click="OpenAdhocProfile">+ Create Adhoc Profile</div>
  </div>
  <QuotationTable
    v-if="adhoc_pro_TableData.length != 0"
    tableClass="p-datatable-sm QuotationTabTable"
    tableDataName="AdhocProfileTabData"
    :overlayData="adhoc_pro_OverlayData"
    tableName="AdhocProfileTabTable"
    :tableData="adhoc_pro_TableData"
    :tableColumns="adhoc_pro__TableColumnData"
    dataKey="id"
    type="Adhoc"
  />
</template>

<script>
import QuotationTable from "../../../components/Sales/Common/QuotationTable.vue";
import { adhoc_pro } from "../../../store/helper";
export default {
  components: { QuotationTable },
  computed: {
    ...adhoc_pro,
  },
  methods: {
    OpenAdhocProfile() {
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "CreateProfile",
          dialogHeader: "New Adhoc Profile",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
  },
  mounted() {},
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