import axios from "axios";
// import router from "@/router";
// import router from "../../../router";
import { errhandler } from "@/services/httpClient";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const salesCommon = {
  namespaced: true,
  state: {
    //dialog
    promoteToContract: null,
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    updateStatusId: 0,
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    //stepper
    internationalCostCenterDataGet: null,
    stepperNavigation: null,
    //termination data
    commonContractTerminationStateData: {},
    //state edit data\
    commonFollowUpStateData: {},
    commonAttachmentStateData: {},
    commonBillPreferenceStateData: null,
    //drag and drop file data
    salesCommonFollowUpFiles: [],
    deletedsalesCommonFollowUpFiles: [],
    salesCommonAttachmentsFiles: [],
    deletedsalesCommonAttachmentsFiles: [],
    BillPreferenceData: [],
    commonInternationalContractCostCenterPatchData: null,
    ExpressExpansionCostCenterData: [],
    expressCCPostDialogData: {},
    expressCCTripsData: null,
    commonExpressCCStateData: {},
    contractsStatus: [],
    quotationsStatus: [],
    salesType: "",
    quotation_g_overView: null,
    contact_table: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "designation", header: "Address" },
    ],
    CostCenterData: [],
    FollowupData: [],
    AttachmentData: [],
    siteOfficeHistory: [],
    countryList: [],
    surchargeDataList: [],
  },
  mutations: {
    fetchStateData(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
    fetchBillPreferenceData(state, data) {
      state.BillPreferenceData = data;
    },
    fetchCostCenterData(state, data) {
      state.CostCenterData = data;
    },
    fetchExpressExpansionCostCenterData(state, data) {
      state.ExpressExpansionCostCenterData = data;
    },
    fetchFollowupData(state, data) {
      state.FollowupData = data;
    },
    fetchAttachmentData(state, data) {
      state.AttachmentData = data;
    },
    //DIALOGS
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    fetchinternationalCostCenterDataGet(state, data) {
      state.internationalCostCenterDataGet = data;
    },
    fetchExpressCostCenterSiteOfficeHistory(state, data) {
      state.siteOfficeHistory = data;
    },
    fetchSurchargeDataForSelectedRate(state, data) {
      state.surchargeDataList = data;
    },
    fetchSalesStatus(state, data) {
      state[data.key + "Status"] = data.value;
    },
    setSalesType(state, data) {
      state.salesType = data;
    },
    setUpdateStatusId(state, data) {
      state.updateStatusId = data;
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
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    setSalesType({ commit }, type) {
      commit("setSalesType", type);
    },
    setUpdateStatusId({ commit }, id) {
      commit("setUpdateStatusId", id);
    },
    clearStateData({ commit }, data) {
      commit("fetchStateData", data);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    async getProfileDetails(_, payload) {
      return await axios.get(`/sales/profiles/${payload}`);
    },

    async getCountryList({ commit }) {
      return await axios
        .get("/settings/sales/rates/international/outbound/dropdowns/countries")
        .then((res) => {
          commit("fetchStateData", { countryList: res.data.results });
          return res;
        });
    },
    async getStates(_, id) {
      return await axios.get(
        `/settings/sales/rates/international/outbound/dropdowns/country/destination/${id}`
      );
    },
    async getAddress(_, code) {
      return await axios.get(
        `/suggestion/operations/area/address?postalCode=${code}`
      );
    },
    async getPostalCode(_, address) {
      return await axios.get(
        `/suggestion/operations/area/address?address=${address}`
      );
    },
    async getCallReceivedBy() {
      return await axios.get(`/settings/all-user/dropdown`);
    },
    async addCustomerContact(_, { payload, type, toast }) {
      return axios
        .post(`/sales/${type}/follow-up/contacts`, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Data added successfully",
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
    async getCustomerContact(_, { id, type }) {
      let p_type;
      if (type == "contract") {
        p_type = "contract";
      } else p_type = "quotations";
      return await axios.get(`/sales/${p_type}/contact-person/dropdown/${id}`);
    },
    async getContractCustomerContact(_, id) {
      return await axios.get(`/sales/contract/contact-person/dropdown/${id}`);
    },
    async getRateAdjustment(_, id) {
      return await axios.get(`/sales/contract/rate_adjustments/${id}`);
    },
    async getSalesStatus({ commit }, type) {
      const res = await axios.get(`/sales/dropdown/${type}/status`);
      if (res) {
        let status = res.data.results.map((i) => {
          return {
            code: i.status,
            name: i.status,
          };
        });
        let data = {
          key: type,
          value: status,
        };
        commit("fetchSalesStatus", data);
      }
    },
    async getExCostCenter({ commit }, { id, type }) {
      const res = await axios.get(`sales/${type}/cost-center/express/` + id);
      if (res) {
        commit("fetchStateData", {
          commonExpressCCStateData: res.data.results,
        });
      }
    },
    async getSalesPerson() {
      return await axios.get("/settings/user/dropdown?role=Sales Person");
    },
    async updateStatus(_, { id, payload, type, toast }) {
      let setType = type.replace("s", "");
      return axios
        .patch(`/sales/${setType}/status/` + id, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Status Updated successfully",
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
    async quotationOverviewData({ commit }, { id }) {
      await axios.get(`/sales/contract/overview/` + id).then((res) => {
        if (res.data.results) {
          commit("fetchState", { quotation_g_overView: res.data.results });
        }
      });
    },
    async sendQuotation(_, { id, payload, toast }) {
      return axios
        .post(`/sales/quotations/send/${id}`, payload)
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
    async editQuotation(_, { id, payload, type, toast }) {
      return axios
        .patch(`/sales/${type}/` + id, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Details Updated successfully",
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
    async saveQuotation(_, { payload, toast }) {
      return axios
        .post(`/sales/quotation`, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "New data added successfully",
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
    async updateSalesPerson(_, { id, payload, toast }) {
      return await axios
        .patch("/sales/quotations/sales-person/" + id, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Detail update successfully",
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
    async retrieveAct(_, { id, toast }) {
      return axios
        .patch(`/sales/contracts/approval/retrieve/${id}`)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "data retrieve successfully",
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
    async saveProfile(_, { payload, toast }) {
      return axios
        .post(`/sales/profile`, payload)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "New profile added successfully",
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
    async profileAction(_, { payload, id, method, toast }) {
      // return
      // axios
      //   .patch(`/sales/profiles/${id}`, payload)
      let url = "/sales/profile";
      if (method != "POST") {
        url = url + `s/${id}`;
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
            detail: `${method == "POST" ? "New" : ""} profile ${
              method == "PATCH"
                ? "updated"
                : method == "DELETE"
                ? "deleted"
                : "added"
            } successfully`,
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
    async loadBillPreferenceData({ commit }, { id, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      // await axios
      //   .get("/sales/" + processedType + "/overview/" + id)
      // axios.get("/salesCompany").then((res) => {
      await axios
        .get("sales/" + processedType + "/billing-preferences/" + id)
        .then((res) => {
          if (res.data.results) {
            // let resultRows = res.data.results;
            // for (let c in resultRows) {
            //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            // }
            // for (let i = 0; i < resultRows.length; i++) {
            //   let r_obj = resultRows[i];

            //   r_obj["sno"] = i + 1;
            // }
            commit("fetchBillPreferenceData", res.data.results);
          }
        });
    },
    async loadCostCenterData({ commit }, { id, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      // axios.get("/salesCompany").then((res) => {
      await axios
        .get("sales/" + processedType + "/cost-centers/express/" + id)
        .then((res) => {
          if (res.data.results) {
            let resultRows = res.data.results;
            // for (let c in resultRows) {
            //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            // }
            for (let i = 0; i < resultRows.length; i++) {
              let r_obj = resultRows[i];

              r_obj["sno"] = i + 1;
            }
            commit("fetchCostCenterData", res.data.results);
          }
        });
    },

    async loadExpressExpansionCostCenterData({ commit }, { id, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      // axios.get("/salesCompany").then((res) => {
      await axios
        .get("sales/" + processedType + "/cost-center/express/" + id)
        .then((res) => {
          if (res.data.results) {
            let resultRows = res.data.results;
            // for (let c in resultRows) {
            //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            // }
            for (let i = 0; i < resultRows.length; i++) {
              let r_obj = resultRows[i];

              r_obj["sno"] = i + 1;
            }
            commit("fetchExpressExpansionCostCenterData", res.data.results);
          }
        });
    },
    async loadFollowupData({ commit }, { id, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      // axios.get("/salesCompany").then((res) => {
      await axios
        .get("/sales/" + processedType + "/followups/" + id)
        .then((res) => {
          if (res.data.results) {
            let resultRows = res.data.results;
            for (let c in resultRows) {
              resultRows[c]["date_and_time"] = new Date(
                resultRows[c]["date_and_time"]
              );
            }
            for (let i = 0; i < resultRows.length; i++) {
              let r_obj = resultRows[i];

              r_obj["sno"] = i + 1;
              //  r_obj['attachments'] = resultRows[i].follow_up_attachments
              // let emptyArr = [];
              // for (
              //   let f = 0;
              //   i < resultRows[i]["follow_up_attachments"].length;
              //   f++
              // ) {
              //   if (resultRows[i]["follow_up_attachments"].length > 0) {
              //     emptyArr.push(
              //       resultRows[i].follow_up_attachments[f].attachments
              //     );
              //   }
              // }
              // r_obj["attachments"] = emptyArr;
            }
            commit("fetchFollowupData", res.data.results);
          }
        });
    },

    loadinternationalCostCenterDataGet({ commit }, { id }) {
      axios
        .get("/sales/quotation/cost-centers/international/" + id)
        .then((res) => {
          if (res?.data?.results) {
            commit("fetchinternationalCostCenterDataGet", res.data.results);
          }
        });
    },
    expressCostCenter({ commit }, { id }) {
      axios.get("/sales/quotation/cost-centers/express/" + id).then((res) => {
        if (res?.data?.results) {
          commit("fetchStateData", { CostCenterData: res.data.results });
        }
      });
    },

    async loadAttachmentData({ commit }, { id, type }) {
      let processedType;
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotation";
      // axios.get("/salesCompany").then((res) => {
      await axios
        .get("/sales/" + processedType + "/attachments/" + id)
        .then((res) => {
          if (res.data.results) {
            let resultRows = res.data.results;
            for (let c in resultRows) {
              resultRows[c]["created_by"] =
                resultRows[c]["user"]["display_name"];
            }
            for (let i = 0; i < resultRows.length; i++) {
              let r_obj = resultRows[i];

              r_obj["sno"] = i + 1;
            }
            commit("fetchAttachmentData", res.data.results);
          }
        });
    },
    //delete
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData, id, type }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit("toastMutation", toastData.toastSuccessData);

            dispatch(loadData, { id, type });
            // dispatch(loadData.loadApi, {
            //   path: loadData.loadPath,
            //   mutation: loadData.loadMutation,
            // });
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastErrorData);
          }
        });
    },

    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      {
        path,
        method,
        data,
        loadData,
        id,
        type,
        toastData,
        loadDiffStore,
        closeDialog,
      }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            this.dispatch(closeDialog);
            // dispatch(closeDialog, {}, { root: true });
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
        });
    },

    loadSiteOfficeHistory({ commit }, { id }) {
      axios
        .get("/sales/quotation/cost-center/site-charge/history/" + id)
        .then((res) => {
          if (res?.data?.results) {
            commit(
              "fetchExpressCostCenterSiteOfficeHistory",
              res?.data?.results
            );
          }
        });
    },
  },
  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    commonAttachmentStateData: ({ commonAttachmentStateData }) =>
      commonAttachmentStateData,
    commonFollowUpStateData: ({ commonFollowUpStateData }) =>
      commonFollowUpStateData,
    commonContractTerminationStateData: ({
      commonContractTerminationStateData,
    }) => commonContractTerminationStateData,
    expressCCPostDialogData: ({ expressCCPostDialogData }) =>
      expressCCPostDialogData,
    siteOfficeHistory: ({ siteOfficeHistory }) => siteOfficeHistory,
  },
};
export default salesCommon;
