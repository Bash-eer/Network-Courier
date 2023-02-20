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
import MultiTier from "./MultiTier/index.vue";
import TwoTier from "./TwoTier/index.vue";
import Charges from "./Charges/index.vue";
import { mapActions } from "vuex";

export default {
  components: {
    TabMenu,
    Card,
    Rates,
    Trips,
    MultiTier,
    Charges,
    TwoTier,
  },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          label: "Trips",
          component: "Trips",
          name: "normal_van_trips",
        },
        {
          label: "Rates",
          component: "Rates",
          name: "normal_van_rates",
        },
        {
          label: "2-Tier",
          component: "TwoTier",
          name: "normal_van_twotier",
        },
        {
          label: "Multi Tier Rates",
          component: "MultiTier",
          name: "normal_van_multi",
        },
        {
          label: "Van Customer Bike Charges",
          component: "Charges",
          name: "normal_van_box",
        },
      ],
      selectedTab: {
        label: "Trips",
        component: "Trips",
        name: "normal_van_trips",
      },
    };
  },
  watch: {
    activeIndex(value) {
      if (this.items[value]) {
        this.selectedTab = this.items[value];
        if (this.selectedTab.name !== "normal_van_twotier") {
          this.setCurrentTab({
            edit: "local_edit",
            data: this.selectedTab.name,
          });
        }
      }
    },
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
    }),
  },
  created() {
    this.setCurrentTab({ edit: "local_edit", data: "normal_van_trips" });
  },
};
</script>

<style>
</style>