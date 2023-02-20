<template>
  <DataTable
    :class="'region-rates-table'"
    class="p-datatable-sm"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    v-model:filters="filters"
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    selectionMode="single"
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="rowEditCancel"
    :rows="10"
  >
    <template #empty><div class="p-3">No data found.</div></template>

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="col.header != 'Actions' && col.header != ' ' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.' &&
        col.header != ' '
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template #body="slotProps">
        <!-- created by template -->
        <span v-if="col.header == 'S.No'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>

        <span v-if="col.header == ' '" class="ml-2 mb-2">
          <div @click="deleteRow(slotProps, this.dateData)">
            <i class="pi pi-trash" style="font-size: 2rem"></i>
          </div>
        </span>

        <span v-if="col.header == 'Trips'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>
        <span v-if="col.header == 'Rider'" class="mr-2">
          <div class="flex flex-row mt-4">
            <div class="flex mr-2">
              <img
                v-if="slotProps.data['image_url'] != null"
                :src="slotProps.data['image_url']"
                class="contactsImage"
              />

              <AvatarLabel
                v-else
                :label="subStringHandler(slotProps.data.employee_name)"
                classes="avatar-text"
              />
            </div>

            <div class="flex flex-column mt-2">
              <div class="heading">{{ slotProps.data["employee_name"] }}</div>
            </div>
          </div>
        </span>
      </template>
      <template #editor="slotProps">
        <!--range template-->
<span v-if="col.header == 'S.No'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>

        <span v-if="col.header == 'Trips'" class="ml-2 colDesign">
          {{ slotProps.data[col.field] }}
        </span>

        <div v-if="tableName == 'RiderExpandedTable'">
          <span v-if="col.header == 'Rider'" class="ml-5 dropdownStyle">
            <DropDownWithButtons
              :disabled="disable"
              @click="dropDownclick()"
              :data="dropDownDataoptionsRider
                    ? dropDownDataoptionsRider
                    :dropDownData"
              :rowData="slotProps.data"
              :expandData="this.postBikeData"
              tableDataName="BikeRiderExpandAllotmentData"
              storePath="operationAllotment"
              class="text-left w-100"
              :key="renderkey"
              :databikepost="this.datapost"
            />
          </span>
        </div>
        <div v-if="tableName == 'RiderExpandedTableVan'">
          <span v-if="col.header == 'Rider'" class="ml-5 dropdownStyle">
            <DropDownWithButtons
              :disabled="disable"
              @click="dropDownclickVan()"
              :data="dropDownDataoptionsRider
                    ? dropDownDataoptionsRider
                    :dropDownData"
              :rowData="slotProps.data"
              :expandData="this.postVanData"
              tableDataName="VanRiderExpandAllotmentData"
              storePath="operationAllotment"
              class="text-left w-100"
              :key="renderkey"
              :databikepost="this.datapost"
            />
          </span>
        </div>
      </template>
    </Column>

    <Column
      v-if="disable != false"
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    >
    </Column>
  </DataTable>
</template>

<script>
import { mapActions ,mapState } from "vuex";
import DropDownWithButtons from "./DropDownWithButtons.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  components: {
    DataTable,
    Column,
    DropDownWithButtons,
  },
  props: [
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "overlayData",
    "apiKey",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "dateData",
  ],
  data() {
    return {
      filters: null,
      editingRows: [],
      dropDownData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      postBikeData: {},
      postVanData: {},
      dropDownDataoptionsRider: null,
      renderkey: 10,
      disable: false,
      datapost: {},
    };
  },
  computed:{
...mapState({
  riderDropDownOptionDataStanby: (state) =>
        state.operationAllotment.riderDropDownOptionDataStanby,
})
  },
  methods: {
    ...mapActions({
      loadfetchRiderAllotmentExpandTableDataBike:
        "operationAllotment/loadfetchRiderAllotmentExpandTableDataBike",
      POSTPATCHCRUDOPERATIONDEFAULT:
        "operationAllotment/POSTPATCHCRUDOPERATIONDEFAULT",
    }),
    dropDownclick() {
      this.postBikeData = {
        zone_id: this.dateData.data.zone_id,
        stand_by: false,
      };

      this.addBikeZoneData();
    },
    dropDownclickVan() {
      this.postVanData = {
        zone_id: this.dateData.data.zone_id,
        stand_by: false,
      };

      this.addVanZoneData();
    },

    addBikeZoneData() {
      this.POSTPATCHCRUDOPERATIONDEFAULT({
        path: "/operations/zone/rider/bike",
        data: this.postBikeData,
        method: "POST",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    addVanZoneData() {
      this.POSTPATCHCRUDOPERATIONDEFAULT({
        path: "/operations/zone/rider/van",
        data: this.postVanData,
        method: "POST",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    deleteRow(data, dateData) {
      if (this.tableName == "RiderExpandedTable") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.$store.dispatch("operationAllotment/DELETECRUDOPERATION", {
              path: "/operations/rider-allot/rider/bike/" + data.data.id,
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

              loadData:
                "operationAllotment/loadfetchRiderAllotmentExpandTableDataBike",
              loadid: dateData.data.id,
            });
          },
        });
      } else if (this.tableName == "RiderExpandedTableVan") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.$store.dispatch("operationAllotment/DELETECRUDOPERATION", {
              path: "/operations/rider-allot/rider/van/" + data.data.id,
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

              loadData:
                "operationAllotment/loadfetchRiderAllotmentExpandTableDataVan",
              loadid: dateData.data.id,
            });
          },
        });
      }
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
      }
    },
    subStringHandler(string) {
      if (string) {
        return string.substring(0, 2);
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
  },
  created() {
    this.initilaizeFilters();
    const currentdate = new Date();
    const givendate = new Date(this.dateData.data.alloted_date);
    if (currentdate > givendate) {
      this.disable = false;
    } else {
      this.disable = true;
    }
    this.datapost = this.dateData;
  },

  watch: {
    "$store.state.others.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
    "$store.state.operationAllotment.DropDownDataTable": function () {
      this.dropDownData =
        this.$store.state.operationAllotment.DropDownDataTable;
      this.dropDownDataVan =
        this.$store.state.operationAllotment.DropDownDataTable;
    },
    "$store.state.operationAllotment.riderDropDownOptionDataStanby": function () {
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

::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-row-expansion {
  background: rgba(197, 220, 255, 0.62) !important;
}

:deep .p-datatable-thead > tr > th {
  padding: 1rem 0.5rem !important;
  background-color: unset !important;

  &:hover {
    background-color: unset !important;
  }
}

:deep .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #357dea !important;
  word-wrap: break-word !important;
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
::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
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
.dropdownStyle {
  position: relative;
  right: 164px;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
.rate_items {
  color: #5f98ee;
  font-weight: bolder;
}
.issue {
  font-weight: bold !important;
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
}
.rate-default-badge {
  background: #fff5d8;
  color: #e48d1e;
  opacity: 0.75;
  border-radius: 3.5px;
  padding: 6px 9px;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.rate-type-wrapper {
  width: 80px !important;
}

.exp-color {
  color: #e48d1e !important;
  font-weight: 700;
  font-size: 14px;
}
.pi-trash:before {
  content: "\e93d";
  color: red;
  font-size: 17px;
}
.imp-color {
  color: #17c079 !important;
  font-weight: 700;
  font-size: 14px;
}

.rate-type-badge {
  background: rgba(116, 105, 242, 0.15);
  color: #7469f2;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.rate_items {
  color: #5f98ee;
  font-weight: bolder;
}
.issue {
  font-weight: bold !important;
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
}
</style>
