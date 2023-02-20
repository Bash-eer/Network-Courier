<template>
  <!-- <InternationalRegularTabs :tabMenuData="VanOrBikeTab" class="mt-2" /> -->
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Van', 'FSR']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <div class="formgrid grid">
    <div class="col-4">
      <h5 class="dialog-label-text head">Monthly Minimum</h5>
    </div>
  </div>
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
        <h5 class="dialog-label-text">Credit Terms</h5>
        <TextField
          label="credit_term"
          type="number"
          v-model="details.van.credit_term"
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
          v-model="details.van.sms"
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
          v-model="details.van.special_urget_price"
          :classes="{
            'p-invalid':
              v$.details.van.special_urget_price.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Sur Charge</h5>
        <TextField
          label="sur_charge"
          type="number"
          v-model="details.van.sur_charge"
          :classes="{
            'p-invalid': v$.details.van.sur_charge.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Island Charge</h5>
        <TextField
          label="island_charge"
          type="number"
          v-model="details.van.island_charge"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>

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
            <label class="checksText">FTZ</label>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.van.special_monitoring == true
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
                details.van.call_centre == true
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
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'FSR'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Detail Type</h5>
        <TextField
          label="detail_type"
          type="text"
          v-model="details.FSR.detail_type"
          @blur="v$.details.FSR.detail_type.$model;"
          :classes="{
            'p-invalid': v$.details.FSR.detail_type.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Unit Price</h5>
        <TextField
          label="unit_price"
          type="number"
          v-model="details.FSR.unit_price"
          @blur="v$.details.FSR.unit_price.$model;"
          :classes="{
            'p-invalid': v$.details.FSR.unit_price.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Quantity</h5>
        <TextField
          label="quantity"
          id="quantity"
          type="number"
          v-model="details.FSR.quantity"
          @blur="v$.details.FSR.quantity.$model;"
          :classes="{
            'p-invalid': v$.details.FSR.quantity.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Amount</h5>
        <TextField
          label="amount"
          id="amount"
          type="number"
          v-model="details.FSR.amount"
          @blur="v$.details.FSR.amount.$model;"
          :classes="{
            'p-invalid': v$.details.FSR.amount.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text">Description</h5>
        <TextAreaField
          label="description"
          @blur="v$.details.FSR.description.$model;"
          type="text"
          v-model="details.FSR.description"
          :classes="{
            'p-invalid': v$.details.FSR.description.$invalid && submitted,

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
        <h5 class="dialog-label-text">Credit Limit $</h5>
        <TextField
          label="credit_limit"
          type="number"
          v-model="details.FSR.credit_limit"
          :classes="{
            'p-invalid': v$.details.FSR.credit_limit.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Credit Terms</h5>
        <TextField
          label="credit_term"
          type="number"
          v-model="details.FSR.credit_term"
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
          v-model="details.FSR.sms"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Special Urgent Price</h5>
        <TextField
          label="special_urget_price"
          type="number"
          v-model="details.FSR.special_urget_price"
          :classes="{
            'p-invalid':
              v$.details.FSR.special_urget_price.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Sur Charge</h5>
        <TextField
          label="sur_charge"
          type="number"
          v-model="details.FSR.sur_charge"
          :classes="{
            'p-invalid': v$.details.FSR.sur_charge.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Island Charge</h5>
        <TextField
          label="island_charge"
          type="number"
          v-model="details.FSR.island_charge"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>

    <p class="ml-2 mt-3 head">Trip Charges</p>
    <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.FSR.weekend_2nd_trip_charge == true
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
                details.FSR.saturday_2nd_trip_charge == true
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
                details.FSR.return_trip_charge == true
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
                details.FSR.return_trip_partial_charge == true
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
                details.FSR.collection_trip_charge == true
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
                details.FSR.FTZ == true
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
                details.FSR.special_monitoring == true
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
                details.FSR.call_centre == true
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
// import {VanOrBikeFSR} from "../../const/const";
import DuoSelection from "../../DuoSelect.vue";

export default {
  name: "AddBikeCostingDetailsDialog",
  components: {
    DuoSelection,
  },
  data: () => ({
    // VanOrBikeTab: VanOrBikeFSR,
    defaultTransportType: "Van",

    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    v$: useVuelidate(),
    details: {
      van: {
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
      },
      FSR: {
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
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
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        van: {
          job: { required },
          no_of_units: { required },
          amount: { required },
          additional_jobs: { required },
          billing_cycle: { required },
          credit_limit: { required },
          special_urget_price: { required },
          sur_charge: { required },
        },
        FSR: {
          detail_type: { required },
          unit_price: { required },
          quantity: { required },
          amount: { required },
          description: { required },
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
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddBikeTripDetailsDialog",
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddBikeSendQuotationDialog",
        });
      }
    },
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
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
