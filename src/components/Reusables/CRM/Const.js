export const CustomerLaunchColumnData = [
  { field: "sno", header: "Customer ID" },
  { field: "cmpny_name", header: "Company Name" },
  { field: "address", header: "Address" },
  { field: "email_id", header: "Email" },
  { field: "telephone_no", header: "Telephone" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "actions", header: "Actions" },
];

export const CustomerLaunchColumnFields = [
  { field: "customer_id", header: "Customer ID" },
  { field: "profile_name", header: "Profile Name" },
  { field: "address", header: "Address" },
  { field: "actions", header: "Actions" },
];

export const ContractTripTable = [
  { field: "trip_name", header: "Trip No" },
  { field: "from_date", header: "From" },
  { field: "to_date", header: "To" },
  { field: "cus_from_time", header: "Cust From" },
  { field: "cus_to_time", header: "Cust To" },
  { field: "type", header: "Trip Type" },
  { field: "trip_days", header: "Trip Days" },
];

export const CouponSettingsFields = [
  { field: "Actions", header: "Actions" },
  { field: "s_no", header: "S.No" },
  { field: "coupon_name", header: "Coupon Name" },
  { field: "coupon_code", header: "Coupon Code" },
  { field: "discount", header: "Discount (% /S$)" },
  { field: "minimum_spend", header: "Minimum Spend" },
  { field: "payment_mode", header: "Payment Mode" },
  { field: "business", header: "Business" },
  { field: "from_date", header: "From Date" },
  { field: "to_date", header: "To Date" },
  { field: "user.display_name", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];

export const LogisticsSettingsFields = [
  { field: "actions", header: "Actions" },
  { field: "s_no", header: "S. No" },
  { field: "company", header: "Company" },
  { field: "weight_range", header: "Weight Range" },
  { field: "logistic_type", header: "Type" },
  { field: "default_logistics", header: "Default Logistics" },
  { field: "user.display_name", header: "Created By" },
  { field: "createdAt", header: "Created On" },
];

export const documentDetailTableColumnData = [
  { field: "s_no", header: "S. No" },
  { field: "job_type", header: "Type" },
  { field: "document_types", header: "No of Document Detail Types" },
  { field: "user.display_name", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "Actions", header: "Actions" },
];

export const documentDetailJobTypeTableHeader = [
  { field: "s_no", header: "S. No" },
  { field: "document_details", header: "Documents Detail" },
  { field: "delivery_document", header: "Delivery Doc" },
  { field: "return_document", header: "Return Doc" },
  { field: "return_trip_charge", header: "Return Trip Charge" },
  { field: "remarks", header: "Remarks" },
  { field: "head_office_charge", header: "Head Office Charge" },
  { field: "Actions", header: "Actions" },
];

export const countrySettingsTableHeader = [
  { field: "Actions", header: "Actions" },
  { field: "s_no", header: "S. No" },
  { field: "country_iso_code", header: "Country Code" },
  { field: "country_name", header: "Country" },
  { field: "states", header: "States" },
  { field: "state_mandatory", header: "State Mandatory" },
  { field: "postal_code_mandatory", header: "Postal Code Mandatory" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
];

//standard Collection slips
export const standardCollectionTableColumnData = [
  { field: "s_no", header: "S.No" },
  { field: "Actions", header: "Actions" },
  { field: "template_name", header: "Template Name" },
  { field: "quotation", header: "Quotation" },
  { field: "customer_id", header: "Customer ID" },
  { field: "customer_name ", header: "Customer Name " },
  { field: "cost_center", header: "Cost Center" },
  { field: "type", header: "Type" },
  { field: "active", header: "Status" },
  { field: "status", header: "Scheduled/UnScheduled" },
];

//mass Collection slips
export const massCollectionTableColumnData = [
  { field: "s_no", header: "S.No" },
  // { field: "Actions", header: "Actions" },
  { field: "company_name", header: "Company Name" },
  { field: "contact_person_name", header: "Contact Name" },
  { field: "contact_no", header: "Contact Number" },
  { field: "address", header: "Address" },
  { field: "order_reference_no", header: "Order Number" },
  { field: "quantity", header: "Quantity" },
  { field: "remarks", header: "Remarks" },
];

export const standardCollectionOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Book",
    icon: "fas fa-calendar",
  },
  {
    label: "Schedule",
    icon: "fas fa-calendar-check",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
  {
    label: "Inactivate",
    icon: "fas fa-light fa-clock",
  },
];

export const CustomerLaunchTableOverlayData = [
  {
    label: "Edit Profile",
    icon: "fas fa-pen",
  },
  {
    label: "Booking History ",
    icon: "fas fa-light fa-clock",
  },
  {
    label: "Feedback",
    icon: "fas fa-light fa-comment",
  },
];

export const CouponTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
  {
    label: "Inactive",
    icon: "far fa-circle",
  },
];

export const LogisticsTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];

export const CountrySettingsOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
  {
    label: "Inactive",
    icon: "far fa-circle",
  },
];

export const documentDetailIdTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];

export const documentDetailTableOverlayData = [
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];

export const CustomerLeaveColumnFields = [
  { field: "customer_id", header: "Customer ID" },
  { field: "profile_name", header: "Company Name" },
  { field: "address", header: "Address" },
  { field: "from_date", header: "From" },
  { field: "to_date", header: "To" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "actions", header: "Actions" },
];

export const StatusColumnFields = [
  { field: "status_name", header: "Status" },
  { field: "status_date_time", header: "Status Date & Time" },
  { field: "location", header: "Location" },
  { field: "remarks", header: "Remarks" },
];

export const liveJobExpansionColumnFields = [
  { field: "Image", header: "Image" },
  { field: "customer_id", header: "Document" },
  { field: "cost_center", header: "Cash" },
  { field: "remarks", header: "Remarks" },
  { field: "locations", header: "Order Ref Number" },
];

export const CSRActivityColumnFields = [
  { field: "s_no", header: "S.No" },
  { field: "feedback_no", header: "Feedback No" },
  { field: "feedback_type", header: "Type" },
  { field: "company_name", header: "Company Details" },
  { field: "cost_center_name", header: "Cost Center" },
  { field: "caller_name", header: "Caller Name" },
  { field: "assigned_to", header: "Assigned to" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "status", header: "Status" },
  { field: "actions", header: "Actions" },
];

export const CSRActivityCollectionSlipColumnFields = [
  { field: "collection_slip_no", header: "Collection Slip No" },
  { field: "job_type", header: "Job Type" },
  { field: "createdAt", header: "Date" },
  { field: "callerDetails", header: "Caller Details" },
  { field: "to_date", header: "Company Details" },
  { field: "cost_center", header: "Cost Center" },
  { field: "status", header: "Status" },
  { field: "created_by", header: "Created By" },
  { field: "createdAt", header: "Created On" },
  { field: "actions", header: "Actions" },
];

export const CustomerSettingTableOverlayData = [
  {
    label: "Edit",
    icon: "fas fa-pen",
  },
  {
    label: "Delete",
    icon: "fas fa-user-times",
  },
];

export const companyDropdownArray = [
  { id: 1, name: "Express", code: "Express" },
  { id: 2, name: "Rapido", code: "Rapido" },
  { id: 3, name: "International", code: "International" },
  { id: 4, name: "3PL", code: "3PL" },
];

export const buildingDropdownArray = [
  { id: 1, name: "Commercial", code: "Commercial" },
  { id: 1, name: "Residential", code: "Residential" },
];

export const shipmentDropdownArray = [
  { id: 1, name: "Inbound", code: "Inbound" },
  { id: 2, name: "Outbound", code: "Outbound" },
];

export const logisticsDropdownArray = [
  { id: 1, name: "Bike", code: "Bike" },
  { id: 2, name: "Van", code: "Van" },
  { id: 3, name: "Rapido", code: "Rapido" },
  { id: 3, name: "3PL", code: "3PL" },
];
