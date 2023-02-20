import { _get, _post, _put, _patch, _delete } from "../../apiService";

const supervisorAllotment = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    bikeTableData: [],
    vanTableData: [],
    radpidoTableData: [],
    originalBikeTableData: [],
    originalVanTableData: [],
    originalRadpidoTableData: [],
    totalRecords: 0,
    supervisorTabMenuData: [
      {
        label: "BikeTab",
        tab: "supervisorTables",
        select: false,
        tabName: "Bike",
        data: "bikeTableData",
        pageOffset: "bikePageOffset",
        columns: "supervisorTableColumnData",
      },
      {
        label: "VanTab",
        tab: "supervisorTables",
        select: true,
        tabName: "Van",
        data: "vanTableData",
        pageOffset: "vanPageOffset",
        columns: "supervisorTableColumnData",
      },
      {
        label: "RapidoTab",
        tab: "supervisorTables",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        pageOffset: "rapidoPageOffset",
        columns: "supervisorTableColumnData",
      },
    ],
    supervisorTableColumnData: [
      { field: "s_no", header: "S. No" },
      { field: "zone_name", header: "Zone" },
      {
        field: "supervisor.employee_name",
        header: "Supervisor",
      },
      // { field: "approved", header: "Approved" },
      // { field: "rejected", header: "Rejected" },
    ],
    toggleData: [{ type: "" }],
    displayDialog: false,
    dialogComponent: null,
    currentTab: null,
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
    supervisorData: {},
    supervisorsList: [],
    emptySupervisor: {
      id: null,
      name: "None",
      image_url: "null",
      employee_name: "None",
    },
  },

  getters: {
    //put getters methods goes here

    getTabMenuData(state) {
      return state.supervisorTabMenuData;
    },
    getSupervisorsList(state) {
      return state.supervisorsList;
    },
    getEditSupervisorData(state) {
      return state.supervisorData;
    },
  },

  mutations: {
    //put update methods goes here

    updateFetchDateOfBike(state, data) {
      state.bikeTableData = data || [];
      state.originalBikeTableData = data || [];
    },

    updateFetchDateOfVan(state, data) {
      state.vanTableData = data || [];
      state.originalVanTableData = data || [];
    },

    updateFetchDateOfRapido(state, data) {
      state.radpidoTableData = data || [];
      state.originalRadpidoTableData = data || [];
    },

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
      state[data.tabOfPageOffset] = data.offset;
    },
    updateSupervisorsList(state, data) {
      state.supervisorsList = data;
    },
    updateDisplayDialog(state, data) {
      state.displayDialog = data;
    },
  },

  actions: {
    //put methods to handle mutations and state

    //load bike tab table data
    loadBikeTableData({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        _get(`operations/rider-allot/bike/supervisor-allotment`)
          .then(async (response) => {
            if (response && response.status === 200) {
              const bikeData = response?.data.results || [];
              const totalRecords = response?.data.results.length || 0;

              let setBikeData = bikeData.map((res, index) => {
                let ascendingNo = Number(index) + 1;
                let data = {
                  ...res,
                  s_no: ascendingNo,
                  supervisor: res.zone_supervisor || state.emptySupervisor,
                };

                return data;
              });

              commit("updateFetchDateOfBike", setBikeData || []);
              commit("updateTotalRecords", totalRecords || 0);
              dispatch("commonSerachValue", "BikeTab");
            }
            state.tableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.tableLoad = false;
            reject(err);
          });
      });
    },

    //load van tab table data
    loadVanTableData({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        _get(`operations/rider-allot/van/supervisor-allotment`)
          .then(async (response) => {
            if (response && response.status === 200) {
              const vanData = response?.data.results || [];
              const totalRecords = response?.data.results.length || 0;

              let setVanData = vanData.map((res, index) => {
                let ascendingNo = Number(index) + 1;
                let data = {
                  ...res,
                  s_no: ascendingNo,
                  supervisor: res.zone_supervisor || state.emptySupervisor,
                };

                return data;
              });
              commit("updateFetchDateOfVan", setVanData || []);
              commit("updateTotalRecords", totalRecords || 0);
              dispatch("commonSerachValue", "VanTab");
            }
            state.tableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.tableLoad = false;
            reject(err);
          });
      });
    },

    //load rapido tab table data
    loadRapidoTableData({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        _get(`operations/rider-allot/rapido/supervisor-allotment`)
          .then(async (response) => {
            if (response && response.status === 200) {
              const rapidoData = response?.data.results || [];
              const totalRecords = response?.data.results.length || 0;

              let setRapidoData = rapidoData.map((res, index) => {
                let ascendingNo = Number(index) + 1;
                let data = {
                  ...res,
                  s_no: ascendingNo,
                  supervisor: res.zone_supervisor || state.emptySupervisor,
                };

                return data;
              });
              commit("updateFetchDateOfRapido", setRapidoData || []);
              commit("updateTotalRecords", totalRecords || 0);
              dispatch("commonSerachValue", "RapidoTab");
            }
            state.tableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.tableLoad = false;
            reject(err);
          });
      });
    },

    loadSupervisorsList({ state, commit }) {
      return _get(`hrms/employee/supervisor`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const supervisorsList = response?.data.results || [];
            for (let i = 0; i < supervisorsList.length; i++) {
              supervisorsList[i] = {
                ...supervisorsList[i],
                name: supervisorsList[i]["employee_name"],
              };
            }
            supervisorsList.unshift(state.emptySupervisor);
            commit("updateSupervisorsList", supervisorsList || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Update supervisor dialog visibility
    showSupervisorDialog({ state, commit }, data) {
      commit("updateDisplayDialog", data);
    },

    //create supervisor allotment of bike
    createBikeSupervisor({ state, commit }, data) {
      return _post(`operations/rider-allot/bike/supervisor-allotment`, data)
        .then(async (response) => {
          state.displayDialog = false;
          return response;
        })
        .catch((err) => {
          state.displayDialog = false;
          return err;
        });
    },

    //create supervisor allotment of van
    createVanSupervisor({ state, commit }, data) {
      return _post(`operations/rider-allot/van/supervisor-allotment`, data)
        .then(async (response) => {
          state.displayDialog = false;
          return response;
        })
        .catch((err) => {
          state.displayDialog = false;
          return err;
        });
    },

    //create supervisor allotment of rapido
    createRapidoSupervisor({ state, commit }, data) {
      return _post(`operations/rider-allot/rapido/supervisor-allotment`, data)
        .then(async (response) => {
          state.displayDialog = false;
          return response;
        })
        .catch((err) => {
          state.displayDialog = false;
          return err;
        });
    },

    //update supervisor allotment of bike
    updateBikeSupervisor({ state, commit }, data) {
      state.tableLoad = true;

      return _patch(
        `operations/rider-allot/bike/supervisor-allotment`,
        data.rowData
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

    //update supervisor allotment of van
    updateVanSupervisor({ state, commit }, data) {
      state.tableLoad = true;

      return _patch(
        `operations/rider-allot/van/supervisor-allotment`,
        data.rowData
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

    //update supervisor allotment of rapido
    updateRapidoSupervisor({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(
        `operations/rider-allot/rapido/supervisor-allotment`,
        data.rowData
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

    //common search data of supervisor allotment
    commonSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      if (data.label == "BikeTab") {
        let searchOnArray = state.originalBikeTableData.filter(
          (item) =>
            (item.supervisor?.employee_name || "")
              .toLowerCase()
              .includes(searchValue) ||
            item.zone_name.toLowerCase().includes(searchValue)
        );
        state.bikeTableData = searchOnArray;
        state.tableLoad = false;
      } else if (data.label == "VanTab") {
        let searchOnArray = state.originalVanTableData.filter(
          (item) =>
            (item.supervisor?.employee_name || "")
              .toLowerCase()
              .includes(searchValue) ||
            item.zone_name.toLowerCase().includes(searchValue)
        );
        state.vanTableData = searchOnArray;
        state.tableLoad = false;
      } else {
        let searchOnArray = state.originalRadpidoTableData.filter(
          (item) =>
            (item.supervisor?.employee_name || "")
              .toLowerCase()
              .includes(searchValue) ||
            item.zone_name.toLowerCase().includes(searchValue)
        );
        state.radpidoTableData = searchOnArray;
        state.tableLoad = false;
      }
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

export default supervisorAllotment;
