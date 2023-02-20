<template :key="renderKey">
  <Card class="m-4 crm_express_screen_width">
    <template #content>
      <PriorityComponent
        :key="renderKey"
        :gerCrmBookingData="gerCrmBookingData"
        @emittedPriority="emittedPriority"
        @emittedPriorityBook="emittedPriorityBook"
        @emittedManual="emittedManual"
      />
      <div
        :key="renderKey"
        class="card-cusd-crm flex border-radius-18 pt-1 ml-3"
      >
        <div class="card m-3">
          <div class="flex card-container align-items-center indigo-container">
            <div @click="$router.go(-1)" class="flex flex-row ml-4 mr-4">
              <i
                @click="back()"
                class="pi pi-arrow-left color-fff pointer"
                style="font-size: 2rem color-fff"
              ></i>
            </div>
            <div class="flex align-items-center ml-4">
              <img class="h-3rem w-3rem mr-2" src="/images/car.png" alt="" />
            </div>
            <Dropdown
              :key="crmProfileName"
              class="text-left profile-drop-down mr-7"
              :options="StandardCollectionSlipCompanyNameDropDown"
              optionLabel="profile_name"
              v-model="crmProfileName"
              :filter="true"
              @change="onChangeProfileName"
              :placeholder="
                crmProfileName?.profile_name
                  ? crmProfileName?.profile_name
                  : 'Profile Name'
              "
            />

            <!-- <div
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
              <div
                v-if="gerCrmBookingData.customer_details"
                class="text-left color-fff font-size-12 bold-600 pt-1"
              >
            temperaly  
            <DropDown
        :key="renderKey"
        :value="select_cus_id"
        code="name"
        :data="customer_d_data"
        :filter="true"
        label="Customer Id"
        v-model="select_cus_id"
        :class="{
          'inputfield w-full dialog-dropdown-text bg-transparent border-transparent cus-dropDown': true,
        }"
      /> -->
            <!-- {{ gerCrmBookingData.customer_details.customer_id }} -->
          </div>
          <!-- <div
            v-if="gerCrmBookingData.customer_details"
            class="text-left color-fff font-size-12 bold-600"
          >
            {{ gerCrmBookingData.customer_details.profile_name }}
          </div> -->
        </div>

        <!-- <div class="flex align-items-center ml-4">
              <img
                class="h-2rem w-2rem mr-2"
                src="/images/avatarThree.png"
                alt=""
              />
            </div> -->
        <!-- <Dropdown
              v-model="selectedCity1"
              :options="cities"
              optionLabel="name"
              optionValue="code"
              placeholder="Select a City"
              class="w-4"
            /> -->

        <div :key="renderKey" class="caller-drop-down">
          <CustomerDataCardCollerDropDown
            :key="renderKey"
            :emittedManual="DataSendtoAnotherChild"
          />
        </div>

        <!-- <div
              class="
                flex-auto
                h-4rem
                text-white
                align-items-center
                font-bold
                text-center
                pt-2
                pb-2
                border-round
                mr-4
              "
            >
              <div class="text-left color-fff font-size-12 bold-600 pt-1">
                Caller
              </div>
              <div
                v-if="gerCrmBookingData.caller_details"
                class="text-left color-fff font-size-12 bold-600"
              >
                {{ gerCrmBookingData.caller_details.name }}
              </div>
            </div> -->

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
            v-if="gerCrmBookingData.contact_number"
            class="text-left color-fff font-size-12 bold-600"
          >
            {{ gerCrmBookingData.contact_number }}
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
            v-if="gerCrmBookingData.email"
            class="text-left color-fff font-size-12 bold-600 pl-0"
          >
            {{ gerCrmBookingData.email }}
          </div>
        </div>
      </div>
      <!-- </div>
      </div> -->

      <div class="flex justify-content-around mt-3">
        <!-- <div
          class="
            flex-column flex-grow-1 flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-14 flex bold-500 w-25rem">
            Cost Center <b class="color-red ml-1"> &#42; </b>
          </h5>
          <Dropdown
            class="text-left w-100"
            v-model="costCenterSelected"
            :options="costCenterDropdown"
            optionLabel="name"
            placeholder="Cost Center Name"
          />
        </div> -->

        <div
          v-if="$route.params.type != 'Adhoc'"
          class="
            flex-column flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
            w-25rem
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Cost Center
            <b class="color-red ml-1"> &#42; </b>
          </h5>

          <Dropdown
            class="text-left w-100"
            :disabled="$route.params.type == 'Adhoc' ? true : false"
            v-model="costCenterSelected"
            :options="costCenterDropdown"
            optionLabel="name"
            placeholder="Cost Center Name"
          />
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
            w-25rem
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Customer Cost Center
            <b class="color-red ml-1"> &#42; </b>
          </h5>
          <AddNewDropDown
            stateName="customerCostCenterDropDownList"
            :state="details.clearance_mode_name"
            :data="
              $store.state.CustomerLaunchStore.customerCostCenterDropDownList
            "
            :placeholder="'Customer Cost Center'"
            :companyDetails="gerCrmBookingData"
            storePath="internationalInbound"
            v-model="details.clearance_mode_name"
            class="text-left w-100"
            :paramData="paramData"
            @deleteFromNewDrop="deleteFromNewDropdown"
          />
        </div>

        <div
          class="
            flex-column
            w-25rem
            flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Job Type<b class="color-red ml-1"> &#42; </b>
          </h5>
          <Dropdown
            class="text-left"
            v-model="jobTypesSelected"
            :options="getJobTypeDropDown"
            optionLabel="name"
            :placeholder="jobTypesSelected?.job_type"
            :key="renderKey"
          />
        </div>
        <!-- <div
          class="
            flex-column
            w-25rem
            flex-grow-1 flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mt-2
            mb-2
            border-round
            w-25rem
          "
        >
          <h5 class="color-7a7a7a font-size-14 flex bold-500 text-nowrap">
            Document Deail Type <b class="color-red ml-1"> &#42; </b>
          </h5>
          <Dropdown
            class="text-left"
            v-model="documentDetailType"
            :options="documentDetailTypeArray"
            optionLabel="name"
            placeholder=""
          />
        </div> -->
        <div
          class="
            flex-column
            w-25rem
            flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
            my-0
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Document Detail Type
            <b class="color-red ml-1"> &#42; </b>
          </h5>
          <Dropdown
            class="text-left"
            v-model="documentDetailType"
            :options="documentDetailTypeArray"
            optionLabel="name"
            :placeholder="documentDetailType?.document_detail_type"
          />
        </div>
      </div>

      <!-- <div class="flex justify-content-around">
        <div
          class="
            flex-column
            w-4rem
            flex-grow-1 flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mt-2
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-14 flex bold-500">
            Document Deail Type <b class="color-red ml-1"> &#42; </b>
          </h5>
          <Dropdown
            class="text-left"
            v-model="documentDetailType"
            :options="documentDetailTypeArray"
            optionLabel="name"
            placeholder=""
          />
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mt-4
            mb-2
            border-round
          "
        ></div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-center
            justify-content-center
            font-bold
            text-gray-900
            px-3
            mt-4
            mb-2
            border-round
          "
        ></div>
      </div> -->

      <AccordianComponent
        :jobTypesSelected="jobTypesSelected"
        :costCenterSelected="costCenterSelected"
        @emittedManual="emittedManual"
        :selectedJobType="selectedJobType"
        :documentDetailType="documentDetailType"
        :getLogisticsList="getLogisticsList"
        @emitedInitially="emitedInitially"
        @updateSection="updateSection"
        :paramData="paramData"
        :key="renderKey"
      />
      <div>
        <jobCost :key="updatejobcost" @emittedManual="emittedManual" />
      </div>
      <div class="flex flex-row justify-content-between my-4 mx-2">
        <div class="flex mx-2 bg-red-500 justify-content-start">
          <Buttons
            label="Previous"
            button_class="buttonClass-customer-launch bold-700 bg-fff color-357dea"
            @click="clickedPrev()"
          />
        </div>
        <div class="flex flex-row">
          <div class="flex mx-2">
            <Buttons
              label="Cancel"
              button_class="buttonClass-customer-launch bold-700 bg-fff color-357dea"
              @click="cancelBooking()"
            />
          </div>

          <div class="flex mx-2">
            <Buttons
              label="Book"
              button_class="dialog-button-text"
              @click="bookNew()"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>

  <Dialog v-model:visible="display">
    <template #header>
      <h3>Header</h3>
    </template>

    Content

    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>
<script>
import Card from "primevue/card";
import PriorityComponent from "../../../../components/Reusables/CRM/PriorityComponent.vue";
import Dropdown from "primevue/dropdown";
import AccordianComponent from "../AccordianView/AccordianComponent.vue";
import jobCost from "../../../../components/Reusables/CRM/jobCost.vue";
import { mapActions, mapGetters } from "vuex";
import AddNewDropDown from "../../../../components/Reusables/CRM/AddNewDropDown.vue";
import CustomerDataCardCollerDropDown from "./CustomerDataCardCollerDropDown.vue";
import { crmCusLState, crm_launch } from "../../../../store/modules/CRM/helper";
export default {
  name: "CustomerDataCard",
  components: {
    Card,
    Dropdown,
    PriorityComponent,
    AccordianComponent,
    jobCost,
    AddNewDropDown,
    CustomerDataCardCollerDropDown,
  },
  data() {
    return {
      updatejobcost: 0,
      booking_date: "",
      selected: "name",
      select_cus_id: "",
      value: [{ name: "High" }, { name: "Low" }],
      selectedid: "name",
      id: [{ name: "CID000123" }, { name: "CID000123" }],
      jobCostContent: false,
      selectedCity: null,
      customerIdValue: "",
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      DataSendtoAnotherChild: null,
      costCenterSelected: null,
      customerCostCenterSelected: null,
      costCenterDropdown: [],
      jobTypesSelected: null,
      jobTypesDropdown: [],
      selectedJobType: {},
      jobTypeArray: [],
      documentDetailType: null,
      documentDetailTypeArray: [],
      renderKey: 10,
      details: {
        clearance_mode_name: "",
      },
      updateData: {},
      initialDataSet: {},
      priorityValue: "",
      BookedValue: null,
      display: true,
      crmProfileName: null,
      paramData: "",
    };
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      getJobTypeDropDownList: "CustomerLaunchStore/getJobTypeDropDownList",
      getCostCenterDropDownList:
        "CustomerLaunchStore/getCostCenterDropDownList",
      getJobDetailsTypeDropDownList:
        "CustomerLaunchStore/getJobDetailsTypeDropDownList",
      getCustomerCostCenterDropDownList:
        "CustomerLaunchStore/getCustomerCostCenterDropDownList",
      getLogisticsListDropDownApi:
        "CustomerLaunchStore/getLogisticsListDropDownApi",
      getJobPriorityListDropDownApi:
        "CustomerLaunchStore/getJobPriorityListDropDownApi",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      getSurchargeDropDownList: "CustomerLaunchStore/getSurchargeDropDownList",
      updateBookingListById: "CustomerLaunchStore/updateBookingListById",
      deleteCrmBookingDetails: "CustomerLaunchStore/deleteCrmBookingDetails",
      patchCrmCollerData: "CustomerLaunchStore/patchCrmCollerData",
      postStandardCollectionSlipCompanyNameDropDown:
        "CustomerLaunchStore/postStandardCollectionSlipCompanyNameDropDown",
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
      patchSelectedCostCenter: "CustomerLaunchStore/patchSelectedCostCenter",
      getCrmCollerDropDown: "CustomerLaunchStore/getCrmCollerDropDown",
      getCustomerNameDropDownList:
        "CustomerLaunchStore/getCustomerNameDropDownList",
    }),
    updateSection() {
      this.updatejobcost++;
    },
    async emittedManual(data) {
      let values;
      if (typeof this.jobTypesSelected == "string") {
        values = this.jobTypesSelected;
      } else if (typeof this.jobTypesSelected == "object") {
        values = this.jobTypesSelected.job_type;
      }

      this.updateData = {
        id: this.gerCrmBookingData ? this.gerCrmBookingData.id : "",
        booking_type: this.gerCrmBookingData
          ? this.gerCrmBookingData.booking_type
          : "",
        customer_type: this.gerCrmBookingData
          ? this.gerCrmBookingData.customer_type
          : "",
        charge_type_id: 1,
        document_detail_type: this.getJobDetailsType
          ? this.getJobDetailsType[0]?.document_details
          : "",
        document_detail_type_id: this.getJobDetailsType
          ? Number(this.getJobDetailsType[0]?.id)
          : null,
        // job_type: this.getJobTypeDropDown
        //   ? this.getJobTypeDropDown[0].job_type
        //   : "",
        job_type: values,

        job_type_id: this.getJobTypeDropDown
          ? Number(this.getJobTypeDropDown[0]?.id)
          : null,
        cost_center_name: this.getCostCenterDropDown
          ? this.getCostCenterDropDown[0]?.name
          : "",
        cost_center_id: this.getCostCenterDropDown
          ? this.getCostCenterDropDown[0]?.id
          : null,
        // company_name_DropDown: this.getCustomerNameDropDown
        //   ? this.getCustomerNameDropDown[0]?.customer_name
        //   : null,
        // company_contact_DropDown: this.getCustomerContactDropDown
        //   ? this.getCustomerContactDropDown[0]?.customer_contact
        //   : null,
        customer_cost_center_id: this.getCustomerCostCenterDropDown
          ? this.getCustomerCostCenterDropDown[0]?.id
          : null,
        customer_id: this.gerCrmBookingData.customer_details?.customer_id,
        contract_id: this.gerCrmBookingData?.contract_id,
        tracking_no: this.gerCrmBookingData
          ? this.gerCrmBookingData.tracking_no
          : null,
        booked_via: this.BookedValue,
        priority: this.priorityValue,
      };
      let datas = {
        ...this.gerCrmBookingData,
        ...data,
        ...this.updateData,
      };

      this.DataSendtoAnotherChild = datas;
      let idValue = datas.id;

      if (this.jobTypesSelected) {
        this.patchCrmCollerData(datas).then(async (c) => {
          if (c == 200) {
            await this.getCrmBookingDetails(idValue);
          }
        });
      }

      // this.getCrmBookingDetails(idValue);
      // .then(async (c) => {
      //   await this.getCrmBookingDetails(idValue);
      //   if (c == 200) {
      //     await this.getCrmBookingDetails(idValue);
      //   }
      // });
      this.getCrmBookingDetails(idValue);
    },
    emitedInitially(datas) {
      this.initialDataSet = datas;
    },
    emittedPriority(val) {
      this.priorityValue = val?.name;
    },
    emittedPriorityBook(val) {
      this.BookedValue = val?.call_type;
    },
    clickedPrev() {
      this.$router.push({
        name: "CustomerLaunchBookings",
      });
    },
    async cancelBooking() {
      let obj = { ...this.gerCrmBookingData };
      let bookingId = obj.id;

      await this.deleteCrmBookingDetails(bookingId).then((c) => {
        if (c == 200) {
          this.$router.go(-1);
          // this.$router.push({
          //   name: "CustomerLaunchBookings",
          // });
        }
      });
    },
    async updatePatchDetails() {
      let obj = { ...this.gerCrmBookingData };
      let values;
      let value;
      if (typeof this.details?.clearance_mode_name === "string") {
        values = this.details?.clearance_mode_name;
        this.$store.state.CustomerLaunchStore.customerCostCenterDropDownList[0].items.map(
          (x) => {
            if (
              x.customer_cost_center_name === this.details?.clearance_mode_name
            ) {
              value = x.id;
            }
          }
        );
      } else if (typeof this.details?.clearance_mode_name == "object") {
        values = this.details?.clearance_mode_name?.name;
        value = this.details?.clearance_mode_name?.id;
      }
      let data = {
        ...this.gerCrmBookingData,
        id: obj ? obj.id : null,
        cost_center_name: this.costCenterSelected?.cost_center_name,
        cost_center_id: this.costCenterSelected?.id,
        customer_cost_center_id: value,
        customer_cost_center: values,
        job_type: this.jobTypesSelected.job_type,
        job_type_id: this.jobTypesSelected.id,
        document_detail_type: this.documentDetailType?.document_details,
        document_detail_type_id: this.documentDetailType?.id,
      };
      await this.patchCrmCollerData(data);
    },
    async bookNew() {
      let obj = { ...this.gerCrmBookingData };
      let values;
      let value;
      if (typeof this.details?.clearance_mode_name === "string") {
        values = this.details?.clearance_mode_name;
        this.$store.state.CustomerLaunchStore.customerCostCenterDropDownList[0].items.map(
          (x) => {
            if (
              x.customer_cost_center_name === this.details?.clearance_mode_name
            ) {
              value = x.id;
            }
          }
        );
      } else if (typeof this.details?.clearance_mode_name == "object") {
        values = this.details?.clearance_mode_name?.name;
        value = this.details?.clearance_mode_name?.id;
      }

      let data = {
        id: obj ? obj.id : null,
        tracking_no: obj ? obj.tracking_no : null,
        booking_type: obj ? obj.booking_type : null,
        customer_type: obj ? obj.customer_type : null,
        cost_center_name: this.costCenterSelected?.cost_center_name,
        cost_center_id: this.costCenterSelected?.id,
        customer_cost_center_id: value,
        customer_cost_center: values,
        job_type: this.jobTypesSelected.job_type,
        job_type_id: this.jobTypesSelected.id,
        document_detail_type: this.documentDetailType?.document_details,
        document_detail_type_id: this.documentDetailType?.id,
        booked_via: this.BookedValue,
        priority: this.priorityValue,
      };
      let idValue = obj.id;
      await this.updateBookingListById(data).then(async (c) => {
        if (c == 200) {
          await this.getCrmBookingDetails(idValue);

          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: this.gerCrmBookingData
              ? `"Your booking is sucessfully placed. Collection Slip No :"${this.gerCrmBookingData.collection_slip_no}`
              : "Your booking is not added sucessfully",
            life: 5000,
          });
          this.$router.push({
            name: "CustomerLaunchBookings",
          });
        }
      });
      this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey = null;
    },
    deleteFromNewDropdown(value) {
      this.getCusCostDropDown();
    },
    back() {
      this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey = null;
    },
    async getCusCostDropDown(id) {
      if (this.$route.params.type == "Adhoc") {
        await this.getCustomerCostCenterDropDownList({
          id: id ? id : this.gerCrmBookingData.profile_id,
          type: "Adhoc",
        });
      } else {
        await this.getCustomerCostCenterDropDownList({
          id: id ? id : this.gerCrmBookingData.contract_id,
          type: "Contract",
        });
      }
    },
    async onChangeProfileName(e) {
      let data;
      let newVal = e.value;
      if (this.$route.params.type == "Adhoc") {
        data = {
          ...this.gerCrmBookingData,
          booking_type: "Express",
          customer_type: this.$route.params.type,
          profile_id: newVal.id,
          charge_type: "Normal",
          booking_id: this.gerCrmBookingData.id,
        };
      } else {
        data = {
          ...this.gerCrmBookingData,
          booking_type: "Express",
          customer_type: this.$route.params.type,
          contract_id: newVal.id,
          booking_id: this.gerCrmBookingData.id,
        };
        await this.getCostCenterDropDownList(newVal.id);
      }
      await this.getCusCostDropDown(newVal.id);
      let type_p = this.$route.params.type;
      await this.getCrmCollerDropDown({ type: type_p, id: newVal.id });
      let d_details = await this.patchSelectedCostCenter(data);

      await this.getCrmBookingDetails(d_details.id);
      this.costCenterDropdown = this.getCostCenterDropDown;
      this.renderKey += 1;
    },
  },

  watch: {
    "details.clearance_mode_name": {
      handler(newval, oldval) {
        this.updatePatchDetails();
      },
    },
    documentDetailType: {
      handler(newval, oldval) {
        this.updatePatchDetails();
      },
    },
    jobTypesSelected: async function (newVal, oldVal) {
      this.jobTypesSelected = newVal;
      this.selectedJobType = { ...newVal };
      if (newVal?.id !== oldVal?.id) {
        let newId = newVal?.id;
        await this.getJobDetailsTypeDropDownList(newId);
        this.renderKey++;
      }
    },
    getJobDetailsType: function (newList, oldList) {
      if (newList[0]?.name !== null) {
        this.documentDetailTypeArray = newList;
      }
      this.documentDetailType = newList[0];

      newList.map((x, i) => {
        if (x.document_details == "Others") {
          this.documentDetailType = newList[i];
        }
      });
    },
    customerCostCenterSelected: async function (newVal, oldVal) {
      this.customerCostCenterSelected = newVal;
      this.selectedCustomerCostCenter = { ...newVal };
      if (newVal?.id !== oldVal?.id) {
        let newId = newVal?.id;
        this.details.clearance_mode_name = newVal;
        // await this.getCustomerCostCenterDropDownList(newId);
        this.getCusCostDropDown(newVal?.id);
      }
    },

    gerCrmBookingData: async function (newVal, oldVal) {
      if (this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey) {
        this.getSurchargeDropDownList(this.gerCrmBookingData?.contract_id);
      }
    },
    "$store.state.CustomerLaunchStore.customerCostCenterDropDownList": {
      handler(newval, oldval) {
        newval[0].items.map((x, index) => {
          let data = {
            customer_cost_center_name: x.customer_cost_center_name,
            code: x.customer_cost_center_name,
            name: x.customer_cost_center_name,
            id: x.id,
          };
          if (x.id == this.gerCrmBookingData.customer_cost_center_id) {
            this.details.clearance_mode_name = data;
          } else {
            if (index == 0) {
              this.details.clearance_mode_name = data;
            }
          }
        });
      },
      deep: true,
    },
    StandardCollectionSlipCompanyNameDropDown: {
      handler(newval, oldval) {
        let p_b_type = this.$route.params.type ?? "";
        this.StandardCollectionSlipCompanyNameDropDown.map((x) => {
          if (
            x.id ==
            this.gerCrmBookingData[
              p_b_type == "Adhoc" ? "profile_id" : "contract_id"
            ]
          ) {
            this.crmProfileName = x;
          }
        });
      },
      deep: true,
    },
    crmProfileName: {
      handler(newval, oldval) {
        let pay = {
          contract_profile_id: newval.id,
        };

        if (this.$route.params.type == "Adhoc") {
          pay = {
            profile_id: newval.id,
          };
        } else if (this.$route.params.type == "Contract") {
          pay = {
            contract_profile_id: newval.id,
          };
        }
        this.getCustomerNameDropDownList(pay);
      },
      deep: true,
    },
  },
  computed: {
    ...crmCusLState,
    ...mapGetters({
      getJobTypeDropDown: "CustomerLaunchStore/getJobTypeDropDown",
      getCostCenterDropDown: "CustomerLaunchStore/getCostCenterDropDown",
      getJobDetailsType: "CustomerLaunchStore/getJobDetailsType",
      getCustomerCostCenterDropDown:
        "CustomerLaunchStore/getCustomerCostCenterDropDown",
      getCustomerNameDropDown: "CustomerLaunchStore/CustomerNameDropDown",
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      getselectedCostCenter: "CustomerLaunchStore/getselectedCostCenter",
      getsurchargeDropDownListData:
        "CustomerLaunchStore/getsurchargeDropDownListData",
      getJobDetailsArrayList: "CustomerLaunchStore/getJobDetailsArrayList",
      getCustomerContactDropDown: "CustomerLaunchStore/CustomerContactDropDown",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
      StandardCollectionSlipCompanyNameDropDown:
        "CustomerLaunchStore/StandardCollectionSlipCompanyNameDropDown",
    }),
  },

  mounted() {},
  async created() {
    this.renderKey += 1;
    let p_b_type = this.$route.params.type ?? "";
    this.paramData = this.$route.params.type;
    await this.getJobTypeDropDownList();
    this.postStandardCollectionSlipCompanyNameDropDown({
      type: this.$route.params.type,
    });
    if (this.$route.params.type != "Adhoc") {
      await this.getinitialBillingMode({
        id: this.gerCrmBookingData.contract_id,
        toast: this.$toast,
      });
      await this.getCostCenterDropDownList(this.gerCrmBookingData.contract_id);
    }

    await this.getLogisticsListDropDownApi();
    await this.getJobPriorityListDropDownApi({
      type: this.gerCrmBookingData.charge_type,
    });
    this.costCenterDropdown = this.getCostCenterDropDown;
    this.jobTypesSelected = this.getJobTypeDropDown
      ? this.getJobTypeDropDown[0]
      : null;

    this.selectedJobType = { ...this.jobTypesSelected };
    let cus_data =
      this.gerCrmBookingData[
        this.$route.params.type == "Adhoc"
          ? "adhoc_customer"
          : "contract_customer"
      ];
    this.crmProfileName = {
      profile_name: cus_data?.profile_name,
      code: cus_data?.profile_name,
      id: cus_data?.profile_id,
    };

    // if (this.$route.params.mode!="edit") {

    this.StandardCollectionSlipCompanyNameDropDown.map((x) => {
      if (
        x.id ==
        this.getselectedCostCenter[
          p_b_type == "Adhoc" ? "profile_id" : "contract_id"
        ]
      ) {
        this.crmProfileName = {
          profile_name: x.profile_name,
          code: x.profile_name,
          id: x.id,
        };
      }
    });
    this.costCenterSelected = this.getCostCenterDropDown
      ? this.getCostCenterDropDown[0]
      : null;
    this.customerCostCenterSelected = this.getCustomerCostCenterDropDown
      ? this.getCustomerCostCenterDropDown[0]
      : null;
    this.selectedCustomerCostCenter = { ...this.customerCostCenterSelected };
    this.details.clearance_mode_name = this.getCustomerCostCenterDropDown
      ? this.getCustomerCostCenterDropDown[0]
      : null;
    this.documentDetailType = this.getJobDetailsType
      ? this.getJobDetailsType[0]
      : null;
    // }
    await this.getCusCostDropDown(this.crmProfileName.id);
    this.renderKey += 1;

    if (this.$route.params.mode == "edit") {
      this.StandardCollectionSlipCompanyNameDropDown.map((x) => {
        if (
          x.id ==
          this.gerCrmBookingData[
            p_b_type == "Adhoc" ? "profile_id" : "contract_id"
          ]
        ) {
          this.crmProfileName = {
            profile_name: x.profile_name,
            code: x.profile_name,
            id: x.id,
          };
        }
      });

      this.costCenterSelected = this.getCostCenterDropDown
        ? this.getCostCenterDropDown[0]
        : null;
      this.jobTypesSelected = {
        job_type: this.gerCrmBookingData.job_type,
        code: this.gerCrmBookingData.job_type,
        name: this.gerCrmBookingData.job_type,
        id: this.gerCrmBookingData.job_type_id,
      };
      this.documentDetailType = {
        document_detail_type: this.gerCrmBookingData.document_detail_type,
        code: this.gerCrmBookingData.document_detail_type,
        name: this.gerCrmBookingData.document_detail_type,
        id: this.gerCrmBookingData.document_detail_type_id,
      };

      this.renderKey += 1;
    }

    this.renderKey += 1;
  },
};
</script>
<style scoped>
::v-deep .p-dropdown {
  background: #ffffff;
  border: 1px solid #ced4da;
  width: 100%;
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
::v-deep .p-inputtext-lg .p-inputtext {
  font-weight: 400 !important;
}
.crm_express_screen_width {
  max-width: 1600px !important;
  overflow: hidden !important;
}
.profile-drop-down {
  width: 235px !important;
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  border: none !important;
}

::v-deep.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: #ffffff !important;
}
.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: #ffffff !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: #ffffff !important;
}
.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: #ffffff !important;
}
::v-deep .p-dropdown .p-dropdown-label {
  font-size: 14px !important;
  font-weight: 700 !important;
}
::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  font-size: 14px !important;
  font-weight: 700 !important;
}
.caller-drop-down {
  margin-top: 20px !important;
}
</style>
