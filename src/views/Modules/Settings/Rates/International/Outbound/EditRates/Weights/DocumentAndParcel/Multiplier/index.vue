<template>
  <div>
    <DataTable
      tableName="weightDocumentParcelMultiTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :expansion="false"
      :rowEditor="true"
      weightType="multiplier"
      :deleteAction="true"
    />
  </div>
</template>

<script>
import DataTable from "../../../Table/DataTable.vue";
import { weidhtTableColumn } from "../../../../const";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { DataTable },
  data() {
    return {
      tableData: null,
      tableColumns: weidhtTableColumn,
    };
  },
  watch: {
    renderKey() {
      this.getData();
    },
  },
  computed: {
    ...mapGetters({
      rateCard: "Outbound/Edit/rateCard",
      renderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
    }),

    async getData() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "zones",
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
        this.tableColumns = [
          { field: "actions", header: "Actions" },
          { field: "weight_range", header: "Weight Range" },
          { field: "fuel_charge", header: "Fuel $" },
        ];
        response.data.results.zones.map((zone) => {
          this.tableColumns.push({
            field: "rate_" + zone.zone_no,
            header: "Zone " + zone.zone_no,
          });
          zone.weight_type.map((zoneType) => {
            if (zoneType.type == "document_and_parcel") {
              zoneType.multiplier_rates.map((rates, idx) => {
                if (
                  data[idx]?.fuel_charge !== rates.fuel_charge &&
                  data[idx]?.weight_range !==
                    rates.min_weight + " - " + rates.max_weight
                ) {
                  data.push({
                    weight_range: rates.min_weight + " - " + rates.max_weight,
                    fuel_charge: rates.fuel_charge,
                    min_weight: rates.min_weight,
                    max_weight: rates.max_weight,
                    sl_no: idx,
                    ["id_" + rates.id]: rates.id,
                    ["rate_" + zone.zone_no]: rates.rate,
                    id: rates.id,
                  });
                } else {
                  data[idx]["rate_" + zone.zone_no] = rates.rate;
                  data[idx]["id_" + rates.id] = rates.id;
                }
              });
            }
          });
        });

        this.tableData = data;
      }
    },
  },
  created() {
    this.tableData = [];
    this.getData();
  },
};
</script>

<style>
</style>