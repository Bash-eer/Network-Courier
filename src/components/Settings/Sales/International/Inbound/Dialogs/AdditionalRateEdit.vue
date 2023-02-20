<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Weight</h5>
      <TextField
        v-model="details.weight"
        :classes="{
          'p-invalid': v$.details.weight.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Rate (kg)</h5>
      <TextField
        v-model="details.rate"
        :classes="{
          'p-invalid': v$.details.rate.$invalid && submitted,
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
  name: "AdditionalRateEdit",
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      details: {
        weight: "",
        rate: "",
      },
    };
  },
  validations() {
    return {
      details: {
        weight: { required },
        rate: { required },
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
        let AdditionalRateEdits = {};
        for (let d in this.details) {
          AdditionalRateEdits[d] = this.details[d];
        }
        let StateData =
          this.$store.state.internationalInbound.AdditionalRateEdit;
        console.log("StateData =", StateData.id);
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/additionalClearance/" +
              StateData.id,
            data: AdditionalRateEdits,
            method: "PATCH",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/additionalClearance/",
              loadMutation: "fetchClearanceModeData",
              type: "fetchClearanceModeData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The AdditionalRate detail is added!`,
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
        
        // else {
        //   this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
        //     path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
        //     data: this.details,
        //     method: "POST",
        //     loadData: {
        //       loadApi: "loadClearanceModeTabs",
        //       loadPath:
        //         "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
        //       type: "addClearanceModeData",
        //     },

        //     toastData: {
        //       toastSuccessData: {
        //         toastMsg: `The Other charges detail is added!`,
        //         toastSeverity: "success",
        //       },
        //       toastDuplicateErrorData: {
        //         toastMsg: `The data is already exists !`,
        //         toastSeverity: "error",
        //       },
        //       toastCommonErrorData: {
        //         toastMsg:
        //           "There was an error in adding the Other charges, try again!",
        //         toastSeverity: "error",
        //       },
        //     },
        //   });
        // }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.internationalInbound.AdditionalRateEdit)
      ) {
        this.details = [];
        this.details.push({
          weight: "",
          rate: "",
        });
        this.details.push({
          weight: { required },
          rate: { required },
        });
        for (let d in this.details) {
          this.details[d] =
            this.$store.state.internationalInbound.AdditionalRateEdit[d];
        }
      }
    },
  },
  created() {
    this.loadState();
    this.details.weight =
      this.$store.state.internationalInbound.AdditionalRateEdit.weight;
    this.details.rate =
      this.$store.state.internationalInbound.AdditionalRateEdit.rate;
  },
  unmounted() {
    this.$store.state.internationalInbound.AdditionalRateEdit = {};
  },
  
};
</script>

<style></style>
