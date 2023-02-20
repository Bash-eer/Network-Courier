<template>
  <div>
    <DataTable
      tableName="transitParcelTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      type="bike"
      storePath="Outbound"
    />
    <EditDialog
      v-if="displayDialog.displayParcelDialog"
      :show="displayDialog.displayParcelDialog"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../Component/Table/DataTable.vue";
import EditDialog from "../Document/EditDialog.vue";
import { transitDaysTableColumn } from "../../const.js";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, EditDialog },
  data() {
    return {
      tableData: null,
      renderKey: 10,
      tableColumns: transitDaysTableColumn,
    };
  },
  watch: {
    renderKey() {
      this.getData();
    },
    storeRenderKey() {
      this.getData();
    },
  },
  computed: {
    ...mapGetters({
      renderKey: "Outbound/Edit/renderKey",
      displayDialog: "Outbound/Edit/transitDays",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      getTransitDays: "Outbound/Edit/getTransitDays",
      setTransitDaysDialog: "Outbound/Edit/setTransitDaysDialog",
    }),
    closeDialog() {
      this.setTransitDaysDialog({ type: "displayParcelDialog", data: false });
    },
    async getData() {
      try {
        this.tableData = [];
        const res = await this.getTransitDays({
          type: "Parcel",
          id: this.$route.params.id,
        });
        if (res) {
          res.data.results.map((list, idx) => {
            this.tableData.push({
              ...list,
              sl_no: idx + 1,
              postal_code: list.postal_code,
              transit_days: list.transit_days,
              createdAt: new Date(list.createdAt),
              created_by: list.user.display_name,
              country:
                list.transit_days_countries.country_iso_code +
                " - " +
                list.transit_days_countries.country_name,
              destination:
                list.transit_days_destination.destination_code +
                " - " +
                list.transit_days_destination.destination_name,
              id: list.id,
            });
          });
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>