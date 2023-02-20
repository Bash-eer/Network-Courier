<template>
<div>
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Bike', 'FSR']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <!-- Bike -->
  <div v-if="defaultTransportType == 'Bike'">
    <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
      <div class="flex">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Effective Start Date (Tentative)"
              v-model="details.Bike.estimated_start_date_selected"
              :value="details.Bike.estimated_start_date_selected"
            />
            <!-- <CheckBox
              v-bind:checker="
                details.Bike.estimated_start_date_selected == true
                  ? [
                      {
                        name: 'estimated_start_date_selected',
                        tag: 'Bike',
                        key: 'wd',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'estimated_start_date_selected',
                  tag: 'Bike',
                  key: 'wd',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            /> -->
          <!-- </div>
          <div class="flex">
            <span class="chk">Effective Start Date (Tentative)</span> -->
          </div>
        </div>
      </div>
      <div clas="flex">
        <div class="whiteDiv p-2 calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="quotationCalendar"
            id="icon"
            v-model="details.Bike.estimated_start_date"
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
            <SingleCheckBox
              label="First Month"
              v-model="details.Bike.first_month"
              :value="details.Bike.first_month"
            />
            <!-- <CheckBox
              v-bind:checker="
                details.Bike.first_month == true
                  ? [
                      {
                        name: 'first_month',
                        tag: 'Bike',
                        key: 'wd',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'first_month',
                  tag: 'Bike',
                  key: 'wd',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            /> -->
          <!-- </div>
          <div class="flex chk2Div">
            <span class="chk2">First Month</span> -->
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
                  value="charge_use_only"
                  v-model="chargeUsed"
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
                  value="charge_minimum"
                  v-model="chargeUsed"
                />
                <label class="radioText ml-2" for="chargeMinium"
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
                label="minimum_quantity"
                type="number"
                v-model="details.Bike.minimum_quantity"
                @blur="v$.details.Bike.minimum_quantity.$model;"
                :classes="{
                  'p-invalid':v$.details.Bike.minimum_quantity.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
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
                v-model="details.Bike.amount"
                @blur="v$.details.Bike.amount.$model;"
                :classes="{
                  'p-invalid': v$.details.Bike.amount.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    <!-- FSR -->
    <div v-if="defaultTransportType == 'FSR'">
      <div class="flex flex-column timeDiv pb-5 pl-2 ">
        <div class="flex col-8">
          <div class="md:col-6 mr-2">
            <div class="flex mt-1">
              <span>Estimated Start Date</span>
            </div>
            <div clas="flex">
              <div class="whiteDiv1 p-2 mt-1">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.FSR.estimated_start_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
          <div class="md:col-6 ml-4">
            <div class="flex ml-4 mt-1">
              <span>Estimated End Date</span>
            </div>
            <div clas="flex">
              <div class="whiteDiv1 p-2 ml-2 mt-1">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.FSR.estimated_end_date"
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
      <div class="col-3">
        <div class="flex flex-row align-items-center">
          <div class="flex">
            <SingleCheckBox
              label="First Month"
              v-model="details.FSR.first_month"
              :value="details.FSR.first_month"
            />
          </div>
        </div>
      </div>
        <div class="flex ">
          <div class="w-100">
            <div class="formgrid grid mt-4 w-100">
              <div class="field col-12 md:col-3">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Detail Type
                </h5>
                <DropDown
                  code="name"
                  :data="min_qty"
                  @blur="v$.details.FSR.detail_type.$model;"
                  label="detail_type"
                  :state="details.FSR.detail_type"
                  :key="details.FSR.detail_type"
                  v-model="details.FSR.detail_type"
                  :class="{
                    'p-invalid': v$.details.FSR.detail_type.$invalid && submitted,
                    'inputfield w-full color-212121 font-bold ': true,
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
                    'inputfield w-full color-212121 font-bold py-2': true,
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
                    'inputfield w-full color-212121 font-bold py-2': true,
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
                    'inputfield w-full color-212121 font-bold py-2': true,
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
                    'inputfield w-full color-212121 font-bold py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div>
    <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2">
      <div class="row">
        <div class="col-12 text">
          <span class="ml-3"> Contract settings </span>
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Contract Start Date</h5>
        <Calendar
          dateFormat="d MM yy"
          id="icon"
          v-model="details.Settings.contract_start_date"
          :showIcon="true"
          style="width: 100%"
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Contract End Date</h5>
        <Calendar
          dateFormat="d MM yy"
          id="icon"
          v-model="details.Settings.contract_end_date"
          :showIcon="true"
          style="width: 100%"
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
          :classes="{
            'p-invalid': v$.details.Settings.contract_end_date.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Contract Period</h5>
        <TextField
          label="amount"
          id="amount"
          type="number"
          v-model="details.Settings.contract_period"
          @blur="v$.details.Settings.contract_period.$model;"
          :classes="{
            'p-invalid': v$.details.Settings.contract_period.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
      <div class="col-3">
        <div class="flex flex-row align-items-center">
          <div class="flex">
            <SingleCheckBox
              label="Auto Renewal"
              v-model="details.Settings.auto_renewal"
              :value="details.Settings.auto_renewal"
            />
          </div>
        </div>
      </div>
      <!-- Contact table -->
    <span class="ml-2 txt">Contact Person</span>
    <div class="row ml-1 table_div">
      <div class="col-12">
        <EditTable
        :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
        formTableDataName="inspectionsFormTableData"
        :selectionModeState="selectionModeState"
        dataKey="email"
        :tableData="expressContractBikeFSRContactData.contacts"
        :tableColumns="tableColumns"
        storePath="salesQuotationDialog"
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
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
  </div>

  <!--DRAG AND DROP UPLOAD-->
  <div>
    <DragAndDropUpload
      :state="salesExpressContractBikeFSRAttachmentsState"
      type="salesExpressContractBikeFSRAttachments"
      storePath="salesExpressContractBikeFSR"
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
          <div v-if="validationErr && submitted" class="color-red mr-5">
            Required fields are missing
          </div>
           <CancelButton storePath="salesSales" @click="closeDialog" label="cancel" class="color-357dea"/>
          <!-- <Buttons
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text"
          /> -->
          <Buttons 
              label="Save"
              button_class="dialog-button-text bg-357dea"
              v-on:childToParent="save"
            />
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2 bg-357dea"
            @click="sent"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import EditTable from "./Editable.vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import DuoSelection from "../../../DuoSelect.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
// import { errhandler } from "@/services/httpClient";

// import CustomDragDrop from "../../../../../Reusables/CustomDragandDrop.vue"
export default {
  name: "SalesExpressContractBikeFSRFifthStep",
  components: { RadioButton, DuoSelection, EditTable },
  data: () => ({
    date: null,
    radios: null,
    contactTableData: [],
    selectedRadioButton: null,
    chargeUsed: "",
    validationErr: true,
    SalesDialogCategories: [{name: "Charge Usage Only", key: "M1"}, {name: "Charge Minimum", key: "M2"}],
    Sales2: [{name: "Charge Minimum", key: "M2"}],
    defaultTransportType: "Bike",
    isQuotationBtnLoading: false,
    v$: useVuelidate(),
    tableColumns: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile Number" },
    ],
    min_qty: [
      {name: "Standard Entry", code: "ut"},
      {name: "Sample", code: "ss"},
    ],
    salesExpressContractBikeFSRAttachmentsState: " ",
    details: {
      Bike: {
        estimated_start_date_selected: false,
        estimated_start_date: null,
        first_month: false,
        // charge: "",
        charge_use_only: false,
        charge_minimum: false,
        minimum_quantity: false,
        amount: "",
        // remarks: "",
      },
      FSR: {
        estimated_start_date: null,
        estimated_end_date: null,
        first_month: false,
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      },
      Settings: {
        contract_start_date: null,
        contract_end_date: null,
        contract_period: "",
        auto_renewal: false,
      },
      remarks: "",
      uploaded_in: "Quotation",
      attachment_details: [],
    },
    attachments: {
      uploaded_in: "Quotation",
      attachment_details: [
        {
          file_name: "test1",
          url: "test2",
          mime_type: "test3",
          size: 3,
        },
        {
          file_name: "test4",
          url: "test5",
          mime_type: "test6",
          size: 3,
        },
      ],
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        Bike: {
          minimum_quantity: {required},
          amount: {required},
        },
        FSR: {
          detail_type: {required},
          unit_price: {required},
          quantity: {required},
          amount: {required},
          description: {required},
        },
        Settings: {
          contract_start_date: {required},
          contract_end_date: {required},
          contract_period: {required},
        },
      remarks: {required},
      },
    };
  },
   computed: {
    ...mapGetters({
      payloadData: "salesExpressContractBikeFSR/payloadData",
      expressContractBikeFSRContactData:
        "salesExpressContractBikeFSR/expressContractBikeFSRContactData",
      expressContractBikeFSRAddNewData:
        "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
      bikeFSRAttachmentsStateData: "salesExpressContractBikeFSR/bikeFSRAttachmentsStateData",
      quotationData: "salesExpressContractBikeFSR/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
      // setPayloadData: "salesExpressContractBikeFSR/setPayloadData",
      // saveData: "salesExpressContractBikeFSR/saveData",
    }),
    checkBoxChange(val, src) {
  // Bike
      if (val.length != 0 && val[0].tag == "Bike") {
        this.details.Bike[val[0].name] = true;
      }else if (val.length == 0 && val[0].tag == "Bike") {
        this.details.Bike[src[0].name] = false;
      }
  // FSR
      if (val.length != 0 && val[0].tag == "FSR") {
        this.details.FSR[val[0].name] = true;
      }else if (val.length == 0 && val[0].tag == "FSR") {
        this.details.FSR[src[0].name] = false;
      }
  // Settings
      if (val.length != 0 && val[0].tag == "Settings") {
        this.details.Settings[val[0].name] = true;
      }else if (val.length == 0 && val[0].tag == "Settings") {
        this.details.Settings[src[0].name] = false;
      }
    },
    goBackHandler() {
      this.setCurrentStep(4);

    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("MM-DD-YYYY");
        return formattedDate;
      }
    },
    save (){
      this.isQuotationBtnLoading = false,
      this.submitData();
    },
    sent (){
      this.isQuotationBtnLoading = true,
      this.submitData();
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details){
          let procesedDatas = {};

          // procesedDatas[i] = {};
          for (let Data in this.details[i]){
            if (Data == "estimated_start_date" || Data == "estimated_end_date" || Data == "contract_start_date"|| Data == "contract_end_date"){
              if(this.details[i][Data]){
              procesedDatas[Data] = this.dateFormater(this.details[i][Data]);
              }else{
                procesedDatas[Data] = null;
              }
            }
            // else if(Data == "charge"){
            //   if(this.details[i][Data] == "Charge Usage Only"){
            //     procesedDatas["charge_use_only"] = true;
            //     procesedDatas["charge_minimum"] = false;
            //   }else{
            //     procesedDatas["charge_use_only"] = false;
            //     procesedDatas["charge_minimum"] = true;
            //   }
            // }
            else{
              procesedDatas[Data] = this.details[i][Data];
            }
          }
    // Bike
          if (i == "Bike"){
            this.expressContractBikeFSRAddNewData.quotation.costing_details.bike["settings"] = procesedDatas;
          }
    // FSR
          if (i == "FSR"){
            this.expressContractBikeFSRAddNewData.quotation.costing_details.fsr["settings"] = procesedDatas;
          }
    // Setting
          if (i == "Settings"){
            this.expressContractBikeFSRAddNewData.quotation["settings"] = procesedDatas;
          }
    // Remarks
          if (i == "remarks"){
            this.expressContractBikeFSRAddNewData["remarks"] = this.details.remarks;
          }
    // Attachment
          if(i == "attachment_details"){
          this.details.attachment_details =
            this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsFiles;

          this.expressContractBikeFSRAddNewData["attachments"] = {};
          this.expressContractBikeFSRAddNewData["attachments"]["uploaded_in"] = "Quotation";
          this.expressContractBikeFSRAddNewData["attachments"]["attachment_details"] = this.details.attachment_details;
          }
        }

       console.log("final data", this.expressContractBikeFSRAddNewData );
        if (this.quotationData?.id) {
        this.apiPatchCallHandler();
      } else {
        this.apiCallHandler();
      }
      }
    },

    apiCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotation",
        data: this.expressContractBikeFSRAddNewData,
        method: "POST",
        loadData: "loadCostCenterData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
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
    apiPatchCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path:
          "/sales/quotation/" + this.quotationData.id,

        data: this.expressContractBikeFSRAddNewData,

        method: "PATCH",
        loadData: "loadSalesTabData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
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
    async sendQuotation (){
      let mailData = {
      send_to: []
      };
      if(this.isQuotationBtnLoading == true){
      
      this.$store.state.salesSales.sendQuotationData.contacts.map((list) => {
        // if(list.selected == true){
          mailData.send_to.push(list.id);
          // send_to: [1, 2, 3]
        // }
      });
      
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path:
          "/sales/quotations/send/" + this.$store.state.salesSales.sendQuotationData.id,

        data: mailData,

        method: "POST",
        loadData: "loadSalesTabData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Quotation is Sent Successfully !`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Quotation is already Sent !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in sending Quotation, try again!",

            toastSeverity: "error",
          },
        },
      });
    }
  },
    
    getTableData(){
      
        for(let d in this.expressContractBikeFSRContactData.contacts){
            this.contactTableData[d]={};
            // console.log(d, "tabledata", this.expressContractBikeFSRContactData.contacts)
            // this.contactTableData[d] = this.expressContractBikeFSRContactData.contacts[d];
          this.contactTableData[d].selected = true;
          this.contactTableData[d].contact_name = this.expressContractBikeFSRContactData.contacts[d].contact_name;
          this.contactTableData[d].contact_no = this.expressContractBikeFSRContactData.contacts[d].contact_no;
          this.contactTableData[d].email = this.expressContractBikeFSRContactData.contacts[d].email;
          this.contactTableData[d].mobile_no = this.expressContractBikeFSRContactData.contacts[d].mobile_no;
          this.contactTableData[d].mobile_no = this.expressContractBikeFSRContactData.contacts[d].mobile_no;
          
        }
    },
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;

    },
    "$store.state.salesSales.sendQuotationData.id": function (){
      this.sendQuotation();
    },
    chargeUsed() {
      if (this.chargeUsed === "charge_use_only") {
        this.details.Bike.charge_use_only = true;
      } else {
        this.details.Bike.charge_use_only = false;
      }

      if (this.chargeUsed === "charge_minimum") {
        this.details.Bike.charge_minimum = true;
      } else {
        this.details.Bike.charge_minimum = false;
      }
    },
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "salesExpressContractBikeFSRAttachments";
    if (Object.keys(this.bikeFSRAttachmentsStateData).length != 0) {
      this.salesExpressContractBikeFSRAttachmentsState =
        this.bikeFSRAttachmentsStateData.attachments;
      this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsFiles =
        this.bikeFSRAttachmentsStateData.attachments;

    }
    if (
      this.quotationData
    ) {
      this.quotationData?.quotation_attachments[0]?.attachments.map((list)=>{ 
      this.details.attachment_details.push({
        file_name: list.file_name,
        url: list.url,
        mime_type: list.mime_type,
        size: list.size
      });
    });


      for(let i in this.details.Settings){
        this.details.Settings[i] = this.quotationData.settings[i];
        if (i == "contract_start_date" || i == "contract_end_date"){
          this.details.Settings[i] = this.dateFormater(
        this.quotationData.settings[i]);
        }
      }
      for(let i in this.details.Bike){
        this.details.Bike[i] = this.quotationData.express_contract[0].bike.settings[i];
        if (i == "estimated_start_date"){
          if(this.quotationData.express_contract[0].bike.settings[i]){
          this.details.Bike[i] = this.dateFormater(
        this.quotationData.express_contract[0].bike.settings[i]);
          } else{
            this.details.Bike[i] = null;
          }
        }
      }
        if (
        this.quotationData.express_contract[0].bike?.settings?.charge_minimum
      ) {
        this.chargeUsed = "charge_minimum";
      } else if (
        this.quotationData.express_contract[0].bike?.settings?.charge_use_only
      ) {
        this.chargeUsed = "charge_use_only";
      }
      for(let i in this.details.FSR){
        this.details.FSR[i] = this.quotationData.express_contract[0].fsr.settings[i];
        if (i == "estimated_start_date" || i == "estimated_end_date"){
          if(this.quotationData.express_contract[0].fsr.settings[i]){
          this.details.FSR[i] = this.dateFormater(
        this.quotationData.express_contract[0].fsr.settings[i]);
        } else{
            this.details.FSR[i] = null;
          }
        }
      }

      if (this.quotationData.quotation_attachments.length > 0) {
      let respectiveData = this.quotationData.quotation_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );
        if (respectiveData) {
          this.salesExpressContractBikeFSRAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsFiles =
            respectiveData["attachments"];
        }
      }

      //
      this.details.remarks = this.quotationData.remarks;
      
      this.details.uploaded_in = "Quotation";
    }
    this.getTableData();
    
  },
  unmounted() {
    this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsStateData = {};
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsFiles = [];
    this.$store.state.salesExpressContractBikeFSR.deletedBikeFSRAttachmentsFiles = [];
}
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
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px dashed #cad1dd !important;
}
</style>
