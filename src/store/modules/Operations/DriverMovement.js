import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";
const DriverMovement = {
  namespaced: true,
  state: {
    DriverMovementMainTableDataDriver: null,
    DriverMovementMainTableDataDriverType: null,
    DriverMovementMainTableDataVehicles: null,
    DriverMovementMainTableDataTrips: null,
    DataselectingOntable: null,
    DriverMovementMainTableDataTable: null,
    DriverMovementEdit: null,
  },

  getters: {
    DriverMovementMainTableData: ({ DriverMovementMainTableData }) =>
      DriverMovementMainTableData,
    DriverMovementMainTableDataDriver: ({
      DriverMovementMainTableDataDriver,
    }) => DriverMovementMainTableDataDriver,
    DriverMovementMainTableDataDriverType: ({
      DriverMovementMainTableDataDriverType,
    }) => DriverMovementMainTableDataDriverType,
    DriverMovementMainTableDataVehicles: ({
      DriverMovementMainTableDataVehicles,
    }) => DriverMovementMainTableDataVehicles,
    DriverMovementMainTableDataTrips: ({ DriverMovementMainTableDataTrips }) =>
      DriverMovementMainTableDataTrips,
    DriverMovementMainTableDataTable: ({ DriverMovementMainTableDataTable }) =>
      DriverMovementMainTableDataTable,
  },

  mutations: {
    fetchDriverMovementMainTableData(state, data) {
      state.DriverMovementMainTableData = data;
    },
    fetchDriverMovementMainTableDataDriver(state, data) {
      state.DriverMovementMainTableDataDriver = data;
    },
    fetchDriverMovementMainTableDataDriverType(state, data) {
      state.DriverMovementMainTableDataDriverType = data;
    },
    fetchDriverMovementMainTableDataVehicles(state, data) {
      state.DriverMovementMainTableDataVehicles = data;
    },
    fetchDriverMovementMainTableDataTrips(state, data) {
      state.DriverMovementMainTableDataTrips = data;
    },
    fetchpostDriverMovementMainTableData(state, data) {
      state.DriverMovementMainTableDataTable = data;
      state.DriverMovementMainTableData = data;
    },
  },
  actions: {
    async getDriverMovementMainTableData({ commit }, { id }) {
      await axios.get(`/operations/driver-movement-chart/${id}`).then((res) => {
        if (res.data.results) {
          commit("fetchDriverMovementMainTableData", res.data.results);
        }
      });
    },

    async getDriverMovementMainTableDataDriver({ commit }) {
      axios.get(`/hrms/employee/driver`).then((res) => {
        if (res.data.results) {
          let data = res.data.results;
          for (let i in data) {
            data[i]['name'] = res.data.results[i].employee_name;
            data[i]['code'] = res.data.results[i].id;
          }
          commit("fetchDriverMovementMainTableDataDriver", res.data.results);
        }
      });
    },

    async getDriverMovementMainTableDataDriverType({ commit }) {
      axios.get(`/operations/delivery-types/dropdown/van`).then((res) => {
        if (res.data.results) {
          commit(
            "fetchDriverMovementMainTableDataDriverType",
            res.data.results
          );
        }
      });
    },

    async getDriverMovementMainTableDataVehicles({ commit }) {
      axios.get(`/fleetManagement/active/vehicles`).then((res) => {
        if (res.data.results) {
          commit("fetchDriverMovementMainTableDataVehicles", res.data.results);
        }
      });
    },

    postDriverMovementMainTableDataFirst({ state, commit }) {
      return new Promise((resolve, reject) => {
        _post(`/operations/driver-movement-chart`).then(async (res) => {
          let updated = res.data.results.rows.map((res, index) => {
            let ascendingNo = Number(index) + 1;
            let data = {
              ...res,
              s_no: ascendingNo,
            };

            return data;
          });
          commit("fetchpostDriverMovementMainTableData", updated);
        });
      });
    },

    postDriverMovementMainTableDataTrips({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/operations/driver-movement/trips`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let tripsData = response.data.results;
              for (let i in tripsData) {
                tripsData[i]["vehicle"] = null;
                tripsData[i]["route"] = null;
                tripsData[i]["document"] = null;
                tripsData[i]["parcel"] = null;
                tripsData[i]["vehicle_id"] = null;
              }
              commit(
                "fetchDriverMovementMainTableDataTrips",
                response.data.results
              );
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    postDriverMovementMainTableData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/operations/driver-movement`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let addCustomerLeaveResp = response?.data.results || [];
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    patchDriverMovementMainTableData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `/operations/driver-movement-chart/${payload.id}`,
            payload
          )
          .then((res) => {
            if (res.status == 200) {
              return res;
            }
          });
      });
    },

    deleteDriverMovementData({ state, commit }, id) {
      return _delete(`/operations/driver-movement-chart/${id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //common search
    driverMovementTableSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      let searchOnArray = state.DriverMovementMainTableData.filter((item) =>
        item.driver?.employee_name.toLowerCase().includes(searchValue)
      );
      state.DriverMovementMainTableDataTable = searchOnArray;

      state.tableLoad = false;
    },
  },
};
export default DriverMovement;
