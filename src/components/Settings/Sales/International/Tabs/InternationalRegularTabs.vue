<template>
  <div class="w-100 tab-class">
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
                  @click="
                    tabChange(
                      tabs.label,
                      tabs.apiKey,
                      tabs.mutation,
                      tabs.heading,
                      tabs.dynamic
                    )
                  "
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
      <!-- "<div class="flex flex-row" v-if="tabMenuData[0].label == 'ClearanceMode'">
 

</div>" -->

      <div v-if="!show" class="card">
        <span class="mr-4"><i class="pi pi-pencil"></i>{{ edit }}</span>
        <span class="ml-3 flex"
          ><i class="pi pi-trash mt-1"></i>{{ clear }}
        </span>
      </div>
      <!-- right contents -->
      <div
        class="flex flex-row align-items-center"
        v-if="tabMenuData[0].label == 'ClearanceMode'"
      >
        <div class="pb-1">
          <CustomSpeedDial
            storePath="internationalInbound"
            :rowData="getRowData()"
            :dataName="tableDataName"
            :customDialData="InternationalInboundSubOverlayData2"
            :apiKey="apiKey"
            tableName="ClearanceModeTabOverlay"
          />
        </div>
        <!-- <div class="mt-2" @click="show = !show" ><i class="pi pi-ellipsis-v" style="font-size: 1rem"></i></div> -->
        <div class="mr-2">
          <Buttons
            label="Export All"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
          />
        </div>
        <div class="mr-4">
          <Buttons
            label="Add New"
            v-if="currentTab != 'Others'"
            button_class="p-button-sm add-btn custom-add-btn bg-357dea"
            v-on:childToParent="
              openDialog(
                'AddClearanceModeDialog',
                'internationalInbound',
                'Add Clearance Mode'
              )
            "
          />
          <Buttons
            label="Add New"
            v-if="currentTab == 'Others'"
            button_class="p-button-sm add-btn custom-add-btn bg-357dea"
            v-on:childToParent="
              openDialog(
                'AddOthersModeDialog',
                'internationalInbound',
                'Add Clearance Mode'
              )
            "
          />
        </div>
      </div>
    </div>
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
        <div :key="refershKey">
          <keep-alive v-if="tabs.dynamic == true">
            <component
              :tabMenuData="clearanceModeTabsSubs"
              v-bind:is="'InternationalClearanceAndAdditioanlTabs'"
            >
            </component>
          </keep-alive>
          <!-- dynamic component-->
          <keep-alive v-if="tabs.label == 'Others' || tabs.dynamic == false">
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.label"
              :overlayData="subOverlayData"
              :tableData="getTableData(tabs.label)"
              :apiKey="tabs.apiKey"
              :tableColumns="getTableColumnData(tabs.label)"
              v-bind:is="tabs.tab"
            >
            </component>
          </keep-alive>
        </div>
        <keep-alive
          v-if="tabs.label == 'ClearanceMode' && clearanceModeTabs.length != 0"
        >
          <InternationalRegularTabs
            :key="refershKey"
            :tabMenuData="clearanceModeTabs"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import {
  PermitChargesStorageChargesTableColumnData,
  PermitChargesGSTTypeTableColumnData,
  PermitChargesOtherChargesTableColumnData,
  PermitChargesAdditionalChargesTableColumnData,
  ClearanceModeClearanceTableColumnData,
  ClearanceModeClearanceAdditionalTableColumnData,
  ClearanceModeOthersTableColumnData,
  InboundAirFreightTabMenuData,
  InboundDNATATabMenuData,
  InboundOBCTabMenuData,
  InternationalInboundClearanceModeTabMenuData,
  ClearanceModeDynamicTabSub,
  InternationalInboundSubOverlayData2,
} from "../const.js";
import CustomSpeedDial from "../CustomSpeedDial.vue";

import InboundDataTable from "../Inbound/Tables/DataTable.vue";
export default {
  name: "InternationalRegularTabs",
  props: [
    "tabMenuData",
    "type",
    "defaultTab",
    "storePath",
    "tableDataName",
    "apiKey",
    "tableName",
  ],
  components: {
    InboundDataTable,
    CustomSpeedDial,
  },
  data: () => ({
    searcher: "",
    clearanceIndex: 0,
    defaultTabIndex: 0,
    currentTab: "",
    refershKey: 10,
    tabLength: "",
    show: true,
    edit: "Edit",
    clear: "Delete",
    clearanceModeDynamicTab: null,
    clearanceModeTabs: [],
    clearanceModeTabsSubs: ClearanceModeDynamicTabSub,
    permitChargesTabCommonPath:
      "/settings/salesSettinigs/rates/international/inbound/permitCharges/",
    InternationalInboundSubOverlayData2,
    RowData: 0,
  }),
  methods: {
    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "internationalInbound") {
        this.$store.dispatch("internationalInbound/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["internationalInbound/controlActivityDialog"];
      }
    },
    getRowData() {
      return (this.RowData =
        this.$store.state.internationalInbound.clearanceModeData[
          this.getIndexTwo()
        ]);
    },
    getIndexTwo() {
      const index =
        this.$store.state.internationalInbound.clearanceModeData.findIndex(
          (element) =>
            element["clearance_mode_name"] ==
            this.$store.state.internationalInbound.clearanceModeDynamicTabState
        );
      return index;
    },
    tabChange(tab, apiKey, mutation, tabName, dynamic) {
      this.currentTab = tab;
      //;

      this.$store.state.internationalInbound.clearanceTabState = tab;
      //    this.$store.dispatch("internationalInbound/setCurrentTabValue", {
      //  data: null,
      // });

      this.$store.state.internationalInbound.internationalMainTab = tabName;
      this.$store.state.internationalInbound.currentTabValue = tab;
      if (dynamic == true) {
        this.$store.state.internationalInbound.clearanceModeDynamicTabState =
          tab;
      }
      if (
        tab == "GSTType" ||
        tab == "AdditionalCharges" ||
        tab == "StorageCharges" ||
        tab == "OtherCharges"
      ) {
        this.$store.dispatch("internationalInbound/loadPermitChargesData", {
          path: this.permitChargesTabCommonPath + apiKey,
          type: mutation,
        });
      }
      if (tab == "Others") {
        this.$store.dispatch("internationalInbound/loadaddOthersData", {
          path: "settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes",
          type: "",
        });
      }
      // if (tab == "ClearanceMode") {
      //   this.$store.dispatch("internationalInbound/loadClearanceModeTabs");
      // }
      // if (tab == "ClearanceAndAdditional" || tab == "Clearance") {
      //   console.log(
      //     this.$store.state.internationalInbound.clearanceModeDynamicTabState
      //   );
      // }
    },
    getIndex() {
      const index =
        this.$store.state.internationalInbound.clearanceModeData.findIndex(
          (element) =>
            element["clearance_mode_name"] ==
            this.$store.state.internationalInbound.clearanceModeDynamicTabState
        );
      console.log("index", index);
      return index;
    },
    getTableColumnData(tab) {
      switch (tab) {
        case "GSTType":
          return PermitChargesGSTTypeTableColumnData;
        case "AdditionalCharges":
          return PermitChargesAdditionalChargesTableColumnData;
        case "StorageCharges":
          return PermitChargesStorageChargesTableColumnData;
        case "OtherCharges":
          return PermitChargesOtherChargesTableColumnData;
        case "ClearanceAndAdditional":
          return ClearanceModeClearanceAdditionalTableColumnData;
        case "Clearance":
          return ClearanceModeClearanceTableColumnData;
        case "Others":
          return ClearanceModeOthersTableColumnData;
        default:
          break;
      }
    },

    getTableData(tab) {
      switch (tab) {
        case "AdditionalCharges":
          return this.$store.state["internationalInbound"][
            "addAdditionalChargesData"
          ];
        case "StorageCharges":
          return this.$store.state["internationalInbound"][
            "addStorageChargesData"
          ];
        case "OtherCharges":
          return this.$store.state["internationalInbound"][
            "addOthersChargesData"
          ];

        case "GSTType":
          return this.$store.state["internationalInbound"]["addGstChargesData"];
        case "Others":
          return this.$store.state["internationalInbound"]["addOthersData"];
      }
    },
    getClearanceTabMenuData(tab) {
      switch (tab) {
        case "AirFreight":
          return InboundAirFreightTabMenuData;
        case "DNATA":
          return InboundDNATATabMenuData;
        case "OBC":
          return InboundOBCTabMenuData;
        case "ClearanceMode":
          return InternationalInboundClearanceModeTabMenuData;
      }
    },
    // generateDynamicSubTabs(Data) {
    //   let dynamicSubTabsData = [];

    //   for (let s in Data) {
    //     let dynamicSubTabsDataObj = {};
    //     dynamicSubTabsDataObj["label"] = Data[s].label
    //       // .replace(/\s+/g, "");
    //       // .replace(/[\s])}[{(]/g, "");
    //       .replace(/\s/g, "");
    //     dynamicSubTabsDataObj["heading"] = Data[s].heading;
    //     dynamicSubTabsDataObj["tabName"] = Data[s].tabName.replace(/\s/g, "");
    //     dynamicSubTabsDataObj["select"] = Data[s].select;
    //     dynamicSubTabsDataObj["dynamic"] = Data[s].dynamic;
    //     dynamicSubTabsData.push(dynamicSubTabsDataObj);
    //   }
    //   console.log(dynamicSubTabsData, " Processed Data")
    //   return dynamicSubTabsData;
    // },
  },
  created() {
    this.tabChange("GSTType", "gstTypes", "fetchGstChargesData");
    if (this.tabMenuData[0].dynamic == true) {
      this.$store.state.internationalInbound.clearanceModeDynamicTabState =
        this.tabMenuData[0].label;
    }
    this.clearanceIndex = this.getIndex();
  },
  mounted() {
    this.$store.dispatch("internationalInbound/loadClearanceModeTabs");
  },
  watch: {
    "$store.state.internationalInbound.clearanceModeTab": function () {
      if (this.$store.state.internationalInbound.clearanceModeTab.length != 0) {
        // let Data = this.$store.state.internationalInbound.clearanceModeTab;
        this.clearanceModeTabs =
          // this.generateDynamicSubTabs(Data);
          this.$store.state.internationalInbound.clearanceModeTab;
        this.tabLength =
          this.$store.state.internationalInbound.clearanceModeTab.length;
        // this.refershKey++;
      }
    },
    tabLength: function () {
      this.refershKey++;
    },
    clearanceIndex(value) {
      this.refershKey++;
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
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100px;
  /* display: flex; */
  /* text-align: initial; */
  margin-left: 282px;
  cursor: pointer;
}
</style>
