<template>
  <div>
    <DataTable
      :value="sales"
      responsiveLayout="scroll"
      :class="tableClass"
    ></DataTable>
    <DataTable :value="[sales]" responsiveLayout="scroll" :class="tableClass">
      <div class="datatabel">
        <Column field="weight" header="Weight In kgs"></Column>
        <Column field="LWH" header="LxWxH (cm)"></Column>
        <Column field="postal_code" header="Postal Code"></Column>
        <Column field="quoteSendTo" header="Quotation Send to" class="column">
        </Column>
      </div>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
// import Button from "primevue/button";
import axios from "axios";
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  components: {
    DataTable,
    Column,
    // Button,
  },
  props: ["tableClass"],
  data() {
    return {
      sales: [
        {
          before: "",
          postal_code: "",
          building_name: "",
          quoteSendTo: "",
        },
      ],
    };
  },
  methods: {
    handleClick() {
      // Payload = {
      //   email: "antony@squashapps.com",
      //   template_id: this.$route.params.id,
      // };
      axios.post("/sales/quotations/send/" + this.$route.params.id, {
        email: "antony@squashapps.com",
        // this.$route.params.id
        template_id: "1",
      });
    },
  },
  watch: {
    "$store.state.salesRapidoAdhoc.salesSendQuotationEmail": function () {
      this.sales.quoteSendTo =
        this.$store.state.salesRapidoAdhoc.salesSendQuotationEmail;
    },
    "$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData": function () {
      this.sales = this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData;
      const { rapido_adhoc_specifics } =
        this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData;
      this.sales["weight"] = rapido_adhoc_specifics.weight;
      this.sales["quoteSendTo"] =
        this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData.contacts[0].email;
      this.sales["postal_code"] =
        rapido_adhoc_specifics.from_postal_code +
        " - " +
        rapido_adhoc_specifics.to_postal_code;
      this.sales["LWH"] =
        rapido_adhoc_specifics.length +
        "X" +
        rapido_adhoc_specifics.width +
        "X" +
        rapido_adhoc_specifics.height;
    },
  },
  created() {
    // console.log(
    //   this.$store.state.salesRapidoAdhoc.salesSendQuotationEmail
    //     .company_contacts[0].email,
    //   "............."
    // );
    this.sales.quoteSendTo =
      this.$store.state.salesRapidoAdhoc.salesSendQuotationEmail;
    this.sales = this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData;
  },
};
</script>
<style scoped>
::v-deep.p-button {
  background-color: #7469f2;
  border: none;
  margin-left: 1000px;
}
::v-deep.p-button:enabled:hover {
  background-color: #7469f2;
  border: none;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: none !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff !important;
  padding: 15px !important;
  border-radius: 5px;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  border: 0px solid #e9ecef !important;
  border-width: 0 0 0 0 !important;
}
.sample.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
  color: green;
}
::v-deep.field {
  margin-bottom: 0;
}
.action {
  padding-top: 0 !important;
}
::v-deep.p-datatable .p-datatable-tbody > tr > td {
  border: none !important;
}
::v-deep.p-datatable-responsive-scroll > .p-datatable-wrapper {
  border-radius: 8px;
}
.sent-button {
  position: absolute;
  right: 39px;
  z-index: 1;
  color: #fbfbfb;
  border-radius: 9px;
  top: 133px;
  background-color: #7469f2;
  font-size: 12px;
}
</style>
