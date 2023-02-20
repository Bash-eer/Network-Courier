<template>
  <div class="m-4">
    <div class="card flex-row">
      <div class="flex flex-row flex-wrap w-50">
        <div class="flex p-4 h-4rem font-bold border-round m-2">
          Customer Suspension
        </div>
      </div>
      <div class="flex flex-row width-left-25 w-50 flex-wrap">
        <span class="p-input-icon-left mt-4">
          <i class="pi pi-search pb-2" />
          <InputText
            class="h-2.5rem"
            type="text"
            v-model="searchValue"
            placeholder="Search"
            @input="search($event.target.value)"
          />
        </span>
        <Buttons
          label="Export"
          button_class="buttonClass-customer-launch ml-4 mt-4 mt-4 h-2.5rem"
        />
        <Buttons
          label="Add New"
          button_class="dialog-button-text ml-4 mt-4 mt-4 h-2.5rem"
          @click="Add"
        />
      </div>
    </div>

    <DataTable
      tableName="CustomerSuspenstionPage"
      tableClass="p-datatable-sm QuotationTabTable"
      :tableData="customerSuspenstionList"
      :tableColumns="tableHeader"
      :selectedTabValues="selectedTab"
      :selectedCustomer="selectedCustomer"
      @emittedCostCenterResponse="emitedResponseCostCenter"
      @emitCustomerSuspenstionPage="emitCustomerSuspenstionData"
      :suspenstionAttachments="AttachmentsArray"
      :AttachmentType="'CrmCustomerSuspenstionFileAttachment'"
      :currentTab="currentTab"
      :globalSearchString="searchValue"
    />

    <Dialog
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '40vw' }"
    >
      <template #header>
        <h5 class="bold-700 font-size-16" v-if="!updateBtn">
          Add New-Customer Suspension
        </h5>
        <h5 class="bold-700 font-size-16" v-if="updateBtn">
          Edit-Customer Suspension
        </h5>
      </template>
      <div>
        <h6 class="color-7a7a7a bold-600">Company Name</h6>
        <Dropdown
          v-model="customerSuspenstionListSelected"
          :options="getCustomerSuspenstionList"
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
          :autoResize="true"
        />
      </div>
      <DragAndDropUpload
        :state="crmFileAttachments"
        type="CrmCustomerSuspenstionFileAttachment"
        storePath="CustomerLaunchStore"
      />
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
</template>

<script>
import DataTable from "../../../../components/Reusables/CRM/CheckedDataTable.vue";
import { CustomerLeaveColumnFields } from "../../../../components/Reusables/CRM/Const";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
const _ = require("lodash");
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CustomerSuspension",
  components: { DataTable, InputText, Dialog, Dropdown, Textarea },

  data() {
    return {
      v$: useVuelidate(),
      searcher: "",
      tableHeader: CustomerLeaveColumnFields,
      selectedCustomer: "Contract",
      display: false,
      submitted: false,
      value: null,
      value3: null,
      details: {
        from_date: moment().format("MM/DD/YYYY h:mm a"),
        remarks: null,
        to_date: moment().format("MM/DD/YYYY h:mm a"),
      },
      AttachmentsArray: [],
      updateBtn: false,
      currentTab: "",
      searchValue: "",
      jobCardAttachments: [],
      customerSuspenstionListSelected: null,
      crmFileAttachments: " ",
      ListSelected: null,
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
      selectedCity: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
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
    ...mapActions({
      getCustomerSuspenstionDropDownList:
        "CustomerLaunchStore/getCustomerSuspenstionDropDownList",
      saveCustomerSuspenstionDropDownData:
        "CustomerLaunchStore/saveCustomerSuspenstionDropDownData",
      customerSuspenstionDataList:
        "CustomerLaunchStore/customerSuspenstionDataList",
      updateCustomerSuspenstionDropDown:
        "CustomerLaunchStore/updateCustomerSuspenstionDropDown",
      globalSearch: "supervisorAllotment/commonSearchData",
    }),
    async Add() {
      this.customerSuspenstionListSelected = this.getCustomerSuspenstionList
        ? this.getCustomerSuspenstionList[0]
        : null;
      this.display = true;
    },

    emitCustomerSuspenstionData(data) {
      let dropDownId = data.customer_id;
      this.emittedId = data.id;
      this.customerSuspenstionListSelected =
        this.getCustomerSuspenstionList.find(
          (x) => x.customer_id === dropDownId
        );
      this.details.from_date = moment(data.from_date).format(
        "YYYY-MM-DD HH:mm"
      );
      this.details.to_date = moment(data.to_date).format("YYYY-MM-DD HH:mm");
      this.details.remarks = data.remarks;
      this.crmFileAttachments = data.attachments;
      this.updateBtn = true;
      this.display = true;
    },

    saveValue() {
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }

      this.AttachmentsArray =
        this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles;

      let value = {
        customer_id: this.customerSuspenstionListSelected.customer_id,
        profile_name: this.customerSuspenstionListSelected.profile_name,
        address: this.customerSuspenstionListSelected.address,
        remarks: this.details.remarks,
        from_date: this.details.from_date,
        to_date: this.details.to_date,
        attachments: this.AttachmentsArray,
      };
      this.saveCustomerSuspenstionDropDownData(value).then(async (c) => {
        if (c == 200) {
          let data = {
            search: this.searchValue,
          };
          await this.customerSuspenstionDataList(data);
        }
      });
      this.addCustomerSuspensionData();

      this.display = false;
    },

    async addCustomerSuspensionData() {
      try {
        let data = {
          search: this.searchValue,
        };
        let response = await this.customerSuspenstionDataList(data);
        if (response === 200) {
          let info = "Customer Suspension Created Successfully";
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

    async updateCustomerSuspensionData() {
      try {
        let data = {
          search: this.searchValue,
        };

        let response = await this.customerSuspenstionDataList(data);
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
      this.AttachmentsArray =
        this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles.map(
          (c) => {
            return {
              file_name: c.file_name,
              mime_type: c.mime_type,
              size: c.size,
              url: c.url,
            };
          }
        );
      let data = {
        id: this.emittedId,
        customer_id: this.customerSuspenstionListSelected.customer_id,
        profile_name: this.customerSuspenstionListSelected.profile_name,
        address: this.customerSuspenstionListSelected.address,
        remarks: this.details.remarks,
        from_date: this.details.from_date,
        to_date: this.details.to_date,
        attachments: this.AttachmentsArray,
      };
      this.updateCustomerSuspenstionDropDown(data).then(async (c) => {
        if (c == 200) {
          this.updateCustomerSuspensionData();
          let data = {
            search: this.searchValue,
          };
          await this.customerSuspenstionDataList(data);
        }
      });

      this.display = false;
    },

    clickedCancel() {
      this.display = false;
    },
    search: _.debounce(function (e) {
      let data = {
        label: this.currentTab,
        searchValue: this.searchValue,
      };

      let datas = {
        search: this.searchValue,
      };

      this.customerSuspenstionDataList(datas);
      this.globalSearch(data);
    }, 600),
  },
  watch: {
    display(value) {
      if (this.display === false) {
        this.customerLeaveListSelected = null;
        this.details.from_date = null;
        this.details.to_date = null;
        this.details.remarks = null;
        this.updateBtn = false;
        this.submitted = false;
      }
    },
  },

  created() {
    this.$store.state.commonStore.attachmentsTag =
      "CrmCustomerSuspenstionFileAttachment";

    if (Object.keys(this.getCommonCrmAttachmentStateData).length != 0) {
      this.crmFileAttachments =
        this.getCommonCrmAttachmentStateData.attachments;

      this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles =
        this.getCommonCrmAttachmentStateData.attachments;
    }
  },
  computed: {
    ...mapGetters({
      getCustomerSuspenstionList:
        "CustomerLaunchStore/getCustomerSuspenstionList",
      getCommonCrmAttachmentStateData:
        "CustomerLaunchStore/getCommonCrmAttachmentStateData",
      customerSuspenstionList: "CustomerLaunchStore/customerSuspenstionList",
      getSuspenstionDetailsArrayList:
        "CustomerLaunchStore/getSuspenstionDetailsArrayList",
    }),
  },
  mounted() {
    let data = {
      search: this.searchValue,
    };
    this.customerSuspenstionDataList(data);
    this.getCustomerSuspenstionDropDownList();
    //bread crumb
    this.$store.state.users.breadcrumbTitle = "Customer Setting";
    this.$store.state.users.breadcrumbPath = `CRM > Customer Setting > Customer Suspension`;
  },
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
</style>
