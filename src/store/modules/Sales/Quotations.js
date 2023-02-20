import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const SalesQuotation = {
  namespaced: true,
  state: {
    globalSearch: "",
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    salesQuotationTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Profile Name" },
      { field: "business_type", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "members", header: "Members" },
    ],

    QuotationsTableData: [
      {
        id: "1",
        profile_name: "DHL 003",
        quotation: "Adhoc",
        remarks: "Lorem Ipsum Doret Dexir auvoir",
        preview: "",
        address: "No.1 Second Chin Bee ",
        address_no: "238801",
        status: "Called",
        createdAt: "2021-12-06T09:14:39.228Z",
        created_by: "Antony Jerold",
        type: "express",
        created_time: "12:00PM",
      },
    ],
  },
  mutations: {
    fetchSalesTableData(state, data) {
      state.QuotationsTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
  },
  actions: {
    loadQuotationTabData({ commit }) {
      axios.get("/sales/allquotation").then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let c in resultRows) {
            resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            resultRows[c]["createdAt"] = new Date(resultRows[c]["createdAt"]);
          }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];

            r_obj["sno"] = i + 1;
          }
          commit("fetchSalesTableData", res.data.results);
        }
      });
    },

    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit("toastMutation", toastData.toastSuccessData);

            dispatch(loadData);
          }
        })
        .catch(() => {
          commit("toastMutation", toastData.toastErrorData);
        });
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
  },
};
export default SalesQuotation;
