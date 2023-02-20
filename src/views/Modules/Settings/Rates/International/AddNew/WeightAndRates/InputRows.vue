<template>
  <div :key="refreshKey">
    <table class="input-row-table">
      <tr>
        <th class="weight_range highlight">
          Weight Range (Kg)<span
            v-if="rate !== 'multiplier'"
            class="required-field ml-1"
            >*</span
          >
        </th>
        <th>Fuel Charges</th>
        <th v-for="item of zoneData" :key="item">
          Zone {{ item.zone_no
          }}<span v-if="rate !== 'multiplier'" class="required-field ml-1"
            >*</span
          >
        </th>
        <th></th>
      </tr>
      <tr class="mt-3">
        <td class="flex align-items-center highlight">
          <NumberField
            v-on:childToParent="getUserInput"
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
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
            :maxFractionDigits="2"
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
        <td v-for="item of zoneData" :key="item">
          <NumberField
            @childToParent="getUserInput"
            :label="rate"
            v-model="formData['rate_' + item.zone_no]"
            class="number-field"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'p-invalid':
                v$.formData['rate_' + item.zone_no].$invalid && !isValid,
            }"
          />
        </td>
        <td class="icon">
          <div
            v-if="rowCount !== 1"
            @click="$emit('removeRow', rowId)"
            class="pi pi-times pointer"
          ></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    if (this.$props.rate !== "multiplier") {
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
      this.zoneData.map((zone) => {
        validate.formData["rate_" + zone.zone_no] = { required };
      });
      return validate;
    } else {
      let validate = {
        formData: {
          max_weight: {},
          min_weight: {},
        },
      };
      this.zoneData.map((zone) => {
        validate.formData["rate_" + zone.zone_no] = {};
      });
      return validate;
    }
  },
  watch: {
    footerBtnKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      // this.setStoreData();
    },
    // currentTab() {
    //   if (this.v$.$invalid) {
    //     this.isValid = false;
    //     this.$emit("isRowValid", { isValid: false, id: this.rowId });
    //   } else {
    //     this.$emit("isRowValid", { isValid: true, id: this.rowId });
    //   }
    // },
  },
  computed: {
    ...mapGetters({
      currentTab: "AddNewInternational/WeightAndRates/currentTab",
      zoneData: "AddNewInternational/zoneData",
      goToPrev: "AddNewInternational/goToPrev",
      footerBtnKey: "AddNewInternational/footerBtnKey",
      document: "AddNewInternational/WeightAndRates/document",
      parcel: "AddNewInternational/WeightAndRates/parcel",
      documentAndparcel: "AddNewInternational/WeightAndRates/documentAndparcel",
    }),
  },
  methods: {
    ...mapActions({
      setDocumentRates: "AddNewInternational/WeightAndRates/setDocumentRates",
      setParcelRates: "AddNewInternational/WeightAndRates/setParcelRates",
      setDocumentAndParcelRates:
        "AddNewInternational/WeightAndRates/setDocumentAndParcelRates",
    }),
    getUserInput(label, value) {
      this.formData["fuel_charge"] = false;

      this.formData[label] = value;

      this.formData = { ...this.formData };

      this.setStoreData();
    },
    setStoreData() {
      switch (this.currentTab) {
        case "Document":
          this.setDocumentRates({
            key: this.$props.rate,
            value: this.formData,
            idx: this.$props.rowId,
          });
          break;
        case "Parcel":
          this.setParcelRates({
            key: this.$props.rate,
            value: this.formData,
            idx: this.$props.rowId,
          });
          break;
        case "Document and Parcel":
          this.setDocumentAndParcelRates({
            key: this.$props.rate,
            value: this.formData,
            idx: this.$props.rowId,
          });
          break;
        default:
          break;
      }
    },
    prefillData() {
      // console.log("tabName - ", this.$props.tabName);
      // console.log("rate - ", this.$props.rate);
      // console.log("rowId - ", this.$props.rowId);

      let data = this[this.$props.tabName][this.$props.rate][this.$props.rowId];
      if (data) {
        this.formData = data;
      }
    },
  },
  mounted() {
    if (!this.goToPrev && this.$props.tabName == "document") {
      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    }
  },
  created() {
    this.prefillData();
  },
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