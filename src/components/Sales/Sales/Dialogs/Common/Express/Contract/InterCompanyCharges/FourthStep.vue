<template>
  <!-- <InternationalRegularTabs :tabMenuData="VanOrBikeTab" class="mt-2" /> -->
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Bike', 'Van']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <div class="formgrid grid">
    <div class="col-4">
      <h5 class="dialog-label-text head">Monthly Minimum</h5>
    </div>
  </div>
  <div v-if="defaultTransportType == 'Bike'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">No. of Units</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.bike.no_of_units"
          @blur="v$.details.bike.no_of_units.$model;"
          :classes="{
            'p-invalid': v$.details.bike.no_of_units.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Job $</h5>
        <TextField
          label="job"
          type="number"
          v-model="details.bike.job"
          @blur="v$.details.bike.job.$model;"
          :classes="{
            'p-invalid': v$.details.bike.job.$invalid && submitted,
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
          v-model="details.bike.amount"
          @blur="v$.details.bike.amount.$model;"
          :classes="{
            'p-invalid': v$.details.bike.amount.$invalid && submitted,
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
          v-model="details.bike.additional_jobs"
          @blur="v$.details.bike.additional_jobs.$model;"
          :classes="{
            'p-invalid': v$.details.bike.additional_jobs.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.bike.billing_cycle.$model;"
          label="billing_cycle"
          v-model="details.bike.billing_cycle"
          :class="{
            'p-invalid': v$.details.bike.billing_cycle.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div
      class="field col-12 md:col-12 mt-4 p-2"
      style="background: #e6e6e6; border-radius: 5px"
    >
      <span class="ml-3"> Billing settings </span>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Credit Limit $</h5>
        <TextField
          label="credit_limit"
          type="number"
          v-model="details.bike.credit_limit"
          :classes="{
            'p-invalid': v$.details.bike.credit_limit.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Credit Terms(Days)</h5>
        <TextField
          label="credit_term"
          type="number"
          v-model="details.bike.credit_term"
          :classes="{
            'p-invalid': v$.details.bike.credit_term.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing"
          @blur="v$.details.bike.billing.$model;"
          label="billing"
          v-model="details.bike.billing"
          :class="{
            'p-invalid': v$.details.bike.billing.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <p class="ml-2 mt-3 head">SurCharge Charges</p>
    <p class="ml-2 mt-3 head">Trip Charges</p>
    <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.bike.weekend_2nd_trip_charge == true
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
                details.bike.saturday_2nd_trip_charge == true
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
                details.bike.return_trip_charge == true
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
                details.bike.return_trip_partial_charge == true
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
                details.bike.collection_trip_charge == true
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
                details.bike.FTZ == true
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
            <label class="checksText">Special Urgent Charges $</label>
          </div>
        </div>
      </div>
    </div>
    <p class="ml-1 mt-3 head">Bike customer van Jobs</p>
    <p class="ml-4 mt-3 head">Charge By Weight</p>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van job Min.Cost $</h5>
        <TextField
          label="vanjob_mincost"
          type="number"
          v-model="details.bike.vanjob_mincost"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Kgs</h5>
        <TextField
          label="kgs"
          type="number"
          v-model="details.bike.kgs"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van job Min.Cost $</h5>
        <TextField
          label="vanjob_mincost"
          type="number"
          v-model="details.bike.vanjob_mincost"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Kgs</h5>
        <TextField
          label="kgs"
          type="number"
          v-model="details.bike.kgs"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van job Urgent SurCharges $</h5>
        <TextField
          label="vanjob_surcharges"
          type="number"
          v-model="details.bike.vanjob_surcharges"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'Van'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">No. of Units</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.van.no_of_units"
          @blur="v$.details.van.no_of_units.$model;"
          :classes="{
            'p-invalid': v$.details.van.no_of_units.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Job $</h5>
        <TextField
          label="job"
          type="number"
          v-model="details.van.job"
          @blur="v$.details.van.job.$model;"
          :classes="{
            'p-invalid': v$.details.van.job.$invalid && submitted,
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
          v-model="details.van.amount"
          @blur="v$.details.van.amount.$model;"
          :classes="{
            'p-invalid': v$.details.van.amount.$invalid && submitted,
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
          v-model="details.van.additional_jobs"
          @blur="v$.details.van.additional_jobs.$model;"
          :classes="{
            'p-invalid': v$.details.van.additional_jobs.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Maximum Weight (Kg)</h5>
        <TextField
          label="kgs"
          type="number"
          v-model="details.van.kgs"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.van.billing_cycle.$model;"
          label="billing_cycle"
          v-model="details.van.billing_cycle"
          :class="{
            'p-invalid': v$.details.van.billing_cycle.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Van Job Addl. Cost($)</h5>
        <TextField
          label="kgs"
          type="number"
          v-model="details.van.kgs"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Maximum Weight (Kg)</h5>
        <TextField
          label="kgs"
          type="number"
          v-model="details.van.kgs"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div
      class="field col-12 md:col-12 mt-4 p-2"
      style="background: #e6e6e6; border-radius: 5px"
    >
      <span class="ml-3"> Billing settings </span>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Credit Limit $</h5>
        <TextField
          label="credit_limit"
          type="number"
          v-model="details.van.credit_limit"
          :classes="{
            'p-invalid': v$.details.van.credit_limit.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
        <TextField
          label="credit_term"
          type="number"
          v-model="details.van.credit_term"
          :classes="{
            'p-invalid': v$.details.van.credit_term.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing"
          @blur="v$.details.van.billing.$model;"
          label="billing"
          v-model="details.van.billing"
          :class="{
            'p-invalid': v$.details.van.billing.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <p class="ml-2 mt-3 head">SurCharge Charges</p>
    <p class="ml-2 mt-3 head">Trip Charges</p>
    <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.van.weekend_2nd_trip_charge == true
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
                details.van.saturday_2nd_trip_charge == true
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
                details.van.return_trip_charge == true
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
                details.van.return_trip_partial_charge == true
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
                details.van.collection_trip_charge == true
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
                details.van.FTZ == true
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
            <label class="checksText">Special Urgent Charges $</label>
          </div>
        </div>
      </div>
    </div>
    <p class="ml-1 mt-3 head">Van Customer Bike job</p>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Min Charge per Job ($)</h5>
        <TextField
          label="FSRjob_mincost"
          type="number"
          v-model="details.van.vanjob_mincost"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
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
        <CancelButton storePath="salesQuotationDialog" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../../DuoSelect.vue";
export default {
  name: "SalesExpressContractInterChargesFourthStep",
  components: {
    DuoSelection,
  },
  data: () => ({
    // VanOrBikeTab: VanOrBikeFSR,
    defaultTransportType: "Bike",

    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    billing: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    v$: useVuelidate(),
    details: {
      bike: {
        job: "",
        no_of_units: "",
        amount: "",
        additional_jobs: "",
        billing_cycle: "",
        credit_limit: "",
        credit_term: "",
        billing: "",
        vanjob_mincost: "",
        kgs: "",
        vanjob_surcharges: "",
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_monitoring: false,
        call_centre: false,
      },
      van: {
        job: "",
        no_of_units: "",
        amount: "",
        additional_jobs: "",
        billing_cycle: "",
        credit_limit: "",
        credit_term: "",
        billing: "",
        vanjob_mincost: "",
        kgs: "",
        vanjob_surcharges: "",
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_monitoring: false,
        call_centre: false,
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        bike: {
          job: { required },
          no_of_units: { required },
          amount: { required },
          credit_term: { required },
          additional_jobs: { required },
          billing_cycle: { required },
          billing: { required },
          credit_limit: { required },
          special_urget_price: { required },
          sur_charge: { required },
        },
        van: {
          job: { required },
          no_of_units: { required },
          amount: { required },
          credit_term: { required },
          additional_jobs: { required },
          billing_cycle: { required },
          billing: { required },
          credit_limit: { required },
          special_urget_price: { required },
          sur_charge: { required },
        },
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
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractInterChargesThirdStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractInterChargesFifthStep",
        });
      }
    },
  },
  watch: {
    "$store.state.dialog.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.dialog.addRegionDeliveryTransportType;
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
  font-weight: 700;
  font-size: 14px;
  color: #343434;
}
</style>
