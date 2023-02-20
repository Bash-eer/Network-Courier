<template>
<div class="flex flex-row justify-content-between align-items-center">
        <div >Follow Up</div>
  <div class="blue pointer-cursor title mr-3" @click="openDialog">+Add New</div>
</div>
  <hr>
   <SalesTables
   v-if="
      $store.state['sales']['FollowUpTableData'].length > 0
    "
     :key="$store.state['sales']['FollowUpTableData']"
                tableClass="p-datatable-sm QuotationTabSubTable w-100"
                tableDataName="FollowUpTable"
                tableName="FollowUpTable"
                :tableData="$store.state['sales']['FollowUpTableData']"
                :tableColumns="
                  $store.state['sales']['FollowUpTableColumnData']
                "
                dataKey="id"
              />
</template>

<script>
export default {
  name: "FollowUp",
  methods : {
    openDialog(){
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = "FollowUpDialog";
      this.$store.getters.controlActivityDialog;
    
    },
  }
};
</script>

<style scoped>
hr{
  opacity: .1
  }
  .title {
    font-family: Montserrat;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 17px;
letter-spacing: 0.03em;
text-align: left;

  }
</style>
