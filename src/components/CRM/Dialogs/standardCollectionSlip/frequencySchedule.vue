<template>
  <div>
    <div class="mt-3">
      <!--  DROPOWN CONTAINER -->
      <div class="grid-nogutter mb-3">
        <div class="col-12 mb-1 label">Logistics Mode</div>
        <div class="col-6">
          <Dropdown
            id="dropdown"
            :options="logisticMode"
            optionLabel="name"
            optionValue="code"
            v-model="formData.logistics_mode"
            :class="{
              'p-invalid': v$.formData.logistics_mode.$invalid && !isValid,
            }"
            @change="getUserData($event, 'logistics_mode')"
            :showClear="true"
          />
        </div>
      </div>
      <div class="grid-nogutter">
        <div class="col-12 mb-1 label">Frequency</div>
        <div class="col-6">
          <Dropdown
            id="dropdown"
            :options="frequencyType"
            optionLabel="name"
            optionValue="component"
            v-model="formData.frequency"
            :class="{
              'p-invalid': v$.formData.frequency.$invalid && !isValid,
            }"
            @change="getUserData($event, 'frequency')"
            :showClear="true"
          />
        </div>
      </div>
      <!--  DROPOWN CONTAINER END -->

      <!-- MULTI COMPONENT CONTAINER -->
      <div class="grid-nogutter">
        <div class="my-3 label" v-if="selectedComponent != null">Schedule</div>
        <component
          :is="selectedComponent"
          :formdata="formData"
          @isFormValid="checkValidations"
          :formValid="isValid"
        />
      </div>
      <!-- MULTI COMPONENT CONTAINER END -->
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import weekly from './weeklySchedule.vue';
import monthly from './monthlySchedule.vue';
import monthWeekly from './monthlyWeeklySchedule.vue';
import { frequencyType, logisticMode } from './const';
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
  components: { Dropdown, weekly, monthly, monthWeekly },
  props: ['templateData', 'formValid'],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      frequencyType,
      logisticMode,
      selectedComponent: null,
      isValid: this.formValid ?? true,
      formData: {
        frequency: null,
        logistics_mode: null,
      },
    };
  },
  validations() {
    return {
      formData: {
        frequency: { required },
        logistics_mode: { required },
      },
    };
  },
  methods: {
    ...mapActions({ getTripsData: 'Masscollection/getScheduleTrips' }),
    getUserData({ value }, fieldName) {
      if (fieldName == 'logistics_mode') {
        this.getTripsData(value);
      }
      if (fieldName == 'frequency') {
        this.selectedComponent = value;
      }
    },

    checkValidations(childFormValid) {
      if (this.v$.$invalid && !childFormValid) {
        this.isValid = false;
        this.$emit('isFormValid', false);
      } else {
        this.$emit('isFormValid', true);
      }
    },

    loadData() {
      this.formData = this.templateData;
      this.selectedComponent = this.templateData.frequency ?? null;
      if (this.formData?.logistics_mode)
        this.getTripsData(this.templateData?.logistics_mode);
    },
  },

  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
::v-deep.p-dropdown {
  width: 100% !important;
}

.label {
  color: #7a7a7a;
  font-size: 14px;
}
</style>
