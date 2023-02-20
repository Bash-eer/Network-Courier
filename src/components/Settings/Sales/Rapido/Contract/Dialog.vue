<template>
  <Dialog
    v-model:visible="$store.state['rapidoContract'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <!-- <div
          v-if="
            dialogComponent == 'TypeOneNewDialog' ||
            dialogComponent == 'TypeTwoNewDialog'
          "
          class="flex"
        >
          <h4 class="font-size-14">Add</h4>
        </div>
        <div class="flex flex-column" v-else>
          <span>{{ $store.state["salesSales"].dialogHeader }}</span>
          <span class="m-0 p-0 font-size-12 color-4e5968">{{
            $store.state["salesSales"].dialogHeaderId
          }}</span>
        </div> -->
        <div>
          {{ $store.state["rapidoContract"].dialogHeader }}
        </div>
        <div
          v-if="
            dialogComponent == 'TypeOneNewDialog' ||
            dialogComponent == 'TypeTwoNewDialog'
          "
          class="flex mr-3"
        >
          <div class="flex flex-column ml-3 p-0 mr-3">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Created On</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">{{ date }}</p>
          </div>
          <img
            :src="this.$store.state.commonStore.userDetails?.profile_url ?? ''"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Sales person</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">
              {{ this.$store.state.commonStore.loggedInUser ?? "" }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import moment from "moment";
//dialogs
import TypeOneNewDialog from "./Dialogs/TypeOneNewDialog.vue";
import TypeTwoNewDialog from "./Dialogs/TypeTwoNewDialog.vue";
import CloneRateCardDialog from "./Dialogs/CloneRateCard.vue";
export default {
  components: {
    Dialog,
    TypeOneNewDialog,
    TypeTwoNewDialog,
    CloneRateCardDialog,
  },
  data: () => ({
    date: "",
  }),
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (
        this.dialogComponent == "TypeTwoNewDialog" ||
        this.dialogComponent == "TypeOneNewDialog"
      ) {
        return "65vw";
      }
      return "50vw";
    },
  },
  created() {
    this.date = moment().format("D MMM YYYY");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.activityLogHeader {
  color: #7e84a7;
  font-size: 11px;
}
.dialogToggleText {
  font-weight: bold;
}
</style>
