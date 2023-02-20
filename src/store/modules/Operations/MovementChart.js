import { data } from "jquery";
import { _get, _post, _put, _patch, _delete } from "../../apiService";

const operationsMovementChart = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    bikeTableData: [],
    vanTableData: [],
    radpidoTableData: [],
    totalRecords: 0,
    movementChartTabMenuData: [
      {
        label: "Bike",
        tab: "MovementChartTable",
        select: false,
        tabName: "Bike",
        data: "bikeTableData",
        pageOffset: "pageOffset",
        totalCount: "totalRecords",
        columns: "movementChartTableColumnData",
      },
      {
        label: "Van",
        tab: "MovementChartTable",
        select: true,
        tabName: "Van",
        data: "vanTableData",
        pageOffset: "pageOffset",
        totalCount: "totalRecords",
        columns: "movementChartTableColumnData",
      },
      {
        label: "Rapido",
        tab: "MovementChartTable",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        pageOffset: "pageOffset",
        totalCount: "totalRecords",
        columns: "movementChartTableColumnData",
      },
    ],
    movementChartTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "movement_chart_id", header: "Movement Chart ID" },
      { field: "zone.zone_name", header: "Zone" },
      { field: "route.route_name", header: "Route Name" },
      { field: "trip.trip_name", header: "Trip" },
      { field: "standard", header: "Standard" },
      { field: "current", header: "Current" },
      { field: "mc_home_delivery", header: "Home Delivery" },
      { field: "createdAt", header: "Created On" },
    ],
    movementChartFilterParams: [
      {
        column_name: "movement_chart_id",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "zone_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "route_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "trip_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "standard",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "current",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "mc_home_delivery",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "createdAt",
        type: "contains",
        searchKey: "",
      },
    ],
    movementChartOverlayData: [
      {
        label: "Checklist",
        icon: "checklist",
      },
      {
        label: "Instruction Slip",
        icon: "document",
      },
      {
        label: "Attempt Slip",
        icon: "attempt-slip",
      },
      {
        label: "Movement Chart",
        icon: "document",
      },
      {
        label: "Print Label",
        icon: "print",
      },
      {
        label: "Movement Chart",
        icon: "document",
      },
    ],
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
    isPrintPreviewDialog: false,
    printPreviewDialogData: {},
    selectedRowData: [],
  },

  getters: {
    //put getters methods goes here
    getMovementChartTabMenuData(state) {
      return state.movementChartTabMenuData;
    },
    getFilterParams(state) {
      return state.movementChartFilterParams;
    },
    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getMovementChartOverlayData(state) {
      return state.movementChartOverlayData;
    },
    getDocumentPreviewData(state) {
      return state.printPreviewDialogData;
    },
    getSelectedRowData(state) {
      return state.selectedRowData;
    },
  },

  mutations: {
    //put update methods goes here
    updateMovementChartBikeData(state, data) {
      state.bikeTableData = data?.list || [];
      state.totalRecords = data?.count || 0;
    },
    updateMovementChartVanData(state, data) {
      state.vanTableData = data?.list || [];
      state.totalRecords = data?.count || 0;
    },
    updateMovementChartRapidoData(state, data) {
      state.radpidoTableData = data?.list || [];
      state.totalRecords = data?.count || 0;
    },
    displayPrintPreviewDialog(state, data) {
      state.isPrintPreviewDialog = data.displayDialog || false;
      state.printPreviewDialogData = data.formData || {};
    },
    updateSelectedRows(state, data) {
      state.selectedRowData = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    //Get live job status table list
    loadMovementChartList({ state, commit }, data) {
      state.tableLoad = true;
      return _post(
        `operations/movement/chart?offset=${data.offset}&limit=${data.limit}`,
        data
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const movementChartData = response?.data?.results?.rows || {};
            const totalRecords = response?.data?.results?.count || 0;
            let chartList = movementChartData.map((res, index) => {
              let chartData = {
                ...res,
                route:
                  data.logistic_mode == "Bike"
                    ? res.bike_route
                    : data.logistic_mode == "Van"
                    ? res.van_route
                    : res.rapido_route,
                trip:
                  data.logistic_mode == "Bike"
                    ? res.bike_trip
                    : data.logistic_mode == "Van"
                    ? res.van_trip
                    : res.rapido_trip,
                zone:
                  data.logistic_mode == "Bike"
                    ? res.bike_zone
                    : data.logistic_mode == "Van"
                    ? res.van_zone
                    : res.rapido_zone,
                createdAt: new Date(res.createdAt),
              };
              return chartData;
            });

            let setChartData = {
              list: chartList || [],
              count: totalRecords,
            };

            if (data.logistic_mode == "Bike") {
              commit("updateMovementChartBikeData", setChartData || {});
            } else if (data.logistic_mode == "Van") {
              commit("updateMovementChartVanData", setChartData || {});
            } else {
              commit("updateMovementChartRapidoData", setChartData || {});
            }
          }
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Print Label
    loadPrintLabel({ state, commit }, data) {
      return _post(`operations/movement/chart/print/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Print Label preview
    loadPrintPreview({ state, commit }, data) {
      return _post(`operations/movement/chart/print-preview/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Instruction Slip Label
    loadInstructionSlipLabel({ state, commit }, data) {
      return _post(
        `operations/movement/chart/slip/instruction/${data.id}`,
        data
      )
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Instruction Slip preview
    loadInstructionSlipPreview({ state, commit }, data) {
      return _post(
        `operations/movement/chart/slip/instruction-preview/${data.id}`,
        data,
        {
          responseType: "blob",
        }
      )
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Attempt Print Label
    attemptSlipPrint({ state, commit }, data) {
      return _post(`operations/movement/chart/slip/attempt/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Attempt Print preview
    attemptSlipPreview({ state, commit }, data) {
      return _post(
        `operations/movement/chart/slip/attempt-preview/${data.id}`,
        data,
        {
          responseType: "blob",
        }
      )
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Checklist Print Label
    checklistSlipPrint({ state, commit }, data) {
      return _post(`operations/movement/chart/check-list/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Checklist preview
    checklistSlipPreview({ state, commit }, data) {
      return _post(
        `operations/movement/chart/check-lists/preview/${data.id}`,
        data,
        {
          responseType: "blob",
        }
      )
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Movement chart Print Label
    movementChartPrint({ state, commit }, data) {
      return _post(`operations/movement/charts/print`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    showPrintPreviewDialog({ state, commit }, data) {
      commit("displayPrintPreviewDialog", data);
    },

    async updateRowSelection({ state, commit }, data) {
      let rowSelection = data || [];
      let selectedRowData = await rowSelection.map((res) => res.id);
      commit("updateSelectedRows", selectedRowData);
    },
  },
};

export default operationsMovementChart;
