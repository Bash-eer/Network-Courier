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
              <img
                :src="'/images/liveJobStatus/' + items.icon + '.png'"
                alt=""
                width="19"
                height="20"
                class="ml-2"
              />
            </div>
            <div
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                zone-route-custom-speed-dial-text
              "
            >
              {{ items.label }}
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
  components: {
    Button,
    OverlayPanel,
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    menuClicked(choice) {
      if (
        choice == "Checklist" ||
        choice == "Instruction Slip" ||
        choice == "Attempt Slip" ||
        choice == "Print Label"
      ) {
        let data = {
          data: this.rowData,
          title: choice,
        };
        this.$emit("emitDialogLabel", data);
        this.$refs.op.hide();
      }
    },
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
