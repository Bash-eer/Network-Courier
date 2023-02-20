<template>
  <div class="card">
    <br />
    <Timeline :value="TimeLineData" align="left" class="customized-timeline">
      <!--timeleline markers-->
      <template #marker="slotProps">
        <span
          :class="
            slotProps.index == 0 ? 'custom-marker p-shadow-2' : 'default-marker'
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
      <!--timeleline content-->
      <template #content="slotProps">
        <!--TEMPLATE FOR FIRST MARKER-->
        <span v-if="slotProps.index == 0">
          <div class="flex flex-wrap justify-content-between mt-1">
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-4">
                  <span class="tagText">Express Contract  <br />ncz2345678</span>
                </div>
                <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
              </div>
            </div>
            <!--QUOTATION/CONTRACT DETAILS-->
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-5">
                  <span class="tagText">Contract <br />Status:</span>
                  <StatusTags
                    type="notSigned"
                    label="Not Signed"
                    usage="timeline"
                  />
                </div>
                <!-- $store.state.sales.expressQuotationOverviewData[0][
                        'status'
                      ]
                    "-->
                <div class="flex mr-5">
                  <span class="tagText">Quotation <br />Status:</span>
                  <StatusTags type="new" label="Approved" usage="timeline" />
                </div>
                <!--dateFormater(
                        $store.state.sales.expressQuotationOverviewData[0][
                          "modifiedOn"
                        ]
                      )-->
                <div class="flex">
                  <span class="tagText"
                    >Modified On <br /><b> 21st july 2021 </b></span
                  >
                </div>
                <div class="flex flex-row mx-2">
                  <img src="/images/avatar.png" alt="" width="32" height="32" />
                  <div class="flex flex-column mx-2">
                    <span class="tagText">Sales Person</span>
                    <span class="">Charlie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <MainTab
              v-bind:tabMenuData="TimeLineTabMenuData"
              type="salesTimeLine"
            />
          </div>
          <div
            v-if="$store.state.sales.expressTimeLineCurrentTab == 'Overview'"
          >
            <!--TIMELINE HEADER-->
            <div class="row">
              <div class="col-12">
                <!-- <ExpressTimeLineHeader /> -->
                hello
              </div>
            </div>
            <!--SELECT METHOD-->
            <div class="flex flex-row ml-1 mt-4">
              <div
                class="flex mr-7"
                v-for="(item, index) of $store.state.sales
                  .expressQuotationOverviewData[0]['selectMethod']"
                :key="index"
              >
                <div class="flex flex-column">
                  <div class="flex detailsText">{{ getHeader(index) }}</div>
                  <div
                    :class="
                      item != 'High'
                        ? 'flex detailsText valuesText'
                        : 'flex detailsText priorityText'
                    "
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <!--PACKAGE DETAILS-->
            <div class="flex flex-column ml-1 mt-3 mb-4">
              <div class="flex detailsText mb-2">Package details</div>
              <div class="flex">
                <div class="seaDiv p-2">
                  <p class="paragraph">
                    {{
                      $store.state.sales.expressQuotationOverviewData[0][
                        "package_details"
                      ]
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
</template>

<script>
import Timeline from "primevue/timeline";
import moment from "moment";
import MainTab from "../MainTab.vue";
export default {
  name: "ExpressTracker",
  components: { MainTab, Timeline },
  data() {
    return {
      TimeLineData: [
        {
          index: 0,
          color: "#EBBD46",
        },
        {
          index: 1,
          color: "#ffff",
          markerComponent: "CostingDetails",
        },
        {
          index: 2,
          color: "#ffff",
          markerComponent: "TripSchedule",
        },
        // {
        //   index: 3,
        //   color: "#ffff",
        // },
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
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
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
      }
      return header;
    },
  },

  mounted() {
    if (localStorage.getItem("quotationID")) {
      this.$store.state.sales.salesQuotationId =
        localStorage.getItem("quotationID");
    }

    if (this.$store.state.sales.salesQuotationId != null) {
      this.$store.dispatch("sales/loadBillPreferences");
      this.$store.dispatch("sales/loadCostCentres");
    }
  },
  created() {
    if (localStorage.getItem("quotationOverViewData")) {
      this.$store.state.sales.expressQuotationOverviewData = JSON.parse(
        localStorage.getItem("quotationOverViewData")
      );
    }
    this.$store.state.sales.expressTimeLineCurrentTab = "Overview";
    this.$store.dispatch("sales/resetExpressTimeLineData", {
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
        {
          index: 2,
          color: "#ffff",
          markerComponent: "TripSchedule",
        },
        {
          index: 3,
          color: "#ffff",
        },
      ],
    });
  },
};
</script>

<style lang="scss">
.paragraph {
  color: #4e5968;
  font-size: 12px;
  font-weight: 600;
}
.seaDiv {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
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
.markers {
  margin-left: 19%;
}
.tagText {
  font-size: 11px;
  color: #7e84a7;
  font-weight: 600;
}
.p-timeline-event-separator {
  margin-left: 2% !important;
}
.p-timeline-event-opposite {
  display: none !important;
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
::v-deep(.p-timeline-event-content) ::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
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
