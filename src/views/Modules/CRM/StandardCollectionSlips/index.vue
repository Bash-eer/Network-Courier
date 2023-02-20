<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4 ">
      <div class="mt-3 text_zone ml-3 font-bold">Standard Collection Slips</div>
      <div class="flex">
        <!-- <Buttons
          button_class="mr-3 mt-3 bg-357dea border-round-sm text-sm font-bold"
          @click="openScheduleDialog"
          label="Schedule"
        /> -->
        <Buttons button_class="export_button mr-3 mt-3  text-sm font-bold " label="Export" />
        <Buttons
          button_class="mr-3 mt-3 bg-357dea text-sm font-bold"
          label="Add New"
          v-on:childToParent="
            openDialog('addNewCollection', 'Masscollection', 'Add New')
          "
        />
      </div>
    </div>
    <keep-alive>
      <div :key="renderkey">
        <DataTable
          tableClass="p-datatable-sm AdhocRateCardTable"
          tableDataName="standardCollectionDataTable"
          :overlayData="overlayData"
          tableName="standardCollectionDataTable"
          :tableData="tableData"
          :tableColumns="tableColumns"
          dataKey="id"
        />
      </div>
    </keep-alive>
  </div>
  <Dialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['Masscollection'].dialogComponent"
  />
  <Toast
    :severity="$store.state['Masscollection'].toastData.severity"
    :summary="$store.state['Masscollection'].toastData.summary"
  />
  <ScheduleDialog @close="closeScheduleDialog" />
</template>
<script>
import DataTable from "./components/DataTable.vue";
import Toast from "./components/Toast.vue";
import {
  standardCollectionTableColumnData,
  standardCollectionOverlayData,
} from "../../../../components/Reusables/CRM/Const";
import ScheduleDialog from "@/components/CRM/Dialogs/standardCollectionSlip/index.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Dialogs from "./Dialog.vue";
export default {
  name: "standardCollection",
  components: { DataTable, Dialogs, Toast, ScheduleDialog },
  data() {
    return {
      tableData: [],
      tableColumns: standardCollectionTableColumnData,
      overlayData: standardCollectionOverlayData,
    };
  },
  computed: {
    ...mapGetters({
      stdCollectionTableData: "Masscollection/getStdCollectionTableData",
    }),
  },
  methods: {
    ...mapMutations({
      displayScheduleDialog: "Masscollection/setScheduleDialog",
    }),
    ...mapActions({
      postSelectedCostCenterStdCollection:
        "Masscollection/postSelectedCostCenterStdCollection",
      fetchTableData: "Masscollection/fetchStdCollectionSlipsTableData",
    }),
    openScheduleDialog() {
      this.displayScheduleDialog(true);
    },

    closeScheduleDialog() {
      this.displayScheduleDialog(false);
    },

    async redirect(path, type) {
      await this.postSelectedCostCenterStdCollection().then((c) => {
        this.$emit("emittedCostCenterResponse", c);
      });
      this.$router.push({
        name: path,
        query: {
          type: type,
        },
      });
    },
    openDialog(name, type, header) {
      this.$store.dispatch("Masscollection/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["Masscollection/controlActivityDialog"];
      // }
    },
  },
  watch: {
    "$store.state.Masscollection.stdCollectionTableData": function () {
      this.tableData = this.stdCollectionTableData.rows;
    },
  },
  async created() {
    await this.fetchTableData();
    this.$store.state.users.breadcrumbTitle = "CRM";
    this.$store.state.users.breadcrumbPath = `CRM > Standard Collection Slip`;
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.text_zone {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #4e5968;
}
.aligment {
  margin-left: 598px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
</style>
