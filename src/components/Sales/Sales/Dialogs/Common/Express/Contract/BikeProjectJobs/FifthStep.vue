<template>
  <div :key="renderKey">
    <div class="p-1 mt-2 mb-2">
      <SelectButton
        v-model="defaultTransportType"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <!-- BIKE -->
    <div v-if="defaultTransportType.component == 'Bike'">
      <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex font-size-12">
              <SingleCheckBox
                label="Estimated Start Date (Tentative)"
                v-model="details.bike.estimated_start_date_selected"
                :value="details.bike.estimated_start_date_selected"
              />
            </div>
          </div>
        </div>
        <div clas="flex">
          <div class="whiteDiv p-2 calendarDiv">
            <Calendar
              dateFormat="d MM yy"
              class="quotationCalendar"
              id="icon"
              v-model="details.bike.estimated_start_date"
              :showIcon="true"
              style="width: 100%"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
              placeholder="Select a date"
            />
          </div>
        </div>
        <div class="flex mt-2">
          <div class="flex flex-row align-items-center checkDiv">
            <div class="flex">
              <SingleCheckBox
                label="First Month"
                v-model="details.bike.first_month"
                :value="details.bike.first_month"
              />
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
                  v-model="details.bike.minimum_quantity"
                  @blur="v$.details.bike.minimum_quantity.$model;"
                  :classes="{
                    'p-invalid':
                      v$.details.bike.minimum_quantity.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Amount
                </h5>
                <TextField
                  label="amount"
                  type="number"
                  v-model="details.bike.amount"
                  @blur="v$.details.bike.amount.$model;"
                  :classes="{
                    'p-invalid': v$.details.bike.amount.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROJECT -->
    <div v-if="defaultTransportType.component == 'Project'">
      <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-4">
        <div class="flex align-items-center calendarDiv">
          <div>
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex">
                  <span class="chk font-size-12"
                    >Estimated Start Date (Tentative)</span
                  >
                </div>
              </div>
            </div>
            <div clas="flex">
              <div class="whiteDiv full-width p-2">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.project.effective_start_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                  placeholder="Select a date"
                />
              </div>
            </div>
          </div>
          <div class="ml-3">
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex">
                  <span class="chk font-size-12"
                    >Estimated End Date (Tentative)</span
                  >
                </div>
              </div>
            </div>
            <div clas="flex">
              <div class="whiteDiv full-width p-2">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.project.effective_end_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                  placeholder="Select a date"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-2">
          <div class="flex flex-row align-items-center checkDiv">
            <div class="flex">
              <SingleCheckBox
                label="First Month"
                v-model="details.project.first_month"
                :value="details.project.first_month"
              />
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
                  v-model="chargeUsedProject"
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
                  v-model="chargeUsedProject"
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
                  v-model="details.project.minimum_quantity"
                  @blur="v$.details.project.minimum_quantity.$model;"
                  :classes="{
                    'p-invalid':
                      v$.details.project.minimum_quantity.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="required dialog-label-text" placeholder="0.00">
                  Amount
                </h5>
                <TextField
                  label="amount"
                  type="number"
                  v-model="details.project.amount"
                  @blur="v$.details.project.amount.$model;"
                  :classes="{
                    'p-invalid':
                      v$.details.project.amount.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 mt-2">
        <div
          class="field col-12 md:col-12 mt-4"
          style="background: #e6e6e6; border-radius: 5px"
        >
          <span class="ml-1"> Contract settings </span>
        </div>
        <div class="inputs flex align-items-cetner">
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Contract Start Date
              <span class="ml-1 required-field">*</span>
            </div>
            <Calendar
              dateFormat="d MM yy"
              class="quotationCalendar"
              id="icon"
              v-model="contract_settings.contract_start_date"
              :showIcon="true"
              style="width: 100%"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
              placeholder="Select a date"
              :class="{
                'p-invalid':
                  v$.contract_settings.contract_start_date.$invalid &&
                  submitted,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Contract End Date
              <span class="ml-1 required-field">*</span>
            </div>
            <Calendar
              dateFormat="d MM yy"
              class="quotationCalendar"
              id="icon"
              v-model="contract_settings.contract_end_date"
              :showIcon="true"
              style="width: 100%"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
              placeholder="Select a date"
              :class="{
                'p-invalid':
                  v$.contract_settings.contract_end_date.$invalid && submitted,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Contract Period
              <span class="ml-1 required-field">*</span>
            </div>
            <TextField
              label="unit_rate"
              mode="decimal"
              v-on:childToParent="getUserInput"
              v-model="contract_settings.contract_period"
              :classes="{
                'p-invalid':
                  v$.contract_settings.contract_period.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <!-- <span class="ml-2 font-size-12">Contact Person</span>
      <div class="row ml-1 table_div">
        <div class="col-12">
          <FormTable
            :tableData="
              $store.state.sales &&
              $store.state.sales.expressQuotationContactsTableData &&
              $store.state.sales.expressQuotationContactsTableData
                ? $store.state.sales.expressQuotationContactsTableData
                : []
            "
          />
        </div>
      </div> -->

      <div class="field col-12 md my-4">
        <span class="color-343434 font-size-12 bold-700">Contact Person</span>
        <div class="row table_div mt-2">
          <div class="col-12">
            <DataTable
              formTableDataName="inspectionsFormTableData"
              dataKey="id"
              :tableData="payloadData?.contacts"
              :tableColumns="tableColumns"
              tableName="contactTable"
              :contactPrefill="quotationData?.contacts"
            />
          </div>
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="label-text font-size-14">Remarks</h5>
          <TextAreaField
            label="remarks"
            v-model="remarks"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>

    <!--DRAG AND DROP UPLOAD-->
    <div>
      <DragAndDropUpload
        :state="expressContractBikeProjectJobsQuotationAttachmentsState"
        type="expressContractBikeProjectJobsQuotation"
        storePath="salesExpressContractBikeProjectJobs"
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
            class="p-button-outlined mr-1 dialog-button-text"
          />
          <div
            class="
              flex
              align-items-center align-self-center
              justify-content-end
            "
          >
            <div v-if="validationErr && submitted" class="err mr-5">
              Required fields are missing
            </div>
            <CancelButton storePath="salesSales" label="Cancel" />
            <!-- <Buttons
              label="Preview"
              class="p-button-outlined mr-2 dialog-button-text"
            /> -->
            <Buttons
              label="Save"
              button_class="dialog-button-text"
              v-on:childToParent="submitData"
              :loading="isloading"
            />
            <Buttons
              label="Send Quotation Now"
              button_class="dialog-button-text ml-2"
              @click="sendQuotation"
              :loading="isQuotationBtnLoading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import { mapActions, mapGetters } from "vuex";
import SelectButton from "primevue/selectbutton";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
import DataTable from "./components/DataTable.vue";

export default {
  name: "SalesExpressContractBikeProjectJobsFifthStep",
  components: { RadioButton, SelectButton, DataTable },

  data: () => ({
    tableColumns: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile" },
    ],
    date: null,
    radios: null,
    tabs: [
      { tab: "Bike", component: "Bike" },
      { tab: "Project", component: "Project" },
    ],
    defaultTransportType: { tab: "Bike", component: "Bike" },
    SalesDialogCategories: [{ name: "Charge Usage Only", key: "M1" }],
    Sales2: [{ name: "Charge Minimum", key: "M2" }],
    detail_type: [
      { name: "Standard Entry", code: "ut" },
      { name: "Sample", code: "ss" },
    ],
    v$: useVuelidate(),
    isloading: false,
    // maintenanceAttachmentsState: " ",
    renderKey: 10,
    maintenanceAttachmentsState: " ",
    remarks: "",
    chargeUsed: "",
    chargeUsedProject: "",
    contract_settings: {
      contract_start_date: null,
      contract_end_date: null,
      contract_period: "",
      auto_renewal: false,
    },
    details: {
      bike: {
        estimated_start_date_selected: false,
        estimated_start_date: null,
        first_month: "",
        charge_use_only: "",
        charge_minimum: "",
        minimum_quantity: "",
        amount: "",
      },
      project: {
        effective_start_date: null,
        effective_end_date: null,
        first_month: "",
        charge_use_only: "",
        charge_minimum: "",
        minimum_quantity: "",
        amount: "",
      },
    },
    submitted: false,
    validationErr: true,
    expressContractBikeProjectJobsQuotationAttachmentsState: " ",
    isQuotationBtnLoading: false,
  }),
  validations() {
    return {
      details: {
        bike: {
          minimum_quantity: { required },
          amount: { required },
        },
        project: {
          minimum_quantity: { required },
          amount: { required },
        },
      },
      contract_settings: {
        contract_start_date: { required },
        contract_end_date: { required },
        contract_period: { required },
      },
    };
  },
  watch: {
    "$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsQuotationFiles":
      function () {
        this.setPayloadData({
          key: "attachments",
          value: {
            uploaded_in: "Quotation",
            attachment_details:
              this.$store.state.salesExpressContractBikeProjectJobs
                .expressContractBikeProjectJobsQuotationFiles,
          },
        });
      },
    "$store.state.dialog.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.dialog.addRegionDeliveryTransportType;
    },
    remarks() {
      this.setPayloadData({ value: { remarks: this.remarks } });
    },
    contract_settings: {
      handler() {
        this.setPayloadData({
          key: "quotation",
          value: { settings: this.contract_settings },
        });
      },
      deep: true,
    },
    "details.bike": {
      handler() {
        this.setPayloadData({
          key: "quotation",
          value: {
            costing_details: {
              ...this.payloadData?.quotation?.costing_details,
              bike: {
                ...this.payloadData?.quotation?.costing_details?.bike,
                settings: this.details.bike,
              },
            },
          },
        });
      },
      deep: true,
    },
    "details.project": {
      handler() {
        this.setPayloadData({
          key: "quotation",
          value: {
            costing_details: {
              ...this.payloadData?.quotation?.costing_details,
              project_job: {
                ...this.payloadData?.quotation?.costing_details?.project_job,
                settings: this.details.project,
              },
            },
          },
        });
      },
      deep: true,
    },
    chargeUsed() {
      if (this.chargeUsed === "charge_use_only") {
        this.details.bike.charge_use_only = true;
      } else {
        this.details.bike.charge_use_only = false;
      }

      if (this.chargeUsed === "charge_minimum") {
        this.details.bike.charge_minimum = true;
      } else {
        this.details.bike.charge_minimum = false;
      }
    },
    chargeUsedProject() {
      if (this.chargeUsed === "charge_use_only") {
        this.details.project.charge_use_only = true;
      } else {
        this.details.project.charge_use_only = false;
      }

      if (this.chargeUsed === "charge_minimum") {
        this.details.project.charge_minimum = true;
      } else {
        this.details.project.charge_minimum = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      payloadData: "salesExpressContractBikeProjectJobs/payloadData",
      quotationData: "salesExpressContractBikeProjectJobs/quotationData",
      selectedTab: "salesSales/selectedTab",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesExpressContractBikeProjectJobs/setCurrentStep",
      setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      saveData: "salesExpressContractBikeProjectJobs/saveData",
      editData: "salesExpressContractBikeProjectJobs/editData",
      resetDialogData: "salesExpressContractBikeProjectJobs/resetDialogData",
      setQuotationData:
        "salesExpressContractBikeProjectJobs/setQuotationOverviewData",
      sendQuotationData: "salesRapidoContract/Contract/sendQuotation",
    }),
    goBack() {
      this.setCurrentStep(4);
    },
    async sendQuotation() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
        return;
      }
      this.validationErr = false;

      try {
        this.isQuotationBtnLoading = true;
        let quotationId = null;
        if (this.quotationData) {
          if (this.$route.name == "QuotationContract") {
            quotationId = await this.editData({
              type: this.selectedTab,
              id: this.quotationData.id,
              payload: this.payloadData,
            });
          } else {
            quotationId = await this.editData({
              type: this.$route.params?.type,
              id: this.quotationData.id,
              payload: this.payloadData,
            });
          }
        } else {
          quotationId = await this.saveData(this.payloadData);
        }
        if (quotationId) {
          let arr = [];

          quotationId?.data.results?.contacts.map((list) => {
            if (list.selected) {
              arr.push(list.id);
            }
          });
          await this.sendQuotationData({
            id: quotationId?.data.results?.id,
            payload: {
              send_to: arr,
            },
          });
          this.isQuotationBtnLoading = false;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Quotation sent successfully",
            life: 3000,
          });
        }
        this.$store.dispatch("salesSales/closeDialog");
        this.$store.dispatch("salesSales/loadQuotationTabTableData", {
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
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
        return;
      }

      this.validationErr = false;

      if (this.quotationData) {
        try {
          let res;
          this.isloading = true;
          if (this.$route.name == "QuotationContract") {
            res = await this.editData({
              type: this.selectedTab,
              id: this.quotationData.id,
              payload: this.payloadData,
            });
          } else {
            res = await this.editData({
              type: this.$route.params?.type,
              id: this.quotationData.id,
              payload: this.payloadData,
            });
          }
          this.isloading = false;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Quotation edited successfully",
            life: 3000,
          });
          if (this.$route.params.type) {
            await this.$router.push({
              name: "ExpressContractBikeProjectJobsOverview",
              params: {
                id: res.data?.results?.id,
                type: this.$route.params.type,
                p_id: this.$route.params.p_id,
              },
            });
          }
          this.resetDialogData();
          this.setQuotationData({
            type: this.$route.params?.type,
            id: this.$route.params.id,
          });
          this.$store.dispatch("salesSales/loadQuotationTabTableData", {
            id: this.$route.params.id,
          });
          this.$store.dispatch("salesSales/loadContractTabTableData", {
            id: this.$route.params.id,
          });
          this.$store.dispatch("salesSales/closeDialog");

          // this.$store.dispatch(
          //   "salesRapidoContract/loadRapidoContractOverviewData",
          //   {
          //     id: this.$route.params.id,
          //     type: this.$route.params.type,
          //   }
          // );
        } catch (err) {
          this.isloading = false;
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
      } else {
        try {
          this.isloading = true;
          await this.saveData(this.payloadData);
          this.isloading = false;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Quotation created successfully",
            life: 3000,
          });
          this.resetDialogData();
          this.$store.dispatch("salesSales/closeDialog");
          this.$store.dispatch("salesSales/loadQuotationTabTableData", {
            id: this.$route.params.id,
          });
          this.$store.dispatch("salesSales/loadContractTabTableData", {
            id: this.$route.params.id,
          });
        } catch (err) {
          this.isloading = false;
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return null;
      } else {
        var formattedDate = moment(data).format("DD MMM YYYY");
        return formattedDate;
      }
    },
    prefillData() {
      this.details.bike.estimated_start_date_selected =
        this.quotationData.express_contract[0].bike?.settings?.estimated_start_date_selected;
      this.details.bike.estimated_start_date = this.dateFormater(
        this.quotationData.express_contract[0].bike?.settings
          ?.estimated_start_date
      );
      this.details.bike.first_month =
        this.quotationData.express_contract[0].bike?.settings?.first_month;
      this.details.bike.charge_use_only =
        this.quotationData.express_contract[0].bike?.settings?.charge_use_only;
      this.details.bike.charge_minimum =
        this.quotationData.express_contract[0].bike?.settings?.charge_minimum;
      this.details.bike.minimum_quantity =
        this.quotationData.express_contract[0].bike?.settings?.minimum_quantity;
      this.details.bike.amount =
        this.quotationData.express_contract[0].bike?.settings?.amount;

      if (
        this.quotationData.express_contract[0].bike?.settings?.charge_minimum
      ) {
        this.chargeUsed = "charge_minimum";
      } else if (
        this.quotationData.express_contract[0].bike?.settings?.charge_use_only
      ) {
        this.chargeUsed = "charge_use_only";
      }

      this.details.project.estimated_start_date_selected =
        this.quotationData.express_contract[0].project_job?.settings?.estimated_start_date_selected;
      this.details.project.effective_start_date = this.dateFormater(
        this.quotationData.express_contract[0].project_job?.settings
          ?.effective_start_date
      );
      this.details.project.effective_end_date = this.dateFormater(
        this.quotationData.express_contract[0].project_job?.settings
          ?.effective_end_date
      );
      this.details.project.first_month =
        this.quotationData.express_contract[0].project_job?.settings?.first_month;
      this.details.project.charge_use_only =
        this.quotationData.express_contract[0].project_job?.settings?.charge_use_only;
      this.details.project.charge_minimum =
        this.quotationData.express_contract[0].project_job?.settings?.charge_minimum;
      this.details.project.minimum_quantity =
        this.quotationData.express_contract[0].project_job?.settings?.minimum_quantity;
      this.details.project.amount =
        this.quotationData.express_contract[0].project_job?.settings?.amount;

      if (
        this.quotationData.express_contract[0].project_job?.settings
          ?.charge_minimum
      ) {
        this.chargeUsedProject = "charge_minimum";
      } else if (
        this.quotationData.express_contract[0].project_job?.settings
          ?.charge_use_only
      ) {
        this.chargeUsedProject = "charge_use_only";
      }

      this.contract_settings.contract_start_date = this.dateFormater(
        this.quotationData.settings?.contract_start_date
      );
      this.contract_settings.contract_end_date = this.dateFormater(
        this.quotationData.settings?.contract_end_date
      );
      this.contract_settings.contract_period =
        this.quotationData.settings?.contract_period;
      this.contract_settings.auto_renewal =
        this.quotationData.settings?.auto_renewal;

      this.remarks = this.quotationData.remarks;
      this.renderKey++;
      if (this.quotationData.quotation_attachments?.length > 0) {
        let respectiveData = this.quotationData.quotation_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );
        if (respectiveData) {
          this.expressContractBikeProjectJobsQuotationAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsQuotationFiles =
            respectiveData["attachments"];
        }
      }
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
  created() {
    //attachment
    this.$store.state.commonStore.attachmentsTag =
      "expressContractBikeProjectJobsQuotation";
    this.setPayloadData({
      value: {
        profile_id: this.$route.params?.p_id
          ? this.$route.params?.p_id
          : this.$route.params?.id,
      },
    });
    this.setPayloadData({
      key: "quotation",
      value: { service: "Bike + Project Jobs" },
    });
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsQuotationFiles =
      [];
    this.$store.state.salesExpressContractBikeProjectJobs.deletedexpressContractBikeProjectJobsQuotationFiles =
      [];
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

.chk2Div {
  padding-top: 8%;
}
span .chk2 {
  margin-top: 0.5rem !important;
}
.chk {
  margin-top: 7%;
}

.err {
  color: red;
}
</style>
