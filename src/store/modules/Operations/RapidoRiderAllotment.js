import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from 'axios';

const rapidoRiderAllotment = {
  namespaced: true,
  state: {
    // put variables and collections here
    deliveryTableLoad: false,
    deliveryTableData: [],
    originaldeliveryTableData: [],
    deliveryTableColumnData: [
      { field: "s_no", header: "S.No" },
      { field: "zone_Name", header: "Zone" },
      { field: "route_name", header: "Route" },
      { field: "rider", header: "Rider" },
      { field: "Vendor", header: "Vendor" },
    ],
    collectionTableColumnData: [
      { field: "s_no", header: "S.No" },
      { field: "profile_name", header: "Company Details" },
      { field: "pick_up_locations", header: "Pickup location" },
      { field: "rider", header: " " },
      // { field: "Vendor", header: "Vendor" },
    ],
    collectionDataTablePageColumnData: [
      { field: "s_no", header: "S.No" },
      { field: "location_name", header: "Pickup Location Name" },
      { field: "rider_allotment", header: "Rider Allotment" },
      { field: "Vendor", header: "Vendor" },
      { field: "updatedAt", header: "Last Edited On" },
      { field: "user", header: "Last Edited By" },
    ],
    toggleData: [{ type: "" }],
    displayDialog: false,
    pageOffset: 1,
    pageLimit: 10,
    totalRecordsOfDelivery: 0,
    ridersList: [],
    RapidoDeliveryRiderAllotmentTableData: [],
    DataTablecollection: [],
    collectionDataTablePage:[],
    heading_name:null
  },

  getters: {
    //put getters methods goes here
    
    collectionDataTablePageData(state) {
      return state.collectionDataTablePage;
    },
    collectionDataTablePageColumnDatatable(state) {
      return state.collectionDataTablePageColumnData;
    },
    collectionTableColumnDataTable(state) {
      return state.collectionTableColumnData;
    },
    deliveryTableColumnDataTable(state) {
      return state.deliveryTableColumnData;
    },
    RapidoDeliveryRiderAllotmentTableDatatable(state) {
      return state.RapidoDeliveryRiderAllotmentTableData;
    },
    DataTablecollectionData(state) {
      return state.DataTablecollection;
    },
    getRidersList(state) {
      return state.ridersList;
    },
  },

  mutations: {
    //put update methods goes here
    fetchcollectionDataTablePage(state, data) {
      state.collectionDataTablePage = data;
    },
    fetchRapidoDeliveryRiderAllotmentTableData(state, data) {
      state.RapidoDeliveryRiderAllotmentTableData = data;
    },
    updateTotalRecordsOfDelivery(state, data) {
      state.totalRecordsOfDelivery = data || [];
    },
    fetchDataTablecollection(state, data) {
      state.DataTablecollection = data;
    },
    updateDataOfdelivery(state, data) {
      state.deliveryTableData = data || [];
    },
    updateDataOfRidersList(state, data) {
      state.ridersList = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state
    async loadcollectionDataTablePage({ commit }, { id }) {
      axios
        .get('/sales/contract/rapido/pick-up-location?contract_id=' + id)
        .then((res) => {
          if (res.data.results) {
            commit('fetchcollectionDataTablePage', res.data.results);
          }
        });
    },
    async loadRapidoDeliveryRiderAllotmentTableData({ commit }) {
      axios.get('/operations/rider-allot/rapido/default/delivery').then((res) => {
        if (res.data.results) {
          commit('fetchRapidoDeliveryRiderAllotmentTableData', res.data.results);
        }
      });
    },
    
    loadDeliveryData({ state, commit }, tab) {
      state.deliveryTableLoad = true;
      return _get(`operations/rider-allot/rapido/default/delivery`)
        .then(async (response) => {
          state.deliveryTableLoad = false;
          if (response && response.status === 200) {
            const deliveryData = response?.data.results || [];
            const totalRecordsOfDelivery = response?.data.results.length || 0;

            let setDeliveryData = deliveryData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                statusSettings: res.express_status_settings,
              };

              return data;
            });
            commit("updateDataOfdelivery", setDeliveryData || []);
            commit("updateTotalRecordsOfDelivery", totalRecordsOfDelivery || 0);
          }
          return response;
        })
        .catch((err) => {
          state.deliveryTableLoad = false;
          return err;
        });
    },

    //update status on express
    updateExpressStatusData({ state, commit }, data) {
      return _put(
        `operations/rider-allot/statussettings/express/${data.id}`,
        data.status_updates
      )
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
    POSTPATCHCRUDOPERATIONCOLLECTION(
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
            commit('fetchDataTablecollection', res.data.results);
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

    //Riders list get API
    loadRidersList({ state, commit }) {
      return _get(`hrms/employee/rapidodriver`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const ridersList = response?.data.results || [];
            for (let i = 0; i < ridersList.length; i++) {
              ridersList[i] = {
                ...ridersList[i],
                name: ridersList[i]["employee_name"],
              };
            }
            commit("updateDataOfRidersList", ridersList || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};

export default rapidoRiderAllotment;
