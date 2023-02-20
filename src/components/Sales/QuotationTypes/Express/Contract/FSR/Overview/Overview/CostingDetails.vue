<template>
  <div class="apple">
    <div class="flex justify-content-between">
      <span
        class="
          flex
          align-items-center
          font-size-16
          line-height-20
          letter-spacing-003
          color-343434
          express-international-font
        "
        >Costing Details</span
      >

      <i class="pi pi-ellipsis-v mt-2"></i>
    </div>

    <hr class="express-fsr-costing-details-horizontal-line" />

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsData"
        class="flex mr-6"
        :key="index"
      >
        <div class="flex flex-column">
          <div class="flex color-7e84a7 font-size-12 bold-600 flex-wrap">
            {{ getHeader(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap   font-size-12 express-international-font color-66c11e'
                : 'flex  flex-wrap   font-size-12 express-international-font color-c11e1e'
            "
          >
            <!-- || 'updatedAt' -->
            <span v-if="index == 'createdAt'">
              {{ timeFormater(item) }}
            </span>
            <span v-else-if="index == 'updatedAt'">
              {{ timeFormater(item) }}
            </span>

            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-column ml-1 mt-3 mb-4">
      <div
        class="flex color-7e84a7 font-size-12 express-international-font mb-2"
      >
        Remarks
      </div>
      <div class="flex">
        <div
          class="express-fsr-costing-details-grey-wrapper-regular bg-f3f7ff p-2"
        >
          <p class="color-4e5968 line-height-18 express-international-table">
            {{ this.CostingDetails.remarks }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
const _ = require("lodash");
export default {
  name: "CostingDetails",

  components: {},

  watch: {
    "$store.state.salesExpressContractFSR.ExpressAdhocSalesPersonData":
      function () {
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData.express_contract[0].fsr.map(
          (i) => {
            return (this.CostingDetailsData = _.omit(
              i,
              "id",
              "description",
              "contract_qotation_id"
            ));
          }
        );
      },
  },

  computed: {
    ...mapGetters({
      CostingDetails: "salesExpressContractFSR/ExpressContractFsrOverviewData",
    }),
  },

  data() {
    return {
      CostingDetailsData: null,
    };
  },
  created() {
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData.express_contract[0].fsr.map(
      (i) => {
        return (this.CostingDetailsData = _.omit(
          i,
          "id",
          "description",
          "contract_qotation_id"
        ));
      }
    );
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "detail_type":
          header = "Detail Type";
          break;
        case "unit_price":
          header = "Unit Price";
          break;
        case "quantity":
          header = "Quantity";
          break;
        case "amount":
          header = "Amount";
          break;
        case "createdAt":
          header = "Effective Start Date (Tentative)";
          break;
        case "updatedAt":
          header = "Effective End Date (Tentative)";
          break;
        case "charge_min":
          header = "Charge Min( Min Qty)";
          break;
      }
      return header;
    },

    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMMM YYYY ");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.express-fsr-costing-details-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
}

.express-fsr-costing-details-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}
</style>
