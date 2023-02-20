<template>
  <div class="grid ml-1">
    <div
      class="
        col
        inter-company-time-line-header-wrapper
        border-radius-15
        color-fff
      "
    >
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="mr-1">
          <img
            :src="'/images/' + 'parcel' + '.png'"
            alt=""
            class="parcel ml-2"
          />
        </div>
        <div class="flex flex-row" v-for="data in RowData" :key="data">
          <div class="mr-1">
            <span
              class="
                type
                letter-spacing-003
                line-height-15
                font-size-12
                color-fff
                express-international-font
              "
              >{{ data.title }} <br />{{ data.subTitle }}</span
            >
          </div>
          <div class="mr-1">
            <div class="inter-company-time-line-header-vertical-line"></div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-1 flex-column">
            <div
              class="
                letter-spacing-003
                line-height-15
                font-size-12
                color-fff
                express-international-font
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
          <div class="flex mr-2">
            <div class="inter-company-time-line-header-vertical-line"></div>
          </div>
          <div class="flex flex-column">
            <div
              class="
                letter-spacing-003
                line-height-15
                font-size-12
                color-fff
                express-international-font
              "
            >
              Sent To
            </div>

            <div class="mt-2">
              <img
                :src="
                  this.$store.state.salesExpressContractInterCompany
                    .SalesPersonDataTimeLineHeader?.profile_url
                "
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="
                  this.$store.state.salesExpressContractInterCompany
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
  props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      RowData: null,
    };
  },

  async created() {
    this.RowData = [
      {
        title: "Service Type",
        subTitle: await this.$store.state.salesExpressContractInterCompany
          .ExpressInterCompanyOverviewData?.business_type,
      },
      {
        title: "Address",
        subTitle: await this.$store.state.salesExpressContractInterCompany
          .ExpressInterCompanyOverviewData?.address,
      },
      {
        title: "Contract Start Date",
        subTitle: "-",
      },
      {
        title: "Contract End Date",
        subTitle: "-",
      },
      {
        title: "Contract Period",
        subTitle: "-",
      },
      {
        title: "Credit Terms",
        subTitle: "-",
      },
    ];
  },

  watch: {
    "$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData":
      function () {
        this.RowData = [
          {
            title: "Service Type",
            subTitle:
              this.$store.state.salesExpressContractInterCompany
                .ExpressInterCompanyOverviewData?.business_type,
          },
          {
            title: "Address",
            subTitle:
              this.$store.state.salesExpressContractInterCompany
                .ExpressInterCompanyOverviewData?.address,
          },
          {
            title: "Contract Start Date",
            subTitle: "-",
          },
          {
            title: "Contract End Date",
            subTitle: "-",
          },
          {
            title: "Contract Period",
            subTitle: "-",
          },
          {
            title: "Credit Terms",
            subTitle: "-",
          },
        ];
      },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.inter-company-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
}
.inter-company-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
</style>
