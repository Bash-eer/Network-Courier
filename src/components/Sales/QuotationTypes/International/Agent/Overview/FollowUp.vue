<template>
  <div class="flex flex-row justify-content-between align-items-center">
    <div class="international-agent-followup-header express-international-font">
      Follow Up
    </div>
    <div
      class="blue pointer-cursor international-agent-followup-title mr-3"
      @click="
        openDialog('AddFollowUp', 'salesInternationalAgent', 'Add Follow Up')
      "
    >
      +Add New
    </div>
  </div>

  <hr />
  <OverviewDataTable
    :key="FollowUpData.id"
    tableClass="p-datatable-sm QuotationTabSubTable w-100"
    tableDataName="FollowUpTable"
    tableName="FollowUpTable"
    :tableData="FollowUpData"
    :tableColumns="TableColumnData"
    dataKey="id"
  />
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesInternationalAgent'].dialogComponent"
  />
</template>

<script>
import OverviewDataTable from "./DataTable.vue";
import Dialog from "./Dialogs/Dialog.vue";
export default {
  name: "FollowUp",
  components: { OverviewDataTable, Dialog },
  data() {
    return {
      TableColumnData: [
        { field: "Actions", header: "Actions" },
        { field: "id", header: "S. No" },
        { field: "internal_call_received_by", header: "Sales Person" },
        { field: "call_type", header: "Call Type" },
        { field: "date_and_time", header: "Date & Time" },
        { field: "customer_name", header: "Contact's" },
        { field: "subject", header: "Subject" },
        { field: "discussion_detaits", header: "Discussion Details" },
        { field: "attachments", header: "Attachments" },
        { field: "created_on", header: "Created On" },
      ],
      FollowUpData: [
        {
          id: "3",
          called: false,
          call_received: false,
          meeting: true,
          followUp: false,
          internal_call_received_by: "Jennie",
          date_and_time: "2021-12-09T18:30:00.000Z",
          customer_contact_no: "97864356",
          customer_name: "Tony",
          subject: "document",
          discussion_detaits: "documents",
          quotation_id: "1",
          call_type: "Mail",
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097915_2571_Mask%20Group.png",
          ],
        },
        {
          id: "4",
          called: true,
          call_received: false,
          meeting: false,
          followUp: false,
          internal_call_received_by: "Rose",
          date_and_time: "2021-11-30T18:30:00.000Z",
          customer_contact_no: "7777",
          customer_name: "Tony",
          subject: "hi",
          discussion_detaits: "ji",
          quotation_id: "1",
          call_type: "Phone call",
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097915_2571_Mask%20Group.png",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097982_3509_Mask%20Group.png",
          ],
        },

        {
          id: "9",
          called: false,
          call_received: false,
          meeting: false,
          followUp: true,
          internal_call_received_by: "Rose",
          date_and_time: "2021-12-16T16:00:00.000Z",
          customer_contact_no: "84455",
          customer_name: "Tony",
          subject: "Discussion ",
          discussion_detaits:
            "Customer said they will come back to us with some competitive price\n",
          quotation_id: "1",
          call_type: "Missed call",
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097915_2571_Mask%20Group.png",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097982_3509_Mask%20Group.png",
          ],
        },
      ],
    };
  },
  methods: {
    openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesInternationalAgent") {
        this.$store.dispatch("salesInternationalAgent/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesInternationalAgent/controlActivityDialog"];
      }
    },
  },
};
</script>

<style scoped>
hr {
  opacity: 0.1;
}
.international-agent-followup-title {
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
}
.international-agent-followup-header {
  color: #343434;
  font-size: 16px;
}
</style>
