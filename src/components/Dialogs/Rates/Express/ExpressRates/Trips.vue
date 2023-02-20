<template>
  <p class="txt ml-3 mt-2 add_trips">Select Trips</p>

  <FormTable
    v-if="$store.state.masters.expressRegionsTripTableData != null"
    dataKey="trip_no"
    :tableData="$store.state.masters.expressRegionsTripTableData"
    :tableColumns="$store.state.masters.expressRegionsTripTableColumnData"
  />

  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      mt-3
      flex-wrap
    "
  >
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />

      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Trips",
  data: () => ({
    tripDaysDropDownData: [
      { name: "Weekdays", code: "WD" },
      { name: "Weekends", code: "WE" },
    ],
    tripTypeDropDownData: [
      { name: "Open", code: "OP" },
      { name: "Closed", code: "CL" },
    ],
  }),
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "Rates";
    },
    submitData() {
      for (let rc in this.$store.state.masters.expressRateCardDetails) {
        if (rc == "region_id") {
          for (let rd in this.$store.state.masters.expressRegionsDropDown) {
            if (
              this.$store.state.masters.expressRegionsDropDown[rd]["code"] ==
              this.$store.state.masters.expressRateCardDetails[rc]
            ) {
              this.$store.state.masters.expressExpressRatesFormData[rc] =
                this.$store.state.masters.expressRegionsDropDown[rd]["code"];
            }
          }
        } else {
          this.$store.state.masters.expressExpressRatesFormData[rc] =
            this.$store.state.masters.expressRateCardDetails[rc];
        }
      }
      this.$store.state.masters.expressExpressRatesFormData["status"] =
        "Active";

      if (this.$store.state.masters.expressRatesSubmittedValidation.$invalid) {
        this.$store.state.masters.expressRatesSubmitted = true;
      }
      if (!this.$store.state.masters.expressRatesSubmittedValidation.$invalid) {
        this.$store.state.sales.stepperNavigation = "Rates";
      }
    },
  },
};
</script>

<style scoped>
.add_trips {
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.trips_dropdown {
  height: 46% !important;
}
.add_trip {
  margin-left: 2%;
}
</style>
