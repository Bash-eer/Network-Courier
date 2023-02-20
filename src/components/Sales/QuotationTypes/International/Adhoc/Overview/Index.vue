<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesInternationalAdhoc.InternationalAdhocTimeLine"
        align="left"
      >
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'justify-content-center align-items-center flex border-radius-50 color-fff p-shadow-2'
                : 'international-adhoc-default-marker justify-content-center align-items-center flex border-radius-50 color-fff'
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
                    <span class="font-size-11 color-4e5968 bold-600"
                      >International: Adhoc <br /><span class="tagText">{{
                        this.$store.state.salesInternationalAdhoc
                          .InternationalAdhocOverviewData.quotation_id
                      }}</span></span
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
                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>
                    {{ this.selectedCity.img }}
                    <StatusTag
                      :label="
                        this.$store.state.salesInternationalAdhoc
                          .InternationalAdhocOverviewData.status
                      "
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    />
                  </div>

                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b
                        class="
                          font-size-12
                          color-4e5968
                          bold-600
                          line-height-15
                        "
                      >
                        {{
                          dateFormater(
                            InternationalAdhocOverviewData?.createdAt
                          )
                        }}
                      </b></span
                    >
                  </div>
                  <SalesPerson
                    :key="renderKey"
                    :details="
                      $store.state.salesInternationalAdhoc
                        .InternationalAdhocOverviewData.sales_person
                    "
                  />
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
                          this.$store.state.salesInternationalAdhoc
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
                                this.$store.state.salesInternationalAdhoc.SalesPersonData?.map(
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
                          font-size-12
                          color-4e5968
                          bold-600
                          line-height-15
                        "
                        >{{ this.selectedCity.name }}</span
                      >
                    </div>
                  </div> -->
                </div>
              </div>
            </div>

            <div class="flex">
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />
              <div class="flex experess-contract">
                <Buttons
                  v-if="
                    $route.params.type == 'quotation' &&
                    this.$store.state.salesInternationalAdhoc
                      .InternationalAdhocOverviewData.status == 'New'
                  "
                  label="SendQuotation"
                  button_class="dialog-button-text experess-contract m-3"
                  v-on:childToParent="sendQuotationhandler"
                />
              </div>
            </div>

            <div
              v-if="
                $store.state.salesInternationalAdhoc
                  .internationalAdhocTimeLineCurrentTab == 'Overview'
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
  <InternationalAdhocDialog
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
import moment from "moment";
import Tab from "./Tab.vue";
import TimelineHeader from "./Overview/TimelineHeader.vue";
import Profile from "./Overview/Profile.vue";
import FollowUp from "../../../Common/FollowUp.vue";
import Attachments from "../../../Common/Attachments.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import Notification from "../../../Common/Notification";
import InternationalAdhocDialog from "../../../../../../components/Sales/Sales/Dialog";
import Dropdown from "primevue/dropdown";
import Toasts from "../../../Common/Toast";
import Toast from "../../../../Sales/Toast";
import { mapGetters } from "vuex";
export default {
  components: {
    Timeline,
    Tab,
    TimelineHeader,
    OverlayPanel,
    Profile,
    FollowUp,
    Notification,
    Attachments,
    InternationalAdhocDialog,
    Dropdown,
    Toasts,
    Toast,
    SalesPerson,
  },
  computed: {
    ...mapGetters({
      InternationalAdhocOverviewData:
        "salesInternationalAdhoc/InternationalAdhocOverviewData",
    }),
  },
  data() {
    return {
      cities: this.$store.state.salesInternationalAdhoc.SalesPersonData,
      selectedCity: "",
      renderKey: 1,
      object: null,

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
      this.$store.dispatch("salesInternationalAdhoc/loadRowData", {
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
      let processedMail;
      if (this.InternationalAdhocOverviewData) {
        if (this.InternationalAdhocOverviewData.contacts) {
          if (this.InternationalAdhocOverviewData.contacts.length > 0) {
            if (this.InternationalAdhocOverviewData.contacts[0].email) {
              processedMail =
                this.InternationalAdhocOverviewData.contacts[0].email;
            } else {
              processedMail = "";
            }
          }
        }
      }
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        data: {
          email:
            this.$store.state.salesInternationalAdhoc
              .SalesPersonDataTimeLineHeader.email,
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
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        loadDiffStore: true,
        loadData: "salesInternationalAdhoc/loadInternationalAdhocOverviewData",
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

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData?.profile_name} > Quotation > International Adhoc > ${this.$store.state.salesInternationalAdhoc.internationalAdhocTimeLineCurrentTab}`;
  },

  async created() {
    this.$store.state.salesInternationalAdhoc
      .internationalAdhocTimeLineCurrentTab == "Overview";

    await this.$store.dispatch(
      "salesInternationalAdhoc/loadInternationalAdhocOverviewData",
      {
        id: this.$route.params.id,
      }
    );

    await this.$store.dispatch("salesInternationalAdhoc/loadSalesPersonData", {
      path: "/settings/user/dropdown?role=Sales Person",
    });

    this.$store.dispatch(
      "salesInternationalAdhoc/resetInternationalAdhocTimeLineData",
      {
        data: [
          {
            index: 0,
            color: "#EBBD46",
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
      }
    );
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData?.profile_name} > Quotation > International Adhoc > ${this.$store.state.salesInternationalAdhoc.internationalAdhocTimeLineCurrentTab}`;
  },

  watch: {
    "$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData":
      function () {
        this.$store.dispatch(
          "salesInternationalAdhoc/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: this.$store.state.salesInternationalAdhoc
              .InternationalAdhocOverviewData.profile_id,
          }
        );
      },

    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesInternationalAdhoc/loadSalesPersonDataDropdown",
        {
          path: "/sales/quotations/sales-person/",
          id: this.$store.state.salesInternationalAdhoc
            .InternationalAdhocOverviewData.profile_id,
          payload: {
            sales_person_id: this.selectedCity,
          },
        }
      );
    },

    "$store.state.salesInternationalAdhoc.SalesPersonData": function () {
      this.object =
        this.$store.state.salesInternationalAdhoc.SalesPersonData.reduce(
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
  background-color: unset !important;
}
.international-adhoc-default-marker {
  width: 3rem;
  height: 0.5rem;
  z-index: 1;
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
::v-deep.p-inputtext {
  padding: 0 !important;
}
</style>