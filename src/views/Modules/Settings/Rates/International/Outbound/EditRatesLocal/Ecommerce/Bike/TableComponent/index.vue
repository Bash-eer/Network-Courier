<template>
  <div>
    <DataTable
      tableName="ecommerceBikeSd"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="true"
      expandedType="type_2"
      :tabs="[
        { tab: 'Rates', component: 'Rates', name: 'rates' },
        {
          tab: 'Bike Customer Van Job',
          component: 'Bike Customer Van Job',
          name: 'bikeCustomerVan',
        },
      ]"
    />

    <Dialog
      :show="local_edit.e_delivery_type_b"
      v-if="local_edit.e_delivery_type_b"
      @close="closeDialog"
      @save="this.setRenderKey()"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import { ecommerceBikeSd } from "../../../const";
import { mapActions, mapGetters } from "vuex";
import Dialog from "./dialog.vue";

export default {
  props: ["data"],
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: ecommerceBikeSd,
    };
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      toggleDialog: "Outbound/Edit/toggleDialog",
      setTypeId: "Outbound/Edit/setTypeId",
      setRenderKey: "Outbound/Edit/setRenderKey",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "e_delivery_type_b",
        data: false,
      });
      this.setRenderKey();
    },
  },
  created() {
    this.tableData = this.$props.data;
    this.tableData.map((_, idx) => {
      this.tableData[idx]["sl_no"] = idx + 1;
    });
  },
};
</script>

<style>
</style>