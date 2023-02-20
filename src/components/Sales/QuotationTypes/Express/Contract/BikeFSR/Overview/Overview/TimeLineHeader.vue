<template>
  <div class="grid ml-1">
    <div class="col bike-fsr-time-line-header-wrapper border-radius-15 color-fff">
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="flex">
          <div class="mr-4">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div
            class="flex flex-row justify-content-start"
            v-if="$route.params.type == 'quotation'"
          >
            <div class="flex flex-row" v-for="data in QuotationRowData" :key="data">
              <div class="mx-2">
                <span
                  class="
                    type
                    letter-spacing-003
                    line-height-15
                    font-size-12
                    color-fff
                    bold-600
                  "
                  >{{ data.title }} <br />{{ data.subTitle }}</span
                >
              </div>
              <div class="ml-1"><div class="vertical_line"></div></div>
            </div>
          </div>
          <div class="flex flex-row" v-if="$route.params.type == 'contract'">
            <div class="flex flex-row" v-for="data in ContractRowData" :key="data">
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
        </div>

        <div class="flex">
          <div class="flex mr-3"><div class="vertical_line"></div></div>
          <div class="flex mx-4 flex-column">
            <div
              class="
                letter-spacing-003
                line-height-15
                font-size-12
                color-fff
                bold-600
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
          <div class="flex flex-column">
            <div
              class="
                letter-spacing-003
                line-height-15
                font-size-12
                color-fff
                bold-600
              "
            >
              Send To
            </div>
            <div class="mt-2">
              <div class="flex flex-row">
                <div v-for="contact in quotationData.contacts" :key="contact">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "ExpressTimeLineHeader",
  // props: ["quotationData"],

  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      QuotationRowData: [
        {
          title: "Service Type",
          // subTitle: serviceType,
          subTitle: "Bike + FSR",
        },
        {
          title: "Address",
          subTitle: "4, 133 Grandee Building, Singapore, 238801",
        },
      ],
      ContractRowData: [
        {
          title: "Service Type",
          // subTitle: serviceType,
          subTitle: "Bike + FSR",
        },
        {
          title: "Address",
          subTitle: "4, 133 Grandee Building, Singapore, 238801",
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
      quotationData:
        "salesExpressContractBikeFSR/quotationData",
    }),
  },
  watch: {
    quotationData() {
      this.getValue();
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
     dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    getValue() {
      if (this.quotationData) {
        this.QuotationRowData[1] = {
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
        this.ContractRowData[1] = {
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
        this.ContractRowData[2] = {
          title: "Contract Start Date",
          subTitle: this.dateFormater(
            this.quotationData?.settings?.contract_start_date
          ),
        };

        this.ContractRowData[3] = {
          title: "Contract End Date",
          subTitle: this.dateFormater(
            this.quotationData?.settings?.contract_end_date
          ),
        };

        this.ContractRowData[4] = {
          title: "Contract Period",
          subTitle: this.quotationData?.settings?.contract_period || "-",
        };

        this.ContractRowData[5] = {
          title: "Credit Terms",
          subTitle:
            this.quotationData?.express_contract[0]?.bill_settings[0]
              ?.credit_term_days || "-",
        };
      }
    },
  },
  async created() { 
    this.getValue();
  },
  
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.bike-fsr-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
}
.bike-fsr-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
.vertical_line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
  // position: absolute;
}
</style>
