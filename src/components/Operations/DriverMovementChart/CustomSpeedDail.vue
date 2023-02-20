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
      <div class="flex flex-column flex-wrap mb-2">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer mt-2"
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
import { mapActions, mapGetters } from "vuex";

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
    ...mapActions({
      deleteCustomerLeaveData: "CustomerLaunchStore/deleteCustomerLeaveData",
      deleteCustomerSuspenstionData:
        "CustomerLaunchStore/deleteCustomerSuspenstionData",
      customerLeaveDataList: "CustomerLaunchStore/customerLeaveDataList",
      customerSuspenstionDataList:
        "CustomerLaunchStore/customerSuspenstionDataList",
      updateCustomerLeaveDropDown:
        "CustomerLaunchStore/updateCustomerLeaveDropDown",
      deleteLogisticsSettings: "CrmSettings/deleteLogisticsSettings",
      deleteCouponSettings: "CrmSettings/deleteCouponSettings",
      loadLogisticsSettingsData: "CrmSettings/loadLogisticsSettingsData",
      loadCouponSettingsData: "CrmSettings/loadCouponSettingsData",
      deleteDocumentDetailSettings: "CrmSettings/deleteDocumentDetailSettings",
      deleteDocumentDetailId: "CrmSettings/deleteDocumentDetailId",
      getOnRowSelectData: "CrmSettings/getOnRowSelectData",
      deleteDriverMovementData: "DriverMovement/deleteDriverMovementData",
      getDriverMovementMainTableData:
        "DriverMovement/getDriverMovementMainTableData",
      postDriverMovementMainTableDataFirst:
        "DriverMovement/postDriverMovementMainTableDataFirst",
    }),

    toggle(event) {
      this.$refs.op.toggle(event);
    },

    disableRow() {
      this.$refs.op.hide();
    },

    menuClicked(choice) {
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: async () => {
            let data = this.rowData.id;

            await this.deleteDriverMovementData(data);
            await this.postDriverMovementMainTableDataFirst();
          },
        });
      } else if (choice == "Edit") {
        let data = this.rowData;

        this.$store.state.DriverMovement.DriverMovementEdit = this.rowData;

        let payload = {
          id: this.$store.state.DriverMovement.DriverMovementEdit.id,
        };
        this.getDriverMovementMainTableData(payload);
        this.$emit("emittedEditDriverMoementTable", data);
      }
    },
  },
  computed: {
    ...mapGetters({}),
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
