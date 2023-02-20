import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";

const CrmFeedback = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    totalRecords: 0,
    feedbackTableData: [],
    feedbackOriginalTableData: [],
    feedbackTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "feedback_no", header: "Feedback No" },
      { field: "feedback_type", header: "Type" },
      { field: "sub_type", header: "Sub Type" },
      { field: "company_name", header: "Company Details" },
      { field: "cost_center.cost_center_name", header: "Cost Center" },
      { field: "caller_details.name", header: "Caller Name" },
      { field: "assigned_to", header: "Assigned to" },
      { field: "status", header: "Status" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    followupTableColunns: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "call_received_by", header: "Caller" },
      { field: "call_type", header: "Call Type" },
      { field: "date_and_time", header: "Date & Time" },
      { field: "contacts", header: "Contacts" },
      { field: "remarks", header: "Remarks" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    feedbackFilterParams: [
      {
        column_name: "feedback_no",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "feedback_type",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "company_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "cost_center_name",
        type: "contains",
        searchKey: "",
      },
      {
        column_name: "caller_details_name",
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
    displayDialog: false,
    displayFollowUpDialog: false,
    crmFeedbackExpansionOverlay: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    usersList: [],
    customerContactsList: [],
    followUpFormData: {},
    feedbackFormData: {},
    callTypesData: [],
    customerIdAndCompanyNameList: [],
    costCenterList: [],
    callerList: [],
    feedbackTypeList: [],
    statusList: [],
    assignedToList: [],
    crmFeedbackAttachmentsFiles: {},
    pageOffset: 1,
    pageLimit: 10,
    globalSearchKey: "",
    followUpTableList: [],
    followUptableLoad: false,
    toggleData: [{ type: "" }],
    assigntoDropdownData: [],
    notifytoDropdownData: [],
  },

  getters: {
    //put getters methods goes here
    getFollowupColumns(state) {
      return state.followupTableColunns;
    },
    getExpansionOverlay(state) {
      return state.crmFeedbackExpansionOverlay;
    },
    getAllUsersData(state) {
      return state.usersList;
    },
    getCustomerContactsData(state) {
      return state.customerContactsList;
    },
    getFollowUpData(state) {
      return state.followUpFormData;
    },
    getFeedbackFormData(state) {
      return state.feedbackFormData;
    },
    getCallTypesData(state) {
      return state.callTypesData;
    },
    getCustomerIdAndCompanyNameData(state) {
      return state.customerIdAndCompanyNameList;
    },
    getCostCentersData(state) {
      return state.costCenterList;
    },
    getCallerData(state) {
      return state.callerList;
    },
    getFeedbackTypeData(state) {
      return state.feedbackTypeList;
    },
    getStatusListData(state) {
      return state.statusList;
    },
    getAssignedToData(state) {
      return state.assignedToList;
    },
    getAttachmentsData(state) {
      return state.crmFeedbackAttachmentsFiles || {};
    },
    getPageOffset(state) {
      return state.pageOffset;
    },
    getPageLimit(state) {
      return state.pageLimit;
    },
    getFilterParams(state) {
      return state.feedbackFilterParams;
    },
    getFollowUpTableData(state) {
      return state.followUpTableList;
    },

    getAssigntoDropdown(state) {
      return state.assigntoDropdownData;
    },

    getNotifytoDropdown(state, data) {
      return state.notifytoDropdownData;
    },
  },

  mutations: {
    //put update methods goes here
    getassigntoDropdownData(state, data) {
      state.assigntoDropdownData = data || [];
    },
    getNotifytoDropdownData(state, data) {
      state.notifytoDropdownData = data || [];
    },
    updateDataOfFeedback(state, data) {
      state.feedbackTableData = data || [];
    },
    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },
    updateFollowupDisplayDialog(state, data) {
      state.displayFollowUpDialog = data;
    },
    updateDataOfUsersList(state, data) {
      state.usersList = data;
    },
    updateDataOfCustomerContact(state, data) {
      state.customerContactsList = data;
    },
    updateFollowupDataAndDisplayDialog(state, data) {
      state.displayFollowUpDialog = data.displayDialog;
      state.followUpFormData = data.formData;
    },
    updateFeedbackDisplayDialog(state, data) {
      state.displayDialog = data.displayDialog;
      state.feedbackFormData = data.formData;
    },
    updateDataOfCallTypes(state, data) {
      state.callTypesData = data || [];
    },
    updateDataOfCustomerIdAndCompanyName(state, data) {
      state.customerIdAndCompanyNameList = data || [];
    },
    updateDataOfCompanyNames(state, data) {
      state.companyNameList = data || [];
    },
    updateDataOfCostCenters(state, data) {
      state.costCenterList = data || [];
    },
    updateDataOfCaller(state, data) {
      state.callerList = data || [];
    },
    updateDataOfFeedbackType(state, data) {
      state.feedbackTypeList = data || [];
    },
    updateStatusDataOfFeedbackType(state, data) {
      state.statusList = data || [];
    },
    updateDataOfAssignedTo(state, data) {
      state.assignedToList = data || [];
    },
    updatePageParams(state, data) {
      state.pageOffset = data.offset;
      state.pageLimit = data.limit;
    },
    updateDataOfFollowUpTable(state, data) {
      state.followUpTableList = data;
    },
  },

  actions: {
    loadgetassigntoDropdownData({ state, commit }, pay) {
      return _get(`/crm/express/dropdown/user-and-zone?${pay}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const costCenterIdData = response.data?.results || [];
            for (let i in costCenterIdData) {
              costCenterIdData[i]["names"] = costCenterIdData[i].name;
              costCenterIdData[i]["roles"] = costCenterIdData[i].role;
              // costCenterIdData[i]['id'] = costCenterIdData[i].id;
            }
            commit("getassigntoDropdownData", costCenterIdData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
    async loadgetNotifytoDropdownData({ commit }, play) {
      axios.get(`/crm/express/dropdown/user-and-zone?${play}`).then((res) => {
        if (res.data.results) {
          commit("getNotifytoDropdownData", res.data.results);
        }
      });
    },

    //Get feedback table list
    loadFeedbackDataList({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data?.searchValue || "";
      return _post(
        `crm/list-feedback?offset=${data.offset}&limit=${data.limit}&globalsearchkey=${state.globalSearchKey}`,
        data
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const feedbackData = response?.data.results?.rows || [];
            const totalRecords = response?.data.results?.count || 0;
            let isDesc =
              data.orderBy &&
              data?.orderBy[0] == "createdAt" &&
              data?.orderBy[1] == "DESC";
            let setFeedbackData = feedbackData.map((res, index) => {
              let ascendingNo =
                (data.offset - 1) * data.limit + Number(index) + 1;
              let descendingNo =
                totalRecords +
                1 -
                ((data.offset - 1) * data.limit + Number(index) + 1);
              let sNo = isDesc ? descendingNo : ascendingNo;

              let feedbackResponse = {
                ...res,
                s_no: sNo,
              };

              return feedbackResponse;
            });

            commit("updateDataOfFeedback", setFeedbackData || []);
            commit("updateTotalRecords", totalRecords || 0);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Delete feedback data
    deleteFeedbackData({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/feedback/${data.id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Get feedback data
    fetchSpecificFeedbackData({ state, commit }, data) {
      state.followUptableLoad = true;
      return _get(`crm/feedback/${data.id}`)
        .then(async (response) => {
          let followUpTableList = response.data?.results?.follow_up || [];
          let followUpTableData = followUpTableList.map((res, index) => {
            let ascendingNo = Number(index) + 1;
            let data = {
              ...res,
              s_no: ascendingNo,
            };
            return data;
          });
          state.followUptableLoad = false;
          commit("updateDataOfFollowUpTable", followUpTableData || []);
          return response;
        })
        .catch((err) => {
          state.followUptableLoad = false;
          return err;
        });
    },

    //Create follow up on feedback
    createFeedbackFollowUp({ state, commit }, data) {
      state.displayFollowUpDialog = true;
      return _post(`crm/feedbacks/follow-up`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayFollowUpDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.displayFollowUpDialog = false;
          return err;
        });
    },

    //Update follow up on feedback
    updateFeedbackFollowUp({ state, commit }, data) {
      state.displayFollowUpDialog = true;
      return _patch(`crm/feedbacks/follow-up/${data.id}`, data.feedbackData)
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayFollowUpDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.displayFollowUpDialog = false;
          return err;
        });
    },

    //Create follow up on feedback
    createFeedback({ state, commit }, data) {
      return _post(`crm/feedback`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.displayDialog = false;
          return err;
        });
    },

    //Update follow up on feedback
    updateFeedback({ state, commit }, data) {
      return _patch(`crm/feedback/${data.id}`, data.feedbackData)
        .then(async (response) => {
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.displayDialog = false;
          return err;
        });
    },

    //Get all users received by
    getAllUserReceivedByData({ state, commit }, data) {
      return _get(`settings/all-user/dropdown`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const usersData = response.data?.results || [];
            let setUsersData = usersData.map((res, index) => {
              let data = {
                ...res,
                name: res.display_name,
              };
              return data;
            });

            commit("updateDataOfUsersList", setUsersData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get all call types
    getAllCallTypes({ state, commit }, data) {
      return _get(`dropdown/follow-up/call-type`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const callTypeData = response.data?.results || [];
            let setCallTypeData = callTypeData.map((res, index) => {
              let data = {
                ...res,
                name: res.call_type,
              };
              return data;
            });

            commit("updateDataOfCallTypes", setCallTypeData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get all customer contacts list
    getAllCustomerContactData({ state, commit }, data) {
      return _get(`sales/contract/contact-person/dropdown/${data.id}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const customerContactData = response.data?.results || [];
            let setCustomerContactData = customerContactData.map(
              (res, index) => {
                let data = {
                  ...res,
                  name: res.contact_name,
                };
                return data;
              }
            );

            commit("updateDataOfCustomerContact", setCustomerContactData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get all customer id list
    getAllCustomerIdAndCompanyNameData({ state, commit }, id) {
      return _get(`sales/dropdown/contracts?customerType=express`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const customerIdData = response.data?.results || [];
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

    //Get all cost center list
    getAllCostCenterData({ state, commit }, data) {
      return _get(`sales/contract/express/costcenter/suggestions/${data.data}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const costCenterData = response.data?.results || [];
            let setCostCenterData = costCenterData.map((res, index) => {
              let data = {
                ...res,
                name: res.contact_name,
              };
              return data;
            });

            commit("updateDataOfCostCenters", setCostCenterData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get all caller list
    getAllCallerData({ state, commit }, data) {
      return _get(`sales/contract/caller/dropdown?contractId=${data.id}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const callerData = response.data?.results || [];

            commit("updateDataOfCaller", callerData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get feedback type list
    getFeedbackTypeData({ state, commit }, id) {
      return _get(`crm/dropdown/feedback-types`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const feedbackTypeData = response.data?.results || [];

            commit("updateDataOfFeedbackType", feedbackTypeData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get status list of feedback type
    getStatusDataofFeedbackType({ state, commit }, data) {
      return _get(`crm/dropdown/feedback-types/status/${data.id}`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const statusListData = response.data?.results || [];

            commit("updateStatusDataOfFeedbackType", statusListData || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get assigned to list

    resolveFeedbackData({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`crm/feedbacks/resolve/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Delete followup data
    deleteFollowupData({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/feedbacks/follow-up/${data.id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    showFollowupDialog({ state, commit }, data) {
      state.followUpFormData = {};
      commit("updateFollowupDisplayDialog", data);
    },

    showFeedbackFormDialog({ state, commit }, data) {
      commit("updateFeedbackDisplayDialog", data);
    },

    showFollowupDialogAndData({ state, commit }, data) {
      commit("updateFollowupDataAndDisplayDialog", data);
    },
    //update page offset and limit on table
    updatePageOffsetLimit({ state, commit }, data) {
      commit("updatePageParams", data);
    },

    fetchAttachmentsFromFeedback({ state, commit }, data) {
      return _get(`crm/feedback/${data.id}`)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};

export default CrmFeedback;
