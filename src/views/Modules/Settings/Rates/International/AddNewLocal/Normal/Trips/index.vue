<template>
  <div>
    <div class="title flex justify-content-start">Select Trips</div>
    <div class="flex justify-content-start align-items-center mt-4">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <div :key="renderKey" class="mt-5">
      <keep-alive>
        <component
          :tripsData="tripsData"
          :tab="selectedTab"
          :is="selectedTab.component"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Bike from "./Bike.vue";
import Van from "./van.vue";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { SelectButton, Bike, Van },
  data() {
    return {
      renderKey: 10,
      tripsData: [],
      tabs: [
        { tab: "Bike", component: "Bike" },
        { tab: "Van", component: "van" },
      ],
      selectedTab: { tab: "Bike", component: "Bike" },
    };
  },
  watch: {
    inValidTab(value) {
      if (value) {
        if (value.key == "trips") {
          switch (value.tabKey) {
            case "bike":
              this.selectedTab = this.tabs[0];
              break;
            case "van":
              this.selectedTab = this.tabs[1];
              break;
          }
        }
      }
    },
    headerFields: {
      handler() {
        this.getTripsData();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      inValidTab: "AddNewInternationalLocal/inValidTab",
      headerFields: "AddNewInternationalLocal/headerFields",
    }),
  },
  methods: {
    ...mapActions({
      getRegionTrips: "AddNewInternationalLocal/getRegionTrips",
    }),
    timeFormatter(data) {
      let formatted = moment(data).utc().format("HH:mm");
      if (formatted == "Invalid date") {
        return data.slice(0, -11);
      } else {
        return formatted;
      }
    },
    async getTripsData() {
      try {
        const res = await this.getRegionTrips(this.headerFields?.region_id);
        if (res) {
          this.tripsData = [];
          res.data?.results.map((list) => {
            this.tripsData.push({
              region_trip_id: list.id,
              from: this.timeFormatter(list?.from_time),
              to: this.timeFormatter(list?.to_time),
              trip_type: list.trip_type,
              trip_days: list.trip_days,
            });
          });

          this.renderKey++;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.headerFields?.region_id) this.getTripsData();
  },
};
</script>

<style scoped>
.table-container {
  background-color: #edf1f7;
  padding: 0.5rem 1rem;
}
</style>