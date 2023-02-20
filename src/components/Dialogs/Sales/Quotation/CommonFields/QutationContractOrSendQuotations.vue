<template>
  <component
    :key="$store.state.sales.quotationDialogLoadState"
    v-bind:is="comp"
  ></component>
</template>

<script>
export default {
  name: "QutationContractOrSendQuotations",
  data: () => ({
    comp: null,
  }),
  methods: {
    getFields() {
      switch (this.$store.state.sales.quotationDialogLoadState) {
        case "Bike":
          this.comp = "ExpressContractBikeContractOrSendQuotation";
          break;
        case "Van":
          this.comp = "ExpressContractVanContractOrSendQuotation";
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
