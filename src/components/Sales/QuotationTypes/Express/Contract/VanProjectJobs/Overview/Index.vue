<template>
  <div class="card p-3">
    <div class="flex">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesExpressContractVanProjectJobs.expressContractVanProjectJobsTimeLine"
        align="left"
        class="customized-timeline"
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
                      >Express: Contract <br /><span class="tagText"
                        >NEC/SQ00370/2021</span
                      ></span
                    >
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <StatusTag
                      label="Contract Signed"
                      color="#E1AC22"
                      bgColor="#FFF3EC"
                      borderRadius="7px"
                    />
                  </div>

                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <StatusTag
                      label="Approved"
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
                          line-height-15
                          color-4e5968
                          express-international-font
                        "
                      >
                        21st july 2021
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
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
              />
            </div>

            <div
              v-if="
                $store.state.salesExpressContractVanProjectJobs
                  .expressContractVanProjectJobsTimeLineCurrentTab == 'Overview'
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
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit.
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
import Tab from "../Overview/Tab.vue";
import TimeLineHeader from "../Overview/Overview/TimeLineHeader.vue";
import CostingDetail from "../Overview/Overview/CostingDetails.vue";
import BillSettings from "../Overview/Overview/BillSettings.vue";
import CostCenter from "../../../../Common/CostCenter/Express.vue"
import BillPreferences from "../../../../Common/BillPreferences.vue";
import FollowUp from "../../../../Common/FollowUp.vue";
import Attachments from "../../../../Common/Attachments.vue";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    CostingDetail,
    BillSettings,
    CostCenter,
    BillPreferences,
    FollowUp,
    Attachments,
    Dropdown,
  },
  data() {
    return {
      cities: [
        { name: "john", code: "NY" },
        { name: "andrey", code: "RM" },
        { name: "spider man", code: "LDN" },
        { name: "super man", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],

      secondRowData: {
        priority: "High",
        previously_served_by: "ABC Company2",
        referred_by: "Rider1",
        referral_person_name: "Jacob1",
        sales_comission: "50",
        festival_name: "Diwali",
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

  created() {
    this.$store.state.salesExpressContractVanProjectJobs
      .expressContractVanProjectJobsTimeLineCurrentTab == "Overview";

    this.$store.dispatch(
      "salesExpressContractVanProjectJobs/resetExpressVanProjectJobsTimeLineData",
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
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractVanProjectJobs.expressContractVanProjectJobsTimeLineCurrentTab}`;
  },

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractVanProjectJobs.expressContractVanProjectJobsTimeLineCurrentTab}`;
  },

  methods: {
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
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-van-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
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
</style>
