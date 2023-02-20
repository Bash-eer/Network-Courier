<template>
  <DataTable
    :loading="
      tableName == 'QuotationTabSubTable'
        ? false
        : $store.state['sales'].tableLoad
    "
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:filters="filters"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    filterDisplay="menu"
    :globalFilterFields="getGlobalFields()"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      :expander="
        tableName == 'Contacts' ||
        tableName == 'Follow Up' ||
        tableName == 'Invitees Status' ||
        tableName == 'ContactSettingsEventStatus' ||
        tableName == 'ContactSettingsRooms'
          ? false
          : true
      "
      class="expander"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="
        col.header != 'Actions' && col.header != 'Image' ? true : false
      "
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.' &&
        col.header != 'Image'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <!--Body -->
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <!-- <span v-if="
        col.header == 'Actions' &&
        tableName =='Contacts' ||
        tableName == 'Groups'
        " class="mr-2">
          <CustomSpeedDial
            :storePath="'contacts'"
            :dataName="eventGroupsOverlayData"
            :customDialData="
                      $store.state.contacts.eventGroupsOverlayData"
            :rowData="$store.state.contacts.eventCardsData[index]"
                    @click="
                      customDialFunction(
                        $store.state.contacts.eventCardsData[index]
                      )"
            :tableName="tableName"
          />
        </span>
        <span v-if="
        col.header == 'Actions' &&
        tableName == 'Donations'" class="mr-2">
          <CustomSpeedDial
            :storePath="'contacts'"
            :dataName="ContactsDonationsOverlayData"
            :customDialData="
                      $store.state.contacts.ContactsDonationsOverlayData"
            :rowData="$store.state.contacts.eventCardsData[index]"
                    @click="
                      customDialFunction(
                        $store.state.contacts.eventCardsData[index]
                      )"
            :tableName="tableName"
          />
        </span>
         <span v-if="
        col.header == 'Actions' &&
        tableName =='Appointments'" class="mr-2">
          <CustomSpeedDial
            :storePath="'contacts'"
            :dataName="ContactsAppointmentsOverlayData"
            :customDialData="
                      $store.state.contacts.ContactsAppointmentsOverlayData"
            :rowData="$store.state.contacts.eventCardsData[index]"
                    @click="
                      customDialFunction(
                        $store.state.contacts.eventCardsData[index]
                      )" -->
            <span v-if="col.header == 'Actions'" class="mr-2">
               <CustomSpeedDial
                  :storePath="'contacts'"
                  :dataName="tableDataName"
                  :rowData="slotProps.data"
                  :customDialData="overlayData"
                  :tableName="tableName"
          />
        </span>

        <!-- NAME TEMPLATE -->
        <span v-if="col.header == 'Name' || col.header == 'Group Name'">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <AvatarLabel
                v-if="slotProps.data['image_url'] == null"
                v-bind:label="slotProps.data[col.field].substring(0, 2)"
                classes="avatar-text"
              />
              <img
                v-else
                :src="slotProps.data['image_url']"
                class="contactsImage"
              />
            </div>
            <div class="flex align-items-center">
              {{ slotProps.data[col.field] }}
            </div>
          </div>
        </span>

        <!-- TEMPLATE : Amount -->
        <span
          v-if="col.header == 'Amount' || col.header == 'Amount (S$)'"
          class="mr-2"
        >
          <span class="amount">{{ slotProps.data[col.field] }}</span>
        </span>

        <!-- SUB GROUPS TEMPLATE -->
        <span v-if="col.header == 'Sub Groups'">
          {{ getSubGroupsLength(slotProps.data) }}
        </span>

        <!-- DATES TEMPLATE -->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'Due Date' ||
            col.header == 'From' ||
            col.header == 'To' ||
            col.header == 'Donated Date' ||
            col.header == 'Date & Time'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TYPES TEMPLATE -->
        <span v-if="col.header == 'Type'" :class="slotProps.data[col.field]">
          {{ slotProps.data[col.field] }}
        </span>

        <!-- TEMPLATE : Image -->
        <span v-if="col.header == 'Image'" class="mr-2">
          <img
            :src="slotProps.data[col.field]"
            alt="logo"
            width="40"
            height="40"
          />
        </span>

        <!-- TEMPLATE : ATTENDEES -->
        <span v-if="col.header == 'Attendees'" class="mr-2">
          <PrimeGroupedAvatars :data="slotProps.data['attendeesImages']" />
        </span>

        <!-- TEMPLATE : EVENT STATUS -->
        <span
          v-if="
            tableName == 'ContactSettingsEventStatus' && col.header == 'Status'
          "
          class="mr-2"
        >
          <!-- <span
            :class="
              slotProps.data[col.field] == true ||
              slotProps.data[col.field] == 'Complete'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == true
                ? "Active"
                : slotProps.data[col.field]
            }}</span
          > -->
          <span
            class="event-status-text"
            :style="
              getBackgroundColor(
                slotProps.data['text_color'],
                slotProps.data['background_color']
              )
            "
          >
            {{ slotProps.data[col.field] }}
            <!-- {{slotProps.data['background_color']}}
            {{slotProps.data['text_color']}} -->
          </span>
        </span>

        <!-- TEMPLATE : STATUS -->
        <span
          v-if="tableName == 'Groups' && col.header == 'Status'"
          class="mr-2"
        >
          <span
            :class="
              slotProps.data[col.field] == true ||
              slotProps.data[col.field] == 'Complete'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == true
                ? "Active"
                : slotProps.data[col.field]
            }}</span
          >
        </span>

        <!-- TEMPLATE : INVITEES STATUS -->
        <span
          v-if="tableName == 'Invitees Status' && col.header == 'Status'"
          class="mr-2"
        >
          <StatusTags
            :type="getOptionType(slotProps.data[col.field])"
            :label="slotProps.data[col.field]"
            usage="table"
          />
        </span>

        <!-- TEMPLATE : INVITEES -->
        <span v-if="col.header == 'Invitees'" class="mr-2">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <img
                :src="slotProps.data['image_url']"
                alt="logo"
                width="40"
                height="40"
              />
            </div>
            <div class="flex">
              <div class="flex flex-column justify-content-center">
                <div class="flex inviteeName">{{ slotProps.data["name"] }}</div>
                <div class="flex tableNo">
                  Table No: {{ slotProps.data["table_no"] }}
                </div>
              </div>
            </div>
          </div>
        </span>

        <span
          v-if="
            col.header != 'Amount' &&
            col.header != 'images' &&
            col.header != 'Type' &&
            col.header != 'Actions' &&
            col.header != 'Image' &&
            col.header != 'Status' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Donated Date' &&
            col.header != 'Date & Time' &&
            col.header != 'Name' &&
            col.header != 'Sub Group' &&
            col.header != 'Group Name' &&
            col.header != 'Invitees' &&
            col.header != 'Attendees'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <!--column-vise filtering-->
      <template #filter="{ filterModel }">
        <span
          v-if="tableName != 'ContactSettingsRooms' && col.header == 'Status'"
        >
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
        <span
          v-if="
            col.header != 'Created On' &&
            col.header != 'Status' &&
            col.header != 'Role' &&
            col.header != 'Roles' &&
            col.header != 'Logged In' &&
            col.header != 'Logged Out'
          "
        >
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
    <template #expansion="slotProps">
      <!-- TEMPLATE : GROUPS/MAIN GROUPS TABLE-->
      <span v-if="tableName == 'Groups'">
        <span v-if="slotProps.data['groups_sub_groups'].length != 0">
          <div class="p-4">
            <ContactSubTables
              tableClass="p-datatable-sm subGroupsTable"
              tableDataName="subGroupsTableData"
              :overlayData="$store.state.fleets.FleetVehicleOverlayData"
              :tableName="'subGroupsTable'"
              :tableData="slotProps.data['groups_sub_groups']"
              :tableColumns="
                $store.state['contacts'][
                  'ContactManagamentSubGroupTableColumnData'
                ]
              "
              :dataKey="'id'"
            />
          </div>
        </span>
        <span v-if="slotProps.data['groups_sub_groups'].length == 0">
          <div class="no_data p-3">No sub groups to show!</div>
        </span>
      </span>

      <!-- TEMPLATE : APPOINTMENTS TRAVELS-->
      <span v-if="tableName == 'Appointments'">
        <div class="p-4">
          <span v-if="slotProps.data['country'] != 'Singapore'">
            <p class="mb-3">Travel Details</p>
            <ContactSubTables
              tableClass="p-datatable-sm travelsTable"
              tableDataName="travelsTableData"
              :overlayData="$store.state.fleets.FleetVehicleOverlayData"
              :tableName="'travelsTable'"
              :tableData="slotProps.data['travelDetails']"
              :tableColumns="
                $store.state['contacts']['travelDetailsTableColumnData']
              "
              :dataKey="'id'"
            />
          </span>
          <div class="row mt-4">
            <div class="col-10">
              <ExpansionTemplateThree :data="slotProps.data['remarkDetails']" />
            </div>
            <div class="col-2">
              <AttachmentsTemplate
                :receipt="''"
                :data="slotProps.data['appointments_attachments']"
                :type="'appointmentTravels'"
              />
            </div>
          </div>
        </div>
      </span>

      <!-- TEMPLATE : DONATIONS -->
      <span v-if="tableName == 'Donations'">
        <div class="latest p-4">
          <LatestFleetTemplate
            name="donations"
            :data="slotProps.data['latestData']"
            :attachmentsData="''"
          />
        </div>
        <div class="m-4">
          <div class="row">
            <div class="col-10">
              <ExpansionTemplateThree :data="slotProps.data['remarkDetails']" />
            </div>
            <div class="col-2">
              <AttachmentsTemplate
                :receipt="''"
                :data="slotProps.data['donations_attachments']"
                :type="'donations'"
              />
            </div>
          </div>
        </div>
      </span>
    </template>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
// import AvatarGroup from "primevue/avatargroup";
export default {
  name: "FleetManagementTables",
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
    //  AvatarGroup,
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
      filters: null,
    };
  },
  methods: {
    getBackgroundColor(color, bgColor) {
      return {
        color: color,
        "background-color": bgColor,
      };
    },
    getGroupedAvatarsLabel(data) {
      let avatarsLabel;
      if (data.length > 2) {
        let len = data.length - 2;
        avatarsLabel = "+" + "" + len.toString();
      } else {
        avatarsLabel = "";
      }
      return avatarsLabel;
    },
    getGroupedAvatarsData(data) {
      if (data.length <= 2) {
        return data;
      } else {
        let gAData = [];
        for (let gA = 0; gA < 2; gA++) {
          gAData.push(data[gA]);
        }
        return gAData;
      }
    },
    getOptionType(label) {
      let type;
      if (label == "Not Coming") {
        switch (label) {
          case "Not Coming":
            type = "NotComing";
            break;
        }
        return type;
      } else {
        type = label;
      }
      return type;
    },
    onRowSelect(event) {
      if (this.tableName == "Contacts") {
        let contactsOverviewData = {};
        let contactsHeaderData = [{}];
        let basicDetailsData = [{}];
        let residenceDetailsData = [{}];
        let officeDetailsData = [{}];
        let personalInfoData = [{}];

        for (let c in event.data) {
          //contacts header data
          if (
            c == "image_url" ||
            c == "name" ||
            c == "mobile_no" ||
            c == "contact_type" ||
            c == "created_by" ||
            c == "createdAt" ||
            c == "users_contact_contacts"
          ) {
            contactsHeaderData[0][c] = event.data[c];
          }
          //basic details
          if (
            c == "name" ||
            c == "nick_name" ||
            c == "mobile_no" ||
            c == "email" ||
            c == "religion" ||
            c == "race"
          ) {
            basicDetailsData[0][c] = event.data[c];
          }
          //residence details
          if (c == "contacts_residence_address") {
            let residenceAddressDetails = event.data[c][0];
            console.log(residenceAddressDetails["floor_no"]?.length,residenceAddressDetails["building_name"]?.length,residenceAddressDetails["postal_code"])
            let addressString =
              residenceAddressDetails["floor_no"]?.length === '' || 0 ? '' : residenceAddressDetails["floor_no"] + ',' +
              residenceAddressDetails["building_name"]?.length === '' || 0 ? '' : residenceAddressDetails["building_name"] + ',' +
              residenceAddressDetails["postal_code"];
            residenceDetailsData[0]["address"] = addressString;
            residenceDetailsData[0]["home_phone"] =
              residenceAddressDetails["home_phone"];
          }
          //office details
          if (c == "contacts_office_address") {
            let officeDetails = event.data[c][0];
            for (let o in officeDetails) {
              if (
                o == "company_name" ||
                o == "address" ||
                o == "office_fax" ||
                o == "mobile_no" ||
                o == "office_phone" ||
                o == "email" ||
                o == "website"
              ) {
                officeDetailsData[0][o] = officeDetails[o];
              }
            }
          }
          //personal info
          if (
            c == "date_of_birth" ||
            c == "anniversary_date" ||
            c == "marital_status" ||
            c == "no_of_children" ||
            c == "spouse_name"
          ) {
            personalInfoData[0][c] = event.data[c];
          }
        }

        contactsOverviewData["Contacts Header"] = contactsHeaderData;
        contactsOverviewData["Basic Details"] = basicDetailsData;
        contactsOverviewData["Residence Details"] = residenceDetailsData;
        contactsOverviewData["Office Details"] = officeDetailsData;
        contactsOverviewData["Personal Info"] = personalInfoData;
        contactsOverviewData["Attachments"] =
          event.data["contacts_attachments"];

        this.$store.state.contacts.contactsOverviewData = contactsOverviewData;
        this.$router.push({
          name: "ContactsTracker",
          // params: { id: event.data.company_name },
        });
      }
    },
    getSubGroupsLength(data) {
      return data["groups_sub_groups"].length;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
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
  },

  watch: {
    "$store.state.contacts.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.event-status-text {
  border-radius: 7px;
  width: max-content;
  height: 35px;
  padding: 5px 12px;
  // background: pink;
}
.inviteeName {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.tableNo {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #7e84a7;
}
.latest {
  background-color: #ffffff;
}
.amount {
  color: #66c11e;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
.contactsImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.Personal {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #e24d4d;
}
.Network {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #e24d4d;
  color: #1f0aa2;
}
.attachmentsDiv {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.divider {
  border-left: 1px solid #000000;
  opacity: 0.1;
  height: 100%;
  width: 1%;
}
.latest {
  background-color: #ffffff;
}
::v-deep .expander {
  padding: 1.5em !important;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
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
.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
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
::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
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
.custom-avatar-group-lable {
  width: 100px;
  height: 100px !important;
  background: #eaa235;
  color: #7e84a7;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
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
</style>
