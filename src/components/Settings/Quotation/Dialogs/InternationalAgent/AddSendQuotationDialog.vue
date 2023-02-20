<template>
  <br />
  <div
    class="flex flex-column sendquotation_timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4"
  >
    <div class="flex">
      <div class="sendquotation_formParentDiv sendquotation_formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text" placeholder="0.00">
              Estimated Start Date
            </h5>
            <div clas="flex">
              <div class="sendquotation_whiteDiv p-2 calendardiv-2">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.effective_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text" placeholder="0.00">
              Estimated End Date
            </h5>
            <div clas="flex">
              <div class="sendquotation_whiteDiv p-2 calendardiv-2">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.effective_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-2">
      <div class="flex flex-row sendquotation_checkDiv">
        <div class="flex">
          <CheckBox
            v-bind:categories="[
              {
                name: 'Effective',
                key: 'a',
              },
            ]"
          />
        </div>
        <div class="flex sendquotation_chk2Div">
          <span class="sendquotation__chk2">First Month</span>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="sendquotation_whiteDiv p-3 sendquotation_calendarDiv">
        <div class="flex flex-row">
          <div class="flex">
            <RadioButton
              id="chargeUsageOnly"
              name="chargeUsageOnly"
              value="Charge Usage Only"
              v-model="details.first_month"
            />
            <label class="radioText ml-2" for="chargeUsageOnly"
              >Charge Usage Only</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="sendquotation_whiteDiv p-3 sendquotation_calendarDiv">
        <div class="flex flex-row">
          <div class="flex">
            <RadioButton
              id="chargeMinium"
              name="chargeMinium"
              value="Charge Minimum"
              v-model="details.first_month"
            />
            <label class="radioText ml-2" for="chargeUsageOnly"
              >Charge Minimum</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="sendquotation_formParentDiv sendquotation_formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Minimum Qty
            </h5>
            <TextField
              label="min_qty"
              type="number"
              v-model="details.min_qty"
              :classes="{
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Amount
            </h5>
            <TextField
              label="min_amount"
              type="number"
              v-model="details.min_amount"
              :classes="{
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3"> Contract settings </span>
      </div>
    </div>
  </div>
  <span class="ml-2 txt">Contact Person</span>
  <div class="row ml-1 table_div">
    <div class="col-12">
      <FormTable
        :tableData="
          $store.state.quotation &&
          $store.state.quotation.expressQuotationContactsTableData &&
          $store.state.quotation.expressQuotationContactsTableData
            ? $store.state.quotation.expressQuotationContactsTableData
            : []
        "
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!--DRAG AND DROP UPLOAD-->
  <div>
    <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
    />
  </div>
  <div class="row ml-1 mt-1 table_div">
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
        <div class="flex align-self-center justify-content-end">
          <Buttons
            label="Cancel"
            v-on:childToParent="closeDialog"
            class="p-button-outlined mr-2 dialog-button-text"
          />
          <Buttons
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text"
          />
          <Buttons label="Save" button_class="dialog-button-text" />
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2"
            v-on:childToParent="submitData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import useVuelidate from "@vuelidate/core";

export default {
  name: "AddSendQuotationDialog",

  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    v$: useVuelidate(),
    details: {
      effective_date: "",
      first_month: "",
      min_qty: "",
      min_amount: "",
      remarks: "",
    },

    submitted: false,
  }),

  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddOnForwardingDialog",
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddSendQuotationDialog",
        });
      }
    },
  },
  components: {
    RadioButton,
  },
};
</script>

<style scoped>
.sendquotation_formDiv {
  margin-left: 14% !important;
}
::v-deep .quotationCalendar .p-inputtext:enabled:hover {
  border-color: white !important;
}
.quotationCalendar .p-inputtext:enabled:focus {
  box-shadow: white !important;
  border-color: white !important;
}
::v-deep .quotationCalendar .p-inputtext {
  border-color: white !important;
}
.sendquotation_checkDiv {
  margin-left: 14%;
}
.sendquotation_calendarDiv {
  margin-left: 15%;
}
.sendquotation_formParentDiv {
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 70%;
}
.sendquotation_whiteDiv {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.sendquotation_timeDiv {
  background: #edf1f7;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
}
.sendquotation_chk2 {
  font-size: 12px;
  font-weight: bold;
  margin-top: 9%;
}
.sendquotation_chk2Div {
  padding-top: 8%;
}
.sendquotation_chk {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
}
</style>
