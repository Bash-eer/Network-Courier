import { mapActions, mapState, mapGetters } from "vuex";

/// STATE VARIABLES
export const expressContractState = {
  ...mapState("salesExpressContract", {
    expressContractStep: (state) => state.ExpressContractFlowStepperData,
    expressStep: (state) => state.flowStep,
    expressContractData: (state) => state.expressContractData,
    staticStep: (state) => state.staticFlowStep,
    dynamicStep: (state) => state.dynamicFlowStep,
    overViewData: (state) => state.OverviewData,
    updateType: (state) => state.updateType,
    regions: (state) => state.regions,
    regions_trips: (state) => state.regions_trips,
    cost_routes: (state) => state.cost_routes,
  }),
};

export const sales_IC = {
  ...mapGetters("salesInternationalContract", ["profileCreationData"]),
};
export const ex_state_master = {
  ...mapGetters("expressContract", ["addNewSurchargeName"]),
};
export const adhoc_pro = {
  ...mapState("AdhocProfile", {
    adhoc_pro_OverlayData: (state) => state.adhoc_pro_OverlayData,
    adhoc_pro__TableColumnData: (state) => state.adhoc_pro__TableColumnData,
    adhoc_pro_data: (state) => state.adhoc_pro_data,
  }),

  ...mapGetters("AdhocProfile", ["adhoc_pro_TableData"]),
};
export const sales_co = {
  ...mapState("salesCommon", {
    contact_table: (state) => state.contact_table,
    quotationsStatus: (state) => state.quotationsStatus,
    contractsStatus: (state) => state.contractsStatus,
    salesType: (state) => state.salesType,
    updateStatusId: (state) => state.updateStatusId,
    CostCenterData: (state) => state.CostCenterData,
    commonExpressCCStateData: (state) => state.commonExpressCCStateData,
    quotation_g_overView: (state) => state.quotation_g_overView,
    countryList: (state) => state.countryList,
  }),
  ...mapState("salesSales", {
    dialogOption: (state) => state.dialogOption,
    quotationHeaderProfileData: (state) => state.quotationHeaderProfileData,
  }),
  ...mapState("sales", {
    quotationOverlayData: (state) => state.quotationOverlayData,
  }),
  // ...mapState("outbound", {
  //   countryList: (state) => state.country,
  // }),
  ...mapGetters("salesCommon", ["expressCCPostDialogData"]),
  // ...mapGetters("outbound", ["countryList"]),
};



export const exc_master = mapActions("expressContract", [
  "getSurchargeNames",
  "addSurchargeName",
  "removeSurchargeName",
]);
/// ACTION METHODS
export const expressContract = mapActions("salesExpressContract", [
  "setExpressContractData",
  "setPayloadPostData",
  "navigateStepper",
  "getRegion",
  "getRatesByRegion",
  "getTripByRates",
  "getRatesData",
  "getReferredBy",
  "getPreviouslyServed",
  "normalVanUrgent",
  "getJobByUnit",
  "multiQty",
  "multiJob",
  "deliverTypes",
  "getECommerceByUnit",
  "getSurcharges",
  "getTwoBoxQty",
  "loadOverviewData",
  "clearQuotationData",
  "getChargeWeight",
  "getTwoBoxCount",
  "otherCharges",
  "clearExpressContractData",
  "getRoutes",
  "getRegionTrips",
  "costCenterAction",
  "setEXCStateValue",
  "getEmployees",
]);
export const quotation = mapActions("salesCommon", [
  "editQuotation",
  "sendQuotation",
  "saveQuotation",
  "profileAction",
  "updateStatus",
]);
export const internationalAgent = mapActions("salesInternationalAgent", [
  "getPermitOther",
  "getPermitAdl",
  "getPermitStorage",
]);
export const salesCommon = {
  ...mapActions({
    quotationData: "salesSales/loadQuotationTabTableData",
    contractData: "salesSales/loadContractTabTableData",
    openCommonDialog: "salesSales/openDialog",
  }),
  ...mapActions("salesSales", ["closeDialog", "getTrades", "loadSalesTabData"]),
  ...mapActions("salesContract", ["loadContractTabData"]),
  ...mapActions("SalesQuotation", ["loadQuotationTabData"]),
  ...mapActions("salesApproval", [
    "loadApprovalTerminationTableData",
    "loadRateAdjustment",
    "loadApprovalContracts",
  ]),
  ...mapActions("salesCommon", [
    "profileAction",
    "setSalesType",
    "getSalesStatus",
    "setUpdateStatusId",
    "expressCostCenter",
    "getExCostCenter",
    "loadCostCenterData",
    "clearStateData",
    "getStates",
    "getAddress",
    "getPostalCode",
    "getCountryList",
    "getProfileDetails",
    "getCallReceivedBy",
    "getCustomerContact",
    "addCustomerContact",
    "getContractCustomerContact",
    "retrieveAct",
    "updateSalesPerson",
    "getSalesPerson",
    "quotationOverviewData",
    "loadAttachmentData",
    "loadFollowupData",
  ]),
};
export const adhoc_pro_fun = mapActions("AdhocProfile", [
  "loadTableData",
  "getAdhocProfile",
  "clearAdhocProfile",
  "deleteAdhocProfile",
]);

export const genaralAct = {
  ...mapActions({
    genaralOpenD: "commonStore/openDialog",
    genaralCloseD: "commonStore/closeDialog",
  }),
};
