import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const rapidoContract = {
  namespaced: true,
  state: {
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    rapidoContractSubTabsType: "Type1",
    rapidoMainTab: "Contract",
    stepperNavigation: null,
    //toggleData
    toggleData: [{ type: "" }],
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    rapidoContractType1TableData: [],
    rapidoContractType2TableData: [],
    Type1FormStateData: {},
    Type2FormStateData: {},
    RapidoContractType1Type2SubTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        size_name: "Size Name",
        Cutoff_Time: "10.00",
        Cutoff_Days: "2",
        weight_range: "10-20",
        measurement_range: "20-30",
        Rate: "10",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    Type1Type2CloneRateCardData: {},
  },

  mutations: {
    cloneRateCardMutation(state, data) {
      state.Type1Type2CloneRateCardData = {
        cloneRateCardRateCardName: data.rate_card_name,
        cloneRateCardRateCardId: data.rate_card_id,
        rapidoContractType: data.rapido_contract_type,
      };
    },
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
    setType1FormStateDataMutation(state, data) {
      state.Type1FormStateData = data;
    },
    setType2FormStateDataMutation(state, data) {
      state.Type2FormStateData = data;
    },
    fetchRapidoContractTypeOneData(state, data) {
      state.rapidoContractType1TableData = data;
    },
    fetchRapidoContractTypeTwoData(state, data) {
      state.rapidoContractType2TableData = data;
    },
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
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    //set type 1 data
    setType1FormStateData({ commit }, { data }) {
      commit("setType1FormStateDataMutation", data);
    },
    //set type 2 data
    setType2FormStateData({ commit }, { data }) {
      commit("setType2FormStateDataMutation", data);
    },
    //clone rate card
    setCloneRateCardData({ commit }, { data }) {
      commit("cloneRateCardMutation", data);
    },
    //CRUD OPERATIONS
    //GET API-ZONE
    loadrapidoContractTypeOneData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        if (res.data.results) {
          let typeOneArray = res.data.results;
          for (let c in typeOneArray) {
            typeOneArray[c]["created_by"] =
              typeOneArray[c]["user"]["display_name"];
            typeOneArray[c]["createdAt"] = new Date(typeOneArray[c]["createdAt"]);
          }
          for (let i = 0; i < typeOneArray.length; i++) {
            let r_obj = typeOneArray[i];

            r_obj["sno"] = i + 1;

            //for sno inside rates
            for (let j = 0; j < typeOneArray[i].delivery_type.length; j++) {
              for (
                let k = 0;
                k < typeOneArray[i].delivery_type[j].rates.length;
                k++
              ) {
                let rate_obj = typeOneArray[i].delivery_type[j].rates[k];

                rate_obj["sno"] = k + 1;
              }
            }
          }

          commit(mutation, res.data.results);
        }
      });
    },
    loadrapidoContractTypeTwoData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        if (res.data.results) {
          let typeTwoArray = res.data.results;
          for (let c in typeTwoArray) {
            typeTwoArray[c]["created_by"] =
              typeTwoArray[c]["user"]["display_name"];
            typeTwoArray[c]["createdAt"] = new Date(typeTwoArray[c]["createdAt"]);
          }
          for (let i = 0; i < typeTwoArray.length; i++) {
            let r_obj = typeTwoArray[i];

            r_obj["sno"] = i + 1;
            //for sno inside rates
            for (let j = 0; j < typeTwoArray[i].delivery_type.length; j++) {
              for (
                let k = 0;
                k < typeTwoArray[i].delivery_type[j].rates.length;
                k++
              ) {
                let rate_obj2 = typeTwoArray[i].delivery_type[j].rates[k];

                rate_obj2["sno"] = k + 1;
              }
            }
          }

          commit(mutation, res.data.results);
        }
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
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err.response.data.message;
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
          dispatch("closeDialog");
          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            // if (err.response.status == 409) {
            //   commit("toastMutation", toastData.toastDuplicateErrorData);
            // } else {
            commit("toastMutation", toastData.toastCommonErrorData);
            // }
          }
        });
    },
  },
  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};
export default rapidoContract;
