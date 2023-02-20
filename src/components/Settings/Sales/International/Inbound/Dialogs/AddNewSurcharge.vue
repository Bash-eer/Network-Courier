<template>
  <div v-for="(rate, index) of addRates" :key="index">
    <!-- <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
    </div> -->
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">Special Rate Name</h5>
        <TextField
          v-model="details['surcharges'][index].rate_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['surcharges'][index].rate_name.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-5">
        <h5 class="color-7a7a7a font-size-14 bold-500 required">Rate Charge (S$)</h5>
        <TextField
          v-model="details['surcharges'][index].rate_charges"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['surcharges'][index].rate_charges.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div v-if="index > 0">
        <div class="flex delete" @click="deleteRate(index)">
          <i class="pi parent pi-times cross-button"></i>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="
      Object.keys(this.$store.state.internationalInbound.surchargeFormStateData)
        .length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addRate"><b>+ Add New Rates</b></span>
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
        <CancelButton storePath="internationalInbound" label="Close" class="color-357dea"/>
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
    name: "AddNewSurcharge",
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        rate_name: { required },
        rate_charges: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      surcharges: [{ rate_name: "", rate_charges: "" }],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          surcharges: this.ratesValidation,
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
          this.$store.state.internationalInbound.surchargeFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/sales/rates/international/inbound/surcharges/" +
              StateData.id,
              
            data: this.details.surcharges[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/surcharges",
              loadMutation: "fetchInboundTableData",
              type: "addSurchargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The surcharge detail is Updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the surcharge, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/sales/rates/international/inbound/surcharges",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/surcharges",
              loadMutation: "fetchInboundTableData",
              type: "addSurchargesData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The surcharge detail is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the surcharge, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    addRate() {
      this.details.surcharges.push({
        rate_name: "",
        rate_charges: "",
      });
      this.ratesValidation.push({
        rate_name: { required },
        rate_charges: { required },
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.surchargeFormStateData
        ).length != 0
      ) {
        this.addRates = [];
        this.addRates.push("new_rate");
        this.details.surcharges = [];
        this.ratesValidation = [];
        this.details.surcharges.push({
          rate_name: "",
          rate_charges: "",
        });
        this.ratesValidation.push({
          rate_name: { required },
          rate_charges: { required },
        });
        for (let d in this.details.surcharges[0]) {
          this.details.surcharges[0][d] =
            this.$store.state.internationalInbound.surchargeFormStateData[d];
        }
        this.addRatesClicked++;
      }
    },
    deleteRate(index) {
      this.details.surcharges.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.internationalInbound.surchargeFormStateData = {};
  },
};
</script>

<style scoped>
.dialog-label-text {
  font-size: 14px !important;
}
.cross-button {
  color: red;
  margin-top: 45px;
  margin-left: 22px;
}
</style>
