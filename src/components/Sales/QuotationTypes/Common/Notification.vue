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
      <Button @click="clickHandler()">{{ NotificationData.button }}</Button>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import { salesCommon } from "../../../../store/helper";
export default {
  components: {
    Button,
  },
  props: ["status", "check", "loadData"],
  data() {
    return {
      NotificationData: {},
      // INTERNATIONAL:CONTRACT
      // {
      //   image: "/images/brownTick.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please complete by clicking create contract",
      //   button: "Create Contracts",
      //   bg: "bg-fbeeaa",
      // },
      // {
      //   image: "/images/brownTick.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please complete by clicking create contract",
      //   button: "Create Contracts",
      //   bg: "bg-fbeeaa",
      // },

      // EXPRESS:RAPIDO
      // {
      //   image: "/images/brownTick.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please Send the Contract information to the customer",
      //   button: "Activate",
      //   bg: "bg-fbeeaa",
      // },

      // EXPESS:CONTRACT
      //   {
      //   image: "/images/brownTick.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please Complete Bill Settings to Complete Contract ",
      //   button: "Create Contract",
      //   bg: "bg-fbeeaa",
      // },

      //   express:contract, international:agent   bg color is lightrose
      //   {
      //   image: "/images/brownTick.png",
      //   title: "Contract  Signed by  the Customer",
      //   subTitle: "Please Click the activate button to activat the customer in contract",
      //   button: "Activate",
      //   bg: "bg-ead9ff",
      // },

      // Express:contract-edit
      //   {
      //   image: "/images/brownTick.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please Complete Bill Settings to Complete Contract ",
      //   button: "Create Contract",
      //   bg: "bg-fbeeaa",
      // },

      // INTERNATIONAL:AGENT-default
      // {
      //   image: "/images/group.png",
      //   title: "Customer has approved the quotation",
      //   subTitle: "Please Send the Contract information to the customer",
      //   button: "Send Contract Information",
      //   bg: "bg-fbeeaa",
      // },
    };
  },
  methods: {
    ...salesCommon,
    clickHandler() {
      if (this.check) {
        this.$emit("Promote");
      } else {
        this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path: "/sales/quotations/promotetocontract/" + this.$route.params.id,
          method: "POST",
          id: this.$route.params.id,
          type: this.$route.params.type,
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The contract activated successfully!`,
              toastSeverity: "info",
            },

            // toastDuplicateErrorData: {
            //   toastMsg: `The Rate card  already exist !`,
            //   toastSeverity: "error",
            // },
            toastCommonErrorData: {
              toastMsg: "There was an error in activating contract, try again!",
              toastSeverity: "error",
            },
          },
          // loadData: "loadRapidoAdhocOverviewData",
          loadData: this.loadData,
        });
      }
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
    // if (this.status == "Conclude" || this.status == "Concluded") {
    //   this.NotificationData = {
    //     image: "/images/brownTick.png",
    //     title: "Customer has approved the quotation",
    //     subTitle: "Please Send the Contract information to the customer",
    //     button: "Activate",
    //     bg: "bg-fbeeaa",
    //   };
    // }
  },
};
</script>

<style scoped>
.fsr-create-contact {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
}
</style>
