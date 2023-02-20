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
              v-if="
                items.label == 'Disable' ||
                items.label == 'Inactive' ||
                items.label == 'Private'
              "
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
        statusMsg = "Inactivated";
      } else if (this.rowData.status == "Inactive") {
        status = {
          status: "Active",
        };
        statusMsg = "Activated";
      }
      if (this.dataName == "AddZoneData") {
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/salesSettings/rates/express/adhoc/zones/modifyStatus/" +
            this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: {
            loadApi: "loadZonesData",
            loadPath: "settings/salesSettings/rates/express/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The Zone ${this.rowData["zone_name"]} is ${statusMsg}`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling a zone, try again!",
              toastSeverity: "error",
            },
          },
        });
      } else {
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "/settings/sales/rates/express/adhoc/ratecards/status/" +
            this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/express/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The Rate card is ${statusMsg}`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling the rate card, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      this.$refs.op.hide();
    },

    menuClicked(choice) {
      if (choice == "Clone") {
        if (this.dataName == "AdhocData") {
          this.$store.dispatch("expressAdhoc/setAdhocTableRowRateCardName", {
            rate_card_name: this.rowData["rate_card_name"],
          });
          this.$store.dispatch("expressAdhoc/setAdhocTableRowRateCardId", {
            rate_card_row_id: this.rowData.id,
          });
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "CloneRateCard",
              dialogHeader: "Clone Rate Card",
            },
          });
        } else {
          this.$store.dispatch("expressAdhoc/setCloneZoneRangeData", {
            rowData: this.rowData,
          });

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "CloneZoneRange",
              dialogHeader: "Clone Zone Range",
            },
          });
        }

        this.$store.getters["expressAdhoc/controlActivityDialog"];
      }
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.allDeleteApiHandler();
          },
        });
      } else if (choice == "Edit") {
        if (this.tableName == "AdhocThirdPageSubTable") {
          this.$store.state.expressAdhoc.editEcommerceVanExpansionData =
            this.rowData;
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewDeliveryRates",
              dialogHeader: "Edit Delivery Rates",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "NormalBike") {
          this.$store.state.expressAdhoc.editNormalBikeData = this.rowData;
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewOne",
              dialogHeader: "Edit Normal Bike",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "NormalVan") {
          this.$store.state.expressAdhoc.editNormalVanData = this.rowData;
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewNormalBike",
              dialogHeader: "Edit Normal Van",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "EcomBike") {
          this.$store.state.expressAdhoc.editEcommerceBikeData = this.rowData;
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddEcommerceBike",
              dialogHeader: "Edit Ecommerce Bike",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "ExpressAdhocBikeVanDynamicTabTable") {
          this.$store.state.expressAdhoc.editEcommerceVanData = this.rowData;
          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddEcommerceVan",
              dialogHeader: "Edit Ecommerce Van",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "Surcharges") {
          this.$store.state.expressAdhoc.addSurchargeData = this.rowData;

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddSurcharges",
              dialogHeader: "Edit Surcharges",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "AdditionalSurcharges") {
          this.$store.state.expressAdhoc.addAdditionalSurchargeData =
            this.rowData;

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddAdditionalSurcharges",
              dialogHeader: "Edit Additional Surcharges",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        //for vehicle details edit operation
        if (this.dataName == "AddZoneData") {
          this.$store.state.expressAdhoc.addZoneFormStateData = this.rowData;

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewZone",
              dialogHeader: "Edit Zone",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "AdhocRateCard") {
          this.$store.dispatch("expressAdhoc/setZoneRangeEditDialogData", {
            data: this.rowData,
          });

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "EditZoneRangeDialog",
              dialogHeader: "Edit Zone Range",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
      } else if (choice == "Set as default" || choice == "Remove default") {
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecards/default/" +
            this.rowData.id,
          data: {
            // default: "true",
            default: !this.rowData.default,
          },
          method: "PATCH",

          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/express/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The Rate card ${this.rowData["rate_card_name"]} is set as default`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in updating the data, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
    },
    allDeleteApiHandler() {
      if (this.tableName == "EcomBike") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/ecommerce/bike/delivery/type/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Ecommerce Bike data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the E-commerce bike data, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      if (this.tableName == "AdhocSubTable") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/ecommerce/bike/delivery/type/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Ecommerce Bike data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the E-commerce bike data, try again!",
              toastSeverity: "error",
            },
          },
        });
      }

      if (this.tableName == "AdhocThirdPageSubTable") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type/rates/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Zone ${this.rowData.zone_name} is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the zone, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      if (this.tableName == "ExpressAdhocBikeVanDynamicTabTable") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,

          toastData: {
            toastSuccessData: {
              toastMsg: `The Zone ${this.rowData.id} is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the zone, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      if (this.dataName == "AddZoneData") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            //  "settings/sales/rates/express/adhoc/ratecard/" + this.rowData.id,
            "settings/salesSettings/rates/express/adhoc/zone/" +
            this.rowData.id,
          method: "DELETE",

          toastData: {
            toastSuccessData: {
              toastMsg: `The Rate card is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the Rate card, try again!",
              toastSeverity: "error",
            },
          },
          // loadData: {
          //   loadApi: "loadAdhocTableData",
          //   loadPath: "/settings/sales/rates/express/adhoc/ratecard",
          //   loadMutation: "fetchAdhocTableData",
          // },
          loadData: {
            loadApi: "loadZonesData",
            loadPath: "settings/salesSettings/rates/express/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
        });
      }
      if (this.dataName == "AdhocRateCard") {
        let rateCardId = this.$route.params.id;
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/zones/" +
            this.rowData.id,
          method: "DELETE",

          toastData: {
            toastSuccessData: {
              toastMsg: `The Zone Range is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the Zone Range, try again!",
              toastSeverity: "error",
            },
          },

          loadData: {
            loadApi: "loadAdhocSecondPageData",
            loadPath:
              "/settings/sales/rates/express/adhoc/ratecard/" + rateCardId,
            loadMutation: "fetchadhocRatesSecondPageTableData",
          },
        });
      }
      if (this.tableName == "AdditionalSurcharges") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/additional/surcharges/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Additional surcharges is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the data, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      if (this.tableName == "AdhocTable") {
        this.$store.dispatch("expressAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/" + this.rowData.id,
          method: "DELETE",

          toastData: {
            toastSuccessData: {
              toastMsg: `The Rate card is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the Rate card, try again!",
              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/express/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
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
