<template>
  <div class="mr-top mt-6">
    <Panel :toggleable="true" :collapsed="collapsed">
      <template #icons>
        <div @click="toggle" class="icon-wrapper">
          <span v-if="collapsed" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>
      <template #header>
        <div @click="toggle" class="sub-title full-width pointer">Trip Details</div>
      </template>
      <div class="trip-head">
        <h6>Costing Details</h6>
      </div>
      <div class="trip-sub-head mt-2">
          <h6>Monthly Minimum</h6>
        </div>
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
          <h5 class="required dialog-label-text">Van Urgent Surcharge $</h5>
          <TextField
            label="van_urgent_surcharge"
            type="number"
            v-model="details.van_urgent_surcharge"
            :classes="{
              'p-invalid': v$.details.van_urgent_surcharge.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "primevue/panel"
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { Panel },
  data() {
    return {
      collapsed: true,
      details: {
        no_of_units:"",
        adjustment_jobs:"",
        adjustment_amount:"",
        additional_job:"",
        van_urgent_surcharge:"",
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
        van_urgent_surcharge: { required },
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
.trip-sub-head{
  font-size: 14px;
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
