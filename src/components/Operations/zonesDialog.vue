<template>
  <Dialog
    v-model:visible="$store.state['operationZones'].displayDialog"
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
            {{zoneFormData?.id ? 'Edit Zone' : 'New Zone'}}
            <img
              class="title-image"
              v-if="$store.state['operationZones'].currentTab == 'VanTab'"
              src="../../assets/van.png"
              alt="img"
              width="40"
            />
            <img
              class="title-image"
              v-if="$store.state['operationZones'].currentTab == 'RapidoTab'"
              src="../../assets/rapido2.png"
              alt="img"
              width="40"
            />
            <img
              class="title-image"
              v-if="$store.state['operationZones'].currentTab == 'BikeTab'"
              src="../../assets/bike.png"
              alt="img"
              width="40"
            />
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component
      v-bind:is="dialogComponent"
      :selectedTab="$store.state['operationZones'].currentTab"
      class="tab"
    >
    </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import zoneCreationDialog from "./Dialogs/Zones/zoneCreationDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "zonesDialog",
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      return "40vw";
    },
  },
  components: {
    Dialog,
    zoneCreationDialog,
  },
  created() {},
  computed: {
    ...mapGetters({ zoneFormData: "operationZones/getEditZonesData" }),
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
