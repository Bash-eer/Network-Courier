<template>
  <div class="w-20">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div class="flex flex-row">
            <div class="flex">
              <span
                class="p-steps-number steps"
                :id="item.component"
                :style="getStepColor(item.index)"
                >{{ item.label }}
              </span>
            </div>
            <div class="flex mt-2 ml-1 stepNames">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </a>
      </template>
    </Steps>
  </div>

  <div v-for="steps of stepperData" :key="steps.label">
    <keep-alive>
      <component :is="steps.component" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
</template>

<script>
//Dialog
//Project Job
import SalesProjectJobsQuotationDialog from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsQuotationDialog.vue";
import SalesProjectJobsSelectMethod from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSelectMethod.vue";
import SalesProjectJobsTripsDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsTripsDetails.vue";
import SalesProjectJobsCostingDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsCostingDetails.vue";
import SalesProjectJobsSendQuotations from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSendQuotations.vue";
//FSR
import FSRQuotationDialog from "./Dialogs/FSRDialog/FSRQuotationDialog.vue";
import FSRSelectMethodDialog from "./Dialogs/FSRDialog/FSRSelectMethodDialog.vue";
import FSRCostingDetailsDialog from "./Dialogs/FSRDialog/FSRCostingDetailsDialog.vue";
import FSRSendQuotationsDialog from "./Dialogs/FSRDialog/FSRSendQuotationsDialog.vue";


// FSR+Van
import FSRVanQuotationDialog from "./Dialogs/FSRVanDialog/FSRVanQuotationDialog.vue";
import FSRVanSelectMethodDialog from "./Dialogs/FSRVanDialog/FSRVanSelectMethodDialog.vue";
import FSRVanTripDetailsDialog from "./Dialogs/FSRVanDialog/FSRVanTripDetailsDialog.vue";
import FSRVanCostingDetails from "./Dialogs/FSRVanDialog/FSRVanCostingDetailsDialog.vue";
import FSRVanSendQuotation from "./Dialogs/FSRVanDialog/FSRSendQuotationDialog.vue";


// Express Contract Bike
import ContractBikeCostCenter from "./Dialogs/ExpressContractBike/ContractBikeCostCenterDialog.vue";
import ContractBikeContact from "./Dialogs/ExpressContractBike/ContractBikeContactDialog.vue";
import ContractBikeTripDetails from "./Dialogs/ExpressContractBike/ContractBikeTripDetailsDialog.vue";
import ContractBikeSendQuotations from "./Dialogs/ExpressContractBike/ContractBikeSendQuotationDialog.vue";

// Express Contract Bike (5Steps)
import AddBikeQuotation from "./Dialogs/ContractBike/AddBikeQuotationDialog.vue";
import AddBikeSelectMethod from "./Dialogs/ContractBike/AddBikeSelectMethodDialog.vue";
import AddBikeTripDetails from "./Dialogs/ContractBike/AddBikeTripDetailsDialog.vue";
import AddBikeCostingDetails from "./Dialogs/ContractBike/AddBikeCostingDetailsDialog.vue";
import AddBikeSendQuotation from "./Dialogs/ContractBike/AddBikeSendQuotationDialog.vue";
// Inter Company
import InterCompanyQuotation from "./Dialogs/InterCompanyCharges/InterCompanyQuotationDialog.vue";
import InterCompanySelectMethod from "./Dialogs/InterCompanyCharges/InterCompanySelectMethodDialog.vue";
import InterCompanyTripDetails from "./Dialogs/InterCompanyCharges/InterCompanyTripDetailsDialog.vue";
import InterCompanyCostingDetails from "./Dialogs/InterCompanyCharges/InterCompanyCostingDetailsDialog.vue";
import InterCompanySendQuotations from "./Dialogs/InterCompanyCharges/InterCompanySendQuotationDialog.vue";

//Van Project Jobs
import AddAddressDialog from "./Dialogs/VanProjectJobs/AddAddressDialog.vue";
import AddContractSendQuotationDialog from "./Dialogs/VanProjectJobs/AddContractSendQuotationDialog.vue";
import AddCostingDetailsDialog from "./Dialogs/VanProjectJobs/AddCostingDetailsDialog.vue";
import AddSelectMethodDialog from "./Dialogs/VanProjectJobs/AddSelectMethodDialog.vue";
import AddTripDetailsDialog from "./Dialogs/VanProjectJobs/AddTripDetailsDialog.vue";

//Bike + FSR
import AddBikeAddress from "./Dialogs/BikeFSR/AddBikeAddressDialog.vue";
import AddBikeSelectMethodDialog from "./Dialogs/BikeFSR/AddBikeSelectMethodDialog.vue";
import AddBikeTripDetailsDialog from "./Dialogs/BikeFSR/AddBikeTripDetailsDialog.vue";
import AddBikeCostingDetailsDialog from "./Dialogs/BikeFSR/AddBikeCostingDetailsDialog.vue";
import AddBikeSendQuotationDialog from "./Dialogs/BikeFSR/AddBikeSendQuotationDialog.vue";

//Sales Express Van
import SalesExpressVanQuotationDialog from "./Dialog/SalesExpressContractVanDialog/SalesExpressVanQuotationDialog.vue";
import SalesExpressVanSelectMethodDialog from "./Dialog/SalesExpressContractVanDialog/SalesExpressVanSelectMethodDialog.vue";
import SalesExpressVanTripDetailsDialog from "./Dialog/SalesExpressContractVanDialog/SalesExpressVanTripDetailsDialog.vue";
import SalesExpressVanCostingDetailsDialog from "./Dialog/SalesExpressContractVanDialog/SalesExpressVanCostingDetailsDialog.vue";
import SalesExpressSendQuotationDialog from "./Dialog/SalesExpressContractVanDialog/SalesExpressSendQuotationDialog.vue";

//International Agent
import AddProfileDialog from "./Dialogs/InternationalAgent/AddProfileDialog.vue";
import AddMethodDialog from "./Dialogs/InternationalAgent/AddMethodDialog.vue";
import AddQuestionnaireDialog from "./Dialogs/InternationalAgent/AddQuestionnaireDialog.vue";
import AddPermitSettingsDialog from "./Dialogs/InternationalAgent/AddPermitSettingsDialog.vue";
import AddOnForwardingDialog from "./Dialogs/InternationalAgent/AddOnForwardingDialog.vue";
import AddSendQuotationDialog from "./Dialogs/InternationalAgent/AddSendQuotationDialog.vue";
import AddCostingDialog from "./Dialogs/InternationalAgent/AddCostingDialog.vue";
//Rapdio 
import SalesRapidoAddAddress from "./Dialog/SalesRapido/SalesRapidoAddAddress.vue";
import SalesRapidoProductDetails from "./Dialog/SalesRapido/SalesRapidoProductDetails.vue";
import SalesRapidoSelectedMethod from "./Dialog/SalesRapido/SalesRapidoSelectedMethod.vue";
import SalesRapidoSendQuotations from "./Dialog/SalesRapido/SalesRapidoSendQuotations.vue";
import SalesRapidoCharges from "./Dialog/SalesRapido/SalesRapidoCharges/index.vue";

import Steps from "primevue/steps";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,

    // ProjectJobs
    SalesProjectJobsQuotationDialog,
    SalesProjectJobsSelectMethod,
    SalesProjectJobsTripsDetails,
    SalesProjectJobsCostingDetails,
    SalesProjectJobsSendQuotations,
    AddAddressDialog,
    AddSelectMethodDialog,
    AddTripDetailsDialog,
    AddCostingDetailsDialog,
    AddContractSendQuotationDialog,
    //FSR
    FSRQuotationDialog,
    FSRSelectMethodDialog,
    FSRCostingDetailsDialog,
    FSRSendQuotationsDialog,

    //FSR+Van
    FSRVanQuotationDialog,
    FSRVanSelectMethodDialog,
    FSRVanTripDetailsDialog,
    FSRVanCostingDetails,
    FSRVanSendQuotation,

    // Express Contract Bike
    ContractBikeCostCenter,
    ContractBikeContact,
    ContractBikeTripDetails,
    ContractBikeSendQuotations,

    //Bike+FSR
    AddBikeAddress,
    AddBikeSelectMethodDialog,
    AddBikeCostingDetailsDialog,
    AddBikeTripDetailsDialog,
    AddBikeSendQuotationDialog,

    // International Agent
    AddProfileDialog,
    AddMethodDialog,
    AddQuestionnaireDialog,
    AddPermitSettingsDialog,
    AddOnForwardingDialog,
    AddSendQuotationDialog,
    AddCostingDialog,

    //Express Contract Bike (5steps)
    AddBikeQuotation,
    AddBikeSelectMethod,
    AddBikeTripDetails,
    AddBikeCostingDetails,
    AddBikeSendQuotation,
    //InterCompany Charges
    InterCompanyQuotation,
    InterCompanySelectMethod,
    InterCompanyTripDetails,
    InterCompanyCostingDetails,
    InterCompanySendQuotations,

    // Sales-Rapido
    SalesRapidoAddAddress,
    SalesRapidoProductDetails,
    SalesRapidoSelectedMethod,
    SalesRapidoSendQuotations,
    SalesRapidoCharges,

    //Sales Express Van
    SalesExpressVanQuotationDialog,
    SalesExpressVanSelectMethodDialog,
    SalesExpressVanTripDetailsDialog,
    SalesExpressVanCostingDetailsDialog,
    SalesExpressSendQuotationDialog,
  },
  data: () => ({
    stepperId: null,
  }),
  methods: {
    getStepColor(i) {
      if (i == 0) {
        return "background-color:#3057FF";
      } else {
        return "background-color:#7E84A7";
      }
    },
    stepChange(e) {
      this.stepperId = e;
      for (var steps in this.stepperData) {
        var steps_obj = this.stepperData[steps];
        if (steps_obj.component == e) {
          document.getElementById(e).style.backgroundColor = "#3057FF";
        }
      }
    },
  },
  watch: {
    "$store.state.quotation.stepperNavigation": function () {
      if (this.$store.state.quotation.stepperNavigation != null) {
        this.stepChange(this.$store.state.quotation.stepperNavigation);
      }
    },
  },
  created() {
    this.stepperId = this.stepId;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.color-4e5868 {
  color: $color-4e5868;
}
</style>
