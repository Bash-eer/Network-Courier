<template>
  <div class="w-100 tab-class">
    <div
      :class="`flex ${
        $route?.params?.actionType == 'Adhoc'
          ? 'justify-content-end'
          : 'justify-content-between'
      } align-items-center pt-3 tabsBar mb-3`"
    >
      <!-- left contents -->
      <div
        v-if="$route?.params?.actionType == 'AdhocProfile'"
        class="flex flex-row ml-2 md:flex-wrap align-items-center"
      >
        <div class="ml-2 pointer-cursor" @click="$router.go(-1)">
          <span> <i class="pi pi-arrow-left backText"></i></span>
        </div>
        <span class="flex backText flex-wrap ml-3"> Adhoc profiles </span>
      </div>
      <div
        v-if="!$route?.params?.actionType?.includes('Adhoc')"
        class="flex ml-2 md:flex-wrap align-items-center"
      >
        <div class="flex">
          <div class="flex tabPills">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding px-1"
              id="pills-tab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs.label)"
                  :class="
                    index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                  "
                  :id="'pills-' + tabs.label + '-tab'"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-' + tabs.label"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-' + tabs.label"
                  :aria-selected="index == 0 ? true : false"
                >
                  {{ tabs.tabName }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!--custom design-->
        <div
          v-if="type == 'salesHome'"
          class="flex flex-row mt-2 flex-wrap justify-content-center"
        >
          <div class="mr-1 ml-3">
            <img
              src="/images/express.png"
              width="36"
              height="20"
              alt="Express"
              class=""
            /><span
              class="
                tab-express-text
                color-EBBD46
                letter-spacing-003
                line-height-15
                font-size-12
                bold-600
                mx-2
                mt-1
              "
              >Express</span
            >
          </div>
          <div class="mx-3 md:mx-1">
            <img
              src="/images/international.png"
              width="19"
              height="20"
              alt="International"
              class=""
            /><span
              class="
                tab-international-text
                color-7469F2
                letter-spacing-003
                line-height-15
                font-size-12
                bold-600
                mx-2
                mt-1
              "
              >International</span
            >
          </div>
          <div class="mx-3 md:mx-1">
            <img
              src="/images/rapido.png"
              width="15"
              height="23"
              alt="Rapido"
              class=""
            /><span
              class="
                tab-rapido-text
                color-55ba6b
                letter-spacing-003
                line-height-15
                font-size-12
                bold-600
                mx-2
                mt-1
              "
              >Rapido</span
            >
          </div>
        </div>
        <!--custom design-->
      </div>

      <!-- right contents -->
      <div class="flex align-items-center toolPills">
        <!-- global table search -->

        <div class="mr-3">
          <div
            class="flex"
            v-if="currentTab != 'DashboardTab' && currentTab != 'ApprovalsTab'"
          >
            <!-- <SearchField /> -->
            <SearchField
              v-if="currentTab == 'SalesTab'"
              storePath="salesSales"
            />
            <SearchField
              v-if="currentTab == 'QuotationsTab'"
              storePath="contacts"
            />
            <SearchField
              v-if="currentTab == 'ContractsTab'"
              storePath="salesContract"
            />
          </div>
          <!-- <SearchField
            v-if="type != 'salesQuotation'"
            storePath="sales"
            class="max-width-152 pl-2"
          />
          <SearchField
            v-if="type == 'salesQuotation'"
            storePath="sales"
            class="max-width-273 pl-2"
          /> -->
          <!-- <TextField
            v-if="type != 'salesTimeLine'"
            v-model="searcher"
            placeholder="Search"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm 
            search-text"
            style="color: '#b9b9b9'; width: 150px"
            v-on:childToParent="globalSearcher"
          /> -->
        </div>
        <!--Create Company button-->

        <Buttons
          v-if="type == 'salesHome' && currentTab == 'SalesTab'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn min-width-99"
          label="Add New"
          v-on:childToParent="
            openDialog('CompanyCreationDialog', 'salesHome', 'Add New')
          "
        />

        <!-- <span class="mr-2" v-if="currentTab == 'ContractsTab'"
          ><SearchField storePath="contacts"
        /></span> -->
        <Buttons
          v-if="currentTab == 'ContractsTab'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn min-width-99"
          label="Bulk Adjustments"
          v-on:childToParent="redirect('BulkAdjustmentDialog')"
        />
        <!-- v-on:childToParent="
          openDialog('EditAdjustmentTwo', 'salesHome', 'Add New')
          " -->
        <!-- v-on:childToParent="
          openDialog('CompanyCreationDialog', 'salesHome', 'Add New')
          " -->
        <!-- v-on:childToParent="redirect('BulkAdjustmentDialog')" -->
        <!-- openDialog('BulkAdjustmentDialog', 'salesHome', 'New Bulk Adjustment') -->
        <!--Create Quotation button -->
        <div v-if="type == 'salesQuotation'" class="flex">
          <span class="mr-2"><SearchField storePath="salesSales" /></span>
          <Buttons
            v-if="
              profileCreationData?.profile_type == 'company' &&
              !$route?.params?.actionType?.includes('Adhoc')
            "
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            label="Adhoc Profile"
            v-on:childToParent="adhocProfile()"
          />
          <Buttons
            v-if="$route?.params?.actionType == 'AdhocProfile'"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            label="New Profile"
            v-on:childToParent="newProfile()"
          />
          <Buttons
            v-if="$route?.params?.actionType != 'AdhocProfile'"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            label="Create Quotation"
            id="CreateNewQuotationSec"
            @click="
              openDialog('QuotationTypeDialog', 'salesSales', 'Select Method')
            "
          />
        </div>
      </div>
    </div>

    <!-- tab-content -->
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <keep-alive
          v-if="
            $route?.params?.actionType != 'AdhocProfile' &&
            type == 'salesHome' &&
            (tabs.label != 'ApprovalsTab' ||
              tabs.label != 'DashboardTab' ||
              tabs.label != 'ContractsTab')
          "
        >
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state[tabs.store][tabs.data]"
            :tableColumns="$store.state[tabs.store][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive
          v-if="
            type == 'salesQuotation' &&
            $route?.params?.actionType != 'AdhocProfile'
          "
        >
          <component v-bind:is="tabs.tab" :tableDataName="tabs.data"></component
        ></keep-alive>
        <keep-alive v-if="$route?.params?.actionType == 'AdhocProfile'">
          <component v-bind:is="'AdhocProfileTable'"></component
        ></keep-alive>
      </div>
    </div>
  </div>
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['quotation'].dialogComponent"
  />
  <!-- <ApprovalDialog
    v-on:childToParent="openDialog"
    :dialogComponent="$store.state['quotation'].dialogComponent"
  /> -->
</template>

<script>
import Dialogs from "./Sales/Dialog.vue";
import BulkAdjustmentDialog from "./Sales/Bulk Adjustment/BulkAdujustment.vue/BulkSAdjustmentDialog.vue";
import DashboardPage from "../../views/Modules/Sales/Dashboard.vue";
import SalesDataTable from "./Sales/DataTable.vue";
import QuotationDataTable from "./Quotation/DataTable.vue";
import QuotationTabTable from "../../views/Modules/Sales/QuotationTab.vue";
import AdhocProfileTable from "../../views/Modules/Sales/AdhocProfile.vue";
import ContractTabTable from "../../views/Modules/Sales/ContractTab.vue";
import ReportDataTable from "./Report/DataTable.vue";
import ContractPage from "../../views/Modules/Sales/ContractPage.vue";
import ContractDataTable from "./Contract/DataTable.vue";
import ApprovalsPage from "../../views/Modules/Sales/ApprovalsPage.vue";
import ApprovalsDataTable from "./Approvals/DataTable.vue";
import { mapActions, mapGetters } from "vuex";
import { sales_IC, adhoc_pro_fun, salesCommon } from "../../store/helper";
// import ApprovalDialog from "../Settings/Quotation/Dialog.vue"
// import ExpressContractBikeCostCenter from "./QuotationTypes/Express/Contract/Bike/Overview/CostCenter/Index.vue";
// import ExpressContractBikeBillPreferences from "./QuotationTypes/Express/Contract/Bike/Overview/BillPreferences.vue";
export default {
  name: "SalesTabs",
  props: ["tabMenuData", "type"],
  components: {
    // ApprovalDialog,
    SalesDataTable,
    QuotationDataTable,
    QuotationTabTable,
    AdhocProfileTable,
    ContractTabTable,
    ApprovalsPage,
    ApprovalsDataTable,
    DashboardPage,
    ReportDataTable,
    ContractPage,
    ContractDataTable,
    Dialogs,
    BulkAdjustmentDialog,
    // ExpressContractBikeCostCenter,
    // ExpressContractBikeBillPreferences,
  },
  data: () => ({
    defaultTabIndex: 0,
    adhocProfileShow: false,
    currentTab: "DashboardTab",
  }),
  computed: {
    ...sales_IC,
    ...mapGetters({
      selectedTab: "salesSales/selectedTab",
    }),
  },
  methods: {
    ...adhoc_pro_fun,
    ...salesCommon,
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    ...mapActions({
      setSelectedTab: "salesSales/setSelectedTab",
    }),

    adhocProfile() {
      this.$router.push({
        name: "AdhocProfile",
        params: {
          id: this.$route.params.id,
          actionType: "AdhocProfile",
        },
      });
      this.loadTableData({ id: this.$route.params.id });
    },
    newProfile() {
      this.clearAdhocProfile();
      this.openCommonDialog({
        dialogDetails: {
          dialogName: "CreateProfile",
          dialogHeader: "New Adhoc Profile",
        },
      });
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    // eslint-disable-next-line no-unused-vars
    getOverlayData(tableName) {
      return this.$store.state.masters.expressRegionsOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      this.$store.state.salesSales.ratesCurrentTab = tab;
      this.setSelectedTab(tab);
      if (tab == "DashboardTab") {
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Dashboard`;
      }
      if (tab == "SalesTab") {
        this.$store.dispatch("salesSales/loadSalesTabData");
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Sales`;
      }
      if (tab == "QuotationsTab") {
        this.$store.dispatch("SalesQuotation/loadQuotationTabData");
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Quotation`;
      }
      if (tab == "ContractsTab") {
        this.$store.dispatch("salesContract/loadContractTabData");
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Contracts`;
      }
      if (tab == "ReportsTab") {
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Reports`;
      }
      if (tab == "ApprovalsTab") {
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Approvals`;
      }
      //second page
      else if (tab == "Quotation") {
        this.$store.dispatch("salesSales/loadQuotationTabTableData", {
          id: this.$route.params.id,
        });
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Sales > Quotations`;
      } else if (tab == "Contract") {
        this.$store.dispatch("salesSales/loadContractTabTableData", {
          id: this.$route.params.id,
        });
        this.$store.state.users.breadcrumbTitle = "Sales";
        this.$store.state.users.breadcrumbPath = `Sales > Sales > Contracts`;
      }
    },

    openDialog(name, type, header) {
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
  },
  mounted() {
    if (this.$store.state.salesSales.ratesCurrentTab != null) {
      let lableName = this.$store.state.salesSales.ratesCurrentTab;
      if (document.getElementById(`pills-${lableName}-tab`)) {
        document.getElementById(`pills-${lableName}-tab`).click();
      } else {
        this.currentTab = this.defaultTab;
      }
    } else {
      this.currentTab = this.defaultTab;
    }
    this.$store.dispatch("salesInternationalContract/getProfileCreationData", {
      path: "/sales/profiles/" + this.$route.params.id,
    });
    if (this.$route?.params?.actionType == "AdhocProfile") {
      this.loadTableData({ id: this.$route.params.id });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: #fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
::v-deep .p-datatable .p-sortable-column .p-sortable-column-icon {
  color: #7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0 5px !important;
  // padding-left: 20px !important;
}
// ::v-deep .p-datatable.p-datatable-sm {
//   padding-left: 27px;
// }
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background-color: #fff;
}
// .nav-pills .nav-link.active{
//   background: #fff;
//   color: #7e84a7;
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 17px;
//   border-radius: 4px;
// }
.p-button.p-button-sm {
  background-color: #357dea !important;
}
::v-deep .heading {
  color: #4e5868;
}
::v-deep .sub {
  color: #7e84a7;
}
.backText {
  font-size: 14px;
  color: #7e84a7;
  font-weight: 600;
}
// .nav-pills {
//   background: #2196f3 !important;
//   border-radius: 4px !important;
// }
// .nav-pills .nav-link.active {
//   background: #fff;
//   color: #2196f3;
//   font-weight: bold;
// }
// .nav-link {
//   color: #fff;
//   font-family: $font-family-primary;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 600;
//   letter-spacing: 0.03em;
//   text-align: left;
// }
// .tab-express-text {
// font-weight: 600;
// font-size: 12px;
// line-height: 15px;
// letter-spacing: 0.03em;
// color: #ebbd46;

// }
// .tab-international-text {
// font-weight: 600;
// font-size: 12px;
// line-height: 15px;
// letter-spacing: 0.03em;
// color: #7469f2;

// }
// .tab-rapido-text {
// font-weight: 600;
// font-size: 12px;
// line-height: 15px;
// letter-spacing: 0.03em;
// color: #55ba6b;
// }
</style>