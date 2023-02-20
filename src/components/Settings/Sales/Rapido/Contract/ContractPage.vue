<template>
  <!-- <div class="flex flex-row m-3">
      <div class="rapido-contract-name">Rapido Contract Rates</div>
    </div> -->
  <RapidoSubTabs :tabMenuData="tabMenuData" />
  <!--toast-->
  <Toasts
    :severity="$store.state['geoFencing'].toastData.severity"
    :summary="$store.state['geoFencing'].toastData.summary"
  />
</template>

<script>
import RapidoSubTabs from "../Tabs/RapidoSubTabs.vue";
import {RapidoContractPageTabMenuData} from "../const/const.js";
import Toasts from "./Toasts.vue";
export default {
  data: () => ({
    tabMenuData: RapidoContractPageTabMenuData,
  }),
  components: {
    RapidoSubTabs,
    Toasts,
  },
};
</script>

<style scoped>
.rapido-contract-name {
  font-weight: bold;
  font-size: 16px;
  color: #4e5968;
}
</style>
