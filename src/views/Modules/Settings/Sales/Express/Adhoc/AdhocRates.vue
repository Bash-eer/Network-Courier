<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left"></i></span>
      </div>

      <div>
        <div class="flex flex-row">
          <div class="zone-name">{{ rateCardName }}</div>
          <span>
            <img
              v-if="isDefault == true"
              class="m-2"
              src="/images/default.png"
              alt=""
              v-tooltip.top="'Default'"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-row mx-2">
      <SearchField storePath="contacts" />
      <div class="ml-2">
        <ReportExport />
      </div>
      <Buttons
        label="Add New"
        button_class="p-button-sm mx-1 px-2 add-btn custom-add-btn bg-357dea"
        v-on:childToParent="
          openDialog('SecondPageAddNew', 'expressAdhoc', 'Add New Zone')
        "
      />
      <!-- <Buttons
        label="Add New"
        button_class="p-button-sm mx-1 px-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('AddNewZone', 'expressAdhoc', 'Add New Zone')
        "
      /> -->
    </div>
  </div>

  <AdhocTable
    tableClass="p-datatable-sm AdhocRateCardTable"
    tableDataName="AdhocRateCard"
    :overlayData="overlayData"
    tableName="AdhocRateCard"
    :tableData="$store.state['expressAdhoc']['adhocRatesSecondPageTableData']"
    :tableColumns="tableColumnData"
    dataKey="id"
  />

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
  AdhocRatesOverlayData,
  adhoc_rates_TableColumnData,
} from "../../../../../../components/Settings/Sales/Express/Adhoc/Const/const";

import AdhocTable from "../../../../../../components/Settings/Sales/Express/Adhoc/Tables/AdhocTable.vue";
import Toasts from "../../../../../../components/Settings/Sales/Express/Adhoc/Toasts.vue";
import Tooltip from "primevue/tooltip";
import {mapMutations} from 'vuex';
export default {
  components: {
    AddZonesDialogs,
    AdhocTable,
    Toasts,
  },
  directives: {
    tooltip: Tooltip,
  },
  data: () => ({
    rateCardName: null,
    isDefault: null,
    tableColumnData: adhoc_rates_TableColumnData,
    overlayData: AdhocRatesOverlayData,
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
  async created() {
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Express > Adhoc > Zones",
    });
    let id = this.$route.params.id;
    await this.$store.dispatch("expressAdhoc/loadAdhocSecondPageData", {
      path: "/settings/sales/rates/express/adhoc/ratecard/" + id,
      mutation: "fetchadhocRatesSecondPageTableData",
    });

    this.rateCardName =
      this.$store.state.expressAdhoc.adhocTableRowRateCardName;
    this.isDefault =
      this.$store.state.expressAdhoc.adhocTableRowRateCardIsDefault;
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
.rate-card-name {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
</style>
