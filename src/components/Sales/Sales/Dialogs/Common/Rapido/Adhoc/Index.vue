<template>
  <div>
    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-343434 mt-2 mb-0">Cost Per Unit</p>
    </div>
    <div class="formgrid grid ml-3">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Customer Type
        </h5>
        <DropDown
          :disabled="true"
          code="name"
          :state="details.customer_type"
          :key="details.customer_type"
          :data="customer_type"
          v-on:childToParent="getUserInput"
          label="customer_type"
          v-model="details.customer_type"
          :class="{
            'p-invalid': v$.details.customer_type.$invalid && submitted,
            'inputfield w-full text-900 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Business Method
        </h5>
        <DropDown
          :disabled="true"
          code="name"
          :data="business_type"
          label="business_type"
          :state="details.business_type"
          :key="details.business_type"
          v-on:childToParent="getUserInput"
          v-model="details.business_type"
          :class="{
            'p-invalid': v$.details.business_type.$invalid && submitted,
            'inputfield w-full text-900 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid ml-3">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Status</h5>
        <DropDown
          :data="status"
          placeholder="Please Select"
          :state="details.status"
          :key="details.status"
          code="name"
          v-model="details.status"
          optionDisabled="disable"
          v-on:childToParent="getUserInput"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid':
              v$.details.status.$invalid &&
              $store.state.salesRapidoAdhoc.rapidoAdhocSubmitted,
            'inputfield w-full text-900 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Priority</h5>
        <DropDown
          :data="priority"
          placeholder="Please Select"
          :state="details.priority"
          :key="details.priority"
          code="name"
          v-model="details.priority"
          v-on:childToParent="getUserInput"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid':
              v$.details.priority.$invalid &&
              $store.state.salesRapidoAdhoc.rapidoAdhocSubmitted,
            'inputfield w-full text-900 font-bold ': true,
          }"
        />
      </div>
    </div>

    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-343434 mt-4 mb-0">Delivery Type</p>
    </div>
    <div
      class="
        flex flex-row
        justify-content-between
        align-items-center
        ml-2
        
      "
      :key="$store.state.salesRapidoAdhoc.RapidoRowData?.id"
    >
      <RadioButtons
        label="platform"
        :state="roleDetails.selectedCategory"
        v-bind:radioButtonData="DeliveryCategories"
        v-model="roleDetails.selectedCategory"
        :selectedRadioButton="selectedRadioButton"
        labelclass="DeliveryCategories"
      />
    </div>
    <div>
      <span v-if="roleDetails.selectedCategory == 'On-Demand Service'">
        <SalesAdhocDemandService />
      </span>
      <span v-if="roleDetails.selectedCategory == 'E-Commerce'">
        <SalesAdhocEcommerce
          :mainDetails="details"
          :mainDetailsValidation="v$.$invalid"
          :RadioButtonValue="roleDetails.selectedCategory"
        />
      </span>
    </div>
  </div>
</template>
<script>
import SalesAdhocDemandService from "../../Rapido/Adhoc/DemandService.vue";
import SalesAdhocEcommerce from "../../Rapido/Adhoc/Ecommerce.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "RapidoAdhocQuatition",
  data: () => ({
    selectedRadioButton: null,
    v$: useVuelidate(),
    details: {
      customer_type: "",
      hideCategory: null,
      business_type: "",
      status: "",
      priority: "",
    },
    DeliveryCategories: [
      { name: "On-Demand Service", key: "BK" },
      { name: "E-Commerce", key: "VN" },
    ],
    SalesDialogCategoriesOnDemandService: [
      { name: "On-Demand Service", key: "BK" },
    ],
    SalesDialogCategoriesEcommerce: [{ name: "E-Commerce", key: "VN" }],
    customer_type: [
      { name: "Rapido", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Adhoc", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    status: [],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    roleDetails: {
      role_name: "",
      BikeCategory: "",
      user_type: "",
      selectedCategory: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        priority: { required },
      },
    };
  },
  methods: {
    SalesDialogCategoriesHandler() {
      if (this.hideCategory == "E-Commerce") {
        return this.SalesDialogCategoriesOnDemandService;
      } else if (this.hideCategory == "On-Demand Service") {
        return this.SalesDialogCategoriesEcommerce;
      } else {
        return this.DeliveryCategories;
      }
      // return this.SalesDialogCategories;
    },
    getUserInput() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      let payload = {
        status: this.details.status,
        profile_id: this.$route.params.id,
        e_commerce:
          this.roleDetails.selectedCategory == "E-Commerce" ? true : false,
        on_demand_service:
          this.roleDetails.selectedCategory == "Ondemand" ? true : false,
        priority: this.details.priority,
      };
      this.$store.dispatch("salesRapidoAdhoc/createQuotationRapidoAdhoc", {
        data: payload,
      });
    },
  },
  watch: {
    v$: function () {
      if (this.details.status != "" && this.details.priority != "") {
        this.$store.state.salesRapidoAdhoc.rapidoStepValidation = false;
      }
      if (this.details.region == "" || this.details.rate_card_name == "") {
        this.$store.state.salesRapidoAdhoc.rapidoStepValidation = this.v$;
      }
    },
    "$store.state.salesRapidoAdhoc.RapidoRowData": function () {
      this.details.status =
        this.$store.state.salesRapidoAdhoc.RapidoRowData.status;
      this.details.priority =
        this.$store.state.salesRapidoAdhoc.RapidoRowData?.rapido_adhoc_specifics?.priority;
    },
    "v$.$invalid": function () {
      console.log(this.v$.$invalid);
      let payload = {};
      console.log(payload, "payload");
      if (!this.v$.$invalid)
        setTimeout(() => {
          this.$store.dispatch("salesRapidoAdhoc/createQuotationRapidoAdhoc", {
            data: {
              status: this.details.status,
              profile_id: this.$route.params.id,
              e_commerce:
                this.roleDetails.selectedCategory == "E-Commerce"
                  ? true
                  : false,
              on_demand_service:
                this.roleDetails.selectedCategory == "Ondemand" ? true : false,
              priority: this.details.priority,
            },
          });
        }, 1000);
    },
    "$store.state.salesRapidoAdhoc?.RapidoAdhocEditData.id": function () {
      this.$store.dispatch("salesRapidoAdhoc/loadRowData", {
        path:
          "/sales/quotations/overview/" +
          this.$store.state.salesRapidoAdhoc.RapidoAdhocEditData.id,
      });
    },
    "$store.state.salesRapidoAdhoc.RapidoRowData.id": function () {
      if (this.$store.state.salesRapidoAdhoc?.RapidoRowData?.id) {
        console.log(RapidoRowData, "....................");
        const { RapidoRowData } = this.$store.state.salesRapidoAdhoc;
        const { e_commerce } = RapidoRowData.rapido_adhoc_specifics;
        this.roleDetails.selectedCategory =
          e_commerce == true ? "E-Commerce" : "On-Demand Service";
        if (e_commerce == true) {
          this.roleDetails.selectedCategory = this.DeliveryCategories[1].name;
        } else {
          this.roleDetails.selectedCategory = this.DeliveryCategories[0].name;
        }
        const { status, priority } = RapidoRowData;
        this.details.status = status;
        this.details.priority = priority;
        this.selectedRadioButton = this.DeliveryCategories[1];
      }
    },
  },
  // watch: {
  //   "$store.state.salesRapidoAdhoc.RapidoRowData.id": function () {
  //     if (this.$store.state.salesRapidoAdhoc?.RapidoRowData?.id) {
  //       console.log(RapidoRowData, "....................");
  //       const { RapidoRowData } = this.$store.state.salesRapidoAdhoc;
  //       const { e_commerce } = RapidoRowData.rapido_adhoc_specifics;
  //       this.roleDetails.selectedCategory =
  //         e_commerce == true ? "E-Commerce" : "On-Demand Service";
  //       if (e_commerce == true) {
  //         this.roleDetails.selectedCategory = this.DeliveryCategories[1].name;
  //       } else {
  //         this.roleDetails.selectedCategory = this.DeliveryCategories[0].name;
  //       }
  //       const { status, priority } = RapidoRowData;
  //       this.details.status = status;
  //       this.details.priority = priority;
  //       this.selectedRadioButton = this.DeliveryCategories[1];
  //     }
  //   },
  // },
  created() {
    if (this.$store.state.salesRapidoAdhoc.RapidoRowData?.id) {
      const { RapidoRowData } = this.$store.state.salesRapidoAdhoc;
      const { e_commerce } = RapidoRowData.rapido_adhoc_specifics;
      this.roleDetails.selectedCategory =
        e_commerce == true ? "E-Commerce" : "On-Demand Service";
      if (e_commerce == true) {
        this.roleDetails.selectedCategory = this.DeliveryCategories[1].name;
      } else {
        this.roleDetails.selectedCategory = this.DeliveryCategories[0].name;
      }
      const { status, priority } = RapidoRowData;
      this.details.status = status;
      this.details.priority =
        this.$store.state.salesRapidoAdhoc.RapidoRowData.rapido_adhoc_specifics.priority;
      this.selectedRadioButton = this.DeliveryCategories[1];
      this.status = [
        { name: "New", code: "New", disable: false },
        { name: "Approved", code: "Approved", disable: false },
        { name: "Rejected", code: "Rejected", disable: false },
        { name: "Hold", code: "Hold", disable: false },
        { name: "Conclude", code: "Conclude", disable: true },
        { name: "Quote", code: "Quote", disable: false },
      ];
    } else {
      this.status = [{ name: "New", code: "New", disable: false }];
      this.roleDetails.selectedCategory = this.DeliveryCategories[0].name;
    }
    this.details.status = this.status[0].name;

    this.$store.state.sales.stepperNavigation = null;
    // this.roleDetails.selectedCategory = this.DeliveryCategories.map((i) => {
    //   return i.name;
    // });
    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;
  },
  unmounted() {
    this.$store.state.salesRapidoAdhoc.RapidoRowData = {};
    this.$store.state.salesRapidoAdhoc.RapidoAdhocEditData = {};
  },

  components: {
    SalesAdhocDemandService,
    SalesAdhocEcommerce,
  },
};
</script>

<style scoped>
::v-deep .p-radiobutton-checked + label {
  color: rgb(25, 108, 218) !important;
  /* background: red; */
}
/* .DeliveryCategories .p-field-radiobutton  */
</style>
