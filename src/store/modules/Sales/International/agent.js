import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesInternationalAgent = {
  namespaced: true,
  state: {
    InternationalAgentTimeLineCurrentTab: "Overview",
    TimeLineCurrentTab: "Overview",
    quotationData: null,
    agentStep: 0,
    addClearanceChargesType: null,
    addCODChargesType: null,
    addDeliveryChargesType: null,
    eCommerceVanDuoType: null,
    breadcrumbTitle: null,
    breadcrumbPath: "Dashboard",
    updateType: "quotation",
    stepperNavigation: null,
    dialogComponent: null,
    dialogHeader: null,
    globalSearch: "",
    payloadPost: {},

    defaultInternationalAgentTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    InternationalAgentTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetails",
      },

      {
        index: 2,
        color: "#ffff",
      },
    ],
    InternationalAgentOverviewData: [],
    InternationalAgentStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesInternationalAgentFirstStep",
        name: "Profile",
      },
      {
        index: 1,
        label: "2",
        component: "SalesInternationalAgentSecondStep",
        name: "Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesInternationalAgentThirdStep",
        name: "Questionnaire",
      },
      {
        index: 3,
        label: "4",
        component: "SalesInternationalAgentFourthStep",
        name: "Costing",
      },
      {
        index: 4,
        label: "5",
        component: "SalesInternationalAgentFifthStep",
        name: "Permit Settings",
      },
      {
        index: 5,
        label: "6",
        component: "SalesInternationalAgentSixthStep",
        name: "Onforwarding",
      },
      {
        index: 6,
        label: "7",
        component: "SalesInternationalAgentSeventhStep",
        name: "Send Quotation",
      },
    ],
    internationalAgentDropDownTableColumns: [
      { field: "delivery_name", header: "Delivery Name" },
      { field: "charges", header: "Charges" },
    ],
    internationalAgentDropDownTableDate: [
      {
        delivery_name: "Sunday Delivery Charges",
        charges: "$20",
      },
      {
        delivery_name: "Holiday Delivery Charges",
        charges: "$40",
      },
    ],
  },
  mutations: {
    fetchInternationalAgentTimeLineData(state, data) {
      state.InternationalAgentTimeLine.push(data);
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    setAgentStep(state, payload) {
      state.agentStep = state.agentStep + payload;
    },

    fetchDefaultInternationalAgentTimeLineData(state, data) {
      state.InternationalAgentTimeLine = [];
      state.InternationalAgentTimeLine = data;
    },
    addClearanceChargesTypeMutation(state, type) {
      state.addClearanceChargesType = type;
    },
    eCommerceVanDuoTypeMutation(state, type) {
      state.eCommerceVanDuoType = type;
    },
    payloadPostData(state, type) {
      state.payloadPost = type;
    },
    setQuotationData(state, payload) {
      state.quotationData = payload;
    },
    clearQuotationData(state) {
      state.quotationData = null;
    },
    addCODChargesTypeMutation(state, type) {
      state.addCODChargesType = type;
    },

    addDeliveryChargesTypeMutation(state, type) {
      state.addDeliveryChargesType = type;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchInternationalAgentOverviewData(state, data) {
      state.InternationalAgentOverviewData = data;
    },
  },

  actions: {
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    resetInternationalAgentTimeLineData({ commit }, { data }) {
      commit("fetchDefaultInternationalAgentTimeLineData", data);
    },
    updateInternationalAgentTimeLineData({ commit }, { data }) {
      commit("fetchInternationalAgentTimeLineData", data);
    },

    setClearanceChargesType({ commit }, { type }) {
      commit("addClearanceChargesTypeMutation", type);
    },
    setTabClearanceType({ commit }, { type }) {
      commit("eCommerceVanDuoTypeMutation", type);
    },
    setPayloadPostData({ commit }, { type }) {
      commit("payloadPostData", type);
    },
    clearQuotationData({ commit }) {
      commit("clearQuotationData");
    },

    setCODType({ commit }, { type }) {
      commit("addCODChargesTypeMutation", type);
    },

    setDeliveryChargesType({ commit }, { type }) {
      commit("addDeliveryChargesTypeMutation", type);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    async loadInternationalAgentOverviewData({ commit }, { id, type }) {
      let set_type = type.includes("quotation") ? "quotations" : "contract";
      await axios.get(`/sales/${set_type}/overview/` + id).then((res) => {
        if (res.data.results) {
          commit("fetchInternationalAgentOverviewData", res.data.results);
        }
      });
    },
    async setQuotationData({ commit }, { id, type }) {
      const res = await axios.get(`/sales/${type}/overview/` + id);
      if (res) {
        commit("setQuotationData", res.data.results || {});
      }
    },
    async editInternationalAgent(_, { id, payload, type }) {
      return await axios.patch(`/sales/${type}/` + id, payload);
    },
    async promoteContract(_, { id }) {
      return await axios.post(`/sales/quotations/promotetocontract/` + id);
    },
    async getQuestionList() {
      return await axios.get(
        "/settings/sales/rates/international/inbound/questionnaires/suggestions"
      );
    },
    async getSalesPerson() {
      return await axios.get("/settings/user/dropdown?role=Sales Person");
    },
    async getPreviouslyServed() {
      return await axios.get(
        "/settings/salesSettinigs/others/competitor/dropdown"
      );
    },
    async getReferredBy() {
      return await axios.get(
        "/settings/salesSettinigs/others/reference/dropdown"
      );
    },
    async getOtherCharges() {
      return await axios.get(
        "/settings/sales/rates/international/inbound/others/dropdown"
      );
    },
    async getPermitOther() {
      return await axios.get(
        "/settings/salesSettinigs/rates/international/inbound/permitCharges/otherCharges"
      );
    },
    async getPermitAdl() {
      return await axios.get(
        "/settings/salesSettinigs/rates/international/inbound/permitCharges/additionalCharges"
      );
    },
    async getPermitStorage() {
      return await axios.get(
        "/settings/salesSettinigs/rates/international/inbound/permitCharges/storageCharges"
      );
    },
    async updateSalesPerson(_, { id, payload }) {
      return await axios.patch("/sales/quotations/sales-person/" + id, payload);
    },
    async getSurchargesList() {
      return await axios.get(
        "/settings/sales/rates/international/inbound/surcharges"
      );
    },
    async getClearanceMode() {
      return await axios.get(
        "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes"
      );
    },
    async getPermitSettings() {
      return await axios.get(
        "/settings/sales/rates/international/inbound/permit-settings"
      );
    },
    async getServiceProvider() {
      return await axios.get(
        "/settings/sales/rates/international/outbound/service-provider/rate-cards"
      );
    },
    async saveInternationalAgent(_, payload) {
      return await axios.post(`/sales/quotation`, payload);
    },
  },
  getters: {
    quotationData: ({ quotationData }) => quotationData,
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    agentStep: ({ agentStep }) => agentStep,
    InternationalAgentOverviewData: ({ InternationalAgentOverviewData }) =>
      InternationalAgentOverviewData,

    // expressContractBikeAddNewData: ({ expressContractBikeAddNewData }) =>
    //   expressContractBikeAddNewData,
  },
};

export default salesInternationalAgent;
