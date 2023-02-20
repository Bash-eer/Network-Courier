<template>
  <div>
    <div class="flex justify-content-start align-items-center">
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
import Normal from "./Normal/index";
import Multiplier from "./Multiplier/index";
import { mapActions } from "vuex";

export default {
  components: { SelectButton, Normal, Multiplier },
  data() {
    return {
      tabs: [
        { tab: "Normal", component: "Normal", name: "document_parcel_n" },
        {
          tab: "Multiplier",
          component: "Multiplier",
          name: "document_parcel_m",
        },
      ],
      selectedTab: {
        tab: "Normal",
        component: "Normal",
        name: "document_parcel_n",
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
    this.setCurrentTab({ edit: "imp_edit", data: "document_parcel_n" });
  },
};
</script>

<style>
</style>