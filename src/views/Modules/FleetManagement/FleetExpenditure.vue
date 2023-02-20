<template>
  <div
    class="
      wrapper
      flex flex-row
      justify-content-between
      align-items-center
      relative
    "
  >
    <div
      class="mt-3 mb-3 ml-3 color-4e5968 bold-700 font-size-18 line-height-28"
    >
      Expenditure
    </div>
    <!-- <div class="expenditure-search-icons">
            <i class="pi pi-search searchIcon"></i>
            <SearchField class="mr-3" storePath="fleets" />
            <TextField
              v-model="searcher"
              placeholder="Search by Keyword"
              classes="p-inputtext-sm search-text search-input-field color-b9b9b9"
              v-on:childToParent="globalSearcher"
              class="p-inputtext-sm mr-2 search-btn"
            />
          </div> -->
    <div class="flex mr-8">
      <SearchField class="mr-3" storePath="contacts" />
    </div>
  </div>
  <!-- sub tabs -->
  <FleetsSubTabs
    storePath="fleets"
    :tabMenuData="$store.state['fleets'].expenditureSubTabMenuData"
  />
</template>

<script>
export default {
  name: "FleetExpenditure",
  data() {
    return {
      searcher: "",
    };
  },
  created() {
    this.$store.commit("users/updateBreadCrumb", "FleetExpenditure");
  },
};
</script>

<style scoped>
.wrapper {
  background: #fff !important;
}
/* ::v-deep .search-input-field {
  padding-left: 40px !important;
  width: 328px !important;
  height: 36px !important;
  font-size:12px;
}
::v-deep .expenditure-search-icons i {
  position: absolute;
  right: 305px;
  top: 25px;
  color:#b9b9b9 !important;
  font-size:12px !important;
} */
</style>
