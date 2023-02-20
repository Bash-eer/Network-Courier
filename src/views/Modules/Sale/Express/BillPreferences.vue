<template>
  <div class="flex justify-content-between">
    <div class="flex">Bill Preferences</div>
    <div class="flex">
      <span
        v-if="$store.state.sales.billingPreferencesData.length == 0"
        class="add"
        @click="addPreference"
        >+Add Preferences</span
      >
      <span
        v-if="$store.state.sales.billingPreferencesData.length != 0"
        class="add"
        @click="addPreference"
        >Edit Preferences</span
      >
    </div>
  </div>
  <hr class="horizontal_line" />
  <div
    v-if="$store.state.sales.billingPreferencesData.length != 0"
    class="mt-3 mb-6"
  >
    <p class="subFormHeaders mb-2">Billing Address</p>
    <span class="billDetails">{{
      $store.state.sales.billingPreferencesData[0].billing_address
    }}</span>
    <p class="subFormHeaders mb-2 mt-3">Invoice Notification</p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(invoiceNotificatons, index) of $store.state.sales
          .billingPreferencesData[0].invoice_notifications[0]"
        :key="index"
      >
        <span v-if="invoiceNotificatons == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="billDetails mt-1 ml-1" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
    <p class="subFormHeaders mb-2 mt-3">Invoice Attachments</p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(invoiceAttachments, index) of $store.state.sales
          .billingPreferencesData[0].invoice_attachments[0]"
        :key="index"
      >
        <span v-if="invoiceAttachments == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="billDetails mt-1 ml-1" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
    <p class="subFormHeaders mb-2 mt-3">Attachment Format</p>
    <div class="flex flex-row">
      <div
        class="flex mr-3"
        v-for="(attachmentFormat, index) of $store.state.sales
          .billingPreferencesData[0].attachment_formats[0]"
        :key="index"
      >
        <span v-if="attachmentFormat == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="billDetails mt-1 ml-1" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillPreferences",
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
  },
};
</script>

<style scoped>
.billDetails {
  color: #343434;
  font-size: 12px;
  font-weight: 700;
}
.subFormHeaders {
  color: #4e5868;
  font-size: 12px;
  font-weight: 700;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1% !important;
  /* border: 1.15px solid #dfe4ed; */
}
.add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
