<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-6 md:col-6">
            <h5 class="required dialog-label-text coupon_dialog_text">
              Coupon Name
            </h5>
            <TextField
              v-model="couponName"
              :classes="{
                'p-invalid': v$.couponName.$invalid && submitted,
              }"
            />
          </div>
          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="required dialog-label-text coupon_dialog_text">
              Coupon Code
            </h5>
            <TextField
              v-model="couponCode"
              :classes="{
                'p-invalid': v$.couponCode.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="required dialog-label-text coupon_dialog_text">
              Discount
            </h5>
            <div class="p-inputgroup">
              <InputText
                placeholder="Price"
                v-model="discountPrice"
                class="w-100"
                :classes="{
                  'p-invalid': v$.discountPrice.$invalid && submitted,
                }"
              />
              <Dropdown
                v-model="selectedDiscount"
                :options="discountSymbol"
                optionLabel="name"
                placeholder="Select"
                class="w-4 bg-grey"
                :class="{
                  'p-invalid': v$.selectedDiscount.$invalid && submitted,
                }"
              />
            </div>
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="dialog-label-text coupon_dialog_text">
              Minimum Spend S$
            </h5>
            <TextField
              v-model="minimumSpend"
              :classes="{
                'p-invalid': v$.minimumSpend.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="dialog-label-text coupon_dialog_text">From Date</h5>
            <Calendar
              v-model="details.from_date"
              :showTime="false"
              hourFormat="12"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
              class="w-100"
              @blur="v$.details.from_date.$model;"
              :class="{
                'p-invalid': v$.details.from_date.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="dialog-label-text coupon_dialog_text">To Date</h5>
            <Calendar
              v-model="details.to_date"
              hourFormat="12"
              :showTime="false"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
              class="w-100"
              @blur="v$.details.to_date.$model;"
              :class="{
                'p-invalid': v$.details.to_date.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="required dialog-label-text coupon_dialog_text">
              Payment Mode
            </h5>
            <Dropdown
              v-model="selectedPayment"
              :options="paymentMethodOriginalData"
              optionLabel="name"
              placeholder="Select Payment"
              class="w-100"
              :filter="true"
              :class="{
                'p-invalid': v$.selectedPayment.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-6 p-fluid">
            <h5 class="required dialog-label-text coupon_dialog_text">
              Business
            </h5>
            <Dropdown
              v-model="selectedBusineess"
              :options="businessArray"
              optionLabel="name"
              placeholder="Select Business"
              class="w-100"
              :filter="true"
              :class="{
                'p-invalid': v$.selectedBusineess.$invalid && submitted,
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
import { mapActions, mapGetters } from "vuex";
import { crm_set_state } from "../../../store/modules/CRM/helper";
import { reactive } from "vue";
import { errhandler } from "@/services/httpClient";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import moment from "moment";

export default {
  name: "couponSettingsFields",
  components: {
    Dropdown,
    InputText,
  },
  props: ["filledData"],
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isFeedbackSettingCreation: false,
      feedbackFormDataId: null,
      couponType: "",
      couponName: "",
      couponCode: "",
      discountPrice: "",
      minimumSpend: "",
      paymentMode: "Online",
      business: "express",
      selectedBusineess: null,
      selectedPayment: null,
      details: {
        from_date: null,
        to_date: null,
        paymentListSelected: null,
      },
      discountSymbol: [
        { id: 1, name: "%", code: "%" },
        { id: 2, name: "S$", code: "S$" },
      ],
      selectedDiscount: null,
      businessArray: [
        { id: 1, name: "International", code: "International" },
        { id: 2, name: "Express", code: "Express" },
        { id: 2, name: "Rapido", code: "Rapido" },
      ],
      paymentArray: [
        { id: 1, name: "Online", code: "Online" },
        { id: 2, name: "Phone Booking", code: "Phone Booking" },
      ],
    };
  },
  validations() {
    return {
      details: {
        from_date: { required },
        to_date: { required },
        // paymentListSelected: { required },
      },
      couponName: { required },
      couponCode: { required },
      discountPrice: { required },
      minimumSpend: { required },
      selectedBusineess: { required },
      selectedPayment: { required },
      selectedDiscount: { required },
    };
  },
  methods: {
    ...mapActions({
      createFeedbackSettingsData: "CrmSettings/createFeedbackSettings",
      updateFeedbackSettingsData: "CrmSettings/updateFeedbackSettings",
      showFeedbackSettingsDialog: "CrmSettings/showFeedbackSettingsDialog",
      fetchFeedbackData: "CrmSettings/loadFeedbackSettingsData",
      createCouponSettings: "CrmSettings/createCouponSettings",
      loadCouponSettingsData: "CrmSettings/loadCouponSettingsData",
      updateCouponSettings: "CrmSettings/updateCouponSettings",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.isFeedbackSettingCreation = false;
      this.showFeedbackSettingsDialog(dialogData);
    },
    getFormattedDate(date) {
      return date;
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isFeedbackSettingCreation = true;
      if (Object.keys(this.filledData).length == 0) {
        this.addFeedbackSettingsData();
      } else {
        this.editFeedbackSettingsData();
      }
    },
    async addFeedbackSettingsData() {
      try {
        const data = {
          from_date: moment(this.details.from_date).format("YYYY-MM-DD"),
          to_date: moment(this.details.to_date).format("YYYY-MM-DD"),
          coupon_name: this.couponName,
          coupon_code: this.couponCode,
          discount: Number(this.discountPrice),
          unit: this.selectedDiscount.name,
          minimum_spend: Number(this.minimumSpend),
          payment_mode: this.selectedPayment.payment_method,
          business: this.selectedBusineess.code,
        };

        let response = await this.createCouponSettings(data);

        if (response && response.status === 200) {
          this.loadCouponSettingsData();
          let info = "Coupon settings created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info =
            response.data.message || "Failed to create the Coupon settings";
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
          from_date: moment(this.details.from_date).format("YYYY-MM-DD"),
          to_date: moment(this.details.to_date).format("YYYY-MM-DD"),
          coupon_name: this.couponName,
          coupon_code: this.couponCode,
          discount: Number(this.discountPrice),
          unit: this.selectedDiscount.name,
          minimum_spend: Number(this.minimumSpend),
          payment_mode: this.selectedPayment.payment_method,
          business: this.selectedBusineess.code,
        };
        let logisticsId = this.filledData.logisticsId;
        let datas = {
          id: logisticsId,
          dataSet: data,
        };
        let response = await this.updateCouponSettings(datas);
        if (response && response.status === 200) {
          this.loadCouponSettingsData();
          let info = "Coupon settings updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info =
            response.data.message || "Failed to update the Coupon settings";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackSettingCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.feedbackSettingsData).length != 0) {
        this.feedbackSettingsFormData = {
          ...this.feedbackSettingsData,
          sub_types: this.feedbackSubTypes,
        };
        this.feedbackFormDataId = this.feedbackSettingsData.id;
      } else {
        this.feedbackFormDataId = null;
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
    ...crm_set_state,
    ...mapGetters({
      feedbackSettingsData: "CrmSettings/getEditFeedbackSettingsData",
      feedbackSubTypes: "CrmSettings/getSubTypes",
      CouponSettingsData: "CrmSettings/getEditCouponSettingsData",
    }),
  },
  created() {
    this.loadInitialData();
    this.selectedDiscount = this.discountSymbol ? this.discountSymbol[0] : null;
    if (this.CouponSettingsData.id) {
      this.couponName = this.CouponSettingsData.coupon_name;
      this.couponCode = this.CouponSettingsData.coupon_code;
      this.discountPrice = this.CouponSettingsData.discount;
      this.minimumSpend = this.CouponSettingsData.minimum_spend;
      this.details.from_date = moment(this.CouponSettingsData.from_date).format(
        "MM/DD/YYYY"
      );
      this.details.to_date = moment(this.CouponSettingsData.to_date).format(
        "MM/DD/YYYY"
      );
      this.selectedPayment = this.paymentMethodOriginalData.find(
        (x) => x.payment_method === this.CouponSettingsData.payment_mode
      );
      this.selectedBusineess = this.businessArray.find(
        (x) => x.name === this.CouponSettingsData.business
      );
      this.selectedDiscount = this.discountSymbol.find(
        (x) => x.name === this.CouponSettingsData.unit.trim()
      );
      this.renderKey += 1;
    }
    this.renderKey += 1;
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
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 58vh;
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
  height: 60vh;
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
.coupon_dialog_text {
  font-size: 14px !important;
}
</style>
