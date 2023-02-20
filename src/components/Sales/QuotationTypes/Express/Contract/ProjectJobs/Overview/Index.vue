<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="
          $store.state.salesExpressContractProjectJobs
            .ExpressContractProjectJobsTimeLineData
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
                      >Express: Contract <br />
                      <b class="tagText"
                        >{{
                          this.$store.state.salesExpressContractProjectJobs
                            .ExpressContractProjectJobOverviewData.quotation_id
                        }}
                      </b>
                    </span>
                    <!-- {{this.$store.state.salesExpressContractProjectJobs
      .ExpressContractProjectJobsOverviewData.address}} -->
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <StatusTag
                      :type="quotationData?.status"
                      :label="quotationData?.status"
                      usage="timeline"
                    />
                  </div>

                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <StatusTag
                      class="mx-2"
                      :type="quotationData?.status"
                      :label="quotationData?.status"
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
                        {{ dateFormater(quotationData?.createdAt) }}
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
                      <Dropdown
                        v-model="selectedCity1"
                        ::options="
                          this.$store.state.salesExpressContractProjectJobs
                            .SalesPersonData
                        "
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      />
                      <span
                        class="
                          line-height-15
                          color-4e5968
                          font-size-12
                          express-international-font
                        "
                        >Charlie</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-3">
              <Active />
            </div>

            <div class="flex">
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
              />
            </div>

            <div
              v-if="
                $store.state.salesExpressContractProjectJobs
                  .expressContractProjectJobsCurrentTab == 'Overview'
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
                          ? 'flex font-size-12   express-international-font color-66c11e'
                          : 'flex  font-size-12 express-international-font color-c11e1e'
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
                      express-project-jobs-grey-wrapper-regular
                      border-radius-8
                      bg-f3f7ff
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
                      {{
                        this.quotationData?.express_contract[0]
                          ?.package_details || "-"
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
  <SalesDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import CostingDetails from "./Overview/CostingDetails.vue";
import BillPreferences from "../../../../Common/BillPreferences.vue";
import FollowUp from "../../../../Common/FollowUp.vue";
import Attachments from "../../../../Common/Attachments.vue";
import CostCenter from "../../../../Common/CostCenter/Express.vue";
import BillSettings from "./Overview/BillSettings.vue";
import Active from "./Overview/Active.vue";
import Dropdown from "primevue/dropdown";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import SalesDialog from "../../../../../Sales/Dialog.vue";
import axios from "axios";

export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetails,
    BillPreferences,
    FollowUp,
    Attachments,
    CostCenter,
    BillSettings,
    Active,
    Dropdown,
    SalesDialog,
  },
  data() {
    return {
      cities: this.$store.state.salesExpressContractProjectJobs.SalesPersonData,
      selectedCity: "",
      object: null,
      renderKey: 10,
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
      secondRowData: {
        priority: "",
        previously_served_by: "",
        referred_by: "",
        referral_person_name: "",
        sales_comission: "",
        festival_name: "",
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
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractProjectJobs/quotationDataOverview",
    }),
  },
  watch: {
    // salesPerson: async function () {
    //   await this.processSalesPersonImageHandler();
    // },
    quotationData() {
      this.renderKey++;
      console.log(this.quotationData);
    },

    "$store.state.salesExpressContractProjectJobs.quotationDataOverview":
      function () {
        this.$store.dispatch(
          "salesExpressContractProjectJobs/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: this.$store.state.salesExpressContractProjectJobs
              .quotationDataOverview.profile_id,
          }
        );
      },

    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesExpressContractProjectJobs/loadSalesPersonDataDropdown",
        {
          path: "/sales/quotations/sales-person/",
          id: this.$store.state.salesExpressContractProjectJobs
            .quotationDataOverview.profile_id,
          payload: {
            sales_person_id: this.selectedCity,
          },
        }
      );
    },

    "$store.state.salesExpressContractProjectJobs.SalesPersonData":
      function () {
        console.log(
          this.$store.state.salesExpressContractProjectJobs.SalesPersonData
        );
        this.object =
          this.$store.state.salesExpressContractProjectJobs.SalesPersonData.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value })
          );
      },
  },
  async created() {
    await this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }
    await this.setQuotationData({
      type: this.$route.params?.type,
      id: this.$route.params.id,
    });
    this.getValues();

    this.$store.state.salesExpressContractProjectJobs
      .expressContractProjectJobsTimeLineCurrentTab == "Overview";
    await this.$store.dispatch(
      "salesExpressContractProjectJobs/loadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );
    this.$store.dispatch(
      "salesExpressContractProjectJobs/resetExpressProjectJobsTimeLineData",
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
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractProjectJobs.expressContractProjectJobsTimeLineCurrentTab}`;
  },
  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }

    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractProjectJobs.expressContractProjectJobsTimeLineCurrentTab}`;
  },

  methods: {
     async getSalesPersonDropdownData() {
      this.salesPersonData = [];
      await axios
        .get("/settings/user/dropdown?role=Sales Person")
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "regions");
            for (let c in res.data.results) {
              this.salesPersonData = [];
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
    ...mapActions({
      setQuotationData:
        "salesExpressContractProjectJobs/setQuotationOverviewData",
    }),
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
    getValues() {
      if (this.quotationData) {
        this.secondRowData["priority"] = this.quotationData?.priority || "-";
        this.secondRowData["previously_served_by"] =
          this.quotationData?.express_contract[0]?.previously_served_by || "-";
        this.secondRowData["referred_by"] =
          this.quotationData?.express_contract[0]?.referred_by || "-";
        this.secondRowData["referral_person_name"] =
          this.quotationData?.express_contract[0]?.referral_name || "-";
        this.secondRowData["sales_comission"] =
          this.quotationData?.express_contract[0]?.sales_commission || "-";
        this.secondRowData["festival_name"] =
          this.quotationData?.express_contract[0]?.festival_name || "-";
      }
    },
  },
};
</script>

<style scoped>
.express-project-jobs-grey-wrapper-regular {
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
