<template>
  <div>
    <DataTable
      tableName="normalVanMultitierCharge"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :editAction="true"
    />

    <Dialog
      :show="local_edit.normal_van_box"
      v-if="local_edit.normal_van_box"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import { normalVanMultitierCharge } from "../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: normalVanMultitierCharge,
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
        type: "normal_van_box",
        data: false,
      });
    },
    async getData() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "normal_charge",
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
          if (list.charge_type == "normal") {
            list.normal_charge_services.map((rates) => {
              if (rates.service_type === "van") {
                rates.van_customer_bike_job.map((list, idx) => {
                  data.push({
                    sl_no: idx + 1,
                    min_charge_per_job: list.min_charge_per_job,
                    created_by: list.user.display_name,
                    createdAt: list.createdAt,
                    id: list.id,
                  });
                });
              }
            });
          }
        });

        this.tableData = data;
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