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
      <h5 class="color-343434 text-sm mb-3">Monthly Minimum</h5>
    </div>
  </div>
  <div v-if="defaultTransportType == 'Van'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">No. of Units</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.van.no_of_units"
          @blur="v$.details.van.no_of_units.$model;"
          :classes="{
            'p-invalid': v$.details.van.no_of_units.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Job $</h5>
        <TextField
          label="per_job"
          type="number"
          v-model="details.van.per_job"
          @blur="v$.details.van.per_job.$model;"
          :classes="{
            'p-invalid': v$.details.van.per_job.$invalid && submitted,
            'inputfield w-fullcolor-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Amount</h5>
        <TextField
          label="amount"
          id="amount"
          type="number"
          v-model="details.van.amount"
          @blur="v$.details.van.amount.$model;"
          :classes="{
            'p-invalid': v$.details.van.amount.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Additional Job $</h5>
        <TextField
          label="additional_job"
          type="number"
          v-model="details.van.additional_job"
          @blur="v$.details.van.additional_job.$model;"
          :classes="{
            'p-invalid': v$.details.van.additional_job.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.van.billing_cycle.$model;"
          label="billing_cycle"
          :state="details.van.billing_cycle"
          :key="details.van.billing_cycle"
          v-model="details.van.billing_cycle"
          :class="{
            'p-invalid': v$.details.van.billing_cycle.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <!-- <div
      class="field col-12 md:col-12 mt-4 p-2"
      style="background: #e6e6e6; border-radius: 5px"
    >
      <span class="ml-3"> Billing settings </span>
    </div> -->
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Credit Limit $</h5>
        <TextField
          label="credit_limit"
          type="number"
          v-model="details.bill_settings.credit_limit"
          :classes="{
            'p-invalid': v$.details.bill_settings.credit_limit.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm">Credit Terms</h5>
        <TextField
          label="credit_term"
          type="number"
          v-model="details.bill_settings.credit_term"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.bill_settings.billing_cycle.$model;"
          label="billing_cycle"
          v-model="details.bill_settings.billing_cycle"
          :class="{
            'p-invalid': v$.details.bill_settings.billing_cycle.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
        <h5 class="color-7a7a7a text-sm">SMS $</h5>
        <TextField
          label="sms"
          type="number"
          v-model="details.bill_settings.sms"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div> -->
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm required">Special Urgent Price $</h5>
        <TextField
          label="special_urget_price"
          type="number"
          v-model="details.bill_settings.special_urget_price"
          :classes="{
            'p-invalid':
              v$.details.bill_settings.special_urget_price.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm required">SurCharge $</h5>
        <TextField
          label="sur_charge"
          type="number"
          v-model="details.bill_settings.sur_charge"
          :classes="{
            'p-invalid': v$.details.bill_settings.sur_charge.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm">Island Charge $</h5>
        <TextField
          label="island_charge"
          type="number"
          v-model="details.bill_settings.island_charge"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div> -->

    <!-- <p class="ml-2 mt-3 head">Trip Charges</p> -->
    <!-- <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.bill_settings.weekend_2nd_trip_charge == true
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
                details.bill_settings.saturday_2nd_trip_charge == true
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
                details.bill_settings.return_trip_charge == true
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
                details.bill_settings.return_trip_partial_charge == true
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
    </div> -->

    <!-- <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="
                details.bill_settings.collection_trip_charge == true
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
                details.bill_settings.special_monitoring == true
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
                details.bill_settings.call_centre == true
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
    </div> -->
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'FSR'">
    <div v-for="(sales, index) of addRates" :key="index">
      <div v-if="index > 0" class="flex justify-content-between">
        <div class="flex"></div>
        <div class="flex delete" @click="deleteRate(index)">
          <i class="pi parent pi-times mt-2"></i>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a text-sm">Detail Type</h5>
          <TextField
            label="detail_type"
            type="text"
            v-model="details['FSR'][index].detail_type"
            @blur="v$.details['FSR'][index].detail_type.$model;"
            :classes="{
              'p-invalid':
                v$.details['FSR'][index].detail_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a text-sm">Unit Price</h5>
          <TextField
            label="unit_price"
            type="number"
            v-model="details['FSR'][index].unit_price"
            @blur="v$.details['FSR'][index].unit_price.$model;"
            :classes="{
              'p-invalid':
                v$.details['FSR'][index].unit_price.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a text-sm">Quantity</h5>
          <TextField
            label="quantity"
            id="quantity"
            type="number"
            v-model="details['FSR'][index].quantity"
            @blur="v$.details['FSR'][index].quantity.$model;"
            :classes="{
              'p-invalid':
                v$.details['FSR'][index].quantity.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a text-sm">Amount</h5>
          <TextField
            label="amount"
            id="amount"
            type="number"
            v-model="details['FSR'][index].amount"
            @blur="v$.details['FSR'][index].amount.$model;"
            :classes="{
              'p-invalid':
                v$.details['FSR'][index].amount.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="required color-7a7a7a text-sm">Description</h5>
          <TextAreaField
            label="description"
            @blur="v$.details['FSR'][index].description.$model;"
            type="text"
            v-model="details['FSR'][index].description"
            :classes="{
              'p-invalid':
                v$.details['FSR'][index].description.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex mb-2">
      <span class="dialog-new-field mt-0" @click="addSale"
        ><b>+ Add Contact </b></span
      >
    </div>

    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Special Urgent Price</h5>
        <TextField
          label="special_urget_price"
          type="number"
          v-model="details.bill_settings.special_urget_price"
          :classes="{
            'p-invalid':
              v$.details.bill_settings.special_urget_price.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">SurCharge</h5>
        <TextField
          label="sur_charge"
          type="number"
          v-model="details.bill_settings.sur_charge"
          :classes="{
            'p-invalid': v$.details.bill_settings.sur_charge.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm">Island Charge</h5>
        <TextField
          label="island_charge"
          type="number"
          v-model="details.bill_settings.island_charge"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div> -->
  </div>

  <div
    class="field col-12 md:col-12 mt-4 p-2"
    style="background: #e6e6e6; border-radius: 5px"
  >
    <span class="ml-3 color-343434 text-sm"> Billing settings </span>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm required">Credit Limit $</h5>
      <TextField
        label="credit_limit"
        type="number"
        v-model="details.bill_settings.credit_limit"
        :classes="{
          'p-invalid':
            v$.details.bill_settings.credit_limit.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Credit Terms</h5>
      <TextField
        label="credit_term_days"
        type="number"
        v-model="details.bill_settings.credit_term_days"
        :classes="{
          'p-invalid':
            v$.details.bill_settings.credit_term_days.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Billing Cycle</h5>
      <DropDown
        code="name"
        :data="billing_cycle"
        @blur="v$.details.bill_settings.billing_cycle.$model;"
        label="billing_cycle"
        :state="details.bill_settings.billing_cycle"
          :key="details.bill_settings.billing_cycle"
        v-model="details.bill_settings.billing_cycle"
        :class="{
          'p-invalid':
            v$.details.bill_settings.billing_cycle.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <p class="ml-2 mt-4 bold-700 font-size-14 color-343434">Surcharge Charges</p>
  <div class="row pl-1">
    <div
      v-for="data of details.bill_settings.surcharges"
      :key="data.surcharge_id"
      class="field col-12 md:col-3"
    >
      <!-- <div class="col-3"> -->
      <div class="flex flex-row align-items-center">
        <SingleCheckBox
              :label= "data.surcharge_name"
              v-model="details.bill_settings.surcharges[data.selected]"
              :value="details.bill_settings.surcharges[data.selected]"
            />
        <!-- <CheckBox
          path="sales"
          v-bind:checker="
          details.bill_settings.surcharges[data.surcharge_name] == true
              ? [
                  {
                    name: data.surcharge_name,
                    tag: 'surcharges',
                    key: data.surcharge_id,
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: data.surcharge_name,
              tag: 'surcharges',
              key: data.surcharge_id,
            },
          ]"
          v-on:childToParent="checkBoxChange"
        /> -->
        <!-- </div> -->
        <div class="flex check-text ml-2">
          <!-- <label class="bold-500 font-size-14 color-7a7a7a urgent_charges">Sur Charge $</label> -->
          <TextField
            label="credit_terms"
            type="number"
            v-model="data.rates"
            :value="data.rates"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Special Urgent Price</h5>
      <TextField
        label="special_urget_price"
        type="number"
        v-model="details.bill_settings.special_urget_price"
        :classes="{
          'p-invalid':
            v$.details.bill_settings.special_urget_price.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
  </div> -->
  <p class="ml-2 mt-3 head">Trip Charges</p>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <SingleCheckBox
              label="Weekday 2nd Trip Charge"
              v-model="details.bill_settings.weekend_2nd_trip_charge"
              :value="details.bill_settings.weekend_2nd_trip_charge"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">Weekday 2nd Trip Charge</label>
        </div> -->
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <SingleCheckBox
              label="Saturday 2nd Trip Charge"
              v-model="details.bill_settings.saturday_2nd_trip_charge"
              :value="details.bill_settings.saturday_2nd_trip_charge"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">Saturday 2nd Trip Charge</label>
        </div> -->
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <SingleCheckBox
              label="Return Trip Charge"
              v-model="details.bill_settings.return_trip_charge"
              :value="details.bill_settings.return_trip_charge"
            />
           
          <!-- <div class="flex">
            <label class="checksText">Return Trip Charge</label>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
         <SingleCheckBox
              label="Return Trip Partial Charge"
              v-model="details.bill_settings.return_trip_partial_charge"
              :value="details.bill_settings.return_trip_partial_charge"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">Return Trip Partial Charge</label>
        </div> -->
      </div>
    </div>
  </div>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <SingleCheckBox
              label="Collection Trip Charge"
              v-model="details.bill_settings.collection_trip_charge"
              :value="details.bill_settings.collection_trip_charge"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">Collection Trip Charge</label>
        </div> -->
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
           <SingleCheckBox
              label="FTZ"
              v-model="details.bill_settings.FTZ"
              :value="details.bill_settings.FTZ"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">FTZ</label>
        </div> -->
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
            <SingleCheckBox
              label="Special Monitoring"
              v-model="details.bill_settings.special_monitoring"
              :value="details.bill_settings.special_monitoring"
            />
          <!-- <div class="flex">
            <label class="checksText">Special Monitoring</label>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
           <SingleCheckBox
              label="Call Center" 
              v-model="details.bill_settings.call_centre"
              :value="details.bill_settings.call_centre"
            />
        </div>
        <!-- <div class="flex">
          <label class="checksText">Call Center</label>
        </div> -->
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
        class="p-button-outlined mr-1 text-sm color-357dea font-bold"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea font-bold"
        />
        <Buttons
          label="Next"
          button_class="next-button"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../../DuoSelect.vue";
import { mapGetters } from "vuex";

export default {
  name: "  SalesExpressContractVanFSRFourthStep ",
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
    addSalesClicked: 0,
    surcharges: [],
    addRates: ["new_sales"],
    ratesValidation: [
      {
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
      },
    ],
    surchargesData: {},
    details: {
      van: {
        per_job: "",
        no_of_units: "",
        amount: "",
        additional_job: "",
        billing_cycle: "",
      },
      FSR: [
        {
          detail_type: "",
          unit_price: "",
          quantity: "",
          amount: "",
          description: "",
        },
      ],
      bill_settings: {
        credit_limit: "",
        credit_term_days: "",
        billing_cycle: "",
        // sms: "",
        // special_urget_price: "",
        // sur_charge: "",
        // island_charge: "",
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_monitoring: false,
        call_centre: false,
        surcharges: [
          {
            surcharge_name: "SMS",
            rate: 0.0,
            selected: false,
            surcharge_id: true,
          },

          {
            surcharge_name: "Sur Charge",
            rates: 0.0,
            selected: false,
            surcharge_id: true,
          },
          {
            surcharge_name: "Island Charge",
            rates: 0.0,
            selected: false,
            surcharge_id: true,
          },
          {
            surcharge_name: "FTZ",
            rates: 0.0,
            selected: false,
            surcharge_id: true,
          },
        ],
      },
    },
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          van: {
            per_job: { required },
            no_of_units: { required },
            amount: { required },
            additional_job: { required },
            billing_cycle: { required },
          },
          FSR: this.ratesValidation,
          bill_settings: {
            credit_limit: { required },
            credit_term_days: { required },
            billing_cycle: { required },
          },
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
       expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
    }),
  },
  methods: {
    checkBoxChange(val, src) {
      if (val.length != 0 && val[0].tag != "surcharges") {
        this.details.bill_settings[val[0].name] = true;
      }
      if (val.length != 0 && val[0].tag == "surcharges") {
        this.details.bill_settings.surcharges[0].selected = true;
      }
      if (val.length == 0) {
        this.details.bill_settings[src[0].name] = false;
      }
      if (val.length == 0 && val[0].tag == "surcharges") {
        this.details.bill_settings.surcharges[0].selected = false;
      }
    },
    goBack() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractVanFSRThirdStep",
      });
    },
    nextStepHandler() {
      console.log(this.details, "details page4");
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.expressContractVanFSRAddNewData.quotation["bill_settings"] = {};
        for (let i in this.details.bill_settings) {
          if (i != "surcharges") {
            this.expressContractVanFSRAddNewData.quotation["bill_settings"][i] =
              this.details.bill_settings[i];
          } else if (i == "surcharges") {
            this.expressContractVanFSRAddNewData.quotation.bill_settings[
              "surcharges"
            ] = [];
            this.details.bill_settings.surcharges.map((list) => {
              this.expressContractVanFSRAddNewData.quotation.bill_settings[
                "surcharges"
              ].push({
                surcharge_id: list.surcharge_id,
                surcharge_name: list.surcharge_name,
                rates: list.rates,
                selected: list.selected,
              });
            });
          }
        }
        for (let i in this.details) {
          if (i == "van") {
            this.expressContractVanFSRAddNewData.quotation["costing_details"] =
              {};
            this.expressContractVanFSRAddNewData.quotation.costing_details[
              "van"
            ] = {};
            this.expressContractVanFSRAddNewData.quotation.costing_details[
              "van"
            ] = this.details.van;
          }
          if (i == "FSR") {
            console.log("VanexpressContractVanFSRAddNewData34343");
            this.expressContractVanFSRAddNewData.quotation.costing_details[
              "fsr"
            ] = {};
            this.expressContractVanFSRAddNewData.quotation.costing_details.fsr[
              "rates"
            ] = [];
            this.expressContractVanFSRAddNewData.quotation.costing_details.fsr[
              "rates"
            ] = this.details.FSR;
          }
        }
        console.log(this.expressContractVanFSRAddNewData, "Data FourthPage");
        // this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        //     step: "SalesExpressContractBikeFSRFifthStep",
        //   });

        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractVanFSRFifthStep",
        });
        console.log(this.expressContractVanFSRAddNewData, "details page4");
      }
    },
       async processNoOfUnitsHandler() {
      this.$store.dispatch("salesSales/processNoOfUnitsHandler", {
        path: "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/van/" +
             1,
        data: {
            units: this.details.van.no_of_units,
          },
        method: "POST",
        loadData: "loadCostCenterData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate is fetched successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rate already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error fetching the rate, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    // async processNoOfUnitsHandler() {
    //   axios
    //     .post(
    //       "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/van/" +
    //         1,
    //       {
    //         units: this.details.van.no_of_units,
    //       }
    //     )
    //     .then((res) => {
    //       if (res.data.results) {
    //         // console.log(res.data.results, "job");
    //         this.details.van.per_job = res.data.results.jobs;
    //       }
    //     });
    // },
    async changeAmountHandler() {
      this.details.van.amount =
        this.details.van.no_of_units * this.details.van.per_job;
      // console.log(this.details.Bike.amount, "amount");
    },
    async getsurchargeChargesData() {
      let respectiveData =
        this.expressContractVanFSRAddNewData.quotation.rate_card_id;
      this.region = [];
      await axios
        .get(
          "/settings/sales/rates/express/contract/ratecards/AdditionalSurcharges/" +
            respectiveData
        )
        .then((res) => {
          if (res.data.results) {
            this.surcharges = res.data.results;

            this.details.bill_settings.surcharges = [];
            this.surcharges.map((list, index) => {
              this.surchargesData[list.surcharge_name] = list.rates;
              list["selected"] = false;

              this.details.bill_settings.surcharges.push({
                surcharge_id: list.surcharge_id,
                surcharge_name: list.surcharge_name,
                rates: list.rates,
                selected: list.selected,
              });
            });
          }
        });
    },
    addSale() {
      this.details.FSR.push({
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      });
      this.ratesValidation.push({
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
      });
      this.addSalesClicked++;
      this.addRates.push("new_sales");
    },
    deleteRate(index) {
      this.details.FSR.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addSalesClicked++;
    },
     async populateRates() {
      let ratesStateData = this.expressContractVanFsrOverviewData.express_contract[0].fsr;
      this.details.FSR = ratesStateData;
      if (ratesStateData.length > 0) {
        this.addRates = [];
        this.details.FSR = [];
        // this.imageArray = [];

        this.ratesValidation = [];
        for (let cs in ratesStateData) {
          this.addRates.push("existing_contact");
          let cd_obj = ratesStateData[cs];
          let detailsRatesObj = {};
          //
          // this.imageArray.push(ratesStateData[cs].profile_url);
          let ratesValidationObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "detail_type" ||
              cd_obj_keys == "unit_price" ||
              cd_obj_keys == "quantity" ||
              cd_obj_keys == "amount" ||
              cd_obj_keys == "description"
            ) {
              detailsRatesObj[cd_obj_keys] = cd_obj[cd_obj_keys];
              ratesValidationObj[cd_obj_keys] = { required };
            }
          }
          // this.details.contacts[index] = {};
          // if (this.details.contacts && this.details.contacts.length > 0) {
          this.details.FSR.push(detailsRatesObj);
          
          this.ratesValidation.push(ratesValidationObj);
          // }
        }
      }
    },
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
    "details.van.no_of_units": async function () {
      await this.processNoOfUnitsHandler();
      await this.changeAmountHandler();
    },
    "details.van.per_job": async function () {
      await this.changeAmountHandler();
    },
  },
  async created() {
    if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length == 0
    ) {
    await this.getsurchargeChargesData();
    // await this.BikeCustomerVanjob();

    }
    if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length != 0
    ) {
      console.log(this.expressContractVanFsrOverviewData, "Preload data 4");
       // let regionNAme;
      // regionNAme = this.region.find((list) => 
      // list.id === this.expressContractBikeFsrOverviewData.express_contract[0].region_id
      
      // );
      // console.log(regionNAme, "Region Value")
      // this.details.region = regionNAme.name;
      
      // let billingCycle = this.expressContractBikeFsrOverviewData.express_contract[0].bike.billing_cycle;
      //   this.billing_cycle.map((billing) => {
      //     console.log(billing.name, "Region Value", billingCycle, billingCycle.billing)
      //     if(billing.name == billingCycle){
      //       this.details.Bike.billing_cycle = billing.name;
      //     }
      //   });
      for(let i in this.details.bill_settings){
        this.details.bill_settings[i] = this.expressContractVanFsrOverviewData.express_contract[0].bill_settings[0][i];
      }
      for(let i in this.details.van){
        this.details.van[i] = this.expressContractVanFsrOverviewData.express_contract[0].van[i];
      }
      // this.expressContractBikeFsrOverviewData.express_contract[0].bill_settings[0].map((list) =>{
      //   this.details.bill_settings.push({
      //         FTZ: list.FTZ, billing_cycle: list.billing_cycle, call_centre: list.call_centre, collection_trip_charge: list.collection_trip_charge,
      //         credit_limit: list.credit_limit, credit_term_days: list.credit_term_days, return_trip_charge: list.return_trip_charge, return_trip_partial_charge: list.return_trip_partial_charge,
      //         saturday_2nd_trip_charge: list.saturday_2nd_trip_charge, special_monitoring: list.special_monitoring,van_job_add_cost: list.van_job_add_cost,van_job_add_cost_kg: list.van_job_add_cost_kg,
      //         van_job_min_cost: list.van_job_min_cost,van_job_min_cost_kg: list.van_job_min_cost_kg,
      //         van_job_urgent_surcharges: list.van_job_urgent_surcharges, weekend_2nd_trip_charge: list.weekend_2nd_trip_charge,
      //       });
      // }) 
      this.expressContractVanFsrOverviewData.express_contract[0].bill_settings[0].surcharges.map((list, index) => {
            // this.surchargesData[list.surcharge_name] = list.rates;
            // list['selected'] = false;
            
            this.details.bill_settings.surcharges.push({
              surcharge_id: list.surcharge_id,
              surcharge_name: list.surcharge_name,
              rates: list.rates,
              selected: list.selected,
            });
          });
      // this.details.bill_settings.surcharges = this.expressContractBikeFsrOverviewData.express_contract[0].bill_settings[0].surcharges;
        // this.details.Bike = this.expressContractBikeFsrOverviewData.express_contract[0].bike;
        // this.details.bill_settings = this.expressContractBikeFsrOverviewData.express_contract[0].bill_settings[0];
        
        this.details.FSR = this.expressContractVanFsrOverviewData.express_contract[0].fsr;
        console.log(this.details.FSR , "fsrrrr")
         if (this.expressContractVanFsrOverviewData.express_contract[0].fsr.length > 0) {
           await this.populateRates();
       }
    }
    await this.getsurchargeChargesData();
    
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
.next-button {
  background-color: #357dea;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
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
