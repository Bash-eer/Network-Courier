<template>
  <div>
    <Card>
      <template #header>
        <div class="flex align-items-center justify-content-between">
          <div class="left-content flex align-items-center">
            <div
              @click="returnToList"
              class="pi pointer icon pi-arrow-left"
            ></div>
            <div class="text-lg color-4e5968 ml-3">Fuel Charges</div>
          </div>
          <div class="right-content flex align-items-center">
            <SearchField storePath="Outbound" class="mr-3" />
            <Buttons
              label="Export All"
              button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn"
              v-on:childToParent="redirect('internationalCountryList')"
            />
            <Buttons
              label="Add New"
              button_class="p-button-sm mr-4 add-btn custom-add-btn"
              v-on:childToParent="openDialog"
            />
          </div>
        </div>
      </template>

      <template #content>
        <DataTable
          tableName="fuelChargesTable"
          :tableData="tableData"
          :tableColumns="tableColumns"
          type="bike"
          storePath="Outbound"
        />
      </template>
    </Card>
    <FuelChargeDialog
      :show="fuelCharges.displayFuelChargeDialog"
      v-if="fuelCharges.displayFuelChargeDialog"
      @close="setFuelChargeDialog(false)"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import Card from "primevue/card";
import DataTable from "../Component/Table/DataTable.vue";
import FuelChargeDialog from "./FuelChargeDialog.vue";
import { fuelChargeTableColumn } from "../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { Card, DataTable, FuelChargeDialog },
  data() {
    return {
      renderKey: 10,
      tableData: [],
      tableColumns: fuelChargeTableColumn,
    };
  },
  watch: {
    renderKey() {
      this.getData();
    },
    storeRenderKey() {
      this.getData();
    },
  },
  computed: {
    ...mapGetters({
      fuelCharges: "Outbound/Edit/fuelCharges",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      setFuelChargeDialog: "Outbound/Edit/setFuelChargeDialog",
      getFuelCharges: "Outbound/Edit/getFuelCharges",
    }),
    openDialog() {
      this.setFuelChargeDialog(true);
    },
    returnToList() {
      this.$router.push({ name: "salesRates" });
    },
    async getData() {
      try {
        this.tableData = [];
        const res = await this.getFuelCharges(this.$route.params.id);
        if (res) {
          res.data.results.map((list, idx) => {
            this.tableData.push({
              sl_no: idx + 1,
              from_date: new Date(list.from_date),
              to_date: new Date(list.to_date),
              vendor_code: list.agent_id,
              vendor: list.fuel_charge_agent.vendor.agent_name,
              percentage: list.percentage,
              created_by: list.user.display_name,
              createdAt: new Date(list.createdAt),
              id: list.id,
            });
          });
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
  },
  async created() {
    await this.getData();
  },
};
</script>

<style scoped>
:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}
</style>