
<template>

  <div class="wrapper flex flex-row justify-content-between align-items-center">
    <!-- <div class=" ml-3"><b>Rooms Settings</b></div> -->
    <ContactManagementTab
    v-bind:tabMenuData="$store.state.masters.ContactSettingsTabMenuData"
    type="contactManagementSettings"
    defaultTab="ContactSettingsRooms"
    storePath="masters"
  />
     <!-- <div class="flex flex-row">
          <div class="m-2 mr-3">
      <TextField
        v-model="searcher"
        placeholder="Search by Keyword"
        icon="pi pi-search"
        icon_class="p-input-icon-left"
        classes="p-inputtext-sm p-2 search-text"
        v-on:childToParent="globalSearcher"
        style="width:328px"
      />
    </div>
          <div class="flex mr-1"> -->
               <!-- <Buttons
                  button_class="p-button-sm p-button-outlined  add-btn custom-add-btn"
                label="Export Report"
                v-on:childToParent="openDialog('')"
                />  
                 <ReportExport />
             </div> 
          <div class="flex">
            <Buttons
              button_class="p-button-sm mr-1 add-btn custom-add-btn"
              label="Add New"
              v-on:childToParent="openDialog('RoomSettingsDialog')"
            />
          </div>
        </div> -->
  </div>
 <!-- <ContactManagementTable
    tableClass="p-datatable-sm FleetsTable"
    tableDataName="RoomsData"
    tableName="Rooms Settings"
    :overlayData="$store.state['masters'].RoomSettingsOverlayData"
    :tableData="$store.state['masters']['RoomsTableData']"
    :tableColumns="$store.state['masters']['RoomsTableColumnData']"
    dataKey="id"
      :globalSearchString="$store.state.users.globalSearch"
    class="table-design"
     
      storePath="contacts"
  /> -->

</template>

<script>
export default {
  // data() {
  //   return {
  //     searcher: "",
  //   };
  // },

  mounted(){
    this.$store.commit("users/updateBreadCrumb", "RoomsMaster");
  },
    // globalSearcher(searchString) {
    //   this.$store.state.globalSearch = searchString;
    // },
  created() {
    this.$store.dispatch("masters/loadRoomsData", {
      path: "rooms",
      mutation: "fetchRoomsData",
    });
    
  },
   methods: {
        globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    // openDialog(name) {
    //   this.$store.state.masters.RoomsMasterFormStateData= {};
    //   this.$store.state.fleets.globalImageUploadURL = null;
    //   this.$store.state["users"].displayDialog = true;
    //   this.$store.state["users"].dialogComponent = name;
    //   this.$store.getters.controlActivityDialog;
    // },
     },
};
</script>

<style scoped>
.wrapper {
  background: #fff !important;
   max-width: 1280px !important;
 margin:0 auto;
}
::v-deep .border{
  border: none !important;
}
/* .p-button.p-button-sm{
     width: auto !important;
    height: 39px !important;
    margin-top: 8px !important;
    font-weight: bold !important;
} */

.table-design{
 max-width: 1280px !important;
 margin:0 auto;
}
.titleDesign{
  color: #4E5968;
  font-size: 18px;
  font-weight: 700;
}
.text{
font-size: 12px;
font-weight: 600;
}
.searchicon{
  background: rgba(255, 255, 255, 0.12);
border: 1px solid rgba(0, 0, 0, 0.21);
box-sizing: border-box;
border-radius: 4px;
border: 1px solid #B9B9B9;
  background: white;
  border-radius: 3px;
}
i{
  color: #B9B9B9;
;
}
 ::v-deep .p-inputtext{
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover{
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus{
     outline: 0 none;
    outline-offset: 0;
    box-shadow: none !important;
    border-color: none !important;

}

</style>
