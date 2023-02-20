<template>
  <div class="m-4">
    <div class="cardWhite">
      <div class="flex flex-row flex-wrap w-50">
        <div class="flex p-4 h-4rem font-bold border-round m-2">
          CSR Daily Activity 
        </div>
         <Buttons
          label="Export"
          button_class="buttonClass-customer-launch ml-4 mt-4 mt-4 h-2.5rem right" 
        />
      </div>
      <div class="cardWhite flex-row">
        <div class="d-flex ml-4">
          <div class="flex">
            <div class="field-radiobutton mr-4">
              <RadioButton
                id="city1"
                name="city"
                value="Contract"
                v-model="selectedCustomer"
              />
              <label
                :class="
                  selectedCustomer == 'Contract'
                    ? 'color-1e90ff font-size-16'
                    : 'color-c4c4c4 font-size-16'
                "
                for="city1"
                >Contract Customer</label
              >
            </div>
          </div>

          <div class="flex">
            <div class="field-radiobutton mr-4">
              <RadioButton
                id="city2"
                name="city"
                value="Adhoc"
                v-model="selectedCustomer"
              />
              <label
                :class="
                  selectedCustomer == 'Adhoc'
                    ? 'color-1e90ff font-size-16'
                    : 'color-c4c4c4 font-size-16'
                "
                for="city2"
                >Adhoc Customer</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mb-4 mt-2 relative">
        <InputText
          class="w-100 ml-4 mr-4 pt-3 pb-3 border-radius-10"
          type="text"
          placeholder="Search by Company Name, CSR ID..."
          v-model="inputSearch"
          @input="searchFunct($event.target.value)"
        />

        <Dropdown
          style="position: absolute; left: 80%; top: 10px; border: none"
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="Select a City"
        />

        <Buttons
          label="Go"
          button_class="buttonClass-customer-launch-go bold-700 bg-fff color-357dea font-size-18 color-fff bg-1e90ff absolute border-radius-3  BtnAbsolute-customer-card "
          @click="go()"
        />
      </div>
    </div>

    <div v-if="selectedCity.code == 1">
      <div class="tab-content mt-4">
        <!-- dynamic component-->
        <keep-alive>
          <component
            :tableClass="getTableClass('feedback-settings')"
            :tableDataName="'feedbackTableData'"
            :tableName="'feedbackTable'"
            :tableData="getCsrActivityList"
            :totalRecords="$store.state['CsrActivityStore']['totalRecord']"
            :tableColumns="tableHeader"
            :overlayData="getOverlayData()"
            v-bind:is="csrActivityFeedbackTable"
            @editFeedback="editFeedbackData"
          ></component>
        </keep-alive>
      </div>
    </div>

    <div v-else>
      <div class="tab-content mt-4">
        <keep-alive>
          <component
            :tableClass="getTableClass('feedback-settings')"
            :tableDataName="'collectionSlipTableData'"
            :tableName="'collectionSlip'"
            :tableData="getExpressTableData"
            :totalRecords="totalRecordsList"
            :tableColumns="tableCollectionSlipHeader"
            :overlayData="getOverlayDataSet()"
            v-bind:is="csrActivityFeedbackTable"
          ></component>
        </keep-alive>
      </div>
    </div>

    <Dialog
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '40vw' }"
    >
      <template #header>
        <h5 class="bold-700 font-size-16" v-if="!updateBtn">
          Add New-Customer Leave
        </h5>
        <h5 class="bold-700 font-size-16" v-if="updateBtn">
          Edit-Customer Leave
        </h5>
      </template>
      <div>
        <h6 class="color-7a7a7a bold-600">Company Name</h6>
        <Dropdown
          v-model="details.customerLeaveListSelected"
          :options="getCustomerLeaveList"
          optionLabel="profile_name"
          placeholder="Company Name"
          class="w-100"
          :filter="true"
        />
      </div>
      <div class="flex flex-row font-bold text-gray-900 mt-4 mb-2 border-round">
        <div class="flex flex-column w-50 pt-2 pb-2 pr-2">
          <h6 class="color-7a7a7a bold-600">From</h6>
          <div>
            <Calendar
              v-model="details.from_date"
              :showTime="true"
              hourFormat="12"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
              class="w-100"
              @blur="v$.details.from_date.$model;"
              :class="{
                'p-invalid': v$.details.from_date.$invalid && submitted,
              }"
            />
          </div>
        </div>

        <div class="flex flex-column w-50 pt-2 pb-2 pl-2">
          <h6 class="color-7a7a7a bold-600">To</h6>
          <div>
            <Calendar
              v-model="details.to_date"
              :showTime="true"
              hourFormat="12"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
              class="w-100"
              :class="{
                'p-invalid': v$.details.to_date.$invalid && submitted,
              }"
            />
          </div>
        </div>
      </div>
      <div>
        <h6 class="color-7a7a7a bold-600">Remarks</h6>
        <Textarea
          v-model="details.remarks"
          @blur="v$.details.remarks.$model"
          :class="{
            'p-invalid': v$.details.remarks.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          rows="1"
          cols="30"
        />
      </div>
      <template #footer>
        <Buttons
          v-if="!updateBtn"
          label="Cancel"
          button_class="buttonClass-customer-launch "
          @click="clickedCancel"
        />
        <Buttons
          v-if="updateBtn"
          label="Update"
          button_class="dialog-button-text"
          @click="updateValue"
        />
        <Buttons
          v-else
          label="Save"
          button_class="dialog-button-text"
          @click="saveValue"
        />
      </template>
    </Dialog>
  </div>
  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
</template>

<script>
import DataTable from "../../../../components/Reusables/CRM/CheckedDataTable.vue";
import {
  CSRActivityColumnFields,
  CSRActivityCollectionSlipColumnFields,
} from "../../../../components/Reusables/CRM/Const";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
const _ = require("lodash");
import Textarea from "primevue/textarea";
import { mapActions, mapGetters ,mapMutations} from "vuex";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import csrActivityFeedbackTable from "../DataTable/csrActivityFeedbackTable.vue";
import ExpressHistoryTable from "../CustomerLaunch/expressHistory/expressHistoryTable.vue";
import CRMFeedbackMainDialog from "../../../../components/CRM/feedbackMainDialog.vue";

export default {
  name: "CSRActivityIndex",
  components: {
    DataTable,
    csrActivityFeedbackTable,
    ExpressHistoryTable,
    Dialog,
    InputText,
    Dropdown,
    Textarea,
    RadioButton,
    CRMFeedbackMainDialog,
  },

  data() {
    return {
      v$: useVuelidate(),
      emittedId: "",
      searcher: "",
      inputSearch: "",
      tableHeader: CSRActivityColumnFields,
      tableCollectionSlipHeader: CSRActivityCollectionSlipColumnFields,
      csrActivityFeedbackTable: "csrActivityFeedbackTable",
      selectedCustomer: "Contract",
      dialogComponent: "feedbackDialog",
      initialComponent: "",
      display: false,
      details: {
        remarks: null,
        from_date: null,
        customerLeaveListSelected: null,
        to_date: null,
      },
      submitted: false,
      selectedCustomerLeaveList: {},
      profile_name: null,
      value3: null,
      updateBtn: false,
      expressContractTableData: [
        {
          customer_id: 1,
          company_name: "21st Century Computing Sol...",
          address: "No.1 Second Chin Bee",
          from: "10.09.2022",
          to: "01.09.2022",
          created_by: "Catherine",
          created_at: "01.09.2022",
          actions: "",
        },
      ],
      selectedCity: { name: "Feedback", code: 1 },
      cities: [
        { name: "Feedback", code: 1 },
        { name: "Collection Slip", code: 2 },
      ],
      selectedTab: {
        label: "ExpressTab",
        tab: "expressHistoryTable",
        select: true,
        tabName: "Express",
        data: "expressTableData",
        subTabledata: "expressSubTableData",
        pageOffset: "expressPageOffset",
        columns: "expressTableColumnData",
      },
    };
  },

  validations() {
    return {
      details: {
        remarks: { required },
        from_date: { required },
        to_date: { required },
      },
    };
  },

  methods: {
    ... mapMutations({
      updateBreadCrumbAndTitle: 'users/updateBreadCrumbAndTitle'
    }),
    ...mapActions({
      getCrmListFeedbackData: "CsrActivityStore/getCrmListFeedbackData",
      expressDataFetch: "customerLaunchBookingHistory/loadExpressTableData",
      showFeedbackDialog: "CrmFeedback/showFeedbackFormDialog",
    }),
    async Add() {
      this.display = true;
      this.details.customerLeaveListSelected = this.getCustomerLeaveList
        ? this.getCustomerLeaveList[0]
        : null;
    },

    editFeedbackData(dialogData) {
      this.initialComponent = "CRMFeedbackMainDialog";
      this.showFeedbackDialog(dialogData);
    },

    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    searchFunct: _.debounce(function (e) {
      let datas = {
        orderBy: ["createdAt", "DESC"],
        filter_params: [
          {
            column_name: "feedback_no",
            type: "contains",
            searchkey: "89",
          },
        ],
        searchValue: e,
      };
      this.getCrmListFeedbackData(datas);

      let paginationParams = {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
        searchKey: e,
      };
      this.expressDataFetch(paginationParams);
    }, 600),

    getOverlayData(tableName) {
      return this.$store.state.masters.crmSettingOverlay;
    },
    getOverlayDataSet(tableName) {
      return this.$store.state.masters.customerlaunchBookingOverlayData;
    },
    emitData(data) {
      this.emittedId = data.id;
      this.details.customerLeaveListSelected = data.profile_name;
      this.details.from_date = moment(data.from_date).format(
        "YYYY-MM-DD HH:mm"
      );
      this.details.to_date = moment(data.to_date).format("YYYY-MM-DD HH:mm");
      this.details.remarks = data.remarks;
      this.updateBtn = true;
      this.display = true;
    },

    saveValue() {
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      let value = {
        customer_id: this.details.customerLeaveListSelected.customer_id,
        profile_name: this.details.customerLeaveListSelected.profile_name,
        address: this.details.customerLeaveListSelected.address,
        remarks: this.details.remarks,
        from_date: this.details.from_date,
        to_date: this.details.to_date,
      };
      this.saveCustomerLeaveDropDownData(value).then(async (c) => {
        if (c == 200) {
                    let datas = {
        search: '',
      };
          await this.customerLeaveDataList(datas);
        }
      });
      this.addCustomerLeaveData();

      this.display = false;
    },

    async addCustomerLeaveData() {
      try {
      let datas = {
        search: '',
      };
        let response = await this.customerLeaveDataList(datas);
        if (response === 200) {
          let info = "created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to create";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to create";
        this.commonToast("error", "Error", info);
      }
    },

    async updateCustomerLeaveData() {
      try {
              let datas = {
        search: '',
      };
        let response = await this.customerLeaveDataList(datas);
        if (response === 200) {
          let info = "Updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to Update";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to Update";
        this.commonToast("error", "Error", info);
      }
    },

    commonToast(severity, summary, message) {
      this.display = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    updateValue() {
      let data = {
        id: this.emittedId,
        customer_id: this.details.customerLeaveListSelected.customer_id,
        profile_name: this.details.customerLeaveListSelected.profile_name,
        address: this.details.customerLeaveListSelected.address,
        remarks: this.details.remarks,
        from_date: this.details.from_date,
        to_date: this.details.to_date,
      };
      this.updateCustomerLeaveDropDown(data).then(async (c) => {
        if (c == 200) {
                let datas = {
        search: '',
      };
          await this.customerLeaveDataList(datas);
        }
      });
      this.updateCustomerLeaveData();

      this.display = false;
    },

    clickedCancel() {
      this.display = false;
    },
  },
  watch: {
    display(value) {
      if (this.display === false) {
        this.details.customerLeaveListSelected = null;
        this.details.from_date = null;
        this.details.to_date = null;
        this.details.remarks = null;
        this.updateBtn = false;
        this.submitted = false;
      }
    },
    selectedCustomer: function (newval, oldval) {
      let datas = {
        orderBy: ["createdAt", "DESC"],
        filter_params: [
          {
            column_name: "feedback_no",
            type: "contains",
            searchkey: "89",
          },
        ],
        searchValue: this.inputSearch,
        customer_type: newval,
      };
      this.getCrmListFeedbackData(datas);

      let paginationParams = {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
        searchKey: this.InputText,
        customer_type: newval,
      };
      this.expressDataFetch(paginationParams);
    },
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: 'CSR Daily Activity',
      breadcrumbInfo: 'Customer setting  > CSR Activity'
    })
  },
  computed: {
    ...mapGetters({
      getCustomerLeaveList: "CustomerLaunchStore/getCustomerLeaveList",
      customerLeaveList: "CustomerLaunchStore/customerLeaveList",
      getCsrActivityList: "CsrActivityStore/getCsrActivityList",
      totalRecordsList: "customerLaunchBookingHistory/getTotalRecords",
      getExpressTableData: "customerLaunchBookingHistory/getExpressTableData",
      getExpressHistoryColumns:
        "customerLaunchBookingHistory/getExpressHistoryColumns",
      getExpressHistorySubColumns:
        "customerLaunchBookingHistory/getExpressHistorySubColumns",
    }),
  },
  mounted() {
    let datas = {
      orderBy: ["createdAt", "DESC"],
      filter_params: [
        {
          column_name: "feedback_no",
          type: "contains",
          searchkey: "89",
        },
      ],
      searchValue: this.inputSearch,
      customer_type: this.selectedCustomer,
    };
    this.getCrmListFeedbackData(datas);
    let paginationParams = {
      offset: 1,
      limit: 10,
      orderBy: ["createdAt", "ASC"],
      searchKey: this.inputSearch,
      customer_type: this.selectedCustomer,
    };
    this.expressDataFetch(paginationParams);
  },
  unmounted() {},
};
</script>
<style scoped>
::v-deep .p-selectbutton .p-button.p-highlight {
  color: #fff !important;
}

::v-deep .p-input-icon-left > i,
.p-input-icon-right > i {
  top: 40%;
}

::v-deep .p-button.p-button-icon-only {
  background: #fff !important;
  border: 1px solid #c4c4c4;
  border-left: none;
  font-size: 14px;
  color: black !important;
  height: 50px !important;
}
::v-deep .p-inputtext:enabled:focus {
  box-shadow: none !important;
}

::v-deep .p-calendar-w-btn .p-inputtext {
  border: 1px solid #c4c4c4;
  border-right: none;
  height: 50px;
}

::v-deep .p-datepicker {
  border: 1px solid #2196f3 !important;
}

::v-deep .pi-chevron-right:before {
  color: #2196f3 !important;
}

::v-deep .pi-chevron-left:before {
  color: #2196f3 !important;
}

::v-deep .p-datepicker table th {
  color: #2196f3 !important;
  font-weight: 100 !important;
}

::v-deep .p-datepicker .p-datepicker-header {
  border-bottom: none !important;
}

::v-deep .p-dialog .p-dialog-header .p-dialog .p-dialog-header {
  padding: 0 !important;
  height: 0px;
}

.cardWhite {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
}
.right{
  margin-right: -581px;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
</style>
