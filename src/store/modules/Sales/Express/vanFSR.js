import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractVanFSR = {
  namespaced: true,
  state: {
    expressContractVanFSRCurrentTab: "Overview",
    contactsStateData: [],
    costingCentreCreationStateData: {},
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    dialogComponent: null,
    dialogHeader: null,
    expressQuotationOverviewData: [],
    SalesPersonData: [],
    SalesPersonDataPatch: null,
    ExpressContractFsrOverviewEditData: null,
    ExpressContractFsrDialogFestivalDropDown: null,
    ExpressContractFsrDialogReferenceDropDown: null,
    ExpressContractFsrDialogCompetitorDropDown: null,
    SalesPersonDataTimeLineHeader: {},
    expressContractVanFSREditData: [],
     //post api data
     expressContractVanFSRAddNewData: {
      quotation: {},
    },
    expressContractVanFSRContactData:[],
    // Attachment
    VanFSRAttachmentsStateData: {},
    vanFSRAttachmentsFiles: [],
    deletedvanFSRAttachmentsFiles: [],
    SalesPersonDataDropdown:{},
  

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
    FifthStepperTableDataColumns:  [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "address", header: "Address" },
    ],
    FifthStepperTableData: [
      {
        delivery_type: "Ram",
        collection_time: "987654321",
        cut_off_time: "ram@gmail.com",
        cut_off_days: "no:9,ramarstreet,france",

      },
      {
        delivery_type: "Jayanth",
        collection_time: "986754321",
        cut_off_time: "jayanthdon@gmail.com",
        cut_off_days: "no:420,jayanthsamyiyerstreet,kailasha",

      },

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
    timeLineExpressContractVanFSRCostCenterTableData: [
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

    defaultexpressContractVanFSR: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    ExpressContractVanFSRTimeLineData: [
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
    expressContractVanFsrOverviewData: [],
    // expressContractVanFSRAddNewData: {},
  },

  mutations: {
    fetchDefaultexpressContractVanFSRTimeLineData(state, data) {
      state.ExpressContractVanFSRTimeLineData = [];
      state.ExpressContractVanFSRTimeLineData = data;
    },
    fetchexpressContractVanFSRTimeLineData(state, data) {
      state.ExpressContractVanFSRTimeLineData.push(data);
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchexpressContractVanFsrOverviewData(state, data) {
      state.expressContractVanFsrOverviewData = data;
    },
    fetchCreateQuotationExpressContractVanFsr(state, data) {
      state.ExpressContractVanFsr = data;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    fetchExpressContractFsrDialogFestivalDropDown(state, data) {
      state.ExpressContractFsrDialogFestivalDropDown = data.map((i) => ({
        name: i.festival_name,
        code: i.id,
      }));
    },

    fetchExpressContractFsrOverviewEditData(state, data) {
      state.ExpressContractFsrOverviewEditData = data;
    },

    fetchExpressContractFsrDialogReferenceDropDown(state, data) {
      state.ExpressContractFsrDialogReferenceDropDown = data.map((i) => ({
        name: i.domain,
        code: i.id,
      }));
    },
    fetchExpressContractFsrDialogCompetitorDropDown(state, data) {
      state.ExpressContractFsrDialogCompetitorDropDown = data.map((i) => ({
        name: i.competitor_name,
        code: i.id,
      }));
      console.log(data, "data");
    },
    

    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },
    fetchSalesPersonDataTimeLineHeader(state,data){
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchloadSalesPersonDataDropdown(state,data){
      state.SalesPersonDataDropdown = data;
    }
  },

  actions: {
    resetExpressContractVanFSRTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractVanFSRTimeLineData", data);
    },

    updateExpressContractVanFSRTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractVanFSRTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },

    async loadExpressContractFsrOverviewEditData({ commit }, { path }) {
      await axios.get(path).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "resultOverview");
          commit("fetchExpressContractFsrOverviewEditData", res.data.results);
        }
      });
    },

    async loadExpressContractFsrDialogFestivalDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/festival/dropdown")
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchExpressContractFsrDialogFestivalDropDown",
              res.data.results
            );
          }
        });
    },

    async loadExpressContractFsrDialogReferenceDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/reference/dropdown")
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchExpressContractFsrDialogReferenceDropDown",
              res.data.results
            );
          }
        });
    },

    async loadExpressContractFsrDialogCompetitorDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/competitor/dropdown")
        .then((res) => {
          if (res.data.results) {
            console.log(
              res.data.results,
              " ExpressContractFsrDialogCompetitorDropDown"
            );
            commit(
              "fetchExpressContractFsrDialogCompetitorDropDown",
              res.data.results
            );
          }
        });
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
    createQuotationExpressContractVanFsr({ commit }, { data }) {
      commit("fetchCreateQuotationExpressContractVanFsr", data);
    },
    async loadexpressContractVanFsrOverviewData({ commit }, { id }) {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "overv");
          commit("fetchexpressContractVanFsrOverviewData", res.data.results);
        }
      });
    },
    loadSalesPersonDataTimeLineHeader({ commit }, { path,id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results)
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },
    loadSalesPersonDataDropdown({commit}, {path,id, payload}) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results)
          commit("fetchloadSalesPersonDataDropdown", res?.data?.results);
        }
      });
    },
    // Post & Patch Operations
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData ,id }
    ){
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          // dispatch(loadData);
          console.log("loaddata", loadData);
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
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
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
    VanFSRAttachmentsStateData: ({ VanFSRAttachmentsStateData }) =>
    VanFSRAttachmentsStateData,

    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    
    ExpressContractFsrOverviewEditData: ({
      ExpressContractFsrOverviewEditData,
    }) => ExpressContractFsrOverviewEditData,

    expressContractVanFsrOverviewData: ({ expressContractVanFsrOverviewData }) =>
    expressContractVanFsrOverviewData,

    expressContractVanFSRAddNewData: ({ expressContractVanFSRAddNewData }) =>
    expressContractVanFSRAddNewData,

    expressContractVanFSRContactData: ({ expressContractVanFSRContactData }) =>
      expressContractVanFSRContactData,
  },
};

export default salesExpressContractVanFSR;
