<template>
  <div :key="renderKey" class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-3 md:col-3">
            <h5 class="required dialog-label-text-md">Company</h5>
            <Dropdown
              v-model="selectedCompany"
              :options="companyDropdownArray"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Company"
              :class="{
                'p-invalid': v$.selectedCompany.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ml-2': true,
              }"
              :filter="true"
            />
          </div>
          <div class="field col-3 md:col-3 p-fluid">
            <h5 class="required dialog-label-text-md">Shipment Type</h5>
            <Dropdown
              v-model="selectedType"
              :options="shipmentDropdownArray"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Shipment Type"
              :class="{
                'p-invalid': v$.selectedType.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ml-2': true,
              }"
              :filter="true"
            />
          </div>

          <div class="field col-5 md:col-5 p-fluid">
            <h5 class="required dialog-label-text-md">Postal Code</h5>
            <div class="flex-row">
              <div class="flex">
                <TextField
                  v-model="postalCodes.startCode"
                  :classes="{
                    'p-invalid': v$.postalCodes.startCode.$invalid && submitted,
                    'inputfield w-full dialog-field-text': true,
                  }"
                />
                <span class="ml-2 mt-1">-</span>
                <TextField
                  class="ml-2"
                  v-model="postalCodes.endCode"
                  :classes="{
                    'p-invalid': v$.postalCodes.endCode.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text mr-2': true,
                  }"
                />
              </div>
            </div>
          </div>

          <div class="field col-5 md:col-5 p-fluid">
            <h5 class="required dialog-label-text-md">Weight Range</h5>
            <div class="flex-row">
              <div class="flex">
                <NumberField
                  :showButtons="true"
                  :max="0"
                  mode="decimal"
                  :maxFractionDigits="2"
                  v-model="minimumWeight"
                  :class="{
                    'p-invalid': v$.minimumWeight.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text mr-2': true,
                  }"
                />

                <NumberField
                  :showButtons="true"
                  :max="0"
                  mode="decimal"
                  :maxFractionDigits="2"
                  v-model="maximumWeight"
                  :class="{
                    'p-invalid': v$.maximumWeight.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text ml-2': true,
                  }"
                />
              </div>
            </div>
          </div>

          <div class="field col-3 md:col-3 p-fluid">
            <h5 class="required dialog-label-text-md">Building Type</h5>
            <Dropdown
              v-model="selectedBuilding"
              :options="buildingDropdownArray"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Building Type"
              :class="{
                'p-invalid': v$.selectedBuilding.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text': true,
              }"
              :filter="true"
            />
          </div>

          <div class="field col-3 md:col-3 p-fluid">
            <h5 class="required dialog-label-text-md">Default Logistics</h5>
            <Dropdown
              v-model="selectedDefault"
              :options="logisticsDropdownArray"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Logistics"
              :class="{
                'p-invalid': v$.selectedDefault.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text': true,
              }"
              :filter="true"
            />
          </div>

          <div class="field col-12 md:col-12 p-fluid">
            <h5 class="required dialog-label-text-md">Types</h5>
            <Chips
              v-model="logisticsSettingsFormData.sub_types"
              @blur="v$.logisticsSettingsFormData.sub_types.$model"
              separator=","
              :class="{
                'p-invalid':
                  v$.logisticsSettingsFormData.sub_types.$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isFeedbackSettingCreation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters, mapState } from "vuex";
import { errhandler } from "@/services/httpClient";
import {
  logisticsDropdownArray,
  shipmentDropdownArray,
  buildingDropdownArray,
  companyDropdownArray,
} from "../../Reusables/CRM/Const";
import Dropdown from "primevue/dropdown";
import Chips from "primevue/chips";
export default {
  name: "logisticsSettingsFields",
  components: {
    Dropdown,
    Chips,
  },
  props: ["filledData"],
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isFeedbackSettingCreation: false,
      feedbackFormDataId: null,
      selectedCompany: null,
      couponType: null,
      couponName: null,
      couponCode: null,
      discountPrice: null,
      minimumSpend: null,
      startCode: null,
      endCode: null,
      minimumWeight: null,
      maximumWeight: null,
      paymentMode: "online",
      business: "express",
      value2: 2,
      renderKey: 1,
      value: [
        {
          id: 1,
          value: "chips",
        },
        {
          id: 2,
          value: "chips",
        },
      ],
      selectedBuilding: null,
      selectedPayment: null,
      selectedType: null,
      selectedDefault: null,
      logisticsDropdownArray,
      shipmentDropdownArray,
      buildingDropdownArray,
      companyDropdownArray,
      logisticsSettingsFormData: {
        sub_types: null,
      },
      postalCodes: {
        startCode: null,
        endCode: null,
      },
    };
  },
  validations() {
    return {
      logisticsSettingsFormData: {
        sub_types: { required },
      },
      postalCodes: {
        startCode: { required },
        endCode: { required },
      },
      minimumWeight: { required },
      maximumWeight: {
        required,
        maxVal: (value) => {
          if (this.minimumWeight >= value) {
            return false;
          } else {
            return true;
          }
        },
      },
      selectedCompany: { required },
      selectedType: { required },
      selectedBuilding: { required },
      selectedDefault: { required },
    };
  },
  methods: {
    ...mapActions({
      showLogisticsSettingsDialog: "CrmSettings/showLogisticsSettingsDialog",
      createLogisticsSettings: "CrmSettings/createLogisticsSettings",
      loadLogisticsSettingsData: "CrmSettings/loadLogisticsSettingsData",
      updateLogisticsSettings: "CrmSettings/updateLogisticsSettings",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showLogisticsSettingsDialog(dialogData);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isFeedbackSettingCreation = true;

      if (this.logisticDataForEdit && this.logisticDataForEdit.id) {
        this.editFeedbackSettingsData();
      } else {
        this.addFeedbackSettingsData();
      }
    },
    async addFeedbackSettingsData() {
      try {
        const data = {
          company: this.selectedCompany,
          shipment_type: this.selectedType,
          from_postal: this.postalCodes.startCode,
          to_postal: this.postalCodes.endCode,
          min_weight: this.minimumWeight,
          max_weight: this.maximumWeight,
          building_type: this.selectedBuilding,
          default_logistics: this.selectedDefault,
          types: this.logisticsSettingsFormData.sub_types,
        };

        let response = await this.createLogisticsSettings(data);

        if (response && response.status === 200) {
          this.loadLogisticsSettingsData();
          let info = "Logistic settings created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info =
            response.data.message || "Failed to create the Logistic settings";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackSettingCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editFeedbackSettingsData() {
      try {
        const data = {
          company: this.selectedCompany,
          shipment_type: this.selectedType,
          from_postal: this.postalCodes.startCode,
          to_postal: this.postalCodes.endCode,
          min_weight: this.minimumWeight,
          max_weight: this.maximumWeight,
          building_type: this.selectedBuilding,
          default_logistics: this.selectedDefault,
          types: this.logisticsSettingsFormData.sub_types,
        };

        let datas = {
          id: Number(this.logisticDataForEdit.id),
          dataSet: data,
        };

        let response = await this.updateLogisticsSettings(datas);
        if (response && response.status === 200) {
          let info = "Logistic settings updated successfully";
          this.commonToast("success", "Success", info);
          this.loadLogisticsSettingsData();
        } else {
          let info =
            response.data.message || "Failed to update the Logistic settings";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackSettingCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },

    chipPayloadConverter(arr) {
      const data = arr.map((ele) => {
        return ele.type;
      });
      return data;
    },

    loadInitialData() {
      if (this.logisticDataForEdit && this.logisticDataForEdit.id) {
        this.minimumWeight = this.logisticDataForEdit.min_weight;
        this.maximumWeight = this.logisticDataForEdit.max_weight;
        this.postalCodes.startCode = this.logisticDataForEdit.from_postal;
        this.postalCodes.endCode = this.logisticDataForEdit.to_postal;
        this.selectedCompany = this.logisticDataForEdit.company;
        this.selectedBuilding = this.logisticDataForEdit.building_type;
        this.selectedDefault = this.logisticDataForEdit.default_logistics;
        this.selectedType = this.logisticDataForEdit.shipment_type;
        this.logisticsSettingsFormData.sub_types = this.chipPayloadConverter(
          this.logisticDataForEdit.logistic_type
        );
        this.renderKey += 1;
      }
    },

    commonToast(severity, summary, message) {
      this.isFeedbackSettingCreation = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  computed: {
    ...mapGetters({
      feedbackSettingsData: "CrmSettings/getEditFeedbackSettingsData",
      feedbackSubTypes: "CrmSettings/getSubTypes",
      getListedCompanyDetails: "CrmSettings/getListedCompanyDetails",
      getTypesList: "CrmSettings/getTypesList",
      logisticsSettingsData: "CrmSettings/getEditLogisticsSettingsData",
    }),
    ...mapState({
      logisticDataForEdit: (state) =>
        state.CrmSettings.logisticsSettingsFormData,
    }),
  },
  created() {
    this.loadInitialData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.required {
  color: $color-7a7a7a !important;
}

.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-calendar-w-btn .p-inputtext {
  border: 1px solid #c4c4c4;
  border-right: none;
  height: 38px !important;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 50vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 42vh;
  overflow: auto;
}
.sub-title {
  font-weight: 700;
  font-size: 14px;
  color: $color-4e5968;
  font-family: $font-family-third;
}
.field-checkbox {
  color: $color-357dea;
  font-weight: 700;
  font-size: 14px;
  font-family: $font-family-third;
}
::v-deep .p-checkbox .p-checkbox-box {
  width: 18px !important;
  height: 18px !important;
}
</style>
