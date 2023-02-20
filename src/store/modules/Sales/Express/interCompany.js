import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractInterCompany = {
  namespaced: true,
  state: {
    expressContractInterCompanyCurrentTab: "Overview",
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    dialogComponent: null,
    dialogHeader: null,
    expressQuotationOverviewData: [],

    quotationSubTableColumnData: [
      { field: "name_of_the_profile", header: "Profile Name" },
      { field: "customer_type", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "createdBy", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "contact_person", header: "Members" },
    ],

    expressRegionsTripTableData: null,
    expressRegionsTripTableColumnData: [
      { field: "trip_no", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "day", header: "Trip Days" },
      { field: "type", header: "Trip Type" },
    ],

    defaultexpressContractInterCompany: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    ExpressContractInterCompanyTimeLineData: [
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
        markerComponent: "BillSettings",
      },
      {
        index: 3,
        color: "#ffff",
      },
    ],

    ExpressInterCompanyOverviewData : {},
    SalesPersonDataTimeLineHeader: {},
    SalesPersonData: [],
    SalesPersonDataDropdown: {},
  },

  mutations: {
    fetchDefaultexpressContractInterCompanyTimeLineData(state, data) {
      state.ExpressContractInterCompanyTimeLineData = [];
      state.ExpressContractInterCompanyTimeLineData = data;
    },
    fetchexpressContractInterCompanyTimeLineData(state, data) {
      state.ExpressContractInterCompanyTimeLineData.push(data);
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchExpressInterCompanyOverviewData(state,data){
      state.ExpressInterCompanyOverviewData = data;
    },
    fetchSalesPersonDataTimeLineHeader(state,data){
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.SalesPersonDataDropdown = data;
    },
  },

  actions: {
    resetExpressInterCompanyTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractInterCompanyTimeLineData", data);
    },
    updateExpressContractInterCompanyTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractInterCompanyTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    loadExpressInterCompanyOverviewData({commit}, {path, id}){
     
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
        
          commit("fetchExpressInterCompanyOverviewData", res?.data?.results);
        }
      });
    },
    loadSalesPersonDataTimeLineHeader({commit}, {path,id}) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },
    loadSalesPersonData({commit}, {path}) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchSalesPersonData", res.data.results);
        }
      });
    },
    loadSalesPersonDataDropdown({commit}, {path, id, payload}) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
          commit("fetchloadSalesPersonDataDropdown", res?.data?.results);
        }
      });
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};

export default salesExpressContractInterCompany;
