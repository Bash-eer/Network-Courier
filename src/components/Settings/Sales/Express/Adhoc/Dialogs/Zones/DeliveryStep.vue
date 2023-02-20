<template>
  <div>
    <!--tab-->
    <br />
    <div class="ml-0 pl-0 mt-2">
      <BikeVanDuoSelect
        :options="['Bike', 'Van']"
        :default="defaultTransportType"
        type="setZoneDeliveryTransportType"
      />
    </div>
    <br />
    <!----table for bike---->
    <keep-alive>
      <ZoneDialogDataTable
        :key="$store.state.expressAdhoc.addZoneBikeDeliveryData"
        :data="$store.state.expressAdhoc.addZoneBikeDeliveryData"
        v-if="defaultTransportType == 'Bike'"
      />
    </keep-alive>
    <!----table for van---->
    <ZoneDialogDataTable
      :key="$store.state.expressAdhoc.addZoneVanDeliveryData"
      :data="$store.state.expressAdhoc.addZoneVanDeliveryData"
      v-if="defaultTransportType == 'Van'"
    />
  </div>
  <br />
  <div
    class="flex justify-content-between w-full align-content-start flex-wrap"
  >
    <div class="align-self-center flex">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="expressAdhoc"
        label="Cancel"
        class="color-357dea"
      />
      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitDataHandler"
      />
    </div>
  </div>
</template>
<script>
import BikeVanDuoSelect from "./BikeVanDuoSelection.vue";
import ZoneDialogDataTable from "../../ZoneDialogDatatable.vue";

export default {
  components: {
    BikeVanDuoSelect,
    ZoneDialogDataTable,
  },
  data() {
    return {
      defaultTransportType: "Bike",
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("expressAdhoc/navigateStepper", {
        step: "TripsStep",
      });
    },
    submitDataHandler() {
      let zone = this.$store.state.expressAdhoc.addZoneValue;
      if (zone == null || zone == "") {
        this.$store.dispatch("expressAdhoc/setZoneError", {
          error: "Enter Zone",
        });
      } else if (zone != null && zone != "") {
        this.$store.dispatch("expressAdhoc/setZoneError", {
          error: null,
        });
        this.$store.state.expressAdhoc.addZoneData["zone_name"] = zone;
        this.$store.state.expressAdhoc.addZoneData["delivery"] = {
          bike: this.$store.state.expressAdhoc.addZoneBikeDeliveryData,
          van: this.$store.state.expressAdhoc.addZoneVanDeliveryData,
        };

        this.apiCallHandler();
      }
    },
    apiCallHandler() {
      if (this.$store.state.expressAdhoc.addZoneFormStateData.id) {
        let dataId = this.$store.state.expressAdhoc.addZoneFormStateData.id;
        let newData = this.$store.state.expressAdhoc.addZoneData;
        // newData['delete_trips'] = []
        // newData['delete_delivery'] = []
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path: "settings/salesSettings/rates/express/adhoc/zone/" + dataId,
          data: newData,
          method: "PATCH",
          loadData: {
            loadApi: "loadZonesData",
            loadPath: "settings/salesSettings/rates/express/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The zone ${this.$store.state.expressAdhoc.addZoneData["zone_name"]} is updated!`,
              toastSeverity: "success",
            },

            toastDuplicateErrorData: {
              toastMsg: `The zone ${this.$store.state.expressAdhoc.addZoneData["zone_name"]} already exist !`,
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
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path: "settings/salesSettings/rates/express/adhoc/zone",
          data: this.$store.state.expressAdhoc.addZoneData,
          method: "POST",
          loadData: {
            loadApi: "loadZonesData",
            loadPath: "settings/salesSettings/rates/express/adhoc/zone",
            loadMutation: "fetchZonesData",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The zone ${this.$store.state.expressAdhoc.addZoneData["zone_name"]} is added`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The zone ${this.$store.state.expressAdhoc.addZoneData["zone_name"]} already exist !`,
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
    loadState() {},
  },
  created() {
    this.loadState();
  },
  watch: {
    "$store.state.expressAdhoc.addZoneDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.expressAdhoc.addZoneDeliveryTransportType;
    },
  },
};
</script>
<style></style>
