<template>
  <DataTable
    :loading="$store.state['masters'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="tableName == 'dashboardTable' ? false : true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <!-- tableName == 'expressAddNewRegionTable' || -->
    <Column
      :expander="
        tableName == 'Service' ||
        tableName == 'Bike' ||
        tableName == 'Van' ||
        tableName == 'Trips' ||
        tableName == 'RatesMultiTier' ||
        tableName == 'Additional' ||
        tableName == 'Additional Rates'
          ? false
          : true
      "
      headerStyle="width: 1rem"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="col.header != 'Actions' ? true : false"
      sortable
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="masters"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : STATUS -->
        <span v-if="col.header == 'Status'" class="mr-2">
          <span
            v-if="slotProps.data[col.field] != 'Deleted'"
            :class="
              slotProps.data[col.field] == 'Active' ||
              slotProps.data[col.field] == 'active'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "Active" ||
              slotProps.data[col.field] == "active"
                ? "Active"
                : "Inactive"
            }}</span
          >
          <span
            class="deletedClass"
            v-if="slotProps.data[col.field] == 'Deleted'"
          >
            {{ slotProps.data[col.field] }}
          </span>
        </span>

        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Created On'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
    <!--Expanded row content -->
    <template #expansion="slotProps">
      <!-- TEMPLATE : REGION TRIPS -->
      <span
        v-if="
          tableName == 'expressAddNewRegionTable' &&
          slotProps.data.regions_trips.length > 0
        "
      >
        <TimeLineTable
          tableClass="p-datatable-sm expressRatesTripsTable mt-2 mb-3 ml-3 mr-3"
          :tableData="slotProps.data.regions_trips"
          :tableColumns="
            $store.state.masters.expressAddNewRegionTripsTableColumnData
          "
        />
      </span>
      <span
        v-if="
          tableName == 'expressAddNewRegionTable' &&
          slotProps.data.regions_trips.length == 0
        "
      >
        <div class="no_data p-3">No Trips available!</div></span
      >

      <!--TEMPLATE : COUNTRIES-->
      <span v-if="tableName == 'Zones'">
        <div class="row mr-6 ml-4 mb-5">
          <div class="col-12 pb-0">
            <div class="flex flex-row flex-wrap">
              <div
                v-for="countries of slotProps.data.countries"
                class="flex mt-1"
                :key="countries"
              >
                <Chips :label="countries" />
              </div>
            </div>
          </div>
        </div>
        <div class="row mr-6 ml-4 mb-2">
          <div
            @click="addCountry(slotProps.data)"
            class="col-12 pb-0 add_countries"
          >
            + Add Countries
          </div>
        </div>
      </span>

      <!--TEMPLATE : RATE CARDS -->
      <span
        v-if="
          tableName == 'International' ||
          tableName == 'Express Rates' ||
          tableName == 'Rapido'
        "
      >
        <span v-if="slotProps.data.regions_rate_cards.length != 0">
          <div class="row mr-6 ml-6">
            <div class="col-12 pb-0">
              <div class="flex justify-content-between">
                <div class="flex issue">
                  <b><span>Issued Rate Cards</span></b>
                </div>
                <div class="flex rate_settings">Open Rate Card Settings</div>
              </div>
            </div>
          </div>
          <!--dynamic rate cards-->
          <div class="row mr-6 ml-6 mb-3">
            <div class="col-12">
              <div class="card">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item rate_items"
                    v-for="rates of slotProps.data.regions_rate_cards"
                    :key="rates.label"
                  >
                    <div class="flex justify-content-between">
                      <div class="flex mt-3">
                        {{ rates.rate_card_name }}
                        <span
                          v-if="rates.default == true"
                          :class="'rate-badge ml-2'"
                          >Default</span
                        >
                      </div>
                      <div class="flex">
                        <CustomSpeedDial
                          storePath="masters"
                          :dataName="getCustomSpeedDialDataName()"
                          :rowData="rates"
                          :customDialData="
                            $store.state.masters.rateCardsOverlayData
                          "
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </span>
        <span v-if="slotProps.data.regions_rate_cards.length == 0">
          <div class="no_data p-3">No Rate Cards available!</div>
        </span>
      </span>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
export default {
  name: "RatesTables",
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
      expandedRows: [],
      rowSelect: null,
    };
  },
  methods: {
    getCustomSpeedDialDataName() {
      if (this.tableName == "Express Rates") {
        return "expressRateCards";
      }
    },
    openDialog() {
      if (this.tableName == "Express Rates") {
        this.$store.state["users"].dialogComponent = "AddNewExpressRateDialog";
        this.$store.getters["users/controlActivityDialog"];
      }
    },
    addCountry(data) {
      for (let c in this.$store.state.masters.zonesTableData) {
        let c_obj = this.$store.state.masters.zonesTableData[c];
        if (c_obj.s_no == data.s_no) {
          this.$store.state.masters.zonesTableData[c]["countries"].push(
            "India"
          );
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      if (this.tableName == "International") {
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "Companies",
        });
      }
      if (this.tableName == "Express Rates") {
        this.$store.state.masters.expressRegion = event.data.agent;
        this.$router.push({
          name: "Regions",
        });
      }
    },
    processOverlayData(data, row) {
      if (
        this.tableDataName != "rolesTableData" &&
        this.tableDataName != "adhocTableData" &&
        this.tableDataName != "contractTableData" &&
        this.tableDataName != "agentsTableData" &&
        this.tableDataName != "obcTableData"
      ) {
        var processed_overlayData = [];
        for (var o in data) {
          var ovrly_obj = data[o];
          var new_ovrly_obj = {};
          if (ovrly_obj.label == "Delete") {
            if (row.status == "Deleted") {
              new_ovrly_obj.label = "Retrieve User";
            }
            if (row.status == "Active" || row.status == "Inactive") {
              new_ovrly_obj.label = "Delete";
            }
            new_ovrly_obj.icon = "fas fa-user-times";
          }
          if (
            ovrly_obj.label != "Delete" &&
            ovrly_obj.label != "Retrieve User"
          ) {
            new_ovrly_obj.label = ovrly_obj.label;
            new_ovrly_obj.icon = ovrly_obj.icon;
          }
          processed_overlayData.push(new_ovrly_obj);
        }
        return processed_overlayData;
      } else return data;
    },
  },
  components: {
    DataTable,
    Column,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.TimeLineTable .p-datatable-thead > tr > th {
  background: #c5dcff !important;
  box-shadow: none;
  border: none !important;
}
.no_data {
  text-align: center;
  // color: #c01717;
  font-weight: bold;
}
.add_countries {
  text-align: center;
  color: #357dea;
  cursor: pointer;
}
.rate-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.status-Active {
  color: #17c079;
  font-weight: bold;
}
.status-Inactive {
  color: #ea6e39;
  font-weight: bold;
}
.status-Deleted {
  color: #c01717;
  font-weight: bold;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}
.deletedClass {
  color: #c01717;
  font-weight: bold;
}
.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
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
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}
.p-datatable .p-datatable-thead > tr > th {
  color: #7e84a7 !important;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  // background-color: #fff !important;
  border: none !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
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
::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .activityLogTable > .p-paginator {
  background: white !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .expressAddNewRegionTable > .p-paginator {
  background: white !important;
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
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
</style>
