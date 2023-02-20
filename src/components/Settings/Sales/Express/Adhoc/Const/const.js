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
//--------------------------------------------STEPPER DATA : ENDS HERE-------------------------------------------//
//adhoc sub table overlay data
export const ExpressAdhocSubTableOverlayData = [
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
];
export const ExpressAdhocSubTableOverlayData1 = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas  fa-trash",
  },
];
////////EXPRESS adhoc MAIN DATA
export const express_adhoc_tablecolumdata = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S.No" },
  { field: "rate_card_name", header: "Rate Card Name" },
  { field: "zones_length", header: "Zones" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
//adhoc sub table data
export const express_adhoc_sub_tablecolumdata = [
  { field: "actions", header: "Actions" },
  { field: "sno", header: "S No" },
  { field: "rate_card_name", header: "Rate Card Name" },
  { field: "effective_date_range", header: "Effective Date Range" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
//adhoc sub table overlay data
export const ExpressAdhocTableOverlayData = [
  {
    label: "Set as default",
    icon: "fas fa-check",
  },
  {
    label: "Inactive",
    icon: "far fa-circle",
  },
  // {
  //   label: "Rate Card History",
  //   icon: "fas fa-user-times",
  // },
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
//alternate
export const ExpressAdhocTableAlternateOverlayData = [
  {
    label: "Remove default",
    icon: "fas fa-check",
  },
  {
    label: "Disable",
    icon: "far fa-circle",
  },
  // {
  //   label: "Rate Card History",
  //   icon: "fas fa-user-times",
  // },
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

//express - adhoc - zones data
export const add_zone_TableColumnData = [
  { field: "action", header: "Actions" },
  { field: "sno", header: "S.No" },
  { field: "zone_name", header: "Zones" },

  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
//zone overlay data
export const ZonesOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Inactive",
    icon: "far fa-circle",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];

export const addZonesStepperData = [
  {
    index: 0,
    label: "1",
    component: "PostalCodeStep",
    name: "Postal Codes",
  },
  {
    index: 1,
    label: "2",
    component: "TripsStep",
    name: "Trips",
  },
  {
    index: 2,
    label: "3",
    component: "DeliveryStep",
    name: "Delivery",
  },
];
export const express_adhoc_zones_sub_tablecolumndata = [
  { field: "trip_no", header: "Trip No." },
  { field: "from_time", header: "From" },
  { field: "to_time", header: "To" },
  { field: "trip_days", header: "Trip Days" },
  { field: "trip_type", header: "Trip Type" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
//express - adhoc rates data
export const adhoc_rates_TableColumnData = [
  { field: "action", header: "Actions" },
  { field: "sno", header: "S.No" },
  { field: "zone_range", header: "Zone Range" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];
//adhoc rate overlay data
export const AdhocRatesOverlayData = [
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
    icon: "fas fa-user-times",
  },
];

export const ThirdPageOverlayData1 = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];
export const ThirdPageOverlayData2 = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
];
//normal zones Rates
export const adhocZoneTableExpansionTabMenuData = [
  {
    label: "NormalBike",
    tab: "AdhocSubTable",
    select: false,
    tabName: "Bike",
    heading: "Bike",
    apiKey: "bike",
    data: "data.services[0].trips",
    columns: "express_adhoc_zones_sub_tablecolumndata",
  },
  {
    label: "NormalVan",
    tab: "AdhocSubTable",
    select: true,
    tabName: "Van",
    heading: "eVan",
    apiKey: "van",
    data: "ContactManagamentInviteesTableData",
    columns: "ContactManagamentInviteesTableColumnData",
  },
];
//normal zones Rates
export const adhocZoneRatesNormalTabMenuData = [
  {
    label: "NormalBike",
    tab: "AdhocTable",
    select: false,
    tabName: "Bike",
    heading: "Bike",
    apiKey: "bike",
    overlay: "AdhocRatesOverlayData",
    data: "ExpressAdhocNormalBikeTableData",
    columns: "ExpressAdhocNormalBikeTableColumnData",
  },
  {
    label: "NormalVan",
    tab: "AdhocTable",
    select: true,
    tabName: "Van",
    heading: "eVan",
    apiKey: "van",
    overlay: "AdhocRatesOverlayData",

    data: "ExpressAdhocNormalVanTableData",
    columns: "ExpressAdhocNormalVanTableColumnData",
  },
];

//E-commerce zones Rates
export const adhocZoneRatesEcomTabMenuData = [
  {
    label: "EcomBike",
    tab: "AdhocTable",
    select: false,
    tabName: "Bike",
    heading: "eBike",
    apiKey: "bike",
    overlay: "AdhocRatesOverlayData",
    data: "ExpressAdhocEcomBikeTableData",
    columns: "ExpressAdhocEcomBikeTableColumnData",
  },
  {
    label: "EcomVan",
    tab: "AdhocTable",
    select: true,
    tabName: "Van",
    heading: "eVan",
    apiKey: "van",
    overlay: "AdhocRatesOverlayData",
    data: "ExpressAdhocEcomVanTableData",
    columns: "ExpressAdhocEcomVanTableColumnData",
  },
];
