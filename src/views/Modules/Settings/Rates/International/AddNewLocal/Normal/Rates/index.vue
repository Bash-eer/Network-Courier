<template>
  <div>
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
        <component :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Bike from "./Bike/index.vue";
import Van from "./Van/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectButton, Bike, Van },
  data() {
    return {
      tabs: [
        { tab: "Bike", component: "Bike" },
        { tab: "Van", component: "Van" },
      ],
      selectedTab: { tab: "Bike", component: "Bike" },
    };
  },
  watch: {
    inValidTab(value) {
      if (value) {
        if (value.key == "rates") {
          switch (value.tabKey) {
            case "bike_rates":
              this.selectedTab = this.tabs[0];
              break;
            case "van_rates":
              this.selectedTab = this.tabs[1];
              break;
            default:
              this.selectedTab = this.tabs[1];
              break;
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      inValidTab: "AddNewInternationalLocal/inValidTab",
    }),
  },
};
</script>

<style>
</style>