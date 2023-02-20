<template>
  <div class="card">
    <br />
    <Timeline
      :value="
        $store.state.salesExpressAdhoc.ExpressAdhocTimeLine
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
            :src="'/images/' + 'InternationalLogo' + '.svg'"
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
                    >Express:Adhoc <br />NEC/SQ00370/2021</span
                  >
                </div>
                <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-5">
                  <span class="tagText">Quotation <br />Status:</span>

                  <StatusTag
                    label="New"
                    color="#32DD4D"
                    bgColor="#CFFFEB"
                    borderRadius="7px"
                  />
                </div>

                <div class="flex">
                  <span class="tagText"
                    >Modified On <br /><b> 21st july 2021 </b></span
                  >
                </div>
                <div class="flex flex-row mx-3">
                  <img src="/images/avatar.png" alt="" width="32" height="32" />
                  <div class="flex flex-column mx-2">
                    <span class="tagText">Sales Person</span>
                    <span class="tagText">Charlie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex">
            <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />
          </div>

          <div
            v-if="
              $store.state.salesExpressAdhoc
                .expressAdhocTimeLineCurrentTab == 'Overview'
            "
            class="mb-4"
          >
            <div class="row">
              <div class="col-12">
                <TimeLineHeader />
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
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import TimeLineHeader from "./Overview/TimeLineHeader.vue";
import Profile from "./Overview/Profile.vue";
import Attachments from "./Attachments.vue";
import FollowUp from "./FollowUp.vue";
export default {
  components: {
    Timeline,
    Tab,
    TimeLineHeader,
    Profile,
    Attachments,
    FollowUp,
  },

  data() {
    return {
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

  created() {
    this.$store.state.salesExpressAdhoc
      .expressAdhocTimeLineCurrentTab == "Overview";

    this.$store.dispatch(
      "salesExpressAdhoc/resetExpressAdhocTimeLineData",
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
  },
};
</script>

<style lang="scss" scoped>
.markers {
  margin-left: 19%;
}
.custom-marker {
  display: flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}
.default-marker {
  display: flex;
  width: 3rem;
  height: 0.5rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}
.detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.valuesText {
  color: #66c11e;
}
.priorityText {
  color: #c11e1e;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>
