<template>
  <ContactLabelsTable
    :tableClass="'printLablesTableClass'"
    :tableDataName="'printLablesTableData'"
    :tableName="'printLablesTable'"
    :storePath="'contacts'"
    :tableData="$store.state['contacts']['ContactManagamentInviteesTableData']"
    :tableColumns="$store.state['contacts']['inviteesPrintLabelColumnData']"
  />
</template>

<script>
export default {
  name: "PrintLabelDialog",
};
</script>

<style scoped></style>
