<template>
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
              {{ (details.length * details.width * details.height) / 5000 }} Kg
            </p>
            <!-- <p class="bold-600 font-size-14 color-66c11e ">Chargable Weight: 50 Kg</p> -->
          </span>
        </span>
        <hr />

        <FormTable
          :key="$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne"
          formTableDataName="CreateQuotationInternationalAdhoc"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="
            $store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne
          "
          :tableColumns="
            $store.state.salesRapidoAdhoc.inspectionsDropDownTableDataColumnsOne
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
          'inputfield w-full dialog-field-text py-2': true,
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
          <CancelButton storePath="salesSales" />

          <Buttons
            label="Send"
            button_class="dialog-button-text"
            v-on:childToParent="submitData"
            class="bg-357dea"
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
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import Toasts from "./Toast.vue";
import moment from "moment";
import {
  sales_co,
  sales_IC,
  salesCommon,
} from "../../../../../../../store/helper";
import DataTables from "../../Express/Contract/Components/DataTables.vue";
export default {
  name: "SalesAdhocEcommerce",
  components: { Toasts, DataTables },
  props: ["mainDetails", "mainDetailsValidation", "RadioButtonValue"],

  data: () => ({
    v$: useVuelidate(),
    products: [],
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
  methods: {
    ...salesCommon,
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
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
      if (this.details.from_postal_code && this.details.to_postal_code) {
        const payload = {
          postal_code_from: this.details.from_postal_code,
          postal_code_to: this.details.to_postal_code,
          weight: this.details.kg,
          volume:
            (this.details.length * this.details.width * this.details.height) /
            5000,
        };
        if (
          payload.postal_code_from != "" &&
          payload.postal_code_to != "" &&
          payload.weight != "" &&
          payload.volume != ""
        ) {
          this.$store.dispatch("salesRapidoAdhoc/loadAdhocDialogEcommerce", {
            path: "/settings/sales/rates/rapido/adhoc/sugesstion/ecommerce/delivery-type-rates",
            payload,
          });
        }
      }
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }

      if (!this.v$.invalid) {
        this.$store.dispatch("salesSales/closeDialog");
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
        this.$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne.map(
          (item) => {
            this.products.push({
              delivery_type: item.delivery_type,
              cut_off_days_count: item.cut_off_days_count,
              net_charges: item.net_charges,
              selected: true,
              delivery_type_initial: "TKT",
              collect_time: moment(item.collect_time)
                .utcOffset("+8:00")
                .format("hh:mm"),
              cut_off_time: moment(item.cut_off_time)
                .utcOffset("+8:00")
                .format("hh:mm"),
            });
          }
        );
        const data = {
          profile_id: Number(
            this.$store.state.salesRapidoAdhoc?.RapidoAdhocEditData.profile_id
          ),
          business_type: "Adhoc",
          customer_type: "Rapido",
          status: this.mainDetails.status,
          remarks: this.details.remarks,
          contacts: con_tact,
          quotation: {
            priority: this.mainDetails.priority,
            remarks: this.details.remarks,
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

        this.$store.dispatch("salesRapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "/sales/quotation" +
            this.$store.state.salesRapidoAdhoc.RapidoAdhocEditData.id,
          method: "PATCH",
          data,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Zone posted sucess`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in disabling/enabling a zone, try again!",
              toastSeverity: "error",
            },
          },
        });
        if (this.$route.path == "/sales") {
          this.loadQuotationTabData();
          this.loadContractTabData();
        }
      }
    },
  },
  unmounted() {
    this.$store.state.salesRapidoAdhoc.inspectionsDropDownTableDataOne = {};
  },

  created() {
    this.con_tacts = [];
    let data = this.$store.state.salesRapidoAdhoc?.RapidoAdhocEditData;
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
</style>