<template>
  <Dialog
    v-model:visible="$store.state['others'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{ $store.state["others"].dialogHeader }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
//dialogs

import CompetitorsDialog from "./Dialogs/CompetitorsDialog.vue";
import ReferenceDialog from "./Dialogs/ReferenceDialog.vue";
import TradeDialog from "./Dialogs/TradeDialog.vue";
import FestivalsDialog from "./Dialogs/FestivalsDialog.vue";
export default {
  components: {
    Dialog,
    CompetitorsDialog,
    ReferenceDialog,
    TradeDialog,
    FestivalsDialog,
  },
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "AddNewRegion") {
        return "43vw";
      }
      return "50vw";
    },
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
