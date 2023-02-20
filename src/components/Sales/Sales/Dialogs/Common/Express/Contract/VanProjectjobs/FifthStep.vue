<template>
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Van', 'FSR']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <!-- Van -->
  <div v-if="defaultTransportType == 'Van'">
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
            <span class="chk">Estimated  Start Date (Tentative)</span>
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
          :tableData="$store.state.quotation.expressQuotationContactsTableData"
          :tableColumns="
            $store.state.quotation.expressQuotationContactsTableColumnData
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
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'FSR'">
    <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
      <div class="flex ml-2 mt-1">
        <span>Estimated Start Date</span>
      </div>
      <div clas="flex">
        <div class="whiteDiv1 p-2 ml-2 mt-1">
          <Calendar
            dateFormat="d MM yy"
            class="quotationCalendar"
            id="icon"
            v-model="details.FSR.effective_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
      <div class="flex mt-2">
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
          <div class="flex chk2Div">
            <span class="chk2 pt-2">First Month</span>
          </div>
        </div>
      </div>
      <div class="flex">
        <div>
          <div class="formgrid grid mt-4">
            <div class="field col-12 md:col-3">
              <h5 class="required dialog-label-text" placeholder="0.00">
                Detail Type
              </h5>
              <DropDown
                code="name"
                :data="min_qty"
                @blur="v$.details.FSR.detail_type.$model;"
                label="min_qty"
                v-model="details.FSR.detail_type"
                :class="{
                  'p-invalid': v$.details.FSR.detail_type.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="required dialog-label-text" placeholder="0.00">
                Unit Price
              </h5>
              <TextField
                label="unit_price"
                type="number"
                v-model="details.FSR.unit_price"
                @blur="v$.details.FSR.unit_price.$model;"
                :classes="{
                  'p-invalid': v$.details.FSR.unit_price.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="required dialog-label-text" placeholder="0.00">
                Quantity
              </h5>
              <TextField
                label="quantity"
                type="number"
                v-model="details.FSR.quantity"
                @blur="v$.details.FSR.quantity.$model;"
                :classes="{
                  'p-invalid': v$.details.FSR.quantity.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="required dialog-label-text" placeholder="0.00">
                Amount
              </h5>
              <TextField
                label="amount"
                type="number"
                v-model="details.FSR.amount"
                @blur="v$.details.FSR.amount.$model;"
                :classes="{
                  'p-invalid': v$.details.FSR.amount.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <h5 class="required dialog-label-text">Description</h5>
              <TextAreaField
                label="description"
                rows="1"
                v-model="details.FSR.description"
                @blur="v$.details.FSR.description.$model;"
                :classes="{
                  'p-invalid': v$.details.FSR.description.$invalid && submitted,
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
          :tableData="$store.state.quotation.expressQuotationContactsTableData"
          :tableColumns="
            $store.state.quotation.expressQuotationContactsTableColumnData
          "
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Remarks</h5>
        <TextAreaField
          label="remarks"
          v-model="details.FSR.remarks"
          @blur="v$.details.FSR.remarks.$model;"
          :classes="{
            'p-invalid': v$.details.FSR.remarks.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
  </div>

  <!--DRAG AND DROP UPLOAD-->
  <!-- <div>
    <DragAndDropUpload /> -->
  <!-- <CustomDragDrop /> -->
  <!-- </div> -->
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
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import DuoSelection from "../../../DuoSelect.vue";

// import CustomDragDrop from "../../../../../Reusables/CustomDragandDrop.vue"
export default {
  name: "SalesExpressContractVanProjectJobsFifthStep",
  components: {RadioButton, DuoSelection},
  min_qty: [
    {name: "Standard Entry", code: "ut"},
    {name: "Sample", code: "ss"},
  ],
  data: () => ({
    date: null,
    radios: null,
    SalesDialogCategories: [{name: "Charge Usage Only", key: "M1"}],
    Sales2: [{name: "Charge Minimum", key: "M2"}],
    defaultTransportType: "Van",

    v$: useVuelidate(),
    details: {
      van: {
        effective_date: "",
        first_month: "",
        min_qty: "",
        min_amount: "",
        remarks: "",
      },
      FSR: {
        effective_date: "",
        first_month: "",
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
        remarks: "",
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        van: {
          min_qty: {required},
          min_amount: {required},
          remarks: {required},
        },
        FSR: {
          detail_type: {required},
          unit_price: {required},
          quantity: {required},
          amount: {required},
          description: {required},
          remarks: {required},
        },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    goBack() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractVanProjectJobsFourthStep",
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        //
      }
    },
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
  },
};
</script>
<style scoped>
.formDiv {
  margin-left: 14% !important;
}
.radioText {
  color: #343434;
  font-size: 12px;
  font-weight: 700;
  margin-top: 2%;
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
.checkDiv {
  margin-left: 14%;
}
.calendarDiv {
  margin-left: 15%;
}
.formParentDiv {
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 70%;
}
.whiteDiv {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.whiteDiv1 {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 70x;
  width: 296px;
}
.timeDiv {
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
.text {
  color: grey;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: bold;
  /* border-radius: 7px; */
}
.txt {
  font-size: 12px;
}
.bttn {
  background: white;
  font-size: 14px;
  padding-top: 8px;
  padding-right: 150px;
  height: 40px;
  padding-left: 30px;
  width: 100%;
}
.bttn1 {
  margin-top: 8px;
  background: white;
  font-size: 14px;
  padding-left: 30px;
  padding-top: 8px;
  padding-right: 150px;
  height: 40px;
  width: 100%;
}
.chk2 {
  font-size: 12px;
  font-weight: bold;
}
.chk2Div {
  padding-top: 8%;
}
span .chk2 {
  margin-top: 0.5rem !important;
}
.chk {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
}
.textA {
  width: 100%;
}
</style>
