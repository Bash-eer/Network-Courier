<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="items"
      v-model:activeIndex="activeIndex"
    />
    <Card>
      <template #content>
        <component :is="selectedTab.component" />
      </template>
    </Card>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import Card from "primevue/card";
import EmergencySurcharges from "./EmergencySurcharges/index.vue";
import RestrictedCharges from "./RestrictedCharges/index.vue";
import RemoteAreaCharges from "./RemoteAreaCharges/index.vue";
import OverweightCharges from "./OverweightCharges/index.vue";

export default {
  components: {
    TabMenu,
    Card,
    EmergencySurcharges,
    RestrictedCharges,
    RemoteAreaCharges,
    OverweightCharges,
  },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          label: "Emergency Surcharges",
          component: "EmergencySurcharges",
        },
        {
          label: "Restricted Country Charges",
          component: "RestrictedCharges",
        },
        {
          label: "Overweight Charges",
          component: "OverweightCharges",
        },
        {
          label: "Remote Area Charges",
          component: "RemoteAreaCharges",
        },
      ],
      selectedTab: {
        label: "Emergency Surcharges",
        component: "EmergencySurcharges",
      },
    };
  },
  watch: {
    activeIndex(value) {
      if (this.items[value]) {
        this.selectedTab = this.items[value];
      }
    },
  },
  methods: {},
};
</script>

<style>
</style>