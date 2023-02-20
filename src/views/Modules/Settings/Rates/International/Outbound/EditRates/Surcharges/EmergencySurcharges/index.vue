<template>
  <div>
    <div
      class="
        color-4e5968
        font-size-18
        bold-700
        flex
        justify-content-start
        ml-3
        mb-3
      "
    >
      Emergency Area Surcharges
    </div>
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
import { mapActions } from "vuex";

export default {
  components: { SelectButton, Normal, Multiplier },
  data() {
    return {
      tabs: [
        { tab: "Normal", component: "Normal", name: "emergency_n" },
        { tab: "Multiplier", component: "Multiplier", name: "emergency_m" },
      ],
      selectedTab: { tab: "Normal", component: "Normal", name: "emergency_n" },
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
    this.setCurrentTab({ edit: "imp_edit", data: "emergency_n" });
  },
};
</script>

<style>
.p-card .p-card-content {
  padding-top: 0 !important;
}
</style>