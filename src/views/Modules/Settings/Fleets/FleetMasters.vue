<template>
  <div class="wrapper flex flex-row justify-content-between align-items-center">
    <div class="m-2 titleDesign">Fleet Settings</div>
  </div>
  <!-- sub tabs -->
  <FleetsSubTabs
    storePath="masters"
    class="table-design titleDesign"
    :tabMenuData="$store.state['masters'].fleetManagementSubTabMenuData"
  />
</template>

<script>
export default {
  data() {
    return {
      searcher: "",
    };
  },
  mounted(){
    this.$store.commit("users/updateBreadCrumb", "FleetMasters");
  }
};
</script>

<style scoped>
.wrapper {
  background: #fff !important;
   /* max-width: 1280px !important;
 margin:0 auto; */
}
/* .table-design{
 max-width: 1280px !important;
 margin:0 auto;
} */
.titleDesign{
  color: #4E5968;
  font-size: 18px;
  font-weight: 700;
}
</style>

