<template>
  <!-- <InternationalRegularTabs :tabMenuData="VanOrBikeTab" class="mt-2" /> -->
  <div>
    <div class="p-1 mt-4 mb-2">
      <DuoSelection
        :options="['Bike', 'Project']"
        :default="defaultTransportType"
        type="setRegionDeliveryTransportType"
      />
    </div>
    <div class="formgrid grid">
      <div class="col-4">
        <h5 class="dialog-label-text fourth-head font-size-14 ">Monthly Minimum</h5>
      </div>
    </div>
    <div v-if="defaultTransportType == 'Bike'">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">No. of Units</h5>
          <TextField
            label="no_of_units"
            type="number"
            v-model="details.bike.no_of_units"
            @blur="v$.details.bike.no_of_units.$model;"
            v-on:childToParent="getUserInput_bike"
            :classes="{
              'p-invalid': v$.details.bike.no_of_units.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div :key="renderKey" class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Job $</h5>
          <TextField
            label="per_job"
            type="number"
            v-model="details.bike.per_job"
            @blur="v$.details.bike.per_job.$model;"
            v-on:childToParent="getUserInput_bike"
            :classes="{
              'p-invalid': v$.details.bike.per_job.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Amount</h5>
          <NumberField
            label="amount"
            id="amount"
            :disable="true"
            v-model="details.bike.amount"
            @blur="v$.details.bike.amount.$model;"
            v-on:childToParent="getUserInput_bike"
            :classes="{
              'p-invalid': v$.details.bike.amount.$invalid && submitted,
              ' ftz w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div :key="renderKey" class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Additional Job $</h5>
          <TextField
            label="additional_job"
            type="number"
            v-model="details.bike.additional_job"
            @blur="v$.details.bike.additional_job.$model;"
            :classes="{
              'p-invalid': v$.details.bike.additional_job.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div :key="renderKey" class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Billing Cycle</h5>
          <DropDownField
            code="name"
            :data="billing_cycle"
            @blur="v$.details.bike.billing_cycle.$model;"
            label="billing_cycle"
            v-model="details.bike.billing_cycle"
            :value="details.bike.billing_cycle"
            v-on:childToParent="getUserInput_bike"
            :class="{
              'p-invalid': v$.details.bike.billing_cycle.$invalid && submitted,
              ' ftz w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>

    <!-- PROJECT -->
    <div v-if="defaultTransportType == 'Project'">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Detail Type</h5>
          <TextField
            label="detail_type"
            type="text"
            v-model="details.project.detail_type"
            @blur="v$.details.project.detail_type.$model;"
            v-on:childToParent="getUserInput_project"
            :classes="{
              'p-invalid': v$.details.project.detail_type.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Unit Price</h5>
          <TextField
            label="unit_price"
            type="number"
            v-model="details.project.unit_price"
            @blur="v$.details.project.unit_price.$model;"
            v-on:childToParent="getUserInput_project"
            :classes="{
              'p-invalid': v$.details.project.unit_price.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Quantity</h5>
          <TextField
            label="quantity"
            id="quantity"
            type="number"
            v-model="details.project.quantity"
            @blur="v$.details.project.quantity.$model;"
            v-on:childToParent="getUserInput_project"
            :classes="{
              'p-invalid': v$.details.project.quantity.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text font-size-14">Amount</h5>
          <TextField
            label="amount"
            id="amount"
            type="number"
            v-model="details.project.amount"
            @blur="v$.details.project.amount.$model;"
            v-on:childToParent="getUserInput_project"
            :classes="{
              'p-invalid': v$.details.project.amount.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text font-size-14">Description</h5>
          <TextAreaField
            label="description"
            @blur="v$.details.project.description.$model;"
            type="text"
            v-model="details.project.description"
            v-on:childToParent="getUserInput_project"
            :classes="{
              'p-invalid': v$.details.project.description.$invalid && submitted,

              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>

    <div>
      <div
        class="field col-12 md:col-12 mt-4 p-2"
        style="background: #e6e6e6; border-radius: 5px"
      >
        <span class="ml-3 font-size-12 color-343434"> Billing settings </span>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required font-size-14">Credit Limit $</h5>
          <TextField
            label="credit_limit"
            type="number"
            v-model="bill_settings.credit_limit"
            :classes="{
              'p-invalid': v$.bill_settings.credit_limit.$invalid && submitted,
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text font-size-14">Credit Terms</h5>
          <TextField
            label="credit_term_days"
            type="number"
            v-model="bill_settings.credit_term_days"
            :classes="{
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div
          v-for="(data, index) of surcharges"
          :key="index"
          class="field col-12 md:col-4"
        >
          <h5 class="dialog-label-text">{{ data.surcharge_name }}</h5>
          <TextField
            label="sms"
            type="number"
            v-model="surchargesData[index]['rates']"
            :value="surchargesData[index]['rates']"
            :classes="{
              ' ftz w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>

    <p class="ml-2 mt-3 fourth-head">Trip Charges</p>
    <div class="row align-items-center pl-1">
      <div v-for="list of checkboxList" :key="list.key" class="col-3">
        <div class="flex flex-gap flex-row">
          <div class="flex align-items-center">
            <SingleCheckBox
              :label="list.value"
              v-model="bill_settings[list.key]"
              :value="bill_settings[list.key]"
            />

            <NumberField
              v-if="list.key == 'ftz_selected'"
              label="sms"
              v-model="bill_settings.ftz"
              :value="bill_settings.ftz"
              :classes="{
                'inputfield ftz dialog-field-text ml-2 py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="formgrid grid pl-2 pr-2">
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
        <Buttons
          label="Previous"
          v-on:childToParent="goBack"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <div class="flex align-items-center justify-content-end">
          <div v-if="validationErr && submitted" class="err mr-5">
            Required fields are missing
          </div>
          <div class="flex align-self-center justify-content-end">
            <CancelButton storePath="salesSales" label="Cancel"/>

            <Buttons
              label="Next"
              button_class="dialog-button-text"
              v-on:childToParent="submitData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../../DuoSelect.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SalesExpressContractBikeProjectJobsFourthStep",
  components: {
    DuoSelection,
  },
  data: () => ({
    // VanOrBikeTab: VanOrBikeFSR,
    defaultTransportType: "Bike",

    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    v$: useVuelidate(),
    surcharges: [],
    validationErr: true,
    renderKey: 10,
    surchargesData: [],
    checkboxList: [
      { key: "weekend_2nd_trip_charge", value: "Weekday 2nd Trip Charge" },
      { key: "saturday_2nd_trip_charge", value: "Saturday 2nd Trip Charge" },
      { key: "return_trip_charge", value: "Return Trip Charge" },
      {
        key: "return_trip_partial_charge",
        value: "Return Trip Partial Charge",
      },
      { key: "collection_trip_charge", value: "Collection Trip Charge" },
      { key: "special_monitoring", value: "Special Monitoring" },
      { key: "call_centre", value: "Call Center" },
      { key: "ftz_selected", value: "FTZ" },
    ],
    bill_settings: {
      credit_limit: "",
      credit_term_days: "",
      weekend_2nd_trip_charge: false,
      saturday_2nd_trip_charge: false,
      return_trip_charge: false,
      return_trip_partial_charge: false,
      collection_trip_charge: false,
      special_monitoring: false,
      ftz_selected: false,
      ftz: null,
      call_centre: false,
    },
    details: {
      bike: {
        per_job: "",
        no_of_units: "",
        amount: "",
        additional_job: "",
        billing_cycle: "",
      },
      project: {
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        bike: {
          per_job: { required },
          no_of_units: { required },
          amount: { required },
          additional_job: { required },
          billing_cycle: { required },
        },
        project: {
          detail_type: { required },
          unit_price: { required },
          quantity: { required },
          amount: { required },
          description: { required },
        },
      },
      bill_settings: {
        credit_limit: { required },
      },
    };
  },
  watch: {
    selectedRateCardId() {
      this.getSurcharges();
    },

    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
    bill_settings: {
      handler() {
        let surcharge =
          this.$store.state.salesExpressContractBikeProjectJobs.payloadData
            ?.quotation?.bill_settings?.surcharges;

        if (surcharge) {
          this.setPayloadData({
            key: "quotation",
            value: {
              bill_settings: {
                ...this.bill_settings,
                surcharges: surcharge,
              },
            },
          });
        } else {
          this.setPayloadData({
            key: "quotation",
            value: { bill_settings: this.bill_settings },
          });
        }
      },
      deep: true,
    },
    surchargesData: {
      handler() {
        this.setPayloadData({
          key: "quotation",
          value: {
            bill_settings: {
              ...this.bill_settings,
              surcharges: this.surchargesData,
            },
          },
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedRateCardId:
        "salesExpressContractBikeProjectJobs/selectedRateCardId",
      quotationData: "salesExpressContractBikeProjectJobs/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      getSurchargersData:
        "salesExpressContractBikeProjectJobs/getSurchargersData",
      setCurrentStep: "salesExpressContractBikeProjectJobs/setCurrentStep",
      setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      getRateSuggestion:
        "salesExpressContractBikeProjectJobs/getRateSuggestion",
    }),
    async getUserInput_bike(label, value) {
      if (label === "no_of_units") {
        const res = await this.getRateSuggestion({
          id: 93,
          payload: { units: value },
        });

        if (res) {
          console.log(res.data);
          this.details.bike.per_job = res.data.results.jobs;

          this.details.bike.amount =
            this.details.bike.no_of_units * this.details.bike.per_job;

          this.renderKey++;
        }
      }
      this.setPayloadData({
        key: "quotation",
        value: {
          costing_details: {
            bike: {
              settings:
                this.$store.state.salesExpressContractBikeProjectJobs
                  .payloadData?.quotation?.costing_details?.bike?.settings,
              ...this.details.bike,
            },
            project_job: {
              settings:
                this.$store.state.salesExpressContractBikeProjectJobs
                  .payloadData?.quotation?.costing_details?.project_job
                  ?.settings,
              ...this.details.project,
            },
          },
        },
      });
    },
    getUserInput_project() {
      this.setPayloadData({
        key: "quotation",
        value: {
          costing_details: {
            bike: {
              settings:
                this.$store.state.salesExpressContractBikeProjectJobs
                  .payloadData?.quotation?.costing_details?.bike?.settings,
              ...this.details.bike,
            },
            project_job: {
              settings:
                this.$store.state.salesExpressContractBikeProjectJobs
                  .payloadData?.quotation?.costing_details?.project_job
                  ?.settings,
              ...this.details.project,
            },
          },
        },
      });
    },
    checkBoxChange(val) {
      console.log(val, "val src");
      if (val && val.length) {
        this.bill_settings[val.name] = true;
      } else {
        this.bill_settings[val.name] = false;
      }
    },
    goBack() {
      this.setCurrentStep(3);
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        this.validationErr = false;
        this.setCurrentStep(5);
      }
    },
    async getSurcharges() {
      try {
        const res = await this.getSurchargersData(this.selectedRateCardId);

        if (res) {
          this.surcharges = res.data.results;

          this.surcharges.map((list) => {
            this.surchargesData.push({
              surcharge_name: list.surcharge_name,
              surcharge_id: list.surcharge_id,
              rates: list.rates,
              selected: true,
            });
          });
        } else return;
      } catch (error) {
        console.log(error);
      }
    },
    prefillData() {
      this.details.bike.no_of_units =
        this.quotationData.express_contract[0].bike.no_of_units;
      this.details.bike.per_job =
        this.quotationData.express_contract[0].bike.per_job;
      this.details.bike.amount =
        this.quotationData.express_contract[0].bike.amount;
      this.details.bike.additional_job =
        this.quotationData.express_contract[0].bike.additional_job;
      this.details.bike.billing_cycle =
        this.quotationData.express_contract[0].bike.billing_cycle;

      this.details.project.detail_type =
        this.quotationData.express_contract[0].project_job.detail_type;
      this.details.project.unit_price =
        this.quotationData.express_contract[0].project_job.unit_price;
      this.details.project.quantity =
        this.quotationData.express_contract[0].project_job.quantity;
      this.details.project.amount =
        this.quotationData.express_contract[0].project_job.amount;
      this.details.project.description =
        this.quotationData.express_contract[0].project_job.description;

      this.bill_settings.credit_limit =
        this.quotationData.express_contract[0].bill_settings[0].credit_limit;
      this.bill_settings.credit_term_days =
        this.quotationData.express_contract[0].bill_settings[0].credit_term_days;
      this.bill_settings.weekend_2nd_trip_charge =
        this.quotationData.express_contract[0].bill_settings[0].weekend_2nd_trip_charge;
      this.bill_settings.saturday_2nd_trip_charge =
        this.quotationData.express_contract[0].bill_settings[0].saturday_2nd_trip_charge;
      this.bill_settings.return_trip_charge =
        this.quotationData.express_contract[0].bill_settings[0].return_trip_charge;
      this.bill_settings.return_trip_partial_charge =
        this.quotationData.express_contract[0].bill_settings[0].return_trip_partial_charge;
      this.bill_settings.collection_trip_charge =
        this.quotationData.express_contract[0].bill_settings[0].collection_trip_charge;
      this.bill_settings.special_monitoring =
        this.quotationData.express_contract[0].bill_settings[0].special_monitoring;
      this.bill_settings.ftz =
        this.quotationData.express_contract[0].bill_settings[0].ftz;
      this.bill_settings.ftz_selected =
        this.quotationData.express_contract[0].bill_settings[0].ftz_selected;
      this.bill_settings.call_centre =
        this.quotationData.express_contract[0].bill_settings[0].call_centre;

      this.renderKey++;
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
  async created() {
    await this.getSurcharges();

    if (this.surchargesData.length == 0) {
      this.setPayloadData({
        key: "quotation",
        value: {
          bill_settings: {
            ...this.bill_settings,
            surcharges: [],
          },
        },
      });
    }
  },
};
</script>
<style scoped>
.err {
  color: red;
}
.subFormHeaders {
  color: black;
  font-weight: bolder;
  font-size: 14px;
}
.subFormHeadersLarge {
  color: black;
  font-weight: bolder;
  font-size: 16px;
}
.checksLabel {
  margin-top: 10%;
}
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
  margin-top: 13px;
}
.text {
  color: black;
  background: #e6e6e6;
  margin-top: 10px;
  border-radius: 7px;
  font-weight: bold;
}
.fourth-head {
  font-weight: 700;
  font-size: 14px;
  color: #343434;
}

/* .ftz {
  width: 100px !important;
} */

/* .flex-gap {
  gap: 1rem;
} */
</style>
