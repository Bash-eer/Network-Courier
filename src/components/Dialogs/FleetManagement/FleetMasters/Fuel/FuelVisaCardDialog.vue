<template>
  <VisaCard :cardDetails="$store.state.masters.fleetsCardData" />
  <div class="formgrid grid pl-2 pr-2">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Close"
          class="p-button-outlined mr-1 dialog-button-text"
          v-on:childToParent="closeDialog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VisaCard from "../VisaCard.vue";
export default {
  components: { VisaCard },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
  },
};
</script>

<style scoped></style>
