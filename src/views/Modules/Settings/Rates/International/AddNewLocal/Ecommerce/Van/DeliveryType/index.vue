<template>
  <div>
    <div class="wrapper">
      <div class="flex align-items-end">
        <div class="input-wrapper col-3">
          <div class="label flex required align-items-start mb-2">
            Delivery Type
          </div>
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
        <div class="input-wrapper col-2">
          <div class="label required flex align-items-start mb-2">
            Delivery Type Initial
          </div>
          <TextField
            label="delivery_type_initial"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.delivery_type_initial"
            :classes="{
              'p-invalid':
                v$.formData.delivery_type_initial.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2 ml-3">
          <div class="label flex required align-items-start mb-2">
            Cut Off Time
          </div>
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
            hourFormat="12"
            :classes="{
              'p-invalid': v$.formData.cut_off_time.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-2 ml-3">
          <div class="label flex required align-items-start mb-2">
            Collect Time
          </div>
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
            hourFormat="12"
            :classes="{
              'p-invalid': v$.formData.collect_time.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-3">
          <div class="label flex required align-items-start mb-2">
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
        <div
          @click="$emit('removeRow', rowId)"
          v-if="rowCount !== 1"
          class="pi pi-times pointer ml-2 mb-3"
        ></div>
      </div>

      <div v-for="(data, idx) of rowData" :key="data">
        <InputRows
          :rowId="idx"
          :rowCount="rowData.length"
          @isRowValid="isRowValid"
          @removeRow="removeRow"
          :deliveryIdx="rowId"
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
          <component :deliveryIdx="rowId" :is="selectedTab.component" />
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
            :maxFractionDigits="2"
            v-on:childToParent="getJobChargeInput"
            v-model="min_charge_per_job"
            :classes="{
              'p-invalid': v$.min_charge_per_job.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <hr />

      <TimeSlot :deliveryIdx="rowId" />
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import InputRows from "./InputRows.vue";
import Weight from "./Weight/index.vue";
import Quantity from "./Quantity/index.vue";
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TimeSlot from "./timeSlot.vue";
import moment from "moment";

export default {
  props: ["rowCount", "rowId", "type"],
  components: { InputRows, SelectButton, Weight, Quantity, TimeSlot },
  data() {
    return {
      rowData: [],
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
    nextBtnKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
    inValidTab(value) {
      if (value) {
        if (value.key == "van") {
          switch (value.tabKey) {
            case "box_count_charges":
              this.selectedTab = this.tabs[1];
              break;
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      van: "AddNewInternationalLocal/Ecommerce/van",
      inValidTab: "AddNewInternationalLocal/inValidTab",
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
    }),
  },
  methods: {
    ...mapActions({
      setVanDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setVanDeliveryData",
      AddRates: "AddNewInternationalLocal/Ecommerce/AddRates",
      removeRates: "AddNewInternationalLocal/Ecommerce/removeRates",
      setValidations: "AddNewInternationalLocal/Ecommerce/setValidations",
    }),
    getJobChargeInput() {
      this.setVanDeliveryData({
        type: "van_customer_bike_job",
        idx: this.$props.rowId,
        data: { min_charge_per_job: this.min_charge_per_job },
      });

      this.setValidations({
        tab: "van",
        type: "van_customer_bike_job",
        data: { valid: !this.v$.min_charge_per_job.$invalid },
      });
    },
    getUserInput(label, value) {
      if (label == "cut_off_time" || label == "collect_time") {
        this.formData[label] = moment(value).format("HH:mm");
        console.log(this.formData[label], label, value);
      }

      this.setVanDeliveryData({ idx: this.$props.rowId, data: this.formData });

      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
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

      this.AddRates({ type: "van", idx: this.$props.rowId });
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

      this.setValidations({
        tab: "van",
        type: "rates",
        data: this.rowData,
      });
    },
    prefillData() {
      let data =
        this.van.delivery_type[this.$props.rowId].van_customer_bike_job
          .min_charge_per_job;

      if (data != {}) this.min_charge_per_job = data;

      let data2 = this.van.delivery_type[this.$props.rowId];

      if (data2 != {}) {
        this.formData.delivery_type = data2.delivery_type;
        this.formData.cut_off_time = data2.cut_off_time;
        this.formData.collect_time = data2.collect_time;
        this.formData.cut_off_days_count = data2.cut_off_days_count;
        this.formData.delivery_type_initial = data2.delivery_type_initial;
      }
    },
  },
  mounted() {
    // this.prefillData();
  },
  created() {
    this.van.delivery_type[this.$props.rowId].rates.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
    this.prefillData();
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