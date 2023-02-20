<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../DuoSelect.vue";
import Checkbox from "primevue/checkbox";
import { mapActions, mapState } from "vuex";
import moment from "moment";
import RadioButton from "primevue/radiobutton";
import {
  expressContract,
  expressContractState,
} from "../../../../../../../store/helper";

export default {
  name: "SalesExpressContractBikeFourthStep",
  data: () => ({
    defaultTransportType: "Same Night Delivery",
    firstMonthType: "Same Night Delivery",
    ecommerceTransportType: "Charge by Weight",
    v$: useVuelidate(),
    renderKey: 1,
    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    addScaleClicked: 1,
    set_rate: "",
    select_type: "",
    select_tire: "",
    select_tire_cat: "",
    select_tire_cat_charge: "",
    select_multi_tire_cat: "",
    validation_details: {},
    first_valid: [],
    e_commerce_valid: [],
    delivery_data: [],
    delivery_type: "",
    rate_type_header: "",
    select_rate_id: "",
    charge_usage: "",
    rates: {
      no_of_units: "",
      per_job: "",
      amount: "",
      additional_job: "",
    },
    details: {
      charge_type: "",
      normal: false,
      e_commerce: false,
      van_job_urgent_surcharges: "",
      van_job_min_cost: "",
      van_job_min_cost_kg: "",
      van_job_add_cost: "",
      van_job_add_cost_kg: "",
      first_month: false,
    },
    e_commerce: [],
    first_data: [],
    base_data: [
      { name: "Normal (Monthly Minimum)", key: "CU" },
      { name: "E-commerce", key: "IU" },
    ],

    rate_type: [],
    checkbox_data: [],
    surcharges_data: [],
    submitted: false,
  }),
  validations() {
    if (this.addScaleClicked > -1) {
      return {
        rates: this.validation_details,
        details: {
          // ...this.validation_details,
          // Methods

          van_job_urgent_surcharges: { required },
          van_job_min_cost: { required },
          van_job_min_cost_kg: { required },
          van_job_add_cost: { required },
          van_job_add_cost_kg: { required },
        },
        e_commerce: this.e_commerce_valid,
        first_data: this.first_valid,
      };
    }
  },
  computed: {
    ...expressContractState,
    ...mapState({
      finalData: (state) => state.salesExpressContract.payloadPost,
    }),
  },
  methods: {
    ...expressContract,
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      normalVanUrgent: "salesExpressContract/normalVanUrgent",
      getJobByUnit: "salesExpressContract/getJobByUnit",
      multiQty: "salesExpressContract/multiQty",
      multiJob: "salesExpressContract/multiJob",
      getRatesData: "salesExpressContractBikeProjectJobs/getRatesData",
      deliverTypes: "salesExpressContract/deliverTypes",
      getECommerceByUnit: "salesExpressContract/getECommerceByUnit",
      getSurcharges: "salesExpressContract/getSurcharges",
      setPostData: "salesExpressContract/setPayloadPostData",
      getTwoBoxQty: "salesExpressContract/getTwoBoxQty",
    }),
    goBackHandler() {
      this.navigateStepper({
        step: this.expressContractStep[this.expressStep - 1].component,
      });
      this.$store.state.salesExpressContract.flowStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    async normalVanUrgentValue() {
      const res = await this.normalVanUrgent(
        this.expressContractData?.quotation?.rate_card_id
      );
      if (res) {
        this.details.van_job_urgent_surcharges =
          res.data.results.van_job_urgent_surcharges.toString();
        this.renderKey++;
      }
    },
    async onChangeUnit(e) {
      let payload = {
        units: e,
      };
      let res;
      if (e) {
        res = await this.getJobByUnit({
          id: this.expressContractData?.quotation?.rate_card_id,
          payload: payload,
          type: "bike",
          toast: this.$toast,
        });
      }

      if (res) {
        this.rates.additional_job = res.data.results.jobs;
        this.rates.per_job = res.data.results.jobs;
        this.rates.amount = (this.rates.per_job * parseFloat(e)).toFixed(2);
      } else {
        this.rates.additional_job = 0;
        this.rates.per_job = 0;
        this.rates.amount = 0;
      }
    },
    onChangeJob(e) {
      if (e) {
        this.rates.amount = (this.rates.no_of_units * parseFloat(e)).toFixed();
      } else {
        this.rates.amount = 0;
      }
      if (this.details.first_month) {
        this.first_data.amount = e
          ? (this.first_data.minimum_quantity * parseFloat(e)).toFixed(2)
          : 0;
      }
    },
    onChangeQty(e, index) {
      if (this.select_type === "E-commerce") {
        this.first_data[index].amount = e
          ? (this.e_commerce[index].per_job * parseFloat(e)).toFixed(2)
          : 0;
      } else {
        this.first_data.amount = e
          ? (this.rates.per_job * parseFloat(e)).toFixed(2)
          : 0;
      }
    },
    async getRates(id) {
      let res = await this.getRatesData(id);

      res.data.results.map((i) => {
        this.rate_type.push({
          name: i.rate_card_name,
          key: i.id,
        });
      });
    },
    async setTypeChange(l, e) {
      if (e === "Normal (Monthly Minimum)") {
        this.details.charge_type = "normal";
        this.details.normal = true;
        this.details.e_commerce = false;
        // this.normalVanUrgentValue();
        this.validation_details = {
          no_of_units: { required },
          per_job: { required },
          amount: { required },
          additional_job: { required },
        };
        if (this.details.first_month) {
          this.first_data = {
            minimum_quantity: "",
            amount: "",
          };
          this.first_valid = {
            minimum_quantity: { required },
            amount: { required },
          };
        }
        this.e_commerce_valid = [];
      } else {
        this.details.charge_type = "e_commerce";
        this.details.normal = false;
        this.details.e_commerce = true;
        this.getDelivery(this.expressContractData?.quotation?.rate_card_id);
        // this.getRates(this.expressContractData?.quotation?.region_id);
        this.validation_details = {};
        this.multi_job_valid = [];
        this.multi_qty_valid = [];
        this.box_valid = [];
      }
      this.addScaleClicked++;
    },
    addRemoveDelivery(i, e) {
      if (!this.delivery_data.includes(e.delivery_type)) {
        this.delivery_data.push(e.delivery_type);
        this.e_commerce.push({
          idx: e.id,
          delivery_type: e.delivery_type,
          delivery_type_initial: e.delivery_type_initial,
          selected: true,
          delivery_type_id: e.id,
          no_of_units: "",
          per_job: "",
          amount: "",
          additional_job: "",
          timeslot_delivery: e.timeslot_delivery ?? "",
          time_slot_delivery_fixed_hours: e.timeslot_delivery_fixed_hours ?? "",
        });
        this.e_commerce_valid.push({
          no_of_units: { required },
          per_job: { required },
          amount: { required },
          additional_job: { required },
          timeslot_delivery: { required },
        });
        if (this.details.first_month && this.select_type == "E-commerce") {
          this.first_data = [];
          this.first_valid = [];
          this.e_commerce.map((e) => {
            this.first_data.push({
              delivery_type: e.delivery_type,
              delivery_type_initial: e.delivery_type_initial,
              selected: true,
              delivery_type_id: e.delivery_type_id,
              minimum_quantity: "",
              amount: "",
            });
            this.first_valid.push({
              minimum_quantity: { required },
              amount: { required },
            });
          });
        }
      } else {
        this.delivery_data = this.delivery_data.filter(
          (i) => i !== e.delivery_type
        );
        this.e_commerce = this.e_commerce.filter(
          (i) => i.delivery_type !== e.delivery_type
        );
        if (this.details.first_month && this.select_type == "E-commerce") {
          this.first_data = this.first_data.filter(
            (i) => i.delivery_type !== e.delivery_type
          );

          this.first_valid.splice(0, 1);
        }
        this.e_commerce_valid.splice(0, 1);
      }
      this.renderKey++;
      this.addScaleClicked++;
    },

    async getDelivery(id) {
      let res = await this.deliverTypes({ id: id, type: "bike" });
      this.checkbox_data = [];
      if (
        this.overViewData &&
        this.overViewData.express_contract[0]?.bike &&
        this.overViewData.express_contract[0]?.bike_rates?.e_commerce &&
        this.overViewData.express_contract[0]?.rate_card_id ==
          this.expressContractData?.quotation?.rate_card_id
      ) {
        ((this.first_data = []), (this.first_valid = [])),
          (this.e_commerce = []);
        this.overViewData.express_contract[0]?.bike_rates.first_month_rates.map(
          (i) => {
            this.first_data.push({
              delivery_type: i.delivery_type,
              delivery_type_initial: i.delivery_type_initial,
              selected: true,
              delivery_type_id: i.delivery_type_id,
              minimum_quantity: i.minimum_quantity,
              amount: i.amount,
            });
            this.first_valid.push({
              minimum_quantity: { required },
              amount: { required },
            });
            this.renderKey++;
          }
        );
        this.delivery_data = [];
        res.data.results.map((i) => {
          this.overViewData.express_contract[0]?.bike_rates.e_commerce_charges.map(
            (e) => {
              if (i.delivery_type === e.delivery_type) {
                i["name"] = i.delivery_type;
                i["value"] = true;
                this.delivery_data.push(e.delivery_type);
                this.e_commerce.push({
                  idx: i.id,
                  delivery_type: e.delivery_type,
                  delivery_type_initial: e.delivery_type_initial,
                  selected: true,
                  delivery_type_id: e.delivery_type_id,
                  no_of_units: e.no_of_units,
                  per_job: e.per_job,
                  amount: e.amount,
                  additional_job: e.additional_job,
                  timeslot_delivery: e.timeslot_delivery ?? "",
                  time_slot_delivery_fixed_hours:
                    e.time_slot_delivery_fixed_hours ?? "",
                });
                this.e_commerce_valid.push({
                  no_of_units: { required },
                  per_job: { required },
                  amount: { required },
                  additional_job: { required },
                  timeslot_delivery: { required },
                });
              }
              // else {
              //   i["name"] = i.delivery_type;
              //   i["value"] = false;
              // }
            }
          );
          if (!this.checkbox_data.some((u) => u.name == i.delivery_type)) {
            this.checkbox_data.push(i);
          }
        });

        this.defaultTransportType = this.delivery_data[0];
        this.firstMonthType = this.delivery_data[0];
      } else {
        res.data.results.map((i) => {
          i["value"] = false;
          if (
            !this.checkbox_data.some((u) => u.delivery_type === i.delivery_type)
          ) {
            this.checkbox_data.push(i);
          }
        });
      }
    },

    async onChangeEUnit(e, index, id) {
      let payload = {
        units: e,
      };
      let res;
      if (e) {
        res = await this.getECommerceByUnit({
          id: id,
          payload: payload,
          type: "bike",
          toast: this.$toast,
        });
      }

      if (res) {
        this.e_commerce[index].per_job = res.data.results.job;
        this.e_commerce[index].amount = (
          res.data.results.job * parseFloat(e)
        ).toFixed(2);
        this.e_commerce[index].additional_job = res.data.results.job;
      } else {
        this.e_commerce[index].per_job = 0;
        this.e_commerce[index].amount = 0;
      }
    },
    onChangeEJob(e, index) {
      if (e) {
        this.e_commerce[index].amount = (
          this.e_commerce[index].no_of_units * parseFloat(e)
        ).toFixed(2);
      } else {
        this.e_commerce[index].amount = 0;
      }
      if (this.details.first_month) {
        this.first_data = this.first_data.map((i) => {
          i.amount =
            i.minimum_quantity && e
              ? (i.minimum_quantity * parseFloat(e)).toFixed()
              : 0;
          return i;
        });
      }
    },
    async surcharges() {
      const res = await this.getSurcharges(
        this.expressContractData?.quotation?.rate_card_id
      );
      res.data.results.map((i) => {
        i["value"] = "";
        this.surcharges_data.push(i);
      });
    },
    selectFirst() {
      if (this.details.first_month) {
        if (this.select_type === "Normal (Monthly Minimum)") {
          this.first_data = {
            minimum_quantity: "",
            amount: "",
          };
          this.first_valid = {
            minimum_quantity: { required },
            amount: { required },
          };
        } else {
          this.e_commerce.map((e) => {
            this.first_data.push({
              delivery_type: e.delivery_type,
              delivery_type_initial: e.delivery_type_initial,
              selected: true,
              delivery_type_id: e.delivery_type_id,
              minimum_quantity: "",
              amount: "",
            });
            this.first_valid.push({
              minimum_quantity: { required },
              amount: { required },
            });
          });
        }
        // this.first_data=this.delivery_data
      } else {
        this.first_data = [];
        this.first_valid = [];
      }
      this.addScaleClicked++;
    },
    async getOtherCharge() {
      let res = await this.otherCharges({
        id: this.expressContractData?.quotation?.rate_card_id,
        type: "bike",
      });
      if (res) {
        let data = res.data.results;
        this.details.van_job_urgent_surcharges = data.van_job_urgent_surcharges;
        this.details.van_job_min_cost = data.van_job_min_cost;
        this.details.van_job_min_cost_kg = data.van_job_min_cost_kg;
        this.details.van_job_add_cost = data.van_job_add_cost;
        this.details.van_job_add_cost_kg = data.van_job_add_cost_kg;
      }
    },
    getUserInput(data) {
      this.setExpressContractData({
        key: "quotation",
        key1: "costing_details",
        key2: "bike",
        value: data,
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
        this.details["charge_usage_only"] =
          this.charge_usage === "Charge Usage Only" ? true : false;
        this.details["charge_minimum"] =
          this.charge_usage === "Charge Usage Only" ? false : true;
        let costing_details = {};
        if (this.select_type === "Normal (Monthly Minimum)") {
          this.details["rates"] = this.rates;
          this.details["first_month_rates"] = Array.isArray(this.first_data)
            ? {}
            : this.first_data;
        } else {
          this.details["delivery_type"] = this.e_commerce;
          this.details["first_month_rates"] = this.first_data;
        }
        this.getUserInput(this.details);
        this.navigateStepper({
          step: this.expressContractStep[this.expressStep + 1].component,
        });
        this.$store.state.salesExpressContract.flowStep++;
      }
    },
    async prefillData() {
      let quotation_van =
        this.overViewData.express_contract[0]?.bike_rates ?? {};
      if (
        quotation_van.charge_type === "normal" &&
        this.overViewData.express_contract[0]?.rate_card_id ==
          this.expressContractData.quotation.rate_card_id
      ) {
        this.set_rate = this.expressContractData.quotation.rate_card_id;
        this.details.charge_type = "normal";
        this.details.normal = true;
        this.details.e_commerce = false;
        let normal = quotation_van.normal_charges[0] ?? {};
        this.rates.no_of_units = normal.no_of_units;
        this.rates.per_job = normal.per_job;
        this.rates.amount = normal.amount;
        this.rates.additional_job = normal.additional_job;

        if (quotation_van.first_month_rates.length === 1) {
          this.first_data = {
            minimum_quantity:
              quotation_van.first_month_rates[0].minimum_quantity,
            amount: quotation_van.first_month_rates[0].amount,
          };
          this.first_valid = {
            minimum_quantity: { required },
            amount: { required },
          };
        }

        //  this.first_data = {
        // this.first_data["minimum_quantity"]= quotation_van.first_month_rates[0].minimum_quantity
        // this.first_data["amount"]= quotation_van.first_month_rates[0].amount
        // };
      } else {
        this.details.charge_type = "e_commerce";
        this.details.normal = false;
        this.details.e_commerce = true;
        this.select_type = "E-commerce";
        // await this.getRates(this.expressContractData?.quotation?.region_id);
        // this.details.rate_type = quotation_van.e_commerce_rate_card_id;
        await this.getDelivery(
          this.overViewData.express_contract[0]?.rate_card_id
        );
      }
      this.charge_usage = quotation_van.charge_usage_only
        ? "Charge Usage Only"
        : quotation_van.charge_minimum
        ? "Charge Minimum"
        : "";
      this.select_type =
        quotation_van.charge_type == "normal"
          ? "Normal (Monthly Minimum)"
          : "E-commerce";
      // (this.details = {
      (this.details.charge_type = quotation_van.charge_type),
        (this.details.normal = quotation_van.normal),
        (this.details.e_commerce = quotation_van.e_commerce),
        (this.details.van_job_urgent_surcharges =
          quotation_van.van_job_urgent_surcharges),
        (this.details.van_job_min_cost = quotation_van.van_job_min_cost),
        (this.details.van_job_min_cost_kg = quotation_van.van_job_min_cost_kg),
        (this.details.van_job_add_cost = quotation_van.van_job_add_cost),
        (this.details.van_job_add_cost_kg = quotation_van.van_job_add_cost_kg),
        (this.details.first_month = quotation_van.first_month),
        // }),
        this.addScaleClicked++;
    },
  },
  components: {
    Accordion,
    AccordionTab,
    DuoSelection,
    Checkbox,
    RadioButton,
  },
  async created() {
    this.set_rate = this.expressContractData.quotation.rate_card_id;
  },
  async mounted() {
    this.surcharges();

    if (this.overViewData && this.overViewData.express_contract[0]?.bike) {
      this.prefillData();
    } else {
      this.getOtherCharge();
    }
    this.$watch(
      () => this.expressContractData,
      (newData) => {
        if (
          this.set_rate != this.expressContractData?.quotation?.rate_card_id
        ) {
          this.delivery_data = [];
          this.select_type = "";
          this.rates = {
            no_of_units: "",
            per_job: "",
            amount: "",
            additional_job: "",
          };
          this.details = {
            charge_type: "",
            normal: false,
            e_commerce: false,
            van_job_urgent_surcharges: "",
            van_job_min_cost: "",
            van_job_min_cost_kg: "",
            van_job_add_cost: "",
            van_job_add_cost_kg: "",
            first_month: false,
          };
          this.e_commerce = [];
          this.first_data = [];
          this.getOtherCharge();
        }
      },
      {
        deep: true,
      }
    );
  },
};
</script>
<template>
  <div :key="addScaleClicked" class="mt-6">
    <p class="bold-700 font-size-12 color-343434 mb-3">Rate Type</p>
    <div class="flex flex-row align-items-center mb-3">
      <div
        v-for="category of base_data"
        :key="category.key"
        class="p-field-radiobutton flex mr-3"
      >
        <RadioButton
          name="category"
          :value="category.name"
          v-model="select_type"
          @change="setTypeChange($event, category.name)"
        />
        <label
          :class="`p-accordion-header-text mt-1 ml-2 ${
            select_type == category.name ? 'primary-color' : ''
          }`"
          :for="category.key"
          >{{ category.name }}</label
        >
      </div>
    </div>
    <label v-if="select_type" class="p-accordion-header-text mt-1 ml-2 mb-2">{{
      select_type == "E-commerce" ? "E-commerce Costing" : select_type
    }}</label>
    <div class="mt-5" v-show="select_type === 'Normal (Monthly Minimum)'">
      <div class="formgrid grid row">
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >No. of Units ($)</label
          >
          <TextField
            label="no_of_units"
            type="number"
            v-model="rates.no_of_units"
            @update:modelValue="onChangeUnit"
            :classes="{
              'p-invalid': v$.rates?.no_of_units?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Job $</label
          >
          <TextField
            label="per_job"
            type="number"
            v-model="rates.per_job"
            @update:modelValue="onChangeJob"
            :classes="{
              'p-invalid': v$.rates?.per_job?.$invalid && submitted,
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
            v-model="rates.amount"
            :classes="{
              'p-invalid': v$.rates?.amount?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Additional Job $
          </label>
          <TextField
            label="additional_job"
            type="number"
            v-model="rates.additional_job"
            :classes="{
              'p-invalid': v$.rates?.additional_job?.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <!-- Method  -->
    <div
      :key="addScaleClicked"
      v-show="select_type === 'E-commerce'"
      header="E-commerce"
    >
      <Accordion :activeIndex="0">
        <AccordionTab :header="rate_type_header">
          <div class="flex mt-2 mb-4">
            <div class="flex flex-row acknowledgement-check">
              <div
                class="flex flex-row acknowledgement-row"
                v-for="(item, index) of checkbox_data"
                :key="index"
              >
                <Checkbox
                  v-model="item.value"
                  :binary="true"
                  @change="addRemoveDelivery($event, item)"
                />
                <span class="p-accordion-header-text ml-2">{{
                  item.delivery_type
                }}</span>
              </div>
            </div>
          </div>
          <DuoSelection
            class="mb-4"
            :options="delivery_data"
            :default="defaultTransportType"
            v-model="defaultTransportType"
          />
          <div v-for="(i, index) of e_commerce" :key="index">
            <div v-if="defaultTransportType == i.delivery_type">
              <div class="formgrid grid">
                <div class="field col-12 md:col-4">
                  <label class="required color-7a7a7a font-size-14 bold-500"
                    >No. of Units ($)</label
                  >
                  <TextField
                    label="no_of_units"
                    type="number"
                    v-model="i.no_of_units"
                    @update:modelValue="onChangeEUnit($event, index, i.idx)"
                    :classes="{
                      'p-invalid':
                        v$.e_commerce[index]?.no_of_units?.$invalid &&
                        submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-4">
                  <h5 class="required color-7a7a7a font-size-14 bold-500">
                    Job $
                  </h5>
                  <TextField
                    label="per_job"
                    type="number"
                    v-model="i.per_job"
                    @update:modelValue="onChangeEJob($event, index)"
                    :classes="{
                      'p-invalid':
                        v$.e_commerce[index]?.per_job?.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-4">
                  <label class="required color-7a7a7a font-size-14 bold-500"
                    >Amount
                  </label>
                  <TextField
                    label="amount"
                    type="number"
                    v-model="i.amount"
                    :classes="{
                      'p-invalid':
                        v$.e_commerce[index]?.amount?.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                </div>
              </div>
              <div class="formgrid grid">
                <div class="field col-12 md:col-4">
                  <label class="required color-7a7a7a font-size-14 bold-500"
                    >Additional Job $
                  </label>
                  <TextField
                    label="additional_job"
                    type="number"
                    v-model="i.additional_job"
                    :classes="{
                      'p-invalid':
                        v$.e_commerce[index]?.additional_job?.$invalid &&
                        submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                </div>

                <div class="field col-12 md:col-4">
                  <h5 class="required color-7a7a7a font-size-14 bold-500">
                    Timeslot Delivery (Fixed
                    {{ i.time_slot_delivery_fixed_hours ?? "0" }} hours)
                  </h5>
                  <TextField
                    label="timeslot_delivery"
                    type="number"
                    v-model="i.timeslot_delivery"
                    :classes="{
                      'p-invalid':
                        v$.e_commerce[index]?.timeslot_delivery?.$invalid &&
                        submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
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
      <div v-if="details.first_month">
        <div class="flex flex-row row mt-2 mx-2">
          <div class="whiteDiv calendarDiv col-5 ml-3">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  id="chargeMinium"
                  name="chargeMinium"
                  value="Charge Minimum"
                  v-model="charge_usage"
                />
                <label class="radioText ml-2" for="chargeUsageOnly"
                  >Charge Minimum</label
                >
              </div>
            </div>
          </div>
          <div class="whiteDiv calendarDiv col-5">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  id="chargeUsageOnly"
                  name="chargeUsageOnly"
                  value="Charge Usage Only"
                  v-model="charge_usage"
                />
                <label class="radioText ml-2" for="chargeUsageOnly"
                  >Charge Usage Only</label
                >
              </div>
            </div>
          </div>
        </div>
        <div v-if="select_type === 'Normal (Monthly Minimum)'" class="flex">
          <div class="formParentDiv formDiv">
            <div class="formgrid grid mt-4">
              <div class="field col-12 md:col-6">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Minimum Qty
                </h5>
                <TextField
                  label="minimum_quantity"
                  type="number"
                  v-model="first_data.minimum_quantity"
                  @blur="v$.first_data.minimum_quantity.$model;"
                  @update:modelValue="onChangeQty($event)"
                  :classes="{
                    'p-invalid':
                      v$.first_data?.minimum_quantity?.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Amount
                </h5>
                <TextField
                  label="amount"
                  type="number"
                  v-model="first_data.amount"
                  @blur="v$.first_data.amount.$model;"
                  :classes="{
                    'p-invalid': v$.first_data?.amount?.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="select_type === 'E-commerce'" class="flex flex-column">
          <DuoSelection
            class="my-3"
            :options="delivery_data"
            :default="firstMonthType"
            v-model="firstMonthType"
          />
          <div
            class="formParentDiv formDiv"
            v-for="(e, index) of first_data"
            :key="index"
          >
            <div
              v-if="e.delivery_type == firstMonthType"
              class="formgrid grid mt-4 roe"
            >
              <div class="field col-12 md:col-4">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Minimum Qty
                </h5>
                <TextField
                  label="minimum_quantity"
                  type="number"
                  v-model="e.minimum_quantity"
                  @update:modelValue="onChangeQty($event, index)"
                  :classes="{
                    'p-invalid':
                      v$.first_data[index]?.minimum_quantity?.$invalid &&
                      submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Amount
                </h5>
                <TextField
                  label="amount"
                  type="number"
                  v-model="e.amount"
                  :classes="{
                    'p-invalid':
                      v$.first_data[index]?.amount?.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <p class="ml-2 mt-3 head">Bike Customer Van Jobs</p>
    <div class="formgrid grid flex-column">
      <div class="row ml-2 mb-1">
        <div class="field col-12 md:col-4">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Van Job Min. Cost ($)
          </label>
          <TextField
            label="min_charge"
            type="number"
            v-model="details.van_job_min_cost"
            :classes="{
              'p-invalid': v$.details.van_job_min_cost.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Kgs
          </label>
          <TextField
            label="min_charge"
            type="number"
            v-model="details.van_job_min_cost_kg"
            :classes="{
              'p-invalid': v$.details.van_job_min_cost_kg.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="row ml-2 mb-0">
        <div class="field col-12 md:col-4">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Van Job Add. Cost ($)
          </label>
          <TextField
            label="min_charge"
            type="number"
            v-model="details.van_job_add_cost"
            :classes="{
              'p-invalid': v$.details.van_job_add_cost.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>

        <div class="field col-12 md:col-4">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Kgs
          </label>
          <TextField
            label="min_charge"
            type="number"
            v-model="details.van_job_add_cost_kg"
            :classes="{
              'p-invalid': v$.details.van_job_add_cost_kg.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="row ml-2 mb-0">
        <div class="field col-12 md:col-4">
          <label class="required color-7a7a7a font-size-14 bold-500"
            >Van Job Urgent. Surcharge ($)
          </label>
          <TextField
            label="min_charge"
            type="number"
            v-model="details.van_job_urgent_surcharges"
            :classes="{
              'p-invalid':
                v$.details.van_job_urgent_surcharges.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
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