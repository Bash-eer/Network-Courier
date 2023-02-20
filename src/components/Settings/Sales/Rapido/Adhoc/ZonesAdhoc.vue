<template>
  <div
    class="
      flex
      justify-content-between
      align-items-center
      justify-content-center
      bg-white
    "
  >
    <div class="flex m-3">
      <div class="flex flex-row">
        <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
          <span> <i class="pi pi-arrow-left"></i></span>
        </div>

        <div class="flex">
          <div class="flex flex-column">
            <div class="flex zone-name">Zones (Adhoc)</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex mr-2">
          <SearchField storePath="rapidoAdhoc" />
        </div>
        <div class="flex mr-2">
          <ReportExport />
        </div>
        <div class="flex">
          <Buttons
            label="Add New"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            v-on:childToParent="
              openDialog('AddNewZonesdialog', 'rapidoAdhoc', 'Add New Zone')
            "
          />
        </div>
      </div>
    </div>
  </div>
  <ZoneDataTable
    tableName="ZoneAdhoc"
    :tableData="$store.state['rapidoAdhoc']['adhocZonesTableData']"
    :tableColumns="tableColumns"
    storePath="rapidoAdhoc"
    dataKey="id"
  />

  <RapidoAdhocDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['rapidoAdhoc'].dialogComponent"
  />

  <!--toast-->
  <Toasts
    :severity="$store.state['rapidoAdhoc'].toastData.severity"
    :summary="$store.state['rapidoAdhoc'].toastData.summary"
  />
</template>

<script>
import ZoneDataTable from "../../../../Settings/Sales/Rapido/Adhoc/Tables/DataTable.vue";
import RapidoAdhocDialogs from "../Adhoc/Dialog.vue";
import { AdhocZonesTableColumnData } from "../../../../Settings/Sales/Rapido/const/const.js";
import Toasts from "./Toasts.vue";
import axios from "axios";
const { URL } = require("../../../../../../config/const");

export default {
  components: {
    ZoneDataTable,
    RapidoAdhocDialogs,
    Toasts,
  },
  data: () => ({
    tableColumns: AdhocZonesTableColumnData,
  }),
  methods: {
    setTabHandler() {
      this.$store.state.rates.ratesCurrentTab = "Rapido";
      this.$store.state.rates.rapidoCurrentTabs = 1;
      this.$router.push("/settings/sales-settings/rates");
    },
    openDialog(name, type, header) {
      //opens express contract dialogs

      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
    },
  },
  created() {
    this.$store.dispatch("rapidoAdhoc/loadAdhocZonesData", {
      path: "/settings/salesSettings/rates/rapido/adhoc/zone",
      mutation: "fetchZonesData",
    });

    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.zone-name {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #4e5968;
}
</style>
