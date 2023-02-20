<template>
  <div class="wrapper">
    <QuotationHeader />
    <br />
    <QuotationBody />
  </div>
</template>

<script>
import QuotationHeader from "./QuotationHeader.vue";
import QuotationBody from "./QuotationBody.vue";
export default {
  components: { QuotationHeader, QuotationBody },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
</style>
