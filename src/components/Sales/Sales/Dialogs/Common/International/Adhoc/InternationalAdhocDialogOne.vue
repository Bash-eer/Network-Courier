<template>
  <div class="flex">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Customer Type</h5>
      <DropDown
        :disabled="true"
        code="name"
        :state="details.customer_type"
        :key="details.customer_type"
        :data="Customer_type"
        placeholder="Please Select"
        v-model="details.customer_type"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Business Method</h5>
      <DropDown
        :data="business_type"
        :disabled="true"
        placeholder="Please Select"
        :state="details.business_type"
        :key="details.business_type"
        code="name"
        v-model="details.business_type"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.business_type.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex">
    <div class="field col">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        :data="status"
        :state="details.status"
        :key="details.status"
        code="name"
        optionDisabled="disable"
        placeholder="Please Select"
        v-model="details.status"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.status.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Priority</h5>
      <DropDown
        :data="priority"
        :key="details.priority"
        :state="details.priority"
        placeholder="Please Select"
        code="name"
        v-model="details.priority"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.priority.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-6">
    <h5 class="required dialog-label-text">Expected Date of Shipment</h5>
    <div class="white_content p-2 calendar_content">
      <Calendar
        placeholder="Enter a date"
        dateFormat="d MM yy"
        class="quotation_calendar"
        id="icon"
        v-model="details.quotation.expected_shipment_date"
        :showIcon="true"
        style="width: 100%"
        :monthNavigator="true"
        :yearNavigator="true"
        yearRange="1950:2050"
        :classes="{
          'p-invalid':
            v$.details.quotation.expected_shipment_date.$invalid && Submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <!-- <TextField
      type="date"
      v-model="details.quotation.expected_shipment_date"
      class="inputfield w-full dialog-field-text"
      :classes="{
        'p-invalid':
          v$.details.quotation.expected_shipment_date.$invalid && Submitted,
        'inputfield w-full dialog-field-text': true,
      }" -->
    <!-- /> -->
  </div>
  <div class="formgrid grid">
    <div class="flex mt-3 mb-3 ml-2">
      <RadioButtons
        label="platform"
        state=""
        v-bind:radioButtonData="SalesDialogCategories"
        v-model="selectedCategory"
        :selectedRadioButton="selectedRadioButton"
      />
    </div>
  </div>
  <div class="formgrid grid mt-2">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Origin Country</h5>
      <DropDownField
        :value="details.quotation.origin_country"
        :data="Origin_country"
        :filter="true"
        placeholder="Please Select"
        :state="details.quotation.origin_country"
        v-on:childToParent="getUserInput"
        v-model="details.quotation.origin_country"
        class="inputfield w-full dialog-field-text text-900"
        :classes="{
          'p-invalid':
            v$.details.quotation.origin_country.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Origin City</h5>

      <DropDownField
        :data="origin_city"
        :state="details.quotation.origin_city"
        :key="details.quotation.origin_city"
        :value="details.quotation.origin_city"
        :filter="true"
        placeholder="Please Select"
        v-on:childToParent="getUserInput"
        v-model="details.quotation.origin_city"
        class="inputfield w-full dialog-field-text text-900"
        :classes="{
          'p-invalid': v$.details.quotation.origin_city.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Origin Country Postal Code</h5>
      <TextField
        type="number"
        v-model="details.quotation.origin_country_postal_code"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid':
            v$.details.quotation.origin_country_postal_code.$invalid &&
            Submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mb-3">
    <div class="field col-12 md:col-4" :key="renderKey">
      <h5 class="required dialog-label-text">Destination Country</h5>
      <DropDownField
        :value="details.destination_country"
        :data="destination_country"
        placeholder="Please Select"
        :state="details.destination_country"
        :filter="true"
        v-on:childToParent="getUserInput"
        v-model="details.destination_country"
        class="inputfield w-full dialog-field-text text-900"
        :classes="{
          'p-invalid': v$.details.destination_country.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Destination City</h5>
      <DropDownField
        :data="destination_city"
        :key="details.quotation.destination_city"
        :value="details.quotation.destination_city"
        :state="details.quotation.destination_city"
        :filter="true"
        v-on:childToParent="getUserInput"
        placeholder="Please Select"
        v-model="details.quotation.destination_city"
        class="inputfield w-full dialog-field-text text-900"
        :classes="{
          'p-invalid':
            v$.details.quotation.destination_city.$invalid && Submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">
        Destination Country Postal Code
      </h5>
      <TextField
        type="number"
        v-model="details.quotation.destination_country_postal_code"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid':
            v$.details.quotation.destination_country_postal_code.$invalid &&
            Submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mt-2">
    <div class="weight-dimensions ml-2">Weight and Dimensions</div>
  </div>
  <div v-for="(weight, index) of addWeights" :key="index">
    <div class="formgrid grid">
      <div class="field col-5">
        <h5 class="required dialog-label-text">Weight (kg)</h5>
        <TextField
          type="number"
          class="inputfield w-full dialog-field-text"
          v-on:childToParent="getUserInput"
          v-model="details['quotation']['dimensions'][index].weight"
          :classes="{
            'p-invalid':
              v$.details['quotation']['dimensions'][index].weight.$invalid &&
              Submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-2">
        <h5 class="required dialog-label-text">Length (cm)</h5>
        <TextField
          type="number"
          class="inputfield w-full dialog-field-text"
          v-on:childToParent="getUserInput"
          v-model="details['quotation']['dimensions'][index].length"
          :classes="{
            'p-invalid':
              v$.details['quotation']['dimensions'][index].length.$invalid &&
              Submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-2">
        <h5 class="required dialog-label-text">Width (cm)</h5>
        <TextField
          type="number"
          class="inputfield w-full dialog-field-text"
          v-model="details['quotation']['dimensions'][index].width"
          :classes="{
            'p-invalid':
              v$.details['quotation']['dimensions'][index].width.$invalid &&
              Submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-2">
        <h5 class="required dialog-label-text">Height (cm)</h5>
        <TextField
          type="number"
          v-on:childToParent="getUserInput"
          class="inputfield w-full dialog-field-text"
          v-model="details['quotation']['dimensions'][index].height"
          :classes="{
            'p-invalid':
              v$.details['quotation']['dimensions'][index].height.$invalid &&
              Submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <div v-if="index > 0">
        <div class="flex delete" @click="deleteWeight(index)">
          <i class="pi parent pi-times cross-button"></i>
        </div>
      </div>
    </div>
    <div class="flex align-items-center mt-2">
      <p class="weight weight-left ml-2">
        Total Weight: {{ details["quotation"]["dimensions"][index].weight }} Kg
      </p>
      <p class="weight ml-5">
        Vol. Weight:
        {{
          (details["quotation"]["dimensions"][index].width *
            details["quotation"]["dimensions"][index].length *
            details["quotation"]["dimensions"][index].height) /
          5000
        }}
      </p>
      <p class="chargable-weight ml-5">
        Chargeable Weight:
        {{
          Math.max(
            details["quotation"]["dimensions"][index].weight,
            (details["quotation"]["dimensions"][index].width *
              details["quotation"]["dimensions"][index].length *
              details["quotation"]["dimensions"][index].height) /
              5000
          )
        }}
      </p>
    </div>
  </div>
  <div
    v-if="this.$store.state.salesInternationalAdhoc.InternationalRowData.length"
    !="0"
  >
    <div class="add-more-weight ml-2" @click="addWeight">
      <b>+ Add More Weight</b>
    </div>
  </div>
  <div class="field col">
    <h5 class="required dialog-label-text">Select Service Provider</h5>
    <MultiSelectChips
      placeholder="Select Service Provider"
      :options="$store.state.salesInternationalAdhoc.ServiceProvider"
      :filter="true"
      code="name"
      :value="details['quotation'].service_providers"
      v-on:childToParent="getUserInput"
      :state="details['quotation'].service_providers"
      v-model="details['quotation'].service_providers"
      @blur="v$.details['quotation'].service_providers.$model"
      :classes="{
        'p-invalid':
          v$.details['quotation'].service_providers.$invalid && Submitted,
        'inputfield w-full dialog-field-text': true,
      }"
    />
  </div>

  <div class="sales-selectRate-tableDesign mt-3">
    <span class="flex grid align-items-center mb-0 pb-0">
      <div class="flex bold-600 font-size-16 color-4e5868 col-12 md:col-3">
        Results
        <span class="ml-3">
          <span class="chipStyle chipText">{{ chipName }}</span>
        </span>
      </div>
      <span
        class="
          flex
          col-12
          md:col-9
          justify-content-end
          align-items-center
          mb-0
          pb-0
        "
      >
        <p class="bold-600 font-size-14 color-4e5868 mr-5">
          Total Weight: {{ getTotalWeight() }} Kg
        </p>
        <p class="bold-600 font-size-14 color-4e5868 ml-3 mr-5">
          Vol. Weight:
          {{ getVolWeight() }} Kg
        </p>
        <p class="bold-600 font-size-14 color-66c11e ml-3 mr-4">
          Chargable Weight: {{ getChargeableWeight() }} Kg
        </p>
      </span>
    </span>
    <hr />
    <DataTable
      :key="$store.state.salesInternationalAdhoc.FormTableData"
      formTableDataName="inspectionsFormTableData"
      :selectionModeState="selectionModeState"
      dataKey="id"
      :tableData="$store.state.salesInternationalAdhoc.FormTableData"
      :tableColumns="
        $store.state.salesInternationalAdhoc
          .quotationInternationalAdhocTableDataColumns
      "
      storePath="salesQuotationDialog"
    />
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
  <div class="field col">
    <h5 class="dialog-label-text">Remarks</h5>
    <TextAreaField
      type="text"
      v-model="details.remarks"
      class="inputfield w-full dialog-field-text text-900"
      :classes="{
        'inputfield w-full dialog-field-text': true,
      }"
    />
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="salesSales" label="Cancel" class="color-357dea" />

    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
    <Buttons
      label="Send Quotation Now"
      button_class="dialog-button-text ml-2 bg-357dea"
      v-on:childToParent="sendQuotation"
      :loading="isQuotationBtnLoading"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import moment from "moment";
import DataTable from "../DataTable";
import { sales_co, sales_IC } from "../../../../../../../store/helper";
import DataTables from "../../Express/Contract/Components/DataTables.vue";
import { salesCommon } from "../../../../../../../store/helper";
const { URL } = require("../../../../../../../../config/const");
const _ = require("lodash");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "InternationalAdhocDialog",
  components: {
    DataTable,
    DataTables,
  },
  data() {
    return {
      Total_weight: null,
      renderKey: 10,
      chargableWeight: "",
      chipName: "",
      selectedRadioButton: null,
      weapon: "Iam",
      selected_contacts: [],
      con_tacts: [],
      details: {
        customer_type: "",
        business_type: "",
        status: "",
        remarks: "",

        priority: "",
        destination_country: "",

        quotation: {
          expected_shipment_date: "",
          origin_country: "",
          destination_country_id: "",
          origin_country_id: "",
          destination_city_id: "",
          origin_city_id: "",
          origin_city: "",
          origin_country_postal_code: "",
          destination_city: "",
          destination_country_postal_code: "",
          service_providers: [],
          dimensions: [
            {
              width: "",
              weight: "",
              length: "",
              height: "",
            },
          ],
        },
      },
      addWeightsClicked: 0,
      addWeights: ["new_weight"],
      weightsValidation: [
        {
          width: { required },
          weight: { required },
          length: { required },
          height: { required },
        },
      ],
      SalesDialogCategories: [
        { name: "Document", key: "document" },
        { name: "Parcel", key: "parcel" },
      ],
      selectedCategory: null,

      // saveOne: false,
      products: [],

      Origin_country: [],
      origin_city: [],
      destination_country: [],
      destination_city: [],
      document_type: "Document",
      actions: {},
      Customer_type: [
        { name: "International", code: "1" },
        { name: "Express", code: "2" },
        { name: "Rapido", code: "3" },
      ],
      business_type: [
        { name: "Adhoc", code: "1" },
        { name: "Contract", code: "2" },
      ],
      status: [
        { name: "New", code: "New", disable: false },
        { name: "Approved", code: "Approved", disable: false },
        { name: "Quote", code: "Quote", disable: false },
        { name: "Declined", code: "Declined", disable: false },
        { name: "Conclude", code: "Conclude", disable: true },
        { name: "Hold", code: "Hold", disable: false },
      ],
      priority: [
        { name: "High", code: "1" },
        { name: "Low", code: "2" },
      ],
      v$: useVuelidate(),
      Submitted: false,
    };
  },

  validations() {
    if (this.addWeightsClicked > -1) {
      return {
        details: {
          customer_type: { required },
          business_type: { required },
          status: { required },
          priority: { required },
          destination_country: { required },

          quotation: {
            expected_shipment_date: { required },
            origin_country: { required },
            origin_city: { required },
            origin_country_postal_code: { required },
            destination_city: { required },
            destination_country_postal_code: { required },
            service_providers: { required },
            dimensions: this.weightsValidation,
          },
        },
      };
    }
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },

    getUserInput() {
      const payloadTable = {
        origin_country_id: this.details.quotation.origin_country.id,
        origin_city_id: this.details.quotation.origin_city.id,
        origin_postal_code: this.details.quotation.origin_country_postal_code,
        destination_country_id: this.details.destination_country.id,
        destination_city_id: this.details.quotation.destination_city.id,
        destination_postal_code:
          this.details.quotation.destination_country_postal_code,
        type:
          this.selectedCategory.charAt(0).toLowerCase() +
          this.selectedCategory.slice(1),
        dimensions: [
          {
            weight: "",
            length: "",
            height: "",
            width: "",
          },
        ],
        chargeable_weight: _.sum(
          this.details.quotation.dimensions.map((dimension) => {
            const volWeight =
              (dimension.length * dimension.height * dimension.width) / 5000;
            return Number(
              volWeight > dimension.weight ? volWeight : dimension.weight
            );
          })
        ),
        agents_id: this.details.quotation.service_providers.map(
          (serviceProvider) => {
            return serviceProvider.id;
          }
        ),
      };
      payloadTable.dimensions = this.details.quotation.dimensions;

      if (this.details.quotation != "") {
        this.$store.state.salesInternationalAdhoc.FormTableData = {};
        this.$store.dispatch("salesInternationalAdhoc/loadFormTableData", {
          path: "/settings/sales/rates/international/outbound/sugesstion/agent-rates",
          payload: payloadTable,
        });
      }
    },
    async sendQuotation() {
      this.$store.state.salesSales.sendQuotationRedirect = true;
      await this.submitData();
    },
    submitData() {
      if (this.v$.$invalid) {
        this.Submitted = true;
      }
      if (!this.v$.$invalid) {
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
        this.$store.state.salesInternationalAdhoc.FormTableData.map((item) => {
          this.products.push({
            service_provider: item.service_provider,
            transit_days: item.transit_days,
            delivery_charges: item.delivery_charges,
            fuel_charges: item.fuel_charges,
            over_weight_charges: item.over_weight_charges,
            remote_area_charges: item.remote_area_charges,
            other_charges: item.other_charges,
            emergency_charges: item.emergency_charges,
            net_charges: item.net_charges,
          });
        });
        if (
          this.$store.state.salesInternationalAdhoc.InternationalRowData?.id
        ) {
          this.ProfileId = Number(
            this.$store.state.salesInternationalAdhoc.InternationalRowData
              ?.profile_id
          );
        } else {
          this.ProfileId = Number(this.$route.params.id);
        }
        var payload = {
          profile_id: this.ProfileId,
          business_type: this.business_type[0].name,
          customer_type: this.Customer_type[0].name,
          status: this.details.status,
          remarks: this.details.remarks,
          contacts: con_tact,
          quotation: {
            priority: this.details.priority,
            expected_shipment_date:
              this.details.quotation.expected_shipment_date,
            item_type:
              this.selectedCategory.charAt(0).toUpperCase() +
              this.selectedCategory.slice(1),
            document: this.selectedCategory == "Document" ? true : false,
            parcel: this.selectedCategory == "Parcel" ? true : false,
            origin_country: this.details.quotation.origin_country.name,
            origin_country_id: this.details.quotation.origin_country.id,
            origin_city: this.details.quotation.origin_city.name,
            origin_city_id: this.details.quotation.origin_city.id,

            origin_country_postal_code:
              this.details.quotation.origin_country_postal_code,
            destination_country: this.details.destination_country.name,
            destination_country_id: this.details.destination_country.id,
            destination_city_id: this.details.quotation.destination_city.id,

            destination_city: this.details.quotation.destination_city.name,
            destination_country_postal_code:
              this.details.quotation.destination_country_postal_code,
            total_weight: 50,
            volume_weight: 20,
            chargeable_weight: 50,
            result_type: "Import",
            dimensions: [
              {
                weight: "",
                length: "",
                height: "",
                width: "",
              },
            ],
            service_providers:
              this.$store.state.salesInternationalAdhoc.FormTableData,
          },
        };
        payload.quotation.dimensions = this.details.quotation.dimensions;

        this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
          path:
            "/sales/quotation/" +
            this.$store.state.salesInternationalAdhoc.InternationalRowData
              .parent_id,
          data: payload,

          id: this.$route.params.id,
          profileId: this.$route.params?.pid,
          routeName: "InternationalAdhoc",
          loadData: "loadQuotationTabTableData",
          dataRendering:
            "salesInternationalAdhoc/loadInternationalAdhocOverviewData",

          redirectToDiffPageById: true,
          method: "PATCH",
          toastData: {
            toastSuccessData: {
              toastMsg: `The International Adhoc Quotation is Updated!`,
              toastSeverity: "info",
            },
            toastDuplicateErrorData: {
              toastMsg: `The data is already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in Updating the International Adhoc Quotation, try again!",
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
    addWeight() {
      this.details.quotation.dimensions.push({
        width: "",
        weight: "",
        length: "",
        height: "",
      });
      this.weightsValidation.push({
        width: { required },
        weight: { required },
        length: { required },
        height: { required },
      });
      this.addWeightsClicked++;
      this.addWeights.push("new_weight");
    },
    getTotalWeight() {
      let t = 0;
      this.details.quotation.dimensions.map((data) => {
        t += parseFloat(data.weight);
      });
      this.tot_weight = t;
      return t;
    },
    getVolWeight() {
      let t = 0;
      this.details.quotation.dimensions.map((data) => {
        t +=
          (parseFloat(data.width) *
            parseFloat(data.length) *
            parseFloat(data.height)) /
          5000;
      });
      this.volum_weight = t;
      return t;
    },
    getChargeableWeight() {
      let t = Math.max(this.getTotalWeight(), this.getVolWeight());
      this.charge_weight = t;
      return t;
    },
    deleteWeight(index) {
      this.details.quotation.dimensions.splice(index, 1);
      this.weightsValidation.splice(index, 1);
      this.addWeights.splice(index, 1);
      this.addQuestionClicked++;
    },
    loadData() {
      this.details.quotation.dimensions = [];
      this.weightsValidation = [];
      this.addWeights = [];
      this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.weight_dimension_details.map(
        (data) => {
          this.details.quotation.dimensions.push({
            weight: data.weight,
            width: data.width,
            length: data.length,
            height: data.height,
          });
          this.weightsValidation.push({
            width: { required },
            weight: { required },
            length: { required },
            height: { required },
          });
          this.addWeights.push("new_weight");

          this.addWeightsClicked++;
        }
      );
    },
  },
  created() {
    this.$store.state.salesSales.sendQuotationRedirect = false;
    this.con_tacts = [];
    let data = this.$store.state.salesInternationalAdhoc.InternationalRowData;
    this.profileCreationData.company_contacts?.map((i) => {
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
    this.Origin_country =
      this.$store.state.salesInternationalAdhoc.CountryDropDownData;
    this.destination_country =
      this.$store.state.salesInternationalAdhoc.CountryDestinationDropDownData;
    if (this.$store.state.salesInternationalAdhoc.InternationalRowData.id) {
      // this.selectedCategory =
      //   this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.item_type;
      if (
        this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.item_type == "Parcel"
      ) {
        this.selectedRadioButton = this.SalesDialogCategories[1];
      } else {
        this.selectedRadioButton = this.SalesDialogCategories[0];
      }
      this.selectedCategory =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.item_type;
      this.details.status =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.status;
      this.details.remarks =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.remarks;
      this.details.priority =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.priority;
      // this.details.quotation.origin_country =
      //   this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.origin_country;
      // this.details.quotation.origin_city =
      //   this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.origin_city;
      this.details.quotation.origin_country_postal_code =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.origin_country_postal_code;
      this.details.quotation.destination_country_postal_code =
        this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.destination_country_postal_code;
      this.details["quotation"].service_providers = [];
      this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.service_providers.map(
        (data) => {
          this.details["quotation"].service_providers.push({
            id: data.service_provider_id,
            name: data.service_provider_details.service_provider_name,
          });
        }
      );

      this.details.quotation.expected_shipment_date = this.dateFormater(
        this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.expected_shipment_date
      );

      // this.details.quotation.origin_country = this.Origin_country.find(
      //   (items) =>
      //     (items.id =
      //       this.$store.state.salesInternationalAdhoc.InternationalRowData.international_adhoc_specifics.origin_country_id)
      // );
      this.details.quotation.origin_country = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_country,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_country_id,
      };
      this.details.quotation.origin_city = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_city,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_city_id,
      };
      this.details.destination_country = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_country,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_country_id,
      };
      this.details.quotation.destination_city = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_city,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_city_id,
      };

      this.loadData();
      this.getUserInput();
      this.renderKey++;
    }

    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.Customer_type[0].name;
    this.renderKey++;
  },
  watch: {
    selectedCategory: function () {
      this.getUserInput();
    },

    "$store.state.salesInternationalAdhoc?.InternationalAdhocEditData":
      function () {
        this.$store.dispatch("salesInternationalAdhoc/loadRowData", {
          path:
            "/sales/quotations/overview/" +
            this.$store.state.salesInternationalAdhoc.InternationalAdhocEditData
              .id,
        });
      },
    "$store.state.salesInternationalAdhoc.InternationalRowData": function () {
      this.details.quotation.origin_country = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_country,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_country_id,
      };
      this.details.quotation.origin_city = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_city,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.origin_city_id,
      };
      this.details.destination_country = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_country,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_country_id,
      };
      this.details.quotation.destination_city = {
        name: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_city,
        id: this.$store.state.salesInternationalAdhoc.InternationalRowData
          .international_adhoc_specifics.destination_city_id,
      };
    },
    "details.quotation.origin_country"() {
      this.$store.dispatch("salesInternationalAdhoc/loadCityDropDownData", {
        path:
          "/settings/sales/rates/international/outbound/dropdowns/country/destination/" +
          this.details.quotation.origin_country.id,
      });
      if (this.details.quotation.origin_country.name == "SINGAPORE") {
        this.chipName = "Import";
      } else {
        this.chipName = "Export";
      }
    },
    "$store.state.salesInternationalAdhoc.CityDropDown"() {
      this.origin_city = this.$store.state.salesInternationalAdhoc.CityDropDown;
    },
    "details.quotation"() {},
    "details.destination_country"() {
      this.$store.dispatch(
        "salesInternationalAdhoc/loadDestinationCityDropDownData",
        {
          path:
            "/settings/sales/rates/international/outbound/dropdowns/country/destination/" +
            this.details.destination_country.id,
        }
      );
    },

    "$store.state.salesInternationalAdhoc.DestinationCity"() {
      this.destination_city =
        this.$store.state.salesInternationalAdhoc.DestinationCity;
    },
    // saveOne() {
    //   this.Submitted = true;
    //   this.save = true;
    //   this.$emit("outputValue", this.details);
    // },
    document_type: function () {
      this.$store.state.salesQuotationDialog.internationalAdhocDialogRadio =
        this.document_type;
    },
  },
  unmounted() {
    this.$store.state.salesInternationalAdhoc.FormTableData = {};
  },
};
</script>

<style scoped>
.main {
  justify-content: space-between;
}
.quotation {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 16px;
  color: #4e5868;
  margin-bottom: 0;
}
.add-more-weight {
  font-weight: 600;
  font-size: 14px;
  color: #3057ff;
}
.weight-left {
  margin-left: 30px;
}
.id {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
  margin-bottom: 0;
}
.weight-dimensions {
  font-weight: 700;
  font-size: 12px;
  align-items: center;
  color: #343434;
}
.image {
  display: flex;
  align-items: flex-end !important;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  /* border: none;                                                                      */
}
.chipStyle {
  width: 67px;
  height: 35px;
  background: #f4ecff;
  border-radius: 7px;
  padding: 10px;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}
.chipText {
  font-weight: 600;
  font-size: 12px;
  color: #8f46eb;
}
.sales-person {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 11px;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  margin-bottom: 0;
}
.add_weight {
  width: 140px;
  height: 17px;
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3057ff;
}
.chargable-weight {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #66c11e;
}
.weight {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4e5868;
}
.weight-dimensions {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #343434;
}
.result {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #4e5868;
}
.tabel-heading {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
}
::v-deep.p-datatable .p-column-header-content {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
  white-space: pre-wrap;
}
.export {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #eb9546;
  width: 66px;
  background-color: #fff8ec !important;
  height: 35px;
  display: flex;
  justify-content: center;
}
.import {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #8f46eb;
  width: 66px;
  background-color: #f4ecff !important;
  height: 35px;
  display: flex;
  justify-content: center;
}
::v-deep.field {
  margin-bottom: 0;
}
.document-parcel {
  font-family: "Montserrat";
  /* font-style: normal; */
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #212121;
  margin-top: -4px;
}
</style>