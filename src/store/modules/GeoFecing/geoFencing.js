import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const geoFencing = {
  namespaced: true,
  state: {
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    toggleData: [{ type: "" }],
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    geoFencingTableData: [],
    geoFencingFormStateData: {},
  },

  mutations: {
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchGeoTableMutation(state, data) {
      state.geoFencingTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
  },
  actions: {
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    loadGeoFencingTable({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["no_of_location"] = res.data.results[i].location.length;
          r_obj["s_no"] = i + 1;
          let total_area = 0;
          for (let j = 0; j < res.data.results[i].location.length; j++) {
            res.data.results[i].location[j]["s_no"] = j + 1;
            total_area = total_area + res.data.results[i].location[j].area;
          }
          r_obj["total_area"] = total_area;
        }

        commit(mutation, res.data.results);
      });
    },

    //delete
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
            dispatch(loadData.loadApi, {
              path: loadData.loadPath,
              mutation: loadData.loadMutation,
            });
          }
        })
        .catch(() => {
          commit("toastMutation", toastData.toastErrorData);
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
          dispatch(loadData.loadApi, {
            path: loadData.loadPath,
            mutation: loadData.loadMutation,
          });
          commit("toastMutation", toastData.toastSuccessData);
          dispatch("closeDialog");
        })
        .catch((err) => {
          if (err.response.status == 409) {
            commit("toastMutation", toastData.toastDuplicateErrorData);
          } else {
            commit("toastMutation", toastData.toastCommonErrorData);
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
export default geoFencing;
