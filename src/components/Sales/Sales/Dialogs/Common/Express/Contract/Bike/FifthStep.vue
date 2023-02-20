<template>
  <div class="flex flex-column timeDiv pb-5 px-2 pt-2 ml-2 mr-4 mt-4">
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex align-items-center">
          <CheckBox
            v-bind:categories="[
              {
                name: 'Effective',
                key: 'a',
              },
            ]"
          />
        </div>
        <div class="flex align-items-center">
          <span class="color-343434 font-size-12 bold-700"
            >Effective Start Date (Tentative)</span
          >
        </div>
      </div>
    </div>
    <div clas="flex">
      <div class="whiteDiv p-2 calendarDiv">
        <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="icon"
          v-model="details.estimated_start_date"
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
        <div class="flex align-items-center">
          <span class="color-343434 font-size-12 bold-700">First Month</span>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="whiteDiv p-3 calendarDiv">
        <div class="flex flex-row">
          <div class="flex">
            <RadioButton
              id="charge_use_only"
              name="charge_use_only"
              value="charge_use_only"
              v-model="details.charge_type"
            />
            <label class="radioText ml-2" for="charge_use_only"
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
              id="charge_minimum"
              name="charge_minimum"
              value="charge_minimum"
              v-model="details.charge_type"
            />
            <label class="radioText ml-2" for="charge_minimum"
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
            <h5 class="required color-7a7a7a font-size-14 bold-500">
              Minimum Qty
            </h5>
            <TextField
              label="minimum_quantity"
              type="number"
              v-model="details.minimum_quantity"
              @blur="v$.details.minimum_quantity.$model;"
              :classes="{
                'p-invalid': v$.details.minimum_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required color-7a7a7a font-size-14 bold-500">Amount</h5>
            <TextField
              label="amount"
              type="number"
              v-model="details.amount"
              @blur="v$.details.amount.$model;"
              :classes="{
                'p-invalid': v$.details.amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-column py-3 px-2 ml-2 mt-2">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3 color-343434 font-size-14 bold-700 bg-e6e6e6">
          Contract settings
        </span>
      </div>
    </div>
  </div>
  <span class="ml-2 txt">Contact Person</span>
  <div class="row ml-1 table_div">
    <div class="col-12">
      <!-- <FormTable
        :tableData="
          $store.state.sales &&
          $store.state.sales.expressQuotationContactsTableData &&
          $store.state.sales.expressQuotationContactsTableData
            ? $store.state.sales.expressQuotationContactsTableData
            : []
        "
      /> 
      
      Need to chage below table data's-->

      <FormTable
        v-if="
          $store.state.salesQuotationDialog.inspectionsDropDownTableData != null
        "
        :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
        formTableDataName="inspectionsFormTableData"
        :selectionModeState="selectionModeState"
        dataKey="id"
        :tableData="expressContractBikeAddNewData.contacts"
        :tableColumns="tableColumns"
        storePath="salesQuotationDialog"
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a font-size-14 bold-500">Remarks</h5>
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
          class="p-button-outlined mr-1 dialog-button-text color-357dea"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesSales" label="Cancel"/>
          <Buttons
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text color-357dea"
          />
          <Buttons
            label="Save"
            button_class="dialog-button-text bg-357dea"
            v-on:childToParent="submitData"
          />
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2 bg-357dea"
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
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "SalesExpressContractBikeFifthStep",
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    v$: useVuelidate(),
    details: {
      estimated_start_date_selected: false,
      estimated_start_date: "",
      first_month: false,
      minimum_quantity: "",
      amount: "",
      remarks: "",
      charge_use_only: false,
      charge_minimum: false,
      charge_type: "",
    },
    ref: {
      settings: {
        estimated_start_date: "12-05-2022",
        first_month: "true",
        charge_use_only: "false",
        charge_minimum: "true",
        minimum_quantity: "21",
        amount: "21",
      },
    },
    submitted: false,
    tableColumns: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile" },
    ],
  }),
  validations() {
    return {
      details: {
        minimum_quantity: { required },
        amount: { required },
        remarks: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      expressContractBikeAddNewData:
        "salesExpressBike/expressContractBikeAddNewData",
      ExpressContractBikeEditData:
        "salesExpressBike/ExpressContractBikeEditData",
    }),
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeFourthStep",
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // for (let i in this.details) {
        //     this.expressContractBikeAddNewData[i] = this.details[i];
        //   }
        this.details.estimated_start_date = this.dateFormater(
          this.details.estimated_start_date
        );
        for (let d in this.details) {
          if (d == "charge_type") {
            this.details[this.details[d]] = true;
          }
        }
        this.expressContractBikeAddNewData["remarks"] = this.details.remarks;
        this.expressContractBikeAddNewData["quotation"]["settings"] =
          this.details;
        this.expressContractBikeAddNewData["profile_id"] =
          this.$route.params.id;
        if (this.ExpressContractBikeEditData) {
          this.patchCallHandler();
        } else {
          this.apiCallHandler();
        }

        // this.$store.state.dialog.quotationDetails.push(this.details);
      }
    },
    apiCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotation",
        data: this.expressContractBikeAddNewData,
        method: "POST",
        // loadDiffStore: true,
        loadData: "loadQuotationTabTableData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Quotation is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    patchCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotation/" + this.ExpressContractBikeEditData.id,
        data: this.expressContractBikeAddNewData,
        method: "PATCH",
        // loadDiffStore: true,
        loadData: "loadQuotationTabTableData",
        id: this.$route.params.id,
        type: this.$route.params.type,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Quotation is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: ``,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
      });
    },
  },
  created() {
    if (this.ExpressContractBikeEditData) {
      console.log(this.ExpressContractBikeEditData, "edit dataa");
      this.details.estimated_start_date =
        this.ExpressContractBikeEditData.settings.estimated_start_date;
      this.details.first_month =
        this.ExpressContractBikeEditData.settings.first_month;
      this.details.minimum_quantity =
        this.ExpressContractBikeEditData.settings.minimum_quantity;
      this.details.amount = this.ExpressContractBikeEditData.settings.amount;
      this.details.charge_use_only =
        this.ExpressContractBikeEditData.settings.charge_use_only;
      this.details.charge_type =
        this.ExpressContractBikeEditData.settings.charge_type;
      this.details.remarks = this.ExpressContractBikeEditData.remarks;
      //  estimated_start_date: "",
      // first_month: false,
      // minimum_quantity: "",
      // amount: "",
      // remarks: "",
      // charge_use_only: false,
      // charge_minimum: false,
      // charge_type: "",
    }
  },
  components: {
    RadioButton,
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
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
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
/* table */
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px solid #cad1dd !important;
}
</style>
