<template>
  <span v-if="$store.state.salesSales.ContractSubTableData.length == 0">
    <div class="no_data p-3">No Revisions to show</div></span
  >
  <div
    v-else
    class="flex flex-column mt-2"
    v-for="(revision, index) of $store.state.salesSales.ContractSubTableData"
    :key="index"
  >
    <!-- {{ index }}
          {{ revision }}
          something
          {{ slotProps.data.revisions }} -->
    <div class="flex ml-3">
      <!--revision[0].update + ' ' + (index + 1)-->
      <StatusTags
        type="Revision"
        :label="'Revision' + ' ' + (index + 1)"
        usage="table"
      />
    </div>
    <!--:class="
                index != slotProps.data.Contract_contract_express.length - 1
                  ? 'flex mt-2 mb-2 pl-4 pr-4'
                  : 'flex mt-2 mb-4 pl-4 pr-4'
              "-->
    <div
      :class="
        index != $store.state.salesSales.ContractSubTableData.length - 1
          ? 'flex mt-2 mb-2 pl-4 pr-4'
          : 'flex mt-2 mb-4 pl-4 pr-4'
      "
    >
      <QuotationSubTable
        tableClass="p-datatable-sm QuotationTabSubTable w-100"
        tableDataName="ContractTabData"
        tableName="ContractTabSubTable"
        :tableData="getRevisionData(revision)"
        :tableColumns="
          $store.state['salesSales']['quotationSubTableColumnData']
        "
        dataKey="id"
      />
    </div>
  </div>
</template>

<script>
import QuotationSubTable from "../Common/QuotationSubTable.vue";
export default {
  components: { QuotationSubTable },
  methods: {
    getRevisionData(rev) {
      let revisionarr = [];
      revisionarr.push(rev);

      return revisionarr;
    },
  },
};
</script>

<style></style>
