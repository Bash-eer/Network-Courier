
export const actions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
];

export const editAction = [
    { label: "Edit", icon: "fas fa-pen" },
];

export const dataTableColumns = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "vendor_code", header: "Vendor Code" },
    { field: "vendor", header: "Vendor" },
    { field: "from", header: "From" },
    { field: "to", header: "To" },
    { field: "percentage", header: "Percentage" },
    { field: "created_by", header: "Created By" },
    { field: "created_on", header: "Created By" },
]

// normal/bike/rates
export const normalBikeRates = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_units", header: "Monthly Minimum Dispatches" },
    { field: "max_units", header: "Monthly Maximum Dispatches" },
    { field: "unit_rate", header: "Rates" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

export const normalBikeTrips = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "from_time", header: "From" },
    { field: "to_time", header: "To" },
    { field: "trip_days", header: "Trip Days" },
    { field: "trip_type", header: "Trip Type" },
    { field: "createdAt", header: "Created At" },
]

export const tripsTable = [
    { field: "sl_no", header: "S.No" },
    { field: "from_time", header: "From" },
    { field: "to_time", header: "To" },
    { field: "trip_days", header: "Trip Days" },
    { field: "trip_type", header: "Trip Type" },
]

export const normalBikeJob = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "van_job_min_cost", header: "Van Job Min Cost $" },
    { field: "maximum_weight", header: "Maximum Weight (Kg)" },
    { field: "van_job_add_cost", header: "Van Job Add Cost $" },
    { field: "van_job_add_weight", header: "Van Job Add Weight (Kg)" },
    { field: "van_job_urgent_surcharges", header: "Van Job Urgent  $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

// norma/van
export const normalVanTwotier = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "maximum_weight", header: "Maximum Weight" },
    { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
    { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

export const normalVanTwotierQuantity = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "maximum_quantity", header: "Maximum Quantity" },
    { field: "van_job_add_quantity", header: "Van Job Addl. Quantity" },
    { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

export const normalVanTwotierQuantityExpanded = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_box", header: "Minimum Boxes" },
    { field: "max_box", header: "Maximum Boxes" },
    { field: "rate", header: "Rate" },
]

export const normalVanMultitierQuantity = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_box", header: "Minimum Boxes" },
    { field: "max_box", header: "Maximum Boxes" },
    { field: "rate", header: "Rate" },
]

export const normalVanMultitierJob = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_job", header: "Minimum Jobs" },
    { field: "max_job", header: "Maximum Jobs" },
    { field: "rate", header: "Rate" },
]


export const normalVanMultitierCharge = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_charge_per_job", header: "Min Charge per Job (S$)" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

// ecommerce/bike

export const ecommerceBikeSd = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "delivery_type", header: "Delivery Type" },
    { field: "cut_off_time", header: "Cutoff Time" },
    { field: "cut_off_days_count", header: "Cutoff Days" },
    { field: "timeslot_delivery", header: "Timeslot Delivery $" },
    { field: "timeslot_delivery_fixed_hours", header: "Timeslot Delivery Hours (Fixed)" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

export const ecommerceBikeSdRates = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_units", header: "Min units" },
    { field: "max_units", header: "Max units" },
    { field: "unit_rate", header: "Rate (S$)" },
]

export const ecommerceBikeSdJob = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "van_job_min_cost", header: "Van Job Min Cost $" },
    { field: "maximum_weight", header: "Max Weight" },
    { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
    { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
    { field: "van_job_urgent_surcharges", header: "Van Job Urg. Surcahrge ($)" },
]


export const ecommerceVanSdRates = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_units", header: "Min units" },
    { field: "max_units", header: "Max units" },
    { field: "unit_rate", header: "Rate (S$)" },
]

export const ecommerceVanSdWeight = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "maximum_weight", header: "Max Weight" },
    { field: "van_job_add_weight", header: "Van Job Addl. Weight (Kg)" },
    { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
]

export const ecommerceVanSdBox = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_box", header: "Min Boxes " },
    { field: "max_box", header: "Max Boxes" },
    { field: "rate", header: "Rate" },
]

export const ecommerceVanSdQuantity = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "maximum_quantity", header: "Max Quantity" },
    { field: "van_job_add_quantity", header: "Van Job Addl. Quantity (Kg)" },
    { field: "van_job_add_cost", header: "Van Job Addl. Cost ($)" },
]

export const ecommerceVanSdJob = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "min_charge_per_job", header: "Min. Charge Per Job (S$)" },
]

// summary
export const localSummary = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "cod_fee", header: "COD Fee ($)" },
    { field: "cod_fee_percentage", header: "COD Fee %" },
    { field: "standard_liability", header: "Standard Liability (S$)" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]

// add summary
export const localAddSummary = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "surcharge_name", header: "Additional Rate Name" },
    { field: "rates", header: "Rates" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created At" },
]