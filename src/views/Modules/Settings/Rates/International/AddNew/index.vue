<template>
  <Card>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="left-content flex align-items-center">
          <div
            @click="returnToList"
            class="pi pointer icon pi-arrow-left"
          ></div>
          <div class="color-4e5968 font-size-24 bold-600 ml-3">Add New</div>
        </div>
      </div>
    </template>
    <template #content>
      <div class="content">
        <div class="flex align-items-center">
          <div class="input-wrapper col">
            <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
              Agent Name
              <!-- <span class="required-field ml-2">*</span> -->
            </div>
            <DropDownField
              :data="agentDropdown"
              v-model="formData.agent_id"
              :value="formData.agent_id"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.agent_id.$invalid && !isValid,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
              code="id"
            />
          </div>
          <div class="input-wrapper col">
            <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
              Rate Card Type
              <!-- <span class="required-field ml-2">*</span> -->
            </div>
            <DropDownField
              :data="shippingTypeDropdown"
              v-model="formData.rate_card_type"
              :value="formData.rate_card_type"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.rate_card_type.$invalid && !isValid,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
              code="code"
            />
          </div>
          <div class="input-wrapper col">
            <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
              Shipping Type
              <!-- <span class="required-field ml-2">*</span> -->
            </div>
            <DropDownField
              :data="rateCardNameDropdown"
              v-model="formData.shipping_type"
              :value="formData.shipping_type"
              label="shipping_type"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.shipping_type.$invalid && !isValid,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
              code="code"
            />
          </div>
          <div class="input-wrapper col">
            <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
              Rate Card Name
              <!-- <span class="required-field ml-2">*</span> -->
            </div>
            <TextField
              :data="rateCardTypeDropdown"
              v-model="formData.rate_card_name"
              :value="formData.rate_card_name"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.rate_card_name.$invalid && !isValid,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
              code="code"
            />
          </div>
        </div>

        <div class="stepper-route">
          <div class="flex align-items-center justify-content-between mt-4">
            <StepperRoute
              :activeLabel="currentStep"
              :stepperData="stepperData"
            />
            <div class="righ-content flex align-items-center">
              <div class="flex align-items-center flex-row">
                <SingleCheckBox label="GST" v-model="gst" />
              </div>
              <div class="flex align-items-center flex-row ml-3">
                <SingleCheckBox label="Set as defualt" v-model="setAsDefualt" />
              </div>
              <Buttons
                class="ml-4"
                icon="pi pi-download"
                label="Import"
                button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn color-357dea"
              />
            </div>
          </div>
          <router-view class="mt-5"></router-view>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <div>
          <Buttons
            v-if="this.currentStep >= 2"
            :label="'Back'"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
            v-on:childToParent="backBtn"
          />
        </div>
        <div class="flex align-items-center justify-content-end">
          <Buttons
            class="ml-2"
            :label="'Cancel'"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
            v-on:childToParent="returnToList"
          />
          <Buttons
            v-if="currentStep == 4"
            class="ml-3"
            label="Save"
            button_class="p-button-sm add-btn custom-add-btn bg-357dea"
            v-on:childToParent="onClickSubmit"
            :isloading="isloading"
          />
          <Buttons
            v-else
            class="ml-2"
            label="Next"
            button_class="p-button-sm add-btn custom-add-btn bg-357dea"
            v-on:childToParent="onClickBtn"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import StepperRoute from "../StepperRoute.vue";
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { errhandler } from "@/services/httpClient";

export default {
  components: { Card, StepperRoute },
  data() {
    return {
      isloading: false,
      isValid: true,
      formData: {
        agent_id: "",
        shipping_type: "",
        rate_card_name: "",
        rate_card_type: "",
      },
      gst: false,
      setAsDefualt: false,
      agentDropdown: [],
      shippingTypeDropdown: [
        { name: "Adhoc", code: "Adhoc" },
        { name: "Contract", code: "Contract" },
      ],
      rateCardNameDropdown: [
        { name: "Import", code: "Import" },
        { name: "Export", code: "Export" },
        { name: "Local", code: "Local" },
      ],
      rateCardTypeDropdown: [{ name: "Rate", code: "rate1" }],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        agent_id: { required },
        shipping_type: { required },
        rate_card_name: { required },
        rate_card_type: { required },
      },
    };
  },
  watch: {
    gst(value) {
      this.setCheckboxData({ field: "gst", value });
    },
    setAsDefualt(value) {
      this.setCheckboxData({ field: "default", value });
    },
    footerBtnKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }

      if (this.isNextValid) {
        if (this.currentStep < 4) {
          this.setCurrentStep(this.currentStep + 1);
        }
      }
    },
    isNextValid() {
      if (this.isNextValid) {
        if (this.currentStep < 4) {
          this.setCurrentStep(this.currentStep + 1);
        }
      }
    },
    currentStep(value) {
      if (this.currentStep > 4) return;
      let route_name = this.stepperData[value - 1].routeName;
      this.$router.push({
        name: route_name,
      });
    },
    $route() {
      this.watchRouteChange();
    },
  },
  computed: {
    ...mapGetters({
      currentStep: "AddNewInternational/currentStep",
      isNextValid: "AddNewInternational/isNextValid",
      footerBtnKey: "AddNewInternational/footerBtnKey",
      stepperData: "AddNewInternational/stepperData",

      //Zone Data
      headerFields: "AddNewInternational/headerFields",
      zoneData: "AddNewInternational/zoneData",
      gstValue: "AddNewInternational/gst",
      setAsDefaultValue: "AddNewInternational/setAsDefault",

      //Weight & Rates
      document: "AddNewInternational/WeightAndRates/document",
      parcel: "AddNewInternational/WeightAndRates/parcel",
      documentAndparcel: "AddNewInternational/WeightAndRates/documentAndparcel",

      //Surcharges
      emergencySurcharges: "AddNewInternational/Surcharges/emergencySurcharges",
      restrictedCountry: "AddNewInternational/Surcharges/restrictedCountry",
      overWeightCharges: "AddNewInternational/Surcharges/overWeightCharges",
      remoteAreaCharges: "AddNewInternational/Surcharges/remoteAreaCharges",

      //Add Surcharges
      AddSurchargesData: "AddNewInternational/AddSurcharges/data",
    }),
  },

  methods: {
    ...mapActions({
      setFooterBtnKey: "AddNewInternational/setFooterBtnKey",
      setIsCancelled: "AddNewInternational/setIsCancelled",
      setCurrentStep: "AddNewInternational/setCurrentStep",
      setHeaderFields: "AddNewInternational/setHeaderFields",
      setCheckboxData: "AddNewInternational/setCheckboxData",
      postRateCardData: "AddNewInternational/postRateCardData",
      setGoToPrev: "AddNewInternational/setGoToPrev",
      resetData: "AddNewInternational/resetData",

      getAgentName: "Outbound/getAgentName",
      resetAddSurchargesData: "AddNewInternational/AddSurcharges/resetData",
      resetSurchargesData: "AddNewInternational/Surcharges/resetData",
      resetWeightAndRatesData: "AddNewInternational/WeightAndRates/resetData",
    }),
    async returnToList() {
      await this.$router.push({ name: "salesRates" });
      this.setIsCancelled(true);
      this.resetWeightAndRatesData();
      this.resetSurchargesData();
      this.resetAddSurchargesData();
      this.resetData();
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    watchRouteChange() {
      let route_name = this.$route.name;

      let getStep = this.stepperData.find((list) => {
        if (list.routeName == route_name) {
          return list;
        }
      });

      if (getStep) {
        this.setCurrentStep(getStep.label);
      }
    },
    getUserInput(label, value) {
      if (label == "shipping_type" && value == "Local") {
        this.formData.shipping_type = "";
        this.$router.push({
          name: "AddNewInternationalLocalNormal",
        });
      }
      this.setHeaderFields(this.formData);
    },
    async onClickSubmit() {
      let obj = {
        ...this.headerFields,
        surcharges: {
          emergency_surcharges: this.emergencySurcharges,
          restricted_country_charges: this.restrictedCountry,
          over_weight_charges: this.overWeightCharges,
          remote_area_charges: this.remoteAreaCharges,
        },
        additional_surcharges: this.AddSurchargesData,
        gst: this.gstValue,
        default: this.setAsDefaultValue,
        zones: [],
      };

      let rates = [
        { document: this.document },
        { parcel: this.parcel },
        { document_and_parcel: this.documentAndparcel },
      ];

      //[zones: [{zone_no: 21, countries: [], rates: {document:{}, parcel: {}, document_and_parce: {}}}]]

      this.zoneData.map((zone_list, idx) => {
        obj.zones.push({
          ...zone_list,
          rates: { document: {}, parcel: {}, document_and_parcel: {} },
        });
        rates.map((rates_list) => {
          for (const [key] of Object.entries(rates_list)) {
            for (const [type_key] of Object.entries(rates_list[key])) {
              obj.zones[idx]["rates"][key][type_key] = [];

              rates_list[key][type_key].map((data, data_idx) => {
                obj.zones[idx]["rates"][key][type_key].push({});
                let rate = data;
                Object.keys(rate).map((rateName) => {
                  if (rateName.startsWith("rate")) {
                    let rateId = rateName.split("_");
                    if (rateId[1] == zone_list.zone_no) {
                      obj.zones[idx]["rates"][key][type_key][data_idx] = {
                        fuel_charge: rate.fuel_charge,
                        min_weight: rate.min_weight,
                        max_weight: rate.max_weight,
                        rate: rate[rateName],
                      };
                    }
                  }
                });
              });
            }
          }
        });
      });

      try {
        this.isloading = true;
        await this.postRateCardData(obj);
        this.isloading = false;
        await this.$router.push({ name: "salesRates" });
        this.setIsCancelled(true);
        this.resetWeightAndRatesData();
        this.resetSurchargesData();
        this.resetAddSurchargesData();
        this.resetData();
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "New rate card added successfully",
          life: 3000,
        });
      } catch (err) {
        this.isloading = false;

        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    async onClickBtn() {
      this.setGoToPrev(false);
      await this.setFooterBtnKey();
      // if (this.isNextValid) {
      //   if (this.currentStep < 4) {
      //     this.setCurrentStep(this.currentStep + 1);
      //   }
      // }
    },
    backBtn() {
      if (this.currentStep == 1) return;
      this.setGoToPrev(true);
      this.setCurrentStep(this.currentStep - 1);
    },
    prefillData() {
      this.formData = this.headerFields;
    },
    async getAgentList() {
      const res = await this.getAgentName();

      if (res) {
        console.log(res);
        this.agentDropdown = [];
        res.data.results.map((list) => {
          this.agentDropdown.push({
            name: list.agent_name,
            id: list.id,
          });
        });
      }
    },
  },
  created() {
    this.prefillData();
    this.watchRouteChange();
    this.setIsCancelled(false);
    this.getAgentList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}

.left-content {
  .icon {
    font-size: 16px;
  }
  .text {
    font-family: $font-family-third;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>                                             