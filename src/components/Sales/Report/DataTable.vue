<template>
  <DataTable
    v-if="tableData.length > 0"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:expandedRows="expandedRows"
    v-model:selection="selectedRow"
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
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

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
        <!-- TEMPLATE : ACTIONS -->
        <span
          v-if="col.header == 'Actions' && tableName != 'QuotationTabSubTable'"
          class="mr-2 flex align-items-center"
        >
          <!-- <i class="pi pi-angle-right"></i> -->
          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="OverlayData"
          />
        </span>

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
              v-if="slotProps.data['quotation'] == 'Adhoc'"
              class="color-EBBD46"
            >
              {{ slotProps.data["quotation"] }}
            </div>

            <div
              v-if="slotProps.data['quotation'] == 'Agent'"
              class="color-55ba6b"
            >
              {{ slotProps.data["quotation"] }}
            </div>

            <div
              v-if="slotProps.data['quotation'] == 'international'"
              class="color-7469F2"
            >
              {{ slotProps.data["quotation"] }}
            </div>

            <div
              class="float-right"
              v-if="slotProps.data['quotation'] == 'Adhoc'"
            >
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="36"
                height="20"
                class="ml-2"
              />
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['quotation'] == 'Agent'"
            >
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="14"
                height="22"
                class="ml-2"
              />
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['quotation'] == 'international'"
            >
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="19"
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
          <div
            v-if="slotProps.data['status'] == 'Hold'"
            class="
              color-EB4646
              flex
              justify-content-center
              p-2
              border-radius-7
              bg-FFECEC
            "
          >
            {{ slotProps.data["status"] }}
          </div>
          <div
            v-if="slotProps.data['status'] == 'New'"
            class="
              color-32DD4D
              flex
              justify-content-center
              p-2
              border-radius-7
              bg-CFFFEB
            "
          >
            {{ slotProps.data["status"] }}
          </div>
          <div
            v-if="slotProps.data['status'] == 'Quote'"
            class="
              color-8F46EB
              flex
              justify-content-center
              border-radius-7
              bg-F4ECFF
              p-2
            "
          >
            {{ slotProps.data["status"] }}
          </div>
          <div
            v-if="slotProps.data['status'] == 'Concluded'"
            class="
              color-297EE1
              flex
              justify-content-center
              border-radius-7
              bg-ECF0FF
              p-2
            "
          >
            {{ slotProps.data["status"] }}
          </div>
          <div
            v-if="slotProps.data['status'] == 'Called'"
            class="
              color-E1B929
              flex
              justify-content-center
              border-radius-7
              bg-FFF5EC
              p-2
            "
          >
            {{ slotProps.data["status"] }}
          </div>
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
    </Column>
  </DataTable>
  <div v-else>
    <EmptyTemplate />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import "primeicons/primeicons.css";

import { SalesSalesOverlayData } from "../Const";
import CustomSpeedDials from "./CustomSpeedDail.vue";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    CustomSpeedDials,
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
      selectedRow: null,
      OverlayData: SalesSalesOverlayData,
      members: [
        { name: "Tim", url: "avatar" },
        { name: "Jill", url: "avatarTwo" },
        { name: "Tommy", url: "avatar" },
        { name: "Tommy", url: "avatar" },
      ],
    };
  },

  methods: {
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
