<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Special Job Entry</span>
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
              placeholder="Search by Keyword"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />
      </div>
    </div>

    <div class="flex ml-2">
      <div class="flex flex-row flex-wrap">
        <div class="flex tabPills mr-6">
          <!-- tabs -->
          <ul
            class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
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
                @click="tabChange(tabs)"
                :class="
                  index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                "
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

    <div
      v-if="currentTab == 'SupervisorCountTab'"
      class="flex ml-4 mt-6 flex-row flex-wrap card-container blue-container"
    >
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-start
          font-bold
          color-000
          mb-2
          border-round
        "
      >
        <h5 class="color-000 bold-500 flex font-size-14">Date</h5>

        <Calendar
          dateFormat="dd/mm/yy"
          class="contactsCalendar"
          v-model="details.date_time"
          :showIcon="true"
          style="width: 100%"
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
        />
      </div>
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-start
          font-bold
          color-000
          mb-2
          border-round
          ml-3
        "
      >
        <h5 class="color-000 bold-500 flex font-size-14">Zone</h5>

        <Dropdown
          class="text-left"
          v-model="supervisorZone"
          @change="updateZoneData($event.value)"
          :options="getUpdatedZoneListData"
          optionLabel="name"
        />
      </div>
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-start
          font-bold
          color-000
          mb-2
          border-round
          ml-3
        "
      >
        <h5 class="color-000 bold-500 flex font-size-14">Rider Type</h5>
        <Dropdown
          class="text-left"
          v-model="supervisorRiderType"
          :options="riderType"
          optionLabel="name"
          optionValue="name"
        />
      </div>
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-start
          font-bold
          color-000
          mb-2
          mt-4
          border-round
          ml-3
        "
      >
        <Buttons
          label="List"
          v-on:childToParent="getSupervisorList"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />
      </div>
    </div>

    <!-- <div
      v-if="currentTab == 'HistoryTab'"
      class="flex ml-4 mt-6 flex-row flex-wrap card-container blue-container"
    >
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-start
          font-bold
          color-000
          mb-2
          border-round
        "
      >
        <h5 class="color-000 bold-500 flex font-size-14">
          Special Job History
        </h5>
        <Dropdown
          class="text-left w-12rem"
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
        />
      </div>
    </div> -->

    <!-- tab-content -->
    <div class="tab-content tableSmall" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->

        <SpecialJobEntryTable
          :tableClass="getTableClass(tabs.label)"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :tabPageOffset="tabs.pageOffset"
          :overlayData="getOverlayData(tabs.label)"
          :tableData="getTableDataForSpecialJob"
          :totalRecords="
            $store.state['operationsSpecialJobEntry']['totalRecords']
          "
          dataKey="id"
          :tableColumns="
            $store.state['operationsSpecialJobEntry'][tabs.columns]
          "
          v-bind:is="tabs.tab"
          :currentTab="currentTab"
        />
      </div>
    </div>

    <div
      v-if="currentTab === 'SupervisorCountTab'"
      class="flex flex-row-reverse flex-wrap card-container yellow-container"
    >
      <div
        class="
          flex
          align-items-center
          justify-content-center
          h-4rem
          font-bold
          text-gray-900
          border-round
          m-2
        "
      >
        <!--Create Export button -->
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />
      </div>
      <div
        class="
          flex
          align-items-center
          justify-content-center
          h-4rem
          font-bold
          text-gray-900
          border-round
          m-2
        "
      >
        <!--Create Export button -->
        <Buttons
          label="Save"
          v-on:childToParent="updateSupervisorData"
          class="p-button mr-3 ml-2 dialog-button-text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import SpecialJobEntryTable from "./specialJobEntryTable.vue";
import Dropdown from "primevue/dropdown";
import moment from "moment";

export default {
  name: "SpecialJobEntryParent",
  components: {
    InputText,
    SpecialJobEntryTable,
    Dropdown,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "ExpressTab",
    searchValue: "",
    initialComponent: "",
    selectedRiderType: { name: "Employee", code: "Employee" },
    supervisorBikeZoneId: null,
    supervisorVanZoneId: null,
    supervisorZone: "",
    supervisorRiderType: "",
    riderType: [
      { name: "Employee", code: "Employee" },
      { name: "Contractor", code: "Contractor" },
    ],
    details: {
      date_time: "",
    },
  }),
  methods: {
    ...mapActions({
      loadSupervisorCountDataFetch:
        "operationsSpecialJobEntry/loadSupervisorCountDataFetch",
      loadHistoryDataFetch: "operationsSpecialJobEntry/loadHistoryDataFetch",
      loadZoneDataFetch: "operationsSpecialJobEntry/loadZoneDataFetch",
      specialJobEntryUpdate: "operationsSpecialJobEntry/updateSpecialJobEntry",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.commonOverlayData;
    },

    updateZoneData(event) {
      this.supervisorBikeZoneId = event?.bike_zone_id || null;
      this.supervisorVanZoneId = event?.van_zone_id || null;
    },

    search: _.debounce(function (e) {
      let data = {
        label: this.currentTab,
        searchValue: this.searchValue,
      };
      //       this.globalSearch(data);
    }, 600),

    openDialog() {
      this.dialogComponent = "statusSettingsDialog";
      this.initialComponent = "statusSettingsMainDialog";
      //       this.showStatusDialog(true);
    },

    async tabChange(tab) {
      this.currentTab = tab.label;
      this.$store.state.operationsSpecialJobEntry.tableLoad = true;

      if (this.currentTab == "SupervisorCountTab") {
        this.loadSupervisorCountDataFetch(this.currentTab);
      } else if (this.currentTab == "HistoryTab") {
        this.loadHistoryDataFetch(this.currentTab);
      }
    },

    getSupervisorList() {
      let supervisorData = {
        deliver_date: moment(this.details.date_time).format("YYYY/MM/DD"),
        bike_zone_id: this.supervisorBikeZoneId,
        van_zone_id: this.supervisorVanZoneId,
        profile_type: this.supervisorRiderType, //"Employee",
        orderBy: ["deliver_date", "DESC"],
        filter_params: [
          {
            column_name: "display_name",
            type: "contains",
            searchKey: "",
          },
        ],
      };
      let payLoad = {
        tab: this.currentTab,
        payLoads: supervisorData,
      };
      this.loadSupervisorCountDataFetch(payLoad);
    },
    async updateSupervisorData() {
      console.log(this.selectedRowData, "selectedRowData");
      if (this.selectedRowData.length > 0) {
        let data = {
          supervisorUpdates: this.selectedRowData,
        };
        let supervisorResponse = await this.specialJobEntryUpdate(data);
        if (supervisorResponse && supervisorResponse.status === 200) {
          console.log(supervisorResponse);
          let info = "Supervisor data updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info =
            supervisorResponse.data.message ||
            "Failed to update the supervisor data";
          this.commonToast("error", "Error", info);
        }
      }
    },
    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },

  computed: {
    ...mapGetters({
      tabMenuData: "operationsSpecialJobEntry/getStatusSettingsTabMenuData",
      getTableDataForSpecialJob:
        "operationsSpecialJobEntry/getTableDataForSpecialJob",
      getUpdatedZoneListData:
        "operationsSpecialJobEntry/getUpdatedZoneListData",
      selectedRowData: "operationsSpecialJobEntry/getSelectedRowData",
    }),
  },
  created() {
    this.currentTab = "SupervisorCountTab";
    this.details.date_time = moment().format();
    let datas = {
      deliver_date: moment(this.details.date_time).format("YYYY/MM/DD"),
      bike_zone_id: null,
      van_zone_id: null,
      profile_type: "", //"Employee",
      orderBy: ["deliver_date", "DESC"],
      filter_params: [
        {
          column_name: "display_name",
          type: "contains",
          searchKey: "",
        },
      ],
    };

    let payLoad = {
      tab: this.currentTab,
      payLoads: datas,
    };
    this.loadSupervisorCountDataFetch(payLoad);
    this.loadZoneDataFetch();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.operations-zones-tab-nav {
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}

::v-deep
  [data-v-1f88fdea]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon,
::v-deep
  [data-v-c02eca38]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.nav-pills .nav-link.active[data-v-1f88fdea] {
  font-family: $font-family-third !important;
}
// ::v-deep .p-datatable.p-datatable-sm .p-datatable-header {
//   margin-left: 12px;
// }
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}

.tableSmall {
  margin: 2% !important;
}
</style>
