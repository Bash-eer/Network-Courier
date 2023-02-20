<template>
  <div>
    <Card>
      <template #header>
        <div class="flex align-items-center justify-content-between mb-2">
          <div class="left-content flex align-items-center">
            <div
              @click="returnToList"
              class="pi pointer icon pi-arrow-left"
            ></div>
            <div class="font-bold ml-3 color-343434">Transit Days (DHL)</div>
          </div>
          <div class="right-content flex align-items-center">
            <SearchField storePath="Outbound" class="mr-3" />
            <Buttons
              label="Export All"
              button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn color-357dea"
            />
            <Buttons
              label="Add New"
              button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
              v-on:childToParent="goToAddNew"
            />
          </div>
        </div>
      </template>
      <template #content class="mt-0 pt-0">
        <div class="flex justify-content-start align-items-center mt-0 pt-0">
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
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import SelectButton from "primevue/selectbutton";
import Document from "./Document/index.vue";
import Parcel from "./Parcel/index.vue";

export default {
  components: { Card, SelectButton, Document, Parcel },
  data() {
    return {
      tabs: [
        { tab: "Document", component: "Document" },
        { tab: "Parcel", component: "Parcel" },
      ],
      selectedTab: { tab: "Document", component: "Document" },
    };
  },
  methods: {
    returnToList() {
      this.$router.push({ name: "salesRates" });
    },
    goToAddNew() {
      this.$router.push({ name: "AddNewTransitDays" });
    },
  },
};
</script>

<style scoped>
:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}
::v-deep .p-card .p-card-content {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>