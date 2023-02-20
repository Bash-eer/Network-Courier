<template>
  <div class="card p-3" :key="renderkey">
    <div class="flex customized-timeline">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <!-- <div > -->
        <Timeline
          :value="$store.state.salesExpressContract.expressContractVanTimeLine"
          align="left"
        >
          <template #marker="slotProps">
            <span
              :class="
                slotProps.index == 0
                  ? 'express-van-custom-marker justify-content-center align-items-center flex border-radius-50 color-fff p-shadow-2'
                  : 'express-van-default-marker justify-content-center align-items-center flex border-radius-50 color-fff'
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
                class="express-van-markers"
              />
            </span>
          </template>

          <template #content="slotProps">
            <span v-if="slotProps.index == 0">
              <div class="flex flex-wrap justify-content-between mt-1">
                <div class="flex">
                  <div class="flex flex-row">
                    <div class="flex mr-4">
                      <span
                        class="
                          font-size-11
                          color-4e5968
                          express-international-font
                        "
                        >Express: Contract <br /><span class="tagText">{{
                          this.overview_data?.quotation_id ||
                          this.overview_data?.contract_id
                        }}</span></span
                      >
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
                  <div class="flex flex-column flex-wrap">
                    <div
                      v-for="items of customDialData"
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
                </OverlayPanel>

                <div class="flex">
                  <div class="flex flex-row">
                    <!-- <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <StatusTag
                      label="Contract Signed"
                      color="#E1AC22"
                      bgColor="#FFF3EC"
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
                        :type="overview_data?.status"
                        :label="overview_data?.status"
                        usage="timeline"
                      />
                    </div>

                    <div
                      class="flex mr-5"
                      v-if="$route.params.type == 'quotation'"
                    >
                      <span class="tagText">Quotation <br />Status:</span>

                      <!-- <StatusTag
                      label="Approved"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    /> -->

                      <StatusTags
                        class="mx-2"
                        :type="overview_data?.status"
                        :label="overview_data?.status"
                        usage="timeline"
                      />
                    </div>

                    <div class="flex">
                      <span class="tagText"
                        >Modified On <br /><b
                          class="
                            font-size-12
                            line-height-15
                            color-4e5968
                            express-international-font
                          "
                        >
                          {{ dateFormater(this.overview_data?.createdAt) }}
                        </b></span
                      >
                    </div>
                    <!-- <div class="flex flex-row mx-3">
                    <img
                      src="/images/avatar.png"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <div class="flex flex-column mx-2">
                      <Dropdown
                        v-model="selectedCity1"
                        :options="cities"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      />
                      <span
                        class="
                          font-size-12
                          line-height-15
                          color-4e5968
                          express-international-font
                        "
                        >Charlie</span
                      >
                    </div>
                  </div> -->

                    <div class="flex flex-row mx-3">
                      <img
                        :src="salesPersonSrc"
                        alt=""
                        width="32"
                        height="32"
                      />
                      <div class="flex flex-column mx-2">
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
                          :key="renderkey"
                          :details="
                            $store.state.salesExpressContract.OverviewData
                              ?.sales_person ?? {}
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="$route.params.type == 'quotation'" class="my-3">
                <Notification
                  v-if="
                    this.overview_data?.status == 'Approved' ||
                    this.overview_data?.status == 'Accepted'
                  "
                  :status="this.overview_data?.status"
                  @Promote="promote"
                  loadData="salesExpressContract/loadOverviewData"
                />
                <div v-if="$route.params.type == 'contract'" class="my-3">
                  <TerminationTemplate
                    v-if="this.overview_data?.status == 'Terminated'"
                    id="this.$route.params.id,"
                    type="this.$route.params.type,"
                    loadData="salesExpressContract/loadOverviewData"
                  />
                </div>
              </div>

              <div class="flex my-auto justify-content-between">
                <div class="flex">
                  <Tab
                    v-bind:tabMenuData="TimeLineTabMenuData"
                    type="salesTimeLine"
                  />
                </div>
                <div class="flex experess-contract py-3">
                  <Buttons
                    v-if="
                      $route.params.type == 'quotation' &&
                      (overview_data?.status == 'New' ||
                        overview_data?.status == 'Quote')
                    "
                    label=" Send Quotation"
                    button_class="dialog-button-text experess-contract "
                    v-on:childToParent="sendQuotationhandler"
                  />
                  <Buttons
                    v-if="
                      $route.params.type == 'contract' &&
                      (overview_data?.status == 'New' ||
                        overview_data?.status == 'Quote' ||
                        overview_data?.status == 'Approved' ||
                        overview_data?.status == 'Accepted')
                    "
                    label="Send Contract"
                    button_class="dialog-button-text experess-contract m-3"
                    v-on:childToParent="sendContracthandler"
                  />
                </div>
              </div>

              <div
                v-if="
                  $store.state.salesExpressContract
                    .expressContractVanTimeLineCurrentTab == 'Overview'
                "
              >
                <div class="row" :key="renderkey">
                  <div class="col-12">
                    <TimeLineHeader :IncomingData="OverviewData" />
                  </div>
                </div>

                <div class="flex flex-row ml-1 mt-4 mb-4" :key="renderkey">
                  <div
                    class="flex mr-7"
                    v-for="(item, index) of secondRowData"
                    :key="index"
                  >
                    <div class="flex flex-column">
                      <div class="flex font-size-12">
                        {{ getHeader(index) }}
                      </div>
                      <div
                        :class="
                          item != 'High'
                            ? 'flex font-size-12  express-international-font color-66c11e'
                            : 'flex font-size-12  express-international-font  color-c11e1e'
                        "
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-column ml-1 mt-3 mb-4">
                  <div
                    class="
                      flex
                      font-size-12
                      express-international-font express-international-table
                      mb-2
                    "
                  >
                    Package Detail
                  </div>
                  <div class="flex">
                    <div class="bg-f3f7ff border-radius-8 p-2">
                      <p
                        class="
                          font-size-12
                          line-height-18
                          color-4e5968
                          express-international-font
                        "
                      >
                        {{
                          this.overview_data?.express_contract[0]
                            ?.package_details
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <AdditionalInfo />

                <OverviewAttachments />
              </div>
            </span>
            <span v-if="slotProps.index != 0">
              {{ slotProps.markerComponent }}
              <component v-bind:is="slotProps.item.markerComponent" />
            </span>
          </template>
        </Timeline>
      <!-- </div> -->
    </div>
  </div>
  <!-- <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  /> -->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
  <InternationalDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostingDetail from "./Overview/CostingDetails.vue";
import BillSettings from "./Overview/BillSetting.vue";
import ExpressVanCostCenter from "../../../Common/CostCenter/Express.vue";
import ExpressVanBillPreferences from "../../../Common/BillPreferences.vue";
import ExpressVanFollowUp from "../../../Common/FollowUp.vue";
import ExpressVanAttachments from "../../../Common/Attachments.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import AdditionalInfo from "./Overview/AdditionalInfo.vue";
import OverviewAttachments from "./Overview/Attachments.vue";
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
import Notification from "./Notification.vue";
import { errhandler } from "@/services/httpClient";
import OverlayPanel from "primevue/overlaypanel";
import TerminationTemplate from "../../../Common/TerminationTemplate";
// import Dialog from "./Dialogs/Dialog.vue";
import Toasts from "../../../Common/Toast.vue";
import InternationalDialog from "../../../../../../components/Sales/Sales/Dialog.vue";
import {
  expressContract,
  expressContractState,
} from "../../../../../../store/helper";
import { mapActions } from "vuex";

export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetail,
    BillSettings,
    ExpressVanCostCenter,
    ExpressVanBillPreferences,
    ExpressVanFollowUp,
    ExpressVanAttachments,
    Dropdown,
    DataTable,
    Column,
    AdditionalInfo,
    OverviewAttachments,
    Notification,
    OverlayPanel,
    Toasts,
    SalesPerson,
    InternationalDialog,
    TerminationTemplate,
  },
  computed: {
    ...expressContractState,
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  data() {
    return {
      renderkey: 1,
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

      secondRowData: {},

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
          label: "Terminate",
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
    };
  },

  async created() {
    await this.initScreen();
    this.renderkey++;
  },

  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesExpressContract?.OverviewData?.profile_name} > Contract > Express Contract > ${this.$store.state.salesExpressContract.expressContractVanTimeLineCurrentTab}`;
  },

  async mounted() {},

  watch: {
    "$store.state.salesExpressContract.OverviewData": async function () {},

    "$route.path": function () {
      this.initScreen();
    },
  },

  // updated() {

  // },

  methods: {
    ...expressContract,
    ...mapActions({
      loadOverviewData: "salesExpressContract/loadOverviewData",
    }),
    async initScreen() {
      this.$store.state.salesExpressContract
        .expressContractVanTimeLineCurrentTab == "Overview";

      this.$store.dispatch("salesExpressContract/resetExpressVanTimeLineData", {
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
            markerComponent: "BillSettings",
          },

          {
            index: 2,
            color: "#ffff",
          },
        ],
      });

      await this.$store.dispatch("salesExpressContract/loadOverviewData", {
        id: this.$route.params.id,
        type: this.$route.params.type,
      });

      this.$store.state.users.breadcrumbTitle = "Sales";
      this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContract.expressContractVanTimeLineCurrentTab}`;
      await this.OverviewPageData();

      await this.getSalesPersonDropdownData();
      if (this.salesPersonData.length > 0) {
        this.salesPerson = this.salesPersonData[0].name;
        this.salesPersonSrc = this.salesPersonData[0].image_url;
      }
    },
    async promote() {
      try {
        await this.$store.dispatch("salesInternationalAgent/promoteContract", {
          id: this.$route.params.id,
        });
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "The contract activated successfully!",
          life: 3000,
        });
        await this.getOverData();
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },

    async getOverData() {
      await this.$store.dispatch("salesExpressContract/loadOverviewData", {
        id: this.$route.params.id,
        type: this.$route.params.type,
      });
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async menuClicked(choice) {
      if (choice == "Edit") {
        // let processedType;
        //   if (this.selectedTab == "quotation") {
        //     processedType = "quotations";
        //   } else processedType = "contract";
        //   this.$store.dispatch("salesInternationalContract/loadRowData", {
        //     path:
        //       "/sales/" + processedType + "/overview/" + this.$route.params.id,
        //   });
        //   this.$store.state.salesInternationalContract.StepperIdData =
        //     "SalesInternationalContractFirstStep";
        this.setEXCStateValue({ updateType: this.$route.params.type });
        // this.$store.state.salesExpressContract.updateType = "quotation";
        await this.loadOverviewData({
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
        let overView = this.overview_data?.express_contract[0];
        let stepData = [
          {
            index: 0,
            label: "1",
            component: "SalesExpressContractFirstStep",
            name: "Add Address",
          },
          {
            index: 1,
            label: "2",
            component: "SalesExpressContractSecondStep",
            name: "Select Method",
          },
        ];
        if (overView.fsr && !overView.bike && !overView.van) {
          stepData.push(this.dynamicStep[3]);
        } else {
          stepData.push(this.dynamicStep[0]);
          if (overView.bike) {
            stepData.push(this.dynamicStep[2]);
          }
          if (overView.van) {
            stepData.push(this.dynamicStep[1]);
          }
          if (overView.fsr) {
            stepData.push(this.dynamicStep[3]);
          }
        }
        stepData.push(this.dynamicStep[4]);
        stepData.map((i, count) => {
          i.index = count;
          i.label = `${i.index + 1}`;
          return i;
        });
        this.$store.state.salesExpressContract.flowStep = 0;
        this.$store.state.salesExpressContract.ExpressContractFlowStepperData =
          stepData;
        this.$store.dispatch("salesSales/openDialog", {
          dialogDetails: {
            dialogName: "ExpressContractQuotationDialog",
            dialogHeader: "Edit Express Contract",
            dialogHeaderId: this.overview_data?.quotation_id,
          },
        });
        this.$store.getters["salesSales/controlActivityDialog"];
      }
      if (choice == "Rate Adjustment") {
        await this.loadOverviewData({
          id: this.$route.params.id,
          type: "contract",
        });
        let service = this.overview_data?.express_contract[0];
        if (
          (service.bike == true &&
            service.van == false &&
            service.fsr == false) ||
          (service.bike == false &&
            service.van == true &&
            service.fsr == false) ||
          (service.bike == false && service.van == false && service.fsr == true)
        ) {
          // if (service == "Bike" || service == "Van" || service == "Fsr") {
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: "RateAdjustment",
              dialogHeader: "Rate Adjustment",
              dialogHeaderId: this.overview_data?.quotation_id,
            },
          });
          this.$store.getters["salesSales/controlActivityDialog"];
        }
        if (
          (service.bike == true &&
            service.van == true &&
            service.fsr == false) ||
          (service.bike == false &&
            service.van == true &&
            service.fsr == true) ||
          (service.bike == true && service.van == false && service.fsr == true)
        ) {
          // if (
          //   service == "Van + Bike" ||
          //   service == "Van + Fsr" ||
          //   service == "Bike + Fsr"
          // )
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: "RateAdjustmentInterCompany",
              dialogHeader: "Rate Adjustment",
              dialogHeaderId: this.overview_data?.quotation_id,
            },
          });
          this.$store.getters["salesSales/controlActivityDialog"];
        }
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
    async OverviewPageData() {
      this.secondRowData = {
        priority: this.overview_data?.express_contract[0]?.priority,
        previously_served_by:
          this.overview_data?.express_contract[0]?.previously_served_by,
        referred_by: this.overview_data?.express_contract[0]?.referred_by,
        referral_person_name:
          this.overview_data?.express_contract[0]?.referral_name,
        sales_comission:
          this.overview_data?.express_contract[0]?.sales_commission,
        festival_name: this.overview_data?.express_contract[0]?.festival_name,
      };
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY ");
        return formattedDate;
      }
    },

    async sendQuotationhandler() {
      let processedMail;
      if (this.overview_data?.contacts) {
        if (this.overview_data?.contacts.length > 0) {
          if (this.overview_data?.contacts[0].email) {
            processedMail = this.overview_data?.contacts[0].email;
          } else {
            processedMail = "";
          }
        }
      }

      let mailData = {
        send_to: [],
      };

      this.overview_data?.contacts.map((list) => {
        mailData.send_to.push(list.id);
      });

      try {
        await this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path: "/sales/quotations/send/" + this.$route.params.id,
          method: "POST",
          id: this.$route.params.id,
          type: this.$route.params.type,
          loadDiffStore: true,
          data: mailData,
          loadData: "salesExpressContract/loadOverviewData",
          toastData: {
            toastSuccessData: {
              toastMsg: `Quotation send successfully`,
              toastSeverity: "info",
            },
          },
        });
        await this.getOverData();
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },

    async sendContracthandler() {
      let processedMail;
      if (this.overview_data?.contacts) {
        if (this.overview_data?.contacts.length > 0) {
          if (this.overview_data?.contacts[0].email) {
            processedMail = this.overview_data?.contacts[0].email;
          } else {
            processedMail = "";
          }
        }
      }

      let mailData = {
        send_to: [],
      };

      this.overview_data?.contacts.map((list) => {
        mailData.send_to.push(list.id);
      });

      try {
        await this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path: "/sales/contracts/send/" + this.$route.params.id,
          method: "POST",
          id: this.$route.params.id,
          type: this.$route.params.type,
          loadDiffStore: true,
          data: mailData,
          loadData: "salesExpressContract/loadOverviewData",
        });
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Contract send successfully",
          life: 3000,
        });
        await this.getOverData();
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-van-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
}
::v-deep .customized-timeline {
  overflow: auto !important;
}
.express-van-custom-marker {
  width: 3rem;
  height: 3rem;
  z-index: 1;
}
.express-van-default-marker {
  width: 3rem;
  height: 0.5rem;
  z-index: 1;
}
.express-van-markers {
  margin-left: 19%;
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

.van-costing-details-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}
.van-costing-details-trip-schedule {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #7e84a7;
}
.date {
  color: #66c11e;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>