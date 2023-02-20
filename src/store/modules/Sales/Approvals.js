import axios from "axios";

const salesApproval = {
  namespaced: true,
  state: {
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    approvalsTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Company name" },
      { field: "address", header: "Address" },
      { field: "sales_person", header: "Sales Person" },
      { field: "createdAt", header: "Created On" },
      // { field: "created_by", header: "Created By" },
      { field: "contract_no", header: "Contract" },
      { field: "signed_doc", header: "Signed Doc" },
      { field: "status", header: "Status" },
    ],
    rateAdjustmentTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Company name" },
      { field: "address", header: "Address" },
      { field: "sales_person", header: "Sales Person" },
      { field: "createdAt", header: "Created On" },
      // { field: "created_by", header: "Created By" },
      { field: "contract_no", header: "Contract" },
      { field: "signed_doc", header: "Signed Doc" },
      { field: "status", header: "Status" },
    ],
    terminationTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Company Name" },
      { field: "address", header: "Address " },
      { field: "sales_person", header: "Sales Person" },
      { field: "createdOn", header: "Created On" },
      // { field: "created_by", header: "Created By" },
      { field: "contract_no", header: "Termination" },
      // { field: "signed_doc", header: "Signed Doc" },
      { field: "status", header: "Status" },
    ],
    companydetailsTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "company_name", header: "Company Name" },
      { field: "address", header: "Address" },
      { field: "display_name", header: "Sales Person" },
      { field: "createdAt", header: "Created On" },
      // { field: "created_by", header: "Created By" },
      { field: "contract_no", header: "Contract" },
      // { field: "signed_doc", header: "Signed Doc" },
      { field: "status", header: "Status" },
    ],
    contractApprovalAttachmentFiles: [],
    deletedContractApprovalAttachmentFiles: [],
    contractApprovalAttachmentData: {},
    approvalsTableData: [],
    rateAdjustmentTableData: [],
    approvalsTerminationStateData: {},
    //   {
    //     id: "1",
    //     company_name: "DHL 003",
    //     img: "./images/greencoffee.png",
    //     type: "express",
    //     sale_person: "jasmine ",
    //     sales_no:"987654321",
    //     signed_doc: "Received",
    //     address: "No.1 Second Chin Bee ",
    //     address_no:"238801",
    //     createdAt: "2021-12-06T09:14:39.228Z",
    //     created_by: "Antony Jerold",
    //     contract_no:"View",
    //     company_status: "",
    //     status: "",
    //     item:"Contract"
    //   },
    //   {
    //     id: "2",
    //     company_name: "DHL 003",
    //     img: "./images/car.png",
    //     type: "international",
    //     sale_person: "Catherine",
    //     sales_no:"987654321",
    //     signed_doc: "Received",
    //     address: "No.1 Second Chin Bee ",
    //     address_no:"238801",
    //     createdAt: "2021-12-06T09:14:39.228Z",
    //     created_by: "Antony Jerold",
    //     contract_no:"View",
    //     company_status: "",
    //     status: "",
    //     item:"International"
    //   },
    //   {
    //     id: "3",
    //     company_name: "DHL 003",
    //     img: "./images/profile-girl.png",
    //     type: "rapido",
    //     sale_person: "jilipa jack",
    //     sales_no:"987654321",
    //     signed_doc: "Received",
    //     address: "No.1 Second Chin Bee ",
    //     address_no:"238801",
    //     createdAt: "2021-12-06T09:14:39.228Z",
    //     created_by: "Antony Jerold",
    //     contract_no:"View",
    //     company_status: "",
    //     status: "",
    //     item:"Rapido"
    //   },
    // ],
    terminationTableData: [
      // {
      //   id: "1",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
      // {
      //   id: "2",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
      // {
      //   id: "3",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
    ],
    companydetailsTableData: [
      // {
      //   id: "1",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
      // {
      //   id: "2",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
      // {
      //   id: "3",
      //   company_name: "DHL 003",
      //   sale_person: "Lorem Ipsum Doret Dexir auvoir",
      //   signed_doc: "Received",
      //   address: "No.1 Second Chin Bee 238801",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   contract_no: "099873763",
      //   company_status: "",
      //   status: "Active",
      // },
    ],
    approvalContractStatus: {},
  },

  mutations: {
    //DIALOGS
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchApprovalContractList(state, data) {
      state.approvalsTableData = data;
    },
    fetchterminationTableData(state, data) {
      state.terminationTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    fetchState(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
  },
  actions: {
    //DIALOGS
    openDialog({ commit }, { dialogDetails }) {
      console.log("Approval store");
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //approvals contract
    loadApprovalContracts({ commit }) {
      axios.get("/sales/contracts/approved").then((res) => {
        if (res?.data?.results) {
          let s_no = 1;
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            resultRows[i]["sno"] = s_no++;
            if (resultRows[i].contract_profile.createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].contract_profile.createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit("fetchApprovalContractList", res?.data?.results);
        }
      });
    },
    //Rate Adjesment
    loadRateAdjustment({ commit }) {
      axios.get("/sales/contracts/approved").then((res) => {
        if (res?.data?.results) {
          let resultRows = res.data.results;
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];

            r_obj["sno"] = i + 1;
          }
          for (let c in resultRows) {
            resultRows[c]["createdAt"] = new Date(resultRows[c]["createdAt"]);
          }
          commit("fetchState", { rateAdjustmentTableData: res?.data?.results });
        }
      });
    },
    //termination data
    loadApprovalTerminationTableData({ commit }) {
      let arr = [];
      let s_no = 1;
      axios.get("/sales/contracts/alltermination").then((res) => {
        if (res?.data?.results) {
          console.log(res.data.results, "res");
          let resultRows = res.data.results;
          // for (let c in resultRows) {
          //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
          // }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i]["contract_termination"];

            r_obj["sno"] = s_no++;
            // r_obj["sales_person"] =
            //   resultRows[i]["contract_termination"]["sales_person"];
            r_obj["status"] = resultRows[i].status;
            r_obj["createdOn"] = new Date(resultRows[i].createdAt);

            r_obj["termination_id"] = resultRows[i].id;
            // r_obj["createdAt"] = resultRows[i].createdAt;
            arr.push(r_obj);
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          // commit("fetchterminationTableData", res?.data?.results);
          commit("fetchterminationTableData", arr);
          //  commit("fetchterminationTableData", resultRows);
        }
      });
    },
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, id, type, toastData, loadDiffStore }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData);
          } else {
            dispatch(loadData, { id, type });

            commit("toastMutation", toastData.toastSuccessData);

            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastCommonErrorData);
          }
          // if (err.response.status) {
          //   if (err.response.status == 409) {
          //     commit("toastMutation", toastData.toastDuplicateErrorData);
          //   } else {
          //     commit("toastMutation", toastData.toastCommonErrorData);
          //   }
          // } else {
          //   commit("toastMutation", toastData.toastCommonErrorData);
          // }
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
    approvalsTableData: ({ approvalsTableData }) => approvalsTableData,
    rateAdjustmentTableData: ({ rateAdjustmentTableData }) =>
      rateAdjustmentTableData,
    approvalContractStatus: ({ approvalContractStatus }) =>
      approvalContractStatus,
    contractApprovalAttachmentData: ({ contractApprovalAttachmentData }) =>
      contractApprovalAttachmentData,
  },
};
export default salesApproval;
