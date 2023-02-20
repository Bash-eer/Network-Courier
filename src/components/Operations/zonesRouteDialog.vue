<template>
  <Dialog
    v-model:visible="$store.state['operationZonesRoute'].displayDialog"
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
          <h4 class="font-size-16 dialog-header">
            
            {{routeZoneFormData?.id ? 'Edit Route' : 'New Route'}}
            <img
              class="title-image"
              v-if="$store.state['operationZonesRoute'].currentTab == 'VanTab'"
              src="../../assets/van.png"
              alt="img"
              width="40"
            />
            <img
              class="title-image"
              v-if="
                $store.state['operationZonesRoute'].currentTab == 'RapidoTab'"
              src="../../assets/rapido2.png"
              alt="img"
              width="40"
            />
            <img
              class="title-image"
              v-if="$store.state['operationZonesRoute'].currentTab == 'BikeTab'"
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
      :selectedTab="$store.state['operationZonesRoute'].currentTab"
      :zoneId="$store.state['operationZonesRoute'].zoneId"
      class="tab"
    >
    </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import newRouteZoneDialog from "./Dialogs/Zones/newRouteZoneDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "zonesRouteDialog",
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      return "70vw";
    },
  },
  components: {
    Dialog,
    newRouteZoneDialog,
  },
  created() {},
   computed: {
    ...mapGetters({ routeZoneFormData: "operationZonesRoute/getEditRouteZonesData" }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.dialog-header {
  font-weight: 700;
}
.title-image {
  height: 25px;
  width: 25px;
  margin-left: 10px;
}
</style>
