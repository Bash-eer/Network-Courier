<template>
  <Dialog
    v-model:visible="$store.state.liveJobStatus.updateRouteSettingsDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
      backgroundColor: color(),
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
            Update Route Settings
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <updateRouteSettingsDialog
      v-bind:is="dialogComponent"
      :emittedUpdateRouteSettingsData="emittedUpdateRouteSettingsData"
      :emitMultipleData="emitMultipleData"
      class="tab"
      :selectedTab="selectedTab"
      :paginationParams="paginationParams"
      :saerchValue="saerchValue"
      :searchKey="searchKey"
    />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import updateRouteSettingsDialog from "../liveJobStatus/updateRouteDialog.vue";

export default {
  name: "updateRouteSettingsMainDialog",
  props: [
    "dialogComponent",
    "emittedUpdateRouteSettingsData",
    "selectedTab",
    "emitMultipleData",
    "paginationParams",
    "saerchValue",
    "searchKey",
  ],
  components: {
    Dialog,
    updateRouteSettingsDialog,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {
      return "55vh";
    },
    getWidth() {},
    color() {
      return "white";
    },
  },
  created() {},
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
::v-deep .p-dialog,
::v-deep.p-dialog-header {
  padding-bottom: 0px;
}
</style>
