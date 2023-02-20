<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div
        @click="
          $router.push({
            name: 'QuotationContract',
            params: {
              id: this.$route.params.p_id,
            },
          })
        "
      >
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <div class="w-100">
        <Timeline
          :value="$store.state.salesRapidoContract.RapidoContractTimeLine"
          :align="left"
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
                :src="'/images/' + 'rapidoBadge' + '.png'"
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
                        >Rapido: Contract <br /><span
                          v-if="$route.params.type == 'quotation'"
                          class="tagText"
                          >{{ rapidoContractOverviewData.quotation_id }}</span
                        >
                        <span v-else class="tagText">{{
                          rapidoContractOverviewData.contract_id
                        }}</span>
                      </span>
                    </div>
                    <div class="flex">
                      <i
                        @click="toggle"
                        class="pointer pi pi-ellipsis-v mt-2"
                      ></i>
                    </div>
                  </div>
                </div>
                <OverlayPanel
                  ref="op"
                  :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
                  style="width: 190px"
                >
                  <!-- v-if="$route.params.type == 'quotation'"  quotationCustomSpeedDialData-->
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
                          <i :class="items.icon" style="font-size: 1.1rem"></i>
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
                  <!-- <div
                  v-if="$route.params.type == 'contract'"
                  class="flex flex-column flex-wrap"
                >
                  <div
                    v-for="items of contractCustomSpeedDialData"
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
                        <i :class="items.icon" style="font-size: 1.1rem"></i>
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
                  </div> -->
                  <!-- </div> -->
                </OverlayPanel>
                <div class="flex">
                  <div class="flex flex-row">
                    <!-- <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>
                    <StatusTag
                      label="Not Signed"
                      class="color-8F46EB bg-F4ECFF"
                      borderRadius="7px"
                    />
                  </div> -->
                    <div
                      v-if="$route.params.type == 'contract'"
                      class="flex mr-5"
                    >
                      <span class="font-size-11 bold-600 text-color-secondary"
                        >Contract <br />Status:</span
                      >

                      <StatusTags
                        :type="rapidoContractOverviewData.status"
                        :label="rapidoContractOverviewData.status"
                        usage="timeline"
                        class="mx-2"
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
                        :type="rapidoContractOverviewData.status"
                        :label="rapidoContractOverviewData.status"
                        usage="timeline"
                      />
                    </div>
                    <!-- <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>
                    <StatusTag
                      label="Approved"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    />
                  </div> -->
                    <div class="flex">
                      <span class="tagText"
                        >Modified On <br /><b
                          class="
                            bold-600
                            font-size-12
                            line-height-15
                            color-4e5968
                          "
                        >
                          <!-- {{
                          dateFormater(
                            rapidoContractOverviewData
                              ?.rapido_contract_specifics?.updatedAt
                          )
                        }} -->
                          {{
                            dateFormater(rapidoContractOverviewData.updatedAt)
                          }}
                        </b></span
                      >
                    </div>
                    <div class="flex flex-row mx-3">
                      <img
                        :src="salesPersonSrc"
                        alt=""
                        width="32"
                        height="32"
                      />
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
                        <SalesPerson
                          :key="renderKey"
                          :details="rapidoContractOverviewData.sales_person"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="$route.params.type == 'quotation'" class="my-3">
                <Notification
                  v-if="
                    rapidoContractOverviewData.status == 'Approved' ||
                    rapidoContractOverviewData.status == 'Accepted'
                  "
                  :status="rapidoContractOverviewData.status"
                  loadData="salesRapidoContract/loadRapidoContractOverviewData"
                />
              </div>
              <div v-if="$route.params.type == 'contract'" class="my-3">
                <TerminationTemplate
                  v-if="rapidoContractOverviewData.status == 'Terminated'"
                  loadData="salesRapidoContract/loadRapidoContractOverviewData"
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
                <!-- <Button label="Send Quotation" class="font-size-14 mr-4" /> -->
                <div class="flex experess-contract">
                  <Buttons
                    v-if="
                      $route.params.type == 'quotation' &&
                      (rapidoContractOverviewData.status == 'New' ||
                        rapidoContractOverviewData.status == 'Quote')
                    "
                    label="Send Quotation"
                    button_class="dialog-button-text experess-contract m-3"
                    v-on:childToParent="sendQuotationhandler"
                  />
                  <Buttons
                    v-if="
                      $route.params.type == 'contract' &&
                      (rapidoContractOverviewData.status == 'New' ||
                        rapidoContractOverviewData.status == 'Quote' ||
                        rapidoContractOverviewData.status == 'Approved' ||
                        rapidoContractOverviewData.status == 'Accepted')
                    "
                    label="Send Contract"
                    button_class="dialog-button-text experess-contract m-3"
                    v-on:childToParent="sendContracthandler"
                  />
                </div>
                <!-- <div> -->
                <!-- <div
                v-if="$route.params.type == 'contract'"
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
              </div> -->
                <!-- </div> -->
              </div>
              <div
                v-if="
                  $store.state.salesRapidoContract
                    .rapidoContractTimeLineCurrentTab == 'Overview'
                "
              >
                <div class="row">
                  <div class="col-12">
                    <TimeLineHeader
                      :IncomingData="
                        this.$store.state.salesRapidoContract
                          .RapidoContractOverviewData
                      "
                    />
                  </div>
                </div>
                <!--SELECT METHOD-->
                <div class="flex flex-row ml-1 my-4 ">
                  <div
                    class="flex  ml-6"
                    v-for="(item, index) of secondRowData"
                    :key="index"
                  >
                    <div class="flex flex-column">
                      <div
                        class="flex color-7e84a7 express-international-table"
                      >
                        {{ getHeader(index) }}
                      </div>
                      <div
                        :class="
                          item != 'High'
                            ? 'flex   express-international-table color-66c11e'
                            : 'flex   express-international-table color-c11e1e'
                        "
                      >
                        {{ item || "-" }}
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
  </div>
  <!--toast-->
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
import TimeLineHeader from "./Overview/TimelineHeader.vue";
import SalesDialog from "../../../../Sales/Dialog.vue";

import CostingDetail from "./Overview/CostingDetails.vue";
import CostCenter from "../../../Common/CostCenter/Rapido.vue";

// import RapidoBillPreferences from "./BillPreferences.vue";
import Button from "primevue/button";
import { mapActions, mapGetters } from "vuex";
// import Dropdown from "primevue/dropdown";
import moment from "moment";
import RapidoBillPreferences from "../../../Common/BillPreferences.vue";
import RapidoAttachments from "../../../Common/Attachments.vue";
import RapidoFollowUp from "../../../Common/FollowUp.vue";
import Toasts from "../../../Common/Toast.vue";
import Notification from "../Notification.vue";
import TerminationTemplate from "../../../Common/TerminationTemplate.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import axios from "axios";
import OverlayPanel from "primevue/overlaypanel";

export default {
  components: {
    OverlayPanel,
    SalesDialog,
    RapidoAttachments,
    RapidoFollowUp,
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetail,
    CostCenter,
    RapidoBillPreferences,
    Button,
    // Dropdown,
    Toasts,
    Notification,
    TerminationTemplate,
    CircleProgress,
    SalesPerson,
  },
  computed: {
    ...mapGetters({
      rapidoContractOverviewData:
        "salesRapidoContract/RapidoContractOverviewData",
    }),
  },
  data() {
    return {
      renderKey: 1,
      termination_id: "",
      salesPerson: "",
      salesPersonSrc: "/images/noavatar.png",
      quotationCustomSpeedDialData: [
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
        // {
        //   label: "Terminate",
        //   icon: "pi pi-minus-circle",
        // },
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

      modifiedOn: "",
      packageDetails: "",
      secondRowData: {
        // priority: "High",
        // previously_served_by: "ABC Company2",
        // referred_by: "Rider1",
        // referral_person_name: "Jacob1",
        // festival_name: "Diwali",
        // sales_comission: "50",
        // estimated_start_date: "12 july 2022",
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
    ...mapActions({
      setQuotationData: "salesRapidoContract/Contract/setQuotationData",
      setRapidoContractStepNum: "salesQuotationDialog/setRapidoContractStepNum",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    getCustomDialData() {
      if (this.$route.params.type == "quotation") {
        return this.quotationCustomSpeedDialData;
      }
      if (this.$route.params.type == "contract") {
        if (this.rapidoContractOverviewData.status) {
          if (this.rapidoContractOverviewData.status == "Terminated") {
            return this.contractAlternateCustomSpeedDialData;
          } else if (this.rapidoContractOverviewData.status == "In Contract") {
            return this.contractCustomSpeedDialData;
          } else return this.quotationCustomSpeedDialData;
        } else return this.quotationCustomSpeedDialData;
      }
    },
    async menuClicked(choice) {
      if (choice == "Edit") {
        await this.setQuotationData({
          type: this.$route.params.type,
          id: this.$route.params.id,
        });
        this.setRapidoContractStepNum(1);
        this.$store.dispatch("salesSales/openDialog", {
          dialogDetails: {
            dialogName: "RapidoContractQuotationDialog",
            dialogHeader: "Edit",
          },
        });
        this.$store.getters["salesSales/controlActivityDialog"];
        return;
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
    async processSalesPersonImageHandler() {
      let respectiveData = this.salesPersonData.find(
        (itm) => itm.name == this.salesPerson
      );

      if (respectiveData) {
        this.salesPersonSrc = respectiveData.image_url;
      }

      // this.rates = [];
      // axios
      //   .get(
      //     "/settings/sales/rates/express/contract/dropdowns/regions/ratecards/" +
      //       respectiveData.id
      //   )
      //   .then((res) => {
      //     if (res.data.results) {

      //       for (let c in res.data.results) {
      //         res.data.results[c]["name"] =
      //           res.data.results[c]["rate_card_name"];
      //         this.rates.push(res.data.results[c]);
      //         // this.toZoneData.push(res.data.results[c]);
      //       }
      //     }
      //   });
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
      if (this.rapidoContractOverviewData.contacts) {
        if (this.rapidoContractOverviewData.contacts.length > 0) {
          if (this.rapidoContractOverviewData.contacts[0].email) {
            processedMail = this.rapidoContractOverviewData.contacts[0].email;
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
        loadData: "salesRapidoContract/loadRapidoContractOverviewData",
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
      if (this.rapidoContractOverviewData.contacts) {
        if (this.rapidoContractOverviewData.contacts.length > 0) {
          if (this.rapidoContractOverviewData.contacts[0].email) {
            processedMail = this.rapidoContractOverviewData.contacts[0].email;
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
        loadData: "salesRapidoContract/loadRapidoContractOverviewData",
        data: {
          email: processedMail,
          // recivers: [{ email: processedMail }],
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
        case "sales_comission":
          header = "Sales Commission($)";
          break;
        case "estimated_start_date":
          header = "Estimated Start Date";
          break;
      }
      return header;
    },

    async secondRowFunction() {
      this.modifiedOn = this.dateFormater(
        this.rapidoContractOverviewData.rapido_contract_specifics.updatedAt
      );
      this.packageDetails =
        this.rapidoContractOverviewData.rapido_contract_specifics.package_details;
      this.secondRowData = {
        priority:
          this.rapidoContractOverviewData.rapido_contract_specifics.priority,
        previously_served_by:
          this.rapidoContractOverviewData.rapido_contract_specifics
            .previously_served_by,
        referred_by:
          this.rapidoContractOverviewData.rapido_contract_specifics.referred_by,
        referral_person_name:
          this.rapidoContractOverviewData.rapido_contract_specifics
            .referral_name,
        festival_name:
          this.rapidoContractOverviewData.rapido_contract_specifics
            .festival_name,
        sales_comission:
          this.rapidoContractOverviewData.rapido_contract_specifics
            .sales_commission,
        estimated_start_date:
          this.rapidoContractOverviewData.settings.estimated_start_date,
      };
      this.secondRowData.estimated_start_date = this.dateFormater(
        this.rapidoContractOverviewData.settings.estimated_start_date
      );
      this.renderKey++;
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
        loadData: "salesRapidoContract/loadRapidoContractOverviewData",
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

    await this.$store.dispatch(
      "salesRapidoContract/loadRapidoContractOverviewData",
      {
        id: this.$route.params.id,
        type: this.$route.params.type,
      }
    );

    await this.secondRowFunction();

    this.$store.dispatch(
      "salesRapidoContract/resetRapidoContractTimeLineData",
      {
        data: [
          {
            index: 0,
            color: "#66c11e",
          },
          {
            index: 1,
            color: "#ffff",
            markerComponent: "CostingDetail",
          },
          // {
          //   index: 2,
          //   color: "#ffff",
          //   markerComponent: "TripSchedules",
          // },
          // {
          //   index: 3,
          //   color: "#ffff",
          //   markerComponent: "BillSettings",
          // },
          // {
          //   index: 4,
          //   color: "#ffff",
          // },
        ],
      }
    );
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.rapidoContractOverviewData.profile_name}> ${this.$route.params.type} > Rapido Contract > ${this.$store.state.salesRapidoContract.rapidoContractTimeLineCurrentTab}`;
  },

  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }

    this.$store.state.users.breadcrumbPath = `Sales > ${this.rapidoContractOverviewData.profile_name}> ${this.$route.params.type} > Rapido Contract > ${this.$store.state.salesRapidoContract.rapidoContractTimeLineCurrentTab}`;
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

.hover-blue:hover {
  color: #357dea;
}
::v-deep .indent{
  text-indent: -21 !important;
}
.custom-speed-dial-text {
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}
::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}

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
::v-deep .customized-timeline {
  overflow: auto !important;
}
::v-deep(.p-timeline-event-content) ::v-deep(.p-timeline-event-opposite) {
  line-height: 10;
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
</style>