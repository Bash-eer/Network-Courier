<template>
  <div class="flex flex-column time_content pb-5 px-2 pt-2 ml-2 mr-4 mt-6">
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex pl-4 pr-2">
          <!-- <CheckBox
            v-bind:categories="[
              {
                name: 'Effective',
                key: 'a',
              },
            ]"
          /> -->
          <Checkbox v-model="details.estimate_checked" :binary="true" />
        </div>
        <div class="flex">
          <span class="check_text mt-0">Estimated Start Date (Tentative)</span>
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
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
        />
      </div>
    </div>
  </div>
  <!-- <div
    class="flex flex-column sendquotation_timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4"
  >
    <div class="flex">
      <div class="sendquotation_formParentDiv sendquotation_formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text" placeholder="0.00">
              Estimated Start Date
            </h5>
            <div clas="flex">
              <div class="sendquotation_whiteDiv p-2 calendardiv-2">
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
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text" placeholder="0.00">
              Estimated End Date
            </h5>
            <div clas="flex">
              <div class="sendquotation_whiteDiv p-2 calendardiv-2">
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
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-2">
      <div class="flex flex-row sendquotation_checkDiv">
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
        <div class="flex sendquotation_chk2Div">
          <span class="sendquotation__chk2">First Month</span>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="sendquotation_whiteDiv p-3 sendquotation_calendarDiv">
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
      <div class="sendquotation_whiteDiv p-3 sendquotation_calendarDiv">
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
      <div class="sendquotation_formParentDiv sendquotation_formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Minimum Qty
            </h5>
            <TextField
              label="min_qty"
              type="number"
              v-model="details.min_qty"
              :classes="{
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
              :classes="{
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3"> Contract settings </span>
      </div>
    </div>
  </div> -->

  <!-- <div
    class="contracttab my-4 ml-2 cursor-pointer"
    @click="showContractDetails"
  >
    Contract settings
  </div> -->
  <!-- <div v-show="showContract" class="m-0 p-0">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Contract Start Date
        </h5>
        <div
          :class="{
            'red-c-valid': v$.details.contract_start_date.$invalid && submitted,
            'white_content1 p-2 ': true,
          }"
        >
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
        
        <div
          :class="{
            'red-c-valid': v$.details.contract_end.$invalid && submitted,
            'white_content1 p-2 ': true,
          }"
        >
          <Calendar
            dateFormat="d MM yy"
            :class="{
              'p-invalid': v$.details.contract_period.$invalid && submitted,
              'quotation_calendar ': true,
            }"
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
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Contract Period
        </h5>
        <TextField
          label="contract_period"
          type="text"
          v-model="details.contract_period"
          :classes="{
            'p-invalid': v$.details.contract_period.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Credit Terms (Days)
      </h5>
      <TextField
        label="credit_terms"
        type="text"
        v-model="details.credit_terms"
        :classes="{
          'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="flex mb-3 mt-0">
      <div class="flex flex-row align-items-center">
        <div class="flex mb-2 pt-0">
          <Checkbox v-model="details.renew" :binary="true" />
        </div>
        <div class="flex">
          <span class="bold-600 font-size-12 color-4e5868">Auto Renewal</span>
        </div>
      </div>
    </div>
  </div> -->
  <span class="ml-2 bold-700 font-size-12 color-343434">Contact Person</span>
  <div class="row table_div">
    <div :key="renderKey" class="col-12 ml-2">
      <!-- <FormTable
        :tableData="
          $store.state.quotation &&
          $store.state.quotation.expressQuotationContactsTableData &&
          $store.state.quotation.expressQuotationContactsTableData
            ? $store.state.quotation.expressQuotationContactsTableData
            : []
        "
      /> -->
      <!-- <FormTable
          v-if="$store.state.salesQuotationDialog.inspectionsDropDownTableData != null"
          :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
          :tableColumns="
            $store.state.salesQuotationDialog.inspectionsDropDownTableDataColumns
          "
          storePath="salesInternationalAgent"
        /> -->
      <DataTable
        :key="renderKey"
        class="p-datatable-sm editable-cells-table formTable"
        id="formTable"
        :value="finalData.contacts"
        responsiveLayout="scroll"
        v-model:selection="selectedProducts"
      >
        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column field="contact_name" header="Name"></Column>
        <Column field="contact_no" header="Contact"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="designation" header="Address"></Column>
      </DataTable>
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a font-size-14 bold-500 mt-3">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!--DRAG AND DROP UPLOAD-->
  <div :key="renderKey">
    <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
      :default="upload_files"
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
          class="p-button-outlined mr-1 dialog-button-text color-357dea"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton
            storePath="salesInternationalAgent"
            label="Cancel"
            class="color-357dea"
            @click="closeDialog"
          />
          <Buttons
            v-if="updateType.includes('quotation')"
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text color-357dea"
            @click="submitData('preview')"
            :loading="isloading1"
          />
          <Buttons
            label="Save"
            button_class="dialog-button-text bg-357dea"
            @click="submitData('save')"
            :loading="isloading"
          />
          <Buttons
            v-if="updateType.includes('quotation')"
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2 bg-357dea"
            @click="submitData('send')"
            :loading="isQuotationBtnLoading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import RadioButton from "primevue/radiobutton";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "vuex";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
import { salesCommon } from "../../../../../../../store/helper";
export default {
  name: "SalesInternationalAgentSeventhStep",
  v$: useVuelidate(),
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    v$: useVuelidate(),
    showContract: false,
    renderKey: 1,
    products: [],
    upload_files: [],
    isloading: false,
    isloading1: false,
    isQuotationBtnLoading: false,
    selectedProducts: null,
    quotationId: null,
    post: null,
    details: {
      estimate_checked: false,
      renew: false,
      effective_date: "",
      first_month: "",
      min_qty: "",
      min_amount: "",
      remarks: "",
      contract_start_date: "",
      contract_end: "",
      contract_period: "",
      credit_terms: "",
    },

    submitted: false,
  }),
  validations() {
    return {
      details: {
        // effective_date:{ required },
        remarks: { required },
        // contract_start_date: { required },
        // contract_end: { required },
        // contract_period: { required },
        // credit_terms: { required },
      },
    };
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
      updateType: (state) => state.salesInternationalAgent.updateType,
    }),
  },
  methods: {
    ...salesCommon,
    ...mapActions({
      getServiceProvider: "salesInternationalAgent/getServiceProvider",
      setPostData: "salesInternationalAgent/setPayloadPostData",
      saveInternationalAgent: "salesInternationalAgent/saveInternationalAgent",
      updateInternationalAgent:
        "salesInternationalAgent/editInternationalAgent",
      sendQuotationData: "salesRapidoContract/Contract/sendQuotation",
      setAgentStep: "salesInternationalAgent/setAgentStep",
    }),
    showContractDetails() {
      this.showContract = !this.showContract;
    },
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentSixthStep",
      });
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    getFiles(e) {
      this.upload_files = e;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    submitData(type) {
      let {
        estimate_checked,
        effective_date,
        contract_end,
        contract_start_date,
        contract_period,
        renew,
        credit_terms,
        remarks,
      } = this.details;
      let data = this.$store.state.contacts.contactAppointmentsFiles ?? [];

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
        let con_tact = [];
        this.finalData.contacts.map((i) => {
          if (this.selectedProducts.some((u) => u.email === i.email)) {
            i["selected"] = true;
            con_tact.push(i);
          } else {
            i["selected"] = false;
            con_tact.push(i);
          }
          //           this.selectedProducts.map((e) => {
          //             if (e.email == i.email) {
          //               i["selected"] = true;
          //             } else {
          //               i["selected"] = false;
          //             }
          //             if(con_tact.some(u => u.email === i.email)){
          // con_tact.push(i);
          //             }

          //           });
        });
        let data = this.$store.state.contacts.contactAppointmentsFiles ?? [];
        this.post = {
          ...this.finalData,
          contacts: con_tact,
          remarks: remarks,
          quotation: {
            ...this.finalData.quotation,
            settings: {
              effective_start_date_selected: estimate_checked,
              effective_start_date: effective_date,
              // contract_start_date: contract_start_date,
              // contract_end_date: contract_end,
              // contract_period: contract_period,
              // auto_renewal: renew,
              // credit_terms: credit_terms,
            },
          },
          attachments: {
            uploaded_in: "Quotation",
            attachment_details: this.upload_files ?? [],
          },
        };
        this.setPostData({ type: this.post });
        if (type === "save" || type === "preview") {
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
        } else {
          this.isloading = true;
        }

        if (this.quotationData) {
          this.quotationId = await this.updateInternationalAgent({
            id: this.quotationData.id,
            payload: this.post,
            type: this.updateType,
          });
        } else {
          this.quotationId = await this.saveInternationalAgent(data);
        }
        // this.$store.dispatch("salesSales/closeDialog");
        if (type == "preview") {
          this.isloading1 = false;
        } else {
          this.isloading = false;
        }

        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: this.quotationData
            ? "Details Updated successfully"
            : "New data added successfully",
          life: 3000,
        });
        this.$store.dispatch("salesSales/closeDialog");
        if (type == "preview") {
          this.$router.push({
            name: "InternationalAgent",
            params: {
              id: this.quotationId?.data.results?.id,
              type: "quotation",
            },
          });
        }
        if (this.$route.path == "/sales") {
          this.loadQuotationTabData();
          this.loadContractTabData();
        }
        this.$store.dispatch("salesSales/loadQuotationTabTableData", {
          id: this.$route.params.id,
        });
        this.$store.dispatch("salesSales/loadContractTabTableData", {
          id: this.$route.params.id,
        });
      } catch (err) {
        if (type == "preview") {
          this.isloading1 = false;
        } else {
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
          this.quotationId = await this.updateInternationalAgent({
            id: this.quotationData.id,
            payload: this.post,
            type: this.updateType,
          });
        } else {
          this.quotationId = await this.saveInternationalAgent(this.post);
        }
        if (this.quotationId) {
          let ids = [];
          this.quotationId?.data.results?.contacts.map((i) => {
            if (i?.selected) {
              ids.push(i.id);
            }
          });
          if (ids.length != 0) {
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
            detail: this.quotationData
              ? "Details Updated successfully"
              : "New data added successfully",
            life: 3000,
          });
        }
        this.isQuotationBtnLoading = false;
        this.$store.dispatch("salesSales/closeDialog");
        if (this.$route.path == "/sales") {
          this.loadQuotationTabData();
          this.loadContractTabData();
        }
        this.$store.dispatch("salesSales/loadQuotationTabTableData", {
          id: this.$route.params.id,
        });
        this.$store.dispatch("salesSales/loadContractTabTableData", {
          id: this.$route.params.id,
        });
      } catch (err) {
        this.isQuotationBtnLoading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    prefillData() {
      (this.details.estimate_checked =
        this.quotationData.settings.effective_start_date_selected),
        (this.details.renew = this.quotationData.settings.auto_renewal),
        (this.details.effective_date = moment(
          this.quotationData.settings.effective_start_date
        ).format("D MMM YYYY")),
        (this.details.remarks = this.quotationData.remarks),
        (this.details.contract_start_date = moment(
          this.quotationData.settings.contract_start_date
        ).format("D MMM YYYY")),
        (this.details.contract_end = moment(
          this.quotationData.settings.contract_end_date
        ).format("D MMM YYYY")),
        (this.details.contract_period =
          this.quotationData.settings.contract_period);
      this.selectedProducts = [];
      this.finalData.contacts.map((i) => {
        if (
          this.quotationData?.contacts &&
          this.quotationData.contacts.some(
            (u) => u.email === i.email && u.selected
          )
        ) {
          this.selectedProducts.push(i);
        }
      });
      let obj = "quotation_attachments";
      if ("quotation_attachments" in this.quotationData) {
        obj = "quotation_attachments";
      }
      if ("contract_attachments" in this.quotationData) {
        obj = "contract_attachments";
      }
      if (this.quotationData && this.quotationData[obj]?.length != 0) {
        this.quotationData[obj][0].attachments.map((i) => {
          this.upload_files.push({
            file_name: i.file_name,
            url: i.url,
            mime_type: i.mime_type,
            size: i.size,
          });
        });
      }
      this.renderKey++;
    },
  },
  created() {
    this.details.effective_date = moment().format("D MMM YYYY");
  },
  components: {
    // RadioButton,
    Checkbox,
    DataTable,
    Column,
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
/* .sendquotation_formDiv {
  margin-left: 14% !important;
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
.sendquotation_checkDiv {
  margin-left: 14%;
}
.sendquotation_calendarDiv {
  margin-left: 15%;
}
.sendquotation_formParentDiv {
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 70%;
}
.sendquotation_whiteDiv {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.sendquotation_timeDiv {
  background: #edf1f7;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
}
.sendquotation_chk2 {
  font-size: 12px;
  font-weight: bold;
  margin-top: 9%;
}
.sendquotation_chk2Div {
  padding-top: 8%;
}
.sendquotation_chk {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
} */
.time_content {
  background: #edf1f7;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
}
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
.check_text {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
  flex: none;
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
.white_content1 {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
}
.time_content {
  background: #edf1f7;
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
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
  border: 1px solid #cad1dd !important;
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

:deep .p-inputnumber-input {
  padding: 5px !important;
}
.red-c-valid {
  border: 1px solid red !important;
}
</style>