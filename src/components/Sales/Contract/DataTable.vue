<template>
  <DataTable
    v-if="tableData.length > 0"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    filterDisplay="menu"
    selectionMode="multiple"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="selectionMode"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S. No' // col.header != 'Address' && // col.header != 'Remarks'
          ? true
          : false
      "
      :sortable="
        tableName != 'QuotationTabSubTable' &&
        col.header != 'Actions' &&
        col.header != 'S. No'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span
          v-if="
            col.header == 'Actions' &&
            tableDataName != 'BulkAdjustmentTableData'
          "
          class="flex align-items-center"
        >
          <!-- <i class="pi pi-angle-right"></i> -->

          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="quotationOverlayData"
          />
        </span>

        <!-- <div v-if="tableName=='bulkAdjustment'"> -->
        <span
          v-if="
            col.header == 'Actions' &&
            tableDataName == 'BulkAdjustmentTableData'
          "
          class="flex align-items-center"
        >
          <!-- <i class="pi pi-angle-right"></i> -->

          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="quotationOverlayData"
          />
        </span>
        <!-- </div> -->

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : CONTACT -->
        <span v-if="col.header == 'Contact'" class="mr-2">
          <div class="flex flex-column mt-4">
            <div class="flex color-4e5968">
              {{ slotProps.data["contact_name"] }}
            </div>
            <div class="flex color-7e84a7">
              {{ slotProps.data["contact_no"] }}
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Address'" class="mr-2">
          <div class="flex flex-column mt-4">
            <div class="flex color-4e5968">{{ slotProps.data["address"] }}</div>
            <div class="flex color-7e84a7">
              {{ slotProps.data["postal_code"] }}
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Quotation'" class="mr-3">
          <div class="flex flex-row justify-content-space-between mt-2">
            <div
              v-if="slotProps.data['business_type'] == 'Adhoc'"
              class="color-7469F2"
            >
              {{ slotProps.data["business_type"] }}
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Adhoc'"
            >
              <img
                :src="'/images/international.png'"
                alt=""
                width="19"
                height="20"
                class="ml-2"
              />
            </div>

            <div
              v-if="slotProps.data['business_type'] == 'Agent'"
              class="color-55ba6b"
            >
              {{ slotProps.data["business_type"] }}
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Agent'"
            >
              <img
                :src="'/images/rapido.png'"
                alt=""
                width="18"
                height="20"
                class="ml-4"
              />
            </div>
            <div
              v-if="slotProps.data['business_type'] == 'international'"
              class="color-7469F2"
            >
              {{ slotProps.data["business_type"] }}
            </div>

            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'international'"
            >
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="18"
                height="22"
                class="width-left-42"
              />
            </div>
            <div
              v-if="slotProps.data['business_type'] == 'Contract'"
              class="color-EBBD46"
            >
              {{ slotProps.data["business_type"] }}
            </div>

            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Contract'"
            >
              <img
                :src="'/images/express.png'"
                alt=""
                width="25"
                height="20"
                class="ml-2"
              />
            </div>
          </div>
        </span>
        <span
          v-if="col.header == 'Members'"
          class="flex justify-content-center"
        >
          <!-- <GroupedAvatars
            :data="
              members.length < 3 ? members : getGroupedAvatarsData(members)
            "
            :more="members.length >= 3 ? members.length - 2 : ''"
          /> -->
          <GroupedAvatars
            :data="
              members.length < 3
                ? members.map((imageUrl) =>
                    imageUrl
                      ? imageUrl
                      : 'https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png'
                  )
                : getGroupedAvatarsData(members)
            "
            :more="members.length >= 3 ? members.length - 2 : ''"
          />
        </span>

        <span
          v-if="col.header == 'Preview'"
          class="mr-3 flex justify-content-center align-items-center"
        >
          <img
            :src="'/images/' + 'preview' + '.png'"
            alt=""
            width="32"
            height="32"
            class="ml-2"
          />
        </span>

        <span v-if="col.header == 'Status'" class="mr-3">
          <StatusTags
            :type="slotProps.data[col.field]"
            :label="slotProps.data[col.field]"
            usage="table"
          />
        </span>

        <!--Hide default display-->
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Quotation' &&
            col.header != 'Contact' &&
            col.header != 'Address' &&
            col.header != 'Created On' &&
            col.header != 'Status'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
          <Dropdown
            code="code"
            v-model="filterModel.value"
            :options="$store.state.contacts.appointmentStatusDropdownData"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :class="'customer-badge status-' + slotProps.value"
                v-if="slotProps.value"
                >{{ slotProps.value }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'customer-badge status-' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
        </span>
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created on'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <!--Expanded row content -->
    <template #expansion="{ data }">
      <QuotationExpansionTemplate
        v-if="tableName == 'bulkAdjustment'"
        :parentData="data"
      />
    </template>
  </DataTable>
  <div v-else>
    <EmptyTemplate />
  </div>
</template>

<script>
import QuotationExpansionTemplate from "../Sales/Bulk Adjustment/ExpansionContents.vue";
import DataTable from "primevue/datatable";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import moment from "moment";
import "primeicons/primeicons.css";
import { sales_co } from "../../../store/helper";
import { SalesSalesOverlayData } from "../Const";
// import CustomSpeedDials from "./CustomSpeedDail.vue";
import CustomSpeedDials from "../Common/CustomSpeedDial.vue";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    QuotationExpansionTemplate,
    CustomSpeedDials,
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
      searcher: "",
      expandedRows: [],
      selectionMode: [],
      filters: null,
      OverlayData: SalesSalesOverlayData,
      OverlayDataTwo: [
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      members: [
        { name: "Tim", url: "avatar" },
        { name: "Jill", url: "avatarTwo" },
        { name: "Tommy", url: "avatar" },
        { name: "Tommy", url: "avatar" },
      ],
    };
  },
  // watch: {
  //   selectionMode(value) {
  //     if (this.formTableDataName == "tripFormTableData") {
  //       // this.expressContractBikeFSRAddNewData["quotation"]["trips"]=[];
  //       // value?.map((list) => {
  //       // this.expressContractBikeFSRAddNewData["quotation"]["trips"].push({
  //       //   from_time: list.from_time,
  //       //   selected: true,
  //       //   to_time: list.to_time,
  //       //   trip_days: list.trip_days,
  //       //   trip_id: list.trip_id,
  //       //   trip_no: list.trip_no,
  //       //   trip_type: list.trip_type,
  //       //   });
  //       // });
  //     }

  //     // if (this.formTableDataName == "inspectionsFormTableData"){
  //     //     this.expressContractBikeFSRAddNewData["contacts"]=[];
  //     //     value?.map((list) => {
  //     //     this.expressContractBikeFSRAddNewData["contacts"].push({
  //     //       profile_url: list.profile_url,
  //     //       selected: true,
  //     //       contact_name: list.contact_name,
  //     //       contact_no: list.contact_no,
  //     //       email: list.email,
  //     //       mobile_no: list.mobile_no,
  //     //       designation: list.designation,
  //     //     });
  //     //   });
  //     // }
  //   },
  // },
  computed: {
    ...sales_co,
  },
  methods: {
    selectAllRows(event) {
      this.$store.state[this.storePath][this.tableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.tableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.$store.state.bulkAdjustment.batchName = event?.data;
      if (this.tableName == "BulkAdjustment") {
        this.$router.push({
          name: "BulkAdjustmentRowProfile",
          params: { id: event.data.id },
        });
      } else {
        let QCType = "contract";
        // if (this.tableDataName == "contractsTableData") {
        //   QCType = "contract";
        // } else if (this.tableDataName == "QuotationsTableData") {
        //   QCType = "quotation";
        // }
        // "business_type": "Express",
        //     "customer_type": "Contract",
        let QuotationProcessedType =
          event.data.customer_type + event.data.business_type;

        //express contract
        if (QuotationProcessedType == "ExpressContract") {
          if (event.data) {
            this.$router.push({
              name: "ExpressContract",
              params: {
                id: event.data.id,
                type: QCType,
                p_id: event.data.profile_id,
                mode: "overview",
              },
            });
          }
        }
        //express adhoc
        else if (QuotationProcessedType == "ExpressAdhoc") {
          this.$router.push({
            name: "ExpressAdhocOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: event.data.profile_id,
              mode: "overview",
            },
          });
        }
        //rapido contract
        else if (QuotationProcessedType == "RapidoContract") {
          this.$router.push({
            name: "RapidoRapidoContractOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: event.data.profile_id,
              mode: "overview",
            },
          });
        }
        //Express Contract Bike + Fsr
        else if (QuotationProcessedType == "ExpressContractBikeFSR") {
          this.$router.push({
            name: "ExpressContractBikeFSRQuotationOverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        } else if (QuotationProcessedType == "ExpressContractVanFSR") {
          this.$router.push({
            name: "ExpressContractVanFSROverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //
        else if (QuotationProcessedType == "ExpressContractBikeProjectJobs") {
          this.$router.push({
            name: "ExpressContractBikeProjectJobsOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: event.data.profile_id,
              mode: "overview",
            },
          });
        }
        //
        else if (QuotationProcessedType == "ExpressContractVanProjectJobs") {
          this.$router.push({
            name: "ExpressContractVanProjectJobsOverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //RapidoAdhoc
        else if (QuotationProcessedType == "RapidoAdhoc") {
          this.$router.push({
            name: "RapidoRapidoAdhocOverview",
            params: {
              id: event.data.id,
              pid: event.data.profile_id,
              type: QCType,
              mode: "overview",
            },
          });
        }
        //International Contract
        else if (QuotationProcessedType == "InternationalContract") {
          this.$router.push({
            name: "InternationalContractOverview",
            params: {
              id: event.data.id,
              type: QCType,
              pid: event.data.profile_id,
              mode: "overview",
            },
          });
        }
        //International Agent
        else if (QuotationProcessedType == "InternationalAgent") {
          this.$router.push({
            name: "InternationalAgent",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //International Agent
        else if (QuotationProcessedType == "InternationalAdhoc") {
          this.$router.push({
            name: "InternationalAdhoc",
            params: {
              id: event.data.id,
              pid: event.data.profile_id,
              type: QCType,
              mode: "overview",
            },
          });
        }

        if (event.data.quotation_type == "ExpressContractBike") {
          this.$router.push({
            name: "ExpressContractBikeQuotationOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractVan") {
          this.$router.push({
            name: "ExpressContractVanQuotataionOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractInterCompany") {
          this.$router.push({
            name: "ExpressContractInterCompanyOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractBikeFSR") {
          this.$router.push({
            name: "ExpressContractBikeFSRQuotationOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractVanFSR") {
          this.$router.push({
            name: "ExpressContractVanFSROverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractFSR") {
          this.$router.push({
            name: "ExpressContract",
          });
        }
        if (event.data.quotation_type == "ExpressContractProjectJobs") {
          this.$router.push({
            name: "ExpressContractProjectJobsOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractBikeProjectJobs") {
          this.$router.push({
            name: "ExpressContractBikeProjectJobsOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractVanProjectJobs") {
          this.$router.push({
            name: "ExpressContractVanProjectJobsOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractExpressAdhoc") {
          this.$router.push({
            name: "ExpressAdhocOverview",
          });
        }
        if (QuotationProcessedType == "RapidoContract") {
          this.$router.push({
            name: "RapidoRapidoContractOverview",
          });
        }
        if (event.data.quotation_type == "RapidoRapidoAdhoc") {
          this.$router.push({
            name: "RapidoRapidoAdhocOverview",
          });
        }
        if (event.data.quotation_type == "InternationalContract") {
          this.$router.push({
            name: "InternationalContractOverview",
          });
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state[this.storePath][this.tableDataName] =
        this.selectionMode;
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        if (data[gA]) gAData.push(data[gA]);
        else
          gAData.push(
            "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png"
          );
      }
      return gAData;
    },

    onRowExpand(event) {
      this.expandedRows = this.tableData.filter(
        (data) => event?.data?.id === data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data.id) {
          obj.expanded = !obj.expanded;
        } else {
          obj.expanded = false;
        }
      });

      // if (this.tableName == "ContractTabTable") {
      //   this.$store.dispatch("salesSales/loadContractSubTableData", {
      //     id: event.data.id,
      //   });
      // } else if (this.tableName == "QuotationTabTable") {
      //   this.$store.dispatch("salesSales/loadQuotationSubTableData", {
      //     id: event.data.id,
      //   });
      // }
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
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
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
        if (this.tableColumns[c]["field"] == "createdAt") {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
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
      this.$store.state["salesContract"].globalSearch = searchString;
    },
  },
  created() {
    this.initilaizeFilters();
    if (
      this.selectionModeState != undefined &&
      this.selectionModeState != null
    ) {
      this.selectionMode = this.selectionModeState;
    }
    if (
      this.selectionModeState == undefined ||
      this.selectionModeState == null
    ) {
      this.selectionMode = null;
    }
  },
  watch: {
    "$store.state.salesContract.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["salesContract"].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
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
::v-deep .p-paginator {
  background-color: #edf1f7 !important;
}
</style>