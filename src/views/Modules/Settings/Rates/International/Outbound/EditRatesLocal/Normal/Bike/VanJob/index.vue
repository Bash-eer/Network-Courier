<template>
  <div>
    <DataTable
      tableName="bikeRatesJobTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
      :editAction="true"
    />

    <Dialog
      :show="local_edit.normal_bike_jobs"
      v-if="local_edit.normal_bike_jobs"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import { normalBikeJob } from "../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: normalBikeJob,
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
        type: "normal_bike_jobs",
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
            list.normal_charge_services.map((rates, idx) => {
              if (rates.service_type === "bike") {
                rates.bike_van_job_rates.map((list, index) => {
                  data.push({
                    sl_no: index + 1,
                    van_job_min_cost: list.van_job_min_cost,
                    maximum_weight: list.maximum_weight,
                    van_job_add_cost: list.van_job_add_cost,
                    van_job_add_weight: list.van_job_add_weight,
                    van_job_urgent_surcharges: list.van_job_urgent_surcharges,
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