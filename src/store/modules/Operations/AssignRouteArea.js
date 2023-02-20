import { _get, _post, _put, _patch, _delete } from "../../apiService";

const assignRouteArea = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    bikeZoneData: [],
    bikeRouteData: [],
    vanZoneData: [],
    vanRouteData: [],
    rapidoZoneData: [],
    rapidoRouteData: [],
    areaListOfBike: [],
    areaListOfVan: [],
    areaListOfRapido: [],
    areasList: [],
    specificAreaList: [],
    isZoneDropdownLoading: false,
    isRouteDropdownLoading: false,
    assignAreaTabMenuData: [
      {
        label: "BikeTab",
        tab1: "availableAreaName",
        tab2: "selectedAreaName",
        select: false,
        tabName: "Bike",
        data: "bikeAreaData",
        routeDropdownData: "bikeRouteData",
        zoneDropdownData: "bikeZoneData",
        columns: "bikeAreaColumData",
      },
      {
        label: "VanTab",
        tab1: "availableAreaName",
        tab2: "selectedAreaName",
        select: true,
        tabName: "Van",
        data: "vanAreaData",
        routeDropdownData: "vanRouteData",
        zoneDropdownData: "vanZoneData",
        columns: "vanAreaColumData",
      },
      {
        label: "RapidoTab",
        tab1: "availableAreaName",
        tab2: "selectedAreaName",
        select: true,
        tabName: "Rapido",
        data: "radpidoAreaData",
        routeDropdownData: "rapidoRouteData",
        zoneDropdownData: "rapidoZoneData",
        columns: "rapidoAreaColumData",
      },
    ],
    globalSearchKey: "",
  },

  getters: {
    //put getters methods goes here

    getAssignAreaTabMenuData(state) {
      return state.assignAreaTabMenuData;
    },
  },

  mutations: {
    //put update methods goes here
    updateBikeZoneData(state, data) {
      state.bikeZoneData = data || [];
    },
    updateVanZoneData(state, data) {
      state.vanZoneData = data || [];
    },
    updateRapidoZoneData(state, data) {
      state.rapidoZoneData = data || [];
    },

    updateBikeRouteData(state, data) {
      state.bikeRouteData = data || [];
    },
    updateVanRouteData(state, data) {
      state.vanRouteData = data || [];
    },
    updateRapidoRouteData(state, data) {
      state.rapidoRouteData = data || [];
    },
    updateAreaListOfBike(state, data) {
      state.areaListOfBike = data || [];
    },
    updateAreaListOfVan(state, data) {
      state.areaListOfVan = data || [];
    },
    updateAreaListOfRapido(state, data) {
      state.areaListOfRapido = data || [];
    },
    updateAllAreasList(state, data) {
      state.areasList = data || [];
    },
    updateSpecificAreaList(state, data) {
      state.specificAreaList = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    //Bike zone dropdown data
    getBikeZoneData({ state, commit }) {
      state.isZoneDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zone/bike`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let bikeZoneData = response?.data.results || [];
              for (let i = 0; i < bikeZoneData.length; i++) {
                bikeZoneData[i] = {
                  ...bikeZoneData[i],
                  name: bikeZoneData[i]["zone_name"],
                };
              }
              commit("updateBikeZoneData", bikeZoneData || []);
            }
            state.isZoneDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isZoneDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Van zone dropdown data
    getVanZoneData({ state, commit }) {
      state.isZoneDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zone/van`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let vanZoneData = response?.data.results || [];
              for (let i = 0; i < vanZoneData.length; i++) {
                vanZoneData[i] = {
                  ...vanZoneData[i],
                  name: vanZoneData[i]["zone_name"],
                };
              }
              commit("updateVanZoneData", vanZoneData || []);
            }
            state.isZoneDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isZoneDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Rapido zone dropdown data
    getRapidoZoneData({ state, commit }) {
      state.isZoneDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zone/rapido`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let rapidoZoneData = response?.data.results || [];
              for (let i = 0; i < rapidoZoneData.length; i++) {
                rapidoZoneData[i] = {
                  ...rapidoZoneData[i],
                  name: rapidoZoneData[i]["zone_name"],
                };
              }
              commit("updateRapidoZoneData", rapidoZoneData || []);
            }
            state.isZoneDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isZoneDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Bike route dropdown data
    getBikeRouteData({ state, commit }, id) {
      state.isRouteDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zones/route/bike/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let bikeRouteData = response?.data.results || [];
              for (let i = 0; i < bikeRouteData.length; i++) {
                bikeRouteData[i] = {
                  ...bikeRouteData[i],
                  name: bikeRouteData[i]["route_name"],
                };
              }
              commit("updateBikeRouteData", bikeRouteData || []);
            }
            state.isRouteDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isRouteDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Van route dropdown data
    getVanRouteData({ state, commit }, id) {
      state.isRouteDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zones/route/van/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let vanRouteData = response?.data.results || [];
              for (let i = 0; i < vanRouteData.length; i++) {
                vanRouteData[i] = {
                  ...vanRouteData[i],
                  name: vanRouteData[i]["route_name"],
                };
              }
              commit("updateVanRouteData", vanRouteData || []);
            }
            state.isRouteDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isRouteDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Rapido route dropdown data
    getRapidoRouteData({ state, commit }, id) {
      state.isRouteDropdownLoading = true;
      return new Promise((resolve, reject) => {
        _get(`operations/route-plan/dropdown/zones/route/rapido/${id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let rapidoRouteData = response?.data.results || [];
              for (let i = 0; i < rapidoRouteData.length; i++) {
                rapidoRouteData[i] = {
                  ...rapidoRouteData[i],
                  name: rapidoRouteData[i]["route_name"],
                };
              }
              commit("updateRapidoRouteData", rapidoRouteData || []);
            }
            state.isRouteDropdownLoading = false;
            resolve(response);
          })
          .catch((err) => {
            state.isRouteDropdownLoading = false;
            reject(err);
          });
      });
    },

    //Area List of Bike
    getAreaListOfBike({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/bike/zones/areas-list`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let areaListOfBike = response?.data.results || [];
              commit("updateAreaListOfBike", areaListOfBike || []);
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Area List of Van
    getAreaListOfVan({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/van/zones/areas-list`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let areaListOfVan = response?.data.results || [];
              commit("updateAreaListOfVan", areaListOfVan || []);
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Area List of Rapido
    getAreaListOfRapido({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/rapido/zones/areas-list`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let areaListOfRapido = response?.data.results || [];
              commit("updateAreaListOfRapido", areaListOfRapido || []);
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Get common area list
    async getCommonAreaList({ state, commit, dispatch }, data) {
      if (data.type == "BikeTab") {
        let dataOfBike = await dispatch("getAreaListOfBike", data.areaList);
        let areaListOfBike = dataOfBike.data.results || [];
        let dataOfAreas = await dispatch("getAllAreasList", {
          area_list: areaListOfBike,
        });
        let allAreaListOfBike = dataOfAreas.data.results || [];
        return { selectedData: areaListOfBike, allAreas: allAreaListOfBike };
      } else if (data.type == "VanTab") {
        let dataOfVan = await dispatch("getAreaListOfVan", data.areaList);
        let areaListOfVan = dataOfVan.data.results || [];
        let dataOfAreas = await dispatch("getAllAreasList", {
          area_list: areaListOfVan,
        });
        let allAreaListOfVan = dataOfAreas.data.results || [];
        return { selectedData: areaListOfVan, allAreas: allAreaListOfVan };
      } else {
        let dataOfRapido = await dispatch("getAreaListOfRapido", data.areaList);
        let areaListOfRapido = dataOfRapido.data.results || [];
        let dataOfAreas = await dispatch("getAllAreasList", {
          area_list: areaListOfRapido,
        });
        let allAreaListOfRapido = dataOfAreas.data.results || [];
        return {
          selectedData: areaListOfRapido,
          allAreas: allAreaListOfRapido,
        };
      }
    },

    //Get all area list
    async getAllAreasList({ state, commit }, data) {
      let searValue = data.searchValue || '';
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/all-areas?searchKey=${searValue}`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let areaList = response?.data.results || [];
              commit("updateAllAreasList", areaList || []);
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Get specifc areas of list
    async getSpecificAreasList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/specific-areas`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let specificAreaList = response?.data.results || [];
              commit("updateSpecificAreaList", specificAreaList || []);
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Assign Area of Bike
    createAreaOfBike({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/bike/zones/assign-areas`, data)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Assign Area of Van
    createAreaOfVan({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/van/zones/assign-areas`, data)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Assign Area of Rapido
    createAreaOfRapido({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/rapido/zones/assign-areas`, data)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Get common call of assign area
    async createCommonAssignArea({ state, commit, dispatch }, data) {
      if (data.type == "BikeTab") {
        return await dispatch("createAreaOfBike", data.areaList);
      } else if (data.type == "VanTab") {
        return await dispatch("createAreaOfVan", data.areaList);
      } else {
        return await dispatch("createAreaOfRapido", data.areaList);
      }
    },

    //Get zones list based on tab
    async loadCommonZonesList({ state, commit, dispatch }, data) {
      if (data.type == "BikeTab") {
        return await dispatch("getBikeZoneData");
      } else if (data.type == "VanTab") {
        return await dispatch("getVanZoneData");
      } else {
        return await dispatch("getRapidoZoneData");
      }
    },
  },
};

export default assignRouteArea;
