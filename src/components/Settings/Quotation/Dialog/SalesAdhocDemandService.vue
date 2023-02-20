<template>
<div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Weight and Dimensions</p>
  </div>

  <!-- Parent -->
  <div class="adhoc_van">
    <!-- Child -->
    <div>
      <img src="/images/box.png" alt="images" />
    </div>
    <!-- Weight Kg -->
    <div class="flex-direction">
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text">Weight [kg]</h5>
          <TextField
            label="kg"
            type="number"
            v-model="details.kg"
            :classes="{
              'p-invalid': v$.details.kg.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Length [cm]</h5>
          <TextField
            label="length"
            type="number"
            v-model="details.length"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Weidth [cm]</h5>
          <TextField
            label="weidth"
            type="number"
            v-model="details.weidth"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Height [cm]</h5>
          <TextField
            label="height"
            type="number"
            v-model="details.height"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">From Postal Code</h5>
      <TextField
        label="postal_code"
        type="number"
        v-model="details.from_postal_code"
        :classes="{
          'p-invalid': v$.details.from_postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">To Postal Code</h5>
      <TextField
        label="no_of_units"
        type="number"
        v-model="details.to_postal_code"
        :classes="{
          'p-invalid': v$.details.to_postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md">
    <span class="formTableHeader ml-2">Select Rates</span>
  <div class="row ml-2 table_div select-rate-content">
    <div class="col-12">
    <div class="table-content">
      <keep-alive>
        <FormTable
          v-if="$store.state.quotation.tripDropDownTableData != null"
          :key="$store.state.quotation.tripDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.quotation.tripDropDownTableData"
          :tableColumns="
            $store.state.quotation.tripDropDownTableDataColumns
          "
          storePath="quotation"
        />
      </keep-alive>
    </div>
    </div>
  </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="required dialog-label-text">Remarks</h5>
    <TextAreaField
      label="remarks"
      type="text"
      v-model="details.remarks"
      :classes="{
        'p-invalid': v$.details.remarks.$invalid && submitted,
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <div class="mt-3">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="quotation" />
        <Buttons
          label="Send"
          button_class="dialog-button-text"
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
  name: "SalesAdhocDemandService",

  data: () => ({
    v$: useVuelidate(),
    details: {
      kg: "",
      length: "",
      weidth: "",
      height: "",
      from_postal_code: "",
      to_postal_code: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        kg: { required },
        from_postal_code: { required },
        to_postal_code: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log(this.details);
        //
      }
    },
  },
};
</script>

<style scoped>
.adhoc_van {
  display: flex;
}
.flex-direction {
  flex-direction: column;
}
.rate-content{
  gap:4rem;
  border-bottom: 1px solid #DFE4ED;
  font-Weight:600;

}
.rate-text{
  margin-right:23rem;
}
.select-rate-content{
  background: #F3F7FF;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
}
.label-text{
    font-Weight:600;
    font-size:14px;
}
.table-content{
    padding: 15px;
}
::v-deep .p-datatable-thead{
    font-size:14px;
}
</style>


