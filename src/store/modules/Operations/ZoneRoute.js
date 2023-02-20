import { _get, _post, _put, _patch, _delete } from "../../apiService";

const operationZonesRoute = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    zonesRouteTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "route_name", header: "Route Name" },
      { field: "route_tag", header: "Route Tag" },
      { field: "cbd", header: "CBD" },
      { field: "ncbd", header: "N-CBD" },
      { field: "outskirts", header: "Outskirt" },
      { field: "max_load", header: "Max Load" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    initialData: {},
    totalRecords: 0,
    zoneRouteFilterParams: [
      {
        column_name: "route_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "route_tag",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "cbd",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "ncbd",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "outskirts",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "max_load",
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
    zoneRouteListData: [],
    toggleData: [{ type: "" }],
    displayDialog: false,
    dialogComponent: null,
    currentPath: null,
    currentTab: "",
    path: "",
    selectedZoneName: "",
    zoneName: "",
    zoneId: null,
    zonesRouteCreationData: {},
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
  },

  getters: {
    //put getters methods goes here
    getZonesRouteData(state) {
      return state.zoneRouteListData;
    },

    getBreadCrumbPath(state) {
      return {
        path: state.path,
        zoneName: state.zoneName,
      };
    },

    getEditRouteZonesData(state) {
      return state.zonesRouteCreationData;
    },
    getRouteZoneFilterParams(state) {
      return state.zoneRouteFilterParams;
    },
    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
  },

  mutations: {
    //put update methods goes here

    updateZonesRouteData(state, data) {
      state.zoneRouteListData = data || [];
    },
    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },
    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
    },
    updateCurrentTab(state, data){
      state.currentTab = data;
    }
  },

  actions: {
    //put methods to handle mutations and state

    //load bike tab table data
    loadBikeRouteData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/bike/zones/route/${data.id}?offset=${data.pagination.offset}&limit=${data.pagination.limit}&globalsearchkey=${state.globalSearchKey}`,
          data.pagination
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let bikeData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.pagination?.orderBy &&
                data.pagination?.orderBy[0] == "createdAt" &&
                data.pagination?.orderBy[1] == "DESC";
              let setBikeData = bikeData.map((res, index) => {
                let ascendingNo =
                  (data.pagination.offset - 1) * data.pagination.limit +
                  Number(index) +
                  1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.pagination.offset - 1) * data.pagination.limit +
                    Number(index) +
                    1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateZonesRouteData", setBikeData || []);
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
    loadVanRouteData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/van/zones/route/${data.id}?offset=${data.pagination.offset}&limit=${data.pagination.limit}&globalsearchkey=${state.globalSearchKey}`,
          data.pagination
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let vanData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.pagination?.orderBy &&
                data.pagination?.orderBy[0] == "createdAt" &&
                data.pagination?.orderBy[1] == "DESC";
              let setVanData = vanData.map((res, index) => {
                let ascendingNo =
                  (data.pagination.offset - 1) * data.pagination.limit +
                  Number(index) +
                  1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.pagination.offset - 1) * data.pagination.limit +
                    Number(index) +
                    1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateZonesRouteData", setVanData || []);
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
    loadRapidoRouteData({ state, commit }, data) {
      state.zonesCreationData = {};
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-plan/rapido/zones/route/${data.id}?offset=${data.pagination.offset}&limit=${data.pagination.limit}&globalsearchkey=${state.globalSearchKey}`,
          data.pagination
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let rapidoData = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc =
                data.pagination?.orderBy &&
                data.pagination?.orderBy[0] == "createdAt" &&
                data.pagination?.orderBy[1] == "DESC";
              let setRapidoData = rapidoData.map((res, index) => {
                let ascendingNo =
                  (data.pagination.offset - 1) * data.pagination.limit +
                  Number(index) +
                  1;
                let descendingNo =
                  totalRecords +
                  1 -
                  ((data.pagination.offset - 1) * data.pagination.limit +
                    Number(index) +
                    1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateZonesRouteData", setRapidoData || []);
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

    async loadCommonTableData({ state, commit, dispatch }, data) {
      state.tableLoad = true;
      if (data.type == "Bike") {
        return await dispatch("loadBikeRouteData", data);
      } else if (data.type == "Van") {
        return await dispatch("loadVanRouteData", data);
      } else {
        return await dispatch("loadRapidoRouteData", data);
      }
    },

    //create route on bike
    createBikeRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/bike/zones/routes`, data)
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

    //create route on van
    createVanRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/van/zones/routes`, data)
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

    //create route on rapido
    createRapidoRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/rapido/zones/routes`, data)
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

    //update route on bike
    updateBikeRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(
          `operations/route-plan/bike/zones/route/${data.id}`,
          data.routes.routes
        )
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

    //update route on van
    updateVanRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(
          `operations/route-plan/van/zones/route/${data.id}`,
          data.routes.routes
        )
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

    //update route on rapido
    updateRapidoRouteData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(
          `operations/route-plan/rapido/zones/route/${data.id}`,
          data.routes.routes
        )
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

    //disable route zone for bike
    disableBikeRouteZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/bike/zones/routes/status/${data.id}`, {
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

    //disable route zone for van
    disableVanRouteZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/van/zones/routes/status/${data.id}`, {
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

    //disable route zone for rapido
    disableRapidoRouteZoneData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/rapido/zones/routes/status/${data.id}`, {
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

    //delete route zone on bike
    deleteBikeRouteZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/bike/zones/route/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //delete route zone on van
    deleteVanRouteZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/van/zones/route/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //delete route zone on rapido
    deleteRapidoRouteZoneData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/rapido/zones/route/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset =
                state.pageOffset > 1 &&
                state.totalRecords - 1 <=
                  (state.pageOffset - 1) * state.pageLimit;
              state.pageOffset = isPageOffset
                ? state.pageOffset - 1
                : state.pageOffset;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //common route zone enable and disable call
    async commonDisable({ state, commit, dispatch }, data) {
      if (data.type == "BikeTab") {
        return await dispatch("disableBikeRouteZoneData", data);
      } else if (data.type == "VanTab") {
        return await dispatch("disableVanRouteZoneData", data);
      } else {
        return await dispatch("disableRapidoRouteZoneData", data);
      }
    },

    //common route zone delete call
    async commonDelete({ state, commit, dispatch }, data) {
      if (data.type == "BikeTab") {
        return await dispatch("deleteBikeRouteZoneData", data.id);
      } else if (data.type == "VanTab") {
        return await dispatch("deleteVanRouteZoneData", data.id);
      } else {
        return await dispatch("deleteRapidoRouteZoneData", data.id);
      }
    },

    //update page offset and limit on table
    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },
  },
};

export default operationZonesRoute;
