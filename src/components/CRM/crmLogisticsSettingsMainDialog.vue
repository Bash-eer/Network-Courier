<template>
  <Dialog
    v-model:visible="$store.state['CrmSettings'].displayLogisticsDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
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
            {{
              logisticsSettingsData?.id
                ? "Edit Logistics Settings"
                : "New Logistics Settings"
            }}
          </h4>

        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <logisticsSettingsFields :filledData="filledData"  />
  </Dialog>
</template>

<script>

import Dialog from "primevue/dialog";
import { mapGetters } from "vuex";
import logisticsSettingsFields from './Dialogs/logisticsSettingsFields.vue';

export default {
  name: "CRMLogisticsSettingsMainDialog",
  props: ["dialogComponent"],
  components: {
    Dialog,
    logisticsSettingsFields,
  },
  data() {
    return {
      filledData : {},
    };
  },
  methods: {
    getHeight() {},
    getWidth() {
      return "60vw";
    },
  },
  computed: {
    ...mapGetters({
      feedbackSettingsData: "CrmSettings/getEditFeedbackSettingsData",
      CouponSettingsData: "CrmSettings/getEditCouponSettingsData",
      logisticsSettingsData: "CrmSettings/getEditLogisticsSettingsData"
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
::v-deep .p-chips .p-chips-multiple-container .p-chips-token {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 4px;
}
</style>
