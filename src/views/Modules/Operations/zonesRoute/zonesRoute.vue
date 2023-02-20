<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between pt-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <span class="table-title">Zones</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" v-model="searchValue" class="global-search" @input="search($event.target.value)" placeholder="Search" />
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
          label="Assign Area"
          v-on:childToParent="navigateToAssignArea()"
        />

        <!--Create Company button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openNewDialog()"
        />
      </div>
    </div>
    <div class="d-flex justify-content-start mx-4">
      <!-- <span class="table-breadcrumb">{{getBreadCrumbValue()}}</span> -->
      <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>'">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>{{ path }}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ zoneName }}
          </li>
        </ol>
      </nav>
    </div>

    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <div
        :class="'tab-pane fade show active'"
        :id="'pills-zone-area-table'"
        role="tabpanel"
        :aria-labelledby="'pills-zone-area-table-tab'"
      >
        <ZoneRouteTable
          :tableClass="getTableClass('zone-route-table')"
          :tableDataName="'ZonesRouteTable'"
          :tableName="'ZonesRouteTable'"
          :overlayData="getOverlayData()"
          :tableData="$store.state['operationZonesRoute']['zoneRouteListData']"
          :tableColumns="
            $store.state['operationZonesRoute']['zonesRouteTableColumnData']
          "
          :totalRecords="$store.state['operationZonesRoute']['totalRecords']"
          :currentTab="currentTab"
        ></ZoneRouteTable>
      </div>
    </div>
  </div>
  <zonesRouteDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['operationZonesRoute'].dialogComponent"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ZoneRouteTable } from "./zoneRouteTables/zoneRouteTable";
import zonesRouteDialog from "../../../../components/Operations/zonesRouteDialog.vue";
const _ = require("lodash");
import InputText from 'primevue/inputtext';

export default {
  name: "ZonesRoute",
  components: {
    ZoneRouteTable,
    zonesRouteDialog,
    InputText,
  },
  data: () => ({
    closeDialog: false,
    zoneName: "",
    path: "",
    zoneId: null,
    currentTab: "",
    searchValue: ''
  }),
  methods: {
    ...mapActions({
      loadInitialRouteData: "operationZonesRoute/loadCommonTableData",
      updateBreadCrumb: "users/updateBreadCrumb",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData() {
      return this.$store.state.masters.commonOverlayData;
    },
    openNewDialog() {
      this.$store.state["operationZonesRoute"].displayDialog = true;
      this.$store.state["operationZonesRoute"].dialogComponent =
        "newRouteZoneDialog";
      this.$store.state["operationZonesRoute"].currentTab = this.currentTab;
      this.$store.state["operationZonesRoute"].path = this.path;
      this.$store.state["operationZonesRoute"].selectedZoneName = this.zoneName;
      this.$store.state["operationZonesRoute"].zoneId = this.zoneId;
      this.$store.state["operationZonesRoute"].zonesRouteCreationData = {};
    },
    loadInitialData(path, id, zoneName) {
      this.path = path;
      let currentTab =
        this.path == "Van"
          ? "VanTab"
          : this.path == "Rapido"
          ? "RapidoTab"
          : "BikeTab";
      this.currentTab = currentTab;
      this.zoneId = id;
      this.zoneName = zoneName;
    },
    navigateToAssignArea() {
      this.$router.push({ name: "assignArea" });
    },
    search: _.debounce(function (e) {
     let id = this.$route.params.id;
     let data = {
      id: id,
      pagination: {
        offset: 1,
        limit: this.pageLimit,
        orderBy: ['createdAt', 'ASC'],
      },
      type: this.$route.params.tab,
      searchKey: this.searchValue
    };
    this.loadInitialRouteData(data);
    }, 600),
  },
  created() {
    let id = this.$route.params.id;
    let data = {
      id: id,
      pagination: {
        offset: 1,
        limit: 10,
        orderBy: ['createdAt', 'ASC'],
      },
      type: this.$route.params.tab,
      searchKey: this.searchValue
    };
    this.$store.state.operationZonesRoute.zoneId = id;
    let zoneName = this.$route.params.zoneName;
    let path = this.$route.params.tab;
    this.loadInitialRouteData(data);
    this.loadInitialData(path, id, zoneName);
    this.updateBreadCrumb("Route Planning Zones");
  },
  mounted() {},
  computed: {
    ...mapGetters({ filterParams: "operationZonesRoute/getRouteZoneFilterParams", pageOffset: "operationZonesRoute/getPageOffset", pageLimit: "operationZonesRoute/getPageLimit" }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.breadcrumb-item > a {
  color: #c4c4c4 !important;
  font-weight: 600;
  font-size: 12px;
  font-family: "Montserrat";
}
.breadcrumb-item.active {
  color: $color-7e84a7;
  font-weight: 600;
  font-size: 12px;
  font-family: "Montserrat";
  margin-top: 4px;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}
::v-deep
  [data-v-3c66342e]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon,
::v-deep
  [data-v-f85abf52]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
::v-deep .zone-route-check-icon {
  color: $color-66c11e !important;
  font-weight: 600;
}
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .p-datatable {
    padding: 0px !important;
}
</style>
