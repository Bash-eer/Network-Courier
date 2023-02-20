<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text required">Name the Size</h5>
      <TextField
        v-model="details.size_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.size_name.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Kg</h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.min_weight"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'p-invalid': v$.details.min_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.max_weight"
            :showButtons="true"
            :maxFractionDigits="2"
            mode="decimal"
            :classes="{
              'p-invalid': v$.details.max_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Cm</h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.min_length"
            :showButtons="true"
            :maxFractionDigits="2"
            mode="decimal"
            :classes="{
              'p-invalid': v$.details.min_length.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.max_length"
            :showButtons="true"
            :maxFractionDigits="2"
            mode="decimal"
            :classes="{
              'p-invalid': v$.details.max_length.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div
        v-if="details.max_length < details.min_length"
        class="ml-2"
        style="color: red"
      >
        Max Cm must be greater than Min Cm
      </div>
    </div>

    <div class="field col-12 md:col-1 width">
      <h5 class="dialog-label-text required">Rate</h5>
      <TextField
        v-model="details.unit_rate"
        type="number"
        class="Rate-input-field"
        :classes="{
          'p-invalid': v$.details.unit_rate.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <!-- <CancelButton storePath="internationalInbound" /> -->
    <CancelButton storePath="rapidoAdhoc" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "AddDeliveryTypeRates",
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      details: {
        size_name: "",
        min_weight: "",
        max_weight: "",
        min_length: "",
        max_length: "",
        unit_rate: "",
      },
    };
  },
  validations() {
    return {
      details: {
        size_name: {
          required,
        },
        min_weight: {
          required,
        },
        max_weight: {
          required,
        },
        min_length: {
          required,
        },
        max_length: { required },
        unit_rate: {
          required,
        },
      },
    };
  },
  methods: {
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.details["delivery_type_id"] =
          this.$store.state.rapidoAdhoc.EcommerceDataRapido;

        let StateData =
          this.$store.state.rapidoAdhoc.addRapidoAdhocDeliveryTypeRate;
        if (StateData?.id) {
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/rates" +
              StateData.id,
            data: this.details,
            method: "PATCH",
            triggered: true,

            toastData: {
              toastSuccessData: {
                toastMsg: `The delivery type size is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the delivery type size, try again!",
                toastSeverity: "error",
              },
            },
          });
          this.$store.state.rapidoAdhoc.renderKey++;
        } else {
          await this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/rates",
            data: {
              ...this.details,
              charges_id: this.$store.state.rapidoAdhoc.EcommerceDataRapido,
            },
            loadData: {
              loadApi: "loadAdhocSecondPageData",
              loadPath:
                "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/rates",
              loadMutation: "fetchadhocRatesSecondPageTableData",
            },
            method: "POST",
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
          this.$store.state.rapidoAdhoc.renderKey++;
        }
      }
    },
  },
  created() {
    if (this.$store.state.rapidoAdhoc.addRapidoAdhocDeliveryTypeRate) {
      for (let d in this.details) {
        this.details[d] =
          this.$store.state.rapidoAdhoc.addRapidoAdhocDeliveryTypeRate[d];
      }
    }
  },
  unmounted() {
    this.$store.state.rapidoAdhoc.addRapidoAdhocDeliveryTypeRate = {};
  },
};
</script>

<style>
.Rate-input-field {
  width: 50px;
  margin-left: -9px;
}
</style>
