<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="Contract Details" >
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Name Of the Profile</h5>
          <TextField
            label="name_of_profile"
            type="text"
            v-model="details.name_of_profile"
            :classes="{
              'p-invalid': v$.details.name_of_profile.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Short Name</h5>
          <TextField
            label="short_name"
            type="text"
            v-model="details.short_name"
            :classes="{
              'p-invalid': v$.details.short_name.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text">Enter the Address</h5>
          <TextField
            label="address"
            type="text"
            v-model="details.address"
            :classes="{
              'p-invalid': v$.details.address.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">PostalCode</h5>
          <TextField
            label="pin_code"
            type="number"
            v-model="details.pin_code"
            :classes="{
              'p-invalid': v$.details.pin_code.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Country</h5>
          <DropDown
            code="name"
            :data="country"
            label="country"
            v-model="details.country"
            :class="{
              'p-invalid': v$.details.country.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">State</h5>
          <TextField
            label="state"
            type="text"
            v-model="details.state"
            :classes="{
              'p-invalid': v$.details.state.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Building Name</h5>
          <TextField
            label="build_name"
            type="text"
            v-model="details.build_name"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Floor No</h5>
          <TextField
            label="floor_no"
            type="number"
            v-model="details.floor_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Unit No</h5>
          <TextField
            label="unit_no"
            type="number"
            v-model="details.unit_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-12">
        <p class="txt mt-4">Contact</p>
      </div>
      <!-- Img Upload -->
      <span>
        <ImgUpload URL="/images/logo-here.png" />
      </span>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Contact Name</h5>
          <!-- salutation -->
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <select name="salutation" id="salutation">
                <option value="mr">Mr</option>
                <option value="ms">Ms</option>
                <option value="mrs">Mrs</option>
              </select>
            </span>
            <TextField
              label="contact_name"
              v-model="details.contact_name"
              :classes="{
                'p-invalid': v$.details.contact_name.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Contact No</h5>
          <TextField
            label="contact_no"
            type="number"
            v-model="details.contact_no"
            :classes="{
              'p-invalid': v$.details.contact_no.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label class="required dialog-label-text" for="Email ID"
            >Email ID</label
          >
          <TextField
            id="Email ID"
            type="text"
            label="Email ID"
            v-model="details['email']"
            @blur="v$.details['email'].$model"
            placeholder="e.g. Tommy@gmail.com"
            v-on:childToParent="FormInput"
            :classes="{
              'p-invalid': v$.details['email'].$invalid && submitted,
              'dialog-label-text dialog-field-text': true,
            }"
          />
          <span v-if="v$.details['email'].$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.details['email'].$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.details['email'].$invalid && submitted) ||
              v$.details['email'].$pending.$response
            "
            class="p-error"
            >{{
              v$.details["email"].required.$message.replace("Value", "Email")
            }}</small
          >
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Designation</h5>
          <TextField
            label="designation"
            type="text"
            v-model="details.designation"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Mobile No</h5>
          <TextField
            label="mobile_no"
            type="number"
            v-model="details.mobile_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add Contact </b></span>
      </div>
    </AccordionTab>
    <!-- Method  -->
    <AccordionTab header="Method">
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Customer Type</h5>
          <DropDown
            code="name"
            :data="customer_type"
            label="customer_type"
            v-model="details.customer_type"
            :class="{
              'p-invalid': v$.details.customer_type.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Business Method</h5>
          <DropDown
            code="name"
            :data="business_type"
            label="business_type"
            v-model="details.business_type"
            :class="{
              'p-invalid': v$.details.business_type.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Status</h5>
          <DropDown
            code="name"
            :data="status"
            label="status"
            v-model="details.status"
            :class="{
              'p-invalid': v$.details.status.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Priority</h5>
          <DropDown
            code="name"
            :data="priority"
            label="priority"
            v-model="details.priority"
            :class="{
              'p-invalid': v$.details.priority.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Referred By</h5>
          <DropDown
            label="referred_by"
            v-model="details.referred_by"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Referral Person Name</h5>
          <DropDown
            label="referral_person"
            :data="referral_person"
            v-model="details.referral_person"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Previously Served By</h5>
          <DropDown
            label="previously_served"
            :data="previously_served"
            v-model="details.previously_served"
            :class="{
              'p-invalid': v$.details.previously_served.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Sales Commission ($)</h5>
          <TextField
            label="sales_commission"
            type="number"
            v-model="details.sales_commission"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="= dialog-label-text required">Festival Name</h5>
          <DropDown
            label="festival_name"
            :data="festival_name"
            v-model="details.festival_name"
            :class="{
              'p-invalid': v$.details.festival_name.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Standard Liability($)</h5>
          <TextField
            label="standard_liability"
            type="number"
            v-model="details.standard_liability"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid ml-3">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Volumetric Value</h5>
          <TextField
            label="volumetric_value"
            type="number"
            v-model="details.volumetric_value"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-12">
        <p class="txt ml-2">Service Required</p>
      </div>
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="SalesDialogCategories"
        />
      </div>
      <div class="field col-12 md:col-12 ml-3">
        <h5 class="required dialog-label-text">Package Details</h5>
        <TextAreaField
          label="package_detail"
          type="text"
          v-model="details.package_detail"
          :classes="{
            'p-invalid': v$.details.package_detail.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </AccordionTab>
    <AccordionTab header="Trips">
      <div class="formgrid grid ml-2">
        <div class="col-12 md:col-6">
          <h5 class="required dialog-label-text required">Region</h5>
          <DropDown
            code="name"
            :data="region"
            label="region"
            v-model="details.region"
            :class="{
              'p-invalid': v$.details.region.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="col-12 md:col-6">
          <h5 class="required dialog-label-text required">Rates</h5>
          <DropDown
            code="name"
            :data="rates"
            label="rates"
            v-model="details.rates"
            :class="{
              'p-invalid': v$.details.rates.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-12">
        <p class="txt mt-3 ml-2">Trip Schedule</p>
      </div>
      <div class="row ml-2 table_div">
        <div class="col-12">
          <keep-alive>
            <FormTable
              v-if="$store.state.quotation.inspectionsDropDownTableData != null"
              :key="$store.state.quotation.inspectionsDropDownTableData"
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="$store.state.quotation.inspectionsDropDownTableData"
              :tableColumns="
                $store.state.quotation.inspectionsDropDownTableDataColumns
              "
              storePath="quotation"
            />
          </keep-alive>
        </div>
      </div>
    </AccordionTab>

    <!-- Contract Setting -->
    <AccordionTab header="Contract Settings"> </AccordionTab>
  </Accordion>
  <div class="mt-3">
    <span class="step-text">Effective Date</span>
  </div>
  <!--fields row one-->
  <div class="formgird grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Effective Start Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.effective_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5">
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
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "ExpressContractEdit",
  data: () => ({
    v$: useVuelidate(),
    details: {
      name_of_profile: "",
      short_name: "",
      address: "",
      pin_code: "",
      country: "",
      state: "",
      build_name: "",
      floor_no: "",
      unit_no: "",
      contact_name: "",
      contact_no: "",
      email: "",
      //   Method
      customer_type: "",
      business_type: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person: "",
      previously_served: "",
      sales_commission: "",
      standard_liability: "",
      volumetric_value: "",
      festival_name: "",
      package_detail: "",
      //   TRips
      region: "",
      rates: "",
      effective_start_date: "",
    },
    SalesDialogCategories: [
      { name: "Bike", key: "CU" },
      { name: "Van", key: "IU" },
      { name: "FSR", key: "CU" },
      { name: "Project", key: "IU" },
    ],
    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    referral_person: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],
    festival_name: [
      { name: "Deepavali", code: "Deepavali" },
      { name: "Pongal", code: "Pongal" },
    ],
    previously_served: [
      { name: "Abc Company", code: "abc" },
      { name: "EFG", code: " efg" },
    ],
    customer_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    region: [
      { name: "Airport", code: "USD" },
      { name: "Railways", code: "SGD" },
    ],
    rates: [
      { name: "Rate Card1", code: "USD" },
      { name: "Rate Card2", code: "SGD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        name_of_profile: { required },
        short_name: { required },
        address: { required },
        pin_code: { required },
        country: { required },
        state: { required },
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
        // Methods
        customer_type: { required },
        business_type: { required },
        status: { required },
        package_detail: { required },
        festival_name: { required },
        priority: { required },
        previously_served: { required },
        // Trips
        region: { required },
        rates: { required },
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
        //
      }
    },
  },
  components: {
    Accordion,
    AccordionTab,
  },
};
</script>

<style scoped>
.category:checked ~ label {
  color: rgb(143, 143, 167);
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion-tab {
  margin-bottom: 15px !important ;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}

::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
}
.category {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  /* color : pink; */
}
.accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.5) !important;
  border-radius: 8px 8px 0px 0px !important;
  /* border-color: #357DEA !important; */
  border: 1px solid #357dea !important;
}
</style>
