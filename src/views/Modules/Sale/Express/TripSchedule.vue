<template>
  <div class="flex mb-4">
    <div class="seaDivLarge p-2">
      <div class="flex flex-wrap justify-content-between">
        <div class="flex"><span class="header">Trip Schedule</span></div>
        <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
      </div>
      <hr class="horizontal_line mb-2" />
      <TimeLineTable
        tableClass="p-datatable-sm TimeLineTable mt-2 mb-2"
        :tableData="
          $store.state.sales.expressQuotationOverviewData[0]['trip_schedule']
        "
        :tableColumns="$store.state.masters.expressRegionsTripTableColumnData"
      />
    </div>
  </div>
  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="flex detailsText mb-2">Remarks</div>
    <div class="flex">
      <div class="seaDivRegular p-2">
        <p class="paragraph">
          {{ $store.state.sales.expressQuotationOverviewData[0]["remarks"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripSchedule",
};
</script>

<style scoped>
.seaDivLarge {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 50%;
  width: 100%;
}
.seaDivRegular {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
  /* border: 1.15px solid #dfe4ed; */
}
.header {
  color: #343434;
  font-size: 16px;
  font-weight: 600;
}
</style>
