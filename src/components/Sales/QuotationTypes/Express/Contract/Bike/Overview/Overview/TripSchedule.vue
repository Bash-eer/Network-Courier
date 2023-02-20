<template>
  <div class="flex mb-4">
    <div class="grey-wrapper-large border-radius-8 p-2">
      <div class="flex flex-wrap justify-content-between">
        <div class="flex">
          <span
            class="
              line-height-20
              letter-spacing-003
              font-size-16
              bold-600
              color-343434
            "
            >Trip Schedule</span
          >
        </div>
        <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
      </div>
      <hr class="horizontal_line mb-2" />
      <TimeLineTable
        tableClass="p-datatable-sm TimeLineTable mt-2 mb-2 text-sm text-color-secondary "
        :tableData="TableData"
        :tableColumns="TableColumnData"
      />
    </div>
  </div>
  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="detailsText mb-2">Remarks</div>

    <div
      class="
        grey-wrapper-regular
        border-radius-8
        p-2
        line-height-18
        font-size-12
        bold-600
        color-4e5968
      "
    >
      {{
        $store.state.salesExpressBike.ExpressContractBikeOverviewData.remarks
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TripSchedule",
  data() {
    return {
      TableData: [],
      // [
      //   {
      //     id: "1",
      //     trip_no: "1st",
      //     from: "1970-01-01T14:46:00.000Z",
      //     to: "1970-01-01T15:46:00.000Z",
      //     day: "Weekdays",
      //     type: "Open",
      //     // fromraw_time: "1970-01-01T14:46:00.000Z",
      //     // toraw_time: "1970-01-01T15:46:00.000Z",
      //   },
      //   {
      //     id: "2",
      //     trip_no: "2nd",
      //     from: "1970-01-01T14:46:00.000Z",
      //     to: "1970-01-01T15:46:00.000Z",
      //     day: "Weekdays",
      //     type: "Open",
      //     // fromraw_time: "1970-01-01T14:46:00.000Z",
      //     // toraw_time: "1970-01-01T15:46:00.000Z",
      //   },
      // ],
      TableColumnData: [
        { field: "trip_name", header: "Trip Name" },
        { field: "from", header: "From" },
        { field: "to", header: "To" },
        { field: "trip_days", header: "Trip Days" },
        { field: "trip_type", header: "Trip Type" },
      ],
    };
  },
  methods: {
    async fetchFunction() {
      console.log(
        this.$store.state.salesExpressBike.ExpressContractBikeOverviewData,
        "ts"
      );
      if (this.$store.state.salesExpressBike.ExpressContractBikeOverviewData) {
        if (
          this.$store.state.salesExpressBike.ExpressContractBikeOverviewData
            .express_contract
        ) {
          if (
            this.$store.state.salesExpressBike.ExpressContractBikeOverviewData
              .express_contract[0]
          ) {
            this.TableData =
              this.$store.state.salesExpressBike.ExpressContractBikeOverviewData.express_contract[0].trips;
            console.log(
              this.$store.state.salesExpressBike.ExpressContractBikeOverviewData
                .express_contract[0].trips,
              "trips"
            );
          }
        }
      }
    },
  },
  async created() {
    // setTimeout(() => {
    await this.fetchFunction();
    // }, 10);
  },
};
</script>

<style scoped>
.grey-wrapper-large {
  /* background: #f3f7ff; */
  border: 1px solid rgba(126, 132, 167, 0.3);
  /* border-radius: 8px; */
  height: 50%;
  width: 100%;
  background: #edf1f7;
}
.grey-wrapper-regular {
  /* background: #f3f7ff; */
  border: 1px solid rgba(126, 132, 167, 0.3);
  /* border-radius: 8px; */
  height: 25%;
  width: 100%;
  background: #edf1f7;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
  /* border: 1.15px solid #dfe4ed; */
}

/* .header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
} */
/* .remarks-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #4e5968;
} */
</style>
