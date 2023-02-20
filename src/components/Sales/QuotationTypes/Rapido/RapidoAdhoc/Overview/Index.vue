<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesRapidoAdhoc.RapidoAdhocTimeLine"
        align="left"
      >
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'international-adhoc-custom-marker align-items-center justify-content-center flex border-radius-50 color-fff p-shadow-2'
                : 'international-adhoc-default-marker align-items-center justify-content-center flex border-radius-50 color-fff'
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
              class="international-adhoc-markers"
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
                      >Rapido: Adhoc <br /><span class="tagText">
                        {{ RapidoAdhocOverviewData.quotation_id }}
                      </span></span
                    >
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
                      <div class="flex my-1 menuDivs">
                        <div
                          class="flex flex-row cursor-pointer"
                          @click="editDialog"
                        >
                          <div
                            class="
                              flex
                              align-items-center
                              justify-content-center
                              mr-2
                            "
                          >
                            <i class="pi pi-pencil"></i>
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
                            Edit
                          </div>
                        </div>
                      </div>
                    </div>
                  </OverlayPanel>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-row">
                  <!-- <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <StatusTags
                      :type="RapidoAdhocOverviewData.status"
                      :label="RapidoAdhocOverviewData.status"
                      usage="timeline"
                    />
                  </div> -->
                  <!-- <div
                    v-if="$route.params.type == 'contract'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Contract <br />Status:</span
                    >
                   
                    <StatusTags
                      :type="RapidoAdhocOverviewData.status"
                      :label="RapidoAdhocOverviewData.status"
                      usage="timeline"
                    />
                  
                  </div> -->
                  <div
                    v-if="$route.params.type == 'quotation'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Quotation <br />Status:</span
                    >
                    <!-- <StatusTags type="new" label="Approved" usage="timeline" /> -->
                    <!-- <StatusTag
                      label="Approved"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    /> -->
                    <StatusTags
                      class="mx-2"
                      :type="RapidoAdhocOverviewData.status"
                      :label="RapidoAdhocOverviewData.status"
                      usage="timeline"
                    />
                  </div>
                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b
                        class="
                          color-4e5968
                          font-size-12
                          line-height-15
                          bold-600
                        "
                      >
                        {{
                          dateFormater(
                            RapidoAdhocOverviewData.rapido_adhoc_specifics
                              ?.updatedAt
                          )
                        }}
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
                        v-model="selectedCity"
                        :options="
                          this.$store.state.salesRapidoAdhoc.SalesPersonData
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
                                this.$store.state.salesRapidoAdhoc.SalesPersonData?.map(
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
                          color-4e5968
                          font-size-12
                          line-height-15
                          bold-600
                        "
                        >{{ this.selectedCity.name }}</span
                      >
                    </div>
                  </div> -->
                  <SalesPerson
                    :key="renderKey"
                    :details="RapidoAdhocOverviewData.sales_person"
                  />
                </div>
              </div>
            </div>
            <!--❌no notification for adhoc-->

            <!-- <div class="my-3">
            //   <Notification
            //     v-if="RapidoAdhocOverviewData.status != 'New'"
            //     :status="RapidoAdhocOverviewData.status"
            //   />
            // </div> -->
            <div class="flex p-3 justify-content-between">
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />

              <div class="flex experess-contract">
                <Buttons
                  v-if="
                    $route.params.type == 'quotation' &&
                    RapidoAdhocOverviewData.status == 'New'
                  "
                  label="SendQuotation"
                  button_class="dialog-button-text experess-contract m-3"
                  v-on:childToParent="sendQuotationhandler()"
                />
              </div>
              <!-- <div v-if="$route.params.type == 'contract'">
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
              </div> -->
            </div>
            <div
              v-if="
                $store.state.salesRapidoAdhoc.rapidoAdhocTimeLineCurrentTab ==
                'Overview'
              "
              class="mb-4"
            >
              <div class="row">
                <div class="col-12">
                  <TimelineHeader />
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
  <!--toast-->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
  <Toast
    :severity="$store.state['salesSales'].toastData.severity"
    :summary="$store.state['salesSales'].toastData.summary"
  />

  <RapidoAdhocDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import moment from "moment";
import RapidoAdhocDialog from "../../../../../../components/Sales/Sales/Dialog";
import TimelineHeader from "./Overview/TimelineHeader.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import FollowUp from "../../../../../../components/Sales/QuotationTypes/Common/FollowUp.vue";
import Attachments from "../../../../../../components/Sales/QuotationTypes/Common/Attachments.vue";
import Profile from "./Overview/Profile.vue";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import Toasts from "../../../Common/Toast.vue";
import Toast from "../../../../Sales/Toast";
// import axios from "axios";
// const { URL } = require("../../../../config/const");
// axios.defaults.baseURL = URL.BACKEND_BASEURL;

// import Notification from "../../../../QuotationTypes/Common/Notification.vue";
export default {
  components: {
    Timeline,
    OverlayPanel,
    Tab,
    TimelineHeader,
    Profile,
    FollowUp,
    Attachments,
    Dropdown,
    RapidoAdhocDialog,
    SalesPerson,
    Toasts,
    Toast,
  },
  computed: {
    ...mapGetters({
      RapidoAdhocOverviewData: "salesRapidoAdhoc/RapidoAdhocOverviewData",
    }),
  },
  data() {
    return {
      renderKey: 1,
      TimeLineTabMenuData: [
        {
          label: "Overview",
          tab: "",
          select: true,
          tabName: "Overview",
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
      cities: this.$store.state.salesRapidoAdhoc.SalesPersonData,
      selectedCity: "",
      object: null,
      secondRowData: {
        priority: "High",
        previously_served_by: "ABC Company2",
        referred_by: "Rider1",
        referral_person_name: "Jacob1",
        sales_comission: "50",
        festival_name: "Diwali",
      },
    };
  },

  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async editDialog() {
      this.$store.dispatch("salesRapidoAdhoc/loadRowData", {
        path: "/sales/quotations/overview/" + this.$route.params.id,
      });
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
      // let processedMail;
      // if (this.RapidoAdhocOverviewData.company_contacts) {
      //   if (this.RapidoAdhocOverviewData.company_contacts.length > 0) {
      //     if (this.RapidoAdhocOverviewData.company_contacts[0].email) {
      //       processedMail =
      //         this.RapidoAdhocOverviewData.company_contacts[0].email;
      //     } else {
      //       processedMail = "";
      //     }
      //   }
      // }

      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        loadDiffStore: true,
        loadData: "salesRapidoAdhoc/loadRapidoAdhocOverviewData",
        data: {
          email:
            this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
              ?.email,
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
    // getHeader(index) {
    //   let header;
    //   switch (index) {
    //     case "priority":
    //       header = "Priority";
    //       break;
    //     case "previously_served_by":
    //       header = "Previously Served By";
    //       break;
    //     case "referred_by":
    //       header = "Refered By";
    //       break;
    //     case "referral_person_name":
    //       header = "Referal Person Name";
    //       break;
    //     case "sales_comission":
    //       header = "Sales Commission($)";
    //       break;
    //     case "festival_name":
    //       header = "Festival Name";
    //       break;
    //   }
    //   return header;
    // },
  },

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData?.profile_name} > Quotation > Rapido Adhoc > ${this.$store.state.salesRapidoAdhoc.rapidoAdhocTimeLineCurrentTab}`;
  },

  async created() {
    await this.$store.dispatch("salesRapidoAdhoc/loadRapidoAdhocOverviewData", {
      id: this.$route.params.id,
    });
    await this.$store.dispatch("salesRapidoAdhoc/loadSendQuotationEmail", {
      path: "/sales/profiles/",
      id: this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData.profile_id,
    });
    await this.$store.dispatch("salesRapidoAdhoc/loadSalesPersonData", {
      path: "/settings/user/dropdown?role=Sales Person",
    });
    this.$store.dispatch("salesRapidoAdhoc/resetRapidoAdhocTimeLineData", {
      data: [
        {
          index: 0,
          color: "#66c11e",
        },
        {
          index: 1,
          color: "#ffff",
          markerComponent: "Profile",
        },

        {
          index: 2,
          color: "#ffff",
        },
      ],
    });
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData?.profile_name} > Quotation > Rapido Adhoc > ${this.$store.state.salesRapidoAdhoc.rapidoAdhocTimeLineCurrentTab}`;
  },
  watch: {
    "$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData": function () {
      this.$store.dispatch(
        "salesRapidoAdhoc/loadSalesPersonDataTimeLineHeader",
        {
          path: "/sales/profiles/",
          id: this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData
            .profile_id,
        }
      );
    },

    "selectedCity.name": function () {
      this.$store.dispatch("salesRapidoAdhoc/loadSalesPersonDataDropdown", {
        path: "/sales/quotations/sales-person/",
        id: this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData
          .profile_id,
        payload: {
          sales_person_id: this.selectedCity,
        },
      });
    },

    "$store.state.salesRapidoAdhoc.SalesPersonData": function () {
      this.object = this.$store.state.salesRapidoAdhoc.SalesPersonData.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.international-adhoc-markers {
  margin-left: 19%;
}
.international-adhoc-custom-marker {
  width: 3rem;
  height: 3rem;
  z-index: 1;
}
.international-adhoc-default-marker {
  width: 3rem;
  height: 0.5rem;
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
::v-deep .customized-timeline {
  overflow: auto !important;
}
</style>