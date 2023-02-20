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

    <!-- Additional Rates -->
    <span class="new-field ml-2" v-on:click="seen = !seen" v-if="seen == false"
      ><b>+ Add Additional Rate</b></span
    >
    <div v-if="seen">
      <div class="formgrid grid mt-2">
        <div class="field col-12 md:col-6">
          <span class="color-4e5868 font-size-14 bold-600"
            >Additional Rate</span
          >
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-5">
          <h5 class="color-7a7a7a font-size-14 bold-500">Weight (Kg)</h5>
          <TextField
            type="number"
            v-model="details.additional_rates.weight"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-5">
          <h5 class="color-7a7a7a font-size-14 bold-500">
            Rate (for given weight) ($)
          </h5>
          <TextField
            type="number"
            v-model="details.additional_rates.rate"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-1">
          <div class="flex delete" v-on:click="seen = !seen">
            <i class="pi parent pi-times cross-button"></i>
          </div>
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
  name: "AddNewClearanceDialog",
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
    // addNewDropDownDataInbound: [

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
          // additional_rates: {
          //   weight: {required},
          //   rate: {required},
          // },
          clearance: {
            rate_per_kg: { required },
            minimum_rate: { required },
          },
        },
      };
    }
    // if (this.seen == true) {
    //   return {
    //     details: {
    //       additional_clearance: {
    //         weight: {required},
    //         rate: {required},
    //       },
    //     },
    //   };
    // }
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

    // getDropDownData2() {
    //   let data = this.addNewDropDownDataInbound[0].items;
    //   let getData = this.$store.state.internationalInbound.clearanceModeData;
    //   // let source;
    //   for (let d in getData){
    //     data[d].name= getData[d].clearance_mode_name;
    //     data[d].code= getData[d].id;
    //   }
    // },
    // getDropDownData2(Data) {
    //   let items = [];
    //   let code = 0;

    //   for (let s in Data) {
    //     let dynamicSubTabsDataObj = {};
    //     dynamicSubTabsDataObj["name"] = Data[s].label
    //       // .replace(/\s+/g, "");
    //       // .replace(/[\s])}[{(]/g, "");
    //     dynamicSubTabsDataObj["code"] = code++;
    //     items.push(dynamicSubTabsDataObj);
    //   }
    //   console.log(items, " Processed Data")
    //   return items;
    // },
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
    // filterDropdown(value) {
    //   console.log(value, "Flter data fields")
    //   let data = this.addNewDropDownDataInbound[0].items;
    //   for (let d in data) {
    //     if (data[d].code == value) {
    //       return data[d].name;
    //     }
    //   }
    // },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (this.seen == false) {
          delete this.details.additional_rates;
        }
        // console.log(this.details, "Submit Data");
        //   let dObject = this.details;
        //  for (let d in dObject) {
        //     if (d == "recipient_name") {
        //       let key = "clearance_mode_name";
        //       this.details[key] = this.filterDropdown(
        //         dObject.clearance_mode_name
        //       );
        //     }
        //   }

        //       this.details.clearance_mode_name = this.filterDropdown(
        //         dObject
        //       );

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
        let StateData =
          this.$store.state.internationalInbound.clearanceModeFormStateData;
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
              type: "addClearanceModeData",
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
        Object.keys(
          this.$store.state.internationalInbound.clearanceModeFormStateData
        ).length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.rates = [];
        this.this.ratesValidation = [];
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
        let clearanceModeDetails = {};
        for (let d in this.details) {
          if (d == "clearance_mode_name") {
            if (isNaN(this.details[d]) == false) {
              clearanceModeDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            }
          }
          // if (d != "rates" && d != "clearance_mode_name" ) {
          //   this.details[d] =
          //     this.$store.state.internationalInbound.clearanceModeFormStateData[
          //       d
          //     ];
          // }
        }
        for (let d in this.details.rates[0]) {
          this.details.rates[0][d] =
            this.$store.state.internationalInbound.clearanceModeFormStateData[
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
    this.$store.state.internationalInbound.clearanceModeFormStateData = {};
  },
};
</script>
<style scoped>
.dialog-dropdown-text {
  height: 38px;
}
.cross-button {
  color: red;
  margin-top: 45px;
  margin-left: 22px;
}
</style>
