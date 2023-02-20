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
              v-if="
                items.label == 'Disable' ||
                items.label === 'Active' ||
                items.label == 'Private'
              "
              class="
                flex
                align-items-center
                justify-content-center
                ml-5
                hover-blue
              "
            >
              <div
                v-for="toggle of $store.state['internationalInbound']
                  .toggleData"
                :key="toggle.type"
              >
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
  </div>
</template>
<script>
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import { mapActions } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "apiKey",
  ],
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
      disableData: "InternationalCountries/disableData",
      deleteData: "InternationalCountries/deleteData",
      setEditCountryData: "InternationalCountries/setEditCountryData",
      setEditDialog: "InternationalCountries/setEditDialog",

      // Outbound module
      updateRateCardStatus: "Outbound/updateRateCardStatus",
      setRefreshKey: "Outbound/setRefreshKey",
      changeActiveStatus: "Outbound/changeActiveStatus",
      setDisplayCloneDialog: "Outbound/setDisplayCloneDialog",
      setRateCardDefault: "Outbound/setRateCardDefault",
      setCloneData: "Outbound/setCloneData",
      deleteRateCard: "Outbound/deleteRateCard",

      updateRefreshKey: "InternationalCountries/updateRefreshKey",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async disableRow(value) {
      if (this.tableName == "outBoundExpandedTable") {
        let status = !value ? "Public" : "Private";
        try {
          await this.updateRateCardStatus({
            id: this.rowData.id,
            data: { private: value },
          });
          this.setRefreshKey();
          this.isDisabled = value;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Rate card status changed to " + status,
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
        return;
      }

      if (this.tableName == "outBoundTable") {
        let status = !value ? "Inactive" : "Active";
        try {
          await this.changeActiveStatus({
            id: this.rowData.id,
            data: { status: status },
          });
          this.setRefreshKey();
          this.isDisabled = value;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Rate card status changed to " + status,
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
        return;
      }

      if (this.tableName == "countriesTable") {
        let status = value ? "Inactive" : "Active";

        try {
          await this.disableData({ id: this.rowData.id, data: { status } });
          this.isDisabled = value;
          this.updateRefreshKey();
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Country status changed to " + status,
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
        return;
      }

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
      this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
        path:
          "settings/sales/rates/international/inbound/" +
          this.getPath()[3] +
          "/modifyStatus/" +
          this.rowData.id,
        method: "PATCH",
        data: status,
        toastData: {
          toastSuccessData: {
            toastMsg: `The data is ${statusMsg}`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in disabling/enabling the data, try again!",
            toastSeverity: "error",
          },
        },
        loadData: {
          loadApi: "loadInboundTableData",
          loadPath:
            "/settings/sales/rates/international/inbound/" + this.tableName,
          loadMutation: "fetchInboundTableData",
          type: this.getPath()[0],
        },
      });
    },
    getPath() {
      switch (this.tableName) {
        case "surcharges":
          return [
            "addSurchargesData",
            "fetchInboundTableData",
            "loadInboundTableData",
            "surcharge",
          ];
        case "questionnaires":
          return [
            "addQuestionnaireData",
            "fetchInboundTableData",
            "loadInboundTableData",
            "questionnaire",
          ];
        case "currencyExchanges":
          return [
            "addCurrencyExchangeData",
            "fetchInboundTableData",
            "loadInboundTableData",
            "currencyExchange",
          ];
      }
    },
    getPermitFetchPath() {
      switch (this.tableName) {
        case "GSTType":
          return "fetchGstChargesData";
        case "AdditionalCharges":
          return "fetchAdditionalChargesData";
        case "StorageCharges":
          return "fetchStorageChargesData";
        case "OtherCharges":
          return "fetchOthersChargesData";
      }
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
    async menuClicked(choice) {
      if (this.tableName == "outBoundTable") {
        if (choice == "Fuel Charges") {
          this.$router.push({
            name: "FuelCharges",
            params: { id: this.rowData.id },
            query: { a: this.rowData?.agent_name },
          });
        } else if (choice == "Transit Days") {
          this.$router.push({
            name: "TransitDays",
            params: { id: this.rowData.id },
          });
        }
      }

      if (this.tableName == "outBoundExpandedTable") {
        if (choice == "Clone") {
          this.setDisplayCloneDialog(true);
          this.setCloneData({
            agent_name: this.rowData.agent_name,
            id: this.rowData.id,
            rate_card_name: this.rowData.rate_card_name,
          });
        } else if (choice == "Set as default") {
          try {
            await this.setRateCardDefault({
              id: this.rowData.id,
              data: { default: true },
            });
            this.setRefreshKey();
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Rate card set to default",
              life: 3000,
            });
          } catch (err) {
            if (
              err.response &&
              err.response.data &&
              err.response.data.message
            ) {
              await this.$toast.add({
                severity: "error",
                summary: "Error",
                detail: err.response.data.message,
                life: 3000,
              });
            } else {
              let toastMsg = await errhandler(err);
              this.$toast.add({
                severity: toastMsg.serverity,
                summary: toastMsg.summary,
                detail: toastMsg.msg,
                life: 3000,
              });
            }
          }
        } else if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteRateCard(this.rowData.id);
                this.setRefreshKey();
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Rate card deleted successfully",
                  life: 3000,
                });
              } catch (err) {
                if (
                  err.response &&
                  err.response.data &&
                  err.response.data.message
                ) {
                  await this.$toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: err.response.data.message,
                    life: 3000,
                  });
                } else {
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
          });
        } else if (choice == "Edit") {
          if (
            this.rowData.shipping_type.toLowerCase() === "import" ||
            this.rowData.shipping_type.toLowerCase() === "export"
          ) {
            this.$router.push({
              name: "outboundEditZones",
              params: { id: this.rowData.id },
            });
          } else if (this.rowData.shipping_type.toLowerCase() === "local") {
            this.$router.push({
              name: "outboundLocalEditNormal",
              params: { id: this.rowData.id },
            });
          }
        }
        this.$refs.op.hide();
        return;
      }

      if (choice == "Delete") {
        if (this.tableName == "countriesTable") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              try {
                await this.deleteData(this.rowData.id);
                this.updateRefreshKey();
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Country data deleted successfully",
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

          return;
        }
        if (
          this.apiKey == "gstTypes" ||
          this.apiKey == "additionalCharges" ||
          this.apiKey == "storageCharges" ||
          this.apiKey == "otherCharges"
        ) {
          this.$store.dispatch("internationalInbound/DELETECRUDOPERATION", {
            path:
              "settings/salesSettinigs/rates/international/inbound/permitCharges/" +
              this.apiKey +
              "/" +
              this.rowData.id,
            method: "DELETE",
            toastData: {
              toastSuccessData: {
                toastMsg: `The data is deleted successfully!`,
                toastSeverity: "info",
              },
              toastErrorData: {
                toastMsg: "There was an error in deleting the zone, try again!",
                toastSeverity: "error",
              },
            },
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/" +
                this.apiKey,
              type: this.getPermitFetchPath(),
            },
          });
        } else if (this.tableName == "Others") {
          {
            this.$store.dispatch("internationalInbound/DELETECRUDOPERATION", {
              path:
                "settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes/" +
                this.rowData.id,
              method: "DELETE",
              toastData: {
                toastSuccessData: {
                  toastMsg: `The data is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the data, try again!",
                  toastSeverity: "error",
                },
              },
              loadData: {
                loadApi: "loadaddOthersData",
                loadPath:
                  "settings/salesSettinigs/rates/international/inbound/clearanceMode/otherModes",
                loadMutation: "fetchOthersTableData",
                type: "",
              },
            });
            this.$refs.op.hide();
          }
        } else if (this.tableName == "ClearanceModeTabOverlay") {
          {
            this.$store.dispatch("internationalInbound/DELETECRUDOPERATION", {
              path:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes/" +
                this.rowData.id,
              method: "DELETE",
              toastData: {
                toastSuccessData: {
                  toastMsg: `The data is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the data, try again!",
                  toastSeverity: "error",
                },
              },
              loadData: {
                loadApi: "loadClearanceModeTabs",
                loadPath:
                  "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
                loadMutation: "fetchClearanceModeData",
                type: "addClearanceModeData",
              },
            });
            this.$refs.op.hide();
          }
        } else if (this.tableName == "ClearanceAndAdditionalEdit") {
          {
            this.$store.dispatch("internationalInbound/DELETECRUDOPERATION", {
              path:
                "/settings/salesSettinigs/rates/international/inbound/clearanceMode/mode/advance/rates/" +
                this.rowData.id,
              method: "DELETE",
              toastData: {
                toastSuccessData: {
                  toastMsg: `The data is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the data, try again!",
                  toastSeverity: "error",
                },
              },
              loadData: {
                loadApi: "loadClearanceModeTabs",
                loadPath:
                  "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
                loadMutation: "fetchClearanceModeData",
                type: "",
              },
            });
            this.$refs.op.hide();
          }
        } else {
          this.$store.dispatch("internationalInbound/DELETECRUDOPERATION", {
            path:
              "settings/sales/rates/international/inbound/" +
              this.tableName +
              "/" +
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
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/" + this.tableName,
              loadMutation: "fetchInboundTableData",
              type: this.getPath()[0],
            },
          });
          this.$refs.op.hide();
        }
      } else if (choice == "Edit") {
        //for vehicle details edit operation
        if (this.tableName == "surcharges") {
          this.$store.state.internationalInbound.surchargeFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AddNewSurchargeDialog",
              dialogHeader: "Edit Surcharge",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "questionnaires") {
          this.$store.state.internationalInbound.questionnaireFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AddNewQuestionnaireDialog",
              dialogHeader: "Edit Questionnaire",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "GSTType") {
          this.$store.state.internationalInbound.gstTypeFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "GstTypeDialog",
              dialogHeader: "Edit GST Type",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "AdditionalCharges") {
          this.$store.state.internationalInbound.additionalChargesFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AdditionalChargesDialog",
              dialogHeader: "Edit Additional Charges",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "StorageCharges") {
          this.$store.state.internationalInbound.storageChargesFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "StorageChargesDialog",
              dialogHeader: "Edit Storage Charges",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "OtherCharges") {
          this.$store.state.internationalInbound.otherChargesFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "OtherChargesDialog",
              dialogHeader: "Edit Others Charges",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "currencyExchanges") {
          this.$store.state.internationalInbound.currencyExchangeFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AddCurrencyExchangeDialog",
              dialogHeader: "Edit Currency Exchange",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        } else if (this.tableName == "outBoundExpandedTable") {
          console.log("hit");
          this.$router.push("/settings/sales-settings/rates/outbound/14/zone");
          return;
        } else if (this.tableName === "countriesTable") {
          this.setEditCountryData(this.rowData);
          this.setEditDialog(true);
          return;
        }
        if (this.tableName == "Others") {
          this.$store.state.internationalInbound.othersFormStateData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AddOthersModeDialog",
              dialogHeader: "Edit Additional & clearance Edit  Mode",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        }
        if (this.tableName == "ClearanceAndAdditionalEdit") {
          this.$store.state.internationalInbound.clearanceAndAdditional =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "ClearanceAndAdditionalEdit",
              dialogHeader: "Edit Clearance Mode",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        }
        if (this.tableName == "ClearanceEdit") {
          this.$store.state.internationalInbound.clearanceEdit = this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "ClearanceEdit",
              dialogHeader: "Edit Clearance Mode",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        }
        if (this.tableName == "ClearanceModeTabOverlay") {
          this.$store.state.internationalInbound.clearanceModeData =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "EditClearanceModeDialog",
              dialogHeader: "Edit Clearance Mode",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        }
        if (this.tableName == "AdditionalRateEdit") {
          this.$store.state.internationalInbound.AdditionalRateEdit =
            this.rowData;
          this.$store.dispatch("internationalInbound/openDialog", {
            dialogDetails: {
              dialogName: "AdditionalRateEdit",
              dialogHeader: "Edit Additional Rate",
            },
          });
          this.$store.getters["internationalInbound/controlActivityDialog"];
        }
      }
    },
  },
  created() {
    if (this.tableName == "outBoundExpandedTable") {
      this.isDisabled = this.rowData.private;
      return;
    }

    if (this.tableName == "outBoundTable") {
      this.isDisabled = this.rowData.status != "Inactive" ? true : false;
      return;
    }
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
