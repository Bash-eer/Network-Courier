<template>
  <div class="flex justify-content-between">
    <div class="flex header font-size-16 bold-600">Bill Preferences</div>

    <div class="flex">
      <span
        v-if="BillPreferencesData.length == 0"
        class="add font-size-14 pointer color-357dea"
        @click="
          openDialog(
            'BillPreferences',
            'salesCommon',
            'Add Billing Preferences',
            'create'
          )
        "
        >+Add Preferences</span
      >
      <!--@click="addPreference"-->
      <span
        v-if="BillPreferencesData.length != 0"
        class="add font-size-14 pointer text-blue-700 color-#343434"
        @click="
          openDialog(
            'BillPreferences',
            'salesCommon',
            'Edit Billing Preferences',
            'edit'
          )
        "
        >Edit Preferences</span
      >
      <!-- <i class="pi pi-ellipsis-v"></i> -->
    </div>
  </div>
  <hr class="horizontal_line m-0" />
  <div v-if="BillPreferencesData.length == 0">
    <div class="flex align-items-center justify-content-center my-5">
      <img src="/images/empty.png" alt="" />
    </div>
  </div>
  <div v-if="BillPreferencesData.length != 0" class="mt-3 mb-6">
    <p class="subFormHeaders font-size-12 bold-700 mb-2">Billing Address</p>
    <span class="header bold-700 font-size-12">{{
      BillPreferencesData[0]?.unit_no +
      ", " +
      BillPreferencesData[0]?.floor_no +
      ", " +
      BillPreferencesData[0]?.building_name +
      ", " +
      BillPreferencesData[0]?.billing_address +
      ", " +
      BillPreferencesData[0]?.state +
      ", " +
      BillPreferencesData[0]?.country +
      ", " +
      BillPreferencesData[0]?.postal_code
    }}</span>
    <p class="subFormHeaders font-size-12 bold-700 mb-2 mt-3">
      Invoice Notification
    </p>
    <div class="flex flex-row">
      <div
        class="flex"
        v-for="(invoiceNotificatons, index) of BillPreferencesData[0]
          .invoice_notifications"
        :key="index"
      >
        <span v-if="invoiceNotificatons == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="header bold-700 font-size-12 mt-1 ml-1 mr-3" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
    <p class="subFormHeaders font-size-12 bold-700 mb-2 mt-3">
      Invoice Attachments
    </p>
    <div class="flex flex-row">
      <div
        class="flex"
        v-for="(invoiceAttachments, index) of BillPreferencesData[0]
          .invoice_attachments"
        :key="index"
      >
        <span v-if="invoiceAttachments == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="header bold-700 font-size-12 mt-1 ml-1 mr-3" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
    <p class="subFormHeaders font-size-12 bold-700 mb-2 mt-3">
      Attachment Format
    </p>
    <div class="flex flex-row">
      <div
        class="flex"
        v-for="(attachmentFormat, index) of BillPreferencesData[0]
          .attachment_formats"
        :key="index"
      >
        <span v-if="attachmentFormat == true">
          <span id="2"
            ><img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
          </span>
          <label class="header bold-700 font-size-12 mt-1 ml-1 mr-3" for="2">{{
            getLabel(index)
          }}</label>
        </span>
      </div>
    </div>
  </div>

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesCommon'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
import Dialog from "./Dialogs/Dialog.vue";
import Toasts from "./Toast.vue";
export default {
  name: "BillPreferences",
  components: { Dialog, Toasts },
  data() {
    return {
      BillPreferencesData:
        // [
        //   {
        //     billing_address: "40,100,AP",
        //     building_name: "AP",
        //     call_center: true,
        //     caller_costing_worksheet: false,
        //     contact_no: "1234567889",
        //     costing_work_sheet: true,
        //     country: "AP",
        //     createdAt: "2022-05-18T16:02:21.814Z",
        //     detailed_job_summary: true,
        //     email: "ap@gmail.com",
        //     excel_file: true,
        //     floor_no: "12",
        //     for_less_than_min_qty: false,
        //     groupwise_costing_work_sheet: true,
        //     groupwise_detailed_job_summary: false,
        //     html: true,
        //     id: "2",
        //     job_detail_report: true,
        //     microsoft_word: true,
        //     notify_by_email: false,
        //     notify_by_post: false,
        //     notify_by_sms: true,
        //     pdf: true,
        //     postal_code: "9764",
        //     quotation_id: "12",
        //     rich_text_format: false,
        //     state: "AP",
        //     unit_no: "4",
        //     view_attachment_online: false,
        //   },
        // ],
        // this.$store.state.salesCommon.BillPreferenceData,
        //         attachment_formats: {rich_text_format: false, microsoft_word: true, excel_file: true, html: true, pdf: true}
        // billing_address: "40,100,AP"
        // building_name: "AP"
        // call_center: true
        // contact_no: "1234567889"
        // country: "AP"
        // createdAt: "2022-05-18T16:02:21.814Z"
        // email: "ap@gmail.com"
        // floor_no: "12"
        // id: "2"
        // invoice_attachments: {costing_work_sheet: true, groupwise_costing_work_sheet: true, for_less_than_min_qty: false, detailed_job_summary: true, groupwise_detailed_job_summary: false, …}
        // invoice_notifications: {notify_by_email: false, notify_by_sms: true, notify_by_post: false}
        // postal_code: "9764"
        // quotation_id: "12"
        // state: "AP"
        // unit_no: "4"
        // view_attachment_online: false
        [
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
        case "notify_by_email":
          label = "By Email";
          break;
        case "notify_by_sms":
          label = "By SMS";
          break;
        case "notify_by_post":
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
        case "caller_costing_worksheet":
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

    openDialog(name, type, header, tag) {
      if (tag == "edit") {
        console.log("edit");
      }
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      // if (type == "salesExpressBike") {
      //   this.$store.dispatch("salesExpressBike/openDialog", {
      //     dialogDetails: {
      //       dialogName: name,
      //       dialogHeader: header,
      //     },
      //   });
      //   this.$store.getters["salesExpressBike/controlActivityDialog"];
      // }
    },
  },
  async created() {
    console.log("created", this.$route.params.type);
    await this.$store.dispatch("salesCommon/loadBillPreferenceData", {
      id: this.$route.params.id,
      type: this.$route.params.type,
    });

    this.BillPreferencesData = this.$store.state.salesCommon.BillPreferenceData;
  },
  updated() {
    console.log("updated", this.$route.params.type);
    this.BillPreferencesData = this.$store.state.salesCommon.BillPreferenceData;
  },
  watch: {
    "$store.state.salesCommon.BillPreferenceData": function () {
      this.BillPreferencesData =
        this.$store.state.salesCommon.BillPreferenceData;
      console.log("wqatched", this.$route.params.type);
    },
  },
};
</script>

<style scoped>
.subFormHeaders {
  color: #4e5868;
}
.horizontal_line {
  margin-top: 1% !important;
}
.add {
  color: blue;
  font-size: 14px;
}
.header {
  color: #343434;
}
</style>
