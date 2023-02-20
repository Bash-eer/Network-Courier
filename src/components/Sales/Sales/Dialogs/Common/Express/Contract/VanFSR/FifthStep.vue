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
             <SingleCheckBox
              label="Effective Start Date (Tentative)"
              v-model="details.van.estimated_start_date_selected"
              :value="details.van.estimated_start_date_selected"
            />
          </div>
          <!-- <div class="flex">
            <span class="color-343434 text-xs margin-top-12px"
              >Effective Start Date (Tentative)</span
            >
          </div> -->
        </div>
      </div>
      <div clas="flex">
        <div class="whiteDiv p-2 calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="quotationCalendar color-212121 font-bold"
            id="icon"
            v-model="details.van.estimated_start_date"
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
              v-model="details.van.first_month"
              :value="details.van.first_month"
            />
          </div>
          <!-- <div class="flex chk2Div">
            <span class="color-343434 text-xs mt-1">First Month</span>
          </div> -->
        </div>
      </div>
      <div class="flex mt-2">
        <div class="whiteDiv p-3 calendarDiv">
          <div class="flex flex-row">
            <div class="flex">
              <RadioButtons
                id="chargeUsageOnly"
                name="chargeUsageOnly"
                value="Charge Usage Only"
                 v-bind:radioButtonData="SalesDialogCategories"
                v-model="details.van.charge"
                :selectedRadioButton="selectedRadioButton"
              />
              <!-- <label class="radioText ml-2" for="chargeUsageOnly"
                >Charge Usage Only</label
              > -->
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="flex mt-2">
        <div class="whiteDiv p-3 calendarDiv">
          <div class="flex flex-row">
            <div class="flex">
              <RadioButton
                id="chargeMinium"
                name="chargeMinium"
                value="Charge Minimum"
                v-model="details.van.charge"
              />
              <label class="radioText ml-2" for="chargeUsageOnly"
                >Charge Minimum</label
              >
            </div>
          </div>
        </div>
      </div> -->
      <div class="flex">
        <div class="formParentDiv formDiv">
          <div class="formgrid grid mt-4">
            <div class="field col-12 md:col-6">
              <h5 class="required color-7a7a7a text-sm" placeholder="0.00">
                Minimum Qty
              </h5>
              <TextField
                label="min_qty"
                type="number"
                v-model="details.van.minimum_quantity"
                @blur="v$.details.van.minimum_quantity.$model;"
                :classes="{
                  'p-invalid':
                    v$.details.van.minimum_quantity.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required color-7a7a7a text-sm" placeholder="0.00">
                Amount
              </h5>
              <TextField
                label="min_amount"
                type="number"
                v-model="details.van.amount"
                @blur="v$.details.van.amount.$model;"
                :classes="{
                  'p-invalid': v$.details.van.amount.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <span class="ml-2 color-343434 text-sm">Contact Person</span> -->
    <!-- <div class="row ml-1 table_div">
      <div class="col-12">
        <div class="col-12">
          <keep-alive>
            <FormTable
              v-if="
                $store.state.salesExpressContractVanFSR.FifthStepperTableData != null
              "
              :key="$store.state.salesExpressContractVanFSR.FifthStepperTableData"
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="
                $store.state.salesExpressContractVanFSR.FifthStepperTableData
              "
              :tableColumns="
                $store.state.salesExpressContractVanFSR.FifthStepperTableDataColumns
              "
              storePath="salesExpressContractVanFSR"
            />
          </keep-alive>
          <keep-alive>
            <FormTable
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="getTableData()"
              :tableColumns="
                $store.state.salesExpressContractVanFSR
                  .FifthStepperTableDataColumns
              "
              storePath="salesQuotationDialog"
            />
          </keep-alive>
        </div>
      </div>
    </div> -->
    <br />

    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required color-7a7a7a text-sm mb-3">Remarks</h5>
        <TextAreaField
          label="remarks"
          v-model="details.van.remarks"
          @blur="v$.details.van.remarks.$model;"
          :classes="{
            'p-invalid': v$.details.van.remarks.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div> -->
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'FSR'">
    <div class="flex flex-column timeDiv pb-5 pl-2">
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
          <!-- <div class="flex">
            <label class="checksText">First Month</label>
          </div> -->
        </div>
      </div>
      <div class="flex">
        <div class="w-100">
          <div class="formgrid grid mt-4 w-100">
            <div class="field col-12 md:col-3">
              <h5 class="required dialog-label-text" placeholder="0.00">
                Detail Type
              </h5>
              <DropDown
                code="name"
                :data="detail_type"
                @blur="v$.details.FSR.detail_type.$model;"
                label="min_qty"
                :state="details.FSR.detail_type"
                  :key="details.FSR.detail_type"
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
    <br />

    <!-- <span class="ml-2 color-343434 text-sm">Contact Person</span> -->
    <!-- <div class="row ml-1 table_div">
      <div class="col-12">
        <div class="col-12">
          <FormTable
              v-if="
                $store.state.salesExpressContractVanFSR.FifthStepperTableData != null
              "
              :key="$store.state.salesExpressContractVanFSR.FifthStepperTableData"
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="
                $store.state.salesExpressContractVanFSR.FifthStepperTableData
              "
              :tableColumns="
                $store.state.salesExpressContractVanFSR.FifthStepperTableDataColumns
              "
              storePath="salesExpressContractVanFSR"
            />
          <keep-alive>
            <FormTable
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="getTableData()"
              :tableColumns="
                $store.state.salesExpressContractVanFSR
                  .FifthStepperTableDataColumns
              "
              storePath="salesQuotationDialog"
            />
          </keep-alive>
        </div>
      </div>
    </div> -->
    <br />
  </div>
  <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3"> Contract settings </span>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Contract Start Date
      </h5>
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
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Contract End Date
      </h5>
      <Calendar
        dateFormat="d MM yy"
        id="icon"
        v-model="details.Settings.contract_end_date"
        :showIcon="true"
        style="width: 100%"
        :monthNavigator="true"
        :yearNavigator="true"
        yearRange="1950:2050"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Contract Period
      </h5>
      <TextField
        label="amount"
        id="amount"
        type="number"
        v-model="details.Settings.contract_period"
        @blur="v$.details.Settings.contract_period.$model;"
        :classes="{
          'p-invalid':
            v$.details.Settings.contract_period.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
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
      <!-- <div class="flex">
        <label class="checksText">Auto Renewal</label>
      </div> -->
    </div>
  </div>

  <span class="ml-2 color-343434 text-sm">Contact Person</span>
  <div class="row ml-1 table_div">
    <div class="col-12">
      <div class="col-12">
        <!-- <EditTable
            v-if="contactTableData != null"
          :key="contactTableData"
              formTableDataName="FifthStepperFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="contactTableData"
              :tableColumns="
                $store.state.salesExpressContractVanFSR
                  .FifthStepperTableDataColumns
              "
              storePath="salesQuotationDialog"
            /> -->
        <keep-alive>
          <FormTable
            v-if="
              $store.state.salesQuotationDialog.inspectionsDropDownTableData !=
              null
            "
            :key="
              $store.state.salesQuotationDialog.inspectionsDropDownTableData
            "
            formTableDataName="inspectionsFormTableData"
            :selectionModeState="selectionModeState"
            dataKey="email"
            :tableData=" getTableData() "
            :tableColumns="
              $store.state.salesExpressContractVanFSR
                .FifthStepperTableDataColumns
            "
            storePath="salesQuotationDialog"
          />
        </keep-alive>
      </div>
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a text-sm">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          //'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <!--DRAG AND DROP UPLOAD-->
    <DragAndDropUpload
      :state="salesExpressContractVanFSRAttachmentsState"
      type="salesExpressContractVanFSRAttachments"
      storePath="salesExpressContractVanFSR"
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
          v-on:childToParent="goBack"
          class="p-button-outlined mr-1 text-sm color-357dea font-bold"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton
            storePath="salesSales"
            label="Cancel"
            class="color-357dea font-bold"
          />
          <Buttons
            label="Preview"
            class="p-button-outlined mr-2 text-sm color-357dea font-bold"
          />
          <Buttons label="Save" 
          button_class="next-button" 
          v-on:childToParent="save"
          />
          <Buttons
            label="Send Quotation Now"
            button_class="next-button ml-2"
            @click="sent"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import EditTable from "./Editable.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
//import RadioButton from "primevue/radiobutton";
import DuoSelection from "../../../DuoSelect.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

// import CustomDragDrop from "../../../../../Reusables/CustomDragandDrop.vue"
export default {
  name: "SalesExpressContractVanFSRFifthStep",
  components: { DuoSelection },
  // min_qty: [
  //   {name: "Standard Entry", code: "ut"},
  //   {name: "Sample", code: "ss"},
  // ],
  data: () => ({
    date: null,
    radios: null,
    contactTableData: [],
    selectedRadioButton: null,
    SalesDialogCategories: [{name: "Charge Usage Only", key: "M1"}, {name: "Charge Minimum", key: "M2"}],
    Sales2: [{ name: "Charge Minimum", key: "M2" }],
    defaultTransportType: "Van",
    isQuotationBtnLoading: false,

    v$: useVuelidate(),
    details: {
      van: {
        estimated_start_date_selected: false,
        estimated_start_date: "",
        first_month: "",
        charge: "",
        // charge_use_only: false,
        // charge_minimum: false,
        minimum_quantity: false,
        amount: "",
      },
      FSR: {
        estimated_start_date: "",
        estimated_end_date: "",
        first_month: false,
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      },
      Settings: {
        contract_start_date: "",
        contract_end_date: "",
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
    detail_type: [
      { name: "Standard Entry", code: "ut" },
      { name: "Sample", code: "ss" },
    ],
    salesExpressContractVanFSRAttachmentsState: " ",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        van: {
          minimum_quantity: { required },
          amount: { required },
        },
        FSR: {
          detail_type: { required },
          unit_price: { required },
          quantity: { required },
          amount: { required },
          description: { required },
        },
        Settings: {
          contract_start_date: { required },
          contract_end_date: { required },
          contract_period: { required },
        },
        remarks: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      payloadData: "salesExpressContractVanFSR/payloadData",
      expressContractVanFSRContactData:
        "salesExpressContractVanFSR/expressContractVanFSRContactData",
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
      VanFSRAttachmentsStateData:
        "salesExpressContractVanFSR/VanFSRAttachmentsStateData",
          expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
    }),
    // ...mapGetters({
    //   commonAttachmentStateData: "salesCommon/commonAttachmentStateData",
    // }),
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesExpressContractVanFSR/setCurrentStep",
      setPayloadData: "salesExpressContractVanFSR/setPayloadData",
      saveData: "salesExpressContractVanFSR/saveData",
    }),
    checkBoxChange(val, src) {
      // van
      if (val.length != 0 && val[0].tag == "Van") {
        this.details.van[val[0].name] = true;
      } else if (val.length == 0 && val[0].tag == "Van") {
        this.details.van[src[0].name] = false;
      }
      // FSR
      if (val.length != 0 && val[0].tag == "FSR") {
        this.details.FSR[val[0].name] = true;
      } else if (val.length == 0 && val[0].tag == "FSR") {
        this.details.FSR[src[0].name] = false;
      }
      // Settings
      if (val.length != 0 && val[0].tag == "Settings") {
        this.details.Settings[val[0].name] = true;
      } else if (val.length == 0 && val[0].tag == "Settings") {
        this.details.Settings[src[0].name] = false;
      }
    },
    goBack() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractVanFSRFourthStep",
      });
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
    //   checkBoxChange(val, src) {
    //   if (val.length != 0) {
    //     this.details[val[0].name] = true;
    //   }
    //   if (val.length == 0) {
    //     this.details[src[0].name] = false;
    //   }
    // },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          let procesedDatas = {};

          // procesedDatas[i] = {};
          for (let Data in this.details[i]) {
            if (
              Data == "estimated_start_date" ||
              Data == "estimated_end_date" ||
              Data == "contract_start_date" ||
              Data == "contract_end_date"
            ) {
              procesedDatas[Data] = this.dateFormater(this.details[i][Data]);
            }else if(Data == "charge"){
              if(this.details[i][Data] == "Charge Usage Only"){
                procesedDatas["charge_use_only"] = true;
                procesedDatas["charge_minimum"] = false;
              }
              else{
                procesedDatas["charge_use_only"] = false;
                procesedDatas["charge_minimum"] = true;
              }
            } 
            else {
              procesedDatas[Data] = this.details[i][Data];
            }
          }
          // Van
          if (i == "van") {
            this.expressContractVanFSRAddNewData.quotation.costing_details.van[
              "settings"
            ] = procesedDatas;
          }
          // FSR
          if (i == "FSR") {
            this.expressContractVanFSRAddNewData.quotation.costing_details.fsr[
              "settings"
            ] = procesedDatas;
          }
          // Setting
          if (i == "Settings") {
            this.expressContractVanFSRAddNewData.quotation["settings"] =
              procesedDatas;
          }
          // Remarks
          if (i == "remarks") {
            this.expressContractVanFSRAddNewData["remarks"] =
              this.details.remarks;
          }
          // Attachment
          if (i == "attachment_details") {
            this.details.attachment_details =
              this.$store.state.salesExpressContractVanFSR.vanFSRAttachmentsFiles;

            this.expressContractVanFSRAddNewData["attachments"] = {};
            this.expressContractVanFSRAddNewData["attachments"]["uploaded_in"] =
              this.details.uploaded_in;
            this.expressContractVanFSRAddNewData["attachments"][
              "attachment_details"
            ] = this.details.attachment_details;
          }
        }
        console.log(
          this.expressContractVanFSRAddNewData,
          "Data Finalpage",
          this.details.attachment_details
        );
           if (this.expressContractVanFsrOverviewData.id) {
        this.apiPatchCallHandler();
      } else {
        this.apiCallHandler();
      }
      }
    },
    apiCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotation",
        data: this.expressContractVanFSRAddNewData,
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
          "/sales/quotation/" + this.expressContractVanFsrOverviewData.id,

        data: this.expressContractVanFSRAddNewData,

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
        if(list.selected == true){
          mailData.send_to.push(list.id);
          // send_to: [1, 2, 3]
        }
      });
      }
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
    },
    getTableData() {
      // console.log(this.expressContractBikeFSRAddNewData.contacts, "get table data");
      // for (let d in this.expressContractVanFSRContactData.contacts) {
      //   this.contactTableData[d] = {};
      //   this.contactTableData[d] =
      //     this.expressContractVanFSRContactData.contacts[d];
      // }
      
      let contactTableData = [];
      console.log(this.expressContractVanFSRAddNewData.contacts)
      for (let d in this.expressContractVanFSRAddNewData.contacts) {
        contactTableData[d] = {};
        contactTableData[d].contact_name =
          this.expressContractVanFSRAddNewData.contacts[d].contact_name;
        contactTableData[d].contact_no =
          this.expressContractVanFSRAddNewData.contacts[d].contact_no;
        contactTableData[d].email =
          this.expressContractVanFSRAddNewData.contacts[d].email;
        contactTableData[d].address =
          this.expressContractVanFSRAddNewData.address;
      }
      return contactTableData;
    },
  },
  watch: {
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
    // "details.van.charge": function () {
    //   console.log("xxxxxxxxxxxxxxxxxxxxxx");
    //   if (this.details.van.charge == "Charge Usage Only") {
    //     this.details.van.charge_use_only = true;
    //     this.details.van.charge_minimum = false;
    //   } else if (this.details.van.charge == "Charge Minimum") {
    //     this.details.van.charge_use_only = false;
    //     this.details.van.charge_minimum = true;
    //   }
    // },
  },
  created() {
    this.getTableData();

    console.log(this.getTableData());
    this.$store.state.commonStore.attachmentsTag =
      "salesExpressContractVanFSRAttachments";
    if (Object.keys(this.VanFSRAttachmentsStateData).length != 0) {
      this.salesExpressContractVanFSRAttachmentsState =
        this.VanFSRAttachmentsStateData.attachments;
      this.$store.state.salesExpressContractVanFSR.vanFSRAttachmentsFiles =
        this.VanFSRAttachmentsStateData.attachments;

      // for (var state in this.details) {
      //   this.details[state] = this.VanFSRAttachmentsStateData[state];
      //    this.salutation =
      // }
    }
    if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length != 0
    ) {
      this.expressContractVanFsrOverviewData.quotation_attachments[0].attachments.map((list)=>{ 
      this.details.attachment_details.push({
        file_name: list.file_name,
        url: list.url,
        mime_type: list.mime_type,
        size: list.size
      });
    });

      console.log(this.expressContractVanFsrOverviewData, "Preload data 5");

      for(let i in this.details.Settings){
        this.details.Settings[i] = this.expressContractVanFsrOverviewData.settings[i];
        if (i == "contract_start_date" || i == "contract_end_date"){
          this.details.Settings[i] = this.dateFormater(
        this.expressContractVanFsrOverviewData.settings[i]);
        }
      }
      for(let i in this.details.van){
        this.details.van[i] = this.expressContractVanFsrOverviewData.express_contract[0].van.settings[i];
        if (i == "estimated_start_date"){
          this.details.van[i] = this.dateFormater(
        this.expressContractVanFsrOverviewData.express_contract[0].van.settings[i]);
        }
        if (this.expressContractVanFsrOverviewData.express_contract[0].van.settings.charge_use_only == true){
          this.selectedRadioButton = this.SalesDialogCategories[1];
        } else if (this.expressContractVanFsrOverviewData.express_contract[0].van.settings.charge_minimum == true) {
          this.selectedRadioButton = this.SalesDialogCategories[0];
        }
      }
      for(let i in this.details.FSR){
        this.details.FSR[i] = this.expressContractVanFsrOverviewData.express_contract[0].fsr[0].settings[i];
        if (i == "estimated_start_date" || i == "estimated_end_date"){
          this.details.FSR[i] = this.dateFormater(
        this.expressContractVanFsrOverviewData.express_contract[0].fsr[0].settings[i]);
        }
        
      }
      console.log(this.details.FSR ,"FSRRRR")

      if (this.expressContractVanFsrOverviewData.quotation_attachments.length > 0) {
      let respectiveData = this.expressContractVanFsrOverviewData.quotation_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );
        if (respectiveData) {
          this.salesExpressContractVanFSRAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesExpressContractVanFSR.vanFSRAttachmentsFiles =
            respectiveData["attachments"];
        }
      }

      // this.details.Bike = this.expressContractBikeFsrOverviewData.express_contract[0].bike.settings;
      // this.details.Bike.estimated_start_date = this.dateFormater(
      //   this.expressContractBikeFsrOverviewData.express_contract[0].bike.settings.estimated_start_date
      // );
      //FSR
      // this.details.FSR = this.expressContractBikeFsrOverviewData.express_contract[0].fsr.settings; 
      // this.details.FSR.estimated_start_date = this.dateFormater(
      //   this.expressContractBikeFsrOverviewData.express_contract[0].fsr.settings.estimated_start_date
      // );this.details.FSR.estimated_end_date = this.dateFormater(
      //   this.expressContractBikeFsrOverviewData.express_contract[0].fsr.settings.estimated_end_date
      // );


      //Settings
      // this.details.Settings = this.expressContractBikeFsrOverviewData.settings;
      // this.details.Settings.contract_start_date = this.dateFormater(
      //   this.expressContractBikeFsrOverviewData.settings.contract_start_date
      // );this.details.Settings.contract_end_date = this.dateFormater(
      //   this.expressContractBikeFsrOverviewData.settings.contract_end_date
      // );
      //
      this.details.remarks = this.expressContractVanFsrOverviewData.remarks;
      
      this.details.uploaded_in = this.expressContractVanFsrOverviewData.quotation_attachments[0].uploaded_in;
    }
  },
  unmounted() {
    this.$store.state.salesCommon.commonAttachmentStateData = {};
     this.$store.state.salesExpressContractVanFSR.vanFSRAttachmentsFiles = [];
    this.$store.state.salesExpressContractVanFSR.deletedvanFSRAttachmentsFiles = [];
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
.next-button {
  background-color: #357dea;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
</style>
