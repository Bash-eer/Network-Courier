<template>
  <div>
    <div class="wrapper">
      <div class="flex align-items-end">
        <div class="input-wrapper col-2">
          <div class="label flex align-items-start mb-2">
            Initial
            <span class="ml-1 required-field">*</span>
          </div>
          <TextField
            label="min_weight"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.delivery_type_initial"
            :classes="{
              'p-invalid':
                v$.formData.delivery_type_initial.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-3">
          <div class="label flex align-items-start mb-2">Delivery Type</div>
          <TextField
            label="delivery_type"
            mode="decimal"
            :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.delivery_type"
            :classes="{
              'p-invalid': v$.formData.delivery_type.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2">
          <div class="label flex align-items-start mb-2">Collect Time</div>
          <TimePicker24
            label="collect_time"
            class="full-width"
            v-model="formData.collect_time"
            v-on:childToParent="getUserInput"
            :state="formData.collect_time"
            :classes="{
              'p-invalid': v$.formData.collect_time.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2">
          <div class="label flex align-items-start mb-2">Cut Off Time</div>
          <TimePicker24
            class="full-width"
            label="cut_off_time"
            v-model="formData.cut_off_time"
            v-on:childToParent="getUserInput"
            :state="formData.cut_off_time"
            :classes="{
              'p-invalid': v$.formData.cut_off_time.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2">
          <div class="label flex align-items-start mb-2">
            Cut Off Days Count
          </div>
          <NumberField
            label="cut_off_days_count"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.cut_off_days_count"
            :classes="{
              'p-invalid': v$.formData.cut_off_days_count.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <div v-for="(data, idx) of rowData" :key="data">
        <InputRows
          :rowId="idx"
          :rowCount="rowData.length"
          @isRowValid="isRowValid"
          @removeRow="removeRow"
          :saveKey="saveKey"
          @getRatesData="getRatesData"
        />
      </div>
      <div @click="addRow" class="add-text pointer mt-3">+ Add Rates</div>

      <hr />

      <div class="flex justify-content-start align-items-center mt-4">
        <SelectButton v-model="selectedTab" class="mr-5" :options="tabs" />
      </div>
      <div class="mt-5">
        <!--< CHARGE BY WEIGHT TAB >-->
        <span v-show="selectedTab == 'Charge By Weight'">
          <div class="flex align-items-end ">
            <div class="input-wrapper col-3">
              <div
                class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 "
              >
                Maximum Weight (Kg)
              </div>
              <NumberField
                label="maximum_weight"
                mode="decimal"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_weight.maximum_weight"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_weight.maximum_weight.$invalid &&
                    !isValid,
                }"
              />
            </div>
            <div class="input-wrapper col-3">
              <div
              class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 "
              >
                Van Job Addl. Weight (Kg)
              </div>
              <NumberField
                label="van_job_add_weight"
                mode="decimal"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_weight.van_job_add_weight"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_weight.van_job_add_weight.$invalid &&
                    !isValid,
                }"
              />
            </div>
            <div class="input-wrapper col-3">
              <div
              class=" color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 "
              >
                Van Job Add. Cost $
              </div>
              <NumberField
                label="van_job_add_cost"
                mode="decimal"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_weight.van_job_add_cost"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_weight.van_job_add_cost.$invalid &&
                    !isValid,
                }"
              />
            </div>
          </div>
        </span>
        <!--< CHARGE BY WEIGHT TAB >-< END >-->

        <!--< CHARGE BY QUANTITY TAB >-->
        <span v-show="selectedTab == 'Charge By Quantity'">
          <div class="flex align-items-end col-12">
            <div class="input-wrapper col-3">
              <div
              class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 "
              >
                Maximum Quantity (Kg)
              </div>
              <NumberField
                label="maximum_quantity"
                mode="decimal"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_quantity.maximum_quantity"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_quantity.maximum_quantity.$invalid &&
                    !isValid,
                }"
              />
            </div>
            <div class="input-wrapper col-3">
              <div
              class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 "
              >
                Van Job Addl. Quantity (Kg)
              </div>
              <NumberField
                label="van_job_add_quantity"
                mode="decimal"
                :max="0"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_quantity.van_job_add_quantity"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_quantity.van_job_add_quantity
                      .$invalid && !isValid,
                }"
              />
            </div>
            <div class="input-wrapper col-3">
              <div class=" color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2 ">
                Van Job Add. Cost $
              </div>
              <NumberField
                label="van_job_add_cost"
                mode="decimal"
                :max="0"
                :maxFractionDigits="2"
                v-on:childToParent="getUserInput"
                v-model="formData.charge_by_quantity.van_job_add_cost"
                :classes="{
                  'p-invalid':
                    v$.formData.charge_by_quantity.van_job_add_cost.$invalid &&
                    !isValid,
                }"
              />
            </div>
          </div>

          <div
            class=" color-4e5968 font-size-14 bold-700 flex justify-content-start mt-3
            "
          >
            Box Count Charges
          </div>
          <div v-for="(data, idx) of boxCountRowData" :key="idx">
            <BoxCountInput
              :rowId="idx"
              :rowCount="boxCountRowData.length"
              @isRowValid="isBoxCountRowValid"
              @removeRow="removeBoxCountRow"
              :saveKey="saveKey"
              @getBoxCountData="getBoxCountData"
            />
          </div>

          <div @click="addBoxCountRow" class="add-text pointer mt-3">+ Add Rates</div>
        </span>
        <!--< CHARGE BY QUANTITY TAB >-< END > -->
      </div>

      <hr />

      <div class="bike-job">
        <div class="title flex align-items-start">Van Customer Bike job</div>
        <div class="input-wrapper col-3 mt-3">
          <div class="label flex align-items-start mb-2">
            Min Charge per Job ($)
            <span class="ml-1 required-field">*</span>
          </div>
          <NumberField
            label="min_weight"
            mode="decimal"
            v-on:childToParent="getJobChargeInput"
            :max="0"
            :maxFractionDigits="2"
            v-model="min_charge_per_job"
            :classes="{
              'p-invalid': v$.min_charge_per_job.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <hr />

      <TimeSlot
        @getTimeslotData="getTimeslotData"
        :saveKey="saveKey"
        @timeSlotValid="timeSlotValid"
      />
    </div>
  </div>
</template>

<script>
import SelectButton from 'primevue/selectbutton';
import InputRows from './InputRows.vue';
import BoxCountInput from './BoxCountInputs.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import TimeSlot from './timeSlot.vue';
import moment from 'moment';

export default {
  props: ['rowCount', 'rowId', 'type', 'saveKey'],
  components: { InputRows, TimeSlot, SelectButton, BoxCountInput },
  data() {
    return {
      rowData: [{ id: 1, isValid: false }],
      boxCountRowData: [{ id: 1, isValid: false }],
      selectedTab: 'Charge By Weight',
      tabs: ['Charge By Weight', 'Charge By Quantity'],
      isValid: true,
      formData: {
        delivery_type: '',
        cut_off_time: '',
        collect_time: '',
        cut_off_days_count: '',
        delivery_type_initial: '',
        charge_by_weight: {
          maximum_weight: '',
          van_job_add_cost: '',
          van_job_add_weight: '',
        },
        charge_by_quantity: {
          maximum_quantity: '',
          van_job_add_cost: '',
          van_job_add_quantity: '',
          box_count_charges: [],
        },
      },
      min_charge_per_job: '',
      isRatesValid: false,
      isTimeslotValid: false,
      ratesData: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      min_charge_per_job: { required },
      formData: {
        delivery_type: { required },
        cut_off_time: { required },
        collect_time: { required },
        cut_off_days_count: { required },
        delivery_type_initial: { required },
        charge_by_weight: {
          maximum_weight: { required },
          van_job_add_cost: { required },
          van_job_add_weight: { required },
        },
        charge_by_quantity: {
          maximum_quantity: { required },
          van_job_add_cost: { required },
          van_job_add_quantity: { required },
        },
      },
    };
  },
  watch: {
    saveKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
      let isRowValid = this.rowData.find((list) => !list.isValid);
      let isBoxCountRowValid = this.boxCountRowData.find((list) => !list.isValid)
      if (!!isRowValid && !!isBoxCountRowValid && !this.v$.$invalid && this.isTimeslotValid) {
        this.$emit('isFormValid', true);
      } else {
        this.$emit('isFormValid', false);
      }
    },
  },
  methods: {
    getBoxCountData({id, data}) {
      this.formData.charge_by_quantity.box_count_charges[id] = data;
      this.$emit('getData', { data: this.formData });
    },
    addBoxCountRow() {
      let count = this.boxCountRowData.length + 1;

      let exist = this.boxCountRowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.boxCountRowData.push({
          id: this.boxCountRowData.length + exist.id,
          valid: false,
        });
      } else {
        this.boxCountRowData.push({ id: this.boxCountRowData.length + 1, valid: false });
      }
    },
    removeBoxCountRow(id) {
      if (this.boxCountRowData.length > 1) {
        this.boxCountRowData.splice(id, 1);
      }
    },
    isBoxCountRowValid({ isValid, id }) {
      this.boxCountRowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });
    },
    getJobChargeInput() {
      this.$emit('getData', {
        field: 'van_customer_bike_job',
        data: { min_charge_per_job: this.min_charge_per_job },
      });
    },
    isFormValid({ field, isValid }) {
      this[field] = isValid;
    },
    timeSlotValid(value) {
      this.isTimeslotValid = value;
    },
    getFormData({ field, data }) {
      this.$emit('getData', { field, data });
    },
    getTimeslotData(value) {
      this.$emit('getData', { data: value });
    },
    getRatesData({ id, data }) {
      this.ratesData[id] = data;
      this.$emit('getData', { field: 'rates', data: this.ratesData });
    },
    getUserInput(label, value) {
      if (label == 'cut_off_time' || label == 'collect_time') {
        this.formData[label] = moment(value).format('HH:mm');
      }
      this.$emit('getData', { data: this.formData });
    },
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRates({
          type: 'van',
          idx: this.$props.rowId,
          ratesIdx: id,
        });
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: rgba(224, 228, 235, 0.2);
  padding: 1rem;
}

.col-3 {
  padding-left: 0 !important;
}
</style>
