<template>
  <div class="table_contents">
    <div class="flex flex-row justify-content-between align-items-center">
      <div class="header font-size-16 bold-600">Follow Up</div>

      <div
        class="
          blue
          pointer-cursor
          title
          font-size-14
          bold-700
          line-height-17
          mr-3
          text-left
          letter-spacing-003
        "
        @click="openDialog('FollowUp', 'salesCommon', 'Add Follow Up')"
      >
        +Add New
      </div>
    </div>

    <hr />
    <div v-if="$store.state['salesCommon']['FollowupData'].length == 0">
      <div class="flex align-items-center justify-content-center my-5">
        <img src="/images/empty.png" alt="" />
      </div>
    </div>
    <!-- v-if="$store.state['sales']['FollowUpTableData'].length > 0"-->
    <OverviewDataTable
      v-else
      :key="FollowUpData.id"
      tableClass="p-datatable-sm QuotationTabSubTable w-100"
      tableDataName="FollowUpTable"
      tableName="FollowUpTable"
      :tableData="$store.state['salesCommon']['FollowupData']"
      responsiveLayout="scroll"
      :tableColumns="TableColumnData"
      dataKey="id"
    />
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
import OverviewDataTable from "./DataTable.vue";
import Dialog from "./Dialogs/Dialog.vue";
import Toasts from "./Toast.vue";
import { salesCommon } from "../../../../store/helper";
export default {
  name: "FollowUp",
  components: { OverviewDataTable, Dialog, Toasts },
  data() {
    return {
      TableColumnData: [
        { field: "Actions", header: "Actions" },
        { field: "sno", header: "S. No" },
        { field: "internal_call_received_by", header: "Sales Person" },
        { field: "call_type", header: "Call Type" },
        { field: "date_and_time", header: "Date & Time" },
        { field: "customer_name", header: "Contact" },
        { field: "subject", header: "Subject" },
        { field: "discussion_detaits", header: "Discussion Details" },
        { field: "follow_up_attachments", header: "Attachments " },
        { field: "createdAt", header: "Created On" },
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
  created() {
    this.loadFollowupData({
      id: this.$route.params.id,
      type: this.$route.params.type,
    });
  },
  methods: {
    ...salesCommon,
    openDialog(name, type, header) {
      this.$store.dispatch("salesCommon/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
    },
  },
};
</script>

<style scoped>
hr {
  opacity: 0.1;
}
.header {
  color: #343434;
}
</style>
