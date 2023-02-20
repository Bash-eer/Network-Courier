<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Payment Method</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchValue"
              class="global-search"
              @input="search($event.target.value)"
              placeholder="Search by Keyword"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export Report "
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Add new button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
      </div>
    </div>

    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <!-- dynamic component-->
      <keep-alive>
        <component
          :tableClass="getTableClass('payment-method')"
          :tableDataName="'paymentMethodTableData'"
          :tableName="'paymentMethodTable'"
          :tableData="$store.state['CrmSettings']['paymentTableData']"
          :totalRecords="$store.state['CrmSettings']['totalRecords']"
          :tableColumns="$store.state['CrmSettings']['paymentColumnData']"
          :overlayData="getOverlayData()"
          @editPaymentMethod="editPaymentMethodData"
          v-bind:is="paymentTableComponent"
        ></component>
      </keep-alive>
    </div>
  </div>

  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import PaymentMethodTable from "./DataTable/paymentMethodTable.vue";
import CRMPaymentMethodMainDialog from "../../../components/CRM/crmPaymentMethodMainDialog.vue";
export default {
  name: "PaymentMethod",
  components: {
    InputText,
    PaymentMethodTable,
    CRMPaymentMethodMainDialog,
  },
  data: () => ({
    searchValue: "",
    paymentTableComponent: "PaymentMethodTable",
    dialogComponent: "paymentSettings",
    initialComponent: "",
  }),
  methods: {
    ...mapActions({
      fetchPaymentMethodData: "CrmSettings/loadPaymentMethodData",
      showPaymentSettingsDialog: "CrmSettings/showPaymentSettingsDialog",
      globalSearch: "CrmSettings/commonPaymentSearchData",
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.crmPaymentSettingOverlay;
    },
    openDialog() {
      this.initialComponent = "CRMPaymentMethodMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showPaymentSettingsDialog(dialogData);
    },
    editPaymentMethodData(dialogData) {
      this.initialComponent = "CRMPaymentMethodMainDialog";
      this.showPaymentSettingsDialog(dialogData);
    },
    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.globalSearch(data);
    }, 600),
  },
  created() {
    this.fetchPaymentMethodData();
    let breadCrumbData = {
      title: "Settings",
      breadcrumbInfo: "CRM Settings > Payment Method",
    };
    this.updateBreadCrumb(breadCrumbData);
  },
};
</script>

<style lang="scss" scoped></style>
