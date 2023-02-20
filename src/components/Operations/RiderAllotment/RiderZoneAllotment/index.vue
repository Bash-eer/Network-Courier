<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3">Rider Zone Allotment</div>
      <div class="d-flex align-items-center">
        <SearchField storePath="operationAllotment" class="mt-3 mx-2" />
        <Buttons
          button_class="export_button min-width-99 mt-3"
          label="Export"
        />
      </div>
    </div>
    <div
      class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center duo"
    >
      <keep-alive>
        <DuoSelect
          :options="['Bike', 'Van']"
          :default="defaultTransportType"
          type="setRegionDeliveryTransportType"
          class="mt-4"
      /></keep-alive>
    </div>
    <div v-if="defaultTransportType == 'Bike'">
      <keep-alive>
        <div :key="renderkey">
          <DataTable
            tableClass="p-datatable-sm AdhocRateCardTable"
            tableDataName="BikeZoneAllotmentData"
            :overlayData="overlayData"
            tableName="BikeAllotmentDataTable"
            :tableData="tableBikeData"
            :tableColumns="riderZoneTableColumns"
            dataKey="id"
          />
        </div>
      </keep-alive>
    </div>
    <div v-if="defaultTransportType == 'Van'">
      <keep-alive>
        <div :key="renderkey">
          <DataTable
            tableClass="p-datatable-sm AdhocRateCardTable"
            tableDataName="VanZoneAllotmentData"
            :overlayData="overlayData"
            tableName="BikeAllotmentDataTable"
            :tableData="tableVanData"
            :tableColumns="riderZoneTableColumns"
            dataKey="id"
          />
        </div>
      </keep-alive>
    </div>
  </div>

  <Toasts
    :severity="$store.state['operationAllotment'].toastData.severity"
    :summary="$store.state['operationAllotment'].toastData.summary"
  />
</template>
<script>
import DuoSelect from "../DuoSelect.vue";
import Toasts from "../Toast.vue";
import DataTable from "./DataTable.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "AllotmentZone",
  components: { DuoSelect, DataTable, Toasts },
  data() {
    return {
      defaultTransportType: "Bike",
      tableBikeData: [],
      tableVanData: [],
    };
  },
  computed: {
    ...mapState({
      riderZoneTableColumns: (state) =>
        state.operationAllotment.RiderZoneAllotmentTableColumnData,
    }),
  },
  methods: {
    ...mapActions({
      loadBikeRiderZoneAllotmentTableData:
        "operationAllotment/loadBikeRiderZoneAllotmentTableData",
      loadVanRiderZoneAllotmentTableData:
        "operationAllotment/loadVanRiderZoneAllotmentTableData",
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
    }),

    async getTableBikeData() {
      let s_no = 1;

      this.tableBikeData = [];
      this.$store.state.operationAllotment.BikeRiderZoneAllotmentTableData.map(
        (list) => {
          this.tableBikeData.push({
            profile_url: list.image_url,
            id: list.id,
            s_no: s_no++,
            driver: list.employee_name,
            zone: {
              id: list?.zone?.id,
              zone_name: list?.zone?.zone_name,
            },
            Check_box: list.stand_by,
          });
        }
      );
      this.renderkey++;
    },
    async getTableVanData() {
      let s_no = 1;

      this.tableVanData = [];
      this.$store.state.operationAllotment.VanRiderZoneAllotmentTableData.map(
        (list) => {
          this.tableVanData.push({
            profile_url: list.image_url,
            id: list.id,
            s_no: s_no++,
            driver: list.employee_name,
            zone: {
              id: list?.zone?.id,
              zone_name: list?.zone?.zone_name,
            },

            Check_box: list.stand_by,
          });
        }
      );
      this.renderkey++;
    },
  },
  created() {
    //this.$store.state.operationAllotment.BikeAllotmentTableData = [];
    this.$store.dispatch(
      "operationAllotment/loadBikeRiderZoneAllotmentTableData"
    );
    this.$store.dispatch(
      "operationAllotment/loadVanRiderZoneAllotmentTableData"
    );
    this.getTableBikeData();
    this.getTableVanData();
    let breadCrumbData = {
      title: "Settings",
      breadcrumbInfo: "Operations > Rider Zone Allotment",
    };
    this.updateBreadCrumb(breadCrumbData);
  },
  watch: {
    "$store.state.operationAllotment.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.operationAllotment.addRegionDeliveryTransportType;
      },
    "$store.state.operationAllotment.BikeRiderZoneAllotmentTableData":
      function () {
        this.getTableBikeData();
      },
    "$store.state.operationAllotment.VanRiderZoneAllotmentTableData":
      function () {
        this.getTableVanData();
      },
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.text_zone {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #4e5968;
}aligment {
  margin-left: 598px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
  margin-right: 20px;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
.duo {
  margin-bottom: 20px;
}
</style>
