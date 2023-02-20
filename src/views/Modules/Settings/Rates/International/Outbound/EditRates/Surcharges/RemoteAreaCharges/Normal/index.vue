<template>
  <div>
    <DataTable
      tableName="remoteChargeNormalTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
    />
    <Dialog
      :show="imp_edit.remote_area_charges_n"
      v-if="imp_edit.remote_area_charges_n"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import Dialog from "./Dialog/index.vue";
import { surchargesRemoteareaColumns } from "../../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: surchargesRemoteareaColumns,
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
      imp_edit: "Outbound/Edit/imp_edit",
      rateCard: "Outbound/Edit/rateCard",
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      toggleDialog: "Outbound/Edit/toggleDialog",
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      setTypeId: "Outbound/Edit/setTypeId",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "imp_edit",
        type: "remote_area_charges_n",
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

        let type_id = "";

        response.data.results.surcharges.map((list) => {
          if (list.type == "remote_area_charges") {
            type_id = list.id;

            list.remote_area_normal_rates.map((rates, idx) => {
              data.push({
                sl_no: idx + 1,
                country: rates.country.country_name,
                country_code: rates.country.country_iso_code,
                destination:
                  rates.destination.destination_code +
                  ", " +
                  rates.destination.destination_name,
                document: rates.per_document_rate,
                parcel: rates.per_parcel_rate,
                postal_code: rates.postal_code,
                min: rates.per_min_rate,
                created_by: rates.created_by,
                createdAt: rates.createdAt,
                status: rates.status,
                country_id: rates.country_id,
                type_id: rates.type_id,
                destination_id: rates.destination_id,
                id: rates.id,
                user: {
                  display_name: rates.user.display_name,
                },
              });
            });
          }
        });

        this.tableData = data;

        if (this.tableData?.length || type_id) {
          this.setTypeId({
            type: "imp_edit",
            data: type_id,
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