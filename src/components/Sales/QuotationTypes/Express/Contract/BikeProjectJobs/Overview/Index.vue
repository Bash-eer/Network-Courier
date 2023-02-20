<template>
  <div :key="renderKey" class="card p-3">
    <div class="flex">
      <div
        @click="
          $router.push({
            name: 'QuotationContract',
            params: {
              id: this.$route.params.p_id,
            },
          })
        "
      >
        <img :src="'/images/backArrow.png'" alt="" class="mt-3 pointer" />
      </div>
      <Timeline
        :value="
          $store.state.salesExpressContractBikeProjectJobs
            .expressContractBikeProjectJobsTimeLine
        "
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
                  <!-- <div class="flex mr-5">
                    <span class="tagText">Contract <br />Status:</span>

                    <StatusTag
                      label="Contract Signed"
                      color="#E1AC22"
                      bgColor="#FFF3EC"
                      borderRadius="7px"
                    />
                  </div> -->

                  <!-- <div class="flex mr-5">
                    <span class="tagText">Quotation <br />Status:</span>

                    <StatusTag
                      label="Approved"
                      color="#32DD4D"
                      bgColor="#CFFFEB"
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
                      :type="quotationData?.status"
                      :label="quotationData?.status"
                      usage="timeline"
                    />
                  </div>
                  <div
                    v-if="$route.params.type == 'quotation'"
                    class="flex mr-5"
                  >
                    <span class="font-size-11 bold-600 text-color-secondary"
                      >Quotation <br />Status:</span
                    >

                    <StatusTags
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
                          font-size-12
                          line-height-15
                          color-4e5968
                          express-international-font
                        "
                      >
                        {{ dateFormater(quotationData?.createdAt) }}
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
                          this.$store.state.salesExpressContractBikeProjectJobs
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
                                this.$store.state.salesExpressContractBikeProjectJobs.SalesPersonData?.map(
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
                  <div class="flex flex-row mx-3">
                    <img :src="salesPersonSrc" alt="" width="32" height="32" />
                    <div class="flex flex-column mx-2">
                      <!-- 
                        src="/images/avatar.png"
                        <Dropdown
                        v-model="selectedCity1"
                        :options="cities"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Sales Person"
                      /> 
                      :classes="{
                          'inputfield w-full dialog-dropdown-text ': true,
                        }
                        
                      -->
                      <span
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-3">
              <Notification
                v-if="quotationData?.status == 'Approved'"
                :status="quotationData?.status"
              />
            </div>
            <div
              class="
                flex
                international-contract-send-quotation
                text-nowrap
                align-items-center
                justify-content-center
              "
            >
              <Tab
                v-bind:tabMenuData="TimeLineTabMenuData"
                type="salesTimeLine"
              />
              <div class="flex experess-contract">
                <Buttons
                  v-if="
                    $route.params.type == 'quotation' &&
                    (quotationData?.status == 'New' ||
                      quotationData?.status == 'Quote')
                  "
                  label="Send Quotation"
                  button_class="dialog-button-text experess-contract m-3"
                  v-on:childToParent="sendQuotationhandler"
                />
              </div>
            </div>

            <div
              v-if="
                $store.state.salesExpressContractBikeProjectJobs
                  .expressContractBikeProjectJobsTimeLineCurrentTab ==
                'Overview'
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
                    <div class="flex font-size-12 color-7e84a7">
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
  <!--toast-->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
  <SalesDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import Timeline from "primevue/timeline";
import Tab from "../Overview/Tab.vue";
import TimeLineHeader from "../Overview/Overview/TimeLineHeader.vue";
import CostingDetail from "../Overview/Overview/CostingDetails.vue";
import BillSettings from "../Overview/Overview/BillSettings.vue";
import CostCenter from "../../../../Common/CostCenter/Express.vue";
import BillPreferences from "../../../../Common/BillPreferences.vue";
import FollowUp from "../../../../Common/FollowUp.vue";
import Attachments from "../../../../Common/Attachments.vue";
import Dropdown from "primevue/dropdown";
import Notification from "../../../../Common/Notification.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import Toasts from "../../../../Common/Toast.vue";
import SalesDialog from "../../../../../Sales/Dialog.vue";
import axios from "axios";

export default {
  components: {
    SalesDialog,
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
    Notification,
    Toasts,
  },
  data() {
    return {
      cities:
        this.$store.state.salesExpressContractBikeProjectJobs.SalesPersonData,
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
      quotationData:
        "salesExpressContractBikeProjectJobs/quotationDataOverview",
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

    "$store.state.salesExpressContractBikeProjectJobs.quotationDataOverview":
      function () {
        this.$store.dispatch(
          "salesExpressContractBikeProjectJobs/loadSalesPersonDataTimeLineHeader",
          {
            path: "/sales/profiles/",
            id: this.$store.state.salesExpressContractBikeProjectJobs
              .quotationDataOverview.profile_id,
          }
        );
      },

    "selectedCity.name": function () {
      this.$store.dispatch(
        "salesExpressContractBikeProjectJobs/loadSalesPersonDataDropdown",
        {
          path: "/sales/quotations/sales-person/",
          id: this.$store.state.salesExpressContractBikeProjectJobs
            .quotationDataOverview.profile_id,
          payload: {
            sales_person_id: this.selectedCity,
          },
        }
      );
    },

    "$store.state.salesExpressContractBikeProjectJobs.SalesPersonData":
      function () {
        console.log(
          this.$store.state.salesExpressContractBikeProjectJobs.SalesPersonData
        );
        this.object =
          this.$store.state.salesExpressContractBikeProjectJobs.SalesPersonData.reduce(
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

    this.$store.state.salesExpressContractBikeProjectJobs
      .expressContractBikeProjectJobsTimeLineCurrentTab == "Overview";
    await this.$store.dispatch(
      "salesExpressContractBikeProjectJobs/loadSalesPersonData",
      {
        path: "/settings/user/dropdown?role=Sales Person",
      }
    );
    this.$store.dispatch(
      "salesExpressContractBikeProjectJobs/resetExpressBikeProjectJobsTimeLineData",
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
    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsTimeLineCurrentTab}`;
  },

  updated() {
    this.getSalesPersonDropdownData();
    if (this.salesPersonData.length > 0) {
      this.salesPerson = this.salesPersonData[0].name;
      this.salesPersonSrc = this.salesPersonData[0].image_url;
    }

    this.$store.state.users.breadcrumbPath = `Sales > 2000 Recruitment Pte Ltd > Contract > Express Contract > ${this.$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsTimeLineCurrentTab}`;
  },
  // watch: {
  //   "$store.state.salesExpressContractBikeProjectJobs.quotationDataOverview":
  //     function () {
  //       this.$store.dispatch(
  //         "salesExpressContractBikeProjectJobs/loadSalesPersonDataTimeLineHeader",
  //         {
  //           path: "/sales/profiles/",
  //           id: this.$store.state.salesExpressContractBikeProjectJobs
  //             .quotationDataOverview.profile_id,
  //         }
  //       );
  //     },

  //   "selectedCity.name": function () {
  //     this.$store.dispatch(
  //       "salesExpressContractBikeProjectJobs/loadSalesPersonDataDropdown",
  //       {
  //         path: "/sales/quotations/sales-person/",
  //         id: this.$store.state.salesExpressContractBikeProjectJobs
  //           .quotationDataOverview.profile_id,
  //         payload: {
  //           sales_person_id: this.selectedCity,
  //         },
  //       }
  //     );
  //   },

  //   "$store.state.salesExpressContractBikeProjectJobs.SalesPersonData":
  //     function () {
  //       this.object =
  //         this.$store.state.salesExpressContractBikeProjectJobs.SalesPersonData.reduce(
  //           (obj, item) => Object.assign(obj, { [item.key]: item.value })
  //         );
  //     },
  // },

  methods: {
    async getSalesPersonDropdownData() {
      this.salesPersonData = [];
      await axios
        .get("/settings/user/dropdown?role=Sales Person")
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "regions");
            for (let c in res.data.results) {
              // res.data.results[c]["name"] = res.data.results[c]["region"];
              this.salesPersonData = [];
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    sendQuotationhandler() {
      let arr = [];

      this.quotationData.contacts.map((list) => {
        if (list.selected) {
          arr.push(list.id);
        }
      });
      // if (this.quotationData.contacts) {
      //   console.log("yes");
      //   if (this.quotationData.contacts.length > 0) {
      //     console.log("yes1");
      //     if (this.quotationData.contacts[0].email) {
      //       console.log("yes2");
      //       processedMail = this.quotationData.contacts[0].email;
      //     } else {
      //       processedMail = "";
      //     }
      //   }
      //   console.log(processedMail, "processedMail");
      // }
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        type: this.$route.params.type,
        loadDiffStore: true,
        loadData: "salesRapidoContract/loadRapidoContractOverviewData",
        // salesExpressContractBikeProjectJobs/
        data: {
          send_to: arr,
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
    ...mapActions({
      setQuotationData:
        "salesExpressContractBikeProjectJobs/setQuotationOverviewData",
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
