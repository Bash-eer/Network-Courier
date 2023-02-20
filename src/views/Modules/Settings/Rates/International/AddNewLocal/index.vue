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
        <div :key="refreshKey" class="flex align-items-center">
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
              code="id"
              :classes="{
                'p-invalid': v$.formData.agent_id.$invalid && !isValid,
              }"
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
              code="code"
              :classes="{
                'p-invalid': v$.formData.rate_card_type.$invalid && !isValid,
              }"
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
              v-on:childToParent="getUserInput"
              label="shipping_type"
              code="code"
              :classes="{
                'p-invalid': v$.formData.shipping_type.$invalid && !isValid,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label mb-2 flex">
              Rate Card Name <span class="required-field ml-2">*</span>
            </div>
            <TextField
              :data="rateCardTypeDropdown"
              v-model="formData.rate_card_name"
              :value="formData.rate_card_name"
              v-on:childToParent="getUserInput"
              code="code"
              :classes="{
                'p-invalid': v$.formData.rate_card_name.$invalid && !isValid,
              }"
            />
          </div>
        </div>
        <div
          :key="refreshKey"
          class="flex align-items-end justify-content-between"
        >
          <div class="input-wrapper col-3">
            <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
              Region
              <!-- <span class="required-field ml-2">*</span> -->
            </div>
            <DropDownField
              :data="rateCardTypeDropdown"
              v-model="formData.region_id"
              :value="formData.region_id"
              v-on:childToParent="getUserInput"
              code="code"
              :classes="{
                'p-invalid': v$.formData.region_id.$invalid && !isValid,
              }"
            />
          </div>
          <div class="righ-content flex align-items-center">
            <div class="flex align-items-center flex-row">
              <SingleCheckBox
                label="GST"
                v-model="checkField.gst"
                :value="checkField.gst"
              />
            </div>
            <div class="flex align-items-center flex-row ml-3">
              <SingleCheckBox
                label="Set as defualt"
                v-model="checkField.default"
                :value="checkField.default"
              />
            </div>
            <Buttons
              class="ml-4"
              icon="pi pi-download"
              label="Import"
              button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn color-357dea"
            />
          </div>
        </div>
        <div class="stepper-route mt-5 mx-2">
          <div class="flex align-items-start">
            <SelectButton
              v-model="selectedTab"
              optionLabel="tab"
              class="mr-5"
              :options="tabs"
              optionDisabled="disable"
            >
              <template #option="slotProps">
                <div :class="slotProps.option.disable && 'disable-opt'">
                  {{ slotProps.option.tab }}
                </div>
              </template>
            </SelectButton>
          </div>
          <router-view class="mt-5"></router-view>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <div>
          <Buttons
            :label="'Back'"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
            v-on:childToParent="onClickBack"
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
            v-if="selectedTab.id == 4"
            class="ml-4"
            label="Save"
            button_class="p-button-sm ml-3 add-btn custom-add-btn bg-357dea"
            v-on:childToParent="onClickSubmit"
            :loading="isloading"
          />
          <Buttons
            v-else
            class="ml-2"
            label="Next"
            button_class="p-button-sm ml-3 add-btn custom-add-btn bg-357dea"
            v-on:childToParent="onClickNext"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Card from "primevue/card";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { Card, SelectButton },
  data() {
    return {
      isValid: true,
      refreshKey: 10,
      checkField: {
        gst: false,
        default: false,
      },
      formData: {
        agent_id: "",
        shipping_type: "",
        rate_card_name: "",
        rate_card_type: "",
        region_id: "",
      },
      agentDropdown: [],
      shippingTypeDropdown: [
        { name: "Adhoc", code: "Adhoc" },
        { name: "Contract", code: "Contract" },
      ],
      rateCardNameDropdown: [
        { name: "Local", code: "Local" },
        { name: "Import", code: "Import" },
        { name: "Export", code: "Export" },
      ],
      rateCardTypeDropdown: [{ name: "Airport - C", code: "1" }],

      selectedTab: "",
    };
  },
  watch: {
    checkField: {
      handler() {
        this.setCheckFields(this.checkField);
      },
      deep: true,
    },
    selectedTab(value) {
      this.setCurrentTab(value);
      this.$router.push({ name: value.routeName });
    },
    stepperKey() {
      this.selectedTab = this.tabs[this.selectedTab.id];
    },
    stepBackKey() {
      this.selectedTab = this.tabs[this.selectedTab.id - 2];
    },
    $route() {
      this.watchRouteChange();
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        agent_id: { required },
        shipping_type: { required },
        rate_card_name: { required },
        rate_card_type: { required },
        region_id: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      tabs: "AddNewInternationalLocal/tabs",
      currentTab: "AddNewInternationalLocal/currentTab",
      stepperKey: "AddNewInternationalLocal/stepperKey",
      stepBackKey: "AddNewInternationalLocal/stepBackKey",

      // Index
      headerFields: "AddNewInternationalLocal/headerFields",
      checkFieldsValue: "AddNewInternationalLocal/checkFields",

      // Normal
      trips: "AddNewInternationalLocal/Normal/trips",
      bike_rates: "AddNewInternationalLocal/Normal/bike_rates",
      van_rates: "AddNewInternationalLocal/Normal/van_rates",
      bike_customer_van_job:
        "AddNewInternationalLocal/Normal/bike_customer_van_job",
      two_tire_rates: "AddNewInternationalLocal/Normal/two_tire_rates",
      multi_tire: "AddNewInternationalLocal/Normal/multi_tire",
      van_job_urgent_surcharges:
        "AddNewInternationalLocal/Normal/van_job_urgent_surcharges",
      van_customer_bike_job:
        "AddNewInternationalLocal/Normal/van_customer_bike_job",

      // Ecommerce
      bike: "AddNewInternationalLocal/Ecommerce/bike",
      van: "AddNewInternationalLocal/Ecommerce/van",

      // Surcharges
      surcharges: "AddNewInternationalLocal/Surcharges/surcharges",
      additional_surcharges:
        "AddNewInternationalLocal/Surcharges/additional_surcharges",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentTab: "AddNewInternationalLocal/setCurrentTab",
      setNextBtnKey: "AddNewInternationalLocal/setNextBtnKey",
      stepperKey: "AddNewInternationalLocal/stepperKey",
      setBackBtnKey: "AddNewInternationalLocal/setBackBtnKey",
      setHeaderFields: "AddNewInternationalLocal/setHeaderFields",
      setCheckFields: "AddNewInternationalLocal/setCheckFields",

      getAgentName: "Outbound/getAgentName",
      // reset data
      resetDataIndex: "AddNewInternationalLocal/resetData",
      resetDataNormal: "AddNewInternationalLocal/Normal/resetData",
      resetDataEcommerce: "AddNewInternationalLocal/Ecommerce/resetData",
      resetDataSurcharges: "AddNewInternationalLocal/Surcharges/resetData",

      postRateCardData: "AddNewInternationalLocal/postRateCardData",
    }),
    async returnToList() {
      await this.$router.push({ name: "salesRates" });
      this.resetDataIndex();
      this.resetDataNormal();
      this.resetDataEcommerce();
      this.resetDataSurcharges();
    },
    getUserInput(label, value) {
      if (
        label == "shipping_type" &&
        (value == "Import" || value == "Export")
      ) {
        this.formData.shippingType = "";
        this.$router.push({
          name: "AddNewZone",
        });
        return;
      }

      this.setHeaderFields(this.formData);
    },
    onClickNext() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
      this.setNextBtnKey();
    },
    async onClickSubmit() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      let data = {
        ...this.headerFields,
        ...this.checkFieldsValue,
        charge_type: {
          normal: {
            bike: {
              trips: this.trips.bike,
              rates: {
                rates: this.bike_rates,
                bike_customer_van_job: this.bike_customer_van_job,
              },
            },
            van: {
              trips: this.trips.van,
              rates: {
                rates: this.van_rates,
                van_job_urgent_surcharges: this.van_job_urgent_surcharges,
                two_tire_rates: this.two_tire_rates,
                multi_tire: this.multi_tire,
                van_customer_bike_job: this.van_customer_bike_job,
              },
            },
          },
          e_commerce: {
            bike: this.bike,
            van: this.van,
          },
          surcharges: this.surcharges,
          additional_surcharges: this.additional_surcharges,
        },
      };

      try {
        this.isloading = true;
        await this.postRateCardData(data);
        this.isloading = false;
        this.$router.push({
          name: "salesRates",
        });
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

      console.log(data);
    },
    onClickBack() {
      this.setBackBtnKey();
    },
    watchRouteChange() {
      let route_name = this.$route.name;

      let getStep = this.tabs.find((list) => {
        if (list.routeName == route_name) return list;
      });

      if (getStep) {
        this.setCurrentTab(getStep);
        this.selectedTab = getStep;
      }
    },
    prefillData() {
      let data = this.headerFields;
      let data2 = this.checkFieldsValue;

      if (data != {}) {
        this.formData = data;
        this.refreshKey++;
      }

      if (data2 != {}) {
        this.checkField = data;
        this.refreshKey++;
      }
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
  mounted() {
    this.prefillData();
  },
  created() {
    this.watchRouteChange();
    this.getAgentList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.disable-opt {
  opacity: 0.7 !important;
}

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