<template>
  <div>
    <Card>
      <template #content>
        <div class="flex justify-content-start align-items-center">
          <SelectButton
            v-model="selectedTab"
            optionLabel="tab"
            :options="tabs"
          />
        </div>
      </template>
    </Card>

    <div>
      <keep-alive>
        <component :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Quantity from "./Quantity/index.vue";
import Jobcount from "./Jobcount/index.vue";
import Card from "primevue/card";
import { mapActions } from "vuex";

export default {
  components: {
    SelectButton,
    Quantity,
    Jobcount,
    Card,
  },
  data() {
    return {
      tabs: [
        { tab: "Quantity", component: "Quantity", name: "normal_van_multi_q" },
        {
          tab: "Jobcount",
          component: "Jobcount",
          name: "normal_van_multi_j",
        },
      ],
      selectedTab: {
        tab: "Quantity",
        component: "Quantity",
        name: "normal_van_multi_q",
      },
    };
  },
  watch: {
    selectedTab(value) {
      this.setCurrentTab({ edit: "local_edit", data: value.name });
    },
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
    }),
  },
  created() {
    this.setCurrentTab({ edit: "local_edit", data: "normal_van_multi_q" });
  },
};
</script>

<style scoped>
:deep .p-card-body {
  padding: 1rem 0 0 0 !important;
}

:deep .p-card-content {
  padding: 0 0 !important;
}
</style>