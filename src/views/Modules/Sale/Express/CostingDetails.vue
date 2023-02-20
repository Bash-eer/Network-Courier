<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex"><span class="header">Costing Details</span></div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="horizontal_line" />
  <div class="flex flex-row ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of $store.state.sales
        .expressQuotationOverviewData[0]['costingDetails']"
      :class="
        index !=
        $store.state.sales.expressQuotationOverviewData[0]['costingDetails']
          .length -
          1
          ? 'flex mr-6'
          : 'flex'
      "
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ getHeader(index) }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap detailsText valuesText'
              : 'flex  flex-wrap detailsText priorityText'
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
</template>

<script>
export default {
  name: "CostingDetails",
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
          header = "No of  Jobs";
          break;
        case "amount":
          header = "Amount";
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
  color: #7e84a7;
  font-weight: 600;
}
.valuesText {
  color: #66c11e;
}
.priorityText {
  color: #c11e1e;
}
.header {
  color: #343434;
  font-size: 16px;
  font-weight: 600;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
  // border: 1.15px solid #dfe4ed;
}
</style>
