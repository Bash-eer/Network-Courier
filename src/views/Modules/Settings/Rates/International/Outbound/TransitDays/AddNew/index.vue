<template>
  <div>
    <Card>
      <template #header>
        <div class="flex align-items-center justify-content-between">
          <div class="left-content flex align-items-center">
            <div
              @click="returnToList"
              class="pi pointer icon pi-arrow-left"
            ></div>
            <div class="text ml-3">Add New</div>
          </div>
          <div class="right-content flex align-items-center">
            <Buttons
              icon="pi pi-download"
              label="Import"
              button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn"
              v-on:childToParent="redirect('internationalCountryList')"
            />
          </div>
        </div>
      </template>
      <template #content>
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
      </template>
    </Card>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Card from "primevue/card";
import Document from "./document.vue";
import Parcel from "./parcel.vue";

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
      this.$router.push({ name: "TransitDays" });
    },
  },
};
</script>

<style scoped>
:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}
</style>