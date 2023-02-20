<template>
  <div class="flex flex-row justify-content-between align-items-center">
    <div
      class="international-adhoc-attachments-header express-international-font"
    >
      Attachments
    </div>
    <div class="blue pointer-cursor title mr-3" @click="
        openDialog('Upload', 'salesRapidoAdhoc', 'Add FollowUp')
      "
    >
      + Upload
    </div>
  </div>

  <hr />

  <OverviewDataTable
    :key="AttachmentData"
    tableClass="p-datatable-sm QuotationTabSubTable w-100"
    tableDataName="AttachmentTable"
    tableName="AttachmentTable"
    :tableData="AttachmentData"
    :tableColumns="TableColumnData"
    dataKey="id"
  />
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesRapidoAdhoc'].dialogComponent"
  />
</template>

<script>
import OverviewDataTable from "./DataTable.vue";
import Dialog from "./Dialog/Dialogs.vue";
export default {
  name: "Attachments",
  components: { OverviewDataTable,Dialog },
  data() {
    return {
      TableColumnData: [
        { field: "Actions", header: "Actions" },
        { field: "id", header: "S. No" },
        { field: "uploaded_in", header: "Uploaded in" },
        { field: "remarks", header: "Remarks" },
        { field: "attachments", header: "Attachments" },
        { field: "created_on", header: "Created On" },
        { field: "created_by", header: "Created By" },
      ],
      AttachmentData: [
        {
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097915_2571_Mask%20Group.png",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097982_3509_Mask%20Group.png",
          ],
          id: "1",
          quotation_id: "1",
          type: "attachments",
          remarks: "detail about the product",
          created_by: "surya",
          user_attachments: null,
          uploaded_in: "Follow up",
        },
        {
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638875907995_6877_Untitled%20design%20%282%29.png",
          ],
          id: "2",
          quotation_id: "1",
          type: "attachments",
          remarks: "-",
          created_by: "Kishore",
          user_attachments: null,
          uploaded_in: "Cost center",
        },
        {
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876035667_5619_Untitled%20design%20%282%29.png",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876043803_3079_screencapture-localhost-8080-2021-10-19-21_49_20.pdf",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097915_2571_Mask%20Group.png",
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638876097982_3509_Mask%20Group.png",
          ],
          id: "3",
          quotation_id: "1",
          type: "attachments",
          remarks: "-",
          created_by: "Jayanth",
          user_attachments: null,
          uploaded_in: "Quotation",
        },
        {
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638881298935_1800_Untitled%20design%20%282%29.png",
          ],
          id: "4",
          quotation_id: "1",
          type: "attachments",
          remarks: "keerthu",
          created_by: "Murali",
          user_attachments: null,
          uploaded_in: "Follow up",
        },
        {
          attachment_url: [
            "https://network-courier.sgp1.digitaloceanspaces.com/application/pdfs/File_1638881812503_6742_Untitled%20design%20%282%29.png",
          ],
          id: "5",
          quotation_id: "1",
          type: "attachments",
          remarks: "sample",
          created_by: "Antony",
          user_attachments: null,
          uploaded_in: "Quotation creation",
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
      if (type == "salesRapidoAdhoc") {
        this.$store.dispatch("salesRapidoAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesRapidoAdhoc/controlActivityDialog"];
      }
    },
  },
};
</script>

<style scoped>
hr {
  opacity: 0.1;
}
.international-adhoc-attachments-header {
  color: #343434;
  font-size: 16px;
}
</style>
