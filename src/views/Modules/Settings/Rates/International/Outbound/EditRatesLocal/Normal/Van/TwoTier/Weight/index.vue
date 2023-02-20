<template>
  <div>
    <DataTable
      tableName="normalVanTwotierWeight"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
      :editAction="true"
    />

    <Dialog
      :show="local_edit.normal_van_twotier_w"
      v-if="local_edit.normal_van_twotier_w"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../../Table/DataTable.vue";
import { normalVanTwotier } from "../../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";
export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: normalVanTwotier,
    };
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
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
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      toggleDialog: "Outbound/Edit/toggleDialog",
      setTypeId: "Outbound/Edit/setTypeId",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: "normal_van_twotier_w",
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
              if (rates.service_type === "van") {
                rates.van_2_tire_rates_charge_by_weight.map((list, index) => {
                  data.push({
                    sl_no: index + 1,
                    maximum_weight: list.maximum_weight,
                    van_job_add_weight: list.van_job_add_weight,
                    van_job_add_cost: list.van_job_add_cost,
                    created_by: list.user.display_name,
                    createdAt: list.createdAt,
                    service_id: list.service_id,
                    id: list.id,
                  });
                });
              }
            });
          }
        });

        this.tableData = data;

        if (this.tableData?.length) {
          this.setTypeId({
            type: "local_edit",
            data: this.tableData[0].service_id,
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