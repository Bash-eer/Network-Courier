import { _get, _post, _put, _patch, _delete } from "../../apiService";

const specialRiderAllotment = {
  namespaced: true,
  state: {
    // put variables and collections here
    specialRiderAllotmentListArray: [],
    employeeDropDownListArray: [],
    employeeRoleListArray: [],
    specialRiderAllotmentList: [],
    tableLoad: false,
    specialRiderTableColumnData: [
      { field: "action", header: "Actions" },
      { field: "id", header: "S.No" },
      { field: "employeeRoles.employee_name", header: "Employee" },
      { field: "specialrider", header: "Special Rider" },
      { field: "specialdriver", header: "Special Driver" },
      { field: "supervisor", header: "Supervisor" },
      { field: "rapidodriver", header: "Rapido Driver" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    customSpeedDialTab: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
  },

  getters: {
    //put getters methods goes here
    getTabMenuData(state) {
      return state.specialRiderTableColumnData;
    },
    customSpeedDialTabData(state) {
      return state.customSpeedDialTab;
    },
    getSpecialRiderAllotmentList(state) {
      return state.specialRiderAllotmentListArray;
    },
    getEmployeeDropDownList(state) {
      return state.employeeDropDownListArray;
    },
    getEmployeeRole(state) {
      return state.employeeRoleListArray;
    },
  },

  mutations: {
    //put update methods goes here
    getSpecialRiderAllotmentListArray(state, data) {
      state.specialRiderAllotmentListArray = data || [];
      state.specialRiderAllotmentList = data || [];
    },
    getEmployeeDropDownListArray(state, data) {
      state.employeeDropDownListArray = data || [];
    },
    getEmployeeRoleArray(state, data) {
      state.employeeRoleListArray = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state
    specialRiderAllotmentEmployeeList({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/hrm/employeeroles/all`)
          .then(async (response) => {
            if (response.data && response.data.status === 200) {
              let SpecialRiderAllotmentList =
                response?.data?.results.rows || [];
              let updated = SpecialRiderAllotmentList.map((res, index) => {
                let ascendingNo = Number(index) + 1;
                let data = {
                  ...res,
                  s_no: ascendingNo,
                };

                return data;
              });
              commit("getSpecialRiderAllotmentListArray", updated || []);
            }
            resolve(response.data.results && response.data.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    employeeDropDownList({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/hrm/employee/dropdown`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let EmployeeDropDownList = response?.data.results || [];
              commit(
                "getEmployeeDropDownListArray",
                EmployeeDropDownList || []
              );
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    createEmployeeRole({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/hrm/employeeroles/create`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let employeeRole = response?.data.results || [];
              commit("getEmployeeRoleArray", employeeRole || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateEmployeeDropDown({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _put(`/hrm/employeeroles/update/${data.id}`, data)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteEmployeeData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/hrm/employeeroles/remove/${payload}`)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //common search
    specialRiderTableSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      let searchOnArray = state.specialRiderAllotmentList.filter((item) =>
        item.employeeRoles?.employee_name.toLowerCase().includes(searchValue)
      );
      state.specialRiderAllotmentListArray = searchOnArray;
      state.tableLoad = false;
    },
  },
};

export default specialRiderAllotment;
