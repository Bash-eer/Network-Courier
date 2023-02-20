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
                bold-600
                font-size-12
                color-4e5868
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
                  :check="rowData.company_status == 'disabled' ? true : false"
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
    disableRow() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/salesCompany/modifystatus/" + this.rowData.id,
        method: "PATCH",
        loadData: "loadSalesTabData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated sucessfully!`,
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
        console.log(choice, "dbjhbjh");
        this.$store.dispatch("SalesQuotation/DELETECRUDOPERATION", {
          path: "/sales/quotation/" + this.rowData.id,
          method: "DELETE",

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
          loadData: "loadQuotationTabData",
        });
        this.$refs.op.hide();
      } else if (choice == "Edit") {
        if (this.dataName == "AddZoneData") {
          this.$store.state.expressAdhoc.addZoneFormStateData = this.rowData;

          this.$store.dispatch("expressAdhoc/openDialog", {
            dialogDetails: {
              dialogName: "AddNewZone",
              dialogHeader: "Add New Zone",
            },
          });
          this.$store.getters["expressAdhoc/controlActivityDialog"];
        }
      } else if (choice == "Retrieve") {
        this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
          path: "/salesCompany/retrive/" + this.rowData.id,
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
