<template>
  <div class="ml-1">
    <div class="col wrapper">
      <div class="flex preview">
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
              <span class="type commonTextStyleAddress"
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div class="commonTextStyle">Preview</div>
            <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
          </div>

          <div class="flex flex-column">
            <div class="commonTextStyle">Sent To</div>
            <!-- {{this.$store.state.salesExpressAdhoc.SalesPersonDataPatch}} -->
            <!-- :src= this.$store.state.salesInternationalAdhoc.SalesPersonDataTimeLineHeader.profile_url -->
            <!-- src="/images/avatar.png" -->
            <div class="mt-2">
              <img
                :src="
                  this.$store.state.salesExpressAdhoc.SalesPersonDataPatch
                    .profile_url
                "
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="
                  this.$store.state.salesExpressAdhoc.SalesPersonDataPatch
                    .profile_name +
                  `<br />` +
                  this.$store.state.salesExpressAdhoc.SalesPersonDataPatch
                    .mobile_no
                "
              />
              <!-- v-tooltip.bottom="
                      this.$store.state.salesExpressAdhoc.SalesPersonDataPatch.company_contacts + `<br />` + this.$store.state.salesExpressAdhoc.SalesPersonDataPatch.company_contacts
                    " -->
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
    let address =
      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.address;
    let priority =
      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
        ?.express_adhoc_specifics?.priority;

    let service =
      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
        ?.express_adhoc_specifics?.bike == true
        ? "Bike"
        : "Van";

    return {
      RowData: [
        {
          title: "Service Type",
          subTitle: service,
        },
        {
          title: "Priority",
          subTitle: priority,
        },
        {
          title: "Address",
          subTitle: address,
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
    "$store.state.salesExpressAdhoc.ExpressAdhocOverviewData": function () {
      this.RowData = [
        {
          title: "Service Type",
          subTitle:
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.express_adhoc_specifics?.bike == true
              ? "Bike"
              : "Van",
        },
        {
          title: "Priority",
          subTitle:
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.express_adhoc_specifics?.priority,
        },
        {
          title: "Address",
          subTitle:  this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.unit_no + ", " +
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.floor_no + ", " +
               this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.building_name + ", " + 
              this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.address + ", " +
               this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.state + ", " + 
               this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.country + ", " + 
               this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
              ?.postal_code + "." 
              ,
        }, 
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.commonTextStyle {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
}
.commonTextStyleAddress {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
  display: flex;
  align-items: start !important;
  justify-content: start !important;
}

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
  border-radius: 15px;
  color: #fff !important;
}
</style>
