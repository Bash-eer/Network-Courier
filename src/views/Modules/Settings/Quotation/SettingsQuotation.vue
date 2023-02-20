<template>
  <div>
    <div class="ml-5"><b>Quotation</b></div>
    <div class="bg-white my-2 flex flex-flow: row wrap">
      <Buttons
        class="my-2"
        label="Edit Contract "
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('ExpressContractEdit', 'quotation', 'Edit Contract')
        "
      />
      <Buttons
        class="my-2"
        label="Bulk Adjustment"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('QuotationAddNewDialog', 'quotation', 'Bulk Adjustment')
        "
      />

      <Buttons
        class="my-2"
        label="Contract Approval"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('ContractApprovalDialog', 'quotation', 'Contract Approval')
        "
      />

      <Buttons
        class="my-2"
        label="Termination Approval"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog(
            'ContractTerminationDialog',
            'quotation',
            'Contract Approval'
          )
        "
      />

      <Buttons
        class="my-2"
        label="Sales Bike+FSR Dialog"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('BikeFSRQuotationDialog', 'quotation', 'Contract Approval')
        "
      />

      <Buttons
        class="my-2"
        label="International Agent (7Steps)"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('InternationalAgentDialog', 'quotation', 'Quotation')
        "
      />
      <Buttons
        class="my-2"
        label="Express Adhoc Quotation Dialog"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('ExpressAdhocQuotationDialog', 'quotation', 'Quotation')
        "
      />

      <Buttons
        class="my-2"
        label="Sales Project Jobs Quotation"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog(
            'SalesProjectJobs',
            'quotation',
            'Sales Project Jobs Quotation'
          )
        "
      />

      <Buttons
        class="my-2"
        label="FSR Dialog Quotation"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('FSRNew', 'quotation', 'Sales FSR Dialog')
        "
      />

      <Buttons
        class="my-2"
        label="Sales Van+Project Dialog Quotation"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('FSRVanNew', 'quotation', 'Sales FSR+Van Dialog')
        "
      />

      <Buttons
        class="my-2"
        label="Express Contract Bike CostCenter"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('ContractBikeNew', 'quotation', 'Add Cost Center')
        "
      />

      <Buttons
        class="my-2"
        label="Express Contract Bike (5steps)"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('ExpressContractBikeNew', 'quotation', 'Add Cost Center')
        "
      />

      <Buttons
        class="my-2"
        label="Inter Company Charges "
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('InterCompanyNew', 'quotation', 'Quotation')
        "
      />

      <Buttons
        class="my-2"
        label="Add Adjustment"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('AdjustmentAddUser', 'quotation', 'Adjustment')
        "
      />
      <Buttons
        class="my-2"
        label="Add Follow Up "
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('AddFollowUp', 'quotation', 'Add Follow Up')
        "
      />
      <Buttons
        class="my-2"
        label="Add Rate Adjustment History "
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog(
            'RateAdjustmentHistory',
            'quotation',
            'Rate Adjustment History'
          )
        "
      />
      <Buttons
        class="my-2"
        label=" Add Cost Center"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('AddCostCenter', 'quotation', 'Add Cost Center')
        "
      />
      <Buttons
        class="my-2"
        label="Termination"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('Termination', 'quotation', 'Termination')
        "
      />
      <Buttons
        class="my-2"
        label="Upload"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="openDialog('Upload', 'quotation', 'Upload')"
      />
      <Buttons
        class="my-2"
        label="Bike Add follow up"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('BikeAddFollowUp', 'quotation', 'Add follow up')
        "
      />
      <Buttons
        class="my-2"
        label="Add Billing Preferences"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog(
            'AddBillingPreferences',
            'quotation',
            'Add Billing Preferences'
          )
        "
      />

      <Buttons
        class="my-2"
        label="International Adhoc"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('InternationalAdhocDialog', 'quotation', 'Cost Per Unit')
        "
      />
      <Buttons
        class="my-2"
        label="Sales van project job"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('VanFSRQuotationDialog', 'quotation', 'Quotation')
        "
      />

      <Buttons
        class="my-2"
        label="Promote To Contract"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="
          openDialog('PromoteToContract', 'quotation', 'Quotation')
        "
      />
    </div>
  </div>
  <QuotationDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['quotation'].dialogComponent"
  />
  <!--toast-->
</template>
<script>
import QuotationDialogs from "../../../../components/Settings/Quotation/Dialog.vue";

export default {
  components: {
    QuotationDialogs,
  },
  data() {
    return {
      searcher: "",
    };
  },
  methods: {
    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "quotation") {
        this.$store.dispatch("quotation/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["quotation/controlActivityDialog"];
      }
    },
  },
};
</script>

<style scoped>
.p-button.p-button-sm {
  width: 240px !important;
  height: 39px !important;
  font-weight: bold !important;
}
</style>
