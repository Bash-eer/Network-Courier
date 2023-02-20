import axios from "axios";
import moment from "moment";

const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesRapidoAdhoc = {
  namespaced: true,
  state: {
    rapidoAdhocTimeLineCurrentTab: "Overview",
    TimeLineCurrentTab: "Overview",
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    RapidoRowData: null,
    LoadAdhocDialogEcommerce: [],

    inspectionsDropDownTableDataOne: null,
    RapidoAdhoc: null,
    RapidoAdhocEditData: [],
    SalesPersonData: [],
    SalesPersonDataPatch: null,
    SalesPersonDataTimeLineHeader: {},
    salesSendQuotationEmail: {},
    rapidoStepValidation: null,
    rapidoAdhocSubmitted: false,
    SalesPersonDataDropdown: {},
    inspectionsDropDownTableDataColumnsOne: [
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cut-Off Time" },
      { field: "cut_off_days_count", header: "Cut-Off Days" },
      { field: "net_charges", header: "Net Charges" },
    ],
    RapidoAdhocEcommerceTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "delivery_type", header: "Delivery Type" },
      { field: "cut_off_time", header: "Cutoff Time" },
      { field: "cut_off_days_count", header: "Cutoff Days" },
      { field: "rate", header: "Rate $" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    RapidoAdhocEcommerceSubTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "min_weight", header: "Weight (Kg)" },
      { field: "unit_rate", header: "Rate (S$)" },
    ],
    defaultrapidoAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    RapidoAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "Profile",
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
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    RapidoAdhocOverviewData: [],
  },
  mutations: {
    fetchRapidoAdhocTimeLineData(state, data) {
      state.RapidoAdhocTimeLine.push(data);
    },
    fetchDefaultRapidoAdhocTimeLineData(state, data) {
      state.RapidoAdhocTimeLine = [];
      state.RapidoAdhocTimeLine = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchRapidoAdhocOverviewData(state, data) {
      state.RapidoAdhocOverviewData = data;
    },
    fetchCreateQuotationRapidoAdhoc(state, data) {
      state.RapidoAdhoc = data;
    },

    fetchLoadAdhocDialogEcommerce(state, data) {
      function timeFormatter(time) {
        let date = moment(time).utc().format("hh:mm");
        if (date == "Invalid date") {
          return time;
        } else {
          return date;
        }
      }

      data.map((list) => {
        list.cut_off_time =
          list.cut_off_time && timeFormatter(list.cut_off_time);
        list.collect_time =
          list.collect_time && timeFormatter(list.collect_time);
      });

      state.inspectionsDropDownTableDataOne = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    fetchRowData(state, data) {
      function timeFormatter(time) {
        let date = moment(time).utc().format("hh:mm");
        if (date == "Invalid date") {
          return time;
        } else {
          return date;
        }
      }

      data.rapido_adhoc_specifics.delivery_charges.map((list) => {
        list.collect_time = timeFormatter(list.collect_time);
        list.cut_off_time = timeFormatter(list.cut_off_time);
        console.log(
          timeFormatter(list.cut_off_time),
          "///////////////////////////////////////"
        );
      }),
        (state.RapidoRowData = data);
    },
    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },
    fetchSalesPersonDataTimeLineHeader(state, data) {
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchSendQuotationEmail(state, data) {
      state.salesSendQuotationEmail = data;
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.SalesPersonDataDropdown = data;
    },
  },
  actions: {
    resetRapidoAdhocTimeLineData({ commit }, { data }) {
      commit("fetchDefaultRapidoAdhocTimeLineData", data);
    },
    updateRapidoAdhocTimeLineData({ commit }, { data }) {
      commit("fetchRapidoAdhocTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },

    //create Quotation Rapdio Adhoc
    createQuotationRapidoAdhoc({ commit }, { data }) {
      commit("fetchCreateQuotationRapidoAdhoc", data);
      console.log(data, "hi");
    },

    loadAdhocDialogEcommerce({ commit }, { path, payload }) {
      axios.post(path, payload).then((res) => {
        console.log(res.data.results, "///////////////////");

        commit("fetchLoadAdhocDialogEcommerce", res.data.results);
      });
    },
    async loadRapidoAdhocOverviewData({ commit }, { id }) {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "overv");
          commit("fetchRapidoAdhocOverviewData", res.data.results);
        }
      });
    },
    loadRowData({ commit, dispatch }, { path }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          dispatch(
            "salesSales/openDialog",
            {
              dialogDetails: {
                dialogName: "RapidoAdhocQuotationDialog",
                dialogHeader: "Edit Rapido Adhoc",
              },
            },
            {
              root: true,
            }
          );

          // this.$store.getters["salesSales/controlActivityDialog"];
          commit("fetchRowData", res?.data?.results);
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
    loadSendQuotationEmail({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results.company_contacts[0].email);
          commit(
            "fetchSendQuotationEmail",
            res?.data?.results.company_contacts[0].email
          );
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
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          // dispatch(loadData);
          dispatch(loadData.loadApi, {
            path: loadData.loadPath,
            mutation: loadData.loadMutation,
          });
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
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    RapidoAdhocOverviewData: ({ RapidoAdhocOverviewData }) =>
      RapidoAdhocOverviewData,
  },
};
export default salesRapidoAdhoc;
