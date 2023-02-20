<template>
  <div class="flex align-items-center">
    <div v-if="stage == 'Normal'">
      <table class="full-width input-row-table mb-3">
        <tr>
          <th class="">Country</th>
          <th>Weight Range (Kg)</th>
          <th>Document $</th>
          <th>Parcel $</th>
          <th></th>
        </tr>
        <tr class="mt-3">
          <td class="multiselect">
            <MultiSelectChips
              :options="countries"
              :filter="true"
              placeholder="Select Countries"
              label="userRole"
              v-model="selectedCountries"
              :value="selectedCountries"
              :state="selectedCountries"
              v-on:childToParent="getUserInput"
              optionValue="country_id"
            />
          </td>
          <td class="flex align-items-center weight_range">
            <NumberField
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              label="min_weight"
              v-on:childToParent="getUserInput"
              v-model="formData.rates.min_weight"
            />
            <span class="mx-2">-</span>
            <NumberField
              v-on:childToParent="getUserInput"
              label="max_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.rates.max_weight"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="document_rate"
              class="number-field"
              :maxFractionDigits="2"
              mode="decimal"
              v-model="formData.rates.document_rate"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="parcel_rate"
              class="number-field"
              :maxFractionDigits="2"
              mode="decimal"
              v-model="formData.rates.parcel_rate"
            />
          </td>
          <td>
            <div
              @click="$emit('removeRow', rowId)"
              v-if="count !== 1"
              class="pi pi-times pointer"
            ></div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="stage == 'Multiplier'">
      <table class="full-width input-row-table mb-3">
        <tr>
          <th class="">Country</th>
          <th>Weight Range (Kg)</th>
          <th>Per Kg Doc $</th>
          <th>Minimum $</th>
          <th>Per Kg Parcel $</th>
          <th>Minimum $</th>
          <th></th>
        </tr>
        <tr class="mt-3">
          <td class="multiselect">
            <MultiSelectChips
              :options="countries"
              :filter="true"
              placeholder="Select Countries"
              label="userRole"
              v-model="selectedCountries"
              :value="selectedCountries"
              :state="selectedCountries"
              v-on:childToParent="getUserInput"
              optionValue="country_id"
            />
          </td>
          <td class="flex align-items-center weight_range">
            <NumberField
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              label="min_weight"
              v-on:childToParent="getUserInput"
              v-model="formData2.rates.min_weight"
            />
            <span class="mx-2">-</span>
            <NumberField
              v-on:childToParent="getUserInput"
              label="max_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData2.rates.max_weight"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="document_rate"
              class="number-field"
              :maxFractionDigits="2"
              mode="decimal"
              v-model="formData2.rates.document_rate"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="parcel"
              class="number-field"
              v-model="formData2.rates.document_min_rate"
              :maxFractionDigits="2"
              mode="decimal"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="parcel_rate"
              class="number-field"
              :maxFractionDigits="2"
              mode="decimal"
              v-model="formData2.rates.parcel_rate"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="parcel"
              class="number-field"
              v-model="formData2.rates.parcel_min_rate"
              :maxFractionDigits="2"
              mode="decimal"
            />
          </td>
          <td>
            <div
              @click="$emit('removeRow', rowId)"
              v-if="count !== 1"
              class="pi pi-times pointer"
            ></div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="stage == 'Base Set Multiplier'">
      <table class="full-width input-row-table">
        <tr>
          <th class="">Country</th>
          <th>Percentage</th>
          <th>Minimum $</th>
          <th></th>
        </tr>
        <tr class="mt-3">
          <td class="multiselect">
            <MultiSelectChips
              :options="countries"
              :filter="true"
              placeholder="Select Countries"
              label="userRole"
              v-model="baseSelectedCountries"
              :value="baseSelectedCountries"
              :state="baseSelectedCountries"
              optionValue="country_id"
              v-on:childToParent="getUserInput"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="percentage"
              class="number-field"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="baseSetMultiplierForm.rates.percentage"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="minimum_rate"
              class="number-field"
              mode="decimal"
              v-model="baseSetMultiplierForm.rates.minimum_rate"
              :maxFractionDigits="2"
            />
          </td>
          <td>
            <div
              @click="$emit('removeRow', rowId)"
              v-if="count !== 1"
              class="pi pi-times pointer"
            ></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["stage", "rowId", "type", "count"],
  data() {
    return {
      isValid: true,
      selectedCountries: [],
      formData: {
        countries: [],
        rates: {
          min_weight: "",
          max_weight: "",
          document_rate: "",
          parcel_rate: "",
        },
      },
      formData2: {
        countries: [],
        rates: {
          min_weight: "",
          max_weight: "",
          document_rate: "",
          parcel_rate: "",
          document_min_rate: null,
          parcel_min_rate: null,
        },
      },
      baseSelectedCountries: [],
      baseSetMultiplierForm: {
        countries: [],
        rates: {
          percentage: "",
          minimum_rate: "",
        },
      },
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
    // if (this.$props.stage !== "Base Set Multiplier") {
    //   return {
    //     selectedCountries: { required },
    //     formData: {
    //       rates: {
    //         min_weight: { required },
    //         max_weight: {
    //           required,
    //           maxVal: (value) => {
    //             if (this.formData.rates.min_weight >= value) {
    //               return false;
    //             } else {
    //               return true;
    //             }
    //           },
    //         },
    //         document_rate: { required },
    //         parcel_rate: { required },
    //         minimum_rate: { required },
    //       },
    //     },
    //   };
    // } else {
    //   return {
    //     baseSelectedCountries: { required },
    //     baseSetMultiplierForm: {
    //       rates: {
    //         percentage: { required },
    //         minimum_rate: { required },
    //       },
    //     },
    //   };
    // }
  },
  watch: {
    footerBtnKey() {
      // if (this.v$.$invalid) {
      //   this.isValid = false;
      //   this.$emit("isRowValid", { isValid: false, id: this.rowId });
      // } else {
      //   this.$emit("isRowValid", { isValid: true, id: this.rowId });
      // }

      this.setData();
    },
  },
  computed: {
    ...mapGetters({
      footerBtnKey: "AddNewInternational/footerBtnKey",
      restrictedCountry: "AddNewInternational/Surcharges/restrictedCountry",
    }),
  },
  methods: {
    ...mapActions({
      setRestrictedCountry:
        "AddNewInternational/Surcharges/setRestrictedCountry",
      getCountryList: "Outbound/getCountryList",
    }),
    getUserInput() {
      this.setData();
    },
    setData() {
      let data = {};

      this.formData.countries = [];

      this.selectedCountries.map((list) =>
        this.formData.countries.push({ country_id: list })
      );

      this.formData2.countries = [];

      this.selectedCountries.map((list) =>
        this.formData2.countries.push({ country_id: list })
      );

      this.baseSetMultiplierForm.countries = [];

      this.baseSelectedCountries.map((list) =>
        this.baseSetMultiplierForm.countries.push({ country_id: list })
      );

      if (this.$props.stage == "Normal") {
        data = this.formData;
      } else if (this.$props.stage == "Multiplier") {
        data = this.formData2;
      } else {
        data = this.baseSetMultiplierForm;
      }

      this.setRestrictedCountry({
        type: this.$props.type,
        idx: this.$props.rowId,
        data: data,
      });
    },
    async getCountries() {
      this.countries = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countries.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
    prefillData() {
      if (this.$props.type === "base_rate_multiplier") {
        if (this.restrictedCountry[this.$props.type][this.$props.rowId]) {
          if (
            this.restrictedCountry[this.$props.type][this.$props.rowId].rates
          ) {
            this.baseSetMultiplierForm.rates =
              this.restrictedCountry[this.$props.type][this.$props.rowId].rates;
          }

          this.restrictedCountry[this.$props.type][this.$props.rowId]
            ?.countries &&
            this.restrictedCountry[this.$props.type][
              this.$props.rowId
            ]?.countries.map((list) =>
              this.baseSelectedCountries.push(list.country_id)
            );
          return;
        }
      }

      if (this.$props.type === "normal") {
        if (this.restrictedCountry[this.$props.type][this.$props.rowId]) {
          if (
            this.restrictedCountry[this.$props.type][this.$props.rowId].rates
          ) {
            this.formData.rates =
              this.restrictedCountry[this.$props.type][this.$props.rowId].rates;
          }

          this.restrictedCountry[this.$props.type][this.$props.rowId]
            ?.countries &&
            this.restrictedCountry[this.$props.type][
              this.$props.rowId
            ]?.countries.map((list) =>
              this.selectedCountries.push(list.country_id)
            );
        }
      }

      if (this.$props.type === "multiplier") {
        if (this.restrictedCountry[this.$props.type][this.$props.rowId]) {
          if (
            this.restrictedCountry[this.$props.type][this.$props.rowId].rates
          ) {
            this.formData2.rates =
              this.restrictedCountry[this.$props.type][this.$props.rowId].rates;
          }

          this.restrictedCountry[this.$props.type][this.$props.rowId]
            ?.countries &&
            this.restrictedCountry[this.$props.type][
              this.$props.rowId
            ]?.countries.map((list) =>
              this.selectedCountries.push(list.country_id)
            );
        }
      }
    },
  },
  async created() {
    await this.getCountries();
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