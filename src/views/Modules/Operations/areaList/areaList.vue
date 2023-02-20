<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between pt-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <i
              class="
                pi pi-arrow-left
                mr-3
                flex
                align-items-center
                cursor-pointer
              "
              @click="redirecToPreviousPage"
            ></i>
            <span class="table-title">Area List</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchValue"
              class="global-search"
              @input="search($event.target.value)"
              placeholder="Search"
            />
          </span>
        </div>

        <!--Create Import button -->
        <Buttons
          label="Import"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Export button -->
        <Buttons
          label="Export"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Company button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openNewDialog()"
        />
      </div>
    </div>
    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <div
        :class="'tab-pane fade show active'"
        :id="'pills-zone-area-table'"
        role="tabpanel"
        :aria-labelledby="'pills-zone-area-table-tab'"
      >
        <AreaListTable
          :tableClass="getTableClass('zone-area-list')"
          :tableDataName="'ZonesAreaListTable'"
          :tableName="'ZonesAreaListTable'"
          :overlayData="getOverlayData()"
          :tableData="$store.state['zoneAreaList']['zoneAreaListData']"
          :tableColumns="
            $store.state['zoneAreaList']['zonesAreaListTableColumnData']
          "
          :totalRecords="$store.state['zoneAreaList']['totalRecords']"
        ></AreaListTable>
      </div>
    </div>
  </div>
  <areaListDialog></areaListDialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AreaListTable } from "./areaListTable";
import areaListDialog from "../../../../components/Operations/areaListDialog.vue";
const _ = require("lodash");
import InputText from "primevue/inputtext";

export default {
  name: "AreaList",
  components: {
    areaListDialog,
    InputText,
  },
  data: () => ({
    searchValue: "",
  }),
  methods: {
    ...mapActions({
      getAllAreaList: "zoneAreaList/loadAllAreasData",
      updateBreadCrumb: "users/updateBreadCrumb",
    }),
    openNewDialog() {
      this.$store.state["zoneAreaList"].displayDialog = true;
      this.$store.state["zoneAreaList"].zonesAddressData = {};
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData() {
      return this.$store.state.masters.commonOverlayData;
    },
    redirecToPreviousPage() {
      this.$router.go(-1);
    },
    search: _.debounce(function (e) {
      let areaListParams = {
        offset: 1,
        limit: 10,
        filterParams: {},
        orderBy: ["createdAt", "ASC"],
        searchKey: e,
      };
      this.getAllAreaList(areaListParams);
    }, 600),
  },
  created() {
    let areaListParams = {
      offset: 1,
      limit: 10,
      filterParams: {},
    };
    this.getAllAreaList(areaListParams);
    this.updateBreadCrumb("Route Planning Zones");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.table-title {
  color: #4e5968;
  font-weight: 700;
  font-size: 18px;
}
::v-deep .zone-address-check-icon {
  color: $color-66c11e !important;
  font-weight: 600;
}
::v-deep
  [data-v-1a37f10e]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
::v-deep .global-search {
  height: 37px !important;
}

::v-deep .global-search {
  height: 37px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
</style>
