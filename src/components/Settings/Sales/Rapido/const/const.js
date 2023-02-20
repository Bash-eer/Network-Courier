export const RapidoPageTabMenuData = [
  {
    label: "Contract",
    tab: "ContractPage",
  },
  {
    label: "Adhoc",
    tab: "RapidoDataTable",
    data: [],
  },
];
export const rapidoType1SubTabMenuData = [
  {
    label: "samenightdelivery",
    tab: "ContractDataTable",
    tabName: "Same Night Delivery",
    select: false,
    heading: "samenightdelivery",
    data: [],
  },
  {
    label: "nextdayDelivery",
    tab: "ContractDataTable",
    tabName: "Next Day Delivery",
    select: false,
    heading: "nextdayDelivery",
    data: [],
  },
  {
    label: "nextdayDelivery",
    tab: "ContractDataTable",
    tabName: "Next Day Delivery",
    select: false,
    heading: "nextdayDelivery",
    data: [],
  },
];
//--------------------------------------------STEPPER DATA : STARTS HERE-------------------------------------------//
export const addRatesStepperData = [
  {
    index: 0,
    label: "1",
    component: "AddZone",
    name: "Zones",
  },
  {
    index: 1,
    label: "2",
    component: "AddZonalRates",
    name: "Rates",
  },
  {
    index: 2,
    label: "3",
    component: "AddEffectiveDates",
    name: "Effective Date",
  },
];
export const rapidoType2SubTabMenuData = [
  {
    label: "samedaydelivery",
    tab: "ContractDataTable",
    tabName: "Same Day Delivery",
    select: false,
    heading: "samedaydelivery",
    data: [],
  },
  {
    label: "nextdayDelivery",
    tab: "ContractDataTable",
    tabName: "Next Day Delivery",
    select: true,
    heading: "nextdayDelivery",
    data: [],
  },
];
export const RapidoContractPageTabMenuData = [
  {
    label: "Type1",
    tab: "RapidoDataTable",
    select: false,
    tabName: "Type 1",
    heading: "Type1",
    data: [],
  },
  {
    label: "Type2",
    tab: "RapidoDataTable",
    select: true,
    tabName: "Type 2",
    heading: "Type2",
    data: [],
  },
];
export const TypeOneContractTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_card_name", header: "Rate Name" },
  { field: "surcharge", header: "Surcharge (<5 Parcels)" },
  { field: "timeslot_delivery", header: "Time Slot Delivery Charge" },
  { field: "standard_liability", header: "Standard Liability" },
  { field: "cod_fee", header: "COD Fee($)" },
  { field: "cod_percentage", header: "COD Fee (%)" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const TypeTwoContractTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_card_name", header: "Rate Name" },
  // { field: "additional_charge", header: "Additional Charge (Every 10 Kg)" },
  { field: "timeslot_delivery", header: "Time Slot Delivery Charge" },
  { field: "standard_liability", header: "Standard Liability" },
  { field: "cod_fee", header: "COD Fee($)" },
  { field: "cod_percentage", header: "COD Fee (%)" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const RapidoContractUpperLevelType1SubTableColumnData = [
  // { field: "charge_name", header: "Additional Charge (Every 10 Kg)" },
  { field: "cut_off_time", header: "Cut off Time" },
  { field: "cut_off_days_count", header: "Cut off Days Count" },

  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const RapidoContractUpperLevelType2SubTableColumnData = [
  { field: "charge_name", header: "Additional Charge (Every 10 Kg)" },
  { field: "cut_off_time", header: "Cut off Time" },
  { field: "cut_off_days_count", header: "Cut off Days Count" },

  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const RapidoContractType1Type2SubTableColumnData = [
  // { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "size_name", header: "Size Name" },
  // { field: "Cutoff_Time", header: "Cut off Time" },
  // { field: "Cutoff_Days", header: "Cut off Days Count" },
  { field: "weight_range", header: "Weight (Kg)" },
  { field: "measurement_range", header: "Measurements (Cm)" },
  { field: "rate", header: "Rate $" },
  // { field: "createdAt", header: "Created On" },
  // { field: "created_by", header: "Created By" },
];
export const AdhocTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "rate_card_name", header: "Rate Card Name" },
  { field: "zones", header: "Zones" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const AdhocZonesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "zone_name", header: "Zones" },
  { field: "postal_codes", header: "Postal Code Ranges" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
export const contractSubTableColumnsData = [
  { field: "actions", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "name", header: "Location_Name" },
  { field: "area", header: "Area" },
  { field: "postal_caode", header: "Postal Code" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const adhocSubTableColumnsData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S.No." },
  { field: "rate_card_name", header: "Rate Card Name" },
  { field: "effective_date", header: "Effective Date Range" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];
export const adhocRatesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S.No" },
  { field: "zones", header: "Zone Range" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const rapidoContractTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Set as default",
    icon: "fa fa-check-square",
  },
  {
    label: "Rate Card History",
    icon: "fas fa-history",
  },

  {
    label: "Disable",
    icon: "pi pi-ban",
  },
  {
    label: "Delete",
    icon: "fa fa-trash",
  },
  {
    label: "Clone",
    icon: "fa fa-clone",
  },
  {
    label: "Export as PDF",
    icon: "fa fa-file",
  },
];
export const rapidoContractTableAlternateOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Remove default",
    icon: "fa fa-check-square",
  },
  {
    label: "Rate Card History",
    icon: "fas fa-history",
  },

  {
    label: "Disable",
    icon: "pi pi-ban",
  },
  {
    label: "Delete",
    icon: "fa fa-trash",
  },
  {
    label: "Clone",
    icon: "fa fa-clone",
  },
  {
    label: "Export as PDF",
    icon: "fa fa-file",
  },
];
export const rapidoAdhocTableOverlayData1 = [
  {
    label: "Set as default",
    icon: "fas fa-check",
  },
  {
    label: "Rate Card History",
    icon: "fas fa-history",
  },
  {
    label: "Disable",
    icon: "far fa-circle",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
  {
    label: "Clone",
    icon: "far fa-copy",
  },
  {
    label: "Export as PDF",
    icon: "far fa-file-pdf",
  },
];
export const rapidoAdhocTableOverlayData2 = [
  {
    label: "Remove default",
    icon: "fa fa-check-square",
  },
  {
    label: "Rate Card History",
    icon: "fas fa-history",
  },
  {
    label: "Disable",
    icon: "far fa-circle",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
  {
    label: "Clone",
    icon: "far fa-copy",
  },
  {
    label: "Export as PDF",
    icon: "far fa-file-pdf",
  },
];
export const rapidoZoneTableOverlayData = [
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
    icon: "fas  fa-trash",
  },
];
export const rapidoEcommerceOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
];
export const rapidoSurchargesOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
];
export const rapidoAdhocTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Clone",
    icon: "far fa-copy",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
];
//Rapido Adhoc Zone Tab
export const rapidoAdhocZoneRangeTabMenuData = [
  {
    label: "ecommerce",
    tab: "RapidoSubTabs",
    tabName: "E-Commerce",
    select: false,
    heading: "ecommerce",
    data: [],
  },
  {
    label: "onDemandService",
    tab: "ContractDataTable",
    tabName: "On Demand Service",
    select: false,
    heading: "onDemandService",
    data: [],
  },
  {
    label: "surcharges",
    tab: "ContractDataTable",
    tabName: "Surcharges",
    select: false,
    heading: "surcharges",
    data: [],
  },
  {
    label: "additionalSurcharges",
    tab: "ContractDataTable",
    tabName: "Additional Surcharges",
    select: false,
    heading: "additionalSurcharges",
    data: [],
  },
];
export const AdhocRateZoneSDDTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "s_no", header: "S. No" },
  { field: "Delivery_Type", header: "Delivery Type" },
  { field: "Cutoff_Time", header: "Cutoff Time" },
  { field: "Cutoff_Days", header: "Cutoff Days" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const onDemandServiceSubTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "collect_time", header: "Collection Time" },
  { field: "cut_off_time", header: "Cut off Time" },
  { field: "cut_off_days_count", header: "Cut off Days Count" },
];
export const E_commerceTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "size_name", header: "Name" },
  { field: "weight", header: "Weight (Kg)" },
  { field: "measurement", header: "Measurement (Cm)" },
  { field: "unit_rate", header: "Rate (S$)" },
];
export const AdhocRateZoneNDDTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "delivery_type", header: "Delivery Type" },
  { field: "cut_off_time", header: "Cutoff Time" },
  { field: "cut_off_days_count", header: "Cutoff Days" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const AdhocRateZoneOnDemandServiceTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "weight_range", header: "Weight Range" },
  { field: "van_job_min_cost", header: "Van Job Min. ($)" },
  { field: "van_job_additional_cost", header: "Van Job Add. ($)" },
  { field: "van_job_maximum_kilo_meter", header: "Max Kilometer" },
  { field: "van_job_additional_kilo_meter", header: "Van Job Add. KM" },
  { field: "van_job_urgent_surcharges", header: "Van Job Urgent ($)" },
  { field: "collect_time", header: "Collection Time" },
  { field: "cut_off_time", header: "Cut off Time" },
  { field: "cut_off_days_count", header: "Cut off Days Count" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const AdhocRateZoneSurchargesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "cod_fee", header: "COD Fee ($)" },
  { field: "cod_fee_percentage", header: "COD Fee % " },
  { field: "standard_liability", header: "Standard Liability (S$)" },
  { field: "timeslot_delivery", header: "Timeslot Delivery (S$)" },
  { field: "timeslot_delivery_fixed_hours", header: "Timeslot Hours" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
export const AdhocRateZoneAdditionalSurchargesTableColumnData = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S. No" },
  { field: "surcharge_name", header: "Additional Rate Name" },
  { field: "rates", header: "Rate (S$) " },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];