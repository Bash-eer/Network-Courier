<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded ml-2 mr-2 mt-1 updateButton'"
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
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
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                zones-custom-speed-dial-text
              "
            >
              {{ items.label }}
            </div>
            <div
              v-if="items.label == 'Disable' || items.label == 'Private'"
              class="ml-3"
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="
                    rowData.status == 'Inactive' || rowData.private == true
                      ? true
                      : false
                  "
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
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "currentTab",
    "tabPageOffset"
  ],
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
    ...mapActions({
      deleteZone: "operationZones/commonDelete",
      disableZone: "operationZones/commonDisable",
      vanDataFetch: "operationZones/loadVanTableData",
      rapidoDataFetch: "operationZones/loadRapidoTableData",
      bikeDataFetch: "operationZones/loadBikeTableData",
      updatePageParams: "operationZones/updatePageOffsetLimit",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {
      var status;
      let statusMsg;
      if (this.rowData.status == "Active") {
        status = {
          status: "Inactive",
        };
        statusMsg = "disabled";
      } else if (this.rowData.status == "Inactive") {
        status = {
          status: "Active",
        };
        statusMsg = "enabled";
      }

      try {
        this.$store.state.operationZones.tableLoad = true;

        let data = this.rowData;
        data.type = this.dataName;
        data.status = status.status;
        let response = await this.disableZone(data);
        if (response && response.status === 200) {
          let info = `The Zone ${this.rowData.zone_name} is ${statusMsg} successfully!`;
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info =
            response.data.message ||
            "There was an error in disabling/enabling a zone, try again!";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }

      this.$refs.op.hide();
    },

    async menuClicked(choice) {
      //TO EDIT THE TABLE ROW
      if (choice == "Edit") {
        //FOR ZONES ON ROUTE PLANNING
        if (this.storePath == "operationZones") {
          this.$store.state["operationZones"].displayDialog = true;
          this.$store.state["operationZones"].dialogComponent =
            "zoneCreationDialog";
          this.$store.state["operationZones"].zonesCreationData = this.rowData;
          this.$store.state["operationZones"].currentTab = this.currentTab;
          this.$refs.op.hide();
        }
      }

      //TO DELETE THE TABLE ROW
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.deleteZones();
          },
        });
      }

      if (choice == "Add Route") {
        this.$store.state["operationZonesRoute"].displayDialog = true;
        this.$store.state["operationZonesRoute"].dialogComponent =
          "newRouteZoneDialog";
        this.$store.state["operationZonesRoute"].currentTab = this.currentTab;
        this.$store.state["operationZonesRoute"].selectedZoneName =
          this.rowData.zone_name;
        this.$store.state["operationZonesRoute"].zoneId = this.rowData.id;
      }
    },

    initializeData(data) {
      this.$store.state.operationZones.tableLoad = true;
      let paginationParams = {
        offset: this.pageOffset,
        limit: this.pageLimit,
        orderBy: ['createdAt', 'ASC'],
      };
      if (data.type == "bikeTableData") {
        this.bikeDataFetch(paginationParams);
      } else if (data.type == "vanTablesData") {
        this.vanDataFetch(paginationParams);
      } else {
        this.rapidoDataFetch(paginationParams);
      }
    },

    commonToast(severity, summary, message) {
      this.$store.state.operationZones.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    //FOR DELETE ZONES ON ROUTE PLANNING
    async deleteZones() {
      if (this.storePath == "operationZones") {
        try {
          this.$store.state.operationZones.tableLoad = true;
          let data = this.rowData;
          data.type = this.dataName;
          let response = await this.deleteZone(data);
          let pageParams = {
            offset: this.pageOffset,
            limit: this.pageLimit,
            tabOfPageOffset: this.tabPageOffset
          };
          await this.updatePageParams(pageParams);
          if (response && response.status === 200) {
            let info = "Zone deleted successfully";
            this.commonToast("success", "Success", info);
            this.initializeData(this.rowData);
          } else {
            let info = response.data.message || "Failed to delete the zone";
            this.commonToast("error", "Error", info);
          }
          this.$refs.op.hide();
        } catch (err) {
          let toastMsg = await errhandler(err, "error");
          this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      filterParams: "operationZones/getFilterParams",
      pageOffset: "operationZones/getPageOffset",
      pageLimit: "operationZones/getPageLimit",
      allPageOffset: "operationZones/getAllPageOffset"
    }),
  },
  components: {
    Button,

    OverlayPanel,
  },
};
</script>

<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.zones-custom-speed-dial-text {
  font-weight: 600;
  font-size: 14px;
  color: #4e5868;
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
