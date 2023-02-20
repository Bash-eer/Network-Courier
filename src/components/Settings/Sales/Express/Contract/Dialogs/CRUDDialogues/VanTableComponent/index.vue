<template>
  <div>
    <DataTable
      tableName="ecommerceVanSd"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="true"
      expandedType="type_2"
      :tabs="[
        { tab: 'Rates', component: 'Rates', name: 'rates' },
        {
          tab: 'Charge by Weight',
          component: 'Charge by Weight',
          name: 'chargeByWeight',
        },
        {
          tab: 'Charge by Quantity',
          component: 'Charge by Quantity',
          name: 'chargeByQty',
        },
        {
          tab: 'Van Customer Bike Job',
          component: 'Van Customer Bike Job',
          name: 'vanCustomerBikeJob',
        },
      ]"
    />

    <Dialog
      :show="local_edit.e_delivery_type_v"
      v-if="local_edit.e_delivery_type_v"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import { ecommerceBikeSd } from "../../../const";
import { mapActions, mapGetters } from "vuex";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  props: ["data"],
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
      setRenderKey: "Outbound/Edit/setRenderKey",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "e_delivery_type_v",
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