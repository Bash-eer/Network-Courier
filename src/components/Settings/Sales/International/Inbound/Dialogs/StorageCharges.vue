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
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 bold-500 ml-2">
          Weight Range (Kg)
        </h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['storage_charges'][index].min_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              :classes="{
                'p-invalid':
                  v$.details['storage_charges'][index].min_weight.$invalid &&
                  submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['storage_charges'][index].max_weight"
              :showButtons="true"
              :maxFractionDigits="2"
              mode="decimal"
              :classes="{
                'p-invalid':
                  v$.details['storage_charges'][index].max_weight.$invalid &&
                  submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">Per Kg $</h5>
        <TextField
          v-model="details['storage_charges'][index].per_kg_charges"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['storage_charges'][index].per_kg_charges.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">
          Minimum Charge $
        </h5>
        <TextField
          v-model="details['storage_charges'][index].minimum_charge"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['storage_charges'][index].minimum_charge.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">
          Grace Period
        </h5>
        <TextField
          v-model="details['storage_charges'][index].grace_period"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['storage_charges'][index].grace_period.$invalid &&
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
        this.$store.state.internationalInbound.storageChargesFormStateData
      ).length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addRate"
        ><b>+ Add Storage Charges</b></span
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
        <CancelButton
          storePath="internationalInbound"
          label="Cancel"
          class="color-357dea"
        />
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
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    name: "StorageCharges",
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        per_kg_charges: { required },
        minimum_charge: { required },
        grace_period: { required },
        min_weight: { required },
        max_weight: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      storage_charges: [
        {
          per_kg_charges: "",
          minimum_charge: "",
          min_weight: "",
          max_weight: "",
          grace_period: "",
        },
      ],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          storage_charges: this.ratesValidation,
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
          this.$store.state.internationalInbound.storageChargesFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/permitCharges/storageCharges/" +
              StateData.id,
            data: this.details.storage_charges[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/storageCharges",
              type: "fetchStorageChargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Storage charges detail is Updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the Storage charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/salesSettinigs/rates/international/inbound/permitCharges/storageCharges",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/storageCharges",
              type: "fetchStorageChargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Storage charges detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Storage charges, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    addRate() {
      this.details.storage_charges.push({
        per_kg_charges: "",
        minimum_charge: "",
        min_weight: "",
        max_weight: "",
        grace_period: "",
      });
      this.ratesValidation.push({
        per_kg_charges: { required },
        minimum_charge: { required },
        min_weight: { required },
        max_weight: { required },
        grace_period: { required },
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.storage_charges.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.storageChargesFormStateData
        ).length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.storage_charges = [];
        this.ratesValidation = [];
        this.details.storage_charges.push({
          per_kg_charges: "",
          minimum_charge: "",
          min_weight: "",
          max_weight: "",
          grace_period: "",
        });
        this.ratesValidation.push({
          per_kg_charges: { required },
          minimum_charge: { required },
          min_weight: { required },
          max_weight: { required },
          grace_period: { required },
        });
        for (let d in this.details.storage_charges[0]) {
          this.details.storage_charges[0][d] =
            this.$store.state.internationalInbound.storageChargesFormStateData[
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
    this.$store.state.internationalInbound.storageChargesFormStateData = {};
  },
};
</script>

<style>
.unit_rates {
  margin-top: 2%;
}
.add_rates {
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.add_rate {
  margin-left: 2%;
}
.duoSelect {
  margin-left: 1.5%;
}
</style>
