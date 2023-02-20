<template>
<div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4 mt-4">
      <div class="flex">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox v-model="details.effective_start" :binary="true" />
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
            v-model="details.effective_date"
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
            <Checkbox v-model="details.first_month_check" :binary="true" />
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
  <!-- <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2"  @click="showContractDetails">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3"> Contract settings </span>
      </div>
    </div>
  </div> -->
  <div
    class="contracttab my-4 ml-2 cursor-pointer"
    @click="showContractDetails"
  >
    Contract settings
  </div>
  
  <div v-show="showContract" class="m-0 p-0">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Contract Start Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            v-model="details.contract_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Contract End
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            v-model="details.contract_end"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
      <div class="field col-12  md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Contract Period
        </h5>
        <TextField
          label="contract_period"
          type="text"
          v-model="details.contract_period"
          :classes="{
            'p-invalid': v$.details.contract_period.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text mt-2 ': true,
          }"
        />
      </div>
    </div>
    <div class="flex mb-3 mt-0 ml-2">
      <div class="flex flex-row align-items-center">
        <div class="flex mb-2 pt-0">
         
          <Checkbox v-model="details.renew" :binary="true" />
        </div>
        <div class="flex pl-2">
          <span class="bold-600 font-size-12 color-4e5868">Auto Renewal</span>
        </div>
      </div>
    </div>
  </div>
  <span class="ml-2 txt">Contact Person</span>
  <div class="row ml-1 table_div">
    <div class="col-12">
      <DataTables
      :key="renderKey"
        :tableData="finalData.contacts"
        v-model:selection="selected_contacts"
        :selectionModeState="selected_contacts"
        :tableColumn="trip_table"
      />
      <!-- <FormTable
        :tableData="
          $store.state.sales &&
          $store.state.sales.expressQuotationContactsTableData &&
          $store.state.sales.expressQuotationContactsTableData
            ? $store.state.sales.expressQuotationContactsTableData
            : []
        "
      /> -->
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
  <!--DRAG AND DROP UPLOAD-->
  <div>
    <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
      @update:files="getFiles"
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
          <CancelButton storePath="salesQuotationDialog" @click="closeDialog" />
          <Buttons
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text"
             v-on:childToParent="submitData('preview')"
            :loading="isloading1"
          />
          <Buttons label="Save" button_class="dialog-button-text"
           v-on:childToParent="submitData('save')"
            :loading="isloading" />
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2"
             v-on:childToParent="submitData('send')"
            :loading="isQuotationBtnLoading"
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
import { mapActions, mapState } from "vuex";
import Checkbox from "primevue/checkbox";
import DataTables from "./Components/DataTables.vue";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
export default {
  name: "SalesExpressContractVanFifthStep",
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    v$: useVuelidate(),
    renderKey:1,
    upload_files: [],
     showContract: false,
     isloading: false,
    isloading1: false,
    isQuotationBtnLoading: false,
     selected_contacts:[],
      trip_table:[
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "designation", header: "Address" },
    ],
    details: {
      effective_start:false,
      first_month_check:false,
      effective_date: "",
      first_month: "",
      min_qty: "",
      min_amount: "",
      remarks: "",
       contract_start_date: "",
      contract_end: "",
      contract_period: "",
      renew: false,
    },

    submitted: false,
  }),
validations() {
    return {
      details: {
          min_qty: { required },
          min_amount: { required },
          remarks: { required },
           contract_start_date: { required },
        contract_end: { required },
        contract_period: { required },
      },
    };
  },
   computed: {
    ...mapState({
      finalData: (state) => state.salesExpressContractVan.payloadPost,
       quotationData: (state) => state.salesExpressContractVan.OverviewData,
    }),
  },
  methods: {
     ...mapActions({
      setPostData: "salesExpressContractVan/setPayloadPostData",
      sendQuotationData: "salesRapidoContract/Contract/sendQuotation",
      saveExPressVan: "salesExpressContractVan/saveExPressVan",
      editExPressVan: "salesExpressContractVan/editExPressVan",
    }),
    goBackHandler() {
      this.$store.state.salesExpressContractVan.vanStep++;
      this.$store.dispatch("salesExpressContractVan/navigateStepper", {
        step: "SalesExpressContractVanFourthStep",
      });
    },
    showContractDetails() {
      this.showContract = !this.showContract;
    },
     closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    getFiles(e) {
      this.upload_files = e;
    },
    submitData(type) {
     let {
      effective_start,
      first_month_check,
      effective_date,
      first_month,
      min_qty,
      min_amount,
      remarks,
       contract_start_date,
      contract_end,
      contract_period,
      renew,
    } = this.details
      if (this.v$.$invalid) {
        this.submitted = true;
         this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
         this.post = {
          ...this.finalData,
          remarks:remarks,
          quotation: {
            ...this.finalData.quotation,
            settings: {
            "estimated_start_date_selected" : effective_start,
            "estimated_start_date" :effective_date,
            "first_month" : first_month_check,
            "charge_use_only" : first_month==="Charge Usage Only"?true:false,
            "charge_minimum" : first_month==="Charge Minimum"?true:false,
            "minimum_quantity" : min_qty,
            "amount" : min_amount,
            "contract_start_date" : contract_start_date,
            "contract_end_date" : contract_end,
            "contract_period" : contract_period, 
            "auto_renewal" : renew 
        },
          },
          attachments: {
            uploaded_in: "Quotation",
            attachment_details: this.upload_files,
          },
        };
         if (type == "save" || type == "preview") {
          this.save(type, this.post);
        } else {
          this.sendQuotation(this.post);
        }
      }
    },
     async save(type, data) {
      try {
         if (type == "preview") {
          this.isloading1 = true;
         }else{
this.isloading = true;
         }
        
        if (this.quotationData) {
          this.quotationId = await this.editExPressVan({
            id: this.quotationData.id,
            payload: data,
          });
        } else {
        this.quotationId = await this.saveExPressVan(data);
        }
        
        if (type == "preview") {
          this.isloading1 = false;
         }else{
this.isloading = false;
         }
        
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: this.quotationData?"Details Updated successfully":"New data added successfully",
          life: 3000,
        });
        this.$store.dispatch("salesSales/closeDialog");
        if (type == "preview") {
          // this.$router.push({
          //   name: "InternationalAgent",
          //   params: {
          //     id: this.quotationId?.data.results?.id,
          //     type: "quotation",
          //   },
          // });
        }
      } catch (err) {
         if (type == "preview") {
          this.isloading1 = false;
         }else{
this.isloading = false;
         }
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    async sendQuotation() {
      try {
        this.isQuotationBtnLoading = true;
        if (this.quotationData) {
          this.quotationId = await this.editExPressVan({
            id: this.quotationData.id,
            payload: this.post,
          });
        } else {
        this.quotationId = await this.saveExPressVan(this.post);
        }
        if(this.quotationId){
          let ids=[]
      this.post.contacts.map((i)=>{
        if(!i?.selected){
ids.push(i.id)
        }
      })
 await this.sendQuotationData({
          id: this.quotationId?.data.results?.id,
          payload: {
                send_to: ids,
              },
        });
        }
       
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "New data added successfully",
          life: 3000,
        });
        this.isQuotationBtnLoading = true;
        this.$store.dispatch("salesSales/closeDialog");
      } catch (err) {
        this.isQuotationBtnLoading = true;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    prefillData(){
      let overViewDetails =this.quotationData?.settings
      this.details.remarks =this.quotationData?.remarks
      this.details.effective_start = overViewDetails.effective_start_date_selected
      this.details.effective_date=moment(overViewDetails.estimated_start_date).format("d MMMM yy")
      this.details.first_month_check =overViewDetails.first_month
      this.details.first_month =overViewDetails.charge_use_only?"Charge Usage Only":"Charge Minimum"
      this.details.min_qty=overViewDetails.minimum_quantity
      this.details.min_amount =overViewDetails.amount
      this.details.contract_start_date=moment(overViewDetails.contract_start_date).format("d MMMM yy")
      this.details.contract_end=moment(overViewDetails.contract_end_date).format("d MMMM yy")
      this.details.contract_period=overViewDetails.contract_period
      this.details.renew=overViewDetails.auto_renewal
      this.quotationData?.contacts.map((i)=>{
         if(i.selected){
        this.selected_contacts.push(i)
         }
      })
      this.renderKey++
    }
  },
  components: {
    RadioButton,
    Checkbox,
    DataTables,
  },
   async mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
};
</script>
<style  lang="scss" scoped>
@import "~@/assets/scss/main.scss";
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
.contracttab {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-radius: 8px;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: 700;
  color: #343434;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px dashed #cad1dd !important;
}
.formRows {
  margin-top: 2% !important;
}
.formTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.formTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  border-radius: 5px;
  outline: thin !important;
  outline-style: dashed !important;
  outline-color: #cad1dd !important;
}
.formTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.formTable .p-column-title {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.formTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #edf1f7 !important;
}
.formTable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
}
</style>
