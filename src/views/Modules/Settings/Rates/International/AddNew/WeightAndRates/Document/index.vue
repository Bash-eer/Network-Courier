<template>
  <div>
    <RatesAccordion tabName='document' />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RatesAccordion from "../RatesAccordion.vue";

export default {
  components: { RatesAccordion },
  computed: {
    ...mapGetters({
      document: "AddNewInternational/WeightAndRates/document",
    }),
  },
};
</script>

<style>
</style>