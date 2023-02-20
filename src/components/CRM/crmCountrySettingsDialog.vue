<template>
  <Dialog
    v-model:visible="$store.state['CrmSettings'].displayCountryDialog"
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
            {{
              documentDetailSettingsData?.id
                ? "Edit Countries Settings"
                : "Add New Countries Settings"
            }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <countrySettingsDialog
      v-bind:is="dialogComponent"
      :emittedJobTypeData="emittedJobTypeData"
      :editCountryValue="editCountryValue"
      class="tab"
    />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import countrySettingsDialog from "./Dialogs/countrySettingsDialog.vue";
export default {
  name: "CRMCountrySettingsMainDialog",
  props: ["dialogComponent", "emittedJobTypeData", "editCountryValue"],
  components: {
    Dialog,
    countrySettingsDialog,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {
      return "90vh";
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
