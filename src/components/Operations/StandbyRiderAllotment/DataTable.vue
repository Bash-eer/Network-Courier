<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    :resizableColumns="true"
    class="p-datatable-lg"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    @rowExpand="onRowExpand"
    @rowUnselect="onRowUnselect"
    filterDisplay="menu"
    :dataKey="'id'"
    selectionMode="single"
    :globalFilterFields="getGlobalFields()"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="10"
    v-model:editingRows="editingRows"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    :key="renderkey"
  >
    <template #empty><div class="p-3">No data found.</div></template>
    <div v-if="this.tableDataName != 'BikeDefaultAllotmentData'">
      <Column
        :expander="true"
        headerStyle="width: 1rem"
        class="expander"
        v-if="this.tableDataName != 'VanstandbyAllotmentData'"
      />
    </div>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S.No' &&
        col.header != 'S.No' &&
        col.header != ' '
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != 'Actions' && col.header != ' ' ? true : false"
      class="colDesign"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : S.no-->

        <span v-if="col.header == 'Date'" class="ml-2 colDesign">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span v-if="col.header == 'Created On'" class="ml-2 colDesign">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span v-if="col.header == 'S.No'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>

        <!-- TEMPLATE : Driver -->

        <span v-if="col.header == 'Driver'" class="mr-2">
          <div class="flex flex-row mt-4">
            <div class="flex mr-2">
              <img
                v-if="slotProps.data['profile_url'] != null"
                :src="slotProps.data['profile_url']"
                class="contactsImage"
              />

              <AvatarLabel
                v-else
                :label="subStringHandler(slotProps.data.profile_name)"
                classes="avatar-text"
              />
            </div>

            <div class="flex flex-column mt-2">
              <div class="heading">{{ slotProps.data["profile_name"] }}</div>
              <div class="sub">{{ slotProps.data[col.field] }}</div>
            </div>
          </div>
        </span>
        <!-- DropDown -->

        <span v-if="col.header == 'Zone'" class="ml-2 colDesign">
          {{ slotProps.data["zone_name"] }}
        </span>
        <span v-if="col.header == 'Route'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>
        <span v-if="col.header == ' '" class="ml-2 mb-3">
          <div @click="deleteRow(slotProps)"><i class="pi pi-trash"></i></div>
        </span>

        <div v-if="tableName == 'BikeAllotmentDataTable'">
          <div v-for="list of dynamicColumn" :key="list">
            <span v-if="col.header == list?.field" class="ml-2">
              <div
                :key="renderkey"
                class="bgcolor"
                v-if="slotProps.data[col.header]['conflict'] == true"
                @click="bikeExpand(slotProps.data[col.header], slotProps)"
              >
                <span><i class="pi pi-users mr-2"></i></span>
                <span>Multiple Riders</span>
                <span
                  v-tooltip.top="{
                    value: toolTipString,
                  }"
                  ><i class="pi pi-info-circle ml-2"></i
                ></span>
              </div>
              <div :class="getColorData(slotProps.data[col.header]['color'])">
                <DropDownWithButtons
                  @click="dropDownclick(slotProps)"
                  :data="
                    dropDownDataoptionsRider
                      ? dropDownDataoptionsRider
                      : dropDownDataBike
                  "
                  :rowData="slotProps.data"
                  :colorr="slotProps.data[col.header]['conflict']"
                  :field="list.field"
                  tableDataName="BikeDefaultAllotmentData"
                  storePath="operationAllotment"
                  class="text-left w-100"
                />
              </div>
            </span>
          </div>
        </div>

        <div v-if="tableName == 'VanAllotmentDataTable'">
          <div v-for="list of dynamicColumn" :key="list">
            <span v-if="col.header == list?.header" class="ml-2">
              <div
                :key="renderkey"
                class="bgcolor"
                v-if="slotProps.data[col.header]['conflict'] == true"
                @click="vanExpand(slotProps.data[col.header], slotProps)"
              >
                <span><i class="pi pi-users mr-2"></i></span>
                <span>Multiple Riders</span>
                <span
                  v-tooltip.top="{
                    value: toolTipStringVan,
                  }"
                  ><i class="pi pi-info-circle ml-2"></i
                ></span>
              </div>
              <div :class="getColorData(slotProps.data[col.header]['color'])">
                <DropDownWithButtons
                  @click="dropDownclickVan(slotProps)"
                  :data="
                    dropDownDataoptionsRider
                      ? dropDownDataoptionsRider
                      : dropDownDataVan
                  "
                  :rowData="slotProps.data"
                  :colorr="slotProps.data[col.header]['conflict']"
                  :field="list.field"
                  tableDataName="VanDefaultAllotmentData"
                  storePath="operationAllotment"
                  class="text-left w-100"
                />
              </div>
            </span>
          </div>
        </div>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header == 'Status'">
          <DropDownField
            code="code"
            v-model="filterModel.value"
            :value="filterModel.value"
            :options="[
              { name: 'Active', code: 'Active' },
              { name: 'Inactive', code: 'Inactive' },
              { name: 'Deleted', code: 'Deleted' },
            ]"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          />
        </span>
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On' && col.header != 'Status'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div v-if="this.tableName == 'BikeRiderAllotmentDataTable'">
        <ExpandedTable
          tableName="RiderExpandedTable"
          :tableData="tableDataBike"
          :dateData="slotProps"
          :tableColumns="this.RiderAllotmentExpansionTableColumnData"
        />
      </div>
      <div v-if="this.tableName == 'VanRiderAllotmentDataTable'">
        <ExpandedTable
          tableName="RiderExpandedTableVan"
          :tableData="tableDataVan"
          :dateData="slotProps"
          :tableColumns="this.RiderAllotmentExpansionTableColumnData"
        />
      </div>
    </template>
  </DataTable>
  <div>
    <!-- <EmptyTemplate /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ExpandedTable from "./ExpandedTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import axios from "axios";
import DropDownWithButtons from "./DropDownWithButtons.vue";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Tooltip from "primevue/tooltip";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    DropDownWithButtons,
    InputText,
    ExpandedTable,
  },
  directives: {
    tooltip: Tooltip,
  },
  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
    "dataKey",
    "dynamicColumn",
    "key",
    "expanddata",
  ],
  data() {
    return {
      data: [],
      Dropdata: [],
      expandedRows: [],
      filters: null,
      searcher: "",
      rowSelect: null,
      tableDataBike: [],
      tableDataVan: [],
      editingRows: [],
      postBikeData: {},
      postVanData: {},
      postConflictdatabike: {},
      postConflictdatavan: {},
      dropDownDataoptionsRider: null,
      DrapdownData: {},
      bike_zone: [],
      riderTipToolData: [],
      riderTipToolDataVan: [],
      toolTipString: "",
      toolTipStringVan: "",
      details: {
        checkbox: false,
        Van_zone: "",
        clearance_mode_name: "",
      },
      dropDownDataBike: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      dropDownDataVan: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      renderkey: 10,
      //adhoc sub table overlay data
      RiderAllotmentOverlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Disable",
          icon: " far fa-circle",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      RiderAllotmentExpansionTableColumnData:
        "operationAllotment/RiderAllotmentExpansionTableColumnData",
      VanExpandTableHeadingData:
        "operationAllotment/RiderAllotmentExpandTableDataBike",
    }),
    ...mapState({
      BikeExpandTableHeadingData: (state) =>
        state.operationAllotment.RiderAllotmentExpandTableDataBike,
      VanExpandTableHeadingData: (state) =>
        state.operationAllotment.RiderAllotmentExpandTableDataVan,
      multipleRiderDataBike: (state) =>
        state.operationAllotment.multipleRiderData,
      riderDropDownOptionDataStanby: (state) =>
        state.operationAllotment.riderDropDownOptionDataStanby,
    }),
  },
  methods: {
    ...mapActions({
      loadfetchRiderAllotmentExpandTableDataBike:
        "operationAllotment/loadfetchRiderAllotmentExpandTableDataBike",
      loadfetchRiderAllotmentExpandTableDataVan:
        "operationAllotment/loadfetchRiderAllotmentExpandTableDataVan",
    }),
    async onRowExpand(event) {
      if (this.tableName == "BikeRiderAllotmentDataTable") {
        await this.loadfetchRiderAllotmentExpandTableDataBike({
          id: event.data.id,
        });
      }
      if (this.tableName == "VanRiderAllotmentDataTable") {
        await this.loadfetchRiderAllotmentExpandTableDataVan({
          id: event.data.id,
        });
      }
    },
    getTableDataBike() {
      let s_no = 1;
      let index = 0;
      this.tableDataBike = [];
      for (let i in this.BikeExpandTableHeadingData) {
        let n = index++;
        this.tableDataBike[n] = {};

        this.tableDataBike[n].trip_name =
          this.BikeExpandTableHeadingData[i].trip?.trip_name;
        this.tableDataBike[n].trip_id =
          this.BikeExpandTableHeadingData[i].trip?.id;
        this.tableDataBike[n].employee_name =
          this.BikeExpandTableHeadingData[i].rider?.employee_name;
        this.tableDataBike[n].image_url =
          this.BikeExpandTableHeadingData[i].rider?.image_url;
        this.tableDataBike[n].s_no = s_no++;
        this.tableDataBike[n].id = this.BikeExpandTableHeadingData[i]?.id;
      }
    },
    deleteRow(data) {
      if (this.tableName == "BikeRiderAllotmentDataTable") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.$store.dispatch("operationAllotment/DELETECRUDOPERATION", {
              path: "/operations/rider-allot/standby/bike/" + data.data.id,
              method: "DELETE",

              toastData: {
                toastSuccessData: {
                  toastMsg: `The Row is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the Row, try again!",
                  toastSeverity: "error",
                },
              },
              loadpath: "/operations/rider-allot/standby/bike",
              loaddata: [],
              loadmethod: "POST",
              loadData:
                "operationAllotment/POSTPATCHCRUDOPERATIONRIDERALLOTMENTBIKE",
            });
          },
        });
      } else if (this.tableName == "VanRiderAllotmentDataTable") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.$store.dispatch("operationAllotment/DELETECRUDOPERATION", {
              path: "/operations/rider-allot/standby/van/" + data.data.id,
              method: "DELETE",

              toastData: {
                toastSuccessData: {
                  toastMsg: `The Row is deleted successfully!`,
                  toastSeverity: "info",
                },
                toastErrorData: {
                  toastMsg:
                    "There was an error in deleting the Row, try again!",
                  toastSeverity: "error",
                },
              },
              loadpath: "/operations/rider-allot/standby/van",
              loaddata: [],
              loadmethod: "POST",
              loadData:
                "operationAllotment/POSTPATCHCRUDOPERATIONRIDERALLOTMENTVAN",
            });
          },
        });
      }
    },
    getTableDataVan() {
      let s_no = 1;
      let index = 0;
      this.tableDataVan = [];
      for (let i in this.VanExpandTableHeadingData) {
        let n = index++;
        this.tableDataVan[n] = {};
        this.tableDataVan[n].trip_id =
          this.VanExpandTableHeadingData[i].trip?.id;
        this.tableDataVan[n].trip_name =
          this.VanExpandTableHeadingData[i].trip?.trip_name;
        this.tableDataVan[n].employee_name =
          this.VanExpandTableHeadingData[i].rider?.employee_name;
        this.tableDataVan[n].image_url =
          this.VanExpandTableHeadingData[i].rider?.image_url;
        this.tableDataVan[n].s_no = s_no++;
        this.tableDataVan[n].id = this.VanExpandTableHeadingData[i]?.id;
      }
    },
    dropdownchange() {},
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
    editProduct(data) {},
    subStringHandler(string) {
      if (string) {
        return string.substring(0, 2);
      }
    },
    rowClass(row) {
      for (var r in row) {
        if (r == "company_status") {
          if (row[r] == "deleted") {
            return "deleted_row";
          }
        }
      }
    },

    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    getStatusHandler(type) {
      let text;
      switch (type) {
        case "disabled":
          text = "Disabled";
          break;
        case "Deleted":
          text = "Deleted";
          break;
        case "Inactive":
          text = "Inactive";
          break;
        default:
          text = "Active";
      }
      return text;
    },
    onRowSelect(event) {},
    dropDownclick(slotProps) {
      this.postBikeData = {
        zone_id: slotProps.data.id,
      };
      this.addBikeZoneData();
    },
    dropDownclickVan(slotProps) {
      this.postVanData = {
        zone_id: slotProps.data.id,
      };
      this.addVanZoneData();
    },
    bikeExpand(column, data) {
      if (this.tableName == "BikeAllotmentDataTable") {
        this.postConflictdatabike = {
          from_date: this.$store.state.operationAllotment.DateData.from_date,
          to_date: this.$store.state.operationAllotment.DateData.to_date,
          zone_id: data.data.id,
          route_id: data.data.zone_id,
          trip_id: column.id,
        };
        this.postBikeConflictData();
        this.renderkey++;
      }
    },
    vanExpand(column, data) {
      if (this.tableName == "VanAllotmentDataTable") {
        this.postConflictdatavan = {
          from_date: this.$store.state.operationAllotment.DateDataVan.from_date,
          to_date: this.$store.state.operationAllotment.DateDataVan.to_date,
          zone_id: data.data.id,
          route_id: data.data.zone_id,
          trip_id: column.id,
        };
        this.postVanConflictData();
        this.renderkey++;
      }
    },
    getDropdownData() {
      this.dropDownDataBike = [];
      this.dropDownDataVan = [];
    },
    rowEditCancel() {},
    postBikeConflictData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONMULTIPLERIDER",
        {
          path: "/operations/rider-allotment/bike/view-conflict",
          data: this.postConflictdatabike,
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
    },
    postVanConflictData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONMULTIPLERIDER",
        {
          path: "/operations/rider-allotment/van/view-conflict",
          data: this.postConflictdatavan,
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
    },
    addBikeZoneData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONSTANDBYY",
        {
          path: "/operations/zone/rider/bike",
          data: this.postBikeData,
          method: "POST",
          loadData: "operationAllotment/loadBikeAllotmentTableData",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
    },
    addVanZoneData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONSTANDBYY",
        {
          path: "/operations/zone/rider/van",
          data: this.postVanData,
          method: "POST",
          loadData: "operationAllotment/loadBikeAllotmentTableData",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
    },

    getColorData(type) {
      let color;
      switch (type) {
        case true:
          color = "colorChange";
          break;
        default:
          color = "color-c11e1e";
      }
      return color;
    },
    contractClassHandler(type) {
      let typeColor;
      switch (type) {
        case "Rapido":
          typeColor = "color-55ba6b";
          break;
        case "International":
          typeColor = "color-7469F2";
          break;
        case "Express":
          typeColor = "color-EBBD46";
          break;
      }
      return typeColor;
    },
    contractImageClassHandler(type) {
      let typeImgClass;
      switch (type) {
        case "Rapido":
          typeImgClass = "rapido-img";
          break;
        case "International":
          typeImgClass = "international-img";
          break;
        case "Express":
          typeImgClass = "express-img";
          break;
      }
      return typeImgClass;
    },
    contractImagesHandler(type) {
      let img;
      switch (type) {
        case "Rapido":
          img = "/images/rapido.png";
          break;
        case "International":
          img = "/images/International.png";
          break;
        case "Express":
          img = "/images/Express.png";
          break;
      }
      return img;
    },

    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      };
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      };
      for (let c in this.tableColumns) {
        this.filters[this.tableColumns[c]["field"]] = obj;
        if (this.tableColumns[c]["field"] == "createdAt") {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
      }
    },
    TimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).utc().format("HH:mm");
        return formattedDate;
      }
    },

    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
        globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    globalSearcher(label, searchString) {
      this.$store.state["salesSales"].globalSearch = searchString;
    },
  },
  async created() {
    this.BikeExpandTableHeadingData = {};
    this.BikeExpandTableHeadingData;

    this.getTableDataBike();
    this.VanExpandTableHeadingData = {};
    this.VanExpandTableHeadingData;

    this.getTableDataVan();
    this.Dropdata =
      this.$store.state.operationAllotment.BikeDefaultRiderAllotmentTableData;
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.operationAllotment.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["operationAllotment"].globalSearch;
    },
    "$store.state.operationAllotment.RiderAllotmentExpandTableDataBike":
      function () {
        this.BikeExpandTableHeadingData = {};
        this.BikeExpandTableHeadingData;
        this.getTableDataBike();
      },
    "$store.state.operationAllotment.DropDownDataTableStandBy": function () {
      this.dropDownDataBike =
        this.$store.state.operationAllotment.DropDownDataTableStandBy;
      this.dropDownDataVan =
        this.$store.state.operationAllotment.DropDownDataTableStandBy;
    },
    "$store.state.operationAllotment.RiderAllotmentExpandTableDataVan":
      function () {
        this.VanExpandTableHeadingData = {};
        this.VanExpandTableHeadingData;
        this.getTableDataVan();
      },
    "$store.state.operationAllotment.multipleRiderData": function () {
      this.multipleRiderDataBike;
      if (this.tableName == "BikeAllotmentDataTable") {
        this.riderTipToolData = [];
        this.multipleRiderDataBike.map((list) => {
          this.riderTipToolData.push({
            date: list.alloted_date,
            employee_name: list.rider.employee_name,
          });
        });
        this.toolTipString = "";
        let sn = 0;
        for (let i in this.riderTipToolData) {
          let string =
            `${++sn}.${this.riderTipToolData[i]?.date} - ${
              this.riderTipToolData[i]?.employee_name
            } ` + `<br>`;
          this.toolTipString += string;
        }
      }
      if (this.tableName == "VanAllotmentDataTable") {
        this.riderTipToolDataVan = [];
        this.multipleRiderDataBike.map((list) => {
          this.riderTipToolDataVan.push({
            date: list.alloted_date,
            employee_name: list.rider.employee_name,
          });
        });
        this.toolTipStringVan = "";
        let sn = 0;
        for (let i in this.riderTipToolDataVan) {
          let string =
            ` ${++sn}.  ${this.riderTipToolDataVan[i]?.date} - ${
              this.riderTipToolDataVan[i]?.employee_name
            } ` + `<br>`;

          this.toolTipStringVan += string;
        }
      }

      this.renderkey++;
    },
    "$store.state.operationAllotment.riderDropDownOptionDataStanby":
      function () {
        for (let i in this.riderDropDownOptionDataStanby) {
          this.riderDropDownOptionDataStanby[i].name =
            this.riderDropDownOptionDataStanby[i].employee_name;
        }
        this.dropDownDataoptionsRider = this.riderDropDownOptionDataStanby;
      },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-datatable-row-expansion {
  background: rgba(197, 220, 255, 0.62) !important;
  // opacity: 0.5;
}
::v-deep .express-contract-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-contract-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
  border: none !important;
}

.contactsImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.avatar-text {
  color: #353b48;
  font-family: $font-family-secondary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}

.heading {
  color: #4e5868;
}
.pi-trash:before {
  content: "\e93d";
  color: red;
  font-size: 18px;
}
.sub {
  color: #7e84a7;
}
::v-deep .p-tooltip .p-component .p-tooltip-top {
  position: absolute;
  max-width: 15.5rem !important;
}
::v-deep .bgcolor {
  color: #357dea;
  margin-top: -16px;
  font-size: 15px;
  /* margin-right: -20px; */
  position: relative;
  bottom: 8px;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td.colDesign {
  background: red !important;
}
::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
}
::v-deep .p-column-title {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: #7e84a7;
}
.colorChange {
  width: 178px;
  height: 54px;
  /* left: 633px; */
  /* top: 653px; */
  background: #ff7a0047;
  border-radius: 4px;
  padding-top: 9px;
}
.colorChangeT {
  width: 178px;
  height: 54px;
  /* left: 633px; */
  /* top: 653px; */
  background: #09e997;
  opacity: 0.2;
  border-radius: 4px;
  padding-top: 9px;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: #357dea;
  border-radius: 5px;
  color: #fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
//small image classes
.rapido-img {
  width: 12.79px;
  height: 18.64px;
}

.international-img {
  width: 13.02px;
  height: 13.7px;
}

.express-img {
  width: 23.87px;
  height: 13.38px;
}
.sales-table-circle {
  color: #357dea;
  min-width: 18px;
  min-height: 18px;
  border: 1px solid #357dea;
  border-radius: 50%;

  float: right;
  margin-top: -18px;
  // margin-left: 10px;
  margin-right: -8px;
  padding: 1px;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
}
::v-deep .p-checkbox-checked + label {
  color: rgb(25, 108, 218) !important;
  /* background: red; */
}
</style>
