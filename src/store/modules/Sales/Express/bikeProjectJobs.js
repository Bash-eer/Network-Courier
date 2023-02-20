import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractBikeProjectJobs = {
  namespaced: true,
  state: {
    currentStep: 1,
    quotationData: null,
    quotationDataOverview: null,
    selectedRateCardId: null,
    payloadData: { contacts: [{}] },
    TimeLineCurrentTab: "Overview",
    expressContractBikeProjectJobsTimeLineCurrentTab: "Overview",
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    globalSearch: "",
    dialogComponent: null,
    dialogHeader: null,
    SalesPersonData: [],
    SalesPersonDataPatch: null,
    SalesPersonDataTimeLineHeader: {},
    SalesPersonDataDropdown: {},
    //attachment
    expressContractBikeProjectJobsQuotationFiles: [],
    deletedexpressContractBikeProjectJobsQuotationFiles: [],
    expressContractBikeProjectJobsQuotationAttachmentStateData: {},
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
    defaultexpressContractVanTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    expressContractBikeProjectJobsTimeLine: [
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
  },
  mutations: {
    fetchexpressContractBikeProjectJobsTimeLineData(state, data) {
      state.expressContractBikeProjectJobsTimeLine.push(data);
    },
    fetchDefaultexpressContractBikeProjectJobsTimeLineData(state, data) {
      state.expressContractBikeProjectJobsTimeLine = [];
      state.expressContractBikeProjectJobsTimeLine = data;
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
    setPayloadData(state, { key, value, idx }) {
      if (!isNaN(idx)) {
        state.payloadData[key][idx] = value;
      } else if (key) {
        state.payloadData[key] = { ...state.payloadData[key], ...value };
      } else {
        state.payloadData = { ...state.payloadData, ...value };
      }
    },
    resetDialogData(state) {
      state.currentStep = 1;
      state.quotationData = null;
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
    async saveData(_, payload) {
      return await axios.post("/sales/quotation", payload);
    },
    async editData(_, { type, id, payload }) {
      let apiType = type || 'quotation'

      return await axios.patch(`/sales/${apiType}/` + id, payload);
    },
    async setQuotationData({ commit }, { type, id }) {
      let apiType = type || 'quotations'
      if (type == 'quotation') {
        apiType = 'quotations'
      }
      const res = await axios.get(`/sales/${apiType}/overview/` + id);

      if (res) {
        commit("setQuotationData", res.data.results || {});
      }
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
    setSelectedRateCardId({ commit }, payload) {
      commit("setSelectedRateCardId", payload);
    },
    setCurrentStep({ commit }, payload) {
      commit("setCurrentStep", payload);
    },
    setPayloadData({ commit }, payload) {
      commit("setPayloadData", payload);
    },

    resetExpressBikeProjectJobsTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractBikeProjectJobsTimeLineData", data);
    },
    updateExpressContractBikeProjectJobsTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractBikeProjectJobsTimeLineData", data);
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
    loadSalesPersonDataTimeLineHeader({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },
    loadSalesPersonDataDropdown({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
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

          if (id) {
            dispatch(loadData, { id });
          } else {
            // dispatch(loadData);
            dispatch(
              "salesExpressContractBikeProjectJobs/loadexpressQuotationOverviewData",
              { id: id },
              { root: true }
            );
          }

          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
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
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    currentStep: ({ currentStep }) => currentStep,
    payloadData: ({ payloadData }) => payloadData,
    selectedRateCardId: ({ selectedRateCardId }) => selectedRateCardId,
    quotationData: ({ quotationData }) => quotationData,
    quotationDataOverview: ({ quotationDataOverview }) => quotationDataOverview,
    expressContractBikeFSRQuotationAttachmentStateData: ({
      expressContractBikeFSRQuotationAttachmentStateData,
    }) => expressContractBikeFSRQuotationAttachmentStateData,
  },
};

export default salesExpressContractBikeProjectJobs;
