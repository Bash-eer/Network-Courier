//tabs data
export const SalesMainTabMenuData = [
  {
    label: "DashboardTab",
    tab: "DashboardPage",
    select: true,
    tabName: "Dashboard",
    data: "dashboardTablesData",
    columns: "salesTableColumnData",
    store: "salesSales",
  },
  {
    label: "SalesTab",
    tab: "SalesDataTable",
    select: false,
    tabName: "Sales",
    data: "salesTableData",
    columns: "salesTableColumnData",
    store: "salesSales",
  },
  {
    label: "QuotationsTab",
    tab: "QuotationDataTable",
    select: false,
    tabName: "Quotations",
    data: "QuotationsTableData",
    columns: "salesQuotationTableColumnData",
    store: "SalesQuotation",
  },
  {
    label: "ContractsTab",
    tab: "ContractPage",
    select: true,
    tabName: "Contracts",
    data: "contractsTableData",
    columns: "salesTableColumnData",
    store: "salesContract",
  },
  {
    label: "ReportsTab",
    tab: "ReportDataTable",
    select: true,
    tabName: "Reports",
    data: "reportTableData",
    columns: "salesReportsTableColumnData",
    store: "salesReport",
  },
  {
    label: "ApprovalsTab",
    tab: "ApprovalsPage",
    select: true,
    tabName: "Approvals",
    data: "approvalsTableData",
    columns: "salesapprovalsTableColumnData",
    store: "salesApproval",
  },
];
//adhoc sub table overlay data
export const SalesSalesOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Contact Info",
    icon: "far fa-address-book",
  },
  {
    label: "Inactive",
    icon: " far fa-circle",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];
export const SalesSalesRetrieveOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Contact Info",
    icon: "far fa-copy",
  },
  {
    label: "Disable",
    icon: " far fa-circle",
  },
  {
    label: "Retrieve",
    icon: "fas fa-user-times",
  },
];
//quotation contract table tab
export const QuotationContractTabMenuData = [
  {
    label: "Quotation",
    tab: "QuotationTabTable",
    select: true,
    tabName: "Quotations",
    store: "salesSales",
  },
  {
    label: "Contract",
    tab: "ContractTabTable",
    select: false,
    tabName: "Contract",
    store: "salesSales",
  },
];

export const companyCreationStepperData = [
  {
    index: 0,
    label: "1",
    component: "Information",
    name: "Information",
  },
  {
    index: 1,
    label: "2",
    component: "Address",
    name: "Address",
  },
  {
    index: 2,
    label: "3",
    component: "Contact",
    name: "Contacts",
  },
];
export const BulkAdjustmentStepperData = [
  {
    index: 0,
    label: "1",
    component: "Selectprofile",
    name: "Select Profile",
  },
  {
    index: 1,
    label: "2",
    component: "RateAdjustment",
    name: "Rate Adjustment",
  },
  {
    index: 2,
    label: "3",
    component: "EffectiveDate",
    name: "Effective Date",
  },
];
export const SalesApprovalsContractOverlayData = [
  {
    label: "Retrieve",
    icon: "fas fa-pen",
  },
  {
    label: "Signed Doc",
    icon: "far fa-address-book",
  },
  // {
  //   label: "Disable",
  //   icon: " far fa-circle",
  // },
  // {
  //   label: "Delete",
  //   icon: "fas fa-user-times",
  // },
];
export const SalesApprovalsTerminationOverlayData = [
  {
    label: "Retrieve",
    icon: "fas fa-pen",
  },
  // {
  //   label: "Signed Doc",
  //   icon: "far fa-address-book",
  // },
  // {
  //   label: "Disable",
  //   icon: " far fa-circle",
  // },
  // {
  //   label: "Delete",
  //   icon: "fas fa-user-times",
  // },
];
export const SalesApprovalsRateAdjesmentOverlayData = [
  // {
  //   label: "Retrieve",
  //   icon: "fas fa-pen",
  // },
  // {
  //   label: "Signed Doc",
  //   icon: "far fa-address-book",
  // },
  // {
  //   label: "Disable",
  //   icon: " far fa-circle",
  // },
  // {
  //   label: "Delete",
  //   icon: "fas fa-user-times",
  // },
];
