<template>
  <div>
    <div class="color-4e5968 font-size-18 bold-700 flex justify-content-start ml-3 mb-3">Restricted Area Surcharges</div>
    <div class="flex justify-content-start align-items-center ml-3">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <div class="mt-5">
      <keep-alive>
        <component :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Normal from "./Normal/index.vue";
import Multiplier from "./Multiplier/index.vue";
import BaseSetMultiplier from "./BaseSetMultiplier/index.vue";
import { mapActions } from "vuex";

export default {
  components: { SelectButton, Normal, Multiplier, BaseSetMultiplier },
  data() {
    return {
      tabs: [
        { tab: "Normal", component: "Normal", name: "restricted_charges_n" },
        {
          tab: "Multiplier",
          component: "Multiplier",
          name: "restricted_charges_m",
        },
        {
          tab: "Base Set Multiplier",
          component: "BaseSetMultiplier",
          name: "restricted_charges_bsm",
        },
      ],
      selectedTab: {
        tab: "Normal",
        component: "Normal",
        name: "restricted_charges_n",
      },
    };
  },
  watch: {
    selectedTab(value) {
      this.setCurrentTab({ edit: "imp_edit", data: value.name });
    },
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
    }),
  },
  created() {
    this.setCurrentTab({ edit: "imp_edit", data: "restricted_charges_n" });
  },
};
</script>

<style>
</style>