<template>
  <div class="card p-3">
    <div class="flex customized-timeline">
      <div @click="$router.go(-1)">
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="$store.state.salesInternationalAgent.InternationalAgentTimeLine"
        align="left"
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
                    <span class="international-agent-heading"
                      >International: Agent <br />
                      <span class="tagText">{{
                        this.$store.state.salesInternationalAgent
                          .InternationalAgentOverviewData.quotation_id
                      }}</span>
                    </span>
                  </div>
                  <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-row">
                  <div
                    v-if="$route.params.type == 'contract'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Contract <br />Status:</span
                    >
                    <StatusTags
                      :type="overView.status"
                      :label="overView.status"
                      usage="timeline"
                    />
                  </div>
                  <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>
                    <StatusTag
                      :label="
                        this.$store.state.salesInternationalAgent
                          .InternationalAgentOverviewData.status
                      "
                      color="#32DD4D"
                      bgColor="#CFFFEB"
                      borderRadius="7px"
                    />
                  </div>

                  <div class="flex">
                    <span class="tagText"
                      >Modified On <br /><b class="international-agent-date">
                        21st july 2021
                      </b></span
                    >
                  </div>
                  <!-- <div class="flex flex-row mx-3">
                    <img
                      :key="renderKey"
                      :src="salesPersonUrl"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <div :key="renderKey" class="flex flex-column mx-2">
                      <Dropdown
                        :key="renderKey"
                        :options="cities"
                        @change="selectPerson($event)"
                        optionLabel="name"
                        placeholder="Sales Person"
                      />
                      <span class="international-agent-date">{{
                        salesPersonName
                      }}</span>
                    </div>
                  </div> -->
                  <SalesPerson
                    :key="renderKey"
                    :details="
                      $store.state.salesInternationalAgent
                        .InternationalAgentOverviewData.sales_person
                    "
                  />
                </div>
              </div>
            </div>
            <div class="my-3">
              <Notification
                v-if="
                  $store.state.salesInternationalAgent
                    .InternationalAgentOverviewData.status == 'Approved' ||
                  $store.state.salesInternationalAgent
                    .InternationalAgentOverviewData.status == 'Accepted'
                "
                :status="
                  $store.state.salesInternationalAgent
                    .InternationalAgentOverviewData.status
                "
                :check="true"
                @Promote="promote"
              />
            </div>
            <div
              class="
                flex
                international-agent-send-quotation
                align-items-center
                justify-content-center
              "
            >
              <Tab :tabMenuData="TimeLineTabMenuData" type="salesTimeLine" />
              <Button
                v-if="
                  $route.params.type == 'quotation' &&
                  ($store.state.salesInternationalAgent
                    .InternationalAgentOverviewData.status == 'New' ||
                    $store.state.salesInternationalAgent
                      .InternationalAgentOverviewData.status == 'Quote')
                "
                label="Send Quotation"
                class="international-agent-button"
                @click="sendQuotation"
              />
            </div>

            <div
              v-if="
                $store.state.salesInternationalAgent
                  .InternationalAgentTimeLineCurrentTab == 'Overview'
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
                        international-agent-detailsText
                        express-international-table
                      "
                    >
                      {{ getHeader(index) }}
                    </div>
                    <div
                      :class="
                        item != 'High'
                          ? 'flex international-agent-detailsText express-international-table international-agent-valuesText'
                          : 'flex international-agent-detailsText express-international-table international-agent-priorityText'
                      "
                    >
                      {{ item }}
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
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "./Tab.vue";
import Button from "primevue/button";
import TimeLineHeader from "./OverView/TimeLineHeader.vue";
import CostingDetails from "./OverView/CostingDetails.vue";
import FollowUp from "../../../Common/FollowUp.vue";
import SalesPerson from "../../../Common/SalesPerson.vue";
import BillPreferences from "../../../Common/BillPreferences.vue";
import Attachments from "../../../Common/Attachments.vue";
import Notification from "../../../Common/Notification.vue";
import Dropdown from "primevue/dropdown";
import { errhandler } from "@/services/httpClient";
import { mapActions } from "vuex";
export default {
  components: {
    Timeline,
    Tab,
    Button,
    TimeLineHeader,
    CostingDetails,
    FollowUp,
    BillPreferences,
    Attachments,
    Dropdown,
    Notification,
    SalesPerson,
  },
  data() {
    return {
      renderKey: 1,
      overView:
        this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData,
      cities: [],
      salesPersonName: "",
      salesPersonUrl: "/images/avatar.png",

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
      secondRowData: {
        priority: "",
        previously_served_by: "",
        referred_by: "",
        referral_person_name: "",
        festival_name: "",
        sales_comission: "",
      },
    };
  },

  methods: {
    ...mapActions({
      getSalesPerson: "salesInternationalAgent/getSalesPerson",
      updateSalesPerson: "salesInternationalAgent/updateSalesPerson",
      sendQuotationData: "salesRapidoContract/Contract/sendQuotation",
    }),
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
    async sendQuotation() {
      let ids = [];
      this.$store.state.salesInternationalAgent.InternationalAgentOverviewData.contacts.map(
        (i) => {
          if (i?.selected) {
            ids.push(i.id);
          }
        }
      );
      if (ids.length != 0) {
        try {
          await this.sendQuotationData({
            id: this.$store.state.salesInternationalAgent
              .InternationalAgentOverviewData?.id,
            payload: {
              send_to: ids,
            },
          });
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Quotation send successfully",
            life: 3000,
          });
        } catch (err) {
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
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
    async selectPerson(e) {
      let data = e.value;
      (this.salesPersonName = data.name), (this.salesPersonUrl = data.url);
      let payload = {
        sales_person_id: data.id,
      };
      await this.updateSalesPerson({
        id: this.$route.params.id,
        payload: payload,
      });
    },
    async getSalesName() {
      this.cities = [];

      let res = await this.getSalesPerson();

      res.data.results.map((list) => {
        this.cities.push({
          name: list.name,
          url: list.image_url,
          id: list.id,
        });
      });
    },
    async getOverData() {
      await this.$store.dispatch(
        "salesInternationalAgent/loadInternationalAgentOverviewData",
        {
          id: this.$route.params.id,
          type: this.$route.params.type,
        }
      );
      this.overView =
        this.$store.state.salesInternationalAgent.InternationalAgentOverviewData;
      let overViewData =
        this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData;
      (this.salesPersonName = overViewData?.sales_person?.display_name ?? ""),
        (this.salesPersonUrl = overViewData?.sales_person?.profile_url ?? ""),
        (this.secondRowData.priority =
          overViewData.international_agent_specifics.priority);
      this.secondRowData.previously_served_by =
        overViewData.international_agent_specifics.previously_served_by;
      this.secondRowData.referred_by =
        overViewData.international_agent_specifics.referred_by;
      this.secondRowData.referral_person_name =
        overViewData.international_agent_specifics.referral_name;
      this.secondRowData.festival_name =
        overViewData.international_agent_specifics.festival_name;
      this.secondRowData.sales_comission =
        overViewData.international_agent_specifics.sales_commission;
      this.renderKey++;
    },
  },

  updated() {
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalAgent.InternationalAgentOverviewData?.profile_name} > Quotation > International Agent > ${this.$store.state.salesInternationalAgent.InternationalAgentTimeLineCurrentTab}`;
  },

  async created() {
    this.$store.state.salesInternationalAgent
      .InternationalAgentTimeLineCurrentTab == "Overview";
    this.$store.dispatch(
      "salesInternationalAgent/resetInternationalAgentTimeLineData",
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

          {
            index: 2,
            color: "#ffff",
          },
        ],
      }
    );
    await this.getOverData();
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > ${this.$store.state.salesInternationalAgent.InternationalAgentOverviewData?.profile_name} > Quotation > International Agent > ${this.$store.state.salesInternationalAgent.InternationalAgentTimeLineCurrentTab}`;
  },
  mounted() {
    this.getSalesName();
  },
};
</script>

<style scoped>
.international-agent-heading {
  color: #4e5968 !important;
  font-size: 11px;
  font-weight: 600;
}
.international-agent-date {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4e5968;
}

.international-agent-not-signed {
  color: #8f46eb;
  background-color: #f4ecff;
  border-radius: 7px;
  padding: 5px 12px;
  line-height: 20px;
}
.international-agent-send-quotation {
  white-space: nowrap;
  margin-left: -10px;
  padding: 10px;
}
.international-agent-button {
  font-size: 14px !important;
}

.p-button {
  overflow: unset !important;
}
.international-agent-detailsText {
  color: #7e84a7;
}
.international-agent-valuesText {
  color: #66c11e;
}
.international-agent-priorityText {
  color: #c11e1e;
}
::v-deep .customized-timeline {
  overflow: auto !important;
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