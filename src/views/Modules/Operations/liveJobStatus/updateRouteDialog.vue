<template>
  <div class="flex mt-0 mb-2" v-if="selectedTab == 'BikeTab'">
    <img
      class="title-image mr-2"
      src="../../../../assets/bike.png"
      alt="img"
      width="40"
    />
    <span class="track-status-code">
      - {{ emittedUpdateRouteSettingsData.booking?.collection_slip_no }}
    </span>
  </div>
  <div class="flex mt-0 mb-2" v-else-if="selectedTab == 'VanTab'">
    <img
      class="title-image mr-2"
      src="../../../../assets/Express.png"
      alt="img"
      width="40"
    />
    <span class="track-status-code">
      - {{ emittedUpdateRouteSettingsData.booking?.collection_slip_no }}
    </span>
  </div>
  <div class="flex mt-0 mb-2" v-else-if="selectedTab == 'RapidoTab'">
    <img
      class="title-image mr-2"
      src="../../../../assets/rapido2.png"
      alt="img"
      width="40"
    />
    <span class="track-status-code">
      - {{ emittedUpdateRouteSettingsData.booking?.collection_slip_no }}
    </span>
  </div>

  <div class="custom-modal-height">
    <div class="flex" v-if="selectedTab == 'BikeTab'">
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Zone</h6>
        <Dropdown
          v-model="zoneList"
          :options="getZoneDropDownListArray"
          optionLabel="zone_name"
          placeholder="Select Zone"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Route</h6>
        <Dropdown
          v-model="routeList"
          :options="getRouteDropDownListArray"
          optionLabel="route_name"
          placeholder="Select Route"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Rider</h6>
        <Dropdown
          v-model="riderList"
          :options="getriderDropDownListArray"
          optionLabel="employee_name"
          placeholder="Select Rider"
          class="w-12rem ml-1"
          :filter="true"
        >
          <template #value="slotProps">
            <div
              class="supervisor-item supervisor-item-value flex"
              v-if="slotProps.value"
            >
              <img
                height="25"
                width="25"
                :src="
                  slotProps.value.image_url != 'null'
                    ? slotProps.value.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.value.employee_name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="supervisor-item flex">
              <img
                height="30"
                width="30"
                :src="
                  slotProps.option.image_url != 'null'
                    ? slotProps.option.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.option.employee_name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Trip</h6>
        <Dropdown
          v-model="tripList"
          :options="getTripDropDownListArray"
          optionLabel="trip_name"
          placeholder="Select trip"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
    </div>
    <div class="flex" v-else-if="selectedTab == 'VanTab'">
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Zone</h6>
        <Dropdown
          v-model="zoneList"
          :options="getZoneVanDropDownListArray"
          optionLabel="zone_name"
          placeholder="Select Zone"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Route</h6>
        <Dropdown
          v-model="routeList"
          :options="getVanRouteDropDownListArray"
          optionLabel="route_name"
          placeholder="Select Route"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Rider</h6>
        <Dropdown
          v-model="riderList"
          :options="getVanRiderDropDownListArray"
          optionLabel="employee_name"
          placeholder="Select Rider"
          class="w-12rem ml-1"
          :filter="true"
        >
          <template #value="slotProps">
            <div
              class="supervisor-item supervisor-item-value flex"
              v-if="slotProps.value"
            >
              <img
                height="25"
                width="25"
                :src="
                  slotProps.value.image_url != 'null'
                    ? slotProps.value.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.value.employee_name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="supervisor-item flex">
              <img
                height="30"
                width="30"
                :src="
                  slotProps.option.image_url != 'null'
                    ? slotProps.option.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.option.employee_name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Trip</h6>
        <Dropdown
          v-model="tripList"
          :options="getTripVanDropDownListArray"
          optionLabel="trip_name"
          placeholder="Select trip"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
    </div>
    <div class="flex" v-else-if="selectedTab == 'RapidoTab'">
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Zone</h6>
        <Dropdown
          v-model="zoneList"
          :options="getZoneRapidoDropDownListArray"
          optionLabel="zone_name"
          placeholder="Select Zone"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Route</h6>
        <Dropdown
          v-model="routeList"
          :options="getRapidoRouteDropDownListArray"
          optionLabel="route_name"
          placeholder="Select Route"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Rider</h6>
        <Dropdown
          v-model="riderList"
          :options="getRapidoRiderDropDownListArray"
          optionLabel="employee_name"
          placeholder="Select Rider"
          class="w-12rem ml-1"
          :filter="true"
        >
          <template #value="slotProps">
            <div
              class="supervisor-item supervisor-item-value flex"
              v-if="slotProps.value"
            >
              <img
                height="25"
                width="25"
                :src="
                  slotProps.value.image_url != 'null'
                    ? slotProps.value.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.value.employee_name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="supervisor-item flex">
              <img
                height="30"
                width="30"
                :src="
                  slotProps.option.image_url != 'null'
                    ? slotProps.option.image_url
                    : noAvatar
                "
              />
              <div>{{ slotProps.option.employee_name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="w-50">
        <h6 class="ml-2 color-7a7a7a bold-600">Trip</h6>
        <Dropdown
          v-model="tripList"
          :options="getTripRapidoDropDownListArray"
          optionLabel="trip_name"
          placeholder="Select trip"
          class="w-12rem ml-1"
          :filter="true"
        />
      </div>
    </div>
    <div class="flex mt-2">
      <div class="flex flex-column w-50 pt-2 pb-2 pl-2">
        <h6 class="color-7a7a7a bold-600">Job Date</h6>
        <div>
          <Calendar
            v-model="jobDate"
            :showTime="true"
            hourFormat="12"
            :showIcon="true"
            :disabledDates="invalidDates"
            :disabledDays="[0, 6]"
            :manualInput="false"
            class="w-100"
          />
        </div>
      </div>
      <div class="flex align-items-center font-bold border-round mt-4 ml-4">
        <Checkbox v-model="homeAddress" :binary="true" />
        <h6 class="pl-2 mt-2 font-size-12 bold-600 color-1e90ff">
          Home Address
        </h6>
      </div>
    </div>
  </div>
  <div class="custom-footer">
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
        v-if="!updateBtn"
      />
      <Buttons
        label="Save"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
        :loading="isFeedbackSettingCreation"
        v-if="!updateBtn"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Checkbox from "primevue/checkbox";
import { errhandler } from "@/services/httpClient";
import Dropdown from "primevue/dropdown";
import moment from "moment";

export default {
  name: "DocumentDetailDialog",
  components: { Checkbox, Dropdown },
  props: [
    "emittedJobTypeData",
    "emittedUpdateRouteSettingsData",
    "selectedTab",
    "emitMultipleData",
    "paginationParams",
    "saerchValue",
    "searchKey",
  ],
  data() {
    return {
      submitted: false,
      jobTypeValue: "",
      jobTypeSelected: null,
      jobId: null,
      riderList: null,
      tripList: null,
      homeAddress: false,
      jobDate: null,
      routeList: null,
      updated: null,
      updatedPayload: null,
      zoneList: null,
      selectedvalue: null,
      objectLenght: 0,
      noAvatar: require("../../../../assets/noavatar.png"),
    };
  },

  methods: {
    ...mapActions({
      getRiderDropDownList: "liveJobStatus/getBikeRiderDropDownList",
      getZoneDropDownList: "liveJobStatus/getZoneDropDownList",
      getTripDropDownList: "liveJobStatus/getTripDropDownList",
      getRouteDropDownList: "liveJobStatus/getBikeRouteDropDownList",
      getVanRouteDropDownList: "liveJobStatus/getVanRouteDropDownList",
      getRouteRapidoDropDownList: "liveJobStatus/getRouteRapidoDropDownList",
      saveUpdateRouteSettings: "liveJobStatus/saveUpdateRouteSettings",
      loadLiveJobStatusBikeList: "liveJobStatus/loadLiveJobStatusBikeList",
      getVanRiderDropDownList: "liveJobStatus/getVanRiderDropDownList",
      getRapidoRiderDropDownList: "liveJobStatus/getRapidoRiderDropDownList",
      loadLiveJobStatusList: "liveJobStatus/loadLiveJobStatusList",
    }),
    closeDialog() {
      this.$store.state.liveJobStatus.updateRouteSettingsDialog = false;
    },
    commonToast(severity, summary, message) {
      this.isSupervisorAssign = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    loadInitialTableData() {
      let searchValue =
        this.saerchValue != "" && this.saerchValue != null
          ? [this.searchKey, this.saerchValue]
          : [];
      let paginationParams = {
        globalsearchkey: searchValue,
        bike: this.paginationParams,
        van: this.paginationParams,
        rapido: this.paginationParams,
        currentTab: this.currentTab,
      };
      this.loadLiveJobStatusList(paginationParams);
    },
    async submitData() {
      if (this.objectLenght > 0) {
        if (this.selectedTab === "BikeTab") {
          this.updated = {
            jobs: this.selectedvalue,
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: this.zoneList.id,
            van_zone_id: null,
            rapido_zone_id: null,
            bike_route_id: this.routeList.id,
            van_route_id: null,
            rapido_route_id: null,
            bike_trip_id: this.tripList.id,
            van_trip_id: null,
            rapido_trip_id: null,
          };
        } else if (this.selectedTab === "VanTab") {
          this.updated = {
            jobs: this.selectedvalue,
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: null,
            van_zone_id: this.zoneList.id,
            rapido_zone_id: null,
            bike_route_id: null,
            van_route_id: this.routeList.id,
            rapido_route_id: null,
            bike_trip_id: null,
            van_trip_id: this.tripList.id,
            rapido_trip_id: null,
          };
        } else if (this.selectedTab === "RapidoTab") {
          this.updated = {
            jobs: this.selectedvalue,
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: null,
            van_zone_id: null,
            rapido_zone_id: this.zoneList.id,
            bike_route_id: null,
            van_route_id: null,
            rapido_route_id: this.routeList.id,
            bike_trip_id: null,
            van_trip_id: null,
            rapido_trip_id: this.tripList.id,
          };
        }
        let response = await this.saveUpdateRouteSettings(this.updated);
        if (response.status == 200) {
          this.loadInitialTableData();
          let info = "Updated Route Settings successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to Updated Route Settings";
          this.commonToast("error", "Error", info);
        }
        this.$store.state.liveJobStatus.updateRouteSettingsDialog = false;
        this.submitted = true;
      } else {
        if (this.selectedTab === "BikeTab") {
          this.updatedPayload = {
            jobs: [this.emittedUpdateRouteSettingsData.id],
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: this.zoneList.id,
            van_zone_id: null,
            rapido_zone_id: null,
            bike_route_id: this.routeList.id,
            van_route_id: null,
            rapido_route_id: null,
            bike_trip_id: this.tripList.id,
            van_trip_id: null,
            rapido_trip_id: null,
          };
        } else if (this.selectedTab === "VanTab") {
          this.updatedPayload = {
            jobs: [this.emittedUpdateRouteSettingsData.id],
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: null,
            van_zone_id: this.zoneList.id,
            rapido_zone_id: null,
            bike_route_id: null,
            van_route_id: this.routeList.id,
            rapido_route_id: null,
            bike_trip_id: null,
            van_trip_id: this.tripList.id,
            rapido_trip_id: null,
          };
        } else if (this.selectedTab === "RapidoTab") {
          this.updatedPayload = {
            jobs: [this.emittedUpdateRouteSettingsData.id],
            home_address: this.homeAddress,
            job_date: this.jobDate,
            rider_id: this.riderList.id,
            bike_zone_id: null,
            van_zone_id: null,
            rapido_zone_id: this.zoneList.id,
            bike_route_id: null,
            van_route_id: null,
            rapido_route_id: this.routeList.id,
            bike_trip_id: null,
            van_trip_id: null,
            rapido_trip_id: this.tripList.id,
          };
        }
        let response = await this.saveUpdateRouteSettings(this.updatedPayload);
        if (response.status === 200) {
          this.loadInitialTableData();
          let info = "Updated Route Settings successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to Updated Route Settings";
          this.commonToast("error", "Error", info);
        }
        this.$store.state.liveJobStatus.updateRouteSettingsDialog = false;
        this.submitted = true;
      }
    },
  },
  watch: {
    getriderDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "BikeTab") {
        this.riderList = this.getriderDropDownListArray.find(
          (x) => x.rider.id === this.emittedUpdateRouteSettingsData.rider.id
        );
      }
    },
    getVanRiderDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "VanTab") {
        this.riderList = this.getVanRiderDropDownListArray.find(
          (x) => x.rider.id === this.emittedUpdateRouteSettingsData.rider.id
        );
      }
    },
    getRapidoRiderDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "RapidoTab") {
        this.riderList = this.getRapidoRiderDropDownListArray.find(
          (x) => x.rider.id === this.emittedUpdateRouteSettingsData.rider.id
        );
      }
    },
    getZoneDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "BikeTab") {
        this.zoneList = this.getZoneDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.zone.id
        );
      }
    },
    getZoneVanDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "VanTab") {
        this.zoneList = this.getZoneVanDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.zone.id
        );
      }
    },
    getZoneRapidoDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "RapidoTab") {
        this.zoneList = this.getZoneRapidoDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.zone.id
        );
      }
    },
    getTripDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "BikeTab") {
        this.tripList = this.getTripDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.trip.id
        );
      }
    },
    getTripVanDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "VanTab") {
        this.tripList = this.getTripVanDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.trip.id
        );
      }
    },
    getTripRapidoDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "RapidoTab") {
        this.tripList = this.getTripRapidoDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.trip.id
        );
      }
    },
    getRouteDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "BikeTab") {
        this.routeList = this.getRouteDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.route.id
        );
      }
    },
    getVanRouteDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "VanTab") {
        this.routeList = this.getVanRouteDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.route.id
        );
      }
    },
    getRapidoRouteDropDownListArray: async function (newVal, oldVal) {
      if (this.selectedTab === "RapidoTab") {
        this.routeList = this.getRapidoRouteDropDownListArray.find(
          (x) => x.id === this.emittedUpdateRouteSettingsData.route.id
        );
      }
    },
    zoneList: async function (newVal, oldVal) {
      if (this.selectedTab === "BikeTab") {
        this.getRouteDropDownList(newVal.id);
      } else if (this.selectedTab === "VanTab") {
        this.getVanRouteDropDownList(newVal.id);
      } else if (this.selectedTab === "RapidoTab") {
        this.getRouteRapidoDropDownList(newVal.id);
      }
    },
  },
  mounted() {
    this.getRiderDropDownList();
    this.getZoneDropDownList(this.selectedTab);
    this.getTripDropDownList(this.selectedTab);
    this.getVanRiderDropDownList();
    this.getRapidoRiderDropDownList();
    this.selectedvalue = this.emitMultipleData.map((c) => {
      return c.id;
    });
    this.objectLenght = Object.keys(this.emitMultipleData).length;
    if(this.emittedUpdateRouteSettingsData.job_date!=null){

      this.jobDate = moment(this.emittedUpdateRouteSettingsData.job_date).format(
        "MM/DD/YYYY, hh:mm A"
      );
    }
    if(this.emittedUpdateRouteSettingsData.job_date==null){

      this.jobDate = moment(new Date()).format(
        "MM/DD/YYYY, hh:mm A"
      );
    }
    this.homeAddress = this.emittedUpdateRouteSettingsData.home_address;
  },
  computed: {
    ...mapGetters({
      getriderDropDownListArray: "liveJobStatus/getBikeRiderDropDownListArray",
      getZoneDropDownListArray: "liveJobStatus/getZoneDropDownListArray",
      getZoneVanDropDownListArray: "liveJobStatus/getZoneVanDropDownListArray",
      getZoneRapidoDropDownListArray:
        "liveJobStatus/getZoneRapidoDropDownListArray",
      getTripDropDownListArray: "liveJobStatus/getTripDropDownListArray",
      getRouteDropDownListArray: "liveJobStatus/getBikeRouteDropDownListArray",
      getVanRouteDropDownListArray:
        "liveJobStatus/getVanRouteDropDownListArray",
      getRapidoRouteDropDownListArray:
        "liveJobStatus/getRapidoRouteDropDownListArray",
      getLiveJobExpansionListArray:
        "liveJobStatus/getLiveJobExpansionListArray",
      getVanRiderDropDownListArray:
        "liveJobStatus/getVanRiderDropDownListArray",
      getRapidoRiderDropDownListArray:
        "liveJobStatus/getRapidoRiderDropDownListArray",
      getTripVanDropDownListArray: "liveJobStatus/getTripVanDropDownListArray",
      getTripRapidoDropDownListArray:
        "liveJobStatus/getTripRapidoDropDownListArray",
    }),
  },
  unmounted() {},
  async created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.required {
  color: $color-7a7a7a !important;
}

.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

.add-item,
.add-item > i {
  color: #1e90ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.add-item > i {
  font-size: 10px !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 30vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 42vh;
  overflow: auto;
}

::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 27px;
  align-items: center;
  margin-left: 20px;
}
.track-status-code {
  color: #ebbd46;
  font-weight: 600;
  font-size: 17.9045px;
}
</style>
