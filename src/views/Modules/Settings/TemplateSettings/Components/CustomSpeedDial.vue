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
    menuClicked(choice) {
      if (choice == "Delete") {
        if (
          this.dataName == "profileTable" ||
          this.dataName == "EmailprofileTable"
        ) {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              this.$store.dispatch("templateSettings/DELETECRUDOPERATION", {
                path: "/settings/templates/modules/template/" + this.rowData.id,
                method: "DELETE",
                loadDiffStore: true,
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
                loadData: "templateSettings/getAllTemplatesData",
                id: this.$route.params.id,
              });
              // }
              this.$refs.op.hide();
            },
          });
        } else if (this.dataName == "documentTable") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              this.$store.dispatch("templateSettings/DELETECRUDOPERATION", {
                path: "/settings/templates/document/module/" + this.rowData.id,
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
                loadData: "getDocumentsModulesData",
              });
              // }
              this.$refs.op.hide();
            },
          });
        } else if (this.dataName == "emailTable") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              this.$store.dispatch("templateSettings/DELETECRUDOPERATION", {
                path: "/settings/templates/email/module/" + this.rowData.id,
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
                loadData: "getEmailModulesData",
              });
              // }
              this.$refs.op.hide();
            },
          });
        }
      } else if (choice == "Edit") {
        //for vehicle details edit operation
        if (this.dataName == "documentTable") {
          this.$store.state.templateSettings.documentmoduleEditData =
            this.rowData;

          this.$store.dispatch("templateSettings/openDialog", {
            dialogDetails: {
              dialogName: "documentModuleNameDialog",
              dialogHeader: "Edit Module",
            },
          });
          this.$store.getters["templateSettings/controlActivityDialog"];
        } else if (this.dataName == "emailTable") {
          this.$store.state.templateSettings.emailmoduleEditData = this.rowData;

          this.$store.dispatch("templateSettings/openDialog", {
            dialogDetails: {
              dialogName: "emailModuleNameDialog",
              dialogHeader: "Edit Module",
            },
          });
          this.$store.getters["templateSettings/controlActivityDialog"];
        } else if (
          this.dataName == "profileTable" &&
          this.$route.params.type == "Document"
        ) {
          this.$store.state.templateSettings.templateEditData = this.rowData;
          this.$router.push({
            name: "DocumentTemplate",
            type: this.$route.params.type,
            module: this.$route.params.module,
            id: this.$route.params.id,
          });
        } else if (
          this.dataName == "EmailprofileTable" &&
          this.$route.params.type == "Email"
        ) {
          this.$store.state.templateSettings.emailTemplateEditData =
            this.rowData;
          this.$store.dispatch("templateSettings/openDialog", {
            dialogDetails: {
              dialogName: "emailCreateTemplate",
              // dialogName: "emailModuleNameDialog",
              dialogHeader: "Edit Template",
            },
          });
          this.$store.getters["templateSettings/controlActivityDialog"];
        }
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
