<template>
  <!--disabled fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Rate Card Name</h5>
      <TextField
        :disabled="true"
        v-model="details.rate_card_name"
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--image-->
  <div class="flex w-100 align-items-center justify-content-center">
    <img src="/images/down-arrow-vector.png" alt="" />
  </div>
  <!--clones fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Rate Card Name</h5>

      <TextField
        :disabled="false"
        v-model="details.cloned_rate_card_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.cloned_rate_card_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--footer-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="expressAdhoc" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    RateDropdownData: [
      { name: "Rate 1", code: "1" },
      { name: "Rate 2", code: "2" },
      { name: "Rate 3", code: "3" },
    ],
    v$: useVuelidate(),
    submitted: false,
    details: {
      rate_card_name: "",

      cloned_rate_card_name: "",
    },
  }),
  validations() {
    return {
      details: {
        cloned_rate_card_name: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path: "/settings/sales/rates/express/adhoc/ratecards/clone",
          method: "POST",

          data: {
            target_rate_card_id:
              this.$store.state.expressAdhoc.adhocTableRowRateCardId,

            rate_card_name: this.details.cloned_rate_card_name,
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The rate card ${this.$store.state.expressAdhoc.adhocTableRowRateCardId} is cloned successfully`,
              toastSeverity: "info",
            },

            toastDuplicateErrorData: {
              toastMsg: `The Rate card  already exist !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in cloning the rate card, try again!",

              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/express/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
        });
      }
    },
  },
  created() {
    this.details.rate_card_name =
      this.$store.state.expressAdhoc.adhocTableRowRateCardName;
  },
};
</script>

<style></style>
