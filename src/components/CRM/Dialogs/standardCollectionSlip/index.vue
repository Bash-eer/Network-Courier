<template>
  <div>
    <Dialog
      v-model:visible="$store.state.Masscollection.scheduleDialog"
      :style="{
        width: getWidth(),
        height: getHeight(),
        backgroundColor: color(),
      }"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :modal="true"
      :closable="true"
    >
      <!-- HEADER -->
      <template #header>
        <div class="display-flex justify-content-between align-items-center">
          Schedule Time
        </div>
      </template>
      <!-- HEADER END -->

      <!-- MAIN CONTENT -->
      <div class="main-wrapper">
        <div class="flex grid align-items-center mb-5 mt-1">
          <div class="col-2 labelDark">Template No:</div>
          <div class="col">
            <InputText
              class="w-full"
              v-model="formData.template_name"
              :class="{
                'p-invalid': v$.formData.template_name.$invalid && !isValid,
              }"
            />
          </div>
        </div>
        <div class="stepper_container mx-3">
          <FrequencySchedule
            :templateData="formData"
            @isFormValid="checkValidations"
            :formValid="isValid"
          />
        </div>
      </div>
      <!-- MAIN CONTENT END -->
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
// import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import FrequencySchedule from './frequencySchedule.vue';
import { mapState, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
// import { mockTemplateNo } from './const';
export default {
  components: { Dialog, FrequencySchedule, InputText },
  props: ['showDialogs', 'width', 'height'],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      formData: {
        template_name: '',
      },
      templateNo: null,
      isValid: true,
    };
  },
  validations() {
    return {
      formData: {
        template_name: { required },
      },
    };
  },
  computed: {
    ...mapState({
      scheduleDialogData: (state) => state.Masscollection.stdCollectionData,
    }),
    ...mapGetters({
      stdCollectionSlipData: 'Masscollection/getStdCollectionData'
    })
  },
  mounted() {
    this.formData = this.stdCollectionSlipData;
  },
  methods: {
    getHeight() {
      return '90vh';
    },
    getWidth() {
      return '50vw';
    },
    color() {
      return 'white';
    },
    closeDialog() {
      this.$emit('close', false);
    },
    checkValidations(ChildFormValid) {
      if (this.v$.$invalid && !ChildFormValid) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
  },
  watch: {
    '$store.state.Masscollection.stdCollectionData': function () {
      this.formData = this.$store.state.Masscollection.stdCollectionData;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.p-dropdown {
  width: 100% !important;
}

.labelDark {
  color: #4e5968;
  font-size: 14px;
  font-weight: 600;
}
</style>
