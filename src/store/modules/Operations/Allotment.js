import { _get, _post, _put, _patch, _delete } from '../../apiService';
import axios from 'axios';
//adhoc sub table overlay data

const operationAllotment = {
  namespaced: true,
  state: {
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    toggleData: [{ type: '' }],
    globalSearch: '',
    //Dialog Data
    displayDialog: false,
    dialogHeader: null,
    dialogComponent: null,
    dialogHeaderId: null,
    //DuoSelect
    addRegionDeliveryTransportType: null,
    addRegionDeliveryTransportTypeHistory:null,
    // put variables and collections here
    BikeAllotmentTableColumnData: [
      { field: 's_no', header: 'S.No' },
      { field: 'Actions', header: 'Actions' },
      { field: 'trip_code', header: 'Trip Code' },
      { field: 'trip_name', header: 'Trip Name' },
      { field: 'from_date', header: 'From' },
      { field: 'to_date', header: 'To' },
      { field: 'grace_period', header: 'Grace Period (mins)' },
      { field: 'trip_days', header: 'Trip Days' },
      { field: 'type', header: 'Trip Type' },
      { field: 'status', header: 'Status' },
      { field: 'created_by', header: 'Created By' },
      { field: 'createdAt', header: 'Created On' },
    ],
    RiderZoneAllotmentTableColumnData: [
      { field: 's_no', header: 'S.No' },
      { field: 'driver', header: 'Driver' },
      { field: 'zone.zone_name', header: 'Zone' },
      { field: 'Check_box', header: '' },
    ],
    RiderAllotmentTableColumnData: [
      { field: 's_no', header: 'S.No' },
      { field: 'alloted_date', header: 'Date' },
      { field: 'zone.zone_name', header: 'Zone' },
      { field: 'route_name', header: 'Route' },
      { field: 'createdAt', header: 'Created On' },
      { field: 'empty', header: ' ' },
    ],
    RiderAllotmentExpansionTableColumnData: [
      { field: 's_no', header: 'S.No' },
      { field: 'trip_name', header: 'Trips' },
      { field: 'employee_name', header: 'Rider' },
      { field: 'empty', header: ' ' },
    ],

    reportTableData: [
      {
        s_no: '1',
        Trip_Code: 'DHL 003',
        Trip_Name: 'Adhoc',
        Grace_Period: 'No.1 Second Chin Bee 238801',
        Trip_Days: 'Called',
        Created_On: '2021-12-06T09:14:39.228Z',
        Created_By: 'Antony Jerold',
        From: '12:00',
        To: '12:00',
        Trip_Type: 'Normal',
      },
      {
        s_no: '2',
        Trip_Code: 'DHL 003',
        Trip_Name: 'Adhoc',
        Grace_Period: 'No.1 Second Chin Bee 238801',
        Trip_Days: 'Called',
        Created_On: '2021-12-06T09:14:39.228Z',
        Created_By: 'Antony Jerold',
        From: '12:00',
        To: '12:00',
        Trip_Type: 'Normal',
      },
      {
        s_no: '3',
        Trip_Code: 'DHL 003',
        Trip_Name: 'Adhoc',
        Grace_Period: 'No.1 Second Chin Bee 238801',
        Trip_Days: 'Called',
        Created_On: '2021-12-06T09:14:39.228Z',
        Created_By: 'Antony Jerold',
        From: '12:00',
        To: '12:00',
        Trip_Type: 'Normal',
      },
      {
        s_no: '4',
        Trip_Code: 'DHL 003',
        Trip_Name: 'Adhoc',
        Grace_Period: 'No.1 Second Chin Bee 238801',
        Trip_Days: 'Called',
        Created_On: '2021-12-06T09:14:39.228Z',
        Created_By: 'Antony Jerold',
        From: '12:00',
        To: '12:00',
        Trip_Type: 'Normal',
      },
      {
        s_no: '5',
        Trip_Code: 'DHL 003',
        Trip_Name: 'Adhoc',
        Grace_Period: 'No.1 Second Chin Bee 238801',
        Trip_Days: 'Called',
        Created_On: '2021-12-06T09:14:39.228Z',
        Created_By: 'Antony Jerold',
        From: '12:00',
        To: '12:00',
        Trip_Type: 'Normal',
      },
    ],
    //Tabledatas
    BikeAllotmentTableData: [],
    VanAllotmentTableData: [],
    RapidoAllotmentTableData: [],
    RiderAllotmentStateData: null,
    //RiderZone
    BikeRiderZoneAllotmentTableData: [],
    VanRiderZoneAllotmentTableData: [],
    //defaultriderallotment
    BikeDefaultRiderAllotmentTableData: [],
    VanDefaultRiderAllotmentTableData: [],
    DropDownDataTable: [],
    DropDownVanDataTable: [],
    //STANDBY
    BikeTableData: [],
    VanTableData: [],
    DateData: {},
    DateDataVan: {},
    errorconflicting: null,
    errorconflictingvan: null,
    DropDownDataTableStandBy: [],
    multipleRiderData: [],
    DropDownDataTableStandByVan: [],
    RiderAllotmentTableDataBike: [],
    RiderAllotmentTableDataVan: [],
    RiderAllotmentExpandTableDataBike: [],
    RiderAllotmentExpandTableDataVan: [],
    riderDropDownList: [],
    riderDropDownOptionData: [],
    riderDropDownOptionDataStanby:[]
  },

  getters: {
    //put getters methods goes here
    RiderAllotmentExpandTableDataVan(state) {
      return state.RiderAllotmentExpandTableDataVan;
    },
    RiderAllotmentExpandTableDataBike(state) {
      return state.RiderAllotmentExpandTableDataBike;
    },
    RiderAllotmentTableDataBikeData(state) {
      return state.RiderAllotmentTableDataBike;
    },
    RiderAllotmentTableDataVanData(state) {
      return state.RiderAllotmentTableDataVan;
    },
    RiderAllotmentTableColumnData(state) {
      return state.RiderAllotmentTableColumnData;
    },
    RiderAllotmentExpansionTableColumnData(state) {
      return state.RiderAllotmentExpansionTableColumnData;
    },

    addRegionDeliveryTransportTypeData(state) {
      return state.addRegionDeliveryTransportType;
    },
    globalSearch: ({ globalSearch }) => globalSearch,
    controlActivityDialog(state) {
      state.displayDialog = true;
    },

    BikeTableData: ({ BikeTableData }) => BikeTableData,
    DropDownDataTable: ({ DropDownDataTable }) => DropDownDataTable,
    DropDownVanDataTable: ({ DropDownVanDataTable }) => DropDownVanDataTable,

    BikeDefaultRiderAllotmentTableData: ({
      BikeDefaultRiderAllotmentTableData,
    }) => BikeDefaultRiderAllotmentTableData,

    VanDefaultRiderAllotmentTableData: ({
      VanDefaultRiderAllotmentTableData,
    }) => VanDefaultRiderAllotmentTableData,

    BikeAllotmentTableData: ({ BikeAllotmentTableData }) =>
      BikeAllotmentTableData,

    VanRiderZoneAllotmentTableData: ({ VanRiderZoneAllotmentTableData }) =>
      VanRiderZoneAllotmentTableData,

    VanAllotmentTableData: ({ VanAllotmentTableData }) => VanAllotmentTableData,
    RapidoAllotmentTableData: ({ RapidoAllotmentTableData }) =>
      RapidoAllotmentTableData,
  },

  mutations: {
    saveRiderDropDownList(state, data) {
      state.riderDropDownList = data || [];
    },
    fetcherrorconflictingvan(state, data) {
      state.errorconflictingvan = data;
    },
    fetcherrorconflicting(state, data) {
      state.errorconflicting = data;
    },
    fetchRiderAllotmentTableDataVan(state, data) {
      state.RiderAllotmentTableDataVan = data;
    },
    fetchRiderAllotmentTableDataBike(state, data) {
      state.RiderAllotmentTableDataBike = data;
    },
    fetchVanTableData(state, data) {
      state.VanTableData = data;
    },
    fetchBikeTableData(state, data) {
      state.BikeTableData = data;
    },
    fetchDropDownDataTableStandByVan(state, data) {
      state.DropDownDataTableStandByVan = data;
    },
    fetchDropDownDataTableStandBy(state, data) {
      state.DropDownDataTableStandBy = data;
    },
    fetchmultipleRiderData(state, data) {
      state.multipleRiderData = data;
    },
    fetchDropDownDataTable(state, data) {
      state.DropDownDataTable = data;
    },
    fetchriderDropDownOptionData(state, data) {
      state.riderDropDownOptionData = data || [];
    },
    fetchriderDropDownOptionDataStandby(state, data) {
      state.riderDropDownOptionDataStanby = data || [];
    },
    fetchDropDownVanDataTable(state, data) {
      state.DropDownVanDataTable = data;
    },

    fetchRiderAllotmentExpandTableDataVan(state, data) {
      state.RiderAllotmentExpandTableDataVan = data;
    },
    fetchRiderAllotmentExpandTableDataBike(state, data) {
      state.RiderAllotmentExpandTableDataBike = data;
    },
    fetchBikeDefaultRiderAllotmentTableData(state, data) {
      state.BikeDefaultRiderAllotmentTableData = data;
    },

    fetchVanDefaultRiderAllotmentTableData(state, data) {
      state.VanDefaultRiderAllotmentTableData = data;
    },

    fetchBikeAllotmentTableData(state, data) {
      state.BikeAllotmentTableData = data;
    },
    fetchVanAllotmentTableData(state, data) {
      state.VanAllotmentTableData = data;
    },
    fetchRapidoAllotmentTableData(state, data) {
      state.RapidoAllotmentTableData = data;
    },
    fetchBikeRiderZoneAllotmentTableData(state, data) {
      state.BikeRiderZoneAllotmentTableData = data;
    },
    fetchVanRiderZoneAllotmentTableData(state, data) {
      state.VanRiderZoneAllotmentTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    //put update methods goes here
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
      state.dialogHeaderId = dialogDetails.dialogHeaderId;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
    addRegionDeliveryTransportTypeMutationHistory(state, type) {
      state.addRegionDeliveryTransportTypeHistory = type;
    },
  },

  actions: {
    getRiderDropDownListSearch({ state, commit }, datacome) {
      return new Promise((resolve, reject) => {
        let path;
        if (datacome.tab == 'RapidocollectionDataTablepage') {
          path = `/hrms/employee/rapidodriver?globalsearchkey=${datacome.employee_name}`;
        } else if (datacome.tab == 'RapidoDeliveryDataTable') {
          path = `/hrms/employee/rapidodriver?globalsearchkey=${datacome.employee_name}`;
        }
        _get(path)
          .then(async (response) => {
            if (response && response.status === 200) {
              commit('saveRiderDropDownList', response.data.results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async loadfetchRiderAllotmentExpandTableDataVan({ commit }, { id }) {
      axios.get('/operations/rider-allot/standby/van/' + id).then((res) => {
        if (res.data.results) {
          commit('fetchRiderAllotmentExpandTableDataVan', res.data.results);
        }
      });
    },

    async loadfetchRiderAllotmentExpandTableDataBike({ commit }, { id }) {
      axios.get('/operations/rider-allot/standby/bike/' + id).then((res) => {
        if (res.data.results) {
          commit('fetchRiderAllotmentExpandTableDataBike', res.data.results);
        }
      });
    },
    async loadfetchBikeDefaultRiderAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/bike/default').then((res) => {
        if (res.data.results) {
          commit('fetchBikeDefaultRiderAllotmentTableData', res.data.results);
        }
      });
    },

    async loadfetchVanDefaultRiderAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/van/default').then((res) => {
        if (res.data.results) {
          commit('fetchVanDefaultRiderAllotmentTableData', res.data.results);
        }
      });
    },

    async loadBikeAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/bike/calltrips').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchBikeAllotmentTableData', res.data.results);
        }
      });
    },
    async loadVanAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/van/calltrips').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchVanAllotmentTableData', res.data.results);
        }
      });
    },
    async loadRapidoAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/rapido/calltrips').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchRapidoAllotmentTableData', res.data.results);
        }
      });
    },
    async loadBikeRiderZoneAllotmentTableData({ commit }) {
      axios.get('/operations/rider-zone-allot/bike').then((res) => {
        if (res.data.results) {
          commit('fetchBikeRiderZoneAllotmentTableData', res.data.results);
        }
      });
    },
    async loadVanRiderZoneAllotmentTableData({ commit }) {
      axios.get('/operations/rider-zone-allot/van').then((res) => {
        if (res.data.results) {
          commit('fetchVanRiderZoneAllotmentTableData', res.data.results);
        }
      });
    },

    DELETECRUDOPERATION(
      { dispatch, commit },
      {
        path,
        method,
        loadData,
        toastData,
        id,
        type
      }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
          }
        })
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err?.response?.data?.message;
          commit('toastMutation', toastData.toastErrorData);
        });
    },

    //FOR RESULT DATA
    POSTPATCHCRUDOPERATIONRIDERALLOTMENTBIKE(
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
            commit('fetchRiderAllotmentTableDataBike', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            commit('fetchRiderAllotmentTableDataBike', res.data.results);
            dispatch(loadData, { id, type }, { root: true });
            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONRIDERALLOTMENTVAN(
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
            commit('fetchRiderAllotmentTableDataVan', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            commit('fetchRiderAllotmentTableDataVan', res.data.results);
            dispatch(loadData, { id, type }, { root: true });
            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
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
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONDEFAULT(
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
            commit('fetchDropDownDataTable', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    getSearchRiderData(
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
            commit('fetchriderDropDownOptionData', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    getSearchRiderDataStandby(
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
            commit('fetchriderDropDownOptionDataStandby', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONMULTIPLERIDER(
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
            commit('fetchmultipleRiderData', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONSTANDBYY(
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
            commit('fetchDropDownDataTableStandBy', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONVANSTANDBYY(
      { dispatch, commit },
      {
        path,
        method,
        data,
        loadData,
        loadid,
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
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData,  { id: id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message.includes('Conflicting dates')) {
              commit('fetcherrorconflictingvan', data);
            }

            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },

    POSTPATCHCRUDOPERATIONSTANDBYYVAN(
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
            commit('fetchDropDownDataTableStandByVan', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },

    POSTPATCHCRUDOPERATIONRIDER(
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
            commit('fetchBikeTableData', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONSTANDBY(
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
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message.includes('Conflicting dates')) {
              commit('fetcherrorconflicting', data);
            }

            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },
    POSTPATCHCRUDOPERATIONRIDERVAN(
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
            commit('fetchVanTableData', res.data.results);
            commit('toastMutation', toastData.toastSuccessData);
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, 'closeDialog', { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });

            commit('toastMutation', toastData.toastSuccessData);

            dispatch('closeDialog');
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit('toastMutation', toastData.toastCommonErrorData);
          }
        });
    },

    openDialog({ commit, getters }, { dialogDetails }) {
      commit('dialogComponentMutation', dialogDetails);
      getters.controlActivityDialog;
    },
    closeDialog({ commit }) {
      commit('dialogDisplayMutation', false);
    },
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit('addRegionDeliveryTransportTypeMutation', type);
    },
    setRegionDeliveryTransportTypeHistory({ commit }, { type }) {
      commit('addRegionDeliveryTransportTypeMutationHistory', type);
    },
  },
};

export default operationAllotment;
