<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    :resizableColumns="true"
    columnResizeMode="expand"
    class="p-datatable-lg"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    filterDisplay="menu"
    removableSort
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="15"
    v-model:editingRows="editingRows"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[15, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    :key="renderkey"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S.No' && col.header != ' '
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != 'Actions' && col.header != ' ' ? true : false"
      class="colDesign"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : S.no-->

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

        <!-- Company Details -->
        <span v-if="col.header == 'Company Details'" class="mr-4">
          <div class="flex flex-row mt-4">
            <div class="flex mr-4">
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
              <div class="sub">{{ slotProps.data["contract_id"] }}</div>
            </div>
          </div>
        </span>
        <span v-if="col.header == 'Pickup location'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>

        <span v-if="col.header == ' '" class="ml-2">
          <span class="onRowtyle" @click="RiderAllotmentPage(slotProps.data)">
            Change Rider Allotments>
          </span>
        </span>
        <!-- LAST EDITED ON -->
        <span v-if="col.header == 'Last Edited On'" class="ml-2 colDesign">
          {{ dateFormater(slotProps.data[col.field]) || "-" }}
        </span>
        <!-- LAST EDITED ON -->
        <span v-if="col.header == 'Last Edited By'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] || "-" }}
        </span>
        <!-- Pickup Location Name -->
        <span
          v-if="col.header == 'Pickup Location Name'"
          class="ml-2 colDesign"
        >
          {{ slotProps.data[col.field] }}
        </span>
        <!-- ZONE -->
        <span v-if="col.header == 'Zone'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>
        <!-- Route -->
        <span v-if="col.header == 'Route'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>
        <!-- DropDown -->
        <div v-if="tableName == 'RapidocollectionDataTablepage'">
          <span v-if="col.header == 'Rider Allotment'" class="ml-2"
            >
            <DropDownWithButtons
              :disabled="true"
              :data="
                dropDownDataoptions
                  ? dropDownDataoptions
                  : DriverDeliveryTypeData
              "
              :rowData="slotProps.data"
              tableDataName="RapidocollectionDataTablepage"
              storePath="rapidoRiderAllotment"
              class="text-left w-100"
            />
          </span>
        </div>
        <div
          v-if="tableName == 'RapidoDeliveryDataTable'"
          @click="visibleClick()"
          :class="this.invisible ? 'invisiblePoint' : 'visiblePoint'"
        >
          <span v-if="col.header == 'Rider'" class="dropdownStyle"
            >
            <DropDownWithButtons
              :disabled="true"
              :data="
                dropDownDataoptions
                  ? dropDownDataoptions
                  : DriverDeliveryTypeData
              "
              :rowData="slotProps.data"
              tableDataName="RapidoDeliveryDataTable"
              VariableName="deliveryDropDown"
              storePath="rapidoRiderAllotment"
              class="text-left w-100 dropdownStyle"
            />
          </span>
        </div>
        <div v-if="tableName == 'RapidocollectionDataTablepage'">
          <span v-if="col.header == 'Vendor'" class="ml-2"
            >
            <DropDownWithButtons
              :data="VendorDeliveryTypeData"
              :rowData="slotProps.data"
              tableDataName="RapidoDeliveryDataTablevendor"
              storePath="rapidoRiderAllotment"
              class="text-left w-100"
            />
          </span>
        </div>
        <div
          v-if="tableName == 'RapidoDeliveryDataTable'"
          @click="invisibleClick()"
          :class="this.visible ? 'invisiblePoint' : 'visiblePoint'"
        >
          <span v-if="col.header == 'Vendor'" class="dropdownStyle"
            >
            <DropDownWithButtons
              :data="VendorDeliveryTypeData"
              :rowData="slotProps.data"
              tableDataName="RapidoDeliveryDataTablevendor"
              VariableName="VendorDropDown"
              storePath="rapidoRiderAllotment"
              class="text-left w-100 dropdownStyle"
            />
          </span>
        </div>
        <div v-for="list of dynamicColumn" :key="list">
          <span v-if="col.header == list?.field" class="ml-2">
            <div v-if="tableName == 'BikeAllotmentDataTable'">
              <DropDownWithButtons
                @click="dropDownclick(slotProps)"
                :data="
                  dropDownDataoptionsRider
                    ? dropDownDataoptionsRider
                    : dropDownData
                "
                :rowData="slotProps.data"
                :field="list.field"
                tableDataName="BikeDefaultAllotmentData"
                storePath="operationAllotment"
                class="text-left w-100"
              />
            </div>
          </span>
        </div>
        <div v-for="list of dynamicColumn" :key="list">
          <span v-if="col.header == list?.header" class="ml-2">
            <div v-if="tableName == 'VanAllotmentDataTable'">
              <DropDownWithButtons
                @click="dropDownclickVan(slotProps)"
                :data="
                  dropDownDataoptionsRider
                    ? dropDownDataoptionsRider
                    : dropDownDataVan
                "
                :rowData="slotProps.data"
                :field="list.field"
                tableDataName="VanDefaultAllotmentData"
                storePath="operationAllotment"
                class="text-left w-100"
              />
            </div>
          </span>
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
  </DataTable>
  <div>
    <!-- <EmptyTemplate /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import axios from "axios";
import DropDownWithButtons from "./DropDownWithButtons.vue";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    DropDownWithButtons,
    InputText,
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
  ],
  data() {
    return {
      data: [],
      Dropdata: [],
      expandedRows: [],
      disable: false,
      filters: null,
      searcher: "",
      rowSelect: null,
      editingRows: [],
      postBikeData: {},
      postVanData: {},
      DrapdownData: {},
      dropDownDataoptions: null,
      dropDownDataoptionsRider: null,
      bike_zone: [],
      visible: true,
      invisible: true,
      details: {
        checkbox: false,
        Van_zone: "",
        disable: false,
        clearance_mode_name: "",
      },
      dropDownData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      DriverDeliveryTypeData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      VendorDeliveryTypeData: [
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
    ...mapState({
      riderDropDownList: (state) => state.operationAllotment.riderDropDownList,
      riderDropDownOptionData: (state) =>
        state.operationAllotment.riderDropDownOptionData,
    }),
  },
  methods: {
    async getVendordriverData() {
      this.VendorDeliveryTypeData = [];
      await axios.get("/settings/vendors/dropdown").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["vendor_name"];
            this.VendorDeliveryTypeData.push(res.data.results[c]);
          }
        }
      });
    },
    async getDeliverydriverData() {
      this.DriverDeliveryTypeData = [];
      await axios.get("/hrms/employee/rapidodriver").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["employee_name"];
            this.DriverDeliveryTypeData.push(res.data.results[c]);
          }
        }
      });
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
    visibleClick() {
      if ((this.tableDataName == "RapidoDeliveryDataTable") == true) {
        this.visible = false;
      }

      if ((this.tableDataName == "RapidoDeliveryDataTablevendor") == true) {
        this.invisible = true;
      }
    },
    invisibleClick() {
      if ((this.tableDataName == "RapidoDeliveryDataTablevendor") == true) {
        this.visible = true;
      }
      if ((this.tableDataName == "RapidoDeliveryDataTable") == true) {
        this.invisible = false;
      }
    },

    getStatusHandler(type) {
      let text;
      switch (type) {
        case "disabled":
          (this.tableName == "RapidoDeliveryDataTable") == true;
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
        stand_by: false,
      };
      this.addBikeZoneData();
    },
    dropDownclickVan(slotProps) {
      this.postVanData = {
        zone_id: slotProps.data.id,
        stand_by: false,
      };
      this.addVanZoneData();
    },
    getDropdownData() {
      this.dropDownData = [];
      this.dropDownDataVan = [];
    },
    rowEditCancel() {},
    addBikeZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATIONDEFAULT", {
        path: "/operations/zone/rider/bike",
        data: this.postBikeData,
        method: "POST",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    addVanZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATIONDEFAULT", {
        path: "/operations/zone/rider/van",

        data: this.postVanData,
        method: "POST",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    RiderAllotmentPage(data) {
      if (this.tableName == "RapidocollectionDataTable") {
        this.$store.state.rapidoRiderAllotment.heading_name = data;
        this.$router.push({
          name: "DeliverydataTablepage",
        });
      }
    },
    getStatusClassHandler(type) {
      let color;
      switch (type) {
        case "disabled":
          color = "color-EB9546";
          break;
        case "Deleted":
          color = "color-c11e1e";
          break;
        case "Inactive":
          color = "color-EB9546";
          break;
        default:
          color = "color-66c11e";
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
    this.Dropdata =
      this.$store.state.operationAllotment.BikeDefaultRiderAllotmentTableData;
    this.initilaizeFilters();
    await this.getDeliverydriverData();
    await this.getVendordriverData();
  },
  watch: {
    "$store.state.operationAllotment.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["operationAllotment"].globalSearch;
    },
    "$store.state.operationAllotment.DropDownDataTable": function () {
      this.dropDownData =
        this.$store.state.operationAllotment.DropDownDataTable;
      this.dropDownDataVan =
        this.$store.state.operationAllotment.DropDownDataTable;
    },
    "$store.state.operationAllotment.riderDropDownList": function () {
      for (let i in this.riderDropDownList) {
        this.riderDropDownList[i].name =
          this.riderDropDownList[i].employee_name;
      }
      this.dropDownDataoptions = this.riderDropDownList;
    },
    "$store.state.operationAllotment.riderDropDownOptionData": function () {
      for (let i in this.riderDropDownOptionData) {
        this.riderDropDownOptionData[i].name =
          this.riderDropDownOptionData[i].employee_name;
      }
      this.dropDownDataoptionsRider = this.riderDropDownOptionData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
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
.visiblePoint {
  pointer-events: none;
}
.invisiblePoint {
  pointer-events: all;
}
.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
}
.onRowtyle {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  cursor: pointer;
  /* identical to box height */

  color: #357dea;
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
.dropdownStyle {
  position: relative;
  right: 30px;
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
