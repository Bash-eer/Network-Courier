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
                v-for="toggle of this.toggletypeData"
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
import { mapActions, mapGetters } from "vuex";
import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName" ,"type"],
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
  computed: {
    ...mapGetters({
    DeliveryTypeSettingStateDatabikeone: "$store.state.TypeSetting.DeliveryTypeSettingStateData",
    DeliveryTypeSettingStateDataVanData: "TypeSetting/DeliveryTypeSettingStateDataVanData",
    DeliveryTypeSettingStateDataRapidoData: "TypeSetting/DeliveryTypeSettingStateDataRapidoData",
    controlActivityDialog:"TypeSetting/controlActivityDialog",
    toggletypeData:"TypeSetting/toggletypeData"
 }), },
  methods: {
    ...mapActions({
      openDialog:"TypeSetting/openDialog",
      DELETECRUDOPERATION:"TypeSetting/DELETECRUDOPERATION",
      POSTPATCHCRUDOPERATION:"TypeSetting/POSTPATCHCRUDOPERATION"
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {
      if (this.dataName == "BikeDeliveryTypeData") {
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
        this.POSTPATCHCRUDOPERATION( {
          path:
            "/operations/rider-allot/bike/deliverytypes/" + this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: "TypeSetting/loadBikedeliveryTypeTableData",
          toastData: {
            toastSuccessData: {
              toastMsg: `Delivery Type Setting is ${statusMsg} sucessfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling the Delivery Type Setting, try again!",
              toastSeverity: "error",
            },
          },
        });
        this.$refs.op.hide();
      } 
      
       else if (this.dataName == "RapidoDeliveryTypeData") {
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
        this.POSTPATCHCRUDOPERATION( {
          path:
            "/operations/rider-allot/rapido/deliverytypes/" + this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: "TypeSetting/loadRapidodeliveryTypeTableData",
          toastData: {
            toastSuccessData: {
              toastMsg: `Delivery Type Setting is ${statusMsg} sucessfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling the Delivery Type Setting, try again!",
              toastSeverity: "error",
            },
          },
        });
        this.$refs.op.hide();
      }
       else if (this.dataName == "VanDeliveryTypeData") {
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
        this.POSTPATCHCRUDOPERATION( {
          path:
            "/operations/rider-allot/van/deliverytypes/" + this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: "TypeSetting/loadVandeliveryTypeTableData",
          toastData: {
            toastSuccessData: {
              toastMsg: `Delivery Type Setting is ${statusMsg} sucessfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling the Delivery Type Setting, try again!",
              toastSeverity: "error",
            },
          },
        });
        this.$refs.op.hide();
      }
    },

    menuClicked(choice) {
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            if (this.dataName == "BikeDeliveryTypeData") {
              this.DELETECRUDOPERATION ({
                path:
                  "/operations/rider-allot/bike/deliverytypes/" + this.rowData.id,
                method: "DELETE",

                toastData: {
                  toastSuccessData: {
                    toastMsg: `Delivery Type Setting is deleted successfully!`,
                    toastSeverity: "info",
                  },
                  toastErrorData: {
                    toastMsg:
                      "There was an error in deleting the Delivery Type Setting, try again!",
                    toastSeverity: "error",
                  },
                },
                loadData: "loadBikedeliveryTypeTableData",
              });
              this.$refs.op.hide();
            } else if (this.dataName == "VanDeliveryTypeData") {
              this.DELETECRUDOPERATION ({
                // id: this.$store.state.operationAllotment.VanAllotmentTableData
                //   .id,

                path: "/operations/rider-allot/van/deliverytypes/" + this.rowData.id,
                method: "DELETE",

                toastData: {
                  toastSuccessData: {
                    toastMsg: `The Profile is deleted successfully!`,
                    toastSeverity: "info",
                  },
                  toastErrorData: {
                    toastMsg:
                      "There was an error in deleting the Delivery Type Setting, try again!",
                    toastSeverity: "error",
                  },
                },
                loadData: "loadVandeliveryTypeTableData",
              });
              this.$refs.op.hide();
            } else if (this.dataName == "RapidoDeliveryTypeData") {
              this.DELETECRUDOPERATION ({
                
                path:
                  "/operations/rider-allot/rapido/deliverytypes/" + this.rowData.id,
                method: "DELETE",

                toastData: {
                  toastSuccessData: {
                    toastMsg: `Delivery Type Setting is deleted successfully!`,
                    toastSeverity: "info",
                  },
                  toastErrorData: {
                    toastMsg:
                      "There was an error in deleting the Delivery Type Setting, try again!",
                    toastSeverity: "error",
                  },
                },
                loadData: "loadRapidodeliveryTypeTableData",
              });
              this.$refs.op.hide();
            }
          },
        });
      } else if (choice == "Edit") {
        if (this.dataName == "BikeDeliveryTypeData") {
          this.$store.state.TypeSetting.DeliveryTypeSettingStateData =
            this.rowData;

          this.openDialog({
            dialogDetails: {
              dialogName: "DeliveryTypeDialog",
              dialogHeader: "Edit Delivery Type Bike",
            },
          });
          this.controlActivityDialog;
        } else if (this.dataName == "VanDeliveryTypeData") {
          this.$store.state.TypeSetting.DeliveryTypeSettingStateDataVan = this.rowData;
          this.openDialog({
            dialogDetails: {
              dialogName: "DeliveryTypeDialog",
              dialogHeader: "Edit Delivery Type Van",
            },
          });
          this.controlActivityDialog;
        } else if (this.dataName == "RapidoDeliveryTypeData") {
          this.$store.state.TypeSetting.DeliveryTypeSettingStateDataRapido  =
            this.rowData;

          this.openDialog({
            dialogDetails: {
              dialogName: "DeliveryTypeDialog",
              dialogHeader: "Edit Delivery Type Rapido",
            },
          });
          this.controlActivityDialog;
        }
      } 
      this.$refs.op.hide();
    },
  },
  watch() {
    this.disableRow();
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
