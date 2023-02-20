<template>
  <div class="apple">
    <div class="flex justify-content-between">
      <span
        class="
          flex
          express-inter-company-costing-details-costing-details
          express-international-font
        "
        >Costing Details</span
      >

      <div class="flex express-inter-company-costing-details-change-min_main">
        <p
          class="
            flex
            express-inter-company-costing-details-change-min
            express-international-font
            mr-4
          "
        >
          Effective Start Date (Tentative):

          <span
            class="
              express-inter-company-costing-details-date
              express-international-font
            "
            >{{ dateFormater(this.date) }}
          </span>
        </p>
        <p
          class="
            flex
            express-inter-company-costing-details-change-min
            express-international-font
            mr-4
          "
        >
          Charge Min( Min Qty):
          <span
            class="
              express-inter-company-costing-details-date
              express-international-font
            "
          >
            {{ this.charge }}</span
          >
        </p>
        <p
          class="
            flex
            express-inter-company-costing-details-change-min
            express-international-font
            mr-4
          "
        >
          Amount:
          <span
            class="
              express-inter-company-costing-details-date
              express-international-font
            "
          >
            {{ this.amount }}</span
          >
        </p>
        <i class="pi pi-ellipsis-v mt-2"></i>
      </div>
    </div>

    <hr class="express-inter-company-costing-details-horizontal-line" />

    <div
      class="
        express-inter-company-costing-details-bike express-international-font
        mt-4
      "
    >
      Bike
    </div>

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
              express-inter-company-costing-details-details-text
              flex-wrap
            "
          >
            {{ getHeader(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap express-inter-company-costing-details-details-text express-international-font express-inter-company-costing-details-values-text'
                : 'flex  flex-wrap express-inter-company-costing-details-details-text express-international-font express-inter-company-costing-details-priority-text'
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

    <div
      class="
        express-inter-company-costing-details-bike express-international-font
        mt-4
      "
    >
      Van
    </div>

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
              express-inter-company-costing-details-details-text
              flex-wrap
            "
          >
            {{ getHeaderOne(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap express-inter-company-costing-details-details-text express-international-font express-inter-company-costing-details-values-text'
                : 'flex  flex-wrap express-inter-company-costing-details-details-text express-international-font express-inter-company-costing-details-priority-text'
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

    <div class="card">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="
              express-inter-company-costing-details-trip-schedule
              express-international-font
            "
          >
            Trip Schedule
          </div>
        </template>

        <template class="flex">
          <Column
            class="chargable-weight"
            field="trip_name"
            header="Trip Name"
          ></Column>
          <Column field="from" header="From">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data.from) }}
            </template>
          </Column>
          <Column field="to" header="To">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data.to) }}
            </template>
          </Column>
          <Column field="trip_days" header="Trip Days"> </Column>

          <Column field="trip_type" header="Trip Type"></Column>
        </template>
      </DataTable>
    </div>

    <!--PACKAGE DETAILS-->
    <div class="flex flex-column ml-1 mt-3 mb-4">
      <div
        class="
          flex
          express-inter-company-costing-details-details-text
          express-international-font
          mb-2
        "
      >
        Remarks
      </div>
      <div class="flex">
        <div
          class="express-inter-company-costing-details-grey-wrapper-regular p-2"
        >
          <p
            class="
              express-inter-company-costing-details-remarks-text
              express-international-table
            "
          >
            {{
              this.$store.state.salesExpressContractInterCompany
                .ExpressInterCompanyOverviewData?.remarks || "-"
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
export default {
  name: "CostingDetails",

  components: {
    DataTable,
    Column,
  },

  data() {
    return {
      CostingDetailsData: null,
      CostingDetailsDataOne: null,
      products: null,
      date: null,
      amount: null,
      charge: null,
    };
  },

  watch: {
    "$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData":
      function () {
        let data =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.express_contract.map(
            (i) => {
              return i.trips;
            }
          );

        let value = data.reduce((obj, item) =>
          Object.assign(obj, { [item.key]: item.value })
        );
        this.products = value;

        let val =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData?.express_contract.reduce(
            (obj) => Object.assign(obj)
          );

        this.CostingDetailsData = {
          job: val.bike.per_job,
          no_of_units: val.bike.no_of_units,
          additional_jobs: val.bike.additional_job,
          amount: val.bike.amount,
        };

        this.CostingDetailsDataOne = {
          job: val.van.per_job,
          no_of_units: val.van.no_of_units,
          additional_jobs: val.van.additional_job,
          amount: val.van.amount,
          effective_start_date: val.van.createdAt,
          charge_min: val.van.amount,
        };

        this.date =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.estimated_start_date;
        this.amount =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.amount;
        this.charge =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.charge_minimum;
      },
  },

  async created() {
    let data =
      await this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.express_contract.map(
        (i) => {
          return i.trips;
        }
      );

    let value = data.reduce((obj, item) =>
      Object.assign(obj, { [item.key]: item.value })
    );
    this.products = value;

    let val =
      this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData?.express_contract.reduce(
        (obj) => Object.assign(obj)
      );

    this.CostingDetailsData = {
      job: val.bike.per_job,
      no_of_units: val.bike.no_of_units,
      additional_jobs: val.bike.additional_job,
      amount: val.bike.amount,
    };

    this.CostingDetailsDataOne = {
      job: val.van.per_job,
      no_of_units: val.van.no_of_units,
      additional_jobs: val.van.additional_job,
      amount: val.van.amount,
      effective_start_date: val.van.createdAt,
      charge_min: val.van.amount,
    };

    this.date =
      this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.estimated_start_date;
    this.amount =
      this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.amount;
    this.charge =
      this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.settings.charge_minimum;
  },

  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "job":
          header = "Per Job";
          break;
        case "additional_jobs":
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

    

    getHeaderOne(index) {
      let header;
      switch (index) {
        case "job":
          header = "Per Job";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_units":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "effective_start_date":
          header = "Van Job Weight";
          break;
        case "charge_min":
          header = "Van Job Cost $";
          break;
      }
      return header;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-inter-company-costing-details-remarks-text {
  line-height: 18px;
  color: #4e5968;
}

.express-inter-company-costing-details-grey-wrapper-regular {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
}
.express-inter-company-costing-details-details-text {
  font-size: 12px;
  color: #7e84a7;
}
.express-inter-company-costing-details-values-text {
  color: #66c11e;
}
.express-inter-company-costing-details-priority-text {
  color: #c11e1e;
}
.header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.express-inter-company-costing-details-horizontal-line {
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
.express-inter-company-costing-details-trip-schedule {
  font-size: 16px;
  line-height: 20px;
  color: #343434;
}

.express-inter-company-costing-details-costing-details {
  font-family: "Montserrat";
  font-style: normal;

  font-size: 16px;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.03em;
  color: #343434;
}
.express-inter-company-costing-details-change-min {
  font-size: 12px;
  line-height: 15px;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
}
.express-inter-company-costing-details-date {
  font-size: 12px;
  line-height: 15px;
  color: #66c11e;
}

.express-inter-company-costing-details-bike {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #357dea;
}
</style>
