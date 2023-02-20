<template>
  <div
    class="
      flex
      justify-content-between
      fsr-create-contact
      color-4e5868
      align-items-center
    "
    :class="NotificationData.bg"
  >
    <div class="flex my-3">
      <div>
        <img
          :src="NotificationData.image"
          alt="...img"
          class="fsr-create-contact-image mx-3"
        />
      </div>
      <div>
        <div class="font-size-16 line-height-20 express-international-font">
          {{ NotificationData.title }}
        </div>
        <div class="bold-400 font-size-14 line-height-17 mt-2">
          {{ NotificationData.subTitle }}
        </div>
      </div>
    </div>
    <div class="align-items-center justify-content-center mr-4">
      <Buttons
        class="my-2"
        label="Promote To Contract"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        @click="clickHandlerOpenDialog()"
      />
    </div>
  </div>

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesExpressContractVan'].dialogComponent"
  />
</template>

<script>
import { salesCommon } from "../../../../../../store/helper";
export default {
  components: {},
  props: ["status", "check"],
  data() {
    return {
      NotificationData: {},
    };
  },
  methods: {
    ...salesCommon,
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
      this.$store.state.salesCommon.promoteToContract = null;
    },

    clickHandlerOpenDialog() {
      this.clearStateData({ quotation_g_overView: null });
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "PromoteToContract",
          dialogHeader: "Promote To Contract",
        },
      }),
        (this.$store.state.salesCommon.promoteToContract =
          "salesInternationalContract/loadInternationalContractOverviewData");
      this.$store.getters["salesSales/controlActivityDialog"];
    },

    loadHandler() {
      // let data =
      //   this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData.status;
      if (
        this.status == "Approved" ||
        this.status == "Approve" ||
        this.status == "Accepted"
      ) {
        this.NotificationData = {
          image: "/images/brownTick.png",
          title: "Customer has approved the quotation",
          subTitle: "Please Send the Contract information to the customer",
          button: "Promote to Contract",
          bg: "bg-fbeeaa",
        };
      }
    },
  },
  watch: {
    "$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData.status":
      function () {
        this.loadHandler();
      },
  },
  created() {
    this.loadHandler();
  },
};
</script>

<style scoped>
.fsr-create-contact {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
}
</style>
