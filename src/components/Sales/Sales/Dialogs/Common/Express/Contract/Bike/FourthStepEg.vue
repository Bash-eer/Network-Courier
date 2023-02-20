<template>
  <Accordion :activeIndex="0" class="mt-6">
    <AccordionTab header="Normal (Monthly Minimum)">
      <!-- <div class="mr-top mt-6">
    <Panel :toggleable="true" :collapsed="collapsed">
      <template #icons>
        <div @click="toggle" class="icon-wrapper">
          <span v-if="collapsed" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>
      <template #header>
        
        <div @click="toggle" class="flex sub-title full-width pointer bold-700 font-size-14 color-434344 bg-f3f7ff pl-2">
          <RadioButtons
            label="E-commerece"
            state="headerData"
            radioButtonData="1"
            class="bold-700 font-size-12 color-919191"/>
            Normal (Monthly Minimum)
        </div>
      </template> -->
      <div class="dropDownField">
        <div class="formgrid grid flex">
          <div class="col-12 md:col-4">
            <label class="required bold-500 font-size-14 color-7a7a7a"
              >No.of Units</label
            >
            <TextField
              label="surcharge"
              type="number"
              v-model="details.normal_rates.no_of_units"
              :classes="{
                'p-invalid':
                  v$.details.normal_rates.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="col-12 md:col-4">
            <h5 class="required bold-500 font-size-14 color-7a7a7a">Job $</h5>
            <TextField
              label="surcharge_minimum_parcels"
              type="number"
              v-model="details.normal_rates.per_job"
              :classes="{
                'p-invalid':
                  v$.details.normal_rates.per_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="col-12 md:col-4">
            <label class="required bold-500 font-size-14 color-7a7a7a"
              >Amount</label
            >
            <TextField
              disabled="true"
              label="surcharge"
              type="number"
              v-model="details.normal_rates.amount"
              :classes="{
                'p-invalid':
                  v$.details.normal_rates.amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid mt-5">
          <div class="col-12 md:col-4">
            <label class="required bold-500 font-size-14 color-7a7a7a"
              >Additional Job $</label
            >
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.normal_rates.additional_job"
              :classes="{
                'p-invalid':
                  v$.details.normal_rates.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>

      <!-- </Panel>
  </div> -->
    </AccordionTab>
    <AccordionTab header="E-commerece">
      <!-- <div class="mr-top "> -->
      <!-- <h5>Select Rate *</h5> -->
      <!-- <Panel :toggleable="true" :collapsed="collapsed2">
      <template #icons>
        <div @click="toggle2" class="icon-wrapper">
          <span v-if="collapsed2" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>

      <template #header class="bg-f3f7ff">
        <div @click="toggle2" class="flex sub-title full-width pointer bold-700 font-size-14 color-434344 bg-f3f7ff pl-2"> 
        <RadioButtons
            label="E-commerece"
            state="headerData"
            radioButtonData="1"
            class="bold-700 font-size-12 color-919191"
          /> E-commerece</div>
      </template> -->

      <div>
        <AccordionTab header="Type 1: Rate 1A"> </AccordionTab>
      </div>
      <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Same Night Delivery',
                        tag: 'Same Night Delivery',
                        key: 'Same Night Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Same Night Delivery',
                  tag: 'Same Night Delivery',
                  key: 'Same Night Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Next Day Delivery',
                        tag: 'Next Day Delivery',
                        key: 'Next Day Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Next Day Delivery',
                  tag: 'Next Day Delivery',
                  key: 'Next Day Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Regular Delivery',
                        tag: 'Regular Delivery',
                        key: 'Regular Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Regular Delivery',
                  tag: 'Regular Delivery',
                  key: 'Regular Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md">
        <div class="row table_div">
          <div class="col-12 table-color mt-4">
            <div class="p-1 mt-2">
              <DuoSelection
                :options="[
                  'Same Night Delivery',
                  'Next Day Delivery',
                  'Regular Delivery',
                ]"
                :default="defaultTransportType"
                type="setRegionDeliveryTransportType"
              />
            </div>
            <div class="table-content mb-2">
              <div v-if="defaultTransportType == 'Same Night Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="
                      $store.state.quotation.SalesRapidoChargesTableData != null
                    "
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="
                      $store.state.quotation.SalesRapidoChargesTableData
                    "
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
              <div v-if="defaultTransportType == 'Next Day Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="
                      $store.state.quotation.SalesRapidoChargesTableData != null
                    "
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="
                      $store.state.quotation.SalesRapidoChargesTableData
                    "
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
              <div v-if="defaultTransportType == 'Regular Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="
                      $store.state.quotation.SalesRapidoChargesTableData != null
                    "
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="
                      $store.state.quotation.SalesRapidoChargesTableData
                    "
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text">Surcharge ($)</label>
          <TextField
            label="surcharge"
            type="number"
            v-model="details.surcharge"
            :classes="{
              'p-invalid': v$.details.surcharge.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Surcharge Minimum Parcels</h5>
          <TextField
            label="surcharge_minimum_parcels"
            type="number"
            v-model="details.surcharge_minimum_parcels"
            :classes="{
              'p-invalid':
                v$.details.surcharge_minimum_parcels.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text">COD Fee ($)</label>
          <TextField
            label="cod_fee"
            type="number"
            v-model="details.cod_fee"
            :classes="{
              'p-invalid': v$.details.cod_fee.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">
            COD Fee (% of cash collected)
          </h5>
          <TextField
            label="cod_fee_cash"
            type="number"
            v-model="details.cod_fee_cash"
            :classes="{
              'p-invalid': v$.details.cod_fee_cash.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text"
            >Timeslot Delivery (Fixed 2 hours)</label
          >
          <TextField
            label="timeslot_delivery"
            type="number"
            v-model="details.timeslot_delivery"
            :classes="{
              'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Standard Liability</h5>
          <TextField
            label="standard_liability"
            type="number"
            v-model="details.standard_liability"
            :classes="{
              'p-invalid': v$.details.standard_liability.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
    <!-- </Panel> -->
  </Accordion>
  <div class="billingTab mt-3">Billing settings</div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text">Credit Limit $ *</label>
      <TextField
        label="credit_limits"
        type="number"
        v-model="details.credit_limits"
        :classes="{
          // 'p-invalid': v$.details.credit_limits.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
      <TextField
        label="credit_terms"
        type="number"
        v-model="details.credit_terms"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Billing Cycle</h5>
      <DropDown
        code="name"
        :data="billing_cycle"
        @blur="v$.details.billing_cycle.$model;"
        label="billing_cycle"
        v-model="details.billing_cycle"
        :class="{
          // 'p-invalid': v$.details.billing_cycle.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- Surcharge -->
  <p class="ml-2 mt-3 head">Surcharge Charges</p>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.SMS == true
                ? [
                    {
                      name: 'SMS',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'SMS',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text urgent_charges">SMS $</label>
          <TextField
            label="credit_terms"
            type="number"
            v-model="details.sms"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.sur_charge == true
                ? [
                    {
                      name: 'sur_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'sur_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text urgent_charges">Sur Charge $</label>
          <TextField
            label="credit_terms"
            type="number"
            v-model="details.sur_charge"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.island_charge == true
                ? [
                    {
                      name: 'island_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'island_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
          <div class="flex check-text">
            <label class="dialog-label-text urgent_charges"
              >Island Charge $</label
            >
            <TextField
              label="credit_terms"
              type="number"
              v-model="details.island_charge"
              :classes="{
                // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
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
          <div class="flex check-text">
            <label class="dialog-label-text urgent_charges">FTZ $</label>
            <TextField
              label="credit_terms"
              type="number"
              v-model="details.ftz"
              :classes="{
                // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TRIP CHARGES -->
  <p class="ml-2 mt-3 head">Trip Charges</p>
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
              details.special_urgent_charge == true
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
          <TextField
            label="FSRjob_mincost"
            type="number"
            v-model="details.special_urgent_charge_text"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!--  Bike customer Van Jobs-->
  <div class="mt-3"><h5>Bike Customer Van Jobs</h5></div>
  <p class="ml-2 mt-3 head">Charge By Weight</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Min.Cost $</label>
      <TextField
        label="van_job_min_cost"
        type="number"
        v-model="details.van_job_min_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs</label>
      <TextField
        label="Kgs"
        type="number"
        v-model="details.kgs"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Add.Cost $</label>
      <TextField
        label="van_job_add_cost"
        type="number"
        v-model="details.van_job_add_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs $</label>
      <TextField
        label="kgs2"
        type="number"
        v-model="details.kgs2"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges"
        >Van Job Urgent.Surcharge $</label
      >
      <TextField
        label="van_job_urgent_surcharge"
        type="number"
        v-model="details.van_job_urgent_surcharge"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales color-357dea" label="Cancel"/>
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
// import Panel from "primevue/panel";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../../DuoSelect.vue";

export default {
  name: "SalesExpressContractBikeFourthStep",
  components: { DuoSelection, Accordion, AccordionTab },
  data() {
    return {
      defaultTransportType: "Same Night Delivery",
      collapsed: true,
      collapsed2: true,
      v$: useVuelidate(),
      billing_cycle: [
        { name: "Weekly", code: "USD" },
        { name: "Monthly", code: "SGD" },
      ],
      details: {
        charge_type: "normal",
        normal_rate_card_id: "32",
        normal_rate_card_name: "Test cards2",
        selected_normal: "true",
        normal_rates: {
          no_of_units: "",
          per_job: "",
          amount: "",
          additional_job: "",
        },
      },
      // details: {
      //   acknowledgement: false,
      //   surcharge: "",
      //   surcharge_minimum_parcels: "",
      //   cod_fee: "",
      //   cod_fee_cash: "",
      //   timeslot_delivery: "",
      //   standard_liability: "",
      //   //
      //   credit_limits: "",
      //   credit_terms: "",
      //   billing_cycle: "",
      //   sms: "",
      //   sur_charge: "",
      //   island_charge: "",
      //   ftz: "",
      //   weekend_2nd_trip_charge: false,
      //   saturday_2nd_trip_charge: false,
      //   return_trip_charge: false,
      //   return_trip_partial_charge: false,
      //   collection_trip_charge: false,
      //   special_urgent_charge: false,
      //   special_urgent_charge_text: "",
      //   van_job_min_cost: "",
      //   kgs: "",
      //   van_job_add_cost: "",
      //   kgs2: "",
      //   van_job_urgent_surcharge: "",
      // },
    };
  },
  validations() {
    return {
      // details: {
      //   surcharge: { required },
      //   surcharge_minimum_parcels: { required },
      //   cod_fee: { required },
      //   cod_fee_cash: { required },
      //   timeslot_delivery: { required },
      //   standard_liability: { required },
      // },
      details: {
        normal_rates: {
          no_of_units: { required },
          per_job: { required },
          amount: { required },
          additional_job: { required },
        },
        surcharge: { required },
        surcharge_minimum_parcels: { required },
        cod_fee: { required },
        cod_fee_cash: { required },
        timeslot_delivery: { required },
        standard_liability: { required },
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
    toggle() {
      this.collapsed = !this.collapsed;
    },
    toggle2() {
      this.collapsed2 = !this.collapsed2;
    },
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeThirdStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractBikeFifthStep",
        });
      }
    },
    async processNoOfUnitsHandler() {
      axios
        .post(
          "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/bike/" +
            31,
          {
            units: this.details.normal_rates.no_of_units,
          }
        )
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "ratecar");
            this.details.normal_rates.per_job = res.data.results.jobs;
            // for (let c in res.data.results) {
            //   res.data.results[c]["name"] =
            //     res.data.results[c]["rate_card_name"];
            //   this.rates.push(res.data.results[c]);
            //   // this.toZoneData.push(res.data.results[c]);
            // }
          }
        });
    },
    async changeAmountHandler() {
      this.details.normal_rates.amount =
        this.details.normal_rates.no_of_units *
        this.details.normal_rates.per_job;
      console.log(this.details.normal_rates.amount, "amount");
    },
  },
  watch: {
    "details.normal_rates.no_of_units": async function () {
      await this.processNoOfUnitsHandler();
      await this.changeAmountHandler();
    },
    "details.normal_rates.per_job": async function () {
      await this.changeAmountHandler();
    },
  },
};
</script>
<style lang="scss" scoped>
.acknowledgement-row {
  gap: 4rem;
}
::v-deep .p-panel-header {
  background: #edf1f7 !important;
  border: none !important;
  border: 1px solid #02003826 !important;
  border-radius: 5px !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
  padding: 0.5rem !important;
}
.table-color {
  background: #e1eaf9;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
::v-deep .p-panel .p-panel-content {
  border: none !important;
}

::v-deep .p-panel .p-panel-header .p-panel-header-icon {
  display: none !important;
}
.padding-y {
  padding: 0.5rem 0 !important;
}
::v-deep .p-column-header-content {
  color: #7e84a7;
  font-weight: 600;
  font-size: 12px;
}
::v-deep .checksText {
  color: #7e84a7 !important;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
.icon-wrapper {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(2, 0, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
::v-deep .dropDownField {
  padding: 10px;
  padding-bottom: 50px;
  border: 0.5px solid #357dea !important;
  background: rgba(243, 247, 255, 0.3) !important;
  margin: 0;
}
::v-deep .billingTab {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-radius: 8px;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: 700;
  color: #343434;
}
</style>
