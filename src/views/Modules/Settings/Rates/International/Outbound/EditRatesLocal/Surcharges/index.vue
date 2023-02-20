<template>
  <div>
    <DataTable
      tableName="localSurcharge"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
      :editAction="true"
    />

    <Dialog
      :show="local_edit.surcharges"
      v-if="local_edit.surcharges"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>   

<script>
import DataTable from "../Table/DataTable.vue";
import { localSummary } from "../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: localSummary,
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
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "surcharges",
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
          if (list.charge_type == "surcharges") {
            list.surcharges.map((rates, idx) => {
              data.push({
                sl_no: idx + 1,
                cod_fee: rates.cod_fee,
                cod_fee_percentage: rates.cod_fee_percentage,
                standard_liability: rates.standard_liability,
                created_by: rates.user.display_name,
                createdAt: rates.createdAt,
                id: rates.id,
              });
            });
          }
        });

        this.tableData = data;

        console.log(this.tableData, "----");
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