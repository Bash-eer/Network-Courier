import { _get, _post, _put, _patch, _delete } from "../../apiService";

const operationsStatusSettings = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    expressTableData: [],
    internationalTablesData: [],
    radpidoTableData: [],
    originalExpressTableData: [],
    originalInternationalTableData: [],
    originalRadpidoTableData: [],
    totalRecords: 0,
    statusTabMenuData: [
      {
        label: "ExpressTab",
        tab: "StatusSettingsTable",
        select: false,
        tabName: "Express",
        data: "expressTableData",
        pageOffset: "expressPageOffset",
        columns: "statusTableColumnData",
      },
      {
        label: "InternationalTab",
        tab: "StatusSettingsTable",
        select: true,
        tabName: "International",
        data: "internationalTablesData",
        pageOffset: "internationalPageOffset",
        columns: "statusTableColumnData",
      },
      {
        label: "RapidoTab",
        tab: "StatusSettingsTable",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        pageOffset: "rapidoPageOffset",
        columns: "statusTableColumnData",
      },
    ],
    statusTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "status_name", header: "Status Name" },
      { field: "statusSettings.display_name", header: "Created By" },
      { field: "status", header: "Status" },
      { field: "createdAt", header: "Created On" },
    ],
    toggleData: [{ type: "" }],
    displayDialog: false,
    dialogComponent: null,
    currentTab: null,
    statusSettingsCreationData: {},
    expressPageOffset: 1,
    internationalPageOffset: 1,
    rapidoPageOffset: 1,
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
  },

  getters: {
    //put getters methods goes here
    getStatusSettingsTabMenuData(state) {
      return state.statusTabMenuData;
    },
    getEditStatusData(state) {
      return state.statusSettingsCreationData;
    },
  },

  mutations: {
    //put update methods goes here

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updateFetchDateOfExpress(state, data) {
      state.expressTableData = data || [];
      state.originalExpressTableData = data || [];
    },

    updateFetchDateOfInternational(state, data) {
      state.internationalTablesData = data || [];
      state.originalInternationalTableData = data || [];
    },

    updateFetchDateOfRapido(state, data) {
      state.radpidoTableData = data || [];
      state.originalRadpidoTableData = data || [];
    },

    updateDisplayDialog(state, data) {
      state.displayDialog = data;
    },
  },

  actions: {
    //put methods to handle mutations and state

    loadExpressDataFetch({ state, commit, dispatch }, tab) {
      state.tableLoad = true;
      state.currentTab = tab;
      state.statusSettingsCreationData = {};
      return _get(`operations/rider-allot/statussettings/express`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const expressData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setExpressData = expressData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                statusSettings: res.express_status_settings,
                createdAt: new Date(res.createdAt),
              };

              return data;
            });
            let resultRows = setExpressData;
          for (let i in setExpressData) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(setExpressData[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
            commit("updateFetchDateOfExpress", setExpressData || []);
            commit("updateTotalRecords", totalRecords || 0);
            dispatch("commonSerachValue", "ExpressTab");
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    loadInternationalDataFetch({ state, commit, dispatch }, tab) {
      state.tableLoad = true;
      state.currentTab = tab;
      state.statusSettingsCreationData = {};
      return _get(`operations/rider-allot/statussettings/international`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const internationalData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setInternationalData = internationalData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                statusSettings: res.international_status_settings,
                createdAt: new Date(res.createdAt),
              };

              return data;
            });
            let resultRows = setInternationalData;
            for (let i in setInternationalData) {
              if (resultRows[i].createdAt) {
                resultRows[i]["createdAt"] = new Date(setInternationalData[i].createdAt);
              }
              resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
            }
            commit(
              "updateFetchDateOfInternational",
              setInternationalData || []
            );
            commit("updateTotalRecords", totalRecords || 0);
            dispatch("commonSerachValue", "InternationalTab");
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    loadRapidoDataFetch({ state, commit, dispatch }, tab) {
      state.tableLoad = true;
      state.currentTab = tab;
      state.statusSettingsCreationData = {};
      return _get(`operations/rider-allot/statussettings/rapido`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const rapidoData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setRapidoData = rapidoData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                statusSettings: res.rapido_status_settings,
                createdAt: new Date(res.createdAt),
              };

              return data;
            });
            let resultRows = setRapidoData;
            for (let i in setRapidoData) {
              if (resultRows[i].createdAt) {
                resultRows[i]["createdAt"] = new Date(setRapidoData[i].createdAt);
              }
              resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
            }
            commit("updateFetchDateOfRapido", setRapidoData || []);
            commit("updateTotalRecords", totalRecords || 0);
            dispatch("commonSerachValue", "RapidoTab");
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //create status on express
    createExpressStatusData({ state, commit }, data) {
      return _post(`operations/rider-allot/statussettings/express`, data)
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //create status on international
    createInternationalStatusData({ state, commit }, data) {
      return _post(`operations/rider-allot/statussettings/international`, data)
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //create status on rapido
    createRapidoStatusData({ state, commit }, data) {
      return _post(`operations/rider-allot/statussettings/rapido`, data)
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //update status on express
    updateExpressStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/express/${data.id}`,
        data.status_updates
      )
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //update status on international
    updateInternationalStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/international/${data.id}`,
        data.status_updates
      )
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //update status on rapido
    updateRapidoStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/rapido/${data.id}`,
        data.status_updates
      )
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //delete status on express
    deleteExpressStatusData({ state, commit }, id) {
      return _delete(`operations/rider-allot/statussettings/express/${id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //delete status on international
    deleteInternationalStatusData({ state, commit }, id) {
      return _delete(
        `operations/rider-allot/statussettings/international/${id}`
      )
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //delete status on rapido
    deleteRapidoStatusData({ state, commit }, id) {
      return _delete(`operations/rider-allot/statussettings/rapido/${id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //disable status on express
    disableExpressStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/express/${data.id}`,
        data.statusData
      )
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //disable status on international
    disableInternationalStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/international/${data.id}`,
        data.statusData
      )
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //disable status on rapido
    disableRapidoStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/rapido/${data.id}`,
        data.statusData
      )
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    async commonDelete({ state, commit, dispatch }, data) {
      state.tableLoad = true;
      if (data.type == "ExpressTab") {
        return await dispatch("deleteExpressStatusData", data.id);
      } else if (data.type == "RapidoTab") {
        return await dispatch("deleteRapidoStatusData", data.id);
      } else {
        return await dispatch("deleteInternationalStatusData", data.id);
      }
    },

    async commonDisable({ state, commit, dispatch }, data) {
      state.tableLoad = true;
      if (data.type == "ExpressTab") {
        return await dispatch("disableExpressStatusData", data);
      } else if (data.type == "RapidoTab") {
        return await dispatch("disableRapidoStatusData", data);
      } else {
        return await dispatch("disableInternationalStatusData", data);
      }
    },

    //common search data of status settings
    commonSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = (data.searchValue).toLowerCase();
      const searchValue = (data.searchValue).toLowerCase();
      if (data.label == "ExpressTab") {
        let searchOnArray = state.originalExpressTableData.filter(
          (item) =>
            ((item.status_name).toLowerCase()).includes(searchValue) ||
            ((item.statusSettings?.display_name).toLowerCase()).includes(searchValue) ||
            ((item.status).toLowerCase()).includes(searchValue)
        );
        state.expressTableData = searchOnArray;
        state.tableLoad = false;
      } else if (data.label == "InternationalTab") {
        let searchOnArray = state.originalInternationalTableData.filter(
          (item) =>
          ((item.status_name).toLowerCase()).includes(searchValue) ||
          ((item.statusSettings?.display_name).toLowerCase()).includes(searchValue) ||
          ((item.status).toLowerCase()).includes(searchValue)
        );
        state.internationalTablesData = searchOnArray;
        state.tableLoad = false;
      } else {
        let searchOnArray = state.originalRadpidoTableData.filter(
          (item) =>
          ((item.status_name).toLowerCase()).includes(searchValue) ||
          ((item.statusSettings?.display_name).toLowerCase()).includes(searchValue) ||
          ((item.status).toLowerCase()).includes(searchValue)
        );
        state.radpidoTableData = searchOnArray;
        state.tableLoad = false;
      }
    },

    //Update supervisor dialog visibility
    showStatusSettingsDialog({ state, commit }, data) {
      state.statusSettingsCreationData = {};
      commit("updateDisplayDialog", data);
    },

    updateStatusEditData({ state, commit }, data) {
      state.displayDialog = data.displayDialog;
      state.statusSettingsCreationData = data.statusData;
    },

    //Invoke method if search value exists on tab change
    commonSerachValue({ state, commit, dispatch }, data) {
      if (state.globalSearchKey !== "") {
        let searchParams = {
          searchValue: state.globalSearchKey,
          label: data,
        };
        dispatch("commonSearchData", searchParams);
      }
    },
  },
};

export default operationsStatusSettings;
