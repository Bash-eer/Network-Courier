<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Movement Chart</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <Buttons
          label="Export"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
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
            :tabPageOffset="
              $store.state['operationsMovementChart'][tabs.pageOffset]
            "
            :overlayData="overlayListData"
            :tableData="$store.state['operationsMovementChart'][tabs.data]"
            :totalRecords="
              $store.state['operationsMovementChart']['totalRecords']
            "
            :tableColumns="
              $store.state['operationsMovementChart'][tabs.columns]
            "
            dataKey="id"
            :selectedRowData="selectedRow"
            v-bind:is="tabs.tab"
            :currentTab="currentTab"
            @emitPrintLabelData="showPrintLabelDialog"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>

  <component
    :dialogComponent="dialogComponent"
    :dialogData="updateStatusDialogData"
    :title="dialogTitle"
    v-bind:is="initialComponent"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import MovementChartTable from "./movementChartTable.vue";
import MovementChartPrintPreviewMain from "../../../../components/Operations/movementChartPreviewDialogMain.vue";

export default {
  name: "MovementChartTab",
  components: {
    InputText,
    MovementChartTable,
    MovementChartPrintPreviewMain,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "Bike",
    searchValue: "",
    dialogTitle: "",
    updateDialogData: "",
    initialComponent: "",
    dialogComponent: "",
    selectedRow: [],
  }),
  methods: {
    ...mapActions({
      movementDataFetch: "operationsMovementChart/loadMovementChartList",
      isMovementChartPrintLabelDialog:
        "operationsMovementChart/showPrintPreviewDialog",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.zonesOverlayData;
    },
    async tabChange(tab) {
      if (this.currentTab !== tab.label) {
        this.currentTab = tab.label;
        this.loadInitialTableData();
        this.selectedRow = [];
      }
    },
    showPrintLabelDialog(data) {
      this.updateDialogData = data.data;
      this.dialogTitle = data.title;
      const dialogData = {
        displayDialog: true,
        formData: this.updateDialogData,
      };
      this.initialComponent = "MovementChartPrintPreviewMain";
      this.dialogComponent = "MovementChartPrintPreview";
      this.isMovementChartPrintLabelDialog(dialogData);
    },
    async loadInitialTableData() {
      let paginationParams = {
        offset: 1,
        limit: 10,
        filter_params: [],
        orderBy: [],
        logistic_mode: this.currentTab,
      };
      this.movementDataFetch(paginationParams);
    },
  },
  computed: {
    ...mapGetters({
      tabMenuData: "operationsMovementChart/getMovementChartTabMenuData",
      overlayListData: "operationsMovementChart/getMovementChartOverlayData",
    }),
  },
  created() {
    this.loadInitialTableData();
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
