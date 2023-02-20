import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressContractFSR = {
  namespaced: true,
  state: {
    expressContractFSRCurrentTab: "Overview",
    dialogComponent: null,
    dialogHeader: null,
    additionOfRowsEach: null,
    ExpressContractFsrOverviewData: null,
    ExpressContractFsrOverviewEditData: null,
    ExpressAdhocSalesPersonData: null,
    loadSalesPersonDataDropdown: null,
    quotationDetails: [],
    // additionOfRowsEach: null,
    stepperNavigation: null,
    attachmentsFsrData: null,
    FSRAttachmentsStateData: {},
    FSRAttachmentsFiles: [],
    deletedFSRAttachmentsFiles: [],
    ExpressContractFsrDialogFestivalDropDown: null,
    ExpressContractFsrDialogReferenceDropDown: null,
    ExpressContractFsrDialogCompetitorDropDown: null,
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    defaultexpressContractFSR: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    expressQuotationContactsTableData: null,
    FSRCostingDetails: null,
    expressQuotationContactsTableColumnData: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact No" },
      { field: "email", header: "E-Mail" },
      { field: "designation", header: "Designation" },
    ],
    ExpressContractVanFSRTimeLineData: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetails",
      },
      {
        index: 2,
        color: "#ffff",
      },
    ],

    addSalesFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "FSRQuotationDialog",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "FSRSelectMethodDialog",
        name: "Select Method",
      },

      {
        index: 2,
        label: "3",
        component: "FSRCostingDetailsDialog",
        name: "Costing Details",
      },
      {
        index: 3,
        label: "4",
        component: "FSRSendQuotationsDialog",
        name: "Contract | Send Quotations",
      },
    ],
  },

  mutations: {
    fetchDefaultexpressContractFSRTimeLineData(state, data) {
      state.ExpressContractFSRTimeLineData = [];
      state.ExpressContractFSRTimeLineData = data;
    },
    fetchexpressContractFSRTimeLineData(state, data) {
      state.ExpressContractFSRTimeLineData.push(data);
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchExpressContractFsrOverviewData(state, data) {
      console.log("data-----------------", data);
      state.ExpressContractFsrOverviewData = data;
    },

    fetchExpressContractFsrOverviewEditData(state, data) {
      console.log(data, "dataaaaaaaaaaa");
      state.ExpressContractFsrOverviewEditData = data;
    },

    fetchExpressAdhocSalesPersonData(state, data) {
      state.ExpressAdhocSalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    toastMutation(state, toastData) {
      console.log(".....  toastData", toastData);
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.loadSalesPersonDataDropdown = data;
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    fetchExpressContractFsrDialogFestivalDropDown(state, data) {
      state.ExpressContractFsrDialogFestivalDropDown = data.map((i) => ({
        name: i.festival_name,
        code: i.id,
      }));
    },
    fetchExpressContractFsrDialogReferenceDropDown(state, data) {
      state.ExpressContractFsrDialogReferenceDropDown = data.map((i) => ({
        name: i.domain,
        code: i.id,
      }));
    },

    fetchExpressContractFsrDialogCompetitorDropDown(state, data) {
      state.ExpressContractFsrDialogCompetitorDropDown = data.map((i) => ({
        name: i.competitor_name,
        code: i.id,
      }));
      console.log(data, "data");
    },
  },

  actions: {
    resetExpressContractFSRTimeLineData({ commit }, { data }) {
      commit("fetchDefaultexpressContractFSRTimeLineData", data);
    },
    updateExpressContractFSRTimeLineData({ commit }, { data }) {
      commit("fetchexpressContractFSRTimeLineData", data);
    },
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

    loadExpressContractFsrOverviewData({ commit }, { id }) {
      axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "resultOverview000000000000");
          commit("fetchExpressContractFsrOverviewData", res.data.results);
        }
      });
    },

    // async loadExpressContractFsrOverviewData({ commit }, { id }) {
    //   const res = await axios.get(`/sales/profiles/` + id);

    //   if (res) {
    //     console.log(
    //       id,
    //       "fetchExpressContractFsrOverviewData",
    //       res.data.results
    //     );
    //     commit("fetchExpressContractFsrOverviewData", res.data.results || {});
    //   }
    // },

    // async loadExpressContractFSRRowData({ commit, dispatch }, { path }) {
    //   await axios.get(path).then((res) => {
    //     if (res?.data?.results) {
    //       dispatch(
    //         "salesSales/openDialog",
    //         {
    //           dialogDetails: {
    //             dialogName: "ExpressContractFsrDialog",
    //             dialogHeader: "Edit Express Contract FSR",
    //           },
    //         },
    //         {
    //           root: true,
    //         }
    //       );

    //       commit("fetchExpressContractFsrOverviewEditData", res.data.results);

    //       console.log(res.data.results, "resultOverview");
    //     }
    //   });
    // },

    async loadExpressContractFSRRowData({ commit }, id) {
      const res = await axios.get(`/sales/quotations/overview/` + id);

      if (res) {
        commit(
          "fetchExpressContractFsrOverviewEditData",
          res.data.results || {}
        );
      }
    },

    async loadExpressContractFsrDialogFestivalDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/festival/dropdown")
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchExpressContractFsrDialogFestivalDropDown",
              res.data.results
            );
          }
        });
    },

    async loadExpressContractFsrDialogReferenceDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/reference/dropdown")
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchExpressContractFsrDialogReferenceDropDown",
              res.data.results
            );
          }
        });
    },

    async loadExpressContractFsrDialogCompetitorDropDown({ commit }) {
      await axios
        .get("/settings/salesSettinigs/others/competitor/dropdown")
        .then((res) => {
          if (res.data.results) {
            console.log(
              res.data.results,
              " ExpressContractFsrDialogCompetitorDropDown"
            );
            commit(
              "fetchExpressContractFsrDialogCompetitorDropDown",
              res.data.results
            );
          }
        });
    },

    ExpressAdhocloadSalesPersonData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchExpressAdhocSalesPersonData", res.data.results);
        }
      });
    },

    loadSalesPersonDataDropdownFsr({ commit }, { path, payload }) {
      axios.patch(path, payload).then((res) => {
        if (res.data) {
          commit("fetchloadSalesPersonDataDropdown", res);
        }
      });
    },

    // POSTPATCHCRUDOPERATION(
    //   { dispatch, commit },
    //   { path, method, data, loadData, toastData, triggered }
    // ) {
    //   axios({
    //     url: path,
    //     method: method,
    //     data: data,
    //   })
    //     .then(() => {
    //       if (triggered) {
    //         console.log("if----------------------")
    //         commit("triggerThirdPageLoadMutation");
    //       } else {
    //         dispatch(loadData.loadApi, {
    //           path: loadData.loadPath,
    //           mutation: loadData.loadMutation,
    //         });
    //       }
    //       commit("toastMutation", toastData.toastSuccessData);

    //       dispatch("closeDialog");
    //     })
    //     .catch((err) => {
    //       console.log("else----------------------")
    //       if (err.response) {
    //         toastData.toastCommonErrorData.toastMsg = err.response.data.message;

    //         commit("toastMutation", toastData.toastCommonErrorData);
    //       }
    //     });
    // },

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
          commit("toastMutation", toastData.toastSuccessData);
          console.log("load data toast", loadData, toastData.toastSuccessData);
        })
        .catch((err) => {
          console.log(err);
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
    ExpressContractFsrOverviewData: ({ ExpressContractFsrOverviewData }) =>
      ExpressContractFsrOverviewData,
    ExpressContractFsrOverviewEditData: ({
      ExpressContractFsrOverviewEditData,
    }) => ExpressContractFsrOverviewEditData,
    FSRAttachmentsStateData: ({ FSRAttachmentsStateData }) =>
      FSRAttachmentsStateData,
  },
};

export default salesExpressContractFSR;
