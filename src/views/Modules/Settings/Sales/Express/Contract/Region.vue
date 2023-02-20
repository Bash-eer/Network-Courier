<template>
  <!-- <Card> -->
  <!--CARD HEADER-->
  <!-- <template #header> -->
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <router-link to="/settings/sales-settings/rates">
        <div class="mx-3 m-2 cursor-pointer">
          <i class="pi pi-arrow-left"></i>
        </div>
      </router-link>
   <div>
        <div class="region-name">Regions</div>
      </div>
      </div>
        <div class="flex">
          <div class="flex flex-row">
            <!-- <TextField
              v-model="searcher"
              placeholder="Search by Keyword"
              icon="pi pi-search"
              icon_class="p-input-icon-left"
              classes="p-inputtext-sm p-2 search-text"
              v-on:childToParent="globalSearcher"
            /> -->
             <SearchField storePath="contacts"/>
            <Buttons
              label="Add New"
              button_class="p-button-sm mx-2 add-btn custom-add-btn bg-357dea"
              v-on:childToParent="
                openDialog('AddNewRegion', 'expressContract', 'Add New Region')
              "
            />
          </div>
        </div>
    
    </div>

  <!-- </template> -->
  <!--CARD CONTENT-->
  <!-- <template #content> -->
  <!--LEVEL ONE TABS-->
  <RegionTable
    tableClass="p-datatable-sm RegionsTable"
    tableDataName="AddRegionData"
    :overlayData="overlayData"
    tableName="AddRegionTable"
    :tableData="$store.state['expressContract']['addRegionTableData']"
    :tableColumns="tableColumnData"
    dataKey="id"
  />
  <!--LEVEL ONE TABS-->
  <!-- </template>
  </Card> -->
  <!--dialog-->
  <AddRegionDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressContract'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['expressContract'].toastData.severity"
    :summary="$store.state['expressContract'].toastData.summary"
  />

  <!-- <CustomToast
    :severity="$store.state['expressContract'].toastData.severity"
    :summary="$store.state['expressContract'].toastData.summary"
    storePath="expressContract"
  /> -->
</template>

<script>
import axios from "axios";

const { URL } = require("../../../../../../../config/const");
import AddRegionDialogs from "../../../../../../components/Settings/Sales/Express/Contract/Dialog.vue";

import {
  RegionsOverlayData,
  add_region_TableColumnData,
} from "../../../../../../components/Settings/Sales/Express/Contract/const/const";

import RegionTable from "../../../../../../components/Settings/Sales/Express/Contract/Tables/RegionTable.vue";
import Toasts from "../../../../../../components/Settings/Sales/Express/Contract/Toasts.vue";
import { mapMutations } from 'vuex';
export default {
  components: {
    //Card,
    AddRegionDialogs,
    RegionTable,
    Toasts,
    //CustomToast
  },
  data: () => ({
    tableColumnData: add_region_TableColumnData,
    overlayData: RegionsOverlayData,
  }),
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    openDialog(name, type, header) {
      //opens express contract dialogs
      if (type == "expressContract") {
        this.$store.dispatch("expressContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressContract/controlActivityDialog"];
      }
    },
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > Express > Regions",
    });
    this.$store.dispatch("expressContract/loadRegionsData", {
      path: "settings/salesSettings/rates/express/contract/region",
      mutation: "fetchRegionsData",
    });
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.region-name {
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
