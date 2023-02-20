import { _get, _post, _put, _patch, _delete } from "../../apiService";

const zoneAreaList = {
  namespaced: true,
  state: {
    // put variables and collections here
    zonesAreaListTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "area_name", header: "Area Name" },
      { field: "from_pincode", header: "Postal Code" },
      { field: "unit_no", header: "Unit No" },
      { field: "floor_no", header: "Floor No" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    zoneAreaListFilterParams: [
      {
        column_name: "area_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "from_pincode",
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
        searchKey: ""
      },
    ],
    toggleData: [{ type: "" }],
    totalRecords: 0,
    zoneAreaListData: [],
    tableLoad: false,
    pageOffset: 1,
    pageLimit: 10,
    zonesAddressData: {},
    displayDialog: false,
    globalSearchKey: ''
  },

  getters: {
    //put getters methods goes here

    getZoneAreaListFilterParams(state) {
      return state.zoneAreaListFilterParams;
    },

    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getEditAddressData(state) {
      return state.zonesAddressData;
    },
  },

  mutations: {
    //put update methods goes here
    updateAllAreaListData(state, data) {
      state.zoneAreaListData = data || [];
    },
    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
    },
    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    //Bike zone dropdown data
    loadAllAreasData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchKey || '';
      return new Promise((resolve, reject) => {
        _post(
          `operations/route-planning/areas?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}`,
          data.filterParams
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let areaListArray = response?.data.results.rows || [];
              let totalRecords = response?.data.results.count || 0;
              let isDesc = data.filterParams?.orderBy && data.filterParams?.orderBy[0] == 'createdAt' && data.filterParams?.orderBy[1] == 'DESC';
              let allAreaList = areaListArray.map((res, index) => {
                let ascendingNo = ((data.offset - 1) * data.limit) + Number(index) + 1;
                let descendingNo = (totalRecords + 1) - (((data.offset - 1) * data.limit) + Number(index) + 1);
                let sNo = isDesc ? descendingNo : ascendingNo;
                res.s_no = sNo;
                return res;
              });
              commit("updateAllAreaListData", allAreaList || []);
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

    //update page offset and limit on table
    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },

    createAddressOnAreaList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`operations/route-plan/areas`, data)
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

    updateAddressOnAreaList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _put(`operations/route-plan/area/${data.id}`, data.addressParams)
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

    disableAddressOnAreaList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`operations/route-plan/area/${data.id}`, {
          status: data.status,
        })
          .then(async (response) => {
            state.tableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.tableLoad = false;
            reject(err);
          });
      });
    },

    deleteAddressOnAreaList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _delete(`operations/route-plan/area/${data.id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let isPageOffset = state.pageOffset > 1 && (state.totalRecords - 1) <= ((state.pageOffset - 1) * state.pageLimit) ; 
              state.pageOffset = isPageOffset ? state.pageOffset - 1 : state.pageOffset;
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
  },
};

export default zoneAreaList;
