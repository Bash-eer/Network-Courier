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
              <div :key="toggle.type">
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="isDisabled ? true : false"
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
      isDisabled: false,
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
      setEditData: "Outbound/Edit/setEditData",
      toggleDialog: "Outbound/Edit/toggleDialog",
      setRenderKey: "Outbound/Edit/setRenderKey",

      // zone
      deletZoneCard: "Outbound/Edit/deletZoneCard",
      disableZonecard: "Outbound/Edit/disableZonecard",

      // weight
      deleteWeight: "Outbound/Edit/deleteWeight",

      // surcharges
      // emergency charges
      deleteEmergencyCharges: "Outbound/Edit/deleteEmergencyCharges",

      // restricted charges
      deleteRestrictedcharges: "Outbound/Edit/deleteRestrictedcharges",

      // overweight charges
      deleteOverweightCharge: "Outbound/Edit/deleteOverweightCharge",

      // remote area charges
      deleteRemoteareaCharges: "Outbound/Edit/deleteRemoteareaCharges",

      // add surcharge
      deleteAddsurcharge: "Outbound/Edit/deleteAddsurcharge",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async disableRow(value) {
      let status = value ? "Active" : "Inactive";
      this.isDisabled = value;

      if (this.tableName == "zonesTable") {
        try {
          await this.disableZonecard({
            id: this.rowData.id,
            data: { private: value },
          });
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Zone card status changed to " + status,
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
      }
    },
    async menuClicked(label) {
      console.log(this.tableName, "table-name");
      if (this.tableName === "transitDocumentTable") {
        if (label == "Edit") {
          this.setTransitDaysDialog({
            type: "displayDocumentDialog",
            data: true,
          });
          this.$refs.op.hide();
        }
        return;
      }

      if (this.tableName == "transitParcelTable") {
        if (label == "Edit") {
          this.setTransitDaysDialog({
            type: "displayParcelDialog",
            data: true,
          });
          this.$refs.op.hide();
        }
        return;
      }

      if (this.tableName == "zonesTable") {
        if (label == "Edit") {
          this.setEditData({ type: "zone", data: this.rowData });
          this.toggleDialog({
            edit: "imp_edit",
            type: "zone",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deletZoneCard(this.rowData.id);
                this.setRenderKey();
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Zone card deleted successfully",
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
        }
        this.$refs.op.hide();
        return;
      }

      // weights
      if (
        this.tableName == "weightDocumentNormalTable" ||
        this.tableName == "weightDocumentParcelNormalTable" ||
        this.tableName == "weightParcelNormalTable"
      ) {
        if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                console.log(this.rowData);
                let rateArr = [];

                Object.keys(this.rowData).map((list) => {
                  if (list.startsWith("id")) {
                    let rateId = list.split("_");
                    if (rateId[1]) {
                      rateArr.push({ id: rateId[1] });
                    }
                  }
                });

                await this.deleteWeight({
                  type: "normal",
                  data: { rates: rateArr },
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      if (
        this.tableName == "weightDocumentMultiTable" ||
        this.tableName == "weightDocumentParcelMultiTable" ||
        this.tableName == "weightParcelMultiTable"
      ) {
        if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                console.log(this.rowData);
                let rateArr = [];

                Object.keys(this.rowData).map((list) => {
                  if (list.startsWith("id")) {
                    let rateId = list.split("_");
                    if (rateId[1]) {
                      rateArr.push({ id: rateId[1] });
                    }
                  }
                });

                await this.deleteWeight({
                  type: "multiplier",
                  data: { rates: rateArr },
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      // // surcharges
      if (this.tableName == "surchargesNormalTable") {
        if (label == "Edit") {
          this.setEditData({ type: "emergency_n", data: this.rowData });
          this.toggleDialog({
            edit: "imp_edit",
            type: "emergency_n",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteEmergencyCharges({
                  type: "normal",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName == "emergencyMultiplierTable") {
        if (label == "Edit") {
          this.setEditData({ type: "emergency_m", data: this.rowData });
          this.toggleDialog({
            edit: "imp_edit",
            type: "emergency_m",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteEmergencyCharges({
                  type: "multiplier",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      // Restricted country charges

      if (this.tableName == "restrictedNormalTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "restricted_charges_n",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "restricted_charges_n",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRestrictedcharges({
                  type: "normal",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName == "restrictedMultiplierTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "restricted_charges_m",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "restricted_charges_m",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRestrictedcharges({
                  type: "multiplier",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName == "restrictedBaseTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "restricted_charges_bsm",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "restricted_charges_bsm",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRestrictedcharges({
                  type: "base",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      // overweight charge
      if (this.tableName == "overWeightCharge") {
        if (label == "Edit") {
          this.setEditData({
            type: "overweight_charges",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "overweight_charges",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteOverweightCharge({
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      // Remote charges
      if (this.tableName == "remoteChargeNormalTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "remote_area_charges_n",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "remote_area_charges_n",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRemoteareaCharges({
                  type: "normal",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName == "remoteChargeMultiplierTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "remote_area_charges_m",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "remote_area_charges_m",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRemoteareaCharges({
                  type: "multiplier",
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }

      // add surcharge
      if (this.tableName == "addSurcharge") {
        if (label == "Edit") {
          this.setEditData({
            type: "add_surcharges",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "imp_edit",
            type: "add_surcharges",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteAddsurcharge({
                  id: this.rowData.id,
                });
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
        }
        this.$refs.op.hide();
        return;
      }
    },
  },
  created() {
    this.isDisabled = this.rowData.status == "Inactive" ? true : false;
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
