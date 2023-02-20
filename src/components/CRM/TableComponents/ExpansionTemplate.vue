<template>
  <div class="flex flex-column mt-2">
    <!-- <span v-if="sub_table_data&&sub_table_data.rows?.length == 0">
    <div class="no_data p-3">No data</div></span> -->
    <div :class="'mt-2 mb-2 pl-4 pr-4'">
      <SubTable
        tableName="ContactTable"
        tableDataName="ClientSubDataTable"
        :tableData="sub_table_contact"
        :tableColumns="table_contact"
        :overlayData="ovarlay_data"
        @expansionTableRows="expansionTable"
        tableClass="p-datatable-sm QuotationTabTable"
        dataKey="id"
        :totalRecords="sub_table_contact?.length ?? 0"
        :selectedData="selectedData"
      />
      
    </div>
  </div>
</template>

<script>
import SubTable from "./subTable.vue";
// import QuotationSubTable from "../../Sales/Common/QuotationSubTable.vue";
import { crmClState, crm_Client } from "../../../store/modules/CRM/helper";
export default {
  props: ["selectedData"],
  components: { SubTable },
  computed: {
    ...crmClState,
  },
  methods: {
    ...crm_Client,
    getRevisionData(rev) {
      let revisionarr = [];
      revisionarr.push(rev);

      return revisionarr;
    },
    expansionTable(e) {
      this.$emit("routeTableRows", e);
    },
  },
};
</script>

<style></style>
