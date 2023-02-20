import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractBikeFSR = {
  namespaced: true,
  state: {
    currentStep: 1,
    expressContractBikeFSRCurrentTab: "Overview",
    quotationData: null,
    quotationDataOverview: null,
    selectedRateCardId: null,
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    addRegionDeliveryTransportType: null,
    dialogComponent: null,
    dialogHeader: null,
    SalesPersonData: [],
    SalesPersonDataPatch: null,
    SalesPersonDataTimeLineHeader: {},
    SalesPersonDataDropdown: {},
    //post api data
    expressContractBikeFSRAddNewData: {
      quotation: {},
    },
    expressContractBikeFsrOverviewData: [],
    //patch api data
    expressContractBikeFSREditData: [],
    expressContractBikeFSRContactData: [],
    // Attachment
    bikeFSRAttachmentsStateData: {},
    bikeFSRAttachmentsFiles: [],
    deletedBikeFSRAttachmentsFiles: [],

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

    timeLineExpressContractBikeFSRCostCenterTableData: [
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

    defaultexpressContractBikeFSR: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    ExpressContractBikeFSRTimeLineData: [
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
  },

  mutations: {
    fetchDefaultexpressContractBikeFSRTimeLineData(state, data) {
      state.ExpressContractBikeFSRTimeLineData = [];
      state.ExpressContractBikeFSRTimeLineData = data;
    },
    fetchexpressContractBikeFSRTimeLineData(state, data) {
      state.ExpressContractBikeFSRTimeLineData.push(data);
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },

    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    setCurrentStep(state, payload) {
      state.currentStep = payload;
    },
    setSelectedRateCardId(state, payload) {
      state.selectedRateCardId = payload;
    },
    setQuotationData(state, payload) {
      state.quotationData = payload;
    },
    setQuotationOverviewData(state, payload) {
      state.quotationDataOverview = payload;
    },
    fetchexpressContractBikeFsrOverviewData(state, data) {
      state.expressContractBikeFsrOverviewData = data;
    },
    fetchCreateQuotationExpressContractBikeFsr(state, data) {
      state.ExpressContractBikeFsr = data;
    },
    resetDialogData(state) {
      state.currentStep = 1;
      state.quotationData = null;
      state.quotationDataOverview = null;
      state.payload = { contacts: [{}] };
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },

    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },
    fetchSalesPersonDataTimeLineHeader(state, data) {
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.SalesPersonDataDropdown = data;
    },
    //add region duo selection
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
  },

  actions: {
    async getRateSuggestion(_, { id, payload }) {
      return await axios.post(
        "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/bike/" +
          id,
        payload
      );
    },
    async getRegionData() {
      return await axios.get(
        "/settings/sales/rates/express/contract/dropdowns/regions"
      );
    },
    async getRatesData(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/dropdowns/regions/ratecards/" +
          id
      );
    },
    async getTripsData(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/dropdowns/region/trips/bike/" +
          id
      );
    },
    async getSurchargersData(_, id) {
      return await axios.get(
        "/settings/sales/rates/express/contract/ratecards/AdditionalSurcharges/" +
          id
      );
    },
    async BikeCustomerVanjob(_, id) {
      return await axios.get(
        "settings/sales/rates/express/contract/ratecards/normalcharges/ratejobsugession/bike/" +
          id
      );
    },
    setCurrentStep({ commit }, payload) {
      commit("setCurrentStep", payload);
    },
    resetExpressContractBikeFSRTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractBikeFSRTimeLineData", data);
    },
    updateExpressContractBikeFSRTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractBikeFSRTimeLineData", data);
    },
    setSelectedRateCardId({ commit }, payload) {
      commit("setSelectedRateCardId", payload);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //add region duo selection
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit("addRegionDeliveryTransportTypeMutation", type);
    },
    async setQuotationData({ commit }, { type, id }) {
      console.log(type, "Contract hit", id);
      let apiType = type || "quotations";
      if (type == "quotation") {
        apiType = "quotations";
      }
      const res = await axios.get(`/sales/${apiType}/overview/` + id);

      if (res) {
        commit("setQuotationOverviewData", res.data.results || {});
        commit("setQuotationData", res.data.results || {});
      }
    },
    async setQuotationOverviewData({ commit }, id) {
      const res = await axios.get(`/sales/quotations/overview/` + id);
      if (res) {
        commit("setQuotationData", res.data.results || {});
      }
    },

    resetDialogData({ commit }) {
      commit("resetDialogData");
    },
    //TIME LINE APIS
    //Bill Preferences
    // eslint-disable-next-line no-unused-vars
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
      // eslint-disable-next-line no-unused-vars
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

    //attachments
    // eslint-disable-next-line no-unused-vars
    loadAttachments({ dispatch, commit, state, rootState }) {
      // eslint-disable-next-line no-unused-vars
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
      // eslint-disable-next-line no-unused-vars
      axios.get("followUp/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          console.log(res);
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
    // Create Quotation
    createQuotationExpressContractBikeFsr({ commit }, { data }) {
      commit("fetchCreateQuotationExpressContractBikeFsr", data);
    },

    async loadexpressContractBikeFsrOverviewData({ commit }, { id }) {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "overv");
          commit("fetchexpressContractBikeFsrOverviewData", res.data.results);
        }
      });
    },
    loadSalesPersonDataTimeLineHeader({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },
    loadSalesPersonDataDropdown({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchloadSalesPersonDataDropdown", res?.data?.results);
        }
      });
    },
    // Post & Patch Operations
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData, id }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          console.log(loadData, "load");
          if (id) {
            dispatch(loadData, { id });
          } else {
            // dispatch(loadData);
            dispatch(
              "salesRapidoContract/loadRapidoContractOverviewData",
              { id: id },
              { root: true }
            );
          }

          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
          console.log(err);
          toastData.toastCommonErrorData.toastMsg = err.response.data.message;

          commit("toastMutation", toastData.toastCommonErrorData);
        });
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
    bikeFSRAttachmentsStateData: ({ bikeFSRAttachmentsStateData }) =>
      bikeFSRAttachmentsStateData,

    controlActivityDialog(state) {
      state.displayDialog = true;
    },

    currentStep: ({ currentStep }) => currentStep,
    selectedRateCardId: ({ selectedRateCardId }) => selectedRateCardId,
    quotationData: ({ quotationData }) => quotationData,
    quotationDataOverview: ({ quotationDataOverview }) => quotationDataOverview,

    expressContractBikeFsrOverviewData: ({
      expressContractBikeFsrOverviewData,
    }) => expressContractBikeFsrOverviewData,

    expressContractBikeFSRAddNewData: ({ expressContractBikeFSRAddNewData }) =>
      expressContractBikeFSRAddNewData,

    expressContractBikeFSRContactData: ({
      expressContractBikeFSRContactData,
    }) => expressContractBikeFSRContactData,
  },
};

export default salesExpressContractBikeFSR;
