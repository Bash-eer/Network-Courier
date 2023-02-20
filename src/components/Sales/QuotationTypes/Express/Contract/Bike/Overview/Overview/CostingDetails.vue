<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex"><span class="header">Costing Details</span></div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="horizontal_line" />
  <div class="flex flex-row flex-wrap justify-content-between ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of CostingDetailsData"
      :class="index != CostingDetailsData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText text-color-secondary flex-wrap">
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap detailsText valuesText'
              : 'flex  flex-wrap detailsText priorityText'
          "
        >
          <span
            v-if="
              index == 'job' ||
              index == 'additional_jobs' ||
              index == 'amountTwo'
            "
          >
            {{ item }} $
          </span>

          <span v-else>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of CostingDetailsDataOne"
      :class="index != CostingDetailsDataOne.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ getHeaderOne(index) }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap detailsText valuesText'
              : 'flex  flex-wrap detailsText priorityText'
          "
        >
          <span v-if="index == 'job' || index == 'additional_jobs'">
            ${{ item }}
          </span>

          <span v-else>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostingDetails",
  data() {
    return {
      CostingDetailsData: {
        job: 10.0,
        additional_jobs: 20.0,
        no_of_units: 15,
        amount: 80,
        effective_start_date: "21 July 2022",
        charge_min: 8,
        amountTwo: 80,
      },
      CostingDetailsDataOne: {
        time_slot_delivery_charge: 5,
        standard_liability: 100,
      },
    };
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
        case "effective_start_date":
          header = "Effective Start Date (Tentative)";
          break;
        case "charge_min":
          header = "Charge Min( Min Qty)";
          break;
        case "time_slot_delivery_charge":
          header = "Time Slot Delivery Charge  (+$)";
          break;
        case "standard_liability":
          header = "Standard Liability  ($)";
          break;
        case "amountTwo":
          header = "Amount";
          break;
      }
      return header;
    },

    getHeaderOne(index) {
      let header;
      switch (index) {
        case "time_slot_delivery_charge":
          header = "Time Slot Delivery Charge  (+$)";
          break;
        case "standard_liability":
          header = "Standard Liability  ($)";
          break;
      }
      return header;
    },
  },
};
</script>

<style lang="scss" scoped>
.detailsText {
  font-size: 12px;
  color: #818181;
  font-weight: 600;
}
.valuesText {
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
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
  // border: 1.15px solid #dfe4ed;
}
</style>
