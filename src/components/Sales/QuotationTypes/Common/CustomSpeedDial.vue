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
              <!-- <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="rowData.status == 'Inactive' ? true : false"
                />
              </div> -->
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
import { salesCommon } from "../../../../store/helper";
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
    ...salesCommon,
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    allDeleteApiHandler() {
      if (this.dataName == "AttachmentTable") {
        this.$store.dispatch("salesCommon/DELETECRUDOPERATION", {
          path:
            "/sales/" +
            this.$route.params.type +
            "/attachments/" +
            this.rowData.id,
          method: "DELETE",
          id: this.$route.params.id,
          type: this.$route.params.type,
          loadData: "loadAttachmentData",

          toastData: {
            toastSuccessData: {
              toastMsg: `The Attachments is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the profile, try again!",
              toastSeverity: "error",
            },
          },
        });
      } else if (
        this.dataName == "timeLineExpressContractBikeCostCenterTableData"
      ) {
        this.$store.dispatch("salesCommon/DELETECRUDOPERATION", {
          path:
            "/sales/" +
            this.$route.params.type +
            "/cost-center/express/" +
            this.rowData.id,
          method: "DELETE",
          id: this.$route.params.id,
          type: this.$route.params.type,
          toastData: {
            toastSuccessData: {
              toastMsg: `The CostCenter is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg: "",
              toastSeverity: "error",
            },
          },
          loadData: "loadCostCenterData",
        });
      } else if (this.dataName == "timeLineInternationalCostCenterTableData") {
        this.$store.dispatch("salesCommon/DELETECRUDOPERATION", {
          path: "/sales/quotation/cost-center/international/" + this.rowData.id,
          method: "DELETE",
          id: this.$route.params.id,
          type: this.$route.params.type,
          toastData: {
            toastSuccessData: {
              toastMsg: `The CostCenter is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the profile, try again!",
              toastSeverity: "error",
            },
          },
          loadData: "loadinternationalCostCenterDataGet",
        });
      } else {
        this.$store.dispatch("salesCommon/DELETECRUDOPERATION", {
          path:
            "/sales/" +
            this.$route.params.type +
            "/followup/" +
            this.rowData.id,
          method: "DELETE",
          id: this.$route.params.id,
          type: this.$route.params.type,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Followup is deleted successfully!`,
              toastSeverity: "info",
            },
            toastErrorData: {
              toastMsg:
                "There was an error in deleting the profile, try again!",
              toastSeverity: "error",
            },
          },
          loadData: "loadFollowupData",
        });
      }

      this.$refs.op.hide();
    },
    async menuClicked(choice) {
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
        if (this.dataName == "AttachmentTable") {
          this.$store.state.salesCommon.commonAttachmentStateData =
            this.rowData;

          this.$store.dispatch("salesCommon/openDialog", {
            dialogDetails: {
              dialogName: "Attachment",
              dialogHeader: "Edit Attachment",
            },
          });
          this.$store.getters["salesCommon/controlActivityDialog"];
        } else if (
          this.dataName == "timeLineInternationalCostCenterTableData"
        ) {
          this.$store.state.salesCommon.commonInternationalContractCostCenterPatchData =
            this.rowData;
          this.$store.dispatch("salesCommon/openDialog", {
            dialogDetails: {
              dialogName: "InternationalCostCenter",
              dialogHeader: "Edit CostCenter",
            },
          });
          this.$store.getters["salesCommon/controlActivityDialog"];
        } else if (
          this.dataName == "timeLineExpressContractBikeCostCenterTableData"
        ) {
          await this.getExCostCenter({
            id: this.rowData.id,
            type: this.$route.params.type,
          });
          // this.$store.state.salesCommon.commonExpressCCStateData = this.rowData;

          this.$store.dispatch("salesCommon/openDialog", {
            dialogDetails: {
              dialogName: "CostCenter",
              dialogHeader: "Edit Cost Center",
            },
          });
          this.$store.getters["salesCommon/controlActivityDialog"];
        } else {
          this.$store.state.salesCommon.commonFollowUpStateData = this.rowData;

          this.$store.dispatch("salesCommon/openDialog", {
            dialogDetails: {
              dialogName: "FollowUp",
              dialogHeader: "Edit Follow up",
            },
          });
          this.$store.getters["salesCommon/controlActivityDialog"];
        }
      } else if (choice == "History") {
        this.$store.dispatch("salesCommon/openDialog", {
          dialogDetails: {
            dialogName: "SiteOfficeHistory",
            dialogHeader: "Rate Adjustments History",
          },
        });
        this.$store.dispatch("salesCommon/loadSiteOfficeHistory", {
          id: this.rowData.id,
        });
        this.$store.getters["salesCommon/controlActivityDialog"];
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