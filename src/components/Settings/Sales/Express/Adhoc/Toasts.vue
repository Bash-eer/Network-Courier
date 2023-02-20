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
    "$store.state.expressAdhoc.toastData.showToastMessage": function () {
      if (this.$store.state.expressAdhoc.toastData.showToastMessage) {
        this.showToast(
          this.$store.state.expressAdhoc.toastData.severity,
          this.$store.state.expressAdhoc.toastData.summary
        );
        this.$store.state.expressAdhoc.toastData.showToastMessage = false;
      }
    },
  },
};
</script>

<style></style>
