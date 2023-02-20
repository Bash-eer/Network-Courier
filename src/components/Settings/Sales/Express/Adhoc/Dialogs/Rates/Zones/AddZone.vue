<template>
  <div class="p-2 mt-2 ml-0 pl-0">
    <div class="formgrid grid">
      <div class="field col-12 md:col-12 ml-0 pl-0">
        <p class="color-4e5958 font-size-14 bold-600 mt-5 add_rates">Select Zone Ranges</p>
        <p class="required color-7a7a7a font-size-14 bold-500 mt-4 mb-0 pb-0">Zone Range</p>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-4 ml-0 pl-0">
        <DropDown
          code="name"
          v-model="details.fromZone"
          :data="ZoneData"
          :classes="{
            'p-invalid': v$.details.fromZone.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <span class="m-1 color-171717 font-size-14 bold-700"> - </span>

      <div class="field col-12 md:col-4">
        <DropDown
          code="name"
          v-model="details.toZone"
          :data="ZoneData"
          :classes="{
            'p-invalid': v$.details.toZone.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <Buttons
          label="Add"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="addZoneRanges"
        />
      </div>
    </div>
    <p class="required color-7a7a7a font-size-14 bold-500 my-2 mb-0 pb-0">Added Zone Ranges</p>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12 ml-0 pl-0">
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
          <CancelButton storePath="expressAdhoc" label="Cancel" class="color-357dea"/>
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
import { required } from "@vuelidate/validators";
import ZoneChips from "../../../SelectionChips/ZoneChips.vue";
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  components: {
    ZoneChips,
  },
  data: () => ({
    v$: useVuelidate(),
    submitted: false,

    ZoneData: [],
    zoneChipsData: [],

    details: {
      fromZone: "",
      toZone: "",
    },
  }),

  validations() {
    return {
      details: {
        fromZone: { required },
        toZone: { required },
      },
    };
  },

  methods: {
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.zoneChipsData.length != 0) {
        let zone_ranges = [];
        this.zoneChipsData.map((item) => {
          let splitarr = item.split("-");

          if (this.ZoneData) {
            let respectiveFromZoneData = this.ZoneData.find(
              (itm) => itm.name == splitarr[0].trim()
            );

            let respectiveToZoneData = this.ZoneData.find(
              (itm) => itm.name == splitarr[1].trim()
            );

            if (respectiveFromZoneData && respectiveToZoneData) {
              zone_ranges.push({
                zone_from_id: respectiveFromZoneData.id,
                zone_to_id: respectiveToZoneData.id,
              });
            }
          }
        });

        this.$store.dispatch("expressAdhoc/setZoneRangeDropDownData", {
          data: this.zoneChipsData,
        });
        this.$store.state.expressAdhoc.expressAdhocAddNewData["zone_ranges"] =
          zone_ranges;

        //navigate to next step
        this.$store.dispatch("expressAdhoc/navigateStepper", {
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
    async getZoneDropdownData() {
      await axios
        .get("/settings/sales/rates/express/adhoc/dropdowns/zones")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.ZoneData.push(res.data.results[c]);
            }
          }
        });
    },
  },
  async created() {
    await this.getZoneDropdownData();
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
