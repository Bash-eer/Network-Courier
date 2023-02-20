<template>
  <div class="formgrid grid mb-3">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">{{ name }}</h5>
      <TextField
        label="enteredValue"
        id="enteredValue"
        v-model="enteredValue"
        @blur="v$.enteredValue.$model"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.enteredValue.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <!--footer -->
  <div class="formgrid grid pl-2 pr-2">
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
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
          v-on:childToParent="closeDialog"
        />
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
    name: null,
    enteredValue: null,
    submitted: false,
    selectedTab: null,
    URLType: null,
    idFromData: null,
    nameKey: null,
    mutation: null,
  }),
  validations() {
    return {
      enteredValue: { required },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.loadApi = "loadFleetMastersCommons";

        if (this.name == "Vehicle Type") {
          this.selectedTab = "vehicle_type";
          this.URLType = "vehicleType";
          this.nameKey = "users_fleet_vehicle_types";
          this.mutation = "fetchFleetMastersVehicleTypes";
        }
        if (this.name == "Claim Type") {
          this.selectedTab = "claim_type";
          this.URLType = "claimType";
          this.nameKey = "users_fleet_claim_types";
          this.mutation = "fetchFleetMastersClaimTypes";
        }
        if (this.name == "Maintenance Type") {
          this.selectedTab = "maintenance_type";
          this.URLType = "maintenanceType";
          this.nameKey = "users_fleet_maintenance_types";
          this.mutation = "fetchFleetMastersMaintenanceType";
        }
        if (this.name == "Delivery Point") {
          this.selectedTab = "delivery_point";
          this.URLType = "deliveryPoint";
          this.nameKey = "users_fleet_delivery_points";
          this.mutation = "fetchFleetMastersDeliveryPoint";
        }
        if (this.name == "Product Name") {
          this.selectedTab = "product_name";
          this.URLType = "productName";
          this.nameKey = "users_fleet_product_names";
          this.mutation = "fetchFleetMastersProductName";
        }
        if (this.name == "Inspection Check") {
          this.selectedTab = "inspection_check";
          this.URLType = "InspectionCheck";
          this.nameKey = "users_fleet_inspection_check";
          this.mutation = "fetchFleetMastersInspectionCheck";
        }

        //making a create/POST api call - to create new fleet masters details
        if (this.idFromData == null) {
          this.$store.dispatch("masters/FleetMastersCRUD", {
            tag: "add",
            data: { [this.selectedTab]: this.enteredValue },
            type: this.URLType,
            loadApi: this.loadApi,
            nameKey: this.nameKey,
            mutation: this.mutation,
          });
        }
        //making an update/PUT api call - to update fleet masters details
        else {
          this.$store.dispatch("masters/FleetMastersCRUD", {
            tag: "update",
            data: {
              [this.selectedTab]: this.enteredValue,
              id: this.idFromData,
            },
            type: this.URLType,
            loadApi: this.loadApi,
            nameKey: this.nameKey,
            mutation: this.mutation,
          });
        }
      }
    },
  },
  created() {
    this.name = this.$store.state.masters.FleetCommonDialogName;
    if (Object.keys(this.$store.state.masters.fleetsFormData).length != 0) {
      this.idFromData = this.$store.state.masters.fleetsFormData.id;
      for (let state in this.$store.state.masters.fleetsFormData) {
        if (
          state == "vehicle_type" ||
          state == "claim_type" ||
          state == "maintenance_type" ||
          state == "delivery_point" ||
          state == "product_name" ||
          state == "inspection_check"
        ) {
          this.enteredValue = this.$store.state.masters.fleetsFormData[state];
          this.name = this.$store.state.masters.FleetCommonDialogName;
        }
      }
    }
  },
};
</script>

<style scoped></style>
