<template>
  <ZonesTab v-bind:tabMenuData="$store.state.operationZones.zonesTabMenuData" />
  <zonesDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['operationZones'].dialogComponent"
  />
  <zonesRouteDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['operationZonesRoute'].dialogComponent"
  />
</template>

<script>
import zonesDialog from "../../../components/Operations/zonesDialog.vue";
import zonesRouteDialog from "../../../components/Operations/zonesRouteDialog.vue";
import { mapActions } from "vuex";
export default {
  name: "RoutePlanningZones",
  components: {
    zonesDialog,
    zonesRouteDialog,
  },
  data: () => ({
    closeDialog: false,
  }),
  methods: {
    ...mapActions({
      bikeZoneDataFetch: "operationZones/loadBikeTableData",
      updateBreadCrumb: "users/updateBreadCrumb",
    }),
  },
  created() {
    let paginationParams = {
        offset: 1,
        limit: 10,
    }
    this.bikeZoneDataFetch(paginationParams);
    this.updateBreadCrumb('Route Planning Zones');
  },
};
</script>

<style>
.table-title {
  color: #4e5968;
  font-weight: 700;
  font-size: 18px;
}
</style>
