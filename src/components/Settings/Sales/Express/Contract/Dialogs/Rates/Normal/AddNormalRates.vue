<template>
  <div class="p-2 mt-2" :key='renderKey'>
    <!--trips/rates type selection-->
    <DuoSelection
      :options="['Trips', 'Rates']"
      :default="defaultTripOrRatesType"
      type="setTripsOrRates"
    />

    <!------------------------------------TRIPS FIELDS : STARTS HERE------------------------------------->
    <span v-if="defaultTripOrRatesType == 'Trips'">
      <div class="mt-5">
        <DuoSelection
          :options="['Bike', 'Van']"
          :default="defaultTransportType"
          type="setTransportType"
        />
        <!-- <ColumnGroupedTable /> -->
      </div>
      <p class="txt mt-5 add_rates">Add Rates</p>

      <div v-if="defaultTransportType == 'Bike'">
        <!-- <FormTable
          formTableDataName="tripBikeTableDatas"
          :selectionModeState="selectionModeState1"
          dataKey="id"
          v-model="details.tripBikeTableDatas"
           :tableData="tripBikeTableDatas"
          :tableColumns="expressContractTripsData"
 storePath="express"        /> -->
  
            <DataTable v-model:selection="details.selectedBikeItem"  :value="tripBikeTableDatas" responsiveLayout="scroll">
             <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column v-for="col of expressContractTripsData" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable>
      </div>
      <div v-if="defaultTransportType == 'Van'">
        <!-- <FormTable
          formTableDataName="tripVanTableDatas"
          :selectionModeState="selectionModeState2"
          dataKey="id"
           v-model="details.tripVanTableDatas"
           :tableData="tripVanTableDatas"
          :tableColumns="expressContractTripsData"
          
        /> -->
        <DataTable v-model:selection="details.selectedVanItem"  :value="tripVanTableDatas" responsiveLayout="scroll">
             <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column v-for="col of expressContractTripsData" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable>
      </div>
      <!-- <div>
        <DataTable :value="tripBikeTableDatas" responsiveLayout="scroll">
            <Column v-for="col of expressContractTripsData" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable>
    </div> -->
      <div></div>
    </span>
    <!------------------------------------TRIPS FIELDS : ENDS HERE------------------------------------->

    <!------------------------------------RATES FIELDS : STARTS HERE------------------------------------->
    <span v-if="defaultTripOrRatesType == 'Rates'">
      <!--transport type selection (BIKE/VAN)-->
      <div class="mt-5">
        <DuoSelection
          :options="['Bike', 'Van']"
          :default="defaultTransportType"
          type="setTransportType"
        />
      </div>

      <!--ADD RATES (BIKE/VAN) : STARTS HERE-->
      <p class="txt mt-5 add_rates">Add Rates</p>
      <div v-for="(rate, index) of addRates" :key="rate">
        <div v-if="index > 0" class="flex justify-content-between">
          <div class="flex"></div>
          <div class="flex delete" @click="deleteRate(index)">
            <i class="pi pi-times mt-2"></i>
          </div>
        </div>
        <!--fields row one-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text required">
              Minimum Monthly Units (Dispatches)
            </h5>
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <NumberField
                  v-model="details[defaultNormalRatesType][index].min_unit"
                  :showButtons="true"
                  mode="decimal"
                  :max='0'
                  :maxFractionDigits='2'
                  :classes="{
                    'p-invalid':
                      v$.details[defaultNormalRatesType][index].min_unit
                        .$invalid && submitted,
                    'rates inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-6">
                <NumberField
                  v-model="details[defaultNormalRatesType][index].max_unit"
                  :showButtons="true"
                  mode="decimal"
                  :max='0'
                  :maxFractionDigits='2'
                  :classes="{
                    'p-invalid':
                      v$.details[defaultNormalRatesType][index].max_unit
                        .$invalid && submitted,
                    'rates inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text required">Units Rate($)</h5>
            <NumberField
              v-model="details[defaultNormalRatesType][index].rate"
              id="UnitRate"
              mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'p-invalid':
                  v$.details[defaultNormalRatesType][index].rate.$invalid &&
                  submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-content-between add_rate ml-3">
        <div class="flex">
          <span class="new-field" @click="addRate"><b>+ Add Rate</b></span>
        </div>
      </div>
      <!--ADD RATES (BIKE/VAN) : ENDS HERE-->

      <!--VAN SPECIFIC FIELDS: STARTS HERE-->
      <span v-if="defaultTransportType == 'Van'">
        <div class="formgrid grid mt-2">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Van Job Urgent. Surcharge $</h5>
            <NumberField
              id="van_job_urgent_surcharge"
              mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              v-model="details.nomal_van_job_urgent_surcharge"
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </span>
      <!--VAN SPECIFIC FIELDS: ENDS HERE-->

      <hr class="divider" />

      <!--BIKE SPECIFIC FIELDS: STARTS HERE-->
      <span v-if="defaultTransportType == 'Bike'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <span class="section-text">Bike Customer Van job</span>
          </div>
        </div>
        <!--fields row one-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
            <NumberField
              label="van_job_min_cost"
              id="van_job_min_cost"
              mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              v-model="details['normal_bike_customer_van_job'].van_job_min_cost"
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Maximum Weight (Kg)</h5>
            <NumberField
              label="maximum_weight"
              id="maximum_weight"
              mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              v-model="details['normal_bike_customer_van_job'].maximum_weight"
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
        <!--fields row two-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
            <NumberField
              label="van_job_add_cost"
              id="van_job_add_cost"
              v-model="details['normal_bike_customer_van_job'].van_job_add_cost"
              mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Van Job Add. Weight (Kg)</h5>
            <NumberField
              label="van_job_add_weight"
              id="van_job_add_weight"
              v-model="
                details['normal_bike_customer_van_job'].van_job_add_weight
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
        <!--fields row three-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Van Job Urgent. Surcharge $</h5>
            <NumberField
              label="van_job_urgent_surcharge"
              id="van_job_urgent_surcharge"
              v-model="
                details['normal_bike_customer_van_job'].van_job_urgent_surcharges
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </span>
      <!--BIKE SPECIFIC FIELDS: ENDS HERE-->

      <!--VAN SPECIFIC FIELDS: STARTS HERE-->
      <span v-if="defaultTransportType == 'Van'">
        <!--2 TIER RATES : STARTS HERE-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <span class="section-header">2-Tier Rates</span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <!--2-tier rate selection (Charge by Weight/Charge by Quantity)-->
            <DuoSelection
              :options="['Charge by Weight', 'Charge by Quantity']"
              :default="defaultTwoTierRateType"
              type="setTwoTierRateType"
            />
          </div>
        </div>
        <!--fields row one-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text">
              <span v-if="defaultTwoTierRateType == 'Charge by Weight'">
                Maximum Weight (Kg)</span
              >
              <span v-else>Maximum Quantity</span>
            </h5>
            <NumberField
              v-model="
                details[defaultNormalTwoTierRatesType][
                  defaultTwoTierRateType == 'Charge by Weight'
                    ? 'maximum_weight'
                    : 'maximum_quantity'
                ]
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text">
              <span v-if="defaultTwoTierRateType == 'Charge by Weight'">
                Van Job Addl. Weight (Kg)</span
              >
              <span v-else>Van Job Add. Quantity</span>
            </h5>
            <NumberField
              v-model="
                details[defaultNormalTwoTierRatesType][
                  defaultTwoTierRateType == 'Charge by Weight'
                    ? 'van_job_add_weight'
                    : 'van_job_add_quantity'
                ]
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
            <NumberField
              v-model="
                details[defaultNormalTwoTierRatesType]['van_job_add_cost']
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
        <!--CHARGE BY QUANTITY SPECIFIC FIELDS : STARTS HERE-->
        <span v-if="defaultTwoTierRateType == 'Charge by Quantity'">
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <span class="section-text">Box Count Charges</span>
            </div>
          </div>
          <!--ADD BOX COUNT RATES : STARTS HERE-->
          <div v-for="(rate, index) of addBoxCountRates" :key="rate">
            <div v-if="index > 0" class="flex justify-content-between">
              <div class="flex"></div>
              <div
                class="flex delete"
                @click="
                  deleteBoxCountRates(
                    'normal_van_two_tier_rates_charge_by_quantity_box_count_charges',
                    index
                  )
                "
              >
                <i class="pi pi-times mt-2"></i>
              </div>
            </div>
            <!--fields row one-->
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">Boxes Count</h5>
                <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <NumberField
                  v-model="
                    details[
                      'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                    ][index].min_box
                  "
                  :showButtons="true"
                  mode="decimal"
                  :max="0"
                  :classes="{
                    'p-invalid':
                      v$.details[
                        'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                      ][index].min_box.$invalid && submitted,
                    'rates inputfield w-full dialog-field-text ': true,
                  }"
                />
                </div>
                <div class="field col-12 md:col-6">
                  <NumberField
                  v-model="
                    details[
                      'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                    ][index].max_box
                  "
                  :showButtons="true"
                  mode="decimal"
                  :max="0"
                  :classes="{
                    'p-invalid':
                      v$.details[
                        'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                      ][index].max_box.$invalid && submitted,
                    'rates inputfield w-full dialog-field-text ': true,
                  }"
                />
                </div>
              </div>
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text required">Rate ($)</h5>
                <NumberField
                  v-model="
                    details[
                      'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                    ][index].rate
                  "
                  label="UnitRate"
                  mode='decimal'
                  :max='0'
                  :maxFractionDigits='2'
                  :classes="{
                    'p-invalid':
                      v$.details[
                        'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                      ][index].rate.$invalid && submitted,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-content-between add_rate ml-3">
            <div class="flex">
              <span
                class="new-field"
                @click="
                  addBoxCountRate(
                    'normal_van_two_tier_rates_charge_by_quantity_box_count_charges'
                  )
                "
                ><b>+ Add Rate</b></span
              >
            </div>
          </div>
          <!--ADD BOX COUNT RATES : STARTS HERE-->
        </span>
        <!--CHARGE BY QUANTITY SPECIFIC FIELDS : ENDS HERE-->
        <!--2 TIER RATES : ENDS HERE-->

        <hr class="divider" />

        <!--MULTI TIER CHARGES : STARTS HERE-->
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <span class="section-header">Multi-Tier Charges</span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <!--multi tier rate selection (Charge by Quantity/Charge by Job Count)-->
            <DuoSelection
              :options="['Charge by Quantity', 'Charge by Job Count']"
              :default="defaultMultiTierRateType"
              type="setMultiTierRateType"
            />
          </div>
        </div>
        <div v-for="(rate, index) of addMultiTierRates" :key="rate">
          <div v-if="index > 0" class="flex justify-content-between">
            <div class="flex"></div>
            <div
              class="flex delete"
              @click="
                deleteMultiTierRates(
                  defaultMultiTierRateType == 'Charge by Quantity'
                    ? 'normal_van_multi_tier_rates_charge_by_quantity'
                    : 'normal_van_multi_tier_rates_charge_by_job_count',
                  index
                )
              "
            >
              <i class="pi pi-times mt-2"></i>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text required">
                <span v-if="defaultMultiTierRateType == 'Charge by Quantity'"
                  >No of Boxes</span
                >
                <span v-else>No of Jobs</span>
              </h5>
              <!--fields row one-->
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <NumberField
                    v-model="
                      details[defaultNormalMultiTierRatesType][index][
                        defaultMultiTierRateType == 'Charge by Quantity'
                          ? 'min_boxes'
                          : 'min_jobs'
                      ]
                    "
                    :showButtons="true"
                    mode='decimal'
                    :max='0'
                    :maxFractionDigits='2'
                    :classes="{
                      'p-invalid':
                        v$.details[defaultNormalMultiTierRatesType][index][
                          defaultMultiTierRateType == 'Charge by Quantity'
                            ? 'min_boxes'
                            : 'min_jobs'
                        ].$invalid && submitted,
                      'rates inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-6">
                  <NumberField
                    v-model="
                      details[defaultNormalMultiTierRatesType][index][
                        defaultMultiTierRateType == 'Charge by Quantity'
                          ? 'max_boxes'
                          : 'max_jobs'
                      ]
                    "
                    :showButtons="true"
                    mode="decimal"
                    :max="0"
                    :classes="{
                      'p-invalid':
                        v$.details[defaultNormalMultiTierRatesType][index][
                          defaultMultiTierRateType == 'Charge by Quantity'
                            ? 'max_boxes'
                            : 'max_jobs'
                        ].$invalid && submitted,
                      'rates inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text required">Rate ($)</h5>
              <NumberField
                v-model="details[defaultNormalMultiTierRatesType][index].rate"
                mode='decimal'
                :max='0'
                :maxFractionDigits='2'
                :classes="{
                  'p-invalid':
                    v$.details[defaultNormalMultiTierRatesType][index].rate
                      .$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-content-between add_rate ml-3">
          <div class="flex">
            <span
              class="new-field"
              @click="
                addMultiTierRate(
                  defaultMultiTierRateType == 'Charge by Quantity'
                    ? 'normal_van_multi_tier_rates_charge_by_quantity'
                    : 'normal_van_multi_tier_rates_charge_by_job_count'
                )
              "
              ><b>+ Add Rate</b>
            </span>
          </div>
        </div>
        <hr class="divider" />
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <span class="section-text">Van Customer Bike job</span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text required">Min Charge per Job ($)</h5>
            <NumberField
              v-model="
                details['normal_van_customer_bike_job'].min_charge_per_job
              "
               mode='decimal'
              :max='0'
              :maxFractionDigits='2'
              :classes="{
                'p-invalid':
                  v$.details['normal_van_customer_bike_job'].min_charge_per_job
                    .$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
        <!--MULTI TIER CHARGES : ENDS HERE-->
      </span>
      <!--VAN SPECIFIC FIELDS: ENDS HERE-->
    </span>
    <!------------------------------------RATES FIELDS : ENDS HERE------------------------------------->

    <!--navigation buttons-->
    <div class="mt-5">
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-start
          flex-wrap
        "
      >
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="expressContract" />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
    <!--navigation buttons-->
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {mapActions} from 'vuex';
// import ColumnGroupedTable from "../../../Tables/ColumnGroupedTable.vue";
import DuoSelection from "../../../DuoSelect.vue";
import { expressContractTripsData, ADD_RATES_STEPS } from "../../../const/const.js";
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
export default {
  props: {
    tripBikeTableDatas: {
      type: Array,
      default: () => [],
    },
     tripVanTableDatas: {
      type: Array,
      default: () => [],
    },
  },
  // props: ["region","tripBikeTableDatas"],
  components: {
    DuoSelection,
    DataTable,
    Column,
},
  mounted() {
  this.details.selectedBikeItem=[];
  this.details.selectedVanItem=[];

  },
  data: () => ({
    v$: useVuelidate(),
    selectedProducts:null,
    selectionModeState1:null,
    selectionModeState2:null,
    submitted: false,
    expressContractTripsData,
    addRatesClicked: 0,
   
    defaultTripOrRatesType: "Trips",

    //RATES (BIKE/VAN)
    defaultTransportType: "Bike",
    defaultNormalRatesType: "normal_bike_rates",
    addRates: ["new_rate"],
    normal_bike_rates_validation: [
      {
        min_unit: { required },
        max_unit: { required },
        rate: { required },
      },
    ],
    normal_van_rates_validation: [
      {
        min_unit: { required },
        max_unit: { required },
        rate: { required },
      },
    ],

    //2 TIER RATES (VAN)
    //charge by weight/charge by quantity
    defaultTwoTierRateType: "Charge by Weight",
    defaultNormalTwoTierRatesType: "normal_van_two_tier_rates_charge_by_weight",
    //charge by quantity specific (box count charges)
    addBoxCountRates: ["new_box_rate"],
    normal_van_two_tier_rates_charge_by_quantity_box_count_charges_validation: [
      {
        min_box: { required },
        max_box: { required },
        rate: { required },
      },
    ],

    //MULTI TIER RATES (VAN)
    //charge by quantity/charge by job count
    defaultMultiTierRateType: "Charge by Quantity",
    defaultNormalMultiTierRatesType:
      "normal_van_multi_tier_rates_charge_by_quantity",
    addMultiTierRates: ["new_multi-tier_rate"],
    normal_van_multi_tier_rates_charge_by_quantity_validation: [
      {
        min_boxes: { required },
        max_boxes: { required },
        rate: { required },
      },
    ],
    normal_van_multi_tier_rates_charge_by_job_count_validation: [
      {
        min_jobs: { required },
        max_jobs: { required },
        rate: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      selectedBikeItem:[],
      selectedVanItem:[],
      //RATES (BIKE/VAN)
      normal_bike_rates: [
        {
          min_unit: "",
          max_unit: "",
          rate: "",
        },
      ],
      normal_van_rates: [
        {
          min_unit: "",
          max_unit: "",
          rate: "",
        },
      ],

      //BIKE CUSTOMER VAN JOB (BIKE)
      normal_bike_customer_van_job: {
        van_job_min_cost: "",
        van_job_add_cost: "",
        van_job_urgent_surcharges: "",
        maximum_weight: "",
        van_job_add_weight: "",
      },

      //URGENT SURCHARGE (VAN)
      nomal_van_job_urgent_surcharge: "",

      //VAN CUSTOMER BIKE JOB (VAN)
      normal_van_customer_bike_job: {
        min_charge_per_job: "",
      },

      //2 TIER RATES (VAN)
      //charge by weight/charge by quantity
      normal_van_two_tier_rates_charge_by_weight: {
        maximum_weight: "",
        van_job_add_weight: "",
        van_job_add_cost: "",
      },
      normal_van_two_tier_rates_charge_by_quantity: {
        maximum_quantity: "",
        van_job_add_quantity: "",
        van_job_add_cost: "",
      },
      //charge by quantity specific (box count charges)
      normal_van_two_tier_rates_charge_by_quantity_box_count_charges: [
        {
          min_box: "",
          max_box: "",
          rate: "",
        },
      ],

      //MULTI TIER RATES (VAN)
      //charge by quantity/charge by job count
      normal_van_multi_tier_rates_charge_by_quantity: [
        {
          min_boxes: "",
          max_boxes: "",
          rate: "",
        },
      ],
      normal_van_multi_tier_rates_charge_by_job_count: [
        {
          min_jobs: "",
          max_jobs: "",
          rate: "",
        },
      ],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          normal_bike_rates: this.normal_bike_rates_validation,
          normal_van_rates: this.normal_van_rates_validation,
          normal_van_two_tier_rates_charge_by_quantity_box_count_charges:
            this
              .normal_van_two_tier_rates_charge_by_quantity_box_count_charges_validation,
          normal_van_multi_tier_rates_charge_by_quantity:
            this.normal_van_multi_tier_rates_charge_by_quantity_validation,
          normal_van_multi_tier_rates_charge_by_job_count:
            this.normal_van_multi_tier_rates_charge_by_job_count_validation,
          normal_van_customer_bike_job: {
            min_charge_per_job: { required },
          },
        },
      };
    }
  },

  methods: {
    ...mapActions({setCurrentStep: 'express/setCurrentStep'}),
    async nextStepHandler() {
     
      this.$store.state.express.createRateCard= Object.assign(this.$store.state.express.createRateCard,this.details)
      
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: 'error',
          summary: 'Missing Fields',
          detail: 'One of the required fields is empty',
          life: 3000,
        });
      }

      if (
        this.v$.$invalid &&
        this.$store.state.expressContract.regionRatesNormalStepValidation
          .$invalid
      ) {
        this.submitted = true;
        this.$store.state.expressContract.regionRatesNormalStepSubmitted = true;
      }
      if (
        !this.v$.$invalid &&
        this.$store.state.expressContract.regionRatesNormalStepValidation
          .$invalid
      ) {
        this.$store.state.expressContract.regionRatesNormalStepSubmitted = true;
      }
      if (
        this.v$.$invalid &&
        !this.$store.state.expressContract.regionRatesNormalStepValidation
          .$invalid
      ) {
        this.submitted = true;
      }

       if (
        !this.v$.$invalid &&
        !this.$store.state.expressContract.regionRatesNormalStepValidation
          .$invalid
      ) {
       await this.$store.dispatch("expressContract/navigateStepper", {
          step: "AddECommerceRates",
        })
      await this.setCurrentStep(ADD_RATES_STEPS.TWO)
      }
     //  this.$store.state.express.stepChange++;
    },

    //VAN/BIKE RATES : STARTS HERE
    addRate() {
      this.addBikeOrVanRates(
        this.getType(this.defaultTransportType, "normal_rate")
      );
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.deleteBikeorVanRates(
        this.getType(this.defaultTransportType, "normal_rate"),
        index
      );
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    addBikeOrVanRates(type) {
      this.details[type].push({
        min_unit: "",
        max_unit: "",
        rate: "",
      });
      this[type + "_validation"].push({
        min_unit: { required },
        max_unit: { required },
        rate: { required },
      });
    },
    deleteBikeorVanRates(type, index) {
      this.details[type].splice(index, 1);
      this[type + "_validation"].splice(index, 1);
    },
    bikeOrVanRatesState(type) {
      //eslint-disable-next-line no-unused-vars
      for (let state in this.details[type]) {
        this.addRates.push("new_rate");
      }
    },
    //VAN/BIKE RATES : ENDS HERE

    //VAN - 2 TIER RATES - (CHARGE BY QUANTITY) - BOX COUNT RATES : STARTS HERE
    addBoxCountRate(type) {
      this.details[type].push({
        min_box: "",
        max_box: "",
        rate: "",
      });
      this[type + "_validation"].push({
        min_box: { required },
        max_box: { required },
        rate: { required },
      });
      this.addRatesClicked++;
      this.addBoxCountRates.push("new_box_rate");
    },
    deleteBoxCountRates(type, index) {
      this.details[type].splice(index, 1);
      this[type + "_validation"].splice(index, 1);
      this.addBoxCountRates.splice(index, 1);
      this.addRatesClicked++;
    },
    //VAN - 2 TIER RATES - CHARGE BY QUANTITY : BOX COUNT RATES : ENDS HERE

    //VAN - MULTI TIER RATES (CHARGE BY QUANTITY/CHARGE BY JOB COUNT) : STARTS HERE
    addMultiTierRate(type) {
      let key_extension =
        type == "normal_van_multi_tier_rates_charge_by_quantity"
          ? "boxes"
          : "jobs";
      let obj = {};
      obj["min_" + key_extension] = "";
      obj["max_" + key_extension] = "";
      obj["rate"] = "";
      let validationObj = {};
      validationObj["min_" + key_extension] = { required };
      validationObj["max_" + key_extension] = { required };
      validationObj["rate"] = { required };
      this.details[type].push(obj);
      this[type + "_validation"].push(validationObj);
      this.addRatesClicked++;
      this.addMultiTierRates.push("new_multi-tier_rate");
    },
    deleteMultiTierRates(type, index) {
      this.details[type].splice(index, 1);
      this[type + "_validation"].splice(index, 1);
      this.addMultiTierRates.splice(index, 1);
      this.addRatesClicked++;
    },
    multiTierRatesState(type) {
      //eslint-disable-next-line no-unused-vars
      for (let state in this.details[type]) {
        this.addMultiTierRates.push("new_multi-tier_rate");
      }
    },
    //VAN - MULTI TIER RATES (CHARGE BY QUANTITY/CHARGE BY JOB COUNT) : ENDS HERE

    getType(choice, category) {
      let type;
      if (category == "normal_rate") {
        type = choice == "Bike" ? "normal_bike_rates" : "normal_van_rates";
        return type;
      }
      if (category == "normal_two_tier_rate") {
        type =
          choice == "Charge by Weight"
            ? "normal_van_two_tier_rates_charge_by_weight"
            : "normal_van_two_tier_rates_charge_by_quantity";
        return type;
      }
      if (category == "normal_multi_tier_rate") {
        type =
          choice == "Charge by Quantity"
            ? "normal_van_multi_tier_rates_charge_by_quantity"
            : "normal_van_multi_tier_rates_charge_by_job_count";
        return type;
      }
    },
  },
  watch: {
    //watch trips/rates type choices
    "$store.state.expressContract.tripsOrRatesType": function () {
      this.defaultTripOrRatesType =
        this.$store.state.expressContract.tripsOrRatesType;
    },
    //watch transport type choices (bike/van)
    "$store.state.expressContract.transportType": function () {
      this.addRates = [];
      this.defaultTransportType =
        this.$store.state.expressContract.transportType;
      this.defaultNormalRatesType = this.getType(
        this.$store.state.expressContract.transportType,
        "normal_rate"
      );
      this.bikeOrVanRatesState(this.defaultNormalRatesType);
    },
    //watch two-tier-rate type choices (Charge by Weight/Charge by Quantity)
    "$store.state.expressContract.twoTierRateType": function () {
      this.defaultTwoTierRateType =
        this.$store.state.expressContract.twoTierRateType;
      this.defaultNormalTwoTierRatesType = this.getType(
        this.$store.state.expressContract.twoTierRateType,
        "normal_two_tier_rate"
      );
    },
    //watch multi-tier-rate type choices (Charge by Quantity/Charge by Job Count)
    "$store.state.expressContract.multiTierRateType": function () {
      this.addMultiTierRates = [];
      this.defaultMultiTierRateType =
        this.$store.state.expressContract.multiTierRateType;
      this.defaultNormalMultiTierRatesType = this.getType(
        this.$store.state.expressContract.multiTierRateType,
        "normal_multi_tier_rate"
      );
      this.multiTierRatesState(this.defaultNormalMultiTierRatesType);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.pi-times {
  color: red !important;
}
span.p-column-title {
    font-size: 12px !important;
    color: #7E84A7 !important;
}
</style>
