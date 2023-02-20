<template>
  <div>
    <DataTable
      tableName="countriesTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
    >
    </DataTable>
    <EditDialog
      :show="showEditDialog"
      v-if="showEditDialog"
      @close="closeDialog"
      @save="renderKey++"
    />
    <AddDestDialog />
  </div>
</template>

<script>
import DataTable from "@/components/Settings/Sales/International/Outbound/Tables/DataTable.vue";
import { countriesTableColumns } from "../Const/index";
import { mapActions, mapGetters } from "vuex";
import EditDialog from "../EditDialog.vue";
import AddDestDialog from "../AddDest.vue";

export default {
  components: { DataTable, EditDialog, AddDestDialog },
  data() {
    return {
      tableColumns: countriesTableColumns,
      zoneChipsData: [],
    };
  },
  watch: {
    refreshKey() {
      this.getTableData();
    },
  },
  computed: {
    ...mapGetters({
      tableData: "InternationalCountries/tableData",
      showEditDialog: "InternationalCountries/showEditDialog",
      refreshKey: "InternationalCountries/refreshKey",
      showAddDestDialog: "InternationalCountries/showAddDestDialog",
    }),
  },
  methods: {
    ...mapActions({
      setTableData: "InternationalCountries/setTableData",
      setEditDialog: "InternationalCountries/setEditDialog",
    }),
    closeDialog() {
      this.setEditDialog(false);
    },
    async getTableData() {
      try {
        await this.setTableData();
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          await this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: err.response.data.message,
            life: 3000,
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong, please try again",
            life: 3000,
          });
        }
      }
    },
  },
  async created() {
    this.getTableData();
  },
};
</script>

<style>
</style>