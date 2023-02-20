<template>
  <Card class="addExpressRegionsCard">
    <template #title>
      <div class="flex justify-content-between p-2">
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex align-self-center ml-1 mr-4">
              <span>
                <i class="pi pi-arrow-left ml-2" />
              </span>
            </div>
            <div class="flex align-self-center">Regions</div>
          </div>
        </div>
        <div class="flex">
          <Buttons
            button_class="p-button-sm add-btn custom-add-btn"
            label="Add New"
            v-on:childToParent="openDialog()"
          />
        </div>
      </div>
    </template>
    <template #content>
      <RatesTables
        storePath="masters"
        dataKey="region_id"
        tableClass="p-datatable-sm  expressAddNewRegionTable"
        tableDataName="expressAddNewRegionTableData"
        tableName="expressAddNewRegionTable"
        :overlayData="getOverlayData()"
        :tableData="$store.state['masters']['expressAddNewRegionTableData']"
        :tableColumns="
          $store.state['masters']['expressAddNewRegionTableColumnData']
        "
      ></RatesTables>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
export default {
  name: "AddRegion",
  components: {
    Card,
  },
  methods: {
    openDialog() {
      this.$store.state.masters.expressRegionFormData = {};
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = "AddNewRegion";
      this.$store.getters.controlActivityDialog;
    },
    getOverlayData() {
      return this.$store.state.masters.internationalRatesOverlayData;
    },
  },
  created() {
    this.$store.dispatch("masters/loadExpressRegions");
  },
};
</script>

<style>
.addExpressRegionsCard .p-card-body {
  padding: 0 !important;
}
</style>
