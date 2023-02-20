export const InternationalPageTabMenuData = [
  {
    label: "Outbound",
    tab: "Outbound",
  },
  {
    label: "Inbound",
    tab: "InboundPage",
  },
];
export const InternationalInboundPageTabMenuData = [
  {
    label: "Surcharges",
    dynamic: false,
    tab: "Surcharges",
  },
  {
    label: "Permit Charges",
    dynamic: false,
    tab: "PermitCharges",
  },
  {
    label: "Questionnaire",
    dynamic: false,
    tab: "Questionnaire",
  },
  {
    label: "Currency Exchanges",
    dynamic: false,
    tab: "CurrencyExchange",
  },
  {
    label: "Clearance Mode",
    dynamic: false,
    tab: "ClearanceMode",
  },
];
export const InternationalInboundPermitChargesTabMenuData = [
  {
    label: "GSTType",
    apiKey: "gstTypes",
    mutation: "fetchGstChargesData",
    tab: "InboundDataTable",
    dynamic: false,
    select: false,
    tabName: "GST Type",
    heading: "GSTType",
    data: [],
  },
  {
    label: "AdditionalCharges",
    apiKey: "additionalCharges",
    tab: "InboundDataTable",
    dynamic: false,
    mutation: "fetchAdditionalChargesData",
    select: true,
    tabName: "Additional Charges",
    heading: "AdditionalCharges",
    data: [],
  },
  {
    label: "StorageCharges",
    mutation: "fetchStorageChargesData",
    apiKey: "storageCharges",
    dynamic: false,
    tab: "InboundDataTable",
    select: true,
    tabName: "Storage Charges",
    heading: "StorageCharges",
    data: [],
  },
  {
    label: "OtherCharges",
    mutation: "fetchOthersChargesData",
    dynamic: false,
    apiKey: "otherCharges",
    tab: "InboundDataTable",
    select: true,
    tabName: "Other Charges",
    heading: "OtherCharges",
    data: [],
  },
];
export const InternationalInboundClearanceModeOrOthersTabMenuData = [
  {
    label: "ClearanceMode",
    dynamic: false,
    select: false,
    tabName: "Clearance Mode",
    heading: "ClearanceMode",
  },
  {
    label: "Others",
    select: true,
    dynamic: false,
    tab: "InboundDataTable",
    tabName: "Others",
    heading: "Others",
    data: [],
  },
];
export const InternationalInboundClearanceModeTabMenuData = [
  {
    label: "AirFreight",
    select: false,
    tabName: "Air Freight",
    heading: "AirFreight",
  },
  {
    label: "DNATA",
    select: true,
    tabName: "DNATA",
    heading: "DNATA",
  },
  {
    label: "OBC",
    select: true,
    tabName: "OBC",
    heading: "OBC",
  },
];
export const InboundAirFreightTabMenuData = [
  {
    label: "AirFreightClearanceAndAdditional",
    select: false,
    tab: "InboundDataTable",
    tabName: "Clearance & Additional",
    heading: "AirFreightClearanceAndAdditional",
  },
  {
    label: "AirFreightClearance",
    select: true,
    tab: "InboundDataTable",
    tabName: "Clearance",
    heading: "AirFreightClearance",
  },
];
export const ClearanceModeDynamicTabSub = [
  {
    label: "ClearanceAndAdditional",
    select: false,
    dynamic: false,
    tab: "InboundDataTable",
    tabName: "Clearance & Additional",
    heading: "ClearanceAndAdditional",
  },
  {
    label: "Clearance",
    dynamic: false,
    select: true,
    tab: "InboundDataTable",
    tabName: "Clearance",
    heading: "Clearance",
  },
];
export const InboundDNATATabMenuData = [
  {
    label: "DNATAClearanceAndAdditional",
    select: false,
    tab: "InboundDataTable",
    tabName: "Clearance & Additional",
    heading: "DNATAClearanceAndAdditional",
  },
  {
    label: "DNATAClearance",
    select: true,
    tab: "InboundDataTable",
    tabName: "Clearance",
    heading: "DNATAClearance",
  },
];
export const InboundOBCTabMenuData = [
  {
    label: "OBCClearanceAndAdditional",
    select: false,
    tab: "InboundDataTable",
    tabName: "Clearance & Additional",
    heading: "OBCClearanceAndAdditional",
  },
  {
    label: "OBCClearance",
    select: true,
    tab: "InboundDataTable",
    tabName: "Clearance",
    heading: "OBCClearance",
  },
];
export const PermitChargesGSTTypeTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "gst_type", header: "GST Type" },
  { field: "permit_type", header: "Permit Type" },
  { field: "document_charges", header: "Document Charges $" },
  { field: "handling_charges", header: "Handling Charges $" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const PermitChargesAdditionalChargesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "charge_name", header: "Charge Name" },
  { field: "item_threshold", header: "Items Threshold" },
  { field: "rate", header: "Charges $" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const PermitChargesStorageChargesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "", header: "Weight Range" },
  { field: "per_kg_charges", header: "Per Kg Charge  $" },
  { field: "minimum_charge", header: "Minimum Charge $" },
  { field: "grace_period", header: "Grace period" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const ClearanceModeClearanceAdditionalTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "weight", header: "Weight Range (Kg)" },
  { field: "rate", header: "Rate (S$)" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const ClearanceModeClearanceAdditionalExpandedTableColumns = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "weight", header: "Weight" },
  { field: "rate", header: "Rate (S$)" },
];

export const ClearanceModeClearanceTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_per_kg", header: "Rate Per Kg($)" },
  { field: "minimum_rate", header: "Minimum (S$)" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const InboundQuestionnaireTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "question", header: "Questions" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const InboundSurchargeTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_name", header: "Rate Name" },
  { field: "rate_charges", header: "Rate (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const InboundCurrencyExchangeTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "parent_currency_country", header: "Parent Currency" },
  { field: "convert_currency_country", header: "Convert Currency" },
  { field: "from_date", header: "From" },
  { field: "to_date", header: "To" },
  { field: "buying_rate", header: "Buying Rate" },
  { field: "selling_rate", header: "Selling Rate" },
  { field: "units", header: "Units" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const InternationalInboundSubOverlayData = [
  { label: "Edit", icon: "fas fa-pen" },
  { label: "Delete", icon: "fas fa-trash-alt" },
];
export const PermitChargesOtherChargesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "charge_name", header: "Charge Name" },
  { field: "rate", header: "Charge $" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const ClearanceModeOthersTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_name", header: "Rate Card Name" },
  { field: "per_kg_rate", header: "Per Kg Rate" },
  { field: "min_charge", header: "Minimum Charges" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const InternationalInboundSubOverlayData1 = [
  { label: "Edit", icon: "fas fa-pen" },
  { label: "Disable", icon: "far fa-circle" },
  { label: "Delete", icon: "fas fa-trash-alt" },
];
export const InternationalInboundSubOverlayData2 = [
  { label: "Edit", icon: "fas fa-pen" },
  { label: "Delete", icon: "fas fa-trash-alt" },
];
export const InternationalInboundSubOverlayData3 = [
  { label: "Edit", icon: "fas fa-pen" },
];
