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

    <hr class="express-project-jobs-costing-details-horizontal-line" />

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4 justify-content-between">
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
              font-size-12
              color-7e84a7
              flex-wrap
              express-international-font
            "
          >
            {{ getHeaderOne(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap font-size-12  express-international-font color-66c11e'
                : 'flex  flex-wrap font-size-12  express-international-font color-c11e1e'
            "
          >
            <span
              v-if="
                index == 'job' ||
                index == 'additional_jobs' ||
                index == 'amounttwo'
              "
            >
              {{ item }} $</span
            >
            <span v-else>{{ item }}</span>
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
          <div class="flex justify-content-between">
            <span
              class="
                font-size-16
                line-height-20
                color-343434
                express-international-font
              "
            >
              Trip Schedule
            </span>

            <i class="pi pi-ellipsis-v mt-2"></i>
          </div>
        </template>
        <template #empty><div class="">No data found.</div></template>
        <template class="flex">
          <Column field="trip_no" header="Trip Name">
            <template #body="slotProps">
              {{ slotProps.data?.trip_no || "-" }}
            </template>
          </Column>
          <Column field="from_time" header="From">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data?.from_time) || "-" }}
            </template></Column
          >
          <Column field="to_time" header="To">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data?.to_time) || "-" }}
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
      <div
        class="flex font-size-12 color-7e84a7 express-international-font mb-2"
      >
        Remarks
      </div>
      <div class="flex">
        <div
          class="
            express-project-jobs-costing-details-grey-wrapper-regular
            bg-f3f7ff
            border-radius-8
            p-2
          "
        >
          <p class="line-height-18 color-4e5968 express-international-table">
            {{ this.quotationData?.remarks }}
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
import { mapGetters } from "vuex";

export default {
  name: "CostingDetails",

  components: {
    DataTable,
    Column,
  },

  data() {
    return {
      CostingDetailsDataOne: {
        job: 10,
        additional_jobs: 20,
        no_of_units: 15,
        amountone: 80,
        start_date: "21 July 2022",
        charge_min: "800.00",
        amounttwo: 70,
      },

      products: [
        {
          service_provider: "1st",
          Transit_Days: "Before",
          Delivery_Charges: "11:00 AM",
          Fuel_Charges: "Weekdays",
          Over_weight_Charges: "Open",
        },
        {
          service_provider: "2st",
          Transit_Days: "Before",
          Delivery_Charges: "11:00 AM",
          Fuel_Charges: "Weekdays",
          Over_weight_Charges: "Open",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractProjectJobs/quotationDataOverview",
    }),
  },
  methods: {
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
        case "amountone":
          header = "Amount";
          break;
        case "start_date":
          header = "Effective Start Date (Tentative)";
          break;
        case "charge_min":
          header = "Charge Min( Min Qty)";
          break;
        case "amounttwo":
          header = "Amount";
          break;
      }
      return header;
    },
    dateFormater(data) {
      let formattedDate = moment(data).format("DD MMM YYYY");

      if (formattedDate == "Invalid date") {
        return "-";
      } else {
        return formattedDate;
      }
    },
    timeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment.utc(data).format("hh:mm");
        return formattedDate;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-project-jobs-costing-details-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
}
.express-project-jobs-costing-details-horizontal-line {
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
