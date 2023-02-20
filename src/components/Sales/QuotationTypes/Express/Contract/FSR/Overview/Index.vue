<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="
          $store.state.salesExpressContractFSR.ExpressContractFSRTimeLineData
        "
        align="left"
        class="customized-timeline"
      >
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
                      >Express: Contract <br /><b class="tagText">
                        {{ this.IndexFsrDetails?.quotation_id }}
                      </b></span
                    >
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <!-- <StatusTag
                      :label="this.IndexFsrDetails?.status"
                      class="bg-F4ECFF color-8F46EB"
                      borderRadius="7px"
                    /> -->
                    <StatusTags
                      class="mx-2"
                      :type="IndexFsrDetails?.status"
                      :label="IndexFsrDetails?.status"
                      usage="timeline"
                    />
                  </div>

                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <!-- <StatusTag
                      :label="this.IndexFsrDetails?.status"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    /> -->
                    <StatusTags
                      class="mx-2"
                      :type="IndexFsrDetails?.status"
                      :label="IndexFsrDetails?.status"
                      usage="timeline"
                    />
                  </div>

                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b
                        class="
                          line-height-15
                          font-size-12
                          express-international-font
                          color-4e5968
                        "
                      >
                        {{
                          dateFormater(
                            this.IndexFsrDetails?.settings?.updatedAt
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
                      <!-- <Dropdown
                        v-model="selectedCity1"
                        :options="cities"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      /> -->

                      <Dropdown
                        v-model="selectCity"
                        :options="
                          this.$store.state.salesExpressContractFSR
                            ?.ExpressAdhocSalesPersonData
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
                                this.$store.state.salesExpressContractFSR.ExpressAdhocSalesPersonData?.map(
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

                      <!-- <span
                        class="
                          line-height-15
                          color-4e5968
                          font-size-12
                          express-international-font
                        "
                        >Charlie</span
                      > -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="my-3">
              <CreateContact />
            </div> -->

            <div class="flex experess-contract">
              <Buttons
                v-if="
                  $route.params.type == 'quotation' &&
                  ($store.state.salesExpressContractFSR
                    .ExpressContractFsrOverviewData.status == 'New' ||
                    $store.state.salesExpressContractFSR
                      .ExpressContractFsrOverviewData?.status == 'Quote')
                "
                label="Send Quotation"
                button_class="dialog-button-text experess-contract m-3 bg-357dea"
                v-on:childToParent="sendQuotationhandler"
              />
            </div>

            <div class="flex">
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
              />
            </div>

            <div
              v-if="
                $store.state.salesExpressContractFSR
                  .expressContractFSRCurrentTab == 'Overview'
              "
            >
              <div class="row">
                <div class="col-12">
                  <TimeLineHeader />
                </div>
              </div>

              <div class="flex flex-row ml-1 mt-4 mb-4">
                <div
                  class="flex mr-7"
                  v-for="(item, index) of secondRowData"
                  :key="index"
                >
                  <div class="flex flex-column">
                    <div
                      class="
                        flex
                        font-size-12
                        color-7e84a7
                        express-international-font
                      "
                    >
                      {{ getHeader(index) }}
                    </div>
                    <div
                      :class="
                        item != 'High'
                          ? 'flex  font-size-12 express-international-font color-66c11e'
                          : 'flex  font-size-12  express-international-font color-c11e1e'
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
                    color-7e84a7
                    express-international-font
                    mb-2
                  "
                >
                  Package details
                </div>
                <div class="flex">
                  <div
                    class="
                      express-contact-fsr-index-grey-wrapper-regular
                      border-radius-8
                      bg-f3f7ff
                      p-2
                    "
                  >
                    <p
                      class="
                        color-4e5968
                        line-height-18
                        font-size-12
                        express-international-font
                      "
                    >
                      {{
                        this.IndexFsrDetails.express_contract[0]
                          ?.package_details
                      }}
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
import { mapGetters } from "vuex";
import CreateContact from "./Overview/CreateContact.vue";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostingDetails from "./Overview/CostingDetails.vue";
import BillPreferences from "./BillPreferences.vue";
import Attachments from "./Attachments.vue";
import FollowUp from "./FollowUp.vue";
import Dropdown from "primevue/dropdown";
import moment from "moment";
export default {
  components: {
    Tab,
    Timeline,
    CreateContact,
    TimeLineHeader,
    CostingDetails,
    BillPreferences,
    Attachments,
    FollowUp,
    Dropdown,
  },

  computed: {
    ...mapGetters({
      IndexFsrDetails: "salesExpressContractFSR/ExpressContractFsrOverviewData",
    }),
  },

  data() {
    return {
      data: null,
      object: null,
      selectCity: null,
      // apple : ,
      cities: [
        { name: "john", code: "NY" },
        { name: "andrey", code: "RM" },
        { name: "spider man", code: "LDN" },
        { name: "super man", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      secondRowData: null,

      TimeLineTabMenuData: [
        {
          label: "Overview",
          tab: "",
          select: true,
          tabName: "Overview",
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

  watch: {
    "$store.state.salesExpressContractFSR.ExpressAdhocSalesPersonData":
      function () {
        this.object =
          this.$store.state.salesExpressContractFSR.ExpressAdhocSalesPersonData.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value })
          );
      },

    "selectCity.name": function () {
      this.$store.dispatch(
        "salesExpressContractFSR/loadSalesPersonDataDropdownFsr",
        {
          path:
            "/sales/quotations/sales-person/" +
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.id,
          payload: {
            sales_person_id: this.object.code,
          },
        }
      );
    },
    "$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData":
      function () {
        this.secondRowData = {
          priority:
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.priority,
          previously_served_by:
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.express_contract[0]
              .previously_served_by,
          referred_by:
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.express_contract[0].referred_by,
          referral_person_name:
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.express_contract[0].referral_name,
        };
      },
  },

  async created() {
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Quotation > Express Contract > ${this.$store.state.salesExpressContractFSR.expressContractFSRCurrentTab}`;
    this.$store.state.salesExpressContractFSR.expressContractFSRCurrentTab ==
      "Overview";

    console.log("this.$route.params.id", this.$route.params.id);

    await this.$store.dispatch(
      "salesExpressContractFSR/loadExpressContractFsrOverviewData",
      {
        id: this.$route.params.id,
      }
    );

    await this.$store.dispatch(
      "salesExpressContractFSR/ExpressAdhocloadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );

    // await this.secondRowFunction();

    this.$store.dispatch(
      "salesExpressContractFSR/resetExpressContractFSRTimeLineData",
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
        ],
      }
    );
  },

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Quotation > Express Contract > ${this.$store.state.salesExpressContractFSR.expressContractFSRCurrentTab}`;
  },
  methods: {
    sendQuotationhandler() {
      let processedMail;
      if (
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData
          .contacts
      ) {
        if (
          this.$store.state.salesExpressContractFSR
            .ExpressContractFsrOverviewData.contacts.length > 0
        ) {
          if (
            this.$store.state.salesExpressContractFSR
              .ExpressContractFsrOverviewData.contacts[0].email
          ) {
            processedMail =
              this.$store.state.salesExpressContractFSR
                .ExpressContractFsrOverviewData.contacts[0].email;
          } else {
            processedMail = "";
          }
        }
      }

      let mailData = {
        send_to: [],
      };

      this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData.contacts.map(
        (list) => {
          mailData.send_to.push(list.id);
        }
      );

      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        type: this.$route.params.type,
        loadDiffStore: true,
        // loadData: "salesExpressContractFSR/loadRapidoContractOverviewData",
        data: mailData,
        // data: {
        //   email: processedMail,
        //   template_id: 1,
        // },
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
      }
      return header;
    },

    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
  },
};
</script>

<style scoped>
.express-contact-fsr-index-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
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
