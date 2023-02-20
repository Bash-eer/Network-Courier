<template>
  <Dialog
    v-model:visible="$store.state['quotation'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{ $store.state["quotation"].dialogHeader }}</template>
    <div
      v-if="dialogComponent == 'Termination'"
      class="flex justify-content-between w-full"
    >
      <div class="flex"></div>
      <div class="flex mr-3">
        <img :src="'/images/' + 'profile-girl' + '.png'" alt="img" width="40" />
        <div class="flex flex-column ml-3 p-0">
          <p class="m-0 p-0">Sales person</p>
          <p class="m-0 p-0">Jasmine</p>
        </div>
      </div>
    </div>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import QuotationAddNewDialog from "../Quotation/Dialogs/QuotationAddNewDialog.vue";
import ContractApprovalDialog from "../Quotation/Dialogs/ContractApprovalDialog.vue";
import ContractTerminationDialog from "../Quotation/Dialogs/ContractTerminationDialog.vue";
import ExpressAdhocQuotationDialog from "../Quotation/Dialogs/ExpressAdhocQuotationDialog.vue";
import ExpressAdhocBikeCategory from "../Quotation/Dialogs/ExpressAdhocBikeCategory.vue";
import ExpressAdhocVanCategory from "../Quotation/Dialogs/ExpressAdhocVanCategory.vue";
import InternationalAdhocDialog from "../Quotation/Dialog/InternationalAdhocDialog.vue";

// Project Jobs
import SalesProjectJobs from "./Dialogs/SalesProjectJobsDialog/SaleProjectJobs.vue";
import SalesProjectJobsQuotationDialog from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsQuotationDialog.vue";
import SalesProjectJobsSelectMethod from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSelectMethod.vue";
import SalesProjectJobsTripsDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsTripsDetails.vue";
import SalesProjectJobsCostingDetails from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsCostingDetails.vue";
import SalesProjectJobsSendQuotations from "./Dialogs/SalesProjectJobsDialog/SalesProjectJobsSendQuotations.vue";

//FSR
import FSRNew from "./Dialogs/FSRDialog/FSRNew.vue";
import FSRQuotationDialog from "./Dialogs/FSRDialog/FSRQuotationDialog.vue";
import FSRSelectMethodDialog from "./Dialogs/FSRDialog/FSRSelectMethodDialog.vue";
import FSRCostingDetailsDialog from "./Dialogs/FSRDialog/FSRCostingDetailsDialog.vue";
import FSRSendQuotationsDialog from "./Dialogs/FSRDialog/FSRSendQuotationsDialog.vue";

//FSR+Van
import FSRVanNew from "./Dialogs/FSRVanDialog/FSRVanNew.vue";
import FSRVanQuotationDialog from "./Dialogs/FSRVanDialog/FSRVanQuotationDialog.vue";
import FSRVanSelectMethodDialog from "./Dialogs/FSRVanDialog/FSRVanSelectMethodDialog.vue";
import FSRVanTripDetailsDialog from "./Dialogs/FSRVanDialog/FSRVanTripDetailsDialog.vue";
import FSRVanCostingDetails from "./Dialogs/FSRVanDialog/FSRVanCostingDetailsDialog.vue";
import FSRVanSendQuotation from "./Dialogs/FSRVanDialog/FSRSendQuotationDialog.vue";

//Express Contract Bike
import ContractBikeNew from "./Dialogs/ExpressContractBike/ContractBikeNew.vue";
import ContractBikeCostCenter from "./Dialogs/ExpressContractBike/ContractBikeCostCenterDialog.vue";
import ContractBikeContact from "./Dialogs/ExpressContractBike/ContractBikeContactDialog.vue";
import ContractBikeTripDetails from "./Dialogs/ExpressContractBike/ContractBikeTripDetailsDialog.vue";
import ContractBikeSendQuotations from "./Dialogs/ExpressContractBike/ContractBikeSendQuotationDialog.vue";

// InterCharges Company
import InterCompanyNew from "./Dialogs/InterCompanyCharges/InterCompanyNew.vue";
import InterCompanyQuotation from "./Dialogs/InterCompanyCharges/InterCompanyQuotationDialog.vue";
import InterCompanySelectMethod from "./Dialogs/InterCompanyCharges/InterCompanySelectMethodDialog.vue";
import InterCompanyTripDetails from "./Dialogs/InterCompanyCharges/InterCompanyTripDetailsDialog.vue";
import InterCompanyCostingDetails from "./Dialogs/InterCompanyCharges/InterCompanyCostingDetailsDialog.vue";
import InterCompanySendQuotations from "./Dialogs/InterCompanyCharges/InterCompanySendQuotationDialog.vue";

//Express Contract-Bike
import ExpressContractBikeNew from "./Dialogs/ContractBike/ExpressContractBikeNew.vue";
import AddBikeQuotation from "./Dialogs/ContractBike/AddBikeQuotationDialog.vue";
import AddBikeSelectMethod from "./Dialogs/ContractBike/AddBikeSelectMethodDialog.vue";
import AddBikeTripDetails from "./Dialogs/ContractBike/AddBikeTripDetailsDialog.vue";
import AddBikeCostingDetails from "./Dialogs/ContractBike/AddBikeCostingDetailsDialog.vue";
import AddBikeSendQuotation from "./Dialogs/ContractBike/AddBikeSendQuotationDialog.vue";

//Van Project Jobs
import VanFSRQuotationDialog from "./Dialogs/VanProjectJobs/VanFSRQuotationDialog.vue";
import AddAddressDialog from "./Dialogs/VanProjectJobs/AddAddressDialog.vue";
import AddContractSendQuotationDialog from "./Dialogs/VanProjectJobs/AddContractSendQuotationDialog.vue";
import AddCostingDetailsDialog from "./Dialogs/VanProjectJobs/AddCostingDetailsDialog.vue";
import AddSelectMethodDialog from "./Dialogs/VanProjectJobs/AddSelectMethodDialog.vue";
import AddTripDetailsDialog from "./Dialogs/VanProjectJobs/AddTripDetailsDialog.vue";

//Bike + FSR
import BikeFSRQuotationDialog from "./Dialogs/BikeFSR/BikeFSRQuotationDialog.vue";
import AddBikeAddress from "./Dialogs/BikeFSR/AddBikeAddressDialog.vue";
import AddBikeSelectMethodDialog from "./Dialogs/BikeFSR/AddBikeSelectMethodDialog.vue";
import AddBikeTripDetailsDialog from "./Dialogs/BikeFSR/AddBikeTripDetailsDialog.vue";
import AddBikeCostingDetailsDialog from "./Dialogs/BikeFSR/AddBikeCostingDetailsDialog.vue";
import AddBikeSendQuotationDialog from "./Dialogs/BikeFSR/AddBikeSendQuotationDialog.vue";

// International Agent
import InternationalAgentDialog from "./Dialogs/InternationalAgent/InternationalAgentDialog.vue";
import AddProfileDialog from "./Dialogs/InternationalAgent/AddProfileDialog.vue";
import AddMethodDialog from "./Dialogs/InternationalAgent/AddMethodDialog.vue";
import AddQuestionnaireDialog from "./Dialogs/InternationalAgent/AddQuestionnaireDialog.vue";
import AddPermitSettingsDialog from "./Dialogs/InternationalAgent/AddPermitSettingsDialog.vue";
import AddOnForwardingDialog from "./Dialogs/InternationalAgent/AddOnForwardingDialog.vue";
import AddSendQuotationDialog from "./Dialogs/InternationalAgent/AddSendQuotationDialog.vue";
import AddCostingDialog from "./Dialogs/InternationalAgent/AddCostingDialog.vue";

import AdjustmentAddUser from "../Quotation/Dialog/AdjustmentAddUser.vue";
import AddFollowUp from "../Quotation/Dialog/AddFollowUp.vue";
import RateAdjustmentHistory from "../Quotation/Dialog/RateAdjustmentsHistory";
import AddCostCenter from "../Quotation/Dialog/AddCostCenter.vue";
import Termination from "../Quotation/Dialog/Termination.vue";
import Upload from "../Quotation/Dialog/Upload.vue";
import BikeAddFollowUp from "../Quotation/Dialog/BikeAddFollowUp.vue";
import AddBillingPreferences from "../Quotation/Dialog/AddBillingPreferences.vue";
import ExpressContractEdit from "../Quotation/Dialogs/ExpressContractEditDialog.vue";
export default {
  components: {
    Dialog,
    QuotationAddNewDialog,
    ContractApprovalDialog,
    ContractTerminationDialog,
    ExpressAdhocQuotationDialog,
    ExpressAdhocBikeCategory,
    ExpressAdhocVanCategory,
    InternationalAdhocDialog,

    // Project Jobs
    SalesProjectJobs,
    SalesProjectJobsQuotationDialog,
    SalesProjectJobsSelectMethod,
    SalesProjectJobsTripsDetails,
    SalesProjectJobsCostingDetails,
    SalesProjectJobsSendQuotations,

    //FSR
    FSRNew,
    FSRQuotationDialog,
    FSRSelectMethodDialog,
    FSRCostingDetailsDialog,
    FSRSendQuotationsDialog,

    //FSR+Van
    FSRVanNew,
    FSRVanQuotationDialog,
    FSRVanSelectMethodDialog,
    FSRVanTripDetailsDialog,
    FSRVanCostingDetails,
    FSRVanSendQuotation,

    //Express Contract Bike
    ContractBikeNew,
    ContractBikeCostCenter,
    ContractBikeContact,
    ContractBikeTripDetails,
    ContractBikeSendQuotations,

    //Express Contract Bike (5 steps)
    ExpressContractBikeNew,
    AddBikeQuotation,
    AddBikeSelectMethod,
    AddBikeTripDetails,
    AddBikeCostingDetails,
    AddBikeSendQuotation,

    //Van Project Jobs
    VanFSRQuotationDialog,
    AddAddressDialog,
    AddContractSendQuotationDialog,
    AddCostingDetailsDialog,
    AddSelectMethodDialog,
    AddTripDetailsDialog,

    //Bike + FSR
    BikeFSRQuotationDialog,
    AddBikeAddress,
    AddBikeSelectMethodDialog,
    AddBikeCostingDetailsDialog,
    AddBikeTripDetailsDialog,
    AddBikeSendQuotationDialog,

    // International Agent
    InternationalAgentDialog,
    AddProfileDialog,
    AddMethodDialog,
    AddQuestionnaireDialog,
    AddPermitSettingsDialog,
    AddOnForwardingDialog,
    AddSendQuotationDialog,
    AddCostingDialog,

    //InterCompanyCharges
    InterCompanyNew,
    InterCompanyQuotation,
    InterCompanySelectMethod,
    InterCompanyTripDetails,
    InterCompanyCostingDetails,
    InterCompanySendQuotations,

    AdjustmentAddUser,
    AddFollowUp,
    RateAdjustmentHistory,
    AddCostCenter,
    Termination,
    Upload,
    BikeAddFollowUp,
    AddBillingPreferences,
    ExpressContractEdit,
  },
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      return "65vw";
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogToggleText {
  font-weight: bold;
}
</style>
