import { _get, _post, _put, _patch, _delete } from "../../apiService";

const operationsSpecialJobEntry = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    expressTableData: [],
    originalExpressTableData: [],

    internationalTablesData: [],
    originalInternationalTableData: [],

    supervisorCountTableData: [],
    originalSupervisorCountTableData: [],

    historyTablesData: [],
    originalHistoryTableData: [],

    radpidoTableData: [],
    originalRadpidoTableData: [],
    totalRecords: 0,
    statusTabMenuData: [
      {
        label: "SupervisorCountTab",
        tab: "supervisorCountTable",
        select: false,
        tabName: "Supervisor Count",
        data: "supervisorCountTableData",
        pageOffset: "supervisorCountPageOffset",
        columns: "specialJobTableColumnData",
      },
      {
        label: "HistoryTab",
        tab: "HistoryTable",
        select: true,
        tabName: "History",
        data: "historyTablesData",
        pageOffset: "historyPageOffset",
        columns: "specialJobTableColumnData",
      },
    ],
    specialJobTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "rider_name", header: "Rider/Driver" },
      { field: "delivery_type", header: "Delivery Type" },
      { field: "job_count", header: "Job Count" },
      { field: "supervisor_total_count", header: "Supervisor Total Count" },
      { field: "supervisor_remark", header: "Supervisor Remark" },
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
    zoneDataFetch: [],
    selectedRowData: [],
  },

  getters: {
    //put getters methods goes here
    getStatusSettingsTabMenuData(state) {
      return state.statusTabMenuData;
    },
    getEditStatusData(state) {
      return state.statusSettingsCreationData;
    },

    getTableDataForSpecialJob(state) {
      return state.supervisorCountTableData;
    },

    getUpdatedZoneListData(state) {
      return state.zoneDataFetch;
    },

    getSelectedRowData(state) {
      return state.selectedRowData;
    },
  },

  mutations: {
    //put update methods goes here

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updateSupervisorCountData(state, data) {
      state.supervisorCountTableData = data || [];
      state.originalSupervisorCountTableData = data || [];
    },

    updateHistoryData(state, data) {
      state.historyTablesData = data || [];
      state.originalHistoryTableData = data || [];
    },

    updateFetchDateOfRapido(state, data) {
      state.radpidoTableData = data || [];
      state.originalRadpidoTableData = data || [];
    },

    updateDisplayDialog(state, data) {
      state.displayDialog = data;
    },

    updateZoneListData(state, data) {
      state.zoneDataFetch = data;
    },

    updateSelectedRows(state, data) {
      state.selectedRowData = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    // Zone List

    loadZoneDataFetch({ state, commit, dispatch }) {
      return _get(`/operations/special/job/zones`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const zoneData = response?.data.results || [];

            let datas = zoneData.map((c) => {
              (c["name"] = c.zone_name), (c["code"] = c.zone_name);
              return c;
            });

            commit("updateZoneListData", datas);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    loadSupervisorCountDataFetch({ state, commit, dispatch }, dataLoad) {
      state.tableLoad = true;
      state.currentTab = dataLoad.tab;
      state.statusSettingsCreationData = {};

      return _post(
        `/operations/special/job/riders?offset=1&limit=100`,
        dataLoad.payLoads
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const superVisorCountData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setSupervisorCountData = superVisorCountData.rows.map(
              (c, i) => {
                let ascendingNo = Number(i) + 1;
                let dataObj = {
                  id: c.id,
                  s_no: ascendingNo,
                  rider_name: c.rider ? c.rider.display_name : "",
                  delivery_type: c.deliver_type,
                  job_count: c.job_count,
                  supervisor_total_count:
                    c.job_count && c.job_count > 0 ? c.job_count : 0,
                  supervisor_count: c.supervisor_count,
                  supervisor_nightjob_count: null,
                  supervisor_remark: c.supervisor_remarks,
                  ...c,
                };
                return dataObj;
              }
            );

            commit("updateSupervisorCountData", setSupervisorCountData || []);
            commit("updateTotalRecords", totalRecords || 0);
            dispatch("commonSerachValue", "SupervisorCountTab");
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    loadHistoryDataFetch({ state, commit, dispatch }, tab) {
      state.tableLoad = true;
      state.currentTab = tab;
      state.statusSettingsCreationData = {};

      let data = {
        orderBy: ["deliver_type", "DESC"],

        filter_params: [
          {
            column_name: "display_name",
            type: "contains",
            searchKey: "",
          },
        ],
      };

      return _post(
        `operations/special/jobs?offset=1&limit=10&globalsearchkey=fa`,
        data
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const historyDatas = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setHistoryData = historyDatas.rows.map((c, i) => {
              let ascendingNo = Number(i) + 1;
              let dataObj = {
                id: c.id,
                s_no: ascendingNo,
                rider_name: c.rider ? c.rider.display_name : "",
                delivery_type: c.deliver_type,
                job_count: c.job_count,
                supervisor_total_count:
                  c.job_count && c.job_count > 0 ? c.job_count : 0,
                supervisor_count: c.supervisor_count,
                supervisor_nightjob_count: null,
                supervisor_remark: c.supervisor_remarks,
                ...c,
              };
              return dataObj;
            });

            commit("updateHistoryData", setHistoryData || []);
            commit("updateTotalRecords", totalRecords || 0);
            dispatch("commonSerachValue", "HistoryTable");
          }
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
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      if (data.label == "ExpressTab") {
        let searchOnArray = state.originalExpressTableData.filter(
          (item) =>
            item.status_name.toLowerCase().includes(searchValue) ||
            (item.statusSettings?.display_name)
              .toLowerCase()
              .includes(searchValue) ||
            item.status.toLowerCase().includes(searchValue)
        );
        state.expressTableData = searchOnArray;
        state.tableLoad = false;
      } else if (data.label == "InternationalTab") {
        let searchOnArray = state.originalInternationalTableData.filter(
          (item) =>
            item.status_name.toLowerCase().includes(searchValue) ||
            (item.statusSettings?.display_name)
              .toLowerCase()
              .includes(searchValue) ||
            item.status.toLowerCase().includes(searchValue)
        );
        state.internationalTablesData = searchOnArray;
        state.tableLoad = false;
      } else {
        let searchOnArray = state.originalRadpidoTableData.filter(
          (item) =>
            item.status_name.toLowerCase().includes(searchValue) ||
            (item.statusSettings?.display_name)
              .toLowerCase()
              .includes(searchValue) ||
            item.status.toLowerCase().includes(searchValue)
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

    updateStatusEditData({ state, commit }, data) {
      state.displayDialog = data.displayDialog;
      state.statusSettingsCreationData = data.statusData;
    },

    //Update Special Job Entry
    updateSpecialJobEntry({ state, commit }, data) {
      return _patch(`operations/special/job/riders`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    async updateRowSelection({ state, commit }, data) {
      let rowSelection = data || [];
      let selectedRowData = await rowSelection.map((res) => {
        return {
          id: res.id,
          supervisor_remarks: res.supervisor_remark,
          supervisor_count: res.supervisor_total_count,
        };
      });
      console.log(selectedRowData, "selectedRowData");
      commit("updateSelectedRows", selectedRowData);
    },
  },
};

export default operationsSpecialJobEntry;
