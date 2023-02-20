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
            :tableData="$store.state['salesSales'][tabs.data]"
            :tableColumns="$store.state['salesSales'][tabs.columns]"
            :is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="type == 'salesQuotation'">
          <component v-bind:is="tabs.tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesTabs",
  props: ["tabMenuData", "type"],
  components: {},
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  methods: {
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
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
        this.$store.state.salesExpressContractVan.expressContractVanTimeLineCurrentTab =
          tab;

        this.$store.dispatch(
          "salesExpressContractVan/resetExpressVanTimeLineData",
          {
            data: [
              {
                index: 0,
                color: "#EBBD46",
              },
            ],
          }
        );

        if (tab == "Overview") {
          let costingDetailsObject = {};
          let tripScheduleObject = {};
          costingDetailsObject["index"] = 1;
          costingDetailsObject["markerComponent"] = "CostingDetail";
          costingDetailsObject["color"] = "#ffff";
          tripScheduleObject["index"] = 2;
          tripScheduleObject["markerComponent"] = "BillSettings";
          tripScheduleObject["color"] = "#ffff";

          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: costingDetailsObject,
            }
          );
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: tripScheduleObject,
            }
          );
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: {
                index: 3,
                color: "#ffff",
              },
            }
          );
        }

        if (tab == "CostCenter") {
          let costCenterObject = {};
          costCenterObject["index"] = 1;
          costCenterObject["markerComponent"] = "ExpressVanCostCenter";
          costCenterObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: costCenterObject,
            }
          );
        }

        if (tab == "BillPreferences") {
          let billPreferencesObject = {};
          billPreferencesObject["index"] = 1;
          billPreferencesObject["markerComponent"] =
            "ExpressVanBillPreferences";
          billPreferencesObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: billPreferencesObject,
            }
          );
        }
        if (tab == "FollowUp") {
          let followUpObject = {};
          followUpObject["index"] = 1;
          followUpObject["markerComponent"] = "ExpressVanFollowUp";
          followUpObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: followUpObject,
            }
          );
        }

        if (tab == "Attachments") {
          let attachmentsObject = {};
          attachmentsObject["index"] = 1;
          attachmentsObject["markerComponent"] = "ExpressVanAttachments";
          attachmentsObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesExpressContractVan/updateExpressContractVanTimeLineData",
            {
              data: attachmentsObject,
            }
          );
        }
      }
    },

    openDialog(name, type, header) {
      if (type == "salesHome") {
        this.$store.dispatch("salesSales/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesSales/controlActivityDialog"];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
