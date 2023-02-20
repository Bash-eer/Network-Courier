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
    "$store.state.salesCommon.toastData.showToastMessage": function () {
      if (this.$store.state.salesCommon.toastData.showToastMessage) {
        this.showToast(
          this.$store.state.salesCommon.toastData.severity,
          this.$store.state.salesCommon.toastData.summary
        );
        this.$store.state.salesCommon.toastData.showToastMessage = false;
      }
    },
  },
};
</script>

<style></style>
