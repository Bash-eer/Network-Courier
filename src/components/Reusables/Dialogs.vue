<template>
  <Dialog
    v-model:visible="$store.state['users'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :position="
      dialogComponent == 'UserSettingsDialog' ||
      dialogComponent == 'DataTables' ||
      dialogComponent == 'AgentDialog' ||
      dialogComponent == 'companyCreationDialog' ||
      dialogComponent == 'AddNewExpressRateDialog' ||
      dialogComponent == 'GeneralQuotationDialog' ||
      dialogComponent == 'ResetConfirmation' ||
      dialogComponent == 'AddNewMultiTierRate' ||
      dialogComponent == 'SalesInternationalAdhocDialog' ||
      dialogComponent == 'ExpressContractVanDialog' ||
      dialogComponent == 'AddNewMultiTierRate' ||
      dialogComponent == 'AddNewRegion' ||
      dialogComponent == 'VehicleDetailsDialog' ||
      dialogComponent == 'SummonsDialog' ||
      dialogComponent == 'CoeDialog' ||
      dialogComponent == 'ClaimDialog' ||
      dialogComponent == 'InsuranceDialog' ||
      dialogComponent == 'RoadTaxDialog' ||
      dialogComponent == 'AccidentsDialog' ||
      dialogComponent == 'FuelCardDialog' ||
      dialogComponent == 'FuelHistoryDialog' ||
      dialogComponent == 'CashHistoryDialog' ||
      dialogComponent == 'CashCardDialog' ||
      dialogComponent == 'BillingPreferencesDialog' ||
      dialogComponent == 'CostCentresDialog' ||
      dialogComponent == 'AttachmentDialog' ||
      dialogComponent == 'FollowUpDialog' ||
      dialogComponent == 'FleetCommonDialog' ||
      dialogComponent == 'FuelVisaCardDialog' ||
      dialogComponent == 'CashVisaCardDialog' ||
      dialogComponent == 'CashTopUpDialog' ||
      dialogComponent == 'NewContactDialog' ||
      dialogComponent == 'NewGroupDialog' ||
      dialogComponent == 'NewInspectionDialog' ||
      dialogComponent == 'FleetFuelDialog' ||
      dialogComponent == 'FleetFuelDialog' ||
      dialogComponent == 'FleetMaintenanceDialog' ||
      dialogComponent == 'FleetInspectionDialog' ||
      dialogComponent == 'ContactEventGroupDialog' ||
      dialogComponent == 'EventAddInvites' ||
      dialogComponent == 'EventEditDialog' ||
      dialogComponent == 'RequestCancellation' ||
      dialogComponent == 'CancelRequestSentDialog' ||
      dialogComponent == 'RoomSettingsDialog' ||
      dialogComponent == 'EventStatusDialog' ||
      dialogComponent == 'EventAddFollowUp' ||
      dialogComponent == 'EDMDialog' ||
      dialogComponent == 'ContactsGroupDialog' ||
      dialogComponent == 'ContactsDialog' ||
      dialogComponent == 'MembersDialog' ||
      dialogComponent == 'DonationDialog' ||
      dialogComponent == 'AppointmentDialog' ||
      dialogComponent == 'CreateEventGroupsDialog' ||
      dialogComponent == 'InviteesDialog' ||
      dialogComponent == 'InviteesStatusDialog' ||
      dialogComponent == 'PrintLabelDialog' ||
      dialogComponent == 'ContactsFollowUpDialog' ||
      dialogComponent == 'ReportExportDialog' ||
      dialogComponent == 'NewClaimDialog'
        ? ''
        : 'right'
    "
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <!--add user dialog-->
      <!--add-user dialog header-->
     
      <div
        v-if="
          dialogComponent == 'UserSettingsDialog' ||
          dialogComponent == 'AgentDialog'
        "
        class="flex justify-content-between w-full"
      >
        <div class="flex dialog-add-user-text">
          <span>{{ $store.state["users"].dialogUserTitle }}</span>
        </div>
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex mr-2 align-self-center">
              <Toggle
                v-on:childToParent="activeControl"
                :key="$store.state['users'].userActivityControl"
                :check="$store.state['users'].userActivityControl"
              />
            </div>
            <div class="flex mr-4">
              <span class="dialogToggleText dialog-active-text">Active</span>
            </div>
          </div>
        </div>
      </div>
      <!--FleetCommonDialog -->
      <div v-if="dialogComponent == 'FleetCommonDialog'">
        Add {{ $store.state.masters.FleetCommonDialogName }}
      </div>
      <!-- FuelVisaCardDialog -->
      <div v-if="dialogComponent == 'FuelVisaCardDialog'">Card Details</div>
      <!-- CashVisaCardDialog -->
      <div v-if="dialogComponent == 'CashVisaCardDialog'">Card Details</div>
      <!-- CashTopUpDialog -->
      <div v-if="dialogComponent == 'CashTopUpDialog'">Card Topup</div>
      <div v-if="dialogComponent == 'FleetFuelDialog'">
        Add New Fuel Details
      </div>
      <div v-if="dialogComponent == 'FleetMaintenanceDialog'">
        Add New Maintenance
      </div>
      <div v-if="dialogComponent == 'FleetInspectionDialog'"
      class="flex ml-2 text-black-alpha-90 font-Medium"
      >
        Add New Inspection
      </div>
      <!-- contacts -->
      <div v-if="dialogComponent == 'ContactsDialog'">New Contact</div>
      <!--reset password-->
      <div v-if="dialogComponent == 'ResetConfirmation'"></div>
      <div v-if="dialogComponent == 'ProfileVerifyEmailDialog'">
        <p class="dialog-add-user-text">Verify your Email</p>
      </div>

      <!--activity log-->
      <!--activity-log dialog header-->
      <div
        v-if="dialogComponent == 'DataTables'"
        class="flex flex-row flex-wrap"
      >
        <div class="flex align-items-center justify-content-center mr-2 mt-4">
          <AvatarLabel
            v-bind:label="
              $store.state['users'].activityLogDialogData.username.charAt(0)
            "
          />
        </div>
        <div class="flex flex-column mt-4">
          <div class="flex align-items-center justify-content-center">
            <b>{{ $store.state["users"].activityLogDialogData.username }}</b>
          </div>
          <div class="flex activityLogHeader">Activity Log</div>
        </div>
      </div>
      <!--create - role dialog header-->
      <div v-if="dialogComponent == 'CreateRoleDialog'">
        <h4>{{ $store.state["users"].dialogRoleTitle }}</h4>
      </div>
      <!--sales dialog header -->
      <div
        v-if="dialogComponent == 'companyCreationDialog'"
        class="flex justify-content-between w-full"
      >
        <div class="flex"><h4>Add</h4></div>
        <div class="flex mr-3">
          <img
            :src="require('../../assets/crBadge.png')"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0">Sales person</p>
            <p class="m-0 p-0">Jasmine</p>
          </div>
        </div>
      </div>

      <div
        v-if="dialogComponent == 'FuelHistoryDialog'"
        class="flex justify-content-between w-full"
      >
        <div class="flex flex-row ml-3 p-0">
          <div class="flex">
            <img
              :src="require('../../../public/images/FuelHistory.png')"
              alt="img"
              width="40"
            />
          </div>
          <div class="flex">
            <div class="flex flex-column ml-3 p-0">
              <p class="m-0 p-0">Fuel Card History</p>
              <p class="m-0 p-0">334443343334</p>
            </div>
          </div>
        </div>
        <div class="flex mr-3">
          <img
            :src="require('../../../public/images/car.png')"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0">Driver</p>
            <p class="m-0 p-0">Lebron Wayde</p>
          </div>
          <Buttons
            label="Export"
            class="p-button-outlined mr-1 ml-5 dialog-button-text"
          />
        </div>
      </div>

      <div
        v-if="dialogComponent == 'CashHistoryDialog'"
        class="flex justify-content-between w-full"
      >
        <div class="flex flex-row ml-3 p-0">
          <div class="flex">
            <img
              :src="require('../../../public/images/FuelHistory.png')"
              alt="img"
              width="40"
            />
          </div>
          <div class="flex">
            <div class="flex flex-column ml-3 p-0">
              <p class="m-0 p-0">Cash Card History</p>
              <p class="m-0 p-0">
                {{
                  $store.state.masters.fleetsCardHistoryProcessedData.card_no
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex mr-3">
          <img
            :src="
              $store.state.masters.fleetsCardHistoryProcessedData.vehicle_img
            "
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0">Vehicle</p>
            <p class="m-0 p-0">
              {{
                $store.state.masters.fleetsCardHistoryProcessedData.vehicle_no
              }}
            </p>
          </div>
          <Buttons
            label="Export"
            class="p-button-outlined mr-1 ml-5 dialog-button-text"
          />
        </div>
      </div>
      <!--sales  - > SalesInternationalAdhocDialog -->
      <div
        v-if="
          dialogComponent == 'SalesInternationalAdhocDialog' ||
          dialogComponent == 'ExpressContractVanDialog'
        "
        class="flex justify-content-between w-full"
      >
        <div class="flex flex-column m-0">
          <p class="m-0">Quotation</p>
          <p class="m-0">NEC/SQ00370/2021</p>
        </div>

        <div class="flex mr-3">
          <img
            :src="require('../../assets/crBadge.png')"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0">Sales person</p>
            <p class="m-0 p-0">Jasmine</p>
          </div>
        </div>
      </div>
      <!-- reset password  -->
      <div v-if="dialogComponent == 'ProfileResetPasswordDialog'">
        <p class="dialog-add-user-text">Reset Password</p>
      </div>
      <!--add new region (rates -> express) header -->
      <div v-if="dialogComponent == 'AddNewRegion'">
        <div class="flex">Add New Region</div>
      </div>

      <div v-if="dialogComponent == 'MembersDialog'">
        <div class="flex"></div>
      </div>
      <div v-if="dialogComponent == 'NewInspectionDialog'">
        <div class="flex">Add New Inspection</div>
      </div>
      <!--add new express rate (rates -> express -> express rate) header -->
      <div v-if="dialogComponent == 'AddNewExpressRateDialog'">
        <div class="flex">Add New</div>
      </div>
      <div v-if="dialogComponent == 'PrintLabelDialog'">
        <div class="flex"></div>
        <div class="flex"></div>
      </div>

      <div v-if="dialogComponent == 'ContactsFollowUpDialog'">
        <div class="flex">Add Follow Up</div>
      </div>

      <div v-if="dialogComponent == 'FuelCardDialog'">
        <div class="flex">Add New Fuel Card</div>
      </div>

      <div v-if="dialogComponent == 'CashCardDialog'">
        <div class="flex">Add New Cash Card</div>
      </div>

      <!--add fleet management-->
      <div v-if="dialogComponent == 'VehicleDetailsDialog'">
        <div class=" fleet-vehicle-details-title ml-3">Add New Vehicle</div>
      </div>

      <!-- expenditure -->
      <div v-if="dialogComponent == 'SummonsDialog'">
        <div class="flex ml-3">Add New Summon</div>
      </div>
      <div v-if="dialogComponent == 'InviteesDialog'">
        <div class="flex ml-2">Add Invitees</div>
      </div>

      <div v-if="dialogComponent == 'InviteesStatusDialog'">
        <div class="flex ml-2">Edit Status</div>
      </div>

      <div v-if="dialogComponent == 'NewClaimDialog'">
        <div class="flex ml-2 Add_New_Claim">Add New Claim</div>
      </div>

      <div v-if="dialogComponent == 'InsuranceDialog'">
        <div class="flex ml-2 Add_New_Claim">Add New Insurance</div>
      </div>

      <div v-if="dialogComponent == 'RoadTaxDialog'">
        <div class="flex ml-2 Add_New_Claim">Add New Road Tax</div>
      </div>

      <div v-if="dialogComponent == 'CoeDialog'">
        <div class="flex ml-2 Add_New_Claim">Add New COE</div>
      </div>

      <div v-if="dialogComponent == 'AccidentsDialog'">
        <div class="flex ml-2 Add_New_Claim">Add New Accident Info</div>
      </div>
      <!--add bill preferences header-->
      <div
        v-if="dialogComponent == 'BillingPreferencesDialog'"
        class="flex justify-content-between w-full"
      >
        Add Billing Preferences
      </div>
      <!--add cost center header-->
      <div
        v-if="dialogComponent == 'CostCentresDialog'"
        class="flex justify-content-between w-full"
      >
        Add Cost Center
      </div>
      <!--add follow up-->
      <div
        v-if="dialogComponent == 'FollowUpDialog'"
        class="flex justify-content-between w-full"
      >
        Add Follow Up
      </div>

      <!-- Contact Management -->
      <div v-if="dialogComponent == 'NewContactDialog'">New Contact</div>
      <div v-if="dialogComponent == 'NewGroupDialog'">New Group</div>
      <div v-if="dialogComponent == 'EventEditDialog'">Edit Status</div>
      <div v-if="dialogComponent == 'RequestCancellation'">
        Request Cancellation
      </div>
      <div v-if="dialogComponent == 'CancelRequestSentDialog'">
        Request Cancellation
      </div>
      <div v-if="dialogComponent == 'RoomSettingsDialog'">Add New Room</div>
      <div v-if="dialogComponent == 'EventStatusDialog'">Status Name</div>
      <div v-if="dialogComponent == 'EventAddFollowUp'">Add Follow Up</div>
      <div v-if="dialogComponent == 'ContactEventGroupDialog'">New Group</div>
      <div v-if="dialogComponent == 'CreateEventGroupsDialog'">New Group</div>
      <div v-if="dialogComponent == 'EventMainGroup'">New Group</div>
      <div v-if="dialogComponent == 'ContactsGroupDialog'">New Group</div>
      <div
        v-if="dialogComponent == 'AppointmentDialog'"
        style="white-space: nowrap"
      >
        Appointment Details
      </div>
      <div
        v-if="dialogComponent == 'DonationDialog'"
        style="white-space: nowrap"
      >
        Donation Details
      </div>
      <div v-if="dialogComponent == 'EventAddInvites'">Add Invites</div>
      <!--AttachmentDialog -->
      <div
        v-if="dialogComponent == 'AttachmentDialog'"
        class="flex justify-content-between w-full"
      >
        Upload
      </div>
      <!--EDMDialog-->
      <div
        v-if="dialogComponent == 'EDMDialog'"
        class="flex justify-content-between w-full"
      ></div>
      <div
        v-if="dialogComponent == 'AppointmentDialog'"
        class="flex justify-content-between w-full"
      ></div>
      <!-- DonationDialog -->
      <div
        v-if="dialogComponent == 'DonationDialog'"
        class="flex justify-content-between w-full"
      ></div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <!-- activity-log dialog component-->
    <component
      storePath="users"
      v-if="dialogComponent == 'DataTables'"
      v-bind:is="dialogComponent"
      tableName="activityDialog"
      tableClass="p-datatable-sm activityLogTable"
      :tableData="$store.state['users'].activityLogTableData"
      :tableColumns="$store.state['users'].activityLogTableColumns"
      class="tab"
    ></component>
    <!-- add - user dialog component-->
    <component
      v-if="dialogComponent == 'UserSettingsDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - role dialog component-->
    <component
      v-if="dialogComponent == 'CreateRoleDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'NewInspectionDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <component
      v-if="dialogComponent == 'ResetConfirmation'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - agent dialog component-->
    <component
      v-if="dialogComponent == 'AgentDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'CashHistoryDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <component
      v-if="dialogComponent == 'FuelHistoryDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - sales dialog component-->
    <component
      v-if="dialogComponent == 'companyCreationDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - quotation dialog component-->
    <component
      v-if="dialogComponent == 'GeneralQuotationDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - ProfileVerifyEmailDialog component-->
    <component
      v-if="dialogComponent == 'ProfileVerifyEmailDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - ProfileResetPasswordDialog component-->
    <component
      v-if="dialogComponent == 'ProfileResetPasswordDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'FuelCardDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'CashCardDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - AddNewExpressRate component-->
    <component
      v-if="dialogComponent == 'AddNewExpressRateDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - AddNewMultiTierRate component-->
    <component
      v-if="dialogComponent == 'AddNewMultiTierRate'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create -  and other dialog components -->
    <component
      v-if="dialogComponent == 'SalesInternationalAdhocDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - AddNewRegion component-->
    <component
      v-if="dialogComponent == 'AddNewRegion'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - BillingPreference component-->
    <component
      v-if="dialogComponent == 'BillingPreferencesDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'VehicleDetailsDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'SummonsDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <component
      v-if="dialogComponent == 'CoeDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <component
      v-if="dialogComponent == 'ClaimDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'InsuranceDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'RoadTaxDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'AccidentsDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>
    <!-- create - CostCentres component-->
    <component
      v-if="dialogComponent == 'CostCentresDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'NewContactDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <component
      v-if="dialogComponent == 'NewGroupDialog'"
      v-bind:is="dialogComponent"
      class="tab"
    ></component>

    <!-- create - follow uo dialog-->
    <!--AttachmentDialog-->
    <component
      v-if="
        dialogComponent == 'AttachmentDialog' ||
        dialogComponent == 'FollowUpDialog' ||
        dialogComponent == 'FleetCommonDialog' ||
        dialogComponent == 'FuelVisaCardDialog' ||
        dialogComponent == 'CashVisaCardDialog' ||
        dialogComponent == 'CashTopUpDialog' ||
        dialogComponent == 'FleetFuelDialog' ||
        dialogComponent == 'FleetFuelDialog' ||
        dialogComponent == 'FleetMaintenanceDialog' ||
        dialogComponent == 'FleetInspectionDialog' ||
        dialogComponent == 'ContactEventGroupDialog' ||
        dialogComponent == 'EventAddInvites' ||
        dialogComponent == 'EventAddFollowUp' ||
        dialogComponent == 'EventEditDialog' ||
        dialogComponent == 'RequestCancellation' ||
        dialogComponent == 'RoomSettingsDialog' ||
        dialogComponent == 'EventStatusDialog' ||
        dialogComponent == 'CancelRequestSentDialog' ||
        dialogComponent == 'EDMDialog' ||
        dialogComponent == 'ContactsGroupDialog' ||
        dialogComponent == 'ContactsDialog' ||
        dialogComponent == 'MembersDialog' ||
        dialogComponent == 'DonationDialog' ||
        dialogComponent == 'CreateEventGroupsDialog' ||
        dialogComponent == 'AppointmentDialog' ||
        dialogComponent == 'InviteesDialog' ||
        dialogComponent == 'InviteesStatusDialog' ||
        dialogComponent == 'PrintLabelDialog' ||
        dialogComponent == 'ContactsFollowUpDialog' ||
        dialogComponent == 'ReportExportDialog' ||
        dialogComponent == 'NewClaimDialog'
      "
      v-bind:is="dialogComponent"
      class="tab"
    >
    </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

export default {
  name: "Dialogs",
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {
      // if (this.dialogComponent == "ResetConfirmation") {
      //   return "35vh";
      // }
    },
    getWidth() {
      if (
        this.dialogComponent == "UserSettingsDialog" ||
        this.dialogComponent == "AgentDialog" ||
        this.dialogComponent == "AddNewExpressRateDialog" ||
        this.dialogComponent == "companyCreationDialog" ||
        this.dialogComponent == "AddNewMultiTierRate" ||
        this.dialogComponent == "SalesInternationalAdhocDialog" ||
        this.dialogComponent == "AddNewRegion" ||
        this.dialogComponent == "BillingPreferencesDialog" ||
        this.dialogComponent == "FollowUpDialog" ||
        this.dialogComponent == "AttachmentDialog" ||
        this.dialogComponent == "CostCentresDialog" ||
        this.dialogComponent == "FleetCommonDialog" ||
        this.dialogComponent == "FuelVisaCardDialog" ||
        this.dialogComponent == "CashVisaCardDialog" ||
        this.dialogComponent == "CashTopUpDialog" ||
        this.dialogComponent == "FleetFuelDialog" ||
        this.dialogComponent == "FleetMaintenanceDialog" ||
        this.dialogComponent == "FleetInspectionDialog" ||
        this.dialogComponent == "EventAddInvites" ||
        this.dialogComponent == "CancelRequestSentDialog" ||
        this.dialogComponent == "RoomSettingsDialog" ||
        this.dialogComponent == "ContactsGroupDialog" ||
        this.dialogComponent == "DonationDialog" ||
        this.dialogComponent == "AppointmentDialog" ||
        this.dialogComponent == "CreateEventGroupsDialog" ||
        this.dialogComponent == "InviteesDialog" ||
        this.dialogComponent == "PrintLabelDialog" ||
        this.dialogComponent == "ContactsFollowUpDialog" ||
        this.dialogComponent == "ReportExportDialog" ||
        this.dialogComponent == "NewClaimDialog"
      ) {
        return "50vw";
      }
      if (this.dialogComponent == "EventStatusDialog") {
        return "45vw";
      }
      if (
        this.dialogComponent == "CreateRoleDialog" ||
        this.dialogComponent == "ResetConfirmation" ||
        this.dialogComponent == "EventEditDialog" ||
        this.dialogComponent == "MembersDialog"
      ) {
        return "30vw";
      }

      if (
        this.dialogComponent == "EDMDialog" ||
        this.dialogComponent == "FuelHistoryDialog"
      ) {
        return "65vw";
      }
      if (this.dialogComponent == "CashHistoryDialog") {
        return "70vw";
      }
      if (
        this.dialogComponent == "DataTables" ||
        this.dialogComponent == "NewContactDialog" ||
        this.dialogComponent == "NewGroupDialog" ||
        this.dialogComponent == "RequestCancellation" ||
        this.dialogComponent == "GeneralQuotationDialog" ||
        this.dialogComponent == "VehicleDetailsDialog" ||
        this.dialogComponent == "NewInspectionDialog"
      ) {
        return "60vw";
      }
      if (this.dialogComponent == "ClaimDialog") {
        return "691px";
      }
      if (
        this.dialogComponent == "SummonsDialog" ||
        this.dialogComponent == "InsuranceDialog" ||
        this.dialogComponent == "RoadTaxDialog" ||
        this.dialogComponent == "CoeDialog" ||
        this.dialogComponent == "ContactEventGroupDialog" ||
        this.dialogComponent == "EventAddFollowUp"
      ) {
        return "963px";
      }
      if (this.dialogComponent == "AccidentsDialog") {
        return "968px";
      }
      // if (
      //   this.dialogComponent == "CashHistoryDialog" ||
      //   this.dialogComponent == "FuelHistoryDialog"
      // ) {
      //   return "1200px";
      // }
      if (this.dialogComponent == "InviteesStatusDialog") {
        return "526px";
      }
      if (this.dialogComponent == "ContactsDialog") {
        return "1001px";
      }
    },
    activeControl(bool) {
      this.$store.state["users"].userActivityControl = bool;
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
  },
  components: {
    Dialog,
  },

};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-paginator {
  background: white !important;
  border: 0 !important;
  width: 100% !important;
}
.activityLogHeader {
  color: #7e84a7;
  font-size: 11px;
}
.dialogToggleText {
  font-weight: bold;
}
.p-dialog-header {
  white-space: nowrap;
}
.Add_New_Claim {
  font-weight: 600;
  font-size: 16px;
  color: #4e5868;
}
.fleet-vehicle-details-title{
  color: #4E5868;
}
</style>
