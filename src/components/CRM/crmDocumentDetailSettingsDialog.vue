<template>
  <Dialog
    v-model:visible="$store.state['CrmSettings'].displayDocumentDialog"
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
            {{
              documentDetailSettingsData?.id
                ? "Edit Document Detail Settings"
                : "New Document Detail Settings"
            }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <documentDetailDialog
      v-bind:is="dialogComponent"
      :emittedJobTypeData="emittedJobTypeData"
      class="tab"
    />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import documentDetailDialog from "./Dialogs/documentDetailDialog.vue";
export default {
  name: "CRMDocumentDetailSettingsMainDialog",
  props: ["dialogComponent", "emittedJobTypeData"],
  components: {
    Dialog,
    documentDetailDialog,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {},
    getWidth() {
      return "60vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      documentDetailSettingsData:
        "CrmSettings/getEditDocumentDetailSettingsData",
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
