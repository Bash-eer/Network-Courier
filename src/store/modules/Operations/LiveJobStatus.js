import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";
import {
  API,
  NUMBER,
} from "../../../views/Modules/Operations/transferJob/const";
import { xorBy, differenceWith, difference } from "lodash";
const liveJobStatus = {
  namespaced: true,

  state: {
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    // put variables and collections here
    tableLoad: false,
    liveJobStatusTabMenuData: [
      {
        label: "BikeTab",
        tab: "liveJobStatusTable",
        select: false,
        tabName: "Bike",
        data: "bikeTableData",
        pageOffset: "bikePageOffset",
        totalCount: "bikeCount",
        columns: "liveJobStatusTableColumnData",
      },
      {
        label: "VanTab",
        tab: "liveJobStatusTable",
        select: true,
        tabName: "Van",
        data: "vanTableData",
        pageOffset: "vanPageOffset",
        totalCount: "vanCount",
        columns: "liveJobStatusTableColumnData",
      },
      {
        label: "RapidoTab",
        tab: "liveJobStatusTable",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        pageOffset: "rapidoPageOffset",
        totalCount: "rapidoCount",
        columns: "liveJobStatusTableColumnData",
      },
    ],
    liveJobStatusTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "booking.collection_slip_no", header: "Collection Slip No" },
      { field: "group_id", header: "Group ID" },
      { field: "job_type", header: "Job Type" },
      { field: "job_priority", header: "Priority" },
      { field: "createdAt", header: "Date" },
      { field: "company_details.company_name", header: "Company Details" },
      { field: "zone.zone_name", header: "Zone" },
      { field: "route.route_name", header: "Route" },
      { field: "trip.trip_name", header: "Trip" },
      { field: "rider.display_name", header: "Rider" },
      { field: "status", header: "Status" },
    ],
    liveJobStatusFilterDropdownData: [
      { name: "New", code: "New" },
      { name: "Pending", code: "Pending" },
      { name: "Not Assigned", code: "Not Assigned" },
      { name: "Approved", code: "Approved" },
      { name: "In Transit", code: "In Transit" },
      { name: "Completed", code: "Completed" },
      { name: "Cancelled", code: "Cancelled" },
    ],
    liveJobStatusFilterParams: [
      {
        column_name: "collection_slip_no",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "group_id",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "job_type",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "job_priority",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "createdAt",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "company_name",
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
        column_name: "display_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "status",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "special_monitoring",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "customer_type",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "booked_via",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "project_job",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "home_address",
        type: "contains",
        searchKey: "",
      },
    ],
    totalRecords: 0,
    liveJobStatusOverlay: [
      {
        label: "Group",
        icon: "group",
      },
      {
        label: "UnGroup",
        icon: "ungroup",
      },
      {
        label: "Update Route Settings",
        icon: "update-route",
      },
      {
        label: "Send SMS",
        icon: "sms",
      },
      {
        label: "Notify Rider App",
        icon: "notification",
      },
      {
        label: "Re-Attempt Slip",
        icon: "re-attempt",
      },
      {
        label: "Transfer Job",
        icon: "transfer",
      },
      {
        label: "Print Label",
        icon: "print",
      },
      {
        label: "Instruction Slip",
        icon: "document",
      },
      {
        label: "Job Sheet",
        icon: "document",
      },
      {
        label: "Acknowledge Slip",
        icon: "document",
      },
      {
        label: "Update Status",
        icon: "update-status",
      },
      {
        label: "POD",
        icon: "pod",
      },
    ],
    bikeTableData: [],
    vanTableData: [],
    radpidoTableData: [],
    FirstStepperTableDataSelected: [],
    livejobFormTableData: [],
    bikePageOffset: 1,
    vanPageOffset: 1,
    rapidoPageOffset: 1,
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: [],
    GropAllPayload: {},
    errorconflicting: null,
    filterDialog: false,
    jobTypeList: [],
    zoneList: [],
    customerNameList: [],
    displayDialog: false,
    updateRouteSettingsDialog: false,
    acknowledgeSlipDialog: false,
    updateRouteSettingsFormData: {},
    acknowledgeSlipFormData: {},
    bikeRiderDropdownList: [],
    vanRiderDropdownList: [],
    rapidoRiderDropdownList: [],
    zoneDropDownList: [],
    zoneVanDropDownList: [],
    zoneRapidoDropDownList: [],
    tripDropDownListArray: [],
    tripVanDropDownListArray: [],
    tripRapidoDropDownListArray: [],
    routeBikeDropDownListArray: [],
    routeVanDropDownListArray: [],
    routeRapidoDropDownListArray: [],
    bikeAdvanceFilterParams: {},
    vanAdvanceFilterParams: {},
    rapidoAdvanceFilterParams: {},
    updateStatusDialog: false,
    updateStatusDialogData: {},
    statusList: [],
    bikeCount: 0,
    vanCount: 0,
    rapidoCount: 0,
    isPrintPreviewDialog: false,
    printPreviewDialogData: {},
    liveJobExpansionListArray: [],
    selectedJobId: [],
    selectedJobData: null,
    isTriggeredFromLiveJob: false,
    multipleLogisticTripsData: {
      bike: [],
      van: [],
      rapido: [],
    },
    riderDropdownDataForTransferJob: {
      bike: [],
      van: [],
      rapido: [],
    },
    bikeFilterParams: [],
    vanFilterParams: [],
    rapidoFilterParams: [],
    liveJobStatusAttachmentsFiles: {},
    isSendSMS: false,
    bikeAdvanceFilterForm: {},
    vanAdvanceFilterForm: {},
    rapidoAdvanceFilterForm: {},
    totalJobsSelected: null,
    alterData: false,
    smsDetails: null
  },

  getters: {
    //put getters methods goes here
    showToastMessagedata(state) {
      return state.toastData;
    },
    getLiveJobStatusTabData(state) {
      return state.liveJobStatusTabMenuData;
    },

    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getFilterParams(state) {
      return state.liveJobStatusFilterParams;
    },
    getLiveJobStatusOverlayData(state) {
      return state.liveJobStatusOverlay;
    },
    getJobTypeListData(state) {
      return state.jobTypeList;
    },
    getZoneListData(state) {
      return state.zoneList;
    },
    getCustomerNameListData(state) {
      return state.customerNameList;
    },
    getUpdateRouteSettingsData(state) {
      return state.updateRouteSettingsFormData;
    },
    getAcknowledgeSlipData(state) {
      return state.acknowledgeSlipFormData;
    },
    getBikeRiderDropDownListArray(state) {
      return state.bikeRiderDropdownList;
    },
    getVanRiderDropDownListArray(state) {
      return state.vanRiderDropdownList;
    },
    getRapidoRiderDropDownListArray(state) {
      return state.rapidoRiderDropdownList;
    },
    getZoneDropDownListArray(state) {
      return state.zoneDropDownList;
    },
    getZoneVanDropDownListArray(state) {
      return state.zoneVanDropDownList;
    },
    getZoneRapidoDropDownListArray(state) {
      return state.zoneRapidoDropDownList;
    },
    getTripDropDownListArray(state) {
      return state.tripDropDownListArray;
    },
    getTripVanDropDownListArray(state) {
      return state.tripVanDropDownListArray;
    },
    getTripRapidoDropDownListArray(state) {
      return state.tripRapidoDropDownListArray;
    },
    getBikeRouteDropDownListArray(state) {
      return state.routeBikeDropDownListArray;
    },
    getVanRouteDropDownListArray(state) {
      return state.routeVanDropDownListArray;
    },
    getRapidoRouteDropDownListArray(state) {
      return state.routeRapidoDropDownListArray;
    },
    getBikeFilterParams(state, data) {
      return state.bikeAdvanceFilterParams;
    },
    getVanFilterParams(state, data) {
      return state.vanAdvanceFilterParams;
    },
    getRapidoFilterParams(state, data) {
      return state.rapidoAdvanceFilterParams;
    },
    getBikeFilterFormData(state, data) {
      return state.bikeAdvanceFilterForm;
    },
    getVanFilterFormData(state, data) {
      return state.vanAdvanceFilterForm;
    },
    getRapidoFilterFormData(state, data) {
      return state.rapidoAdvanceFilterForm;
    },
    getStatusList(state) {
      return state.statusList;
    },
    getUpdateStatusData(state) {
      return state.updateStatusDialogData;
    },
    getDocumentPreviewData(state) {
      return state.printPreviewDialogData;
    },
    getLiveJobExpansionListArray(state) {
      return state.liveJobExpansionListArray;
    },

    // transfer job getters
    getMultipleLogisticTripsData(state) {
      return state.multipleLogisticTripsData;
    },
    getStatusAttachmentsData(state) {
      return state.liveJobStatusAttachmentsFiles || {};
    },
    getSendSMSDetails(state) {
      return state.smsDetails || {};
    }
  },

  mutations: {
    //put update methods goes here

    updateDataOfLiveJobStatus(state, data) {
      state.bikeTableData = data?.bike?.rows || [];
      state.vanTableData = data?.van?.rows || [];
      state.radpidoTableData = data?.rapido?.rows || [];
    },

    fetcherrorconflicting(state, data) {
      state.errorconflicting = data;
    },

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },

    updateAdvanceDisplayDialog(state, data) {
      state.filterDialog = data;
    },

    updateDataOfJobType(state, data) {
      state.jobTypeList = data || [];
    },
    updateDataOfZone(state, data) {
      state.zoneList = data || [];
    },
    updateDataOfCustomerName(state, data) {
      state.customerNameList = data || [];
    },

    displayUpdateRouteSettingsDialog(state, data) {
      state.updateRouteSettingsDialog = data.displayDialog || false;
      state.updateRouteSettingsFormData = data.formData || {};
    },

    displayAcknowledgeSlipDialog(state, data) {
      state.acknowledgeSlipDialog = data.displayDialog || false;
      state.acknowledgeSlipFormData = data.formData || {};
    },

    updateBikeRiderList(state, data) {
      state.bikeRiderDropdownList = data || [];
    },

    updateVanRiderList(state, data) {
      state.vanRiderDropdownList = data || [];
    },

    updateRapidoRiderList(state, data) {
      state.rapidoRiderDropdownList = data || [];
    },

    zoneDropDownList(state, data) {
      state.zoneDropDownList = data || [];
    },

    zoneVanDropDownList(state, data) {
      state.zoneVanDropDownList = data || [];
    },

    zoneRapidoDropDownList(state, data) {
      state.zoneRapidoDropDownList = data || [];
    },

    tripDropDownList(state, data) {
      state.tripDropDownListArray = data || [];
    },

    tripRapidoDropDownList(state, data) {
      state.tripRapidoDropDownListArray = data || [];
    },

    tripVanDropDownList(state, data) {
      state.tripVanDropDownListArray = data || [];
    },

    routeBikeDropDownList(state, data) {
      state.routeBikeDropDownListArray = data || [];
    },
    routeVanDropDownList(state, data) {
      state.routeVanDropDownListArray = data || [];
    },
    routeRapidoDropDownList(state, data) {
      state.routeRapidoDropDownListArray = data || [];
    },
    updateAdvanceBikeFilterParams(state, data) {
      state.bikeAdvanceFilterParams = data || {};
      state.filterDialog = false;
    },
    updateAdvanceVanFilterParams(state, data) {
      state.vanAdvanceFilterParams = data || {};
      state.filterDialog = false;
    },
    updateAdvanceRapidoFilterParams(state, data) {
      state.rapidoAdvanceFilterParams = data || {};
      state.filterDialog = false;
    },
    displayUpdateStatusDialog(state, data) {
      state.updateStatusDialog = data.displayDialog || false;
      state.updateStatusDialogData = data.formData || {};
    },
    displaySMSDialog(state, data) {
      state.isSendSMS = data.displayDialog || false;
    },
    updateDataOfStatusList(state, data) {
      state.statusList = data || [];
    },
    displayPrintPreviewDialog(state, data) {
      state.isPrintPreviewDialog = data.displayDialog || false;
      state.printPreviewDialogData = data.formData || {};
    },
    liveJobExpansionList(state, data) {
      state.liveJobExpansionListArray = data || [];
    },

    // transfer job mutation
    setTripsData(state, payload) {
      const { mode, data } = payload;
      switch (mode) {
        case "bike": {
          state.multipleLogisticTripsData.bike = data;
          break;
        }
        case "van": {
          state.multipleLogisticTripsData.van = data;
          break;
        }
        case "rapido": {
          state.multipleLogisticTripsData.rapido = data;
          break;
        }
      }
    },

    setSelectedJobData(state, payload) {
      state.selectedJobData = payload;
      state.totalJobsSelected = state.selectedJobData.length;
    },

    setParentTriggered(state, bool) {
      state.isTriggeredFromLiveJob = bool;
    },

    updateBikeFilterParams(state, data) {
      state.bikeFilterParams = data || [];
    },
    updateVanFilterParams(state, data) {
      state.vanFilterParams = data || [];
    },
    updateRapidoFilterParams(state, data) {
      state.rapidoFilterParams = data || [];
    },

    checkAndSetSelectedJobData(state, data) {
      if (state.selectedJobData == null) {
        state.selectedJobData = data;
        state.totalJobsSelected = data;
      } else {
        const newArr = xorBy(state.selectedJobData, data, "id");
        if (newArr.length) {
          newArr.forEach((ele) => state.selectedJobData.push(ele));
        }
        state.totalJobsSelected = state.selectedJobData.length;
      }
    },
    removeSelectedJob(state, arrId) {
      state.selectedJobId = differenceWith(
        state.selectedJobId,
        arrId,
        (ele, id) => ele == id
      );
      state.selectedJobId = difference(state.selectedJobId, arrId);
      state.selectedJobData = differenceWith(
        state.selectedJobData,
        arrId,
        (ele, id) => ele.id == id
      );
      state.totalJobsSelected = state.selectedJobData.length;
    },

    updateJobId(state, data) {
      if (state.selectedJobId.indexOf(data.id) < NUMBER.ZERO) {
        state.selectedJobId.push(data?.id);
      }
    },

    updateAlterDataStatus(state, data) {
      state.alterData = data;
    },

    updateRiderDropdownForTransferJob(state, payload) {
      const { mode, data } = payload;
      switch (mode) {
        case "bike": {
          state.riderDropdownDataForTransferJob.bike = data;
          break;
        }
        case "van": {
          state.riderDropdownDataForTransferJob.van = data;
          break;
        }
        case "rapido": {
          state.riderDropdownDataForTransferJob.rapido = data;
          break;
        }
      }
    },

    updateSMSDetails(state, data) {
      state.smsDetails = data;
    }
  },

  actions: {
    //put methods to handle mutations and state
    showUpdateRouteSettingsDialog({ state, commit }, data) {
      if (data.updateRouteSettingsDialog == false) {
        state.updateRouteSettingsFormData = {};
      }
      commit("displayUpdateRouteSettingsDialog", data);
    },
    showAcknowledgeSlipDialog({ state, commit }, data) {
      if (data.acknowledgeSlipDialog == false) {
        state.acknowledgeSlipFormData = {};
      }
      commit("displayAcknowledgeSlipDialog", data);
    },
    //Get live job status table list
    loadLiveJobStatusList({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/bookings/live-job-status`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const liveJobStatusData = response?.data?.results || {};
            let currentTab =
              data.currentTab == "BikeTab"
                ? "bike"
                : data.currentTab == "VanTab"
                ? "van"
                : "rapido";
            const totalRecords = liveJobStatusData[currentTab].count || 0;
            state.bikeCount = liveJobStatusData["bike"].count || 0;
            state.vanCount = liveJobStatusData["van"].count || 0;
            state.rapidoCount = liveJobStatusData["rapido"].count || 0;
            commit("updateDataOfLiveJobStatus", liveJobStatusData || {});
            commit("updateTotalRecords", totalRecords || 0);
          }
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get job type list
    getJobTypeData({ state, commit }, data) {
      return _get(`crm/dropdown/job-type`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const jobTypeData = response.data?.results || [];
            let setJobTypeData = jobTypeData.map((res, index) => {
              let data = {
                ...res,
                name: res.job_type,
              };
              return data;
            });

            commit("updateDataOfJobType", setJobTypeData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get zones list
    getZoneData({ state, commit }, data) {
      return _get(`operations/route-plan/dropdown/zone/bike`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const zoneData = response.data?.results || [];
            let setZoneData = zoneData.map((res, index) => {
              let data = {
                ...res,
                name: res.zone_name,
              };
              return data;
            });

            commit("updateDataOfZone", setZoneData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get customer name list
    getCustomerNameData({ state, commit }, data) {
      return _get(`crm/dropdown/company`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const customerNameData = response.data?.results || [];
            let setCustomerNameData = customerNameData.map((res, index) => {
              let data = {
                ...res,
                name: res.company_name,
              };
              return data;
            });

            commit("updateDataOfCustomerName", setCustomerNameData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Update notify rider app
    notifyRiderApp({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/bookings/live-job/notify`, data)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Send SMS on live job status
    sendSMSOnLiveJobStatus({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/bookings/live-job/sms`, data)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      {
        path,
        method,
        data,
        loadData,
        id,
        type,
        toastMutationData,
        toastData,
        loadDiffStore,
        closeDialogue,
      }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, "closeDialog", { root: true });
          } else {
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData, { id, type }, { root: true });

            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message.includes("PostalCode Conflicting")) {
              let methodsdata = {
                type: type,
                ...data,
              };
              commit("fetcherrorconflicting", methodsdata);
            }

            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },

    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },

    showFilterDialog({ state, commit }, data) {
      commit("updateAdvanceDisplayDialog", data);
    },

    getBikeRouteDropDownList({ state, commit }, data) {
      state.tableLoad = true;
      return _get(`operations/route-plan/dropdown/zones/route/bike/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let bikeRouteData = response.data?.results || [];
            commit("routeBikeDropDownList", bikeRouteData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getVanRouteDropDownList({ state, commit }, data) {
      state.tableLoad = true;
      return _get(`operations/route-plan/dropdown/zones/route/van/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let vanRouteData = response.data?.results || [];
            commit("routeVanDropDownList", vanRouteData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getRouteRapidoDropDownList({ state, commit }, data) {
      state.tableLoad = true;
      return _get(`operations/route-plan/dropdown/zones/route/rapido/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let rapidoRouteData = response.data?.results || [];
            commit("routeRapidoDropDownList", rapidoRouteData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getZoneDropDownList({ state, commit }, data) {
      state.tableLoad = true;
      let path;
      if (data === "BikeTab") {
        path = "/operations/route-plan/dropdown/zone/bike";
      } else if (data === "VanTab") {
        path = "/operations/route-plan/dropdown/zone/van";
      } else if (data === "RapidoTab") {
        path = "/operations/route-plan/dropdown/zone/rapido";
      }
      return _get(path)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated = response.data.results;
            if (data === "BikeTab") {
              commit("zoneDropDownList", updated);
            } else if (data === "VanTab") {
              commit("zoneVanDropDownList", updated);
            } else if (data === "RapidoTab") {
              commit("zoneRapidoDropDownList", updated);
            }
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getBikeRiderDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(`/hrms/employee/rider`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let bikeRiderData = response.data?.results || [];
            commit("updateBikeRiderList", bikeRiderData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getVanRiderDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(`/hrms/employee/driver`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let vanRiderData = response.data?.results || [];
            commit("updateVanRiderList", vanRiderData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getRapidoRiderDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(`/hrms/employee/rapidodriver`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let rapidoRiderData = response.data?.results || [];
            commit("updateRapidoRiderList", rapidoRiderData);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getTripDropDownList({ state, commit }, data) {
      state.tableLoad = true;
      let path;
      if (data === "BikeTab") {
        path = "/operations/rider-allot/suggestions/callTrips/bike";
      } else if (data === "VanTab") {
        path = "/operations/rider-allot/suggestions/callTrips/van";
      } else if (data === "RapidoTab") {
        path = "/operations/rider-allot/suggestions/callTrips/rapido";
      }
      return _get(path)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated = response.data.results;
            if (data === "BikeTab") {
              commit("tripDropDownList", updated);
            } else if (data === "VanTab") {
              commit("tripVanDropDownList", updated);
            } else if (data === "RapidoTab") {
              commit("tripRapidoDropDownList", updated);
            }
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    saveUpdateRouteSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`crm/booking/live-job/route-settings`, data)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    uploadSignatureImage({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`crm/bookings/jobs/signature/${data.id}`, data.formData)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    uploadPODImage({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _post(`crm/bookings/jobs/pod/${data.id}`, data.attachments)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteSignatureImage({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _delete(`crm/bookings/jobs/signature/${data}`)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateAdvanceFilterOnLiveJobStatus({ state, commit }, data) {
      if (data.currentTab == "BikeTab") {
        state.bikeAdvanceFilterForm = data.formData;
        commit("updateAdvanceBikeFilterParams", data.filter_params);
      } else if (data.currentTab == "VanTab") {
        state.vanAdvanceFilterForm = data.formData;
        commit("updateAdvanceVanFilterParams", data.filter_params);
      } else {
        state.rapidoAdvanceFilterForm = data.formData;
        commit("updateAdvanceRapidoFilterParams", data.filter_params);
      }
    },

    clearAdvanceFilterOnLiveJobStatus({ state, commit }, data) {
      state.bikeAdvanceFilterForm = data.formData;
      commit("updateAdvanceBikeFilterParams", data.filter_params);
      state.vanAdvanceFilterForm = data.formData;
      commit("updateAdvanceVanFilterParams", data.filter_params);
      state.rapidoAdvanceFilterForm = data.formData;
      commit("updateAdvanceRapidoFilterParams", data.filter_params);
    },

    loadStatusListOfUpdateStatus({ state, commit }, data) {
      return _get(`crm/dropdown/job/status`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const statusData = response.data?.results || [];
            let setStatusData = statusData.map((res, index) => {
              let data = {
                ...res,
                name: res.status,
              };
              return data;
            });

            commit("updateDataOfStatusList", setStatusData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    showUpdateStatusDialog({ state, commit }, data) {
      commit("displayUpdateStatusDialog", data);
    },

    showSendSMSDialog({ state, commit }, data) {
      commit("displaySMSDialog", data);
    },

    showPrintPreviewDialog({ state, commit }, data) {
      commit("displayPrintPreviewDialog", data);
    },

    //Update job status on live job status
    updateLiveJobStatusData({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`crm/bookings/jobs/status/${data.id}`, data.jobStatusData)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.updateStatusDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    getLiveJobExpansionList({ state, commit }, data) {
      state.tableLoad = true;
      return _get(`/crm/bookings/job-track/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated = response.data;
            commit("liveJobExpansionList", updated);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    acknowledgeSlipPrint({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`/crm/booking/live-job/acknowledge-slip/print/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    acknowledgeSlipPreview({ state, commit }, data) {
      state.tableLoad = true;
      return _post(
        `/crm/booking/live-job/acknowledge-slip/preview/${data}`,
        data,
        {
          responseType: "blob",
        }
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

    jobSheetPrint({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/booking/live-job/job-sheet/print/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    jobSheetPreview({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/booking/live-job/job-sheet/preview/${data}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Get Print Label
    loadPrintLabel({ state, commit }, data) {
      return _post(`crm/booking/live-job/print-label/print/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Print Label preview
    loadPrintPreview({ state, commit }, data) {
      return _post(
        `crm/booking/live-job/print-label/preview/${data.id}`,
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

    //Get Instruction Slip Label
    loadInstructionSlipLabel({ state, commit }, data) {
      return _post(
        `crm/booking/live-job/instruction-slip/print/${data.id}`,
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
        `crm/booking/live-job/instruction-slip/preview/${data.id}`,
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

    // transfer job actions
    async getTripsByLogistics({ commit }, mode) {
      const payload = mode.toLowerCase();
      const { data } = await _get(API.TRIPS + "/" + payload);
      if (data && data.status == 200) {
        commit("setTripsData", {
          mode: payload,
          data: data.results ?? [],
        });
      }
    },

    async fetchSelectedJobById({ state, commit }, payload) {
      state.selectedJobId = payload;
      const body = { jobId: state.selectedJobId };
      const { data } = await _post(API.JOBSELECT.LIST, body);
      if (data && data.status == 200) {
        commit("setSelectedJobData", data.results);
        commit("setParentTriggered", true);
      }
    },

    async getLiveJobAndLoad({ commit, dispatch }, params) {
      try {
        const { data } = await _get(API.JOBSELECT.GET_ID + "/" + params);
        if (data && data.status == 200) {
          commit("updateJobId", data?.results);
          dispatch("scanAndPushSelectedJobById");
          return data;
        }
      } catch (error) {
        return error;
      }
    },

    async scanAndPushSelectedJobById({ state, commit }) {
      const { selectedJobId } = state;
      const body = { jobId: selectedJobId };
      const { data } = await _post(API.JOBSELECT.LIST, body);
      if (data && data.status == 200) {
        commit("checkAndSetSelectedJobData", data.results);
        commit("updateAlterDataStatus", true);
      }
    },

    async updateSelectedJobForTransfer(
      { commit },
      { formData, isLiveJobData, toastData, updatedId }
    ) {
      try {
        const body = { jobUpdates: formData };
        const { data } = await _patch(API.JOBSELECT.UPDATE, body);
        if (data && data.status == 200) {
          toastData.toastSuccessData.toastMsg = data.results;
          commit("toastMutation", toastData.toastSuccessData);
          if (isLiveJobData) {
            commit("setParentTriggered", false);
            commit("updateAlterDataStatus", false);
            commit("removeSelectedJob", updatedId);
            return { data, bool: true };
          } else {
            commit("updateAlterDataStatus", false);
            commit("removeSelectedJob", updatedId);
            return { data, bool: false };
          }
        }
      } catch (error) {
        if (error.response) {
          toastData.toastCommonErrorData.toastMsg = error.response.data.message;
          commit("toastMutation", toastData.toastCommonErrorData);
        }
      }
    },

    async getRiderForTransferJob({ commit }, mode) {
      const riderType = mode.toLowerCase();
      const payload =
        riderType == "bike"
          ? "rider"
          : riderType == "van"
          ? "driver"
          : "rapidodriver";
      const { data } = await _get(API.RIDER + "/" + payload);
      if (data && data.status == 200) {
        commit("updateRiderDropdownForTransferJob", {
          mode: riderType,
          data: data.results ?? [],
        });
      }
    },

    updateCommonFilterParams({ state, commit }, data) {
      if (data.currentTab == "BikeTab") {
        commit("updateBikeFilterParams", data.bike?.filter_params);
      } else if (data.currentTab == "VanTab") {
        commit("updateVanFilterParams", data.van?.filter_params);
      } else {
        commit("updateRapidoFilterParams", data.rapido?.filter_params);
      }
      return;
    },

    podReportDownload({ state, commit }, data) {
      return _post(`crm/booking/live-job/pod/report/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    getSMSDetails({ state, commit }, data) {
      state.tableLoad = true;
      return _get(`/crm/bookings/livejob/sms/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let smsData = response.data?.results || {};
            commit("updateSMSDetails", smsData);
          }
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
  },
};

export default liveJobStatus;
