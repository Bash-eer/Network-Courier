<template>
  <div class="ml-1">
    <div class="col international-adhoc-time-line-header-wrapper">
      <div class="flex international-adhoc-time-line-header-preview">
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
                  international-adhoc-time-line-header-commonTextStyleAddress
                "
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
            <div class="flex mr-4">
              <div
                class="international-adhoc-time-line-header-vertical-line"
              ></div>
            </div>
            <!-- <div class="mr-4"><div class="vertical_line"></div></div> -->
          </div>
        </div>

        <div class="flex mr-6">
          <div class="flex mx-4 flex-column">
            <div class="international-adhoc-time-line-header-commonTextStyle">
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
              class="international-adhoc-time-line-header-vertical-line"
            ></div>
          </div>

          <div class="flex flex-column">
            <div class="international-adhoc-time-line-header-commonTextStyle">
              Sent To
            </div>
            <div class="mt-2">
              <img
                :src="
                  this.$store.state.salesInternationalAdhoc
                    .SalesPersonDataTimeLineHeader?.profile_url
                "
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="
                  this.$store.state.salesInternationalAdhoc
                    .SalesPersonDataTimeLineHeader?.profile_name +
                  `<br />` +
                  this.$store.state.salesInternationalAdhoc
                    .SalesPersonDataTimeLineHeader?.contact_no
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
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      address: null,
      priority: null,
      item_type: null,
      RowData: [
        {
          title: "Service Type",
          subTitle: this.item_type,
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
    "$store.state.salesInternationalAdhoc.SalesPersonDataTimeLineHeader":
      function () {
        this.address =
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.unit_no +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.floor_no +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.building_name +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.address +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.state +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.country +
          ", " +
          this.$store.state.salesInternationalAdhoc
            .SalesPersonDataTimeLineHeader.postal_code;
        this.RowData[2].subTitle = this.address;
      },
    "$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData":
      function () {
        this.item_type =
          this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics?.item_type;
        this.address =
          this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData;
        this.priority =
          this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics?.priority;
        this.RowData[1].subTitle = this.priority;
        this.RowData[0].subTitle = this.item_type;
      },
  },
  created() {
    this.item_type =
      this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics?.item_type;
    this.address =
      this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData?.address;
    this.priority =
      this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics?.priority;
    this.RowData[2].subTitle = this.address;
    this.RowData[1].subTitle = this.priority;
    this.RowData[0].subTitle = this.item_type;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.international-adhoc-time-line-header-commonTextStyle {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
}
.international-adhoc-time-line-header-commonTextStyleAddress {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
  align-items: start !important;
  justify-content: start !important;
}

.international-adhoc-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.international-adhoc-time-line-header-preview {
  justify-content: space-between !important;
}

.international-adhoc-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
</style>
