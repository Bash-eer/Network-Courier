<template>
  <FleetManagementTabs
    v-bind:tabMenuData="$store.state.fleets.FleetVehicleTabMenuData"
    type="fleetsVehicleHome"
  />
</template>

<script>
export default {
  name: "FleetVehicles",

  methods: {
    openDialog(name) {
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },
  created() {
    this.$store.commit("users/updateBreadCrumb", "FleetVehicles");
  },
};
</script>

<style></style>
