<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Status Settings</span>
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
          label="Export"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Import button -->
        <Buttons
          label="Import"
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

    <div class="flex ml-2">
      <div class="flex flex-row flex-wrap">
        <div class="flex tabPills mr-6">
          <!-- tabs -->
          <ul
            class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
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
                @click="tabChange(tabs)"
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
    </div>

    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <keep-alive>
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :tabPageOffset="tabs.pageOffset"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['operationsStatusSettings'][tabs.data]"
            :totalRecords="
              $store.state['operationsStatusSettings']['totalRecords']
            "
            :tableColumns="
              $store.state['operationsStatusSettings'][tabs.columns]
            "
            v-bind:is="tabs.tab"
            :currentTab="currentTab"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
  <component
    :dialogComponent="dialogComponent"
    :selectedTab="currentTab"
    v-bind:is="initialComponent"
  />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import StatusSettingsTable from "./statusSettingsTable.vue";
import StatusSettingsMainDialog from "../../../../components/Operations/statusSettingsMainDialogue.vue";

export default {
  name: "StatusSettings",
  components: {
    InputText,
    StatusSettingsTable,
    StatusSettingsMainDialog,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "ExpressTab",
    searchValue: "",
    initialComponent: '',
  }),
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    ...mapActions({
      expressDataFetch: "operationsStatusSettings/loadExpressDataFetch",
      rapidoDataFetch: "operationsStatusSettings/loadRapidoDataFetch",
      internationalDataFetch:
        "operationsStatusSettings/loadInternationalDataFetch",
      globalSearch: "operationsStatusSettings/commonSearchData",
      showStatusDialog: "operationsStatusSettings/showStatusSettingsDialog",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.commonOverlayData;
    },
    async tabChange(tab) {
      this.currentTab = tab.label;
      this.$store.state.operationsStatusSettings.tableLoad = true;

      if (this.currentTab == "ExpressTab") {
        this.expressDataFetch(this.currentTab);
      } else if (this.currentTab == "RapidoTab") {
        this.rapidoDataFetch(this.currentTab);
      } else {
        this.internationalDataFetch(this.currentTab);
      }
    },
    openDialog() {
      this.dialogComponent = "statusSettingsDialog";
      this.initialComponent = 'statusSettingsMainDialog';
      this.showStatusDialog(true);
    },
    search: _.debounce(function (e) {
      let data = {
        label: this.currentTab,
        searchValue: this.searchValue,
      };
      this.globalSearch(data);
    }, 600),
  },
  computed: {
    ...mapGetters({
      tabMenuData: "operationsStatusSettings/getStatusSettingsTabMenuData",
    }),
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Status Settings",
      breadcrumbInfo: "Operations > Status Settings",
    });
    this.expressDataFetch(this.currentTab);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.operations-zones-tab-nav {
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}

::v-deep
  [data-v-1f88fdea]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon,
::v-deep
  [data-v-c02eca38]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.nav-pills .nav-link.active[data-v-1f88fdea] {
  font-family: $font-family-third !important;
}
// ::v-deep .p-datatable.p-datatable-sm .p-datatable-header {
//   margin-left: 12px;
// }
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
</style>
