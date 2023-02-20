import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const internationalInbound = {
  namespaced: true,
  state: {
    displayDialog: false,
    dialogComponent: null,
    globalSearch: "",
    dialogHeader: null,
    addAdditionalChargesData: [],
    addStorageChargesData: [],
    addOthersChargesData: [],
    addClearanceAndAdditionalChargeData: [],
    addGstChargesData: [],
    addSurchargesData: [],
    addQuestionnaireData: [],
    addOthersData: [],
    clearanceModeTabs: [],
    clearanceModeData: [],
    // clearanceAndAdditionalExpandModeData: [],
    clearanceModeDynamicTabState: null,
    addCurrencyExchangeData: [],
    addClearanceModeData: [],
    clearanceTabState: null,
    currentTabValue: null,
    internationalMainTab: null,
    surchargeFormStateData: {},
    othersFormStateData: {},
    clearanceAndAdditional: {},
    clearanceEdit: {},
    AdditionalRateEdit: {},
    questionnaireFormStateData: {},
    currencyExchangeFormStateData: {},
    clearanceModeFormStateData: {},
    additionalChargesFormStateData: {},
    storageChargesFormStateData: {},
    gstTypeFormStateData: {},
    otherChargesFormStateData: {},
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    //toggleData
    toggleData: [{ type: "" }],

    addNewDropDownData: [
      {
        name: "Add New",
        code: "Hi",
        items: [
          {
            name: "Tom",
            code: 1,
            picture: "/images/avatarTwo.png",
          },
          {
            name: "Jill",
            code: 2,
            picture: "/images/avatar.png",
          },
        ],
      },
    ],
    addNewDropDownDataInbound: [
      {
        name: "Add New",
        code: "Hi",
        items: [
          {
            name: "Airfreight",
            code: 1,
          },
          {
            name: "DNATA",
            code: 2,
          },
          {
            name: "OBC",
            code: 3,
          },
        ],
      },
    ],
  },
  mutations: {
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchAdditionalChargesData(state, data) {
      state.addAdditionalChargesData = data;
    },
    fetchStorageChargesData(state, data) {
      state.addStorageChargesData = data;
    },
    fetchOthersChargesData(state, data) {
      state.addOthersChargesData = data;
    },
    fetchClearanceAndAdditionalData(state, data) {
      state.addClearanceAndAdditionalChargeData = data;
    },
    fetchclearanceEditData(state, data) {
      state.addclearanceEditChargeData = data;
    },
    fetchGstChargesData(state, data) {
      state.addGstChargesData = data;
    },
    fetchClearanceModeTab(state, data) {
      state.clearanceModeTab = data;
    },
    setSurchargeFormStateDataMutation(state, data) {
      state.surchargeFormStateData = data;
    },
    setQuestionnaireFormStateDataMutation(state, data) {
      state.questionnaireFormStateData = data;
    },
    setCurrenyExchangeFormStateDataMutation(state, data) {
      state.currencyExchangeFormStateData = data;
    },
    setClearanceModeFormStateDataMutation(state, data) {
      state.clearanceModeFormStateData = data;
    },
    setadditionalChargesFormStateDataMutation(state, data) {
      state.additionalChargesFormStateData = data;
    },
    setOthersFormStateDataMutation(state, data) {
      state.othersFormStateData = data;
    },
    setClearanceAndAdditionalEditMutation(state, data) {
      state.clearanceAndAdditional = data;
    },
    setclearanceEditEditMutation(state, data) {
      state.clearanceEdit = data;
    },
    setAdditionalRateEditMutation(state, data) {
      state.AdditionalRateEdit = data;
    },

    setstorageChargesFormStateDataMutation(state, data) {
      state.storageChargesFormStateData = data;
    },
    setotherChargesFormStateDataMutation(state, data) {
      state.otherChargesFormStateData = data;
    },
    setgstTypeFormStateDataMutation(state, data) {
      state.gstTypeFormStateData = data;
    },
    fetchInboundTableData(state, data) {
      state[data[1]] = data[0];
    },
    fetchOthersTableData(state, data) {
      state.addOthersData = data;
    },
    fetchClearanceModeData(state, data) {
      state.clearanceModeData = data;
    },
    // fetchclearanceAndAdditionalExpandModeData(state, data) {
    //   state.clearanceAndAdditionalExpandModeData = data;
    //   console.log("data",data)
    // },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
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
    setSurchargeFormStateData({ commit }, { data }) {
      commit("setSurchargeFormStateDataMutation", data);
    },
    setOthersFormStateData({ commit }, { data }) {
      commit("setOthersFormStateDataMutation", data);
    },
    setClearanceAndAdditionalEdit({ commit }, { data }) {
      commit("setClearanceAndAdditionalEditMutation", data);
    },
    setclearanceEditEdit({ commit }, { data }) {
      commit("setclearanceEditEditMutation", data);
    },
    setAdditionalRateEdit({ commit }, { data }) {
      commit("setAdditionalRateEditMutation", data);
    },
    setQuestionnaireFormStateData({ commit }, { data }) {
      commit("setQuestionnaireFormStateDataMutation", data);
    },
    setCurrenyExchangeFormStateData({ commit }, { data }) {
      commit("setCurrenyExchangeFormStateDataMutation", data);
    },
    setClearanceModeFormStateData({ commit }, { data }) {
      commit("setClearanceModeFormStateDataMutation", data);
    },
    setadditionalChargesFormStateData({ commit }, { data }) {
      commit("setadditionalChargesFormStateDataMutation", data);
    },
    setstorageChargesFormStateData({ commit }, { data }) {
      commit("setstorageChargesFormStateDataMutation", data);
    },
    setgstTypeFormStateData({ commit }, { data }) {
      commit("setgstTypeFormStateDataMutation", data);
    },
    setotherChargesFormStateData({ commit }, { data }) {
      commit("setotherChargesFormStateDataMutation", data);
    },
    loadInboundTableData({ commit }, { path, type }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        //process data
        commit("fetchInboundTableData", [res.data.results, type]);
      });
    },
    loadClearanceModeTabs({ commit }) {
      // console.log("LoadData LoadData");
      axios
        .get(
          "settings/salesSettinigs/rates/international/inbound/clearanceMode/modes"
        )
        .then((res) => {
          let clearanceModeTab = [];
          if (res.data.results) {


            for (let i in res.data.results) {
              let ACno = 1; let Cno = 1; let Rno = 1;
              for (let ac in res.data.results[i].additional_clearance) {
                res.data.results[i].additional_clearance[ac]["sno"] = ACno++;
              }
              for (let ac in res.data.results[i].clearance) {
                res.data.results[i].clearance[ac]["sno"] = Cno++;
              }
              for (let ac in res.data.results[i].rates) {
                res.data.results[i].rates[ac]["sno"] = Rno++;
              }
            }
            commit("fetchClearanceModeData", res.data.results);
          }
          for (let d in res.data.results) {
            let obj = {};
            obj["label"] = res.data.results[d]["clearance_mode_name"];
            obj["heading"] = res.data.results[d]["clearance_mode_name"];
            obj["tabName"] = res.data.results[d]["clearance_mode_name"];
            obj["select"] = d == 0 ? false : true;
            obj["dynamic"] = true;
            clearanceModeTab.push(obj);
          }
          commit("fetchClearanceModeTab", clearanceModeTab);
        });
    },
    // loadClearanceandAditionalModeData({ commit }, {path}) {
    //   axios.get(path).then((res) => {
    //     for (let i = 0; i < res.data.results.length; i++) {
    //       let r_obj = res.data.results[i];

    //       r_obj["sno"] = i + 1;
    //     }
    //      console.log("result data")
    //     commit("fetchclearanceAndAdditionalExpandModeData", res.data.results);
    //   });
    // },
    loadPermitChargesData({ commit }, { path, type }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        //process data
        commit(type, res.data.results);
      });
    },
    loadClearanceAndAdditionalModeData({ commit }, { path, type }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        //process data
        commit(type, res.data.results);
      });
    },
    loadClearanceModeData({ commit }, { path, type }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        //process data
        commit(type, res.data.results);
      });
    },
    loadaddOthersData({ commit }, { path, type }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        console.log(type);
        //process data
        commit("fetchOthersTableData", res.data.results);
      });
    },
    //delete
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      console.log(path, method, loadData, toastData);
      axios({
        url: path,
        method: method,
        // data: Details,
      })
        .then((res) => {
          // console.log(res);
          if (res.data.status == 200) {
            //state.tableLoad = true;
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData.loadApi, {
              path: loadData.loadPath,
              type: loadData.type,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          commit("toastMutation", toastData.toastErrorData);
        });
    },
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      console.log(
        path,
        "path",
        method,
        "method",
        data,
        "data",
        loadData,
        "load data",
        toastData,
        "Psot crud data"
      );
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch(loadData.loadApi, {
            path: loadData.loadPath,
            type: loadData.type,
          });
          commit("toastMutation", toastData.toastSuccessData);
          dispatch("closeDialog");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 409) {
              commit("toastMutation", toastData.toastDuplicateErrorData);
            } else {
              commit("toastMutation", toastData.toastCommonErrorData);
            }
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
  },
};
export default internationalInbound;
