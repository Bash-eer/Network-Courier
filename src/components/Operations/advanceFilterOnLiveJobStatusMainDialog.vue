<template>
  <Dialog
    v-model:visible="$store.state['liveJobStatus'].filterDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="font-size-16 color-4e5968 dialog-header">
            Advanced Filter - Live Job Status ({{selectedTab == 'BikeTab'? 'Bike': selectedTab == 'VanTab'? 'Van' : 'Rapido'}})
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component
      v-bind:is="dialogComponent"
      :selectedTab="selectedTab"
      :filterList="filterList"
      class="tab"
      
    >
    </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import AdvanceFilterDialog from "./AdvanceFilterLiveJobStatus/advanceFilterDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdvanceFilterDialogMain",
  props: ["selectedTab", "dialogComponent", "filterList"],
  methods: {
    ...mapActions({
      showAdvanceFilterDialog: "liveJobStatus/showFilterDialog",
    }),
    getHeight() {},
    getWidth() {
      return "50vw";
    },
  },
  components: {
    Dialog,
    AdvanceFilterDialog,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
.title-image {
  height: 25px;
  width: 25px;
  margin-left: 10px;
}

::v-deep .p-chips .p-chips-multiple-container .p-chips-token {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 4px;
}
</style>
