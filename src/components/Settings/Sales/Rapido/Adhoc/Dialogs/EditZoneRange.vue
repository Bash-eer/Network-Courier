<template>
  <h5 class="required dialog-label-text">Zone Range Name</h5>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <DropDown
        :key="details.fromZone"
        label="fromZone"
        id="fromZone"
        code="name"
        :state="details.fromZone"
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
        :key="details.toZone"
        label="toZone"
        id="toZone"
        :state="details.toZone"
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
import axios from "axios";
const {URL} = require("../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  data: () => ({
    fromZoneData: [],
    toZoneData: [],
    v$: useVuelidate(),
    submitted: false,
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

        this.updateApiHandler(
          this.$store.state.rapidoAdhoc.zoneRangeEditDialogData.id,
          respectiveFromZoneData.id,
          respectiveToZoneData.id
        );
      }
    },
    updateApiHandler(rateId, fromId, toId) {
      this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
        path:
          "/settings/sales/rates/rapido/adhoc/ratecard/zone/ranges/" + rateId,
        method: "PATCH",

        data: {
          zone_from_id: fromId,
          zone_to_id: toId,
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The zone range is updated successfully`,
            toastSeverity: "info",
          },

          toastDuplicateErrorData: {
            toastMsg: `The zone range already exist !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in updating zone range, try again!",

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
    },
    async getZoneDropdownData() {
      await axios
        .get("/settings/sales/rates/rapido/adhoc/dropdowns/zones")
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results);
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.fromZoneData.push(res.data.results[c]);
              this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
    loadState() {
      let incomingData = this.$store.state.rapidoAdhoc.zoneRangeEditDialogData;
      this.details.fromZone = incomingData.zone_from.zone_name;
      this.details.toZone = incomingData.zone_to.zone_name;
    },
  },
  async created() {
    this.details.rate_card_name =
      this.$store.state.rapidoAdhoc.adhocTableRowRateCardName;

    await this.getZoneDropdownData();
    this.loadState();
  },
};
</script>

<style></style>
