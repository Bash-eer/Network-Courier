<template>
  <div>
    <div class="flex align-items-end">
      <div class="input-wrapper col-3">
        <div
          class="
            color-7a7a7a
            font-size-14
            bold-500
            required
            flex
            align-items-start
            mb-2
          "
        >
          No of Jobs
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_job"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.min_job"
            :classes="{
              'p-invalid': v$.formData.min_job.$invalid && !isValid,
            }"
          />
          <NumberField
            class="ml-2"
            label="max_job"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.max_job"
            :classes="{
              'p-invalid': v$.formData.max_job.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col-3">
        <div
          class="
            color-7a7a7a
            font-size-14
            bold-500
            required
            flex
            align-items-start
            mb-2
          "
        >
          Rate ($)
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <NumberField
          label="rate"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.rate"
          :classes="{
            'p-invalid': v$.formData.rate.$invalid && !isValid,
          }"
        />
      </div>
      <div
        @click="$emit('removeRow', rowId)"
        v-if="rowCount !== 1"
        class="pi pi-times pointer ml-2 mb-3"
      ></div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["rowCount", "rowId", "type"],
  data() {
    return {
      isValid: true,
      formData: {
        min_job: "",
        max_job: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        min_job: { required },
        max_job: {
          required,
          maxVal: (value) => {
            if (this.formData.min_job >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        rate: { required },
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
  },
  computed: {
    ...mapGetters({
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
      multi_tire: "AddNewInternationalLocal/Normal/multi_tire",
    }),
  },
  methods: {
    ...mapActions({
      setMultTierData: "AddNewInternationalLocal/Normal/setMultTierData",
    }),
    getUserInput() {
      this.setMultTierData({
        type: "charge_by_job_count",
        idx: this.$props.rowId,
        data: this.formData,
      });

      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
    prefillData() {
      let data = this.multi_tire.charge_by_job_count[this.$props.rowId];
      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>