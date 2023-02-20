<template>
  <div class="mr-top mt-6">
  <h5>Select Rate *</h5>
    <Panel :toggleable="true" :collapsed="collapsed">
      <template #icons>
        <div @click="toggle" class="icon-wrapper">
          <span v-if="collapsed" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>
      <template #header>
        <div @click="toggle" class="sub-title full-width pointer">Rate 1A</div>
      </template>
      <div class="flex mt-2">
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
      <div class="field col-12 md">
        <div class="row table_div ">
          <div class="col-12 table-color mt-4">
            <div class="p-1 mt-2">
              <DuoSelection
                :options="['Same Night Delivery', 'Next Day Delivery','Regular Delivery']"
                :default="defaultTransportType"
                type="setRegionDeliveryTransportType"
              />
            </div>
            <div class="table-content mb-2">
              <div v-if="defaultTransportType == 'Same Night Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="$store.state.quotation.SalesRapidoChargesTableData != null"
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="$store.state.quotation.SalesRapidoChargesTableData"
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
              <div v-if="defaultTransportType == 'Next Day Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="$store.state.quotation.SalesRapidoChargesTableData != null"
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="$store.state.quotation.SalesRapidoChargesTableData"
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
              <div v-if="defaultTransportType == 'Regular Delivery'">
                <keep-alive>
                  <FormTable
                    v-if="$store.state.quotation.SalesRapidoChargesTableData != null"
                    :key="$store.state.quotation.SalesRapidoChargesTableData"
                    formTableDataName="inspectionsFormTableData"
                    :selectionModeState="selectionModeState"
                    dataKey="id"
                    :tableData="$store.state.quotation.SalesRapidoChargesTableData"
                    :tableColumns="
                      $store.state.quotation.SalesRapidoChargesTableDataColumns
                    "
                    storePath="quotation"
                  />
                </keep-alive>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text" >Surcharge ($)</label>
          <TextField
            label="surcharge"
            type="number"
            v-model="details.surcharge"
            :classes="{
              'p-invalid': v$.details.surcharge.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Surcharge Minimum Parcels</h5>
          <TextField
            label="surcharge_minimum_parcels"
            type="number"
            v-model="details.surcharge_minimum_parcels"
            :classes="{
              'p-invalid': v$.details.surcharge_minimum_parcels.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text" >COD Fee ($)</label>
          <TextField
            label="cod_fee"
            type="number"
            v-model="details.cod_fee"
            :classes="{
              'p-invalid': v$.details.cod_fee.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">COD Fee (% of cash collected)</h5>
          <TextField
            label="cod_fee_cash"
            type="number"
            v-model="details.cod_fee_cash"
            :classes="{
              'p-invalid': v$.details.cod_fee_cash.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <label class="required dialog-label-text" >Timeslot Delivery (Fixed 2 hours)</label>
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
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Standard Liability</h5>
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
      </div>
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
        <div class="align-self-center flex ml-2">
          <Buttons
            label="Previous"
            v-on:childToParent="goBackHandler"
            class="p-button-outlined mr-1 dialog-button-text previous-btn"
          />
        </div>
        <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesSales" />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="nextStepHandler"
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
import DuoSelection from "../../../DuoSelect.vue";

export default {
  components: { Panel,DuoSelection },
  data() {
    return {
      defaultTransportType: "Same Night Delivery",
      collapsed: true,
      details: {
        acknowledgement: false,
        surcharge:"",
        surcharge_minimum_parcels:"",
        cod_fee:"",
        cod_fee_cash:"",
        timeslot_delivery:"",
        standard_liability:""
      },
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      details: {
        surcharge: { required },
        surcharge_minimum_parcels: { required },
        cod_fee: { required },
        cod_fee_cash: { required },
        timeslot_delivery: { required },
        standard_liability: { required },
      },
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    },
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SalesRapidoProductDetails",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "SalesRapidoSendQuotations",
        });
      }
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
