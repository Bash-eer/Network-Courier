<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>

      <Timeline
        :value="
          $store.state.salesExpressContractBikeFSR
            .ExpressContractBikeFSRTimeLineData
        "
        align="left"
        class="customized-timeline"
      >
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'international-contract-custom-marker color-fff border-radius-50 flex align-items-center p-shadow-2'
                : 'international-contract-default-marker color-fff border-radius-50 flex align-items-center'
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
              class="international-contract-markers"
            />
          </span>
        </template>

        <template #content="slotProps">
          <span v-if="slotProps.index == 0">
            <div class="flex flex-wrap justify-content-between mt-1">
              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-4">
                    <span class="color-4e5968 font-size-11 bold-600"
                      >Express: Contract <br /><span class="tagText"
                        >NEC/SQ00370/2021</span>
                    </span>
                  </div>
                  <!-- <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div> -->
                </div>
              </div>
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
                      class="mx-2"
                      :type="expressContractBikeFsrOverviewData?.status"
                      :label="expressContractBikeFsrOverviewData?.status"
                      usage="timeline"
                    />
                  </div>
                  <div
                    v-if="$route.params.type == 'quotation'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Quotation <br />Status:</span
                    >

                    <StatusTags
                      class="mx-2"
                      :type="expressContractBikeFsrOverviewData?.status"
                      :label="expressContractBikeFsrOverviewData?.status"
                      usage="timeline"
                    />
                  </div>
                  <div class="flex">
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Modified On <br /><b
                        class="
                          bold-600
                          font-size-12
                          line-height-15
                          color-4e5968
                        "
                      >
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
                </div>
              </div>
            </div>
            <div class="my-3">
              <Notification
                v-if="expressContractBikeFsrOverviewData?.status == 'Approved'"
                :status="expressContractBikeFsrOverviewData?.status"
              />
            </div>
            <div
              class="
                flex
                international-contract-send-quotation
                text-nowrap
                align-items-center
              "
            >
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" class="w-10"/>
              <!-- <Button label="Send Quotation" class="font-size-14 mr-4" /> -->
              <div class="flex experess-contract">
                <Buttons
                  v-if="
                    $route.params.type == 'quotation' &&
                    (expressContractBikeFsrOverviewData?.status == 'New' ||
                      expressContractBikeFsrOverviewData?.status == 'Quote')
                  "
                  label="Send Quotation"
                  button_class="dialog-button-text experess-contract m-3 bg-357dea"
                  v-on:childToParent="sendQuotationhandler"
                />
              </div>


              <!-- <div> -->
              <div
                v-if="$route.params.type == 'contract'">
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
                $store.state.salesExpressContractBikeFSR
                  .expressContractBikeFSRCurrentTab == 'Overview'
              "
            >
              <div class="row">
                <div class="col-12">
                  <TimeLineHeader
                    :IncomingData="
                      this.$store.state.salesExpressContractBikeFSR
                        .quotationData
                    "
                  />
                </div>
              </div>
              <!--SELECT METHOD-->
              <div class="flex flex-row ml-1 my-4">
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
                          ? 'flex   font-size-12 bold-600 color-66c11e'
                          : 'flex   font-size-12 bold-600 color-c11e1e'
                      "
                    >
                      {{ item || "-" }}
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
            <component 
              :is="slotProps.item.markerComponent" 
              :IncomingData="
                this.$store.state.salesExpressContractBikeFSR
                .quotationData "/>
          </span>
        </template>
      </Timeline>
    </div>
  </div>
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
  <SalesDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import Button from "primevue/button";
import Timeline from "primevue/timeline";
import moment from "moment";
import Tab from "./Tab.vue";
import SalesDialog from "../../../../../Sales/Dialog.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostingDetails from "./Overview/CostingDetails.vue";
import BillSettings from "./Overview/BillingSettings.vue";
import ExpressContractBikeFSRCostCenter from "../../../../Common/CostCenter/Express.vue";
import ExpressContractBikeFSRBillPreferences from "../../../../Common/BillPreferences.vue";
import ExpressContractBikeFSRFollowUp from "../../../../Common/FollowUp.vue";
import ExpressContractBikeFSRAttachments from "../../../../Common/Attachments.vue";
import Toasts from "../../../../Common/Toast.vue";
import Notification from "../../../../Common/Notification.vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    SalesDialog,
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetails,
    BillSettings,
    ExpressContractBikeFSRCostCenter,
    ExpressContractBikeFSRBillPreferences,
    ExpressContractBikeFSRFollowUp,
    ExpressContractBikeFSRAttachments,
    Button,
    Dropdown,
    Toasts,
    Notification,
    CircleProgress,
  },
  computed: {
    ...mapGetters({
      expressContractBikeFsrOverviewData:
        "salesExpressContractBikeFSR/quotationData",
    }),
  },
  data() {
    return {
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
      secondRowData: {},
      // package: null,
      modifiedOn: "",
      packageDetails: "",
      // object: null,
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
  methods: {
    async getSalesPersonDropdownData() {
      this.salesPersonData = [];
      await axios
        .get("/settings/user/dropdown?role=Sales Person")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              this.salesPersonData.push(res.data.results[c]);
            }
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
    sendQuotationhandler() {
      let processedMail;
      if (this.expressContractBikeFsrOverviewData.contacts) {
        if (this.expressContractBikeFsrOverviewData.contacts.length > 0) {
          if (this.expressContractBikeFsrOverviewData.contacts[0].email) {
            processedMail = this.expressContractBikeFsrOverviewData.contacts[0].email;
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
        loadData: "salesExpressContractBikeFSR/setQuotationData",
        data: {
          email: processedMail,
          template_id: 1,
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The quotation is sent to mail successfully!`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in activating contract, try again!",

            toastSeverity: "error",
          },
        },
      });
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
    async secondRowFunction() {
      this.modifiedOn = this.dateFormater(
        this.expressContractBikeFsrOverviewData.express_contract[0].updatedAt
      );
      this.packageDetails =
        this.expressContractBikeFsrOverviewData.express_contract[0].package_details;
      this.secondRowData = {
        priority:
          this.expressContractBikeFsrOverviewData.priority,
        previously_served_by:
          this.expressContractBikeFsrOverviewData.express_contract[0]
            .previously_served_by,
        referred_by:
          this.expressContractBikeFsrOverviewData.express_contract[0].referred_by,
        referral_person_name:
          this.expressContractBikeFsrOverviewData.express_contract[0]
            .referral_name,
        sales_comission:
          this.expressContractBikeFsrOverviewData.express_contract[0]
            .sales_commission,
        festival_name:
          this.expressContractBikeFsrOverviewData.express_contract[0]
            .festival_name,
        
      };
    },
  },
  async created() {
    await this.$store.dispatch(
      "salesExpressContractBikeFSR/setQuotationData",
      {
        id: this.$route.params.id,
        type: this.$route.params.type,
      }
    );
    
    await this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    this.$store.state.salesExpressContractBikeFSR
      .expressContractBikeFSRCurrentTab == "Overview";

    

    await this.secondRowFunction();


    this.$store.dispatch(
      "salesExpressContractBikeFSR/resetExpressContractBikeFSRTimeLineData",
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
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractBikeFSR.expressContractBikeFSRCurrentTab}`;
  },
  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }

    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractBikeFSR.expressContractBikeFSRCurrentTab}`;
  },

  

  watch: {
    salesPerson: async function () {
      await this.processSalesPersonImageHandler();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.international-contract-markers {
  margin-left: 19%;
}

.international-contract-custom-marker {
  width: 3rem;
  height: 3rem;
  z-index: 1;
}
.international-contract-default-marker {
  width: 3rem;
  height: 0.5rem;
  z-index: 1;
}
.international-contract-send-quotation {
  margin-left: -20px;
  padding: 10px;
}
.grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
  background: #f3f7ff;
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
.express-contact-bike-fsr-progress-bar {
  min-width: 450px;
}
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
</style>