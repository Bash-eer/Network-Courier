<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Rate per (Kg)</h5>
      <TextField
        v-model="details.rate_per_kg"
        :classes="{
          'p-invalid': v$.details.rate_per_kg.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Minimum Charges(s$)</h5>
      <TextField
        v-model="details.minimum_rate"
        :classes="{
          'p-invalid': v$.details.minimum_rate.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="internationalInbound" />
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
  name: "ClearanceEdit",
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      details: {
        rate_per_kg: "",
        minimum_rate: "",
      },
    };
  },
  validations() {
    return {
      details: {
        rate_per_kg: { required },
        minimum_rate: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log("hiii");
        let clearanceEdit = {};
        for (let d in this.details) {
          clearanceEdit[d] = this.details[d];
        }
        let StateData = this.$store.state.internationalInbound.clearanceEdit;
        console.log("StateData =", StateData.id);
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/clearance/" +
              StateData.id,
            data: clearanceEdit,
            method: "PATCH",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/clearance/",
              loadMutation: "fetchClearanceModeData",
              type: "addClearanceModeData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The clearance detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Other charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
              type: "addClearanceModeData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Clearance detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Other charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      if (Object.keys(this.$store.state.internationalInbound.clearanceEdit)) {
        this.details = [];
        this.details.push({
          rate_per_kg: "",
          minimum_rate: "",
        });
        this.details.push({
          rate_per_kg: { required },
          minimum_rate: { required },
        });
        for (let d in this.details) {
          this.details[d] =
            this.$store.state.internationalInbound.clearanceEdit[d];
        }
      }
    },
  },
  created() {
    this.loadState();
    console.log(
      this.$store.state.internationalInbound.clearanceEdit,
      "Created Console"
    );
    this.details.rate_per_kg =
      this.$store.state.internationalInbound.clearanceEdit.rate_per_kg;
    this.details.minimum_rate =
      this.$store.state.internationalInbound.clearanceEdit.minimum_rate;
  },
  unmounted() {
    this.$store.state.internationalInbound.clearanceEdit = {};
  },
};
</script>

<style></style>
