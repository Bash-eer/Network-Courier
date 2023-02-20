<template>
  <div>
    <DataTable
      tableName="normalVanTwotierQuantity"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="true"
      expandedType="type_1"
      :editAction="true"
    />

    <Dialog
      :show="local_edit.normal_van_twotier_q"
      v-if="local_edit.normal_van_twotier_q"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../../Table/DataTable.vue";
import { normalVanTwotierQuantity } from "../../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dialog from "./dialog.vue";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: normalVanTwotierQuantity,
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
        type: "normal_van_twotier_q",
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
                rates.van_2_tire_rates_charge_by_quantity.map((list, idx) => {
                  data.push({
                    sl_no: idx + 1,
                    maximum_quantity: list.maximum_quantity,
                    van_job_add_quantity: list.van_job_add_quantity,
                    van_job_add_cost: list.van_job_add_cost,
                    created_by: list.user.display_name,
                    createdAt: list.createdAt,
                    service_id: list.service_id,
                    id: list.id,
                    expanded: [],
                  });

                  list.box_count_charges.map((item, itemIdx) => {
                    data[idx].expanded.push({ sl_no: itemIdx + 1, ...item });
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
          this.setTypeId({
            type: "local_edit",
            name: "expanded",
            data: this.tableData[0].expanded[0].charge_by_quantity_id,
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