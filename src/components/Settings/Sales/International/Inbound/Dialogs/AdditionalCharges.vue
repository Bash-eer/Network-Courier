<template>
  <div class="formgrid grid mt-2">
    <div class="field col-12 md:col-6">
      <span class="step-text">Additional Charges</span>
    </div>
  </div>
  <div v-for="(rate, index) of addRates" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Charge Name</h5>
        <TextField
          v-model="details['additional_charges'][index].charge_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['additional_charges'][index].charge_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Rate $</h5>
        <TextField
          v-model="details['additional_charges'][index].rate"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['additional_charges'][index].rate.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Items Threshold (>5)</h5>
        <TextField
          v-model="details['additional_charges'][index].item_threshold"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['additional_charges'][index].item_threshold.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
  </div>
  <div
    v-if="
      Object.keys(
        this.$store.state.internationalInbound.additionalChargesFormStateData
      ).length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addRate"
        ><b>+ Add Additional Charges</b></span
      >
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
        <CancelButton storePath="internationalInbound" label="Cancel" class="color-357dea" />
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="storePath='internationalInbound'"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <Buttons  
          label="Save"
          button_class="dialog-button-text bg-357dea"
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
    name: "AdditionalCharges",
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        charge_name: {required},
        item_threshold: {required},
        rate: {required},
      },
    ],

    //DATA COLLECTION
    details: {
      additional_charges: [{charge_name: "", item_threshold: "", rate: ""}],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          additional_charges: this.ratesValidation,
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
          this.$store.state.internationalInbound.additionalChargesFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/permitCharges/additionalCharges/" +
              StateData.id,
            data: this.details.additional_charges[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/additionalCharges",
              type: "fetchAdditionalChargesData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The additional charges detail is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the additional charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/salesSettinigs/rates/international/inbound/permitCharges/additionalCharges",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/additionalCharges",
              type: "fetchAdditionalChargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The additional charges detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the additional charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    addRate() {
      this.details.additional_charges.push({
        charge_name: "",
        item_threshold: "",
        rate: "",
      });
      this.ratesValidation.push({
        charge_name: {required},
        item_threshold: {required},
        rate: {required},
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.additional_charges.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.additionalChargesFormStateData
        ).length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.additional_charges = [];
        this.ratesValidation = [];
        this.details.additional_charges.push({
          charge_name: "",
          item_threshold: "",
          rate: "",
        });
        this.ratesValidation.push({
          charge_name: {required},
          item_threshold: {required},
          rate: {required},
        });
        for (let d in this.details.additional_charges[0]) {
          this.details.additional_charges[0][d] =
            this.$store.state.internationalInbound.additionalChargesFormStateData[
              d
            ];
        }
        this.addRatesClicked++;
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.internationalInbound.additionalChargesFormStateData = {};
  },
};
</script>

<style scoped>
.p-button.p-button-outlined {
  color: #357dea !important;
}
.required:after {
  font-size: 14px !important;
}
</style>
