<template>
  <div class="w-15">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div class="flex flex-row">
            <!-- <div class="flex"> -->
            <span
              class="p-steps-number steps"
              :id="item.component"
              :style="getStepColor(item.index)"
              >{{ item.label }}
            </span>
            <!-- </div> -->
            <div class="mt-2 ml-1 stepNames">
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
// import SalesProjectJobsQuotationDialog from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsQuotationDialog.vue";
// import SalesProjectJobsSelectMethod from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSelectMethod.vue";
// import SalesProjectJobsTripsDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsTripsDetails.vue";
// import SalesProjectJobsCostingDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsCostingDetails.vue";
// import SalesProjectJobsSendQuotations from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSendQuotations.vue";
//FSR
import FSRQuotationDialog from "./Express/Contract/FSR/FSRQuotation.vue";
import FSRSelectMethodDialog from "./Express/Contract/FSR/FSRSelectMethod.vue";
import FSRCostingDetailsDialog from "./Express/Contract/FSR/FSRCostingDetails.vue";
import FSRSendQuotationsDialog from "./Express/Contract/FSR/FSRSendQuotations.vue";

// // FSR+Van
// import FSRVanQuotationDialog from "./Dialogs/FSRVanDialog/FSRVanQuotationDialog.vue";
// import FSRVanSelectMethodDialog from "./Dialogs/FSRVanDialog/FSRVanSelectMethodDialog.vue";
// import FSRVanTripDetailsDialog from "./Dialogs/FSRVanDialog/FSRVanTripDetailsDialog.vue";
// import FSRVanCostingDetails from "./Dialogs/FSRVanDialog/FSRVanCostingDetailsDialog.vue";
// import FSRVanSendQuotation from "./Dialogs/FSRVanDialog/FSRSendQuotationDialog.vue";

// // Express Contract Bike
// import ContractBikeCostCenter from "./Dialogs/ExpressContractBike/ContractBikeCostCenterDialog.vue";
// import ContractBikeContact from "./Dialogs/ExpressContractBike/ContractBikeContactDialog.vue";
// import ContractBikeTripDetails from "./Dialogs/ExpressContractBike/ContractBikeTripDetailsDialog.vue";
// import ContractBikeSendQuotations from "./Dialogs/ExpressContractBike/ContractBikeSendQuotationDialog.vue";

// Express Contract Bike
import SalesExpressContractBikeFirstStep from "./Express/Contract/Bike/FirstStep.vue";
import SalesExpressContractBikeSecondStep from "./Express/Contract/Bike/SecondStep.vue";
import SalesExpressContractBikeThirdStep from "./Express/Contract/Bike/ThirdStep.vue";
import SalesExpressContractBikeFourthStep from "./Express/Contract/Bike/FourthStep.vue";
import SalesExpressContractBikeFifthStep from "./Express/Contract/Bike/FifthStep.vue";

// Express Contract Van
import SalesExpressContractVanFirstStep from "./Express/Contract/Van/FirstStep.vue";
import SalesExpressContractVanSecondStep from "./Express/Contract/Van/SecondStep.vue";
import SalesExpressContractVanThirdStep from "./Express/Contract/Van/ThirdStep.vue";
import SalesExpressContractVanFourthStep from "./Express/Contract/Van/FourthStep.vue";
import SalesExpressContractVanFifthStep from "./Express/Contract/Van/FifthStep.vue";

// Express Contract ProjectJobs
import SalesExpressContractProjectjobsFirstStep from "./Express/Contract/Projectjobs/FirstStep.vue";
import SalesExpressContractProjectjobsSecondStep from "./Express/Contract/Projectjobs/SecondStep.vue";
import SalesExpressContractProjectjobsThirdStep from "./Express/Contract/Projectjobs/ThirdStep.vue";
import SalesExpressContractProjectjobsFourthStep from "./Express/Contract/Projectjobs/FourthStep.vue";
import SalesExpressContractProjectjobsFifthStep from "./Express/Contract/Projectjobs/FifthStep.vue";

//Express Contract  InterCompany Charge
import SalesExpressContractInterChargesFirstStep from "./Express/Contract/InterCompanyCharges/FirstStep.vue";
import SalesExpressContractInterChargesSecondStep from "./Express/Contract/InterCompanyCharges/SecondStep.vue";
import SalesExpressContractInterChargesThirdStep from "./Express/Contract/InterCompanyCharges/ThirdStep.vue";
import SalesExpressContractInterChargesFourthStep from "./Express/Contract/InterCompanyCharges/FourthStep.vue";
import SalesExpressContractInterChargesFifthStep from "./Express/Contract/InterCompanyCharges/FifthStep.vue";

//Express Contract Bike + FSR
import SalesExpressContractBikeFSRFirstStep from "./Express/Contract/BikeFSR/FirstStep.vue";
import SalesExpressContractBikeFSRSecondStep from "./Express/Contract/BikeFSR/SecondStep.vue";
import SalesExpressContractBikeFSRThirdStep from "./Express/Contract/BikeFSR/ThirdStep.vue";
import SalesExpressContractBikeFSRFourthStep from "./Express/Contract/BikeFSR/FourthStep.vue";
import SalesExpressContractBikeFSRFifthStep from "./Express/Contract/BikeFSR/FifthStep.vue";

//Express Contract Van + FSR
import SalesExpressContractVanFSRFirstStep from "./Express/Contract/VanFSR/FirstStep.vue";
import SalesExpressContractVanFSRSecondStep from "./Express/Contract/VanFSR/SecondStep.vue";
import SalesExpressContractVanFSRThirdStep from "./Express/Contract/VanFSR/ThirdStep.vue";
import SalesExpressContractVanFSRFourthStep from "./Express/Contract/VanFSR/FourthStep.vue";
import SalesExpressContractVanFSRFifthStep from "./Express/Contract/VanFSR/FifthStep.vue";

//Express Contract Van + Project Jobs
import SalesExpressContractVanProjectJobsFirstStep from "./Express/Contract/VanProjectjobs/FirstStep.vue";
import SalesExpressContractVanProjectJobsSecondStep from "./Express/Contract/VanProjectjobs/SecondStep.vue";
import SalesExpressContractVanProjectJobsThirdStep from "./Express/Contract/VanProjectjobs/ThirdStep.vue";
import SalesExpressContractVanProjectJobsFourthStep from "./Express/Contract/VanProjectjobs/FourthStep.vue";
import SalesExpressContractVanProjectJobsFifthStep from "./Express/Contract/VanProjectjobs/FifthStep.vue";

//Express Contract Bike + Proejct Jobs
import SalesExpressContractBikeProjectJobsFirstStep from "./Express/Contract/BikeProjectJobs/FirstStep.vue";
import SalesExpressContractBikeProjectJobsSecondStep from "./Express/Contract/BikeProjectJobs/SecondStep.vue";
import SalesExpressContractBikeProjectJobsThirdStep from "./Express/Contract/BikeProjectJobs/ThirdStep.vue";
import SalesExpressContractBikeProjectJobsFourthStep from "./Express/Contract/BikeProjectJobs/FourthStep.vue";
import SalesExpressContractBikeProjectJobsFifthStep from "./Express/Contract/BikeProjectJobs/FifthStep.vue";
//International Agent
import SalesInternationalAgentFirstStep from "./International/Agent/FirstStep.vue";
import SalesInternationalAgentSecondStep from "./International/Agent/SecondStep.vue";
import SalesInternationalAgentThirdStep from "./International/Agent/ThirdStep.vue";
import SalesInternationalAgentFourthStep from "./International/Agent/FourthStep.vue";
import SalesInternationalAgentFifthStep from "./International/Agent/FifthStep.vue";
import SalesInternationalAgentSixthStep from "./International/Agent/SixthStep.vue";
import SalesInternationalAgentSeventhStep from "./International/Agent/SeventhStep.vue";
//International Contract
// import SalesInternationalContractFirstStep from "./International/Contract/FirstStep.vue";
// import SalesInternationalContractSecondStep from "./International/Contract/SecondStep.vue";
// import SalesInternationalContractThirdStep from "./International/Contract/ThirdStep.vue";
// import SalesInternationalContractFourthStep from "./International/Contract/FourthStep.vue";
// import SalesInternationalContractFifthStep from "./International/Contract/FifthStep.vue";

// Rapido
import SalesRapidoContractFirstStep from "./Rapido/Contract/FirstStep.vue";
import SalesRapidoContractSecondStep from "./Rapido/Contract/SecondStep.vue";
import SalesRapidoContractThirdStep from "./Rapido/Contract/ThirdStep.vue";
import SalesRapidoContractFourthStep from "./Rapido/Contract/FourthStep.vue";
import SalesRapidoContractFifthStep from "./Rapido/Contract/FifthStep.vue";

// //Rapdio
// import SalesRapidoAddAddress from "./Dialog/SalesRapido/SalesRapidoAddAddress.vue";
// import SalesRapidoProductDetails from "./Dialog/SalesRapido/SalesRapidoProductDetails.vue";
// import SalesRapidoSelectedMethod from "./Dialog/SalesRapido/SalesRapidoSelectedMethod.vue";
// import SalesRapidoSendQuotations from "./Dialog/SalesRapido/SalesRapidoSendQuotations.vue";
// import SalesRapidoCharges from "./Dialog/SalesRapido/SalesRapidoCharges/index.vue";

import Steps from "primevue/steps";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,
    //bike
    FSRQuotationDialog,
    FSRSelectMethodDialog,
    FSRCostingDetailsDialog,
    FSRSendQuotationsDialog,

    //express-contract-bike
    SalesExpressContractBikeFirstStep,
    SalesExpressContractBikeSecondStep,
    SalesExpressContractBikeThirdStep,
    SalesExpressContractBikeFourthStep,
    SalesExpressContractBikeFifthStep,

    //Express Contract Van
    SalesExpressContractVanFirstStep,
    SalesExpressContractVanSecondStep,
    SalesExpressContractVanThirdStep,
    SalesExpressContractVanFourthStep,
    SalesExpressContractVanFifthStep,

    //Express Contract Project Jobs
    SalesExpressContractProjectjobsFirstStep,
    SalesExpressContractProjectjobsSecondStep,
    SalesExpressContractProjectjobsThirdStep,
    SalesExpressContractProjectjobsFourthStep,
    SalesExpressContractProjectjobsFifthStep,

    //Express Contract  InterCompany Charge
    SalesExpressContractInterChargesFirstStep,
    SalesExpressContractInterChargesSecondStep,
    SalesExpressContractInterChargesThirdStep,
    SalesExpressContractInterChargesFourthStep,
    SalesExpressContractInterChargesFifthStep,

    //Express Contract Bike + FSR
    SalesExpressContractBikeFSRFirstStep,
    SalesExpressContractBikeFSRSecondStep,
    SalesExpressContractBikeFSRThirdStep,
    SalesExpressContractBikeFSRFourthStep,
    SalesExpressContractBikeFSRFifthStep,

    //Express Contract Van + FSR
    SalesExpressContractVanFSRFirstStep,
    SalesExpressContractVanFSRSecondStep,
    SalesExpressContractVanFSRThirdStep,
    SalesExpressContractVanFSRFourthStep,
    SalesExpressContractVanFSRFifthStep,

    //Express Contract Van + ProjectJobs
    SalesExpressContractVanProjectJobsFirstStep,
    SalesExpressContractVanProjectJobsSecondStep,
    SalesExpressContractVanProjectJobsThirdStep,
    SalesExpressContractVanProjectJobsFourthStep,
    SalesExpressContractVanProjectJobsFifthStep,
    // Express Contract Bike + Proejct Jobs
    SalesExpressContractBikeProjectJobsFirstStep,
    SalesExpressContractBikeProjectJobsSecondStep,
    SalesExpressContractBikeProjectJobsThirdStep,
    SalesExpressContractBikeProjectJobsFourthStep,
    SalesExpressContractBikeProjectJobsFifthStep,

    //International Agent
    SalesInternationalAgentFirstStep,
    SalesInternationalAgentSecondStep,
    SalesInternationalAgentThirdStep,
    SalesInternationalAgentFourthStep,
    SalesInternationalAgentFifthStep,
    SalesInternationalAgentSixthStep,
    SalesInternationalAgentSeventhStep,

    //International Contract
    // SalesInternationalContractFirstStep,
    // SalesInternationalContractSecondStep,
    // SalesInternationalContractThirdStep,
    // SalesInternationalContractFourthStep,
    // SalesInternationalContractFifthStep,

    //Rapido Contract
    SalesRapidoContractFirstStep,
    SalesRapidoContractSecondStep,
    SalesRapidoContractThirdStep,
    SalesRapidoContractFourthStep,
    SalesRapidoContractFifthStep,

    // // International Agent
    // AddProfileDialog,
    // AddMethodDialog,
    // AddQuestionnaireDialog,
    // AddPermitSettingsDialog,
    // AddOnForwardingDialog,
    // AddSendQuotationDialog,
    // AddCostingDialog,

    //Express Contract Bike (5steps)
    // AddBikeQuotation,
    // AddBikeSelectMethod,
    // AddBikeTripDetails,
    // AddBikeCostingDetails,
    // AddBikeSendQuotation,
    //InterCompany Charges
    // InterCompanyQuotation,
    // InterCompanySelectMethod,
    // InterCompanyTripDetails,
    // InterCompanyCostingDetails,
    // InterCompanySendQuotations,

    // // Sales-Rapido
    // SalesRapidoAddAddress,
    // SalesRapidoProductDetails,
    // SalesRapidoSelectedMethod,
    // SalesRapidoSendQuotations,
    // SalesRapidoCharges,

    // //Sales Express Van
    // SalesExpressVanQuotationDialog,
    // SalesExpressVanSelectMethodDialog,
    // SalesExpressVanTripDetailsDialog,
    // SalesExpressVanCostingDetailsDialog,
    // SalesExpressSendQuotationDialog,
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
    "$store.state.salesQuotationDialog.stepperNavigation": function () {
      if (this.$store.state.salesQuotationDialog.stepperNavigation != null) {
        this.stepChange(
          this.$store.state.salesQuotationDialog.stepperNavigation
        );
      }
    },
    "$store.state.salesExpressContractFSR.stepperNavigation": function () {
      if (this.$store.state.salesExpressContractFSR.stepperNavigation != null) {
        this.stepChange(
          this.$store.state.salesExpressContractFSR.stepperNavigation
        );
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
</style>
