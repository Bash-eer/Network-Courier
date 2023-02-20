<template>
  <div class="formgrid grid mt-1">
    <div class="field col-12 md:col-12">
      <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
        Minimum Monthly Units (Dispatches)
      </h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6 pl-0">
          <NumberField
            v-model="details.min_units"
            :showButtons="true"
            :max="0"
            mode="decimal"
            :classes="{
              'p-invalid': v$.details.min_units.$invalid && !isValid,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.max_units"
            :showButtons="true"
            :max="0"
            mode="decimal"
            :classes="{
              'p-invalid': v$.details.max_units.$invalid && !isValid,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="bold-500 font-size-14 color-7a7a7a unit_rates">
        Units Rate($)
      </h5>
      <NumberField
        v-model="details.unit_rate"
        :max="0"
        mode="decimal"
        :maxFractionDigits="2"
        :classes="{
          'p-invalid': v$.details.unit_rate.$invalid && !isValid,
        }"
      />
    </div>
  </div>

  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Close"
      v-on:childToParent="cancel"
      class="p-button-outlined mr-1 dialog-button-text color-357dea"
    />

    <Buttons
      label="Save"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="submitData"
      :loading="isloading"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import { mapActions, mapState } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { errhandler } from '@/services/httpClient';
export default {
  name: 'BikeRatesEdit',
  props: {
    serviceId: {
      type: Number,
      default: () => null,
    },
    submitForm: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    isValid: true,
    details: {
      min_units: '',
      max_units: '',
      unit_rate: '',
    },
  }),

  mounted() {
    this.initialised();
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      details: {
        min_units: { required },
        max_units: {
          required,
          maxVal: (value) => {
            if (this.details.min_units >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        unit_rate: { required },
      },
    };
  },

  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },

  methods: {
    ...mapActions('express', ['updateBikeRateRates']),
    ...mapActions('express', ['getRegionRatesById']),

    initialised() {
      this.getRegionRatesById(this.$store.state.express.rateCardId);
    },
    cancel() {
      this.$emit('cancel');
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
      try {
        this.isloading = true;
        let formData = this.details;
        this.submitForm(formData);
        this.$emit('close');
        this.$emit('save');
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New data added successfully',
          life: 3000,
        });
        this.isloading = false;
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
