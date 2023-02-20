<template>
  <div
    class="
      wrapper
      flex flex-row
      justify-content-between
      align-items-center
      bg-white
    "
  >
    <div class="ml-5 header"><b>Geo Fencing</b></div>
    <div class="flex mr-1">
      <SplitButton label="Add New" @click="save" :model="items"></SplitButton>
    </div>
  </div>

  <GeoFencingTable
    :tableData="$store.state['geoFencing']['geoFencingTableData']"
    :tableColumns="tableColumnData"
    :overlayData="getOverlayData()"
  />
  <GeoFencingDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['geoFencing'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['geoFencing'].toastData.severity"
    :summary="$store.state['geoFencing'].toastData.summary"
  />
</template>

<script>
import SplitButton from "primevue/splitbutton";
import GeoFencingTable from "../../../../components/Settings/GeoFencing/GeoFencingTable.vue";
import {
  geoFencingTableColumnsData,
  geoFencingTablesOverlayData,
} from "../../../../components/Settings/GeoFencing/const";
import GeoFencingDialogs from "../../../../components/Settings/GeoFencing/Dialog.vue";
// import Card from "primevue/card";
import Toasts from "../../../../components/Settings/GeoFencing/Toasts.vue";
export default {
  components: {
    GeoFencingTable,
    GeoFencingDialogs,
    SplitButton,
    Toasts,
  },
  data() {
    return {
      items: [
        {
          label: "Postal Code",
          command: () => {
            this.openDialog(
              "GeoFencingAddNewDialog",
              "geoFencing",
              "Add Geo Location - Postal Code"
            );
          },
        },
        {
          label: "Draw a Location",
          // command: () => {
          //     this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
          // }
        },
      ],
      searcher: "",
      tableColumnData: geoFencingTableColumnsData,
      Add_New: [
        { name: "Postal Code", code: "1" },
        { name: "Draw a Location", code: "2" },
      ],
      details: {
        Add_New: "",
      },
    };
  },

  mounted() {
    this.$store.commit("users/updateBreadCrumb", "GeoFencing");
  },
  created() {
    this.$store.dispatch("geoFencing/loadGeoFencingTable", {
      path: "settings/geoFencing",
      mutation: "fetchGeoTableMutation",
    });
  },
  methods: {
    getOverlayData() {
      return geoFencingTablesOverlayData;
    },

    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 39px !important;
  padding-bottom: 10px !important;
}
.btn-design {
  background: #357dea !important;
  border-radius: 6px !important;
}
.content {
  margin-top: 10px;
  width: 251px;
  font-size: 14px;
  font-weight: 400;
}
/* .third-party-div {
  margin-left: 94px;
  margin-top: 40px;
  margin-right: 95px;
  padding-bottom: 53px;
} */
.search-text {
  width: 328px;
}
.p-button.p-button-sm {
  width: auto !important;
  height: 39px !important;
  /* margin-top: 8px !important; */
  font-weight: bold !important;
}
.header {
  color: #4e5968;
  font-weight: bold;
  font-size: 18px;
}
.outer_design {
  border: 1px solid #dcdcdc;
  width: 333px;
  height: 346px;
  box-sizing: border-box;
  border-radius: 15px;
}
.content-div {
  margin-top: 15px;
  margin-left: 23px;
  margin-right: 23px;
}
.title-class {
  font-weight: bold;
  font-size: 16px;
}
.border-design {
  width: 333px;
  height: 346px;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  padding: 0 !important;
  margin-left: 23px;
}
.image-design {
  width: 100%;
  margin: 0 !important;
  border-radius: 15px;
}
/* ::v-deep .p-dropdown .p-dropdown-trigger{
  color: white !important;;
  font-size: small;
} */
/* ::v-deep .dropdown_style{
 background: #357dea;
  font-size: small !important;
} */
/* ::v-deep .pi{
  font-size: small !important;
  color: white;
}
::v-deep .p-dropdown .p-dropdown-label.p-placeholder{
  color: white !important;
} */
</style>
