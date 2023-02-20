export const editAction = [
    { label: "Edit", icon: "fas fa-pen" },
];

export const deleteAction = [
    { label: "Delete", icon: "fas fa-trash-alt" },
];

// Fuel charges
export const fuelChargeTableData = [
    {
        sl_no: 1,
        vendor_code: 'OA-67737736',
        vendor: 'DHL Singapore',
        from: '24th Apr, 2021',
        to: '24th Apr, 2021',
        percentage: '62',
        created_by: 'John Jacob',
        created_on: '24th Apr, 2021',
    },
    {
        sl_no: 2,
        vendor_code: 'OA-67737736',
        vendor: 'Fedex Singapore',
        from: '24th Apr, 2021',
        to: '24th Apr, 2021',
        percentage: '50',
        created_by: 'John Jame',
        created_on: '24th Apr, 2021',
    },

];

export const fuelChargeTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "vendor_code", header: "Vendor Code" },
    { field: "vendor", header: "Vendor" },
    { field: "from_date", header: "From" },
    { field: "to_date", header: "To" },
    { field: "percentage", header: "Percentage" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" }
];

export const fuelChargeTableActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
];


// Tranist days
export const transitDaysTableData = [
    {
        sl_no: 1,
        country: 'IN-INDIA',
        destination: 'CH-CHENNAI',
        postal_code: '636007',
        transit_days: '4',
        created_by: 'John Jacob',
        created_on: '24th Apr, 2021',
    },
    {
        sl_no: 2,
        country: 'IN-INDIA',
        destination: 'KA-KARNATAKA',
        postal_code: '636007',
        transit_days: '7',
        created_by: 'John Jacob',
        created_on: '11th Apr, 2021',
    },

];

export const transitDaysTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "destination", header: "Destination" },
    { field: "postal_code", header: "Postal Code" },
    { field: "transit_days", header: "Transit Days" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
];

export const transitDaysTableActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
    { label: "Active", icon: "fas fa-trash-alt" },

];


// Edit Zones
export const zoneTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "zone_no", header: "Zones" },
    { field: "no_of_countries", header: "No of Countries" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
];

export const zoneTableActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
    { label: "Active", icon: "fas fa-trash-alt" },

];

// Edit Weight
export const weidhtTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "weight_range", header: "Weight Range" },
    { field: "fuel_charge", header: "Fuel $" },
];

export const weidhtTableActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
];

// Edit Surcharges / Normal
export const surchargesNormalTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "weight_range", header: "Weight Range" },
    { field: "document", header: "Document $" },
    { field: "parcel", header: "Parcel $" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
];

// Edit Surcharges / Multiplier

export const surchargesMultiTableColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "weight_range", header: "Weight Range" },
    { field: "document", header: "Document $" },
    { field: "document_min_rate", header: "Minimum $" },
    { field: "parcel", header: "Parcel $" },
    { field: "parcel_min_rate", header: "Minimum $" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
];

export const surchargesRestrictedBaseColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "percentage", header: "Percentage" },
    { field: "minimum_rate", header: "Minimum $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
];

export const surchargesOverweightColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "weight", header: "Weight (kg)" },
    { field: "width", header: "Width (cm)" },
    { field: "length", header: "Length (cm)" },
    { field: "height", header: "Height (cm)" },
    { field: "per_document_rate", header: "Document $" },
    { field: "per_parcel_rate", header: "Parcel $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
]

export const surchargesRemoteareaColumns = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "destination", header: "Destination" },
    { field: "postal_code", header: "Postal Code" },
    { field: "document", header: "Document $" },
    { field: "parcel", header: "Parcel $" },
    { field: "min", header: "Min $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
]

export const surchargesRemoteareaMultiplierColumns = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "destination", header: "Destination" },
    { field: "postal_code", header: "Postal Code" },
    { field: "per_document_rate", header: "Document $" },
    { field: "per_document_mim_rate", header: "Document Min $" },
    { field: "per_parcel_rate", header: "Parcel $" },
    { field: "per_parcel_min_rate", header: "Parcel Min $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
]

export const addSurchargesColumns = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "special_rate_name", header: "Rate Name" },
    { field: "rate", header: "Rate $" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
]

export const surchargesNormalActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
];

// Edit Surcharges / RestrictedCountry
export const restrictedCountryData = [
    {
        sl_no: 1,
        weight_range: '35-32',
        country: 'Burkina Faso',
        country_code: 'BK',
        rate: '131',
        document: '34',
        parcel: '42',
        created_by: 'John Jacob',
        created_on: '24th Apr, 2021'
    },
    {
        sl_no: 2,
        weight_range: '35-32',
        country: 'Barbados ',
        country_code: 'BK',
        rate: '131',
        document: '23',
        parcel: '24',
        created_by: 'John Jacob',
        created_on: '24th Apr, 2021'
    },

];

export const restrictedCountryColumn = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country", header: "Country" },
    { field: "country_code", header: "Country Code" },
    { field: "weight_range", header: "Weight Range" },
    { field: "document", header: "Document $" },
    { field: "parcel", header: "Parcel $" },
    { field: "created_by", header: "Created By" },
    { field: "created_on", header: "Created On" },

];

export const restrictedCountryActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Delete", icon: "fas fa-trash-alt" },
];