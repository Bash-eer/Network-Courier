<template>
  <div class="flex justify-content-between">
    <div
      class="
        flex
        rapido-contract-billpreferences-header
        express-international-font
      "
    >
      Bill Preferences
    </div>
    <div class="flex">
      <span
        v-if="BillPreferencesData.length == 0"
        class="rapido-contract-billpreferences-add colour-#357DEA"
        @click="
          openDialog(
            'AddBillPerferences',
            'salesRapidoContract',
            'Add FollowUp'
          )
        "
        >+Add Preferences</span
      >
      <span
        v-if="BillPreferencesData.length != 0"
        class="rapido-contract-billpreferences-add"
        @click="addPreference"
        >Edit Preferences</span
      >
    </div>
  </div>
  <hr class="rapido-contract-billpreferences-horizontal-line" />
  <div v-if="BillPreferencesData.length != 0" class="mt-3 mb-6">
    <p class="rapido-contract-billpreferences-subFormHeaders mb-2">
      Billing Address
    </p>
    <span class="rapido-contract-billpreferences-billDetails">{{
      BillPreferencesData[0].billing_address
    }}</span>
    <p class="rapido-contract-billpreferences-subFormHeaders mb-2 mt-3">
      Invoice Notification
    </p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(invoiceNotificatons, index) of BillPreferencesData[0]
          .invoice_notifications[0]"
        :key="index"
      >
        <span v-if="invoiceNotificatons == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label
            class="rapido-contract-billpreferences-billDetails mt-1 ml-1"
            for="2"
            >{{ getLabel(index) }}</label
          >
        </span>
      </div>
    </div>
    <p class="rapido-contract-billpreferences-subFormHeaders mb-2 mt-3">
      Invoice Attachments
    </p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(invoiceAttachments, index) of BillPreferencesData[0]
          .invoice_attachments[0]"
        :key="index"
      >
        <span v-if="invoiceAttachments == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label
            class="rapido-contract-billpreferences-billDetails mt-1 ml-1"
            for="2"
            >{{ getLabel(index) }}</label
          >
        </span>
      </div>
    </div>
    <p class="rapido-contract-billpreferences-subFormHeaders mb-2 mt-3">
      Attachment Format
    </p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(attachmentFormat, index) of BillPreferencesData[0]
          .attachment_formats[0]"
        :key="index"
      >
        <span v-if="attachmentFormat == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label
            class="rapido-contract-billpreferences-billDetails mt-1 ml-1"
            for="2"
            >{{ getLabel(index) }}</label
          >
        </span>
      </div>
    </div>
  </div>
    <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesRapidoContract'].dialogComponent
    "
  />
</template>

<script>
import Dialog from "./Dialogs/Dialog.vue";
export default {
  name: "BillPreferences",
  components: {
    Dialog,
  },
  data() {
    return {
      BillPreferencesData: [
        {
          billing_address: "The NC Store",
          invoice_notifications: [{ email: true, by_sms: true }],
          invoice_attachments: [
            {
              caller_costing_work_sheet: true,
              groupwise_costing_work_sheet: true,
              detailed_job_summary: true,
            },
          ],
          attachment_formats: [{ microsoft_word: true }],
        },
      ],
    };
  },
  methods: {
    getLabel(index) {
      let label;
      switch (index) {
        case "email":
          label = "By Email";
          break;
        case "by_sms":
          label = "By SMS";
          break;
        case "by_post":
          label = "By Post";
          break;
        case "costing_work_sheet":
          label = "Costing Work Sheet";
          break;
        case "groupwise_costing_work_sheet":
          label = "Groupwise Costing Work Sheet";
          break;
        case "for_less_than_min_qty":
          label = "For less than Min Qty Also";
          break;
        case "detailed_job_summary":
          label = "Detailed Job Summary";
          break;
        case "groupwise_detailed_job_summary":
          label = "GroupWise Detailed Job Summary";
          break;
        case "caller_costing_work_sheet":
          label = "Caller Costing Worksheet";
          break;
        case "job_detail_report":
          label = "Job Detail Report  (can view this report online only)";
          break;
        case "rich_text_format":
          label = "Rich Text Format";
          break;
        case "microsoft_word":
          label = "Microsoft Word";
          break;
        case "excel_file":
          label = "Excel File";
          break;
        case "html":
          label = "HTML";
          break;
        case "pdf":
          label = "PDF";
          break;
        case "view_attachment_online":
          label = "View Attachments Online";
          break;
      }
      return label;
    },
    addPreference() {
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = "BillingPreferencesDialog";
      this.$store.getters.controlActivityDialog;
    },
  openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesRapidoContract") {
        this.$store.dispatch("salesRapidoContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesRapidoContract/controlActivityDialog"];
      }
    },
  },
};

</script>

<style scoped>
.rapido-contract-billpreferences-billDetails {
  color: #343434;
  font-size: 12px;
  font-weight: 700;
}
.rapido-contract-billpreferences-subFormHeaders {
  color: #4e5868;
  font-size: 12px;
  font-weight: 700;
}
.rapido-contract-billpreferences-horizontal-line {
  margin: 0px !important;
  margin-top: 1% !important;
}
.rapido-contract-billpreferences-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
.rapido-contract-billpreferences-header {
  color: #343434;
  font-size: 16px;
}
</style>
