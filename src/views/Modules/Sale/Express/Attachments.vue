<template>
 <div class="flex flex-row justify-content-between align-items-center">
        <div >Attachments</div>
  <div class="blue pointer-cursor title mr-3" @click="openDialog">+ Upload</div>
</div>
  <hr>
   <SalesTables
   v-if="
      $store.state['sales']['AttachmentTableData'].length > 0
    "
     :key="$store.state['sales']['AttachmentTableData']"
                tableClass="p-datatable-sm QuotationTabSubTable w-100"
                tableDataName="AttachmentTable"
                tableName="AttachmentTable"
                :tableData="$store.state['sales']['AttachmentTableData']"
                :tableColumns="
                  $store.state['sales']['AttachmentTableColumnData']
                "
                dataKey="id"
              />
</template>

<script>
export default {
  name: "Attachments",
   methods : {
    openDialog(){
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = "AttachmentDialog";
      this.$store.getters.controlActivityDialog;
    
    },
  }
};
</script>

<style scoped>
hr{
  opacity: .1
  }
</style>
