import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesExpressAdhoc = {
  namespaced: true,
  state: {
    expressAdhocTimeLineCurrentTab: "Overview",
    TimeLineCurrentTab: "Overview",
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    fromPostalCode: null,
    ExpressVanData: null,
    sendQuotationData: null,
    WatchVanUpdate: null,
    ExpressAdhocEditData: [],
    ExpressAdhocOverviewData: {},
    dialogHeader: null,
    SalesPersonData: [],
    SalesPersonDataPatch: {},
    NormalVanVolumetricData: null,
    additionOfRowsEach: null,
    deleteOfRowsEach: null,
    additionOfTotalRowsEach: null,
    // ExpressAdhoc: {},
    SalesPersonDataTimeLineHeader: {},
    ExpressAdhoc: null,
    ExpressAdhocRowDataTwo: null,
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    defaultexpressAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    ExpressAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "Profile",
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
    // ExpressAdhocOverviewData: [],

    inspectionsDropDownTableData: null,
    NormalBikeData: null,
    inspectionsDropDownTableDataOne: null,
    editExpressAdhocData: null,

    inspectionsDropDownTableDataColumns: [
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cut-Off Time" },
      { field: "cut_off_days_count", header: "Cut-Off Days" },
      { field: "net_charges", header: "Net Charges" },
    ],

    inspectionsDropDownTableDataColumn: [
      { field: "sno", header: "S.No" },
      { field: "charge_name", header: "Charges" },
      { field: "rate", header: "Net Charges" },
    ],

    inspectionsDropDownTableDataColumnsOne: [
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cut-Off Time" },
      { field: "cut_off_days_count", header: "Cut-Off Days" },
      { field: "net_charges", header: "Net Charges" },
    ],

    inspectionsDropDownTableDataColumnsTwo: [
      { field: "sno", header: "S.No" },
      { field: "charge_name", header: "Charges" },
      { field: "rate", header: "Net Charges" },
    ],

    DialogNormalVan: null,
    selectRateDataWithSurcharge: [],
  },
  mutations: {
    fetchExpressAdhocTimeLineData(state, data) {
      state.ExpressAdhocTimeLine.push(data);
    },
    fetchDefaultExpressAdhocTimeLineData(state, data) {
      state.ExpressAdhocTimeLine = [];
      state.ExpressAdhocTimeLine = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchExpressAdhocOverviewData(state, data) {
      state.ExpressAdhocOverviewData = data;
    },
    fetchLoadAdhocDialogNormalBike(state, data) {
      state.NormalBikeData = data;
    },
    fetchLoadAdhocDialogEcommerceBike(state, data) {
      state.inspectionsDropDownTableData = data;
      state.additionOfRowsEach = data;
    },
    fetchDataForAdditionOfRowsEach(state, data) {
      state.additionOfRowsEach = data;
    },
    fetchLoadAdhocDialogEcommerceVan(state, data) {
      state.ExpressVanData = data;
    },
    postResponseSendQuotation(state, data) {
      state.sendQuotationData = data;
    },
    fetchCreateQuotationExpressAdhoc(state, data) {
      state.ExpressAdhoc = data;
    },
    fetchLoadAdhocDialogNormalVan(state, data) {
      state.DialogNormalVan = data;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },

    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },

    fetchExpressAdhocRowData(state, data) {
      state.editExpressAdhocData = data;
    },

    fetchSalesPersonDataTimeLineHeader(state, data) {
      state.SalesPersonDataTimeLineHeader = data;
    },
    // fetchExpressAdhocOverviewData(state, data) {
    //   state.ExpressAdhocOverviewData = data;
    // },
    GetNormalVanVolumetricData(state, data) {
      state.NormalVanVolumetricData = data;
    },
    fetchExpressAdhocRowDataTwo(state, data) {
      state.ExpressAdhocRowDataTwo = data;
    },

    fetchSurchargeDataForSelectedRate(state, data) {
      state.selectRateDataWithSurcharge = data;
    },
  },
  actions: {
    resetExpressAdhocTimeLineData({ commit }, { data }) {
      commit("fetchDefaultExpressAdhocTimeLineData", data);
    },
    updateExpressAdhocTimeLineData({ commit }, { data }) {
      commit("fetchExpressAdhocTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    createQuotationExpressAdhoc({ commit }, { data }) {
      commit("fetchCreateQuotationExpressAdhoc", data);
    },

    async loadExpressAdhocOverviewData({ commit }, { id }) {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          commit("fetchExpressAdhocOverviewData", res.data.results);
        }
      });
    },
    // async loadExpressAdhocOverviewData({ commit }, { id }) {
    //   await axios.get("/sales/quotations/overview/" + id).then((res) => {
    //     if (res.data.results) {
    //       commit("fetchExpressAdhocOverviewData", res.data.results);
    //     }
    //   });
    // },

    loadAdhocDialogNormalBike(
      { commit, dispatch },
      { path, id, payload, mutation }
    ) {
      axios.post(path + id, payload).then((res) => {
        let resultRows = res.data.results;

        for (let i = 0; i < resultRows.length; i++) {
          let r_obj = resultRows[i];
          r_obj["sno"] = i + 1;
        }

        commit(mutation, resultRows);

        return resultRows;
      });
    },
    loadAdhocDialogEcommerceBike({ commit }, { path, id, payload, mutation }) {
      axios
        .post(path + id, payload)
        .then((res) => {
          let resultRows = res.data.results;

          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];
            r_obj["sno"] = i + 1;
          }

          return resultRows;
        })
        .then((befResp) => {
          axios
            .post(
              `/settings/sales-settings/rates/express/adhoc/zones/suggestions/additonal-surcharges`,
              payload
            )
            .then((res, i) => {
              if (res?.data?.results) {
                let resultRows = befResp;
                let surchargeArr = res.data.results;

                for (let i = 0; i < resultRows.length; i++) {
                  let r_obj = resultRows[i];
                  r_obj["surchargeData"] = surchargeArr
                    ? surchargeArr.map((val) => {
                      return {
                        selected: false,
                        surcharge_id: val.id,
                        rates: val.rates,
                        surcharge_name: val.surcharge_name,
                        geo_fencing_id: val.geo_fencing_id,
                        key: r_obj.delivery_type_initial + val.surcharge_name,
                        delivery_type_initial: r_obj.delivery_type_initial,
                      };
                    })
                    : [];
                }
                commit(mutation, resultRows);
              }
            });
        });
    },

    loadAdhocDialogEcommerceVan({ commit }, { path, id, payload }) {
      axios
        .post(path + id, payload)
        .then((res) => {
          let resultRows = res.data.results;

          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];
            r_obj["sno"] = i + 1;
          }

          return resultRows;
        })
        .then((befResp) => {
          axios
            .post(
              `/settings/sales-settings/rates/express/adhoc/zones/suggestions/additonal-surcharges`,
              payload
            )
            .then((res, i) => {
              if (res?.data?.results) {
                let resultRows = befResp;
                let surchargeArr = res.data.results;

                for (let i = 0; i < resultRows.length; i++) {
                  let r_obj = resultRows[i];
                  r_obj["surchargeData"] = surchargeArr
                    ? surchargeArr.map((val) => {
                      return {
                        selected: false,
                        surcharge_id: val.id,
                        rates: val.rates,
                        surcharge_name: val.surcharge_name,
                        geo_fencing_id: val.geo_fencing_id,
                        key: r_obj.delivery_type_initial + val.surcharge_name,
                        delivery_type_initial: r_obj.delivery_type_initial,
                      };
                    })
                    : [];
                }

                commit("fetchLoadAdhocDialogEcommerceVan", resultRows);
              }
            });
        });
    },

    async loadAdhocDialogNormalVan({ commit }, { path, id, payload, method }) {
      await axios.post(path + id, payload).then((res) => {
        let resultRows = res.data.results;

        for (let i = 0; i < resultRows.length; i++) {
          let r_obj = resultRows[i];
          r_obj["sno"] = i + 1;
        }
        commit(method, res.data.results);
      });
    },

    loadSalesPersonDataPatch({ commit }, { path, id, payload }) {
      axios.get(path + id, payload).then((res) => {
        commit("fetchSalesPersonDataPatch", res.data.results);
      });
    },

    loadSalesPersonDataTimeLineHeader({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },

    loadSalesPersonData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchSalesPersonData", res.data.results);
        }
      });
    },

    loadGetNormalVanVolumetricData({ commit }) {
      axios
        .get("/settings/salesSettinigs/others/others/volumetric-value")
        .then((res) => {
          if (res.data) {
            commit("GetNormalVanVolumetricData", res.data.results);
          }
        });
    },

    async loadExpressAdhocPatch(_, { id1, data }) {
      return await axios.patch("/sales/quotation/" + id1, data);
    },

    async loadExpressAdhocRowData({ commit }, id) {
      const res = await axios.get(`/sales/quotations/overview/` + id);

      if (res) {
        if (res.data.results.express_adhoc_specifics.normal_charges) {
          let resultRows =
            res.data.results.express_adhoc_specifics.normal_charges;
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];
            r_obj["sno"] = i + 1;
          }
        } else if (res.data.results.express_adhoc_specifics.delivery_charges) {
          let resultRows =
            res.data.results.express_adhoc_specifics.normal_charges;
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];
            r_obj["sno"] = i + 1;
          }
        }
        commit("fetchExpressAdhocRowData", res.data.results || {});
      }
    },

    loadExpressAdhocRowDataTwo({ commit, path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchExpressAdhocRowDataTwo", res.data.results);
        }
      });
    },

    updateSelectedDataSurcharge({ commit, path, state }, objVal) {
      let { event, selected, tableDatas, boolean } = objVal;
      let arrUpdate = tableDatas?.map((val) => {
        if (val.sno == event.data.sno) {
          let surcharges = val.surchargeData;
          let selectedId = selected.map((vals) => vals.surcharge_id);

          let upValue = surcharges.map((c) => {
            if (selectedId.includes(c.surcharge_id)) {
              return { ...c, selected: true };
            } else {
              return c;
            }
          });

          let datas = {
            ...val,
            surchargeData: upValue,
          };

          return datas;
        } else {
          return { ...val };
        }
      });

      commit("fetchLoadAdhocDialogEcommerceBike", arrUpdate);
    },

    updateSelectedDataSurchargeForFalse({ commit, path, state }, objVal) {
      let { event, selected, tableDatas } = objVal;
      let arrUpdate = tableDatas?.map((val) => {
        if (val.sno == event.data.sno) {
          let surcharges = val.surchargeData;
          let selectedId = selected.map((vals) => vals.surcharge_id);

          let upValue = surcharges.map((c) => {
            if (selectedId.includes(c.surcharge_id)) {
              return { ...c, selected: false };
            } else {
              return c;
            }
          });

          let datas = {
            ...val,
            surchargeData: upValue,
          };

          return datas;
        } else {
          return { ...val };
        }
      });

      commit("fetchLoadAdhocDialogEcommerceBike", arrUpdate);
    },

    updateSelectedDataSurchargeForEcomVan({ commit, path, state }, objVal) {
      let { event, selected, tableDatas } = objVal;
      let selectedId = selected.map((vals) => vals.surcharge_id);
      let arrUpdate = tableDatas?.map((val) => {
        if (val.sno == event.data.sno) {
          let surcharges = val.surchargeData;

          let upValue = surcharges.map((c) => {
            if (selectedId.includes(c.surcharge_id)) {
              return { ...c, selected: true };
            } else {
              return c;
            }
          });

          let datas = {
            ...val,
            surchargeData: upValue,
          };

          return datas;
        } else {
          return { ...val };
        }
      });

      commit("fetchLoadAdhocDialogEcommerceVan", arrUpdate);
    },

    updateSelectedDataSurchargeForEcomVanFalse(
      { commit, path, state },
      objVal
    ) {
      let { event, selected, tableDatas } = objVal;
      let arrUpdate = tableDatas?.map((val) => {
        if (val.sno == event.data.sno) {
          let surcharges = val.surchargeData;
          let selectedId = selected.map((vals) => vals.surcharge_id);

          let upValue = surcharges.map((c) => {
            if (selectedId.includes(c.surcharge_id)) {
              return { ...c, selected: false };
            } else {
              return c;
            }
          });

          let datas = {
            ...val,
            surchargeData: upValue,
          };

          return datas;
        } else {
          return { ...val };
        }
      });

      commit("fetchLoadAdhocDialogEcommerceVan", arrUpdate);
    },

    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData, id, closeDialog }
    ) {
      return axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          commit("postResponseSendQuotation", res);
          dispatch(closeDialog, { root: true });
          dispatch(loadData, { id: id }, { root: true });
          commit("toastMutation", toastData.toastSuccessData);
          return res;
        })
        .catch((err) => {
          commit("toastMutation", toastData.toastCommonErrorData);
        });
    },
  },
  getters: {
    getSendQutationData(state) {
      return state.sendQuotationData;
    },
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    ExpressAdhocOverviewData: ({ ExpressAdhocOverviewData }) =>
      ExpressAdhocOverviewData,
  },
};
export default salesExpressAdhoc;
