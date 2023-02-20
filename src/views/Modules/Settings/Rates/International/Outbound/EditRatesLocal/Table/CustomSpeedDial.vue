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
      setEditData: "Outbound/Edit/setEditData",
      toggleDialog: "Outbound/Edit/toggleDialog",
      setRenderKey: "Outbound/Edit/setRenderKey",
      setExpandedDialog: "Outbound/Edit/setExpandedDialog",

      // bike/rate
      deleteRate: "Outbound/Edit/deleteRate",
      deleteTrips: "Outbound/Edit/deleteTrips",

      // ecommerce
      deleteChargeByQtyMultiTier: "Outbound/Edit/deleteChargeByQtyMultiTier",
      deleteJobcountMultiTier: "Outbound/Edit/deleteJobcountMultiTier",

      // add_surcharge
      deletetAddSurcharge: "Outbound/Edit/deletetAddSurcharge",

      deleteDelieryType: "Outbound/Edit/deleteDelieryType",

      deleteBikeDtRates: "Outbound/Edit/deleteBikeDtRates",
      deleteEcommerceBoxCount: "Outbound/Edit/deleteEcommerceBoxCount",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async menuClicked(label) {
      console.log(this.tableName, "table-name");
      if (this.tableName === "bikeRatesTable") {
        if (label == "Edit") {
          this.setEditData({ type: "normal_bike_rates", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_bike_rates",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRate(this.rowData.id);
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

      if (this.tableName === "vanRatesTable") {
        if (label == "Edit") {
          this.setEditData({ type: "normal_van_rates", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_rates",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRate(this.rowData.id);
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

      if (this.tableName === "bikeRatesTripTable") {
        if (label == "Edit") {
          this.setEditData({ type: "normal_bike_trips", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_bike_trips",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteTrips(this.rowData.id);
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

      if (this.tableName === "vanRatesTripTable") {
        if (label == "Edit") {
          this.setEditData({ type: "normal_van_trips", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_trips",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteTrips(this.rowData.id);
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

      if (this.tableName === "bikeRatesJobTable") {
        if (label == "Edit") {
          this.setEditData({ type: "normal_bike_jobs", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_bike_jobs",
            data: true,
          });
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName === "localSurcharge") {
        if (label == "Edit") {
          this.setEditData({ type: "surcharges", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
            type: "surcharges",
            data: true,
          });
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName === "localAddSurcharge") {
        if (label == "Edit") {
          this.setEditData({ type: "add_surcharges", data: this.rowData });
          this.toggleDialog({
            edit: "local_edit",
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
                await this.deletetAddSurcharge(this.rowData.id);
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

      if (this.tableName === "normalVanTwotierQuantity") {
        if (label == "Edit") {
          this.setEditData({
            type: "normal_van_twotier_q",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_twotier_q",
            data: true,
          });
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName === "normalVanTwotierWeight") {
        if (label == "Edit") {
          this.setEditData({
            type: "normal_van_twotier_w",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_twotier_w",
            data: true,
          });
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName === "normalVanMultitierQuantity") {
        if (label == "Edit") {
          this.setEditData({
            type: "normal_van_multi_q",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_multi_q",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteChargeByQtyMultiTier(this.rowData.id);
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

      if (this.tableName === "normalVanMultitierJob") {
        if (label == "Edit") {
          this.setEditData({
            type: "normal_van_multi_j",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_multi_j",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteJobcountMultiTier(this.rowData.id);
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

      if (this.tableName === "normalVanMultitierCharge") {
        if (label == "Edit") {
          this.setEditData({
            type: "normal_van_box",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "normal_van_box",
            data: true,
          });
        }
        this.$refs.op.hide();
        return;
      }

      if (this.tableName === "ecommerceVanSd") {
        if (label == "Edit") {
          this.setEditData({
            type: "e_delivery_type_v",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "e_delivery_type_v",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteDelieryType(this.rowData.id);
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

      if (this.tableName === "ecommerceBikeSd") {
        if (label == "Edit") {
          this.setEditData({
            type: "e_delivery_type_b",
            data: this.rowData,
          });
          this.toggleDialog({
            edit: "local_edit",
            type: "e_delivery_type_b",
            data: true,
          });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteDelieryType(this.rowData.id);
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

      if (this.tableName === "rates") {
        if (label == "Edit") {
          this.setEditData({
            type: "expanded",
            data: this.rowData,
          });
          this.setExpandedDialog(true);
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteBikeDtRates(this.rowData.id);
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

      if (this.tableName === "boxCountTable") {
        if (label == "Edit") {
          this.setEditData({
            type: "expanded",
            data: this.rowData,
          });
          this.setExpandedDialog({ field: "box_count", data: true });
        } else if (label == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteEcommerceBoxCount(this.rowData.id);
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
        this.tableName === "bikeCustomerVan" ||
        this.tableName == "chargeByWeight" ||
        this.tableName === "vanCustomerBikeJob" ||
        this.tableName === "chargeByQty"
      ) {
        if (label == "Edit") {
          this.setEditData({
            type: "expanded",
            data: this.rowData,
          });
          this.setExpandedDialog(true);
        }
        this.$refs.op.hide();
        return;
      }
    },
  },
  created() {
    this.isDisabled = this.rowData?.status == "Inactive" ? true : false;
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
