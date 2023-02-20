<template>
  <Dialog
    v-model:visible="$store.state['LiveMapStore'].filterHeaderDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
      backgroundColor: color(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
    :closable="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="font-size-16 color-4e5968 dialog-header">
            Map Data Filter
          </h4>
        </div>
      </div>
    </template>

    <MapFilterComponent :JobTypedata="JobTypedata" :logisticsData="logistics" @updateSelectedCheckBox="updateSelectedCheckBoxFunct" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import MapFilterComponent from "./MapFilterComponent.vue";
export default {
  name: "MapFilterDialog",
  props: ["dialogComponent", "emittedJobTypeData", "editCountryValue"],
  components: {
    Dialog,
    MapFilterComponent,
  },
  data() {
    return {
      JobTypedata: {
        express: false,
        rapido: false,
        international: false,
      },
      logistics: {
        bike: false,
        van: false,
        rapido: false,
      },
    };
  },
  methods: {
    updateSelectedCheckBoxFunct(paramValue){
      this.JobTypedata = paramValue.jobTypeValue;
      this.logistics = paramValue.logisticsValue;
    },
    getHeight() {
      return "50vh";
    },
    color() {
      return "white";
    },
    getWidth() {
      return "60vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
</style>
