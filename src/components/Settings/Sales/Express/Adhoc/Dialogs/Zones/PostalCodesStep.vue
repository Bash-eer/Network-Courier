<template>
  <div class="p-2 ml-0 pl-0">
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <p class="color-4e5968 font-size-14 bold-600 mt-4">Add Postal Codes</p>
      </div>
    </div>
    <h5 class="required color-7a7a7a font-size-14 bold-500 ml-2">
      Postal Code Range
    </h5>
    <div class="formgrid grid">
      <div class="field col-12 md:col-3">
        <TextField
          label="fromZone"
          id="fromZone"
          type="number"
          v-model="details.fromZone"
          classes="inputfield w-full dialog-field-text"
        />
      </div>
      -
      <div class="field col-12 md:col-3">
        <TextField
          label="toZone"
          id="toZone"
          type="number"
          v-model="details.toZone"
          classes="inputfield w-full dialog-field-text"
        />
      </div>
      <div class="flex-none">
        <Buttons
          label="Add"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="addZoneRanges"
        />
        <Buttons
          label="Import"
          icon="pi pi-download"
          button_class=" p-button-outlined ml-1 mr-1 dialog-button-text color-357dea"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <h5 class="required color-7a7a7a font-size-14 bold-500 ml-2">
        Added Postal Codes
      </h5>
      <div class="field col-12 md:col-12">
        <div
          :class="
            zoneChipsData.length == 0 && submitted
              ? 'zone-chips-error-div p-3'
              : 'zone-chips-div p-3'
          "
        >
          <div class="flex flex-row flex-wrap">
            <div
              v-for="(chip, index) of zoneChipsData"
              :key="index"
              class="flex mr-2 m-1"
            >
              <ZoneChips
                :data="[chip, index]"
                v-on:childToParent="removeZoneRanges"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <span class="tab-validation-text">
        <i class="pi pi-info-circle mr-2"></i>
        <span>From postal code should be smaller than the To postal code</span>
      </span>
    </div>
    <div class="mt-5">
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-start
          flex-wrap
        "
      >
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton
            storePath="expressAdhoc"
            label="Cancel"
            class="color-357dea"
          />
          <Buttons
            label="Next"
            button_class="dialog-button-text bg-357dea"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";

import ZoneChips from "../../SelectionChips/ZoneChips.vue";
export default {
  components: {
    ZoneChips,
  },
  data: () => ({
    v$: useVuelidate(),
    submitted: false,

    fromZoneData: [
      { name: 10, code: 10 },
      { name: 20, code: 20 },
      { name: 30, code: 30 },
      { name: 30, code: 30 },
    ],
    toZoneData: [
      { name: 40, code: 40 },
      { name: 50, code: 50 },
      { name: 60, code: 60 },
    ],
    zoneChipsData: [],

    details: {
      fromZone: "",
      toZone: "",
    },
  }),

  methods: {
    nextStepHandler() {
      if (this.zoneChipsData.length == 0) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.zoneChipsData.length != 0) {
        let postal_codes = [];
        this.zoneChipsData.map((chip) => {
          let splittedData = chip.split("-");

          postal_codes.push({
            postal_code_from: splittedData[0],
            postal_code_to: splittedData[1],
          });
        });
        this.$store.state.expressAdhoc.addZoneData["postal_codes"] =
          postal_codes;

        this.$store.dispatch("expressAdhoc/setZoneRangeDropDownData", {
          data: this.zoneChipsData,
        });
        this.$store.dispatch("expressAdhoc/navigateStepper", {
          step: "TripsStep",
        });
      }
    },
    addZoneRanges() {
      if (this.details.fromZone != "" && this.details.toZone != "") {
        let zoneText = this.details.fromZone + " - " + this.details.toZone;
        this.zoneChipsData.push(zoneText);
      }
    },
    removeZoneRanges(index) {
      this.zoneChipsData.splice(index, 1);
    },

    loadState() {
      if (
        Object.keys(this.$store.state.expressAdhoc.addZoneFormStateData)
          .length != 0
      ) {
        let incomingData = this.$store.state.expressAdhoc.addZoneFormStateData;

        //action
        this.$store.state.expressAdhoc.addZoneValue = incomingData.zone_name;
        incomingData.postal_codes.map((item) => {
          this.zoneChipsData.push(
            item.postal_code_from + " " + "-" + " " + item.postal_code_to
          );
        });
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.zoneChipsData = [];
    this.$store.state.expressAdhoc.addZoneFormStateData = {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.zone-chips-div {
  height: 111px;
  overflow: auto;
  border: 1px solid #e6e6e6;
  border-radius: 2px;
}
.zone-chips-error-div {
  height: 111px;
  overflow: auto;
  border: 1px solid red;
  border-radius: 2px;
}
</style>
