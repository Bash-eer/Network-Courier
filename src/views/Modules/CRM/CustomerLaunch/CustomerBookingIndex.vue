<template>
  <div>
    <div class="bg-linear min-height-45 border-radius-18 pb-4 mt-4">
      <div class="d-flex">
        <h4 class="bold-700 color-fff font-size-18 font-family-third pt-4 pl-6">
          Customer Booking
        </h4>
        <Buttons
          label="New Customer"
          button_class="buttonClass-customer-launch margin-right-48 bold-700 bg-fff color-357dea font-size-14 margin-left-auto align-self-end margin-right-48"
          @click="openNewCUstomer"
        />
      </div>

      <div
        class="
          margin-bottom-16px margin-top-16px margin-left-48 margin-right-48
          bg-fff
          border-radius-5
          min-height-30
        "
      >
        <div class="d-flex">
          <div class="mt-2 w-50">
            <SelectButton
              v-model="selectedTab"
              optionLabel="tab"
              class="mr-5 ml-4 pt-2"
              :options="tabs"
            />
          </div>

          <span
            class="
              flex flex-row
              w-50
              justify-content-end
              p-input-icon-left
              mt-2
              mr-2
            "
          >
            <i class="pi pi-search pb-2 justify-content-end" />
            <InputText
              class="h-2.5rem w-30rem pl-2"
              type="text"
              v-model="value3"
              placeholder="Search by Collection Slips"
            />
          </span>
        </div>

        <div
          v-if="selectedTab.tab == 'Express' || 'International'"
          class="d-flex ml-4 mt-4"
        >
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

          <div class="flex" v-if="selectedTab.tab == 'International'">
            <div class="field-radiobutton mr-4">
              <RadioButton
                id="city3"
                name="city"
                value="Agent"
                v-model="selectedCustomer"
              />
              <label
                :class="
                  selectedCustomer == 'Agent'
                    ? 'color-1e90ff font-size-16'
                    : 'color-c4c4c4 font-size-16'
                "
                for="city2"
                >Agent</label
              >
            </div>
          </div>
          <!--************* this code under discussion ***************** -->
          <!-- <div class="flex">
            <div class="field-radiobutton mr-4">
              <RadioButton
                id="city4"
                name="city"
                value="History"
                v-model="selectedCustomer"
              />
              <label
                :class="
                  selectedCustomer == 'History'
                    ? 'color-1e90ff font-size-16  show'
                    : 'color-c4c4c4 font-size-16'
                "
                for="city3"
                >History</label
              >
            </div>
          </div> -->
        </div>
        <!-- <div v-if="selectedCustomer == 'History'" class="d-flex ml-4 mt-2">
          <div class="flex">
            <div class="field-radiobutton mr-4">
              <RadioButton
                id="city1"
                name="city"
                value="Contract"
                v-model="selectedCustomerHistory"
              />
              <label
                :class="
                  selectedCustomerHistory == 'Contract'
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
                v-model="selectedCustomerHistory"
              />
              <label
                :class="
                  selectedCustomerHistory == 'Adhoc'
                    ? 'color-1e90ff font-size-16'
                    : 'color-c4c4c4 font-size-16'
                "
                for="city2"
                >Adhoc Customer</label
              >
            </div>
          </div>
        </div> -->

        <div class="d-flex pb-4 mt-2 relative">
          <InputText
            class="w-100 ml-4 mr-4 pt-3 pb-3 border-radius-10"
            type="text"
            placeholder="Search by Customer ID, Company Name, Cost-Center-Name"
            v-model="inputSearch"
          />
          <Buttons
            label="Go"
            button_class="buttonClass-customer-launch-go bold-700 bg-fff color-357dea font-size-18 color-fff bg-1e90ff absolute border-radius-3  BtnAbsolute-customer-card "
            @click="go()"
          />
        </div>
      </div>
    </div>
    <div>
      <h2 class="color-4e5968 bold-700 font-size-18 mt-4 mb-4 ml-3">Result</h2>
    </div>
    <!-- Result Content -->
    <DataTable
      tableName="fuelChargesTable"
      tableClass="p-datatable-sm QuotationTabTable"
      :tableData="getCompanyCostCenters"
      :tableColumns="tableColumns"
      :selectedTabValues="selectedTab"
      :selectedCustomer="selectedCustomer"
      :selectedCustomerHistory="selectedCustomerHistory"
      @emittedCostCenterResponse="emitedResponseCostCenter"
    />
  </div>
  <SalesDialogs
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import SalesDialogs from "../../../../components/Sales/Sales/Dialog.vue";
import SelectButton from "primevue/selectbutton";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import DataTable from "../../../../components/Reusables/CRM/DataTable.vue";
import {
  CustomerLaunchColumnData,
  CustomerLaunchColumnFields,
} from "../../../../components/Reusables/CRM/Const";
import { crm_launch } from "../../../../store/modules/CRM/helper";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CustomerBookingIndex",
  components: { SelectButton, RadioButton, InputText, DataTable,SalesDialogs },
  created() {
    this.selectedCategory = this.categories[1];
    this.selectedTab.tab = this.$store.state.CustomerLaunchStore?.tabChnageInCrm
      ? this.$store.state.CustomerLaunchStore.tabChnageInCrm.tab
      : "International";
    this.selectedTab.name = this.$store.state.CustomerLaunchStore
      ?.tabChnageInCrm
      ? this.$store.state.CustomerLaunchStore.tabChnageInCrm.name
      : "CustomerBookingIndex";
  },
  data() {
    return {
      searcher: "",
      tableColumns: CustomerLaunchColumnFields,
      selectedCustomer: "Contract",
      selectedCustomerHistory: "Contract",
      inputSearch: null,
      categories: [
        { name: "Accounting", key: "A" },
        { name: "Marketing", key: "M" },
        { name: "Production", key: "P" },
        { name: "Research", key: "R" },
      ],
      expressContractTableData: [
        {
          id: 90,
          sno: "123CZZ",
          cmpny_name: "21st Century Computing Sol...",
          address: "No.1 Second Chin Bee",
          email_id: "Catherine@gmail.com",
          telephone_no: "+65 45622134",
          postal_code: "238801",
          created_by: "Catherine",
          createdAt: "24th Jun, 2021",
          actions: "",
          orders: [
            {
              id: 1,
              costCenter: "MNCH458",
              department: "Network - Admin",
              address: "100 Jln Sultan #09-11 Sultan",
              location: "Airport",
              returnTrip: "Yes",
              action: "",
            },
          ],
        },
        {
          id: 92,
          sno: "3",
          cmpny_name: "KFC One",
          address: "65",
          email_id: "suryak@mail.com",
          telephone_no: "1234567890",
          created_by: "Jacob",
          createdAt: "24th June 22",
          actions: "",
        },
      ],
      selectedCategory: null,
      details: {},
      showAddNew: true,
      tabs: [
        {
          tab: "International",
          name: "CustomerBookingIndex",
        },
        {
          tab: "Express",
          name: "BookingHistory",
        },
        {
          tab: "Rapido",
          name: "CustomerBookingIndex",
        },
      ],
      selectedTab: {
        tab: "International",
        name: "CustomerBookingIndex",
      },
    };
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
      getCompanyCostCenterList: "CustomerLaunchStore/getCompanyCostCenterList",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      getSurchargeDropDownList: "CustomerLaunchStore/getSurchargeDropDownList",
      getCompanyCostCenterListSearch:
        "CustomerLaunchStore/getCompanyCostCenterListSearch",
    }),
    openNewCUstomer(){
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "CompanyCreationDialog",
          dialogHeader: "Add New",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
    async emitedResponseCostCenter(obj, type) {
      if (obj) {
        let idData = obj.id;
        await this.getCrmBookingDetails(idData);
        this.fetchState({ surchargeDropDownListState: [] });
        if (this.selectedCustomer != "Adhoc") {
          await this.getSurchargeDropDownList(obj.contract_id);
          await this.getCrmCollerDropDown({ type: "Contract", id: idData });
        } else {
          this.getAdhocSurcharges({
            payload: { postal_code: "657656" },
            toast: this.$toast,
          });
          await this.getCrmCollerDropDown({ type: "Adhoc", id: idData });
        }

        await this.getCustomerDData({
          c_type: this.selectedTab.tab,
          b_type: this.selectedCustomer,
          toast: this.$toast,
        });
        this.$router.push({
          name: "customerDetailsCrm",
          params: {
            type: this.selectedCustomer,
          },
        });
      }
    },
    go() {
      if (this.inputSearch) {
        let data = {
          pagination: 10,
          page: 1,
          input: this.inputSearch,
          tab: this.selectedTab.tab,
          business_type: this.selectedCustomer,
        };
        this.getCompanyCostCenterListSearch(data);
      }
    },
  },
  watch: {
    selectedTab: async function (newVal, oldVal) {
      this.inputSearch = "";
      this.selectedTab = newVal;
      let datas = {
        customer_type: newVal.tab,
        business_type: this.selectedCustomer,
      };
      await this.getCompanyCostCenterList(datas);
      this.$store.state.CustomerLaunchStore.tabChnageInCrm = newVal;
    },
    inputSearch: {
      handler() {
        if (this.inputSearch.length === 0) {
          let datas = {
            customer_type: this.selectedTab.tab,
            business_type: this.selectedCustomer,
          };
          this.getCompanyCostCenterList(datas);
        }
      },
      deep: true,
    },
    selectedCustomer: async function (newVal, oldVal) {
      this.selectedCustomer = newVal;
      let activeTab = this.selectedTab.tab;
      let datas;
      datas = {
        customer_type: activeTab,
        business_type: this.selectedCustomer,
      };

      if (this.selectedCustomer == "History") {
        datas = {
          customer_type: activeTab,
          business_type: "Contract",
        };
      }
      await this.getCompanyCostCenterList(datas);
    },
    selectedCustomerHistory: async function (newVal, oldVal) {
      let activeTab = this.selectedTab.tab;
      let datas;
      if (this.selectedCustomerHistory == "Contract") {
        datas = {
          customer_type: activeTab,
          business_type: "Contract",
        };
      } else if (this.selectedCustomerHistory == "Adhoc") {
        datas = {
          customer_type: activeTab,
          business_type: "Adhoc",
        };
      }
      await this.getCompanyCostCenterList(datas);
    },
  },
  computed: {
    ...mapGetters({
      selectedCostCenterMethod: "CustomerLaunchStore/selectedCostCenterMethod",
      getCompanyCostCenters: "CustomerLaunchStore/getCompanyCostCenters",
    }),
  },
  async mounted() {
    let activeTab = this.selectedTab.tab;
    let datas = {
      customer_type: activeTab,
      business_type: this.selectedCustomer,
    };
    await this.getCompanyCostCenterList(datas);
  },
};
</script>
<style scoped>
::v-deep .p-selectbutton .p-button.p-highlight {
  color: #fff !important;
}

::v-deep .p-input-icon-left > i:first-of-type {
  margin-left: 18rem !important;
  left: 355px !important;
}
</style>
