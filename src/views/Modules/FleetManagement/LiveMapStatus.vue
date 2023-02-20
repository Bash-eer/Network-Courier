<template>
  <div class="flex flex-column md:flex-row card-container indigo-container">
    <div
      class="
        card
        flex
        borderClass
        align-items-center
        widthStart
        bg-white
        font-bold
        text-black
        m-2
      "
    >
      <div class="flex flex-row">
        <div class="flex m-2 mr-3 mt-4">
          <TextField
            v-model="searcher"
            placeholder="Search by Company Name"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm p-2 search-text"
            v-on:childToParent="globalSearcher"
            style="width: 300px"
          />
        </div>
        <div class="flex mt-4">
          <img
            :src="'/images/filter.png'"
            alt=""
            width="35"
            height="35"
            class="mr-4"
            @click="openFilters"
          />
        </div>
      </div>

      <div v-if="getListOfDataSet.length <= 0" >
        <div class="mt-8 nodata-class font-normal text-black">No Riders Availabel</div>
      </div>
      <div class="overflowScroll">
        <div v-for="items of getListOfDataSet" :key="items">
          <LiveMapCards
            :itemData="items"
            :selectedRiderId="selectedRiderId"
            @selectedRiderIdFun="selectedRiderIdFunct"
          />
        </div>
      </div>
    </div>
    <div
      class="
        card
        flex
        borderClass
        align-items-start
        justify-content-start
        widthEnd
        bg-white
        font-bold
        text-black
        m-2
      "
    >
      <div>
        <div class="flex ml-2 mt-4">
          <div class="flex flex-row flex-wrap">
            <div class="flex tabPills mr-6">
              <!-- tabs -->
              <ul
                class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
                id="pills-tab"
                role="tablist"
              >
                <li
                  class="nav-item"
                  role="presentation"
                  v-for="(tabs, index) of tabMenuData"
                  :key="tabs.label"
                >
                  <button
                    @click="tabChange(tabs)"
                    :class="
                      index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                    "
                    :id="'pills-' + tabs.label + '-tab'"
                    data-bs-toggle="pill"
                    :data-bs-target="'#pills-' + tabs.label"
                    type="button"
                    role="tab"
                    :aria-controls="'pills-' + tabs.label"
                    :aria-selected="index == 0 ? true : false"
                  >
                    {{ tabs.tabName }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tab-content tableSmall" id="pills-tabContent">
          <div
            v-for="(tabs, index) of tabMenuData"
            :key="tabs.label"
            :class="
              index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'
            "
            :id="'pills-' + tabs.label"
            role="tabpanel"
            :aria-labelledby="'pills-' + tabs.label + '-tab'"
          >
            <!-- dynamic component-->
          </div>
        </div>

        <div :key="renderValue">
          <GoogleMapComponents
            :positionData="
              currentTab === 'SupervisorCountTab'
                ? getRiderPosition
                : getRiderJobCoordinates
            "
            :type="currentTab === 'SupervisorCountTab' ? 'Rider' : 'JobTrip'"
            :jobArrangement="getJobStatusDataSet"
          />
        </div>
        <div
          class="flex flex-row m-4 justify-content-between flex-wrap widthEnds"
        >
          <div class="flex align-items-center justify-content-center">
            Job Status
          </div>
          <div
            class="flex align-items-center w-25 justify-content-center"
          ></div>

          <div class="flex align-items-center justify-content-center">
            <Calendar
              v-model="details.date"
              :showTime="true"
              hourFormat="12"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
              class="w-100"
              @blur="v$.details.date.$model;"
              :class="{
                'p-invalid': v$.details.date.$invalid,
              }"
            />
          </div>
          <div class="flex align-items-center justify-content-center">
            <ToggleButton
              v-model="checkedOptimize"
              onLabel="Optimize"
              class="borderRad"
              offLabel="Optimize"
            />
          </div>

          <div class="flex align-items-center justify-content-center">
            <ToggleButton
              @change="onChangeManual"
              v-model="checkedManualOptimize"
              onLabel="Manual Optimize"
              class="borderRad"
              offLabel="Manual Optimize"
            />
          </div>
        </div>

        <div>
          <DataTable
            tableName="fuelChargesTable"
            tableClass="p-datatable-md QuotationTabTable justify-content-center tableClass"
            :tableData="getJobStatusDataSet"
            :tableColumns="getJobStatusFieldSet"
            @reArrangedRows="reArrangedRowsFunct"
          />
        </div>
      </div>
    </div>
    <MapFilterDialog />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ToggleButton from "primevue/togglebutton";
import MapFilterDialog from "../../../components/FleetManagement/Dialog/MapFilterDialog.vue";
import LiveMapCards from "../../../components/FleetManagement/LiveMapCards.vue";
import DataTable from "../../../components/FleetManagement/DataTable/DataTable.vue";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import GoogleMapComponents from "../../../components/Dialogs/FleetManagement/Maps/GoogleMapComponent.vue";

export default {
  name: "LiveMapStatus",
  components: {
    LiveMapCards,
    MapFilterDialog,
    DataTable,
    GoogleMapComponents,
    ToggleButton,
  },
  data() {
    return {
      v$: useVuelidate(),
      searcher: "",
      defaultTabIndex: 0,
      filterDialog: false,
      selectedRiderId: "",
      details: {
        date: moment().format("MM/DD/YYYY hh:mm A"),
      },
      markers: [],
      openedMarkerID: null,
      places: [],
      currentPlace: null,
      center: { lat: 48.864716, lng: 2.349014 },
      currentTab: "ExpressTab",
      checkedOptimize: true,
      checkedManualOptimize: false,
      renderValue: 1
    };
  },

  validations() {
    return {
      details: {
        date: { required },
      },
    };
  },

  methods: {
    ...mapActions({
      editVanCustomerJob: "Outbound/Edit/editVanCustomerJob",
      loadRiderListData: "LiveMapStore/loadRiderListData",
      liveJobRiderFilterApi: "LiveMapStore/liveJobRiderFilterApi",
      loadTripDataBasedOnRider: "LiveMapStore/loadTripDataBasedOnRider",
      loadOptimizedCurrentRouteData:
        "LiveMapStore/loadOptimizedCurrentRouteData",
    }),

    async tabChange(tab) {
      this.currentTab = tab.label;

      if (tab.label === "HistoryTab") {
        let storeData = this.getListOfDataSet;
        if (storeData.length > 0) {
          let stateValue = storeData[0];
          let riderIdValue = stateValue.id;
          this.selectedRiderId = stateValue.id;
          let riderLatitude = stateValue.latitude;
          let riderLongitude = stateValue.longitude;

      let jobTripData = this.getJobStatusDataSet.length;
      let jobIdSet =
        jobTripData > 0
          ? this.getJobStatusDataSet
              .filter((res) => {
                if (res.status === "Assigned") {
                  return res.id;
                }
              })
              .map((c) => c.id)
          : [];

          let postData = {
            liveLocation: {
              latitude: riderLatitude,
              longitude: riderLongitude,
            },
            optimize: this.checkedOptimize,
            jobIds: this.checkedManualOptimize ? jobIdSet : [],
            manualOptimize: this.checkedManualOptimize,
            riderId: Number(riderIdValue),
            date: moment(this.details.date).format("YYYY-MM-DD"),
          };

          this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
        }
      }
    },

    async reArrangedRowsFunct(dataArray) {
      let stateValue = this.getListOfDataSet;

      let findSelectedObj = stateValue.find((c) => {
        return c.id === this.selectedRiderId;
      });

      let jobTripData = dataArray.length;
      let jobIdSet =
        jobTripData > 0
          ? dataArray
              .filter((res) => {
                if (res.status === "Assigned") {
                  return res.id;
                }
              })
              .map((c) => c.id)
          : [];

      if (findSelectedObj &&
        Object.keys(findSelectedObj).length > 0 &&
        this.currentTab === "HistoryTab"
      ) {
        let riderIdValue = findSelectedObj.id;
        let riderLatitude = findSelectedObj.latitude;
        let riderLongitude = findSelectedObj.longitude;

        let postData = {
          liveLocation: {
            latitude: riderLatitude,
            longitude: riderLongitude,
          },
          optimize: this.checkedOptimize,
          jobIds: this.checkedManualOptimize ? jobIdSet : [],
          manualOptimize: this.checkedManualOptimize,
          riderId: Number(riderIdValue),
          date: moment(this.details.date).format("YYYY-MM-DD"),
        };

        await this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
      }
    },
    setPlace(place) {
      this.currentPlace = place;
      this.navigateToPlace();
    },
    navigateToPlace() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };

        this.center = marker;
        this.geolocate();
      }
    },
    geolocate: function () {
      let place = this;
      navigator.geolocation.getCurrentPosition((position) => {
        if (this.currentPlace) {
          this.center = {
            lat:
              place.currentPlace?.geometry.location.lat() ||
              position.coords.latitude,
            lng:
              place.currentPlace?.geometry.location.lng() ||
              position.coords.longitude,
          };
        }
      });
    },

    openMarker(val, id) {
      this.center = val;
      this.openedMarkerID = id;
    },
    closeMarker() {
      this.openedMarkerID = null;
    },

    async selectedRiderIdFunct(riderId) {
      this.selectedRiderId = riderId;
      let data = {
        rider_id: riderId,
        job_date: moment(this.details.date).format("YYYY/MM/DD"),
      };
      await this.loadTripDataBasedOnRider(data);

      let stateValue = this.getListOfDataSet;

      let findSelectedObj = stateValue.find((c) => {
        return c.id === riderId;
      });

      let jobTripData = this.getJobStatusDataSet.length;
      let jobIdSet =
        jobTripData > 0
          ? this.getJobStatusDataSet
              .filter((res) => {
                if (res.status === "Assigned") {
                  return res.id;
                }
              })
              .map((c) => c.id)
          : [];

      if (findSelectedObj && Object.keys(findSelectedObj).length > 0) {
        let riderIdValue = findSelectedObj.id;
        let riderLatitude = findSelectedObj.latitude;
        let riderLongitude = findSelectedObj.longitude;

        let postData = {
          liveLocation: {
            latitude: riderLatitude,
            longitude: riderLongitude,
          },
          optimize: this.checkedOptimize,
          jobIds: this.checkedManualOptimize ? jobIdSet : [],
          manualOptimize: this.checkedManualOptimize,
          riderId: Number(riderIdValue),
          date: moment(this.details.date).format("YYYY-MM-DD"),
        };

        await this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
      }
    },

    openFilters() {
      this.filterDialog = true;
      this.$store.state["LiveMapStore"].filterHeaderDialog = true;
    },
  },
  watch: {
    checkedOptimize: function (newV, oldV) {
      if (newV) {
        this.checkedManualOptimize = false;
      } else {
        this.checkedOptimize = false;
        this.checkedManualOptimize = true;
      }

      let stateValue = this.getListOfDataSet;

      let findSelectedObj = stateValue.find((c) => {
        return c.id === this.selectedRiderId;
      });

      let jobTripData = this.getJobStatusDataSet.length;
      let jobIdSet =
        jobTripData > 0
          ? this.getJobStatusDataSet
              .filter((res) => {
                if (res.status === "Assigned") {
                  return res.id;
                }
              })
              .map((c) => c.id)
          : [];

      if (findSelectedObj &&
        Object.keys(findSelectedObj).length > 0 &&
        this.currentTab === "HistoryTab"
      ) {
        let riderIdValue = findSelectedObj.id;
        let riderLatitude = findSelectedObj.latitude;
        let riderLongitude = findSelectedObj.longitude;

        let postData = {
          liveLocation: {
            latitude: riderLatitude,
            longitude: riderLongitude,
          },
          optimize: this.checkedOptimize,
          jobIds: this.checkedManualOptimize ? jobIdSet : [],
          manualOptimize: this.checkedManualOptimize,
          riderId: Number(riderIdValue),
          date: moment(this.details.date).format("YYYY-MM-DD"),
        };

        this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
      }
    },

    checkedManualOptimize: function (newV, oldV) {
      if (newV) {
        this.checkedOptimize = false;
      } else {
        (this.checkedManualOptimize = false), (this.checkedOptimize = true);
      }

      let stateValue = this.getListOfDataSet;

      let findSelectedObj = stateValue.find((c) => {
        return c.id === this.selectedRiderId;
      });

      let jobTripData = this.getJobStatusDataSet.length;
      let jobIdSet =
        jobTripData > 0
          ? this.getJobStatusDataSet
              .filter((res) => {
                if (res.status === "Assigned") {
                  return res.id;
                }
              })
              .map((c) => c.id)
          : [];

      if ( findSelectedObj &&
        Object.keys(findSelectedObj).length > 0 &&
        this.currentTab === "HistoryTab"
      ) {
        let riderIdValue = findSelectedObj.id;
        let riderLatitude = findSelectedObj.latitude;
        let riderLongitude = findSelectedObj.longitude;

        let postData = {
          liveLocation: {
            latitude: riderLatitude,
            longitude: riderLongitude,
          },
          optimize: this.checkedOptimize,
          jobIds: this.checkedManualOptimize ? jobIdSet : [],
          manualOptimize: this.checkedManualOptimize,
          riderId: Number(riderIdValue),
          date: moment(this.details.date).format("YYYY-MM-DD"),
        };

        this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
      }
    },

    ["details.date"]: function (newVal, oldVal) {
      let updatedDate = moment(newVal).format("YYYY/MM/DD");
      let data = {
        rider_id: this.selectedRiderId,
        job_date: updatedDate,
      };
      this.loadTripDataBasedOnRider(data);
    },
    getListOfDataSet: function (newVal, oldVal) {
      let riderIdValue = newVal[0]?.id;
      let riderLatitude = newVal[0]?.latitude;
      let riderLongitude = newVal[0]?.longitude;
      let postData = {
        liveLocation: {
          latitude: riderLatitude,
          longitude: riderLongitude,
        },
        optimize: this.checkedOptimize,
        jobIds: [],
        manualOptimize: this.checkedManualOptimize,
        riderId: riderIdValue,
        date: moment(this.details.date).format("YYYY-MM-DD"),
      };

      this.loadOptimizedCurrentRouteData(postData);
          this.renderValue += 1;
    },
  },
  computed: {
    ...mapGetters({
      getListOfDataSet: "LiveMapStore/getListOfDataSet",
      getJobStatusDataSet: "LiveMapStore/getJobStatusDataSet",
      getJobStatusFieldSet: "LiveMapStore/getJobStatusFieldSet",
      getRiderPosition: "LiveMapStore/getRiderPosition",
      getRiderJobCoordinates: "LiveMapStore/getRiderJobCoordinates",
      tabMenuData: "LiveMapStore/getStatusSettingsTabMenuData",
      getStoredOptimizeData: "LiveMapStore/getStoredOptimizeData",
    }),
  },
  created() {
    this.currentTab = "SupervisorCountTab";
    this.$store.state.users.breadcrumbPath = `Operations > Transfer Jobs`;
  },
  async mounted() {
    this.geolocate();
    this.loadRiderListData();

    if (this.getListOfDataSet.length > 0) {
      let riderIdValue = this.getListOfDataSet[0].id;
      this.selectedRiderId = riderIdValue;
      this.details.date = moment().format("MM/DD/YYYY hh:mm A");
      let data = {
        rider_id: riderIdValue,
        job_date: moment().format("YYYY/MM/DD"),
      };
      await this.loadTripDataBasedOnRider(data);
    }
  },
};
</script>

<style>
.borderClass {
  height: 115vh !important;
  border-radius: 10px;
}

.widthStart {
  width: 30%;
}

.widthEnd {
  width: 70%;
  height: max-content !important;
}

.borderCard {
  border: 1px solid #ced4da;
  border-radius: 3px;
}

.overflowScroll {
  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 6px;
  border-radius: 6px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  background: rgba(206, 212, 218, 1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(206, 212, 218, 1);
}
.map-autocomplete-container {
  position: absolute;
  top: 50px;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.search-container {
  height: 61px;
  background: #ffffff;
  border: 1px solid #e0e4eb;
  border-radius: 6px;
  width: 80%;
  padding: 20px;
  outline: none;
}
::v-deep .p-calendar-w-btn .p-inputtext {
  border: 1px solid #c4c4c4;
  border-right: none;
  height: 50px;
}

.widthEnds {
  width: 90% !important;
}

.tableClass {
  margin: 0 !important;
}

.tableSmall {
  margin-top: 1% !important;
}

.borderRad {
  border-radius: 30px !important;
  height: 40px;
  width: 130px;
  font-size: 12px !important;
}

.nodata-class {
  letter-spacing: 2px;
}
</style>
