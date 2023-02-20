//--------------------------------------------STEPPER DATA : STARTS HERE-------------------------------------------//
export const addRegionStepperData = [
  {
    index: 0,
    label: "1",
    component: "AddRegionTrips",
    name: "Trips",
  },
  {
    index: 1,
    label: "2",
    component: "AddRegionDelivery",
    name: "Delivery",
  },
];
export const addRatesStepperData = [
  {
    index: 0,
    label: "1",
    component: "AddNormalRates",
    name: "Normal",
  },
  {
    index: 1,
    label: "2",
    component: "AddECommerceRates",
    name: "E-Commerce",
  },
  {
    index: 2,
    label: "3",
    component: "AddSurcharges",
    name: "Surcharges",
  },
  {
    index: 3,
    label: "4",
    component: "AddAdditionalSurcharges",
    name: "Additional Surcharges",
  },
];

export const ADD_RATES_STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};
export const addRatesNormalStepperData = [
  {
    index: 0,
    label: "1",
    component: "NormalTrips",
    name: "Trips",
  },
  {
    index: 1,
    label: "2",
    component: "NormalRates",
    name: "Rates",
  },
];
//--------------------------------------------STEPPER DATA : ENDS HERE-------------------------------------------//

//--------------------------------------------TAB MENU DATA : STARTS HERE-------------------------------------------//
//Region Rates
export const regionRatesMainTabMenuData = [
  {
    label: "Normal",
    tab: "NormalRegionRates",
    select: false,
    tabName: "Normal",
    heading: "Normal",
    apiKey: "normal",
  },
  {
    label: "E-Commerce",
    tab: "ECommerceRegionRates",
    select: true,
    tabName: "E-Commerce",
    heading: "E-Commerce",
    apiKey: "e_commerce",
  },
  {
    label: "Surcharges",
    tab: "SurchargesRegionRates",
    select: true,
    tabName: "Surcharges",
    heading: "Surcharges",
    apiKey: "surcharges",
  },
  {
    label: "AdditionalSurcharges",
    tab: "AdditionalSurchargesRegionRates",
    select: true,
    tabName: "Additional Surcharges",
    heading: "AdditionalSurcharges",
    apiKey: "additional_surcharges",
  },
];
//Normal Region Rates
export const normalRegionRatesTabMenuData = [
  {
    label: "nBike",
    tab: "NormalBikeRates",
    select: false,
    tabName: "Bike",
    heading: "nBike",
    apiKey: "bike",
  },
  {
    label: "nVan",
    tab: "NormalVanRates",
    select: true,
    tabName: "Van",
    heading: "nVan",
    apiKey: "van",
  },
];

//E-commerce Region Rates
export const eCommerceRegionRatesTabMenuData = [
  {
    label: "eBike",
    tab: "ECommerceBikeRates",
    select: false,
    tabName: "Bike",
    heading: "eBike",
    apiKey: "bike",
  },
  {
    label: "eVan",
    tab: "ECommerceVanRates",
    select: true,
    tabName: "Van",
    heading: "eVan",
    apiKey: "van",
  },
];

//Normal Region Rates
//VAN TWO TIER
export const normalVanTwoTierTabMenuData = [
  {
    label: "VanTwoTierRatesChargeByWeight",
    apiKey: "van_2_tire_rates_charge_by_weight",
    tab: "RegionRatesTable",
    select: false,
    tabName: "Weight",
    heading: "VanTwoTierRatesChargeByWeight",
    transport: "Van",
    type: "normal",
  },
  {
    label: "VanTwoTierRatesChargeByQuantity",
    apiKey: "van_2_tire_rates_charge_by_quantity",
    tab: "RegionRatesTable",
    select: true,
    tabName: "Quantity",
    heading: "VanTwoTierRatesChargeByQuantity",
    transport: "Van",
    type: "normal",
  },
];
//VAN MULTI TIER
export const normalVanMultiTierTabMenuData = [
  {
    label: "VanMultiTierRatesChargeByQuantity",
    apiKey: "van_Multi_tire_rates_charge_by_quantity",
    tab: "RegionRatesTable",
    select: true,
    tabName: "Quantity",
    heading: "VanMultiTierRatesChargeByQuantity",
    transport: "Van",
    type: "normal",
  },
  {
    label: "VanMultiTierRatesChargeByJobCount",
    apiKey: "van_Multi_tire_rates_charge_by_job_count",
    tab: "RegionRatesTable",
    select: false,
    tabName: "Job Count",
    heading: "VanMultiTierRatesChargeByJobCount",
    transport: "Van",
    type: "normal",
  },
];
//--------------------------------------------TAB MENU DATA : ENDS HERE-------------------------------------------//

//--------------------------------------------TABLE COLUMN DATA : STARTS HERE-------------------------------------------//

//--------------------------------------------NORMAL-------------------------------------------//
//BIKE
export const normalBikeTripsTableColumnData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "trip_no", header: "Trip No." },
  { field: "from_time", header: "From" },
  { field: "to_time", header: "To" },
  { field: "trip_days", header: "Trip Days" },
  { field: "trip_type", header: "Trip Type" },
  { field: "createdAt", header: "Created On" },
  { field: "createdBy", header: "Created By" },
  
];

export const normalVanTripsTableColumnData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "trip_no", header: "Trip No." },
  { field: "from_time", header: "From" },
  { field: "to_time", header: "To" },
  { field: "trip_days", header: "Trip Days" },
  { field: "trip_type", header: "Trip Type" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
  
];


export const normalBikeRatesTableColumnData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "min_units", header: "Monthly Minimum Dispatches" },
  { field: "unit_rate", header: "Rates" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const normalBikeBikeCustomerVanJobTableColumnData = [
 
  { field: "s_no", header: "S.No." },
  { field: "van_job_min_cost", header: "Van Job Min Cost $" },
  { field: "maximum_weight", header: "Maximum Weight (Kg)" },
  { field: "van_job_add_cost", header: "Van Job Add Cost $" },
  { field: "van_job_add_weight", header: "Van Job Add Weight (Kg)" },
  { field: "van_job_urgent_surcharges", header: "Van Job Urgent  $" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];

//VAN
export const normalVanRatesTableColumnData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "min_units", header: "Monthly Minimum Dispatches" },
  { field: "unit_rate", header: "Rates" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const normalVanVanCustomerBikeJobTableColumnData = [
  
  { field: "s_no", header: "S.No." },
  { field: "min_charge_per_job", header: "Min Charge per Job (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const normalVanTwoTierChargeByWeightTableColumnData = [
  
  { field: "maximum_weight", header: "Maximum Weight" },
  { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
  { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
  
];
export const normalVanTwoTierChargeByQuantityTableColumnData = [
  
  { field: "maximum_quantity", header: "Maximum Quantity" },
  { field: "van_job_add_quantity", header: "Van Job Addl. Quantity" },
  { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
  
];
export const normalVanTwoTierChargeByQuantityBoxCountChargesTableColumnData = [
  { field: "", header: "No of Boxes" },
  { field: "rate", header: "Rate (S$)" },
];
export const normalVanMultiTierChargeByQuantityTableColumnData = [
  { field: "action", header: "Actions" },
 
  { field: "min_box", header: "No of Boxes" },
  { field: "rate", header: "Rate (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
 
];
export const normalVanMultiTierChargeByJobCountTableColumnData = [
  { field: "action", header: "Actions" },
 
  { field: "min_job", header: "No of Job Count" },
  { field: "rate", header: "Rate (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
  
];
//--------------------------------------------NORMAL-------------------------------------------//

//--------------------------------------------E-COMMERCE-------------------------------------------//
//BIKE
export const eCommerceBikeDeliveryTableColumnsData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "delivery_type", header: "Delivery Type" },
  { field: "cut_off_time", header: "Cutoff Time" },
  { field: "cut_off_days_count", header: "Cutoff Days" },
  { field: "timeslot_delivery", header: "Timeslot Delivery $" },
  {
    field: "timeslot_delivery_fixed_hours",
    header: "Timeslot Delivery Hours (Fixed)",
  },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
//Rates
export const eCommerce_Bike_Rates_TableColumnData = [
  { field: "action", header: "Actions" },
  {field: 's_no', header: 'S.No.'},
  { field: "", header: "Dispatches" },
  { field: "unit_rate", header: "Rate (S$)" },
];
//Bike Customer Van Job
export const eCommerce_Bike_BikeCustomerVanJob_TableColumnData = [
  {field: 's_no', header: 'S.No.'},
  { field: "van_job_min_cost", header: "Van Job Min Cost $" },
  { field: "maximum_weight", header: "Max Weight" },
  { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
  { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
  {
    field: "van_job_urgent_surcharges",
    header: "Van Job Urg. Surcahrge ($)",
  },
];

//VAN
export const eCommerceVanDeliveryTableColumnsData = [
  { field: "action", header: "Actions" },
  { field: "s_no", header: "S.No." },
  { field: "delivery_type", header: "Delivery Type" },
  { field: "cut_off_time", header: "Cutoff Time" },
  { field: "cut_off_days_count", header: "Cutoff Days" },
  { field: "timeslot_delivery", header: "Timeslot Delivery $" },
  {
    field: "timeslot_delivery_fixed_hours",
    header: "Timeslot Delivery Hours (Fixed)",
  },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
//Rates
export const eCommerce_Van_Rates_TableColumnData = [
  { field: "action", header: "Actions" },
  
  { field: "", header: "Dispatches" },
  { field: "unit_rate", header: "Rate (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const eCommerce_Van_ChargeByWeight_TableColumnData = [
  
  { field: "maximum_weight", header: "Max Weight" },
  { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
  { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const eCommerce_Van_ChargeByQuantity_TableColumnData = [

  
  { field: "maximum_quantity", header: "Max Quantity" },
  {
    field: "van_job_add_quantity",
    header: "Van Job Addl. Quantity (Kg)",
  },
  { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
export const eCommerce_Van_BoxCountCharges_TableColumnData = [
  { field: "action", header: "Actions" },
  { field: "", header: "No of Boxes" },
  { field: "rate", header: "Rate (S$)" },
];
export const eCommerce_Van_VanCustomerBikeJob_TableColumnData = [

  { field: "min_charge_per_job", header: "Min. Charge Per Job (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
//--------------------------------------------E-COMMERCE-------------------------------------------//

//--------------------------------------------SURCHARGES-------------------------------------------//
export const surchargesTableColumnData = [
  
  
  { field: "cod_fee", header: "COD Fee ($)" },
  { field: "cod_fee_percentage", header: "COD Fee %" },
  { field: "standard_liability", header: "Standard Liability (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
];
//--------------------------------------------SURCHARGES-------------------------------------------//

//--------------------------------------------ADDITIONAL SURCHARGES-------------------------------------------//
export const additionalSurchargesTableColumnData = [
  
  { field: "action", header: "Actions" },
  {field: "s_no", header: "S.No."},
  { field: "surcharge_name", header: "Additional Rate Name" },
  { field: "rates", header: "Rate (S$)" },
  { field: "createdAt", header: "Created On" },
  { field: "user", header: "Created By" },
  
];
//--------------------------------------------ADDITIONAL SURCHARGES-------------------------------------------//

//-----------add new region column data------------------------//
//Rates
//region
export const add_region_TableColumnData = [
  { field: "action", header: "Actions" },
  { field: "sno", header: "S.No." },
  { field: "region", header: "Regions" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];
//region expand table data
export const region_bike_van_TableColumnData = [
  //  { field: "action", header: "Actions" },
  { field: "trip_no", header: "Trip No." },
  { field: "from_time", header: "From" },
  { field: "to_time", header: "To" },
  { field: "trip_days", header: "Trip Days" },
  { field: "trip_type", header: "Trip Type" },
  { field: "createdAt", header: "Created On" },
  { field: "created_by", header: "Created By" },
];

//region overlay data
export const RegionsOverlayData = [
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
];
////////EXPRESS CONTRACT MAIN DATA
export const express_contract_tablecolumdata = [
  // { field: "actions", header: "Actions" },
  { field: "sno", header: "S No" },
  { field: "region", header: "Regions" },
  { field: "rate_cards_count", header: "Rate Cards" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];

export const expressContractTripsData = [
  { field: "trip_no", header: "Trip No" },
  { field: "from_time", header: "From" },
  { field: "to_time", header: "To" },
  { field: "trip_days", header: "Trip days" },
  { field: "trip_type", header: "Trip type" },

];

//contract main table overlay data
export const ContractTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  // {
  //   label: "Disable",
  //   icon: "far fa-circle",
  // },
];
//contract sub table overlay data
export const ExpressContractSubTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Set as default",
    icon: "fas fa-check",
  },
  {
    label: "Private",
    icon: "fas fa-ban",
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

export const RegionalRatesData = [
  {
    label: "Delete",
    icon: "fas fa-trash",
  }
 
];

export const ExpressContractAlternateSubTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Remove default",
    icon: "fas fa-check",
  },
  {
    label: "Private",
    icon: "fas fa-ban",
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
//--------------------------------------------TABLE COLUMN DATA : ENDS HERE-------------------------------------------//

//--------------------------------------------DROPDOWN DATA : STARTS HERE-------------------------------------------//
export const tripDaysDropDownData = [
  { name: "Weekends", code: 1 },
  { name: "Weekdays", code: 2 },
  { name: "Saturdays", code: 3 },
];

export const tripTypeDropDownData = [
  { name: "Open", code: 1 },
  { name: "Regular", code: 2 },
];
//--------------------------------------------DROPDOWN DATA : ENDS HERE-------------------------------------------//
