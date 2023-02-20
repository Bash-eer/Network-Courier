<template>
  <div class="formgrid grid">
    <div :key="renderkey" class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Additional Rate Name</h5>
      <!-- <TextField
        v-model="details.surcharge_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.surcharge_name.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      /> -->
       <AddNewDropDownTextField
       :key="renderkey"
        type="Surcharge"
        :optionClose="true"
        stateName="addNewSurchargeName"
        :state="details?.surcharge_name"
        :data="addNewSurchargeName"
        :placeholder="details.surcharge_name==''?'Choose a Surcharge Name':details.surcharge_name"
        storePath="expressContract"
        v-model="details.surcharge_name"
        @addNewValue="addNewSurcharge"
        :classes="{
          'p-invalid': v$.details.surcharge_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Rate (S$)</h5>
      <TextField
        v-model="details.rates"
        type="number"
        :classes="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
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
import {exc_master,ex_state_master} from "../../../../../../store/helper"
export default {
  data: () => ({
    name: "AddAdditionalSurcharges",
    v$: useVuelidate(),
    submitted: false,
    renderkey:1,
    details: {
      surcharge_name: "",
      geo_fencing_id:"",
      rates: "",
      name: "",
    },
  }),
  validations() {
    return {
      details: {
        surcharge_name: { required },
        rates: { required },
      },
    };
  },
  computed:{
    ...ex_state_master,
  },
  methods: {
    ...exc_master,
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let f_data=this.addNewSurchargeName[0].items.find((i)=>i.name==this.details.surcharge_name?.surcharge_name)
        this.details.geo_fencing_id=f_data.geo_fencing_id;
        this.details.surcharge_name=f_data.surcharge_name;
        let StateData =
          this.$store.state.expressAdhoc.addAdditionalSurchargeData;
        if (StateData?.id) {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/express/adhoc/ratecard/additional/surcharges/" +
              // this.$route.params.zoneId,
              StateData.id,
            data: this.details,
            method: "PATCH",
            triggered: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The additional surcharge is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the additional surcharge, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/express/adhoc/ratecard/additional/surcharges",
            data: {
              ...this.details,
              charges_id:
                this.$store.state.expressAdhoc
                  .ExpressAdhocAdditionalSurchargesTableData[0].charges_id,
            },

            method: "POST",
            triggered: true,

            toastData: {
              toastSuccessData: {
                toastMsg: `The Additional surcharge is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the additional surcharges, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },
  unmounted() {
    this.$store.state.expressAdhoc.addAdditionalSurchargeData = {};
  },
  async created() {
    await this.getSurchargeNames();
    if (this.$store.state.expressAdhoc.addAdditionalSurchargeData) {
      for (let d in this.details) {
        this.details[d] =
          this.$store.state.expressAdhoc.addAdditionalSurchargeData[d];
      }
    }
    this.renderkey++
  },
};
</script>

<style scoped></style>
