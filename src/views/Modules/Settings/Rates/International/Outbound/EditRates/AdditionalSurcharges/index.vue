<template>
  <div>
    <div
      class="
        color-4e5968
        font-size-18
        bold-700
        flex
        justify-content-start
        mb-3
        additional_surcharges
      "
    >
      Additional Surcharges
    </div>
    <DataTable
      tableName="addSurcharge"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :editAction="true"
      :expansion="false"
    />
    <Dialog
      :show="imp_edit.add_surcharges"
      v-if="imp_edit.add_surcharges"
      @close="closeDialog"
      @save="renderKey++"
    />
  </div>
</template>

<script>
import DataTable from "../Table/DataTable.vue";
import Dialog from "./dialog.vue";
import { addSurchargesColumns } from "../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable, Dialog },
  data() {
    return {
      renderKey: 10,
      tableData: null,
      tableColumns: addSurchargesColumns,
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
          type: "additional_surcharges",
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

        response.data.results.additional_surcharges.map((list, idx) => {
          data.push({
            sl_no: idx + 1,
            ...list,
          });
        });

        this.tableData = data;

        if (this.tableData?.length) {
          this.setTypeId({
            type: "imp_edit",
            data: this.tableData[0].rate_card_id,
          });
        }
      }
    },
  },
  created() {
    this.setCurrentTab({ edit: "imp_edit", data: "add_surcharges" });
    this.getData();
  },
};
</script>

<style>
.additional_surcharges {
  background: white;
  margin: 0px;

  width: 100%;
  padding-left: 19px;
}
</style>
