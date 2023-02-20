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
    <div class="flex flex-row ml-4 my-3">
      <div class="flex mr-3">
        <Checkbox v-model="details.return_trip_chargable" :binary="true" />
      </div>
      <div class="flex">
        <span :class="`chb-la-fa`">Return Trip Chargeable (Per Trip)</span>
      </div>
    </div>
    <div class="flex flex-row ml-4 my-3">
      <div class="flex mr-3">
        <Checkbox v-model="details.collection_chargable" :binary="true" />
      </div>
      <div class="flex">
        <span :class="`chb-la-fa`">Collection Chargable</span>
      </div>
    </div>
    <div class="flex flex-row ml-4 my-3">
      <div class="flex mr-3">
        <Checkbox
          v-model="details.head_off_delivery_chargable"
          :binary="true"
        />
      </div>
      <div class="flex">
        <span :class="`chb-la-fa`">Head Off Delivery Charges</span>
      </div>
    </div>
    <div class="flex flex-row ml-4 my-3">
      <div class="flex mr-3">
        <Checkbox v-model="details.head_off_return_waived" :binary="true" />
      </div>
      <div class="flex">
        <span :class="`chb-la-fa`">Head Off Return Trip Waived</span>
      </div>
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
        <CancelButton storePath="salesCommon" label="Cancel" />
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
import axios from "axios";
import { mapGetters } from "vuex";
import Checkbox from "primevue/checkbox";
import {
  expressContract,
  expressContractState,
  sales_co,
} from "../../../../../../../store/helper";
export default {
  name: "CostCentresSiteCharges",
  components: {
    Checkbox,
  },
  data: () => ({
    details: {
      charge_per_trip: "",
      return_trip_charge: "",
      head_off_delivery_charge: "",
      return_trip_chargable: false,
      collection_chargable: false,
      // headoff_delivery_charges: "",
      head_off_delivery_chargable: false,
      head_off_return_waived: false,
    },
  }),
  computed: {
    ...sales_co,
    ...expressContractState,
    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  methods: {
    goBack() {
      this.$store.state.salesExpressContract.flowStepCount--;
      this.$store.state.salesSales.stepperNavigation = "CostCenterThirdStep";
      
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
      for (let i in this.details) {
        this.expressCCPostDialogData[i] = this.details[i];
      }
      this.details.quotation_id = this.$route.params.id;
      this.expressCCPostDialogData["site_office_charges"] = this.details;
      if (this.$store.state["salesCommon"].commonExpressCCStateData.id) {
        delete this.expressCCPostDialogData.id;
        this.apiPatchCallHandler();
      } else {
        this.apiCallHandler();
      }
    },
    apiCallHandler() {
      let type=this.$route.params.type== "contract"?"contract":"quotation"
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: `/sales/${type}/cost-center`,
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
      let type=this.$route.params.type== "contract"?"contract":"quotation"
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path:
          `/sales/${type}/cost-center/` +
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
    if (this.commonExpressCCStateData) {
      for (let c in this.details) {
        this.details[c] =
          this.commonExpressCCStateData.site_office_charges[0][c];
      }
    }
  },
};
</script>

<style scoped>
.dialog-label-text {
  color: #4e5868 !important;
}
</style>