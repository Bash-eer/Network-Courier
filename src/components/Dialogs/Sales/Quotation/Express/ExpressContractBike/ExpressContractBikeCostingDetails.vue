<template>
  <div class="formgrid grid">
    <div class="col-4">
      <h5 class="dialog-label-text head">Monthly Minimum</h5>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Job $</h5>
      <TextField
        label="job"
        type="number"
        v-model="details.job"
        @blur="v$.details.job.$model;"
        :classes="{
          'p-invalid': v$.details.job.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">No. of Units</h5>
      <TextField
        label="no_of_units"
        type="number"
        v-model="details.no_of_units"
        @blur="v$.details.no_of_units.$model;"
        :classes="{
          'p-invalid': v$.details.no_of_units.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Amount</h5>
      <TextField
        label="amount"
        id="amount"
        type="number"
        v-model="details.amount"
        @blur="v$.details.amount.$model;"
        :classes="{
          'p-invalid': v$.details.amount.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Additional Job $</h5>
      <TextField
        label="additional_jobs"
        type="number"
        v-model="details.additional_jobs"
        @blur="v$.details.additional_jobs.$model;"
        :classes="{
          'p-invalid': v$.details.additional_jobs.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
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
            v-bind:checker="
              details.weekend_2nd_trip_charge == true
                ? [
                    {
                      name: 'weekend_2nd_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.saturday_2nd_trip_charge == true
                ? [
                    {
                      name: 'saturday_2nd_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.return_trip_charge == true
                ? [
                    {
                      name: 'return_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.return_trip_partial_charge == true
                ? [
                    {
                      name: 'return_trip_partial_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.collection_trip_charge == true
                ? [
                    {
                      name: 'collection_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.FTZ == true
                ? [
                    {
                      name: 'FTZ',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.special_monitoring == true
                ? [
                    {
                      name: 'special_monitoring',
                      key: 'wd',
                    },
                  ]
                : []
            "
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
            v-bind:checker="
              details.call_centre == true
                ? [
                    {
                      name: 'call_centre',
                      key: 'wd',
                    },
                  ]
                : []
            "
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

  <p class="ml-2 mt-4 subFormHeadersLarge">Charge By Weight</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Job Min. Cost</h5>
      <TextField
        label="job_min_cost"
        type="number"
        v-model="details.job_min_cost"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Kgs $</h5>
      <TextField
        label="job_min_cost_kgs"
        type="number"
        v-model="details.job_min_cost_kgs"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Job Add. Cost $</h5>
      <TextField
        label="job_add_cost"
        type="number"
        v-model="details.job_add_cost"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Kgs $</h5>
      <TextField
        label="job_add_cost_kgs"
        type="number"
        v-model="details.job_add_cost_kgs"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <div class="formgrid grid mb-2">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Job Urgent. Surcharge $</h5>
      <TextField
        label="urgent_sur_charge"
        type="number"
        v-model="details.urgent_sur_charge"
        :classes="{
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
export default {
  name: "ExpressContractBikeCostingDetails",
  data: () => ({
    v$: useVuelidate(),
    details: {
      job: "",
      no_of_units: "",
      amount: "",
      additional_jobs: "",
      billing_cycle: "",
      credit_limit: "",
      credit_term: "",
      sms: "",
      special_urget_price: "",
      sur_charge: "",
      island_charge: "",
      weekend_2nd_trip_charge: false,
      saturday_2nd_trip_charge: false,
      return_trip_charge: false,
      return_trip_partial_charge: false,
      collection_trip_charge: false,
      special_monitoring: false,
      call_centre: false,
      job_min_cost: "",
      job_min_cost_kgs: "",
      job_add_cost: "",
      job_add_cost_kgs: "",
      urgent_sur_charge: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        job: { required },
        no_of_units: { required },
        amount: { required },
        additional_jobs: { required },
        billing_cycle: { required },
      },
    };
  },
  methods: {
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
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (var d in this.details) {
          this.$store.state.sales.quotationCreationFormData[d] =
            this.details[d];
        }
        this.$store.state.sales.stepperNavigation =
          "QutationContractOrSendQuotations";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        for (let state in this.details) {
          this.details[state] =
            this.$store.state["sales"].quotationCreationStateData[state];
        }
      }
    },
  },
  activated() {
    this.loadState();
  },
  created() {
    this.loadState();
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
