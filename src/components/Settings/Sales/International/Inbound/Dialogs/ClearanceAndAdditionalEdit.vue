<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Min-weight</h5>
      <NumberField
        :maxFractionDigits="2"
        :showButtons="true"
        v-model="details.min_weight"
        :classes="{
          'p-invalid': v$.details.min_weight.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Max-weight</h5>
      <NumberField
        :maxFractionDigits="2"
        :showButtons="true"
        v-model="details.max_weight"
        :classes="{
          'p-invalid': v$.details.max_weight.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Rate (s$)</h5>
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
  name: "ClearanceAndAdditionalEdit",
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      details: {
        min_weight: "",
        max_weight: "",
        rate: "",
      },
    };
  },
  validations() {
    return {
      details: {
        min_weight: { required },
        max_weight: { required },
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
        let clearanceAndAdditionalEdit = {};
        for (let d in this.details) {
          clearanceAndAdditionalEdit[d] = this.details[d];
        }
        let StateData =
          this.$store.state.internationalInbound.clearanceAndAdditional;
        console.log("StateData =", StateData.id);
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/rates/" +
              StateData.id,
            data: {
              ...clearanceAndAdditionalEdit,
              clearance_mode_id:
                this.$store.state.internationalInbound.clearanceAndAdditional
                  .clearance_mode_id,
            },
            method: "PATCH",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
              loadMutation: "fetchClearanceModeData",
              type: "addClearanceModeData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The clearance and additional detail is updated!`,
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
        //  else {
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
        Object.keys(
          this.$store.state.internationalInbound.clearanceAndAdditional
        )
      ) {
        this.details = [];
        this.details.push({
          min_weight: "",
          max_weight: "",
          rate: "",
        });
        this.details.push({
          min_weight: { required },
          max_weight: { required },
          rate: { required },
        });
        for (let d in this.details) {
          this.details[d] =
            this.$store.state.internationalInbound.clearanceAndAdditional[d];
        }
      }
    },
  },
  created() {
    this.loadState();
    this.details.min_weight =
      this.$store.state.internationalInbound.clearanceAndAdditional.min_weight;
    this.details.max_weight =
      this.$store.state.internationalInbound.clearanceAndAdditional.max_weight;
    this.details.rate =
      this.$store.state.internationalInbound.clearanceAndAdditional.rate;
    console.log(
      this.$store.state.internationalInbound.clearanceAndAdditional,
      "result"
    );
  },
  unmounted() {
    this.$store.state.internationalInbound.clearanceAndAdditional = {};
  },
  //   watch: {
  //     "$store.state.internationalInbound.clearanceAndAdditional":
  //       function () {
  //         console.log("API HITTED");
  //         this.$store.dispatch(
  //           "internationalInbound/clearanceAndAdditional",
  //           {
  //             path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
  //             method: "GET"
  //           }
  //         );

  //       },
  // }
};
</script>

<style></style>
