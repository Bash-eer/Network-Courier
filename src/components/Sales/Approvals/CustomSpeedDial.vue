<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded mx-2 mt-3 updateButton'"
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
                items.label == 'Private' ||
                items.label == 'Signed Doc'
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
                    rowData.status == 'Inactive' ||
                    rowData.private == true ||
                    rowData.signed_doc == true
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
import { salesCommon } from "../../../store/helper";

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
    disableRow() {
      let status;
      let statusMsg;
      if (this.rowData.signed_doc == true) {
        status = {
          signed_doc: false,
        };
        statusMsg = "disabled";
      } else {
        status = {
          signed_doc: true,
        };
        statusMsg = "enabled";
      }
      this.$store.dispatch("salesApproval/POSTPATCHCRUDOPERATION", {
        path: "/sales/contracts/approved/signeddoc/status/" + this.rowData.id,
        data: status,
        method: "PATCH",
        loadData: "loadApprovalContracts",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is ${statusMsg} sucessfully!`,
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
    async menuClicked(choice) {
      if (choice == "Retrieve") {
        await this.retrieveAct({ id: this.rowData?.id, toast: this.$toast });
        this.loadApprovalContracts();
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
