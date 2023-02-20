import axios from "axios";
import ToastMessages from "../../../../components/Reusables/ToastMessages.vue";
const { URL } = require("../../../../../config/const");
import { errhandler } from "@/services/httpClient";
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContract = {
  namespaced: true,
  state: {
    TimeLineCurrentTab: "Overview",
    expressContractVanTimeLineCurrentTab: "Overview",
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    globalSearch: "",
    dialogComponent: null,
    dialogHeader: null,
    updateType: "quotation",
    expressQuotationOverviewData: [],
    stepperNavigation: null,
    payloadPost: {},
    OverviewData: null,
    expressContractData: null,
    flowStep: 0,
    flowStepCount:0,
    regions: [],
    regions_trips: [],
    cost_routes: [],
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
    timeLineExpressContractVanCostCenterTableData: [
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

    defaultexpressContractVanTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    expressContractVanTimeLine: [
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
        markerComponent: "BillSettings",
      },
      {
        index: 3,
        color: "#ffff",
      },
    ],
    dynamicFlowStep: [
      {
        component: "SalesExpressContractThirdStep",
        name: "Trip Details",
      },
      {
        component: "SalesExpressContractVanFourthStep",
        name: "Costing Details (Van)",
      },
      {
        component: "SalesExpressContractBikeFourthStep",
        name: "Costing Details (Bike)",
      },
      {
        component: "SalesExpressContractFSRFourthStep",
        name: "Costing Details (FSR)",
      },
      {
        component: "SalesExpressContractFifthStep",
        name: "Contract",
      },
    ],
    ExpressContractFlowStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractSecondStep",
        name: "Select Method",
      },
    ],
    staticFlowStep: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractSecondStep",
        name: "Select Method",
      },
    ],
  },
  mutations: {
    payloadPostData(state, type) {
      state.payloadPost = type;
    },

    setStateValue(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
    setflowStep(state, payload) {
      state.flowStep = state.flowStep + payload;
    },
    setflowStepCount(state, payload) {
      state.flowStepCount = state.flowStepCount + payload;
    },
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    fetchexpressContractVanTimeLineData(state, data) {
      state.expressContractVanTimeLine.push(data);
    },
    fetchDefaultexpressContractVanTimeLineData(state, data) {
      state.expressContractVanTimeLine = [];
      state.expressContractVanTimeLine = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchOverviewData(state, data) {
      state.OverviewData = data;
    },
    clearQuotationData(state) {
      state.OverviewData = null;
    },
    clearExpressContractData(state) {
      state.expressContractData = null;
    },
    setExpressContractData(state, { key, value, idx, key1, key2 }) {
      if (!isNaN(idx)) {
        state.expressContractData[key][idx] = value;
      } else if (key && key1 && key2) {
        if (state.expressContractData[key][key1] === undefined) {
          let obj = {};
          obj[key2] = {};
          state.expressContractData[key][key1] = obj;
        }
        // if (state.expressContractData[key][key1][key2] === undefined) {
        //   state.expressContractData[key][key1] = {};
        // }
        state.expressContractData[key][key1][key2] = {
          ...state.expressContractData[key][key1][key2],
          ...value,
        };
      } else if (key && key1) {
        state.expressContractData[key][key1] = {
          ...state.expressContractData[key][key1],
          ...value,
        };
      } else if (key) {
        state.expressContractData[key] = {
          ...state.expressContractData[key],
          ...value,
        };
      } else {
        state.expressContractData = {
          ...state.expressContractData,
          ...value,
        };
      }
    },
  },
  actions: {
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    resetExpressVanTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractVanTimeLineData", data);
    },
    updateExpressContractVanTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractVanTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    setPayloadPostData({ commit }, { type }) {
      commit("payloadPostData", type);
    },
    setExpressContractData({ commit }, payload) {
      commit("setExpressContractData", payload);
    },
    clearExpressContractData({ commit }, payload) {
      commit("clearExpressContractData", payload);
    },
    setEXCStateValue({ commit }, data) {
      commit("setStateValue", data);
    },
    async getEmployees() {
      return await axios.get(`/settings/all-user/dropdown`);
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
    async getRegion({ commit }) {
      const res = await axios.get(
        "/settings/sales/rates/express/contract/dropdowns/regions"
      );
      commit("setStateValue", { regions: res.data.results });
      return res;
    },
    async getRegionTrips({ commit }, { id }) {
      const res = await axios.get(
        `/settings/sales/rates/express/contract/dropdowns/region/trips/bike/` +
        id
      );
      commit("setStateValue", { regions_trips: res.data.results });
    },
    async getRoutes({ commit }) {
      const res = await axios.get(`/operations/routes/dropdown`);
      commit("setStateValue", { cost_routes: res.data.results });
    },
    async getRatesData(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/dropdowns/regions/ratecards/" +
        id
      );
    },
    async getTripByRates(_, { id, type }) {
      return await axios.get(
        `/settings/sales/rates/express/contract/dropdowns/ratecards/selected/trips/${type}/` +
        id
      );
    },
    async normalVanUrgent(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/vansurcharge/suggesstion/" +
        id
      );
    },
    async multiQty(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/multitire/quantity/suggesstion/" +
        id
      );
    },
    async multiJob(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/multitire/suggesstion/jobcount/" +
        id
      );
    },
    async deliverTypes(_, { id, type }) {
      return await axios.get(
        `/settings/sales/rates/express/contract/ratecards/ecommercecharges/delivery_types/${type}/` +
        id
      );
    },
    async bikeCustomerVanJobs(_, id) {
      return await axios.get(
        `/settings/sales/rates/express/contract/ratecards/ecommerce/box-charges/` +
        id
      );
    },
    async otherCharges(_, { id, type }) {
      return await axios.get(
        `/settings/sales/rates/express/contract/ratecards/include-charges/${type}/` +
        id
      );
    },
    async getSurcharges(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/AdditionalSurcharges/" +
        id
      );
    },
    async getChargeWeight(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/Twotire/suggesstion/weight/" +
        id
      );
    },
    async getTwoBoxQty(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/Twotire/suggesstion/quantity/" +
        id
      );
    },
    async getTwoBoxCount(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/normal/Twotire/suggesstion/boxcharges/" +
        id
      );
    },
    async getJobByUnit(_, { id, payload, type, toast }) {
      return axios
        .post(
          `/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/${type}/` +
          id,
          payload
        )
        .then((res) => {
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getECommerceByUnit(_, { id, payload, type, toast }) {
      return await axios
        .post(
          `/settings/sales/rates/express/contract/ratecards/ecommercecharges/ratesugession/${type}/` +
          id,
          payload
        )
        .then((res) => {
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async saveExPressVan(_, payload) {
      return await axios.post(`/sales/quotation`, payload);
    },
    async editExPressVan(_, { id, payload }) {
      return await axios.patch(`/sales/quotation/` + id, payload);
    },
    clearQuotationData({ commit }) {
      commit("clearQuotationData");
    },
    async costCenterAction(_, { method, id, payload, toast, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      let url = `/sales/${processedType}/cost-center`;
      if (method != "POST") {
        url = url + `/${id}`;
      }
      return axios({
        url: url,
        method: method,
        data: payload,
      })
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data.results ?? "",
            life: 3000,
          });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async loadOverviewData({ commit }, { id, type }) {
      console.log("set_type0999", set_type);
      let set_type = type.includes("quotation") ? "quotations" : "contract";
      console.log("set_type0", set_type);
      await axios.get(`/sales/${set_type}/overview/` + id).then((res) => {
        if (res.data.results) {
          commit("fetchOverviewData", res.data.results);
        }
      });
    },
    loadBillPreferences({ commit, state }) {
      state.billingPreferencesData = [];
      state.rawBillingPreferencesData = null;
      axios.get("billPreferences/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          if (res.data.results != null) {
            state.rawBillingPreferencesData = res.data.results;
            let billPreferenceDetails = [];
            let billPreferncesData = res.data.results;
            let billPreferenceDetailsObj = {};
            let invoiceNotificationsObj = {};
            let invoiceAttachmentsObj = {};
            let attachmentFormatsObj = {};
            for (let bp in billPreferncesData) {
              if (bp == "billing_address") {
                billPreferenceDetailsObj[bp] = billPreferncesData[bp];
              }
              if (bp == "email" || bp == "by_sms" || bp == "by_post") {
                if (billPreferncesData[bp] == true) {
                  invoiceNotificationsObj[bp] = billPreferncesData[bp];
                }
              }
              if (
                bp == "costing_work_sheet" ||
                bp == "groupwise_costing_work_sheet" ||
                bp == "for_less_than_min_qty" ||
                bp == "detailed_job_summary" ||
                bp == "groupwise_detailed_job_summary" ||
                bp == "caller_costing_work_sheet" ||
                bp == "job_detail_report"
              ) {
                if (billPreferncesData[bp] == true) {
                  invoiceAttachmentsObj[bp] = billPreferncesData[bp];
                }
              }
              if (
                bp == "rich_text_format" ||
                bp == "microsoft_word" ||
                bp == "excel_file" ||
                bp == "html" ||
                bp == "pdf" ||
                bp == "view_attachment_online"
              ) {
                if (billPreferncesData[bp] == true) {
                  attachmentFormatsObj[bp] = billPreferncesData[bp];
                }
              }
            }
            billPreferenceDetailsObj["invoice_notifications"] = [
              invoiceNotificationsObj,
            ];
            billPreferenceDetailsObj["invoice_attachments"] = [
              invoiceAttachmentsObj,
            ];
            billPreferenceDetailsObj["attachment_formats"] = [
              attachmentFormatsObj,
            ];
            billPreferenceDetails.push(billPreferenceDetailsObj);
            commit("fetchBillingPreferencesData", billPreferenceDetails);
            state.tableLoad = false;
          }
        }
      });
    },

    billPreferencesCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "billPreferences",
          loadApi: "loadBillPreferences",
          toastTag: "billPreference",
          tag: tag,
          data: data,
        });
      }
      if (tag == "update") {
        dispatch("commonCRUD", {
          basePath: "billPreferences/",
          loadApi: "loadBillPreferences",
          toastTag: "billPreference",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },

    loadCostCentres({ commit, state }) {
      axios.get("costCentre/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          for (let cs in res.data.results) {
            let apiPath;
            apiPath = "?type=cost_centre&type_id=" + res.data.results[cs].id;
            axios.get("contact/person" + apiPath).then((contacts_res) => {
              res.data.results[cs]["contact_person"] =
                contacts_res.data.results;
            });
          }
          setTimeout(() => {
            commit("fetchCostCentresTableData", res.data.results);
            state.tableLoad = false;
          }, 1000);
        }
      });
    },

    costCentresCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "costCentre",
          loadApi: "loadCostCentres",
          toastTag: "costCenter",
          tag: tag,
          data: data,
        });
      }
      if (tag == "update") {
        dispatch("commonCRUD", {
          basePath: "costCentre/",
          loadApi: "loadCostCentres",
          toastTag: "costCenter",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },

    loadAttachments({ commit, state, rootState }) {
      axios.get("attachment/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          commit("fetchAttachmentsTableData", res.data.results);
          rootState["users"].displayDialog = false;
          state.tableLoad = false;
        }
      });
    },

    AttachmentsCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "attachment/",
          loadApi: "loadAttachments",
          toastTag: "attachments",
          tag: tag,
          data: data,
        });
      }
    },

    loadFollowUp({ commit, state, rootState }) {
      axios.get("followUp/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          commit("fetchFollowUp", res.data.results);
          rootState["users"].displayDialog = false;
          state.tableLoad = false;
        }
      });
    },

    FollowUpCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "followUp/",
          loadApi: "loadFollowUp",
          toastTag: "followUp",
          tag: tag,
          data: data,
        });
      }
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    OverviewData: ({ OverviewData }) => OverviewData,
    flowStep: ({ flowStep }) => flowStep,
    flowStepCount: ({ flowStepCount }) => flowStepCount,
    ExpressContractFlowStepperData: ({ ExpressContractFlowStepperData }) =>
      ExpressContractFlowStepperData,
  },
};

export default salesExpressContract;
