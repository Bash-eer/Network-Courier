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
import { mapActions, mapGetters } from "vuex";
import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "upperLevelData",
  ],
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
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    // disableRow() {
    //   // console.log("rowdatatata", this.rowData);
    //   // console.log(this.dataName, "dataname");
    //   let status;
    //   let statusMsg;
    //   if (this.rowData.status == "Active") {
    //     status = {
    //       status: "Inactive",
    //     };
    //     statusMsg = "disabled";
    //   } else if (this.rowData.status == "Inactive") {
    //     status = {
    //       status: "Active",
    //     };
    //     statusMsg = "enabled";
    //   }
    //   console.log(Stat)
    // },

    menuClicked(choice) {
      if (choice == "Edit") {
        this.$store.dispatch("salesInternationalContract/loadRowData", {
          path: "/sales/quotations/overview/" + this.$route.params.id,
        });

        this.$store.state.salesInternationalContract.StepperIdData =
          "SalesInternationalContractFourthStep";
        // this.$store.dispatch("salesSales/openDialog", {
        //   dialogDetails: {
        //     dialogName: "InternationalContractQuotationDialog",
        //     dialogHeader: "Quotation",
        //   },
        // });

        // this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        //   step: "SalesInternationalContractThirdStep",
        // });

        // this.$store.getters["salesInternationalContract/controlActivityDialog"];
      }

      this.$refs.op.hide();
    },
  },
  components: {
    Button,

    OverlayPanel,
  },
  created() {
    this.setCurrentStep(1);
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
  /* line-height: 15px; */
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
