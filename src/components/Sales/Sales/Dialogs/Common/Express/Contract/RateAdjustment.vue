<template>
  <div>
    <div class="flex ml-2">
      <div class="flex flex-row">
        <div class="flex">
          <Checkbox v-model="details.rebate" :binary="true" />
          <span class="bold-600 font-size-12 color-4e5868 ml-2">Rebate</span>
        </div>
      </div>
    </div>
    <br />
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
            'p-invalid': v$.details.credit_limits.$invalid && submitted,
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
            'p-invalid': v$.details.effective_from_date.$invalid && submitted,
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
            'p-invalid': v$.details.effective_to_date.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div v-if="this.ratesData.bike == true || this.ratesData.van == true">
      <div v-if="express_contract_type == 'normal'">
        <div class="color-343434 text-sm ml-2 mb-2 font-bold">
          Monthly minimum
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              v-model="normalData.per_job"
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
              v-model="normalData.no_of_units"
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
              v-model="normalData.amount"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Additional Job $
            </h5>
            <NumberField
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              v-model="normalData.additional_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="express_contract_type == 'e_commerce'">
        <div
          v-for="data of ecomData"
          :key="data?.delivery_type_id"
          class="field col-12"
        >
          <div>
            <div class="color-343434 text-sm ml-2 mb-2 font-bold">
              {{ data?.delivery_type }}
            </div>
            <br />
            <div class="formgrid grid">
              <div class="field col-12 md:col-4">
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
              <div class="field col-12 md:col-4">
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
    <div v-if="this.ratesData.fsr == true">
      <div>
        <div class="color-343434 text-sm ml-2 my-2 font-bold">
          Monthly minimum
        </div>
        <div
          v-for="data of fsrRatesData"
          :key="data?.delivery_type_id"
          class="field col-12"
        >
          <div class="formgrid grid">
            <div class="field col-12 md:col-4 m-0 p-0">
              <h5 class="required color-7a7a7a font-size-14 text-left mb-3">
                Detail Type
              </h5>
              <DropDown
                code="name"
                :state="data.detail_type"
                :key="data.detail_type"
                :data="detail_type"
                label="detail_type"
                v-model="data.detail_type"
                :class="{
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
                v-model="data.unit_price"
                :classes="{
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
                v-model="data.quantity"
                :classes="{
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
                v-model="data.amount"
                :classes="{
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="color-343434 text-sm ml-2 mb-2 font-bold">Charges</div>
    <div class="row ml-1">
      <div
        v-for="data in surchargesData"
        :key="data"
        class="field col-12 md:col-4"
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
    <div class="field col-12 md:col-12">
      <h5 class="text-style text-left">Remarks</h5>
      <TextAreaField
        class="mr-5"
        v-model="details.remarks"
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
export default {
  name: "RateAdjustment",
  components: {
    Checkbox,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      payloadData: {},
      normalData: {},
      ecomData: [],
      fsrRatesData: [],
      surchargesData: [],
      ratesData: [],
      method: "",
      patchID: "",
      express_contract_type: "",
      details: {
        rebate: false,
        credit_limits: "",
        effective_from_date: null,
        effective_to_date: null,
        contract_id: "",
        remarks: "",
        customer_type: "",
        business_type: "",

        //
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
      },
    };
  },
  validations() {
    if (this.details.rebate) {
      return {
        details: {
          credit_limits: { required },
          effective_from_date: { required },
          effective_to_date: { required },
        },
      };
    } else {
      return {
        details: {
          credit_limits: { required },
          effective_from_date: { required },
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  watch: {
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

      this.payloadData.bike_rates["job"] = this.normalData?.per_job;
      this.payloadData.bike_rates["no_of_units"] = this.normalData?.no_of_units;
      this.payloadData.bike_rates["amount"] = this.normalData?.amount;
      this.payloadData.bike_rates["additional_job"] =
        this.normalData?.additional_job;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    ecomPayloadDataBike() {
      this.payloadData.bike_rates = this.details.bike;
      this.payloadData.bike_rates["delivery_type_rates"] = [];
      this.payloadData.bike_rates.delivery_type_rates = this.ecomData;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    PayloadDataFsr() {
      this.payloadData.fsr_rates = this.details.fsr;
      this.payloadData.fsr_rates["rates"] = [];
      this.payloadData.fsr_rates.rates = this.fsrRatesData;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    normalPayloadDataVan() {
      this.payloadData.van_rates = this.details.van;
      this.payloadData.van_rates["job"] = this.normalData?.per_job;
      this.payloadData.van_rates["no_of_units"] = this.normalData?.no_of_units;
      this.payloadData.van_rates["amount"] = this.normalData?.amount;
      this.payloadData.van_rates["additional_job"] =
        this.normalData?.additional_job;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    ecomPayloadDataVan() {
      this.payloadData.van_rates = this.details.van;
      this.payloadData.van_rates["delivery_type_rates"] = [];
      this.payloadData.van_rates.delivery_type_rates = this.ecomData;
      this.payloadData["surcharges"] = [];
      this.payloadData.surcharges = this.surchargesData;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    prefillData(data) {
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
          this.ecomData = [];
          data.bike_rate.bike_ecommerce.map((list) => {
            this.ecomData.push({
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
          this.normalData = {};
          this.normalData.per_job = data.bike_rate.job;
          this.normalData.no_of_units = data.bike_rate.no_of_units;
          this.normalData.amount = data.bike_rate.amount;
          this.normalData.additional_job = data.bike_rate.additional_job;
        }
      }
      if (data.van == true) {
        this.details.van.type = "van";
        this.details.van.remarks = data.van_rate.remarks;
        if (data.van_rate.e_commerce == true) {
          this.details.van.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.ecomData = [];
          data.van_rate.van_ecommerce.map((list) => {
            this.ecomData.push({
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
          this.normalData = {};
          this.normalData.per_job = data.van_rate.job;
          this.normalData.no_of_units = data.van_rate.no_of_units;
          this.normalData.amount = data.van_rate.amount;
          this.normalData.additional_job = data.van_rate.additional_job;
        }
      }
      if (data.fsr == true) {
        this.details.fsr.type = "fsr";
        this.details.fsr.remarks = data.fsr_rate.remarks;
        this.fsrRatesData = [];
        data.fsr_rate.fsr_detail_charges.map((list) => {
          this.fsrRatesData.push({
            detail_type: list.detail_type,
            unit_price: list.unit_price,
            quantity: list.quantity,
            amount: list.amount,
          });
          this.details.fsr.std_entries = true;
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
          this.ecomData = [];
          this.ratesData.bike_rates.e_commerce_charges.map((list) => {
            this.ecomData.push({
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
          this.normalData = this.ratesData.bike_rates.normal_charges[0];
        }
      }
      if (this.ratesData.van == true) {
        this.details.van.type = "van";
        if (this.ratesData.van_rates.charge_type == "e_commerce") {
          this.details.van.e_commerce = true;
          this.express_contract_type = "e_commerce";
          this.ecomData = [];
          this.ratesData.van_rates.e_commerce_charges.map((list) => {
            this.ecomData.push({
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
          this.normalData = this.ratesData.van_rates.normal_charges[0];
        }
      }
      if (this.ratesData.fsr == true) {
        this.details.fsr.type = "fsr";
        this.fsrRatesData = [];
        this.ratesData.fsr_rates[0].rates.map((list) => {
          this.fsrRatesData.push({
            detail_type: list.detail_type,
            unit_price: list.unit_price,
            quantity: list.quantity,
            amount: list.amount,
          });
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
    const res = await this.getRateAdjustment(this.$route.params.id);

    if (res.data.results != null) {
      this.method = "patch";
      this.patchID = res.data.results.id;
      this.express_contract_type = res.data.results.express_type;
      this.ratesData = this.overview_data.express_contract[0];
      this.prefillData(res.data.results);
    } else if (res.data.results == null) {
      this.method = "post";
      this.postPrefillData();
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
