<template>
  <!-- header -->
  <div class="flex justify-content-between mt-3 ml-3 mr-2">
    <div class="flex">
      <p class="Header-Style ml-2 mt-2 mb-0">Permit Charges</p>
    </div>
  </div>
  <!-- tabs -->
  <PermitChargeTabs :tabMenuData="tabMenuData" />
</template>
<script>
import PermitChargeTabs from "../../Tabs/PermitChargeTabs";
// import InternationalRegularTabs from "../../Tabs/InternationalRegularTabs.vue"
import { InternationalInboundPermitChargesTabMenuData } from "../../const.js";
export default {
  data: () => ({
    tabMenuData: InternationalInboundPermitChargesTabMenuData,
  }),
  components: {
    PermitChargeTabs,
  },
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
};
</script>

<style scoped>
.Header-Style {
  font-weight: 700;
  font-size: 18px;
  color: #4e5968;
}
.buttons_position {
  position: absolute;
  top: 47%;
  right: 1%;
}
</style>
