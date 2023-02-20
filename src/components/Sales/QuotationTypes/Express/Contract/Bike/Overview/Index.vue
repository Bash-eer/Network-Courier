<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesExpressBike.expressContractBikeTimeLine"
        align="left"
        class="customized-timeline"
      >
        <!--timeleline markers-->
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'custom-marker flex justify-content-center justify-content-center border-radius-50 color-fff p-shadow-2'
                : 'default-marker flex justify-content-center justify-content-center border-radius-50 color-fff'
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
        <!--timeleline content-->
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
                      <b class="font-size-11 bold-600 color-7e84a7">
                        {{ expressContractBikeOverviewData.quotation_id }}
                      </b>
                    </span>
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>
              <!--QUOTATION/CONTRACT DETAILS-->
              <div class="flex">
                <div class="flex flex-row">
                  <div
                    v-if="$route.params.type == 'contract'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Contract <br />Status:</span
                    >

                    <StatusTags
                      :type="expressContractBikeOverviewData.status"
                      :label="expressContractBikeOverviewData.status"
                      usage="timeline"
                    />
                  </div>
                  <!-- $store.state.sales.expressQuotationOverviewData[0][
                        'status'
                      ]
                    "-->
                  <div
                    v-if="$route.params.type == 'quotation'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Quotation <br />Status:</span
                    >

                    <StatusTags
                      class="mx-2"
                      :type="expressContractBikeOverviewData.status"
                      :label="expressContractBikeOverviewData.status"
                      usage="timeline"
                    />
                  </div>
                  <!--dateFormater(
                        $store.state.sales.expressQuotationOverviewData[0][
                          "modifiedOn"
                        ]
                      )-->
                  <div class="flex">
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Modified On <br /><b
                        class="
                          line-height-15
                          color-4e5968
                          font-size-11
                          express-international-font
                        "
                      >
                        <!-- 21st july 2021 -->
                        {{ modifiedOn }}
                      </b></span
                    >
                  </div>
                  <div class="flex flex-row mx-3">
                    <img :src="salesPersonSrc" alt="" width="32" height="32" />
                    <div class="flex flex-column mx-2">
                      <span
                        class="
                          bold-600
                          font-size-12
                          line-height-15
                          color-4e5968
                        "
                        >Sales Person</span
                      >
                      <DropDown
                        v-if="salesPersonData.length > 0"
                        :data="salesPersonData"
                        :state="salesPerson"
                        label="salesPerson"
                        code="name"
                        v-model="salesPerson"
                        :placeholder="salesPersonData[0].name"
                      />
                    </div>
                  </div>
                  <!-- <img
                      src="/images/avatar.png"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <div class="flex flex-column mx-2">
                       <span class="tagText">Sales Person</span> -->
                  <!-- <Dropdown -->
                  <!-- v-model="selectedCity1"
                        :options="cities"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      /> -->
                  <!-- <span
                        class="
                          line-height-15
                          color-4e5968
                          font-size-11
                          express-international-font
                        "
                        >Charlie</span
                      >
                    </div> -->
                  <!-- </div> -->
                </div>
              </div>
            </div>
            <div class="my-3">
              <Notification
                v-if="expressContractBikeOverviewData.status == 'Approved'"
                :status="expressContractBikeOverviewData.status"
              />
            </div>

            <div class="flex p-3 justify-content-between">
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
                class="w-10"
              />
              <div class="flex experess-contract">
                <Buttons
                  v-if="
                    $route.params.type == 'quotation' &&
                    (expressContractBikeOverviewData.status == 'New' ||
                      expressContractBikeOverviewData.status == 'Quote')
                  "
                  label=" Send Quotation"
                  button_class="dialog-button-text experess-contract "
                  v-on:childToParent="sendQuotationhandler"
                />
              </div>

              <div v-if="$route.params.type == 'contract'">
                <div
                  class="
                    flex
                    bg-7469F2
                    express-contact-bike-fsr-progress-bar
                    justify-content-between
                    align-items-center
                    py-2
                    px-4
                    border-radius-6
                  "
                >
                  <circle-progress
                    :percent="70"
                    :border-width="50"
                    :border-bg-width="50"
                    fill-color="white"
                    size="190"
                    class="express-contact-bike-fsr-circle"
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
            </div>

            <div
              v-if="
                $store.state.salesExpressBike.TimeLineCurrentTab == 'Overview'
              "
            >
              <!--TIMELINE HEADER-->
              <div class="row">
                <div class="col-12">
                  <!--  v-if="
                      this.$store.state.salesExpressBike
                        .ExpressContractBikeOverviewData.length > 0
                    "-->
                  <TimeLineHeader
                    :IncomingData="expressContractBikeOverviewData"
                  />
                </div>
              </div>
              <!--SELECT METHOD-->
              <div class="flex flex-row ml-1 mt-4">
                <div
                  class="flex mr-7"
                  v-for="(item, index) of secondRowData"
                  :key="index"
                >
                  <div class="flex flex-column">
                    <div class="flex font-size-12 bold-600 color-7e84a7">
                      {{ getHeader(index) }}
                    </div>
                    <div
                      :class="
                        item != 'High'
                          ? 'flex font-size-12 bold-600  color-66c11e'
                          : 'flex font-size-12 bold-600  color-c11e1e'
                      "
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
              <!--PACKAGE DETAILS-->
              <div class="flex flex-column ml-1 mt-3 mb-4">
                <div class="flex font-size-12 bold-600 color-7e84a7 mb-2">
                  Package details
                </div>
                <div class="flex">
                  <div class="grey-wrapper-regular border-radius-8 p-2">
                    <p
                      class="line-height-18 color-4e5968 font-size-12 bold-600"
                    >
                      {{ packageDetails }}
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
  <!--toast-->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
import Toasts from "../../../../Common/Toast.vue";
import Timeline from "primevue/timeline";
import moment from "moment";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimelineHeader.vue";
import CostingDetail from "./Overview/CostingDetails.vue";
import TripSchedules from "./Overview/TripSchedule.vue";
import BillSettings from "./Overview/BillSettings.vue";
import ExpressContractBikeCostCenter from "../../../../Common/CostCenter/Express.vue";
import ExpressContractBikeBillPreferences from "../../../../Common/BillPreferences.vue";
import ExpressContractBikeFollowUp from "../../../../Common/FollowUp.vue";
import ExpressContractBikeAttachments from "../../../../Common/Attachments.vue";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import CircleProgress from "vue3-circle-progress";
import Notification from "../../../../Common/Notification.vue";
import "vue3-circle-progress/dist/circle-progress.css";
import axios from "axios";
export default {
  name: "ExpressTracker",
  components: {
    Toasts,
    Tab,
    Timeline,
    TimeLineHeader,
    CostingDetail,
    TripSchedules,
    BillSettings,
    ExpressContractBikeCostCenter,
    ExpressContractBikeBillPreferences,
    ExpressContractBikeFollowUp,
    ExpressContractBikeAttachments,
    Dropdown,
    CircleProgress,
    Notification,
  },
  computed: {
    ...mapGetters({
      expressContractBikeOverviewData:
        "salesExpressBike/ExpressContractBikeOverviewData",
    }),
  },
  data() {
    return {
      // TimeLineData: [
      //   {
      //     index: 0,
      //     color: "#EBBD46",
      //   },
      //   {
      //     index: 1,
      //     color: "#ffff",
      //     markerComponent: "CostingDetail",
      //   },
      //   {
      //     index: 2,
      //     color: "#ffff",
      //     markerComponent: "TripSchedules",
      //   },
      //   {
      //     index: 3,
      //     color: "#ffff",
      //     markerComponent: "BillSettings",
      //   },
      //   {
      //     index: 4,
      //     color: "#ffff",
      //   },
      // ],
      salesPerson: "",
      salesPersonSrc: "/images/noavatar.png",
      salesPersonData: [
        {
          id: 1,
          image_url:
            "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1652873332597_1948_1557484006435.jpg",
          name: "Antony Jerold ",
        },
        {
          id: 2,
          image_url:
            "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656669152816_6385_images%20%281%29.png",
          name: "rIA ",
        },
      ],
      cities: [
        { name: "john", code: "NY" },
        { name: "andrey", code: "RM" },
        { name: "spider man", code: "LDN" },
        { name: "super man", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      modifiedOn: "",
      packageDetails: "",
      secondRowData: {
        // priority: this.expressContractBikeOverviewData.priority,
        // previously_served_by:
        //   this.expressContractBikeOverviewData.express_contract[0]
        //     .previously_served_by,
        // referred_by:
        //   this.expressContractBikeOverviewData.express_contract[0].referred_by,
        // referral_person_name:
        //   this.expressContractBikeOverviewData.express_contract[0]
        //     .referral_name,
        // sales_comission:
        //   this.expressContractBikeOverviewData.express_contract[0]
        //     .sales_commission,
        // festival_name:
        //   this.expressContractBikeOverviewData.express_contract[0]
        //     .festival_name,
      },

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
  methods: {
    async getSalesPersonDropdownData() {
      this.salesPersonData = [];
      await axios
        .get("/settings/user/dropdown?role=Sales Person")
        .then((res) => {
          if (res.data.results) {
            // console.log(res.data.results, "regions");
            for (let c in res.data.results) {
              // res.data.results[c]["name"] = res.data.results[c]["region"];
              this.salesPersonData.push(res.data.results[c]);

              // this.toZoneData.push(res.data.results[c]);
            }
            // this.salesPerson = res.data.results[0].name;
            // this.salesPersonSrc = res.data.results[0].image_url;
          }
        });
    },
    async processSalesPersonImageHandler() {
      let respectiveData = this.salesPersonData.find(
        (itm) => itm.name == this.salesPerson
      );
      if (respectiveData) {
        this.salesPersonSrc = respectiveData.image_url;
      }
    },
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
    // dateAndTimeFormatter(date) {
    //   return moment(date).utcOffset("+8:00").format();
    // },
    // customDateFormatter(data) {
    //   let rawDate = new Date(data);
    //   let date = rawDate.getDate();
    //   let month = rawDate.getMonth();
    //   month += 1;
    //   let year = rawDate.getFullYear();
    //   let dateString = year + "-" + month + "-" + date;
    //   return dateString;
    // },
    // dateFormater(data) {
    //   if (data == null) {
    //     return "-";
    //   } else {
    //     var formattedDate = moment(data).format("DD MMM, YYYY");
    //     return formattedDate;
    //   }
    // },
    async secondRowFunction() {
      this.modifiedOn = this.dateFormater(
        this.expressContractBikeOverviewData.express_contract[0].updatedAt
      );
      this.packageDetails =
        this.expressContractBikeOverviewData.express_contract[0].package_details;
      this.secondRowData = {
        priority: this.expressContractBikeOverviewData.priority,
        previously_served_by:
          this.expressContractBikeOverviewData.express_contract[0]
            .previously_served_by,
        referred_by:
          this.expressContractBikeOverviewData.express_contract[0].referred_by,
        referral_person_name:
          this.expressContractBikeOverviewData.express_contract[0]
            .referral_name,
        sales_comission:
          this.expressContractBikeOverviewData.express_contract[0]
            .sales_commission,
        festival_name:
          this.expressContractBikeOverviewData.express_contract[0]
            .festival_name,
      };
    },
    sendQuotationhandler() {
      let processedMail;
      if (this.expressContractBikeOverviewData.company_contacts) {
        if (this.expressContractBikeOverviewData.company_contacts.length > 0) {
          if (this.expressContractBikeOverviewData.company_contacts[0].email) {
            processedMail =
              this.expressContractBikeOverviewData.company_contacts[0].email;
          } else {
            processedMail = "";
          }
        }
      }
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        type: this.$route.params.type,
        loadDiffStore: true,
        data: {
          email: "keerthana@squashapps.com",
          template_id: 1,
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The quotation is sent to mail successfully!`,
            toastSeverity: "info",
          },

          // toastDuplicateErrorData: {
          //   toastMsg: `The Rate card  already exist !`,
          //   toastSeverity: "error",
          // },
          toastCommonErrorData: {
            toastMsg: "There was an error in activating contract, try again!",

            toastSeverity: "error",
          },
        },
        loadData: "salesExpressAdhoc/loadExpressContractBikeOverviewData",
      });
    },
  },

  // mounted() {
  //   if (localStorage.getItem("quotationID")) {
  //     this.$store.state.sales.salesQuotationId =
  //       localStorage.getItem("quotationID");
  //   }

  //   if (this.$store.state.sales.salesQuotationId != null) {
  //     this.$store.dispatch("sales/loadBillPreferences");
  //     this.$store.dispatch("sales/loadCostCentres");
  //   }
  // },
  async created() {
    await this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    await this.$store.dispatch(
      "salesExpressBike/loadExpressContractBikeOverviewData",
      {
        id: this.$route.params.id,
      }
    );

    await this.secondRowFunction();
    // if (localStorage.getItem("quotationOverViewData")) {
    //   this.$store.state.sales.expressQuotationOverviewData = JSON.parse(
    //     localStorage.getItem("quotationOverViewData")
    //   );
    // }
    // this.$store.state.sales.expressTimeLineCurrentTab = "Overview";
    this.$store.dispatch(
      "salesExpressBike/resetExpressContractBikeTimeLineData",
      {
        data: [
          {
            index: 0,
            color: "#EBBD46",
          },
          {
            index: 1,
            color: "#ffff",
            markerComponent: "CostingDetail",
          },
          {
            index: 2,
            color: "#ffff",
            markerComponent: "TripSchedules",
          },
          {
            index: 3,
            color: "#ffff",
            markerComponent: "BillSettings",
          },
          {
            index: 4,
            color: "#ffff",
          },
        ],
      }
    );
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesExpressAdhoc?.ExpressAdhocOverviewData?.profile_name} > Contract > Express Contract > ${this.$store.state.salesExpressBike.TimeLineCurrentTab}`;
  },

  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }

    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesExpressAdhoc?.ExpressAdhocOverviewData?.profile_name} > Contract > Express Contract > ${this.$store.state.salesExpressBike.TimeLineCurrentTab}`;
  },
};
</script>

<style lang="scss" scoped>
.express-contact-bike-fsr-index-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
}
.express-contact-bike-fsr-progress-bar {
  min-width: 450px;
}
.express-contact-bike-fsr-circle {
  width: 40px !important;
  height: 40px !important;
}
// .express-bike-heading {
//   color: #4e5968 !important;
//   font-size: 11px;
// }

// .express-bike-date {
//   font-size: 12px;
//   line-height: 15px;
//   color: #4e5968;
// }

// .remarks-text {
//   font-weight: 600;
//   font-size: 12px;
//   line-height: 18px;
//   color: #4e5968;
// }

.grey-wrapper-regular {
  // background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  // border-radius: 8px;
  height: 25%;
  width: 100%;
  background: #edf1f7;
}
// .detailsText {
//   font-size: 12px;
//   color: #7e84a7;
//   font-weight: 600;
// }

// .valuesText {
//   color: #66c11e;
// }

// .priorityText {
//   color: #c11e1e;
// }
.markers {
  margin-left: 19%;
}

// .tagText {
//   font-size: 11px;
//   color: #7e84a7;
//   font-weight: 600;
// }
.p-timeline-event-separator {
  margin-left: 2% !important;
}
.p-timeline-event-opposite {
  display: none !important;
}

.default-marker {
  // display: flex;
  width: 3rem;
  height: 0.5rem;
  // align-items: center;
  // justify-content: center;
  // color: #ffffff;
  // border-radius: 50%;
  z-index: 1;
}
.custom-marker {
  // display: flex;
  width: 3rem;
  height: 3rem;
  // align-items: center;
  // justify-content: center;
  // color: #ffffff;
  // border-radius: 50%;
  z-index: 1;
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

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>
