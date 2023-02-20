<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="items"
      v-model:activeIndex="activeIndex"
    />
    <Card>
      <template #content>
        <div class="pt-2">
          <component :is="selectedTab.component" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import Card from "primevue/card";
import Rates from "./Rates/index.vue";
import Trips from "./Trips/index.vue";
import VanJob from "./VanJob/index.vue";
import { mapActions } from "vuex";

export default {
  components: {
    TabMenu,
    Card,
    Rates,
    Trips,
    VanJob,
  },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          label: "Rates",
          component: "Rates",
          name: "normal_bike_rates",
        },
        {
          label: "Trips",
          component: "Trips",
          name: "normal_bike_trips",
        },
        {
          label: "Bike Customer Van Job",
          component: "VanJob",
          name: "normal_bike_jobs",
        },
      ],
      selectedTab: {
        label: "Rates",
        component: "Rates",
        name: "normal_bike_rates",
      },
    };
  },
  watch: {
    activeIndex(value) {
      if (this.items[value]) {
        this.selectedTab = this.items[value];
        this.setCurrentTab({ edit: "local_edit", data: this.selectedTab.name });
      }
    },
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
    }),
  },
  created() {
    this.setCurrentTab({ edit: "local_edit", data: "normal_bike_rates" });
  },
};
</script>

<style>
</style>