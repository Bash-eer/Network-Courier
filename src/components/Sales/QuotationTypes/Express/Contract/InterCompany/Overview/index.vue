<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>

      <Timeline
        :value="
          $store.state.salesExpressContractInterCompany
            .ExpressContractInterCompanyTimeLineData
        "
        align="left"
        class="customized-timeline"
      >
        <!--timeleline markers-->
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'custom-marker p-shadow-2'
                : 'default-marker'
            "
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <img
              v-if="slotProps.index == 0"
              :src="'/images/' + 'expressTracker' + '.png'"
              alt=""
            />
            <img
              v-if="slotProps.index != 0 && slotProps.index != 3"
              :src="'/images/' + 'marker' + '.png'"
              alt=""
              class="markers"
            />
          </span>
        </template>

        <template #content="slotProps">
          <!--TEMPLATE FOR FIRST MARKER-->
          <span v-if="slotProps.index == 0">
            <div class="flex flex-wrap justify-content-between mt-1">
              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-4">
                    <span
                      class="
                        color-4e5968
                        font-size-11
                        express-international-font
                      "
                      >Express: Contract <br />
                      <b class="font-size-11 bold-600 color-7e84a7"
                        >{{
                          this.$store.state.salesExpressContractInterCompany
                            .ExpressInterCompanyOverviewData.quotation_id
                        }}
                      </b>
                    </span>
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <StatusTag
                      :label="
                        this.$store.state.salesExpressContractInterCompany
                          .ExpressInterCompanyOverviewData.status
                      "
                      color="#8F46EB"
                      bgColor="#F4ECFF"
                      borderRadius="7px"
                    />
                  </div>

                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <StatusTag
                      label="Approved"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    />
                  </div>

                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b
                        class="
                          line-height-15
                          color-4e5968
                          font-size-11
                          express-international-font
                        "
                      >
                        {{
                          dateFormater(
                            this.$store.state.salesExpressContractInterCompany
                              .ExpressInterCompanyOverviewData?.settings
                              ?.estimated_start_date
                          )
                        }}
                      </b></span
                    >
                  </div>
                  <div class="flex flex-row mx-3">
                    <img
                      src="/images/avatar.png"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <div class="flex flex-column mx-2">
                      <!-- <span class="tagText">Sales Person</span> -->
                      <Dropdown
                        v-model="selectedCity"
                        :options="
                          this.$store.state.salesExpressContractInterCompany
                            .SalesPersonData
                        "
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      >
                        <template #option="slotProps">
                          <div v-if="slotProps" class="p-dropdown-car-option">
                            <img
                              alt="."
                              :src="
                                this.$store.state.salesExpressContractInterCompany.SalesPersonData?.map(
                                  (i) => {
                                    return i.img;
                                  }
                                )
                              "
                              height="20"
                              width="20"
                            />
                            <span class="ml-2">{{ this.object.name }}</span>
                          </div>
                        </template>
                      </Dropdown>
                      <span
                        class="
                          line-height-15
                          color-4e5968
                          font-size-11
                          express-international-font
                        "
                        >{{ this.selectedCity.name }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex p-3">
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
              />
              <div
                class="
                  flex
                  bg-7469F2
                  express-inter-company-progress-bar
                  justify-content-between
                  align-items-center
                  py-2
                  px-4
                  border-radius-6
                "
              >
                <circle-progress
                  :percent="50"
                  :border-width="50"
                  :border-bg-width="50"
                  fill-color="white"
                  size="190"
                  class="express-inter-company-circle"
                >
                </circle-progress>

                <div class="color-fff">
                  <div class="bold-600 font-size-24 line-height-29">122</div>
                  <div class="text-wrap">Total Jobs Done</div>
                </div>
                <div class="color-fff">
                  <div class="bold-600 font-size-24 line-height-29">
                    222 Days
                  </div>
                  <div class="text-wrap">Remaining for Expiration</div>
                </div>
              </div>
            </div>

            <div
              v-if="
                $store.state.salesExpressContractInterCompany
                  .expressContractInterCompanyCurrentTab == 'Overview'
              "
            >
              <div class="row">
                <div class="col-12">
                  <TimeLineHeader
                    :IncomingData="
                      this.$store.state.salesExpressContractInterCompany
                        .ExpressInterCompanyOverviewData
                    "
                  />
                </div>
              </div>

              <div class="flex flex-row ml-1 mt-4 mb-4">
                <div
                  class="flex mr-7"
                  v-for="(item, index) of secondRowData"
                  :key="index"
                >
                  <div class="flex flex-column">
                    <div class="flex color-7e84a7 font-size-12 bold-600">
                      {{ getHeader(index) }}
                    </div>
                    <div
                      :class="
                        item != 'High'
                          ? 'flex  font-size-12 bold-600 color-66c11e'
                          : 'flex font-size-12 bold-600 color-c11e1e'
                      "
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-column ml-1 mt-3 mb-4">
                <div class="flex color-7e84a7 font-size-12 bold-600 mb-2">
                  Package details
                </div>
                <div class="flex">
                  <div
                    class="
                      express-inter-company-grey-wrapper-regular
                      bg-f3f7ff
                      express-international-line
                      border-radius-8
                      p-2
                    "
                  >
                    <p
                      class="color-4e5968 line-height-18 font-size-12 bold-600"
                    >
                      {{ this.package }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span v-if="slotProps.index != 0">
            {{ slotProps.markerComponent }}
            <component v-bind:is="slotProps.item.markerComponent" />
          </span>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script>
import Timeline from "primevue/timeline";
import moment from "moment";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostingDetails from "./Overview/CostingDetails.vue";
import BillSettings from "./Overview/BillingSettings.vue";
import CostCenter from "../../../../Common/CostCenter/Express.vue";
import BillPreferences from "../../../../Common/BillPreferences.vue";
import FollowUp from "../../../../Common/FollowUp.vue";
import Attachments from "../../../../Common/Attachments.vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetails,
    BillSettings,
    CostCenter,
    BillPreferences,
    FollowUp,
    Attachments,
    Dropdown,
    CircleProgress,
  },

  data() {
    return {
      secondRowData: null,
      package: null,
      object: null,
      selectedCity: "",

      TimeLineTabMenuData: [
        {
          label: "Overview",
          tab: "",
          select: true,
          tabName: "Overview",
        },
        {
          label: "CostCenter",
          tab: "",
          select: false,
          tabName: "Cost Center",
        },
        {
          label: "BillPreferences",
          tab: "",
          select: false,
          tabName: "Bill Preferences",
        },
        {
          label: "FollowUp",
          tab: "",
          select: false,
          tabName: "Follow Up",
        },
        {
          label: "Attachments",
          tab: "",
          select: false,
          tabName: "Attachments",
        },
      ],
    };
  },

  async created() {
    this.$store.state.salesExpressContractInterCompany
      .expressContractInterCompanyCurrentTab == "Overview";

    await this.$store.dispatch(
      "salesExpressContractInterCompany/loadExpressInterCompanyOverviewData",
      {
        id: "377",
        path: "/sales/quotations/overview/",
      }
    );

    await this.$store.dispatch(
      "salesExpressContractInterCompany/loadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );

    this.$store.dispatch(
      "salesExpressContractInterCompany/resetExpressInterCompanyTimeLineData",
      {
        data: [
          {
            index: 0,
            color: "#EBBD46",
          },
          {
            index: 1,
            color: "#ffff",
            markerComponent: "CostingDetails",
          },
          {
            index: 2,
            color: "#ffff",
            markerComponent: "BillSettings",
          },

          {
            index: 2,
            color: "#ffff",
          },
        ],
      }
    );
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractInterCompany.expressContractInterCompanyCurrentTab}`;
  },
  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractInterCompany.expressContractInterCompanyCurrentTab}`;
  },

  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },

    getHeader(index) {
      let header;
      switch (index) {
        case "priority":
          header = "Priority";
          break;
        case "previously_served_by":
          header = "Previously Served By";
          break;
        case "referred_by":
          header = "Refered By";
          break;
        case "referral_person_name":
          header = "Referal Person Name";
          break;
        case "sales_comission":
          header = "Sales Commission($)";
          break;
        case "festival_name":
          header = "Festival Name";
          break;
      }
      return header;
    },
  },

  watch: {
    "$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData":
      function () {
        let val =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData?.express_contract.reduce(
            (obj) => Object.assign(obj)
          );

        this.secondRowData = {
          priority:
            this.$store.state.salesExpressContractInterCompany
              .ExpressInterCompanyOverviewData?.priority,
          previously_served_by: val.previously_served_by,
          referred_by: val.referred_by,
          referral_person_name: val.referral_name,
          sales_comission: val.sales_commission,
          festival_name: val.festival_name,
        };

        let EndValue =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.express_contract.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value })
          );

        this.package = EndValue.package_details;

        this.$store.dispatch(
          "salesExpressContractInterCompany/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: "1",
          }
        );
      },

    "$store.state.salesExpressContractInterCompany.SalesPersonData":
      function () {
        this.object =
          this.$store.state.salesExpressContractInterCompany.SalesPersonData.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value })
          );
      },

    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesExpressContractInterCompany/loadSalesPersonDataDropdown",
        {
          path: "/sales/quotations/sales-person/",
          id: "1",
          payload: {
            sales_person_id: this.selectedCity,
          },
        }
      );
    },
  },
};
</script>

<style scoped>
.express-inter-company-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
}
.express-inter-company-progress-bar {
  min-width: 450px;
}
.express-inter-company-circle {
  width: 40px !important;
  height: 40px !important;
}
::v-deep(.p-timeline-event-content) ::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}
::v-deep.p-dropdown .p-dropdown-label.p-placeholder {
  padding: 0;
  border: unset;
  font-weight: 600 !important;
  color: #7e84a7 !important;
  font-size: 11px !important;
  letter-spacing: 0.03em !important;
}
::v-deep.p-dropdown {
  border: unset;
}
::v-deep.p-dropdown .p-dropdown-trigger {
  color: #000000;
}
::v-deep.p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none;
  border-color: unset;
}
</style>
