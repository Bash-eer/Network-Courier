import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesContract = {
  namespaced: true,
  state: {
    globalSearch: "",
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    //bulk adjustment
    BulkAdjustmentTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "batch_name", header: "Batch Name" },
      { field: "customer", header: "Customers" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    salesQuotationTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Profile Name" },
      { field: "customer_id", header: "Customer ID" },
      { field: "quotation", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "members", header: "Members" },
    ],
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
    //for bulk adjustment
    BulkAdjustmentTableData: [],
    ContractsTableData: [
      // {
      //   id: "1",
      //   profile_name: "DHL 003",
      //   quotation: "Adhoc",
      //   remarks: "Lorem Ipsum Doret Dexir auvoir",
      //   preview: "",
      //   address: "No.1 Second Chin Bee ",
      //   address_no: "238801",
      //   status: "Called",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   type: "express",
      //   created_time: "12:00PM",
      // },
      // {
      //   id: "2",
      //   profile_name: "DHL 004",
      //   quotation: "Agent",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee ",
      //   address_no: "238801",
      //   status: "Concluded",
      //   createdAt: "2021-12-06T09:27:15.718Z",
      //   updatedAt: "2021-12-06T09:27:15.718Z",
      //   deletedAt: null,
      //   created_by: "Keerthi",
      //   type: "rapido",
      //   created_time: "4:00PM",
      // },
      // {
      //   id: "5",
      //   profile_name: "DHL 004",
      //   quotation: "international",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee ",
      //   address_no: "238801",
      //   status: "Quote",
      //   createdAt: "2021-12-06T09:48:08.407Z",
      //   created_by: "surya",
      //   type: "international",
      //   created_time: "1:00PM",
      // },
    ],
  },
  mutations: {
    fetchSalesTableData(state, data) {
      state.ContractsTableData = data;
    },
    //bulk adjustment
    fetchBulkAdjustmentTableData(state, data) {
      state.BulkAdjustmentTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
  },
  actions: {
    loadContractTabData({ commit }) {
      axios.get("/sales/allcontract").then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          console.log(resultRows, "con");
          for (let c in resultRows) {
            if (resultRows[c]["created_by"] && resultRows[c]["user"]) {
              if (resultRows[c]["user"]["display_name"]) {
                resultRows[c]["created_by"] =
                  resultRows[c]["user"]["display_name"];
              }
            }
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

    loadBulkAdjustmentTableData({ commit }) {
      axios.get("/sales/contract/bulk-adjustment/batch").then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          console.log(resultRows, "bulk adjustment data");
          for (let c in resultRows) {
            if (resultRows[c]["user"]) {
              if (resultRows[c]["user"]["display_name"]) {
                resultRows[c]["created_by"] =
                  resultRows[c]["user"]["display_name"];
              }
            }
            resultRows[c]["createdAt"] = new Date(resultRows[c]["createdAt"]);
          }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];

            r_obj["sno"] = i + 1;
          }
          commit("fetchBulkAdjustmentTableData", res.data.results);
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
export default salesContract;
