<template>
  <div class="flex align-items-center mt-3">
    <div>
      <table v-if="type == 'normal'" class="full-width input-row-table">
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
              :options="countriesList"
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
              v-on:childToParent="getUserInput"
              label="min_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData.rates.min_weight"
            />
            <span class="mx-2">-</span>
            <NumberField
              label="max_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-on:childToParent="getUserInput"
              v-model="formData.rates.max_weight"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="document"
              class="number-field"
              v-model="formData.rates.document_rate"
              :maxFractionDigits="2"
              mode="decimal"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="parcel"
              class="number-field"
              v-model="formData.rates.parcel_rate"
              :maxFractionDigits="2"
              mode="decimal"
            />
          </td>
          <td>
            <div
              @click="$emit('removeRow', rowId)"
              v-if="rowCount !== 1"
              class="pi pi-times pointer"
            ></div>
          </td>
        </tr>
      </table>
      <table v-else class="full-width input-row-table">
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
              :options="countriesList"
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
              v-on:childToParent="getUserInput"
              label="min_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="formData2.rates.min_weight"
            />
            <span class="mx-2">-</span>
            <NumberField
              label="max_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-on:childToParent="getUserInput"
              v-model="formData2.rates.max_weight"
            />
          </td>
          <td>
            <NumberField
              v-on:childToParent="getUserInput"
              label="document"
              class="number-field"
              v-model="formData2.rates.document_rate"
              :maxFractionDigits="2"
              mode="decimal"
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
              label="parcel"
              class="number-field"
              v-model="formData2.rates.parcel_rate"
              :maxFractionDigits="2"
              mode="decimal"
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
              v-if="rowCount !== 1"
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
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["rowCount", "rowId", "type"],
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
      selectedItems: null,
      selectAll: false,
      countriesList: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      // selectedCountries: { required },
      // formData: {
      //   rates: {
      //     min_weight: { required },
      //     max_weight: {
      //       required,
      //       maxVal: (value) => {
      //         if (this.formData.min_weight >= value) {
      //           return false;
      //         } else {
      //           return true;
      //         }
      //       },
      //     },
      //     document_rate: { required },
      //     parcel_rate: { required },
      //   },
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

      if (this.type == "normal") {
        this.formData.countries = [];

        this.selectedCountries.map((list) =>
          this.formData.countries.push({ country_id: list })
        );

        this.setEmergencySurcharges({
          type: this.$props.type,
          idx: this.$props.rowId,
          data: this.formData,
        });
      } else {
        this.formData2.countries = [];

        this.selectedCountries.map((list) =>
          this.formData2.countries.push({ country_id: list })
        );

        this.setEmergencySurcharges({
          type: this.$props.type,
          idx: this.$props.rowId,
          data: this.formData2,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      saveKey: "AddNewInternational/Surcharges/saveKey",
      emergencySurcharges: "AddNewInternational/Surcharges/emergencySurcharges",
      goToPrev: "AddNewInternational/goToPrev",
      footerBtnKey: "AddNewInternational/footerBtnKey",
    }),
  },
  methods: {
    ...mapActions({
      setEmergencySurcharges:
        "AddNewInternational/Surcharges/setEmergencySurcharges",
      getCountryList: "Outbound/getCountryList",
    }),
    getUserInput() {
      if (this.type == "normal") {
        this.formData.countries = [];

        this.selectedCountries.map((list) =>
          this.formData.countries.push({ country_id: list })
        );

        this.setEmergencySurcharges({
          type: this.$props.type,
          idx: this.$props.rowId,
          data: this.formData,
        });
      } else {
        this.formData2.countries = [];

        this.selectedCountries.map((list) =>
          this.formData2.countries.push({ country_id: list })
        );

        this.setEmergencySurcharges({
          type: this.$props.type,
          idx: this.$props.rowId,
          data: this.formData2,
        });
      }
    },
    prefillData() {
      if (this.emergencySurcharges[this.type][this.rowId]) {
        if (this.emergencySurcharges[this.type][this.rowId]?.rates) {
          if (this.type == "normal") {
            this.formData.rates =
              this.emergencySurcharges[this.type][this.rowId]?.rates;
          } else {
            this.formData2.rates =
              this.emergencySurcharges[this.type][this.rowId]?.rates;
          }
        }

        this.emergencySurcharges[this.type][this.rowId]?.countries &&
          this.emergencySurcharges[this.type][this.rowId]?.countries.map(
            (list) => this.selectedCountries.push(list.country_id)
          );
      }
    },
    async getCountries() {
      this.countriesList = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countriesList.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  mounted() {
    if (!this.goToPrev) {
      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      }
    }
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