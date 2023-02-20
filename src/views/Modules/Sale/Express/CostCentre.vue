<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex"><span class="header">Costing Details</span></div>
    <div class="flex">
      <span class="add" @click="addCostCenter">+Add Cost Center</span>
    </div>
  </div>
  <hr class="horizontal_line" />
  <SalesTables
    v-if="
      $store.state['sales']['timeLineExpressCostCenterTableData'].length > 0
    "
    :key="$store.state['sales']['timeLineExpressCostCenterTableData']"
    :overlayData="$store.state['sales']['quotationOverlayData']"
    tableClass="p-datatable-sm timeLineExpressCostCenterTable"
    tableDataName="timeLineExpressCostCenterTableData"
    tableName="timeLineExpressCostCenterTable"
    :tableData="$store.state['sales']['timeLineExpressCostCenterTableData']"
    :tableColumns="
      $store.state['sales']['timeLineExpressCostCenterTableColumnData']
    "
  />
</template>

<script>
export default {
  name: "CostCentre",
  methods: {
    addCostCenter() {
      this.$store.state["sales"].contactsStateData = [];
      this.$store.state["sales"].costingCentreCreationStateData = {};
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = "CostCentresDialog";
      this.$store.getters.controlActivityDialog;
    },
  },
};
</script>

<style scoped>
.timeLineExpressCostCenterTable .p-datatable-row-expansion {
  background: #fff3f6 !important;
}

.new_costCenter {
  color: #357dea;
  cursor: pointer;
  font-size: 14px;
}
.header {
  color: #343434;
  font-size: 16px;
  font-weight: 600;
}
.horizontal_line {
  margin: 0px !important;
}
.add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
