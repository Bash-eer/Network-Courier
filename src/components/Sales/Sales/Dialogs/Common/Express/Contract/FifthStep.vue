<script>
import RadioButton from "primevue/radiobutton";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "vuex";
import Checkbox from "primevue/checkbox";
import DataTables from "./Components/DataTables.vue";
// import DataTable from "primevue/datatable";
// import Column from "primevue/column";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
import {
  expressContract,
  expressContractState,
  quotation,
  salesCommon,
} from "../../../../../../../store/helper";
export default {
  name: "SalesExpressContractVanFifthStep",
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    v$: useVuelidate(),
    renderKey: 1,
    upload_files: [],
    showContract: false,
    isloading: false,
    isloading1: false,
    isQuotationBtnLoading: false,
    validationErr: false,
    con_tacts: [],
    selected_contacts: [],
    billing_cycle: [
      { name: "Monthly", code: "Monthly" },
      { name: "FortNightly", code: "FortNightly" },
      { name: "Weekly", code: "Weekly" },
    ],
    trip_table: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "designation", header: "Address" },
    ],
    details: {
      remarks: "",
      project_job: false,
      estimated_start_date: null,
      estimated_end_date: null,
      effective_start_date: null,
    },
    ptc_data: {
        contract_start_date: "",
        contract_end_date: "",
        contract_period: "",
        contract_date: "",
        signatory_name: "",
        signatory_designation: "",
        auto_renewal: false,
      },
    bill_setting: {
      credit_limit: "",
      credit_terms: "",
      billing_cycle: "",
      weekend_2nd_trip_charge: false,
      saturday_2nd_trip_charge: false,
      return_trip_charge: false,
      return_trip_partial_charge: false,
      collection_trip_charge: false,
      special_urgent_charges_selected: false,
      special_urgent_charges: 0,
      ftz_selected: false,
      ftz: 0,
      special_monitoring: false,
      call_centre: false,
      surcharges: [],
    },
    submitted: false,
    pct_contract:{},
    detail_validation:{
      remarks: { required },
    },
  }),
  validations() {
      return {
        details: this.detail_validation,
        ptc_data:this.pct_contract,
        bill_setting: {
          credit_limit: { required },
          credit_terms: { required },
          billing_cycle: { required },
        },
      };
  },
  components: {
    // RadioButton,
    Checkbox,
    DataTables,
    Accordion,
    AccordionTab,
    // DataTable,
    // Column,
  },
  computed: {
    ...expressContractState,
    ...mapState({
      finalData: (state) => state.salesExpressContractVan.payloadPost,
    }),
  },
  async mounted() {
    this.surcharges();
  },
  created() {
    this.con_tacts = this.expressContractData.contacts;
    if(!this.updateType.includes('quotation')){
      this.pct_contract={
        contract_start_date: { required },
        contract_end_date: { required },
        contract_period: { required },
        contract_date: { required },
        signatory_name: { required },
        signatory_designation: { required }
      }
    }
    if (this.overViewData) {
      this.prefillData();
       if (this.overViewData?.status == "In Contract") {
        this.detail_validation={
          ...this.detail_validation,
      effective_start_date: { required },
    }
       }
    } else {
      this.details.estimated_start_date = moment().format("D MMM YYYY");
    }
  },
  methods: {
    ...expressContract,
    ...quotation,
    ...salesCommon,
    goBackHandler() {
      this.navigateStepper({
        step: this.expressContractStep[this.expressStep - 1].component,
      });
      this.$store.state.salesExpressContract.flowStep--;
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
    async surcharges() {
      const res = await this.getSurcharges(
        this.expressContractData?.quotation?.rate_card_id
      );
      res.data.results.map((i) => {
        i["selected"] = false;
        if (this.overViewData) {
          this.overViewData?.express_contract[0].bill_settings.surcharges?.map(
            (e) => {
              if (e.surcharge_id === i.surcharge_id && e.selected) {
                i["selected"] = true;
                i["rates"] = e.rates;
              }
            }
          );
        } else {
          i["selected"] = false;
        }
        this.bill_setting.surcharges.push(i);
      });
    },
    getUserInput(key, data) {
      this.setExpressContractData({ key: "quotation", key1: key, value: data });
    },
    getUserInput_1(data) {
      this.setExpressContractData({ value: data });
    },
    submitData(type) {
      let { remarks } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let con_tact = [];
        this.expressContractData.contacts.map((i) => {
          if (
            this.selected_contacts &&
            this.selected_contacts?.some((u) => u.email === i.email)
          ) {
            i["selected"] = true;
            con_tact.push(i);
          } else {
            i["selected"] = false;
            con_tact.push(i);
          }
        });
        this.bill_setting.surcharges.map((i) => {
          i.rates = parseFloat(i.rates);
          return i;
        });
        let files = {
          remarks: remarks,
          contacts: con_tact,
          attachments: {
            uploaded_in: "Quotation",
            attachment_details: this.upload_files,
          },
        };
        let set_ting={
          ...this.details,
        }
        if(!this.updateType.includes('quotation')){
          set_ting={
            ...set_ting,
            ...this.ptc_data,
          }
        }
        this.getUserInput("settings", set_ting);
        this.getUserInput("bill_settings", this.bill_setting);
        this.getUserInput_1(files);

        if (type == "save" || type == "preview") {
          this.save(type, this.post);
        } else {
          this.sendAndSaveQuotation(this.post);
        }
      }
    },
    async save(type, data) {
      if (type == "preview") {
        this.isloading1 = true;
      } else {
        this.isloading = true;
      }

      if (this.overViewData) {
        this.quotationId = await this.editQuotation({
          id: this.overViewData.id,
          payload: this.expressContractData,
          type: this.updateType ?? "quotation",
          toast: this.$toast,
        });
      } else {
        this.quotationId = await this.saveQuotation({
          payload: this.expressContractData,
          toast: this.$toast,
        });
      }

      if (type == "preview") {
        this.isloading1 = false;
      } else {
        this.isloading = false;
      }

      if (this.quotationId) {
        this.$store.dispatch("salesSales/closeDialog");
      }
      if (this.updateType.includes("quotation")) {
        this.quotationData({ id: this.$route.params.id });
      } else {
        this.contractData({ id: this.$route.params.id });
      }
      if (type == "preview") {
        this.$router.push({
          name: "ExpressContract",
          params: {
            id: this.quotationId?.data.results?.id,
            type: "quotation",
            p_id: this.$route.params.id,
            mode: "overview",
          },
        });
      }
      let path =this.$router.currentRoute.value.path??""
      if(path.includes("express/contract")&&path.includes("overview")){
        this.$router.replace({
          name: "ExpressContract",
          params: {
            id: this.quotationId?.data.results?.id,
            type: this.updateType,
            p_id: this.$route.params.id,
            mode: "overview",
          },
        });
        
      }
    },
    async sendAndSaveQuotation() {
      this.isQuotationBtnLoading = true;
      if (this.overViewData) {
        this.quotationId = await this.editQuotation({
          id: this.overViewData.id,
          payload: this.expressContractData,
          type: this.updateType ?? "quotation",
          toast: this.$toast,
        });
      } else {
        this.quotationId = await this.saveQuotation({
          payload: this.expressContractData,
          toast: this.$toast,
        });
      }
      if (this.quotationId) {
        let ids = [];
        this.quotationId?.data.results?.contacts.map((i) => {
          if (i?.selected) {
            ids.push(i.id);
          }
        });
        await this.sendQuotation({
          id: this.quotationId?.data.results?.id,
          payload: {
            send_to: ids,
          },
        });
      }

      this.isQuotationBtnLoading = false;
      if (this.quotationId) {
        this.$store.dispatch("salesSales/closeDialog");
        this.quotationData({ id: this.$route.params.id });
      }
    },
    prefillData() {
      if (
        this.updateType.includes("quotation") &&
        this.overViewData?.quotation_attachments?.length != 0
      ) {
        this.overViewData?.quotation_attachments[0].attachments.map((i) => {
          this.upload_files.push({
            file_name: i.file_name,
            url: i.url,
            mime_type: i.mime_type,
            size: i.size,
          });
        });
      }
      let overViewDetails = this.overViewData?.settings;
      this.details.remarks = this.overViewData?.remarks;
      let detail = this.overViewData?.express_contract[0].bill_settings ?? {};
      this.details.project_job = overViewDetails.project_job;
      this.details.estimated_start_date = moment(
        overViewDetails.estimated_start_date
      ).format("D MMM YYYY");
      this.details.effective_start_date =
        this.overViewData?.status == "In Contract"
          ? moment(overViewDetails?.effective_start_date).format(
              "D MMM YYYY"
            ) || null
          : null;
      this.details.estimated_end_date = overViewDetails.estimated_end_date
        ? moment(overViewDetails.estimated_end_date).format("D MMM YYYY")
        : null;
      // this.selected_contacts=this.expressContractData.contacts
      this.expressContractData.contacts.map((i) => {
        if (
          this.overViewData?.contacts &&
          this.overViewData.contacts.some(
            (u) => u.email === i.email && u.selected
          )
        ) {
          this.selected_contacts.push(i);
        }
      });
      let sur_charges = [];
      detail.surcharges.map((i) => {
        sur_charges.push({
          surcharge_name: i.surcharge_name,
          rates: i.rates,
          selected: i.selected,
          surcharge_id: i.surcharge_id,
        });
      });
      (this.bill_setting = {
        credit_limit: detail.credit_limit,
        credit_terms: detail.credit_terms,
        billing_cycle: detail.billing_cycle,
        weekend_2nd_trip_charge: detail.weekend_2nd_trip_charge,
        saturday_2nd_trip_charge: detail.saturday_2nd_trip_charge,
        return_trip_charge: detail.return_trip_charge,
        return_trip_partial_charge: detail.return_trip_partial_charge,
        collection_trip_charge: detail.collection_trip_charge,
        special_urgent_charges_selected: detail.special_urgent_charges_selected,
        special_urgent_charges: detail.special_urgent_charges,
        ftz_selected: detail.ftz_selected,
        ftz: detail.ftz,
        special_monitoring: detail.special_monitoring,
        call_centre: detail.call_centre,
        surcharges: [],
      }),
     
     this.ptc_data.contract_start_date=overViewDetails.contract_start_date?moment(overViewDetails.contract_start_date).format("D MMM YYYY"):""
        this.ptc_data.contract_end_date=overViewDetails.contract_end_date? moment(overViewDetails.contract_end_date).format("D MMM YYYY"):""
        this.ptc_data.contract_period= overViewDetails.contract_period
        this.ptc_data.contract_date= overViewDetails.contract_date?moment(overViewDetails.contract_date).format("D MMM YYYY"):""
        this.ptc_data.signatory_name= overViewDetails.signatory_name
        this.ptc_data.signatory_designation= overViewDetails.signatory_designation
        this.ptc_data.auto_renewal= overViewDetails.auto_renewal

        this.renderKey++;
    },
  },
};
</script>
<template>
  <div class="flex flex-column timeDiv pb-2 pl-2 pr-2 pt-2 ml-2 mr-4 mt-4">
    <div  v-if="updateType.includes('quotation')" class="row mx-3">
      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Estimate Start Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
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
      <div class="field col-12 md:col-4 mt-3">
        <!-- <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk flex-row">
          Estimate End Date <div class="flex mb-2 pt-0">
         
          <Checkbox v-model="details.renew" :binary="true" />
        </div>
        </h5> -->
        <div class="flex flex-row align-items-center pt-1 ml-2 pb-2">
          <div class="flex">
            <span class="bold-600 font-size-12 color-4e5868"
              >Estimate End Date</span
            >
          </div>
          <div class="flex flex-row align-items-center pl-3">
            <Checkbox v-model="details.project_job" :binary="true" />
            <span class="bold-600 font-size-12 color-4e5868 ml-2"
              >Project Job</span
            >
          </div>
        </div>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            :disabled="!details.project_job"
            v-model="details.estimated_end_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
      <div
        v-if="overViewData?.status == 'In Contract'"
        class="field col-12 md:col-4"
      >
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk required">
          Effective Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            v-model="details.effective_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :classes="{
              'p-invalid':
                v$.details.effective_start_date.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div v-if="validationErr && submitted" class="color-red ml-2">
          Please Select a date
        </div>
      </div>
    </div>

    <!-- Contrct -->
    <div v-if="!this.updateType.includes('quotation')" :key="renderKey">
    <p class="color-7a7a7a font-size-14 bold-500">Contract Settings</p>

    <div class="flex ml-3">
      <Checkbox v-model="ptc_data.auto_renewal" :binary="true" />
      <p class=" color-7a7a7a font-size-14 bold-500 urgent_charges my-auto ml-2">Auto Renewal</p>
    </div>

    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract Start Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            id="icon"
            v-model="ptc_data.contract_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.ptc_data.contract_start_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract End Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            :class="{
              'p-invalid': v$.ptc_data.contract_end_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
            id="icon"
            v-model="ptc_data.contract_end_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4 mt-3">
        <h5 class="dialog-label-text">Contract Period</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="ptc_data.contract_period"
          :classes="{
            'p-invalid': v$.ptc_data.contract_period.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            :class="{
              'p-invalid': v$.ptc_data.contract_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
            id="icon"
            v-model="ptc_data.contract_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4  mt-3">
        <h5 class="dialog-label-text">Signatory Name</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="ptc_data.signatory_name"
          :classes="{
            'p-invalid': v$.ptc_data.signatory_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4  mt-3">
        <h5 class="dialog-label-text">Signatory Designation</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="ptc_data.signatory_designation"
          :classes="{
            'p-invalid': v$.ptc_data.signatory_designation.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

  </div>
  </div>
  <Accordion :activeIndex="0" class="mt-3 ml-3">
    <AccordionTab header="Billing Settings">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Credit Limit $
          </h5>
          <TextField
            label="credit_limits"
            type="number"
            v-model="bill_setting.credit_limit"
            :classes="{
              'p-invalid': v$.bill_setting.credit_limit.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Credit Terms (Days)
          </h5>
          <TextField
            label="credit_terms"
            type="number"
            v-model="bill_setting.credit_terms"
            :classes="{
              'p-invalid': v$.bill_setting.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Billing Cycle
          </h5>
          <DropDownField
            :key="renderKey"
            code="name"
            :data="billing_cycle"
            :value="bill_setting.billing_cycle"
            @blur="v$.bill_setting.billing_cycle.$model;"
            label="billing_cycle"
            v-model="bill_setting.billing_cycle"
            :class="{
              'p-invalid': v$.bill_setting.billing_cycle.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <p v-if="bill_setting.surcharges.length !== 0" class="ml-2 mt-3 head">
        Surcharge Charges
      </p>
      <div v-if="bill_setting.surcharges.length !== 0" class="row pl-1 ml-1">
        <div
          class="col-3 mr-2"
          v-for="(item, index) of bill_setting.surcharges"
          :key="index"
        >
          <div class="flex flex-row align-items-center">
            <div class="flex">
              <Checkbox v-model="item.selected" :binary="true" />
            </div>
            <div class="flex check-text align-items-center">
              <label
                class="color-7a7a7a font-size-14 bold-500 urgent_charges ml-2"
                >{{ item?.surcharge_name ?? "" }}</label
              >
              <TextField
                :disabled="item.selected ? false : true"
                label="credit_terms"
                type="number"
                v-model="item.rates"
                :classes="{
                  // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2 ml-3': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <p class="ml-2 mt-3 head">Trip Charges</p>
      <div class="row pl-1 ml-1">
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.weekend_2nd_trip_charge"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Weekday 2nd Trip Charge</label
              >
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.saturday_2nd_trip_charge"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Saturday 2nd Trip Charge</label
              >
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.return_trip_charge"
                :binary="true"
              />
              <div class="flex check-text ml-2">
                <label class="color-7a7a7a font-size-14 bold-500"
                  >Return Trip Charge</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.return_trip_partial_charge"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Return Trip Partial Charge</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row pl-1 ml-1 mt-2">
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.collection_trip_charge"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Collection Trip Charge</label
              >
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.special_monitoring"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Special Monitoring</label
              >
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-row">
            <div class="flex">
              <Checkbox v-model="bill_setting.call_centre" :binary="true" />
            </div>
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Cost Center</label
              >
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="flex flex-row align-items-center">
            <div class="flex">
              <Checkbox
                v-model="bill_setting.special_urgent_charges_selected"
                :binary="true"
              />
            </div>
            <div class="flex check-text ml-2">
              <label
                class="
                  color-7a7a7a
                  font-size-14
                  bold-500
                  urgent_charges
                  align-self-center
                "
                >Special Urgent Charges $</label
              >
              <TextField
                label="credit_terms"
                type="number"
                :disabled="
                  bill_setting.special_urgent_charges_selected ? false : true
                "
                v-model="bill_setting.special_urgent_charges"
                :classes="{
                  // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="flex flex-row align-items-center">
            <div class="flex">
              <Checkbox v-model="bill_setting.ftz_selected" :binary="true" />
            </div>
            <div class="flex check-text ml-2">
              <label
                class="
                  color-7a7a7a
                  font-size-14
                  bold-500
                  urgent_charges
                  align-self-center
                "
                >FTZ $</label
              >
              <TextField
                label="credit_terms"
                :disabled="bill_setting.ftz_selected ? false : true"
                type="number"
                v-model="bill_setting.ftz"
                :classes="{
                  // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>

  <span class="ml-2 txt">Contact Person</span>
  <div :key="renderKey" class="row ml-1 table_div">
    <div class="col-12">
      <DataTables
        :key="renderKey"
        :tableData="con_tacts"
        :selectionModeState="selected_contacts"
        v-model:selection="selected_contacts"
        :tableColumn="trip_table"
      />

      <!-- <DataTable
      :key="renderKey"
        class="p-datatable-sm editable-cells-table formTable"
        :value="expressContractData.contacts"
        responsiveLayout="scroll"
        v-model:selection="selected_contacts"
        id="formTable"
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
      </DataTable> -->
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
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesQuotationDialog" @click="closeDialog" />
          <Buttons
            v-if="updateType.includes('quotation')"
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text"
            v-on:childToParent="submitData('preview')"
            :loading="isloading1"
          />
          <Buttons
            label="Save"
            button_class="dialog-button-text"
            v-on:childToParent="submitData('save')"
            :loading="isloading"
          />
          <Buttons
            v-if="updateType.includes('quotation')"
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
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@import "~@/assets/scss/accordion.scss";
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