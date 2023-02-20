<template>
  <div class="mr-top mt-6">
    <Panel :toggleable="true" :collapsed="collapsed">
      <template #icons>
        <div @click="toggle" class="icon-wrapper">
          <span v-if="collapsed" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>
        <div class="commerce-sub-head mt-2">
        <h6>Select Rate *</h6>
      </div>
      <template #header>
        <div @click="toggle" class="sub-title full-width pointer">E-Commerce</div>
      </template>
      <div class="flex mt-2 mb-4">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Same Night Delivery',
                        tag: 'Same Night Delivery',
                        key: 'Same Night Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Same Night Delivery',
                  tag: 'Same Night Delivery',
                  key: 'Same Night Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Next Day Delivery',
                        tag: 'Next Day Delivery',
                        key: 'Next Day Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Next Day Delivery',
                  tag: 'Next Day Delivery',
                  key: 'Next Day Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Regular Delivery',
                        tag: 'Regular Delivery',
                        key: 'Regular Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Regular Delivery',
                  tag: 'Regular Delivery',
                  key: 'Regular Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <DuoSelection class="mb-4"
        :options="['Same Night Delivery', 'Next Day Delivery','Regular Delivery']"
        :default="defaultTransportType"
        type="setRegionDeliveryTransportType"
      />
      <div v-if="defaultTransportType == 'Same Night Delivery'">
         <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >No. of Units  ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $ </h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Additional Job $  </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid': v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Timeslot Delivery (Fixed 2 hours)</h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Cut Off Time $  </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="defaultTransportType == 'Next Day Delivery'">
         <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >No. of Units  ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $ </h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Additional Job $  </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid': v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Timeslot Delivery (Fixed 2 hours)</h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Cut Off Time $  </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="defaultTransportType == 'Regular Delivery'">
         <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >No. of Units  ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $ </h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Additional Job $  </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid': v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Timeslot Delivery (Fixed 2 hours)</h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Cut Off Time $  </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <DuoSelection class="mb-4"
        :options="['Charge by Weight', 'Charge by Quantity']"
        :default="ecommerceTransportType"
        type="setRegionDeliveryTransportType"
      />
      <div v-if="ecommerceTransportType == 'Charge by Weight'">
         <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Maximum Quantity</label>
            <TextField
              label="maximum_quantity"
              type="number"
              v-model="details.maximum_quantity"
              :classes="{
                'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Van Job Add. Quantity </h5>
            <TextField
              label="van_job_add_quantity"
              type="number"
              v-model="details.van_job_add_quantity"
              :classes="{
                'p-invalid': v$.details.van_job_add_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Van Job Add. Cost  $ </label>
            <TextField
              label="van_job_add_cost"
              type="number"
              v-model="details.van_job_add_cost"
              :classes="{
                'p-invalid': v$.details.van_job_add_cost.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Boxes under </label>
            <TextField
              label="boxes_under_one"
              type="number"
              v-model="details.boxes_under_one"
              :classes="{
                'p-invalid': v$.details.boxes_under_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($) </h5>
            <TextField
              label="rate_one"
              type="number"
              v-model="details.rate_one"
              :classes="{
                'p-invalid': v$.details.rate_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Boxes under * </label>
            <TextField
              label="boxes_under_two"
              type="number"
              v-model="details.boxes_under_two"
              :classes="{
                'p-invalid': v$.details.boxes_under_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($) </h5>
            <TextField
              label="rate_two"
              type="number"
              v-model="details.rate_two"
              :classes="{
                'p-invalid': v$.details.rate_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="ecommerceTransportType == 'Charge by Quantity'">
         <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Maximum Quantity</label>
            <TextField
              label="maximum_quantity"
              type="number"
              v-model="details.maximum_quantity"
              :classes="{
                'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Van Job Add. Quantity </h5>
            <TextField
              label="van_job_add_quantity"
              type="number"
              v-model="details.van_job_add_quantity"
              :classes="{
                'p-invalid': v$.details.van_job_add_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Van Job Add. Cost  $ </label>
            <TextField
              label="van_job_add_cost"
              type="number"
              v-model="details.van_job_add_cost"
              :classes="{
                'p-invalid': v$.details.van_job_add_cost.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="box-count-charges">
        <label>Box Count Charges</label>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Boxes under </label>
            <TextField
              label="boxes_under_one"
              type="number"
              v-model="details.boxes_under_one"
              :classes="{
                'p-invalid': v$.details.boxes_under_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($) </h5>
            <TextField
              label="rate_one"
              type="number"
              v-model="details.rate_one"
              :classes="{
                'p-invalid': v$.details.rate_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text" >Boxes under * </label>
            <TextField
              label="boxes_under_two"
              type="number"
              v-model="details.boxes_under_two"
              :classes="{
                'p-invalid': v$.details.boxes_under_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($) </h5>
            <TextField
              label="rate_two"
              type="number"
              v-model="details.rate_two"
              :classes="{
                'p-invalid': v$.details.rate_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add Rates </b></span>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "primevue/panel"
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../DuoSelect.vue";

export default {
  components: { Panel,DuoSelection },
  data() {
    return {
      defaultTransportType: "Same Night Delivery",
      ecommerceTransportType:"Charge by Weight",
      collapsed: true,
      details: {
        no_of_units:"",
        adjustment_jobs:"",
        adjustment_amount:"",
        additional_job:"",
        standard_liability:"",
        timeslot_delivery:"",
        cut_off_time:"",
        cut_off_days_count:"",
        maximum_quantity:"",
        van_job_add_quantity:"",
        van_job_add_cost:"",
        boxes_under_one:"",
        rate_one:"",
        boxes_under_two:"",
        rate_two:"",
      },
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
        details: {
        no_of_units: { required },
        adjustment_jobs: { required },
        adjustment_amount: { required },
        additional_job: { required },
        standard_liability: { required },
        timeslot_delivery: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        maximum_quantity: { required },
        van_job_add_quantity: { required },
        van_job_add_cost: { required },
        boxes_under_one: { required },
        rate_one: { required },
        boxes_under_two: { required },
        rate_two: { required },

      },
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>
<style lang="scss" scoped>
.acknowledgement-row{
    gap:4rem;
}
::v-deep .p-panel-header {
  background: #EDF1F7 !important;
  border: none !important;
  border: 1px solid #02003826 !important;
  border-radius: 5px !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
  padding: 0.5rem !important;
}
.table-color{
  background:#E1EAF9;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
::v-deep .p-panel .p-panel-content {
  border: none !important;
}

::v-deep .p-panel .p-panel-header .p-panel-header-icon {
  display: none !important;
}
.padding-y {
  padding: 0.5rem 0 !important;
}
.box-count-charges{
 font-size: 12px;
   background:#E1EAF9; 
}
::v-deep .p-column-header-content{
    color:#7E84A7;
    font-weight: 600;
    font-size: 12px;
}
::v-deep .checksText{
    color: #7E84A7 !important;
    font-weight: 600;
    font-style: normal;
    font-size: 12px;
}
.icon-wrapper {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(2, 0, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
