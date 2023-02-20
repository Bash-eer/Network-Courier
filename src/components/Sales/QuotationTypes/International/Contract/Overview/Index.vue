<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div
        @click="
          $router.push({
            name: 'QuotationContract',
            params: {
              id: this.$route.params.pid,
            },
          })
        "
      >
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="
          $store.state.salesInternationalContract.InternationalContractTimeLine
        "
        align="left"
      >
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'international-contract-custom-marker color-fff border-radius-50 flex align-items-center justify-content-center p-shadow-2'
                : 'international-contract-default-marker color-fff border-radius-50 flex align-items-center justify-content-center'
            "
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <img
              v-if="slotProps.index == 0"
              :src="'/images/' + 'InternationalLogo' + '.svg'"
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
                    <span class="font-size-11 bold-600 color-4e5968"
                      >International Contract <br /><span
                        v-if="$route.params.type == 'quotation'"
                        class="tagText"
                        >{{
                          this.$store.state.salesInternationalContract
                            .internationalContractOverviewData.quotation_id
                        }}</span
                      >
                      <span v-else class="tagText">{{
                        this.$store.state.salesInternationalContract
                          .internationalContractOverviewData.contract_id
                      }}</span>
                    </span>
                  </div>
                  <div @click="toggle" class="flex pointer">
                    <i class="pi pi-ellipsis-v mt-2"></i>
                  </div>
                  <OverlayPanel
                    ref="op"
                    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
                    style="width: 190px"
                  >
                    <div class="flex flex-column flex-wrap">
                      <div
                        v-for="items of getCustomDialData()"
                        class="flex my-2 menuDivs"
                        :key="items.label"
                      >
                        <div
                          class="flex flex-row cursor-pointer"
                          @click="menuClicked(items.label)"
                        >
                          <div
                            class="
                              flex
                              align-items-center
                              justify-content-center
                              mr-2
                            "
                          >
                            <i
                              :class="items.icon"
                              style="font-size: 1.1rem"
                            ></i>
                          </div>
                          <div
                            class="
                              flex
                              align-items-center
                              justify-content-center
                              hover-blue
                              custom-speed-dial-text
                            "
                          >
                            {{ items.label }}
                          </div>
                          <div
                            v-if="
                              items.label == 'Deactivate' ||
                              items.label == 'Private'
                            "
                            class="ml-3"
                          >
                            <div>
                              <Toggle
                                v-on:childToParent="disableRow"
                                :check="false"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </OverlayPanel>
                </div>
              </div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span
                      v-if="$route.params.type == 'quotation'"
                      class="tagText mr-2"
                      >Quotation <br />Status:</span
                    >
                    <span
                      v-if="$route.params.type == 'contract'"
                      class="tagText"
                      >Contract <br />Status:</span
                    >
                    <StatusTags
                      :type="
                        this.$store.state.salesInternationalContract
                          .internationalContractOverviewData.status
                      "
                      :label="
                        this.$store.state.salesInternationalContract
                          .internationalContractOverviewData.status
                      "
                      usage="timeline"
                    />
                  </div>

                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b
                        class="
                          font-size-12
                          bold-600
                          color-4e5968
                          line-height-15
                        "
                      >
                        {{
                          dateFormater(
                            internationalContractOverviewData?.createdAt
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
                      <SalesPerson
                        :key="renderKey"
                        :details="
                          $store.state.salesInternationalContract
                            .internationalContractOverviewData.sales_person
                        "
                      />
                      <!-- <span
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
                      /> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$route.params.type == 'quotation'" class="my-3">
              <Notification
                v-if="
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status == 'Approved' ||
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status == 'Accepted'
                "
                :status="
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status
                "
                loadData="salesInternationalContract/loadInternationalContractOverviewData"
              />
            </div>
            <div v-if="$route.params.type == 'contract'" class="my-3">
              <TerminationTemplate
                v-if="
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status == 'Terminated'
                "
                loadData="salesInternationalContract/loadInternationalContractOverviewData"
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
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />
              <Buttons
                v-if="
                  $route.params.type == 'quotation' &&
                  (this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status == 'New' ||
                    this.$store.state.salesInternationalContract
                      .internationalContractOverviewData.status == 'Quote')
                "
                label="Send Quotation"
                class="font-size-14"
                v-on:childToParent="sendQuotationhandler"
              />
              <Buttons
                v-if="
                  $route.params.type == 'contract' &&
                  (this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.status == 'New' ||
                    this.$store.state.salesInternationalContract
                      .internationalContractOverviewData.status == 'Quote' ||
                    this.$store.state.salesInternationalContract
                      .internationalContractOverviewData.status == 'Approved' ||
                    this.$store.state.salesInternationalContract
                      .internationalContractOverviewData.status == 'Accepted')
                "
                label="Send Contract"
                button_class="dialog-button-text experess-contract m-3"
                v-on:childToParent="sendContracthandler"
              />
            </div>
            <div
              v-if="
                $store.state.salesInternationalContract
                  .internationalContractTimeLineCurrentTab == 'Overview'
              "
            >
              <div class="row">
                <div>
                  <TimeLineHeader />
                </div>
              </div>

              <div class="flex flex-row ml-1 my-4">
                <div
                  class="flex mr-7"
                  v-for="(item, index) of secondRowData"
                  :key="index"
                >
                  <div class="flex flex-column">
                    <div class="flex color-7e84a7 express-international-table">
                      {{ getHeader(index) }}
                    </div>
                    <div
                      :class="
                        item != 'High'
                          ? 'flex  express-international-table color-66c11e'
                          : 'flex express-international-table color-c11e1e'
                      "
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>

          <span v-if="slotProps.index != 0">
            {{ slotProps.markerComponent }}
            <component :is="slotProps.item.markerComponent" />
          </span>
        </template>
      </Timeline>
    </div>
  </div>
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
  <InternationalDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
  <Toast
    :severity="$store.state['salesSales'].toastData.severity"
    :summary="$store.state['salesSales'].toastData.summary"
  />
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimelineHeader.vue";
import CostingDetail from "./Overview/CostingDetails.vue";
import AgentDetails from "./Overview/AgentDetails.vue";
import CostCenter from "../../../Common/CostCenter/International.vue";
import InternetionalFollowUp from "../../../Common/FollowUp.vue";
import InternetionalAttachments from "../../../Common/Attachments.vue";
import InternationalBillPreferences from "../../../Common/BillPreferences.vue";
import Button from "primevue/button";
import Notification from "./Notification.vue";
import TerminationTemplate from "../../../Common/TerminationTemplate";
import SalesPerson from "../../../Common/SalesPerson.vue";
import Toasts from "../../../Common/Toast";
import Toast from "../../../../Sales/Toast";
import Dropdown from "primevue/dropdown";
import Dialog from "./Dialogs/dialog.vue";
import InternationalDialog from "../../../../../../components/Sales/Sales/Dialog.vue";
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";

export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetail,
    AgentDetails,
    CostCenter,
    InternetionalFollowUp,
    InternetionalAttachments,
    InternationalBillPreferences,
    Button,
    Dropdown,
    TerminationTemplate,
    Notification,
    OverlayPanel,
    Toasts,
    Toast,
    Dialog,
    InternationalDialog,
    SalesPerson,
  },
  computed: {
    ...mapGetters({
      selectedTab: "salesSales/selectedTab",
      internationalContractOverviewData:
        "salesInternationalContract/internationalContractOverviewData",
    }),
  },
  data() {
    return {
      renderKey: 1,
      cities: this.$store.state.salesInternationalContract.SalesPersonData,
      selectedCity: "",
      object: null,
      salesPersonSrc: "/images/noavatar.png",
      customDialData: [
        {
          label: "Edit",
          icon: "pi pi-pencil",
        },
        {
          label: "Rate Adjustment",
          icon: "pi pi-plus",
        },
        {
          label: "Activity Log",
          icon: "pi pi-minus",
        },
        {
          label: "Deactivate",
          icon: "pi pi-exclamation-circle",
        },
      ],
      contractCustomSpeedDialData: [
        {
          label: "Edit",
          icon: "pi pi-pencil",
        },
        {
          label: "Rate Adjustment",
          icon: "pi pi-plus",
        },
        {
          label: "Activity Log",
          icon: "pi pi-minus",
        },
        {
          label: "Terminate",
          icon: "pi pi-minus-circle",
        },
        {
          label: "Deactivate",
          icon: "pi pi-exclamation-circle",
        },
      ],
      contractAlternateCustomSpeedDialData: [
        {
          label: "Edit",
          icon: "pi pi-pencil",
        },
        {
          label: "Rate Adjustment",
          icon: "pi pi-plus",
        },
        {
          label: "Activity Log",
          icon: "pi pi-minus",
        },
        {
          label: "Reactivate",
          icon: "pi pi-minus-circle",
        },
        {
          label: "Deactivate",
          icon: "pi pi-exclamation-circle",
        },
      ],
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
    };
  },

  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async getSalesPersonDropdownData() {
      this.salesPersonData = [];
      await axios
        .get("/settings/user/dropdown?role=Sales Person")
        .then((res) => {
          if (res.data.results) {
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
    getCustomDialData() {
      if (this.$route.params.type == "quotation") {
        return this.customDialData;
      }
      if (this.$route.params.type == "contract") {
        if (
          this.$store.state.salesInternationalContract
            .internationalContractOverviewData.status
        ) {
          if (
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData.status == "Terminated"
          ) {
            return this.contractAlternateCustomSpeedDialData;
          } else return this.contractCustomSpeedDialData;
        } else return this.contractCustomSpeedDialData;
      }
    },
    async menuClicked(choice) {
      if (choice == "Edit") {
        let processedType;
        if (this.selectedTab == "quotation") {
          processedType = "quotations";
        } else processedType = "contract";
        this.$store.dispatch("salesInternationalContract/loadRowData", {
          path:
            "/sales/" + processedType + "/overview/" + this.$route.params.id,
        });
        this.$store.state.salesInternationalContract.StepperIdData =
          "SalesInternationalContractFirstStep";
      }
      if (choice == "Terminate") {
        this.$store.dispatch("salesSales/openDialog", {
          dialogDetails: {
            dialogName: "ContractTerminationDialog",
            dialogHeader: "Termination",
          },
        });
        this.$store.getters["salesSales/controlActivityDialog"];
      }
      if (choice == "Reactivate") {
        this.withDrawTerminationHandler();
      }
      this.$refs.op.hide();
    },
    // async editDialog() {
    //   let processedType;
    //   if (this.selectedTab == "quotation") {
    //     processedType = "quotations";
    //   } else processedType = "contract";
    //   this.$store.dispatch("salesInternationalContract/loadRowData", {
    //     path: "/sales/" + processedType + "/overview/" + this.$route.params.id,
    //   });
    //   this.$store.state.salesInternationalContract.StepperIdData =
    //     "SalesInternationalContractFirstStep";
    // },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    async processSalesPersonImageHandler() {
      let respectiveData = this.salesPersonData.find(
        (itm) => itm.name == this.salesPerson
      );
      if (respectiveData) {
        this.salesPersonSrc = respectiveData.image_url;
      }
    },
    sendQuotationhandler() {
      let processedMail;
      if (
        this.$store.state.salesInternationalContract
          .internationalContractOverviewData.contacts
      ) {
        if (
          this.$store.state.salesInternationalContract
            .internationalContractOverviewData.contacts.length > 0
        ) {
          if (
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData.contacts[0].email
          ) {
            processedMail =
              this.$store.state.salesInternationalContract
                .internationalContractOverviewData.contacts[0].email;
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
        loadData:
          "salesInternationalContract/loadInternationalContractOverviewData",
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
    sendContracthandler() {
      let processedMail;

      if (
        this.$store.state.salesInternationalContract
          .internationalContractOverviewData.contacts
      ) {
        if (
          this.$store.state.salesInternationalContract
            .internationalContractOverviewData.contacts.length > 0
        ) {
          if (
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData.contacts[0].email
          ) {
            processedMail =
              this.$store.state.salesInternationalContract
                .internationalContractOverviewData.contacts[0].email;
          } else {
            processedMail = "";
          }
        }
      }
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/contracts/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        type: this.$route.params.type,
        loadDiffStore: true,
        loadData:
          "salesInternationalContract/loadInternationalContractOverviewData",
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
        case "festival_name":
          header = "Festival Name";
          break;
        case "sales_commission":
          header = "Sales Commission($)";
          break;
      }
      return header;
    },
    withDrawTerminationHandler() {
      axios
        .get("/sales/contracts/terminations/contract/" + this.$route.params.id)
        .then((res) => {
          if (res?.data?.results) {
            this.termination_id = res.data.results.id;
            if (this.termination_id) {
              this.withDrawTerminationApiCall();
            }
          }
        });
    },
    withDrawTerminationApiCall() {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path:
          "/sales/contracts/terminations/reactivate/" +
          // this.$store.state.salesApproval.approvalsTerminationStateData.termination_id
          this.termination_id,
        method: "PATCH",
        id: this.$route.params.id,
        type: this.$route.params.type,
        loadDiffStore: true,
        loadData:
          "salesInternationalContract/loadInternationalContractOverviewData",

        // data: this.details,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Termination has been withdrawn successfully!`,
            toastSeverity: "success",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
      });
    },
  },

  async created() {
    await this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    await this.$store.dispatch("salesInternationalContract/loadDropdown", {
      path: "/settings/sales/rates/international/outbound/service-provider/rate-cards",
    });
    this.$store.dispatch("salesInternationalContract/loadFestivalDropdown", {
      path: "/settings/salesSettinigs/others/festival/dropdown",
    });
    this.$store.dispatch("salesInternationalContract/loadCompetitorDropdown", {
      path: "/settings/salesSettinigs/others/competitor/dropdown",
    });
    this.$store.dispatch("salesInternationalContract/loadReferenceDropdown", {
      path: "/settings/salesSettinigs/others/reference/dropdown",
    });
    this.$store.state.salesInternationalContract.internationalContractTimeLineCurrentTab =
      "Overview";
    await this.$store.dispatch(
      "salesInternationalContract/loadInternationalContractOverviewData",
      {
        id: this.$route.params.id,
        type: this.$route.params.type,
      }
    );
    await this.$store.dispatch(
      "salesInternationalContract/loadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );

    this.$store.dispatch(
      "salesInternationalContract/resetInternationalContractTimeLineData",
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
            markerComponent: "AgentDetails",
          },
          {
            index: 3,
            color: "#ffff",
          },
        ],
      }
    );

    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalContract.internationalContractOverviewData.profile_name}>${this.$route.params.type}>International Contract > ${this.$store.state.salesInternationalContract.internationalContractTimeLineCurrentTab}`;
  },
  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalContract.internationalContractOverviewData.profile_name}>${this.$route.params.type}>International Contract > ${this.$store.state.salesInternationalContract.internationalContractTimeLineCurrentTab}`;
  },

  watch: {
    salesPerson: async function () {
      await this.processSalesPersonImageHandler();
    },
    "$store.state.salesInternationalContract.internationalContractOverviewData":
      function () {
        this.$store.dispatch(
          "salesInternationalContract/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: this.$store.state.salesInternationalContract
              .internationalContractOverviewData.profile_id,
          }
        );
      },
    "$store.state.salesInternationalContract.internationalContractOverviewData.international_contract_specifics":
      function () {
        this.secondRowData = {
          priority:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.priority,
          previously_served_by:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.previously_served_by,
          referred_by:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.referred_by,
          referral_person_name:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.referral_name,
          festival_name:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.festival_name,
          sales_commission:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.sales_commission,
        };
      },
    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesInternationalContract/loadSalesPersonDataDropdown",
        {
          path: "/sales/quotations/sales-person/",
          id: this.$store.state.salesInternationalContract
            .internationalContractOverviewData.profile_id,
          payload: {
            sales_person_id: this.selectedCity,
          },
        }
      );
    },

    "$store.state.salesInternationalContract.SalesPersonData": function () {
      this.object =
        this.$store.state.salesInternationalContract.SalesPersonData.reduce(
          (obj, item) => Object.assign(obj, { [item.key]: item.value })
        );
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
  margin-left: -10px;
  padding: 10px;
}
.p-button {
  overflow: unset;
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
::v-deep .customized-timeline {
  overflow: auto !important;
}
</style>