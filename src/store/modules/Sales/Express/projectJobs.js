import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractProjectJobs = {
  namespaced: true,
  state: {
    expressContractProjectJobsCurrentTab: "Overview",
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    dialogComponent: null,
    dialogHeader: null,
    expressQuotationOverviewData: [],
    ExpressContractProjectJobsEditData:null,
    salesQuotationId: null,
    ExpressContractProjectJobOverviewData:[],
    expressContractProjectJobsAddNewData: {
      quotation: {},
    },


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

    //table datas
    expressRegionsTripTableData: null,
    expressRegionsTripTableColumnData: [
      { field: "trip_no", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "day", header: "Trip Days" },
      { field: "type", header: "Trip Type" },
    ],

    timeLineExpressContractProjectJobsCostCenterTableData: [
      {
        trip_schedule: [
          {
            id: "1",
            trip_no: 1,
            from: "1970-01-01T14:46:00.000Z",
            to: "1970-01-01T15:46:00.000Z",
            day: "Weekdays",
            type: "Open",
            fromraw_time: "1970-01-01T14:46:00.000Z",
            toraw_time: "1970-01-01T15:46:00.000Z",
          },
        ],
        id: "1",
        cost_centre_name: "Cost Centre One",
        postal_code: "222",
        country: "C1",
        state: "C1",
        building_name: "NC Office",
        floor_no: "10",
        unit_no: "1",
        address: "NC Avenue",
        site_office: true,
        region: null,
        route: null,
        charge_per_trip: null,
        head_off_delivery_charge: 30,
        return_trip_charge: 20,
        return_trip_chargable: true,
        collection_chargable: true,
        headoff_delivery_charges: false,
        headoff_return_trip_waived: false,
        quotation_id: "1",
        // address:"No.1 Second Chin Bee",
        address_pincode: "238801",
        contact_person: [
          {
            id: "2",
            profile_url: null,
            person_name: "Jack",
            profile: null,
            email: "jack@nc.com",
            contact_no: "122",
            designation: "Admin",
            type: "cost_centre",
            type_id: "1",
          },
        ],
        siteOfficeCharges: {
          "Charge Per Trip": null,
          "Return Trip Charge (By Amount)": 20,
          "Head Off Delivery Charges": 30,
        },
        siteOfficeChargesPreferences: {
          "Return Trip Chargeable (Per Trip)": true,
          "Collection Chargable": true,
        },
      },
      {
        trip_schedule: [
          {
            id: "1",
            trip_no: 1,
            from: "1970-01-01T14:46:00.000Z",
            to: "1970-01-01T15:46:00.000Z",
            day: "Weekdays",
            type: "Open",
            fromraw_time: "1970-01-01T14:46:00.000Z",
            toraw_time: "1970-01-01T15:46:00.000Z",
          },
        ],
        id: "2",
        cost_centre_name: "Cost Center Two",
        postal_code: "1",
        country: "C1",
        state: "C1",
        building_name: "test9",
        floor_no: "",
        unit_no: "56",
        address: "NC TOWers",
        site_office: true,
        region: null,
        route: null,
        charge_per_trip: null,
        head_off_delivery_charge: 1,
        return_trip_charge: 2,
        return_trip_chargable: true,
        collection_chargable: true,
        headoff_delivery_charges: false,
        headoff_return_trip_waived: false,
        quotation_id: "1",
        contact_person: [
          {
            id: "6",
            profile_url: null,
            person_name: "Josh",
            profile: null,
            email: "josh@nc.com",
            contact_no: "11",
            designation: "admin",
            type: "cost_centre",
            type_id: "2",
          },
        ],
        siteOfficeCharges: {
          "Charge Per Trip": null,
          "Return Trip Charge (By Amount)": 2,
          "Head Off Delivery Charges": 1,
        },
        siteOfficeChargesPreferences: {
          "Return Trip Chargeable (Per Trip)": true,
          "Collection Chargable": true,
        },
      },
      {
        trip_schedule: [
          {
            id: "1",
            trip_no: 1,
            from: "1970-01-01T14:46:00.000Z",
            to: "1970-01-01T15:46:00.000Z",
            day: "Weekdays",
            type: "Open",
            fromraw_time: "1970-01-01T14:46:00.000Z",
            toraw_time: "1970-01-01T15:46:00.000Z",
          },
        ],
        id: "3",
        cost_centre_name: "Levi's Centre",
        postal_code: "12",
        country: "C1",
        state: "C1",
        building_name: "Blue Hills",
        floor_no: "10",
        unit_no: "89",
        address: "Jeans Street",
        site_office: null,
        region: null,
        route: null,
        charge_per_trip: null,
        head_off_delivery_charge: 60,
        return_trip_charge: 45,
        return_trip_chargable: true,
        collection_chargable: false,
        headoff_delivery_charges: false,
        headoff_return_trip_waived: false,
        quotation_id: "1",
        contact_person: [
          {
            id: "12",
            profile_url: null,
            person_name: "Strauss",
            profile: null,
            email: "strauss@nc.com",
            contact_no: "11",
            designation: "Boss",
            type: "cost_centre",
            type_id: "7",
          },
        ],
        siteOfficeCharges: {
          "Charge Per Trip": null,
          "Return Trip Charge (By Amount)": 45,
          "Head Off Delivery Charges": 60,
        },
        siteOfficeChargesPreferences: {
          "Return Trip Chargeable (Per Trip)": true,
        },
      },
      {
        trip_schedule: [
          {
            id: "1",
            trip_no: 1,
            from: "1970-01-01T14:46:00.000Z",
            to: "1970-01-01T15:46:00.000Z",
            day: "Weekdays",
            type: "Open",
            fromraw_time: "1970-01-01T14:46:00.000Z",
            toraw_time: "1970-01-01T15:46:00.000Z",
          },
        ],
        id: "4",
        cost_centre_name: "Jacked",
        postal_code: "222",
        country: "C1",
        state: "C1",
        building_name: "Jackie Tower",
        floor_no: "21",
        unit_no: "11",
        address: "Yolo",
        site_office: true,
        region: null,
        route: null,
        charge_per_trip: null,
        head_off_delivery_charge: 77,
        return_trip_charge: 56,
        return_trip_chargable: true,
        collection_chargable: false,
        headoff_delivery_charges: false,
        headoff_return_trip_waived: false,
        quotation_id: "1",
        contact_person: [
          {
            id: "13",
            profile_url: null,
            person_name: "Jill",
            profile: null,
            email: "jill@nc.com",
            contact_no: "133",
            designation: "Boss",
            type: "cost_centre",
            type_id: "8",
          },
        ],
        siteOfficeCharges: {
          "Charge Per Trip": null,
          "Return Trip Charge (By Amount)": 56,
          "Head Off Delivery Charges": 77,
        },
        siteOfficeChargesPreferences: {
          "Return Trip Chargeable (Per Trip)": true,
        },
      },
    ],



    defaultexpressContractFSR: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    ExpressContractProjectJobsTimeLineData: [
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
    
  },

  mutations: {
    fetchDefaultexpressContractFSRTimeLineData(state, data) {
      state.ExpressContractProjectJobsTimeLineData = [];
      state.ExpressContractProjectJobsTimeLineData = data;
    },
    fetchexpressContractFSRTimeLineData(state, data) {
      state.ExpressContractProjectJobsTimeLineData.push(data);
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchExpressContractProjectJobsOverviewData(state, data) {
      state.ExpressContractProjectJobOverviewData = data;
    },
    fetchExpressContractProjectJobsEditData(state, data) {
      state.ExpressContractProjectJobsEditData = data;
    },
  },

  actions: {
    resetExpressContractProjectsJobsTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractFSRTimeLineData", data);
    },
    updateExpressContractProjectsJobsTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractFSRTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    resetDialogData({ commit }) {
      commit("resetDialogData");
    },
    async setQuotationOverviewData({ commit }, { type, id }) {
      let apiType = type || 'quotations'
      if (type == 'quotation') {
        apiType = 'quotations'
      }
      const res = await axios.get(`/sales/${apiType}/overview/` + id);

      if (res) {
        commit("setQuotationOverviewData", res.data.results || {});
      }
    },
  
  async loadExpressContractProjectJobsOverviewData({ commit }, { id }) {
    await axios.get("/sales/quotations/overview/" + id).then((res) => {
      if (res.data.results) {
        commit("fetchExpressContractProjectJobsOverviewData", res.data.results);
      }
    });
  },
  async loadExpressContractProjectJobsEditData({ commit }, id) {
    const res = await axios.get(`/sales/quotations/overview/` + id);

    if (res) {
      commit("fetchExpressContractProjectJobsEditData", res.data.results || {});
    }
  },
  loadSalesPersonData({ commit }, { path }) {
    axios.get(path).then((res) => {
      if (res.data) {
        commit("fetchSalesPersonData", res.data.results);
      }
    });
  },

  loadSalesPersonDataPatch({ commit }, { path, id, payload }) {
    axios.patch(path + id, payload).then((res) => {
      commit("fetchSalesPersonDataPatch", res.data);
    });
  },
},
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    expressContractProjectJobsAddNewData: ({ expressContractProjectJobsAddNewData }) =>
    expressContractProjectJobsAddNewData,

    ExpressContractProjectJobsEditData: ({ ExpressContractProjectJobsEditData }) =>
    ExpressContractProjectJobsEditData,
      
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};

export default salesExpressContractProjectJobs;
