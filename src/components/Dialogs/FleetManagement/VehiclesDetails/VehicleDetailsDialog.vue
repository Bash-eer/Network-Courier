<template>
  <div class="ml-3">
    <h5 class="required dialog-label-text">Upload Image</h5>
    <div class="flex">
      <ImgUpload
        URL="/images/uploadImage.png"
        style="background: white"
        :state="vehicleImageState"
      />
    </div>
    <div
      v-if="
        $store.state.fleets.vehicleDetailsSubmitted &&
        $store.state.fleets.globalImageUploadURL == null
      "
      class="our-error p-error mismatch mb-2"
    >
      {{ mismatchError }}
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Vehicle Type</h5>
        <DropDown
          code="code"
          :state="details.vehicle_type_id"
          :key="$store.state.fleets.vehiclesDropDown"
          :data="$store.state.fleets.vehiclesDropDown"
          label="Vehicle"
          v-model="details.vehicle_type_id"
          :value="details.vehicle_type_id"
          :classes="{
            'p-invalid':
              v$.details.vehicle_type_id.$invalid &&
              $store.state.fleets.vehicleDetailsSubmitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Vehicle Reg No.</h5>
        <TextField
          label="Vehicle_Reg_No"
          type="text"
          v-model="details.reg_no"
          @blur="v$.details.reg_no.$model;"
          :classes="{
            'p-invalid':
              v$.details.reg_no.$invalid &&
              $store.state.fleets.vehicleDetailsSubmitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Vehicle Name</h5>
        <TextField
          label="Vehicle_Name"
          type="text"
          v-model="details.name"
          @blur="v$.details.name.$model;"
          :classes="{
            'p-invalid':
              v$.details.name.$invalid &&
              $store.state.fleets.vehicleDetailsSubmitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="mt-5">
      <Stepper :stepId="stepId" :stepperData="expressRateStepperItems" />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "VehicleDetailsDialog",
  data: () => ({
    mismatchError: "please upload a vehicle image!",
    vehicleImageState: "",
    stepId: "VehicleDetails",
    expressRateStepperItems: [
      {
        index: 0,
        label: "1",
        component: "VehicleDetails",
        name: "Vehicle Details",
      },
      {
        index: 1,
        label: "2",
        component: "InsuranceDetails",
        name: "Insurance Details",
      },
      {
        index: 2,
        label: "3",
        component: "RoadTaxDetails",
        name: "Road Tax Details",
      },
      {
        index: 3,
        label: "4",
        component: "CoeDetails",
        name: "COE",
      },
    ],
    details: {
      vehicle_type_id: "",
      reg_no: "",
      name: "",
    },
    v$: useVuelidate(),
  }),
  methods: {
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.vehiclesFormStateData).length != 0
      ) {
        this.vehicleImageState =
          this.$store.state.fleets.vehiclesFormStateData["image_url"];
        this.$store.state.fleets.globalImageUploadURL =
          this.$store.state.fleets.vehiclesFormStateData["image_url"];
        for (let state in this.details) {
          if (state == "vehicle_type_id") {
            this.details["vehicle_type_id"] =
              this.$store.state.fleets.vehiclesFormStateData["vehicle_type"];
          } else {
            this.details[state] =
              this.$store.state.fleets.vehiclesFormStateData[state];
          }
        }
      }
    },
  },
  validations() {
    return {
      details: {
        vehicle_type_id: { required },
        reg_no: { required },
        name: { required },
      },
    };
  },
  watch: {
    v$: function () {
      if (
        this.details.vehicle_type_id != "" &&
        this.details.reg_no != "" &&
        this.details.name != ""
      ) {
        this.$store.state.fleets.vehicleDetailsSubmittedValidation = false;
      }
      if (
        this.details.vehicle_type_id == "" ||
        this.details.reg_no == "" ||
        this.details.name == ""
      ) {
        this.$store.state.fleets.vehicleDetailsSubmittedValidation = this.v$;
      }
      // if (!this.v$.$invalid) {
      for (let d in this.details) {
        this.$store.state.fleets.vehicleDetailsData[d] = this.details[d];
      }
      // }
    },
  },
  unmounted() {
    this.$store.state.fleets.vehicleDetailsInsuranceFiles = [];
    this.$store.state.fleets.vehicleDetailsRoadTaxFiles = [];
    this.$store.state.fleets.vehicleDetailsCoeFiles = [];
    this.$store.state.fleets.deletedVehicleDetailsInsuranceFiles = [];
    this.$store.state.fleets.deletedVehicleDetailsRoadTaxFiles = [];
    this.$store.state.fleets.deletedVehicleDetailsCoeFiles = [];
    this.$store.state.fleets.globalImageUploadURL = null;
    this.$store.dispatch("fleets/loadFleetVehicles");
  },
  created() {
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicleTypes",
      mutation: "fetchVehiclesDropDownData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "drivers",
      mutation: "fetchDriversDropDownData",
    });
    this.$store.state.fleets.vehicleDetailsSubmitted = false;
    this.$store.state.fleets.vehicleDetailsSubmittedValidation = null;
    this.$store.state.fleets.vehicleDetailsData = {};
    this.$store.state.fleets.vehicleDetailsFormData = {};
    this.$store.state.sales.stepperNavigation = null;
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style scoped>
.mismatch {
  font-size: 12px;
}
.p-steps-item {
  justify-content: left !important;
}
.img_upload {
  border: none #ffffff;
}
</style>
