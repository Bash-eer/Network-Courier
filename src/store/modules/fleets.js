import axios from "axios";
const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

function processDropDownData(data, nameKey, codeKey, imageKey) {
  var processedDropDownArray = [];
  for (let d in data) {
    var d_obj = {};
    d_obj["name"] = data[d][nameKey];
    d_obj["code"] = data[d][codeKey];
    if (imageKey) {
      d_obj["image"] = data[d][imageKey];
    }

    processedDropDownArray.push(d_obj);
  }
  return processedDropDownArray;
}
function getPath(tag) {
  let path;
  switch (tag) {
    case "Insurance":
      path = "insurance";
      break;
    case "Fuel":
      path = "fuel";
      break;
    case "Maintenance":
      path = "maintenance";
      break;
    case "Inspection":
      path = "inspection";
      break;
  }
  return path;
}
function processInsuranceLatest(data, attachmentsKey) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "account_number" ||
        d_keys == "certificate_referance_no" ||
        d_keys == "date" ||
        d_keys == "remarks"
      ) {
        latest[d_keys] = d_obj[d_keys];
      }
      if (d_keys == attachmentsKey) {
        d_obj["attachments"] = d_obj[d_keys];
      }
    }
    d_obj["latestData"] = latest;
  }
  return data;
}
function processFuelLatest(data) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "route" ||
        d_keys == "cost_per_liter" ||
        d_keys == "cost_per_km" ||
        d_keys == "efficiency" ||
        d_keys == "distance" ||
        d_keys == "card_no" ||
        d_keys == "delivery_point" ||
        d_keys == "product_name" ||
        d_keys == "capacity"
      ) {
        latest[d_keys] = d_obj[d_keys];
      }
    }
    d_obj["latestData"] = latest;
  }
  return data;
}
function processMaintenanceLatest(data, attachmentsKey) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "idle_hours" ||
        d_keys == "mileage" ||
        d_keys == "problem" ||
        d_keys == "solution"
      ) {
        latest[d_keys] = d_obj[d_keys];
      }
      if (d_keys == attachmentsKey) {
        d_obj["attachments"] = d_obj[d_keys];
      }
    }
    d_obj["latestData"] = latest;
  }
  return data;
}
function processInspectionLatest(data, attachmentsKey) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    let problemsAndRemarks = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "problem" ||
        d_keys == "remarks" ||
        d_keys == "inspection_images" ||
        d_keys == "other_inspection"
      ) {
        if (d_keys == "problem" || d_keys == "remarks") {
          problemsAndRemarks[d_keys] = d_obj[d_keys];
        } else {
          latest[d_keys] = d_obj[d_keys];
        }
      }
      if (d_keys == attachmentsKey) {
        d_obj["attachments"] = d_obj[d_keys];
      }
    }
    latest["problemsAndRemarks"] = problemsAndRemarks;
    d_obj["latestData"] = latest;
  }
  return data;
}
function processExpendtiureClaimsTableData(data) {
  for (let d in data) {
    let claims = data[d]["expenditure_claims_card"];
    for (let c in claims) {
      claims[c]["sno"] = parseInt(c) + 1;
    }
  }
  return data;
}

const fleets = {
  namespaced: true,
  state: {
    subCount: 0,
    //fleet data
    attachmentsId: null,
    //vehicle details
    vehiclesFormStateData: {},
    vehicleDetailsInsuranceFiles: [],
    vehicleDetailsRoadTaxFiles: [],
    vehicleDetailsCoeFiles: [],
    deletedVehicleDetailsInsuranceFiles: [],
    deletedVehicleDetailsRoadTaxFiles: [],
    deletedVehicleDetailsCoeFiles: [],
    // vehicleDetailsRowId: null,
    vehiclesDropDown: [],
    driversDropDown: [],
    vehicleDetailsData: {},
    vehicleDetailsFormData: {},
    vehicleDetailsSubmittedValidation: null,
    vehicleDetailsSubmitted: false,
    vehicleDashboardTab: null,

    //toggleData
    toggleData: [{ type: "" }],

    //fuel
    fleetFuelStateData: {},
    //maintenance
    vehicleMaintenanceFiles: [],
    deletedVehicleMaintenanceFiles: [],
    fleetMaintenanceStateData: {},
    //inspection
    vehicleInspectionFiles: [],
    deletedVehicleInspectionFiles: [],
    deletedVehicleInspectionImages: [],
    fleetInspectionsStateData: {},
    inspectionsFormTableData: [],
    //expenditures
    vehiclesRegNoDropDownData: [],
    vehiclesCommonDropDownData: [],
    //summons
    expenditureSummonsFiles: [],
    deletedexpenditureSummonsFiles: [],
    expenditureSummonsStateData: {},
    //claims
    expenditureClaimsFiles: [],
    deletedexpenditureClaimsFiles: [],
    claimsDropDownData: [],
    expenditureClaimsStateData: {},
    cashCardNumber: null,
    cashCardBalance: null,
    expenditureClaimsTab: null,
    //insurance
    expenditureInsuranceFiles: [],
    deletedexpenditureInsuranceFiles: [],
    expenditureInsuranceStateData: {},
    //road tax
    expenditureRoadTaxFiles: [],
    deletedexpenditureRoadTaxFiles: [],
    expenditureRoadTaxStateData: {},
    //coe
    expenditureCoeFiles: [],
    deletedexpenditureCoeFiles: [],
    expenditureCoeStateData: {},
    //accidents
    expenditureAccidentsFiles: [],
    deletedexpenditureAccidentsFiles: [],
    expenditureAccidentsStateData: {},
    //image
    globalImageUploadURL: null,
    multiImagesUploadedData: [],
    multiImagesRowId: null,
    //chart data
    basicData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Previous Month",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "#3E7EFF",
          tension: 0.4,
        },
        {
          label: "Current Month",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          borderColor: "#5FDCB3",
          tension: 0.4,
        },
      ],
    },
    basicOptions: {
      // elements: {
      //   point: {
      //     radius: 0,
      //   },
      // },
      plugins: {
        legend: {
          align: "start",
          fillStyle: "blue",
          labels: {
            usePointStyle: true,
            pointStyle: "rectRounded",
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
            display: false,
          },
          grid: {
            color: "#ebedef",
          },
          // display: false,
        },
        y: {
          ticks: {
            color: "#495057",
          },

          grid: {
            color: "#ebedef",
          },
          display: false,
        },
      },
    },
    //grid data
    vehicleDetailsGridData: [
      [
        { label: "Registration Date", value: "25/10/2021", img: "fleet" },
        { label: "Purchase Date", value: "25/10/2021", img: "purchaseDate" },
        {
          label: "Depricition Type",
          value: "Furniture & Fittings",
          img: "deprictionType",
        },
      ],
      [
        { label: "Tax Due Date", value: "25/10/2021", img: "taxDueDate" },
        { label: "Tax Amount", value: "$ 50", img: "taxAmount" },
        {
          label: "COE Expiry",
          value: "25/10/2021",
          img: "coeExpiry",
        },
      ],
    ],
    //tab data
    chartTabData: [{ label: "Day" }, { label: "Week" }, { label: "Month" }],
    fleetsDashBoardTabMenuData: [
      {
        label: "VehicleLog",
        tab: "DashboardVehicleLog",
        select: false,
        tabName: "Log",
      },
      {
        label: "Details",
        tab: "DashboardVehicleDetails",
        select: true,
        tabName: "Details",
      },
      {
        label: "Maintenance",
        tab: "DashboardMaintenance",
        select: true,
        tabName: "Maintenance",
      },
      {
        label: "Fuel",
        tab: "DashboardFuel",
        select: true,
        tabName: "Fuel",
      },
      {
        label: "Insurance",
        tab: "DashboardInsurance",
        select: true,
        tabName: "Insurance",
      },
      {
        label: "RoadTax",
        tab: "DashboardRoadTax",
        select: true,
        tabName: "Road Tax",
      },
      {
        label: "COE",
        tab: "DashboardCOE",
        select: true,
        tabName: "COE",
      },
      {
        label: "Summon",
        tab: "DashboardSummon",
        select: true,
        tabName: "Summon",
      },
      {
        label: "Accidents",
        tab: "DashboardAccidents",
        select: true,
        tabName: "Accidents",
      },
    ],
    FleetVehicleTabMenuData: [
      {
        label: "FleetDashboard",
        tab: "FleetManagementTables",
        select: false,
        tabName: "Dashboard",
      },
      {
        label: "FleetVehicles",
        heading: "Vehicle Details",
        tab: "FleetManagementTables",
        select: true,
        tabName: "Vehicles",
        data: "FleetVehicleTableData",
        columns: "FleetVehicleTableColumnData",
      },
      {
        label: "FleetDrivers",
        heading: "Driver Details",
        tab: "FleetManagementTables",
        select: true,
        tabName: "Drivers",
      },
    ],
    personalCardsTableData: [],
    personalCardTableDataColumns: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "id", header: "Voucher No" },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Vehicle Name" },
      { field: "driver", header: "Driver" },
      { field: "no_of_claims", header: "No. of Claims" },
      { field: "claim", header: "Claim ($)" },
      { field: "card_no", header: "Card No." },
      { field: "date", header: "Date" },
      { field: "status", header: "Status" },
    ],
    cashCardsTableData: [],
    cashCardTableDataColumns: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "id", header: "Voucher No" },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Vehicle Name" },
      { field: "driver", header: "Driver" },
      { field: "no_of_claims", header: "No. of Claims" },
      { field: "claim", header: "Claim ($)" },
      { field: "card_no", header: "Card No." },
      { field: "card_limit", header: "Card Limit" },
      { field: "card_balance", header: "Card Balance" },
      { field: "status", header: "Status" },
      { field: "createdAt", header: "Created On" },
    ],
    expenditureClaimsSubTableDataColumns: [
      { field: "sno", header: "S.No." },
      { field: "recipt_no", header: "Receipt No." },
      { field: "claim_type", header: "Claim Type" },
      { field: "claim_amount", header: "Amount ($)" },
      { field: "location", header: "Location" },
      { field: "claim_date_time", header: "Date & Time" },
    ],

    //maintenanceTabData:
    maintenanceTabMenuData: [
      {
        label: "Maintenance",
        heading: "FleetMaintenanceTable",
        tab: "FleetManagementTables",
        select: false,
        tabName: "Maintenance",
        data: "FleetMaintenanceData",
        columns: "fleetMaintenanceTableColumnData",
      },
      {
        label: "Inspection",
        heading: "Inspection",
        tab: "FleetManagementTables",
        select: true,
        tabName: "Inspection",
        data: "inspectionTableData",
        columns: "inspectionTableDataColumns",
      },
    ],
    //inspection dropdown table data
    inspectionsDropDownTableData: [],
    inspectionsDropDownTableDataColumns: [
      { field: "inspection_check", header: "Inspection" },
      { field: "checked", header: "Checked" },
      { field: "feedback", header: "Feedback" },
    ],
    //inspection table data
    inspectionTableData: [],
    inspectionTableDataColumns: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "image_url", header: "Image" },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Name" },
      { field: "date_time", header: "Date & Time" },
      { field: "mileage", header: "Mileage" },
      { field: "driver", header: "Driver" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    inspectionHistoryColumnData: [
      { field: "actions", header: "Actions" },
      { field: "date_time", header: "Date & Time" },
      { field: "inspected_by", header: "Inspected by" },
      { field: "mileage", header: "Mileage" },
      { field: "driver", header: "Driver" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //claimsTabData
    claimsTabMenuData: [
      {
        label: "PersonalCard",
        heading: "Expenditure Personal Card",
        tab: "FleetManagementTables",
        select: false,
        tabName: "Personal Card",
        data: "personalCardsTableData",
        columns: "personalCardTableDataColumns",
      },
      {
        label: "CashCard",
        heading: "Expenditure Cash Card",
        tab: "FleetManagementTables",
        select: true,
        tabName: "Cash Card",
        data: "cashCardsTableData",
        columns: "cashCardTableDataColumns",
      },
    ],
    //expenditureTabData
    expenditureSubTabMenuData: [
      {
        label: "Summon",
        tab: "FleetManagementTables",
        data: "expenditureSummonsTableData",
        columns: "expenditureSummonsTableColumnData",
      },
      {
        label: "Claims",
        tab: "FleetClaims",
      },
      {
        label: "Insurance",
        tab: "FleetManagementTables",
        data: "expenditureInsuranceTableData",
        columns: "expenditureInsuranceTableColumnData",
      },
      {
        label: "Road Tax",
        tab: "FleetManagementTables",
        data: "expenditureRoadTaxTableData",
        columns: "expenditureRoadTaxTableColumnData",
      },
      {
        label: "COE",
        tab: "FleetManagementTables",
        data: "expenditureCoeTableData",
        columns: "expenditureCoeTableColumnData",
      },
      {
        label: "Accidents",
        tab: "FleetManagementTables",
        data: "expenditureAccidentsTableData",
        columns: "expenditureAccidentsTableColumnData",
      },
    ],
    //expenditureTableData
    //summons
    expenditureSummonsTableData: [],
    expenditureSummonsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "date_time", header: "Summon Date" },
      { field: "notice_no", header: "Notice No" },
      { field: "fine_amount", header: "Fine ($)" },
      { field: "offence_place", header: "Offence Location" },
      { field: "paid_by", header: "Paid by" },
      { field: "driver", header: "Driver" },
      { field: "due_date", header: "Due Date" },
      { field: "receipt_date", header: "Receipt Date" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //insurance
    expenditureInsuranceTableData: [],
    expenditureInsuranceTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vendor", header: "Vendor" },
      { field: "vehicle_name", header: "Vehicle Name" },
      //{ field: "description", header: "Description" },
      { field: "policy_type", header: "Policy Type" },
      { field: "policy_no", header: "Policy No" },
      { field: "premium_amount", header: "Premium ($)" },
      { field: "policy_from_date", header: "From" },
      { field: "policy_to_date", header: "To" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    expenditureInsuranceHistoryTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "vendor", header: "Vendor" },
      { field: "policy_type", header: "Policy Type" },
      { field: "policy_no", header: "Policy No" },
      { field: "policy_from_date", header: "From" },
      { field: "policy_to_date", header: "To" },
      { field: "added_date", header: "Added Date" },
      { field: "premium_amount", header: "Premium ($)" },
    ],
    //road tax
    expenditureRoadTaxTableData: [],
    expenditureRoadTaxTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "vendor", header: "Vendor" },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Vehicle Name" },
      { field: "amount", header: "Tax($)" },
      { field: "from_date", header: "Tax From" },
      { field: "to_date", header: "Tax To" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //coe
    expenditureCoeTableData: [],
    expenditureCoeTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "vendor", header: "Vendor" },
      { field: "vehicle_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Vehicle Name" },
      { field: "amount", header: "COE ($)" },
      { field: "from_date", header: "COE From" },
      { field: "to_date", header: "COE To" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //accidents
    expenditureAccidentsTableData: [],
    expenditureAccidentsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "ticket_no", header: "Ticket No." },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Vehicle Name" },
      { field: "date_time", header: "Date" },
      { field: "driver", header: "Driver" },
      { field: "location", header: "Location" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //dashboard table data
    vehicleDashBoardMaintenanceTabMenuData: [
      {
        label: "FleetVehicleDashboardMaintenance",
        heading: "Maintenance Report",
        tab: "FleetManagementSubTables",
        select: false,
        tabName: "Maintenance",
        data: "vehicleDashBoardMaintenanceReportTableData",
        columns: "vehicleDashBoardMaintenanceReportTableColumnData",
      },
      {
        label: "FleetVehicleDashboardInspection",
        heading: "Inspection Report",
        tab: "FleetManagementSubTables",
        select: true,
        tabName: "Inspection",
        data: "vehicleDashBoardInspectionReportTableData",
        columns: "vehicleDashBoardInspectionReportTableColumnData",
      },
    ],
    //maintenance
    vehicleDashBoardMaintenanceReportTableData: [],
    vehicleDashBoardMaintenanceReportTableColumnData: [
      { field: "invoice_no", header: "Invoice No." },
      { field: "vendor", header: "Service Company" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      { field: "amount", header: "Amount" },
    ],
    //inspection
    vehicleDashBoardInspectionReportTableData: [],
    vehicleDashBoardInspectionReportTableColumnData: [
      { field: "date_time", header: "Date & Time" },
      { field: "inspected_by", header: "Inspected by" },
      { field: "mileage", header: "Mileage" },
      { field: "problem", header: "Problems" },
    ],
    //fuel
    vehicleDashBoardFuelReportTableData: [],
    vehicleDashBoardFuelReportTableColumnData: [
      { field: "id", header: "Voucher No." },
      { field: "driver", header: "Driver" },
      { field: "units", header: "Units" },
      { field: "distance", header: "Distance" },
      { field: "fuel_date_time", header: "Date & Time" },
      { field: "amount", header: "Amount" },
    ],
    //insurance
    vehicleDashBoardInsuranceReportTableData: [],
    vehicleDashBoardInsuranceReportTableColumnData: [
      { field: "vendor", header: "Vendor" },
      { field: "policy_type", header: "Policy Type" },
      { field: "policy_no", header: "Policy No." },
      { field: "policy_from_date", header: "From" },
      { field: "policy_to_date", header: "To" },
      { field: "date", header: "Added Date" },
      { field: "premium_amount", header: "Premium $" },
    ],
    //road tax
    vehicleDashBoardRoadTaxTableData: [],
    vehicleDashBoardRoadTaxTableColumnData: [
      { field: "vendor", header: "Vendor" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      // { field: "addedDate", header: "Added Date" },
      { field: "amount", header: "Tax $" },
    ],
    //coe
    vehicleDashBoardCOETableData: [],
    vehicleDashBoardCOETableColumnData: [
      { field: "vendor", header: "Vendor" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      // { field: "addedDate", header: "Added Date" },
      { field: "amount", header: "COE $" },
    ],
    //summons
    vehicleDashBoardSummonsReportTableData: [],
    vehicleDashBoardSummonsReportTableColumnData: [
      { field: "notice_no", header: "Notice No." },
      { field: "driver", header: "Driver" },
      { field: "date_time", header: "Summon Date, Time" },
      { field: "fine_amount", header: "Fine (S$)" },
      { field: "due_date", header: "Due Date" },
      { field: "receipt_date", header: "Receipt Date" },
      { field: "paid_by", header: "Paid By" },
    ],
    //accidents
    vehicleDashBoardAccidentsReportTableData: [],
    vehicleDashBoardAccidentsReportTableColumnData: [
      { field: "driver", header: "Driver" },
      { field: "date_time", header: "Date & Time" },
      { field: "location", header: "Location" },
    ],

    fleetMaintenanceSettingFuelTableColumnData: [
      { field: "date_time", header: "Date & Time" },
      { field: "description", header: "Description" },
      { field: "units", header: "Units" },
      { field: "vehicle_no", header: "Vehicle No" },
      { field: "delivery_point", header: "Delivery Point" },
      { field: "transaction", header: "Transaction" },
      { field: "closing_credit", header: "Closing Credit" },
    ],

    fleetMaintenanceSettingFuelTableData: [
      {
        id: "1",
        date_time: "22 Oct,2020",
        description: "Synergy Diesel",
        units: "40",
        vehicle_no: "ASA 4567A",
        delivery_point: "#13-37 Mnadalay Towers",
        transaction: "-10 S$",
        closing_credit: "30 S$",
      },
      {
        id: "2",
        date_time: "22 Oct,2020",
        description: "Synergy Diesel",
        units: "40",
        vehicle_no: "ASA 4567A",
        delivery_point: "#13-37 Mnadalay Towers",
        transaction: "-10 S$",
        closing_credit: "30 S$",
      },
      {
        id: "3",
        date_time: "22 Oct,2020",
        description: "Synergy Diesel",
        units: "40",
        vehicle_no: "ASA 4567A",
        delivery_point: "#13-37 Mnadalay Towers",
        transaction: "-10 S$",
        closing_credit: "30 S$",
      },
    ],
    //tableData
    vehicleLogTableData: [],
    vehicleLogTableColumnData: [
      { field: "driver", header: "Driver" },
      { field: "time_taken", header: "Time Taken" },
      // { field: "fromAndToAddress", header: "From and To Address" },
      { field: "distance", header: "Distance (KM)" },
    ],

    FleetMaintenanceData: [],
    fleetMaintenanceTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "image_url", header: "Image" },
      { field: "vehicle_reg_no", header: " Vehicle No" },
      { field: "vendor", header: "Vendor" },
      { field: "invoice_no", header: "Ref No." },
      { field: "amount", header: "Amount" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      { field: "driver", header: "Driver" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    maintenanceHistoryColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "invoice_no", header: "Invoice No." },
      { field: "vendor", header: "Service Company" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      { field: "amount", header: "Amount" },
      { field: "driver", header: "Driver" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //fleet -fuel
    fleetFuelTableData: [],
    fleetFuelTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "image_url", header: "Image" },
      { field: "vehicle_reg_no", header: "Vehicle No" },
      { field: "vehicle_name", header: "Name" },
      { field: "fuel_date_time", header: "Fuel Date" },
      { field: "meter", header: "Meter" },
      { field: "units", header: "Units" },
      { field: "driver", header: "Driver" },
      { field: "amount", header: "Amount (S$)" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    fuelHistoryTableColumnData: [
      // { field: "actions", header: "Actions" },
      { field: "id", header: "Voucher No." },
      { field: "fuel_date_time", header: "Fuel Date" },
      { field: "driver", header: "Driver" },
      { field: "units", header: "Units" },
      { field: "meter", header: "Meter" },
      { field: "amount", header: "Amount (S$)" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetFuelOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },

      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Download Voucher",
        icon: "fas fa-download",
      },
    ],

    FleetVehicleTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "image_url", header: "Image" },
      { field: "reg_no", header: "Reg No" },
      { field: "vehicle_type", header: "Type" },
      { field: "name", header: "Vehicle Name" },
      { field: "driver_name", header: "Driver" },
      { field: "enable", header: "Status" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetVehicleTableData: [],
    FleetVehicleOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      // {
      //   label: "Disable",
      //   icon: "far fa-circle",
      // },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    FleetCashCardOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
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
        label: "Download Voucher",
        icon: "fas fa-download",
      },
      {
        label: "Export Report",
        icon: "fas fa-file-pdf",
      },
    ],
    //vehicle dashboard
    vehicleDashBoardData: null,
    vehicleDashBoardCircles: [
      {
        row: [
          {
            percentage: "70",
            actualValue: "72",
            color: "#17C079",
            type: "maintenance",
            label: "Maintenance",
            img: "maintenanceIcon",
          },
          {
            percentage: "70",
            actualValue: "45",
            color: "#FF5656",
            type: "insurance",
            label: "Insurance",
            img: "insuranceIcon",
          },
        ],
      },
      {
        row: [
          {
            percentage: "100",
            actualValue: "2400",
            color: "#7469F2",
            type: "distance",
            label: "Distance",
            img: "distanceIcon",
          },
          {
            percentage: "30",
            actualValue: "20",
            color: "#1E90FF",
            type: "roadTax",
            label: "Road Tax",
            img: "roadTaxIcon",
          },
        ],
      },
    ],
    //maintenance
    vehicleDashBoardMaintenanceCircles: null,
    //fuel
    vehicleDashBoardFuelCircles: null,
    //insurance
    vehicleDashBoardInsuranceCircles: null,
    //road tax
    vehicleDashBoardRoadTaxCircles: null,
    //coe
    vehicleDashBoardCOECircles: null,
    //summons
    vehicleDashBoardSummonsCircles: null,
    //accidents
    vehicleDashBoardAccidentsCircles: null,
  },
  mutations: {
    fetchVehiclesDropDownData(state, data) {
      state.vehiclesDropDown = processDropDownData(data, "vehicle_type", "id");
    },
    fetchVehiclesCommonDropDownData(state, data) {
      state.vehiclesRegNoDropDownData = processDropDownData(
        data,
        "reg_no",
        "id",
        "image_url"
      );
      state.vehiclesCommonDropDownData = data;
    },
    fetchDriversDropDownData(state, data) {
      state.driversDropDown = processDropDownData(data, "name", "id");
    },
    fetchInspectionDropDownTableData(state, data) {
      for (let d in data) {
        data[d]["checked"] = "No";
        data[d]["feedback"] = "";
      }
      state.inspectionsDropDownTableData = data;
    },
    fetchFleetVehicleTableData(state, data) {
      state.FleetVehicleTableData = data;
    },
    fetchExpenditureSummonsTableData(state, data) {
      for (let d in data) {
        let dObj = data[d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Summon Remarks",
                remark: dObj["summon_remarks"],
              },
              {
                label: "Receipt Remarks",
                remark: dObj["receipt_remarks"],
              },
            ],
            receipt: dObj["receipt_no"],
            attachments: dObj["expenditure_summon_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.expenditureSummonsTableData = data;
    },
    fetchExpenditureClaimsPersonalCardTableData(state, data) {
      state.personalCardsTableData = processExpendtiureClaimsTableData(data);
    },
    fetchExpenditureClaimsCashCardTableData(state, data) {
      state.cashCardsTableData = processExpendtiureClaimsTableData(data);
    },
    fetchCashCardDetails(state, data) {
      state.cashCardNumber = data["card_no"];
      state.cashCardBalance = data["balance"];
    },
    fetchClaimsDropDownData(state, data) {
      state.claimsDropDownData = processDropDownData(data, "claim_type", "id");
    },
    fetchExpenditureInsuranceTableData(state, data) {
      state.expenditureInsuranceTableData = null;
      let insuranceLatest = [];
      insuranceLatest = processInsuranceLatest(
        data,
        "expenditure_insurance_attachments"
      );
      state.expenditureInsuranceTableData = insuranceLatest;
    },
    fetchExpenditureRoadTaxTableData(state, data) {
      for (let d in data) {
        let dObj = data[d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Remarks",
                remark: dObj["remarks"],
              },
            ],
            attachments: dObj["expenditure_road_tax_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.expenditureRoadTaxTableData = data;
    },
    fetchExpenditureCoeTableData(state, data) {
      for (let d in data) {
        let dObj = data[d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Remarks",
                remark: dObj["remarks"],
              },
            ],
            attachments: dObj["expenditure_coe_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.expenditureCoeTableData = data;
    },
    fetchExpenditureAccidentsTableData(state, data) {
      for (let d in data) {
        let dObj = data[d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Report On Accident",
                remark: dObj["report_on_accident"],
              },
              {
                label: "Action Taken",
                remark: dObj["action_taken"],
              },
              {
                label: "Damages to Vehicle",
                remark: dObj["damages_to_vehicle"],
              },
            ],
            attachments: dObj["expenditure_accident_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.expenditureAccidentsTableData = data;
    },
    fetchFuelTableData(state, data) {
      state.fleetFuelTableData = null;
      let fuelLatest = [];
      fuelLatest = processFuelLatest(data);
      state.fleetFuelTableData = fuelLatest;
    },
    fetchMaintenanceTableData(state, data) {
      state.FleetMaintenanceData = null;
      let maintenanceLatest = [];
      maintenanceLatest = processMaintenanceLatest(
        data,
        "maintenance_attachments"
      );
      state.FleetMaintenanceData = maintenanceLatest;
    },
    fetchInspectionTableData(state, data) {
      state.inspectionTableData = null;
      let inspectionLatest = [];
      inspectionLatest = processInspectionLatest(
        data,
        "inspection_attachments"
      );
      state.inspectionTableData = inspectionLatest;
    },
    fetchVehicleDashboardMaintenanceReportTableData(state, data) {
      state.vehicleDashBoardCircles[0].row[0].percentage =
        data["remaining_km_percentage"];
      state.vehicleDashBoardCircles[0].row[0].actualValue =
        data["remaining_km"];
      state.vehicleDashBoardMaintenanceCircles = data;
      state.vehicleDashBoardMaintenanceReportTableData = null;
      let maintenanceLatest = [];
      maintenanceLatest = processMaintenanceLatest(
        data["maintenance_histories"],
        "maintenance_attachments"
      );
      state.vehicleDashBoardMaintenanceReportTableData = maintenanceLatest;
    },
    fetchVehicleDashboardInspectionReportTableData(state, data) {
      state.vehicleDashBoardInspectionReportTableData = null;
      let inspectionLatest = [];
      inspectionLatest = processInspectionLatest(
        data,
        "inspection_attachments"
      );
      state.vehicleDashBoardInspectionReportTableData = inspectionLatest;
    },
    fetchVehicleDashboardFuelReportTableData(state, data) {
      state.vehicleDashBoardFuelCircles = data;
      state.vehicleDashBoardFuelReportTableData = null;
      let fuelLatest = [];
      fuelLatest = processFuelLatest(data["fuel_histories"]);
      state.vehicleDashBoardFuelReportTableData = fuelLatest;
    },
    fetchVehicleDashboardInsuranceReportTableData(state, data) {
      state.vehicleDashBoardCircles[0].row[1].percentage =
        data["remaining_days_percentage"];
      state.vehicleDashBoardCircles[0].row[1].actualValue =
        data["remaining_days"];
      state.vehicleDashBoardInsuranceCircles = data;
      let insuranceLatest = [];
      insuranceLatest = processInsuranceLatest(
        data["insurance_histories"],
        "expenditure_insurance_attachments"
      );
      state.vehicleDashBoardInsuranceReportTableData = insuranceLatest;
    },
    fetchVehicleDashboardRoadTaxReportTableData(state, data) {
      state.vehicleDashBoardCircles[1].row[0].percentage =
        data["remaining_days_percentage"];
      state.vehicleDashBoardCircles[1].row[0].actualValue =
        data["remaining_days"];
      state.vehicleDashBoardRoadTaxCircles = data;
      for (let d in data["road_tax_histories"]) {
        let dObj = data["road_tax_histories"][d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Remarks",
                remark: dObj["remarks"],
              },
            ],
            attachments: dObj["expenditure_road_tax_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.vehicleDashBoardRoadTaxTableData = data["road_tax_histories"];
    },
    fetchVehicleDashboardCOEReportTableData(state, data) {
      state.vehicleDashBoardCOECircles = data;
      for (let d in data["coe_histories"]) {
        let dObj = data["coe_histories"][d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Remarks",
                remark: dObj["remarks"],
              },
            ],
            attachments: dObj["expenditure_coe_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.vehicleDashBoardCOETableData = data["coe_histories"];
    },
    fetchVehicleDashboardSummonsReportTableData(state, data) {
      state.vehicleDashBoardSummonsCircles = data;
      for (let d in data["summon_histories"]) {
        let dObj = data["summon_histories"][d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Summon Remarks",
                remark: dObj["summon_remarks"],
              },
              {
                label: "Receipt Remarks",
                remark: dObj["receipt_remarks"],
              },
            ],
            receipt: dObj["receipt_no"],
            attachments: dObj["expenditure_summon_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.vehicleDashBoardSummonsReportTableData = data["summon_histories"];
    },
    fetchVehicleDashboardAccidentsReportTableData(state, data) {
      state.vehicleDashBoardAccidentsCircles = data;
      for (let d in data["accident_histories"]) {
        let dObj = data["accident_histories"][d];
        let subTableData = [
          {
            remarks: [
              {
                label: "Report On Accident",
                remark: dObj["report_on_accident"],
              },
              {
                label: "Action Taken",
                remark: dObj["action_taken"],
              },
              {
                label: "Damages to Vehicle",
                remark: dObj["damages_to_vehicle"],
              },
            ],
            attachments: dObj["expenditure_accident_attachments"],
          },
        ];
        dObj["subData"] = subTableData;
      }
      state.vehicleDashBoardAccidentsReportTableData =
        data["accident_histories"];
    },
    fetchVehicleDashboardVehicleLogsReportTableData(state, data) {
      state.vehicleLogTableData = data[0]["vehicles_vehicle_logs"];
    },
  },
  actions: {

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
    //load apis
    //fleet vehicle dashboard
    loadFleetVehicleDashboard({ commit }, { path, mutation }) {
      axios
        .get("fleetManagement/vehicles/vehicle/dashboard/" + path)
        .then((res) => {
          if (res.status == 200) {
            commit(mutation, res.data.results);
          }
        });
    },

    //eslint-disable-next-line no-unused-vars
    //fleet vehicle data
    loadFleetVehicles({ commit, state }) {
      axios.get("fleetManagement/vehicles/vehicles").then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        for (let r in res.data.results) {
          let r_obj = res.data.results[r];
          for (let r_keys in r_obj) {
            if (r_keys == "users_fleet_vehicles") {
              r_obj["created_by"] = r_obj[r_keys]["display_name"];
            }
            if (r_obj[r_keys] != null) {
              if (r_keys == "fleet_vehicles_vehicle_type") {
                r_obj["vehicle_type"] = r_obj[r_keys]["vehicle_type"];
              }
            }
            if (r_keys == "fleet_vehicle_driver") {
              r_obj["driver_name"] = r_obj[r_keys]["name"];
            }
          }
        }

        commit("fetchFleetVehicleTableData", res.data.results);
        state.tableLoad = false;
      });
    },

    //FLEET DROPDOWNS
    //vehicle types, vehicle commons, drivers
    loadFleetDropDowns({ commit }, { path, mutation }) {
      axios.get("fleetManagement/dropdown/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        commit(mutation, res.data.results);
      });
    },

    //EXPENDITURE
    //summons, road tax, accidents, coe
    loadExpenditureCommons({ commit }, { path, mutation }) {
      axios.get("fleetManagement/expenditure/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        commit(mutation, res.data.results);
      });
    },
    //insurance
    //eslint-disable-next-line no-unused-vars
    loadExpenditureInsurance({ dispatch }, { path, mutation }) {
      axios.get("fleetManagement/expenditure/insurance").then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        dispatch("loadHistory", {
          tag: "Expenditure",
          type: "Insurance",
          data: res.data.results,
          key: "vehicle_reg_no",
          mutation: mutation,
        });
      });
    },

    //VEHICLE COMMONS
    //fuel, maintenance, inspection
    loadVehicleCommons({ dispatch }, { type, path, mutation }) {
      axios.get("fleetManagement/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        dispatch("loadHistory", {
          tag: "Non-Expenditure",
          type: type,
          data: res.data.results,
          key: "vehicle_reg_no",
          mutation: mutation,
        });
      });
    },

    //load table history - common action
    //eslint-disable-next-line no-unused-vars
    loadHistory({ state, commit }, { tag, type, data, key, mutation }) {
      let path;
      path = getPath(type);
      let url;
      if (tag == "Expenditure") {
        url = "fleetManagement/expenditure/" + path + "/history/";
      }
      if (tag == "Non-Expenditure") {
        url = "fleetManagement/" + path + "/history/";
      }
      for (let d in data) {
        axios.get(url + data[d][key]).then((res) => {
          let latest;
          if (tag == "Expenditure") {
            latest = processInsuranceLatest(
              res.data.results,
              "expenditure_insurance_attachments"
            );
          }
          if (tag == "Non-Expenditure") {
            if (type == "Fuel") {
              latest = processFuelLatest(res.data.results);
            }
            if (type == "Maintenance") {
              latest = processMaintenanceLatest(
                res.data.results,
                "maintenance_attachments"
              );
            }
            if (type == "Inspection") {
              latest = processInspectionLatest(
                res.data.results,
                "inspection_attachments"
              );
            }
          }
          data[d]["history"] = latest;
        });
      }
      setTimeout(() => {
        commit(mutation, data);
        state.subCount++;
      }, 700);
    },

    //CRUD OPERATIONS
    //vehicle details CRUD
    //eslint-disable-next-line no-unused-vars
    // vehicleDetailsCRUD({ dispatch }, { tag, data }) {
    //   if (tag == "add") {
    //     dispatch("commonCRUD", {
    //       basePath: "fleetManagement/vehicles/vehicles",
    //       loadApi: "loadFleetVehicles",
    //       toastTag: "vehicleDetails",
    //       tag: tag,
    //       data: data,
    //     });
    //   }
    //   if (tag == "update" || tag == "delete") {
    //     dispatch("commonCRUD", {
    //       basePath: "fleetManagement/vehicles/vehicles/",
    //       loadApi: "loadFleetVehicles",
    //       toastTag: "vehicleDetails",
    //       tag: tag,
    //       data: data,
    //       id_key: "id",
    //     });
    //   }
    // },



    // //VEHICLES CRUD
    vehicleDetailsCRUD({ dispatch }, { tag, data }) {
      //adding new data to the data-base using the axios POST method
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/vehicles/vehicles",
          loadApi: "loadFleetVehicles",
          toastTag: "vehicleDetails",
          tag: tag,
          data: data,
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/vehicles/vehicles/",
          loadApi: "loadFleetVehicles",
          toastTag: "vehicleDetails",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
      //retrieving a deleted data from the data-base using the axios PATCH method
      //disabling an existing data from the data-base using the axios PATCH method
      if (tag == "retriveUser/" || tag == "modifyStatus/") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/vehicles/vehicles/",
          loadApi: "loadFleetVehicles",
          toastTag: "vehicleDetails",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },

    

    //vehicle's common CRUD
    //fuel, maintenance
    vehiclesCommonsCRUD(
      { dispatch },
      { path, loadApiName, mutation, tag, data, type }
    ) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/" + path,
          loadApi: loadApiName,
          toastTag: path,
          tag: tag,
          data: data,
          path: path,
          mutation: mutation,
          type: type,
        });
      }
      if (tag == "update" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/" + path + "/",
          loadApi: loadApiName,
          toastTag: path,
          tag: tag,
          data: data,
          path: path,
          mutation: mutation,
          type: type,
          id_key: "id",
        });
      }
    },

    //expenditure CRUD
    //for summons, road tax, accidents, insurance
    expenditureCommonsCRUD(
      { dispatch },
      { path, loadApiName, mutation, tag, data }
    ) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/expenditure/" + path,
          loadApi: loadApiName,
          toastTag: path,
          tag: tag,
          data: data,
          path: path,
          mutation: mutation,
        });
      }
      if (tag == "update" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "fleetManagement/expenditure/" + path + "/",
          loadApi: loadApiName,
          toastTag: path,
          tag: tag,
          data: data,
          path: path,
          mutation: mutation,
          id_key: "id",
        });
      }
    },

    //COMMON CRUD FUNCTION
    commonCRUD(
      { state, commit, dispatch, rootState },
      { basePath, loadApi, toastTag, tag, data, path, mutation, type, id_key }
    ) {
      if (tag == "add") {
        //adding new data to the data-base using the axios POST method
        axios.post(basePath, data).then((res) => {
          if (res.status == 200) {
            state.tableLoad = true;
            if (
              toastTag == "summons" ||
              toastTag == "claim" ||
              toastTag == "roadTax" ||
              toastTag == "coe" ||
              toastTag == "accident" ||
              toastTag == "insurance"
            ) {
              dispatch(loadApi, {
                path:
                  toastTag == "claim"
                    ? "claim?cardType=" + state.expenditureClaimsTab
                    : path,
                mutation: mutation,
              });
            } else if (
              toastTag == "fuel" ||
              toastTag == "maintenance" ||
              toastTag == "inspection"
            ) {
              dispatch(loadApi, {
                type: type,
                path: path,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
            rootState["users"].displayDialog = false;
            commit(
              "users/showToast",
              ["success", data, "was added", toastTag],
              {
                root: true,
              }
            );
          }
        });
      }
      if (tag == "retrive/" || tag == "modifyStatus/") {
        let mssg;
        if (tag == "modifyStatus/") {
          if (data.status == "Active") {
            mssg = "was deactivated! ";
          }
          if (data.status == "Inactive") {
            mssg = "was activated!";
          }
        }
        //retrieving a deleted data from the data-base using the axios PATCH method
        //disabling an existing data from the data-base using the axios PATCH method
        axios
          .patch(basePath + tag + data[id_key])
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            if (res.status == 200) {
              state.tableLoad = true;
              dispatch(loadApi);
              commit("users/showToast", ["info", data, mssg, toastTag], {
                root: true,
              });
            }
          });
      }
      if (tag == "delete") {
        //deleting an existing data in the data-base using the axios DELETE method
        axios.delete(basePath + data[id_key]).then((res) => {
          if (res.status == 200) {
            state.tableLoad = true;
            if (
              toastTag == "summons" ||
              toastTag == "claim" ||
              toastTag == "roadTax" ||
              toastTag == "coe" ||
              toastTag == "accident" ||
              toastTag == "insurance"
            ) {
              dispatch(loadApi, {
                path:
                  toastTag == "claim"
                    ? "claim?cardType=" + state.expenditureClaimsTab
                    : path,
                mutation: mutation,
              });
            } else if (
              toastTag == "fuel" ||
              toastTag == "maintenance" ||
              toastTag == "inspection"
            ) {
              dispatch(loadApi, {
                type: type,
                path: path,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
            commit("users/showToast", ["info", data, "was deleted", toastTag], {
              root: true,
            });
          }
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        axios.patch(basePath + data[id_key], data).then((res) => {
          if (res.data.status == 200) {
            state.tableLoad = true;
            if (
              toastTag == "summons" ||
              toastTag == "claim" ||
              toastTag == "roadTax" ||
              toastTag == "coe" ||
              toastTag == "accident" ||
              toastTag == "insurance"
            ) {
              dispatch(loadApi, {
                path:
                  toastTag == "claim"
                    ? "claim?cardType=" + state.expenditureClaimsTab
                    : path,
                mutation: mutation,
              });
            } else if (
              toastTag == "fuel" ||
              toastTag == "maintenance" ||
              toastTag == "inspection"
            ) {
              dispatch(loadApi, {
                type: type,
                path: path,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
            rootState["users"].displayDialog = false;
            commit("users/showToast", ["info", data, "was edited", toastTag], {
              root: true,
            });
          }
        });
      }
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};

export default fleets;
