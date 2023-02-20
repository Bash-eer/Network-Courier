<template>
  <Dialog
    v-model:visible="$store.state['salesSales'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div
          v-if="
            dialogComponent == 'CompanyCreationDialog' ||
            dialogComponent == 'ExpressContractBikeFSRQuotationDialog'
          "
          class="flex"
        >
          <h4 class="font-size-14">Add</h4>
        </div>
        <div class="flex flex-column" v-else>
          <span>{{ $store.state["salesSales"].dialogHeader }}</span>
          <span class="m-0 p-0 font-size-12 color-4e5968">{{
            $store.state["salesSales"].dialogHeaderId
          }}</span>
        </div>
        <div v-if="dialogOption == ''" class="flex mr-3">
          <div class="flex flex-column ml-3 p-0 mr-3">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Created On</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">{{ date }}</p>
          </div>
          <img
            :src="this.$store.state.commonStore.userDetails?.profile_url ?? ''"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Sales person</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">
              {{ this.$store.state.commonStore.loggedInUser ?? "" }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import moment from "moment";
//dialogs
//region
// import AddNewRegion from "./Dialogs/Regions/AddNewRegion.vue";
// //rate
// import AddNewRate from "./Dialogs/Rates/AddNewRate.vue";
// import CloneRateCardDialog from "./Dialogs/CloneRateCard.vue";
import CompanyCreationDialog from "./Dialogs/CompanyCreation/companyCreationDialog.vue";
import QuotationTypeDialog from "./Dialogs/Common/QuotationType.vue";
import ExpressContractFsrDialog from "./Dialogs/Common/Express/Contract/FSR/FSRNew.vue";
import ExpressContractAdhocQuotationDialog from "./Dialogs/Common/Express/Adhoc/Index.vue";
import ExpressContractVanQuotationDialog from "./Dialogs/Common/Express/Contract/Van/Index.vue";
import ExpressContractQuotationDialog from "./Dialogs/Common/Express/Contract/Index.vue";
import ExpressContractProjectjobsQuotationDialog from "./Dialogs/Common/Express/Contract/Projectjobs/Index.vue";
import ExpressContractInterCompanyChargesQuotationDialog from "./Dialogs/Common/Express/Contract/InterCompanyCharges/Index.vue";
import ExpressContractBikeFSRQuotationDialog from "./Dialogs/Common/Express/Contract/BikeFSR/Index.vue";
import ExpressContractVanFSRQuotationDialog from "./Dialogs/Common/Express/Contract/VanFSR/Index.vue";
import ExpressContractVanProjectJobsQuotationDialog from "./Dialogs/Common/Express/Contract/VanProjectjobs/Index.vue";
import ExpressContractBikeQuotationDialog from "./Dialogs/Common/Express/Contract/Bike/Index.vue";
import ExpressContractBikeProjectJobsQuotationDialog from "./Dialogs/Common/Express/Contract/BikeProjectJobs/Index.vue";
import RateAdjustment from "./Dialogs/Common/Express/Contract/RateAdjustment.vue";
import RateAdjustmentInterCompany from "./Dialogs/Common/Express/Contract/RateAdjustmentInterCompany.vue";

//International
import InternationalAgentQuotationDialog from "./Dialogs/Common/International/Agent/Index.vue";
import InternationalContractQuotationDialog from "./Dialogs/Common/International/Contract/Index.vue";
import InternationalAdhocQuotationDialog from "./Dialogs/Common/International/Adhoc/Index.vue";
import InternationalAdhocDialogOne from "./Dialogs/Common/International/Adhoc/InternationalAdhocDialogOne.vue";
//Rapido
import RapidoAdhocEcommerceEditDialog from "./Dialogs/Common/Rapido/Adhoc/EditEcommerce.vue";
import RapidoAdhocQuotationDialog from "./Dialogs/Common/Rapido/Adhoc/Index.vue";
import RapidoContractQuotationDialog from "./Dialogs/Common/Rapido/Contract/Index.vue";

import ExpansionContents from "./Bulk Adjustment/ExpansionContents.vue";
//Bulkadjustment
import Selectprofile from "./Bulk Adjustment/BulkAdujustment.vue/FirstStepper.vue";
import BulkAdjustmentDialog from "../Sales/Bulk Adjustment/BulkAdujustment.vue/BulkSAdjustmentDialog.vue";
import EditAdjustment from "./Bulk Adjustment/BulkAdujustment.vue/EditAdjustment.vue";
import EditAdjustmentTwo from "./Bulk Adjustment/BulkAdujustment.vue/EditAdjustmentTwo.vue";
import FollowUpDialog from "./Bulk Adjustment/BulkAdujustment.vue/FollowUpDialog.vue";

//common
import ContractTerminationDialog from "../QuotationTypes/Common/Dialogs/Termination.vue";
import CreateProfile from "./Dialogs/Common/AdhocNewProfile.vue";
import QuotationStatus from "./Dialogs/Common/QuotationStatus.vue";

//promote to contract
import PromoteToContract from "../../Settings/Quotation/Dialog/PromoteToContract.vue";
import { sales_co } from "../../../store/helper";
export default {
  props: ["displayDialog", "dialogComponent"],
  data: () => ({
    date: "",
  }),
  computed: {
    ...sales_co,
  },
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "QuotationTypeDialog") {
        return "65vw";
      }
      if (this.dialogComponent == "QuotationStatus") {
        return "35vw";
      }
      if (this.dialogComponent == "QuotationStatus") {
        return "65vw";
      }
      if (this.dialogComponent == "ExpressContractBikeQuotationDialog") {
        return "60vw";
      }
      if (this.dialogComponent == "ContractTerminationDialog") {
        return "50vw";
      }

      return "80vw";
    },
  },
  components: {
    Dialog,
    // AddNewRegion,
    // AddNewRate,
    // CloneRateCardDialog,
    CompanyCreationDialog,
    QuotationTypeDialog,
    Selectprofile,
    FollowUpDialog,
    ////ExpressContract
    ExpressContractAdhocQuotationDialog,
    ExpressContractBikeQuotationDialog,
    ExpressContractFsrDialog,
    ExpressContractVanQuotationDialog,
    ExpressContractQuotationDialog,
    ExpressContractProjectjobsQuotationDialog,
    ExpressContractInterCompanyChargesQuotationDialog,
    ExpressContractBikeFSRQuotationDialog,
    ExpressContractVanFSRQuotationDialog,
    ExpressContractVanProjectJobsQuotationDialog,
    ExpressContractBikeProjectJobsQuotationDialog,
    RateAdjustment,
    RateAdjustmentInterCompany,

    ////International
    InternationalAgentQuotationDialog,
    InternationalContractQuotationDialog,
    InternationalAdhocQuotationDialog,
    InternationalAdhocDialogOne,

    //Rapido
    RapidoAdhocQuotationDialog,
    RapidoContractQuotationDialog,
    RapidoAdhocEcommerceEditDialog,
    ExpansionContents,
    ContractTerminationDialog,
    BulkAdjustmentDialog,
    EditAdjustment,
    EditAdjustmentTwo,

    // AdhocProfile
    CreateProfile,
    QuotationStatus,

    PromoteToContract,
  },
  created() {
    this.date = moment().format("D MMM YYYY");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.activityLogHeader {
  color: #7e84a7;
  font-size: 11px;
}
.dialogToggleText {
  font-weight: bold;
}
</style>
