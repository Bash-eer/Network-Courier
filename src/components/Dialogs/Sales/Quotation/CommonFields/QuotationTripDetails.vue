<template>
  <component
    :key="$store.state.sales.quotationDialogLoadState"
    v-bind:is="comp"
  ></component>
</template>

<script>
export default {
  name: "QutationTripDetails",
  data: () => ({
    comp: null,
  }),
  methods: {
    getFields() {
      switch (this.$store.state.sales.quotationDialogLoadState) {
        case "Bike":
          this.comp = "ExpressContractBikeTripDetails";
          break;
        case "Van":
          this.comp = "ExpressContractVanTripDetails";
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
