<template>
  <div>
    <div class="color-4e5968 font-size-16 bold-700 flex justify-content-start">Multi-Tier Charges</div>
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
import JobCount from "./JobCount/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectButton, Weight, JobCount },
  data() {
    return {
      tabs: [
        { tab: "Charge by Quantity", component: "Weight" },
        { tab: "Charge by Job Count", component: "JobCount" },
      ],
      selectedTab: { tab: "Charge by Quantity", component: "Weight" },
    };
  },
  watch: {
    inValidTab(value) {
      if (value) {
        if (value.key == "rates") {
          switch (value.tabKey) {
            case "charge_by_weight":
              this.selectedTab = this.tabs[0];
              break;
            case "charge_by_job_count":
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