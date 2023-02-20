<template>
  <div :key="renderkey">
    <div class="flex flex-row flex-wrap card-container blue-container my-auto">
      <div class="flex font-bold border-round mt-2">
        <Checkbox v-model="manualChecked" :binary="true" />
        <h6 class="pl-2 color-1e90ff text-nowrap">Custom Allotment</h6>
      </div>
    </div>
    <div class="flex flex-row formgrid grid">
      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          mb-2
          border-round
          px-0
          field
          col-6
          md:col-6
        "
      >
        <h5 class="color-7a7a7a bold-500 flex font-size-14 indent">
          Zone <b class="color-red pl-2"> &#42; </b>
        </h5>

        <Dropdown
          :disabled="!manualChecked"
          v-model="selectedType"
          :options="getZonesData"
          optionLabel="name"
          :filter="true"
          class="w-100 text-left"
        />
      </div>

      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          mb-2
          border-round
          pl-3
          field
          col-6
          md:col-6
        "
      >
        <h5 class="color-7a7a7a bold-500 flex font-size-14 indent">Route</h5>
        <Dropdown
          :disabled="!manualChecked"
          v-model="selectedRoute"
          :options="getRoutesData"
          optionLabel="name"
          :filter="true"
          class="w-100 text-left"
        />
      </div>
    </div>
    <div class="flex flex-row formgrid grid">
      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          mb-2
          border-round
          px-0
          field
          col-6
          md:col-6
        "
      >
        <h5 class="color-7a7a7a bold-500 flex font-size-14 indent">
          Service Type <b class="color-red pl-2"> &#42; </b>
        </h5>

        <Dropdown
          v-model="selectedServiceTypeDelivery"
          :options="serviceTypeDelivery"
          optionLabel="name"
          placeholder="Cost Center Name"
          class="w-100 text-left"
        />
      </div>

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          mb-2
          border-round
          pl-3
          field
          col-6
          md:col-6
        "
      >
        <h5 class="color-7a7a7a bold-500 flex font-size-14 indent">
          Job Priority
        </h5>
        <Dropdown
          v-model="selectedJob"
          @change="jobPriority(selectedJob)"
          :options="jobPriorityData"
          optionLabel="name"
          placeholder="Cost Center Name"
          :filter="true"
          class="w-100 text-left"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";
import Checkbox from "primevue/checkbox";
export default {
  name: "JobSettingAccordian",
  props: ["chargeType", "selectedLogistics"],
  components: { Checkbox, Dropdown },
  data() {
    return {
      sn: "",
      su: "",
      un: "",
      uu: "",
      rtn: "",
      manualChecked: false,
      renderkey: 10,
      // selectedLogistics: null,
      selectedType: "",
      selectedJob: null,
      selectedRoute: "",
      surchargeRate: "",
      selectedMode: "",
      selectedSurcharge: "",
      jobPriorityData: [],
      selectedServiceTypeDelivery: "",
      serviceTypeDelivery: [
        { name: "Document", code: "document" },
        { name: "Parcel", code: "parcel" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getCrmBookingData: "Masscollection/getCrmBookingData",
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      getZonesData: "Masscollection/getZonesData",
      getRoutesData: "Masscollection/getRoutesData",
      getjobPriorityList: "CustomerLaunchStore/getjobPriorityList",
      getEcomDataDropdown: "Masscollection/getEcomDataDropdown",
      massCollectionPayloadData: "Masscollection/massCollectionPayloadData",
    }),
  },
  methods: {
    ...mapActions({
      getCrmBookingDetails: "Masscollection/getCrmBookingDetails",
      loadZonesData: "Masscollection/loadZonesData",
      loadRoutesData: "Masscollection/loadRoutesData",
      getJobPriorityListDropDownApi:
        "CustomerLaunchStore/getJobPriorityListDropDownApi",
    }),
    jobPriority(data) {},
  },
  async created() {
    if (this.chargeType == "Normal") {
      await this.getJobPriorityListDropDownApi();
    }
    this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
  },
  watch: {
    getjobPriorityList: function (newList, oldList) {
      if (newList != oldList && this.chargeType == "Normal") {
        this.jobPriorityData = this.getjobPriorityList;
        this.selectedJob = this.getjobPriorityList
          ? this.getjobPriorityList[0]
          : null;
      }
    },
    getEcomDataDropdown: function (newList, oldList) {
      if (newList != oldList && this.chargeType == "E-Commerce") {
        this.jobPriorityData = this.getEcomDataDropdown;
        this.selectedJob = this.getEcomDataDropdown
          ? this.getEcomDataDropdown[0]
          : null;
      }
    },
    selectedServiceTypeDelivery: function (newList, oldList) {
      if (newList?.name != oldList?.name) {
        this.massCollectionPayloadData["service_type"] = newList?.name;
      }
    },
    selectedLogistics: function (newList, oldList) {
      if (newList?.id != oldList?.id) {
        let data = {
          type: this.selectedLogistics?.logistic_mode.toLowerCase(),
        };
        this.loadZonesData(data).then((s) => {
          this.selectedType = this.getZonesData ? this.getZonesData[0] : null;
        });
        this.massCollectionPayloadData["logistics_mode"] = newList?.name;
      }
    },
    selectedType: function (newList, oldList) {
      if (newList?.id != oldList?.id) {
        let data = {
          type: this.selectedLogistics?.logistic_mode.toLowerCase(),
          id: newList?.id,
        };
        this.loadRoutesData(data).then((s) => {
          this.selectedRoute = this.getRoutesData
            ? this.getRoutesData[0]
            : null;
        });
      }
      if (this.selectedLogistics.name == "Bike") {
        this.massCollectionPayloadData["bike_zone_id"] = newList?.id;
        this.massCollectionPayloadData["van_zone_id"] = null;
        this.massCollectionPayloadData["rapido_zone_id"] = null;
      } else if (this.selectedLogistics.name == "Van") {
        this.massCollectionPayloadData["van_zone_id"] = newList?.id;
        this.massCollectionPayloadData["bike_zone_id"] = null;
        this.massCollectionPayloadData["rapido_zone_id"] = null;
      } else if (this.selectedLogistics.name == "Rapido") {
        this.massCollectionPayloadData["rapido_zone_id"] = newList?.id;
        this.massCollectionPayloadData["bike_zone_id"] = null;
        this.massCollectionPayloadData["van_zone_id"] = null;
      }
    },
    selectedJob: function (newList, oldList) {
      if (newList?.name != oldList?.name) {
        this.massCollectionPayloadData["job_priority"] = newList?.name;
      }
    },
    selectedRoute: function (newList, oldList) {
      if (this.selectedLogistics.name == "Bike") {
        this.massCollectionPayloadData["bike_route_id"] = newList?.id;
        this.massCollectionPayloadData["van_route_id"] = null;
        this.massCollectionPayloadData["rapido_route_id"] = null;
      } else if (this.selectedLogistics.name == "Van") {
        this.massCollectionPayloadData["van_route_id"] = newList?.id;
        this.massCollectionPayloadData["bike_route_id"] = null;
        this.massCollectionPayloadData["rapido_route_id"] = null;
      } else if (this.selectedLogistics.name == "Rapido") {
        this.massCollectionPayloadData["rapido_route_id"] = newList?.id;
        this.massCollectionPayloadData["bike_route_id"] = null;
        this.massCollectionPayloadData["van_route_id"] = null;
      }
    },
    manualChecked: function (newList, oldList) {
      if (newList != oldList) {
        this.massCollectionPayloadData["custom_allotment"] = this.manualChecked;
      }
    },
  },
};
</script>

<style scoped>
::v-deep.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 1rem;
  border: 1px solid #dee2e6;
  color: #212121;
  background: #c7d9fc;
  font-weight: 600;
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.indent {
  text-indent: -3px;
}
.top {
  margin-top: 24px;
}
</style>