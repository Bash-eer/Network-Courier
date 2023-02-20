<template>
  <Dialog
    v-model:visible="$store.state['TypeSetting'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{ $store.state["TypeSetting"].dialogHeader }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
//dialogs
import DeliveryTypeDialog from "./Dialog/DeliveryTypeDialog.vue";
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "AddNewRate") {
        return "75vw";
      } else return "70vw";
    },
    closeDialog() {},
  },
  components: {
    Dialog,
    DeliveryTypeDialog,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.activityLogHeader {
  color: #7e84a7;
  font-size: 11px;
}
.dialogToggleText {
  font-weight: bold;
}
</style>
