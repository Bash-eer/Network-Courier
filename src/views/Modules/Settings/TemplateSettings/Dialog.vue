<template>
  <Dialog
    v-model:visible="$store.state['templateSettings'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{
      $store.state["templateSettings"].dialogHeader
    }}</template>
    <div
      v-if="dialogComponent == 'Termination'"
      class="flex justify-content-between w-full"
    >
      <div class="flex"></div>
      <div class="flex mr-3">
        <img :src="'/images/' + 'profile-girl' + '.png'" alt="img" width="40" />
        <div class="flex flex-column ml-3 p-0">
          <p class="m-0 p-0">Sales person</p>
          <p class="m-0 p-0">Jasmine</p>
        </div>
      </div>
    </div>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import documentModuleNameDialog from "./Dialogs/documentModuleNameDialog.vue";
import emailModuleNameDialog from "./Dialogs/emailModuleNameDialog.vue";
import emailCreateTemplate from "./Dialogs/emailCreateTemplate.vue";

export default {
  components: {
    Dialog,
    documentModuleNameDialog,
    emailModuleNameDialog,
    emailCreateTemplate,
  },
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.$route.params.type == "Email") {
        return "75vw";
      } else {
        return "45vw";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogToggleText {
  font-weight: bold;
}
</style>
