<template>
  <div class="input-wrapper col">
    <div class="label flex align-items-start mb-2">
      Minimum Monthly Units (Dispatches)
      <span class="ml-1 required-field">*</span>
    </div>
    <div class="flex align-items-end">
      <NumberField
        label="min_weight"
        :showButtons="true"
        mode="decimal"
        :max="0"
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.min_units"
        :classes="{
          'p-invalid': v$.formData.min_units.$invalid && !isValid,
        }"
      />
      <NumberField
        class="ml-2"
        label="min_weight"
        :showButtons="true"
        mode="decimal"
        :max="0"
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.max_units"
        :classes="{
          'p-invalid': v$.formData.max_units.$invalid && !isValid,
        }"
      />
    </div>
  </div>
  <div class="input-wrapper col">
    <div class="label flex align-items-start mb-2">
      Unit Rate ($)
      <span class="ml-1 required-field">*</span>
    </div>
    <NumberField
      label="min_weight"
      mode="decimal"
      :max="0"
      :maxFractionDigits="2"
      v-on:childToParent="getUserInput"
      v-model="formData.unit_rate"
      :classes="{
        'p-invalid': v$.formData.unit_rate.$invalid && !isValid,
      }"
    />
  </div>

  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
      v-on:childToParent="cancel"
    />
    <Buttons
      label="Save"
      button_class="p-button-sm mr-4 add-btn custom-add-btn"
      v-on:childToParent="save"
      :loading="isloading"
    />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapActions, mapState } from 'vuex';
import { errhandler } from '@/services/httpClient';

export default {
  props: {
    submitForm: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isValid: true,
      bool: true,
      showDialog: this.$props.show,
      formData: {
        min_units: '',
        max_units: '',
        unit_rate: '',
      },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      if (!value) this.$emit('close');
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        min_units: { required },
        max_units: {
          required,
          maxVal: (value) => {
            if (this.formData.min_units >= value) {
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
  mounted() {},
  methods: {
    ...mapActions('express', ['createEcomBikeRates']),
    ...mapActions('express', ['getRegionRatesById']),
    cancel() {
      this.$emit('cancel');
    },
    initialised() {
      this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(() => {
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if ( this.regionRatesByIdData.charge_types[i].charge_type == 'e_commerce' ) {
            for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].e_commerce_services.length; j++) {
              if (this.regionRatesByIdData.charge_types[i].e_commerce_services[j].service_type == 'bike') {
                this.serviceId = this.regionRatesByIdData.charge_types[i].e_commerce_services[j].id;
              }
            }
          }
        }
      });
    },
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      try {
        this.isloading = true;
        Object.assign(this.formData, {
          delivery_type_id: this.$store.state.express.deliveryId,
        });
        await this.createEcomBikeRates(this.formData).then(() => {
          this.bool = false;
        });
        this.submitForm(this.bool);
        this.$emit('close');
        this.$emit('save');
        this.initialised();
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
      //  }
    },
  },
  created() {
    if (this.mode === 'Edit') {
      let data = this.editData.data;

      this.formData.min_units = data.min_units;
      this.formData.max_units = data.max_units;
      this.formData.unit_rate = data.unit_rate;
    }
  },
};
</script>

<style></style>
