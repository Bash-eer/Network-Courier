<template>
  <!--disabled fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Rate Card Name</h5>
      <TextField
        :disabled="true"
        v-model="details.rate_card_name"
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Zone Range *</h5>
      <TextField
        :disabled="true"
        v-model="details.zone_range"
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--image-->
  <div class="flex w-100 align-items-center justify-content-center">
    <img src="/images/down-arrow-vector.png" alt="" />
  </div>
  <!--clones fields-->
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Rate Card Name</h5>
      <DropDown
        code="name"
        v-model="details.cloned_rate_card_name"
        :data="rateCardData[0]"
        :classes="{
          'p-invalid': v$.details.cloned_rate_card_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <h5 class="required dialog-label-text">Cloned Zone Range Name</h5>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <DropDown
        code="name"
        v-model="details.fromZone"
        :data="fromZoneData"
        :classes="{
          'p-invalid': v$.details.fromZone.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-6">
      <DropDown
        code="name"
        v-model="details.toZone"
        :data="toZoneData"
        :classes="{
          'p-invalid': v$.details.toZone.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--footer-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="rapidoAdhoc" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import axios from "axios";
const {URL} = require("../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  data: () => ({
    RateDropdownData: [
      {name: "Rate 1", code: "1"},
      {name: "Rate 2", code: "2"},
      {name: "Rate 3", code: "3"},
    ],
    fromZoneData: [],
    toZoneData: [],
    rateCardData: [],
    v$: useVuelidate(),
    submitted: false,
    details: {
      rate_card_name: "",
      zone_range: "",
      cloned_rate_card_name: "",
      fromZone: "",
      toZone: "",
    },
  }),
  validations() {
    return {
      details: {
        cloned_rate_card_name: {required},
        fromZone: {required},
        toZone: {required},
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let respectiveFromZoneData = this.fromZoneData.find(
          (item) => item.name == this.details.fromZone
        );
        let respectiveToZoneData = this.toZoneData.find(
          (item) => item.name == this.details.toZone
        );
        let respectiveRateCardData = this.rateCardData[0].find(
          (item) => item.name == this.details.cloned_rate_card_name
        );

        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path: "settings/sales/rates/rapido/adhoc/ratecard/zone/ranges/clone",
          method: "POST",

          data: {
            target_zone_id: this.$store.state.rapidoAdhoc.cloneZoneRangeData.id,
            zone_from_id: respectiveFromZoneData.id,
            zone_to_id: respectiveToZoneData.id,
            rate_card_id: respectiveRateCardData.id,
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The rate card is cloned successfully`,
              toastSeverity: "info",
            },

            toastDuplicateErrorData: {
              toastMsg: `The Rate card  already exist !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in cloning the rate card, try again!",

              toastSeverity: "error",
            },
          },

          loadData: {
            loadApi: "loadAdhocSecondPageData",
            loadPath:
              "/settings/sales/rates/rapido/adhoc/ratecard/" +
              this.$route.params.id,
            loadMutation: "fetchadhocRatesSecondPageTableData",
          },
        });
      }
    },
    async getRateCardData() {
      await axios
        .get("/settings/sales/rates/rapido/adhoc/ratecard")
        .then((res) => {
          if (res.data.results) {
            let newAyyarData = [];
            for (let c in res.data.results) {
              newAyyarData.push({
                id: res.data.results[c]["id"],
                name: res.data.results[c]["rate_card_name"],
              });
            }
            this.rateCardData.push(newAyyarData);
          }
        });
    },
    async getZoneDropdownData() {
      await axios
        .get("/settings/sales/rates/rapido/adhoc/dropdowns/zones")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.fromZoneData.push(res.data.results[c]);
              this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
  },
  async created() {
    this.details.zone_range =
      this.$store.state.rapidoAdhoc.cloneZoneRangeData.zones;
    this.details.rate_card_name =
      this.$store.state.rapidoAdhoc.adhocTableRowRateCardName;
    await this.getRateCardData();
    await this.getZoneDropdownData();
  },
};
</script>

<style></style>
