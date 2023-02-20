import { _get, _post, _put, _patch, _delete } from "../../apiService";

const customerLaunchBookingHistory = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    internationalTablebData: [],
    expressTableData: [],
    expressHistoryTableData: [],
    HistoryTableData: [],
    radpidoTableData: [],
    customerTabMenuData: [
      {
        label: "InternationalTab",
        tab: "InternationalTab",
        select: false,
        tabName: "International",
        data: "internationalTablebData",
        subTabledata: "expressSubTableData",
        pageOffset: "internationalPageOffset",
        columns: "internationalColumnData",
      },
      {
        label: "ExpressTab",
        tab: "expressHistoryTable",
        select: true,
        tabName: "Express",
        data: "expressTableData",
        subTabledata: "expressSubTableData",
        pageOffset: "expressPageOffset",
        columns: "expressTableColumnData",
      },
      {
        label: "RapidoTab",
        tab: "RapidoTab",
        select: true,
        tabName: "Rapido",
        data: "radpidoTableData",
        subTabledata: "expressSubTableData",
        pageOffset: "rapidoPageOffset",
        columns: "rapidoTableColumnData",
      },
    ],
    expressFilterParams: [
      {
        column_name: "collection_slip_no",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "job_type",
        type: "contains",
        searchKey: "",
      },
      // {
      //   column_name: "caller_details",
      //   type: "contains",
      //   searchKey: "",
      // },
      // {
      //   column_name: "company_details",
      //   type: "contains",
      //   searchKey: "",
      // },
      {
        column_name: "cost_center",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "status",
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
    ],
    expressHistoryColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "date", header: "Date" },
      { field: "collection_slip_no", header: "Collection Slip No" },
      { field: "job_type", header: "Job Type" },
      { field: "customer_type", header: "Customer Type" },
      { field: "caller_details", header: "Caller Details" },
      { field: "customer_details", header: "Company Details" },
      { field: "cost_center", header: "Cost Center" },
      { field: "status", header: "Status" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    expressSubTableColumns: [
      { field: "document_image", header: "Image" },
      { field: "document_details", header: "Book Document" },
      { field: "job_priority", header: "Job Priority" },
      { field: "time_date", header: "Date & Time" },
      { field: "job_type", header: "Job Type" },
      { field: "service_type", header: "Service Type" },
      { field: "logistics_mode", header: "Logistics Mode" },
      { field: "Cash", header: "cash" },
      { field: "reference_no", header: "Order/ Reference No" },
      { field: "remarks", header: "Remarks" },
      { field: "foc", header: "FOC" },
      { field: "status", header: "Status" },
    ],
    pageOffset: 1,
    pageLimit: 10,
    totalRecords: 10,
    globalSearchKey: "",
    jobTableLoad: false,
    displayDialog: false,
    jobStatusDisplayDialog: false,
    overAllTrackStatus: {},
    overAllJobDetails: {},
  },

  getters: {
    //put getters methods goes here
    getCustomerTabMenuData(state) {
      return state.customerTabMenuData;
    },
    getTableLoadingState(state) {
      return state.tableLoad;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getPageOffset(state) {
      return state.pageOffset;
    },
    getTotalRecords(state) {
      return state.totalRecords;
    },
    getExpressFilterParams(state) {
      return state.expressFilterParams;
    },
    getExpressHistoryColumns(state) {
      return state.expressHistoryColumnData;
    },
    getExpressHistorySubColumns(state) {
      return state.expressSubTableColumns;
    },
    getExpressTableData(state) {
      return state.expressTableData;
    },
    getExpressHistoryTableData(state) {
      return state.expressHistoryTableData;
    },

    getHistoryTableData(state) {
      return state.HistoryTableData;
    },
    getExpressExpansionTableLoad(state) {
      return state.jobTableLoad;
    },
    getDisplayDialog(state) {
      return state.displayDialog;
    },
    getOverAllTrackStatus(state) {
      return state.overAllTrackStatus;
    },
    getJobStatusDisplayDialog(state) {
      return state.jobStatusDisplayDialog;
    },
    getOverAllJobDetails(state) {
      return state.overAllJobDetails;
    },
  },

  mutations: {
    //put update methods goes here

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updateFetchDateOfExpressHistory(state, data) {
      state.expressTableData = data || [];
    },

    fetchDataOfExpressHistoryTable(state, data) {
      state.expressHistoryTableData = data || [];
    },

    updateFetchDateOfHistory(state, data) {
      state.HistoryTableData = data || [];
    },

    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
    },
    updateDisplayDialog(state, data) {
      state.displayDialog = data;
    },
    updateJobStatusDisplayDialog(state, data) {
      state.jobStatusDisplayDialog = data;
    },
  },

  actions: {
    //put methods to handle mutations and state

    //load express tab table data
    loadExpressTableData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `crm/bookings?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}&customerType=${data.customer_type}`,
          data
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let expressHistoryData = response?.data.results.rows || [];
              let totalRecords = response?.data?.results?.count || 0;
              let setExpressHistoryData = expressHistoryData.map((res) => {
                res.expanded = false;
                res["displayName"] = res.customer_details?.profile_name;
                res["callerDetails"] = res.caller_details?.name,
                res["callername"] = res?.caller_name
                  ? res.caller_details?.name
                  : "";
                return res;
              });
              commit(
                "updateFetchDateOfExpressHistory",
                setExpressHistoryData || []
              );
              commit(
                "updateFetchDateOfHistory",
                setExpressHistoryData.rows || []
              );
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
    //
    loadExpressCustomerHistoryTableData({ state, commit }, data) {
      // state.tableLoad = true;
      let payload = { contract_id: data.contract_id }
      state.tableLoad = true;
      state.globalSearchKey = data.searchKey || "";
      return new Promise((resolve, reject) => {
        _post(
          `/crm/bookings/by-contract?offset=${data.offset}&limit=${data.limit}`, data
        )
          .then(async (response) => {
            if (response && response.status === 200) {

              let expressHistoryData = response?.data.results.rows || [];
              let totalRecords = response?.data?.results?.count || 0;
              let setExpressHistoryData = expressHistoryData.map((res) => {
                res.expanded = false;
                res["displayName"] = res.customer_details?.profile_name;
                res["callerDetails"] = res.caller_details?.name
                  ? res.caller_details?.name
                  : "";
                // res["sno"] = i + 1;
                res["createdAt"] = new Date(res.createdAt);
                return res;
              });
              commit("fetchDataOfExpressHistoryTable", setExpressHistoryData);
              commit(
                "updateFetchDateOfHistory",
                setExpressHistoryData.rows || []
              );
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

    //load common data of table
    async loadCommonTableData({ state, commit, dispatch }, data) {
      state.tableLoad = true;
      if (data.tabName == "ExpressTab") {
        return await dispatch("loadExpressTableData", data.pagination);
      }
    },

    //load common data of specific job
    async loadCommonJobsData({ state, commit, dispatch }, data) {
      state.jobTableLoad = true;
      if (data.tabName == "ExpressTab") {
        return await dispatch("loadSpecificBookingJobsData", data);
      }
    },

    //load specifc express booking jobs data
    loadSpecificBookingJobsData({ state, commit }, data) {
      state.jobTableLoad = true;
      return new Promise((resolve, reject) => {
        _get(`crm/bookings/job/${data.id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let expressJobsData = response?.data.results || [];
            }
            state.jobTableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.jobTableLoad = false;
            reject(err);
          });
      });
    },

    //get over all job status for specific job
    loadSpecificBookingOverAllJobData({ state, commit }, data) {
      state.jobTableLoad = true;
      return new Promise((resolve, reject) => {
        _get(`crm/bookings/jobs/overall-track?bookingId=${data.id}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let overAllJobsData = response?.data.results || [];
            }
            state.jobTableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.jobTableLoad = false;
            reject(err);
          });
      });
    },

    //get over all track status for specific job
    loadSpecificBookingOverAllTrackStatus({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _get(`crm/bookings/jobs/overall-track/${data}`)
          .then(async (response) => {
            let setOverAllTrackStatus;
            let overAllResponse = response;
            if (response && response.status === 200) {
              let overAllTrackStatus = overAllResponse?.data.results || {};
              setOverAllTrackStatus = overAllTrackStatus?.status_updates.map(
                (res) => {
                  res.status = overAllTrackStatus?.status || "";
                  return res;
                }
              );
            }
            resolve(overAllResponse);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //get all job status for track status details
    loadOverAllTrackStatusForARow({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _get(`crm/bookings/all-job/track/${data}`)
          .then(async (response) => {
            let setOverAllTrackStatusForARow;
            let overAllResponse = response;
            if (response && response.status === 200) {
              let overAllTrackStatusForARow =
                overAllResponse?.data.results || {};
              setOverAllTrackStatusForARow = overAllTrackStatusForARow;
              state.overAllTrackStatus = setOverAllTrackStatusForARow;
            } else {
              state.overAllTrackStatus = {};
            }
            resolve(setOverAllTrackStatusForARow);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //get over all job details for specific job
    loadSpecificBookingOverAllJobDetails({ state, commit }, data) {
      state.overAllJobDetails = {};
      return new Promise((resolve, reject) => {
        _get(`crm/bookings/job-track/${data}`)
          .then(async (response) => {
            let setOverAllJobDetails;
            let overAllResponse = response;
            if (response && response.status === 200) {
              let overAllJobDetails = overAllResponse?.data.results || {};
              setOverAllJobDetails = overAllJobDetails;
              state.overAllJobDetails = setOverAllJobDetails;
            } else {
              state.overAllJobDetails = {};
            }
            resolve(setOverAllJobDetails);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Upload Signature image on job details
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

    //Upload POD image on job details
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

    //Delete POD image on job details
    deletePODImage({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _delete(`crm/bookings/jobs/pod/${data}`)
          .then(async (response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Delete Signature image on job details
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

    getCutomerDetailsForBookingHistory({ state, commit }, data) {
      state.jobTableLoad = true;
      return new Promise((resolve, reject) => {
        _post(`/crm/book-history/customer`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              let overAllData = response?.data.results || [];
            }
            state.jobTableLoad = false;
            resolve(response);
          })
          .catch((err) => {
            state.jobTableLoad = false;
            reject(err);
          });
      });
    },

    //update page offset and limit on table
    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },

    //show track dialog on
    showTrackDialog({ state, commit }, data) {
      commit("updateDisplayDialog", data);
    },
    showJobDetailDialog({ state, commit }, data) {
      commit("updateJobStatusDisplayDialog", data);
    },
  },
};

export default customerLaunchBookingHistory;
