// import moment from "moment";
import axios from "axios";

const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

/*-----------------------------------------------HELPER FUNCTIONS----------------------------------------------------------------*/
// function dateFormater(data) {
//   var formattedDate = moment(data).format("Do MMM YYYY");
//   // h:mm a"
//   return formattedDate;
// }
function convertToLowerCase(word) {
  var lowerCaseString = word.toLowerCase();
  return lowerCaseString;
}
function getRoles(data) {
  for (var n in data) {
    var userRoles = [];
    var obj = data[n];
    for (var o in obj) {
      if (o == "user_role_mapping") {
        var usersArray = data[n][o];
        for (var u in usersArray) {
          if (usersArray[u].user_role != null) {
            userRoles.push(usersArray[u].user_role.role_name);
          }
        }
      }
    }
    var rolesString = userRoles.join(", ");
    data[n].roles = rolesString;
  }

  return data;
}
function rolesDropDown(data) {
  var rp_array = [];
  for (var rp in data) {
    var rp_obj = {};
    rp_obj["name"] = data[rp].role_name;
    rp_obj["code"] = data[rp].role_id;
    rp_array.push(rp_obj);
  }
  return rp_array;
}
function rolesEnumDropDownPopulator(data) {
  var rep_array = [];
  for (var rep in data) {
    var rep_obj = {};
    rep_obj["name"] = data[rep].role_name;
    rep_obj["code"] = data[rep].role_name;
    rep_array.push(rep_obj);
  }
  return rep_array;
}
function groupByKey(data) {
  for (var a in data) {
    data[a].feature = data[a].role_access.features;
  }
  const groupBy = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = keys.map((key) => obj[key]).join("-");
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  const groupByFeature = groupBy(["feature"]);
  var groupedByFeatureObject = groupByFeature(data);

  return groupedByFeatureObject;
}
/*-----------------------------------------------HELPER FUNCTIONS----------------------------------------------------------------*/

const users = {
  namespaced: true,
  state: {
    sideBarCount: 0,
    sideBarRef: "sidebarRef",
    radioButtonSalesState: null,
    newRoleData: null,
    ResetPasswordId: null,
    dialogUserTitle: null,
    dialogRoleTitle: null,
    companyType: null,
    canWeProceedFromHere: false,
    previousTabsState: null,
    innerMostTabsState: false,
    treeTableTraverse: false,
    companyId: null,
    companyUsersCount: 0,
    deliveryChoices: ["International", "Express", "Rapido"],
    deliveryChoicesState: "International",
    rolesPageDropDown: null,
    radioButtonUsersValue: "Network Courier",
    usersTabsValue: "Network Courier",
    radioButtonTypesValue: null,
    previousDeliveryTabState: "International",
    radioButtonCompany: "Company",
    internAdhocRadioButton: "Document",
    radioButtonAccordionTier: "Charge by Weight",
    radioButtonAccordionMultiTier: "Quantity",
    deliveryTypestabs: null,
    deliveryTypesTabsActual: "international",
    rolesTabSwitch: false,
    activityLogObject: {
      user_location: "",
      ip: "",
    },
    showToastMessage: false,
    severity: null,
    summary: null,
    detail: null,
    tableLoad: false,
    updateInternalUsers: false,
    usersNetworkCourierAddAccess: true,
    usersOnlineUsersAddAccess: true,
    rolesNetworkCourierAddAccess: true,
    rolesOnlineUsersAddAccess: true,
    bootstrapTabsRolesKey: false,
    //edit
    network_courier_details: {},
    //dialog activeness
    userActivityControl: true,
    //toolbar-breadcrumb
    rememberMe: false,
    //  userName: localStorage.getItem("userName"),
    // userName: null,
    breadcrumbPath: "Dashboard",
    rolesId: null,
    breadcrumbTitle: null,
    //for dialog
    displayDialog: false,
    dialogComponent: null,
    ConfirmationDialogType: null,
    ConfirmationData: null,
    //for user roles
    userRoles: false,
    rolesRoute: null,
    agentsData: null,
    statusDropDown: ["Active", "Inactive", "Deleted"],
    rolesEnumDropDown: null,
    rolesPageEnumDropDown: null,
    //cascade roles dropdown
    cascadeRolesDropDown: [
      {
        name: "Express",
        alias: "express",
        role_id: "EX",
        userTypes: [
          {
            name: "Contract",
            alias: "contract",
            userRoles: [],
          },
          {
            name: "Adhoc",
            alias: "adhoc",
            userRoles: [],
          },
        ],
      },
      {
        name: "Rapido",
        alias: "rapido",
        code: "RP",
        userTypes: [
          {
            name: "Contract",
            alias: "contract",
            userRoles: [],
          },
          {
            name: "Adhoc",
            alias: "adhoc",
            userRoles: [],
          },
        ],
      },
      {
        name: "International",
        alias: "international",
        code: "IN",
        userTypes: [
          {
            name: "Contract",
            alias: "contract",
            userRoles: [],
          },
          {
            name: "Adhoc",
            alias: "adhoc",
            userRoles: [],
          },
          {
            name: "Agent",
            alias: "agent",
            userRoles: [],
          },
          {
            name: "OBC",
            alias: "OBC",
            userRoles: [],
          },
        ],
      },
    ],
    cascadeRolesDropDownFiltered: null,
    //-----------------------------------DATA FOR TABLES-------------------------------------------------//
    tableComponent: null,
    //network-courier table data
    networkCourierTableData: null,
    //network-courier table columns
    networkCourierTableColumnData: [
      { field: "Actions", header: "Actions" },
      // { field: "user_id", header: "User Id" },
      { field: "display_name", header: "Name" },
      { field: "roles", header: "Role" },
      { field: "email", header: "Email" },
      { field: "contact_no", header: "Contact No" },
      { field: "mobile_no", header: "Mobile No" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    //online-customer table data
    onlineCustomerTableData: null,
    //online-customer table columns
    onlineCustomerTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "company_name", header: "Company Name" },
      { field: "customer_code", header: "Customer Code." },
      { field: "online_customer_type", header: "Customer Type" },
      { field: "contact_no", header: "Contact No" },
      { field: "email", header: "Email" },
      { field: "no_of_user", header: "Users" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    //activity-log table data
    activityLogTableData: [
      {
        Os: "Windows",
        "IP Address": "192.168.1.1",
        Location: "Mandalay Towers",
        "Logged In": "22 Oct 2020",
        "Logged Out": "22 Oct 2020",
      },
      {
        Os: "Windows",
        "IP Address": "192.167.1.2",
        Location: "Thornridge CIR",
        "Logged In": "22 Oct 2020",
        "Logged Out": "22 Oct 2020",
      },
      {
        Os: "Mac OS",
        "IP Address": "131.112.2.3",
        Location: "Elign St. Celina",
        "Logged In": "22 Oct 2020",
        "Logged Out": "22 Oct 2020",
      },
      {
        Os: "Mac OS",
        "IP Address": "122.333.4.5",
        Location: "San Jose",
        "Logged In": "22 Oct 2020",
        "Logged Out": "22 Oct 2020",
      },
      {
        Os: "Mac OS",
        "IP Address": "124.555.6.7",
        Location: "Preston Rd",
        "Logged In": "22 Oct 2020",
        "Logged Out": "22 Oct 2020",
      },
    ],
    //activity-log table coliumns
    activityLogTableColumns: [
      { field: "os", header: "Os" },
      { field: "ip_address", header: "IP Address" },
      { field: "location", header: "Location" },
      { field: "logged_in", header: "Logged In" },
      { field: "logged_out", header: "Logged Out" },
    ],
    //activity-log dialog header
    activityLogDialogData: {},
    //roles table data
    rolesTableData: null,
    //adhoc table data
    adhocTableData: null,
    //contract table data
    contractTableData: null,
    //agent table data
    agentsTableData: null,
    //obc table data
    obcTableData: null,
    //roles table columns
    internalRolesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "roleName", header: "Roles" },
      { field: "createdBy", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    rolesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "role_name", header: "Roles" },
      { field: "createdBy", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //table data for user types roles access
    userTypesRolesAccessTableData: [
      {
        Modules: "Features",
        Features: {
          checks: false,
        },
        Add: {
          checks: false,
        },
        Edit: {
          checks: false,
        },
        View: {
          checks: false,
        },
        Delete: {
          checks: false,
        },
        subs: 4,
        type: "feature",
        expand: false,
        parent: "",
      },
      {
        Modules: "Booking",
        Booking: {
          checks: false,
        },
        Add: {
          checks: false,
        },
        Edit: {
          checks: false,
        },
        View: {
          checks: false,
        },
        Delete: {
          checks: false,
        },
        subs: null,
        type: "feature",
        expand: false,
        parent: "Features",
      },
      {
        Modules: "Status",
        Status: {
          checks: false,
        },
        Add: {
          checks: false,
        },
        Edit: {
          checks: false,
        },
        View: {
          checks: false,
        },
        Delete: {
          checks: false,
        },
        subs: null,
        type: "feature",
        expand: false,
        parent: "Features",
      },
      {
        Modules: "Address Book",
        "Address Book": {
          checks: false,
        },
        Add: {
          checks: false,
        },
        Edit: {
          checks: false,
        },
        View: {
          checks: false,
        },
        Delete: {
          checks: false,
        },
        subs: null,
        type: "feature",
        expand: false,
        parent: "Features",
      },
      {
        Modules: "User",
        User: {
          checks: false,
        },
        Add: {
          checks: false,
        },
        Edit: {
          checks: false,
        },
        View: {
          checks: false,
        },
        Delete: {
          checks: false,
        },
        subs: null,
        type: "feature",
        expand: false,
        parent: "Features",
      },
    ],
    //table data for roles access
    rolesAccessTableData: null,
    rolesAccessBackendData: null,
    rolesAccessTableColumns: [
      { field: "Modules", header: "Modules" },
      { field: "Add", header: "Add" },
      { field: "Edit", header: "Edit" },
      { field: "View", header: "View" },
      { field: "Delete", header: "Delete" },
    ],
    userTypesRolesAccessTableColumns: [
      { field: "Modules", header: "Modules" },
      { field: "Add", header: "Add" },
      { field: "Edit", header: "Edit" },
      { field: "View", header: "View" },
      { field: "Delete", header: "Delete" },
    ],
    //tableglobalSearch
    globalSearch: "Network",
    //-----------------------------------DATA FOR TABLES-------------------------------------------------//
    // data for badges
    badgeColors: ["level_1", "level_2", "level_3", "level_4"],
    badgeData: [{ color: "" }, { color: "" }, { color: "" }, { color: "" }],
    //data for overlay
    networkCourierOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      // {
      //   label: "Role Setting",
      //   icon: "fas fa-cog",
      // },
      {
        label: "Reset Password",
        icon: "fas fa-redo-alt",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Activity Log",
        icon: "fas fa-chart-line",
      },
    ],
    onlineCustomerOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Copy User",
        icon: "fas fa-user",
      },
    ],
    organizationOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Role Setting",
        icon: "fas fa-cog",
      },
      {
        label: "Reset Password",
        icon: "fas fa-redo-alt",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    rolesNetworkCourierOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Role Access",
        icon: "fas fa-user-tag",
      },
    ],
    rolesOnlineUsersOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Role Access",
        icon: "fas fa-user-tag",
      },
    ],
    //data for toggle
    toggleData: [{ type: "" }],
    //data for deliveryTypes
    deliveryTypesData: [
      {
        label: "International",
        tab: "DataTables",
        select: true,
        tabName: "International",
        data: "",
        columns: "",
      },
      {
        label: "Express",
        tab: "DataTables",
        select: false,
        tabName: "Express",
        data: "",
        columns: "",
      },
      {
        label: "Rapido",
        tab: "DataTables",
        select: false,
        tabName: "Rapido",
        data: "",
        columns: "",
      },
    ],
    //data for tabs
    tabMenuData: [
      {
        label: "NetworkCourier",
        tab: "DataTables",
        select: true,
        tabName: "Network Courier",
        access_name: "networkCourierUser",
        data: "networkCourierTableData",
        columns: "networkCourierTableColumnData",
      },
      {
        label: "OnlineCustomer",
        tab: "DataTables",
        select: false,
        tabName: "Online Users",
        access_name: "onlineUser",
        data: "onlineCustomerTableData",
        columns: "onlineCustomerTableColumnData",
      },
    ],
    filteredtabMenuData: null,
    //roles online customer
    rolesOnlineCustomerTabsState: [],
    rolesOnlineCustomerTabs: [
      {
        label: "Adhoc",
        tab: "DataTables",
        data: "adhocTableData",
        columns: "rolesTableColumnData",
      },
      {
        label: "Contract",
        tab: "DataTables",
        data: "contractTableData",
        columns: "rolesTableColumnData",
      },
      {
        label: "Agent",
        tab: "DataTables",
        data: "agentsTableData",
        columns: "rolesTableColumnData",
      },
      {
        label: "OBC",
        tab: "DataTables",
        data: "obcTableData",
        columns: "rolesTableColumnData",
      },
    ],
    //data for tab legends
    tabKeys: [
      { label: "express" },
      { label: "international" },
      { label: "rapido" },
    ],
    //data for roles tab
    tabMenuRolesData: [
      {
        label: "NetworkCourierTabs",
        tab: "DataTables",
        select: true,
        tabName: "Network Courier",
        access_name: "networkCourierUser",
        data: "rolesTableData",
        columns: "rolesTableColumnData",
      },
      {
        label: "OnlineCustomerTabs",
        tab: "DataTables",
        select: false,
        tabName: "Online Users",
        access_name: "onlineUser",
        data: "onlineCustomerTableData",
        columns: "onlineCustomerTableColumnData",
      },
    ],
    //data for usersTypesRoles
    tabUsersTypesRoles: [
      {
        label: "UserTypesRoles",
        tab: "DataTables",
        select: false,
        tabName: "UserTypesRoles",
        data: "userTypesRolesTableData",
        columns: "userTypesRolesTableColumnData",
      },
    ],
    tabMenuOrganizationData: [
      {
        label: "AgentsTable",
        tab: "DataTables",
        select: true,
        tabName: "Agents",
        data: "organizationData",
        columns: "organizationTableColumnData",
      },
    ],
    //data for multi-chip-select
    MultiSelectChipData: {
      selectedData: null,
      options: null,
    },
    AgentsMultiSelectChipData: {
      selectedData: null,
      options: null,
    },
    //organization data
    organizationData: null,
    //usertypeRoles data
    userTypesRolesTableData: [
      {
        Roles: "General",
        "Created By": "Alina Lopez",
        "Created On": "4th April 2021",
        Actions: "",
      },
      {
        Roles: "Accounts Clerk",
        "Created By": "Alina Lopez",
        "Created On": "4th April 2021",
        Actions: "",
      },
      {
        Roles: "Accounts Executive",
        "Created By": "Alina Lopez",
        "Created On": "4th April 2021",
        Actions: "",
      },
      {
        Roles: "Accounts Manager",
        "Created By": "Alina Lopez",
        "Created On": "4th April 2021",
        Actions: "",
      },
      {
        Roles: "Admin",
        "Created By": "Alina Lopez",
        "Created On": "4th April 2021",
        Actions: "",
      },
    ],
    //agent table columns
    organizationTableColumnData: [
      { field: "Actions", header: "Actions" },
      // { field: "user_id", header: "User Id" },
      { field: "display_name", header: "Name" },
      { field: "roles", header: "Role" },
      { field: "costCenter", header: "Cost Center" },
      { field: "email", header: "Email" },
      { field: "contact_no", header: "Contact No" },
      { field: "mobile_no", header: "Mobile No" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    //userTypesRolesTableData columns
    userTypesRolesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "role", header: "Roles" },
      { field: "Created By", header: "Created By" },
      { field: "Created On", header: "Created On" },
    ],
    //agents overlaypanel
    AgentsOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Role Setting",
        icon: "fas fa-cog",
      },
      {
        label: "Reset Password",
        icon: "fas fa-redo-alt",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    //choice-selection data
    ChoiceSelectionData: [
      { label: "Network Courier", type: "NW" },
      { label: "Online Customer", type: "OC" },
    ],
    tabCategories: [
      { name: "Network Courier", key: "NC" },
      { name: "Online Customer", key: "OC" },
    ],
    //data for radio button
    categoriesState: [],
    categories: [
      { name: "Adhoc", key: "AD" },
      { name: "Contract", key: "CT" },
      { name: "Agent", key: "AG" },
      { name: "OBC", key: "OB" },
    ],
    //data for check box
    checkboxData: [{ name: "", key: "A" }],
    //dashboard table data
    dashboardTableData: [
      {
        // "User Id": "123",
        Name: "Dell",
        logoPath: "dell",
        subText: "mbradsimmon",
        "Total Orders": "1,520",
        "Total Revenue": "$187, 475",
        "Total Profit": "$187, 475",
      },
      {
        // "User Id": "123",
        Name: "SeptWolves",
        logoPath: "septwolves",
        subText: "mbradsimmon",
        "Total Orders": "150",
        "Total Revenue": "$187, 475",
        "Total Profit": "$187, 475",
      },
      {
        // "User Id": "123",
        Name: "Green Coffee",
        logoPath: "greencoffee",
        subText: "mbradsimmon",
        "Total Orders": "100",
        "Total Revenue": "$187, 475",
        "Total Profit": "$187, 475",
      },
      {
        // "User Id": "123",
        Name: "Stradivarius",
        subText: "mbradsimmon",
        "Total Orders": "100",
        "Total Revenue": "$187, 475",
        "Total Profit": "$187, 475",
      },
      {
        // "User Id": "123",
        Name: "Zara",
        subText: "mbradsimmon",
        "Total Orders": "100",
        "Total Revenue": "$187, 475",
        "Total Profit": "$187, 475",
      },
    ],
    //agent table columns
    dashboardTableColumnData: [
      { field: "Name", header: "Name" },
      { field: "Total Orders", header: "Total Orders" },
      { field: "Total Revenue", header: "Total Revenue" },
      { field: "Total Profit", header: "Total Profit" },
    ],
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
  mutations: {
    updateBreadCrumb(state, value) {
      state.breadcrumbPath = value;
    },
    updateBreadCrumbAndTitle(state, value) {
      state.breadcrumbTitle = value.title || "";
      state.breadcrumbPath = value.breadcrumbInfo || "";
    },
    fetchNetworkCourierData(state, data) {
      state.networkCourierTableData = getRoles(data);
    },
    fetchOnlineCustomersData(state, data) {
      state.onlineCustomerTableData = data;
    },
    fetchOrganizationData(state, data) {
      state.companyUsersCount = data.length;
      state.organizationData = getRoles(data);
    },
    fetchRolesTableData(state, data) {
      for (var r in data) {
        if (data[r].created_user != null) {
          data[r].createdBy = data[r].created_user.username;
        }
      }
      state.rolesTableData = data;
    },
    fetchAdhocTableData(state, data) {
      state.adhocTableData = data;
    },
    fetchContractTableData(state, data) {
      state.contractTableData = data;
    },
    fetchAgentTableData(state, data) {
      state.agentsTableData = data;
    },
    fetchObcTableData(state, data) {
      state.obcTableData = data;
    },
    fetchRolesDropDownData(state, data) {
      state.MultiSelectChipData.options = rolesDropDown(data);
      state.rolesEnumDropDown = rolesEnumDropDownPopulator(data);
    },
    fetchRolesPageDropDownData(state, data) {
      state.rolesPageDropDown = rolesDropDown(data);
      state.rolesPageEnumDropDown = rolesEnumDropDownPopulator(data);
    },
    fetchFeatureAccessTableData(state, data) {
      state.rolesAccessTableData = data;
    },
    fetchFeatureAccessBackendData(state, data) {
      state.rolesAccessBackendData = data;
      state.rolesPageDropDown = rolesDropDown(data);
    },
    fetchActivityLogData(state, data) {
      state.activityLogTableData = data;
    },
    fetchtabMenuData(state, data) {
      state.tabMenuData = data;
    },
    fetchRolesTabMenuData(state, data) {
      state.tabMenuRolesData = data;
    },
    fetchCreateRolesDialogData(state, data) {
      state.tabCategories = data;
    },
    fetchCascadeRolesDropDownData(state, data) {
      state.AgentsMultiSelectChipData.options = rolesDropDown(data[0]);
      state.rolesCascadeEnumDropDown = rolesEnumDropDownPopulator(data[0]);
      // var filteredCascadeDropDownData = [];
      // var fcUserTypeIter_obj = {};
      // for (var fcDataSource in data[0]) {
      //   var fcDataSource_obj = data[0][fcDataSource];
      //   for (var fc in state.cascadeRolesDropDown) {
      //     var fc_obj = state.cascadeRolesDropDown[fc];
      //     if (fc_obj.alias == fcDataSource_obj.customer_type) {
      //       var fcUserTypeArray = fc_obj.userTypes;
      //       for (var fcUserTypeIter in fcUserTypeArray) {
      //         fcUserTypeIter_obj = fcUserTypeArray[fcUserTypeIter];
      //         if (fcUserTypeIter_obj.alias == fcDataSource_obj.user_type) {
      //           state.cascadeRolesDropDown[fc].userTypes[
      //             fcUserTypeIter
      //           ].userRoles.push({
      //             role_name: fcDataSource_obj.role_name,
      //             role_id: fcDataSource_obj.role_id,
      //           });
      //         }
      //       }
      //     }
      //   }
      // }
      // for (var fcDataSourceTwo in state.cascadeRolesDropDown) {
      //   var fcTwoDataSource_obj = state.cascadeRolesDropDown[fcDataSourceTwo];
      //   if (fcTwoDataSource_obj.alias == data[1]) {
      //     var fcTwoUserTypeArray = fcTwoDataSource_obj.userTypes;
      //     for (var fcTwoUserTypeArrayIter in fcTwoUserTypeArray) {
      //       if (fcTwoUserTypeArray[fcTwoUserTypeArrayIter].alias == data[2]) {
      //         fcTwoDataSource_obj.userTypes = [
      //           fcTwoUserTypeArray[fcTwoUserTypeArrayIter],
      //         ];
      //       }
      //     }
      //     filteredCascadeDropDownData.push(fcTwoDataSource_obj);
      //   }
      // }
      // state.cascadeRolesDropDownFiltered = filteredCascadeDropDownData;
    },
    showToast(state, array) {
      if (array[0] != "error") {
        if (array[3] == "user") {
          state.summary = "The user" + " " + array[1].username + " " + array[2];
        }
        if (array[3] == "role") {
          state.summary =
            "The Role" + " " + array[1].role_name + " " + array[2];
        }
        if (array[3] == "Reset") {
          state.summary = "The Password is Reset successfully";
        }
        //SALES
        if (array[3] == "sales") {
          state.summary =
            "The company" + " " + array[1].company_name + " " + array[2];
        }
        if (array[3] == "quotation") {
          state.summary = "The Quotation" + " " + array[2];
        }
        if (array[3] == "billPreference") {
          state.summary = "Bill Preference" + " " + array[2];
        }
        if (array[3] == "costCenter") {
          state.summary = "Cost Center" + " " + array[2];
        }
        //SALES

        if (array[3] == "region") {
          state.summary = "The region" + " " + array[1].region + " " + array[2];
        }
        if (array[3] == "rate_card") {
          state.summary =
            "Rate Card" + " " + array[1].rate_card_name + " " + array[2];
        }

        //FLEETS
        if (array[3] == "vehicleDetails") {
          state.summary =
            "Details for the vehicle" + " " + array[1].name + " " + array[2];
        }
        if (array[3] == "fuel") {
          state.summary = "The fuel details" + " " + array[2];
        }
        if (array[3] == "maintenance") {
          state.summary = "The maintenance details" + " " + array[2];
        }
        if (array[3] == "inspection") {
          state.summary = "The inspection details" + " " + array[2];
        }
        if (array[3] == "summons") {
          state.summary = "The Summon" + " " + array[2];
        }
        if (array[3] == "claim") {
          state.summary = "The Claim" + " " + array[2];
        }
        if (array[3] == "roadTax") {
          state.summary = "The Road Tax" + " " + array[2];
        }
        if (array[3] == "coe") {
          state.summary = "The COE" + " " + array[2];
        }
        if (array[3] == "accident") {
          state.summary = "The Accident" + " " + array[2];
        }
        if (array[3] == "insurance") {
          state.summary = "The Insurance" + " " + array[2];
        }
        if (array[3] == "vehicleType") {
          state.summary =
            "Vehicle type" + " " + array[1].vehicle_type + " " + array[2];
        }
        if (array[3] == "claimType") {
          state.summary =
            "Claim type" + " " + array[1].claim_type + " " + array[2];
        }
        if (array[3] == "maintenanceType") {
          state.summary =
            "Maintenance type" +
            " " +
            array[1].maintenance_type +
            " " +
            array[2];
        }
        if (array[3] == "deliveryPoint") {
          state.summary =
            "Delivery Point" + " " + array[1].delivery_point + " " + array[2];
        }
        if (array[3] == "productName") {
          state.summary =
            "The Product Name" + " " + array[1].product_name + " " + array[2];
        }
        if (array[3] == "fuelCard") {
          state.summary = "The Fuel Card" + " " + array[2];
        }
        if (array[3] == "cashCard") {
          state.summary = "The Cash Card" + " " + array[2];
        }
        if (array[3] == "cashCard/topUp/") {
          state.summary = "The Topup was successfull" + " " + array[2];
        }
        if (array[3] == "InspectionCheck") {
          state.summary =
            "The Inspection check" +
            " " +
            array[1].inspection_check +
            " " +
            array[2];
        }
        //FLEETS
        //room masters
        if (array[3] == "rooms") {
          state.summary = "The Room" + " " + array[2];
        }
        if (array[3] == "EventInviteesStatus") {
          state.summary = "The Status" + " " + array[2];
        }

        //CONTACTS
        if (array[3] == "contacts") {
          state.summary = "The contact details" + " " + array[2];
        }
        if (array[3] == "mainGroups") {
          state.summary = "The main group" + " " + array[2];
        }
        if (array[3] == "subGroups") {
          state.summary = "The sub group" + " " + array[2];
        }
        if (array[3] == "donations") {
          state.summary = "The donation details" + " " + array[2];
        }
        if (array[3] == "appointments") {
          state.summary = "The appointment details" + " " + array[2];
        }
        if (array[3] == "events") {
          state.summary = "The event" + " " + array[2];
        }
        if (array[3] == "inviteesTable") {
          state.summary = "The invitees table" + " " + array[2];
        }
        if (array[3] == "followUp") {
          state.summary = "The follow up" + " " + array[2];
        }
        if (array[3] == "edm") {
          state.summary = "The mail" + " " + array[2];
        }
        if (array[3] == "edmMessage") {
          state.summary = "The Message" + " " + array[2];
        }
        if (array[3] == "meetingRoom/booking") {
          state.summary = "The room " + " " + array[2];
        }
        if (array[3] == "requestCancellation") {
          state.summary = "The cancellation request was sent!";
        }
        if (array[3] == "eventsClone") {
          state.summary = "The event was cloned";
        }

        state.severity = array[0];
      }
      if (
        array[0] == "error" ||
        array[0] == "The room is already booked in this date!" ||
        array[0] == "User already exists" ||
        array[0] == "Contact number already exists!" ||
        array[0] == "This role is assigned to a user" ||
        array[0] == "User dose not exist" ||
        array[0] == "Mobile number  already exist!" ||
        array[0] == "Region already exist."
      ) {
        state.summary = array[0];
        state.severity = "error";
      }
      state.showToastMessage = true;
    },
  },
  actions: {
    //fetching user permissions
    getUserPermissions({ state, commit }) {
      state.tabCategories = [
        { name: "Network Courier", key: "NC" },
        { name: "Online Customer", key: "OC" },
      ];

      var groupByModulePermissions = groupByKey(
        JSON.parse(localStorage.getItem("PermissionsData"))
      );
      for (var mod in groupByModulePermissions) {
        var mod_array = groupByModulePermissions[mod];
        fetchAccess(mod_array, mod);
      }

      function fetchAccess(mod_array, mod) {
        if (mod == "user") {
          modFilter(
            mod,
            mod_array,
            "tabMenuData",
            "usersNetworkCourierAddAccess",
            "usersOnlineUsersAddAccess",
            "networkCourierOverlayData",
            "organizationOverlayData",
            "fetchtabMenuData"
          );
        }

        if (mod == "roles") {
          modFilter(
            mod,
            mod_array,
            "tabMenuRolesData",
            "rolesNetworkCourierAddAccess",
            "rolesOnlineUsersAddAccess",
            "rolesNetworkCourierOverlayData",
            "rolesOnlineUsersOverlayData",
            "fetchRolesTabMenuData"
          );
        }
      }

      function modFilter(
        moduleName,
        moduleArray,
        tabDataName,
        networkCourierAddAccess,
        onlineUsersAddAccess,
        networkCourierOverlayData,
        onlineUsersOverlayData,
        fetchingTabDataFunctionName
      ) {
        var filtered_tabs_menu = [];
        var filteredCreateRolesDialog = [];
        for (var mod_iter in moduleArray) {
          var mod_obj = moduleArray[mod_iter];

          for (var ts in state[tabDataName]) {
            var ts_obj = state[tabDataName][ts];

            if (ts_obj.access_name == mod_obj.role_access.module_name) {
              if (mod_obj.view_access == true) {
                if (mod_obj.role_access.module_name == "networkCourierUser") {
                  if (moduleName == "roles") {
                    filteredCreateRolesDialog.push(state.tabCategories[0]);
                  }
                  if (mod_obj.add_access == true) {
                    state[networkCourierAddAccess] = true;
                  } else {
                    state[networkCourierAddAccess] = false;
                  }
                  ovelayDataFilter(
                    networkCourierOverlayData,
                    mod_obj.delete_access,
                    mod_obj.edit_access
                  );
                }
                if (mod_obj.role_access.module_name == "onlineUser") {
                  if (moduleName == "roles") {
                    filteredCreateRolesDialog.push(state.tabCategories[1]);
                  }
                  if (mod_obj.add_access == true) {
                    state[onlineUsersAddAccess] = true;
                  } else {
                    state[onlineUsersAddAccess] = false;
                  }
                  ovelayDataFilter(
                    onlineUsersOverlayData,
                    mod_obj.delete_access,
                    mod_obj.edit_access
                  );
                }
                filtered_tabs_menu.push(ts_obj);
              }
              if (
                mod_obj.view_access == false &&
                mod_obj.role_access.module_name == "networkCourierUser"
              ) {
                state[networkCourierAddAccess] = false;
              }
              if (
                mod_obj.view_access == false &&
                mod_obj.role_access.module_name == "onlineUser"
              ) {
                state[onlineUsersAddAccess] = false;
              }
            }
          }
        }
        commit(fetchingTabDataFunctionName, filtered_tabs_menu);
        if (moduleName == "roles") {
          commit("fetchCreateRolesDialogData", filteredCreateRolesDialog);
        }
      }

      function ovelayDataFilter(overlayDataName, deleteAccess, editAccess) {
        var filtered_overlay_data = [];

        for (var od in state[overlayDataName]) {
          var od_obj = state[overlayDataName][od];
          if (od_obj.label == "Delete") {
            if (deleteAccess == true) {
              filtered_overlay_data.push(od_obj);
            }
          }
          if (od_obj.label == "Edit") {
            if (editAccess == true) {
              filtered_overlay_data.push(od_obj);
            }
          }
          if (od_obj.label != "Delete" && od_obj.label != "Edit") {
            filtered_overlay_data.push(od_obj);
          }
        }

        state[overlayDataName] = filtered_overlay_data;
      }
    },

    //fetching the authentication/jwt token for the user logged in
    // eslint-disable-next-line no-unused-vars
    getAuthToken({ dispatch }) {
      // dispatch("loadUsersApi", {
      //   apiPath: "internal",
      //   tag: "",
      // });
      // dispatch("loadRolesDropDownApi", {
      //   apiPath: "/internal/internal",
      //   tag: "roles_dropdown",
      // });
      // dispatch("loadRolesApi", {
      //   apiPath: "",
      //   tag: "roles dropdown",
      // });
    },
    //setting up the auth headers with the fetched token for accessing other apis
    setAuthToken() {
      axios.defaults.headers.common = {
        Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
      };
    },

    //COMPANY API
    loadCompanyApi({ commit }, { apiPath, tag }) {
      axios.get("company/" + apiPath).then((res) => {
        var comp_source = res.data.results.rows;

        for (var cs in res.data.results.rows) {
          if (res.data.results.rows[cs]["created user"] != null) {
            res.data.results.rows[cs]["created_by"] =
              res.data.results.rows[cs]["created user"]["username"];
          }
          var cs_obj = res.data.results.rows[cs];
          for (var csiter in cs_obj) {
            if (
              csiter == "createdAt" ||
              csiter == "updatedAt" ||
              csiter == "logged_in" ||
              csiter == "logged_out"
            ) {
              var raw_date = res.data.results.rows[cs][csiter];
              res.data.results.rows[cs][csiter + "raw_date"] = raw_date;
              res.data.results.rows[cs][csiter] = new Date(cs_obj[csiter]);
            }
          }
        }

        var ct_count = 0;
        var dt_count = 0;

        for (var comp in res.data.results.rows) {
          var comp_obj = res.data.results.rows[comp];

          for (var comp_obj_iter in comp_obj) {
            if (
              comp_obj_iter == "adhoc" ||
              comp_obj_iter == "agent" ||
              comp_obj_iter == "contract" ||
              comp_obj_iter == "obc"
            ) {
              if (comp_obj[comp_obj_iter] == true && ct_count == 0) {
                comp_source[comp]["online_customer_type"] = comp_obj_iter;
                ct_count++;
              }
            }

            if (
              comp_obj_iter == "international" ||
              comp_obj_iter == "express" ||
              comp_obj_iter == "rapido"
            ) {
              if (comp_obj[comp_obj_iter] == true && dt_count == 0) {
                comp_source[comp]["delivery_type"] = comp_obj_iter;
                dt_count++;
              }
            }
          }
        }

        //fetching external users/online customers data : Initial Online Customer Tab
        if (tag == "onlineUsers") {
          commit("fetchOnlineCustomersData", comp_source);
        }
      });
    },

    //USERS API
    loadUsersApi({ commit, state }, { apiPath, tag }) {
      axios.get("users/" + apiPath).then((res) => {
        for (var r in res.data.results.rows) {
          if (res.data.results.rows[r]["created user"] != null) {
            res.data.results.rows[r]["created_by"] =
              res.data.results.rows[r]["created user"]["username"];
          }
          var obj = res.data.results.rows[r];
          for (var o in obj) {
            if (
              o == "createdAt" ||
              o == "updatedAt" ||
              o == "logged_in" ||
              o == "logged_out"
            ) {
              if (obj[o] != null) {
                var raw_date = res.data.results.rows[r][o];
                res.data.results.rows[r][o + "raw_date"] = raw_date;
                // res.data.results.rows[r][o] = dateFormater(obj[o]);
                res.data.results.rows[r][o] = new Date(obj[o]);
              }
            }
          }
        }

        for (var al in res.data.results) {
          var al_obj = res.data.results[al];
          for (var alo in al_obj) {
            if (alo == "logged_in" || alo == "logged_out") {
              if (al_obj[alo] != null) {
                var al_raw_date = res.data.results[al][alo];
                res.data.results[al][alo + "raw_date"] = al_raw_date;
                res.data.results[al][alo] = new Date(al_obj[alo]);
              }
            }
          }
        }

        //fetching acytivity log data
        if (tag == "Activity Log") {
          commit("fetchActivityLogData", res.data.results);
        }

        //fetching internal users/network courier data : Initial Network Courier Tab
        if (apiPath == "internal" && tag == "") {
          commit("fetchNetworkCourierData", res.data.results.rows);
          state.tableLoad = false;
        }

        //fetching list of users under a specified organization
        if (tag == "organization") {
          commit("fetchOrganizationData", res.data.results.rows);
        }
      });
    },

    //ROLES CRUD API
    rolesCRUD({ state, commit, dispatch }, { tag, data, id }) {
      // var rolesPath = "/user/external?customer_type=";
      //adding new role to the data-base using the axios POST method
      if (tag == "add") {
        axios
          .post("roles/", data)
          .then((res) => {
            if (res.data.message == "Created successfully") {
              state.newRoleData = res.data.results;
              state.tableLoad = true;
              //updating all of the roles tables
              dispatch("loadRolesApi", {
                apiPath: "/users",
                data: {
                  user_type: data.user_type,
                  customer_type: data.customer_type,
                },
              });
              state.displayDialog = false;
              // dispatch("DefaultRolesAccessApi");
              commit("showToast", ["success", data, "was added", "role"]);
            }
          })
          .catch(function (error) {
            const errorMessage = error.message.split(" ");
            if (errorMessage[5] === "400") {
              state.tableLoad = false;
              commit("showToast", ["error", data, "was added", "role"]);
            }
          });
      }

      if (tag == "update") {
        axios.put("roles/" + id, data).then((res) => {
          if (res.data.status == 200) {
            state.tableLoad = true;
            dispatch("loadRolesApi", {
              apiPath: "/users",
              data: {
                user_type: data.user_type,
                customer_type: data.customer_type,
              },
            });
            state.displayDialog = false;
            commit("showToast", ["info", data, "was edited", "role"]);
          }
        });
      }

      if (tag == "delete") {
        axios
          .delete("roles/" + data.role_id)
          .then((res) => {
            if (res.data.status == 200) {
              state.tableLoad = true;
              dispatch("loadRolesApi", {
                apiPath: "/users",
                data: {
                  user_type: data.user_type,
                  customer_type: data.customer_type,
                },
              });
              state.displayDialog = false;
              commit("showToast", ["info", data, "was deleted", "role"]);
            }
          })
          .catch(function (error) {
            if (error.response) {
              const errorMessage = error.message.split(" ");
              if (errorMessage[5] === "400") {
                state.tableLoad = false;
                commit("showToast", [
                  "This role is assigned to a user",
                  data,
                  "",
                  "role",
                ]);
              }
            }
          });
      }
    },

    //USERS CRUD API
    usersCRUD({ state, commit, dispatch }, { tag, data }) {
      //adding new data to the data-base using the axios POST method
      if (tag == "add") {
        axios
          .post("users/", data)
          .then((res) => {
            if (
              res.data.message ==
              "User created sucessfully and notified to given email"
            ) {
              state.tableLoad = true;
              dispatch("loadUsersApi", {
                apiPath: "internal",
                tag: "",
              });
              dispatch("loadUsersApi", {
                apiPath: state.companyId,
                tag: "organization",
              });
              state.displayDialog = false;
              commit("showToast", ["success", data, "was added", "user"]);
            }
          })
          .catch(function (error) {
            const errorMessage = error.message.split(" ");
            if (errorMessage[5] === "400") {
              state.tableLoad = false;
              commit("showToast", [
                "User already exists",
                data,
                "was added",
                "user",
              ]);
            }
          });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        for (var d in data) {
          if (d == "createdAt" || d == "updatedAt") {
            data[d] = data[d + "raw_date"];
          }
        }
        axios.put("users/" + data.id, data).then((res) => {
          if (res.data.status == 200) {
            state.tableLoad = true;
            dispatch("loadUsersApi", {
              apiPath: "internal",
              tag: "",
            });
            dispatch("loadUsersApi", {
              apiPath: state.companyId,
              tag: "organization",
            });
            state.displayDialog = false;
            commit("showToast", ["info", data, "was edited", "user"]);
          }
        });
      }
      //deleting an existing data in the data-base using the axios DELETE method
      if (tag == "delete") {
        axios.delete("user/" + data.id).then((res) => {
          if (res.data.message == "Deleted successfully") {
            state.tableLoad = true;
            dispatch("loadUsersApi", {
              apiPath: "internal",
              tag: "",
            });
            dispatch("loadUsersApi", {
              apiPath: state.companyId,
              tag: "organization",
            });
            commit("showToast", ["info", data, "was deleted", "user"]);
          } else {
            commit("showToast", [
              "error",
              data,
              "could not be deleted",
              "user",
            ]);
          }
        });
      }
      //retrieving a deleted data from the data-base using the axios PATCH method
      //disabling an existing data from the data-base using the axios PATCH method
      if (tag == "retriveUser/" || tag == "modifyStatus/") {
        var mssg;
        if (tag == "retriveUser/") {
          mssg = "was retrieved!";
        }
        if (tag == "modifyStatus/") {
          if (data.status == "Active") {
            mssg = "was deactivated! ";
          }
          if (data.status == "Inactive") {
            mssg = "was activated!";
          }
        }
        axios.patch("users/" + tag + data.id).then((res) => {
          if (
            res.data.message == "Modified Sucessfully" ||
            res.data.message == "Retrived successfully"
          ) {
            state.tableLoad = true;
            dispatch("loadUsersApi", {
              apiPath: "internal",
              tag: "",
            });
            dispatch("loadUsersApi", {
              apiPath: state.companyId,
              tag: "organization",
            });
            commit("showToast", ["info", data, mssg, "user"]);
          } else {
            commit("showToast", ["error", data, "", "user"]);
          }
        });
      }
    },

    //ROLES DROPDOWN API
    loadRolesDropDownApi({ commit }, { apiPath, tag }) {
      axios.get("roles" + apiPath).then((res) => {
        if (tag == "roles_dropdown") {
          commit("fetchRolesPageDropDownData", res.data.results);
          commit("fetchRolesDropDownData", res.data.results);
        }
      });
    },

    //ROLES API
    loadRolesApi({ commit, dispatch, state }, { apiPath, data }) {
      var customerTypes = null;
      var userTypes = null;
      if (state.deliveryChoicesState != null) {
        customerTypes = convertToLowerCase(state.deliveryChoicesState);
      }
      if (state.radioButtonTypesValue != null) {
        userTypes = convertToLowerCase(state.radioButtonTypesValue);
      }
      if (
        state.deliveryChoicesState == null ||
        state.radioButtonTypesValue == null
      ) {
        customerTypes = "internal";
        userTypes = "internal";
      }

      axios.post("roles" + apiPath, data).then((res) => {
        for (var rol in res.data.results) {
          var ro_obj = res.data.results[rol];
          for (var ro in ro_obj) {
            if (ro == "createdAt" || ro == "updatedAt") {
              var raw_date = res.data.results[rol][ro];
              res.data.results[rol][ro + "raw_date"] = raw_date;
              res.data.results[rol][ro] = new Date(ro_obj[ro]);
            }
          }
        }
        if (apiPath == "/dd") {
          commit("fetchCascadeRolesDropDownData", [
            res.data.results[data.customer_type],
            data.customer_type,
            data.user_type,
          ]);
        }
        if (apiPath != "/dd") {
          if (data.user_type == "internal") {
            commit("fetchRolesTableData", res.data.results);
            state.tableLoad = false;
          }
          if (data.customer_type == state.deliveryTypesTabsActual) {
            if (data.user_type == "adhoc") {
              commit("fetchAdhocTableData", res.data.results);
              state.tableLoad = false;
            }
            if (data.user_type == "contract") {
              commit("fetchContractTableData", res.data.results);
              state.tableLoad = false;
            }
            if (data.user_type == "agent") {
              commit("fetchAgentTableData", res.data.results);
              state.tableLoad = false;
            }
            if (data.user_type == "obc") {
              commit("fetchObcTableData", res.data.results);
              state.tableLoad = false;
            }
            if (userTypes != null && customerTypes != null) {
              dispatch("loadRolesDropDownApi", {
                apiPath: "/" + customerTypes + "/" + userTypes,
                tag: "roles_dropdown",
              });
            }
          }
        }
      });
    },

    //ROLES ACCESS API
    LoadRolesAccessApi({ commit }, { data }) {
      axios.get("access/roles/" + data.role_id).then((res) => {
        var rolesTableArray = [];
        var access_source = res.data.results;
        commit("fetchFeatureAccessBackendData", access_source);
        // for (var a in access_source) {
        //   access_source[a].feature = access_source[a].role_access.features;
        // }
        // const groupBy = (keys) => (array) =>
        //   array.reduce((objectsByKeyValue, obj) => {
        //     const value = keys.map((key) => obj[key]).join("-");
        //     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(
        //       obj
        //     );
        //     return objectsByKeyValue;
        //   }, {});
        // const groupByFeature = groupBy(["feature"]);
        // var groupedByFeatureObject = groupByFeature(access_source);
        var groupedByFeatureObject = groupByKey(access_source);

        function toUpperCase(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function processParent(featureData, featureName) {
          var numberOfModules = featureData.length;

          var parentObject = {
            Modules: featureName,
            [featureName]: {
              checks: "",
            },
            Add: {
              checks: "",
            },
            Edit: {
              checks: "",
            },
            Delete: {
              checks: "",
            },
            View: {
              checks: "",
            },
            subs: numberOfModules,
            type: featureName + "s",
            expand: false,
            parent: "",
          };

          var rightsObject = {
            add_access: [],
            edit_access: [],
            delete_access: [],
            view_access: [],
          };

          for (var fd in featureData) {
            var fd_obj = featureData[fd];
            for (var ol in fd_obj) {
              if (
                ol == "add_access" ||
                ol == "edit_access" ||
                ol == "delete_access" ||
                ol == "view_access"
              ) {
                rightsObject[ol].push(fd_obj[ol]);
              }
            }
          }

          var globalRightsCount = 0;
          for (var r in rightsObject) {
            var rightsType = r;
            var rightsArray = rightsObject[r];
            var rightsCount = 0;
            for (var ra in rightsArray) {
              if (rightsArray[ra] == true) {
                rightsCount++;
                globalRightsCount++;
              }
            }
            if (rightsCount == numberOfModules) {
              parentObject[toUpperCase(rightsType.split("_")[0])].checks = true;
            } else {
              parentObject[
                toUpperCase(rightsType.split("_")[0])
              ].checks = false;
            }
          }

          if (globalRightsCount == numberOfModules * 4) {
            parentObject[featureName].checks = true;
          } else {
            parentObject[featureName].checks = false;
          }

          rolesTableArray.push(parentObject);
        }

        function processChild(moduleData, featureName) {
          for (var c in moduleData) {
            var moduleMasterRightsCount = 0;
            var module_obj = moduleData[c];
            var moduleFeatureString =
              module_obj.role_access.module_name + "_" + featureName;
            var childObject = {
              Modules: module_obj.role_access.module_name + "_" + featureName,
              [moduleFeatureString]: {
                checks: "",
              },
              Add: {
                checks: "",
              },
              Edit: {
                checks: "",
              },
              Delete: {
                checks: "",
              },
              View: {
                checks: "",
              },
              subs: null,
              type: featureName + "s",
              expand: false,
              parent: featureName,
            };
            for (var mo in module_obj) {
              if (
                mo == "add_access" ||
                mo == "edit_access" ||
                mo == "delete_access" ||
                mo == "view_access"
              ) {
                childObject[toUpperCase(mo.split("_")[0])].checks =
                  module_obj[mo];
                if (childObject[toUpperCase(mo.split("_")[0])].checks == true) {
                  moduleMasterRightsCount++;
                }
              }
            }
            if (moduleMasterRightsCount == 4) {
              childObject[moduleFeatureString].checks = true;
            } else {
              childObject[moduleFeatureString].checks = false;
            }
            rolesTableArray.push(childObject);
          }
        }

        for (var f in groupedByFeatureObject) {
          processParent(groupedByFeatureObject[f], f);
          processChild(groupedByFeatureObject[f], f);
        }
        commit("fetchFeatureAccessTableData", rolesTableArray);
      });
    },

    //DEFAULT ROLES ACCESS TABLE
    // eslint-disable-next-line no-unused-vars
    DefaultRolesAccessApi({ context }) {
      axios.get("access");
      // .then((res) => {
      // });
    },

    //ROLES EDIT ACCESS API
    // eslint-disable-next-line no-unused-vars
    RolesEditAccessApi({ context }, { data }) {
      axios.put("access", data);
      // .then((res) => {
      // });
    },

    // Update BreadCrumb value
    updateBreadCrumb({ commit }, data) {
      commit("updateBreadCrumb", data);
    },
    updateBreadCrumbAndTitle({ commit }, data) {
      commit("updateBreadCrumbAndTitle", data);
    },
  },
};

export default users;
