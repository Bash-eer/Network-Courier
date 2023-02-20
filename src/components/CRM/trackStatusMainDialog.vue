<template>
  <Dialog
    v-model:visible="$store.state['customerLaunchBookingHistory'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
    :closable="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="font-size-16 color-4e5968 dialog-header">
            Tracking Status
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
    <template #footer>
      <div class="custom-footer">
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <Buttons
            label="Close"
            v-on:childToParent="closeDialog"
            class="p-button-outlined mr-1 dialog-button-text"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import TrackStatusDialog from "./Dialogs/trackStatusDialog";
export default {
  name: "TrackStatusMainDialog",
  props: ["dialogComponent"],
  components: {
    Dialog,
    TrackStatusDialog,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      showTrackStatusDialog: "customerLaunchBookingHistory/showTrackDialog",
    }),
    closeDialog() {
      this.showTrackStatusDialog(false);
    },
    getHeight() {},
    getWidth() {
      return "60vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      displayDialog: "customerLaunchBookingHistory/getDisplayDialog",
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
.title-image {
  height: 25px;
  width: 25px;
  margin-left: 10px;
}
</style>
