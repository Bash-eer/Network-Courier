import { mapActions, mapState, mapGetters } from "vuex";

/// STATE VARIABLES
export const crmClState = {
  ...mapState("CRMClients", {
    table_column: (state) => state.table_column,
    ovarlay_data: (state) => state.ovarlay_data,
    table_data: (state) => state.table_data,
    table_column_cus: (state) => state.table_column_cus,
    sub_table_data: (state) => state.sub_table_data,
  }),
  ...mapState("CRMClients", [
    "customer_data",
    "sub_table_column",
    "action_type",
    "ovarlay_data_cus",
    "contract_profile_id",
    "edit_data_mutiple",
    "ovarlay_data_contact",
    "contact_data",
    "sub_table_contact",
    "contact_company_id",
    "table_contact",
  ]),
  // ...mapGetters("CRMClients", ["table_data"]),
};
export const crmCusLState = {
  ...mapState("CustomerLaunchStore", [
    "customer_d_data",
    "crmBookingDetailsArray",
    "ecommerce_charge",
    "rapidoTripNumber",
    "rapidoCallData",
    "customerNameDropDownList",
    "customerContactDropDownList",
    "billing_select",
    "initail_billing_mode",
    "JobDetailsType",
    "contract_trips_shows",
  ]),
  ...mapGetters("CustomerLaunchStore", ["gerCrmBookingData"]),
};

export const crm_set_state = {
  ...mapState("CrmSettings", ["paymentMethodOriginalData"]),
};
/// ACTION METHODS

export const crm_launch = mapActions("CustomerLaunchStore", [
  "fetchState",
  "getCrmBookingDetails",
  "gettSavedAccordianJobDetails",
  "getSurchargeDropDownList",
  "getCustomerDData",
  "couponSetting",
  "getAdhocSurcharges",
  "getJobPriorityListDropDownApi",
  "getJobPriorityEcomerceList",
  "postStandardCollectionSlipCompanyNameDropDown",
  "getCrmCollerDropDown",
  "postSelectedCostCenter",
  "patchCrmCollerData",
  "getinitialBillingMode",
  "getContractShowTrips",
]);
export const crm_Client = mapActions("CRMClients", [
  "setReset",
  "getAllClient",
  "getCustomerClient",
  "getCustomerSUbClient",
  "actionCustomer",
  "deleteCustomer",
  "getContactsBy",
  "actionContacts",
]);
export const crm_Setting = mapActions("CrmSettings", ["loadPaymentMethodData"]);
