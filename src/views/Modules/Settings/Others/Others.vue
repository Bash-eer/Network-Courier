<template>
  <div class="">
    <OthersTabs
      v-bind:tabMenuData="tabMenuData"
      type="othersHome"
      defaultTab="Competitors"
      storePath="others"
      :overlayData="$store.state['others']['OthersOverlayData']"
    />
  </div>
  <!-- Dialogs -> Express -->
  <OthersDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['others'].dialogComponent"
  />
   <Toasts
    :severity="$store.state['others'].severity"
    :summary="$store.state['others'].summary"
  />
</template>


<script>
/// Dialog import
import Toasts from "../../../../components/Settings/Sales/Others/Toasts.vue"
import OthersDialogs from "../../../../components/Settings/Sales/Others/Dialog.vue";
import OthersTabs from "../../../../components/Settings/Sales/Others/Tabs/Otherstabs.vue";
import {othersTabMenuData} from "../../../../components/Settings/Sales/Others/const/const.js"
//Dialog

export default {
  components: {
    OthersTabs,
    OthersDialogs,
    Toasts
  },
  data: ()=>({
    tabMenuData: othersTabMenuData
  }),
  created(){

  }
};
</script>

<style scoped>
</style>