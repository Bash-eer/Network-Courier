<template>
  <div :key="refreshKey">
    <table class="input-row-table">
      <tr>
        <th class="weight_range highlight">
          Weight Range (Kg)<span class="required-field ml-1">*</span>
        </th>
        <th>Fuel Charges</th>
        <th
          v-for="item of ['zoneData', 'zoneData', 'zoneData', 'zoneData']"
          :key="item"
        >
          Zone {{ "1" }}<span class="required-field ml-1">*</span>
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr class="mt-3">
        <td class="flex align-items-center highlight">
          <NumberField
            v-on:childToParent="getUserInput"
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            v-model="formData.min_weight"
            :classes="{
              'p-invalid': v$.formData.min_weight.$invalid && !isValid,
            }"
          />
          <span class="mx-2">-</span>
          <NumberField
            v-on:childToParent="getUserInput"
            label="max_weight"
            :showButtons="true"
            mode="decimal"
            v-model="formData.max_weight"
            :classes="{
              'p-invalid': v$.formData.max_weight.$invalid && !isValid,
            }"
          />
        </td>
        <td class="checkbox">
          <SingleCheckBox
            v-model="formData.fuel_charge"
            :value="formData.fuel_charge"
          />
        </td>
        <td v-for="item of ['zone', 'zone', 'zone', 'zone']" :key="item">
          <NumberField
            @childToParent="getUserInput"
            :label="rate"
            v-model="formData.rate"
            class="number-field"
            mode="decimal"
            :classes="{
              'p-invalid': v$.formData.rate.$invalid && !isValid,
            }"
          />
        </td>
        <td class="icon">
          <Buttons
            label="Add"
            button_class="p-button-sm add-btn custom-add-btn"
            v-on:childToParent="save"
            :loading="isloading"
            class="mr-none"
          />
        </td>
        <td class="icon">
          <div @click="$emit('cancel')" class="pi pi-times pointer"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  props: ["rowCount", "rate", "rowId", "tabName"],
  data() {
    return {
      isValid: true,
      formData: {
        min_weight: "",
        max_weight: "",
        fuel_charge: false,
      },
      refreshKey: 10,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    let validate = {
      formData: {
        max_weight: {
          required,
          maxVal: (value) => {
            if (this.formData.min_weight >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        min_weight: { required },
      },
    };
    ["zone"].map(() => {
      validate.formData.rate = { required };
    });
    return validate;
  },

  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.input-row-table tr th {
  color: #7a7a7a !important;
  font-size: 14px;
  font-weight: normal;
  padding: 0 0.5rem;
  padding-bottom: 0 !important;
  padding-top: 1rem !important;
}

.input-row-table tr td {
  padding: 0.5rem 0.5rem;
}

.weight_range {
  width: 200px !important;
}

.checkbox {
  padding-bottom: 0.7rem !important;
}

.highlight {
  background: #ececec !important;
  padding: 0rem 0.5rem 1rem 0.5rem;
}

.icon {
  width: 50px;
}

.number-field {
  width: 100px !important;
}
</style>