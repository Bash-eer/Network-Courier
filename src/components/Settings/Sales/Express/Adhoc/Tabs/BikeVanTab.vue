<template>
  <div class="w-100">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding px-1"
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
                  @click="tabChange(tabs.label)"
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
          <div
            v-if="currentTab == 'Attendance'"
            class="flex align-items-center attendanceTabText"
          >
            <div class="flex flex-row">
              <div
                class="flex mr-2"
                v-for="(attendance, index) in $store.state.contacts
                  .contactManagementAttendanceTabData"
                :key="index"
              >
                <span>{{ index }}: {{ attendance }}</span>
                <span class="line-opacity">&nbsp;|</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right contents -->
    </div>
    <!--  <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.heading"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['expressAdhoc'][tabs.data]"
            :tableColumns="$store.state['expressAdhoc'][tabs.columns]"
            v-bind:is="tabs.tab"
            :storePath="'expressAdhoc'"
          ></component>-->
    <!-- tab-content -->
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <keep-alive v-if="tabs.label == 'Bike' || tabs.label == 'Van'">
          <div>
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.heading"
              :tableData="tabs.data"
              :tableColumns="tabs.columns"
              v-bind:is="tabs.tab"
            ></component>
          </div>
        </keep-alive>
        <keep-alive
          v-if="
            tabs.label == 'NormalBike' ||
            tabs.label == 'NormalVan' ||
            tabs.label == 'EcomBike'
          "
        >
          <div>
            <BikeVanTable
              :TableOverlay="$store.state['expressAdhoc'][tabs.overlay]"
              :TableData="$store.state['expressAdhoc'][tabs.data]"
              :TableColumns="$store.state['expressAdhoc'][tabs.columns]"
              :TableName="tabs.label"
            />
          </div>
        </keep-alive>
        <keep-alive v-if="tabs.label == 'EcomVan'">
          <div>
            <DynamicTab :tabMenuData="generateDynamicTabData(tabs.data)" />
          </div>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import AdhocTable from "../Tables/AdhocTable.vue";
import AdhocSubTable from "../Tables/AdhocSubTable.vue";
import BikeVanTable from "../BikeVanTable.vue";
import DynamicTab from "./DynamicTabs.vue";
export default {
  name: "RatesTabs",
  props: ["tabMenuData", "type", "defaultTab"],
  components: {
    AdhocTable,
    AdhocSubTable,
    BikeVanTable,
    DynamicTab,
  },
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "International",
    // ecomVanDynamicData: null,
    ecomVanDynamicData: [
      {
        label: "FleetDashboard",
        tab: "DynamicTab",
        select: false,
        tabName: "Dashboard",
      },
      {
        label: "FleetVehicles",
        heading: "Vehicle Details",
        tab: "DynamicTab",
        select: true,
        tabName: "Vehicles",
        data: "FleetVehicleTableData",
        columns: "FleetVehicleTableColumnData",
      },
    ],
  }),
  methods: {
    tabChange(tab) {
      this.currentTab = tab;

      this.$store.state.expressAdhoc.TabChangeValue = tab;
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    // eslint-disable-next-line no-unused-vars
    generateDynamicTabData(data) {
      let Data = this.$store.state.expressAdhoc.ExpressAdhocEcomVanTableData;
      // console.log("in", data, Data);
      let dynamicTabsData = [];
      for (let s in Data) {
        let dynamicSubTabsDataObj = {};
        dynamicSubTabsDataObj["label"] = Data[s]["delivery_type"];
        dynamicSubTabsDataObj["tab"] = "ThirdPageDataTable";
        // dynamicSubTabsDataObj["tabName"] = Data[s]["delivery_type"];
        // dynamicSubTabsDataObj["heading"] = Data[s]["delivery_type"];
        // dynamicSubTabsDataObj["select"] = Data[s] == 0 ? false : true;
        // (dynamicSubTabsDataObj["tableName"] == this.tableName) == "Type1"
        //   ? "Type1Table"
        //   : "Type2Table";
        dynamicSubTabsDataObj["data"] = [];
        dynamicSubTabsDataObj["data"].push(Data[s]);
        dynamicTabsData.push(dynamicSubTabsDataObj);
      }

      return dynamicTabsData;
    },
    generateDynamicSubTabs(Data) {
      let dynamicSubTabsData = [];

      for (let s in Data["delivery_type"]) {
        let dynamicSubTabsDataObj = {};
        dynamicSubTabsDataObj["label"] = Data["delivery_type"][s][
          "delivery_type"
        ].replace(/\s+/g, "");
        dynamicSubTabsDataObj["tab"] = "ContractDataTable";
        dynamicSubTabsDataObj["tabName"] =
          Data["delivery_type"][s]["delivery_type"];
        dynamicSubTabsDataObj["heading"] =
          Data["delivery_type"][s]["delivery_type"];
        dynamicSubTabsDataObj["select"] =
          Data["delivery_type"][s] == 0 ? false : true;
        (dynamicSubTabsDataObj["tableName"] == this.tableName) == "Type1"
          ? "Type1Table"
          : "Type2Table";
        dynamicSubTabsDataObj["data"] = [];
        dynamicSubTabsDataObj["data"].push(Data["delivery_type"][s]);
        dynamicSubTabsData.push(dynamicSubTabsDataObj);
      }

      return dynamicSubTabsData;
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData(tableName) {
      if (
        tableName == "ContactSettingsRooms" ||
        tableName == "ContactSettingsEventStatus"
      ) {
        return this.$store.state["masters"].RoomSettingsOverlayData;
      } else {
        return this.$store.state["masters"].RoomSettingsOverlayData;
      }
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
      if (type == "expressContract") {
        this.$store.dispatch("expressContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressContract/controlActivityDialog"];
      } else if (type == "internationalInbound") {
        this.$store.dispatch("internationalInbound/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["internationalInbound/controlActivityDialog"];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: rgb(255, 255, 255) !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.attendanceTabText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.line-opacity {
  opacity: 0.2;
}
.PrintLableBtn {
  height: 32px;
}
::v-deep .search-text {
  width: 328px !important;
}
.Button-Font {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
</style>
