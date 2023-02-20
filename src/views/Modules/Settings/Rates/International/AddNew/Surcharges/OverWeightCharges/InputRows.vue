<template>
  <div class="flex align-items-center">
    <div :key="refreshKey">
      <table class="full-width input-row-table">
        <tr>
          <th class="">Weight (Kg)</th>
          <th>Width (cm)</th>
          <th>Length (cm)</th>
          <th>Height (cm)</th>
          <th>Per Kg Document $</th>
          <th>Per Kg Parcel $</th>
        </tr>
        <tr class="mt-3">
          <td class="">
            <NumberField
              @onChange="getUserInput"
              label="weight"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.weight"
            />
          </td>
          <td class="">
            <NumberField
              @onChange="getUserInput"
              label="width"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.width"
            />
          </td>
          <td>
            <NumberField
              @onChange="getUserInput"
              label="length"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.length"
            />
          </td>
          <td>
            <NumberField
              @onChange="getUserInput"
              label="height"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.height"
            />
          </td>
          <td>
            <NumberField
              @onChange="getUserInput"
              label="document"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.per_document_rate"
            />
          </td>
          <td>
            <NumberField
              @onChange="getUserInput"
              label="parcel"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.per_parcel_rate"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["rowId"],
  data() {
    return {
      isValid: true,
      formData: {
        weight: "",
        width: "",
        length: "",
        height: "",
        per_document_rate: "",
        per_parcel_rate: "",
      },
      selectedCountries: null,
      selectedItems: null,
      selectAll: false,
      countries: [
        { name: "Australia", code: "AU", country_id: 1 },
        { name: "Brazil", code: "BR", country_id: 2 },
        { name: "China", code: "CN", country_id: 3 },
        { name: "Egypt", code: "EG", country_id: 5 },
      ],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      // formData: {
      //   weight: { required },
      //   width: { required },
      //   length: { required },
      //   height: { required },
      //   per_document_rate: { required },
      //   per_parcel_rate: { required },
      // },
    };
  },
  watch: {
    footerBtnKey() {
      // if (this.v$.$invalid) {
      //   this.isValid = false;
      //   this.$emit("isRowValid", { isValid: false, id: this.rowId });
      // } else {
      //   this.$emit("isRowValid", { isValid: true, id: this.rowId });
      // }

      this.setOverWeightCharges(this.formData);
    },
  },
  computed: {
    ...mapGetters({
      footerBtnKey: "AddNewInternational/footerBtnKey",
      overWeightCharges: "AddNewInternational/Surcharges/overWeightCharges",
    }),
  },
  methods: {
    ...mapActions({
      setOverWeightCharges:
        "AddNewInternational/Surcharges/setOverWeightCharges",
    }),
    getUserInput() {
      this.setOverWeightCharges(this.formData);
    },
    prefillData() {
      this.formData = this.overWeightCharges;
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style scoped>
.multiselect {
  width: 500px;
}

.input-row-table tr th {
  color: #7a7a7a !important;
  font-size: 14px;
  font-weight: normal;
  padding: 0 1rem 0 0 !important;
  padding-bottom: 0.5rem !important;
  text-align: left;
}

.input-row-table tr td {
  padding: 0 1rem 0 0 !important;
  padding-top: 0.5rem;
}

.weight_range {
  width: 300px !important;
}

:deep .p-multiselect-trigger {
  display: none;
}
</style>