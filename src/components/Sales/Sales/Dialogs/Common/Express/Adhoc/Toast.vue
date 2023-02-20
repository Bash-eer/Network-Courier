<template>
  <div>
    <Toast position="top-center" />
  </div>
</template>

<script>
import Toast from "primevue/toast";

export default {
  props: ["severity", "summary", "detail", "life"],
  methods: {
    showToast(severity, summary) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        life: 5000,
      });
    },
  },
  components: {
    Toast,
  },
  watch: {
    "$store.state.salesExpressAdhoc.toastData.showToastMessage": function () {
      if (this.$store.state.salesExpressAdhoc.toastData.showToastMessage) {
        this.showToast(
          this.$store.state.salesExpressAdhoc.toastData.severity,
          this.$store.state.salesExpressAdhoc.toastData.summary
        );
        this.$store.state.salesExpressAdhoc.toastData.showToastMessage = false;
      }
    },
  },
};
</script>

<style></style>
