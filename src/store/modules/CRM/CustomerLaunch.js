import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";
import { errhandler } from "@/services/httpClient";
// import { reject, resolve } from "core-js/fn/promise";

const CustomerLaunchStore = {
  namespaced: true,
  state: {
    // put variables and collections here
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    dialogHeaderId: null,
    dialogOption: "",
    tableLoad: false,
    selectedCostCenter: [],
    jobTypeDropDown: [],
    costCenterDropDown: [],
    JobDetailsType: [],
    rapidoCallData: null,
    jobCardResponse: [],
    addNewDropDownDataCustomerCost: [],
    companyCostCenterList: [],
    customerLeaveDropDownList: [],
    customerSuspenstionDropDownList: [],
    customerLeaveList: [],
    customerSuspenstionList: [],
    customerCostCenterDropDown: [],
    customerContactDropDown: [],
    customerNameDropDown: [],
    logisticsDropDownList: [],
    jobPriorityDropDownList: [],
    ecommerce_charge: [],
    customerCostCenterDropDownList: [
      {
        name: "Add New",
        code: "Hi",
        items: [],
      },
    ],
    customerNameDropDownList: [],
    crmBookingDetailsArray: [],
    CompanyNameDropDownId: {},
    customerContactDropDownList: [
      {
        name: "Add New",
        code: "Hi",
        items: [],
      },
    ],
    CompanyContactDropDownId: [],
    rapidoTripNumber: [],
    surchargeDropDownListState: [],
    jobDetailsArray: [],
    suspenstionDetailsArray: [],
    addedSurcharge: [],
    CompanyNameAddNewData: {},
    CompanyContactAddNewData: {},
    commonCrmAttachmentStateData: {},

    crmCommonAttachmentsFiles: [],
    deletedCrmCommonAttachmentsFiles: [],

    returnCrmAttachmentStateData: {},
    crmReturnAttachmentsFiles: [],
    deletedCrmReturnAttachmentsFiles: [],

    exchangeCrmAttachmentStateData: {},
    crmExchangeAttachmentsFiles: [],
    deletedCrmExchangeAttachmentsFiles: [],

    deliveryCrmAttachmentStateData: {},
    crmDeliveryAttachmentsFiles: [],
    deletedCrmDeliveryAttachmentsFiles: [],

    volumetricValueData: "",
    crmCollerDropDownList: null,
    CrmCollerFullData: [],
    BookedViaDropDown: null,
    // tab changing in crm express, international, rapido
    tabChnageInCrm: null,
    // crm express edit key
    CrmExpressMouleEditKey: null,
    StandardCollectionSlipCompanyNameDropDown: null,
    customer_d_data: [],
    collectDeliveryDocument: null,
    // Change billing mode
    billingmode: "",
    billing_select: false,
    //contact person
    contactNameId: null,
    initail_billing_mode: {},
    contract_trips_shows: [],
  },

  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    //put getters methods goes here
    getselectedCostCenter(state) {
      return state.selectedCostCenter;
    },
    postSurchargeData(state) {
      return state.addedSurcharge;
    },
    getRapidoCallData: ({ rapidoCallData }) => rapidoCallData,

    getJobTypeDropDown(state) {
      return state.jobTypeDropDown;
    },

    getCustomerCostCenterDropDown(state) {
      return state.customerCostCenterDropDown;
    },

    getCustomerContactDropDown(state) {
      return state.customerContactDropDown;
    },

    getCustomerNameDropDown(state) {
      return state.customerNameDropDown;
    },

    getCostCenterDropDown(state) {
      return state.costCenterDropDown;
    },

    CompanyNameAddNewData: ({ CompanyNameAddNewData }) => CompanyNameAddNewData,

    CompanyContactAddNewData: ({ CompanyContactAddNewData }) =>
      CompanyContactAddNewData,

    getJobDetailsType(state, data) {
      return state.JobDetailsType;
    },

    getjobCardResponse(state, data) {
      return state.jobCardResponse;
    },

    getCompanyCostCenters(state, data) {
      return state.companyCostCenterList;
    },

    getCustomerLeaveList(state, data) {
      return state.customerLeaveDropDownList;
    },

    getCustomerSuspenstionList(state, data) {
      return state.customerSuspenstionDropDownList;
    },

    customerLeaveList(state, data) {
      return state.customerLeaveList;
    },

    customerSuspenstionList(state, data) {
      return state.customerSuspenstionList;
    },

    getLogisticsList(state, data) {
      return state.logisticsDropDownList;
    },

    getjobPriorityList(state, data) {
      return state.jobPriorityDropDownList;
    },

    gerCrmBookingData(state, data) {
      return state.crmBookingDetailsArray;
    },

    gerCompanyNameDropDownId(state, data) {
      return state.CompanyNameDropDownId;
    },

    getCompanyContactDropDownId(state, data) {
      return state.CompanyContactDropDownId;
    },

    getRapidoTripNumber(state, data) {
      return state.rapidoTripNumber;
    },

    getsurchargeDropDownListData(state, data) {
      return state.surchargeDropDownListState;
    },

    getJobDetailsArrayList(state, data) {
      return state.jobDetailsArray;
    },

    getSuspenstionDetailsArrayList(state, data) {
      return state.suspenstionDetailsArray;
    },

    getCommonCrmAttachmentStateData(state, data) {
      return state.commonCrmAttachmentStateData;
    },

    getCrmCommonAttachmentsFiles(state, data) {
      return state.crmCommonAttachmentsFiles;
    },

    getReturnCrmAttachmentStateData(state, data) {
      return state.returnCrmAttachmentStateData;
    },

    getCrmReturnAttachmentsFiles(state, data) {
      return state.crmReturnAttachmentsFiles;
    },

    getExchangeCrmAttachmentStateData(state, data) {
      return state.exchangeCrmAttachmentStateData;
    },

    getCrmExchangeAttachmentsFiles(state, data) {
      return state.crmExchangeAttachmentsFiles;
    },

    getDeliveryCrmAttachmentStateData(state, data) {
      return state.deliveryCrmAttachmentStateData;
    },

    getCrmDeliveryAttachmentsFiles(state, data) {
      return state.crmDeliveryAttachmentsFiles;
    },

    getVolumentricValueState(state, data) {
      return state.volumetricValueData;
    },
    getCrmCollerDropDownList(state, data) {
      return state.crmCollerDropDownList;
    },
    getBookedViaDropDownList: ({ BookedViaDropDown }) => BookedViaDropDown,
    StandardCollectionSlipCompanyNameDropDown: ({
      StandardCollectionSlipCompanyNameDropDown,
    }) => StandardCollectionSlipCompanyNameDropDown,
  },

  mutations: {
    //dialogue
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
      state.dialogOption = dialogDetails.dialogOption;
      state.dialogHeaderId = dialogDetails.dialogHeaderId;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    //put update methods goes here
    selectedCostCenterMethod(state, data) {
      state.selectedCostCenter = data || [];
    },

    addedSurchargeValue(state, data) {
      state.addedSurcharge = data || [];
    },

    jobTypeDropDownState(state, data) {
      state.jobTypeDropDown = data || [];
    },

    customerCostCenterDropDownState(state, data) {
      state.customerCostCenterDropDown = data || [];
    },

    customerNameDropDownState(state, data) {
      state.customerNameDropDown = data || [];
    },

    customerContactDropDownState(state, data) {
      state.customerContactDropDown = data || [];
    },

    addCostCenterDropDown(state, data) {
      state.customerCostCenterDropDownList = data || [];
    },
    addCustomerNameDropDown(state, data) {
      state.customerNameDropDownList = data || [];
    },

    addCustomerContactDropDown(state, data) {
      state.customerContactDropDownList[0].items = data || [];
    },

    costCenterDropDownList(state, data) {
      state.costCenterDropDown = data || [];
    },

    JobDetailsTypeDropDown(state, data) {
      state.JobDetailsType = data || [];
    },
    updateRapidoCallTrips(state, data) {
      state.rapidoCallData = data || [];
    },

    jobCardResponseState(state, data) {
      state.jobCardResponse = data || [];
    },

    saveCompanyCostCenter(state, data) {
      state.companyCostCenterList = data || [];
    },

    CustomerLeaveDropDownList(state, data) {
      state.customerLeaveDropDownList = data || [];
    },

    CustomerSuspenstionDropDownList(state, data) {
      state.customerSuspenstionDropDownList = data || [];
    },

    getCustomerLeaveList(state, data) {
      state.customerLeaveList = data || [];
    },

    getCustomerSuspenstionList(state, data) {
      state.customerSuspenstionList = data || [];
    },

    CrmCollerDropDownList(state, data) {
      state.crmCollerDropDownList = data || [];
    },

    getLogisticsDropDownList(state, data) {
      state.logisticsDropDownList = data || [];
    },

    getJobPriorityDropDownList(state, data) {
      state.jobPriorityDropDownList = data || [];
    },

    getCrmBookingDetailsArray(state, data) {
      state.crmBookingDetailsArray = data || [];
    },
    getCompanyNameDetailsArray(state, data) {
      state.CompanyNameDropDownId = data || [];
    },

    getCompanyContactDetailsArray(state, data) {
      state.CompanyContactDropDownId = data || [];
    },

    getTripsNumberRapidoArray(state, data) {
      state.rapidoTripNumber = data || [];
    },

    getsurchargeDropDownListState(state, data) {
      state.surchargeDropDownListState = data || [];
    },

    getJobCardDetails(state, data) {
      state.jobDetailsArray = data || [];
    },

    getSuspenstionCardDetails(state, data) {
      state.suspenstionDetailsArray = data || [];
    },

    volumetricDataMutation(state, data) {
      state.volumetricValueData = data || [];
    },
    GetCrmCollerFullData(state, data) {
      state.CrmCollerFullData = data || [];
    },
    GetBookedViaDropDown(state, data) {
      state.BookedViaDropDown = data || [];
    },
    GetStandardCollectionSlipCompanyNameDropDown(state, data) {
      state.StandardCollectionSlipCompanyNameDropDown = data || [];
    },
    fetchStateValue(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
  },

  actions: {
    fetchState({ commit }, data) {
      commit("fetchStateValue", data);
    },
    //Open dialogue
    openDialog({ commit, getters }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
      getters.controlActivityDialog;
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    toastMutationFunc({ commit }, { data }) {
      commit("toastMutation", data);
    },
    async getCustomerDData({ commit, state }, { c_type, b_type, toast }) {
      return axios
        .get(
          `/sales/dropdown/contracts?customerType=${c_type}&businessType=${b_type}`
        )
        .then((res) => {
          let data = [];
          res?.data.results.map((i) => {
            i["code"] = i.customer_id;
            i["name"] = i.customer_id;
            data.push(i);
          });
          commit("fetchStateValue", { customer_d_data: data });
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    // crm main page global search
    getCompanyCostCenterListSearch({ state, commit }, data) {
      let payload = { business_type: data.business_type };
      return new Promise((resolve, reject) => {
        let path;
        if (data.tab == "International") {
          path = `/sales/contracts/international/advance-search?limit=${data.pagination}&offset=${data.page}&globalsearchkey=${data.input}`;
        } else if (data.tab == "Express") {
          path = `/sales/contracts/express/advance-search?limit=${data.pagination}&offset=${data.page}&globalsearchkey=${data.input}`;
        } else if (data.tab == "Rapido") {
          path = `/sales/contracts/rapido/advance-search?limit=${data.pagination}&offset=${data.page}&globalsearchkey=${data.input}`;
        }
        _post(path, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let cmpCostCenter = response?.data.results.rows || [];
              commit("saveCompanyCostCenter", cmpCostCenter || []);
            }
            resolve(response.data.results.rows);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //Customer Launch Module action

    getCompanyCostCenterList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        let path;
        if (payload.customer_type == "International") {
          path = `/sales/contracts/international/advance-search`;
        } else if (payload.customer_type == "Express") {
          path = `/sales/contracts/express/advance-search`;
        } else if (payload.customer_type == "Rapido") {
          path = `/sales/contracts/rapido/advance-search`;
        }
        _post(path, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let cmpCostCenter = response?.data.results.rows || [];
              commit("saveCompanyCostCenter", cmpCostCenter || []);
            }
            resolve(response?.data?.results?.rows);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    postSelectedCostCenter({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/booking`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let costCenter = response?.data?.results || [];

              commit("selectedCostCenterMethod", costCenter || []);
            }
            resolve(response?.data?.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    patchSelectedCostCenter({ state, commit }, payload) {
      const pay = payload.booking_id;
      delete payload.booking_id;
      return new Promise((resolve, reject) => {
        _patch(`/crm/booking/${pay}`, payload)
          .then(async (response) => {
            let costCenter = response?.data.results || [];
            commit("selectedCostCenterMethod", costCenter || []);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async postSelectedCostCenterStdCollection({ commit }, data) {
      return await axios
        .post(`/crm/bookings/template`, data)
        .then((response) => {
          if (response && response.status === 200) {
            let costCenter = response?.data.results || [];
            commit("selectedCostCenterMethod", costCenter || []);
          }
          return response;
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
            resolve(response?.data?.results ?? {});
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // getContactPersonDetailsArray
    getCompanyNameDetailsId({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/client/address-book/companies/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let CompanyName = response?.data.results || [];
              commit("getCompanyNameDetailsArray", CompanyName || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCompanyContactDetailsId({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/client/address-book/company/contacts/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let CompanyContact = response?.data.results || [];
              commit("getCompanyContactDetailsArray", CompanyContact || []);
            }
            resolve(response?.data?.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteCrmBookingDetails({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/booking/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let deleteDetails = response?.data.results || [];
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async getRapidoCallTrips({ commit }, { type = "rapido" }) {
      let s_type = type.toLowerCase();
      await axios
        .get(`operations/rider-allot/suggestions/callTrips/${s_type}`)
        .then((res) => {
          if (res.data.results) {
            let tripNumber = [];
            res?.data.results.map((i) => {
              tripNumber.push({
                ...i,
                cus_from_time: i.from_date,
                cus_to_time: i.to_date,
              });
            });
            commit("updateRapidoCallTrips", tripNumber);
          }
        });
    },

    getCostCenterDropDownList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/sales/contract/express/costcenter/suggestions/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let costCenter = response?.data.results || [];

              let updatedCostCenter = costCenter.map((c) => ({
                ...c,
                name: c.cost_center_name,
                code: c.cost_center_name,
              }));

              commit("costCenterDropDownList", updatedCostCenter || []);
              let datas = [
                {
                  name: "Add New",
                  code: "Hi",
                  items: [...state.costCenterDropDown],
                },
              ];
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getJobTypeDropDownList({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/suggestions/document-types`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobType = response?.data.results || [];
              let updatedJobType = jobType.map((c) => ({
                ...c,
                name: c.job_type,
                code: c.job_type,
              }));
              commit("jobTypeDropDownState", updatedJobType || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCustomerCostCenterDropDownList({ state, commit }, { id, type }) {
      let url = "/sales/contracts/dropdown/customer-cost-center?";
      if (type == "Adhoc") {
        url = url + `profileId=${id}`;
      } else {
        url = url + `contractId=${id}`;
      }
      return new Promise((resolve, reject) => {
        _get(url)
          .then(async (response) => {
            if (response && response.status === 200) {
              let CustomerCostCenter = response?.data.results || [];
              let updatedCustomerCostCenter = CustomerCostCenter.map((c) => ({
                ...c,
                name: c.customer_cost_center_name,
                code: c.customer_cost_center_name,
              }));
              commit(
                "customerCostCenterDropDownState",
                updatedCustomerCostCenter || []
              );
              let datas = [
                {
                  name: "Add New",
                  code: "Hi",
                  items: updatedCustomerCostCenter,
                },
              ];
              commit("addCostCenterDropDown", datas || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCustomerNameDropDownList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/settings/client/companies`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let CustomerName = response?.data.results || [];
              let updatedCustomerName = CustomerName.map((c) => ({
                ...c,
                name: c.company_name,
                code: c.company_name,
              }));
              commit("customerNameDropDownState", updatedCustomerName || []);
              let datas = [
                {
                  name: "Add New",
                  code: "Hi",
                  items: [...state.customerNameDropDown],
                },
              ];
              commit("addCustomerNameDropDown", datas || []);
            }
            resolve(response?.data?.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async getCustomerContactDropDownList({ state, commit }, payload) {
      await axios
        .get(`/crm/settings/client/companies/contact/${payload}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            let CustomerContact = response?.data.results || [];
            let updatedCustomerContact = CustomerContact.map((c) => ({
              ...c,
              name: c.contact_name,
              code: c.contact_name,
            }));
            commit(
              "customerContactDropDownState",
              updatedCustomerContact || []
            );
            let datas = [
              {
                name: "Add New",
                code: "Hi",
                items: [...state.customerContactDropDown],
              },
            ];
            commit("addCustomerContactDropDown", updatedCustomerContact || []);
          }

          return response;
        });
    },

    getJobDetailsTypeDropDownList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/suggestions/document-type-details/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobType = response?.data.results || [];
              let updatedPayload = jobType.map((c) => ({
                ...c,
                name: c.document_details,
                code: c.document_details,
              }));
              commit("JobDetailsTypeDropDown", updatedPayload || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    createJobCardData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/bookings/job`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobCardResp = response?.data.results || [];
              commit("jobCardResponseState", jobCardResp || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateJobCardData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _patch(`/crm/bookings/job/${payload.selectedJobId}`, payload.dataSetObj)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateCompanyNameAddress({ state, commit }, payload) {
      const pay = payload.id;
      delete payload.id;
      return new Promise((resolve, reject) => {
        _patch(`/crm/settings/client/address-book/companies/${pay}`, payload)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateContactPerson({ state, commit }, payload) {
      const pay = payload.id;
      delete payload.id;
      return new Promise((resolve, reject) => {
        _patch(
          `/crm/settings/client/address-book/company/contacts/${pay}`,
          payload
        )
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteJobCardData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/bookings/job/${payload}`)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    createCustomerCostCenter({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/sales/contracts/customer-cost-center`, payload)
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
    createCustomerName({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/settings/client/address-book/companies`, payload)
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

    createCustomerContact({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/settings/client/address-book/company/contacts`, payload)
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

    getLogisticsListDropDownApi({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/settings/logistics-mode`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let logisticsList = response?.data.results || [];

              let logisticsListArray = logisticsList.map((c) => ({
                ...c,
                name: c.logistic_mode,
                code: c.logistic_mode,
              }));

              commit("getLogisticsDropDownList", logisticsListArray || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getJobPriorityEcomerceList({ state, commit }, { payload }) {
      return axios
        .post(
          `/settings/sales/rates/express/adhoc/dropdowns/ratecard/delivery-types`,
          payload
        )
        .then(async (response) => {
          if (response && response.status === 200) {
            let jobPriority = response?.data.results || [];
            let jobPriorityListArray = jobPriority.map((c) => ({
              ...c,
              name: c.delivery_type,
              code: c.delivery_type,
            }));
            let e_data = {};
            jobPriorityListArray.map((i) => {
              e_data[i.delivery_type_initial] =
                state.crmBookingDetailsArray[i.delivery_type_initial] ?? "0";
            });
            commit("fetchStateValue", {
              ["jobPriorityDropDownList" + payload.logistics_mode]:
                jobPriorityListArray,
              ecommerce_charge: e_data,
            });
          }
        })
        .catch((err) => {
          // reject(err);
        });
    },
    getJobPriorityListDropDownApi({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/settings/job-priority`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobPriority = response?.data.results || [];
              let jobPriorityListArray = jobPriority.map((c) => ({
                ...c,
                name: c.job_priority,
                code: c.job_priority,
              }));
              commit("getJobPriorityDropDownList", jobPriorityListArray || []);
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
    deleteCustomerName({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/settings/client/address-book/companies/${id}`)
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

    deleteCustomerContact({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/settings/client/address-book/company/contacts/${id}`)
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

    getSurchargeDropDownList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/sales/contract/express/surcharges/suggestion/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let surchargeList = response?.data.results || [];
              let surchargeListArray = surchargeList.map((c) => ({
                ...c,
                name: c.surcharge_name,
                code: c.surcharge_name,
              }));

              commit("getsurchargeDropDownListState", surchargeListArray || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getSurchargeDropDownListAdhoc({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(
          `/settings/sales/rates/express/adhoc/dropdowns/ratecard/additonal-surcharges`
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let surchargeList = response?.data.results || [];
              let surchargeListArray = surchargeList.map((c) => ({
                ...c,
                name: c.surcharge_name,
                code: c.surcharge_name,
              }));

              commit("getsurchargeDropDownListState", surchargeListArray || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateBookingListById({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _patch(`/crm/bookings/confirm/${payload.id}`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let costCenter = response?.data.results || [];
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    postSurchargeValue({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/bookings/surcharge`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let surcharge = response?.data.results || [];
              commit("addedSurchargeValue", surcharge || []);
            }
            resolve(response?.status ?? "");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteSurchargeData({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/bookings/surcharge/${id}`)
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

    gettSavedAccordianJobDetails({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/crm/bookings/jobs?bookingId=${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobDetails = response?.data.results || [];

              commit("getJobCardDetails", jobDetails || []);
            }
            resolve(response?.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getVolumentricValue({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/sales/contracts/volumetric-value`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let jobDetails = response?.data.results || "";
              let volumetricData = jobDetails?.volumetric_value;
              commit("volumetricDataMutation", volumetricData || "");
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCustomerLeaveDropDownList({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/suggestions/company-profile`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let customerLeaveDropDownList = response?.data.results || [];
              commit(
                "CustomerLeaveDropDownList",
                customerLeaveDropDownList || []
              );
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    saveCustomerLeaveDropDownData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/settings/customer-leave`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let addCustomerLeaveResp = response?.data.results || [];
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    customerLeaveDataList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(
          `/crm/settings/customer-leaves?offset=1&limit=100&globalsearchkey=${payload.search}`,
          payload
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let customerLeaveList = response?.data.results || [];
              commit("getCustomerLeaveList", customerLeaveList || []);
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteCustomerLeaveData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/settings/customer-leave/${payload}`)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateCustomerLeaveDropDown({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _put(`/crm/settings/customer-leave/${data.id}`, data)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCustomerSuspenstionDropDownList({ state, commit }) {
      return new Promise((resolve, reject) => {
        _get(`/crm/settings/suggestions/company-profile`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let customerSuspenstionDropDownList =
                response?.data.results || [];
              commit(
                "CustomerSuspenstionDropDownList",
                customerSuspenstionDropDownList || []
              );
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    saveCustomerSuspenstionDropDownData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/crm/settings/customer-suspension`, payload)
          .then(async (response) => {
            if (response && response.status === 200) {
              let addCustomerSuspenstionResp = response?.data.results || [];
              commit(
                "getSuspenstionCardDetails",
                addCustomerSuspenstionResp || []
              );
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    customerSuspenstionDataList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(
          `/crm/settings/customer-suspensions?offset=1&limit=100&globalsearchkey=${payload.search}`,
          payload
        )
          .then(async (response) => {
            if (response && response.status === 200) {
              let customerSuspenstionList = response?.data.results || [];
              commit(
                "getCustomerSuspenstionList",
                customerSuspenstionList || []
              );
            }
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteCustomerSuspenstionData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/crm/settings/customer-suspension/${payload}`)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateCustomerSuspenstionDropDown({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _put(`/crm/settings/customer-suspension/${data.id}`, data)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCrmCollerDropDown({ state, commit }, { type, id }) {
      let add_url = "";
      if (type == "Adhoc") {
        add_url = `?profileId=${id}`;
      } else {
        add_url = `?contractId=${id}`;
      }
      return new Promise((resolve, reject) => {
        _get(`/sales/contract/caller/dropdown${add_url}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              commit("CrmCollerDropDownList", response.data.results || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteCallerData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _delete(`/sales/contract/caller/remove/${payload}`)
          .then(async (response) => {
            resolve(response.status);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getTripsNumberRapido({ state, commit }, { type }) {
      let s_type = type.toLowerCase();
      return new Promise((resolve, reject) => {
        _get(`/operations/rider-allot/suggestions/callTrips/${type}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let tripNumber = [];
              response?.data.results.map((i) => {
                tripNumber.push({
                  ...i,
                  cus_from_time: i.from_date,
                  cus_to_time: i.to_date,
                });
              });
              commit("getTripsNumberRapidoArray", tripNumber || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCrmCollerFullData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/sales/contract/caller/${payload}`)
          .then(async (response) => {
            if (response && response.status === 200) {
              commit("GetCrmCollerFullData", response || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async patchCrmCollerData({ state, commit, dispatch }, payload) {
      let pay = payload.id;
      // delete payload.id;
      return new Promise((resolve, reject) => {
        _patch(`/crm/booking/${pay}`, payload).then((res) => {
          dispatch("getCrmBookingDetails", payload.id);
        });
      });
    },

    postdropdowncoller({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _post(`/sales/contract/caller/create`, payload).then(
          async (response) => {
            if (response && response.status === 200) {
              resolve(response);
            }
          }
        );
      });
    },
    patchdropdowncoller({ state, commit }, payload) {
      let pay = payload.id;
      delete payload.id;
      return new Promise((resolve, reject) => {
        _patch(`/sales/contract/caller/update/${pay}`, payload).then(
          async (response) => {
            if (response && response.status === 200) {
              resolve(response);
            }
          }
        );
      });
    },

    async getBookedViaDropDown({ commit }) {
      await axios.get(`/dropdown/booked-via`).then((res) => {
        if (res.data.results) {
          commit("GetBookedViaDropDown", res.data.results || []);
        }
      });
    },

    postStandardCollectionSlipCompanyNameDropDown({ state, commit }, { type }) {
      return new Promise((resolve, reject) => {
        _post(`/sales/dropdown/slip/contracts`, {
          business_type: type,
          customer_type: "Express",
        })
          .then(async (response) => {
            if (response && response.status === 200) {
              // let costCenter = response?.data.results || [];
              commit(
                "GetStandardCollectionSlipCompanyNameDropDown",
                response?.data.results || []
              );
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async couponSetting({ commit }, { payload, toast }) {
      return await axios
        .post(`/crm/settings/coupon-setting/check`, payload)
        .then((res) => {
          if (res.data.results) {
            return res.data.results;
          }
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getAdhocSurcharges({ commit }, { payload, toast }) {
      return await axios
        .get(
          `/settings/sales/rates/express/adhoc/dropdowns/ratecard/additonal-surcharges`
        )
        .then((res) => {
          if (res.data.results) {
            let surchargeList = res?.data.results || [];
            let surchargeListArray = surchargeList.map((c) => ({
              ...c,
              name: c.surcharge_name,
              code: c.surcharge_name,
            }));

            commit("getsurchargeDropDownListState", surchargeListArray || []);
          }
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },

    async postCustomerLaunchBookingHistoryClone({ commit }, payload) {
      return await axios
        .post(`/crm/standard/slips/book/${payload}`)
        .then((response) => {
          return response;
        });
    },
    async getinitialBillingMode({ commit }, { id, toast }) {
      let data = {
        business_type: "Contract",
        contract_id: id,
      };
      return await axios
        .post(`/sales/contract/express/service`, data)
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchStateValue",
              { initail_billing_mode: res.data.results } || []
            );
          }
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getContractShowTrips({ commit }, { id, toast }) {
      return await axios
        .get(`/sales/contract/express/suggestion/trips/${id}`)
        .then((res) => {
          if (res.data.results) {
            commit(
              "fetchStateValue",
              { contract_trips_shows: res.data.results } || []
            );
          }
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
  },
};

export default CustomerLaunchStore;
