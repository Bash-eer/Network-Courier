<template>
  <div class="ml-1">
    <div class="col wrapper border-radius-15 color-fff">
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
                  font-size-12
                  bold-600
                  line-height-15
                  color-fff
                  letter-spacing-003
                  flex
                  align-items-start
                  justify-content-start
                "
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
            <!-- <div class="mr-4"><div class="vertical_line"></div></div> -->
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div
              class="
                font-size-12
                bold-600
                line-height-15
                color-fff
                letter-spacing-003
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
          <div class="flex mr-4"><div class="vertical_line"></div></div>

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
                <div v-for="contact in IncomingData.contacts" :key="contact">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";
export default {
  name: "RapidoTimeLineHeader",
  props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      RowData: [
        {
          title: "Address",
          subTitle: null,
        },
      ],
    };
  },
  watch: {
    IncomingData() {
      this.getAddress();
    },
  },
  methods: {
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
    getAddress() {
      let ProcessedAddress =
        this.IncomingData?.unit_no +
        ", " +
        this.IncomingData?.floor_no +
        ", " +
        this.IncomingData?.building_name +
        ", " +
        this.IncomingData?.address +
        ", " +
        this.IncomingData?.state +
        ", " +
        this.IncomingData?.country +
        ", " +
        this.IncomingData?.postal_code;

      this.RowData[0].subTitle = ProcessedAddress;
    },
  },
  created() {
    this.getAddress();
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

.vertical_line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.preview {
  justify-content: space-between !important;
}

.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
</style>
