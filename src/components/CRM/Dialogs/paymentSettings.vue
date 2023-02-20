<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Payment Method</h5>
            <TextField
              v-model="paymentSettingsFormData.payment_method"
              @blur="v$.paymentSettingsFormData.payment_method.$model"
              :classes="{
                'p-invalid':
                  v$.paymentSettingsFormData.payment_method.$invalid &&
                  submitted,
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
          :loading="isPaymentMethodCreation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { reactive } from "vue";
import { errhandler } from "@/services/httpClient";

export default {
  name: "paymentSettings",
  components: {},
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isPaymentMethodCreation: false,
      paymentMethodFormDataId: null,
      paymentSettingsFormData: {
        payment_method: "",
      },
    };
  },
  validations() {
    return {
      paymentSettingsFormData: {
        payment_method: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      createPaymentMethodSettingsData:
        "CrmSettings/createPaymentMethodSettings",
      updatePaymentethodSettingsData: "CrmSettings/updatePaymentMethodSettings",
      showPaymentSettingsDialog: "CrmSettings/showPaymentSettingsDialog",
      fetchPaymentMethodData: "CrmSettings/loadPaymentMethodData",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showPaymentSettingsDialog(dialogData);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isPaymentMethodCreation = true;

      if (!this.paymentMethodFormDataId) {
        this.addPaymentSettingsData();
      } else {
        this.editPaymentSettingsData();
      }
    },
    async addPaymentSettingsData() {
      try {
        const data = this.paymentSettingsFormData;
        let response = await this.createPaymentMethodSettingsData(data);
        if (response && response.status === 200) {
          let info = "Payment method settings created successfully";
          this.commonToast("success", "Success", info);
          this.fetchPaymentMethodData();
        } else {
          let info =
            response.data.message || "Failed to create the payment method";
          this.commonToast("error", "Error", info);
        }
        this.isPaymentMethodCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editPaymentSettingsData() {
      try {
        let data = {
          paymentSettingData: this.paymentSettingsFormData,
          id: this.paymentMethodFormDataId,
        };
        let response = await this.updatePaymentethodSettingsData(data);
        if (response && response.status === 200) {
          let info = "Payment method settings updated successfully";
          this.commonToast("success", "Success", info);
          this.fetchPaymentMethodData();
        } else {
          let info =
            response.data.message || "Failed to update the payment method";
          this.commonToast("error", "Error", info);
        }
        this.isPaymentMethodCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.paymentSettingsData).length != 0) {
        this.paymentSettingsFormData = {
          ...this.paymentSettingsData,
        };
        this.paymentMethodFormDataId = this.paymentSettingsData.id;
      } else {
        this.paymentMethodFormDataId = null;
      }
    },
    commonToast(severity, summary, message) {
      this.isPaymentMethodCreation = false;
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
      paymentSettingsData: "CrmSettings/getPaymentMethodSettingsData",
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
  height: 150px;
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
  height: 130px;
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
