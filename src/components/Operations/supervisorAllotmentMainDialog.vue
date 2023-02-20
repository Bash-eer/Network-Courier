<template>
  <Dialog
    v-model:visible="$store.state['supervisorAllotment'].displayDialog"
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
              supervisorData?.id
                ? "Edit Supervisor Allotment"
                : "New Supervisor Allotment"
            }}
          </h4>
        </div>
      </div>
    </template>

    <supervisorAllotmentDialog :selectedTab="selectedTab" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import supervisorAllotmentDialog from "./Dialogs/SupervisorAllotment/supervisorAllotmentDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "supervisorMainDialog",
  props: ["displayDialog", "dialogComponent", "selectedTab"],
  methods: {
    getHeight() {},
    getWidth() {
      return "50vw";
    },
  },
  components: {
    Dialog,
    supervisorAllotmentDialog,
  },
  created() {},
  computed: {
    ...mapGetters({
      supervisorData: "supervisorAllotment/getEditSupervisorData",
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
</style>
