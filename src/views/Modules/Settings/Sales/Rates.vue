<template>
  <div class="">
    <RatesTabs
      v-bind:tabMenuData="$store.state.rates.ratesTabMenuData"
      type="ratesHome"
      defaultTab="International"
      storePath=""
    />
  </div>
  <!-- Dialogs -> Express -->
  <ExpressAdhocDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressAdhoc'].dialogComponent"
  />
  <ExpressContractDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressContract'].dialogComponent"
  />
  <InternationalDialogs 
  v-on:childToParent="closeDialog"
  :dialogComponent="$store.state['internationalInbound'].dialogComponent"
  />
  <RapidoContractDialogs 
  v-on:childToParent="closeDialog"
  :dialogComponent="$store.state['rapidoContract'].dialogComponent"
  />
  <RapidoAdhocDialogs
  v-on:childToParent="closeDialog"
  :dialogComponent="$store.state['rapidoAdhoc'].dialogComponent"
  />
</template>

<script>
import RatesTabs from "../../../../components/Settings/Sales/Rates/Tabs/Tabs.vue";
//Dialogs
//Express
import ExpressAdhocDialogs from "../../../../components/Settings/Sales/Express/Adhoc/Dialog.vue";
import ExpressContractDialogs from "../../../../components/Settings/Sales/Express/Contract/Dialog.vue";
//International
import InternationalDialogs from "../../../../components/Settings/Sales/International/Inbound/Dialog.vue"
//Rapido
import RapidoContractDialogs from "../../../../components/Settings/Sales/Rapido/Contract/Dialog.vue"
import RapidoAdhocDialogs from "../../../../components/Settings/Sales/Rapido/Adhoc/Dialog.vue"
export default {
  components: {
    RatesTabs,
    ExpressAdhocDialogs,
    ExpressContractDialogs,
    InternationalDialogs,
    RapidoContractDialogs,
    RapidoAdhocDialogs,
  },
};
</script>

<style scoped></style>
