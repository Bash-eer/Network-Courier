<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Charge Per Trip</h5>
      <TextField
        label="charge_per_trip"
        type="number"
        v-model="details.charge_per_trip"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Return Trip Charge(By Amount)</h5>
      <TextField
        label="Return Trip Charge (By Amount)"
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
          details.head_off_delivery_chargable == true
            ? [
                {
                  name: 'Head Off Delivery Charges',
                  tag: 'head_off_delivery_chargable',
                  key: 'hd',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Head Off Delivery Charges',
            tag: 'head_off_delivery_chargable',
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
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.special_monitoring == true
            ? [
                {
                  name: 'Special Monitoring',
                  tag: 'special_monitoring',
                  key: 'sm',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Special Monitoring',
            tag: 'special_monitoring',
            key: 'sm',
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
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon" label="Cancel" />
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
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "CostCentresSiteCharges",
  data: () => ({
    details: {
      customer_type: "express",
      charge_per_trip: "",
      return_trip_charge: "",
      head_off_delivery_charge: "",
      return_trip_chargable: false,
      collection_chargable: false,
      // headoff_delivery_charges: "",
      head_off_delivery_chargable: false,
      head_off_return_waived: false,
      // headoff_return_trip_waived: "",
      special_monitoring: false,
    },
  }),
  computed: {
    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  methods: {
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
    submitData() {
      for (let i in this.details) {
        this.expressCCPostDialogData[i] = this.details[i];
      }
      this.details.quotation_id = this.$route.params.id;

      //set trips data
      this.expressCCPostDialogData.trips =
        this.$store.state.salesCommon.expressCCTripsData;
      for (let i in this.details) {
        this.expressCCPostDialogData[i] = this.details[i];
      }
      // this.apiCallHandler();
      if (this.$store.state["salesCommon"].commonExpressCCStateData.id) {
        delete this.expressCCPostDialogData.id;
        this.apiPatchCallHandler();
      } else {
        this.apiCallHandler();
      }
    },
    apiCallHandler() {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotation/cost-center",
        data: this.expressCCPostDialogData,
        method: "POST",
        loadData: "loadCostCenterData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandler() {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path:
          "/sales/quotation/cost-center/" +
          this.$store.state["salesCommon"].commonExpressCCStateData.id,
        data: this.expressCCPostDialogData,
        method: "PATCH",
        loadData: "loadCostCenterData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    oldpostPatchFunction() {
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

  async created() {
    if (
      Object.keys(this.$store.state["salesCommon"].commonExpressCCStateData)
        .length != 0
    ) {
      let incomingData =
        this.$store.state["salesCommon"].commonExpressCCStateData;
      await axios
        .get("sales/quotation/cost-center/express/" + incomingData.id)
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results.site_office_charges[0]) {
              this.details[c] = res.data.results.site_office_charges[0][c];
            }
          }
        });
    }
  },
};
</script>

<style scoped>
.dialog-label-text {
  color: #4e5868 !important;
}
</style>
