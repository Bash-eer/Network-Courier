<template>
  <div>
    <div class="flex align-items-end">
      <div class="input-wrapper col-3">
        <div class="color-7a7a7a font-size-14 bold-500 required flex align-items-start mb-2">
          Boxes under 
          <!-- <span class="required-field ml-1">*</span> -->
        </div>
        <div class="flex align-items-end">
          <NumberField
            @onChange="getUserInput"
            label="min_box"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            v-model="formData.min_box"
            :classes="{
              'p-invalid': v$.formData.min_box.$invalid && !isValid,
            }"
          />
          <NumberField
            @onChange="getUserInput"
            label="max_box"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            class="ml-2"
            v-model="formData.max_box"
            :classes="{
              'p-invalid': v$.formData.max_box.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col-3">
        <div class="color-7a7a7a font-size-14 bold-500 required flex align-items-start mb-2">
          Rate ($) 
          <!-- <span class="required-field ml-1">*</span> -->
        </div>
        <NumberField
          label="rate"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.rate"
          :maxFractionDigits="2"
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
  props: ["rowCount", "rowId", "type", "deliveryIdx"],
  data() {
    return {
      isValid: true,
      formData: {
        min_box: "",
        max_box: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        min_box: { required },
        max_box: {
          required,
          maxVal: (value) => {
            if (this.formData.min_box >= value) {
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
      van: "AddNewInternationalLocal/Ecommerce/van",
    }),
  },
  methods: {
    ...mapActions({
      setVanDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setVanDeliveryData",
    }),
    getUserInput() {
      this.setVanDeliveryData({
        chargeType: "charge_by_quantity",
        data: this.formData,
        idx: this.$props.deliveryIdx,
        boxIdx: this.$props.rowId,
      });

      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
    prefillData() {
      let data =
        this.van.delivery_type[this.$props.deliveryIdx].charge_by_quantity
          .box_count_charges[this.$props.rowId];

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