<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Charge Per Trip</h5>
      <TextField
        label="charege_per_trip"
        type="number"
        v-model="details.charege_per_trip"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Return Trip Charge</h5>
      <TextField
        label="return_trip_charge"
        type="number"
        v-model="details.return_trip_charge"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Head Off Delivery Charges</h5>
      <TextField
        label="head_off_delivery_charge"
        type="number"
        v-model="details.head_off_delivery_charge"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <div class="flex flex-column">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.return_trip_chargable == true
            ? [
                {
                  name: 'Return Trip Chargeable (Per Trip)',
                  tag: 'return_trip_chargable',
                  key: 'rt',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Return Trip Chargeable (Per Trip)',
            tag: 'return_trip_chargable',
            key: 'rt',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.collection_chargable == true
            ? [
                {
                  name: 'Collection Chargable',
                  tag: 'collection_chargable',
                  key: 'cc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Collection Chargable',
            tag: 'collection_chargable',
            key: 'cc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.headoff_delivery_charges == true
            ? [
                {
                  name: 'Head Off Delivery Charges',
                  tag: 'headoff_delivery_charges',
                  key: 'hd',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Head Off Delivery Charges',
            tag: 'headoff_delivery_charges',
            key: 'hd',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.headoff_return_trip_waived == true
            ? [
                {
                  name: 'Head Off Return Trip Waived',
                  tag: 'headoff_return_trip_waived',
                  key: 'hw',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Head Off Return Trip Waived',
            tag: 'headoff_return_trip_waived',
            key: 'hw',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>

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
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostCentresSiteCharges",
  data: () => ({
    details: {
      charege_per_trip: "",
      return_trip_charge: "",
      head_off_delivery_charge: "",
      return_trip_chargable: "",
      collection_chargable: "",
      headoff_delivery_charges: "",
      headoff_return_trip_waived: "",
    },
  }),
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "CostCentresTripSchedule";
    },
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
    submitData() {
      // if (this.v$.$invalid) {
      //   this.submitted = true;
      // }
      // if (!this.v$.$invalid) {
      for (let d in this.details) {
        this.$store.state.sales.costCenterFormData[d] = this.details[d];
      }
      this.$store.state.sales.costCenterFormData["quotation_id"] = parseInt(
        this.$store.state.sales.salesQuotationId
      );
      //CRUD - UPDATE OPERATION
      if (this.$store.state["sales"].costingCentreCreationStateData.id) {
        this.$store.state.sales.costCenterFormData["id"] =
          this.$store.state["sales"].costingCentreCreationStateData.id;
        //making an update/PUT api call - to update quotation data
        this.$store.dispatch("sales/costCentresCRUD", {
          tag: "update",
          data: this.$store.state.sales.costCenterFormData,
        });
      }
      //CRUD - CREATE OPERATION
      else {
        //making an add/POST api to add a new cost center
        this.$store.dispatch("sales/costCentresCRUD", {
          tag: "add",
          data: this.$store.state.sales.costCenterFormData,
        });
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["sales"].costingCentreCreationStateData)
        .length != 0
    ) {
      for (let state in this.details) {
        this.details[state] =
          this.$store.state["sales"].costingCentreCreationStateData[state];
      }
    }
  },
};
</script>

<style></style>
