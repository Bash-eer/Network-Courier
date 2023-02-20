<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Coupon Settings</span>
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
              placeholder="Search"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export Report"
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
    <CouponDataTable
      tableClass="p-datatable-sm QuotationTabTable"
      tableName="CouponSettings"
      :tableData="getCouponSettingsTable"
      :tableColumns="tableColumns"
      @emittedEditCouponParent="emittedEditCouponParent"
    />
  </div>

  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import FeedbackSettingsTable from "./DataTable/feedbackSettingsTable.vue";
import CouponSettingsTable from "./DataTable/couponSettingsTable.vue";
import CRMCouponSettingsMainDialog from "../../../components/CRM/crmCouponSettingsMainDialog.vue";
import { CouponSettingsFields } from "../../../components/Reusables/CRM/Const";
import CouponDataTable from "../../../components/Reusables/CRM/CouponDataTable.vue";

export default {
  name: "FeedbackSettings",
  components: {
    InputText,
    FeedbackSettingsTable,
    CRMCouponSettingsMainDialog,
    CouponSettingsTable,
    CouponDataTable,
  },
  data: () => ({
    searchValue: "",
    couponTableData: [],
    feedbackTableComponent: "FeedbackSettingsTable",
    couponTableComponent: "CouponSettingsTable",
    dialogComponent: "couponSettingsFields",
    initialComponent: "",
    tableColumns: CouponSettingsFields,
  }),
  methods: {
    ...mapActions({
      fetchFeedbackData: "CrmSettings/loadFeedbackSettingsData",
      showFeedbackSettingsDialog: "CrmSettings/showFeedbackSettingsDialog",
      showCouponSettingsDialog: "CrmSettings/showCouponSettingsDialog",
      globalSearch: "CrmSettings/commonSearchData",
      commonSearchForCouponData: "CrmSettings/commonSearchForCouponData",
      fetchCouponData: "CrmSettings/loadCouponSettingsData",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.crmSettingOverlay;
    },
    openDialog() {
      this.initialComponent = "CRMCouponSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showCouponSettingsDialog(dialogData);
    },
    emittedEditCouponParent(data) {
      this.initialComponent = "CRMCouponSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: data,
      };
      this.showCouponSettingsDialog(dialogData);
    },
    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.commonSearchForCouponData(data);
    }, 600),
  },
  created() {
    this.fetchFeedbackData();
    this.fetchCouponData();
  },
  computed: {
    ...mapGetters({
      getCouponSettingsTable: "CrmSettings/getCouponSettingsTable",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
