<template>
  <div>
    <DataTable
      tableName="zonesTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="true"
    />

    <ZoneDialog
      :show="imp_edit.zone"
      v-if="imp_edit.zone"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../Table/DataTable.vue";
import { zoneTableColumn } from "../../const";
import ZoneDialog from "./zoneDialog.vue";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, ZoneDialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: zoneTableColumn,
    };
  },
  computed: {
    ...mapGetters({
      imp_edit: "Outbound/Edit/imp_edit",
      rateCard: "Outbound/Edit/rateCard",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  watch: {
    renderKey() {
      this.getData();
    },
    storeRenderKey() {
      this.getData();
    },
  },
  methods: {
    ...mapActions({
      toggleDialog: "Outbound/Edit/toggleDialog",
      setEditData: "Outbound/Edit/setEditData",
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
    }),
    closeDialog() {
      this.setEditData(null);
      this.toggleDialog({
        edit: "imp_edit",
        type: "zone",
        data: false,
      });
    },
    async getData() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "zones",
        });

        this.isloading = false;
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }

      if (response) {
        this.tableData = response.data.results.zones;

        this.tableData.map((list) => {
          list["no_of_countries"] = list.countries.length;
        });
        console.log(this.tableData);
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