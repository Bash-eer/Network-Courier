<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Customer Type</h5>
      <DropDown
        :state="details.customer_type"
        code="name"
        :data="customerType"
        label="customer_type"
        v-model="details.customer_type"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div v-if="$route?.params?.actionType != 'Adhoc'" class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Business Method</h5>
      <DropDown
        :state="details.business_method"
        code="name"
        :data="getDropDownData(details.customer_type)"
        label="business_method"
        v-model="details.business_method"
        :classes="{
          'p-invalid': v$.details.business_method.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>

  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text" v-if="serviceCategories.length > 0">
        Service Required
      </h5>
     
      <RadioButtons
        v-if="serviceCategories"
        label="service_required"
        v-model="details.service_required"
        state="radioButtonSalesState"
        v-bind:radioButtonData="serviceCategories"
        class="btn"
      />
    </div>
  </div> -->
  <!-- <span>

  </span> -->

  <div class="our-error p-error mismatch-error mx-3 bold-600">
    {{ noServiceError }}
  </div>

  <!--footer-->
  <!--Work-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="salesSales" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { expressContract,sales_IC } from "../../../../../store/helper";
export default {
  name: "QuotationSelectMethod",
  data: () => ({
    InternationalDropdownData: [
      { name: "Agent", code: "AG" },
      // { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    DefaultDropdownData: [
      // { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    customerType: [
      { name: "Express", code: "EX" },
      { name: "International", code: "IN" },
      { name: "Rapido", code: "RP" },
    ],
    serviceCategories: [],
    quotationTypes: ["", ""],
    v$: useVuelidate(),

    details: {
      customer_type: "",
      business_method: "",
      service_required: "",
    },
    noServiceError: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_method: { required },
      },
    };
  },
  computed: {
    ...sales_IC,
  },
  created() {
    if (this.$route?.params?.actionType == "Adhoc") {
      this.details.business_method ="Adhoc"
    }
  },
  methods: {
    ...expressContract,
    bindData() {
      let quotationType = this.quotationTypes.join("");

      if (quotationType == "ExpressContract") {
        this.serviceCategories = [
          { name: "Bike", key: "S1" },
          { name: "Van", key: "S2" },
          { name: "FSR", key: "S3" },
          { name: "Project", key: "S4" },
          { name: "Bike + FSR", key: "S4" },
          { name: "Van + FSR", key: "S4" },
          { name: "Bike + Project", key: "S4" },
          { name: "Van + Project", key: "S4" },
          { name: "Inter Company (Bike+ Van)", key: "S4" },
        ];
        // this.details.service_required = this.serviceCategories[0];
      }
      // else if (quotationType == "ExpressAdhoc") {
      // this.serviceCategories = [
      //   { name: "Bike", key: "S1" },
      //   { name: "Van", key: "S2" },
      // ];
      // this.details.service_required = this.serviceCategories[0].name;
      // }
      else {
        this.serviceCategories = [];
      }
    },
    //eslint-disable-next-line no-unused-vars
    radioButtonChange(label, value) {
      this.$store.state.masters.expressRegionsTripTableData = null;
      if (
        value == "Van" ||
        value == "Bike" ||
        value == "FSR" ||
        value == "Project"
      ) {
        this.$store.state.sales.quotationDialogLoadState = value;
      }
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // v-on:childToParent="
        //   openDialog('QuotationTypeDialog', 'salesSales', 'Select Method')
        // "

        let Type =
          this.details["customer_type"] + this.details["business_method"];

        this.$store.dispatch("salesSales/closeDialog");

        let getType = this.DialogTypeHandler(Type);

        if (getType == "NoDataFound") {
          this.noServiceError = "Please select a Service Type";
        } else {
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: getType,
              dialogHeader: "Quotation",
            },
          });
        }
        // this.$store.dispatch("salesSales/openDialog", {
        //   dialogDetails: {
        //     dialogName: this.DialogTypeHandler(Type),
        //     dialogHeader: "",
        //   },
        // });
        this.$store.getters["salesSales/controlActivityDialog"];
      }
    },

    DialogTypeHandler(type) {
      let name;
      switch (type) {
        case "ExpressContract":
          this.clearQuotationData();
           this.setEXCStateValue({updateType : "quotation"});
          this.$store.state.salesExpressContract.flowStep = 0;
          this.$store.state.salesExpressContract.stepperNavigation = null;
          this.$store.state.salesExpressContract.ExpressContractFlowStepperData =
            [
              {
                index: 0,
                label: "1",
                component: "SalesExpressContractFirstStep",
                name: "Add Address",
              },
              {
                index: 1,
                label: "2",
                component: "SalesExpressContractSecondStep",
                name: "Select Method",
              },
            ];
          name = "ExpressContractQuotationDialog";
          break;
        case "ExpressContractBike":
          name = "ExpressContractBikeQuotationDialog";
          break;
        case "ExpressContractVan":
          name = "ExpressContractVanQuotationDialog";
          break;
        case "ExpressContractFSR":
          name = "ExpressContractFsrDialog";
          break;
        case "ExpressContractProject":
          name = "ExpressContractProjectjobsQuotationDialog";
          break;
        case "ExpressContractInter Company (Bike+ Van)":
          name = "ExpressContractInterCompanyChargesQuotationDialog";
          break;
        case "ExpressContractBike + FSR":
          name = "ExpressContractBikeFSRQuotationDialog";
          break;
        case "ExpressContractVan + FSR":
          name = "ExpressContractVanFSRQuotationDialog";
          break;
        case "ExpressContractVan + Project":
          name = "ExpressContractVanProjectJobsQuotationDialog";
          break;
        case "ExpressContractBike + Project":
          name = "ExpressContractBikeProjectJobsQuotationDialog";
          break;
        case "ExpressAdhoc":
          name = "ExpressContractAdhocQuotationDialog";
          break;
        case "InternationalAgent":
          this.$store.state.salesInternationalAgent.stepperNavigation = null;
          name = "InternationalAgentQuotationDialog";
          break;
        case "InternationalAdhoc":
          name = "InternationalAdhocQuotationDialog";
          break;
        case "InternationalContract":
          name = "InternationalContractQuotationDialog";
          break;
        case "RapidoAdhoc":
          name = "RapidoAdhocQuotationDialog";
          break;
        case "RapidoContract":
          name = "RapidoContractQuotationDialog";
          break;
        default:
          name = "NoDataFound";
      }
      return name;
    },
    capitalizeFirstLetter(string) {
      if (string != "") {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    getDropDownData(type) {
      let data;
      if (type == "International") {
        data = [
          { name: "Agent", code: "AG" },
          { name: "Adhoc", code: "AD" },
          { name: "Contract", code: "CT" },
        ];
        if(this.profileCreationData.profile_type == 'company'){
          data = [
          { name: "Agent", code: "AG" },
          { name: "Contract", code: "CT" },
        ];
        }
        
      } else {
        data = [
          { name: "Adhoc", code: "AD" },
          { name: "Contract", code: "CT" },
        ];
        if(this.profileCreationData.profile_type == 'company'){
           data = [
          { name: "Contract", code: "CT" },
        ];
      }
      
    }
    return data;
  }
  },

  watch: {
    "details.customer_type": function () {
      this.quotationTypes[0] = this.details.customer_type;

      this.bindData();
    },
    "details.business_method": function () {
      this.quotationTypes[1] = this.details.business_method;
      this.bindData();
    },
  },
};
</script>

<style scoped>
.txt {
  font-size: 14px;
  font-weight: bold;
  color: black;
}
.btn {
  font-size: 14px;
}
.textA {
  color: black;
}

.draganddrop {
  text-align: center !important;
}
</style>