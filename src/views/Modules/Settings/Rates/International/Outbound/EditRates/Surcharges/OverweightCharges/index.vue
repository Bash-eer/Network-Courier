<template>
  <div class="color-4e5968 font-size-18 bold-700 flex justify-content-start ml-3 mb-3">Over Weight Surcharges</div>
  <div>
    <DataTable
      tableName="overWeightCharge"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
      :editAction="true"
    />
    <Dialog
      :show="imp_edit.overweight_charges"
      v-if="imp_edit.overweight_charges"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../../Table/DataTable.vue";
import Dialog from "./dialog.vue";
import { mapActions, mapGetters } from "vuex";
import { surchargesOverweightColumn } from "../../../const";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: surchargesOverweightColumn,
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
      setCurrentTab: "Outbound/Edit/setCurrentTab",
      toggleDialog: "Outbound/Edit/toggleDialog",
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      setTypeId: "Outbound/Edit/setTypeId",
    }),
    closeDialog() {
      this.toggleDialog({
        edit: "imp_edit",
        type: "overweight_charges",
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

        response.data.results.surcharges.map((list) => {
          if (list.type == "over_weight_charges") {
            list.over_weight_rates.map((rates, idx) => {
              data.push({
                ...rates,
                sl_no: idx + 1,
              });
            });
          }
        });

        this.tableData = data;

        if (this.tableData?.length) {
          this.setTypeId({
            type: "imp_edit",
            data: this.tableData[0].type_id,
          });
        }
      }
    },
  },
  created() {
    this.setCurrentTab({ edit: "imp_edit", data: "overweight_charges" });
    this.getData();
  },
};
</script>

<style>
</style>