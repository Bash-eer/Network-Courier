export const outBoundTableData = [
  {
    id: "1",
    sl_no: "1",
    agent: "DHL",
    rate_cards: "3",
    user: {
      display_name: "John jacob",
    },
    created_on: "25th April 2020",
    status: "Active",
    expanded: [
      {
        rate_cards_list: "Rate-C1-10",
        type: "Adhoc",
        shipping_type: "Export",
      },
      {
        rate_cards_list: "Rate-C1-55",
        type: "Adhoc",
        shipping_type: "Import",
      },
    ],
  },
  {
    id: "2",
    sl_no: "2",
    agent: "UPS",
    rate_cards: "5",
    user: {
      display_name: "Robert jr",
    },
    created_on: "14th June 2017",
    status: "Active",
    expanded: [
      {
        rate_cards_list: "Rate-C1-10",
        type: "Adhoc",
        shipping_type: "Export",
      },
      {
        rate_cards_list: "Rate-C1-55",
        type: "Adhoc",
        shipping_type: "Import",
      },
    ],
  },
];

export const outBoundTableColumns = [
  { field: "actions", header: "Actions" },
  { field: "sl_no", header: "S.No" },
  { field: "agent_name", header: "Agent" },
  { field: "rate_cards", header: "Rate Cards" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created on" },
  { field: "status", header: "Status" },
];

export const outBoundTableActions = [
  { label: "Fuel Charges", icon: "fas fa-gas-pump" },
  { label: "Transit Days", icon: "far fa-circle" },
  // { label: "Edit", icon: "fas fa-pen" },
  // { label: "Delete", icon: "fas fa-trash-alt" },
  { label: "Active", icon: "pi pi-ban" },
  { label: "Export as PDF", icon: "fas fa-file-pdf" },
];

export const outBoundExpandedTableColumns = [
  { field: "actions", header: "Actions" },
  { field: "rate_card_name", header: "Rate Cards" },
  { field: "rate_card_type", header: "Type" },
  { field: "shipping_type", header: "Shipping Type" },
  { field: "private", header: "Status" },
];

export const outBoundExpandedTableActions = [
  { label: "Edit", icon: "fas fa-pen" },
  { label: "Set as default", icon: "pi pi-check-circle" },
  { label: "Private", icon: "pi pi-ban" },
  { label: "Delete", icon: "fas fa-trash-alt" },
  { label: "Clone", icon: "fas fa-clone" },
  { label: "Export as PDF", icon: "fas fa-file-pdf" },
];

export const countriesTableActions = [
  { label: "Edit", icon: "fas fa-pen" },
  { label: "Disable", icon: "pi pi-ban" },
  { label: "Delete", icon: "fas fa-trash-alt" },
];
