<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <span class="table-title">Countries Settings</span>
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
          label="Export"
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
      <countrySettingsTable
        tableClass="p-datatable-sm"
        tableDataName="CountrySettingsTable"
        :tableData="getCountrySettingsTableData"
        :tableColumn="tableColumn"
        @emittedEditCountryParent="emittedEditCountryParent"
        :editCountryValue="editCountryValue"
        @tableData="stateTableData"
      />
    </div>
  </div>

  <CRMCountrySettingsDialog
    :dialogComponent="dialogComponent"
    v-bind:is="initialComponent"
    :emittedCountryData="emittedCountryData"
    :editCountryValue="editCountryValue"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import CRMCountrySettingsDialog from "../../../components/CRM/crmCountrySettingsDialog.vue";
import { countrySettingsTableHeader } from "../../../components/Reusables/CRM/Const";
import countrySettingsTable from "./DataTable/countrySettingsTable.vue";
export default {
  name: "countriesSettings",
  components: {
    InputText,
    CRMCountrySettingsDialog,
    countrySettingsTable,
  },
  data: () => ({
    searchValue: "",
    dialogComponent: "DocumentDetailDialog",
    initialComponent: "",
    tableColumn: countrySettingsTableHeader,
    emittedCountryData: null,
    editCountryValue: null,
  }),
  methods: {
    ...mapActions({
      showCountrySettingsDialog: "CrmSettings/showCountrySettingsDialog",
      getCountrySettingsData: "CrmSettings/getCountrySettingsData",
      commonSearchForCountrySettings:
        "CrmSettings/commonSearchForCountrySettings",
    }),

    openDialog() {
      this.initialComponent = "CRMCountrySettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showCountrySettingsDialog(dialogData);
      if (this.updateBtn == false) {
        this.emittedJobTypeData = null;
      }
    },
    stateTableData(value) {
      this.editCountryValue = value;
    },
    emittedEditCountryParent(data) {
      this.editCountryValue = data;
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showCountrySettingsDialog(dialogData);
      this.emittedCountryData = data;
    },
    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.commonSearchForCountrySettings(data);
    }, 600),
  },
  mounted() {},
  created() {
    this.getCountrySettingsData();
  },
  computed: {
    ...mapGetters({
      getCountrySettingsTableData: "CrmSettings/getCountrySettingsTableData",
      updateBtn: "CrmSettings/updateBtn",
    }),
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
