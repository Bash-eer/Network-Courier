<template>
  <div v-for="(rate, index) of addRates" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Charge Name</h5>
        <TextField
          v-model="details['other_charges'][index].charge_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['other_charges'][index].charge_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Rate $</h5>
        <TextField
          v-model="details['other_charges'][index].rate"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['other_charges'][index].rate.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
  </div>
  <div
    v-if="
      Object.keys(
        this.$store.state.internationalInbound.otherChargesFormStateData
      ).length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addRate"><b>+ Add Other Charges</b></span>
    </div>
  </div>

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="internationalInbound" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  data: () => ({
    name: "OtherCharges",
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        charge_name: {required},
        rate: {required},
      },
    ],

    //DATA COLLECTION
    details: {
      other_charges: [{charge_name: "", rate: ""}],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          other_charges: this.ratesValidation,
        },
      };
    }
  },

  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.internationalInbound.otherChargesFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "settings/salesSettinigs/rates/international/inbound/permitCharges/otherCharges/" +
              StateData.id,
            data: this.details.other_charges[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/otherCharges",
              type: "fetchOthersChargesData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The Other charges detail is added!`,
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
            path: "/settings/salesSettinigs/rates/international/inbound/permitCharges/otherCharges",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/otherCharges",
              type: "fetchOthersChargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Other charges detail is added!`,
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
    addRate() {
      this.details.other_charges.push({
        charge_name: "",
        rate: "",
      });
      this.ratesValidation.push({
        charge_name: {required},
        rate: {required},
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.other_charges.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.otherChargesFormStateData
        ).length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.other_charges = [];
        this.ratesValidation = [];
        this.details.other_charges.push({
          charge_name: "",
          rate: "",
        });
        this.ratesValidation.push({
          charge_name: {required},
          rate: {required},
        });
        for (let d in this.details.other_charges[0]) {
          this.details.other_charges[0][d] =
            this.$store.state.internationalInbound.otherChargesFormStateData[d];
        }
        this.addQuestionClicked++;
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.internationalInbound.otherChargesFormStateData = {};
  },
};
</script>

<style></style>
