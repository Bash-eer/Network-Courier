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
          'p-invalid': v$.details.zone_name.$invalid && !isSaveValid,
        }"
      />
    </div>
    <!-- <div class="field col-12 md:col-4 mb-0 mt-3">
      <Buttons
        label="Export"
        button_class="p-button-outlined mr-1 dialog-button-text"
      />
    </div> -->
  </div>
  <div>
    <!-- <RapidoStepper
      :stepId="stepId"
      :stepperData="$store.state.rapidoAdhoc.addNewStepperData"
    /> -->
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <p class="txt mt-5 add_rates">Add Postal Codes</p>
      <p class="required dialog-label-text">Postal Code Range</p>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <!-- <DropDown
        code="name"
        v-model="details.fromZone"
        :data="fromZoneData"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <TextField
        label="fromZone"
        id="fromZone"
        type="number"
        v-model="details.fromZone"
        :classes="{
          'p-invalid': v$.details.fromZone.$invalid && submitted,

          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    -
    <div class="field col-12 md:col-3">
      <!-- <DropDown
        code="name"
        v-model="details.toZone"
        :data="toZoneData"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <TextField
        label="toZone"
        id="toZone"
        type="number"
        v-model="details.toZone"
        :classes="{
          'p-invalid': v$.details.toZone.$invalid && submitted,

          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <Buttons
        v-if="details.toZone > details.fromZone"
        label="Add"
        button_class="dialog-button-text"
        v-on:childToParent="addZoneRanges"
      />
    </div>
    <div
      v-if="details.toZone < details.fromZone"
      class="ml-2"
      style="color: red"
    >
      To Zone must be greater than From Zone
    </div>
  </div>
  <div v-if="errMsg" class="ErrorMessage ml-2">{{ errMsg }}</div>

  <div class="formgrid grid">
    <p class="required dialog-label-text ml-2">Added Postal Codes</p>
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
              v-on:click="a"
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
          label="Save"
          button_class="dialog-button-text"
          @childToParent="submitDataHandler"
        />
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
      zone_name: "",
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
    submitDataHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }

      if (this.v$.details.zone_name.$invalid) {
        this.isSaveValid = false;

        if (this.zoneChipsData.length == 0) {
          this.isPostalCodesvalid = false;
          return;
        }
        return;
      }

      if (!this.v$.$invalid && this.zoneChipsData.length != 0) {
        let postal_codes = [];
        this.zoneChipsData.map((chip) => {
          let splittedData = chip.split("-");
          postal_codes.push({
            postal_code_from: splittedData[0],
            postal_code_to: splittedData[1],
          });
          return this.apiCallHandler(postal_codes);
        });
        this.$store.state.rapidoAdhoc.addZoneData["postal_codes"] =
          postal_codes;
      }
    },
    apiCallHandler(postal_codes) {
      if (this.$store.state.rapidoAdhoc.addZoneFormStateData.id) {
        let dataId = this.$store.state.rapidoAdhoc.addZoneFormStateData.id;
        let newData = this.$store.state.rapidoAdhoc.addZoneData;
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path: "settings/salesSettings/rates/rapido/adhoc/zone/" + dataId,
          data: newData,
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
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path: "/settings/salesSettings/rates/rapido/adhoc/zone",
          data: {zone_name: this.details.zone_name, postal_codes},
          method: "POST",
          loadData: {
            loadApi: "loadAdhocZonesData",
            loadPath: "/settings/salesSettings/rates/rapido/adhoc/zone",
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
      if (this.errMsg !== "") return;
      if (
        this.v$.details.postal_code_from.$invalid ||
        this.v$.details.postal_code_to.$invalid
      ) {
        this.isPostalValid = false;
        return;
      }

      this.isPostalValid = true;
      this.isPostalCodesvalid = true;
      if (this.details.fromZone != "" && this.details.toZone != "") {
        let zoneText =
          this.details.postal_code_from + " - " + this.details.postal_code_to;
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
