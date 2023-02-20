import { _get, _post, _put, _patch, _delete } from '../../apiService';
import axios from 'axios';
const TypeSetting = {
  namespaced: true,
  state: {
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    toggleData: [{ type: '' }],
    BikeDeliveryTypeTableColumnData: [
      { field: 's_no', header: 'S.No' },
      { field: 'Actions', header: 'Actions' },
      { field: 'driver', header: 'Driver' },
      { field: 'delivery_type', header: 'Delivery Type' },
      { field: 'from_date', header: 'From' },
      { field: 'to_date', header: 'To' },
      { field: 'trip_no', header: 'Trip No' },
      { field: 'status', header: 'Status' },
      { field: 'created_by', header: 'Created By' },
      { field: 'createdAt', header: 'Created On' },
    ],
    DriverDropDownList: [],
    //DuoSelect
    addRegionDeliveryTransportType: null,
    //Dialog Data
    displayDialog: false,
    dialogHeader: null,
    dialogComponent: null,
    dialogHeaderId: null,
    //driver dropdown get data
    bikeTypeDropDownDriver: [],
    addNewDropDownDatasettings: [
      {
        name: 'Add New',
        code: 'Hi',
        items: [
          {
            name: 'Airfreight',
            code: 1,
          },
          {
            name: 'DNATA',
            code: 2,
          },
          {
            name: 'OBC',
            code: 3,
          },
        ],
      },
    ],
    addNewDropDownDatasettingsVan: [
      {
        name: 'Add New',
        code: 'Hi',
        items: [
          {
            name: 'Airfreight',
            code: 1,
          },
          {
            name: 'DNATA',
            code: 2,
          },
          {
            name: 'OBC',
            code: 3,
          },
        ],
      },
    ],
    addNewDropDownDatasettingsRapido: [
      {
        name: 'Add New',
        code: 'Hi',
        items: [
          {
            name: 'Airfreight',
            code: 1,
          },
          {
            name: 'DNATA',
            code: 2,
          },
          {
            name: 'OBC',
            code: 3,
          },
        ],
      },
    ],
    BikedeliveryTypeTableData: [],
    VandeliveryTypeTableData: [],
    RapidodeliveryTypeTableData: [],

    //EDIT
    DeliveryTypeSettingStateData: {},
    DeliveryTypeSettingStateDataVan: {},
    DeliveryTypeSettingStateDataRapido: {},
    PrefillBikeDeliveryData: [],
    PrefillVanDeliveryData: [],
    PrefillRapidoDeliveryData: [],
  },

  getters: {
    //put getters methods goes here
    getDriverDropDownList(state, data) {
      return state.DriverDropDownList;
    },
    dialogComponentData(state) {
      return state.dialogComponent;
    },
    toggletypeData(state) {
      return state.toggleData;
    },
    showToastMessagedata(state) {
      return state.toastData;
    },
    RapidodeliveryTypeTableDataTable(state) {
      return state.RapidodeliveryTypeTableData;
    },
    VandeliveryTypeTableDatatable(state) {
      return state.VandeliveryTypeTableData;
    },
    BikeDeliveryTypeTableColumnDatatable(state) {
      return state.BikeDeliveryTypeTableColumnData;
    },
    BikedeliveryTypeTableDatatable(state) {
      return state.BikedeliveryTypeTableData;
    },
    PrefillBikeDeliveryData(state) {
      return state.PrefillBikeDeliveryData;
    },
    PrefillVanDeliveryDatawireup(state) {
      return state.PrefillVanDeliveryData;
    },
    PrefillRapidoDeliveryDatawireup(state) {
      return state.PrefillRapidoDeliveryData;
    },
    DeliveryTypeSettingStateDatabike(state) {
      return state.DeliveryTypeSettingStateData;
    },
    DeliveryTypeSettingStateDataVanData(state) {
      return state.DeliveryTypeSettingStateDataVan;
    },
    DeliveryTypeSettingStateDataRapidoData(state) {
      return state.DeliveryTypeSettingStateDataRapido;
    },
    addRegionDeliveryTransportTypeData(state) {
      return state.addRegionDeliveryTransportType;
    },
    addNewDropDownDatasettingsData(state) {
      return state.addNewDropDownDatasettings;
    },
    addNewDropDownDatasettingsVanData(state) {
      return state.addNewDropDownDatasettingsVan;
    },
    addNewDropDownDatasettingsRapidoData(state) {
      return state.addNewDropDownDatasettingsRapido;
    },
    globalSearch: ({ globalSearch }) => globalSearch,
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    BikedeliveryTypeTableData: ({ BikedeliveryTypeTableData }) =>
      BikedeliveryTypeTableData,
  },
  mutations: {
    saveDriverDropDownList(state, data) {
      state.DriverDropDownList = data || [];
    },
    fetchPrefillBikeDeliveryData(state, data) {
      state.PrefillBikeDeliveryData = data;
    },
    fetchPrefillVanDeliveryData(state, data) {
      state.PrefillVanDeliveryData = data;
    },
    fetchPrefillRapidoDeliveryData(state, data) {
      state.PrefillRapidoDeliveryData = data;
    },

    fetchRapidodeliveryTypeTableData(state, data) {
      state.RapidodeliveryTypeTableData = data;
    },
    fetchVandeliveryTypeTableData(state, data) {
      state.VandeliveryTypeTableData = data;
    },
    fetchBikedeliveryTypeTableData(state, data) {
      state.BikedeliveryTypeTableData = data;
    },
    fetchbikeTypeDropDownDriver(state, data) {
      state.bikeTypeDropDownDriver = data;
    },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
      state.dialogHeaderId = dialogDetails.dialogHeaderId;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
  },
  actions: {
    getDriverDropDownListSearch({ state, commit }, datacome) {
      return new Promise((resolve, reject) => {
        let path;
        if (datacome.tab == 'Bike') {
          path = `/hrms/employee/rider?globalsearchkey=${datacome.employee_name}`;
        } else if (datacome.tab == 'Van') {
          path = `/hrms/employee/driver?globalsearchkey=${datacome.employee_name}`;
        } else if (datacome.tab == 'Rapido') {
          path = `/hrms/employee/rapidodriver?globalsearchkey=${datacome.employee_name}`;
        }
        _get(path)
          .then(async (response) => {
            if (response && response.status === 200) {
              commit('saveDriverDropDownList', response.data.results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit('toastMutation', toastData.toastSuccessData);

            dispatch(loadData);
          }
        })
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err.response.data.message;
          commit('toastMutation', toastData.toastErrorData);
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

    async loadPrefillBikeDeliveryData({ commit }, { id }) {
      try {
        const { data } = await _get( '/operations/rider-allot/bike/deliverytypes/' + id );
        if (data && data.status == 200) {
          commit('fetchPrefillBikeDeliveryData', data.results);
        }
      } catch (error) {
        return error;
      }
    },

    async loadPrefillVanDeliveryData({ commit }, { id }) {
      try {
        const { data } = await _get( '/operations/rider-allot/van/deliverytypes/' + id );
        if (data && data.status == 200) {
          commit('fetchPrefillVanDeliveryData', data.results);
        }
      } catch (error) {
        return error;
      }
    },
    async loadPrefillRapidoDeliveryData({ commit }, { id }) {
      try {
        const {data} = await _get('/operations/rider-allot/rapido/deliverytypes/' + id);
        if(data && data.status == 200){
          commit('fetchPrefillRapidoDeliveryData', data.results);
        }
      } catch (error) {
        return error
      }
    },
    async loadRapidodeliveryTypeTableData({ commit }) {
      axios.get('/operations/rider-allot/rapido/deliverytypes').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchRapidodeliveryTypeTableData', res.data.results);
        }
      });
    },
    async loadVandeliveryTypeTableData({ commit }) {
      axios.get('/operations/rider-allot/van/deliverytypes').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchVandeliveryTypeTableData', res.data.results);
        }
      });
    },
    async loadBikedeliveryTypeTableData({ commit }) {
      axios.get('/operations/rider-allot/bike/deliverytypes/').then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let i in res.data.results) {
            if (resultRows[i].createdAt) {
              resultRows[i]["createdAt"] = new Date(res.data.results[i].createdAt);
            }
            resultRows[i]["createdAt"] = new Date(resultRows[i]["createdAt"]);
          }
          commit('fetchBikedeliveryTypeTableData', res.data.results);
        }
      });
    },
    async loadfetchbikeTypeDropDownDriver({ commit }) {
      axios.get('/hrms/employee/rider').then((res) => {
        if (res.data.results) {
          commit('fetchbikeTypeDropDownDriver', res.data.results);
        }
      });
    },
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit('addRegionDeliveryTransportTypeMutation', type);
    },

    openDialog({ commit, getters }, { dialogDetails }) {
      commit('dialogComponentMutation', dialogDetails);
      getters.controlActivityDialog;
    },

    closeDialog({ commit }) {
      commit('dialogDisplayMutation', false);
    },
  },
};
export default TypeSetting;
