<template>
  <div class="claimsDiv p-3">
    <span class=" ml-2 fleetsHeader">Claims</span>
    <div>
     <FleetManagementTabs
        v-bind:tabMenuData="$store.state.fleets.claimsTabMenuData"
        type="fleetClaims"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FleetClaims",
};
</script>

<style scoped>
.claimsDiv {
  background: #ffffff;
  text-align: start;
}
.fleetsHeader {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #4e5968;
}
</style>
