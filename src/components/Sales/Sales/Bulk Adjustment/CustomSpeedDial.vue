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
                custom-speed-dial-text
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
                  :check="rowData.status == 'Inactive' ? true : false"
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
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {
      let status;
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
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/profile/status/" + this.rowData.id,
        data: status,
        method: "PATCH",
        loadData: "loadProfileExpansionData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is ${statusMsg} sucessfully!`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in disabling/enabling the profile, try again!",
            toastSeverity: "error",
          },
        },
      });
      this.$refs.op.hide();
    },

    menuClicked(choice) {
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.$store.dispatch("salesSales/DELETECRUDOPERATIONONE", {
              id: this.$store.state.bulkAdjustment.ProfileExpansionData.id,
              // path: "salesCompany/delete/" + this.rowData.id,
              path:
                "/sales/contract/bulk-adjustment/followup/" + this.rowData.id,
              method: "DELETE",

              toastData: {
                toastSuccessData: {
                  toastMsg: `The Profile is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the profile, try again!",
                  toastSeverity: "error",
                },
              },
              loadData: "bulkAdjustment/loadProfileExpansionData",
            });
            this.$refs.op.hide();
          },
        });
      } else if (choice == "Edit") {
        if (this.tableName == "FollowupTableExpand") {
          // console.log(choice, "edit");
          //for vehicle details edit operation
          // if (this.dataName == "AddZoneData") {
          this.$store.state.bulkAdjustment.BulkAdjustmentStateData =
            this.rowData;
          console.log(
            this.$store.state.bulkAdjustment.BulkAdjustmentStateData,
            "custom"
          );
          //  openDialog('CompanyCreationDialog', 'salesHome', 'Add New')
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: "FollowUpDialog",
              dialogHeader: "Edit FollowUp",
            },
          });
          this.$store.getters["salesSales/controlActivityDialog"];
          // }
          // else {
          //   companyCreationStateData
          // }
        }

        if (this.tableName == "FollowupTable") {
          console.log(this.rowData, "Row Data");
          this.$store.state.bulkAdjustment.FollowUpStateData = this.rowData;
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: "EditAdjustmentTwo",
              dialogHeader: "Edit Adjustment",
            },
          });
          this.$store.getters["salesCommon/controlActivityDialog"];
        }
      } else if (choice == "Retrieve") {
        this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
          path: "/sales/profile/retrive/" + this.rowData.id,
          // data: status,
          method: "PATCH",
          loadData: "loadSalesTabData",
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is Retrieved sucessfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in Retrieving the profile, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      this.$refs.op.hide();
    },
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
.custom-speed-dial-text {
  font-weight: 600;
  font-size: 12px;
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
