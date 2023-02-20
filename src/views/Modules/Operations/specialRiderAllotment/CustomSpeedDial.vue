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
  name: "CustomSpeedDialSpecialRider",
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
      deleteEmployeeData: "specialRiderAllotment/deleteEmployeeData",
      specialRiderAllotmentEmployeeList:
        "specialRiderAllotment/specialRiderAllotmentEmployeeList",
    }),

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {
      this.$refs.op.hide();
    },

    async deleteData() {
      try {
        let response = await this.specialRiderAllotmentEmployeeList();
        if (response === 200) {
          let info = "Special Rider Allotment Deleted successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to delete";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to delete";
        this.commonToast("error", "Error", info);
      }
    },

    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    menuClicked(choice) {
      if (this.tableName === "SpecialRiderAllotment") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              let data = this.rowData.id;
              this.deleteEmployeeData(data).then(async (c) => {
                if (c == 200) {
                  await this.specialRiderAllotmentEmployeeList();
                }
                this.deleteData();
              });
            },
          });
        } else {
          this.$emit("emitEditData");
        }
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
