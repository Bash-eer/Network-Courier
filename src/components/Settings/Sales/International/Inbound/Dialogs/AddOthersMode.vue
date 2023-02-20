<template>
  <div class="formgrid grid mt-2">
    <div class="field col-12 md:col-6">
      <span class="step-text">Add Rates</span>
    </div>
  </div>
  <div v-for="(rate, index) of addRates" :key="index">
    <div class="formgrid grid">
      <div class="field col-12 md:col-5">
        <h5 class="dialog-label-text required">Rate Name</h5>
        <TextField
          type="text"
          v-model="details['other_rates'][index].rate_name"
          :classes="{
            'p-invalid':
              v$.details['other_rates'][index].rate_name.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="dialog-label-text required">Per Kg Rate (S$)</h5>
        <TextField
          type="number"
          v-model="details['other_rates'][index].per_kg_rate"
          :classes="{
            'p-invalid':
              v$.details['other_rates'][index].per_kg_rate.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="dialog-label-text required">Min. Charge (S$)</h5>
        <TextField
          type="number"
          v-model="details['other_rates'][index].min_charge"
          :classes="{
            'p-invalid':
              v$.details['other_rates'][index].min_charge.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-1">
        <div v-if="index > 0">
          <div class="flex delete" @click="deleteRate(index)">
            <i class="pi parent pi-times cross-button"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        Object.keys(this.$store.state.internationalInbound.othersFormStateData)
          .length == 0
      "
      class="flex justify-content-between add_rate"
    >
      <div class="flex">
        <span class="new-field" @click="addRate"><b>+ Add New Rates</b></span>
      </div>
    </div>
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="internationalInbound" />
    <Buttons
      label="Done"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  data: () => ({
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        rate_name: {required},
        per_kg_rate: {required},
        min_charge: {required},
      },
    ],
    v$: useVuelidate(),
    details: {
      other_rates: [
        {
          per_kg_rate: "",
          rate_name: "",
          min_charge: "",
        },
      ],
    },
    submitted: false,
  }),
  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          other_rates: this.ratesValidation,
        },
      };
    }
  },
  methods: {
    // closeDialog() {
    //   this.$store.state["users"].displayDialog = false;
    // },
    addRate() {
      this.details.other_rates.push({
        per_kg_rate: "",
        rate_name: "",
        min_charge: "",
      });
      this.ratesValidation.push({
        per_kg_rate: {required},
        rate_name: {required},
        min_charge: {required},
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.other_rates.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.internationalInbound.othersFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes/" +
              StateData.id,
            data: this.details.other_rates[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadaddOthersData",
              loadPath:
                "settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes",
              loadMutation: "fetchOthersTableData",
              type: "",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Others detail is Updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg: "There was an error in adding the others, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadaddOthersData",
              loadPath:
                "settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes",
              loadMutation: "fetchOthersTableData",
              type: "",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Others detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg: "There was an error in adding the others, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.internationalInbound.othersFormStateData)
          .length != 0
      ) {
        this.addRates = [];
        this.details.other_rates = [];
        this.ratesValidation = [];
        this.addRates.push("new_rate");
        this.details.other_rates.push({
          per_kg_rate: "",
          rate_name: "",
          min_charge: "",
        });
        this.ratesValidation.push({
          per_kg_rate: {required},
          rate_name: {required},
          min_charge: {required},
        });
        for (let d in this.details.other_rates[0]) {
          this.details.other_rates[0][d] =
            this.$store.state.internationalInbound.othersFormStateData[d];
        }
        this.addRatesClicked++;
      }
    },
  },

  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.internationalInbound.othersFormStateData = {};
  },
};
</script>

<style></style>
