<template>
  <div class="ml-1">
    <div class="col international-contract-timelineheader-wrapper">
      <div class="flex justify-content-between">
        <div class="flex align-items-center">
          <div class="mr-4">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div class="flex flex-row" v-for="data in RowData" :key="data">
            <div class="mr-4">
              <span
                class="
                  type
                  bold-600
                  font-size-12
                  line-height-15
                  letter-spacing-003
                  color-fff
                "
                >{{ data.title }} <br />{{
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.unit_no +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.floor_no +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.building_name +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.address +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.state +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.country +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.postal_code
                }}</span
              >
            </div>
            <!-- <div class="mr-4"><div class="vertical_line"></div></div> -->
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div
              class="
                international-contract-timelineheader-commonTextStyle
                express-international-table
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
          <div class="flex mr-4">
            <div
              class="international-contract-timelineheader-vertical-line"
            ></div>
          </div>
          <div class="flex flex-column">
            <div
              class="
                font-size-12
                bold-600
                line-height-15
                color-fff
                letter-spacing-003
              "
            >
              Sent To
            </div>
            <!-- <div class="mt-2">
              <img
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
                class="mx-1"
                v-tooltip.bottom="`Alice   <br />  9282829182`"
              />
            </div> -->
            <div class="mt-2">
              <div class="flex flex-row">
                <div
                  v-for="contact in this.$store.state.salesInternationalContract
                    .internationalContractOverviewData?.contacts"
                  :key="contact"
                >
                  <img
                    v-if="contact.selected && contact.profile_url"
                    :src="contact.profile_url"
                    alt="img"
                    height="32"
                    width="32"
                    class="mx-1"
                    v-tooltip.bottom="
                      contact.contact_name + `<br />` + contact.mobile_no
                    "
                  />
                  <img
                    v-else-if="contact.selected && !contact.profile_url"
                    src="https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png"
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
            </div>
          </div>
          <!-- <div class="flex flex-column">
            <div
              class="
                international-contract-timelineheader-commonTextStyle
                express-international-table
              "
            >
              Sent To
            </div>

            <div
              v-for="contact in this.$store.state.salesInternationalContract
                .internationalContractOverviewData?.contacts"
              :key="contact"
            >
              <img
                v-if="contact.selected && contact.profile_url"
                :src="contact.profile_url"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="
                  contact.contact_name + `<br />` + contact.mobile_no
                "
              />
              <img
                v-else-if="contact.selected && !contact.profile_url"
                src="https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png"
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
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";
export default {
  name: "InternationalTimeLineHeader",
  // props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },

  data() {
    return {
      address: null,
      RowData: [
        {
          title: "Address",
          subTitle: null,
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
  watch: {
    "$store.state.salesInternationalContract.internationalContractOverviewData":
      function () {
        this.address =
          this.$store.state.salesInternationalContract.internationalContractOverviewData.address;
      },
    // "$store.state.salesInternationalContract.internationalContractOverviewData":
    //   function () {
    //     this.$store.dispatch(
    //       "salesInternationalContract/loadSalesPersonDataTimeLineHeader",
    //       {
    //         path: "/sales/profiles/",
    //         id: this.$store.state.salesInternationalContract
    //           .internationalContractOverviewData.profile_id,
    //       }
    //     );
    //   },
    // "$store.state.salesInternationalContract.SalesPersonDataTimeLineHeader":
    //   function () {
    //     this.$store.dispatch(
    //       "salesInternationalContract/loadSalesPersonDataTimeLineHeader",
    //       {
    //         path: "/sales/profiles/",
    //         id: this.$store.state.salesInternationalContract
    //           .internationalContractOverviewData.profile_id,
    //       }
    //     );
    //   },
  },
  created() {
    this.address =
      this.$store.state.salesInternationalContract.internationalContractOverviewData?.address;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.international-contract-timelineheader-commonTextStyle {
  line-height: 15px;
  color: #ffffff;
}
.international-contract-timelineheader-commonTextStyleAddress {
  line-height: 15px;
  color: #ffffff;
}

.international-contract-timelineheader-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.international-contract-timelineheader-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
</style>
