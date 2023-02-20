<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <ul class="nav nav-pills tab-padding px-1" id="pills-tab" role="tablist">
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
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <TextField
            v-if="type != 'salesTimeLine'"
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm 
          search-text"
            v-on:childToParent="globalSearcher"
          />
        </div>

        <!--Create Company button-->
        <Buttons
          v-if="type == 'salesHome'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
        <!--Create Quotation button -->
        <Buttons
          v-if="type == 'salesQuotation'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Create Quotation"
          v-on:childToParent="openDialog()"
        />
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
        <!-- dynamic component-->
        <keep-alive v-if="type == 'salesHome'">
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['sales'][tabs.data]"
            :tableColumns="$store.state['sales'][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="type == 'salesQuotation'">
          <component v-bind:is="tabs.tab"></component
        ></keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesTabs",
  props: ["tabMenuData", "type"],
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  methods: {
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    // eslint-disable-next-line no-unused-vars
    getOverlayData(tableName) {
      return this.$store.state.masters.expressRegionsOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      if (
        tab == "Overview" ||
        tab == "CostCenter" ||
        tab == "BillPreferences" ||
        tab == "FollowUp" ||
        tab == "Attachments"
      ) {
        this.$store.state.sales.expressTimeLineCurrentTab = tab;
        this.$store.dispatch("sales/resetExpressTimeLineData", {
          data: [
            {
              index: 0,
              color: "#EBBD46",
            },
          ],
        });

        if (tab == "Overview") {
          let costingDetailsObject = {};
          let tripScheduleObject = {};
          costingDetailsObject["index"] = 1;
          costingDetailsObject["markerComponent"] = "CostingDetails";
          costingDetailsObject["color"] = "#ffff";
          tripScheduleObject["index"] = 2;
          tripScheduleObject["markerComponent"] = "TripSchedule";
          tripScheduleObject["color"] = "#ffff";
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: costingDetailsObject,
          });
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: tripScheduleObject,
          });
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: {
              index: 3,
              color: "#ffff",
            },
          });
        }

        if (tab == "CostCenter") {
          let costCenterObject = {};
          costCenterObject["index"] = 1;
          costCenterObject["markerComponent"] = "CostCentre";
          costCenterObject["color"] = "#ffff";
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: costCenterObject,
          });
        }

        if (tab == "BillPreferences") {
          let billPreferencesObject = {};
          billPreferencesObject["index"] = 1;
          billPreferencesObject["markerComponent"] = "BillPreferences";
          billPreferencesObject["color"] = "#ffff";
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: billPreferencesObject,
          });
        }

        if (tab == "FollowUp") {
          let followUpObject = {};
          followUpObject["index"] = 1;
          followUpObject["markerComponent"] = "FollowUp";
          followUpObject["color"] = "#ffff";
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: followUpObject,
          });
        }

        if (tab == "Attachments") {
          let attachmentsObject = {};
          attachmentsObject["index"] = 1;
          attachmentsObject["markerComponent"] = "Attachments";
          attachmentsObject["color"] = "#ffff";
          this.$store.dispatch("sales/updateExpressTimeLineData", {
            data: attachmentsObject,
          });
        }
      }
    },
    openDialog() {
      this.$store.state.sales.stepperEditMode = false;
      if (this.type == "salesHome") {
        this.$store.state["sales"].contactsStateData = [];
        this.$store.state["sales"].companyCreationStateData = {};
        this.$store.state["users"].displayDialog = true;
        this.$store.state["users"].dialogComponent = "companyCreationDialog";
        this.$store.getters.controlActivityDialog;
      }
      if (this.type == "salesQuotation") {
        this.$store.state["sales"].quotationCreationStateData = {};
        this.$store.state["users"].displayDialog = true;
        this.$store.state["users"].dialogComponent = "GeneralQuotationDialog";
        this.$store.getters.controlActivityDialog;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: #fff !important;
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
// .nav-pills {
//   background: #2196f3 !important;
//   border-radius: 4px !important;
// }
// .nav-pills .nav-link.active {
//   background: #fff;
//   color: #2196f3;
//   font-weight: bold;
// }
// .nav-link {
//   color: #fff;
//   font-family: $font-family-primary;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 600;
//   letter-spacing: 0.03em;
//   text-align: left;
// }
</style>
