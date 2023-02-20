<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="
        dataName != 'internationalRatesTable' && dataName != 'eventsGroupData'
          ? 'p-button-rounded ml-2 mr-2 mt-2 updateButton'
          : 'p-button-rounded ml-2 mr-2 mt-1 updateButton'
      "
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="
        tableName == 'eventsGroupComponent' ? 'width:100px' : 'width:190px'
      "
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
            class="flex flex-row menuItems"
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="flex align-items-center justify-content-center hover-blue"
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
              <div>
                <Toggle
                  v-if="
                    storePath == 'users' ||
                    storePath == 'masters' ||
                    storePath == 'fleets'
                  "
                  v-on:childToParent="disableRow"
                  :check="rowData.status == 'Inactive' ? true : false"
                />
                <Toggle
                  v-if="storePath == 'sales'"
                  v-on:childToParent="disableRow"
                  :check="rowData.company_status == 'disable' ? true : false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
    <!-- <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" /> -->
  </div>
</template>

<script>
import Button from "primevue/button";
// import Menu from "primevue/menu";
import OverlayPanel from "primevue/overlaypanel";
import { mapActions } from "vuex";
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
      setTransitDaysDialog: "Outbound/Edit/setTransitDaysDialog",
      setFuelChargeDialog: "Outbound/Edit/setFuelChargeDialog",
      setFuelChargeEdit: "Outbound/Edit/setFuelChargeEdit",
      setEdit: "Outbound/Edit/setEdit",
      setRenderKey: "Outbound/Edit/setRenderKey",
      deleteFuelCharges: "Outbound/Edit/deleteFuelCharges",
      setTransitDaysEdit: "Outbound/Edit/setTransitDaysEdit",
      deleteTransitDays: "Outbound/Edit/deleteTransitDays",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async menuClicked(label) {
      if (label == "Edit") {
        if (this.tableName === "transitDocumentTable") {
          this.setTransitDaysDialog({
            type: "displayDocumentDialog",
            data: true,
          });
          this.setTransitDaysEdit(this.rowData);
          this.$refs.op.hide();
          return;
        }

        if (this.tableName == "transitParcelTable") {
          this.setTransitDaysDialog({
            type: "displayParcelDialog",
            data: true,
          });
          this.setTransitDaysEdit(this.rowData);
          this.$refs.op.hide();
          return;
        }

        if (this.tableName === "fuelChargesTable") {
          this.setFuelChargeDialog(true);
          this.setFuelChargeEdit(this.$props.rowData);
          this.$refs.op.hide();
          return;
        }
      }

      if (label == "Delete") {
        if (this.tableName === "fuelChargesTable") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteFuelCharges(this.rowData.id);
                this.setRenderKey();
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Data deleted successfully",
                  life: 3000,
                });
              } catch (err) {
                let toastMsg = await errhandler(err);
                this.$toast.add({
                  severity: toastMsg.serverity,
                  summary: toastMsg.summary,
                  detail: toastMsg.msg,
                  life: 3000,
                });
              }
            },
          });

          this.$refs.op.hide();
          return;
        }

        if (
          this.tableName === "transitDocumentTable" ||
          this.tableName == "transitParcelTable"
        ) {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteTransitDays(this.rowData.id);
                this.setRenderKey();
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Data deleted successfully",
                  life: 3000,
                });
              } catch (err) {
                let toastMsg = await errhandler(err);
                this.$toast.add({
                  severity: toastMsg.serverity,
                  summary: toastMsg.summary,
                  detail: toastMsg.msg,
                  life: 3000,
                });
              }
            },
          });

          this.$refs.op.hide();
          return;
        }
      }
    },
  },
};
</script>

<style scoped>
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}
.menuItems {
  cursor: pointer;
}
::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
