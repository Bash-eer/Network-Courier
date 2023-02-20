<template>
  <!-- header -->
  <div class="">
    <div
      class="
        mt-4
        pl-4
        font-size-18
        bold-700
        justify-content-start
        flex
        color-4e5968
      "
    >
      Clearance Mode
    </div>
    <div class="flex">
      <InternationalRegularTabs :tabMenuData="headerTabMenuData" />
    </div>
    <!-- <div class="flex w-100 justify-content-between "> -->
    <!-- tabs -->
    <div>
      <!-- <InternationalRegularTabs
        v-if="
          $store.state.internationalInbound.internationalMainTab != 'Others'
        "
        :tabMenuData="tabMenuData"
        type="ClearanceTabs"
      /> -->
    </div>
  </div>
</template>

<script>
import {
  InternationalInboundClearanceModeTabMenuData,
  InternationalInboundClearanceModeOrOthersTabMenuData,
} from "../../const.js";
export default {
  data: () => ({
    tabMenuData: InternationalInboundClearanceModeTabMenuData,
    headerTabMenuData: InternationalInboundClearanceModeOrOthersTabMenuData,
  }),
  methods: {
    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "internationalInbound") {
        this.$store.dispatch("internationalInbound/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["internationalInbound/controlActivityDialog"];
      }
    },
  },
  // created() {
  //   this.$store.dispatch("internationalInbound/loadClearanceModeTabs", {
  //     path: "services/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
  //     type: "addClearanceModeData",
  //   });
  // },
};
</script>

<style scoped></style>
