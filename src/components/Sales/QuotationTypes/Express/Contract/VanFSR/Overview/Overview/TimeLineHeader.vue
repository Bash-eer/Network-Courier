<template>
  <div class="grid ml-1">
    <div class="col express-contract-bike-fsr-time-line-wrapper">
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="mr-4 flex">
          <div class="mr-3">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div class="flex flex-row" v-for="data in RowData" :key="data">
            <div class="mr-4">
              <span
                class="type express-contract-bike-fsr-time-line-commonTextStyle"
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
            <div v-if="RowData.length > RowData.length + 1" class="mr-4">
              <div
                class="express-contract-bike-fsr-time-line-vertical-line"
              ></div>
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div class="express-contract-bike-fsr-time-line-commonTextStyle">
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
              class="express-contract-bike-fsr-time-line-vertical-line"
            ></div>
          </div>

          <div class="flex flex-column">
            <div class="express-contract-bike-fsr-time-line-commonTextStyle">
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
                src="/images/avatarTwo.png"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
              /> -->
            </div>
          </div>
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
    let ProcessedAddress =
      this.IncomingData?.unit_no +
      ", " +
      this.IncomingData?.floor_no +
      ", " +
      this.IncomingData?.building_name +
      ", " +
      // this.IncomingData?.address +
      // ", " +
      this.IncomingData?.state +
      ", " +
      this.IncomingData?.country +
      ", " +
      this.IncomingData?.postal_code;

    return {
      RowData: null,
    };
  },
  async created() {
    this.RowData = [
      {
        title: "Service Type",
        subTitle: "Van + FSR",
      },
      {
        title: "Address",
        subTitle: await this.$store.state.salesExpressContractVanFSR
          .expressContractVanFsrOverviewData?.address,
      },
    ];
  },
  watch: {
    "$store.state.salesExpressContractVanFSR.salesExpressContractVanFSRexpressContractVanFsrOverviewData":
      function () {
        this.RowData = [
          {
            title: "Service Type",
            subTitle: "Van + FSR",
          },
          {
            title: "Address",
            subTitle:
              this.$store.state.salesExpressContractVanFSR
                ?.expressContractVanFsrOverviewData?.address,
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
            subTitle: "15days",
          },
        ];
      },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-contract-bike-fsr-time-line-commonTextStyle {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
}

.express-contract-bike-fsr-time-line-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}

.express-contract-bike-fsr-time-line-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
</style>
