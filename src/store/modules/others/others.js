import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const others = {
  namespaced: true,
  state: {
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    competitorsTableData: [],
    referenceTableData: [],
    tradeTableData: [],
    toggleData: [{ type: "" }],
    festivalsTableData: [],
    summary: null,
    severity: null,
    showToastMessage: false,
    otherTableEditData: {},
    otherFormStateData: {},
  },
  mutations: {
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    setOtherTableEditDataMutation(state, data) {
      state.otherTableEditData = data;
    },
    fetchCompetitorsTable(state, data) {
      state.competitorsTableData = data;
    },
    fetchReferenceTable(state, data) {
      state.referenceTableData = data;
    },
    fetchTradeTable(state, data) {
      state.tradeTableData = data;
    },
    fetchFestivalsTable(state, data) {
      state.festivalsTableData = data;
    },
    fetchOtherFormStateData(state, data) {
      state.otherFormStateData = data;
    },
    toastMutation(state, toastData) {
      state.summary = "The row" + " " + toastData[2];
      state.severity = toastData[0];
      state.showToastMessage = true;
    },
  },
  actions: {
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    setOtherTableEditData({ commit }, { data }) {
      commit("setOtherTableEditDataMutation", data);
    },
    //loadApi's
    loadOthersTables({ commit }, { path, mutation }) {
      //list Api call
      axios.get("/settings/salesSettinigs/others/" + path).then((res) => {
        if (res.status == 200) {
          console.log(res.data.results);
          for (let d in res.data.results) {
            res.data.results[d].s_no = parseInt(d) + 1;
          }
          commit(mutation, res.data.results);
        }
      });
    },
    loadOtherFormTab({ commit }) {
      axios.get("settings/salesSettinigs/others/others").then((res) => {
        if (res.status == 200) {
          commit("fetchOtherFormStateData", res.data.results);
        }
      });
    },
    //COMMON CRUD FUNCTION
    commonCRUD(
      //eslint-disable-next-line no-unused-vars
      { state, commit, dispatch, rootState },
      //eslint-disable-next-line no-unused-vars
      { path, action, tag, data, mutation, type, id_key, listApiPath }
    ) {
      if (tag == "add") {
        //adding new data to the data-base using the axios POST method
        axios.post(path, data).then((res) => {
          if (res.status == 200) {
            dispatch(action, { path: listApiPath, mutation: mutation });
            dispatch("closeDialog");
            commit("toastMutation", [
              "success",
              data,
              "was added successfully",
            ]);
          }
        });
      }
      if (tag == "delete") {
        //deleting an existing data in the data-base using the axios DELETE method
        axios.delete(path).then((res) => {
          if (res.status == 200) {
            dispatch(action, { path: listApiPath, mutation: mutation });
            commit("toastMutation", ["info", data, "was deleted"]);
          }
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        axios.patch(path, data).then((res) => {
          if (res.data.status == 200) {
            dispatch(action, { path: listApiPath, mutation: mutation });
            dispatch("closeDialog");
            commit("toastMutation", [
              "success",
              data,
              "was edited successfully",
            ]);
          }
        });
      }
    },
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
          dispatch(loadData.loadApi, {
            path: loadData.loadPath,
            mutation: loadData.loadMutation,
          });

          commit("toastMutation", toastData.toastSuccessData);

          dispatch("closeDialog");
        })
        .catch((err) => {
          if (err.response.status) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            if (err.response.status == 409) {
              commit("toastMutation", toastData.toastDuplicateErrorData);
            } else {
              commit("toastMutation", toastData.toastCommonErrorData);
            }
          } else {
            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },
    // POSTPATCHCRUDOPERATION(
    //   { state, dispatch, commit },
    //   { path, method, data, loadData, toastData }

    // ) {
    //   axios({
    //     url: path,
    //     method: method,
    //     data: data,
    //   }).then((res) => {
    //     // console.log(res);
    //     if (res.data.status == 200) {
    //     state.tableLoad = true;
    //     dispatch(loadData.loadApi, {
    //       path: loadData.loadPath,
    //       mutation: loadData.loadMutation,
    //     });
    //     commit("toastMutation", toastData.toastSuccessData);
    //     dispatch("closeDialog");
    //   }
    //   if (res.data.status == 400) {
    //     commit("toastMutation", toastData.toastDuplicateErrorData);

    //   }
    //   }).catch((err) => {

    //       console.log(err)
    //       commit("toastMutation", toastData.toastDuplicateErrorData);

    //   })

    // },
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
export default others;
