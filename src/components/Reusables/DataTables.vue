<template>
  <DataTable
    :loading="$store.state[storePath].tableLoad"
    :class="tableClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    :stripedRows="
      tableName != 'NetworkCourierTabs' &&
      tableName != 'RolesTable' &&
      tableName != 'Adhoc' &&
      tableName != 'Contract'
        ? true
        : false
    "
    :rowClass="rowClass"
    :showGridlines="true"
    :value="tableData"
    responsiveLayout="scroll"
    v-model:selection="rowSelect"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'display_name',
      'roles',
      'role_name',
      'username',
      'user_id',
      'contact_number',
      'contact_no',
      'mobile_no',
      'email',
      'created_by',
      'createdBy',
      'status',
      'company_name',
      'customer_code',
      'online_customer_type',
      'count',
      'costCenter',
      'os',
      'ip_address',
      'location',
      'logged_in',
      'logged_out',
    ]"
    :paginator="tableName == 'dashboardTable' ? false : true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <!-- <Column
      v-if="
        tableName != 'NetworkCourierTabs' &&
        tableName != 'activityDialog' &&
        tableName != 'RolesTable' &&
        tableName != 'Adhoc' &&
        tableName != 'Contract' &&
        tableName != 'Agent' &&
        tableName != 'RolesAccessTable' &&
        tableName != 'UserTypesRoles' &&
        tableName != 'dashboardTable' &&
        tableName != 'OBC'
      "
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column> -->
    <Column
      :sortable="
        tableName != 'RolesAccessTable' &&
        tableName != 'dashboardTable' &&
        col.header != 'Actions'
          ? true
          : false
      "
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="!removeFilter && col.header != 'Actions' ? true : false"
      :style="getColumnWidth(col.header)"
      :showFilterMatchModes="
        col.header == 'Created On' ||
        col.header == 'Logged In' ||
        col.header == 'Logged Out'
          ? false
          : true
      "
    >
      <!-- :dataType="col.header == 'Created On' ? 'date' : 'text'" -->
      <template #body="slotProps">
        <!-- DATES TEMPLATE -->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'Logged In' ||
            col.header == 'Logged Out'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- ROLES TEMPLATE -->
        <span
          v-if="col.header == 'Roles'"
          class="mr-2 ml-2"
          @click="roleClicked(slotProps.data[col.field], slotProps.data)"
        >
          {{ slotProps.data[col.field] }}
          <!-- <router-link
            :to="{
              name: 'UsersModuleRights',
              params: { id: slotProps.data[col.field] },
            }"
          >
            {{ slotProps.data[col.field] }}
          </router-link> -->
        </span>

        <!-- CREATED BY TEMPLATE -->
        <span v-if="col.header == 'Created By'">
          <span v-if="tableName != 'UserTypesRoles'">{{
            slotProps.data[col.field]
          }}</span>
          <span v-if="tableName == 'UserTypesRoles'">
            <div class="flex flex-row">
              <div class="flex align-items-center justify-content-center mr-1">
                <img :src="require('../../assets/crBadge.png')" />
              </div>
              <div class="flex align-items-center justify-content-center">
                {{ slotProps.data[col.field] }}
              </div>
            </div>
          </span>
        </span>

        <!-- ACTIONS TEMPLATE -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            :storePath="storePath"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            v-on:editMethod="edit"
            v-on:deleteMethod="del"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>
        <!-- TEMPLATE : DASHBOARD BORDER TABLE-->
        <Column
          v-if="tableName == 'dashboardTable'"
          selectionMode="single"
          headerStyle="width: 3em"
        ></Column>
        <!-- <span v-if="col.header == 'Name'" class="mr-0">
          <div class="flex flex-row">
            <div
              class="flex align-items-center justify-content-center mr-1 mt-0"
            >
              
              <span v-if="slotProps.data.logoPath">
                <div class="flex align-items-center">
                  <img
                    :src="
                      require('../../assets/' +
                        slotProps.data.logoPath +
                        '.png')
                    "
                    alt=""
                    class="mr-0"
                  />
                </div>
                <div class="flex align-items-center">
                  <span>{{ label }}</span>
                </div>
              </span>

              <span v-else>
                <div class="flex align-items-center">
                  <AvatarLabel
                    v-bind:label="slotProps.data[col.field].substring(0, 2)"
                    classes="ml-1 avatar-text"
                  />
                </div>
              </span>
            </div>
            <div
              class="
                flex flex-column
                align-items-start
                justify-content-start
                mt-0
                ml-2
              "
            >
              <div class="title">{{ slotProps.data[col.field] }}</div>
              <div class="subtitle">{{ slotProps.data.subText }}</div>
            </div>
          </div>
        </span> -->

        <!-- ROLES TEMPLATE -->
        <span v-if="col.header == 'Role'" class="mr-2">
          <!-- <span
            v-if="slotProps.data[col.field].length > 10"
            v-tooltip.bottom="{
              value: slotProps.data[col.field],
              class: 'custom-tooltip-class',
            }"
          >
            {{ slotProps.data[col.field].slice(0, 10) + "..." }}
          </span> -->
          <!-- <span v-else>
            {{ slotProps.data[col.field] }}
          </span> -->
          {{ slotProps.data[col.field] }}
        </span>

        <!-- USERNAME TEMPLATE -->
        <span v-if="col.header == 'Name'" class="mr-0">
          <div class="flex flex-row">
            <div class="flex align-items-center justify-content-center mr-1">
              <!-- <AvatarLabel v-bind:label="slotProps.data[col.field].charAt(0)" /> -->
              <AvatarLabel
                v-bind:label="slotProps.data[col.field].substring(0, 2)"
                classes="avatar-text"
              />
            </div>
            <div class="flex align-items-center justify-content-center ml-2">
              {{ slotProps.data[col.field] }}
            </div>
          </div>
        </span>

        <!-- TEMPLATE : COMPANY NAMES -->
        <span
          v-if="col.header == 'Company Name'"
          class="mb-3"
          @click="companyNameClicked(slotProps.data)"
        >
          {{ slotProps.data[col.field] }}
          <!-- <router-link
            :to="{
              name: 'Agent',
              params: { id: slotProps.data[col.field] },
            }"
          >
            {{ slotProps.data[col.field] }}
          </router-link> -->
        </span>

        <!-- TEMPLATE : CUSTOMER TYPE -->
        <span v-if="col.header == 'Customer Type'" class="mb-1 mr-3">
          <CustomerTags
            marginClass="mt-3 customerTags"
            :label="slotProps.data[col.field]"
            :path="slotProps.data.delivery_type"
            :tagClass="slotProps.data.delivery_type"
          />
        </span>

        <!-- TEMPLATE : ACCESS LEVELS -->
        <span v-if="col.header == 'Access Level'" class="mr-2">
          <Badges
            :badgeData="badgeColorClasses(slotProps.data[col.field])"
            :accessLevel="slotProps.data[col.field]"
          />
        </span>

        <!-- TEMPLATE : EDIT ACCESS -->
        <span v-if="col.header == 'Act'" class="mr-2">
          <div
            class="flex flex-row flex-wrap"
            @click="editAccess(slotProps.data)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i class="pi pi-pencil"></i>
            </div>
            <div
              class="flex align-items-center justify-content-center editAccess"
            >
              Edit Access
            </div>
          </div>
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
            col.header != 'Access Level' &&
            col.header != 'Username' &&
            col.header != 'Status' &&
            col.header != 'Act' &&
            col.header != 'Customer Type' &&
            col.header != 'Company Name' &&
            col.header != 'Company Name' &&
            col.header != 'Roles' &&
            col.header != 'Role' &&
            col.header != 'Name' &&
            col.header != 'Modules' &&
            col.header != 'Add' &&
            col.header != 'Edit' &&
            col.header != 'Delete' &&
            col.header != 'Created By' &&
            col.header != 'Created On' &&
            col.header != 'Logged In' &&
            col.header != 'Logged Out'
          "
          :class="col.field"
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <!--column-vise filtering-->
      <template #filter="{ filterModel }">
        <!--Roles Enum Filter-->
        <span v-if="col.header == 'Roles'">
          <DropDown
            code="code"
            :disabled="false"
            :filter="true"
            placeholder="Search By Role"
            :data="$store.state.users.rolesPageEnumDropDown"
            v-model="filterModel.value"
            :value="filterModel.value"
            :state="filterModel.value"
            classes="flex text-left inputfield clones"
          />
        </span>
        <span v-if="col.header == 'Role'">
          <DropDown
            code="code"
            :disabled="false"
            :filter="true"
            placeholder="Search By Role"
            :data="
              tableName == 'NetworkCourier'
                ? $store.state.users.rolesEnumDropDown
                : $store.state.users.rolesCascadeEnumDropDown
            "
            v-model="filterModel.value"
            :value="filterModel.value"
            :state="filterModel.value"
            classes="flex text-left inputfield clones"
          />
        </span>
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
          <Dropdown
            code="code"
            v-model="filterModel.value"
            :options="$store.state.users.statusDropDown"
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
          <!-- <DropDown
          code="code"
            :disabled="false"
            placeholder="Search By Status"
            :data="$store.state.users.statusDropDown"
            v-model="filterModel.value"
            :value="filterModel.value"
            :state="filterModel.value"
            classes="flex text-left inputfield clones"
          /> -->
        </span>
        <!--Date Range Filter-->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'Logged In' ||
            col.header == 'Logged Out'
          "
        >
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
  </DataTable>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Tooltip from "primevue/tooltip";
import moment from "moment";
import Dropdown from "primevue/dropdown";
export default {
  name: "DataTables",
  props: [
    "removeFilter",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
  ],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      checks: [],
      rowSelect: null,
      filters: null,
      searchString: "",
      networkModule: false,
      minDate: null,
      maxDate: null,
      invalidDates: null,
    };
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getColumnWidth(columnHeader) {
      // return "width:fit-content";
      if (columnHeader == "Actions") {
        return "max-width:5rem";
      }
      if (columnHeader == "Status") {
        return "max-width:6rem";
      }
      if (columnHeader == "User Id") {
        return "min-width:7rem;max-width:7rem";
      }
      if (columnHeader == "Name") {
        return "min-width:6rem";
      }
      if (columnHeader == "Email") {
        return "min-width:7rem";
      }
      // if (columnHeader == "IP Address") {
      //   return "min-width:10rem";
      // }
      // if (columnHeader == "Role") {
      //   return "min-width:8rem";
      // }

      if (
        columnHeader != "Actions" &&
        columnHeader != "Status" &&
        columnHeader != "User Id" &&
        columnHeader != "Name" &&
        columnHeader != "Email"
      ) {
        if (columnHeader.length <= 7 && columnHeader.length > 5) {
          return "min-width:8rem;max-width:7rem";
        }
        if (columnHeader.length <= 5) {
          return "min-width:3rem;max-width:7rem";
        }
        if (columnHeader.length > 7 && columnHeader.length < 12) {
          return "min-width:9rem;";
        }
        if (columnHeader.length >= 12) {
          return "min-width:11rem;";
        }
      }
    },
    onRowSelect(event) {
      this.$store.state[this.storePath].dialogUserTitle = "Edit User";
      this.$store.state[this.storePath].dialogRoleTitle = "Edit Role";

      if (this.tableName != "OnlineCustomer") {
        this.$store.state[this.storePath].network_courier_details = event.data;
        this.$store.state[this.storePath].userActivityControl =
          event.data.Status;

        if (this.tableDataName == "networkCourierTableData") {
          this.tableEditPopUp(
            "networkCourierOverlayData",
            "UserSettingsDialog"
          );
        }
        if (this.tableDataName == "organizationData") {
          this.$store.state[this.storePath].dialogComponent = "AgentDialog";
          this.$store.getters[this.storePath + "/controlActivityDialog"];
        }
        if (
          this.tableDataName == "rolesTableData" ||
          this.tableDataName == "adhocTableData" ||
          this.tableDataName == "contractTableData" ||
          this.tableDataName == "agentsTableData" ||
          this.tableDataName == "obcTableData"
        ) {
          if (this.$store.state[this.storePath].previousTabsState != null) {
            this.$store.state.users.radioButtonTypesValue =
              this.$store.state[this.storePath].previousTabsState;
          }

          if (this.$store.state[this.storePath].deliveryTypestabs != null) {
            this.$store.state[this.storePath].deliveryChoicesState =
              this.$store.state[this.storePath].deliveryTypestabs;
          }

          if (this.tableDataName == "rolesTableData") {
            this.tableEditPopUp(
              "rolesNetworkCourierOverlayData",
              "CreateRoleDialog"
            );
          }

          if (
            this.tableDataName == "adhocTableData" ||
            this.tableDataName == "contractTableData" ||
            this.tableDataName == "agentsTableData" ||
            this.tableDataName == "obcTableData"
          ) {
            this.tableEditPopUp(
              "rolesOnlineUsersOverlayData",
              "CreateRoleDialog"
            );
          }
        }
      }
      if (this.tableName == "OnlineCustomer") {
        this.$store.state[this.storePath].companyId = event.data.id;
        this.$store.state[this.storePath].agentsData = event.data;
        this.$store.state[this.storePath].companyType = {
          online_customer_type: event.data.online_customer_type,
          delivery_type: event.data.delivery_type,
        };

        var cascadeRolesDropDownObject = {
          customer_type: [event.data.delivery_type],
          user_type: [event.data.online_customer_type],
        };
        this.$store.dispatch("users/loadRolesApi", {
          apiPath: "/dd",
          data: cascadeRolesDropDownObject,
        });
        this.$store.dispatch("users/loadUsersApi", {
          apiPath: event.data.id,
          tag: "organization",
        });
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "Agent",
          params: { id: event.data.company_name },
        });
      }
    },
    tableEditPopUp(overlayDataName, dialogName) {
      var tableEditCheck = 0;
      for (var ro in this.$store.state[this.storePath][overlayDataName]) {
        if (
          this.$store.state[this.storePath][overlayDataName][ro].label == "Edit"
        ) {
          tableEditCheck++;
        }
      }
      if (tableEditCheck > 0) {
        if (
          this.$store.state[this.storePath].usersTabsValue == "Network Courier"
        ) {
          if (document.getElementById("pills-NetworkCourierTabs-tab")) {
            document.getElementById("pills-NetworkCourierTabs-tab").click();
          }
        }
        this.$store.state[this.storePath].dialogComponent = dialogName;
        this.$store.getters[this.storePath + "/controlActivityDialog"];
      }
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {},
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
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
    rowClass(row) {
      for (var r in row) {
        if (r == "status") {
          if (row[r] == "Deleted") {
            return "deleted_row";
          }
        }
      }
    },
    edit() {
      alert("edited");
    },
    del() {
      alert("deleted");
    },
    editAccess(data) {
      for (var i in this.tableData) {
        for (var j in data) {
          if (j == "User Id") {
            if (this.tableData[i][j] == data[j]) {
              // eslint-disable-next-line vue/no-mutating-props
              this.tableData[i]["Access Level"] = "3";
            }
          }
        }
      }
    },
    roleClicked(role, roleData) {
      this.$store.state.users.rolesAccessTableData = null;
      this.$store.dispatch("users/LoadRolesAccessApi", {
        data: roleData,
      });
      this.$store.state[this.storePath].rolesRoute = role;
    },
    companyNameClicked(row) {
      this.$store.state[this.storePath].companyId = row.id;
      this.$store.state[this.storePath].agentsData = row;
      this.$store.state[this.storePath].companyType = {
        online_customer_type: row.online_customer_type,
        delivery_type: row.delivery_type,
      };
      this.$store.dispatch("users/loadUsersApi", {
        apiPath: row.id,
        tag: "organization",
      });
    },
    getRolePath(role) {
      var split = role.split("");
      return split.concat(split);
    },
    initilaizeFilters() {
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        roles: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        role_name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        username: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        display_name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        user_id: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        contact_number: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        contact_no: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        mobile_no: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        email: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        created_by: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        createdBy: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        createdAt: { value: null, matchMode: FilterMatchMode.BETWEEN },
        logged_in: { value: null, matchMode: FilterMatchMode.BETWEEN },
        logged_out: { value: null, matchMode: FilterMatchMode.BETWEEN },
        // createdAt: {
        //   operator: FilterOperator.AND,
        //   constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        // },
        company_name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        customer_code: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        online_customer_type: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        count: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        costCenter: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        os: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        ip_address: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        location: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
    badgeColorClasses(level) {
      var l = parseInt(level);
      var badgeColors = [
        { color: "default" },
        { color: "default" },
        { color: "default" },
        { color: "default" },
      ];
      for (var c = 0; c <= l - 1; c++) {
        badgeColors[c]["color"] =
          this.$store.state[this.storePath].badgeColors[c];
      }
      return badgeColors;
    },
  },
  components: {
    DataTable,
    Column,
    InputText,
    Dropdown,
  },
  created() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({ searchString: "getGlobalSearchString" }),
  },
  watch: {
    "$store.state.users.globalSearch": function () {
      this.filters.global.value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
// ::v-deep .p-datatable-tbody > tr:nth-child(even) {
//   background: #dfe6e9;
// }
.p-datepicker .p-component .p-ripple-disabled {
  transform-origin: center bottom !important;
}
::v-deep .m-2 {
  margin: 0 !important;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}
::v-deep .dashboard {
  display: none !important;
}
::v-deep .operation {
  display: none !important;
}
::v-deep .settings {
  display: none !important;
}
::v-deep .users {
  display: none !important;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
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
// .p-datatable .p-sortable-column .p-column-title,
// .p-datatable .p-sortable-column .p-sortable-column-icon,
// .p-datatable .p-sortable-column .p-sortable-column-badge {
//   // white-space: nowrap !important;
// }
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
.editAccess {
  color: #357dea;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
}
::v-deep .pi-pencil {
  cursor: pointer;
  color: #357dea;
}
.roles {
  background-color: #eeefff !important;
  border-radius: 31px;
  color: #1b25c6;
  padding: 5px;
  margin-top: 20px !important;
}
.super-roles {
  color: #c61b1b;
  background-color: #ffeeee;
  padding: 5px;
  border-radius: 31px;
  margin-top: 20px !important;
  a {
    color: #4e5868;
    text-decoration: none;
  }
}
.title {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.subtitle {
  font-family: $font-family-secondary;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #b5b5c3;
}
.avatar-text {
  font-family: $font-family-secondary;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
}
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
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
  //styleName: XSmall 12 / Family #1 / Bold;
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
