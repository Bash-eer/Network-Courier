<template>
  <div class="flex flex-row justify-content-between align-items-center">
    <div class="header font-size-16 bold-600">Attachments</div>
    <div
      class="font-size-14 blue pointer-cursor title mr-3"
      @click="openDialog('Attachment', 'salesCommon', 'Add Attachment')"
    >
      + Upload
    </div>
  </div>

  <hr />
  <div v-if="$store.state['salesCommon']['AttachmentData'].length == 0">
    <div class="flex align-items-center justify-content-center my-5">
      <img src="/images/empty.png" alt="" />
    </div>
  </div>
  <!-- v-if="$store.state['sales']['AttachmentTableData'].length > 0"-->
  <OverviewDataTable
    v-else
    :key="$store.state['salesCommon']['AttachmentData']"
    tableClass="p-datatable-sm QuotationTabSubTable w-100"
    tableDataName="AttachmentTable"
    tableName="AttachmentTable"
    :tableData="$store.state['salesCommon']['AttachmentData']"
    :tableColumns="TableColumnData"
    dataKey="id"
  />

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
  name: "Attachments",
  components: { OverviewDataTable, Dialog, Toasts },
  data() {
    return {
      TableColumnData: [
        { field: "Actions", header: "Actions" },
        { field: "sno", header: "S. No" },
        { field: "uploaded_in", header: "Uploaded in" },
        { field: "remarks", header: "Remarks" },
        { field: "attachments", header: "Attachments" },
        { field: "createdAt", header: "Created On" },
        { field: "created_by", header: "Created By" },
      ],
      AttachmentData: [],
    };
  },
  created() {
    this.loadAttachmentData({
      id: this.$route.params.id,
      type: this.$route.params.type,
    });
  },
  methods: {
    ...salesCommon,
    openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesExpressBike") {
        this.$store.dispatch("salesExpressBike/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesExpressBike/controlActivityDialog"];
      }
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
