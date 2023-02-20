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
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="tableName == 'QuotationTabSubTable' ? false : true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-if="tableName != 'QuotationTabSubTable'"
      :expander="
        tableName == 'QuotationTabSubTable' ||
        tableName == 'SalesTab' ||
        tableName == 'AttachmentTable' ||
        tableName == 'FollowUpTable'
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
      :showFilterMenu="
        col.header != 'Actions' && tableName != 'QuotationTabSubTable'
          ? true
          : false
      "
      :sortable="tableName != 'QuotationTabSubTable' ? true : false"
    >
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions' && tableName != 'QuotationTabSubTable'"
          class="mr-2"
        >
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-if="col.header == 'Contact'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex rapido-adhoc-data-table-heading">
              {{ slotProps.data["contact_name"] }}
            </div>
            <div class="flex rapido-adhoc-data-table-sub">
              {{ slotProps.data["contact_no"] }}
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Address'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex rapido-adhoc-data-table-heading">
              {{ slotProps.data["address"] }}
            </div>
            <div class="flex rapido-adhoc-data-table-sub">
              {{ slotProps.data["postal_code"] }}
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Quotation'" class="mb-1 mr-3">
          <CustomerTags
            marginClass="mt-3 customerTags"
            :label="slotProps.data[col.field]"
            :path="slotProps.data.customer_type"
            :tagClass="slotProps.data.customer_type"
          />
        </span>

        <span
          v-if="col.header == 'Status' && tableName == 'QuotationTabTable'"
          class="mr-2"
        >
          <StatusTags
            :type="slotProps.data[col.field]"
            :label="slotProps.data[col.field]"
            usage="table"
          />
        </span>

        <span
          v-if="col.header == 'Status' && tableName == 'SalesTab'"
          class="mr-2"
        >
          <span
            v-if="slotProps.data[col.field] != 'deleted'"
            :class="
              slotProps.data[col.field] == 'Active' ||
              slotProps.data[col.field] == 'active'
                ? 'rapido-adhoc-data-table-activeClass'
                : 'rapido-adhoc-data-table-inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "Active" ||
              slotProps.data[col.field] == "active"
                ? "Active"
                : "Inactive"
            }}</span
          >
          <span
            class="rapido-adhoc-data-table-deletedClass"
            v-if="slotProps.data[col.field] == 'deleted'"
          >
            {{ slotProps.data[col.field] }}
          </span>
        </span>

        <span v-if="col.header == 'Preview'" class="mr-2">
          <Preview />
        </span>

        <span v-if="col.header == 'Members'">
          <img src="/images/avatar.png" alt="" width="32" height="32" />
        </span>

        <span v-if="col.header == 'Site Office'">
          <img
            v-if="slotProps.data[col.field] == true"
            :src="'/images/' + 'siteOffice' + '.png'"
            alt=""
          />
        </span>

        <span v-if="col.header == 'Attachments'">
          <img
            v-if="getFilesLength(slotProps.data.attachment_url) == 1"
            src="/images/preview.png"
            alt="pdf"
          />
          <span
            class="flex"
            v-if="getFilesLength(slotProps.data.attachment_url) == 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />
          </span>
          <span
            class="flex flex-row"
            v-if="getFilesLength(slotProps.data.attachment_url) > 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />

            <div class="mt-1 ml-1">
              <span>
                <Avatar
                  :label="
                    '+' + (getFilesLength(slotProps.data.attachment_url) - 2)
                  "
              /></span>
            </div>
          </span>
        </span>

        <span v-if="col.header == 'Contacts'" class="mr-2 pt-2">
          <div class="flex flex-column mt-4">
            <div class="flex rapido-adhoc-data-table-heading">
              {{ slotProps.data["customer_contact"] }}
            </div>
            <div class="flex rapido-adhoc-data-table-sub">
              {{ slotProps.data["customer_contact_number"] }}
            </div>
          </div>
        </span>

        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Preview' &&
            col.header != 'Members' &&
            col.header != 'Quotation' &&
            col.header != 'Site Office' &&
            col.header != 'Contact' &&
            col.header != 'Address' &&
            col.header != 'Created On' &&
            col.header != 'Attachments' &&
            col.header != 'Contacts'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>

    <template #expansion="slotProps">
      <span v-if="tableName == 'QuotationTabTable' && slotProps.data.revisions">
        <span v-if="slotProps.data.revisions.length != 0">
          <div
            class="flex flex-column mt-2"
            v-for="(revision, index) of slotProps.data.revisions"
            :key="index"
          >
            <div class="flex ml-3">
              <StatusTags
                type="Revision"
                :label="revision[0].update + ' ' + (index + 1)"
                usage="table"
              />
            </div>
            <div
              :class="
                index != slotProps.data.revisions.length - 1
                  ? 'flex mt-2 mb-2 pl-4 pr-4'
                  : 'flex mt-2 mb-4 pl-4 pr-4'
              "
            >
              <SalesTables
                tableClass="p-datatable-sm QuotationTabSubTable w-100"
                tableDataName="QuotationTabData"
                tableName="QuotationTabSubTable"
                :tableData="revision"
                :tableColumns="
                  $store.state['sales']['quotationSubTableColumnData']
                "
                dataKey="id"
              />
            </div>
          </div>
        </span>
        <span v-if="slotProps.data.revisions.length == 0">
          <div class="rapido-adhoc-data-table-no-data p-3">
            No Revisions to show
          </div></span
        >
      </span>
      <span
        v-if="col.field == 'collection_time' || col.field == 'cut_off_time'"
        class="mr-2"
      >
        {{ dateFormater(slotProps.data[col.field]) }}
      </span>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Avatar from "primevue/avatar";

export default {
  name: "OverviewDataTable",
  components: {
    DataTable,
    Column,
    Avatar,
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
      expandedRows: [],
      rowSelect: null,
    };
  },

  methods: {
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    getFilesLength(files) {
      if (files != null) {
        return files.length;
      }
    },
    processOverlayData(data, row) {
      if (this.tableDataName != "QuotationTabData") {
        var processed_overlayData = [];
        for (var o in data) {
          var ovrly_obj = data[o];
          var new_ovrly_obj = {};
          if (ovrly_obj.label == "Delete") {
            if (row.company_status == "deleted") {
              new_ovrly_obj.label = "Retrieve User";
            }
            if (
              row.company_status == "active" ||
              row.company_status == "disabled"
            ) {
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
      } else {
        return data;
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
    // dateFormater(data) {
    //   if (data == null) {
    //     return "-";
    //   } else {
    //     var formattedDate = moment(data).format("Do MMM YYYY");
    //     return formattedDate;
    //   }
    // },

    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.rapido-adhoc-data-table-no-data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}

.rapido-adhoc-data-table-heading {
  color: #4e5868;
}
.rapido-adhoc-data-table-sub {
  color: #7e84a7;
}

.quotation {
  margin-left: 1em !important;
}
.address {
  margin-left: 2% !important;
}

.rapido-adhoc-data-table-activeClass {
  color: #17c079;
  font-weight: bold;
}
.rapido-adhoc-data-table-deletedClass {
  color: #c01717;
  font-weight: bold;
}
.rapido-adhoc-data-table-inactiveClass {
  color: #ea6e39;
  font-weight: bold;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .QuotationTabTable .p-datatable-thead > tr > th {
  background-color: #fff !important;
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
::v-deep .QuotationTabTable .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}

::v-deep .timeLineExpressCostCenterTable .p-paginator {
  background: #ffff !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .activityLogTable > .p-paginator {
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

.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
}
</style>
