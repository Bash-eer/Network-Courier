<template>
  <div>
    <Toast position="top-center" />
  </div>
</template>

<script>
import Toast from "primevue/toast";

export default {
  name: "ToastMessages",
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
    "$store.state.users.showToastMessage": function () {
      if (this.$store.state.users.showToastMessage) {
        this.showToast(
          this.$store.state.users.severity,
          this.$store.state.users.summary
        );
        this.$store.state.users.showToastMessage = false;
      }
    },
  },
};
</script>

<style></style>
