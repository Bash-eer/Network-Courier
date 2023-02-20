<template>
  <div class="ml-1">
    <div
      class="
        col
        rapido-adhoc-time-line-header-wrapper
        border-radius-15
        color-fff
      "
    >
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
            <div class="mr-5 padding-left-13">
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
            <div
              class="international-adhoc-time-line-header-vertical-line"
            ></div>
          </div>
        </div>

        <div class="flex ml-2">
          <div class="flex mx-4 flex-column">
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
          <div class="flex mr-4">
            <div class="rapido-adhoc-time-line-header-vertical-line"></div>
          </div>

          <div class="flex flex-column mr-3">
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
              <img
                :src="
                  this.$store.state.salesRapidoAdhoc
                    .SalesPersonDataTimeLineHeader?.profile_url
                "
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="
                  this.$store.state.salesRapidoAdhoc
                    .SalesPersonDataTimeLineHeader?.profile_name +
                  `<br />` +
                  this.$store.state.salesRapidoAdhoc
                    .SalesPersonDataTimeLineHeader?.mobile_no
                "
              />
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
  // props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      address: null,
      priority: null,
      RowData: [
        {
          title: "Service Type",
          subTitle: "E-commerce",
        },
        {
          title: "Priority",
          subTitle: this.priority,
        },
        {
          title: "Address",
          subTitle: this.address,
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
    "$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader": function () {
      this.address =
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
          .unit_no +
        ", " +
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
          .floor_no +
        ", " +
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
          .building_name +
        ", " +
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader.state +
        ", " +
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
          .country +
        ", " +
        this.$store.state.salesRapidoAdhoc.SalesPersonDataTimeLineHeader
          .postal_code;
      this.RowData[2].subTitle = this.address;
    },
    "$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData": function () {
      this.priority =
        this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData?.rapido_adhoc_specifics?.priority;
      this.RowData[1].subTitle = this.priority;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.rapido-adhoc-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.rapido-adhoc-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
.international-adhoc-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
</style>
