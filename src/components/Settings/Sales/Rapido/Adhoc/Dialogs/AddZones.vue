<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <p class="txt mt-5 add_rates">Select Zone Ranges</p>
      <p class="required dialog-label-text">Zone Range</p>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <DropDown
        code="name"
        v-model="details.fromZone"
        :data="fromZoneData"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    to
    <div class="field col-12 md:col-3">
      <DropDown
        code="name"
        v-model="details.toZone"
        :data="toZoneData"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <Buttons
        label="Add"
        button_class="dialog-button-text"
        v-on:childToParent="addZoneRanges"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <p class="required dialog-label-text">Added Zone Ranges</p>
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
  <div class="mt-5">
    <div
      class="flex justify-content-between w-full align-content-start flex-wrap"
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="rapidoAdhoc" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ZoneChips from "../SelectionChips/RapidoZoneChips.vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

export default {
  components: {
    ZoneChips,
  },
  data: () => ({
    v$: useVuelidate(),
    submitted: false,

    fromZoneData: [
      {name: "Zone A", code: "ZA"},
      {name: "Zone B", code: "ZB"},
      {name: "Zone C", code: "ZC"},
    ],
    toZoneData: [
      {name: "Zone A", code: "ZA"},
      {name: "Zone B", code: "ZB"},
      {name: "Zone C", code: "ZC"},
    ],
    zoneChipsData: [],

    details: {
      fromZone: "",
      toZone: "",
    },
  }),

  validations() {
    return {
      details: {
        fromZone: {required},
        toZone: {required},
      },
    };
  },

  methods: {
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.zoneChipsData.length != 0) {
        this.$store.dispatch("rapidoAdhoc/setZoneRangeDropDownData", {
          data: this.zoneChipsData,
        });
        this.$store.dispatch("rapidoAdhoc/navigateStepper", {
          step: "AddZonalRates",
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
  },
  created() {
    this.$store.dispatch("rapidoAdhoc/loadAdhocZonesData", {
      path: "/settings/salesSettings/rates/rapido/adhoc/zone",
      mutation: "fetchZonesData",
    });
  },
};
</script>

<style scoped></style>
