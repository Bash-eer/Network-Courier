<template>
  <div>
    <div class="flex flex-row my-2 ml-2">
      <div class="flex">
        <Checkbox v-model="details.rebate" :binary="true" />
        <span class="bold-600 font-size-12 color-4e5868 ml-2">Rebate</span>
      </div>
    </div>

    <div class="formgrid grid flex">
      <div class="field col-12 md:col-4">
        <h5 class="required text-style">Credit Limit $</h5>
        <NumberField
          label="profile_name"
          type="text"
          v-model="details.credit_limits"
          :showButtons="true"
          mode="decimal"
          :classes="{
            'p-invalid': v$.details?.credit_limits.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required text-style">Effective From Date</h5>
        <Calendar
          label="profile_name"
          type="text"
          showIcon="true"
          v-model="details.effective_from_date"
          :class="{
            'p-invalid': v$.details?.effective_from_date.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div v-if="details.rebate" class="field col-12 md:col-4">
        <h5 class="required text-style">Effective to Date</h5>
        <Calendar
          label="short_name"
          type="text"
          showIcon="true"
          v-model="details.effective_to_date"
          :class="{
            'p-invalid': v$.details?.effective_to_date.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <DuoSelection
      :key="renderKey"
      :options="delivery_data"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
      class="ml-2"
    />

    <!-- Bike Data -->
    <div v-if="defaultTransportType == 'Bike'">
      <div v-if="express_contract_type == 'normal'">
        <div class="color-343434 text-sm ml-2 my-2 font-bold">
          Monthly minimum
        </div>
        <div class="formgrid grid ml-2">
          <div class="field col-12 md:col-4 m-0 p-0">
            <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="bikeNormalData.per_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              No. of Units
            </h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="bikeNormalData.no_of_units"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">Amount</h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="bikeNormalData.amount"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4 m-0 p-0">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Additional Job $
            </h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="bikeNormalData.additional_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>

      <div v-if="express_contract_type == 'e_commerce'">
        <div
          v-for="data of bikeEcomData"
          :key="data?.delivery_type_id"
          class="field col-12"
        >
          <div>
            <div class="color-343434 text-sm mb-2 font-bold">
              {{ data?.delivery_type }}
            </div>
            <div class="formgrid grid ml-0">
              <div class="field col-12 md:col-4 m-0 p-0">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  job $
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.per_job"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  No. of Units
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.no_of_units"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  Amount
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.amount"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4 m-0 p-0">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  Additional Job $
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  :maxFractionDigits="2"
                  v-model="data.additional_job"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Van Data -->
    <div v-if="defaultTransportType == 'Van'">
      <div v-if="express_contract_type == 'normal'">
        <div class="color-343434 text-sm ml-2 my-2 font-bold">
          Monthly minimum
        </div>
        <div class="formgrid grid ml-2">
          <div class="field col-12 md:col-4 m-0 p-0">
            <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="vanNormalData.per_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              No. of Units
            </h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="vanNormalData.no_of_units"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">Amount</h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="vanNormalData.amount"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4 m-0 p-0">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Additional Job $
            </h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="vanNormalData.additional_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>

      <div v-if="express_contract_type == 'e_commerce'">
        <div
          v-for="data of vanEcomData"
          :key="data?.delivery_type_id"
          class="field col-12"
        >
          <div>
            <div class="color-343434 text-sm ml-2 mb-2 font-bold">
              {{ data?.delivery_type }}
            </div>
            <div class="formgrid grid">
              <div class="field col-12 md:col-4 m-0 p-0">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  job $
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.per_job"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  No. of Units
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.no_of_units"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  Amount
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  v-model="data.amount"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-4 m-0 p-0">
                <h5 class="required color-7a7a7a font-size-14 text-left">
                  Additional Job $
                </h5>
                <NumberField
                  :showButtons="true"
                  mode="decimal"
                  :maxFractionDigits="2"
                  v-model="data.additional_job"
                  :classes="{
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fsr Data -->
    <div v-if="defaultTransportType == 'FSR'">
      <div>
        <div class="color-343434 text-sm ml-2 my-2 font-bold">
          Monthly minimum
        </div>

        <div v-for="(data, index) of fsrRatesData" :key="index">
          <div v-if="index > 0" class="flex justify-content-between">
            <div class="flex"></div>
            <div class="flex color-red" @click="deleteRate(index)">
              <i class="pi parent pi-times mt-2"></i>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-4 m-0 p-0">
              <h5 class="required color-7a7a7a font-size-14 text-left mb-3">
                Detail Type
              </h5>
              <DropDown
                code="name"
                :state="details['rates'][index].detail_type"
                :key="details['rates'][index].detail_type"
                :data="detail_type"
                label="detail_type"
                v-model="details['rates'][index].detail_type"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index]['detail_type'].$invalid &&
                    submitted,
                  'inputfield w-full color-212121 font-bold pb-1': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-2">
              <h5 class="required color-7a7a7a font-size-14 text-left">
                Unit Price
              </h5>
              <NumberField
                :showButtons="true"
                mode="decimal"
                v-model="details['rates'][index].unit_price"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index].unit_price.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-2">
              <h5 class="required color-7a7a7a font-size-14 text-left">
                Quantity
              </h5>
              <NumberField
                :showButtons="true"
                mode="decimal"
                v-model="details['rates'][index].quantity"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index].quantity.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-2">
              <h5 class="required color-7a7a7a font-size-14 text-left">
                Amount
              </h5>
              <NumberField
                :showButtons="true"
                mode="decimal"
                v-model="details['rates'][index].amount"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][index].amount.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
          </div>
        </div>
        <div class="flex mb-2">
          <span class="dialog-new-field mt-0 color-3057ff" @click="addRate"
            ><b>+ Add Rates </b></span
          >
        </div>
      </div>
    </div>
    <!-- Surcharges -->
    <div class="color-343434 text-sm ml-2 mb-2 font-bold">Charges</div>
    <div class="row pl-1">
      <div
        v-for="data in surchargesData"
        :key="data"
        class="field col-12 md:col-4 ml-2"
      >
        <div>
          <span class="required color-7a7a7a font-size-14 text-left">
            {{ data.surcharges }}
          </span>
          <NumberField
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            v-model="data.rate"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div v-if="defaultTransportType == 'Bike'" class="field col-12 md:col-12">
      <h5 class="text-style text-left">Remarks</h5>
      <TextAreaField
        class="mr-5"
        v-model="details.bike.remarks"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div v-if="defaultTransportType == 'Van'" class="field col-12 md:col-12">
      <h5 class="text-style text-left">Remarks</h5>
      <TextAreaField
        class="mr-5"
        v-model="details.van.remarks"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div v-if="defaultTransportType == 'FSR'" class="field col-12 md:col-12">
      <h5 class="text-style text-left">Remarks</h5>
      <TextAreaField
        class="mr-5"
        v-model="details.fsr.remarks"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
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
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Checkbox from "primevue/checkbox";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import DuoSelection from "../../DuoSelect.vue";
export default {
  name: "RateAdjustment",
  components: {
    Checkbox,
    DuoSelection,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      ratesData: null,
      renderKey: 10,
      payloadData: {},
      bikeNormalData: {},
      vanNormalData: {},
      bikeEcomData: [],
      vanEcomData: [],
      addSalesClicked: 0,
      fsrRatesData: ["new_sales"],
      surchargesData: [],
      delivery_data: [],
      patchData: {},
      bikeValidation: {
        credit_limits: { required },
        effective_from_date: { required },
      },
      vanValidation: {
        credit_limits: { required },
        effective_from_date: { required },
      },
      RatesValidation: [
        {
          detail_type: { required },
          unit_price: { required },
          quantity: { required },
          amount: { required },
        },
      ],
      detail_type: [
        { name: "Minimum", code: "Minimum" },
        { name: "Additional", code: "Additional" },
        { name: "Special", code: "Special" },
        { name: "FTZ", code: "FTZ" },
        { name: "Standard Entry", code: "Standard Entry" },
        { name: "Others", code: "Others" },
        { name: "Open", code: "USD" },
        { name: "Open Close", code: "SGD" },
        { name: "Close", code: "SGD" },
      ],
      method: "",
      patchID: "",
      express_contract_type: "",
      service_type: "",
      defaultTransportType: "Bike",
      details: {
        rebate: false,
        effective_from_date: null,
        effective_to_date: null,
        contract_id: "",
        customer_type: "",
        business_type: "",
        credit_limits: "",
        remarks: null,
        bike: {
          std_entries: false,
          remarks: null,
          type: "",
          e_commerce: false,
          normal: false,
        },
        van: {
          std_entries: false,
          remarks: null,
          type: "",
          e_commerce: false,
          normal: false,
        },
        fsr: {
          std_entries: false,
          remarks: null,
          type: "",
          e_commerce: false,
          normal: false,
        },
        rates: [
          {
            detail_type: "",
            unit_price: "",
            quantity: "",
            amount: "",
          },
        ],
      },
    };
  },
  validations() {
    if (this.service_type == "BIKE + VAN") {
      if (this.details.rebate) {
        return {
          details: {
            effective_from_date: { required },
            effective_to_date: { required },
            credit_limits: { required },
          },
        };
      } else if (!this.details.rebate) {
        return {
          details: {
            effective_from_date: { required },
            credit_limits: { required },
          },
        };
      }
    } else {
      if (this.details.rebate && this.addSalesClicked > -1) {
        return {
          details: {
            rates: this.RatesValidation,
            effective_from_date: { required },
            effective_to_date: { required },
            credit_limits: { required },
          },
        };
      } else if (!this.details.rebate && this.addSalesClicked > -1) {
        return {
          details: {
            rates: this.RatesValidation,
            effective_from_date: { required },
            credit_limits: { required },
          },
        };
      }
    }
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
    "details.effective_from_date": function () {
      this.details.effective_from_date = this.dateFormater(
        this.details.effective_from_date
      );
    },
    "details.effective_to_date": function () {
      this.details.effective_to_date = this.dateFormater(
        this.details.effective_to_date
      );
    },
  },
  methods: {
    ...mapActions({
      getRateAdjustment: "salesCommon/getRateAdjustment",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("MM-DD-YYYY");
        return formattedDate;
      }
    },
    addRate() {
      this.details.rates.push({
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
      });
      this.fsrRatesData.push("new_sales");
      this.RatesValidation.push({
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
      });
      this.addSalesClicked++;
    },
    deleteRate(index) {
      this.fsrRatesData.splice(index, 1);
      this.details.rates.splice(index, 1);
      this.RatesValidation.splice(index, 1);
      this.addSalesClicked++;
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        this.payloadData = {};
        this.payloadData.bike = this.ratesData.bike;
        this.payloadData.van = this.ratesData.van;
        this.payloadData.fsr = this.ratesData.fsr;
        this.payloadData.rebate = this.details.rebate;
        this.payloadData.effective_from_date = this.details.effective_from_date;
        this.payloadData.effective_to_date = this.details.effective_to_date;
        this.payloadData.credit_limits = this.details.credit_limits;
        this.payloadData.remarks = this.details.remarks;
        this.payloadData.contract_id = this.overview_data.id;
        this.payloadData.customer_type = this.details.customer_type;
        this.payloadData.business_type = this.details.business_type;

        this.payloadData.bike_rates = {};
        this.payloadData.van_rates = {};
        this.payloadData.fsr_rates = {};
        if (
          this.ratesData.bike == true &&
          this.ratesData.bike_rates.charge_type == "normal"
        ) {
          this.normalPayloadDataBike();
        } else if (
          this.ratesData.bike == true &&
          this.ratesData.bike_rates.charge_type == "e_commerce"
        ) {
          this.ecomPayloadDataBike();
        }
        if (
          this.ratesData.van == true &&
          this.ratesData.van_rates.charge_type == "normal"
        ) {
          this.normalPayloadDataVan();
        } else if (
          this.ratesData.van == true &&
          this.ratesData.van_rates.charge_type == "e_commerce"
        ) {
          this.ecomPayloadDataVan();
        }
        if (this.ratesData.fsr == true) {
          this.PayloadDataFsr();
        }
        // =====> This code needed <====
        if (this.method == "patch") {
          this.apiPatchCallHandler();
        } else if (this.method == "post") {
          this.apiCallHandler();
        }
      }
    },
    apiCallHandler() {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/contract/rateadjustments",
        data: this.payloadData,
        method: "POST",
        loadData: "salesExpressContract/loadOverviewData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        closeDialog: "salesSales/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate Adjustment is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rate Adjustment already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Rate Adjustment, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandler() {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/contract/rateadjustment/" + this.patchID,
        data: this.payloadData,
        method: "PATCH",
        loadData: "salesExpressContract/loadOverviewData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        closeDialog: "salesSales/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate Adjustment is Edited successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rate Adjustment already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Rate Adjustment, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    normalPayloadDataBike() {
      this.payloadData.bike_rates = this.details.bike;
      this.payloadData.bike_rates = this.details.bike;

      this.payloadData.bike_rates["job"] = this.bikeNormalData?.per_job;
      this.payloadData.bike_rates["no_of_units"] =
        this.bikeNormalData?.no_of_units;
      this.payloadData.bike_rates["amount"] = this.bikeNormalData?.amount;
      this.payloadData.bike_rates["additional_job"] =
        this.bikeNormalData?.additional_job;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    ecomPayloadDataBike() {
      this.payloadData.bike_rates = this.details.bike;
      this.payloadData.bike_rates["delivery_type_rates"] = [];
      this.payloadData.bike_rates.delivery_type_rates = this.bikeEcomData;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    PayloadDataFsr() {
      this.payloadData.fsr_rates = this.details.fsr;
      this.payloadData.fsr_rates["rates"] = [];
      this.payloadData.fsr_rates.rates = this.details.rates;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    normalPayloadDataVan() {
      this.payloadData.van_rates = this.details.van;
      this.payloadData.van_rates["job"] = this.vanNormalData?.per_job;
      this.payloadData.van_rates["no_of_units"] =
        this.vanNormalData?.no_of_units;
      this.payloadData.van_rates["amount"] = this.vanNormalData?.amount;
      this.payloadData.van_rates["additional_job"] =
        this.vanNormalData?.additional_job;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    ecomPayloadDataVan() {
      this.payloadData.van_rates = this.details.van;
      this.payloadData.van_rates["delivery_type_rates"] = [];
      this.payloadData.van_rates.delivery_type_rates = this.vanEcomData;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    // ====> this Code needed <=====
    patchPrefillData(data) {
      this.ratesData = this.overview_data.express_contract[0];
      this.details.rebate = data.rebate;
      this.details.credit_limits = data.credit_limits;
      this.details.effective_from_date = data.effective_from_date;
      this.details.effective_to_date = data.effective_to_date;
      this.details.contract_id = data.contract_id;
      this.details.remarks = data.remarks;
      this.details.customer_type = this.overview_data.customer_type;
      this.details.business_type = this.overview_data.business_type;

      if (data.bike == true) {
        this.details.bike.type = "bike";
        this.details.bike.remarks = data.bike_rate.remarks;
        if (data.bike_rate.e_commerce == true) {
          this.details.bike.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.bikeEcomData = [];
          data.bike_rate.bike_ecommerce.map((list) => {
            this.bikeEcomData.push({
              delivery_type: list.delivery_type,
              delivery_type_initial: list.delivery_type_initial,
              selected: list.selected,
              no_of_units: list.no_of_units,
              per_job: list.per_job,
              amount: list.amount,
              additional_job: list.additional_job,
              cut_off_time: list.cut_off_time,
              cut_off_days: list.cut_off_days,
              timeslot_delivery: list.timeslot_delivery,
              time_slot_delivery_fixed_hours:
                list.time_slot_delivery_fixed_hours,
            });
          });
        } else if (data.bike_rate.normal == true) {
          this.details.bike.normal = true;
          this.express_contract_type = "normal";
          this.bikeNormalData = {};
          this.bikeNormalData.per_job = data.bike_rate.job;
          this.bikeNormalData.no_of_units = data.bike_rate.no_of_units;
          this.bikeNormalData.amount = data.bike_rate.amount;
          this.bikeNormalData.additional_job = data.bike_rate.additional_job;
        }
      }
      if (data.van == true) {
        this.details.van.type = "van";
        this.details.van.remarks = data.van_rate.remarks;
        if (data.van_rate.e_commerce == true) {
          this.details.van.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.vanEcomData = [];
          data.van_rate.van_ecommerce.map((list) => {
            this.vanEcomData.push({
              delivery_type: list.delivery_type,
              no_of_units: list.no_of_units,
              per_job: list.per_job,
              amount: list.amount,
              additional_job: list.additional_job,
              cut_off_time: list.cut_off_time,
            });
          });
        } else if (data.van_rate.normal == true) {
          this.details.van.normal = true;
          this.express_contract_type = "normal";
          this.vanNormalData = {};
          this.vanNormalData.per_job = data.van_rate.job;
          this.vanNormalData.no_of_units = data.van_rate.no_of_units;
          this.vanNormalData.amount = data.van_rate.amount;
          this.vanNormalData.additional_job = data.van_rate.additional_job;
        }
      }
      if (data.fsr == true) {
        this.details.fsr.type = "fsr";
        this.details.fsr.remarks = data.fsr_rate.remarks;
        this.details.fsr.std_entries = true;
        this.details.rates = [];
        this.fsrRatesData = [];
        this.RatesValidation = [];
        data.fsr_rate.fsr_detail_charges.map((list) => {
          this.details.rates.push({
            detail_type: list.detail_type,
            unit_price: list.unit_price,
            quantity: list.quantity,
            amount: list.amount,
          });
          this.fsrRatesData.push("new_sales");
          this.RatesValidation.push({
            detail_type: { required },
            unit_price: { required },
            quantity: { required },
            amount: { required },
          });
          this.addSalesClicked++;
        });
      }
      data.surcharges.map((list) => {
        this.surchargesData.push({
          surcharges: list.surcharges,
          rate: list.rate,
        });
      });
    },
    postPrefillData() {
      this.ratesData = this.overview_data.express_contract[0];
      this.details.contract_id = this.overview_data.id;
      this.details.customer_type = this.overview_data.customer_type;
      this.details.business_type = this.overview_data.business_type;
      if (this.ratesData.bike == true) {
        this.details.bike.type = "bike";
        if (this.ratesData.bike_rates.charge_type == "e_commerce") {
          this.details.bike.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.bikeEcomData = [];
          this.ratesData.bike_rates.e_commerce_charges.map((list) => {
            this.bikeEcomData.push({
              delivery_type: list.delivery_type,
              delivery_type_initial: list.delivery_type_initial,
              selected: list.selected,
              no_of_units: list.no_of_units,
              per_job: list.per_job,
              amount: list.amount,
              additional_job: list.additional_job,
              cut_off_time: list.cut_off_time,
              cut_off_days: list.cut_off_days,
              timeslot_delivery: list.timeslot_delivery,
              time_slot_delivery_fixed_hours:
                list.time_slot_delivery_fixed_hours,
            });
          });
        } else if (this.ratesData.bike_rates.charge_type == "normal") {
          this.details.bike.normal = true;
          this.express_contract_type = "normal";
          this.bikeNormalData = this.ratesData.bike_rates.normal_charges[0];
        }
      }
      if (this.ratesData.van == true) {
        this.details.van.type = "van";
        if (this.ratesData.van_rates.charge_type == "e_commerce") {
          this.details.van.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.vanEcomData = [];
          this.ratesData.van_rates.e_commerce_charges.map((list) => {
            this.vanEcomData.push({
              delivery_type: list.delivery_type,
              no_of_units: list.no_of_units,
              per_job: list.per_job,
              amount: list.amount,
              additional_job: list.additional_job,
              cut_off_time: list.cut_off_time,
            });
          });
        } else if (this.ratesData.van_rates.charge_type == "normal") {
          this.details.van.normal = true;
          this.express_contract_type = "normal";
          this.vanNormalData = this.ratesData.van_rates.normal_charges[0];
        }
      }
      if (this.ratesData.fsr == true) {
        this.details.fsr.type = "fsr";
        this.details.fsr.std_entries = true;
        this.details.rates = [];
        this.fsrRatesData = [];
        this.RatesValidation = [];
        this.ratesData.fsr_rates[0].rates.map((list) => {
          this.details.rates.push({
            detail_type: list.detail_type,
            unit_price: list.unit_price,
            quantity: list.quantity,
            amount: list.amount,
          });
          this.fsrRatesData.push("new_sales");
          this.RatesValidation.push({
            detail_type: { required },
            unit_price: { required },
            quantity: { required },
            amount: { required },
          });
          this.addSalesClicked++;
        });
      }
      this.surchargesData = [];
      this.ratesData.bill_settings.surcharges.map((list) => {
        this.surchargesData.push({
          surcharges: list.surcharge_name,
          rate: list.rates,
        });
      });
    },
  },
  async created() {
    // ====> this Code needed <=====
    const res = await this.getRateAdjustment(this.$route.params.id);

    if (res.data.results != null) {
      this.method = "patch";
      this.patchID = res.data.results.id;
      this.express_contract_type = res.data.results.express_type;
      this.patchData = res.data.results;
      this.patchPrefillData(res.data.results);
    } else if (res.data.results == null) {
      this.postPrefillData();
      this.method = "post";
    }
    this.ratesData = this.overview_data?.express_contract[0];
    if (
      this.ratesData.bike == true &&
      this.ratesData.van == true &&
      this.ratesData.fsr == false
    ) {
      this.service_type = "BIKE + VAN";
      this.delivery_data = ["Bike", "Van"];
      this.defaultTransportType = "Bike";
      this.addSalesClicked++;
    } else if (
      this.ratesData.bike == false &&
      this.ratesData.van == true &&
      this.ratesData.fsr == true
    ) {
      this.defaultTransportType = "Van";
      this.service_type = "VAN + FSR";
      this.delivery_data = ["Van", "FSR"];
      this.renderKey++;
    } else if (
      this.ratesData.bike == true &&
      this.ratesData.van == false &&
      this.ratesData.fsr == true
    ) {
      this.service_type = "BIKE + FSR";
      this.delivery_data = ["Bike", "FSR"];
      this.defaultTransportType = "Bike";
    }
  },
};
</script>

<style scoped>
.text-style {
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  color: #7a7a7a;
}
</style>
