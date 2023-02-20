<template>
  <div class="m-4">
    <div class="card flex-column border-radius-18">
      <TimeLineStamp
        :cusId="cus_details?.cusId"
        :cusName="cus_details.customerName"
        :cusAddress="cus_details.address"
      />
    </div>
    <div class="bg-white row">
      <span class="col-10" />
      <Buttons
        button_class="p-button-sm add-btn custom-add-btn col-1 ml-6 my-3"
        label="Add Company"
        id="CreateNewQuotationSec"
        @click="addClient"
      />
      <DataTable
        tableName="ClientSubDataTable"
        tableDataName="ClientSubDataTable"
        :tableData="sub_table_data.rows"
        :tableColumns="sub_table_column"
        :overlayData="ovarlay_data_contact"
        :expansionOption="true"
        tableClass="p-datatable-sm QuotationTabTable"
        @seletedMainRows="mainRows"
        section="Other"
        @onPageChange="onPageChange"
        @onSort="getTableData"
        @seletedSubRows="subRows"
        :totalRecords="sub_table_data.count ?? 0"
      />
    </div>
  </div>
  <CommonDialog
    :dialogComponent="$store.state['commonStore'].dialogComponent"
  />
</template>

<script>
//  import RadioButton from "primevue/radiobutton";
import { crmClState, crm_Client } from "../../../../store/modules/CRM/helper";
import DataTable from "../../../../components/CRM/TableComponents/dataTables.vue";
import TimeLineStamp from "../../../../components/CRM/timeLineStamp.vue";
import CommonDialog from "../../../../components/Reusables/Dialog/Dialog.vue";
import { genaralAct } from "../../../../store/helper";
export default {
  name: "ClientContact",
  components: { DataTable, TimeLineStamp, CommonDialog },

  data() {
    return {
      customerId: "",
      cus_details: {},
    };
  },

  computed: {
    ...crmClState,
  },
  async created() {
    this.setReset({ sub_pageNo: 1, sub_pageLimit: 10 });
    this.cus_details = this.$route.params;
    await this.getTableData();
  },
  mounted() {},
  watch: {},
  methods: {
    ...genaralAct,
    ...crm_Client,

    addClient() {
      this.setReset({
        customer_data: null,
        contract_profile_id: this.cus_details.id,
      });
      this.genaralOpenD({
        dialogDetails: {
          dialogName: "CRMClientDialog",
          dialogHeader: "Add Client",
        },
      });
    },
    async onPageChange(e, item) {
      this.setReset({ sub_pageNo: e.page + 1, sub_pageLimit: e.rows });
      await this.getTableData(item);
    },
    async getTableData(i) {
      let data = {
        ...i,
        customer_id: this.cus_details?.cusId,
      };
      await this.getCustomerSUbClient({ payload: data, toast: this.$toast });
    },
  },
};
</script>
<style scoped>
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}
::v-deep .p-inputtext {
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  border-color: none !important;
}
::v-deep .border {
  border: none !important;
}
.text {
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-accordion-header-text {
  font-weight: 700;
  font-size: 14px;
  color: #8f8383 !important;
}
.primary-color {
  color: #357dea !important;
}
.search-bg {
  background-color: #357dea;
  height: 37px;
  width: 35px;
}
.color-wi {
  color: #fff !important;
}
</style>
