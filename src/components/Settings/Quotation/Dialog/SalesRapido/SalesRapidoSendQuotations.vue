<template>
  <div class="flex flex-column time_content pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
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
          <span class="check_text">Estimated Start Date (Tentative)</span>
        </div>
      </div>
    </div>
    <div clas="flex">
      <div class="white_content p-2 calendar_content">
        <Calendar
          dateFormat="d MM yy"
          class="quotation_calendar"
          id="icon"
          v-model="details.effective_date"
          :showIcon="true"
          style="width: 100%"
           :monthNavigator = "true"
                  :yearNavigator="true"
                   yearRange="1950:2050"
        />
      </div>
    </div>
  </div>
  <div class="field col-12 md">
    <span class="formTableHeader ml-2">Contact Person</span>
  <div class="row ml-2 table_div ">
    <div class="col-12">
    <div class="table-content">
      <keep-alive>
        <FormTable
          v-if="$store.state.quotation.sendQuatitionTableData != null"
          :key="$store.state.quotation.sendQuatitionTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.quotation.sendQuatitionTableData"
          :tableColumns="
            $store.state.quotation.sendQuatitionTableDataColumns
          "
          storePath="quotation"
        />
      </keep-alive>
    </div>
    </div>
  </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="maintenanceAttachmentsState"
      type="vehicleCommons"
      storePath="fleets"
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "salesInternationalSendQuotations",
  data: () => ({
    date: null,
    v$: useVuelidate(),
    details: {
      effective_date: "",
      remarks: "",
    },
    maintenanceAttachmentsState: " ",
    submitted: false,
    
  }),
  validations() {
    return {
      details: {
        remarks: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "SalesInternationalCostCenter";
    },
    submitData() {
     if (this.v$.$invalid) {
        this.submitted = true;
      }
      console.log('details',this.details);
     },
  },

  created() {
    this.$store.state.sales.expressQuotationContactsTableData =
      this.$store.state["sales"].contactsStateData;
  },
};
</script>
<style scoped>

::v-deep .quotation_calendar .p-inputtext:enabled:hover {
  border-color: white !important;
}
.quotation_calendar .p-inputtext:enabled:focus {
  box-shadow: white !important;
  border-color: white !important;
}
::v-deep .quotation_calendar .p-inputtext {
  border-color: white !important;
}

.calendar_content {
  margin-left: 15%;
}
.white_content {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.time_content {
  background: #edf1f7;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
}
.effective {
  background: #edf1f7;
  width: 100%;
  height: 400px;
  left: 490px;
  top: 267px;
}
.check_text {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
}
</style>
