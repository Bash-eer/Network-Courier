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
      <div class="flex flex-column flex-wrap mb-2">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer mt-2"
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
                bold-600
                font-size-12
                color-4e5868
              "
            >
              {{ items.label }}
            </div>
            <div v-if="items.label == 'Inactive'" class="ml-3">
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
    ...mapActions({
      deleteCustomerLeaveData: "CustomerLaunchStore/deleteCustomerLeaveData",
      deleteCustomerSuspenstionData:
        "CustomerLaunchStore/deleteCustomerSuspenstionData",
      customerLeaveDataList: "CustomerLaunchStore/customerLeaveDataList",
      customerSuspenstionDataList:
        "CustomerLaunchStore/customerSuspenstionDataList",
      updateCustomerLeaveDropDown:
        "CustomerLaunchStore/updateCustomerLeaveDropDown",
      deleteLogisticsSettings: "CrmSettings/deleteLogisticsSettings",
      deleteCouponSettings: "CrmSettings/deleteCouponSettings",
      loadLogisticsSettingsData: "CrmSettings/loadLogisticsSettingsData",
      loadCouponSettingsData: "CrmSettings/loadCouponSettingsData",
      deleteDocumentDetailSettings: "CrmSettings/deleteDocumentDetailSettings",
      deleteDocumentDetailId: "CrmSettings/deleteDocumentDetailId",
      getOnRowSelectData: "CrmSettings/getOnRowSelectData",
      getDocumentDetailSettingsData:
        "CrmSettings/getDocumentDetailSettingsData",
      deleteCountrySettings: "CrmSettings/deleteCountrySettings",
      getCountrySettingsData: "CrmSettings/getCountrySettingsData",
      updateBtnData: "CrmSettings/updateBtnData",
      disableCountrySettings: "CrmSettings/commonDisable",
      expressHistoryDataFetch:
        "customerLaunchBookingHistory/loadExpressCustomerHistoryTableData",
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
        statusMsg = "Deactivated";
      } else if (this.rowData.status == "Inactive") {
        status = {
          status: "Active",
        };
        statusMsg = "Actived";
      }

      if (this.tableName === "crmSettingsCountryTable") {
        try {
          this.$store.state.CrmSettings.tableLoad = true;
          let data = this.rowData;
          data.type = this.dataName;
          data.status = status.status;
          let response = await this.disableCountrySettings(data);
          if (response && response.status === 200) {
            let info = `The Country Setting is ${statusMsg} successfully!`;
            this.commonToast("success", "Success", info);
            this.getCountrySettingsData();
          } else {
            let info =
              response.data.message ||
              "There was an error in activating/deactivating, try again!";
            this.commonToast("error", "Error", info);
          }
          this.$refs.op.hide();
        } catch (err) {
          let toastMsg = await errhandler(err, "error");
          this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
        }
      } else if (this.tableName === "crmSettingsCouponTable") {
        try {
          this.$store.state.CrmSettings.tableLoad = true;
          let data = this.rowData;
          data.type = this.dataName;
          data.status = status.status;

          let response = await this.disableCountrySettings(data);
          if (response && response.status === 200) {
            let info = `The Coupon Setting is ${statusMsg} successfully!`;
            this.commonToast("success", "Success", info);
          } else {
            let info =
              "There was an error in activating/deactivating, try again!";
            this.commonToast("error", "Error", info);
          }
          this.$refs.op.hide();
        } catch (err) {
          let toastMsg = await errhandler(err, "error");
          this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
        }
      }

      this.$refs.op.hide();
    },
    commonToast(severity, summary, message) {
      this.$store.state.CrmSettings.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    menuClicked(choice) {
      if (this.tableName === "CustomerLeavePage") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              let data = this.rowData.id;
              this.deleteCustomerLeaveData(data).then(async (c) => {
                if (c == 200) {
                  let datas = {
                    search: "",
                  };
                  await this.customerLeaveDataList(datas);
                  let info = "Customer Leave deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Customer Leave";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else {
          this.$emit("emitValue");
        }
      }

      if (this.tableName === "CustomerSuspenstionPage") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              let data = this.rowData.id;
              this.deleteCustomerSuspenstionData(data).then(async (c) => {
                if (c == 200) {
                  let data = {
                    search: "",
                  };
                  await this.customerSuspenstionDataList(data);
                  let info = "Customer Suspension deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Customer Suspension";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else {
          this.$emit("emitCustomerSuspenstionValue");
        }
      }

      if (this.tableName === "crmSettingsLogisticsTable") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              let data = this.rowData.id;
              await this.deleteLogisticsSettings(data).then(async (c) => {
                if (c == 200) {
                  await this.loadLogisticsSettingsData();
                  let info = "Deleted Logistics successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Logistics";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else if (choice == "Edit") {
          let data = this.rowData;
          this.$emit("emittedEditFunctLogisticsTable", data);
        }
      }

      if (this.tableName === "crmSettingsDocumentDetailTable") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              let data = this.rowData.id;
              await this.deleteDocumentDetailSettings(data).then(async (c) => {
                if (c == 200) {
                  await this.getDocumentDetailSettingsData();
                  let info = "Document Detail deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Document Detail";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else if (choice == "Edit Profile") {
          let data = this.rowData;
          this.$emit("emittedEditFunctLogisticsTable", data);
        }
      }

      if (this.tableName === "crmSettingsCouponTable") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-fw pi-trash",
            accept: async () => {
              let data = this.rowData.id;
              await this.deleteCouponSettings(data).then(async (c) => {
                if (c == 200) {
                  await this.loadCouponSettingsData();
                  if (c == 200) {
                    await this.getDocumentDetailSettingsData();
                    let info = "Coupon Settings deleted successfully";
                    this.commonToast("success", "Success", info);
                  } else {
                    let info = "Failed in deleting Coupon Settings";
                    this.commonToast("error", "Error", info);
                  }
                }
              });
            },
          });
        } else if (choice == "Edit") {
          let data = this.rowData;
          this.$emit("emittedEditFunctCouponTable", data);
        }
      }

      if (this.tableName === "crmSettingsDocumentDetailId") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              let data = this.rowData.id;
              await this.deleteDocumentDetailId(data).then(async (c) => {
                if (c == 200) {
                  let data = this.onRowSelectInDataTableId;
                  await this.getOnRowSelectData(data);
                  let info = "Document Detail deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Document Detail";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else if (choice == "Edit") {
          this.updateBtnData(true);
          let data = this.rowData;
          this.$emit("emittedEditDocumentTable", data);
        }
      }

      if (this.tableName === "crmSettingsCountryTable") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              let data = this.rowData.id;
              await this.deleteCountrySettings(data).then(async (c) => {
                if (c == 200) {
                  await this.getCountrySettingsData();
                  let info = "Country Settings deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Country Settings";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else if (choice == "Edit") {
          let data = this.rowData;
          this.updateBtnData(true);
          this.$emit("emittedEditFunctCountryTable", data);
        }
      }

      if (this.tableName === "nameTide") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              let data = this.rowData.id;
              this.deleteCustomerSuspenstionData(data).then(async (c) => {
                if (c == 200) {
                  let data = {
                    search: "",
                  };
                  await this.customerSuspenstionDataList(data);
                }
              });
            },
          });
        } else {
          this.$emit("emitCustomerSuspenstionValue");
        }
      }

      if (this.tableName === "fuelChargesTable") {
        if (choice == "Booking History ") {
          let type =
            this.rowData?.data?.business_type == "Contract"
              ? "Contract"
              : "Adhoc";
          this.$router.push({
            name: "CustomerBookingHistory",
            params: {
              type: type,
              id: this.rowData?.data?.id,
            },
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      onRowSelectInDataTableId: "CrmSettings/onRowSelectInDataTableId",
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
