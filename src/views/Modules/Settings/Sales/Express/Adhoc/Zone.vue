<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row align-items-center m-3">
      <!-- <router-link to="/settings/sales-settings/rates">
        <div class="mx-3 m-2 cursor-pointer">
          <i class="pi pi-arrow-left"></i>
        </div>
      </router-link> -->
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left"></i></span>
      </div>
      <div>
        <div class="color-4e5968 font-size-18 bold-700">Zones (Adhoc)</div>
      </div>
    </div>

    <div class="flex flex-row">
      <SearchField storePath="contacts" />
      <div class="ml-2">
        <ReportExport />
      </div>
      <Buttons
        label="Add New"
        button_class="p-button-sm mx-1 px-2 add-btn custom-add-btn bg-357dea"
        v-on:childToParent="
          openDialog('AddNewZone', 'expressAdhoc', 'Add New Zone')
        "
      />
    </div>
  </div>

  <!--LEVEL ONE TABS-->
  <AdhocTable
    tableClass="p-datatable-sm ZonesTable"
    tableDataName="AddZoneData"
    :overlayData="overlayData"
    tableName="AddZoneTable"
    :tableData="$store.state['expressAdhoc']['addZoneTableData']"
    :tableColumns="tableColumnData"
    dataKey="id"
  />
  <!--LEVEL ONE TABS-->

  <!--dialog-->
  <AddZonesDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressAdhoc'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['expressAdhoc'].toastData.severity"
    :summary="$store.state['expressAdhoc'].toastData.summary"
  />
</template>
<script>
import AddZonesDialogs from "../../../../../../components/Settings/Sales/Express/Adhoc/Dialog.vue";

import {
  ZonesOverlayData,
  add_zone_TableColumnData,
} from "../../../../../../components/Settings/Sales/Express/Adhoc/Const/const";
import AdhocTable from "../../../../../../components/Settings/Sales/Express/Adhoc/Tables/AdhocTable.vue";
import Toasts from "../../../../../../components/Settings/Sales/Express/Adhoc/Toasts.vue";
import { mapMutations } from 'vuex';

export default {
  components: {
    // Card,
    AddZonesDialogs,
    AdhocTable,
    Toasts,
    //CustomToast
  },
  data: () => ({
    tableColumnData: add_zone_TableColumnData,
    overlayData: ZonesOverlayData,
  }),
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    setTabHandler() {
      this.$store.state.rates.ratesCurrentTab = "Express";
      this.$store.state.rates.expressCurrentTabs = 1;
      this.$router.push("/settings/sales-settings/rates");
    },
    openDialog(name, type, header) {
      //opens express contract dialogs
      if (type == "expressAdhoc") {
        this.$store.dispatch("expressAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressAdhoc/controlActivityDialog"];
      }
    },
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > Express > Adhoc > Zones",
    });
    this.$store.dispatch("expressAdhoc/loadZonesData", {
      path: "/settings/salesSettings/rates/express/adhoc/zone",
      mutation: "fetchZonesData",
    });
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
// .zone-name {
//   font-style: normal;
//   font-weight: 700;
//   font-size: 18px;
//   color: #4e5968;
// }
.rate-card-name {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
</style>
