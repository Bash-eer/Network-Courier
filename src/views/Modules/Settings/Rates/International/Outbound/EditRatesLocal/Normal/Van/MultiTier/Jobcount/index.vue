<template>
  <div>
    <DataTable
      tableName="normalVanMultitierJob"
      :tableData="tableData"
      :tableColumns="tableColumns"
    />

    <Dialog
      :show="local_edit.normal_van_multi_j"
      v-if="local_edit.normal_van_multi_j"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../../Table/DataTable.vue";
import { normalVanMultitierJob } from "../../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: normalVanMultitierJob,
    };
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
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
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      toggleDialog: "Outbound/Edit/toggleDialog",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "normal_van_multi_j",
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
                rates.van_Multi_tire_rates_charge_by_job_count.map(
                  (list, idx) => {
                    data.push({
                      sl_no: idx + 1,
                      min_job: list.min_job,
                      max_job: list.max_job,
                      rate: list.rate,
                      created_by: list.user.display_name,
                      createdAt: list.createdAt,
                      id: list.id,
                      expanded: [],
                    });
                  }
                );
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