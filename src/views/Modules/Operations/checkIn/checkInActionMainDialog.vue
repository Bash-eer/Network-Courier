<template>
  <Dialog
    v-model:visible="$store.state.CheckInTab.isPrintPreviewDialog"
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
          <h4 class="font-size-16 color-4e5968 dialog-header">{{ title }}</h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <actionDialog
      v-bind:is="dialogComponent"
      class="tab"
      :updateDialogData="updateDialogData"
      :title="title"
    >
    </actionDialog>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import actionDialog from "./actionDialog.vue";
export default {
  name: "checkInMainDialog",
  props: ["dialogComponent", "dialogData", "title", "updateDialogData"],
  components: {
    Dialog,
    actionDialog,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {},
    getWidth() {
      return "40vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      feedbackData: "CrmFeedback/getFeedbackFormData",
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
::v-deep .p-chips .p-chips-multiple-container .p-chips-token {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 4px;
}
</style>
