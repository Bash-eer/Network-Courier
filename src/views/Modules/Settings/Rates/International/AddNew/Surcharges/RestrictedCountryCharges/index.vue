<template>
  <div :key="selectedTab">
    <div class="title flex justify-content-start">
      Restricted Country Charges
    </div>
    <div class="flex justify-content-start align-items-center mt-4">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <div class="mt-5">
      <keep-alive>
        <component :tab="selectedTab" :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Normal from "./Normal/index.vue";
import Multiplier from "./Multiplier/index.vue";
import BaseSetMultiplier from "./BaseSetMultiplier/index.vue";
import { mapGetters } from "vuex";
export default {
  components: { Normal, Multiplier, SelectButton, BaseSetMultiplier },
  data() {
    return {
      tabs: [
        { tab: "Normal", component: "Normal", storeKey: "normal" },
        { tab: "Multiplier", component: "Multiplier", storeKey: "multiplier" },
        {
          tab: "Base Rate Multiplier",
          component: "BaseSetMultiplier",
          storeKey: "base_rate_multiplier",
        },
      ],
      selectedTab: {
        tab: "Normal",
        component: "Normal",
        storeKey: "normal",
      },
    };
  },
  watch: {
    inValidTab() {
      if (this.inValidTab.tab == "restrictedCountry") {
        this.selectedTab = this.tabs.find(
          (list) => list.storeKey === this.inValidTab.type
        );
      }
    },
  },
  computed: {
    ...mapGetters({
      inValidTab: "AddNewInternational/Surcharges/inValidTab",
    }),
  },
};
</script>

<style>
</style>