<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesExpressAdhoc.ExpressAdhocTimeLine"
        align="left"
      >
        <template #marker="slotProps">
          <span
            :class="
              slotProps.index == 0
                ? 'custom-marker flex justify-content-center align-items-center color-fff border-radius-50 p-shadow-2'
                : 'default-marker flex justify-content-center align-items-center color-fff border-radius-50'
            "
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <img
              v-if="slotProps.index == 0"
              :src="'/images/' + 'VanImage' + '.png'"
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
                      >Express:Adhoc <br />
                      <b class="tagText">{{ this.quotation_id }} </b></span
                    >
                    <div class="flex">
                      <i class="pi pi-ellipsis-v ml-2 mt-2"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <!-- <StatusTag
                      class="mx-2"
                      :type="ExpressAdhocOverviewData.status"
                      :label="ExpressAdhocOverviewData.status"
                      usage="timeline"
                    /> -->

                    <StatusTags
                      class="mx-2"
                      :type="ExpressAdhocOverviewData.status"
                      :label="ExpressAdhocOverviewData.status"
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
                        {{ dateFormater(ExpressAdhocOverviewData?.createdAt) }}
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
                          this.$store.state.salesExpressAdhoc.SalesPersonData
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
                                this.$store.state.salesExpressAdhoc.SalesPersonData?.map(
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
                    </div>
                  </div> -->
                  <SalesPerson
                    :key="renderKey"
                    :details="
                      $store.state.salesExpressAdhoc.ExpressAdhocOverviewData
                        .sales_person
                    "
                  />
                </div>
              </div>
            </div>

            <div class="flex">
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />
            </div>

            <div
              v-if="
                $store.state.salesExpressAdhoc.expressAdhocTimeLineCurrentTab ==
                'Overview'
              "
              class="mb-4"
            >
              <div class="row">
                <div class="col-12">
                  <TimeLineHeader
                    :IncomingData="
                      this.$store.state.salesExpressAdhoc
                        .ExpressAdhocOverviewData
                    "
                  />
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

  <SalesDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import TimeLineHeader from "./OverView/TimeLineHeader.vue";
import SalesDialog from "../../../../Sales/Dialog.vue";
import Profile from "./OverView/Profile.vue";
import ExpressAdhocAttachments from "../../../Common/Attachments.vue";
import ExpressAdhocFollowUp from "../../../Common/FollowUp.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    Profile,
    ExpressAdhocAttachments,
    ExpressAdhocFollowUp,
    Dropdown,
    SalesDialog,
    SalesPerson,
  },
  computed: {
    ...mapGetters({
      ExpressAdhocOverviewData: "salesExpressAdhoc/ExpressAdhocOverviewData",
    }),
  },
  data() {
    return {
      object: null,
      renderKey: 1,
      selectedCity: null,
      quotation_id: null,
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
  },

  async mounted() {
    // await this.$store.dispatch(
    //   "salesExpressAdhoc/loadExpressAdhocOverviewData",
    //   {
    //     id: this.$route.params.id,
    //   }
    // );
  },

  async created() {
    await this.$store.dispatch(
      "salesExpressAdhoc/loadExpressAdhocOverviewData",
      {
        id: this.$route.params.id,
      }
    );

    await this.$store.dispatch("salesExpressAdhoc/loadSalesPersonData", {
      path: "/settings/user/dropdown?role=Sales Person",
    });

    this.$store.dispatch("salesExpressAdhoc/resetExpressAdhocTimeLineData", {
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
    });

    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Adhoc > Express Adhoc > ${this.$store.state.salesExpressAdhoc.expressAdhocTimeLineCurrentTab}`;

    this.quotation_id =
      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.quotation_id;

    this.renderKey++;
  },

  watch: {
    "$store.state.salesExpressAdhoc.ExpressAdhocOverviewData": function () {
      this.$store.dispatch("salesExpressAdhoc/loadSalesPersonDataPatch", {
        path: "/sales/profiles/",
        id: this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
          .profile_id,
      });
      this.quotation_id =
        this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.quotation_id;
    },

    "selectedCity.name": function () {
      this.$store.dispatch("salesExpressAdhoc/loadSalesPersonDataDropdown", {
        path: "/sales/quotations/sales-person/",
        id: this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
          .profile_id,
        payload: {
          sales_person_id: this.selectedCity,
        },
      });
    },

    "$store.state.salesExpressAdhoc.SalesPersonData": function () {
      this.object = this.$store.state.salesExpressAdhoc.SalesPersonData.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value })
      );
    },
  },

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesExpressAdhoc?.ExpressAdhocOverviewData?.profile_name} > Adhoc > Express Adhoc > ${this.$store.state.salesExpressAdhoc.expressAdhocTimeLineCurrentTab}`;
  },
};
</script>

<style lang="scss" scoped>
.markers {
  margin-left: 19%;
}
.custom-marker {
  width: 3rem;
  height: 3rem;
  z-index: 1;
}
::v-deep .customized-timeline {
  overflow: auto !important;
}
.default-marker {
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
</style>