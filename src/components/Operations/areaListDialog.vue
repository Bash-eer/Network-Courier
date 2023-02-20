<template>
  <Dialog
    v-model:visible="$store.state['zoneAreaList'].displayDialog"
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
            {{ addressFormData?.id ? "Edit Address" : "Add Address" }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering addAddressDialog component inside the dialog-->
    <addAddressDialog />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import addAddressDialog from "./Dialogs/Zones/addAddressDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "areaListDialog",
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      return "75vw";
    },
  },
  components: {
    Dialog,
    addAddressDialog,
  },
  created() {},
  computed: {
    ...mapGetters({ addressFormData: "zoneAreaList/getEditAddressData" }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
</style>
