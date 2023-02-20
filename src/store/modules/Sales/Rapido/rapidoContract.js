import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

import Contract from "./contract";

const salesRapidoContract = {
  namespaced: true,

  state: {
    rapidoContractTimeLineCurrentTab: "Overview",
    rawBillingPreferencesData: null,
    billingPreferencesData: [],
    addClearanceChargesType: null,
    addCODChargesType: null,
    addDeliveryChargesType: null,
    eCommerceVanDuoType: null,
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    dialogComponent: null,
    dialogHeader: null,
    rapidoQuotationOverviewData: [],
    RapidoContractOverviewData: [],
    //attachment
    rapidoContractQuotationFiles: [],
    deletedrapidoContractQuotationFiles: [],
    rapidoContractQuotationAttachmentStateData: {},
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
    internationalRegionsTripTableData: null,
    rapidoRegionsTripTableColumnData: [
      { field: "location_name", header: "Name" },
      { field: "address", header: "Address" },
      { field: "location_id", header: "Location ID" },
      { field: "remarks", header: "Remarks" },
      { field: "default", header: "Default" },
      { field: "default_pick_up", header: "Default Pickup" },
      { field: "pickup_cutoff_time", header: "Pickup Cutoff Time" },
    ],

    timeLineRapidoCostCenterTableData: [
      // {
      //   trip_schedule: [
      //     {
      //       id: "1",
      //       name: "Location 1",
      //       address: "No.1 Second Chin Bee",
      //       location_id: "SDSDC55",
      //       remarks: "Mon-Fri 9:30Am",
      //       default: "Yes",
      //       default_pickup: "Van",
      //       pickup_time: "9:00 Am",
      //     },
      //   ],
      //   id: "1",
      //   cost_centre_name: "Cost Centre One",
      //   postal_code: "222",
      //   country: "C1",
      //   state: "C1",
      //   building_name: "NC Office",
      //   floor_no: "10",
      //   unit_no: "1",
      //   address: "NC Avenue",
      //   site_office: true,
      //   region: null,
      //   route: null,
      //   charge_per_trip: null,
      //   head_off_delivery_charge: 30,
      //   return_trip_charge: 20,
      //   return_trip_chargable: true,
      //   collection_chargable: true,
      //   headoff_delivery_charges: false,
      //   headoff_return_trip_waived: false,
      //   quotation_id: "1",
      //   // address:"No.1 Second Chin Bee",
      //   address_pincode: "238801",
      //   contact_person: [
      //     {
      //       id: "2",
      //       profile_url: null,
      //       person_name: "Jack",
      //       profile: null,
      //       email: "jack@nc.com",
      //       contact_no: "122",
      //       designation: "Admin",
      //       type: "cost_centre",
      //       type_id: "1",
      //     },
      //   ],
      //   siteOfficeCharges: {
      //     "Charge Per Trip": null,
      //     "Return Trip Charge (By Amount)": 20,
      //     "Head Off Delivery Charges": 30,
      //   },
      //   siteOfficeChargesPreferences: {
      //     "Return Trip Chargeable (Per Trip)": true,
      //     "Collection Chargable": true,
      //   },
      // },
      // {
      //   trip_schedule: [
      //     {
      //       id: "1",
      //       name: 1,
      //       address: "1970-01-01T14:46:00.000Z",
      //       location_id: "ZWADAA33",
      //       remarks: "Mon-Fri 9:30Am",
      //       default: "Yes",
      //       default_pickup: "Van",
      //       pickup_time: "9:00 Am",
      //     },
      //   ],
      //   id: "2",
      //   cost_centre_name: "Cost Center Two",
      //   postal_code: "1",
      //   country: "C1",
      //   state: "C1",
      //   building_name: "test9",
      //   floor_no: "",
      //   unit_no: "56",
      //   address: "NC TOWers",
      //   site_office: true,
      //   region: null,
      //   route: null,
      //   charge_per_trip: null,
      //   head_off_delivery_charge: 1,
      //   return_trip_charge: 2,
      //   return_trip_chargable: true,
      //   collection_chargable: true,
      //   headoff_delivery_charges: false,
      //   headoff_return_trip_waived: false,
      //   quotation_id: "1",
      //   contact_person: [
      //     {
      //       id: "6",
      //       profile_url: null,
      //       person_name: "Josh",
      //       profile: null,
      //       email: "josh@nc.com",
      //       contact_no: "11",
      //       designation: "admin",
      //       type: "cost_centre",
      //       type_id: "2",
      //     },
      //   ],
      //   siteOfficeCharges: {
      //     "Charge Per Trip": null,
      //     "Return Trip Charge (By Amount)": 2,
      //     "Head Off Delivery Charges": 1,
      //   },
      //   siteOfficeChargesPreferences: {
      //     "Return Trip Chargeable (Per Trip)": true,
      //     "Collection Chargable": true,
      //   },
      // },
      // {
      //   trip_schedule: [
      //     {
      //       id: "1",
      //       name: "Location 2",
      //       address: "No.1 Second Chin Bee",
      //       location_id: "SDSA42",
      //       remarks: "Mon-Fri 9:30Am",
      //       default: "Yes",
      //       default_pickup: "Van",
      //       pickup_time: "9:00 Am",
      //     },
      //   ],
      //   id: "3",
      //   cost_centre_name: "Levi's Centre",
      //   postal_code: "12",
      //   country: "C1",
      //   state: "C1",
      //   building_name: "Blue Hills",
      //   floor_no: "10",
      //   unit_no: "89",
      //   address: "Jeans Street",
      //   site_office: null,
      //   region: null,
      //   route: null,
      //   charge_per_trip: null,
      //   head_off_delivery_charge: 60,
      //   return_trip_charge: 45,
      //   return_trip_chargable: true,
      //   collection_chargable: false,
      //   headoff_delivery_charges: false,
      //   headoff_return_trip_waived: false,
      //   quotation_id: "1",
      //   contact_person: [
      //     {
      //       id: "12",
      //       profile_url: null,
      //       person_name: "Strauss",
      //       profile: null,
      //       email: "strauss@nc.com",
      //       contact_no: "11",
      //       designation: "Boss",
      //       type: "cost_centre",
      //       type_id: "7",
      //     },
      //   ],
      //   siteOfficeCharges: {
      //     "Charge Per Trip": null,
      //     "Return Trip Charge (By Amount)": 45,
      //     "Head Off Delivery Charges": 60,
      //   },
      //   siteOfficeChargesPreferences: {
      //     "Return Trip Chargeable (Per Trip)": true,
      //   },
      // },
      // {
      //   trip_schedule: [
      //     {
      //       id: "1",
      //       name: "Location 1",
      //       address: "No.1 Second Chin Bee",
      //       location_id: "BTDZ321",
      //       remarks: "Mon-Fri 9:30Am",
      //       default: "Yes",
      //       default_pickup: "van",
      //       pickup_time: "9:00 Am",
      //     },
      //   ],
      //   id: "4",
      //   cost_centre_name: "Jacked",
      //   postal_code: "222",
      //   country: "C1",
      //   state: "C1",
      //   building_name: "Jackie Tower",
      //   floor_no: "21",
      //   unit_no: "11",
      //   address: "Yolo",
      //   site_office: true,
      //   region: null,
      //   route: null,
      //   charge_per_trip: null,
      //   head_off_delivery_charge: 77,
      //   return_trip_charge: 56,
      //   return_trip_chargable: true,
      //   collection_chargable: false,
      //   headoff_delivery_charges: false,
      //   headoff_return_trip_waived: false,
      //   quotation_id: "1",
      //   contact_person: [
      //     {
      //       id: "13",
      //       profile_url: null,
      //       person_name: "Jill",
      //       profile: null,
      //       email: "jill@nc.com",
      //       contact_no: "133",
      //       designation: "Boss",
      //       type: "cost_centre",
      //       type_id: "8",
      //     },
      //   ],
      //   siteOfficeCharges: {
      //     "Charge Per Trip": null,
      //     "Return Trip Charge (By Amount)": 56,
      //     "Head Off Delivery Charges": 77,
      //   },
      //   siteOfficeChargesPreferences: {
      //     "Return Trip Chargeable (Per Trip)": true,
      //   },
      // },
    ],

    //rapido tabs data
    rapidoDataTableTab1: [
      {
        SNo: "1",
        "Size Name": "Small",
        "Weight (Kg)": "0-5",
        "Measurements (Cm)": "0-20",
        "Rates ($)": "10",
      },
      {
        SNo: "2",
        "Size Name": "Medium",
        "Weight (Kg)": "5-10",
        "Measurements (Cm)": "20-40",
        "Rates ($)": "20",
      },
      {
        SNo: "3",
        "Size Name": "Large",
        "Weight (Kg)": "10-15",
        "Measurements (Cm)": "30-50",
        "Rates ($)": "20",
      },
    ],
    rapidoDataTableTab2: [
      {
        SNo: "1",
        "Size Name": "Small",
        "Weight (Kg)": "0-5",
        "Measurements (Cm)": "0-20",
        "Rates ($)": "10",
      },
      {
        SNo: "2",
        "Size Name": "Medium",
        "Weight (Kg)": "5-10",
        "Measurements (Cm)": "20-40",
        "Rates ($)": "20",
      },
    ],
    rapidoDataTableTab3: [
      {
        SNo: "1",
        "Size Name": "Small",
        "Weight (Kg)": "0-5",
        "Measurements (Cm)": "0-20",
        "Rates ($)": "10",
      },
      {
        SNo: "2",
        "Size Name": "Medium",
        "Weight (Kg)": "5-10",
        "Measurements (Cm)": "20-40",
        "Rates ($)": "20",
      },
      {
        SNo: "3",
        "Size Name": "Large",
        "Weight (Kg)": "10-15",
        "Measurements (Cm)": "30-50",
        "Rates ($)": "20",
      },
      {
        SNo: "4",
        "Size Name": "Medium",
        "Weight (Kg)": "5-10",
        "Measurements (Cm)": "20-40",
        "Rates ($)": "20",
      },
      {
        SNo: "5",
        "Size Name": "Large",
        "Weight (Kg)": "10-15",
        "Measurements (Cm)": "30-50",
        "Rates ($)": "20",
      },
    ],
    //rapido data table columns
    rapidoTableColumnData: [
      { field: "SNo", header: "SNo" },
      { field: "Size Name", header: "Size Name" },
      { field: "Weight (Kg)", header: "Weight (Kg)" },
      { field: "Measurements (Cm)", header: "Measurements (Cm)" },
      { field: "Rates ($)", header: "Rates ($)" },
    ],

    defaultInternationalContractTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    RapidoContractTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetail",
      },
      {
        index: 2,
        color: "#ffff",
        markerComponent: "TripSchedules",
      },
      {
        index: 3,
        color: "#ffff",
        markerComponent: "BillSettings",
      },
      {
        index: 4,
        color: "#ffff",
      },
    ],
  },
  mutations: {
    fetchRapidoContractTimeLineData(state, data) {
      state.RapidoContractTimeLine.push(data);
    },
    fetchDefaultRapidoContractTimeLineData(state, data) {
      state.RapidoContractTimeLine = [];
      state.RapidoContractTimeLine = data;
    },
    fetchBillingPreferencesData(state, data) {
      state.billingPreferencesData = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchRapidoContractOverviewData(state, data) {
      state.RapidoContractOverviewData = data;
    },
  },
  actions: {
    resetRapidoContractTimeLineData({ commit }, { data }) {
      commit("fetchDefaultRapidoContractTimeLineData", data);
    },
    updateRapidoContractTimeLineData({ commit }, { data }) {
      commit("fetchRapidoContractTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //eslint-disable-next-line no-unused-vars
    async loadRapidoContractOverviewData({ commit }, { id, type }) {
      // axios.get("/salesCompany").then((res) => {
      let processedType;
      if (type == "quotation" || type == "quotation") {
        processedType = "quotations";
      } else processedType = "contract";
      await axios
        .get("/sales/" + processedType + "/overview/" + id)
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "resultOverview", type);
            commit("fetchRapidoContractOverviewData", res.data.results);
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
    RapidoContractOverviewData: ({ RapidoContractOverviewData }) =>
      RapidoContractOverviewData,
    rapidoContractQuotationAttachmentStateData: ({
      rapidoContractQuotationAttachmentStateData,
    }) => rapidoContractQuotationAttachmentStateData,
  },
  modules: {
    Contract,
  },
};
export default salesRapidoContract;
