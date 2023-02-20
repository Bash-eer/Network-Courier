<template>
  <div class="flex mt-4 align-self-center">
    <div class="flex flex-row flex-wrap">
      <div class="flex tabPills mr-6">
        <span class="table-title">Booking History</span>
      </div>
    </div>
  </div>
  <div class="flex mt-4">
    <div class="flex flex-row flex-wrap">
      <div class="flex tabPills mr-6">
        <!-- tabs -->
        <ul
          class="nav nav-pills tab-padding px-1 operations-zones-tab-nav ml-0"
          id="pills-tab"
          role="tablist"
        >
          <li
            class="nav-item"
            role="presentation"
            v-for="(tabs, index) of tabMenuData"
            :key="tabs.label"
          >
            <button
              @click="tabChange(tabs, index)"
              :class="index == defaultTabIndex ? 'nav-link active' : 'nav-link'"
              :id="'pills-' + tabs.label + '-tab'"
              data-bs-toggle="pill"
              :data-bs-target="'#pills-' + tabs.label"
              type="button"
              role="tab"
              :aria-controls="'pills-' + tabs.label"
              :aria-selected="index == 0 ? true : false"
            >
              {{ tabs.tabName }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- tab-content -->
  <div class="tab-content mt-4" id="pills-tabContent">
    <!-- dynamic component-->
    <keep-alive v-if="currentTab == 'ExpressTab'">
      <component
        :tableClass="getTableClass(selectedTab.label)"
        :tableDataName="selectedTab.data"
        :tableName="selectedTab.label"
        :tabPageOffset="selectedTab.pageOffset"
        :overlayData="getOverlayData(selectedTab.label)"
        :tableData="
          $store.state['customerLaunchBookingHistory'][selectedTab.data]
        "
        :subTableData="
          $store.state['customerLaunchBookingHistory'][selectedTab.subTabledata]
        "
        :totalRecords="totalRecords"
        :tableColumns="expressHistoryColumns"
        :subTableColumns="expressHistorySubColumns"
        v-bind:is="selectedTab.tab"
        :currentTab="currentTab"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ExpressHistoryTable from "./expressHistory/expressHistoryTable";
export default {
  name: "BookingHistory",
  components: { ExpressHistoryTable },
  data: () => ({
    defaultTabIndex: 1,
    currentTab: "ExpressTab",
    isBookingHistory: false,
    tableKey: 0,
    selectedBooking: [],
    selectedTab: {},
  }),
  methods: {
    ...mapActions({
      expressDataFetch: "customerLaunchBookingHistory/loadExpressTableData",
      updateBreadCrumb: "users/updateBreadCrumb",
    }),
    async tabChange(tab, index) {
      this.currentTab = tab.label;
      let paginationParams = {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "DESC"],
      };
      if (this.currentTab == "ExpressTab") {
        this.expressDataFetch(paginationParams);
      }
      if (index) {
        this.selectedTab = this.tabMenuData[index];
      }
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData(tableName) {
      return this.$store.state.masters.customerlaunchBookingOverlayData;
    },
  },
  created() {
    let tab = {
      label: this.currentTab,
    };
    this.tabChange(tab, 1);
    this.isBookingHistory = true;
    this.updateBreadCrumb("Customer Launch Booking History");
    this.tableKey++;
  },
  computed: {
    ...mapGetters({
      tabMenuData: "customerLaunchBookingHistory/getCustomerTabMenuData",
      totalRecords: "customerLaunchBookingHistory/getTotalRecords",
      expressHistoryColumns:
        "customerLaunchBookingHistory/getExpressHistoryColumns",
      expressHistorySubColumns:
        "customerLaunchBookingHistory/getExpressHistorySubColumns",
      tableData: "customerLaunchBookingHistory/getExpressTableData",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.nav-pills {
  background: $color-fff !important;
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}
::v-deep[data-v-458370b6].p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
</style>
