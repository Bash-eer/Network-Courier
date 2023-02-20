<template>
  <div>
    <Toast position="top-center" />
  </div>
</template>

<script>
import Toast from "primevue/toast";

export default {
  props: ["severity", "summary", "detail", "life", "storePath"],
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
    "$store.state['storePath'].toastData.showToastMessage": function () {
      if (this.$store.state[this.storePath].toastData.showToastMessage) {
        this.showToast(
          this.$store.state["storePath"].toastData.severity,
          this.$store.state["storePath"].toastData.summary
        );
        this.$store.state["storePath"].toastData.showToastMessage = false;
      }
    },
  },
};
</script>

<style></style>
