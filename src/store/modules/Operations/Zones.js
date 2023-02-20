import { _get, _post, _put, _patch, _delete } from "../../apiService";

const operationZones = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    bikeTableData: [],
    vanTablesData: [],
    radpidoTableData: [],
    totalRecords: 0,
    zonesTabMenuData: [
      {
        label: "BikeTab",
        tab: "ZoneTables",
        select: false,
        tabName: "Bike",
        data: "bikeTableData",
        pageOffset: "bikePageOffset",
        columns: "zonesTableColumnData",
      },
      {
        label: "VanTab",
        tab: "ZoneTables",
        select: true,
        tabName: "Van",
        data: "vanTablesData",
        pageOffset: "vanPageOffset",
        columns: "zonesTableColumnData",
      },
      {
        label: "RapidoTab",
        tab: "ZoneTables",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        pageOffset: "rapidoPageOffset",
        columns: "zonesTableColumnData",
      },
    ],
    zonesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "zone_name", header: "Zone Name" },
      { field: "zone_tag", header: "Zone Tag" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    zoneFilterParams: [
      {
        column_name: "zone_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "zone_tag",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "display_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "createdAt",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "status",
        type: "contains",
        searchKey: "",
      },
    ],
    toggleData: [{ type: "" }],
    displayDialog: false,
    dialogComponent: null,
    currentTab: null,
    zonesCreationData: {},
    bikePageOffset: 1,
    vanPageOffset: 1,
    rapidoPageOffset: 1,
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
  },

  getters: {
    //put getters methods goes here
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    getEditZonesData(state) {
      return state.zonesCreationData;
    },
    getFilterParams(state) {
      return state.zoneFilterParams;
    },
    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getAllPageOffset(state) {
      let allPageOffset = {
        bikePageOffset: state.bikePageOffset,
        vanPageOffset: state.vanPageOffset,
        rapidoPageOffset: state.rapidoPageOffset,
      };
      return allPageOffset;
    },
  },

  mutations: {
    //put update methods goes here

    updateFetchDateOfBike(state, data) {
      state.bikeTableData = data || [];
    },

    updateFetchDateOfVan(state, data) {
      state.vanTablesData = data || [];
    },

    updateFetchDateOfRapido(state, data) {
      state.radpidoTableData = data || [];
    },

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },
    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
      state[data.tabOfPageOffset] = data.offset;
    },
  },

  actions: {
    //put methods to handle mutations and state

    //load bike tab table data
    loadBikeTableData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/bikes/zones?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}`,
          data
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let bikeData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.orderBy &&
                data?.orderBy[0] == "createdAt" &&
                data?.orderBy[1] == "DESC";
              let setBikeData = bikeData.map((res, index) => {
                let ascendingNo =
                  (data.offset - 1) * data.limit + Number(index) + 1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.offset - 1) * data.limit + Number(index) + 1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateFetchDateOfBike", setBikeData || []);
              commit("updateTotalRecords", totalRecords || 0);
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
    loadVanTableData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/vans/zones?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}`,
          data
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let vanData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.orderBy &&
                data?.orderBy[0] == "createdAt" &&
                data?.orderBy[1] == "DESC";
              let setVanData = vanData.map((res, index) => {
                let ascendingNo =
                  (data.offset - 1) * data.limit + Number(index) + 1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.offset - 1) * data.limit + Number(index) + 1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateFetchDateOfVan", setVanData || []);
              commit("updateTotalRecords", totalRecords || 0);
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
    loadRapidoTableData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/rapidos/zones?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}`,
          data
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let rapidoData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.orderBy &&
                data?.orderBy[0] == "createdAt" &&
                data?.orderBy[1] == "DESC";
              let setRapidoData = rapidoData.map((res, index) => {
                let ascendingNo =
                  (data.offset - 1) * data.limit + Number(index) + 1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.offset - 1) * data.limit + Number(index) + 1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateFetchDateOfRapido", setRapidoData || []);
              commit("updateTotalRecords", totalRecords || 0);
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

    //create zone on bike
    createBikeZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/bike/zones`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //create zone on van
    createVanZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/van/zones`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //create zone on rapido
    createRapidoZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/rapido/zones`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //update zone on bike
    updateBikeZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/bike/zone/${data.id}`, data.zones.zones)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //update zone on van
    updateVanZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/van/zone/${data.id}`, data.zones.zones)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //update zone on rapido
    updateRapidoZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/rapido/zone/${data.id}`, data.zones.zones)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //delete zone on bike
    deleteBikeZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/bike/zone/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
              state.bikePageOffset = state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //delete zone on van
    deleteVanZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/van/zone/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
              state.vanPageOffset = state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //delete zone on rapido
    deleteRapidoZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/rapido/zone/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
              state.rapidoPageOffset = state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //disable zone on bike
    disableBikeZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/bike/zones/status/${data.id}`, {
          status: data.status,
        })
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //disable zone on van
    disableVanZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/van/zones/status/${data.id}`, {
          status: data.status,
        })
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //disable zone on rapido
    disableRapidoZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/rapido/zones/status/${data.id}`, {
          status: data.status,
        })
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async commonDelete({ state, commit, dispatch }, data) {
      if (data.type == "bikeTableData") {
        return await dispatch("deleteBikeZoneData", data.id);
      } else if (data.type == "vanTablesData") {
        return await dispatch("deleteVanZoneData", data.id);
      } else {
        return await dispatch("deleteRapidoZoneData", data.id);
      }
    },

    async commonDisable({ state, commit, dispatch }, data) {
      if (data.type == "bikeTableData") {
        return await dispatch("disableBikeZoneData", data);
      } else if (data.type == "vanTablesData") {
        return await dispatch("disableVanZoneData", data);
      } else {
        return await dispatch("disableRapidoZoneData", data);
      }
    },

    //update page offset and limit on table
    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },
  },
};

export default operationZones;
