<template>
  <component
    :key="$store.state.sales.quotationDialogLoadState"
    v-bind:is="comp"
  ></component>
</template>

<script>
export default {
  name: "QuotationCostingDetails",
  data: () => ({
    comp: null,
  }),
  methods: {
    getFields() {
      switch (this.$store.state.sales.quotationDialogLoadState) {
        case "Bike":
          this.comp = "ExpressContractBikeCostingDetails";
          break;
        case "Van":
          this.comp = "ExpressContractVanCostingDetails";
          break;
      }
    },
  },
  activated() {
    this.getFields();
  },
};
</script>

<style></style>
