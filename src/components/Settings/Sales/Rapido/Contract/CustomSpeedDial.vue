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
      if (this.dataName == "Type1") {
        this.modifyStatusApiCallHandler(
          "typeone",
          "TypeOne",
          status,
          statusMsg
        );
      } else if (this.dataName == "Type2") {
        this.modifyStatusApiCallHandler(
          "typetwo",
          "TypeTwo",
          status,
          statusMsg
        );
      } else {
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/rateCards/status/" +
            this.rowData.id,
          data: status,
          method: "PATCH",
          loadData: {
            loadApi: "loadAdhocTableData",
            loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
            loadMutation: "fetchAdhocTableData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: "The Rate card is disabling/enabling sucessfully",
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling a zone, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      this.$refs.op.hide();
    },
    modifyStatusApiCallHandler(type, Type, status, statusMsg) {
      this.$store.dispatch("rapidoContract/POSTPATCHCRUDOPERATION", {
        path:
          "settings/sales/rates/rapido/contract/ratecard/" +
          type +
          "s/status/" +
          this.rowData.id,
        data: status,
        method: "PATCH",

        loadData: {
          loadApi: "loadrapidoContract" + Type + "Data",
          loadPath: "settings/sales/rates/rapido/contract/ratecard/" + type,
          loadMutation: "fetchRapidoContract" + Type + "Data",
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate card ${this.rowData["rate_card_name"]} is ${statusMsg}`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in disabling/enabling the rate card, try again!",
            toastSeverity: "error",
          },
        },
      });
    },

    modifyStatusApiCallHandlerOne(status) {
      this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
        path:
          "settings/salesSettings/rates/rapido/adhoc/zones/modifyStatus/" +
          this.rowData.id,
        data: status,
        method: "PATCH",

        loadData: {
          loadApi: "loadZonesData",
          loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
          loadMutation: "fetchZonesData",
        },

        toastData: {
          toastSuccessData: {
            toastMsg: `The rate card is updated!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `The rate card already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in updating the rate card, try again!",

            toastSeverity: "error",
          },
        },
      });
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
    menuClicked(choice) {
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.deleteHandler();
          },
        });
      } else if (choice == "Edit") {
        if (this.dataName == "Type1") {
          console.log(this.rowData, "rowdata");
          this.$store.dispatch("rapidoContract/setType1FormStateData", {
            data: this.rowData,
          });
          this.$store.dispatch("rapidoContract/openDialog", {
            dialogDetails: {
              dialogName: "TypeOneNewDialog",
              dialogHeader: "Add New (Type 1)",
            },
          });
        } else if (this.dataName == "Type2") {
          this.$store.dispatch("rapidoContract/setType2FormStateData", {
            data: this.rowData,
          });
          this.$store.dispatch("rapidoContract/openDialog", {
            dialogDetails: {
              dialogName: "TypeTwoNewDialog",
              dialogHeader: "Add New (Type 2)",
            },
          });
        } else if (this.tableName == "rapidoAdhocTable") {
          this.$store.state.rapidoAdhoc.EditedRateCardData = this.rowData;
          console.log(this.rowData);
          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewRate",
              dialogHeader: "Edit Rate Card",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        } else if (this.dataName == "ZoneAdhoc") {
          this.$store.state.rapidoAdhoc.zonesAdhocFormStateData = this.rowData;

          this.$store.dispatch("rapidoAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewdialog",
              dialogHeader: "Edit Zone",
            },
          });
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];

          this.setAsDefaultApiCallHandlerOne();
        }

        this.$store.getters["rapidoContract/controlActivityDialog"];
      } else if (choice == "Set as default" || choice == "Remove default") {
        if (this.dataName == "Type1") {
          this.setAsDefaultApiCallHandler("typeone", "TypeOne");
        } else if (this.tableName == "rapidoAdhocTable") {
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/rapido/adhoc/ratecards/default/" +
              this.rowData.id,
            data: {
              default: !this.rowData.default,
            },
            method: "PATCH",
            loadData: {
              loadApi: "loadAdhocTableData",
              loadPath: "/settings/sales/rates/rapido/adhoc/ratecard",
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
        } else {
          this.setAsDefaultApiCallHandler("typetwo", "TypeTwo");
        }
      } else if (choice == "Clone") {
        if (this.tableName == "rapidoAdhocTable") {
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
          this.$store.getters["rapidoAdhoc/controlActivityDialog"];
        } else {
          let rapidoContractType;
          if (this.dataName == "Type1") {
            rapidoContractType = "Type1";
          } else {
            rapidoContractType = "Type2";
          }
          this.$store.dispatch("rapidoContract/setCloneRateCardData", {
            data: {
              rate_card_name: this.rowData.rate_card_name,
              rate_card_id: this.rowData.id,
              rapido_contract_type: rapidoContractType,
            },
          });

          this.$store.dispatch("rapidoContract/openDialog", {
            dialogDetails: {
              dialogName: "CloneRateCardDialog",
              dialogHeader: "Clone Rate Card",
            },
          });
          this.$store.getters["rapidoContract/controlActivityDialog"];
        }
      }

      this.$refs.op.hide();
    },
    setAsDefaultApiCallHandler(type, Type) {
      this.$store.dispatch("rapidoContract/POSTPATCHCRUDOPERATION", {
        path:
          "settings/sales/rates/rapido/contract/ratecard/" +
          type +
          "s/default/" +
          this.rowData.id,
        data: {
          // default: "true",
          default: !this.rowData.default,
        },
        method: "PATCH",

        loadData: {
          loadApi: "loadrapidoContract" + Type + "Data",
          loadPath: "settings/sales/rates/rapido/contract/ratecard/" + type,
          loadMutation: "fetchRapidoContract" + Type + "Data",
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
    },

    // setAsDefaultApiCallHandlerOne() {
    //   if (this.tableName == "ZoneAdhoc") {
    //     this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
    //       path:
    //         "settings/salesSettings/rates/rapido/adhoc/zone/" + this.rowData.id,
    //       data: this.rowData,
    //       method: "PATCH",
    //       loadData: {
    //         loadApi: "loadZonesData",
    //         loadPath: "/settings/salesSettings/rates/rapido/adhoc/zone",
    //         loadMutation: "fetchZonesData",
    //       },
    //     });
    //   }
    // },
    deleteHandler() {
      if (this.tableName == "rapidoAdhocTable") {
        {
          this.$store.dispatch("rapidoAdhoc/DELETECRUDOPERATION", {
            path:
              "settings/sales/rates/rapido/adhoc/ratecard/" + this.rowData.id,
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
          this.$refs.op.hide();
        }
      }
      if (this.dataName == "Type1") {
        console.log(this.dataName);
        this.deleteApiCallHandler("typeone", "TypeOne");
      }
      if (this.dataName == "Type2") {
        this.deleteApiCallHandler("typetwo", "TypeTwo");
      }
      if (this.dataName == "AdhocRateCard") {
        this.deleteApiCallHandlerone();
      }
      this.$refs.op.hide();
    },

    deleteApiCallHandler(type, Type) {
      this.$store.dispatch("rapidoContract/DELETECRUDOPERATION", {
        path:
          "settings/sales/rates/rapido/contract/ratecard/" +
          type +
          "/" +
          this.rowData.id,
        method: "DELETE",

        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate card ${this.rowData.rate_card_name} is deleted successfully!`,
            toastSeverity: "info",
          },
          toastErrorData: {
            toastMsg:
              "There was an error in deleting the rate card, try again!",
            toastSeverity: "error",
          },
        },
        loadData: {
          loadApi: "loadrapidoContract" + Type + "Data",
          loadPath: "settings/sales/rates/rapido/contract/ratecard/" + type,
          loadMutation: "fetchRapidoContract" + Type + "Data",
        },
      });
    },

    loadState() {
      if (
        Object.keys(this.$store.state.rapidoAdhoc.zonesAdhocFormStateData)
          .length != 0
      ) {
        let incomingData =
          this.$store.state.rapidoAdhoc.zonesAdhocFormStateData;
        incomingData.postal_codes.map((item) => {
          this.setZonesAdhocFormStateDataMutation.push(
            item.postal_code_from + " " + "-" + " " + item.postal_code_to
          );
        });
      }
    },
  },
  created() {
    this.loadState();
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