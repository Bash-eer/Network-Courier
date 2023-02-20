<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    filterDisplay="menu"
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="10"
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="rowEditCancel"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    :key="renderkey"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S.No' && col.header != ''
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != '' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : S.no-->
        <span v-if="col.header == 'S.No'" class="ml-4">
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
              <div class="heading mt-2">{{ slotProps.data["profile_name"] }}</div>
              <div class="sub">{{ slotProps.data[col.field] }}</div>
            </div>
          </div>
        </span>
        <!-- DropDown -->

        <span v-if="col.header == ''" class="ml-2 checkOne">
          <div class="flex">
            <div class="flex flex-row">
              <div class="flex">
                <SingleCheckBox
                  label="Stand_by"
                  v-model="slotProps.data[col.field]"
                  :value="slotProps.data[col.field]"
                />
              </div>
            </div>
          </div>
        </span>

        <div v-if="tableDataName == 'VanZoneAllotmentData'">
          <span v-if="col.header == 'Zone'" class="ml-2">
            <div class="field col-6 md:col-7" :key="renderkey">
              <span v-if="slotProps.data?.zone?.zone_name == undefined">
                -
              </span>
              <span v-if="slotProps.data?.zone?.zone_name != undefined">
                {{ slotProps.data?.zone?.zone_name }}</span
              >
            </div>
          </span>
        </div>

        <div v-if="tableDataName == 'BikeZoneAllotmentData'">
          <span v-if="col.header == 'Zone'" class="ml-2">
            <div class="field col-6 md:col-7" :key="renderkey">
              
              <span v-if="slotProps.data?.zone?.zone_name == undefined">
                -
              </span>
              <span v-if="slotProps.data?.zone?.zone_name != undefined">
                {{ slotProps.data?.zone?.zone_name }}</span
              >
            </div>
          </span>
        </div>

        <!--Hide default display-->
        <span
          v-if="
            col.header != 'S.No' &&
            col.header != 'Driver' &&
            col.header != '' &&
            col.header != 'Zone' &&
            col.header != 'profileurl'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>

     <template #filter="{ filterModel }">
       <span>
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
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
          <Calendar
            id="range"
            v-model="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
          >
          <!-- <Calendars :state="filterModel.value" v-model="filterModel.value" /> -->
        </span>
      </template>
      <template #editor="{ data, field }">
        <!--range template-->
        <span v-if="col.header == 'S.No'" class="ml-2">
          {{ data[field] }}
        </span>

        <span v-if="col.header == 'Driver'" class="mr-2">
          <div class="flex flex-row mt-4">
            <div class="flex mr-2">
              <img
                v-if="data['profile_url'] != null"
                :src="data['profile_url']"
                class="contactsImage"
              />

              <AvatarLabel
                v-else
                :label="subStringHandler(data.profile_name)"
                classes="avatar-text"
              />
            </div>

            <div class="flex flex-column mt-2">
              <div class="heading">{{ data["profile_name"] }}</div>
              <div class="sub">{{ data[col.field] }}</div>
            </div>
          </div>
        </span>

        <div v-if="tableDataName == 'BikeZoneAllotmentData'">
          <span v-if="col.header == 'Zone'" class="ml-2">
            <div class="field col-6 md:col-7">
              <DropDown
                code="name"
                label="bike_zone"
                :data="bike_zone"
                :state="data.zone.zone_name"
                :key="data.zone.zone_name"
                v-model="data.zone.zone_name"
                :filter="true"
              />
            </div>
          </span>
        </div>

        <div v-if="tableDataName == 'VanZoneAllotmentData'">
          <span v-if="col.header == 'Zone'" class="ml-2">
            <div class="field col-6 md:col-7" :key="renderkey">
              <DropDown
                code="name"
                label="Van_zone"
                :data="Van_zone"
                :state="data.zone.zone_name"
                :key="data.zone.zone_name"
                v-model="data.zone.zone_name"
                :filter="true"
              />
            </div>
          </span>
        </div>

        <span v-if="col.header == ''" class="ml-2">
          <div class="flex">
            <div class="flex flex-row">
              <div class="flex">
                <SingleCheckBox
                  label="Standby"
                  v-model="data[field]"
                  :value="data[field]"
                />
              </div>
            </div>
          </div>
        </span>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
  <div>
    <!-- <EmptyTemplate /> -->
  </div>
</template>

<script>
// import DropDown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
//import CustomSpeedDials from "../AllotmentTable/CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
//import Checkbox from "primevue/checkbox";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
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
  ],
  data() {
    return {
      data: [],
      expandedRows: [],
      filters: null,
      searcher: "",
      rowSelect: null,
      editingRows: [],
      postBikeData: {},
      postVanData: {},
      details: {
        checkbox: false,
        bike_zone: "",
        Van_zone: "",
      },
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

  methods: {
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
    rowEditCancel() {},
    onRowEditSave(event) {
      let { newData, index } = event;

      this.data[index] = newData;

      if (this.tableDataName == "BikeZoneAllotmentData") {
        for (let F in this.bike_zone) {
          if (newData.zone.zone_name == this.bike_zone[F].name) {
            this.postBikeData.zone_id = this.bike_zone[F].id;
          }
        }
        if (newData.Check_box) {
          this.postBikeData.stand_by = true;
          this.postBikeData.rider_id = newData.id;
        } else {
          this.postBikeData.stand_by = false;
          this.postBikeData.rider_id = newData.id;
        }
      } else {
        if (newData.Check_box) {
          this.postVanData.stand_by = true;
          this.postVanData.rider_id = newData.id;
        } else {
          this.postVanData.stand_by = false;
          this.postVanData.rider_id = newData.id;
        }

        for (let N in this.Van_zone) {
          if (newData.zone.zone_name == this.Van_zone[N].name) {
            this.postVanData.zone_id = this.Van_zone[N].id;
          }
        }
      }

      //POST
      if (this.tableDataName == "BikeZoneAllotmentData") {
        this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
          path: "/operations/rider-zone-allot/bike",

          data: this.postBikeData,
          method: "POST",

          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        });
      } else if (this.tableDataName == "VanZoneAllotmentData") {
        this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
          path: "/operations/rider-zone-allot/van",

          data: this.postVanData,
          method: "POST",

          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        });
      }

      this.renderkey++;
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
        if (this.tableColumns[c]["field"] == "zone") {
          this.filters = {
            ...this.filters,
            'zone.zone_name': {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
            }
          };
        }
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
    async getBikeZoneDropdownData() {
      this.bike_zone = [];
      await axios
        .get("/operations/route-plan/dropdown/zone/bike")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.bike_zone.push(res.data.results[c]);
            }
          }
        });
    },
    async getVanZoneDropdownData() {
      this.Van_zone = [];
      await axios
        .get("/operations/route-plan/dropdown/zone/van")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.Van_zone.push(res.data.results[c]);
            }
          }

          this.renderkey++;
        });
    },
  },
  async created() {
    this.data = this.tableData;
    this.initilaizeFilters();
    await this.getBikeZoneDropdownData();
    await this.getVanZoneDropdownData();
  },
  watch: {
    "$store.state.operationAllotment.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["operationAllotment"].globalSearch;
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

.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
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
.checkOne{
  position: relative;
    top: -8px;
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
