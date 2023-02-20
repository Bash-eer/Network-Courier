<template>
  <div>
    <DataTable
      tableName="localAddSurcharge"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
    />

    <Dialog
      :show="local_edit.add_surcharges"
      v-if="local_edit.add_surcharges"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>   

<script>
import DataTable from "../Table/DataTable.vue";
import { localAddSummary } from "../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: localAddSummary,
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
      local_edit: "Outbound/Edit/local_edit",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      toggleDialog: "Outbound/Edit/toggleDialog",
      setTypeId: "Outbound/Edit/setTypeId",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "add_surcharges",
        data: false,
      });
    },
    async getData() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "surcharges",
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
        let data = [];

        response.data.results.charges.map((list) => {
          if (list.charge_type == "additional_surcharges") {
            list.additional_surcharges.map((rates, idx) => {
              data.push({
                sl_no: idx + 1,
                surcharge_name: rates.surcharge_name,
                rates: rates.rates,
                created_by: rates.user.display_name,
                createdAt: rates.createdAt,
                id: rates.id,
                charges_id: rates.charges_id,
              });
            });
          }
        });

        this.tableData = data;

        if (this.tableData?.length) {
          this.setTypeId({
            type: "local_edit",
            data: this.tableData[0].charges_id,
          });
        }
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