<template>
  <div>
    <Card>
      <template #content>
        <div class="flex justify-content-start align-items-center">
          <SelectButton
            v-model="selectedTab"
            optionLabel="tab"
            class="mr-5"
            :options="tabs"
          />
        </div>
      </template>
    </Card>

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
import Card from "primevue/card";

export default {
  components: {
    SelectButton,
    Bike,
    Van,
    Card,
  },
  data() {
    return {
      tabs: [
        { tab: "Bike", component: "Bike", name: "emergency_n" },
        { tab: "Van", component: "Van", name: "emergency_m" },
      ],
      selectedTab: { tab: "Bike", component: "Bike", name: "emergency_n" },
    };
  },

  methods: {},
};
</script>

<style scoped>
:deep .p-card-body {
  padding: 0 0 1rem 24px !important;
}

:deep .p-card-content {
  padding: 0 0 !important;
}
</style>