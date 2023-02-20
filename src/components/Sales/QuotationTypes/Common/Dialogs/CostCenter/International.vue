<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required color-7a7a7a text-sm">Cost Center Name</h5>
        <TextField
          label="customer_name"
          v-model="details.cost_center_name"
          :classes="{
             'p-invalid': v$.details.cost_center_name.$invalid && submitted,
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-12">
        <h5 class="required color-7a7a7a text-sm">Enter the Address</h5>
        <TextField
          label="customer_address"
          v-model="details.address"
          :classes="{
            'p-invalid': v$.details.address.$invalid && submitted,
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="color-7a7a7a text-sm" for="Country ">Country</label>
        <TextField
          label="country"
          v-model="details.country"
          :classes="{
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>

      <div class="field col-12 md:col-4">
        <label class="color-7a7a7a text-sm" for="Postal Code"
          >Postal Code</label
        >
        <TextField
          label="postal_code"
          v-model="details.postal_code"
          :classes="{
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm">State</h5>
        <TextField
          label="State"
          v-model="details.state"
          :classes="{
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="color-7a7a7a text-sm" for="Building Name"
          >Building Name</label
        >
        <TextField
          label="building_name"
          v-model="details.building_name"
          :classes="{
            'inputfield w-full text-900 font-bold': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label class="color-7a7a7a text-sm" for="Floor No"
          >Floor No
        </label>
        <TextField
          label="floor_no"
          v-model="details.floor_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text  text-900 font-bold': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="color-7a7a7a text-sm">Unit No</h5>
        <TextField
          label="unit_no"
          v-model="details.unit_no"
          :classes="{
            'inputfield w-full text-900 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon"
           label="Cancel" 
           class="color-357dea"         
           />
        <Buttons
          label="Save"
          button_class=" font-size-14"
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
  name: "AddCostCenter",
  data() {
    return {
      details: {
        customer_type: "international",
        cost_center_name: "",
        address: "",
        postal_code: "",
        country: "",
        state: "",
        building_name: "",
        floor_no: "",
        unit_no: "",
      },
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        cost_center_name: { required },
        address: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (
          this.$store.state.salesCommon
            .commonInternationalContractCostCenterPatchData?.id
        ) {
          
          this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/quotation/cost-center/" +
              this.$store.state.salesCommon
                .commonInternationalContractCostCenterPatchData.id,
            method: "PATCH",
            id: this.$route.params.id,
            data: { ...this.details, quotation_id: this.$route.params.id },
            loadData: "loadinternationalCostCenterDataGet",
            toastData: {
              toastSuccessData: {
                toastMsg: `The Profile is updated sucessfully!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in disabling/enabling the profile, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {

          this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
            path: "/sales/quotation/cost-center",
            method: "POST",
            data: { ...this.details, quotation_id: this.$route.params.id },
            id: this.$route.params.id,
            loadData: "loadinternationalCostCenterDataGet",
            toastData: {
              toastSuccessData: {
                toastMsg: `The Profile is Posted sucessfully!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in disabling/enabling the profile, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },
  async created() {
    if (
      this.$store.state.salesCommon
        .commonInternationalContractCostCenterPatchData?.id
    ) {
      this.details =
        this.$store.state.salesCommon.commonInternationalContractCostCenterPatchData;
      this.details.customer_type = "international";
      this.quotation_id = this.$route.params.id;
    }
  },

  unmounted() {
    this.$store.state.salesCommon.commonInternationalContractCostCenterPatchData =
      null;
  },
};
</script>

<style scoped>
.p-button.p-button-outlined {
  color: #357dea;
}
</style>
