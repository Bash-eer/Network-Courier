<template>
  <div>
    <h5 class="mt-4 required bold-500 font-size-14 color-7a7a7a mb-3">
      Select Rate
    </h5>
    <div :key="refreshKey" class="field justify-content-center">
      <DropDownField
        class="full-width font-size-12 color-343434"
        v-model="selectedRate"
        :options="rateCardLists"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        :placeholder="selectedRate ? selectedRate.label : 'Select a rate card'"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center country-item">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              width="18"
            />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </DropDownField>
    </div>
    <Accordion
      v-if="this.tabs && this.tabs.length"
      :key="tabs"
      :activeIndex="0"
    >
      <AccordionTab :header="rateCardName">
        <div class="flex">
          <div class="flex flex-row acknowledgement-check">
            <div class="flex flex-row acknowledgement-row"></div>
          </div>
        </div>
        <div :key="renderKey" class="field col-12 md">
          <div class="row table_div">
            <div class="flex align-items-center">
              <div
                v-for="(types, idx) of delivery_types"
                :key="types"
                class="flex align-items-center"
                :class="idx != 0 && 'ml-3'"
              >
                <SingleCheckBox
                  :label="types.name"
                  v-model="checkbox[types.name]"
                  :value="checkbox[types.name]"
                />
              </div>
            </div>
            <div v-if="showTabs" class="col-12 mt-2">
              <div class="mt-2 mb-2">
                <SelectButton
                  v-model="selectedTab"
                  optionLabel="tab"
                  class="mr-5"
                  :options="tabs"
                  optionDisabled="disable"
                />
              </div>
              <div class="flex align-items-center mt-3">
                <div class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    No. of Units
                  </div>
                  <NumberField
                    label="no_of_units"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate.no_of_units
                    "
                    :value="
                      delivery_type_rates[this.selectedTab.id].rate.no_of_units
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.no_of_units.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div :key="renderKey" class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    Job $
                  </div>
                  <NumberField
                    label="per_job"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate.per_job
                    "
                    :value="
                      delivery_type_rates[this.selectedTab.id].rate.per_job
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.per_job.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div :key="renderKey" class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    Amount
                  </div>
                  <NumberField
                    label="amount"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate.amount
                    "
                    :value="
                      delivery_type_rates[this.selectedTab.id].rate.amount
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.amount.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>

              <div class="flex align-items-center">
                <div class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    Additional Job $
                  </div>
                  <TextField
                    label="additional_job"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate
                        .additional_job
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.additional_job.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div class="input-wrapper col">
                  <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
                    Timeslot Delivery (Fixed 2 hours)
                  </div>
                  <TextField
                    label="time_slot_delivery_fixed_hours"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate
                        .time_slot_delivery_fixed_hours
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.time_slot_delivery_fixed_hours.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>

                <div class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    Standard Liability
                  </div>
                  <TextField
                    label="standard_liability"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate
                        .standard_liability
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.standard_liability.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
              <div class="flex align-items-center mt-3">
                <div class="input-wrapper col">
                  <div
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      mb-2
                      flex
                    "
                  >
                    Timeslot Delivery
                  </div>
                  <NumberField
                    label="timeslot_delivery"
                    v-on:childToParent="getUserInput"
                    v-model="
                      delivery_type_rates[this.selectedTab.id].rate
                        .timeslot_delivery
                    "
                    :value="
                      delivery_type_rates[this.selectedTab.id].rate
                        .timeslot_delivery
                    "
                    :classes="{
                      'p-invalid':
                        v$.delivery_type_rates[this.selectedTab.id]?.rate
                          ?.timeslot_delivery.$invalid && !isValid,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
  <div class="billingTab mt-3">Billing settings</div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text">Credit Limit $</label>
      <TextField
        label="credit_limits"
        type="number"
        v-model="bill_settings.credit_limit"
        :classes="{
          'p-invalid': v$.bill_settings.credit_limit.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
      <TextField
        label="credit_terms"
        type="number"
        v-model="bill_settings.credit_term_days"
        :classes="{
          'p-invalid': v$.bill_settings.credit_term_days.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Billing Cycle</h5>
      <DropDown
        key="id"
        code="name"
        id="billing_cycle"
        :data="billing_cycle"
        :state="bill_settings.billing_cycle"
        label="billing_cycle"
        v-model="bill_settings.billing_cycle"
        :class="{
          'p-invalid': v$.bill_settings.billing_cycle.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- Surcharge -->
  <p class="ml-2 mt-3 head">Surcharge Charges</p>
  <div class="row pl-1">
    <!--start of loop-->

    <div
      v-for="item in $store.state.salesExpressBike
        .expressContractBikeSurchargeData"
      :key="item"
      class="col-4"
    >
      <div class="flex flex-row">
        <CheckBox
          path="sales"
          v-bind:checker="
            item.selected == true
              ? [
                  {
                    name: `${item.surcharge_name}`,
                    tag: `${item.selected}`,
                    key: `${item.surcharge_name}`,
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: `${item.surcharge_name}`,
              tag: `${item.selected}`,
              key: `${item.surcharge_name}`,
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />

        <div class="flex check-text">
          <TextField
            label="credit_terms"
            type="number"
            v-model="item.rates"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div>

    <!--end of loop-->
  </div>
  <!--trip charges-->
  <p class="ml-2 mt-3 subFormHeaders">Trip Charges</p>
  <div class="flex flex-row">
    <div class="flex costing_worksheet">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.weekend_2nd_trip_charge == true
            ? [
                {
                  name: 'Weekday 2nd Trip Charge',
                  tag: 'bill_settings.weekend_2nd_trip_charge',
                  key: 'wtc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Weekday 2nd Trip Charge',
            tag: 'bill_settings.weekend_2nd_trip_charge',
            key: 'wtc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex groupwise_ws">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.saturday_2nd_trip_charge == true
            ? [
                {
                  name: 'Saturday 2nd Trip Charge',
                  tag: 'bill_settings.saturday_2nd_trip_charge',
                  key: 'stc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Saturday 2nd Trip Charge',
            tag: 'bill_settings.saturday_2nd_trip_charge',
            key: 'stc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.return_trip_charge == true
            ? [
                {
                  name: 'Return Trip Charge',
                  tag: 'bill_settings.return_trip_charge',
                  key: 'rtc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Return Trip Charge',
            tag: 'bill_settings.return_trip_charge',
            key: 'rtc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.return_trip_partial_charge == true
            ? [
                {
                  name: 'Return Trip Partial Charge',
                  tag: 'bill_settings.return_trip_partial_charge',
                  key: 'rtpc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Return Trip Partial Charge',
            tag: 'bill_settings.return_trip_partial_charge',
            key: 'rtpc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.collection_trip_charge == true
            ? [
                {
                  name: 'Collection Trip Charge',
                  tag: 'bill_settings.collection_trip_charge',
                  key: 'ctc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Collection Trip Charge',
            tag: 'bill_settings.collection_trip_charge',
            key: 'ctc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex flex-row">
      <!-- <div class="flex"> -->
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.special_urgent_charges_selected == true
            ? [
                {
                  name: 'Special Urgent Charges $',
                  tag: 'bill_settings.special_urgent_charges_selected',
                  key: 'suc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Special Urgent Charges $',
            tag: 'bill_settings.special_urgent_charges_selected',
            key: 'suc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
      <!-- </div> -->
      <div class="flex check-text">
        <!-- <label class="dialog-label-text urgent_charges">Sur Charge $</label> -->
        <TextField
          label="credit_terms"
          type="number"
          v-model="bill_settings.special_urgent_charges"
          :classes="{
            // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <!--  Bike customer Van Jobs-->
  <div class="mt-3"><h5>Bike Customer Van Jobs</h5></div>
  <p class="ml-2 mt-3 head">Charge By Weight</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Min.Cost $</label>
      <TextField
        label="van_job_min_cost"
        type="number"
        v-model="bill_settings.van_job_min_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs</label>
      <TextField
        label="Kgs"
        type="number"
        v-model="bill_settings.van_job_min_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Add.Cost $</label>
      <TextField
        label="van_job_add_cost"
        type="number"
        v-model="bill_settings.van_job_add_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs $</label>
      <TextField
        label="kgs2"
        type="number"
        v-model="bill_settings.van_job_add_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges"
        >Van Job Urgent.Surcharge $</label
      >
      <TextField
        label="van_job_urgent_surcharge"
        type="number"
        v-model="bill_settings.van_job_urgent_surcharges"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
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
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales" />
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import SelectButton from "primevue/selectbutton";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { Accordion, AccordionTab, SelectButton },
  data() {
    return {
      submitted: false,
      isValid: true,
      rateCardLists: [],
      renderKey: 10,
      refreshKey: 10,
      selectedRate: null,
      deliveryData: null,
      delivery_types: null,
      checkbox: {},
      rateCardName: null,
      selectedTab: {},
      showTabs: true,
      tabs: [],
      delivery_type_rates: [],
      billing_cycle: [
        { name: "Weekly", code: "USD" },
        { name: "Monthly", code: "SGD" },
      ],
      // details: {
      //   surcharge: "",
      //   surcharge_min_parcels: "",
      //   cod_fee: "",
      //   cod_fee_percent: "",
      //   timeslot_delivery: "0",
      //   standard_liability: "",
      //   min_parcels: "",
      //   base_delivery_fee: "",
      // },
      costing_details: {
        charge_type: "e_commerce",
        e_commerce_rate_card_id: "",
        e_commerce_rate_card_name: "",
        selected_e_commerce: "true",
        delivery_type: [],
      },
      bill_settings: {
        credit_limit: "",
        credit_term_days: "",
        billing_cycle: "",
        //
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_urgent_charges_selected: false,
        special_urgent_charges: "",
        //
        van_job_min_cost: "",
        van_job_min_cost_kg: "",
        van_job_add_cost: "",
        van_job_add_cost_kg: "",
        van_job_urgent_surcharges: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  computed: {
    ...mapGetters({
      expressContractBikeAddNewData:
        "salesExpressBike/expressContractBikeAddNewData",
      ExpressContractBikeEditData:
        "salesExpressBike/ExpressContractBikeEditData",
    }),
  },
  validations() {
    if (this.delivery_type_rates.length) {
      let validate = [];
      this.delivery_type_rates.map((list) => {
        if (list.selected) {
          validate.push({
            rate: {
              no_of_units: { required },
              per_job: { required },
              amount: { required },
              additional_job: { required },
              timeslot_delivery: { required },
              time_slot_delivery_fixed_hours: { required },
              standard_liability: { required },
            },
          });
        }
      });

      return {
        bill_settings: {
          credit_limit: { required },
          credit_term_days: { required },
          billing_cycle: { required },
        },
        delivery_type_rates: validate,
      };
    } else {
      return {
        bill_settings: {
          credit_limit: { required },
          credit_term_days: { required },
          billing_cycle: { required },
        },
      };
    }

    // if (this.delivery_type_rates.length) {
    //   return {
    //     delivery_type_rates: {
    //       $each: {
    //         rate: {
    //           no_of_units: { required },
    //           per_job: { required },
    //           amount: { required },
    //           additional_job: { required },
    //           timeslot_delivery: { required },
    //           time_slot_delivery_fixed_hours: { required },
    //           standard_liability: { required },
    //         },
    //       },
    //     },

    //     bill_settings: {
    //       credit_limit: { required },
    //       credit_term_days: { required },
    //       billing_cycle: { required },
    //     },
    //   };
    // } else {
    //   return {
    //     bill_settings: {
    //       credit_limit: { required },
    //       credit_term_days: { required },
    //       billing_cycle: { required },
    //     },
    //   };
    // }
  },
  watch: {
    "$store.state.salesExpressBike.expressContractBikeSurchargeData":
      function () {
        console.log(
          this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
          "surcharge"
        );
      },
    checkbox: {
      handler() {
        Object.keys(this.checkbox).map((list, idx) => {
          this.tabs[idx].disable = !this.checkbox[list];

          this.delivery_type_rates.map((data) => {
            if (data.delivery_type == list) {
              data.selected = this.checkbox[list];
            }
          });
        });

        let disabledTabs = this.tabs.find((list) => !list.disable);
        if (disabledTabs) {
          this.showTabs = true;
        } else {
          this.showTabs = false;
        }
      },
      deep: true,
    },
    async selectedRate() {
      if (this.quotationData && !this.renderRate) return;
      let res = await this.getDeliveryRatesData({
        type: this.selectedRate?.type,
        id: this.selectedRate?.value,
      });

      this.costing_details.e_commerce_rate_card_name = this.selectedRate.label;
      this.costing_details.e_commerce_rate_card_id = this.selectedRate.value;

      console.log(this.costing_details, "asdflj costing");

      if (res) {
        this.deliveryData = res.data.results[0];
        this.rateCardName = this.deliveryData?.rate_card_name;

        this.tabs = [];
        this.checkbox = {};
        this.deliveryData?.delivery_type.map((list, idx) => {
          this.tabs.push({
            tab_id: list.rate_card_id,
            id: idx,
            name: list.delivery_type,
            tab: list.delivery_type,
            initial: list.delivery_type_initial,
            disable: false,
            rates: [],
          });

          this.delivery_type_rates.push({
            delivery_type_initial: list.delivery_type_initial,
            delivery_type: list.delivery_type,
            selected: true,
            delivery_type_id: list.rate_card_id,
            rate: {
              no_of_units: "",
              per_job: "",
              amount: "",
              additional_job: "",
              timeslot_delivery: "0",
              time_slot_delivery_fixed_hours: "",
              standard_liability: "",
            },
          });

          list.rates.map((rate, index) => {
            this.tabs[idx].rates.push({
              id: index,
              sl_no: index + 1,
              weight: rate.min_weight + " - " + rate.max_weight,
              measurment: rate.min_length + " - " + rate.max_length,
              min_weight: rate.min_weight,
              max_weight: rate.max_weight,
              min_length: rate.min_length,
              max_length: rate.max_length,
              rate: rate.rate,
              size_name: rate.size_name,
            });
          });
          this.checkbox[list.delivery_type] = true;
        });
        this.selectedTab = this.tabs[0];
      }

      this.delivery_types = this.tabs;
    },
  },
  methods: {
    ...mapActions({
      getRateCardList: "salesRapidoContract/Contract/getRateCardList",
      getDeliveryRatesData: "salesRapidoContract/Contract/getDeliveryRatesData",
      getRateSuggestion: "salesExpressBike/getRateSuggestion",
    }),
    async getUserInput(label, value) {
      if (label === "no_of_units") {
        const res = await this.getRateSuggestion({
          id: 93,
          payload: { units: value },
        });

        if (res) {
          console.log(res.data);
          this.delivery_type_rates[this.selectedTab.id].rate.per_job =
            res.data.results.jobs;

          this.delivery_type_rates[this.selectedTab.id].rate.amount =
            this.delivery_type_rates[this.selectedTab.id].rate.no_of_units *
            this.delivery_type_rates[this.selectedTab.id].rate.per_job;

          this.renderKey++;
        }

        console.log(this.delivery_type_rates[this.selectedTab.id]);
      }
    },
    async getRateCardListData() {
      let typeOne = await this.getRateCardList("typeone");
      let typeTwo = await this.getRateCardList("typetwo");

      this.rateCardLists = [];

      if (typeOne && typeTwo) {
        this.rateCardLists.push({ label: "Type 1", items: [] });
        this.rateCardLists.push({ label: "Type 2", items: [] });

        typeOne.data.results.map((list) => {
          this.rateCardLists[0]["items"].push({
            label: list.rate_card_name,
            value: list.id,
            type: "1",
          });
        });

        typeTwo.data.results.map((list) => {
          this.rateCardLists[1]["items"].push({
            label: list.rate_card_name,
            value: list.id,
            type: "2",
          });
        });
      }
    },
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeThirdStep",
      });
    },
    nextStepHandler() {
      console.log(
        this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
        "submit"
      );
      if (this.v$.$invalid) {
        this.submitted = true;
        this.isValid = false;
      }
      if (!this.v$.$invalid) {
        console.log("ecom", this.delivery_type_rates);
        this.costing_details["delivery_type"] = this.delivery_type_rates;
        this.expressContractBikeAddNewData["quotation"]["costing_details"] =
          this.costing_details;
        // console.log(
        //   this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
        //   "surchrge"
        // );
        this.bill_settings["surcharges"] =
          this.$store.state.salesExpressBike.expressContractBikeSurchargeData;
        this.expressContractBikeAddNewData["quotation"]["bill_settings"] =
          this.bill_settings;
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractBikeFifthStep",
        });
      }
    },
    prefillEditData() {
      let ecomRate = null;

      this.rateCardLists.map((rate) => {
        rate.items.find((data) => {
          if (
            data.label ==
              this.ExpressContractBikeEditData?.express_contract[0]
                ?.quotation_bike[0].e_commerce_rate_card_name &&
            data.value ==
              this.ExpressContractBikeEditData?.express_contract[0]
                ?.quotation_bike[0].e_commerce_rate_card_id
          ) {
            ecomRate = data;
            return;
          }
        });
      });
      console.log(
        ecomRate,
        "lasfdk asdfj ksfd ",
        this.ExpressContractBikeEditData?.express_contract[0]?.quotation_bike[0]
          .e_commerce_rate_card_name,
        this.ExpressContractBikeEditData?.express_contract[0]?.quotation_bike[0]
          .e_commerce_rate_card_id
      );

      this.selectedRate = ecomRate;

      Object.keys(this.checkbox).map((key) => {
        this.ExpressContractBikeEditData?.express_contract[0]?.quotation_bike[0].e_commerce_charges.map(
          (charges) => {
            if (charges.delivery_type == key) {
              this.checkbox = true;
            } else {
              this.checkbox = false;
            }

            this.delivery_type_rates.push({
              delivery_type_initial: charges.rate.delivery_type_initial,
              delivery_type: charges.rate.delivery_type,
              selected: true,
              delivery_type_id: charges.rate.delivery_type_id,
              rate: {
                no_of_units: charges.rate.no_of_units,
                per_job: charges.rate.per_job,
                amount: charges.rate.amount,
                additional_job: charges.rate.additional_job,
                timeslot_delivery: charges.rate.timeslot_delivery,
                time_slot_delivery_fixed_hours:
                  charges.rate.time_slot_delivery_fixed_hours,
                standard_liability: charges.rate.standard_liability,
              },
            });
          }
        );
      });

      this.ExpressContractBikeEditData?.express_contract[0]?.quotation_bike[0].e_commerce_charges.map(
        (charges) => {
          this.delivery_type_rates.push({
            delivery_type_initial: charges.rate.delivery_type_initial,
            delivery_type: charges.rate.delivery_type,
            selected: true,
            delivery_type_id: charges.rate.delivery_type_id,
            rate: {
              no_of_units: charges.rate.no_of_units,
              per_job: charges.rate.per_job,
              amount: charges.rate.amount,
              additional_job: charges.rate.additional_job,
              timeslot_delivery: charges.rate.timeslot_delivery,
              time_slot_delivery_fixed_hours:
                charges.rate.time_slot_delivery_fixed_hours,
              standard_liability: charges.rate.standard_liability,
            },
          });
        }
      );

      this.refreshKey++;
      this.renderKey++;
    },
  },
  async created() {
    await this.getRateCardListData();
    this.prefillEditData();
    let surcharges =
      this.$store.state.salesExpressBike.expressContractBikeSurchargeData;
    surcharges.map((itm) => {
      itm["selected"] = false;
    });
    console.log(surcharges);
    let chargeByWeightArray = [
      "van_job_min_cost",
      "van_job_add_cost_kg",
      "van_job_add_cost",
      "van_job_min_cost_kg",
      "van_job_urgent_surcharges",
    ];
    chargeByWeightArray.map((itm) => {
      this.bill_settings[itm] =
        this.$store.state.salesExpressBike.expressContractBikeChargeByWeightData[
          itm
        ];
    });
  },
};
</script>

<style scoped>
.billingTab {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-radius: 8px;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: 700;
  color: #343434;
}
</style>
