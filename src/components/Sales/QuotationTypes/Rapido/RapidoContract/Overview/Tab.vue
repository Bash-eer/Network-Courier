<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
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

    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <keep-alive v-if="type == 'salesHome'">
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['salesRapidoContract'][tabs.data]"
            :tableColumns="$store.state['salesRapidoContract'][tabs.columns]"
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
    // eslint-disable-next-line no-unused-vars
    getOverlayData(tableName) {
      return this.$store.state.masters.expressRegionsOverlayData;
    },

    async tabChange(tab) {
      this.currentTab = tab;
      if (
        tab == "Overview" ||
        tab == "CostCenter" ||
        tab == "BillPreferences" ||
        tab == "FollowUp" ||
        tab == "Attachments"
      ) {
        this.$store.state.salesRapidoContract.rapidoContractTimeLineCurrentTab =
          tab;

        this.$store.dispatch(
          "salesRapidoContract/resetRapidoContractTimeLineData",
          {
            data: [
              {
                index: 0,
                color: "#66c11e",
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
          tripScheduleObject["markerComponent"] = "AgentDetails";
          tripScheduleObject["color"] = "#ffff";

          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: costingDetailsObject,
            }
          );
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: tripScheduleObject,
            }
          );
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
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
          costCenterObject["markerComponent"] = "CostCenter";
          costCenterObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: costCenterObject,
            }
          );
        }

        if (tab == "BillPreferences") {
          let billPreferencesObject = {};
          billPreferencesObject["index"] = 1;
          billPreferencesObject["markerComponent"] = "RapidoBillPreferences";
          billPreferencesObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: billPreferencesObject,
            }
          );
        }

        if (tab == "FollowUp") {
          let followUpObject = {};
          followUpObject["index"] = 1;
          followUpObject["markerComponent"] = "RapidoFollowUp";
          followUpObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: followUpObject,
            }
          );
        }

        if (tab == "Attachments") {
          let attachmentsObject = {};
          attachmentsObject["index"] = 1;
          attachmentsObject["markerComponent"] = "RapidoAttachments";
          attachmentsObject["color"] = "#ffff";
          this.$store.dispatch(
            "salesRapidoContract/updateRapidoContractTimeLineData",
            {
              data: attachmentsObject,
            }
          );
        }
      }
      await this.loadFunction(tab);
    },
    async loadFunction(tab) {
      if (tab == "Overview") {
        // await this.$store.dispatch(
        //   "salesExpressBike/loadExpressContractBikeOverviewData",
        //   {
        //     id: this.$route.params.id,
        //   }
        // );
        await this.$store.dispatch(
          "salesRapidoContract/loadRapidoContractOverviewData",
          {
            id: this.$route.params.id,
            type: this.$route.params.type,
          }
        );
      } else if (tab == "Attachments") {
        console.log("attach");
        await this.$store.dispatch("salesCommon/loadAttachmentData", {
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
      } else if (tab == "FollowUp") {
        console.log("followup");
        await this.$store.dispatch("salesCommon/loadFollowupData", {
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
      } else if (tab == "BillPreferences") {
        console.log("billpereferce");

        await this.$store.dispatch("salesCommon/loadBillPreferenceData", {
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
      } else if (tab == "CostCenter") {
        console.log("cc");
        await this.$store.dispatch("salesCommon/loadCostCenterData", {
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
      }
    },
    openDialog(name, type, header) {
      if (type == "salesHome") {
        this.$store.dispatch("salesRapidoContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesRapidoContract/controlActivityDialog"];
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
</style>
