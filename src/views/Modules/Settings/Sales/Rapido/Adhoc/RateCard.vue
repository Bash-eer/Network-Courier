<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left"></i></span>
      </div>
      <div>
        <div class="zone-name">
          {{ $store.state.rapidoAdhoc.rapdio_adhoc_page_header }}
          <span
            ><img
              v-if="isDefault == true"
              src="../../../../../../../public/images/default.png"
              class="ml-3"
              v-bind:title="title"
          /></span>
        </div>
      </div>
    </div>

    <div class="flex flex-row mx-2">
      <div class="mr-2">
        <SearchField />
      </div>
      <div class="ml-2">
        <ReportExport />
      </div>
      <Buttons
        label="Add New"
        button_class="p-button-sm mx-1 px-4 add-btn custom-add-btn"
        v-on:childToParent="openDialog('AddNewRate', 'rapidoAdhoc', 'Add New')"
      />
    </div>
  </div>
  <AdhocTable
    tableName="RapidoAdhocRateCard"
    :tableData="$store.state.rapidoAdhoc.adhocRatesSecondPageTableData"
    :tableColumns="tableColumnData"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['rapidoAdhoc'].toastData.severity"
    :summary="$store.state['rapidoAdhoc'].toastData.summary"
  />
  <AddZoneDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['rapidoAdhoc'].dialogComponent"
  />
</template>

<script>
import AdhocTable from "../../../../../../components/Settings/Sales/Rapido/Tables/DataTable.vue";
import AddZoneDialogs from "../../../../../../components/Settings/Sales/Rapido/Adhoc/Dialog.vue";
import Toasts from "../../../../../../components/Settings/Sales/Rapido/Adhoc/Toasts.vue";
import { adhocRatesTableColumnData } from "../../../../../../components/Settings/Sales/Rapido/const/const.js";
export default {
  components: {
    AdhocTable,
    Toasts,
    AddZoneDialogs,
  },
  data: () => ({
    isDefault: null,
    tableColumnData: adhocRatesTableColumnData,
    title: "Default",
  }),
  methods: {
    setTabHandler() {
      this.$store.state.rates.ratesCurrentTab = "Rapido";
      this.$store.state.rates.rapidoCurrentTabs = 1;
      this.$router.push("/settings/sales-settings/rates");
    },
    openDialog(name, type, header) {
      if (type == "rapidoAdhoc") {
        this.$store.dispatch("rapidoAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["rapidoAdhoc/controlActivityDialog"];
      }
    },
  },
  async created() {
    let id = this.$route.params.id;
    console.log(this.$route.params.id);
    await this.$store.dispatch("rapidoAdhoc/loadAdhocSecondPageData", {
      path: "settings/sales/rates/rapido/adhoc/ratecard/" + id,
      mutation: "fetchadhocRatesSecondPageTableData",
    });
    this.isDefault =
      this.$store.state.rapidoAdhoc.adhocTableRowRateCardIsDefault;
    this.$store.state.rapidoAdhoc.rapdio_adhoc_page_header =
      this.$store.state.rapidoAdhoc.adhocTableRowRateCardName;
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
