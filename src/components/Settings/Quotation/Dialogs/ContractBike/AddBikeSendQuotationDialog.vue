<template>
  <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
    <div class="flex">
      <div class="flex flex-row">
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
        <div class="flex">
          <span class="chk">Effective Start Date (Tentative)</span>
        </div>
      </div>
    </div>
    <div clas="flex">
      <div class="whiteDiv p-2 calendarDiv">
        <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="icon"
          v-model="details.van.effective_date"
          :showIcon="true"
          style="width: 100%"
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
        />
      </div>
    </div>
    <div class="flex mt-2">
      <div class="flex flex-row checkDiv">
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
        <div class="flex chk2Div">
          <span class="chk2">First Month</span>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="whiteDiv p-3 calendarDiv">
        <div class="flex flex-row">
          <div class="flex">
            <RadioButton
              id="chargeUsageOnly"
              name="chargeUsageOnly"
              value="Charge Usage Only"
              v-model="details.van.first_month"
            />
            <label class="radioText ml-2" for="chargeUsageOnly"
              >Charge Usage Only</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="whiteDiv p-3 calendarDiv">
        <div class="flex flex-row">
          <div class="flex">
            <RadioButton
              id="chargeMinium"
              name="chargeMinium"
              value="Charge Minimum"
              v-model="details.van.first_month"
            />
            <label class="radioText ml-2" for="chargeUsageOnly"
              >Charge Minimum</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="formParentDiv formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Minimum Qty
            </h5>
            <TextField
              label="min_qty"
              type="number"
              v-model="details.van.min_qty"
              @blur="v$.details.van.min_qty.$model;"
              :classes="{
                'p-invalid': v$.details.van.min_qty.$invalid && submitted,
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
              v-model="details.van.min_amount"
              @blur="v$.details.van.min_amount.$model;"
              :classes="{
                'p-invalid': v$.details.van.min_amount.$invalid && submitted,
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
          $store.state.sales &&
          $store.state.sales.expressQuotationContactsTableData &&
          $store.state.sales.expressQuotationContactsTableData
            ? $store.state.sales.expressQuotationContactsTableData
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
        v-model="details.van.remarks"
        @blur="v$.details.van.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.van.remarks.$invalid && submitted,
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
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesSales" />
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
  name: "AddBikeSendQuotation",
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
        step: "AddBikeTripDetails",
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log(this.details);
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddBikeSendQuotation",
        });
      }
    },
  },
  components: {
    RadioButton,
  },
};
</script>

<style></style>
