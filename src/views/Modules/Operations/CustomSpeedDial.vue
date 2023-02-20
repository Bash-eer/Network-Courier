<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded mx-2  updateButton'"
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
                zone-route-custom-speed-dial-text
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { errhandler } from "@/services/httpClient";
export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName"],
  components: {
    Button,
    OverlayPanel,
  },
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
      disableRouteZone: "operationZonesRoute/commonDisable",
      deleteRouteZone: "operationZonesRoute/commonDelete",
      vanRouteDataFetch: "operationZonesRoute/loadVanRouteData",
      rapidoRouteDataFetch: "operationZonesRoute/loadRapidoRouteData",
      bikeRouteDataFetch: "operationZonesRoute/loadBikeRouteData",
    }),
    ...mapMutations({
        updateCurrentTab: 'operationZonesRoute/updateCurrentTab'
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
        this.$store.state.operationZonesRoute.tableLoad = true;

        let data = this.rowData;
        data.type = this.dataName;
        data.status = status.status;
        let response = await this.disableRouteZone(data);
        if (response && response.status === 200) {
          let info = `The Zone ${this.rowData.route_name} is ${statusMsg} successfully!`;
          this.commonToast("success", "Success", info);
          this.initializeData(data);
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
        if (this.storePath == "operationZonesRoute") {
          this.$store.state["operationZonesRoute"].displayDialog = true;
          this.$store.state["operationZonesRoute"].dialogComponent =
            "newRouteZoneDialog";
          this.$store.state["operationZonesRoute"].zonesRouteCreationData =
            this.rowData;
            this.updateCurrentTab(this.dataName)
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
            this.deleteRouteZones();
          },
        });
      }
    },

    initializeData(data) {
      let paginationParams = {
        id: this.$route.params.id,
        pagination: {
          offset: this.pageOffset,
          limit: this.pageLimit,
          orderBy: ['createdAt', 'ASC'],
        },
        type: this.dataName,
      };
      this.$store.state.operationZonesRoute.tableLoad = true;
      if (data.type == "BikeTab") {
        this.bikeRouteDataFetch(paginationParams);
      } else if (data.type == "VanTab") {
        this.vanRouteDataFetch(paginationParams);
      } else {
        this.rapidoRouteDataFetch(paginationParams);
      }
    },

    commonToast(severity, summary, message) {
      this.$store.state.operationZonesRoute.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    //FOR DELETE ROUTE ZONES ON ROUTE PLANNING
    async deleteRouteZones() {
      try {
        this.$store.state.operationZonesRoute.tableLoad = true;
        let data = this.rowData;
        data.type = this.dataName;
        let response = await this.deleteRouteZone(data);
        if (response && response.status === 200) {
          let info = "Route zone deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData(data);
        } else {
          let info = response.data.message || "Failed to delete the route zone";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
  },
  computed: {
    ...mapGetters({ pageOffset: "operationZonesRoute/getPageOffset", pageLimit: "operationZonesRoute/getPageLimit" }),
  },
};
</script>

<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.zone-route-custom-speed-dial-text {
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
