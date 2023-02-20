<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded ml-2 mr-2 mt-2 updateButton'"
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="(items, index) of customDialData"
          :class="
            index != customDialData.length - 1
              ? 'flex mb-3 menuDivs'
              : 'flex menuDivs'
          "
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer"
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="flex align-items-center justify-content-center hover-blue custom-speed-dial-text"
            >
              {{ items.label }}
            </div>
            <div
              v-if="items.label == 'Disable'"
              class="
                flex
                align-items-center
                justify-content-center
                ml-5
                hover-blue
              "
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
 
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="rowData.company_status == 'disable' ? true : false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from "primevue/button";

import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName"],
  data() {
    return {
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-plus",
          command: () => this.$emit("editMethod"),
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
          command: () => this.$emit("deleteMethod"),
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    customDateFormatter(data) {
      let rawDate = new Date(data);
      let month = rawDate.getMonth() + 1;
      let year = rawDate.getFullYear();
      if (month.toString().length == 1) {
        month = "0" + month;
      }
      let newyear = year.toString().slice(2);
      let dateString = month + "/" + newyear;
      return dateString;
    },
    menuClicked(choice) {
      if (choice == "Edit"){
          
             this.$store.state.geoFencing.geoFencingFormStateData = this.rowData;

          this.$store.dispatch("geoFencing/openDialog", {
            dialogDetails: {
              dialogName: "GeoFencingAddNewDialog",
              dialogHeader: "Add Geo Location - Postal Code",
            },
         
          });
          this.$store.getters["geoFencing/controlActivityDialog"];
      }
      if (choice == "Delete") {
       
              this.$store.dispatch("geoFencing/DELETECRUDOPERATION", {
            path:
              "settings/geoFencing/" +
              this.rowData.id,
            method: "DELETE",

            toastData: {
              toastSuccessData: {
                toastMsg: `${this.rowData.name} is deleted successfully!`,
                toastSeverity: "info",
              },
              toastErrorData: {
                toastMsg: "There was an error in deleting, try again!",
                toastSeverity: "error",
              },
            },
            loadData: {
              loadApi: "loadGeoFencingTable",
              loadPath: "settings/geoFencing",
              loadMutation: "fetchGeoTableMutation",
            },
          });

          this.$refs.op.hide();
        }
    
   
    },
  },
  components: {
    Button,

    OverlayPanel,
  },
};
</script>

<style scoped>
.custom-speed-dial-text{
font-weight: 600;
font-size: 12px;
line-height: 15px;
color: #4E5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>