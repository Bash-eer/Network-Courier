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
        <!-- <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="icon"
          v-model="details.effective_date"
          :showIcon="true"
          style="width: 100%"
        /> -->
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
      <div class="whiteDiv p-3 calendarDiv">
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
      <div class="formParentDiv formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Minimum Qty
            </h5>
            <TextField
              label="min_qty"
              type="number"
              v-model="details.min_qty"
              @blur="v$.details.min_qty.$model;"
              :classes="{
                'p-invalid': v$.details.min_qty.$invalid && submitted,
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
              @blur="v$.details.min_amount.$model;"
              :classes="{
                'p-invalid': v$.details.min_amount.$invalid && submitted,
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
        :selectionModeState="selectionModeState"
        formTableDataName="contactsFormTableData"
        dataKey="id"
        :tableData="$store.state.sales.quotationCreationFormData.contact_person"
        :tableColumns="
          $store.state.sales.expressQuotationContactsTableColumnData
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
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <DragAndDropUpload />
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
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
export default {
  name: "ExpressContractBikeContractOrSendQuotation",
  data: () => ({
    date: null,
    radios: null,
    SalesDialogCategories: [{ name: "Charge Usage Only", key: "M1" }],
    Sales2: [{ name: "Charge Minimum", key: "M2" }],
    v$: useVuelidate(),
    details: {
      // effective_date: "",
      first_month: "",
      min_qty: "",
      min_amount: "",
      remarks: "",
    },
    selectionModeState: null,
    submitted: false,
  }),
  validations() {
    return {
      details: {
        min_qty: { required },
        min_amount: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "QuotationCostingDetails";
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // let date = this.details.effective_date;
        // let dates = date.getDate();
        // let month = date.getMonth();
        // let year = date.getFullYear();
        // this.details.effective_date = dates + "/" + month + "/" + year;
        for (var d in this.details) {
          if (d == "first_month") {
            if (this.details[d] == "Charge Usage Only") {
              this.details[d] = "charge usage only";
            }
            if (this.details[d] == "Charge Minimum") {
              this.details[d] = "charge minimum";
            }
          }
          this.$store.state.sales.quotationCreationFormData[d] =
            this.details[d];
        }
        this.$store.state.sales.quotationCreationFormData["company_id"] =
          parseInt(this.$store.state.sales.salesCompanyid);
        this.$store.state.sales.quotationCreationFormData["quotation_type"] =
          "express_contract";
        this.$store.state.sales.quotationCreationFormData["type"] = "quotation";

        let allQuotationDetails = {};
        for (let sd in this.$store.state.sales.quotationCreationFormData) {
          if (sd == "contact_person") {
            allQuotationDetails[sd] =
              this.$store.state.masters.contactsFormTableData;
          } else {
            allQuotationDetails[sd] =
              this.$store.state.sales.quotationCreationFormData[sd];
          }
        }

        // CRUD - UPDATE OPERATION
        if (this.$store.state["sales"].quotationCreationStateData.id) {
          allQuotationDetails["id_key"] =
            this.$store.state["sales"].quotationCreationStateData.id;
          allQuotationDetails["quotation_id"] =
            this.$store.state["sales"].quotationCreationStateData.quotation_id;
          //making an update/PUT api call - to update quotation data
          this.$store.dispatch("sales/expressQuotationCRUD", {
            tag: "update",
            data: allQuotationDetails,
          });
        }
        // CRUD - CREATE OPERATION
        else {
          // making an add/POST api to create a new quotation
          this.$store.dispatch("sales/expressQuotationCRUD", {
            tag: "add",
            data: allQuotationDetails,
          });
          // this.$store.state.sales.quotationFileUpload = true;
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        var allContacts = [];
        for (var c in this.$store.state["sales"].quotationCreationStateData) {
          if (c == "contact_person") {
            let contacts_array =
              this.$store.state["sales"].quotationCreationStateData[c];
            for (let ca in contacts_array) {
              allContacts.push(contacts_array[ca]);
            }
          }
        }
        for (let state in this.details) {
          this.details[state] =
            this.$store.state["sales"].quotationCreationStateData[state];
        }

        this.$store.state.masters.contactsFormTableData = allContacts;
        this.selectionModeState = allContacts;
      }
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length == 0
      ) {
        this.$store.state.masters.contactsFormTableData = [];
        this.selectionModeState = null;
      }
    },
  },
  components: {
    RadioButton,
  },
  activated() {
    this.loadState();
  },
  created() {
    this.loadState();
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
span .chk2{
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
