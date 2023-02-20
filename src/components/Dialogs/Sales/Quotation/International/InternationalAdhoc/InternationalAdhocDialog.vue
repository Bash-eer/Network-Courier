<template>
  <div>
    <p>Cost Per Unit</p>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Customer Type</h5>
        <DropDown
          :data="tradeData"
          :state="details.CustomerType"
          label="CustomerType"
          id="CustomerType"
          code="code"
          v-model="details.CustomerType"
          :value="details.CustomerType"
          :classes="{
            'p-invalid': v$.details.CustomerType.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Business Method</h5>
        <DropDown
          :data="tradeData"
          :state="details.BusinessMethod"
          label="BusinessMethod"
          id="BusinessMethod"
          code="code"
          v-model="details.BusinessMethod"
          :value="details.BusinessMethod"
          :classes="{
            'p-invalid': v$.details.BusinessMethod.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Status</h5>
        <DropDown
          :data="tradeData"
          :state="details.Status"
          label="Status"
          id="Status"
          code="code"
          v-model="details.Status"
          :value="details.Status"
          :classes="{
            'p-invalid': v$.details.Status.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Priority</h5>
        <DropDown
          :data="tradeData"
          :state="details.Priority"
          label="Priority"
          id="Priority"
          code="code"
          v-model="details.Priority"
          :value="details.Priority"
          :classes="{
            'p-invalid': v$.details.Priority.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Date of Shipment</h5>
        <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="icon"
          v-model="details.Priority"
          :showIcon="true"
          style="width: 100%"
           :monthNavigator = "true"
                  :yearNavigator="true"
                   yearRange="1950:2050"
        />
      </div>
    </div>
    <div class="m-5">
      <!--internAdhocRadioButton-->
      <RadioButtons
        label="platform"
        state=""
        v-bind:radioButtonData="SalesDialogCategories"
        v-model="selectedCategory"
      />
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text">Origin Country</label>
        <DropDown
          :data="tradeData"
          :state="details.OriginCountry"
          label="OriginCountry"
          id="OriginCountry"
          code="code"
          v-model="details.OriginCountry"
          :value="details.OriginCountry"
          :classes="{
            'p-invalid': v$.details.OriginCountry.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text">Origin City</label>
        <DropDown
          :data="tradeData"
          :state="details.OriginCountry"
          label="OriginCountry"
          id="OriginCountry"
          code="code"
          v-model="details.OriginCountry"
          :value="details.OriginCountry"
          :classes="{
            'p-invalid': v$.details.OriginCountry.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Origin Country Postal Code</h5>
        <DropDown
          :data="tradeData"
          :state="details.OriginCountryPostalCode"
          label="OriginCountryPostalCode"
          id="OriginCountryPostalCode"
          code="code"
          v-model="details.OriginCountryPostalCode"
          :value="details.OriginCountryPostalCode"
          :classes="{
            'p-invalid':
              v$.details.OriginCountryPostalCode.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Destination Country</h5>
        <DropDown
          :data="tradeData"
          :state="details.DestinationCountry"
          label="DestinationCountry"
          id="DestinationCountry"
          code="code"
          v-model="details.DestinationCountry"
          :value="details.DestinationCountry"
          :classes="{
            'p-invalid': v$.details.DestinationCountry.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Destination City</h5>
        <DropDown
          :data="tradeData"
          :state="details.DestinationCountry"
          label="DestinationCountry"
          id="DestinationCountry"
          code="code"
          v-model="details.DestinationCountry"
          :value="details.DestinationCountry"
          :classes="{
            'p-invalid': v$.details.DestinationCountry.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Destination Postal Code</h5>
        <DropDown
          :data="tradeData"
          :state="details.DestinationCountryPostalCode"
          label="DestinationCountryPostalCode"
          id="DestinationCountryPostalCode"
          code="code"
          v-model="details.DestinationCountryPostalCode"
          :value="details.DestinationCountryPostalCode"
          :classes="{
            'p-invalid':
              v$.details.DestinationCountryPostalCode.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Transit Day(s)</h5>
        <TextField
          label="WeightinKgs"
          type="text"
          v-model="details.WeightinKgs"
          :classes="{
            'p-invalid': v$.details.WeightinKgs.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

    <!--v-if selected category is document-->
    <div><p>Weight and Dimensions</p></div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Weight in Kgs</h5>
        <TextField
          label="WeightinKgs"
          type="text"
          v-model="details.WeightinKgs"
          :classes="{
            'p-invalid': v$.details.WeightinKgs.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-2">
        <h5 class="required dialog-label-text">Length (cm)</h5>
        <TextField
          label="WeightinKgs"
          type="text"
          v-model="details.WeightinKgs"
          :classes="{
            'p-invalid': v$.details.WeightinKgs.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-2">
        <h5 class="required dialog-label-text">Width (cm)</h5>
        <TextField
          label="WeightinKgs"
          type="text"
          v-model="details.WeightinKgs"
          :classes="{
            'p-invalid': v$.details.WeightinKgs.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-2">
        <h5 class="required dialog-label-text">Height (cm)</h5>
        <TextField
          label="WeightinKgs"
          type="text"
          v-model="details.WeightinKgs"
          :classes="{
            'p-invalid': v$.details.WeightinKgs.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <p class="blue">+ Add More Weight</p>

    <div class="formgrid grid">
      <div class="field col-12">
        <h5 class="required dialog-label-text">Select Service Provider</h5>
        <!--  @blur="v$.details.roles.$model"  'p-invalid': v$.details.roles.$invalid && submitted,-->
        <MultiSelectChips
          :options="MultiChipData"
          :filter="true"
          placeholder="Select Role"
          label="userRole"
          v-model="details.roles"
          :value="details.roles"
          :state="details.roles"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <!--v-if selected category is parcel-->

    <div v-if="selectedCategory == 'Parcel'">
      <p>Weight and Dimensions</p>
      <div class="grid mt-2 mb-2">
        <div class="col-12 md:col-4">
          <div
            class="
              flex
              align-items-center
              justify-content-center
              h-full
              m-2
              mr-5
            "
          >
            <img src="/images/box.png" alt="" />
          </div>
        </div>
        <div class="col-12 md:col-8">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Weight (kg)</h5>
              <TextField
                label="Weight"
                type="number"
                v-model="parcelDetails.Weight"
                :classes="{
                  'p-invalid': v$.parcelDetails.Weight.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Length (cm)</h5>
              <TextField
                label="Length"
                type="number"
                v-model="parcelDetails.Length"
                :classes="{
                  'p-invalid': v$.parcelDetails.Length.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Width (cm)</h5>
              <TextField
                label="Width"
                type="number"
                v-model="parcelDetails.Width"
                :classes="{
                  'p-invalid': v$.parcelDetails.Width.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Height (cm)</h5>
              <TextField
                label="Height"
                type="number"
                v-model="parcelDetails.Height"
                :classes="{
                  'p-invalid': v$.parcelDetails.Height.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--tables-->
    <div class="formgrid grid m-1">
      <div class="field col-12 dataClass">
        <p class="m-3 results-text">Results</p>
        <div
          v-for="result in ResultsData"
          :key="result.title"
          class="
            m-3
            flex flex-row
            align-self-center
            justify-content-between
            data-inside-wrapper
          "
        >
          <p class="results-text">{{ result.title }}</p>
          <p class="results-bills">{{ result.bill }}</p>
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Package Details</h5>
        <TextAreaField
          label="package_details"
          v-model="details.package_details"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <!--footer-->
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
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          class="dialog-button-text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "Company",
  data: () => ({
    selectedCategory: null,
    SalesDialogCategories: [
      { name: "Document", key: "DU" },
      { name: "Parcel", key: "PL" },
    ],
    ResultsData: [
      { title: "Delivery Charges SGD", bill: "$251.00" },
      { title: "Fuel Charges SGD", bill: "$251.00" },
      { title: "Over weight Charges SGD", bill: "$251.00" },
      { title: "Others Charges SGD", bill: "$0.00" },
      { title: "Emergency Situation Charges SGD", bill: "$4.00" },
      { title: "Net Charges SGD", bill: "$255.00" },
    ],
    tradeData: [
      { name: "Bank", code: "B" },
      { name: "Private", code: "P" },
    ],
    MultiChipData: [
      { name: "FEDEX", code: "FED" },
      { name: "DHL", code: "DHL" },
    ],
    parcelDetails: {
      Weight: "",
      Length: "",
      Width: "",
      Height: "",
    },
    v$: useVuelidate(),
    details: {
      CustomerType: "",
      BusinessMethod: "",
      Status: "",
      Priority: "",
      OriginCountry: "",
      OriginCountryPostalCode: "",
      DestinationCountry: "",
      DestinationCountryPostalCode: "",
      WeightinKgs: "",
      roles: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    if (this.selectedCategory == "Parcel") {
      return {
        details: {
          roles: { required },
          CustomerType: { required },
          BusinessMethod: { required },
          Status: { required },
          Priority: { required },
          OriginCountry: { required },
          OriginCountryPostalCode: { required },
          DestinationCountry: { required },
          DestinationCountryPostalCode: { required },
        },
        parcelDetails: {
          Weight: { required },
          Length: { required },
          Width: { required },
          Height: { required },
        },
      };
    }
    // else if(this.selectedCategory == 'Parcel'){
    else
      return {
        details: {
          CustomerType: { required },
          BusinessMethod: { required },
          Status: { required },
          Priority: { required },
          OriginCountry: { required },
          OriginCountryPostalCode: { required },
          DestinationCountry: { required },
          DestinationCountryPostalCode: { required },
          WeightinKgs: { required },
        },
      };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (var t in this.tradeData) {
          if (this.details.Trade == this.tradeData[t].code) {
            this.details.Trade = this.tradeData[t].name;
          }
        }
        this.details.status = "company";
        for (var d in this.details) {
          this.$store.state.sales.companyCreationFormData[d] = this.details[d];
        }
      }
    },
  },
  created() {
    // if (
    //   Object.keys(this.$store.state["sales"].companyCreationStateData).length !=
    //   0
    // ) {
    //   for (var state in this.$store.state["sales"].companyCreationStateData) {
    //     this.details[state] =
    //       this.$store.state["sales"].companyCreationStateData[state];
    //   }
    // }
    // this.selectedCategory = this.SalesDialogCategories[0].name;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.p-multiselect-label {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: left;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.dataClass {
  background: #ffffff;
  border: 1px dashed #acb5c1;
  box-sizing: border-box;
  border-radius: 6px;
}
.data-inside-wrapper {
  border-bottom: 1px dashed #acb5c1;
}
.data-inside-wrapper:last-child {
  border: none !important;
}
.results-text {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 37px;
  color: #4e5868;
}
.results-bills {
  color: #66c11e;
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 37px;
}
</style>
