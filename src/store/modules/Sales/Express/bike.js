import axios from "axios";

const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressBike = {
  namespaced: true,
  state: {
    //dialog data

    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    TimeLineCurrentTab: "Overview",
    ExpressContractBikeOverviewData: [],
    ExpressContractBikeEditData: null,
    //for stepper
    stepperNavigation: null,
    expressQuotationOverviewData: [],
    //post api data
    expressContractBikeAddNewData: {
      quotation: {},
    },
    expressContractBikeSurchargeData: [],
    expressContractBikeChargeByWeightData: [],
    //timeLineData
    defaultExpressContractBikeTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    expressContractBikeTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetail",
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
  },
  mutations: {
    fetchExpressContractBikeTimeLineData(state, data) {
      state.expressContractBikeTimeLine.push(data);
    },
    fetchDefaultExpressContractBikeTimeLineData(state, data) {
      state.expressContractBikeTimeLine = [];
      state.expressContractBikeTimeLine = data;
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
    fetchQuotationTableData(state, data) {
      state.QuotationTabTableData = data;
    },
    fetchExpressContractBikeOverviewData(state, data) {
      state.ExpressContractBikeOverviewData = data;
    },
    fetchExpressContractBikeSurchargeData(state, data) {
      state.expressContractBikeSurchargeData = data;
    },
    fetchExpressContractBikeChargeByWeightData(state, data) {
      state.expressContractBikeChargeByWeightData = data;
    },
    fetchExpressContractBikeEditData(state, data) {
      state.ExpressContractBikeEditData = data;
    },
  },
  actions: {
    async getRateSuggestion(_, { id, payload }) {
      return await axios.post(
        "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/bike/" +
          id,
        payload
      );
    },

    //timeline
    resetExpressContractBikeTimeLineData({ commit }, { data }) {
      commit("fetchDefaultExpressContractBikeTimeLineData", data);
    },
    updateExpressContractBikeTimeLineData({ commit }, { data }) {
      commit("fetchExpressContractBikeTimeLineData", data);
    },
    //DIALOGS
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },

    //eslint-disable-next-line no-unused-vars
    async loadExpressContractBikeOverviewData({ commit }, { id }) {
      // axios.get("/salesCompany").then((res) => {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          commit("fetchExpressContractBikeOverviewData", res.data.results);
        }
      });
    },
    loadExpressContractBikeSurchargeData({ commit }, { id }) {
      axios
        .get(
          "settings/sales/rates/express/contract/ratecards/additionalsurcharges/" +
            id
        )
        .then((res) => {
          if (res.data.results) {
            commit("fetchExpressContractBikeSurchargeData", res.data.results);
          }
        });
    },
    loadExpressContractBikeChargeByWeightData({ commit }, { id }) {
      axios
        .get(
          "settings/sales/rates/express/contract/ratecards/normalcharges/ratejobsugession/bike/" +
            id
        )
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchExpressContractBikeChargeByWeightData",
              res.data.results
            );
          }
        });
    },
    // async loadExpressContractBikeEditData({ commit }, { path }) {
    //   await axios.get(path).then((res) => {
    //     if (res.data.results) {
    //       console.log(res.data.results, "edit bike data");
    //       commit("fetchExpressContractBikeEditData", res.data.results);
    //     }
    //   });
    // },
    async loadExpressContractBikeEditData({ commit }, id) {
      const res = await axios.get(`/sales/quotations/overview/` + id);

      if (res) {
        commit("fetchExpressContractBikeEditData", res.data.results || {});
      }
    },
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData, id, loadDiffStore }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");

          if (loadDiffStore) {
            // dispatch("salesSales/loadQuotationTabTableData")
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(
              loadData,
              {
                id: id,
                // ,
                //type: type
              },

              { root: true }
            );
            // this.$store.dispatch(
            //   "salesSales/loadQuotationTabTableData",
            //   {
            //     id: this.$route.params.id,

            //   }
            // );
            // this.$store.dispatch(
            //   "salesRapidoContract/loadRapidoContractOverviewData",
            //   {
            //     id: id,
            //   }
            // );
          }
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
          toastData.toastCommonErrorData.toastMsg = err.response.data.message;

          commit("toastMutation", toastData.toastCommonErrorData);
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

    ExpressContractBikeOverviewData: ({ ExpressContractBikeOverviewData }) =>
      ExpressContractBikeOverviewData,

    expressContractBikeAddNewData: ({ expressContractBikeAddNewData }) =>
      expressContractBikeAddNewData,

    ExpressContractBikeEditData: ({ ExpressContractBikeEditData }) =>
      ExpressContractBikeEditData,
  },
};
export default salesExpressBike;
