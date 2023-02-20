<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a font-size-14 bold-500">
        Clearance Mode Name
      </h5>
      <AddNewDropDownTextField
        stateName="addNewDropDownDataInbound"
        :state="details.clearance_mode_name"
        :data="$store.state.internationalInbound.addNewDropDownDataInbound"
        :disabled="true"
        :placeholder="'Choose a Clearance Mode Name'"
        storePath="internationalInbound"
        v-model="details.clearance_mode_name"
        :classes="{
          'p-invalid': v$.details.clearance_mode_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div>
    <div class="formgrid grid mt-2">
      <div class="field col-12 md:col-6">
        <span class="color-4e5868 font-size-14 bold-700"
          >Clearance & Additional</span
        >
      </div>
    </div>

    <!-- Add Rates -->

    <div class="formgrid grid mt-2">
      <div class="field col-12 md:col-6">
        <span class="color-4e5868 font-size-14 bold-600">Add Rates</span>
      </div>
    </div>
    <div v-for="(rate, index) of addRates" :key="index">
      <div class="formgrid grid">
        <div class="field col-12 md:col-5">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Weight (Kg)
          </h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <NumberField
                :showButtons="true"
                v-model="details['rates'][index].min_weight"
                mode="decimal"
                :maxFractionDigits="2"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index].min_weight.$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <NumberField
                :showButtons="true"
                v-model="details['rates'][index].max_weight"
                mode="decimal"
                :maxFractionDigits="2"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index].max_weight.$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
                }"
              />
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-5">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">Rate ($)</h5>
          <TextField
            type="number"
            v-model="details['rates'][index].rate"
            :classes="{
              'p-invalid':
                v$.details['rates'][index].rate.$invalid && submitted,
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
    </div>
    <div class="flex justify-content-between add_rate ml-2 mb-3">
      <div class="flex">
        <span class="new-field" @click="addRate"><b>+ Add New Rate</b></span>
      </div>
    </div>
    <hr />
    <!-- Additional Rates -->
    <!-- <span class="new-field ml-2">
      <b>+ Add Additional Rate</b>
      </span> -->

    <div>
      <div class="formgrid grid mt-2">
        <div class="field col-12 md:col-6">
          <span class="color-4e5868 font-size-14 bold-600"
            >Additional Rates</span
          >
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-5">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">
            Weight (Kg)
          </h5>
          <TextField
            type="number"
            v-model="details.additional_rates.weight"
            :classes="{
              'p-invalid':
                v$.details.additional_rates.weight.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-5">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">
            Rate (for given weight) ($)
          </h5>
          <TextField
            type="number"
            v-model="details.additional_rates.rate"
            :classes="{
              'p-invalid':
                v$.details.additional_rates.rate.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-1">
          <!-- <div class="flex delete" v-on:click="seen = !seen">
            <i class="pi parent pi-times cross-button"></i>
          </div> -->
        </div>
      </div>
    </div>
    <hr />
    <div class="formgrid grid mt-2">
      <div class="field col-12 md:col-6">
        <span class="color-4e5868 font-size-14 bold-700">Clearance</span>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-5">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">
          Rate Per Kg $
        </h5>
        <TextField
          type="number"
          v-model="details.clearance.rate_per_kg"
          :classes="{
            'p-invalid': v$.details.clearance.rate_per_kg.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-5">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">
          Minimum Charge ($)
        </h5>
        <TextField
          type="number"
          v-model="details.clearance.minimum_rate"
          :classes="{
            'p-invalid':
              v$.details.clearance.minimum_rate.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="internationalInbound" class="color-357dea" />
    <Buttons
      label="Save"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
// import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "EditClearanceDialog",
  data: () => ({
    addRatesClicked: 0,
    v$: useVuelidate(),
    seen: false,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        min_weight: { required },
        max_weight: { required },
        rate: { required },
      },
    ],
    details: {
      clearance_mode_name: "",
      rates: [
        {
          min_weight: "",
          max_weight: "",
          rate: "",
        },
      ],
      additional_rates: {
        weight: "",
        rate: "",
      },

      clearance: {
        rate_per_kg: "",
        minimum_rate: "",
      },
    },
    submitted: false,
  }),
  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          rates: this.ratesValidation,
          clearance_mode_name: { required },
          additional_rates: {
            weight: { required },
            rate: { required },
          },
          clearance: {
            rate_per_kg: { required },
            minimum_rate: { required },
          },
        },
      };
    }
    //   if (this.seen == true) {
    //     return {
    //       details: {
    //         additional_rates: {
    //           weight: {required},
    //           rate: {required},
    //         },
    //       },
    //     };
    //   }
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    addRate() {
      this.details.rates.push({
        min_weight: "",
        max_weight: "",
        rate: "",
      });
      this.ratesValidation.push({
        min_weight: { required },
        max_weight: { required },
        rate: { required },
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.rates.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },

    getDropDownData(key) {
      let source;
      if (key == "clearance_mode_name") {
        source =
          this.$store.state.internationalInbound.addNewDropDownDataInbound[0]
            .items;
      }
      return source;
    },

    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          let processedName = data[dd].name.replace(/\s/g, "");
          inputCode = processedName;
          return processedName;
        }
      }
    },
    // filterDropdown(type, value) {
    //   let data = this.$store.state.internationalInbound.addNewDropDownDataInbound
    //   for (let d in data) {
    //     if (data[d].code == value) {
    //       return data[d].name;
    //     }
    //   }
    // },
    // getIndex() {
    //   console.log(this.$store.state.internationalInbound.clearanceModeDynamicTabState, "Tab State xxxxx");
    //   const index =
    //     this.$store.state.internationalInbound.clearanceModeData.findIndex(
    //       (element) =>
    //         element["clearance_mode_name"] ==
    //         this.$store.state.internationalInbound.clearanceModeDynamicTabState
    //     );
    //   return index;
    // },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let clearanceModeDetails = {};

        for (let d in this.details) {
          if (d == "clearance_mode_name") {
            if (isNaN(this.details[d]) == false) {
              clearanceModeDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              clearanceModeDetails[d] = this.details[d];
            }
          } else {
            clearanceModeDetails[d] = this.details[d];
          }
        }
        console.log(clearanceModeDetails, this.StateData, "Submit Data");
        let StateData =
          this.$store.state.internationalInbound.clearanceModeData;
        console.log(StateData, "StateID");
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes/" +
              StateData.id,
            data: clearanceModeDetails,
            method: "PATCH",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
              loadMutation: "fetchClearanceModeData",
              type: "fetchClearanceModeData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Clearance Mode is Updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the Clearance Mode Data, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
            data: clearanceModeDetails,
            method: "POST",
            loadData: {
              loadApi: "loadClearanceModeTabs",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
              loadMutation: "fetchClearanceModeData",
              type: "addClearanceModeData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The Clearance Mode data is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Clearance Mode data, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.internationalInbound.clearanceModeData)
          .length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.rates = [];
        this.ratesValidation = [];
        this.details.rates.push({
          min_weight: "",
          max_weight: "",
          rate: "",
        });
        this.ratesValidation.push({
          min_weight: { required },
          max_weight: { required },
          rate: { required },
        });
        // for (let d in this.details) {
        //   if (d != "rates") {
        //     this.details[d] =
        //       this.$store.state.internationalInbound.clearanceModeData[
        //         d
        //       ];
        //   }
        // }

        for (let d in this.details) {
          if (d == "clearance_mode_name") {
            if (isNaN(this.details[d]) == false) {
              this.details[d] = this.filterDropdown(
                d,
                this.$store.state.internationalInbound.clearanceModeData
                  .clearance_mode_name
              );
            } else {
              this.details[d] =
                this.$store.state.internationalInbound.clearanceModeData[d];
            }
          }
        }
        // if (d != "rates" && d != "clearance_mode_name" ) {
        //   this.details[d] =
        //     this.$store.state.internationalInbound.clearanceModeFormStateData[
        //       d
        //     ];
        // }
        // for (let d in this.details) {
        //     this.details[d] =
        //       this.$store.state.internationalInbound.clearanceModeData[d];
        // }
        this.addRatesClicked++;
      }
    },
  },
  created() {
    this.details.clearance_mode_name =
      this.$store.state.internationalInbound.clearanceModeData.clearance_mode_name;
    //  this.$store.state.internationalInbound.clearanceModeDynamicTabState;
    this.loadState();

    this.details.rates =
      this.$store.state.internationalInbound.clearanceModeData.rates;
    if (
      this.$store.state.internationalInbound.clearanceModeData
        ?.additional_clearance?.length
    ) {
      if (this.details.additional_rates) {
        this.details.additional_rates.weight =
          this.$store.state.internationalInbound.clearanceModeData.additional_clearance[0].weight;
        this.details.additional_rates.rate =
          this.$store.state.internationalInbound.clearanceModeData.additional_clearance[0].rate;
      }
    }

    this.details.clearance.rate_per_kg =
      this.$store.state.internationalInbound.clearanceModeData.clearance[0].rate_per_kg;
    this.details.clearance.minimum_rate =
      this.$store.state.internationalInbound.clearanceModeData.clearance[0].minimum_rate;
  },
  unmounted() {
    this.$store.state.internationalInbound.clearanceModeFormStateData = {};
  },
};
</script>
<style scoped>
.dialog-dropdown-text {
  height: 38px;
  background: #e9e9e9 !important;
}
.cross-button {
  color: red;
  margin-top: 45px;
  margin-left: 22px;
}
</style>
