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
import { mapActions } from "vuex";

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
        { tab: "Bike", component: "Bike", name: "e_delivery_type_b" },
        { tab: "Van", component: "Van", name: "e_delivery_type_v" },
      ],
      selectedTab: {
        tab: "Bike",
        component: "Bike",
        name: "e_delivery_type_b",
      },
    };
  },
  watch: {
    selectedTab() {
      this.setCurrentTab({ edit: "local_edit", data: this.selectedTab.name });
    },
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
    }),
  },
  created() {
    this.setCurrentTab({ edit: "local_edit", data: "e_delivery_type_b" });
  },
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