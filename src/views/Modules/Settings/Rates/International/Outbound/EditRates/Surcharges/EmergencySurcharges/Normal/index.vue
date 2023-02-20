<template>
  <div>
    <DataTable
      tableName="surchargesNormalTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
    />

    <Dialog
      :show="imp_edit.emergency_n"
      v-if="imp_edit.emergency_n"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import Dialog from "./dialog.vue";
import { mapActions, mapGetters } from "vuex";
import { surchargesNormalTableColumn } from "../../../../const";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: surchargesNormalTableColumn,
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
        type: "emergency_n",
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
          if (list.type == "emergency_surcharges") {
            type_id = list.id;
            list.normal_rates.map((rates, idx) => {
              data.push({
                weight_range: rates.min_weight + " - " + rates.max_weight,
                sl_no: idx + 1,
                country: rates.country.country_name,
                country_code: rates.country.country_iso_code,
                document: rates.document_rate,
                parcel: rates.parcel_rate,
                country_id: rates.country_id,
                created_by: rates.created_by,
                createdAt: rates.createdAt,
                status: rates.country.status,
                max_weight: rates.max_weight,
                min_weight: rates.min_weight,
                type_id: rates.type_id,
                minimum_rate: rates.minimum_rate,
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