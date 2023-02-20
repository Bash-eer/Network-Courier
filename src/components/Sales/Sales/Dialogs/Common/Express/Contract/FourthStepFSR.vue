<script>
// import Accordion from "primevue/accordion";
// import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../DuoSelect.vue";
import Checkbox from "primevue/checkbox";
import { mapActions, mapState } from "vuex";
import {
  expressContract,
  expressContractState,
} from "../../../../../../../store/helper";

export default {
  name: "SalesExpressContractFSRFourthStep",
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    addScaleClicked: 0,
    addSalesClicked: 10,
    fsr_validation: [
      {
        unit_price: { required },
        amount: { required },
        quantity: { required },
        detail_type: { required },
        description: { required },
      },
    ],
    first_validation: [],
    fsr_details: [
      {
        unit_price: "",
        amount: "",
        quantity: "",
        detail_type: "",
        description: "",
      },
    ],
    first_month_details: [],
    details: {
      rates: [
        {
          detail_type: "",
          unit_price: "",
          amount: "",
          quantity: "",
          description: "",
        },
      ],
      first_month_rates: [],
      first_month: false,
    },
    detail_type: [
      { name: "Minimum", code: "Minimum" },
      { name: "Additional", code: "Additional" },
      { name: "Special", code: "Special" },
      { name: "FTZ", code: "FTZ" },
      { name: "Standard Entry", code: "Standard Entry" },
      { name: "Others", code: "Others" },
    ],
  }),
  validations() {
    if (this.addScaleClicked > -1) {
      return {
        details: {
          rates: this.fsr_validation,
          first_month_rates: this.first_validation,
        },
      };
    }
  },
  computed: {
    ...expressContractState,
    ...mapState({
      finalData: (state) => state.salesExpressContract.payloadPost,
    }),
  },
  async created() {
    if (this.overViewData && this.overViewData.express_contract[0]?.fsr) {
      this.prefillData();
    }
  },
  async mounted() {},
  methods: {
    ...expressContract,
    goBackHandler() {
      this.navigateStepper({
        step: this.expressContractStep[this.expressStep - 1].component,
      });
      this.$store.state.salesExpressContract.flowStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    addDetails() {
      let detail = {
        detail_type: "",
        unit_price: "",
        amount: "",
        quantity: "",
        description: "",
      };
      let detail_check = {
        unit_price: { required },
        amount: { required },
        quantity: { required },
        detail_type: { required },
        description: { required },
      };
      this.details.rates.push(detail);
      this.fsr_validation.push(detail_check);
      if (this.details.first_month) {
        // this.details.first_month_rates.push(detail);
        // this.first_validation.push(detail_check);
        this.selectFirst();
      }
      this.addScaleClicked++;
    },
    deleteRate(index) {
      this.details.rates.splice(index, 1);
      this.fsr_validation.splice(index, 1);
      if (this.details.first_month) {
        this.details.first_month_rates.splice(index, 1);
        this.first_validation.splice(index, 1);
        // this.selectFirst();
      }
      this.addScaleClicked++;
    },
    selectFirst() {
      if (this.details.first_month) {
        this.details.first_month_rates = [];
        this.details.rates.map((i) => {
          this.details.first_month_rates.push({
            detail_type: i.detail_type,
            unit_price: i.unit_price,
            amount: i.amount,
            quantity: i.quantity,
            description: i.description,
          });
        });
        this.first_validation = [];
        this.first_validation = this.fsr_validation;
        // this.details.first_month_rates =this.details.rates
      } else {
        this.first_validation = [];
        this.details.first_month_rates = [];
      }
    },
    getUserInput() {
      this.setExpressContractData({
        key: "quotation",
        key1: "costing_details",
        key2: "fsr",
        value: this.details,
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        this.getUserInput();
        this.navigateStepper({
          step: this.expressContractStep[this.expressStep + 1].component,
        });
        this.$store.state.salesExpressContract.flowStep++;
      }
    },
    async prefillData() {
      let detail = this.overViewData?.express_contract[0] ?? {};
      if (detail.fsr) {
        let fsr = detail?.fsr_rates[0] ?? {};
        this.details.first_month = fsr.first_month;
        this.fsr_validation = [];
        this.details.rates = [];
        fsr.rates.map((i) => {
          this.details.rates.push({
            detail_type: i.detail_type,
            unit_price: i.unit_price,
            amount: i.amount,
            quantity: i.quantity,
            description: i.description,
          });
          this.fsr_validation.push({
            unit_price: { required },
            amount: { required },
            quantity: { required },
            detail_type: { required },
            description: { required },
          });
        });
        if (fsr.first_month) {
          this.details.first_month_rates = [];
          fsr.first_month_rates.map((i) => {
            this.details.first_month_rates.push({
              detail_type: i.detail_type,
              unit_price: i.unit_price,
              amount: i.amount,
              quantity: i.quantity,
              description: i.description,
            });
          });
          this.first_validation = this.fsr_validation;
        }
      }
    },
  },
  components: {
    // DuoSelection,
    Checkbox,
    // RadioButton,
  },
};
</script>
<template>
  <div :key="addSalesClicked" class="mt-6">
    <p class="bold-700 font-size-12 color-343434 mb-5">Costing Details (FSR)</p>
    <div class="row" v-for="(item, index) of details.rates" :key="index">
      <div class="formgrid grid">
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Detail Type</label
          >
          <DropDownField
            :value="item.detail_type"
            code="name"
            :data="detail_type"
            label="detail_type"
            v-model="item.detail_type"
            :class="{
              'p-invalid':
                v$.details.rates[index]?.detail_type?.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Unit Price</label
          >
          <TextField
            label="unit_price"
            type="number"
            v-model="item.unit_price"
            :classes="{
              'p-invalid':
                v$.details.rates[index]?.unit_price?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500">Quantity</label>
          <TextField
            label="quantity"
            type="number"
            v-model="item.quantity"
            :classes="{
              'p-invalid':
                v$.details.rates[index]?.quantity?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Amount
          </label>
          <TextField
            label="amount"
            type="number"
            v-model="item.amount"
            :classes="{
              'p-invalid':
                v$.details.rates[index]?.amount?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid row">
        <div class="field col-11">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Description
          </label>
          <TextAreaField
            label="Description"
            type="text"
            v-model="item.description"
            :classes="{
              'p-invalid':
                v$.details.rates[index]?.description?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div
          v-if="details.rates.length != 1"
          @click="deleteRate(index)"
          class="pi pi-times pointer pl-4 mb-3 col-1 align-self-center"
        ></div>
      </div>
    </div>
    <div class="flex mb-2 ml-3">
      <span class="color-357dea font-size-14 bold-600 mt-0" @click="addDetails"
        ><b>+ Add New Detail</b></span
      >
    </div>
    <!-- Method  -->

    <div
      :class="`flex flex-column timeDiv  pl-2 pr-2 pt-2 ml-2 mr-4 mt-4 ${
        details.first_month ? '' : 'pb-5'
      }}`"
    >
      <div class="flex mt-2 align-items-center ml-2 mb-3">
        <div class="flex flex-row checkDiv">
          <div class="flex">
            <Checkbox
              v-model="details.first_month"
              :binary="true"
              @change="selectFirst"
            />
          </div>
          <div class="flex chk2Div p-accordion-header-text ml-3">
            <span class="chk2">First Month</span>
          </div>
        </div>
      </div>
      <div
        v-if="details.first_month"
        class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4"
      >
        <div
          class="row"
          v-for="(itemTwo, index) of details.first_month_rates"
          :key="index"
        >
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <label class="required color-7a7a7a font-size-14 bold-500"
                >Detail Type</label
              >
              <DropDownField
                :value="itemTwo.detail_type"
                code="name"
                :data="detail_type"
                label="detail_type"
                v-model="itemTwo.detail_type"
                :class="{
                  'p-invalid':
                    v$.details.first_month_rates[index]?.detail_type
                      ?.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <label class="required color-7a7a7a font-size-14 bold-500"
                >Unit Price</label
              >
              <TextField
                label="unit_price"
                type="number"
                v-model="itemTwo.unit_price"
                :classes="{
                  'p-invalid':
                    v$.details.first_month_rates[index]?.unit_price?.$invalid &&
                    submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="required color-7a7a7a font-size-14 bold-500">
                Quantity
              </h5>
              <TextField
                label="quantity"
                type="number"
                v-model="itemTwo.quantity"
                :classes="{
                  'p-invalid':
                    v$.details.first_month_rates[index]?.quantity?.$invalid &&
                    submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <label class="required color-7a7a7a font-size-14 bold-500"
                >Amount
              </label>
              <TextField
                label="amount"
                type="number"
                v-model="itemTwo.amount"
                :classes="{
                  'p-invalid':
                    v$.details.first_month_rates[index]?.amount?.$invalid &&
                    submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12">
              <label class="required color-7a7a7a font-size-14 bold-500"
                >Description
              </label>
              <TextAreaField
                label="Description"
                type="text"
                v-model="itemTwo.description"
                :classes="{
                  'p-invalid':
                    v$.details.first_month_rates[index]?.description
                      ?.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-start
          py-3
          flex-wrap
        "
      >
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text color-357dea ml-3"
        />
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesQuotationDialog" @click="closeDialog" />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.category:checked ~ label {
  color: rgb(143, 143, 167);
}
.timeDiv {
  background: rgb(234, 247, 255, 0.3) !important;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
  border: 1px solid #dee2e6 !important;
}
.whiteDiv {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 15%;
  padding: 0.75rem !important;
  /* width: 67.8%; */
}
.urgent_charges {
  white-space: nowrap;
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion-tab {
  margin-bottom: 15px !important ;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}
::v-deep .p-accordion-toggle-icon {
  display: none !important;
}
::v-deep .p-accordion-header-link {
  background-color: #f3f7ff !important;
  border-radius: 8px 8px 0px 0px !important;
  padding: 1rem !important;
  font-weight: 700;
}
.category {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  /* color : pink; */
}
.accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.3) !important;
  /* border-color: #357DEA !important; */
  border: 1px solid #357dea !important;
}
.check-text {
  gap: 2rem;
}
.billing-setting-heading {
  background-color: #e6e6e6 !important;
  border-radius: 8px !important;
  padding: 1rem !important;
  font-weight: 700;
}
.acknowledgement-check {
  gap: 3rem;
}
::v-deep .p-accordion-header-text {
  font-weight: 700;
  font-size: 14px;
  color: #343434 !important;
}
.primary-color {
  color: #357dea !important;
}
</style>