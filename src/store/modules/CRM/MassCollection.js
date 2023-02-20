import { _get, _post, _put, _patch, _delete } from "../../apiService";
import { API } from '../../../components/CRM/Dialogs/standardCollectionSlip/const';
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
const Masscollection = {
     namespaced: true,
     plugins: [createPersistedState()],
     state: {
          //dialog
          displayDialog: false,
          dialogComponent: null,
          dialogHeader: null,
          dialogHeaderId: null,
          dialogOption: "",
          //toast data
          toastData: {
               showToastMessage: false,
               summary: null,
               severity: null,
          },
          // Attachment
          massCollectionAttachmentsStateData: {},
          massCollectionAttachmentsFiles: [],
          deletedMassCollectionAttachmentsFiles: [],
          attachURL: {},
          //
          scheduleDialog: false,
          selectedCostCenter: [],
          selectedCostCenterMassCollection: [],
          stdCollectionTableData: [],
          templateEditData: [],
          DataTableMassCollection: [],
          customerIdAndCompanyNameList: [],
          costCenterDropdownData: [],
          crmBookingDetailsArray: [],
          customerCostCenterDropdownData: [{ items: [] }],
          scheduleDialogData: {},
          scheduleTrips: null,
          stdCollectionData: {},
          zonesData: [],
          routesData: [],
          ecomData: [],
          ecomDataDropdown: [],
          massCollectionPayloadData: {},
     },
     getters: {
          //dialogue
          controlActivityDialog(state) {
               state.displayDialog = true;
          },
          getselectedCostCenterStdCollection(state) {
               return state.selectedCostCenter;
          },
          getselectedCostCenterMassCollection(state) {
               return state.selectedCostCenterMassCollection;
          },
          setScheduleDialog(state, data) {
               state.scheduleDialog = data;
          },
          getStdCollectionTableData(state) {
               return state.stdCollectionTableData;
          },
          gettemplateEditData(state) {
               return state.templateEditData;
          },
          getCustomerIdAndCompanyNameData(state) {
               return state.customerIdAndCompanyNameList;
          },
          getcostCenterDropdownData(state) {
               return state.costCenterDropdownData;
          },
          getCustomerCostCenterDropdownData(state) {
               return state.customerCostCenterDropdownData;
          },
          getCrmBookingData(state, data) {
               return state.crmBookingDetailsArray;
          },
          getTripsForSchedule(state) {
               return state.scheduleTrips;
          },
          getStdCollectionData(state) {
               return state.stdCollectionData;
          },
          getZonesData(state) {
               return state.zonesData;
          },
          getRoutesData(state) {
               return state.routesData;
          },
          getEcomData(state) {
               return state.ecomData;
          },
          getEcomDataDropdown(state) {
               return state.ecomDataDropdown;
          },
          massCollectionPayloadData: ({ massCollectionPayloadData }) =>
               massCollectionPayloadData,
          //attachment
          massCollectionAttachmentsStateData: ({ massCollectionAttachmentsStateData }) =>
               massCollectionAttachmentsStateData,
     },
     mutations: {
          //dialogue
          fetchDataTableMassCollection(state, data) {
               state.DataTableMassCollection = data;
          },
          dialogComponentMutation(state, dialogDetails) {
               state.dialogComponent = dialogDetails.dialogName;
               state.dialogHeader = dialogDetails.dialogHeader;
               state.dialogOption = dialogDetails.dialogOption;
               state.dialogHeaderId = dialogDetails.dialogHeaderId;
          },
          toastMutation(state, toastData) {
               state.toastData.summary = toastData.toastMsg;
               state.toastData.severity = toastData.toastSeverity;
               state.toastData.showToastMessage = true;
          },
          dialogDisplayMutation(state, bool) {
               state.displayDialog = bool;
          },
          selectedCostCenterMethod(state, data) {
               state.selectedCostCenter = data || [];
          },
          selectedCostCenterMethodMassCollection(state, data) {
               state.selectedCostCenterMassCollection = data || [];
          },
          getStdCollectionSlipsTableData(state, data) {
               state.stdCollectionTableData = data || [];
          },
          updateDataOfCustomerIdAndCompanyName(state, data) {
               state.customerIdAndCompanyNameList = data || [];
          },
          getCostCenterDropdownData(state, data) {
               state.costCenterDropdownData = data || [];
          },
          getCustomerCostCenterDropdownData(state, data) {
               state.customerCostCenterDropdownData = data || [];
          },
          getCrmBookingDetailsArray(state, data) {
               state.crmBookingDetailsArray = data || [];
          },
          setScheduleDialog(state, bool) {
               state.scheduleDialog = bool;
          },
          setScheduleTrips(state, data) {
               state.scheduleTrips = data;
          },
          setStdCollectionData(state, payload) {
               state.stdCollectionData = payload;
          },
          getZoneData(state, payload) {
               state.zonesData = payload;
          },
          getRouteData(state, payload) {
               state.routesData = payload;
          },
          getEcommerceData(state, payload) {
               state.ecomData = payload;
          },
          getEcommerceDataDropdown(state, payload) {
               state.ecomDataDropdown = payload;
          },

     },
     actions: {
          //Open dialogue
          openDialog({ commit, getters }, { dialogDetails }) {
               commit("dialogComponentMutation", dialogDetails);
               getters.controlActivityDialog;
          },
          closeDialog({ commit }) {
               commit('dialogDisplayMutation', false);
               commit('setScheduleDialog', false);
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
                              commit('fetchDataTableMassCollection', res.data.results);
                              commit('toastMutation', toastData.toastSuccessData);
                              dispatch(loadData, { id: id, type: type }, { root: true });
                              dispatch(closeDialogue, 'closeDialog', { root: true });
                         } else {
                              dispatch(loadData, { id, type }, { root: true });

                              commit('toastMutation', toastData.toastSuccessData);

                              dispatch('closeDialog');
                         }
                         this.$router.push({
                              name: "CustomerLaunchBookings",
                         });
                    })
                    .catch((err) => {
                         if (err.response) {
                              toastData.toastCommonErrorData.toastMsg = err.response.data.message;
                              commit('toastMutation', toastData.toastCommonErrorData);
                         }
                    });
          },
          postSelectedCostCenterStdCollection({ state, commit }, data) {
               return new Promise((resolve, reject) => {
                    _post(`/crm/bookings/template`, data)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let costCenter = response?.data.results || [];
                                   commit("selectedCostCenterMethod", costCenter || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          fetchStdCollectionSlipsTableData({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _get(`/crm/standard/slips`)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let bookingDetails = response?.data.results || [];
                                   for (let i in bookingDetails.rows) {
                                        bookingDetails.rows[i]["s_no"] = ++i;
                                   }
                                   commit("getStdCollectionSlipsTableData", bookingDetails || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          POSTPATCHCRUDOPERATION(
               { dispatch, commit },
               {
                    path, method, data, loadData, id, type, toastMutationData, toastData, loadDiffStore, closeDialogue,
               }
          ) {
               return new Promise((resolve, reject) => {
                    axios({
                         url: path,
                         method: method,
                         data: data,
                    })
                         .then(async (response) => {
                              if (loadDiffStore) {
                                   commit('toastMutation', toastData.toastSuccessData);
                                   dispatch(loadData, { id: id, type: type }, { root: true });
                                   dispatch(closeDialogue, 'closeDialog', { root: true });
                              } else {
                                   dispatch(loadData, { id, type }, { root: true });
                                   commit('toastMutation', toastData.toastSuccessData);
                                   dispatch('closeDialog');
                              }
                              resolve(response);
                         })
                         .catch((err) => {
                              if (err.response) {
                                   toastData.toastCommonErrorData.toastMsg = err.response.data.message;
                                   commit('toastMutation', toastData.toastCommonErrorData);
                              }
                         });
               });
          },
          deleteTemplateData({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _delete(`/crm/standard/slip/${payload}`)
                         .then(async (response) => {
                              resolve(response.status);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          getAllCustomerIdAndCompanyNameData({ state, commit }, payload) {
               return _post(`/sales/dropdown/slip/contracts`, payload)
                    .then(async (response) => {
                         if (response && response.status === 200) {
                              const customerIdData = response.data?.results || [];
                              for (let i in customerIdData) {
                                   customerIdData[i]['name'] = customerIdData[i].profile_name;
                                   customerIdData[i]['code'] = customerIdData[i].id;
                              }
                              commit(
                                   "updateDataOfCustomerIdAndCompanyName",
                                   customerIdData || []
                              );
                         }
                         return response;
                    })
                    .catch((err) => {
                         return err;
                    });
          },
          loadCostCenterDropdownData({ state, commit }, id) {
               return _get(`/sales/contract/dropdown/cost-centers/${id}`)
                    .then(async (response) => {
                         if (response && response.status === 200) {
                              const costCenterIdData = response.data?.results || [];
                              for (let i in costCenterIdData) {
                                   costCenterIdData[i]['name'] = costCenterIdData[i].cost_center_name;
                                   costCenterIdData[i]['code'] = costCenterIdData[i].id;
                                   // costCenterIdData[i]['id'] = costCenterIdData[i].id;
                              }
                              commit(
                                   "getCostCenterDropdownData",
                                   costCenterIdData || []
                              );
                         }
                         return response;
                    })
                    .catch((err) => {
                         return err;
                    });
          },
          createCustomerCostCenter({ state, commit }, data) {
               return new Promise((resolve, reject) => {
                    _post(`/sales/contracts/customer-cost-center`, data)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let jobCardResp = response?.data.results || [];
                              }
                              resolve(response.status);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          deleteCustomerCostCenter({ state, commit }, id) {
               return new Promise((resolve, reject) => {
                    _delete(`/sales/contracts/customer-cost-center/${id}`)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let jobCardResp = response?.data.results || [];
                              }
                              resolve(response.status);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          loadCustomerCostCenterDropdownData({ state, commit }, path) {
               return _get(`/sales/contracts/dropdown/customer-cost-center?${path}`)
                    .then(async (response) => {
                         if (response && response.status === 200) {
                              const customerCostCenterIdData = response.data?.results || [];
                              let customerCostCenterDropdown = [
                                   {
                                        items: []
                                   }
                              ]
                              customerCostCenterIdData.map((list) => {
                                   customerCostCenterDropdown[0].items.push({
                                        name: list.customer_cost_center_name,
                                        code: list.id,
                                        id: list.id,
                                   })
                              })
                              commit(
                                   "getCustomerCostCenterDropdownData",
                                   customerCostCenterDropdown || []
                              );
                         }
                         return response;
                    })
                    .catch((err) => {
                         return err;
                    });
          },
          postSelectedCostCenter({ dispatch, state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _post(`/crm/booking`, payload)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let costCenter = response?.data.results || [];
                                   commit("selectedCostCenterMethodMassCollection", costCenter || []);
                              }
                              dispatch("getCrmBookingDetails", response?.data.results.id);
                              resolve(response);
                         })
                         .catch((err) => {
                              reject(err);
                              commit('toastMutation', err.data.message);
                         });
               });
          },
          getCrmBookingDetails({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _get(`/crm/booking/${payload}`)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let bookingDetails = response?.data.results || [];
                                   commit("getCrmBookingDetailsArray", bookingDetails || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          patchCrmBookingDetails({ dispatch, state, commit }, payload) {
               let pay = payload.id;
               // delete payload.id;
               return new Promise((resolve, reject) => {
                    _patch(`/crm/booking/${pay}`, payload)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   dispatch("getCrmBookingDetails", pay);
                              }
                              resolve(response);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          disableTemplateTableData({ state, commit }, { payload, toastData }) {
               return new Promise((resolve, reject) => {
                    _patch(`/crm/standard/slip-status/${payload.id}`, payload.status)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   commit('toastMutation', toastData.toastSuccessData);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          async getScheduleTrips({ commit }, mode) {
               let payload = mode.toLowerCase();
               const { data } = await _get(API.TRIPS + '/' + payload);
               if (data && data.status == 200) {
                    commit('setScheduleTrips', data.results ?? []);
               }
          },
          async fetchStdCollectionSlipById({ commit }, payload) {
               try {
                    const { data } = await _get(API.SLIPS + payload);
                    commit('setStdCollectionData', data.results);
               } catch (error) {
                    return error
               }
          },
          loadZonesData({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _get(`/operations/route-plan/dropdown/zone/${payload.type}`)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let ZonesData = response?.data.results || [];
                                   for (let i in ZonesData) {
                                        ZonesData[i]['name'] = ZonesData[i].zone_name;
                                        ZonesData[i]['code'] = ZonesData[i].id;
                                   }
                                   commit("getZoneData", ZonesData || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          loadRoutesData({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _get(`/operations/route-plan/dropdown/zones/route/${payload.type}/${payload.id}`)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let RoutesData = response?.data.results || [];
                                   for (let i in RoutesData) {
                                        RoutesData[i]['name'] = RoutesData[i].route_name;
                                        RoutesData[i]['code'] = RoutesData[i].id;
                                   }
                                   commit("getRouteData", RoutesData || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          loadEComData({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _post(`settings/sales/rates/express/adhoc/dropdowns/ratecard/delivery-types`, payload)
                         .then(async (response) => {
                              if (response && response.status === 200) {
                                   let ecommerceData = response?.data.results || [];
                                   let ecomJobPriority = [];
                                   let ecomDeliveryData = {};

                                   for (let i in ecommerceData) {
                                        ecomJobPriority[i] = {};
                                        ecomJobPriority[i]['name'] = ecommerceData[i].delivery_type;
                                        ecomJobPriority[i]['code'] = ecommerceData[i].delivery_type_initial;
                                   }
                                   commit("getEcommerceData", ecommerceData || []);
                                   commit("getEcommerceDataDropdown", ecomJobPriority || []);
                              }
                              resolve(response.data.results);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
          generateMassCollectionSlip({ state, commit }, payload) {
               return new Promise((resolve, reject) => {
                    _post(`/crm/bookings/mass-collection`, payload)
                         .then(async (response) => {
                              //  if (response && response.status === 200) {
                              //    let costCenter = response?.data.results || [];
                              //  }
                              resolve(response);
                         })
                         .catch((err) => {
                              reject(err);
                         });
               });
          },
     }
}
export default Masscollection;
