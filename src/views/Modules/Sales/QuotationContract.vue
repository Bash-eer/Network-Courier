<template>
  <div class="wrapper" :key="renderKey">
    <QuotationHeader />
    <br />
    <QuotationBody />
  </div>
  <SalesDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['salesSales'].toastData.severity"
    :summary="$store.state['salesSales'].toastData.summary"
  />
</template>

<script>
import QuotationHeader from "../../../components/Sales/Common/QuotationHeader.vue";
import QuotationBody from "../../../components/Sales/Common/QuotationBody.vue";
import SalesDialogs from "../../../components/Sales/Sales/Dialog.vue";
import Toasts from "../../../components/Sales/Sales/Toast.vue";

export default {
  components: { QuotationHeader, QuotationBody, SalesDialogs, Toasts },
  data() {
    return {
      renderKey: 1,
    };
  },
  watch: {
    "$route.params.id": function () {
      this.renderKey++;
    },
  },
  created() {
    this.$store.state.users.breadcrumbTitle = "Sales";
    this.$store.state.users.breadcrumbPath = `Sales > Sales > Quotations`;
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
</style>