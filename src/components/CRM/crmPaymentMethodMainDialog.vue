<template>
  <Dialog
    v-model:visible="$store.state['CrmSettings'].paymentDisplayDialog"
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
              paymentSettingsData?.id
                ? "Edit Payment Method"
                : "Add Payment Method"
            }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import paymentSettings from "./Dialogs/paymentSettings.vue";
export default {
  name: "CRMPaymentMethodMainDialog",
  props: ["dialogComponent"],
  components: {
    Dialog,
    paymentSettings,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {},
    getWidth() {
      return "40vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      paymentSettingsData: "CrmSettings/getPaymentMethodSettingsData",
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
