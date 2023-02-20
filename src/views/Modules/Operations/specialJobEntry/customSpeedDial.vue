<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded ml-2 mr-2 mt-1 updateButton'"
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
                zones-custom-speed-dial-text
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
  <component
    :dialogComponent="dialogComponent"
    :selectedTab="currentTab"
    v-bind:is="initialComponent"
  />
</template>

<script>
import Button from "primevue/button";

import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import specialJobEntryMainDialogue from "../../../../components/Operations/specialJobEntryMainDialogue.vue";

export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "currentTab",
  ],
  components: {
    Button,
    OverlayPanel,
    specialJobEntryMainDialogue
  },
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
      dialogComponent: '',
      initialComponent: '',
    };
  },
  methods: {
    ...mapActions({
      updateStatusForm: "operationsStatusSettings/updateStatusEditData",  
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {
      var status;
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

      try {
        let data = this.rowData;
        data.type = this.currentTab;
        data.statusData = {
          status_name: data.status_name,
          status: status.status,
        };
        let response = await this.disableStatus(data);
        if (response && response.status === 200) {
          let info = `The Status ${this.rowData.status_name} is ${statusMsg} successfully!`;
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info =
            response.data.message ||
            "There was an error in disabling/enabling a status, try again!";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }

      this.$refs.op.hide();
    },

    async menuClicked(choice) {
      if (choice == "Edit") {
        //FOR STATUS SETTINGS EDIT DIALOG
        if (this.storePath == "operationsSpecialJobEntry") {
          this.dialogComponent = 'specialJobEntryDialog';
          this.initialComponent = 'specialJobEntryMainDialogue';
          const dialogData = {
            displayDialog : true,
            statusData: this.rowData
          }
          this.updateStatusForm(dialogData);
          this.$refs.op.hide();
        }

        console.log('editsssssssssss')
      }

      //TO DELETE THE TABLE ROW
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.deleteStatusSettings();
          },
        });
      }
    },

    initializeData(data) {
      if (data.type == "ExpressTab") {
        this.expressDataFetch();
      } else if (data.type == "RapidoTab") {
        this.rapidoDataFetch();
      } else {
        this.internationalDataFetch();
      }
    },

    commonToast(severity, summary, message) {
      this.$store.state.operationsStatusSettings.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    //FOR DELETE STATUS SETTINGS
    async deleteStatusSettings() {
      try {
        let data = this.rowData;
        data.type = this.currentTab;
        let response = await this.deleteStatus(data);

        if (response && response.status === 200) {
          let info = "Status deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info = response.data.message || "Failed to delete the status";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.zones-custom-speed-dial-text {
  font-weight: 600;
  font-size: 14px;
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
