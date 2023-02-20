<template>
  <div class="card">
    <br />
    <Timeline
      :value="
        $store.state.salesExpressContractVanFSR
          .ExpressContractVanFSRTimeLineData
      "
      align="left"
      class="customized-timeline"
    >
      <template #marker="slotProps">
        <span
          :class="
            slotProps.index == 0 ? 'custom-marker p-shadow-2' : 'default-marker'
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
        <span v-if="slotProps.index == 0">
          <div class="flex flex-wrap justify-content-between mt-1">
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-4">
                  <span class="tagText"
                    >Express Contract <br /><span class="tagText">
                      {{
                        this.$store.state.salesExpressContractVanFSR
                          .expressContractVanFsrOverviewData.quotation_id
                      }}
                    </span></span
                  >
                </div>
                <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
              </div>
            </div>

            <div class="flex">
              <div class="flex flex-row">
                <!-- <div class="flex mr-5">
                  <span class="tagText">Contract <br />Status:</span>

                  <StatusTag
                    :label="
                      this.$store.state.salesExpressContractVanFSR
                        .expressContractVanFsrOverviewData.status
                    "
                    color="#8F46EB"
                    bgColor="#F4ECFF"
                    borderRadius="7px"
                  />
                </div> -->
                <div v-if="$route.params.type == 'contract'" class="flex mr-5">
                  <span class="font-size-11 bold-600 text-color-secondary"
                    >Contract <br />Status:</span
                  >

                  <StatusTags
                    :type="expressContractVanFsrOverviewData.status"
                    :label="expressContractVanFsrOverviewData.status"
                    usage="timeline"
                  />
                </div>

                <div v-if="$route.params.type == 'quotation'" class="flex mr-5">
                  <span class="font-size-11 bold-600 text-color-secondary"
                    >Quotation <br />Status:</span
                  >

                  <StatusTags
                    class="mx-2 height-34"
                    :type="expressContractVanFsrOverviewData.status"
                    :label="expressContractVanFsrOverviewData.status"
                    usage="timeline"
                  />
                </div>

                <div class="flex">
                  <span class="tagText"
                    >Modified On <br /><b
                      class="color-4e5968 font-size-12 line-height-15 bold-600"
                    >
                      {{
                        dateFormater(
                          expressContractVanFsrOverviewData.express_contract &&
                            expressContractVanFsrOverviewData.express_contract
                              .length
                            ? expressContractVanFsrOverviewData
                                .express_contract[0]?.updatedAt
                            : "invalid"
                        )
                      }}
                    </b></span
                  >
                </div>
                <div class="flex flex-row mx-3">
                  <img :src="salesPersonSrc" alt="" width="32" height="32" />
                  <div class="flex flex-column mx-2">
                    <!-- 
                        src="/images/avatar.png"
                        <Dropdown
                        v-model="selectedCity1"
                        :options="cities"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      /> 
                      :classes="{
                          'inputfield w-full dialog-dropdown-text ': true,
                        }
                        
                      -->
                    <span
                      class="bold-600 font-size-12 line-height-15 color-4e5968"
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
              v-if="expressContractVanFsrOverviewData.status == 'Approved'"
              :status="expressContractVanFsrOverviewData.status"
            />
          </div>
          <div
            class="
              flex
              international-contract-send-quotation
              text-nowrap
              align-items-center
              justify-content-center
            "
          >
            <Tab
              :tabMenuData="TimeLineTabMenuData"
              type="salesTimeLine"
              class="w-10"
            />
            <!-- <Button label="Send Quotation" class="font-size-14 mr-4" /> -->
            <div class="flex experess-contract">
              <Buttons
                v-if="
                  $route.params.type == 'quotation' &&
                  (expressContractVanFsrOverviewData.status == 'New' ||
                    expressContractVanFsrOverviewData.status == 'Quote')
                "
                label="Send Quotation"
                button_class="dialog-button-text experess-contract m-3 bg-357dea"
                v-on:childToParent="sendQuotationhandler"
              />
            </div>

            <!-- <div> -->
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

          <div class="my-3">
            <!-- <CreateContract /> -->
          </div>

          <!-- <div class="flex p-3">
            <Tab
              v-bind:tabMenuData="TimeLineTabMenuData"
              type="salesTimeLine"
            />
            <div v-if="$route.params.type == 'contract'">
              <div
                class="
                  flex
                  bg-7469F2
                  express-contact-van-fsr-progress-bar
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
                  class="express-contact-van-fsr-circle"
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
          </div> -->

          <div
            v-if="
              $store.state.salesExpressContractVanFSR
                .expressContractVanFSRCurrentTab == 'Overview'
            "
          >
            <div class="row">
              <div class="col-12">
                <TimeLineHeader
                  :IncomingData="
                    this.$store.state.salesExpressContractVanFSR
                      .expressContractVanFsrOverviewData
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
                  <div class="flex font-size-12 express-international-font">
                    {{ getHeader(index) }}
                  </div>
                  <div
                    :class="
                      item != 'High'
                        ? 'flex font-size-12  express-international-font color-66c11e'
                        : 'flex font-size-12  express-international-font color-c11e1e'
                    "
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-column ml-1 mt-3 mb-4">
              <div class="flex font-size-12 express-international-font mb-2">
                Package details
              </div>
              <div class="flex">
                <div
                  class="
                    express-contact-van-fsr-index-grey-wrapper-regular
                    bg-f3f7ff
                    border-radius-8
                    p-2
                  "
                >
                  <p
                    class="
                      font-size-12
                      line-height-18
                      color-4e5968
                      express-international-font
                    "
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
          <component
            v-bind:is="slotProps.item.markerComponent"
            :IncomingData="
              this.$store.state.salesExpressContractVanFSR
                .expressContractVanFsrOverviewData
            "
          />
        </span>
      </template>
    </Timeline>
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
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import CostingDetails from "./Overview/CostingDetails.vue";
import BillSettings from "././Overview/BillSettings.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostCenter from "../../../../Common/CostCenter/Express.vue";
import FollowUp from "../../../../Common/FollowUp.vue";
import BillPreferences from "./BillPreferences.vue";
import Attachments from "../../../../Common/Attachments.vue";
import CreateContract from "./Overview/CreateContact.vue";
import CircleProgress from "vue3-circle-progress";
import Notification from "../../../../Common/Notification.vue";
import "vue3-circle-progress/dist/circle-progress.css";
import { mapGetters } from "vuex";
import Dropdown from "primevue/dropdown";
import axios from "axios";

import moment from "moment";
export default {
  components: {
    Timeline,
    Tab,
    CostingDetails,
    BillSettings,
    TimeLineHeader,
    CostCenter,
    FollowUp,
    BillPreferences,
    Attachments,
    CreateContract,
    CircleProgress,
    Dropdown,
    Notification,
  },
  computed: {
    ...mapGetters({
      expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
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
    await this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    this.$store.state.salesExpressContractVanFSR
      .expressContractVanFSRCurrentTab == "Overview";

    await this.$store.dispatch(
      "salesExpressContractVanFSR/loadexpressContractVanFsrOverviewData",
      {
        id: this.$route.params.id,
        path: "/sales/quotations/overview/",
      }
    );

    await this.$store.dispatch(
      "salesExpressContractVanFSR/loadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );

    await this.$store.dispatch(
      "salesExpressContractVanFSR/resetExpressContractVanFSRTimeLineData",
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
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractVanFSR.expressContractBikeFSRCurrentTab}`;
  },
  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractVanFSR.expressContractBikeFSRCurrentTab}`;
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
    sendQuotationhandler() {
      let processedMail;
      if (this.expressContractVanFsrOverviewData.contacts) {
        if (this.expressContractVanFsrOverviewData.contacts.length > 0) {
          if (this.expressContractVanFsrOverviewData.contacts[0].email) {
            processedMail =
              this.expressContractVanFsrOverviewData.contacts[0].email;
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
        //loadData: "salesExpressContractVanFSR/loadRapidoContractOverviewData",
        data: {
          email: processedMail,
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
  },
  watch: {
    "$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData":
      function () {
        let val =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData?.express_contract.reduce(
            (obj) => Object.assign(obj)
          );

        this.secondRowData = {
          priority:
            this.$store.state.salesExpressContractVanFSR
              .expressContractVanFsrOverviewData?.priority,
          previously_served_by: val.previously_served_by,
          referred_by: val.referred_by,
          referral_person_name: val.referral_name,
          sales_comission: val.sales_commission,
          festival_name: val.festival_name,
        };

        let EndValue =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value })
          );

        this.package = EndValue.package_details;

        this.$store.dispatch(
          "salesExpressContractVanFSR/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: "1",
          }
        );
      },

    "$store.state.salesExpressContractVanFSR.SalesPersonData": function () {
      this.object =
        this.$store.state.salesExpressContractVanFSR.SalesPersonData.reduce(
          (obj, item) => Object.assign(obj, { [item.key]: item.value })
        );
    },

    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesExpressContractVanFSR/loadSalesPersonDataDropdown",
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
.express-contact-van-fsr-index-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
}
::v-deep.p-dropdown .p-dropdown-label.p-placeholder {
  padding: 0;
  border: none;
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

.express-contact-van-fsr-progress-bar {
  min-width: 450px;
}
.express-contact-van-fsr-circle {
  width: 40px !important;
  height: 40px !important;
}
</style>
