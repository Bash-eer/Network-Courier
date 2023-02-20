<template>
  <Card class="RegionsCard">
    <template #title>
      <div class="flex justify-content-between">
        <div class="flex flex-row">
          <div class="flex align-self-center ml-1 mr-4">
            <span>
              <i class="pi pi-arrow-left ml-2" />
            </span>
          </div>
          <div class="flex align-self-center">
            {{ $store.state.masters.expressRegion }}
          </div>
        </div>
        <div class="flex flex-row">
          <div class="flex align-self-center mr-2">
            <Buttons
              button_class="p-button-sm add-btn custom-add-btn p-button-outlined"
              label="Export All"
            />
          </div>
          <div class="flex align-self-center">
            <Buttons
              button_class="p-button-sm mr-2 add-btn custom-add-btn"
              label="Add New"
            />
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <div>
        <RatesTabs
          v-bind:tabMenuData="
            $store.state.masters.expressRatesRegionTabMenuData
          "
          type="expressRatesRegion"
        />
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
export default {
  name: "Regions",
  components: {
    Card,
  },
};
</script>

<style>
.RegionsCard .p-card-body {
  padding-right: 0 !important;
  padding-left: 0 !important;
  padding-bottom: 0 !important;
}
</style>
