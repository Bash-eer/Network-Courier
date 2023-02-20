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
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
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
              v-if="items.label == 'Disable'"
              class="
                flex
                align-items-center
                justify-content-center
                ml-5
                hover-blue
              "
            >
              <div
                v-for="toggle of $store.state['others'].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="rowData.status == 'Inactive' ? true : false"
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
    return {};
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    getCRUDDetails() {
      switch (this.tableName) {
        case "Competitors":
          return ["competitor", "fetchCompetitorsTable", "CompetitorsDialog"];
        case "Reference":
          return ["reference", "fetchReferenceTable", "ReferenceDialog"];
        case "Trade":
          return ["trade", "fetchTradeTable", "TradeDialog"];
        case "Festivals":
          return ["festival", "fetchFestivalsTable", "FestivalsDialog"];
      }
    },
    disableRow(bool) {
      let obj = {};
      obj["status"] = bool == false ? "Active" : "Inactive";
      this.$store.dispatch("others/commonCRUD", {
        path:
          "settings/salesSettinigs/others/" +
          this.getCRUDDetails()[0] +
          "s" +
          "/modifyStatus/" +
          this.rowData.id,
        action: "loadOthersTables",
        tag: "update",
        data: obj,
        mutation: this.getCRUDDetails()[1],
        type: "",
        id_key: "",
        listApiPath: this.getCRUDDetails()[0],
      });
    },
    menuClicked(choice) {
      if (choice == "Delete") {
        this.$store.dispatch("others/commonCRUD", {
          path:
            "settings/salesSettinigs/others/" +
            this.getCRUDDetails()[0] +
            "/" +
            this.rowData.id,
          action: "loadOthersTables",
          tag: "delete",
          data: this.rowData,
          mutation: this.getCRUDDetails()[1],
          type: "",
          id_key: "",
          listApiPath: this.getCRUDDetails()[0],
        });
      }
      if (choice == "Edit") {
        this.$store.dispatch("others/setOtherTableEditData", {
          data: this.rowData,
        });
        this.$store.dispatch("others/openDialog", {
          dialogDetails: {
            dialogName: this.getCRUDDetails()[2],
            dialogHeader: "Edit",
          },
        });
        this.$store.getters["others/controlActivityDialog"];
      }
      if (choice != "Disable") {
        this.$refs.op.hide();
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
