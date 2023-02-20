<template>
  <div>
    <DataTable
      tableName="outBoundTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      storePath="Outbound"
    />
    <CloneDialog
      :show="displayCloneDialog"
      v-if="displayCloneDialog"
      @close="setDisplayCloneDialog(false)"
    />
  </div>
</template>

<script>
import DataTable from "./Tables/DataTable.vue";
import { outBoundTableColumns } from "./Const/const";
import CloneDialog from "./cloneDialog.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { DataTable, CloneDialog },
  data() {
    return {
      tableColumns: outBoundTableColumns,
    };
  },
  watch: {
    refreshKey() {
      this.getTableData();
    },
  },
  computed: {
    ...mapGetters({
      tableData: "Outbound/tableData",
      refreshKey: "Outbound/refreshKey",
      displayCloneDialog: "Outbound/displayCloneDialog",
    }),
  },
  methods: {
    ...mapActions({
      getTableData: "Outbound/setTableData",
      setDisplayCloneDialog: "Outbound/setDisplayCloneDialog",
    }),
  },
  async created() {
    try {
      await this.getTableData();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
</style>