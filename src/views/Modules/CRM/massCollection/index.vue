<template >
  <div class="white" :key="reloadKey">
    <div class="flex justify-content-between align-items-center mb-2">
      <div class="mt-3 color-4e5968 bold-700 font-size-18 ml-3">
        Mass Collection Slips
      </div>
      <div class="flex">
        <div class="flex align-items-center m-2">
          <div class="flex m-1 font-size-14 bold-500 color-7a7a7a text-nowrap">
            Customer Priority :
          </div>
          <Dropdown
            class="
              dropdown-priority
              border-radius-4
              color-fff
              flex
              justify-content-center
            "
            v-model="selected"
            :options="value"
            optionLabel="name"
            placeholder="High"
          />
        </div>
        <div
          class="
            border-radius-5
            bg-b4efc0
            color-55ba6b
            pt-2
            px-4
            mx-2
            mt-1
            chargetype
          "
        >
          <h5
            class="
              color-7a7a7a
              bold-500
              flex
              justify-content-center
              font-size-14
              color-55ba6b
            "
          >
            Charge Type
          </h5>
          <DropDownField
            :disabled="$route.params.type == 'Contract' ? true : false"
            :key="renderChargeType"
            :value="chargeTypesSelected"
            code="name"
            :data="getChargeTypeDropDown"
            label="region_name"
            v-model="chargeTypesSelected"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div :key="renderKey" class="card-cusd-crm border-radius-18 pt-1">
      <div class="card m-3">
        <div class="flex card-container align-items-center indigo-container">
          <div @click="$router.go(-1)" class="flex flex-row ml-4 mr-4">
            <i
              class="pi pi-arrow-left color-fff pointer"
              style="font-size: 2rem color-fff"
            ></i>
          </div>
          <div class="flex align-items-center ml-4">
            <img class="h-3rem w-3rem mr-2" src="/images/car.png" alt="" />
          </div>
          <div
            class="
              flex-grow-1
              h-4rem
              text-white
              align-items-center
              justify-content-center
              font-size-14
              text-left
              pb-2
              mb-2
              border-round
            "
          >
            <div class="text-left pt-1 flex flex-column">
              <Dropdown
                class="text-left profile-drop-down w-100"
                v-model="customerDropdown"
                :options="customerIdAndCompanyNamesList"
                optionLabel="name"
                code="customer_id"
                :filter="true"
                :placeholder="
                  $route.params.type == 'Contract'
                    ? 'Company Contract Name'
                    : 'Profile Name'
                "
              />
            </div>
            <div
              v-if="getCrmBookingData?.customer_id"
              :class="getCrmBookingData?.customer_id ? 'pl-2' : 'hidden pl-2'"
              :key="reloadKey"
            >
              {{ getCrmBookingData?.customer_id }}
            </div>
          </div>

          <div class="flex align-items-center ml-4">
            <img class="h-3rem w-3rem mr-2" src="/images/avatar.png" alt="" />
          </div>
          <div
            class="
              flex-grow-1
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              pt-2
              pb-2
              border-round
            "
          >
            <div :key="renderKey">
              <CustomerDataCardCollerDropDown
                :emittedManual="DataSendtoAnotherChild"
              />
            </div>
          </div>
          <div
            class="
              flex-auto
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              p-4
              pt-2
              pb-2
              border-round
              mr-4
            "
          >
            <div class="text-left color-fff font-size-12 bold-600 pt-1">
              Contact Number
            </div>
            <div
              v-if="getCrmBookingData"
              class="text-left color-fff font-size-12 bold-600"
            >
              {{ getCrmBookingData?.contact_number }}
            </div>
          </div>
          <div
            class="
              flex-auto
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              p-4
              pt-2
              pb-2
              border-round
              mx-4
            "
          >
            <div class="text-left color-fff font-size-12 bold-600 pt-1">
              Email
            </div>
            <div
              v-if="getCrmBookingData"
              class="text-left color-fff font-size-12 bold-600 pl-0"
            >
              {{ getCrmBookingData?.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :key="renderKey">
      <Accordion :multiple="true" :activeIndex="TabControl" class="mx-2">
        <AccordionTab class="accordianIndex">
          <template #header>
            <span class="flex flex-grow-1 font-size-14 ml-2"
              >General Details</span
            >
          </template>
          <div class="flex flex-row formgrid grid col-12 p-0">
            <div
              v-if="$route.params.type == 'Contract'"
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Cost Center
                <b class="color-red ml-1"> &#42; </b>
              </h5>

              <Dropdown
                v-model="costCenterSelected"
                :options="costCenterDropdown"
                code="name"
                optionLabel="name"
                class="text-left w-100"
                :filter="true"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Customer Cost Center <b class="color-red ml-1"> &#42; </b>
              </h5>
              <AddNewDropDownTextField
                stateName="customerCostCenterDropdownData"
                :state="customerCostCenterSelected"
                :data="customerCostCenterDropDown"
                :companyDetails="getCrmBookingData"
                storePath="Masscollection"
                v-model="customerCostCenterSelected"
                class="text-left w-100 height-40"
                type="mass_collection"
                code="name"
                :optionClose="true"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5
                class="
                  color-7a7a7a
                  bold-500
                  font-size-14
                  indent
                  flex
                  justify-content-start
                "
              >
                Logistics Mode <b class="color-red pl-2"> &#42; </b>
              </h5>
              <Dropdown
                v-model="selectedLogistics"
                :options="getLogisticsList"
                optionLabel="name"
                class="text-left w-100"
              />
            </div>
            <div class="field col-3 md:col-3 flex align-items-end">
              <div class="flex align-item-center">
                <Buttons
                  button_class="w-100 bg-357dea buttonStyle"
                  label="Show Trips"
                  :disabled="false"
                  @click="enableDialog(selectedLogistics)"
                />
              </div>
              <div
                class="
                  flex-column flex-row
                  align-items-center
                  justify-content-center
                  font-bold
                  text-gray-900
                  border-round
                  ml-0
                  pl-0
                  w-full
                  pl-2
                "
              >
                <h5 class="color-7a7a7a bold-500 flex font-size-14">
                  Time & Date
                </h5>
                <div
                  class="
                    bg-white
                    flex flex-row
                    height-40
                    border border-round
                    align-items-center
                    pl-2
                  "
                >
                  {{ getModelTime(select_trips) }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex formgrid grid col-12 p-0 mb-2">
            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Job Type<b class="color-red ml-1"> &#42; </b>
              </h5>
              <Dropdown
                class="text-left w-100 height-40"
                v-model="jobTypesSelected"
                :options="JobTypeDropDown"
                optionLabel="name"
                :placeholder="jobTypesSelected?.job_type"
                :key="renderKey"
                :filter="true"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Document Detail Type <b class="color-red ml-1"> &#42; </b>
              </h5>
              <Dropdown
                class="text-left w-100"
                v-model="documentDetailType"
                :options="documentDetailTypeArray"
                optionLabel="name"
                :filter="true"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Contents<b class="color-red ml-1"> &#42; </b>
              </h5>
              <InputText v-model="contents" class="w-100" />
            </div>
          </div>
          <div
            class="flex flex-row formgrid grid pl-1"
            v-if="$route.params.type == 'Adhoc'"
          >
            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                px-0
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Payment Type
              </h5>

              <DropDownField
                :value="payment_mode"
                code="name"
                :data="paymentArray"
                label="payment_mode"
                v-model="payment_mode"
                :class="{
                  'inputfield w-full dialog-dropdown-text height-40': true,
                }"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <span class="flex justify-content-between">
                <h5 class="color-7a7a7a bold-500 flex font-size-14">Total</h5>
                <i
                  v-if="!enable_edit"
                  @click="enableCostEdit"
                  class="
                    align-self-center
                    fas
                    fa-pen
                    cursor-pointer
                    ml-2
                    font-size-14
                  "
                ></i
              ></span>
              <TextField
                :disabled="!enable_edit"
                label="profile_name"
                type="text"
                v-model="e_total_cost"
                @change="editTotalCost"
                @blur="disableCostEdit"
                :classes="{
                  'inputfield w-full dialog-dropdown-text col-7 w-100 height-40': true,
                }"
              />
            </div>

            <div
              class="
                flex-column flex-row
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                mb-2
                border-round
                field
                col-3
                md:col-3
              "
            >
              <h5 class="color-7a7a7a bold-500 flex font-size-14">Discount</h5>

              <div class="flex">
                <div class="w-full">
                  <DropDownField
                    :value="selectedCity"
                    code="name"
                    :data="cities"
                    label="customer_type"
                    v-model="selectedCity"
                    :class="{
                      'inputfield w-full dialog-dropdown-text height-40': true,
                    }"
                  />
                </div>
                <div class="w-full">
                  <TextField
                    :disabled="parseInt(cost) > 0 ? false : false"
                    label="profile_name"
                    type="text"
                    v-model="discountValue"
                    :classes="{
                      'inputfield w-full dialog-dropdown-text height-40': true,
                    }"
                  />
                </div>
                <div
                  @click="onChangeDiscount"
                  class="
                    width
                    flex
                    align-items-center
                    justify-content-center
                    col-1
                    cursor-pointer
                    bg-68C959
                    border-round
                    height-40
                  "
                >
                  <i class="color-fff pi pi-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab class="accordianIndex">
          <template #header>
            <span class="flex flex-grow-1 font-size-14 ml-2"
              >Bill Settings</span
            >
          </template>
          <keep-alive>
            <BillSettingAccordian
              :jobTypesSelected="jobTypesSelected"
              :documentDetailType="documentDetailType"
              :chargeType="chargeTypesSelected"
              @emittedManualData="updateData"
            />
          </keep-alive>
        </AccordionTab>
        <AccordionTab class="accordianIndex">
          <template #header>
            <span class="flex flex-grow-1 font-size-14 ml-2">Job Settings</span>
          </template>
          <keep-alive>
            <JobSettingAccordian
              :chargeType="chargeTypesSelected"
              :selectedLogistics="selectedLogistics"
            />
          </keep-alive>
        </AccordionTab>
      </Accordion>
    </div>
    <keep-alive>
      <TemplateUploader @emittedtabdata="accordianController" />
    </keep-alive>
  </div>
  <Dialog
    v-model:visible="display"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '85vw' }"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="bold-600 font-size-18">Trips</h4>
        </div>
        <div v-if="dialogOption == ''" class="flex mr-3">
          <div class="flex flex-column ml-3 p-0 mr-3">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Created On</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">{{ date }}</p>
          </div>
          <img
            :src="this.$store.state.commonStore.userDetails?.profile_url ?? ''"
            alt="img"
            width="40"
          />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0 font-size-14 color-7e84a7">Sales person</p>
            <p class="m-0 p-0 font-size-12 color-4e5968">
              {{ this.$store.state.commonStore.loggedInUser ?? "" }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <div class="flex flex-row card-container blue-container">
      <div
        class="
          flex
          align-items-start
          justify-content-start
          min-height-50
          font-bold
          text-white
          border-round
          mr-1
          ml-3
        "
      >
        <Calendar
          v-model="dateValueCalendar"
          dateFormat="mm-dd-yy"
          :inline="true"
          :showWeek="true"
          class="w-100"
        />
      </div>
      <div
        class="
          flex flex-grow-1
          align-items-start
          justify-content-start
          w-100
          font-bold
          text-white
          border-round
          mx-1
        "
      >
        <div class="flex flex-column card-container">
          <div
            class="
              flex
              align-items-start
              justify-content-start
              font-bold
              text-white
              border-round
            "
          >
            <div class="bg-edf1f7">
              <CheckedTableData
                :key="products"
                @selectedRows="selectedRows"
                formTableDataName="rapidoCallDataRow"
                :selectionModeState="selectionModeState"
                dataKey="id"
                :tableData="rapidoCallData ?? []"
                :tableColumns="tableColumnData"
                storePath="CustomerLaunchStore"
              />
            </div>
          </div>
          <ContractTripTableCard
            v-if="$route.params.type != 'Adhoc'"
            @emittedTimeState="emittedTimeState"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="dialog-button-text"
        @click="clickedCancel"
      />
      <Buttons
        label="Add"
        button_class="dialog-button-text"
        @click="clickedAdd"
      />
    </template>
  </Dialog>
  <Toast
    :severity="$store.state['Masscollection'].toastData.severity"
    :summary="$store.state['Masscollection'].toastData.summary"
  />
</template>

<script>
import JobSettingAccordian from "./JobsettingAccordian.vue";
import BillSettingAccordian from "./BillSettingAccordian.vue";
import TemplateUploader from "./TemplateUploader.vue";
import { mapActions, mapGetters } from "vuex";
import Dialog from "primevue/dialog";
import moment from "moment";
import Toast from "../StandardCollectionSlips/components/Toast.vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { ContractTripTable } from "../../../../components/Reusables/CRM/Const";
import CheckedTableData from "../../../../components/Reusables/CRM/AccordianComponents/CheckedTable.vue";
import ContractTripTableCard from "../../../../components/Reusables/CRM/AccordianComponents/ContractTripTableCard.vue";
import CustomerDataCardCollerDropDown from "../CustomerLaunch/CustomerDataCardCollerDropDown.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { crmCusLState, crm_launch } from "../../../../store/modules/CRM/helper";
export default {
  name: "contract",
  components: {
    Accordion,
    AccordionTab,
    Dialog,
    CheckedTableData,
    ContractTripTableCard,
    CustomerDataCardCollerDropDown,
    Dropdown,
    InputText,
    BillSettingAccordian,
    JobSettingAccordian,
    TemplateUploader,
    Toast,
  },
  data() {
    return {
      reloadKey: 10,
      renderChargeType: 10,
      TabControl: 0,
      value: [{ name: "High" }, { name: "Low" }],
      costCenterDropdown: [],
      customerCostCenterDropDown: [
        {
          items: [],
        },
      ],
      addNewDropDownDataCustomerCostCenter: [],
      customerDropdown: [],
      BookingID: null,
      selectedTime: "",
      customerId: "",
      contractId: "",
      customerDropdownSelected: "",
      selected: "",
      costCenterSelected: "",
      customerCostCenterSelected: "",
      jobTypesSelected: null,
      JobTypeDropDown: [],
      documentDetailType: null,
      documentDetailTypeArray: [],
      selectedLogistics: null,
      // TimeAndData: "",
      clearance_mode_name: "",
      uploadType: "",
      contents: "",
      payment_type: "",
      e_total_cost: "",
      cost: "",
      totalCost: "",
      discount: "",
      meeting_type: "",
      chargeTypesSelected: "Normal",
      enable_edit: false,
      editDialog: null,
      coupon_data: null,
      discountValue: "",
      selectedCity: "Coupon",
      payment_mode: "Online",
      paymentArray: [
        { id: 1, name: "Online", code: "Online" },
        { id: 2, name: "Phone Booking", code: "Phone Booking" },
      ],
      cities: [
        { name: "Coupon", code: "Coupon" },
        { name: "Percentage", code: "Percentage" },
        { name: "Fixed", code: "Fixed" },
      ],
      MeetingTypeData: [
        { name: "Internal", code: 1 },
        { name: "External", code: 2 },
      ],
      getChargeTypeDropDown: [
        { name: "Normal", code: 1 },
        { name: "E-Commerce", code: 2 },
      ],
      products: [
        {
          trip_no: 1,
          from: "from data",
          to: "to data",
          cust_from: "cust from",
          cust_to: "cust to",
          trip_days: "days",
          trip_type: "types",
        },
        {
          trip_no: 2,
          from: "from data",
          to: "to data",
          cust_from: "cust from",
          cust_to: "cust to",
          trip_days: "days",
          trip_type: "types",
        },
      ],
      //dialog
      display: false,
      select_trips: null,
      DateValueCalendar: null,
      filterValue: [],
      tableColumnData: ContractTripTable,
      //caller dropdown
      DataSendtoAnotherChild: null,
    };
  },
  computed: {
    ...crmCusLState,
    ...mapGetters({
      getcostCenterDropdownData: "Masscollection/getcostCenterDropdownData",
      getCustomerCostCenterDropdownData:
        "Masscollection/getCustomerCostCenterDropdownData",
      getJobDetailsType: "CustomerLaunchStore/getJobDetailsType",
      customerIdAndCompanyNamesList:
        "Masscollection/getCustomerIdAndCompanyNameData",
      getCrmBookingData: "Masscollection/getCrmBookingData",
      getRapidoCallTrips: "CustomerLaunchStore/getRapidoCallData",
      getJobTypeDropDown: "CustomerLaunchStore/getJobTypeDropDown",
      massCollectionPayloadData: "Masscollection/massCollectionPayloadData",
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",

      //
      getCustomerNameDropDown: "CustomerLaunchStore/CustomerNameDropDown",
      getselectedCostCenter: "CustomerLaunchStore/getselectedCostCenter",
      getsurchargeDropDownListData:
        "CustomerLaunchStore/getsurchargeDropDownListData",
      getJobDetailsArrayList: "CustomerLaunchStore/getJobDetailsArrayList",
      getCustomerContactDropDown: "CustomerLaunchStore/CustomerContactDropDown",
    }),
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      loadCustomerIdAndCompanyNameDetails:
        "Masscollection/getAllCustomerIdAndCompanyNameData",
      getCrmBookingDetails: "Masscollection/getCrmBookingDetails",
      postSelectedCostCenter: "Masscollection/postSelectedCostCenter",
      patchCrmBookingDetails: "Masscollection/patchCrmBookingDetails",
      loadCostCenterDropdownData: "Masscollection/loadCostCenterDropdownData",
      loadCustomerCostCenterDropdownData:
        "Masscollection/loadCustomerCostCenterDropdownData",
      assignRapidoCallTrips: "CustomerLaunchStore/getRapidoCallTrips",
      getJobTypeDropDownList: "CustomerLaunchStore/getJobTypeDropDownList",
      getJobDetailsTypeDropDownList:
        "CustomerLaunchStore/getJobDetailsTypeDropDownList",
      getJobPriorityListDropDownApi:
        "CustomerLaunchStore/getJobPriorityListDropDownApi",
      couponSetting: "CustomerLaunchStore/couponSetting",
      getCrmCollerDropDown: "CustomerLaunchStore/getCrmCollerDropDown",
      //

      updateBookingListById: "CustomerLaunchStore/updateBookingListById",
      deleteCrmBookingDetails: "CustomerLaunchStore/deleteCrmBookingDetails",
    }),
    //dialogs
    accordianController(value) {
      if (value?.length != 0) {
        this.TabControl = "";
      } else {
        this.TabControl = 0;
      }
    },
    getModelTime(e) {
      let date = "";
      if (e != null) {
        date = moment(e?.c_data).format("YYYY/MM/DD");
        date = `${date} (${e.cus_from_time} - ${e.cus_to_time})`;
      }
      this.selectedTime_pri = date;
      return date ?? "";
    },
    async enableDialog(e) {
      this.Trips = await this.assignRapidoCallTrips({ type: e?.logistic_mode });
      this.display = true;
    },
    selectedRows(e) {
      this.select_trips = e;
    },
    clickedAdd() {
      this.display = false;
      this.select_trips["c_data"] = this.dateValueCalendar?.toLocaleString();
      this.editDialog = this.select_trips;
    },
    clickedCancel() {
      if (this.editDialog == null) {
        this.display = false;
        this.select_trips = null;
        this.selectedTime = "";
      } else {
        this.display = false;
        this.select_trips = this.editDialog;
        this.selectedTime = "";
      }
    },

    emittedTimeState(val) {
      if (val.from_date) {
        let date = val.from_date;
        // this.selectedTime = moment(date).format("DD/MM/YYYY, hh:mm A");
        this.selectedTime = val.from_date;
      } else {
        this.selectedTime = "";
      }
    },
    updateData(value) {
      this.patchCrmBookingDetails(value);
    },
    //
    loadCustomerDetails() {
      let payload = {};
      if (this.$route.params.type == "Contract") {
        payload = {
          business_type: "Contract",
          customer_type: "Express",
        };
      } else if (this.$route.params.type == "Adhoc") {
        payload = {
          business_type: "Adhoc",
          customer_type: "Express",
        };
      }
      this.loadCustomerIdAndCompanyNameDetails(payload);
    },
    prefillData(data) {
      this.selected = data?.priority || this.selected || "";
      this.cost = data?.total_cost ?? "";
      this.totalCost = this.cost;

      if (data?.discount_via == "percentage") {
        this.discount = data?.discount_value ? `${data.discount_value} %` : "";
        let dis_count = this.getPercntage(this.cost, data?.discount_value);
        this.totalCost = dis_count != "NaN" ? this.cost - dis_count : this.cost;
      } else {
        this.discount = data?.discount_value
          ? `${data?.discount_value} $`
          : "0";
        let dis_count = this.getRate(this.cost, data?.discount_value);
        this.totalCost = dis_count ? dis_count : this.cost;
      }

      this.chargeTypesSelected =
        data?.charge_type || this.getChargeTypeDropDown[0].name;
      this.renderChargeType++;
    },
    async book(newValue) {
      let data = {};
      if (this.$route.params.type == "Contract") {
        data = {
          booking_type: "Express",
          customer_type: this.$route.params.type,
          cost_center_name: newValue?.cost_center_name,
          cost_center_id: newValue?.id,
          customer_id: this.customerId,
          contract_id: this.contractId,
          id: this.BookingID,
        };
      } else {
        data = {
          booking_type: "Express",
          customer_type: this.$route.params.type,
          charge_type: "Normal",
          customer_id: newValue?.quotation_profile[0]?.customer_id,
          profile_id: newValue?.id,
          id: this.BookingID,
        };
      }
      if (this.BookingID == null) {
        await this.postSelectedCostCenter(data).then((c) => {
          if (c?.status == 200) {
            this.BookingID = Number(c.data.results?.id);
            this.getCrmBookingDetails(c.data.results?.id).then((g) => {
              if (this.$route.params.type == "Adhoc") {
                let pay = `profile_id=${this.contractId}`;
                this.loadCustomerCostCenterDropdownData(pay);
                let type = this.$route.params.type;
                this.getCrmCollerDropDown({ type, id: this.contractId });
              } else {
                let pay = `contractId=${this.contractId}`;
                this.loadCustomerCostCenterDropdownData(pay);
                let type = this.$route.params.type;
                this.getCrmCollerDropDown({ type, id: this.contractId });
              }
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "error",
              detail: `${c.data.message}`,
              life: 5000,
            });
          }
        });
      } else {
        this.patchCrmBookingDetails(data).then((c) => {
          if (c?.status != 200) {
            this.$toast.add({
              severity: "error",
              summary: "error",
              detail: `${c.data.message}`,
              life: 5000,
            });
          } else {
            if (this.$route.params.type == "Adhoc") {
              let pay = `profile_id=${this.contractId}`;
              this.loadCustomerCostCenterDropdownData(pay);
              let type = this.$route.params.type;
              this.getCrmCollerDropDown({ type, id: this.contractId });
            } else {
              let type = this.$route.params.type;
              this.getCrmCollerDropDown({ type, id: this.contractId });
            }
          }
        });
      }
    },
    //Payment and Discount
    getPercntage(cost, value) {
      let dis_count = ((parseFloat(cost) / 100) * parseFloat(value)).toFixed(2);
      return dis_count;
    },
    enableCostEdit() {
      this.enable_edit = !this.enable_edit;
      this.e_total_cost = this.totalCost;
    },
    disableCostEdit() {
      this.enable_edit = !this.enable_edit;
      this.totalCost = this.e_total_cost;
    },
    getRate(cost, value) {
      let dis_count =
        parseFloat(cost).toFixed(2) - parseFloat(value).toFixed(2);
      return dis_count;
    },
    editTotalCost() {
      this.enable_edit = !this.enable_edit;
      this.discount = "0 $";
      this.cost = this.e_total_cost;
      this.totalCost = this.e_total_cost;
      let data = {
        total_cost: this.cost,
      };
      this.$emit("emittedManual", data);
    },
    async onChangeDiscount(e) {
      if (this.selectedCity == "Percentage") {
        this.discount = this.discountValue ? `${this.discountValue} %` : "0 $";
        let dis_count = this.getPercntage(this.cost, this.discountValue);
        this.totalCost = dis_count != "NaN" ? this.cost - dis_count : this.cost;
      }
      if (this.selectedCity == "Fixed") {
        this.discount = this.discountValue ? `${this.discountValue} $` : "0 $";
        let dis_count = this.getRate(this.cost, this.discountValue);
        this.totalCost = dis_count ? dis_count : this.cost;
      }
      if (this.selectedCity == "Coupon") {
        let payload = {
          coupon_code: this.discountValue,
          business: "Express",
          payment_mode: this.payment_mode,
          total_cost: this.cost,
        };
        let g_data = await this.couponSetting({
          payload: payload,
          toast: this.$toast,
        });
        this.coupon_data = g_data;
        if (g_data?.unit == "percentage") {
          this.discount = `${g_data?.discount} %`;
          let dis_count = this.getPercntage(this.cost, g_data?.discount);
          this.totalCost =
            dis_count != "NaN" ? this.cost - dis_count : this.cost;
        } else {
          this.discount = `${g_data?.discount} $`;
          let dis_count = this.getRate(this.cost, g_data?.discount);
          this.totalCost = dis_count ? dis_count : this.cost;
        }
      }
      let data = {
        id: Number(this.getCrmBookingData?.id),
        payment_method: this.payment_mode,
        discount_via: this.selectedCity,
        discount_value: this.discountValue,
        coupon: this.selectedCity == "Coupon" ? true : false,
        coupon_value: this.coupon_data?.coupon_code ?? "",
        coupon_id: Number(this.coupon_data?.id) ?? "",
        total_cost: Number(this.cost),
        job_type: this.jobTypesSelected?.name,
        job_type_id: Number(this.jobTypesSelected?.id),
        document_detail_type: this.documentDetailType?.name,
        document_detail_type_id: Number(this.documentDetailType?.id),
      };
      this.patchCrmBookingDetails(data);
    },
  },
  async created() {
    this.reloadKey++;
    this.loadCustomerDetails();
    await this.getJobTypeDropDownList();
    this.jobTypesSelected = this.getJobTypeDropDown
      ? this.getJobTypeDropDown[0]
      : null;
    this.selectedJobType = { ...this.jobTypesSelected };
    this.e_total_cost = this.cost;
  },
  unmounted() {
    this.$store.state.Masscollection.crmBookingDetailsArray = null;
    this.customerIdAndCompanyNamesList = null;
    this.customerDropdown = null;
    this.BookingID = null;
  },
  watch: {
    $route(to, from) {
      // ************ This CODE NEEDED ****************
      // this.$store.state.Masscollection.crmBookingDetailsArray = null;
      // this.customerIdAndCompanyNamesList = null;
      // this.customerDropdown = null;
      // this.BookingID = null;
      // this.loadCustomerDetails();
      // this.reloadKey++;
      if (to.name == "massCollectionContract" && to.params.type == "Adhoc") {
        this.$router.go();
      } else if (
        to.name == "massCollectionContract" &&
        to.params.type == "Contract"
      ) {
        this.$router.go();
      }
    },
    getLogisticsList: function (newList, oldList) {
      if (newList != oldList) {
        this.selectedLogistics = this.getLogisticsList
          ? this.getLogisticsList[0]
          : null;
      }
    },
    chargeTypesSelected: function () {
      let data = {
        id: this.getCrmBookingData?.id,
        charge_type: this.chargeTypesSelected,
      };
      this.patchCrmBookingDetails(data);
      if (this.chargeTypesSelected != "Normal") {
        this.getJobPriorityListDropDownApi();
      }
    },
    getJobDetailsType: function (newList, oldList) {
      if (newList[0]?.name !== null) {
        this.documentDetailTypeArray = newList;
        this.documentDetailType = this.getJobDetailsType[0];
      } else {
        this.documentDetailTypeArray = [];
        this.documentDetailType = null;
      }
    },
    getJobTypeDropDown: function (newList, oldList) {
      this.jobTypesSelected = this.getJobTypeDropDown
        ? this.getJobTypeDropDown[0]
        : null;
      this.getJobTypeDropDown.map((list) => {
        if (list.name == "Delivery" || list.name == "Collection") {
          this.JobTypeDropDown.push(list);
        }
      });
    },
    documentDetailType: function (newValue, old) {
      this.contents = newValue?.delivery_document;
    },
    contents: function (newValue, old) {
      this.massCollectionPayloadData["delivery_document"] = this.contents;
    },
    customerDropdown: function (newValue, old) {
      if (this.customerDropdown?.id) {
        let type = this.$route.params.type;
        if (type == "Contract") {
          this.loadCostCenterDropdownData(newValue.id);
          let pay = `contractId=${newValue.id}`;
          this.loadCustomerCostCenterDropdownData(pay);
        } else if (type == "Adhoc") {
          this.book(newValue);
        }

        this.customerId = newValue.customer_id;
        this.contractId = newValue.id;
      }
    },
    costCenterSelected: function (newValue, old) {
      this.book(newValue);
    },
    customerCostCenterSelected: function (newValue, old) {
      let data = {
        customer_cost_center_name: newValue?.name,
        customer_cost_center_id: newValue?.code,
        id: this.BookingID,
      };
      if (this.BookingID != null) {
        this.patchCrmBookingDetails(data);
      }
    },
    jobTypesSelected: async function (newVal, oldVal) {
      this.jobTypesSelected = newVal;
      this.selectedJobType = { ...newVal };
      if (newVal?.id !== oldVal?.id) {
        let newId = newVal?.id;
        await this.getJobDetailsTypeDropDownList(newId);
      }
      this.massCollectionPayloadData["job_type"] = newVal.name;
    },

    select_trips: function (newVal, oldVal) {
      this.massCollectionPayloadData["time_date"] = this.getModelTime(
        this.select_trips
      );
    },
    //
    "$store.state.Masscollection.costCenterDropdownData": function () {
      this.costCenterDropdown = this.getcostCenterDropdownData;
      this.costCenterSelected = this.costCenterDropdown
        ? this.costCenterDropdown[0]
        : null;
    },
    "$store.state.Masscollection.customerCostCenterDropdownData": function () {
      this.customerCostCenterDropDown = this.getCustomerCostCenterDropdownData;
      let customerPrefill = this.customerCostCenterDropDown[0].items;

      this.customerCostCenterSelected = this.customerCostCenterDropDown[0]
        ?.items[0]?.name
        ? this.customerCostCenterDropDown[0]?.items[0]
        : null;
    },
    "$store.state.Masscollection.crmBookingDetailsArray": function () {
      if (this.getCrmBookingData?.id) {
        this.prefillData(this.getCrmBookingData);
      }
    },
  },
};
</script>

<style scoped>
.white {
  background-color: #ffffff;
}
::v-deep .card {
  background-color: transparent;
  border-radius: 0.25rem;
  border: none !important;
}

::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  font-size: 14px;
  text-align: left !important;
}
.card-cusd-crm {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  /* min-height: 13vh; */
}
.dropdown-priority {
  background: #ff5555 !important;
  color: #fff !important;
  width: 80% !important;
}
::v-deep .p-inputtext-lg .p-inputtext {
  font-weight: 400 !important;
}
.crm_express_screen_width {
  max-width: 1600px !important;
}
::v-deep .dropdown-priority .p-dropdown-label.p-inputtext.p-placeholder {
  color: #fff !important;
  font-size: 14px;
  display: flex !important;
  justify-content: center !important;
}
::v-deep .dropdown-priority .p-dropdown-label.p-inputtext {
  color: #fff !important;
  font-size: 14px;
  display: flex !important;
  justify-content: center !important;
}
::v-deep .dropdown-priority .p-dropdown-trigger .pi-chevron-down:before {
  color: #ffffff !important;
}
::v-deep.p-accordion
  .p-accordion-header
  .p-accordion-header-link
  .p-accordion-toggle-icon {
  position: absolute;
  right: 10px;
}
::v-deep
  .p-accordion
  .p-accordion-tab:first-child
  .p-accordion-header
  .p-accordion-header-link {
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  border: 1px solid #dee2e6;
  color: #4e5968 !important ;
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion-header-text {
  line-height: 1;
  font-size: 16px !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight:hover
  .p-accordion-header-link {
  border-color: #d0e0ff !important;
  background: #d0e0ff !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link {
  background: #d0e0ff !important;
  border-color: #d0e0ff;
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep
  .p-accordion
  .p-accordion-tab:last-child
  .p-accordion-header:not(.p-highlight)
  .p-accordion-header-link:hover {
  background: #d0e0ff !important;
}

::v-deep .p-accordion .p-accordion-tab:last-child .p-accordion-content {
  background: #f3f7ff;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link:hover {
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep .pi-trash:before {
  color: red;
}
::v-deep .p-accordion .p-accordion-content {
  padding: 1rem;
  border: 1px solid #dee2e6;
  background: #ecf2ff;
  color: #7a7a7a;
}
.chargetype {
  background: #b4efc0;
  color: #66c11e;
}
::v-deep .chargetype .p-dropdown {
  background: #b4efc0;
  border: none;
}
.buttonStyle {
  flex-wrap: nowrap !important;
  width: 120px !important;
  height: 40px !important;
}
.calenderStyle {
  width: 350px !important;
}
.profile-drop-down {
  width: 235px !important;
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  border: none !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-label {
  color: white !important;
}
.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: white !important;
}
.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: white !important;
}
::v-deep .border {
  border: 1px solid #ced4da !important;
}
::v-deep .p-datatable table {
  border-collapse: collapse;
  min-width: 100%;
  table-layout: fixed;
  width: 100% !important;
}
::v-deep .p-accordion .p-accordion-tab .p-accordion-content {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 10px !important;
}
.width {
  width: 30px !important;
}
</style>