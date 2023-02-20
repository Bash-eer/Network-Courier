<template>
  <Dialog
    v-model:visible="$store.state['operationsStatusSettings'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="font-size-16 color-4e5968 dialog-header">
            {{
              statusFormData?.id ? "Edit Special Job Entry Settings" : "New Special Job Entry Settings"
            }}
          </h4>
        </div>
      </div>
      {{}}
    </template>
    <!--rendering dynamic components inside the dialog-->
    <specialJobEntryDialog
      v-bind:is="dialogComponent"
      :selectedTab="$store.state['operationsSpecialJobEntry'].currentTab"
      class="tab"
    />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import specialJobEntryDialog from "./Dialogs/specialJobEntry/specialJobEntryDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "specialJobEntryMainDialogue",
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      return "50vw";
    },
  },
  components: {
    Dialog,
    specialJobEntryDialog,
  },
  computed: {
    ...mapGetters({ statusFormData: "operationsStatusSettings/getEditStatusData", }),
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
