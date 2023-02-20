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
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesExpressContractVan'].dialogComponent"
  />
</template>
<script>
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";
import {
  expressContract,
  expressContractState,
  salesCommon,
  adhoc_pro_fun,
} from "../../../store/helper";
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
  computed: {
    ...expressContractState,
    ...mapGetters({
      selectedTab: "salesSales/selectedTab",
    }),
  },
  methods: {
    ...expressContract,
    ...salesCommon,
    ...adhoc_pro_fun,
    ...mapActions({
      setQuotationData: "salesRapidoContract/Contract/setQuotationData",
      setInterNationalAgentData: "salesInternationalAgent/setQuotationData",
      setQuotationDataBikePlusProject:
        "salesExpressContractBikeProjectJobs/setQuotationData",
      setQuotationDataBikeFSR: "salesExpressContractBikeFSR/setQuotationData",
      loadExpressContractBikeEditData:
        "salesExpressBike/loadExpressContractBikeEditData",
      loadOverviewVanData: "salesExpressContractVan/loadOverviewData",
      loadExpressAdhocRowData: "salesExpressAdhoc/loadExpressAdhocRowData",
      loadExpressContractFSRRowData:
        "salesExpressContractFSR/loadExpressContractFSRRowData",
    }),
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
      if (this.dataName == "QuotationTabData") {
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path: "/sales/quotation/" + "183",
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
    async menuClicked(choice) {
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
      } else if (this.tableName == "AdhocProfileTabTable") {
        if (choice == "Edit") {
          this.clearAdhocProfile();
          await this.getAdhocProfile({ id: this.rowData.id });
          this.openCommonDialog({
            dialogDetails: {
              dialogName: "CreateProfile",
              dialogHeader: "Edit Adhoc Profile",
            },
          });
        } else {
          this.$confirm.require({
            message: "Are you sure you want to Delete the Profile?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              await this.profileAction({
                id: this.rowData.id,
                method: "DELETE",
                toast: this.$toast,
              });
              this.loadTableData({ id: this.$route.params.id });
            },
          });
        }
      } 
      // else if (choice == "Edit Promote To Contract") {
      //   await this.quotationOverviewData({
      //         id: this.rowData.id
      //       })
      //   this.openCommonDialog({
      //        dialogDetails: {
      //     dialogName: "PromoteToContract",
      //     dialogHeader: "Promote To Contract",
      //   },
      //     });
        
      // }
      else if (choice == "Edit") {
        if (
          this.rowData.customer_type == "Rapido" &&
          this.rowData.business_type == "Contract"
        ) {
          await this.setQuotationData({
            type: this.selectedTab,
            id: this.rowData.id,
          });
          this.$store.dispatch("salesSales/openDialog", {
            dialogDetails: {
              dialogName: "RapidoContractQuotationDialog",
              dialogHeader: "Edit",
            },
          });
          this.$store.getters["salesSales/controlActivityDialog"];
          return;
        }
        if (
          this.rowData.customer_type == "International" &&
          this.rowData.business_type == "Contract"
        ) {
          let processedType;
          if (this.selectedTab == "quotation") {
            processedType = "quotations";
          }
          if (this.selectedTab == "contract") {
            processedType = "contract";
          }
          await this.$store.dispatch("salesInternationalContract/loadRowData", {
            path: "/sales/" + processedType + "/overview/" + this.rowData.id,
          });

          if (
            this.$store.state.salesInternationalContract.InternationalRowData
              ?.id
          ) {
            this.$store.getters["salesSales/controlActivityDialog"];
          }
        }

        this.$store.state.salesSales.OverViewRowId = this.rowData.id;
        if (
          this.dataName == "QuotationTabData" ||
          this.dataName == "QuotationsTableData"
        ) {
          if (
            this.rowData.customer_type == "International" &&
            this.rowData.business_type == "Adhoc"
          ) {
            this.$store.state.salesRapidoAdhoc.InternationalAdhocEditData =
              this.rowData;
            this.$store.dispatch("salesInternationalAdhoc/loadRowData", {
              path: "/sales/quotations/overview/" + this.rowData.id,
            });
          } else if (
            this.rowData.customer_type == "Rapido" &&
            this.rowData.business_type == "Adhoc"
          ) {
            this.$store.state.salesRapidoAdhoc.RapidoAdhocEditData =
              this.rowData;
            await this.$store.dispatch("salesRapidoAdhoc/loadRowData", {
              path: "/sales/quotations/overview/" + this.rowData.id,
            });

            if (this.$store.state.salesRapidoAdhoc?.RapidoRowData?.id) {
              this.$store.getters["salesSales/controlActivityDialog"];
            }
          } else if (
            this.rowData.customer_type == "International" &&
            this.rowData.business_type == "Agent"
          ) {
            this.$store.state.salesInternationalAgent.updateType = "quotation";
            await this.setInterNationalAgentData({
              id: this.rowData.id,
              type: "quotations",
            });
            this.$store.dispatch("salesSales/openDialog", {
              dialogDetails: {
                dialogName: "InternationalAgentQuotationDialog",
                dialogHeader: "Edit International Agent",
                dialogHeaderId: this.rowData.quotation_id,
              },
            });
            this.$store.getters["salesSales/controlActivityDialog"];
          } else if (
            this.rowData.customer_type == "Express" &&
            this.rowData.business_type == "Contract"
          ) {
            this.$store.state.salesExpressContract.updateType = "quotation";
            await this.loadOverviewData({
              id: this.rowData.id,
              type: "quotations",
            });
            let overView = this.overViewData?.express_contract[0];
            let stepData = [
              {
                index: 0,
                label: "1",
                component: "SalesExpressContractFirstStep",
                name: "Add Address",
              },
              {
                index: 1,
                label: "2",
                component: "SalesExpressContractSecondStep",
                name: "Select Method",
              },
            ];
            if (overView.fsr && !overView.bike && !overView.van) {
              stepData.push(this.dynamicStep[3]);
            } else {
              stepData.push(this.dynamicStep[0]);
              if (overView.bike) {
                stepData.push(this.dynamicStep[2]);
              }
              if (overView.van) {
                stepData.push(this.dynamicStep[1]);
              }
              if (overView.fsr) {
                stepData.push(this.dynamicStep[3]);
              }
            }
            stepData.push(this.dynamicStep[4]);
            stepData.map((i, count) => {
              i.index = count;
              i.label = `${i.index + 1}`;
              return i;
            });
            this.$store.state.salesExpressContract.flowStep = 0;
            this.$store.state.salesExpressContract.ExpressContractFlowStepperData =
              stepData;
            this.$store.dispatch("salesSales/openDialog", {
              dialogDetails: {
                dialogName: "ExpressContractQuotationDialog",
                dialogHeader: "Edit Express Contract",
                dialogHeaderId: this.rowData.quotation_id,
              },
            });
            this.$store.getters["salesSales/controlActivityDialog"];
          } else if (
            this.rowData.customer_type == "Express" &&
            this.rowData.business_type == "Adhoc"
          ) {
            await this.loadExpressAdhocRowData(this.rowData.id);

            this.$store.dispatch("salesSales/openDialog", {
              dialogDetails: {
                dialogName: "ExpressContractAdhocQuotationDialog",
                dialogHeader: "Edit Express Adhoc",
              },
            });
            this.$store.getters["salesSales/controlActivityDialog"];
          } 
        } else {
          if (
            this.rowData.customer_type == "International" &&
            this.rowData.business_type == "Agent"
          ) {
            this.$store.state.salesInternationalAgent.updateType = "contract";
            await this.setInterNationalAgentData({
              id: this.rowData.id,
              type: "contract",
            });
            this.$store.dispatch("salesSales/openDialog", {
              dialogDetails: {
                dialogName: "InternationalAgentQuotationDialog",
                dialogHeader: "Edit International Agent",
                dialogHeaderId: this.rowData.quotation_id,
              },
            });
            this.$store.getters["salesSales/controlActivityDialog"];
          } else if (
            this.rowData.customer_type == "Express" &&
            this.rowData.business_type == "Contract"
          ) {
            this.$store.state.salesExpressContract.updateType = "contract";
            await this.loadOverviewData({
              id: this.rowData.id,
              type: "contract",
            });

            let overView = this.overViewData?.express_contract[0];
            let stepData = [
              {
                index: 0,
                label: "1",
                component: "SalesExpressContractFirstStep",
                name: "Add Address",
              },
              {
                index: 1,
                label: "2",
                component: "SalesExpressContractSecondStep",
                name: "Select Method",
              },
            ];
            if (overView.fsr && !overView.bike && !overView.van) {
              stepData.push(this.dynamicStep[3]);
            } else {
              stepData.push(this.dynamicStep[0]);
              if (overView.bike) {
                stepData.push(this.dynamicStep[2]);
              }
              if (overView.van) {
                stepData.push(this.dynamicStep[1]);
              }
              if (overView.fsr) {
                stepData.push(this.dynamicStep[3]);
              }
            }
            stepData.push(this.dynamicStep[4]);
            stepData.map((i, count) => {
              i.index = count;
              i.label = `${i.index + 1}`;
              return i;
            });
            this.$store.state.salesExpressContract.flowStep = 0;
            this.$store.state.salesExpressContract.ExpressContractFlowStepperData =
              stepData;

            this.$store.dispatch("salesSales/openDialog", {
              dialogDetails: {
                dialogName: "ExpressContractQuotationDialog",
                dialogHeader: "Edit Express Contract",
                dialogHeaderId: this.rowData.quotation_id,
              },
            });
            this.$store.getters["salesSales/controlActivityDialog"];
          }
        }
      } else if (choice == "Update Status") {
        let type = "";
        if (
          this.dataName == "QuotationTabData" ||
          this.dataName == "QuotationsTableData"
        ) {
          type = "quotations";
        } else {
          type = "contracts";
        }
        this.setSalesType(type);
        this.setUpdateStatusId(this.rowData.id);
        await this.getSalesStatus(type);
        this.openCommonDialog({
          dialogDetails: {
            dialogName: "QuotationStatus",
            dialogHeader: "Edit Status",
            dialogOption: "QuotationStatus",
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