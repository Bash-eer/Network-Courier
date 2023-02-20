<template>
  <div class="formgrid grid align-items-center">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Zone Name</h5>
      <TextField
        label="rate_card"
        type="text"
        v-model="details.zone_name"
        :classes="{
          'p-invalid': v$.details.zone_name.$invalid && submitted,

          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="p-2">
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <p class="txt mt-4">Add Postal Codes</p>
      </div>
    </div>
    <h5 class="required dialog-label-text ml-2">Postal Code Range</h5>
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

      <div class="field col-12 md:col-3">
        <div class="flex margin-right-negative-10px">
          <Buttons
            label="Add"
            button_class="dialog-button-text"
            v-on:childToParent="addZoneRanges"
          />
          <Buttons
            label="Import"
            button_class=" p-button-outlined ml-1 mr-1 dialog-button-text"
          />
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <h5 class="required dialog-label-text ml-2">Added Postal Codes</h5>
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
          <CancelButton storePath="rapidoAdhoc" />
          <Buttons
            label="submit"
            button_class="dialog-button-text"
            v-on:childToParent="SubmitData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

import ZoneChips from "../SelectionChips/RapidoZoneChips.vue";
export default {
  components: {
    ZoneChips,
  },
  data: () => ({
    v$: useVuelidate(),
    submitted: false,

    fromZoneData: [
      {name: 10, code: 10},
      {name: 20, code: 20},
      {name: 30, code: 30},
      {name: 30, code: 30},
    ],
    toZoneData: [
      {name: 40, code: 40},
      {name: 50, code: 50},
      {name: 60, code: 60},
    ],
    zoneChipsData: [],

    details: {
      zone_name: "",
      fromZone: "",
      toZone: "",
    },
  }),
  validations() {
    return {
      details: {
        fromZone: {required},
        toZone: {required},
        zone_name: {required},
      },
    };
  },
  methods: {
    SubmitData() {
      if (this.zoneChipsData.length == 0) {
        this.submitted = true;
      }
      console.log(this.details);
      if (!this.v$.$invalid && this.zoneChipsData.length != 0) {
        let postal_codes = [];
        this.zoneChipsData.map((chip) => {
          let splittedData = chip.split("-");
          postal_codes.push({
            postal_code_from: splittedData[0],
            postal_code_to: splittedData[1],
          });
          return postal_codes;
        });
        this.$store.state.rapidoAdhoc.addZoneData["postal_codes"] =
          postal_codes;
        this.apiCallHandler(postal_codes);
      }
    },

    apiCallHandler(postal_codes) {
      if (this.$store.state.rapidoAdhoc.addZoneFormStateData.id) {
        let dataId = this.$store.state.rapidoAdhoc.addZoneFormStateData.id;
        console.log(this.$store.state.rapidoAdhoc.addZoneFormStateData.id);
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path: "settings/salesSettings/rates/rapido/adhoc/zone/" + dataId,
          data: {zone_name: this.details.zone_name, postal_codes},
          method: "PATCH",
          loadData: {
            loadApi: "loadAdhocZonesData",
            loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The zone ${this.details.zone_name} is updated!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The zone ${this.details.zone_name} already exist !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in updating a zone, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
      //making an add/POST api call to create new fuel details
      else {
        console.log("post");
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path: "/settings/salesSettings/rates/rapido/adhoc/zone",
          data: {zone_name: this.details.zone_name, postal_codes},
          method: "POST",
          loadData: {
            loadApi: "loadAdhocZonesData",
            loadPath: "settings/salesSettings/rates/rapido/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The zone ${this.details.zone_name} is added`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The zone ${this.details.zone_name} already exist !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in creating a zone, try again!",
              toastSeverity: "error",
            },
          },
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
        Object.keys(this.$store.state.rapidoAdhoc.addZoneFormStateData)
          .length != 0
      ) {
        let incomingData = this.$store.state.rapidoAdhoc.addZoneFormStateData;
        //action
        this.details.zone_name = incomingData.zone_name;
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
    console.log(this.$store.state.rapidoAdhoc.addZoneFormStateData);
    console.log(this.$store.state.rapidoAdhoc.addZoneData, ".....");
  },
  unmounted() {
    this.$store.dispatch("rapidoAdhoc/setAddZoneValue", {
      data: null,
    });
    this.zoneChipsData = [];
    this.$store.state.rapidoAdhoc.addZoneFormStateData = {};
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
