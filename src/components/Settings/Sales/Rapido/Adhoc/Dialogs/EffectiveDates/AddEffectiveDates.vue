<template>
  <div class="my-5 ml-0 pl-0">
    <span class="color-4e5968 font-size-14 bold-600 ml-0 pl-0"
      >Effective Date</span
    >
  </div>
  <!--fields row one-->
  <div class="formgrid grid ml-0 pl-0">
    <div class="field col-12 md:col-6 ml-0 pl-0">
      <div clas="flex ml-0 pl-0">
        <div class="whiteDiv calendarDiv ml-0 pl-0">
          <span class="color-343434 font-size-12 bold-700 ml-0 pl-0"
            >Effective Start Date</span
          >
          <Calendar
            dateFormat="d MM yy"
            class="ratesCalendar"
            v-model="details.effective_start_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'inputfield w-full dialog-dropdown-text ml-0 mt-2': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <div
      class="flex justify-content-between w-full align-content-start flex-wrap"
    >
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="rapidoAdhoc" />
        <Buttons
          label="Submit"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    details: {
      effective_start_date: "",
    },
  }),
  methods: {
    goBackHandler() {
      this.$store.dispatch("rapidoAdhoc/navigateStepper", {
        step: "AddZonalRates",
      });
    },
    submitData() {
      let rateCardName =
        this.$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName;
      if (rateCardName == null || rateCardName == "") {
        this.$store.dispatch("rapidoAdhoc/setRateCardNameError", {
          error: "Enter Rate Card Name",
        });
      } else if (rateCardName != null && rateCardName != "") {
        this.$store.dispatch("rapidoAdhoc/setRateCardNameError", {
          error: null,
        });
        this.$store.state.rapidoAdhoc.rapidoAdhocAddNewData["rate_card_name"] =
          this.$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName;
        this.$store.state.rapidoAdhoc.rapidoAdhocAddNewData["default"] =
          this.$store.state.rapidoAdhoc.rapidoAdhocAddNewIsDefault;

        this.apiCallHandler();
      }
    },
    apiCallHandler() {
      this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
        path: "settings/sales/rates/rapido/adhoc/ratecard",
        data: this.$store.state.rapidoAdhoc.rapidoAdhocAddNewData,
        method: "POST",
        loadData: {
          loadApi: "loadAdhocTableData",
          loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
          loadMutation: "fetchAdhocTableData",
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The rate card is added successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `The rate card already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the rate card, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
</style>
