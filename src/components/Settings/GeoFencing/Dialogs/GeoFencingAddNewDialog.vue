<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text required">Name</h5>
      <TextField
        v-model="details.name"
        type="text"
        :classes="{
          'p-invalid': v$.details.name.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <p class="ml-2">Add Location</p>
  <div v-for="(locations, index) of addLocations" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteLocation(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Postal Code</h5>
        <TextField
          v-model="details['geo_location'][index].postal_code"
          type="number"
          @update:modelValue="getPostal($event,index)"
          :classes="{
            'p-invalid':
              v$.details['geo_location'][index].postal_code.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div :key="renderKey" class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Location Name</h5>
        <TextField
          v-model="details['geo_location'][index].location_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['geo_location'][index].location_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      
    </div>
  </div>
  <div class="flex">
    <span class="new-field ml-2" @click="addLocation"
      ><b>+ Add new Location </b></span
    >
  </div>
  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="geoFencing" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import { salesCommon } from "../../../../store/helper";
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    cloneFieldClicked: 0,
    renderKey:1,
    addLocations: ["new_location"],
    locationValidation: [
      {
        postal_code: {required},
        location_name: {required},
      },
    ],
    details: {
      name: "",
      geo_location: [
        {
          postal_code: "",
          location_name: "",
          location: {
            lattitude: "1512",
            longitude: "1512",
          },
          area_coordinates: {
            x_axis: ["45", "45", "45", "55"],
            y_axis: ["45", "45", "45", "55"],
          },
          area: 4545,
        },
      ],
    },
  }),
  validations() {
    if (this.cloneFieldClicked > -1) {
      return {
        details: {
          name: {required},
          geo_location: this.locationValidation,
        },
      };
    }
  },
  methods: {
    ...salesCommon,
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.apiCallHandler();
      }
    },
    async getPostal(e,index) {
      if ( e.length > 4) {
        let res = await this.getAddress(e);
      if (res) {
        let data = res.data.results;
        this.details['geo_location'][index].location_name=data.area_name
      }
      this.renderKey++;
      }
    },
    addLocation() {
      this.details.geo_location.push({
        postal_code: "",
        location_name: "",
        location: {
          lattitude: "1512",
          longitude: "1512",
        },
        area_coordinates: {
          x_axis: ["45", "45", "45", "55"],
          y_axis: ["45", "45", "45", "55"],
        },
        area: 4545,
      });
      this.locationValidation.push({
        postal_code: {required},
        location_name: {required},
      });
      this.cloneFieldClicked++;
      this.addLocations.push("new_location");
    },
    deleteLocation(index) {
      this.details.geo_location.splice(index, 1);
      this.addLocations.splice(index, 1);
      this.locationValidation.splice(index, 1);
      this.cloneFieldClicked++;
    },
    apiCallHandler() {
      if (this.$store.state.geoFencing.geoFencingFormStateData.id) {
        let rowData = this.$store.state.geoFencing.geoFencingFormStateData;

        this.$store.dispatch("geoFencing/POSTPATCHCRUDOPERATION", {
          path: "/settings/geoFencing" + rowData.id,
          data: this.details,
          method: "PATCH",
          loadData: {
            loadApi: "loadGeoFencingTable",
            loadPath: "/settings/geoFencing",
            loadMutation: "fetchGeoTableMutation",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The Location  is updated!`,
              toastSeverity: "success",
            },

            toastDuplicateErrorData: {
              toastMsg: `The Location  already exist !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in updating the location, try again!",

              toastSeverity: "error",
            },
          },
        });
      }
      //making an add/POST api call to create new fuel details
      else {
        this.$store.dispatch("geoFencing/POSTPATCHCRUDOPERATION", {
          path: "/settings/geoFencing",
          data: this.details,
          method: "POST",
          loadData: {
            loadApi: "loadGeoFencingTable",
            loadPath: "/settings/geoFencing",
            loadMutation: "fetchGeoTableMutation",
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The Location ${this.details.name}  is added!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The Location ${this.details.name}  already exists!`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the location, try again!",

              toastSeverity: "error",
            },
          },
        });
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.geoFencing.geoFencingFormStateData)
          .length != 0
      ) {
        this.details["geo_location"] =
          this.$store.state.geoFencing.geoFencingFormStateData.location;
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.details = null;
    this.$store.state.geoFencing.geoFencingFormStateData = {};
  },
};
</script>
<style></style>
