<template>
  <div>
    <div class="color-4e5968 font-size-16 bold-700 flex justify-content-start">2-Tier Rates</div>
    <div class="flex justify-content-start align-items-center mt-4">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <div class="mt-3">
      <keep-alive>
        <component :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Weight from "./Weight/index.vue";
import Quantity from "./Quantity/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectButton, Weight, Quantity },
  data() {
    return {
      tabs: [
        { tab: "Charge by Weight", component: "Weight" },
        { tab: "Charge by Quanity", component: "Quantity" },
      ],
      selectedTab: { tab: "Charge by Weight", component: "Weight" },
    };
  },
  watch: {
    inValidTab(value) {
      if (value) {
        if (value.key == "rates") {
          switch (value.tabKey) {
            case "box_count_charges":
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