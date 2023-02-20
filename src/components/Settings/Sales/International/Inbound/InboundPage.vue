<template>
  <InternationalSubTabs :tabMenuData="tabMenuData" />
  <!--toast-->
  <Toasts
    :severity="$store.state['internationalInbound'].toastData.severity"
    :summary="$store.state['internationalInbound'].toastData.summary"
  />
</template>

<script>
import InternationalSubTabs from "../Tabs/InternationalSubTabs.vue";
import { InternationalInboundPageTabMenuData } from "../const.js";
import Toasts from "../Inbound/Toasts.vue";
export default {
  data: () => ({
    tabMenuData: InternationalInboundPageTabMenuData,
  }),
  components: {
    InternationalSubTabs,
    Toasts,
  },
};
</script>

<style scoped>
::v-deep .p-datatable .p-datatable-thead > tr > th {
  color: #7e84a7 !important;
}
</style>
