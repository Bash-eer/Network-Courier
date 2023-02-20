<template>
  <div class="apple">
    <div class="flex justify-content-between">
      <span class="flex express-contract-bike-fsr-costing-details"
        >Costing Details</span
      >

      <i class="pi pi-ellipsis-v mt-2"></i>
    </div>

    <hr class="express-contract-van-fsr-costing-details-horizontal-line" />

    <div class="express-contract-van-fsr-costing-details-bike mt-4">Van</div>

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsData"
        :class="index != CostingDetailsData.length - 1 ? 'flex mr-6' : 'flex'"
        :key="index"
      >
        <div class="flex flex-column">
          <div
            class="
              flex
              express-contract-van-fsr-costing-details-detailsText
              flex-wrap
            "
          >
            {{ getHeader(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap express-contract-van-fsr-costing-details-detailsText express-contract-van-fsr-costing-details-valuestext'
                : 'flex  flex-wrap express-contract-van-fsr-costing-details-detailsText priorityText'
            "
          >
            <span v-if="index == 'job' || index == 'additional_jobs'">
              $ {{ item }}</span
            >
            <span v-else></span>
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-column ml-1 mt-3 mb-4">
      <div>
        <div
          class="
            express-contract-van-fsr-costing-details-grey-wrapper-regular
            p-2
          "
        >
          <p
            class="
              express-contract-van-fsr-costing-details-table-head
              express-international-table
            "
          >
            Effective Start Date (Tentative):
            <span class="express-contract-van-fsr-costing-details-table-value">
              {{ dateFormater(this.date) }}
            </span>
          </p>

          <div class="flex">
            <p
              class="
                express-international-table
                express-contract-van-fsr-costing-details-table-first-month
              "
            >
              First Month
            </p>
            <div
              v-for="(item, index) of CostingDetailsDataTwo"
              :class="index != CostingDetailsDataTwo.length - 1 ? ' mr-6' : ''"
              :key="index"
            >
              <div class="ml-4 flex">
                <div
                  class="express-contract-van-fsr-costing-details-detailsText"
                >
                  {{ getHeaderTwo(index) }}
                </div>
                <div
                  :class="
                    item != 'High'
                      ? '  express-contract-van-fsr-costing-details-detailsText express-contract-van-fsr-costing-details-valuestext'
                      : '   express-contract-van-fsr-costing-details-detailsText priorityText'
                  "
                >
                  <span v-if="index == 'job' || index == 'additional_jobs'">
                    &nbsp;:$ {{ item }}</span
                  >
                  <span v-else>&nbsp;:{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="express-contract-van-fsr-costing-details-bike mt-4">FSR</div>

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsDataOne"
        :class="
          index != CostingDetailsDataOne.length - 1 ? 'flex mr-6' : 'flex'
        "
        :key="index"
      >
        <div class="flex flex-column">
          <div
            class="
              flex
              express-contract-van-fsr-costing-details-detailsText
              flex-wrap
            "
          >
            {{ getHeaderOne(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap express-contract-van-fsr-costing-details-detailsText express-contract-van-fsr-costing-details-valuestext'
                : 'flex  flex-wrap express-contract-van-fsr-costing-details-detailsText priorityText'
            "
          >
            <span v-if="index == 'job' || index == 'additional_jobs'">
              $ {{ item }}</span
            >
            <span v-else></span>
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-column ml-1 mt-3 mb-4">
      <div>
        <div
          class="
            express-contract-van-fsr-costing-details-grey-wrapper-regular
            p-2
          "
        >
          <div class="flex">
            <p
              class="
                express-contract-van-fsr-costing-details-table-head
                express-international-table
              "
            >
              Effective Start Date (Tentative):
              <span
                class="express-contract-van-fsr-costing-details-table-value"
              >
                {{ dateFormater(this.date) }}
              </span>
            </p>
            <p
              class="
                express-contract-van-fsr-costing-details-table-head
                express-international-table
                ml-3
              "
            >
              Effective End Date (Tentative):
              <span
                class="express-contract-van-fsr-costing-details-table-value"
              >
                {{
                  dateFormater(
                    expressContractVanFsrOverviewData.express_contract[0].fsr[0]
                      .settings.estimated_end_date
                  )
                }}
              </span>
            </p>
          </div>

          <div class="flex">
            <p
              class="
                express-international-table
                express-contract-van-fsr-costing-details-table-first-month
              "
            >
              First Month
            </p>
            <div
              v-for="(item, index) of CostingDetailsDataThree"
              :class="
                index != CostingDetailsDataThree.length - 1 ? ' mr-6' : ''
              "
              :key="index"
            >
              <div class="ml-4 flex">
                <div
                  class="express-contract-van-fsr-costing-details-detailsText"
                >
                  {{ getHeaderThree(index) }}
                </div>
                <div
                  :class="
                    item != 'High'
                      ? '  express-contract-van-fsr-costing-details-detailsText express-contract-van-fsr-costing-details-valuestext'
                      : '   express-contract-van-fsr-costing-details-detailsText priorityText'
                  "
                >
                  <span v-if="index == 'job' || index == 'additional_jobs'">
                    &nbsp;:$ {{ item }}</span
                  >
                  <span v-else>&nbsp;:{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="express-contract-van-fsr-costing-details-trip-schedule">
            Trip Schedule
          </div>
        </template>
        <template class="flex">
          <Column field="trip_no" header="Trip Name">
            <template #body="slotProps">
              {{ slotProps.data?.trip_no || "-" }}
            </template>
          </Column>
          <Column field="from_time" header="From">
            <template #body="slotProps">
              {{ dateFormater(slotProps.data.from_time) || "-" }}
            </template></Column
          >
          <Column field="to_time" header="To">
            <template #body="slotProps">
              {{ dateFormater(slotProps.data.to_time) || "-" }}
            </template></Column
          >
          <Column field="trip_days" header="Trip Days">
            <template #body="slotProps">
              {{ slotProps.data?.trip_days || "-" }}
            </template></Column
          >
          <Column field="trip_type" header="Trip Type">
            <template #body="slotProps">
              {{ slotProps.data?.trip_type || "-" }}
            </template></Column
          >
        </template>
      </DataTable>
    </div>

    <div class="flex flex-column ml-1 mt-3 mb-4">
      <div class="flex express-contract-bike-fsr-costing-details- mb-2">
        Remarks
      </div>
      <div class="flex">
        <div
          class="
            express-contract-van-fsr-costing-details-grey-wrapper-regular
            p-2
          "
        >
          <p
            class="
              express-contract-van-fsr-costing-details-remarks-text
              express-international-table
            "
          >
            {{ expressContractVanFsrOverviewData.remarks }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "CostingDetails",
  props: ["IncomingData"],

  components: {
    DataTable,
    Column,
  },
  computed: {
    ...mapGetters({
      expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
    }),
  },

  data() {
    return {
      CostingDetailsData: null,
      CostingDetailsDataOne: null,
      CostingDetailsDataTwo: null,
      CostingDetailsDataThree: null,
      products: null,
      date: null,
      amount: null,
      charge: null,
    };
  },
  watch: {
    "$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData":
      function () {
        let data =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract.map(
            (i) => {
              return i.trips;
            }
          );

        let value = data.reduce((obj, item) =>
          Object.assign(obj, { [item.key]: item.value })
        );
        this.products = value;

        let val =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData?.express_contract.reduce(
            (obj) => Object.assign(obj)
          );

        this.CostingDetailsData = {
          per_job: val.van.per_job,
          additional_job: val.van.additional_job,
          no_of_units: val.van.no_of_units,
          amount: val.van.amount,
        };

        this.CostingDetailsDataOne = {
          detail_type: val.fsr[0].detail_type,
          unit_price: val.fsr[0].unit_price,
          quantity: val.fsr[0].quantity,
          amount: val.fsr[0].amount,
          description: val.fsr[0].description,
        };

        this.CostingDetailsDataTwo = {
          minimum_quantity: val.van.settings.minimum_quantity,
          amount: val.van.settings.amount,
        };
        this.CostingDetailsDataThree = {
          detail_type: val.fsr[0].detail_type,
          unit_price: val.fsr[0].unit_price,
          quantity: val.fsr[0].quantity,
          amount: val.fsr[0].amount,
          description: val.fsr[0].description,
        };

        this.date =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract[0].fsr[0].settings.estimated_start_date;
        this.amount =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.settings.amount;
        this.charge =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.settings.charge_minimum;
      },
  },
  async created() {
    console.log(this.expressContractVanFsrOverviewData, "hrlloo");

    let data =
      await this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract?.map(
        (i) => {
          return i.trips;
        }
      );

    let value = data.reduce((obj, item) =>
      Object.assign(obj, { [item.key]: item.value })
    );
    this.products = value;

    let val =
      this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract.reduce(
        (obj) => Object.assign(obj)
      );
    this.CostingDetailsData = {
      per_job: val.van.per_job,
      additional_job: val.van.additional_job,
      no_of_units: val.van.no_of_units,
      amount: val.van.amount,
    };

    this.CostingDetailsDataOne = {
      detail_type: val.fsr[0].detail_type,
      unit_price: val.fsr[0].unit_price,
      quantity: val.fsr[0].quantity,
      amount: val.fsr[0].amount,
      description: val.fsr[0].description,
    };

    this.CostingDetailsDataTwo = {
      minimum_quantity: val.van.settings.minimum_quantity,
      amount: val.van.settings.amount,
    };
    this.CostingDetailsDataThree = {
      detail_type: val.fsr[0].detail_type,
      unit_price: val.fsr[0].unit_price,
      quantity: val.fsr[0].quantity,
      amount: val.fsr[0].amount,
      description: val.fsr[0].description,
    };

    this.date =
      this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract[0].fsr[0].settings.estimated_start_date;
    this.amount =
      this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.settings.amount;
    this.charge =
      this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.settings.charge_minimum;
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("hh:mm");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },

    getHeader(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job";
          break;
        case "additional_job":
          header = "Additional Job";
          break;
        case "no_of_units":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },
    getHeaderOne(index) {
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
        case "description":
          header = "Description";
          break;
      }
      return header;
    },
    getHeaderTwo(index) {
      let header;
      switch (index) {
        case "minimum_quantity":
          header = "Charge Min( Min Qty): ";
          break;
        case "amount":
          header = "Amount:";
          break;
      }
      return header;
    },
    getHeaderThree(index) {
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
          header = "Amount ";
          break;
        case "description":
          header = "Description";
          break;
      }
      return header;
    },
  },
};
</script>

<style lang="scss" scoped>
.express-contract-van-fsr-costing-details-table-head {
  line-height: 18px;
  color: #4e5968;
}

.express-contract-van-fsr-costing-details-table-value {
  line-height: 18px;
  color: #66c11e;
}

.express-contract-van-fsr-costing-details-table-first-month {
  color: #4e5968;
}

.express-contract-van-fsr-costing-details-remarks-text {
  line-height: 18px;
  color: #4e5968;
}

.express-contract-van-fsr-costing-details-grey-wrapper-regular {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
}
.express-contract-van-fsr-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
  align-items: center;
}
.express-contract-van-fsr-costing-details-valuestext {
  color: #66c11e;
}
.priorityText {
  color: #c11e1e;
}
.header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.express-contract-van-fsr-costing-details-horizontal-line {
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
.express-contract-van-fsr-costing-details-trip-schedule {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #343434;
}

.express-contract-van-fsr-costing-details {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.03em;
  color: #343434;
}

.express-contract-van-fsr-costing-details-bike {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #357dea;
}
</style>
