<template>
  <!-- Work stopped due to design change. need to get confirmation before starting this -->
  <div>
    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-343434 mt-4">
        Weight and Dimensions
      </p>
    </div>

    <!-- Parent -->
    <div class="adhoc_van">
      <!-- Child -->
      <div>
        <img src="/images/box.png" alt="images" />
      </div>
      <!-- Weight Kg -->
      <div class="flex-direction">
        <div class="formgrid grid ml-3">
          <div class="field col-12 md:col-12">
            <h5 class="required bold-500 font-size-14 color-7a7a7a">
              Weight (kg)
            </h5>
            <TextField
              label="kg"
              type="number"
              v-model="details.kg"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.details.kg.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid ml-3">
          <div class="field col-12 md:col-4">
            <h5 class="bold-500 font-size-14 color-7a7a7a">Length (cm)</h5>
            <TextField
              label="length"
              type="number"
              v-model="details.length"
              v-on:childToParent="getUserInput"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="bold-500 font-size-14 color-7a7a7a">Width (cm)</h5>
            <TextField
              label="width"
              type="number"
              v-model="details.width"
              v-on:childToParent="getUserInput"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="bold-500 font-size-14 color-7a7a7a">Height (cm)</h5>
            <TextField
              label="height"
              type="number"
              v-model="details.height"
              v-on:childToParent="getUserInput"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="formgrid grid ml-3">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          From Postal Code
        </h5>
        <TextField
          label="from_postal_code"
          type="number"
          v-model="details.from_postal_code"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.from_postal_code.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          To Postal Code
        </h5>
        <TextField
          label="to_postal_code"
          type="number"
          v-model="details.to_postal_code"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.to_postal_code.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md">
      <span class="bold-700 font-size-12 color-343434 ml-2 mb-3"
        >Select Rates</span
      >
      <!-- need to change table data as needed, sample table assigned -->
      <div class="sales-selectRate-tableDesign mt-3">
        <span class="flex grid align-items-center mb-0 pb-0">
          <p class="flex bold-600 font-size-16 color-4e5868 col-12 md:col-5">
            Rates
          </p>
          <span
            class="
              flex
              col-12
              md:col-7
              justify-content-end
              align-items-center
              mb-0
              pb-0
            "
          >
            <p class="bold-600 font-size-14 color-4e5868 mr-5">
              Total Weight: {{ details.kg }} Kg
            </p>
            <p class="bold-600 font-size-14 color-4e5868">
              Vol. Weight:
              {{
                Number(
                  (details.length * details.width * details.height) / 5000
                ).toFixed(2)
              }}
              Kg
            </p>
            <!-- <p class="bold-600 font-size-14 color-66c11e ">Chargable Weight: 50 Kg</p> -->
          </span>
        </span>
        <hr />
        <FormTables
          v-if="
            $store.state.salesQuotationDialog.inspectionsDropDownTableData !=
            null
          "
          :key="$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne"
          formTableDataName="inspectionsFormTableData"
          @getSelectedData="getSelectedData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="
            $store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne
          "
          :tableColumns="
            $store.state.salesQuotationDialog
              .inspectionsDropDownTableDataColumns
          "
          storePath="salesQuotationDialog"
        />
      </div>
    </div>
    <div v-if="$route?.params?.actionType == 'Adhoc'">
      <span class="ml-2 font-size-14">Contact Person</span>
      <div :key="renderKey" class="row ml-1 table_div">
        <div class="col-12">
          <DataTables
            :key="renderKey"
            :tableData="con_tacts"
            :selectionModeState="selected_contacts"
            v-model:selection="selected_contacts"
            :tableColumn="contact_table"
        :multipleSelectValue="true"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Remarks</h5>
      <TextAreaField
        label="remarks"
        type="text"
        v-model="details.remarks"
        :classes="{
          'inputfield w-full text-900 font-bold py-2': true,
        }"
      />
    </div>
    <div class="mt-3">
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-start
          py-3
          flex-wrap
        "
      >
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesSales" label="Cancel" />
          <Buttons
            label="Save"
            button_class="dialog-button-text"
            v-on:childToParent="submitData"
            class="bg-357dea"
          />
          <!-- @click="sendQuotation"-->
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2 bg-357dea"
            v-on:childToParent="sendQuotation"
            :loading="isQuotationBtnLoading"
          />
        </div>
      </div>
    </div>
  </div>
  <Toasts
    :severity="$store.state['salesExpressAdhoc'].toastData.severity"
    :summary="$store.state['salesExpressAdhoc'].toastData.summary"
  />
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import FormTables from "../FormTable";
import InputNumber from "primevue/inputnumber";
import { sales_co, sales_IC } from "../../../../../../../store/helper";
import DataTables from "../../Express/Contract/Components/DataTables.vue";
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import Toasts from "./Toast.vue";
import moment from "moment";
import { errhandler } from "@/services/httpClient";
import { salesCommon } from "../../../../../../../store/helper";
const _ = require("lodash");
export default {
  components: { Toasts, FormTables, DataTables },
  name: "SalesAdhocDemandService",

  data: () => ({
    v$: useVuelidate(),
    products: [],
    ProfileId: null,
    selectionModeState: null,
    details: {
      kg: "",
      length: "",
      width: "",
      height: "",
      from_postal_code: "",
      to_postal_code: "",
      remarks: "",
    },
    selected_contacts: [],
    con_tacts: [],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        kg: { required },
        from_postal_code: { required },
        to_postal_code: { required },
      },
    };
  },
  computed: {
    ...sales_co,
    ...sales_IC,
  },
  created() {
    this.con_tacts = [];
    let data = this.$store.state.salesRapidoAdhoc?.RapidoRowData;
    this.profileCreationData.company_contacts.map((i) => {
      this.con_tacts.push({
        profile_url: i.profile_url,
        contact_name: i.contact_name,
        contact_no: i.contact_no,
        email: i.email,
        mobile_no: i.mobile_no,
        designation: i.designation,
        salutation: i.salutation,
      });
      if (
        data &&
        data?.contacts?.some((u) => u.email === i.email && u.selected)
      ) {
        this.selected_contacts.push({
          profile_url: i.profile_url,
          contact_name: i.contact_name,
          contact_no: i.contact_no,
          email: i.email,
          mobile_no: i.mobile_no,
          designation: i.designation,
          salutation: i.salutation,
        });
      }
    });
  },
  methods: {
    ...salesCommon,
    getSelectedData(value) {
      this.products = [];
      value &&
        value.length &&
        value.map((item) => {
          this.products.push({
            delivery_type: item.delivery_type,
            cut_off_days_count: item.cut_off_days_count,
            net_charges: item.net_charges,
            selected: true,
            delivery_type_initial: item.delivery_type_initial,
            collect_time: item.collect_time,
            cut_off_time: item.cut_off_time,
          });
        });
    },
    getUserInput(label, value) {
      if (
        label == "from_postal_code" ||
        label == "to_postal_code" ||
        label == "kg"
      ) {
        if (value == "") {
          this.$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne =
            {};

          return;
        }
      }
      if (
        this.details.from_postal_code &&
        this.details.to_postal_code &&
        this.details.kg &&
        this.details.length &&
        this.details.width &&
        this.details.height
      ) {
        const payload = {
          postal_code_from: this.details.from_postal_code,
          postal_code_to: this.details.to_postal_code,
          weight: Math.max(
            this.details.kg,
            (this.details.length * this.details.width * this.details.height) /
              5000
          ),
          volume:
            (this.details.length * this.details.width * this.details.height) /
            5000,
        };
        if (
          payload.postal_code_from != "" &&
          payload.postal_code_to != "" &&
          payload.weight != ""
        ) {
          this.$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne =
            {};
          this.$store.dispatch("salesRapidoAdhoc/loadAdhocDialogEcommerce", {
            path: "/settings/sales/rates/rapido/adhoc/sugesstion/ecommerce/delivery-type-rates",
            payload,
          });
        }
      }
    },
    async sendQuotationhandler() {
      if (this.$store.state.salesSales.quotationPostPatchId) {
        this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path:
            "/sales/quotations/send/" +
            this.$store.state.salesSales.quotationPostPatchId,
          method: "POST",
          id: this.$store.state.salesSales.quotationPostPatchId,
          type: "quotation",
          loadDiffStore: true,
          loadData: "salesSales/loadQuotationTabTableData",
          data: {
            email: "keerthana@squashapps.com",
            template_id: 1,
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The quotation is sent to mail successfully!`,
              toastSeverity: "info",
            },

            toastCommonErrorData: {
              toastMsg: "There was an error in activating contract, try again!",

              toastSeverity: "error",
            },
          },
        });
      }
    },
    async sendQuotation() {
      this.$store.state.salesSales.sendQuotationRedirect = true;
      await this.submitData();
    },
    async submitData() {
      // if (this.products && this.products.length == 0) return;
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (_.isEmpty(this.products)) {
        this.submitted = true;
      }
      if (
        this.v$.$invalid &&
        this.$store.state.salesRapidoAdhoc.rapidoStepValidation.$invalid
      ) {
        this.submitted = true;
        this.$store.state.salesRapidoAdhoc.rapidoAdhocSubmitted = true;
      }
      if (
        !this.v$.$invalid &&
        this.$store.state.salesRapidoAdhoc.rapidoStepValidation?.$invalid
      ) {
        this.$store.state.salesRapidoAdhoc.rapidoAdhocSubmitted = true;
      }
      if (
        this.v$.$invalid &&
        !this.$store.state.salesRapidoAdhoc.rapidoStepValidation?.$invalid
      ) {
        this.submitted = true;
      }

      if (
        !this.v$.$invalid &&
        !this.$store.state.salesRapidoAdhoc.rapidoStepValidation?.$invalid
      ) {
        let con_tact = [];
        this.con_tacts.map((i) => {
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
        // this.$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne.map(
        //   (item) => {
        //     this.products.push({
        //       delivery_type: item.delivery_type,
        //       cut_off_days_count: item.cut_off_days_count,
        //       net_charges: item.net_charges,
        //       delivery_type_initial: item.delivery_type_initial,
        //       collect_time: moment(item.collect_time).utc().format("hh:mm"),
        //       cut_off_time: moment(item.cut_off_time).utc().format("hh:mm"),
        //     });
        //   }
        // );
        if (this.$store.state.salesRapidoAdhoc.RapidoRowData?.id) {
          this.ProfileId = Number(
            this.$store.state.salesRapidoAdhoc.RapidoRowData?.profile_id
          );
        } else {
          this.ProfileId = Number(this.$route.params.id);
        }
        const data = {
          profile_id: this.ProfileId,
          business_type: "Adhoc",
          customer_type: "Rapido",
          status: this.mainDetails.status,
          remarks: this.details.remarks,
          contacts: con_tact,
          quotation: {
            priority: this.mainDetails.priority,
            from_postal_code: Number(this.details.from_postal_code),
            to_postal_code: Number(this.details.to_postal_code),
            on_demand_service:
              this.RadioButtonValue == "Ondemand" ? true : false,

            e_commerce: this.RadioButtonValue == "E-Commerce" ? true : false,
            weight: this.details.kg,
            length: this.details.length,
            height: this.details.height,
            width: this.details.width,
            rates: this.products,
          },
        };
        if (this.$store.state.salesRapidoAdhoc?.RapidoAdhocEditData?.id) {
          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/quotation/" +
              this.$store.state.salesRapidoAdhoc.RapidoAdhocEditData.id,
            method: "PATCH",
            data,
            id: this.$route.params.id,
            profileId: this.$route.params?.pid,
            routeName: "RapidoRapidoAdhocOverview",
            loadData: "loadQuotationTabTableData",
            dataRendering: "salesRapidoAdhoc/loadRapidoAdhocOverviewData",

            redirectToDiffPageById: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Quotation updated successfully!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg: "",
                toastSeverity: "error",
              },
            },
          });
          if (this.$route.path == "/sales") {
            this.loadQuotationTabData();
            this.loadContractTabData();
          }
        } else if (this.$store.state.salesRapidoAdhoc?.RapidoRowData?.id) {
          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/quotation/" +
              this.$store.state.salesRapidoAdhoc.RapidoRowData.id,
            method: "PATCH",
            data,
            id: this.$route.params.id,
            profileId: this.$route.params?.pid,
            routeName: "RapidoRapidoAdhocOverview",
            loadData: "loadQuotationTabTableData",
            dataRendering: "salesRapidoAdhoc/loadRapidoAdhocOverviewData",

            redirectToDiffPageById: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Quotation updated successfully!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg: "",
                toastSeverity: "error",
              },
            },
          });
          if (this.$route.path == "/sales") {
            this.loadQuotationTabData();
            this.loadContractTabData();
          }
        } else {
          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path: "/sales/quotation",
            method: "POST",
            data,
            id: this.$route.params.id,
            profileId: this.$route.params?.pid,
            routeName: "RapidoRapidoAdhocOverview",
            loadData: "loadQuotationTabTableData",
            dataRendering: "salesRapidoAdhoc/loadRapidoAdhocOverviewData",

            redirectToDiffPageById: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Quotation created successfully!`,
                toastSeverity: "success",
              },
              toastCommonErrorData: {
                toastMsg: "",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.adhoc_van {
  display: flex;
}
.flex-direction {
  flex-direction: column;
}
.rate-content {
  gap: 4rem;
  border-bottom: 1px solid #dfe4ed;
  font-weight: 600;
}
.rate-text {
  margin-right: 23rem;
}
.select-rate-content {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
}
.label-text {
  font-weight: 600;
  font-size: 14px;
}
.table-content {
  padding: 15px;
}
::v-deep .p-datatable-thead {
  font-size: 14px;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #f3f7ff !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > td {
  color: #4e5968 !important;
  font-size: 12px;
  font-weight: 600;
}
/* ::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td. {
  color:greenyellow;
} */
</style>