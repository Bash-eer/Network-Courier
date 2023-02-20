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
    // menuClicked(choice) {
    //   console.log(this.dataName,choice)
    // },
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
      this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
        path:
          "settings/salesSettings/rates/rapido/adhoc/zones/modifyStatus/" +
          this.rowData.id,
        data: status,
        method: "PATCH",
        loadData: {
          loadApi: "loadAdhocZonesData",
          loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
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
      this.$refs.op.hide();
    },
    allDeleteApiHandler() {
      if (this.tableName == "additionalSurcharges") {
        this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/ratecard/addtional/surcharges/" +
            this.rowData.id,
          triggered: true,
          method: "DELETE",
          toastData: {
            toastSuccessData: {
              toastMsg: `The data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the data, try again!",
              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
        });
      }
      if (this.tableName == "ZoneAdhoc") {
        this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/salesSettings/rates/rapido/adhoc/zone/" + this.rowData.id,
          method: "DELETE",
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
          loadData: {
            loadApi: "loadAdhocZonesData",
            loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
        });
      }
      if (this.tableName == "RapidoAdhocThirdPage") {
        this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the data, try again!",
              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
        });
        this.$store.state.rapidoAdhoc.renderKey++;
      }
      if (this.tableName == "ThirdPageExpansion") {
        this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/rates/" +
            this.rowData.id,
          method: "DELETE",
          triggered: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the data, try again!",
              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
        });
        this.$store.state.rapidoAdhoc.renderKey++;
      }
      if (this.tableName == "RapidoAdhocRateCard") {
        this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/ratecard/zone/ranges/" +
            this.rowData.id,
          method: "DELETE",
          toastData: {
            toastSuccessData: {
              toastMsg: `The data is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "There was an error in deleting the data, try again!",
              toastSeverity: "error",
            },
          },
          loadData: {
            loadApi: "loadAdhocSecondPageData",
            loadPath:
              "/settings/sales/rates/rapido/adhoc/ratecard/" +
              this.$route.params.id,
            loadMutation: "fetchadhocRatesSecondPageTableData",
          },
        });
      }

      this.$refs.op.hide();
    },
    menuClicked(choice) {
      if (choice == "Clone") {
        if (this.dataName == "AdhocDataTable") {
          this.$store.dispatch("rapidoAdhoc/setAdhocTableRowRateCardName", {
            rate_card_name: this.rowData["rate_card_name"],
          });
          this.$store.dispatch("rapidoAdhoc/setAdhocTableRowRateCardId", {
            rate_card_row_id: this.rowData.id,
          });
          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "CloneRateCard",
              dialogHeader: "Clone Rate Card",
            },
          });
        } else {
          this.$store.dispatch("rapidoAdhoc/setCloneZoneRangeData", {
            rowData: this.rowData,
          });

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "CloneZoneRange",
              dialogHeader: "Clone Zone Range",
            },
          });
        }

        this.$store.getters["rapidoAdhoc/controlActivityDialog"];
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
        if (this.tableName == "RapidoAdhocThirdPage") {
          this.$store.state.rapidoAdhoc.addEcommerceData = this.rowData;
          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "EditEcommerceDialog",
              dialogHeader: "Edit Ecommerce",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }

        if (this.tableName == "ThirdPageExpansion") {
          this.$store.state.rapidoAdhoc.addRapidoAdhocDeliveryTypeRate =
            this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddDeliveryTypeRates",
              dialogHeader: "Edit size",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "additionalSurcharges") {
          this.$store.state.rapidoAdhoc.addAdditionalSurchargeData =
            this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddAdditionalSurcharges",
              dialogHeader: "Edit Additional Surcharges",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "surcharges") {
          this.$store.state.rapidoAdhoc.addSurchargeData = this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddSurcharges",
              dialogHeader: "Edit Surcharges",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "onDemandService") {
          this.$store.state.rapidoAdhoc.addOnDemandServiceData = this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddOnDemandService",
              dialogHeader: "Edit On Demand Service",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "RapidoAdhocRateCard") {
          this.$store.dispatch("rapidoAdhoc/setZoneRangeEditDialogData", {
            data: this.rowData,
          });

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "EditZoneRange",
              dialogHeader: "Edit Zone Range",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
        if (this.tableName == "ZoneAdhoc") {
          this.$store.state.rapidoAdhoc.addZoneFormStateData = this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewZonesdialog",
              dialogHeader: "Edit Zones",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        }
      } else if (choice == "Set as default") {
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/salesSettings/rates/express/contract/rateCards/modifyDefault/" +
            this.rowData.id,
          data: {
            default: "true",
          },
          method: "PATCH",
          loadData: {
            loadApi: "loadAdhocZonesData",
            loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
            loadMutation: "fetchZonesData",
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
  },
  components: {
    Button,

    OverlayPanel,
  },
};
</script>

<style scoped>
.custom-speed-dial-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
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
