<template>
  <Dialog
    v-model:visible="$store.state['CrmFeedback'].displayFollowUpDialog"
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
            {{ feedbackFollowUpData?.id ? "Edit Follow Up" : "Add Follow Up" }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component
      v-bind:is="dialogComponent"
      class="tab"
      :expandedData="expandedData"
    >
    </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import FollowUpFeedback from "./Dialogs/followUpFeedback.vue";
export default {
  name: "FollowupMainDialog",
  props: ["dialogComponent", "expandedData"],
  components: {
    Dialog,
    FollowUpFeedback,
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {},
    getWidth() {
      return "70vw";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      feedbackFollowUpData: "CrmFeedback/getFollowUpData",
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
