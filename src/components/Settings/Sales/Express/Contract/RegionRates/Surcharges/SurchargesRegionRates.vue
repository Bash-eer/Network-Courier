<template>
  <RegionRatesTable
    :tableDataName="'SurchargesTableData'"
    :tableName="'SurchargesTable'"
    :tableData="tableData"
    :tableColumns="getTableInput('columns', '', 'surcharges', 'surcharges')"
    :type="'surcharges'"
  />
</template>

<script>
//table
import RegionRatesTable from "../../Tables/RegionRatesTable.vue";
import { mapState, mapActions } from "vuex";
//function imports
import { getTableInput } from "../../functions/functions.js";
export default {
  components: {
    RegionRatesTable,
  },
  data: () => ({
    tableData: [],
  }),
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },

  mounted() {
    this.initialised();
  },
  methods: {
    ...mapActions("express", ["getRegionRatesById"]),
    initialised() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (
            this.regionRatesByIdData.charge_types[i].charge_type == "surcharges"
          ) {
            this.tableData = this.regionRatesByIdData.charge_types[i].surcharges.map((ele, index) => {
              return {
                ...ele,
                createdAt: new Date(ele.createdAt),
              };
            });
          }
        }
      });
    },
    //fetch table input
    getTableInput(format, transport, type, label) {
      return getTableInput(
        this.$store.state.expressContract.regionRatesTableData,
        format,
        transport,
        type,
        label
      );
    },
  },
};
</script>

<style></style>
