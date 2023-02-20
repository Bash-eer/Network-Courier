<template>
  <!--disabled fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Region</h5>
      <TextField
        :disabled="true"
        v-model="
          $store.state.expressContract.cloneRateCardDialogData
            .cloneRateCardRegionName
        "
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Rate Card Name</h5>
      <TextField
        :disabled="true"
        v-model="
          $store.state.expressContract.cloneRateCardDialogData
            .cloneRateCardRateCardName
        "
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--image-->
  <div class="flex w-100 align-items-center justify-content-center">
    <img src="/images/down-arrow-vector.png" alt="" />
  </div>
  <!--clones fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Region</h5>
      <DropDown
        label="cloned_region"
        id="cloned_region"
        :disabled="false"
        code="name"
        v-model="details.cloned_region"
        :data="$store.state.expressContract.contractCloneRateCardDropdownData"
        :classes="{
          'p-invalid': v$.details.cloned_region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Cloned Rate Card Name</h5>
      <TextField
        :disabled="false"
        v-model="details.cloned_rate_card_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.cloned_rate_card_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--footer-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="expressContract" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    details: {
      region: 'Rate 1',
      rate_card_name: 'Zone A - Zone B',
      cloned_region: '',
      cloned_rate_card_name: '',
    },
  }),
  validations() {
    return {
      details: {
        cloned_rate_card_name: { required },
        cloned_region: { required },
      },
    };
  },
  methods: {
    processDropDown(key, source) {
      for (let tr in this.details) {
        let tr_obj = this.details[tr];
        for (let tr_keys in tr_obj) {
          if (tr_keys == key) {
            for (let s in this[source]) {
              if (this[source][s]['code'] == tr_obj[tr_keys]) {
                tr_obj[tr_keys] = this[source][s]['name'];
              }
            }
          }
        }
      }
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let DropdownData =
          this.$store.state.expressContract.contractCloneRateCardDropdownData;

        let respectiveData = DropdownData.find(
          (item) => item.name == this.details.cloned_region
        );
        //clone api
        this.$store.dispatch('expressContract/POSTPATCHCRUDOPERATION', {
          path: '/settings/salesSettings/rates/express/contract/rateCards/clone',
          method: 'POST',

          data: {
            target_rate_card_id:
              this.$store.state.expressContract.cloneRateCardDialogData
                .cloneRateCardRateCardId,
            region_id: respectiveData.code,
            rate_card_name: this.details.cloned_rate_card_name,
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The rate card ${this.$store.state.expressContract.cloneRateCardDialogData.cloneRateCardRateCardName} is cloned successfully`,
              toastSeverity: 'info',
            },
            toastErrorData: {
              toastMsg:
                'There was an error in cloning the rate card, try again!',
              toastSeverity: 'error',
            },
          },
          loadData: {
            loadApi: 'loadContractTableData',
            loadPath:
              '/settings/salesSettings/rates/express/contract/regionRateCards',
            loadMutation: 'fetchContractTableData',
          },
        });
      }
    },
  },
  created() {
    this.$store.dispatch('expressContract/loadContractRateCardRegionData');
  },
};
</script>

<style></style>
