<template>
  <div class="mr-top mt-6">
    <h5 class="required bold-500 font-size-14 color-7a7a7a mb-3">
      Select Rate
    </h5>
    <div :key="renderKey" class="field justify-content-center">
      <Dropdown
        class="full-width font-size-12 color-343434"
        v-model="selectedRate"
        :options="rateCardLists"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Select a rate card"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center country-item">
            <!-- <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              width="18"
            /> -->
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Dropdown>
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
        <div class="field col-12 md">
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
              <div class="table-content mb-2 sales-delivery-tableDesign">
                <div v-for="(tab, idx) of tabs" :key="idx">
                  <DataTable
                    :style="{
                      display: tab.name == selectedTab.name ? 'block' : 'none',
                    }"
                    :isTabActive="tab.name == selectedTab.name"
                    :editRenderKey="renderKey"
                    formTableDataName="rateCardTable"
                    dataKey="size_name"
                    :tableData="tab.rates"
                    :tableColumns="tableColumns"
                    :rateRenderKey="rateRenderKey"
                    @getSelectedRow="getSelectedRow"
                    :tab="tab"
                    storePath="salesQuotationDialog"
                    :selectedTab="selectedTab"
                    :checkbox="checkbox"
                    @isRowSelected="isRowSelected"
                    :prefillData="this.quotationData && this.prefillRates[idx]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            this.rapidoContractData?.quotation.rate_card_type == 'type_1' ||
            this.rapidoContractData?.quotation.rate_card_type == '1'
          "
        >
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >Surcharge ($)</label
              >
              <TextField
                label="surcharge"
                type="number"
                v-model="details.surcharge"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.surcharge.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6 mt-2">
              <h5 class="bold-500 font-size-14 color-7a7a7a">
                Surcharge Minimum Parcels
              </h5>
              <TextField
                label="surcharge_min_parcels"
                type="number"
                v-model="details.surcharge_min_parcels"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.surcharge_min_parcels.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >COD Fee ($)</label
              >
              <TextField
                label="cod_fee"
                type="number"
                v-model="details.cod_fee"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.cod_fee.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
                COD Fee (% of cash collected)
              </h5>
              <TextField
                label="cod_fee_percent"
                type="number"
                v-model="details.cod_fee_percent"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.cod_fee_percent.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >Timeslot Delivery (Fixed 2 hours)</label
              >
              <TextField
                label="timeslot_delivery"
                type="number"
                v-model="details.timeslot_delivery"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
                Standard Liability
              </h5>
              <TextField
                label="standard_liability"
                type="number"
                v-model="details.standard_liability"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.standard_liability.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>

          <div class="pl-1 my-2">Other Charges</div>
          <div class="formgrid grid">
            <div
              v-for="(data, idx) of deliveryData?.other_charges"
              :key="idx"
              class="field col-12 md:col-6"
            >
              <div v-if="details.other_charges[idx]?.charge">
                <label class="bold-500 font-size-14 color-7a7a7a">{{
                  data.charge_name
                }}</label>
                <TextField
                  label="base_delivery_fee"
                  type="number"
                  v-model="details.other_charges[idx].charge"
                  v-on:childToParent="getUserInput"
                  :classes="{
                    // 'p-invalid': v$.details.base_delivery_fee.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>

          <!-- <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >Base Delivery Fee</label
              >
              <TextField
                label="base_delivery_fee"
                type="number"
                v-model="details.base_delivery_fee"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.base_delivery_fee.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
                Min Parcels
              </h5>
              <TextField
                label="min_parcels"
                type="number"
                v-model="details.min_parcels"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.min_parcels.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div> -->
        </div>
        <div
          v-if="
            this.rapidoContractData?.quotation.rate_card_type == 'type_2' ||
            this.rapidoContractData?.quotation.rate_card_type == '2'
          "
        >
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >Base Delivery Fee ($)</label
              >
              <TextField
                label="surcharge"
                type="number"
                v-model="type2_details.base_delivery_fee"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.surcharge.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6 mt-2">
              <h5 class="bold-500 font-size-14 color-7a7a7a">
                Minimum Parcels
              </h5>
              <TextField
                label="surcharge_min_parcels"
                type="number"
                v-model="type2_details.minimum_parcels"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.surcharge_min_parcels.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >COD Fee ($)</label
              >
              <TextField
                label="cod_fee"
                type="number"
                v-model="type2_details.cod_fee"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.cod_fee.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
                COD Fee (% of cash collected)
              </h5>
              <TextField
                label="cod_fee_percent"
                type="number"
                v-model="type2_details.cod_fee_percent"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.cod_fee_percent.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label class="bold-500 font-size-14 color-7a7a7a"
                >Timeslot Delivery (Fixed 2 hours)</label
              >
              <TextField
                label="timeslot_delivery"
                type="number"
                v-model="type2_details.timeslot_delivery"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
                Standard Liability
              </h5>
              <TextField
                label="standard_liability"
                type="number"
                v-model="type2_details.standard_liability"
                v-on:childToParent="getUserInput"
                :classes="{
                  // 'p-invalid': v$.details.standard_liability.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="pl-1 my-2">Other Charges</div>
          <div class="formgrid grid">
            <div
              v-for="(data, idx) of deliveryData?.other_charges"
              :key="idx"
              class="field col-12 md:col-6"
            >
              <div v-if="type2_details.other_charges[idx]?.charge">
                <label class="bold-500 font-size-14 color-7a7a7a">{{
                  data.charge_name
                }}</label>
                <TextField
                  label="base_delivery_fee"
                  type="number"
                  v-model="type2_details.other_charges[idx].charge"
                  v-on:childToParent="getUserInput"
                  :classes="{
                    // 'p-invalid': v$.details.base_delivery_fee.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
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
      <div
        class="flex align-self-center align-items-center justify-content-end"
      >
        <div
          v-if="(!deliveryTypesSelected || !showTabs) && btnKey"
          class="err mr-5"
        >
          Please select one or more delivery rates
        </div>
        <CancelButton
          storePath="salesSales"
          @click="closeDialog"
          label="cancel"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
          class="bg-357dea"
        />
      </div>
    </div>

    <!-- </Panel> -->
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { mapActions, mapGetters } from "vuex";
import DataTable from "./Components/DataTable.vue";
import SelectButton from "primevue/selectbutton";
import Dropdown from "primevue/dropdown";

export default {
  name: "SalesRapidoContractFourthStep",
  components: { Dropdown, Accordion, AccordionTab, DataTable, SelectButton },
  data() {
    return {
      v$: useVuelidate(),
      defaultTransportType: "Same Night Delivery",
      collapsed: true,
      btnKey: false,
      renderRate: false,
      deliveryTypesSelected: false,
      renderKey: 10,
      selectedRate: null,
      deliveryData: null,
      delivery_types: null,
      rateRenderKey: 10,
      rateCardName: null,
      tabs: [],
      showTabs: true,
      prefillRates: [],
      checkbox: {},
      selectedTab: {},
      tableRowData: [],
      tableColumns: [
        { field: "sl_no", header: "S.No" },
        { field: "size_name", header: "Size Name" },
        { field: "weight", header: "Weight (Kg)" },
        { field: "measurment", header: "Measurements (Cm)" },
        { field: "rate", header: "Rates ($)" },
      ],
      details: {
        surcharge: "",
        surcharge_min_parcels: "",
        cod_fee: "",
        cod_fee_percent: "",
        timeslot_delivery: "",
        standard_liability: "",
        min_parcels: "",
        base_delivery_fee: "",
      },
      type2_details: {
        surcharge_min_parcels: "",
        cod_fee: "",
        cod_fee_percent: "",
        timeslot_delivery: "",
        standard_liability: "",
        min_parcels: "",
        base_delivery_fee: "",
      },
      rate_type: [
        { name: "Type 1: Rate 1A", key: "CU" },
        { name: "Type 1: Rate 2A", key: "IU" },
      ],
      submitted: false,
      rateCardLists: [],
    };
  },
  validations() {
    return {
      details: {
        // select_rate: { required }
        // surcharge: { required },
        // surcharge_min_parcels: { required },
        // cod_fee: { required },
        // cod_fee_percent: { required },
        // timeslot_delivery: { required },
        // standard_liability: { required },
      },
    };
  },
  watch: {
    async quotationData() {
      if (this.quotationData) {
        await this.prefillData();
        this.renderRate = true;
      }
    },
    checkbox: {
      handler() {
        Object.keys(this.checkbox).map((list, idx) => {
          this.tabs[idx].disable = !this.checkbox[list];
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
    rapidoContractStep() {
      this.rateRenderKey++;
    },
    selectedTab() {
      this.rateRenderKey++;
    },
    async selectedRate() {
      // if (this.quotationData && !this.renderRate) return;
      this.renderKey++;
      let res = await this.getDeliveryRatesData({
        type: this.selectedRate?.type,
        id: this.selectedRate?.value,
      });

      if (res) {
        this.setRapidoContractData({
          key: "quotation",
          value: {
            delivery_type: [],
          },
        });
        this.deliveryData = res.data.results[0];
        this.rateCardName = this.deliveryData?.rate_card_name;
        console.log(this.selectedRate.type, "type log");
        this.setRapidoContractData({
          key: "quotation",
          value: {
            rate_card_id: this.selectedRate?.value,
            rate_card_name: this.deliveryData?.rate_card_name,
            rate_card_type: this.selectedRate?.type == 1 ? "type_1" : "type_2",
          },
        });

        this.tabs = [];
        this.checkbox = {};
        this.deliveryData?.delivery_type.map((list, idx) => {
          this.tabs.push({
            id: idx,
            name: list.delivery_type,
            tab: list.delivery_type,
            initial: list.delivery_type_initial,
            disable: false,
            rates: [],
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

          if (!this.quotationData || this.renderKey != 12) {
            this.checkbox[list.delivery_type] = true;
          }

          this.rateRenderKey++;
        });
        this.selectedTab = this.tabs[0];
      }

      if (this.quotationData && this.renderKey == 12) {
        this.quotationData.rapido_contract_specifics?.delivery_types.map(
          (list, idx) => {
            this.checkbox[list.delivery_type] = list.selected;
            this.prefillRates.push({
              rates: [],
            });
            list.delivery_size_charge.map((rate, index) => {
              this.prefillRates[idx].rates.push({
                id: index,
                sl_no: index + 1,
                weight: rate.min_weight_kg + " - " + rate.max_weight_kg,
                measurment: rate.min_measure_kg + " - " + rate.max_measure_kg,
                min_weight: rate.min_weight_kg,
                max_weight: rate.max_weight_kg,
                min_length: rate.min_measure_kg,
                max_length: rate.max_measure_kg,
                rate: rate.rates,
                size_name: rate.size_name,
              });
            });
          }
        );
        this.details.surcharge =
          this.quotationData?.rapido_contract_specifics?.charges?.surcharge;
        this.details.surcharge_min_parcels =
          this.quotationData?.rapido_contract_specifics?.charges?.surcharge_min_parcels;
        this.details.cod_fee =
          this.quotationData?.rapido_contract_specifics?.charges?.cod_fee;
        this.details.cod_fee_percent =
          this.quotationData?.rapido_contract_specifics?.charges?.cod_fee_percent;
        this.details.timeslot_delivery =
          this.quotationData?.rapido_contract_specifics?.charges?.timeslot_delivery;
        this.details.standard_liability =
          this.quotationData?.rapido_contract_specifics?.charges?.standard_liability;
        this.details["other_charges"] = [];
        this.quotationData?.rapido_contract_specifics?.charges?.other_charges.map(
          (list) => {
            this.details["other_charges"].push({
              charge_name: list.charge_name,
              charge: list.charge,
            });
          }
        );

        // this.details.surcharge_min_parcels =
        //   this.deliveryData.surcharge_minimum_parcels;
        this.type2_details.cod_fee =
          this.quotationData?.rapido_contract_specifics?.charges.cod_fee;
        this.type2_details.cod_fee_percent =
          this.quotationData?.rapido_contract_specifics?.charges.cod_fee_percent;
        this.type2_details.timeslot_delivery =
          this.quotationData?.rapido_contract_specifics?.charges.timeslot_delivery;
        this.type2_details.standard_liability =
          this.quotationData?.rapido_contract_specifics?.charges.standard_liability;
        this.type2_details.base_delivery_fee =
          this.quotationData?.rapido_contract_specifics?.charges.base_delivery_fee;
        this.type2_details.minimum_parcels =
          this.quotationData?.rapido_contract_specifics?.charges.minimum_parcels;

        this.type2_details["other_charges"] = [];
        this.quotationData?.rapido_contract_specifics?.charges?.other_charges.map(
          (list) => {
            this.type2_details["other_charges"].push({
              charge_name: list.charge_name,
              charge: list.charge,
            });
          }
        );
      } else {
        this.details.surcharge = this.deliveryData.surcharge;
        this.details.surcharge_min_parcels =
          this.deliveryData.surcharge_minimum_parcels;
        this.details.cod_fee = this.deliveryData.cod_fee;
        this.details.cod_fee_percent = this.deliveryData.cod_percentage;
        this.details.timeslot_delivery =
          this.deliveryData.timeslot_delivery_fixed_hours;
        this.details.standard_liability = this.deliveryData.standard_liability;
        this.details["other_charges"] = [];
        this.deliveryData?.other_charges?.map((list) => {
          this.details["other_charges"].push({
            charge_name: list.charge_name,
            charge: list.charge,
          });
        });

        // this.details.surcharge_min_parcels =
        //   this.deliveryData.surcharge_minimum_parcels;
        this.type2_details.cod_fee = this.deliveryData.cod_fee;
        this.type2_details.cod_fee_percent = this.deliveryData.cod_percentage;
        this.type2_details.timeslot_delivery =
          this.deliveryData.timeslot_delivery_fixed_hours;
        this.type2_details.standard_liability =
          this.deliveryData.standard_liability;
        this.type2_details.base_delivery_fee =
          this.deliveryData.base_delivery_fee;
        this.type2_details.minimum_parcels = this.deliveryData.minimum_parcels;

        this.type2_details["other_charges"] = [];
        this.deliveryData?.other_charges?.map((list) => {
          this.type2_details["other_charges"].push({
            charge_name: list.charge_name,
            charge: list.charge,
          });
        });
      }
      this.delivery_types = this.tabs;

      this.getUserInput();
    },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
      rapidoContractData: "salesRapidoContract/Contract/rapidoContractData",
      rapidoContractStep: "salesQuotationDialog/rapidoContractStep",
    }),
  },
  methods: {
    ...mapActions({
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      getRateCardList: "salesRapidoContract/Contract/getRateCardList",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      getDeliveryRatesData: "salesRapidoContract/Contract/getDeliveryRatesData",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
    }),
    isRowSelected(value) {
      this.deliveryTypesSelected = value;
    },
    toggle() {
      this.collapsed = !this.collapsed;
    },
    closeDialog() {
      this.clearQuotationData();
      this.setRapidoContractStep(-3);
    },
    goBackHandler() {
      this.setRapidoContractStep(-1);
    },
    getUserInput() {
      if (
        this.rapidoContractData?.quotation?.rate_card_type == "type_1" ||
        this.rapidoContractData?.quotation?.rate_card_type == "1"
      ) {
        this.setRapidoContractData({
          key: "quotation",
          value: { additional_charges: this.details },
        });
      } else if (
        this.rapidoContractData?.quotation?.rate_card_type == "type_2" ||
        this.rapidoContractData?.quotation?.rate_card_type == "2"
      ) {
        this.setRapidoContractData({
          key: "quotation",
          value: { additional_charges: this.type2_details },
        });
      }
    },
    nextStepHandler() {
      this.btnKey = true;
      if (this.v$.$invalid && !this.deliveryTypesSelected && !this.showTabs) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.deliveryTypesSelected && this.showTabs) {
        this.setRapidoContractStep(1);
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
    prefillData() {
      this.selectedRate = {
        label: this.quotationData.rapido_contract_specifics.rate_card_name,
        value: this.quotationData.rapido_contract_specifics.rate_card_id,
        type:
          this.quotationData.rapido_contract_specifics.rate_card_type ==
          "type_1"
            ? "1"
            : "2",
      };

      this.setRapidoContractData({
        key: "quotation",
        value: {
          rate_card_id:
            this.quotationData.rapido_contract_specifics.rate_card_id,
          rate_card_name:
            this.quotationData.rapido_contract_specifics.rate_card_name,
          rate_card_type:
            this.quotationData.rapido_contract_specifics.rate_card_type,
        },
      });

      this.rateCardName =
        this.quotationData.rapido_contract_specifics.rate_card_name;

      // this.tabs = [];
      // this.checkbox = {};

      // this.quotationData.rapido_contract_specifics?.delivery_types.map(
      //   (list, idx) => {
      //     this.tabs.push({
      //       id: idx,
      //       name: list.delivery_type,
      //       tab: list.delivery_type,
      //       initial: list.initial,
      //       disable: false,
      //       rates: [],
      //     });

      //     list.delivery_size_charge.map((rate, index) => {
      //       this.tabs[idx].rates.push({
      //         id: index,
      //         sl_no: index + 1,
      //         weight: rate.min_weight_kg + " - " + rate.max_weight_kg,
      //         measurment: rate.min_measure_kg + " - " + rate.max_measure_kg,
      //         min_weight: rate.min_weight_kg,
      //         max_weight: rate.max_weight_kg,
      //         min_length: rate.min_measure_kg,
      //         max_length: rate.max_measure_kg,
      //         rate: rate.rates,
      //         size_name: rate.size_name,
      //       });
      //     });

      //     this.checkbox[list.delivery_type] = true;
      //   }
      // );
      // this.delivery_types = this.tabs;

      // this.selectedTab = this.tabs[0];

      // this.checkbox = {};

      // this.quotationData.rapido_contract_specifics?.delivery_types.map(
      //   (list) => {
      //     this.checkbox[list.delivery_type] = list.selected;
      //   }
      // );

      if (
        this.quotationData?.rapido_contract_specifics.rate_card_type ==
          "type_1" ||
        this.rapidoContractData?.quotation.rate_card_type == "1"
      ) {
        this.details.surcharge =
          this.quotationData?.rapido_contract_specifics.charges?.surcharge;
        this.details.surcharge_min_parcels =
          this.quotationData?.rapido_contract_specifics.charges?.surcharge_min_parcels;
        this.details.cod_fee =
          this.quotationData?.rapido_contract_specifics.charges?.cod_fee;
        this.details.cod_fee_percent =
          this.quotationData?.rapido_contract_specifics.charges?.cod_fee_percent;
        this.details.timeslot_delivery =
          this.quotationData?.rapido_contract_specifics.charges?.timeslot_delivery;
        this.details.standard_liability =
          this.quotationData?.rapido_contract_specifics.charges?.standard_liability;
        this.details.min_parcels =
          this.quotationData?.rapido_contract_specifics.charges?.min_parcels;
        this.details.base_delivery_fee =
          this.quotationData?.rapido_contract_specifics.charges?.base_delivery_fee;

        this.quotationData.other_charges?.map((list) => {
          this.type2_details[list.charge_name] = list.charge;
        });
      } else if (
        this.quotationData?.rapido_contract_specifics.rate_card_type ==
          "type_2" ||
        this.rapidoContractData?.quotation.rate_card_type == "2"
      ) {
        this.type2_details.surcharge_min_parcels =
          this.quotationData?.rapido_contract_specifics.charges?.surcharge_min_parcels;
        this.type2_details.cod_fee =
          this.quotationData?.rapido_contract_specifics.charges?.cod_fee;
        this.type2_details.cod_fee_percent =
          this.quotationData?.rapido_contract_specifics.charges?.cod_fee_percent;
        this.type2_details.timeslot_delivery =
          this.quotationData?.rapido_contract_specifics.charges?.timeslot_delivery;
        this.type2_details.standard_liability =
          this.quotationData?.rapido_contract_specifics.charges?.standard_liability;
        this.type2_details.min_parcels =
          this.quotationData?.rapido_contract_specifics.charges?.min_parcels;
        this.type2_details.base_delivery_fee =
          this.quotationData?.rapido_contract_specifics.charges?.base_delivery_fee;

        this.setRapidoContractData({
          key: "quotation",
          value: { additional_charges: this.details },
        });
      }

      this.renderKey++;
      this.getUserInput();
    },
  },
  async mounted() {
    if (this.quotationData) {
      await this.prefillData();
      this.renderRate = true;
    }
    this.getUserInput();
  },
  async created() {
    await this.getRateCardListData();
  },
};
</script>
<style lang="scss" scoped>
.acknowledgement-row {
  gap: 4rem;
}
::v-deep .p-panel-header {
  background: #edf1f7 !important;
  border: none !important;
  border: 1px solid #02003826 !important;
  border-radius: 5px !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
  padding: 0.5rem !important;
}
.required {
  color: #7a7a7a;
}
.err {
  color: red;
}
.required:after {
  content: "*";
  color: red;
}
::v-deep .p-panel .p-panel-content {
  border: none !important;
}

::v-deep .p-panel .p-panel-header .p-panel-header-icon {
  display: none !important;
}
.padding-y {
  padding: 0.5rem 0 !important;
}
::v-deep .p-column-header-content {
  color: #7e84a7;
  font-weight: 600;
  font-size: 12px;
}
::v-deep .checksText {
  color: #7e84a7 !important;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
.icon-wrapper {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(2, 0, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.p-dropdown {
  background: #edf1f7;
  border: none;
}
// .p-selectbutton .p-button.p-highlight{
//   background: #1E90FF;
//   border: 1px solid #85B5FF;
//   border-radius: 1px;
// }
.p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 2px;
}
.sales-delivery-tableDesign {
  background: #e1eaf9;
  padding: 20px;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #fff !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
  // border-radius: 0 6px 6px 6px;
}
// ::v-deep .p-datatable .p-datatable-tbody > tr > td {
//    border-radius:6px;

// }
::v-deep .p-selectbutton .p-button.p-highlight {
  background: #1e90ff;
  border: 1px solid #85b5ff;
  border-radius: 1px;
  // font-weight: 600;
  // font-size: 12px;
  // line-height: 15px;
  color: #ffffff;
}
:v-deep .p-selectbutton .p-button {
  background: #fff;
  border: 1px solid #dfe4ed;
  border-radius: 1px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7 !important;
}

::v-deep .p-accordion .p-accordion-tab-active .p-accordion-header > a > span {
  color: #357dea !important;
  font-weight: 700;
  font-size: 14px;
}
::v-deep .p-accordion-header-text {
  font-weight: 700;
  font-size: 14px;
  color: #343434 !important;
}
</style>