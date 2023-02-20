<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-8">
      <h5 class="dialog-label-text required">Weight Range(Kg)</h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.min_weight"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'p-invalid': v$.details.min_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.max_weight"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'p-invalid': v$.details.max_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>

      <div
        v-if="details.max_weight <= details.min_weight"
        class="ml-2"
        style="color: red"
      >
        Max Kg must be greater than Min Kg
      </div>
    </div>

    <div class="field col-12 md:col-4 width">
      <h5 class="dialog-label-text required">Unit Rate($)</h5>
      <TextField
        v-model="details.unit_rate"
        type="number"
        class="Rate-input"
        :classes="{
          'p-invalid': v$.details.unit_rate.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="expressAdhoc" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    details: {
      min_weight: "",
      max_weight: "",
      unit_rate: "",
    },
  }),
  validations() {
    return {
      details: {
        min_weight: { required },
        max_weight: { required },
        unit_rate: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.expressAdhoc.editEcommerceVanExpansionData;
        if (StateData?.id) {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type/rates/" +
              StateData?.id,
            data: this.details,
            method: "PATCH",
            triggered: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The surcharge is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the surcharge, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type/rates",
            data: {
              delivery_type_id:
                this.$store.state.expressAdhoc.ExpressAdhocEcomVanTableData[0]
                  .rates[0].delivery_type_id,
              ...this.details,
            },

            method: "POST",
            triggered: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Ecommerce data is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the ecommerce data, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },
  created() {
    // this.details.min_charge_per_job =
    //   this.$store.state.expressAdhoc.editNormalBikeData.min_charge_per_job;
    if (this.$store.state.expressAdhoc.editEcommerceVanExpansionData) {
      for (let d in this.details) {
        this.details[d] =
          this.$store.state.expressAdhoc.editEcommerceVanExpansionData[d];
      }
    }
  },
  unmounted() {
    this.$store.state.expressAdhoc.editEcommerceVanExpansionData = {};
  },
};
</script>

<style scoped></style>
