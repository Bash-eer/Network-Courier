<template>
  <div>
    <Toast position="top-center" />
  </div>
</template>

<script>
import Toast from "primevue/toast";
import { mapGetters } from "vuex";
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
   computed: {
    ...mapGetters({
      showToastMessageData: "liveJobStatus/showToastMessagedata",
    }),
  },
  watch: {
    "$store.state.liveJobStatus.toastData.showToastMessage": function () {
      if (this.showToastMessageData["showToastMessage"]) {
        this.showToast(
           this.showToastMessageData["severity"],
          this.showToastMessageData["summary"]
        );
        this.showToastMessageData["showToastMessage"] = false;
      }
    },
  },
};
</script>

<style></style>
