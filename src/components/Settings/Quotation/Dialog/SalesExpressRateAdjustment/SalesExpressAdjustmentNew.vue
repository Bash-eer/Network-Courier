<template>
<div>
  <SalesExpressAdjustmentTripDetails />
  <SalesExpressAdjustmentEcommerce />
  <SalesExpressAdjustmentBillingSettings />
  <SalesExpressAdjustmentBillingSettingsFooter />
</div>
</template>

<script>
import SalesExpressAdjustmentTripDetails from "./SalesExpressAdjustmentTripDetails.vue"
import SalesExpressAdjustmentEcommerce from "./SalesExpressAdjustmentEcommerce.vue"
import SalesExpressAdjustmentBillingSettings from "./SalesExpressAdjustmentBillingSettings.vue"
import SalesExpressAdjustmentBillingSettingsFooter from "./SalesExpressAdjustmentBillingSettingsFooter.vue"

export default {
  components: {
    SalesExpressAdjustmentTripDetails,
    SalesExpressAdjustmentEcommerce,
    SalesExpressAdjustmentBillingSettings,
    SalesExpressAdjustmentBillingSettingsFooter,
  },
}
</script>
<style>
</style>
