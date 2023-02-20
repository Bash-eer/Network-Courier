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
            v-on:childToParent="getUserInput"
            v-model="formData.delivery_type"
            :classes="{
              'p-invalid': v$.formData.delivery_type.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2 ml-3">
          <div class="label flex align-items-start mb-2">Cut Off Time</div>
          <!-- <NumberField
            label="cut_off_time"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.cut_off_time"
          /> -->
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
        <div class="input-wrapper col-2 ml-3">
          <div class="label flex align-items-start mb-2">Collect Time</div>
          <!-- <NumberField
            label="cut_off_time"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.cut_off_time"
          /> -->
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
        <div class="input-wrapper col-3">
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
        <SelectButton
          v-model="selectedTab"
          optionLabel="tab"
          class="mr-5"
          :options="tabs"
        />
      </div>
      <div class="mt-5">
        <keep-alive>
          <component
            @getFormData="getFormData"
            :saveKey="saveKey"
            :is="selectedTab.component"
            @isFormValid="isFormValid"
          />
        </keep-alive>
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
import SelectButton from "primevue/selectbutton";
import InputRows from "./InputRows.vue";
import Weight from "./Weight/index.vue";
import Quantity from "./Quantity/index.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TimeSlot from "./timeSlot.vue";
import moment from "moment";

export default {
  props: ["rowCount", "rowId", "type", "saveKey"],
  components: { InputRows, SelectButton, Weight, Quantity, TimeSlot },
  data() {
    return {
      rowData: [{ id: 1, isValid: false }],
      tabs: [
        { tab: "Charge by Weight", component: "Weight" },
        { tab: "Charge by Quantity", component: "Quantity" },
      ],
      selectedTab: { tab: "Charge by Weight", component: "Weight" },
      isValid: true,
      formData: {
        delivery_type: "",
        cut_off_time: "",
        collect_time: "",
        cut_off_days_count: "",
        delivery_type_initial: "",
      },
      min_charge_per_job: "",
      isRatesValid: false,
      isTimeslotValid: false,
      isQuantityValid: false,
      isWeightValid: false,
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
      },
    };
  },
  watch: {
    saveKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
      let isRowValid = this.rowData.find((list) => !list.isValid);

      if (
        !!isRowValid &&
        !this.v$.$invalid &&
        this.isTimeslotValid &&
        this.isWeightValid
      ) {
        this.$emit("isFormValid", true);
      } else {
        this.$emit("isFormValid", false);
      }
    },
  },
  methods: {
    getJobChargeInput() {
      this.$emit("getData", {
        field: "van_customer_bike_job",
        data: { min_charge_per_job: this.min_charge_per_job },
      });
    },
    isFormValid({ field, isValid }) {
      this[field] = isValid;
      console.log(this[field], field, isValid);
    },
    timeSlotValid(value) {
      this.isTimeslotValid = value;
    },
    getFormData({ field, data }) {
      this.$emit("getData", { field, data });
    },
    getTimeslotData(value) {
      this.$emit("getData", { data: value });
    },
    getRatesData({ id, data }) {
      this.ratesData[id] = data;
      this.$emit("getData", { field: "rates", data: this.ratesData });
    },
    getUserInput(label, value) {
      if (label == "cut_off_time" || label == "collect_time") {
        this.formData[label] = moment(value).format("HH:mm");
        console.log(this.formData[label], label, value);
      }
      this.$emit("getData", { data: this.formData });
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
          type: "van",
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