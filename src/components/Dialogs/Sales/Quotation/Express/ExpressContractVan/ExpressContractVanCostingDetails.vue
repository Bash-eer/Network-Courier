<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Billing Cycle</h5>
      <TextField
        label="billing_cycle"
        type="number"
        v-model="details.billing_cycle"
        @blur="v$.details.billing_cycle.$model;"
        :classes="{
          'p-invalid': v$.details.billing_cycle.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <VanJobs />
  </div>
  <div class="field col-12 md:col-12 mt-4 text p-2">
    <span class="ml-3"> Billing settings </span>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Credit Limit $</h5>
      <TextField
        label="credit_limit"
        type="number"
        v-model="details.credit_limit"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Credit Terms</h5>
      <TextField
        label="credit_term"
        type="number"
        v-model="details.credit_term"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">SMS</h5>
      <TextField
        label="sms"
        type="number"
        v-model="details.sms"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Special Urgent Price</h5>
      <TextField
        label="special_urget_price"
        type="number"
        v-model="details.special_urget_price"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Sur Charge</h5>
      <TextField
        label="sur_charge"
        type="number"
        v-model="details.sur_charge"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Island Charge</h5>
      <TextField
        label="island_charge"
        type="number"
        v-model="details.island_charge"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <p class="ml-2 mt-3 subFormHeaders">Trip Charges</p>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'weekend_2nd_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">Weekday 2nd Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'saturday_2nd_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">Saturday 2nd Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'return_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
          <div class="flex">
            <label class="checksText">Return Trip Charge</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'return_trip_partial_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">Return Trip Partial Charge</label>
        </div>
      </div>
    </div>
  </div>

  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'collection_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">Collection Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'FTZ',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">FTZ</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'special_monitoring',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
          <div class="flex">
            <label class="checksText">Special Monitoring</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: 'call_centre',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex">
          <label class="checksText">Call Center</label>
        </div>
      </div>
    </div>
  </div>

  <p class="ml-2 mt-4 subFormHeadersLarge">Van Customer Bike Job</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Min Charge per Job ($)</h5>
      <TextField
        label="minChargePerJob"
        type="number"
        v-model="details.minChargePerJob"
        @blur="v$.details.minChargePerJob.$model;"
        :classes="{
          'p-invalid': v$.details.minChargePerJob.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <div class="formgrid grid pl-2 pr-2">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
          v-on:childToParent="closeDialog"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import VanJobs from "./VanJobs.vue";
export default {
  name: "ExpressContractVanCostingDetails",
  components: { VanJobs },
  data: () => ({
    v$: useVuelidate(),
    details: {
      // job: "",
      // no_of_units: "",
      // amount: "",
      // additional_jobs: "",
      billing_cycle: "",
      minChargePerJob: "",
      credit_limit: "",
      credit_term: "",
      sms: "",
      special_urget_price: "",
      sur_charge: "",
      island_charge: "",
      // weekend_2nd_trip_charge: false,
      // saturday_2nd_trip_charge: false,
      // return_trip_charge: false,
      // return_trip_partial_charge: false,
      // collection_trip_charge: false,
      // special_monitoring: false,
      // call_centre: false,
      // job_min_cost: "",
      // job_min_cost_kgs: "",
      // job_add_cost: "",
      // job_add_cost_kgs: "",
      // urgent_sur_charge: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        // job: { required },
        // no_of_units: { required },
        // amount: { required },
        // additional_jobs: { required },
        billing_cycle: { required },
        minChargePerJob: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].name] = true;
      }
      if (val.length == 0) {
        this.details[src[0].name] = false;
      }
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "QuotationTripDetails";
    },
    submitData() {
      // if (this.v$.$invalid) {
      //   this.submitted = true;
      // }
      // if (!this.v$.$invalid) {
      for (var d in this.details) {
        this.$store.state.sales.quotationCreationFormData[d] = this.details[d];
      }
      this.$store.state.sales.stepperNavigation =
        "QutationContractOrSendQuotations";
      // }
    },
  },
};
</script>
<style scoped>
.subFormHeaders {
  color: black;
  font-weight: bolder;
  font-size: 14px;
}
.subFormHeadersLarge {
  color: black;
  font-weight: bolder;
  font-size: 16px;
}
.checksLabel {
  margin-top: 10%;
}
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
  margin-top: 13px;
}
.text {
  color: black;
  background: #e6e6e6;
  margin-top: 10px;
  border-radius: 7px;
  font-weight: bold;
}
.head {
  font-weight: bold;
  color: black;
}
</style>
