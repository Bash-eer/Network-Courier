<template>
  <div class="grid ml-1">
    <div
      class="
        col
        express-project-jobs-time-line-header-wrapper
        color-fff
        border-radius-15
      "
    >
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="mr-2">
          <img
            :src="'/images/' + 'parcel' + '.png'"
            alt=""
            class="parcel ml-2"
          />
        </div>
        <div class="flex flex-row" v-for="data in RowData" :key="data">
          <div class="mr-2">
            <span
              class="
                type
                font-size-12
                line-height-15
                color-fff
                letter-spacing-003
                express-international-font
              "
              >{{ data.title }} <br />{{ data.subTitle }}</span
            >
          </div>
          <div class="mr-2">
            <div
              class="express-project-jobs-time-line-header-vertical-line"
            ></div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-2 flex-column">
            <div
              class="
                font-size-12
                line-height-15
                color-fff
                letter-spacing-003
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
          <div class="flex mr-4">
            <div
              class="express-project-jobs-time-line-header-vertical-line"
            ></div>
          </div>

          <div class="flex flex-column">
            <div
              class="
                font-size-12
                line-height-15
                color-fff
                letter-spacing-003
                express-international-font
              "
            >
              Sent To
            </div>
            <div class="flex">
              <div
                v-for="data of quotationData?.contacts"
                :key="data.id"
                class="mt-2"
              >
                <img
                  :src="data.profile_url"
                  alt="img"
                  height="32"
                  width="32"
                  class="mx-1"
                  v-tooltip.bottom="
                    data.contact_name + `<br />` + data.mobile_no
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Tooltip from "primevue/tooltip";

export default {
  name: "ExpressTimeLineHeader",
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      RowData: [
        {
          title: "Service Type",
          subTitle: "Bike",
        },
        {
          title: "Address",
          subTitle: "4, 133 Grandee Building, Singapore, 23801",
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
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractProjectJobs/quotationDataOverview",
    }),
  },
  watch: {
    quotationData() {
      this.getValue();
    },
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },

    getValue() {
      if (this.quotationData) {
        this.RowData[1] = {
          title: "Address",
          subTitle:
            this.quotationData?.unit_no +
            "," +
            this.quotationData?.floor_no +
            "," +
            this.quotationData?.address +
            ", " +
            this.quotationData?.country +
            ", " +
            this.quotationData?.postal_code,
        };

        this.RowData[2] = {
          title: "Contract Start Date",
          subTitle: this.dateFormater(
            this.quotationData?.settings?.contract_start_date
          ),
        };

        this.RowData[3] = {
          title: "Contract End Date",
          subTitle: this.dateFormater(
            this.quotationData?.settings?.contract_end_date
          ),
        };

        this.RowData[4] = {
          title: "Contract Period",
          subTitle: this.quotationData?.settings?.contract_period || "-",
        };

        this.RowData[5] = {
          title: "Credit Terms",
          subTitle:
            this.quotationData?.express_contract[0]?.bill_settings[0]
              ?.credit_term_days || "-",
        };
      }
    },
  },
  created() {
    this.getValue();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.express-project-jobs-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}

.express-project-jobs-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
</style>
