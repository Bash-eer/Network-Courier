export const contriesTableData = [
    {
        id: '1',
        sl_no: '1',
        country_code: 'AF',
        country: 'Afghanistan',
        destinations: '500',
        created_on: '25th April 2020',
        created_by: 'Steward jr',
        expanded_rows: ['AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name']
    }, {
        id: '2',
        sl_no: '2',
        country_code: 'AL',
        country: 'Albania',
        destinations: '200',
        created_on: '14th June 2017',
        created_by: 'John Jacob',
        expanded_rows: ['AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name', 'AGH-City Name']
    }
]

export const countriesTableColumns = [
    { field: "actions", header: "Actions" },
    { field: "sl_no", header: "S.No" },
    { field: "country_iso_code", header: "Country Code" },
    { field: "country_name", header: "Country" },
    { field: "destinations_length", header: "Destinations" },
    { field: "created_by", header: "Createdy By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
];

export const outBoundTableActions = [
    { label: "Fuel Charges", icon: "fas fa-gas-pump" },
    { label: "Transit Days", icon: "far fa-circle" },
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Active", icon: "fas fa-trash-alt" },
    { label: "Delete", icon: "fas fa-clone" },
    { label: "Export as PDF", icon: "fas fa-file-pdf" },
];

export const outBoundExpandedTableColumns = [
    { field: "rate_cards_list", header: "Rate Cards" },
    { field: "type", header: "Type" },
    { field: "shipping_type", header: "Shipping Type" },
    { field: "actions", header: "Actions" },
];

export const outBoundExpandedTableActions = [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Set as default", icon: "pi pi-check-circle" },
    { label: "Private", icon: "pi pi-ban" },
    { label: "Delete", icon: "fas fa-trash-alt" },
    { label: "Clone", icon: "fas fa-clone" },
    { label: "Export as PDF", icon: "fas fa-file-pdf" },
];
