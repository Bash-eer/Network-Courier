<template>
  <div class="grid ml-1">
    <div class="col wrapper color-fff border-radius-15">
      <div class="flex flex-row justify-content-between align-items-center">
        <!-- <div class="flex">
          <div class="flex flex-row"> -->
        <!--left-->
        <div class="flex flex-row">
          <div class="mr-2">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-1"
            />
          </div>
          <div
            class="flex flex-row justify-content-start"
            v-if="$route.params.type == 'quotation'"
          >
            <div
              class="flex flex-row"
              v-for="data in QuotationRowData"
              :key="data"
            >
              <div class="mx-2">
                <span
                  class="
                    type
                    bold-600
                    font-size-12
                    line-height-15
                    letter-spacing-003
                    color-fff
                  "
                  >{{ data.title }} <br />{{ data.subTitle }}</span
                >
              </div>
              <div class="ml-1"><div class="vertical_line"></div></div>
            </div>
          </div>
          <div class="flex flex-row" v-if="$route.params.type == 'contract'">
            <div
              class="flex flex-row"
              v-for="data in ContractRowData"
              :key="data"
            >
              <div class="mr-2">
                <span
                  class="
                    type
                    bold-600
                    font-size-12
                    line-height-15
                    letter-spacing-003
                    color-fff
                  "
                  >{{ data.title }} <br />{{ data.subTitle }}</span
                >
              </div>
              <div class="ml-1"><div class="vertical_line"></div></div>
            </div>
          </div>
        </div>
        <!-- <div class="mr-4">
          <span class="type commonTextStyle">Service Type <br />Bike</span>
        </div>
        <div class="mr-4"><div class="vertical_line"></div></div> -->
        <!-- <div class="mr-4">
          <span class="type_address commonTextStyle"
            >Address <br />4, 133 Grandee Building, Singapore, 238801</span
          >
        </div> -->
        <!-- <div class="mr-4"><div class="vertical_line"></div></div>

        <div class="mr-4">
          <span class="type_address commonTextStyle">
            Contract Start Date <br />14 Nov 2021</span
          >
        </div> -->
        <!-- <div class="mr-4"><div class="vertical_line"></div></div>

        <div class="mr-4">
          <span class="type_address commonTextStyle">
            Contract End Date <br />14 Nov 2022</span
          >
        </div> -->
        <!-- <div class="mr-4"><div class="vertical_line"></div></div>

        <div class="mr-4">
          <span class="type_address commonTextStyle">
            Contract Period <br />12 Months</span
          > -->
        <!-- </div> -->
        <!-- <div class="mr-4"><div class="vertical_line"></div></div>

        <div class="mr-4">
          <span class="type_address commonTextStyle">
            Credit Terms <br />15 Days</span
          >
          </div>
          </div>
        </div> -->

        <div class="flex">
          <!-- <div class="flex flex-row"> -->
          <!-- <div class="flex mr-4"> -->
          <div class="flex mr-3"><div class="vertical_line"></div></div>
          <div class="flex mx-2 flex-column">
            <div
              class="
                bold-600
                font-size-12
                line-height-15
                letter-spacing-003
                color-fff
              "
            >
              Preview
            </div>
            <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
          </div>
          <div class="flex mr-2"><div class="vertical_line"></div></div>
          <!-- <div class="flex"> -->
          <div class="flex flex-column">
            <div
              class="
                bold-600
                font-size-12
                line-height-15
                letter-spacing-003
                color-fff
              "
            >
              Sent To
            </div>
            <div class="mt-2">
              <div class="flex flex-row">
                <div v-for="contact in IncomingData.contacts" :key="contact">
                  <img
                    :src="contact.profile_url"
                    alt="img"
                    height="32"
                    width="32"
                    class="mx-1"
                    v-tooltip.bottom="
                      contact.contact_name + `<br />` + contact.mobile_no
                    "
                  />
                </div>
              </div>
              <!-- <img
                src="/images/avatar.png"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="`Alice   <br />  9282829182`"
              />
              <img
                src="/images/avatarTwo.png"
                alt="img"
                height="32"
                width="32"
                class="ml-1"
              /> -->
              <!-- <GroupedAvatars
                      :data="
                        $store.state.sales.expressQuotationOverviewData[0][
                          'members'
                        ].length < 3
                          ? $store.state.sales.expressQuotationOverviewData[0][
                              'members'
                            ]
                          : getGroupedAvatarsData(
                              $store.state.sales
                                .expressQuotationOverviewData[0]['members']
                            )
                      "
                      :more="
                        $store.state.sales.expressQuotationOverviewData[0][
                          'members'
                        ].length >= 3
                          ? $store.state.sales.expressQuotationOverviewData[0][
                              'members'
                            ].length - 2
                          : ''
                      "
                    /> -->
            </div>
          </div>
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";

export default {
  name: "ExpressTimeLineHeader",
  props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },

  data() {
    // let serviceType = "";
    let ProcessedAddress =
      this.IncomingData.unit_no +
      ", " +
      this.IncomingData.floor_no +
      ", " +
      this.IncomingData.building_name +
      ", " +
      this.IncomingData.address +
      ", " +
      this.IncomingData.state +
      ", " +
      this.IncomingData.country;
    return {
      QuotationRowData: [
        {
          title: "Service Type",
          // subTitle: serviceType,
          subTitle: "Bike",
        },
        {
          title: "Address",
          subTitle: ProcessedAddress,
        },
      ],
      ContractRowData: [
        {
          title: "Service Type",
          // subTitle: serviceType,
          subTitle: "Bike",
        },
        {
          title: "Address",
          subTitle: ProcessedAddress,
        },
        {
          title: "Contract Start Date",
          subTitle: "14 Nov 2021",
        },
        {
          title: "Contract End Date",
          subTitle: "14 Nov 2022",
        },
        {
          title: "Contract Period",
          subTitle: "12 Months",
        },
        {
          title: "Credit Terms",
          subTitle: "15 Days",
        },
      ],
    };
  },
  methods: {
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
  },
  created() {
    // this.serviceType = this.IncomingData.express_contract[0].service;
    // this.serviceType =
    //   this.$store.state.salesExpressBike.ExpressContractBikeOverviewData.express_contract[0].service;
    // console.log(
    //   this.$store.state.salesExpressBike.ExpressContractBikeOverviewData,
    //   "Hy"
    // );
    // console.log(this.expressContractBikeOverviewData, "mapactions");
    // console.log(this.data, "props");
    // console.log("h", this.IncomingData?.express_contract[0]?.service);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

// .commonTextStyle {
// color: #ffffff;
// font-size: 12px;
// font-weight: 300;
// font-family: $font-family-primary;
// font-style: normal;
// font-weight: 600;
// font-size: 12px;
// line-height: 15px;
/* identical to box height */

// display: flex;
// align-items: center;
// letter-spacing: 0.03em;

// color: #ffffff;
// }
// .type_address {
//   margin-top: 5%;
// }
// .type {
//   margin-top: 19%;
// }
.vertical_line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
  // position: absolute;
}
// .parcel {
//   margin-top: 9%;
// }
.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  // border-radius: 15px;
  // color: #fff !important;
}
// .title {
//   font-family: $font-family-primary;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 15px;
//   letter-spacing: 0em;
//   text-align: left;
// }
// .subtitle {
//   font-family: $font-family-primary;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 15px;
//   letter-spacing: 0em;
//   text-align: left;
// }
// .side-title {
//   font-family: $font-family-primary;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 15px;
//   letter-spacing: 0.03em;
//   text-align: left;
// }
// .heading {
//   font-family: $font-family-primary;
//   font-size: 11px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 13px;
//   letter-spacing: 0.03em;
//   text-align: left;
// }
// .sub-heading {
//   font-family: $font-family-primary;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 15px;
//   letter-spacing: 0em;
//   text-align: left;
// }
</style>
