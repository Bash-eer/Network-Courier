<template>
  <br />
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Costing Details</p>
  </div>
  <div v-for="(sales, index) of addSales" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <div class="formgrid ml-3">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Detail Type</h5>

          <DropDown
            code="name"
            :data="detail_type"
            label="detail_type"
            v-model="details['contract'][index].detail_type"
            :state="details['contract'][index].detail_type"
            :classes="{
              'p-invalid':
                v$.details['contract'][index].detail_type.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Unit Price</h5>
          <TextField
            label="unit_price"
            type="number"
            v-model="details['contract'][index].unit_price"
            :classes="{
              'p-invalid':
                v$.details['contract'][index].unit_price.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Quanity</h5>
          <TextField
            label="quantity"
            type="number"
            v-model="details['contract'][index].quantity"
            :classes="{
              'p-invalid':
                v$.details['contract'][index].quantity.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="formgrid ml-3">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Amount</h5>
        <TextField
          label="amount"
          type="number"
          v-model="details['contract'][index].amount"
          :classes="{
            'p-invalid':
              v$.details['contract'][index].amount.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-12 ml-3">
      <h5 class="dialog-contact-header">Description</h5>
      <TextAreaField
        label="description"
        type="text"
        v-model="details['contract'][index].description"
        :classes="{
          'p-invalid':
            v$.details['contract'][index].description.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="flex mb-2">
    <span class="dialog-new-field mt-0" @click="addSale"
      ><b>+ Add Contact </b></span
    >
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales" />
      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "FSRCostingDetailsDialog",
  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    addSales: ["new_sales"],
    salesValidation: [
      {
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
      },
    ],
    details: {
      contract: [
        {
          detail_type: "",
          unit_price: "",
          quantity: "",
          amount: "",
          description: "",
        },
      ],
    },
    submitted: false,
    detail_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
  }),

  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          contract: this.salesValidation,
        },
      };
    }
  },

  computed: {
    ...mapGetters({
      CostingDetails:
        "salesExpressContractFSR/ExpressContractFsrOverviewEditData",
    }),
  },

  methods: {
    goBackHandler() {
      this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
        step: "FSRSelectMethodDialog",
      });
    },

    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.salesExpressContractFSR.quotationDetails.push(
          this.details.contract
        );
        this.$store.state.salesExpressContractFSR.FSRCostingDetails =
          this.details.contract;
        this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
          step: "FSRSendQuotationsDialog",
        });
      }
    },

    addSale() {
      this.details.contract.push({
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      });
      this.salesValidation.push({
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
      });
      this.addSalesClicked++;
      this.addSales.push("new_sales");
    },
    deleteRate(index) {
      this.details.contract.splice(index, 1);
      this.salesValidation.splice(index, 1);
      this.addSales.splice(index, 1);
      this.addSalesClicked++;
    },
  },

  created() {
    if (this.CostingDetails) {
      this.details.contract = this.CostingDetails.express_contract[0].fsr;
    }
  },
  unmounted() {
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData =
      null;
  },
};
</script>
<style></style>
