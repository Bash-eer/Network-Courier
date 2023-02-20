import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";

const CrmSettings = {
  namespaced: true,
  state: {
    // put variables and collections here
    tableLoad: false,
    settingsTabMenuData: [
      {
        label: "Document",
        tab: "documentDetailSettings",
        select: true,
        tabName: "Document Detail",
        data: "documentDetailTableData",
        columns: "documentColumnData",
      },
      {
        label: "Payment",
        tab: "PaymentMethod",
        select: false,
        tabName: "Payment Method",
        data: "paymentTableData",
        columns: "paymentColumnData",
      },
      {
        label: "Feedback",
        tab: "FeedbackSettings",
        select: true,
        tabName: "Feedback",
        data: "feedbackTableData",
        columns: "feedbackColumnData",
      },
      {
        label: "Logistics",
        tab: "LogisticsSettings",
        select: true,
        tabName: "Logistics",
        data: "logisticsTableData",
        columns: "logisticsColumnData",
      },
      {
        label: "Coupon",
        tab: "couponSettings",
        select: true,
        tabName: "Coupon",
        data: "couponTableData",
        columns: "couponColumnData",
      },
      {
        label: "Countries",
        tab: "countrySettings",
        select: true,
        tabName: "Countries",
        data: "countrySettingsTableData",
        columns: "countriesColumnData",
      },
    ],
    totalRecords: 0,
    feedbackTableData: [],
    paymentTableData: [],
    documentDetailTableData: [],
    countrySettingsTableData: [],
    countrySettingsTable: [],
    countriesData: [],
    documentDetailTotalRecords: 0,
    couponTableData: [],
    logisticsTableData: [],
    couponOriginalTableData: [],
    documentDetailTable: [],
    feedbackOriginalTableData: [],
    logisticsOriginalTableData: [],
    updateProhibitedValueList: [],
    countryResultValueList: {},
    feedbackTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "feedback_type", header: "Feedback Type" },
      { field: "feedback_subtype", header: "Sub Types" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    paymentColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "payment_method", header: "Payment Method" },
      { field: "user.display_name", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    displayDialog: false,
    displayCouponDialog: false,
    displayLogisticsDialog: false,
    displayDocumentDialog: false,
    displayCountryDialog: false,
    feedbackSettingsFormData: {},
    couponSettingsFormData: {},
    logisticsSettingsFormData: {},
    documentDetailSettingsFormData: {},
    countrySettingsFormData: {},
    subTypes: [],
    globalSearchKey: "",
    countryDropDownListArray: [],
    countryNameListArray: [],
    getStateListArray: [],
    jobTypeDropDown: [],
    jobTypeDropDownList: [],
    onRowSelectInDataTable: null,
    updateButton: null,
    onRowJobTypeValue: null,
    onRowSelectDataTable: null,
    paymentMethodOriginalData: [],
    paymentSettingsFormData: {},
    paymentDisplayDialog: false,
    toggleData: [{ type: "" }],
    // countries add state
    countriesAddData: null,
  },

  getters: {
    //put getters methods goes here
    getSettingsTabMenuData(state) {
      return state.settingsTabMenuData;
    },

    updateBtn(state) {
      return state.updateButton;
    },

    onRowSelectInDataTableId(state) {
      return state.onRowSelectInDataTable;
    },

    getEditFeedbackSettingsData(state) {
      return state.feedbackSettingsFormData;
    },

    getEditDocumentDetailSettingsData(state) {
      return state.documentDetailSettingsFormData;
    },

    getEditCountrySettingsData(state) {
      return state.countrySettingsFormData;
    },

    getSubTypes(state) {
      return state.subTypes;
    },

    getCouponSettingsTable(state) {
      return state.couponTableData;
    },

    getLogisticsSettingsTable(state) {
      return state.logisticsTableData;
    },

    getDocumentDetailSettingTable(state) {
      return state.documentDetailTableData;
    },

    getCountrySettingsTableData(state) {
      return state.countrySettingsTableData;
    },

    getCountrySettingTable(state) {
      return state.countriesData;
    },

    getEditCouponSettingsData(state) {
      return state.couponSettingsFormData;
    },

    getEditLogisticsSettingsData(state) {
      return state.logisticsSettingsFormData;
    },

    getCountryCodeList(state) {
      return state.countryDropDownListArray;
    },

    getCountryNameList(state) {
      return state.countryNameListArray;
    },

    getStateList(state) {
      return state.getStateListArray;
    },

    getCountryProhibitedValue(state) {
      return state.updateProhibitedValueList;
    },

    getJobTypeList(state) {
      return state.jobTypeDropDown;
    },
    getOnRowSelectDataTable(state) {
      return state.onRowSelectDataTable;
    },
    getPaymentMethodSettingsData(state) {
      return state.paymentSettingsFormData;
    },

    getSelectedJobType(state) {
      return state.onRowJobTypeValue;
    },
  },

  mutations: {
    //put update methods goes here

    updateDataOfFeedback(state, data) {
      state.feedbackTableData = data || [];
      state.feedbackOriginalTableData = data || [];
    },

    updateTotalRecords(state, data) {
      state.totalRecords = data || [];
    },

    updateDataOfDocumentDetail(state, data) {
      state.documentDetailTableData = data || [];
      state.documentDetailTable = data || [];
    },

    countrySettingsListArray(state, data) {
      state.countrySettingsTableData = data || [];
      state.countrySettingsTable = data || [];
    },

    updateDocumentTotalRecords(state, data) {
      state.documentDetailTotalRecords = data || [];
    },

    updateDisplayDialog(state, data) {
      state.displayDialog = data.displayDialog || false;
      state.feedbackSettingsFormData = data.formData || {};
    },

    updatePaymentDisplayDialog(state, data) {
      state.paymentDisplayDialog = data.displayDialog || false;
      state.paymentSettingsFormData = data.formData || {};
    },

    updateDisplayDocumentDialog(state, data) {
      state.displayDocumentDialog = data.displayDialog || false;
      state.documentDetailSettingsFormData = data.formData || {};
    },

    updateDisplayCountryDialog(state, data) {
      state.displayCountryDialog = data.displayDialog || false;
      state.countrySettingsFormData = data.formData || {};
    },

    updateDisplayCouponDialog(state, data) {
      state.displayCouponDialog = data.displayDialog || false;
      state.couponSettingsFormData = data.formData || {};
    },

    updateDisplayLogisticsDialog(state, data) {
      state.displayLogisticsDialog = data.displayDialog || false;
      state.logisticsSettingsFormData = data.formData || {};
    },

    updateSubTypes(state, data) {
      state.subTypes = data || [];
    },

    updateDataOfCoupon(state, data) {
      state.couponTableData = data || [];
      state.couponOriginalTableData = data || [];
    },

    updateDataOfLogistics(state, data) {
      state.logisticsTableData = data || [];
      state.logisticsOriginalTableData = data || [];
    },

    getCountryDropDownList(state, data) {
      state.countryDropDownListArray = data || [];
    },

    getCountryNameListId(state, data) {
      state.countryNameListArray = data || [];
    },

    updateStateValue(state, data) {
      state.getStateListArray = data || [];
    },

    updateProhibitedValue(state, data) {
      state.updateProhibitedValueList = data || [];
    },

    countryResults(state, data) {
      state.countryResultValueList = data || [];
    },

    jobTypeState(state, data) {
      state.jobTypeDropDown = data || [];
    },
    addJobTypeDropDown(state, data) {
      state.jobTypeDropDownList = data || [];
    },
    onRowSelectData(state, data) {
      state.onRowSelectDataTable = data || [];
    },
    onRowJobType(state, data) {
      state.onRowJobTypeValue = data || [];
    },
    updateDataOfPaymentMethod(state, data) {
      state.paymentTableData = data || [];
      state.paymentMethodOriginalData = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    //Fetch feedback settings table list
    loadFeedbackSettingsData({ state, commit }, tab) {
      state.tableLoad = true;
      return _get(`crm/settings/feedback`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const feedbackData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setFeedbackData = feedbackData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                createdAt: new Date(res.createdAt)
              };

              return data;
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

    //Fetch payment method table list
    loadPaymentMethodData({ state, commit }, tab) {
      state.tableLoad = true;
      return _get(`crm/settings/paymentmethod`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const paymentMethodData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setPaymentMethodData = paymentMethodData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                name: res.payment_method,
                createdAt: new Date(res.createdAt)
              };

              return data;
            });

            commit("updateDataOfPaymentMethod", setPaymentMethodData || []);
            commit("updateTotalRecords", totalRecords || 0);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Delete feedback settings data
    deleteFeedbackData({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/settings/feedback/${data.id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Delete payment method data
    deletePaymentMethodData({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/settings/paymentmethod/${data.id}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Create feedback settings table list
    createFeedbackSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/settings/feedback`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Update feedback settings table list
    updateFeedbackSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(
        `crm/settings/feedback/${data.id}`,
        data.feedbackSettingData
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Create payment method settings table list
    createPaymentMethodSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/settings/paymentmethod`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.paymentDisplayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Update payment method settings table list
    updatePaymentMethodSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(
        `crm/settings/paymentmethod/${data.id}`,
        data.paymentSettingData
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.paymentDisplayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Update feedback settings visibility
    showFeedbackSettingsDialog({ state, commit }, data) {
      if (data.displayDialog == false) {
        state.displayCouponDialog = false;
        state.displayLogisticsDialog = false;
        state.feedbackSettingsFormData = {};
      }
      commit("updateDisplayDialog", data);
    },

    showPaymentSettingsDialog({ state, commit }, data) {
      commit("updatePaymentDisplayDialog", data);
    },

    showDocumentDetailSettingsDialog({ state, commit }, data) {
      if (data.displayDocumentDialog == false) {
        state.documentDetailSettingsFormData = {};
      }
      commit("updateDisplayDocumentDialog", data);
    },

    showCountrySettingsDialog({ state, commit }, data) {
      if (data.displayCountryDialog == false) {
        state.countrySettingsFormData = {};
      }
      commit("updateDisplayCountryDialog", data);
    },

    showCouponSettingsDialog({ state, commit }, data) {
      if (data.displayCouponDialog == false) {
        state.couponSettingsFormData = {};
      }
      commit("updateDisplayCouponDialog", data);
    },

    showLogisticsSettingsDialog({ state, commit }, data) {
      if (data.displayLogisticsDialog == false) {
        state.logisticsSettingsFormData = {};
      }
      commit("updateDisplayLogisticsDialog", data);
    },

    //Get specific feedback settings sub types
    specificFeedbackData({ state, commit }, data) {
      state.subTypes = [];
      return _get(`crm/settings/feedback/${data.id}`)
        .then(async (response) => {
          let expandedData = response.data?.results?.feedback_subtype || [];
          let subTypes = expandedData.map((res, index) => {
            return res.sub_type;
          });
          commit("updateSubTypes", subTypes);
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Fetch feedback settings table list
    loadCouponSettingsData({ state, commit }, tab) {
      state.tableLoad = true;
      return _get(`crm/settings/coupon-settings`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const feedbackData = response?.data.results || [];
            const totalRecords = response?.data.results.length || 0;

            let setFeedbackData = feedbackData.map((res, index) => {
              let ascendingNo = Number(index) + 1;
              let data = {
                ...res,
                s_no: ascendingNo,
                createdAt: new Date(res.createdAt),
              };

              return data;
            });

            commit("updateDataOfCoupon", setFeedbackData || []);
            commit("updateTotalRecords", totalRecords || 0);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    createCouponSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`/crm/settings/coupon-settings`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayCouponDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    loadLogisticsSettingsData({ state, commit }) {
      state.tableLoad = true;
      let data = {
        orderBy: ["min_weight", "DESC"],
        filter_params: [],
      };
      return _post(`crm/settings/logistic`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const feedbackData = response?.data.results.rows || [];
            const totalRecords = response?.data.results.count || 0;

            let updated = feedbackData.map((c, i) => {
              c["s_no"] = i + 1;
              c["createdAt"] = new Date(c.createdAt);
              return c;
            });


            commit("updateDataOfLogistics", updated || []);
            commit("updateTotalRecords", totalRecords || 0);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    createLogisticsSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/settings/logistics`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayLogisticsDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    deleteLogisticsSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`/crm/settings/logistics/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response.status;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    updateLogisticsSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`/crm/settings/logistics/${data.id}`, data.dataSet)
        .then(async (response) => {
          state.tableLoad = false;
          state.displayLogisticsDialog = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    //Fetch DocumentDetail settings table list
    getDocumentDetailSettingsData({ state, commit }, tab) {
      state.tableLoad = true;
      return _get(`/crm/settings/documentdetail`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const feedbackData = response?.data.results || [];
            const totalRecords = response?.data.results.count || 0;

            let updated = feedbackData.map((c, i) => {
              c["s_no"] = i + 1;
              c["createdAt"] = new Date(c.createdAt);
              return c;
            });

            commit("updateDataOfDocumentDetail", updated || []);
            commit("updateDocumentTotalRecords", totalRecords || 0);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
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
              commit("jobTypeState", updatedJobType || []);
              let datas = [
                {
                  name: "Add New",
                  code: "Hi",
                  items: [...state.jobTypeDropDown],
                },
              ];
              commit("addJobTypeDropDown", datas || []);
            }
            resolve(response?.data?.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    createNewJobType({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/settings/documentdetail`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayLogisticsDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    createNewDocumentDetail({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`crm/settings/documentdetails/type/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDocumentDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    deleteDocumentDetailSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/settings/documentdetail/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response.status;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    deleteDocumentDetailId({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`crm/settings/documentdetails/type/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response.status;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    updateDocumentIdSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`crm/settings/documentdetails/type/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    updateJobTypeDataCall({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`crm/settings/documentdetail/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    // crm/settings/logistic

    //common search data of feedback settings
    commonSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      let searchOnArray = state.feedbackOriginalTableData.filter(
        (item) =>
          item.feedback_type.toLowerCase().includes(searchValue) ||
          (item.user?.display_name).toLowerCase().includes(searchValue) ||
          item.feedback_subtype.toString().toLowerCase().includes(searchValue)
      );
      state.feedbackTableData = searchOnArray;
      state.tableLoad = false;
    },

    commonLogsiticSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      let searchOnArray = state.logisticsOriginalTableData.filter(
        (item) =>
          (item.user?.display_name).toLowerCase().includes(searchValue) ||
          (item.company).toString().toLowerCase().includes(searchValue) ||
          item.default_logistics.toString().toLowerCase().includes(searchValue) ||
          item.max_weight.toString().toLowerCase().includes(searchValue) ||
          item.min_weight.toString().toLowerCase().includes(searchValue)
      );
      state.logisticsOriginalTableData = searchOnArray;
      state.tableLoad = false;
    },

    //common search data of payment method
    commonPaymentSearchData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();
      let searchOnArray = state.paymentMethodOriginalData.filter(
        (item) =>
          item.payment_method.toLowerCase().includes(searchValue) ||
          (item.user?.display_name).toLowerCase().includes(searchValue)
      );
      state.paymentTableData = searchOnArray;
      state.tableLoad = false;
    },

    commonSearchForCouponData({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();

      let searchOnArray = state.couponOriginalTableData.filter(
        (item) =>
          item.coupon_name.toLowerCase().includes(searchValue) ||
          item.coupon_code.toLowerCase().includes(searchValue)
      );
      state.couponTableData = searchOnArray;
      state.tableLoad = false;
    },

    commonSearchForDocumentDetail({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();

      let searchOnArray = state.documentDetailTable.filter((item) =>
        item.job_type.toLowerCase().includes(searchValue)
      );
      state.documentDetailTableData = searchOnArray;
      state.tableLoad = false;
    },

    commonSearchForCountrySettings({ state, commit }, data) {
      state.tableLoad = true;
      state.globalSearchKey = data.searchValue.toLowerCase();
      const searchValue = data.searchValue.toLowerCase();

      let searchOnArray = state.countrySettingsTable.filter(
        (item) =>
          item.country_iso_code.toLowerCase().includes(searchValue) ||
          item.country_name.toLowerCase().includes(searchValue)
      );
      state.countrySettingsTableData = searchOnArray;
      state.tableLoad = false;
    },

    async getOnRowSelectData({ commit }, id) {
      await axios.get(`/crm/settings/documentdetail/${id}`).then((res) => {
        if (res.data.results) {
          const Data = res?.data.results.document_detail || [];
          let updated = Data.map((c, i) => {
            c["s_no"] = i + 1;
            return c;
          });
          const jobType = res?.data.results || [];
          commit("onRowJobType", jobType);
          commit("onRowSelectData", updated);
        }
      });
    },

    deleteCouponSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`/crm/settings/coupon-settings/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response.status;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    updateCouponSettings({ state, commit }, data) {
      state.tableLoad = true;
      return _put(`/crm/settings/coupon-settings/${data.id}`, data.dataSet)
        .then(async (response) => {
          state.tableLoad = false;
          state.displayCouponDialog = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    updateTableView({ state, commit }, data) {
      state.onRowSelectInDataTable = data;
    },

    updateBtnData({ state, commit }, data) {
      state.updateButton = data;
    },

    getCountriesDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(
        `settings/sales/rates/international/outbound/dropdowns/countries`
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated =
              response.data &&
              response.data.results.map((c) => {
                c["name"] = c.profile_name;
                c["code"] = c.profile_name;
                return c;
              });

            commit("getCountryDropDownList", updated);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    getCountrySettingsData({ state, commit }, tab) {
      state.tableLoad = true;
      return _get(`/crm/settings/country-settings`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            const Data = response?.data.results || [];
            let updated = Data.map((c, i) => {
              c["s_no"] = i + 1;
              c["createdAt"] = new Date(c.createdAt);
              return c;
            });
            commit("countrySettingsListArray", updated || []);
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    createNewCountrySettingsData({ state, commit }, data) {
      state.tableLoad = true;
      return _post(`/crm/settings/country-settings`, data)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            state.displayCountryDialog = false;
          }
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    getCountriesNameListId({ state, commit }, data) {
      state.tableLoad = true;
      return _get(
        `/settings/sales/rates/international/outbound/dropdowns/country/destination/${data}`
      )
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated =
              response.data &&
              response.data.results.map((c) => {
                c["name"] = c.profile_name;
                c["code"] = c.profile_name;
                return c;
              });

            commit("getCountryNameListId", updated);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    deleteCountrySettings({ state, commit }, data) {
      state.tableLoad = true;
      return _delete(`/crm/settings/country-setting/${data}`)
        .then(async (response) => {
          state.tableLoad = false;
          return response.status;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    getCoutriesStateData({ state, commit }, data) {
      return _get(`crm/settings/country-setting/${data.id}`)
        .then(async (response) => {
          let expandedData = response.data?.results.states || [];
          let subTypes = expandedData.map((res, index) => {
            return res;
          });
          let ProhibitedData = response.data?.results.prohibited_items || [];
          let data = ProhibitedData.map((res) => {
            return res;
          });
          commit("updateStateValue", subTypes);
          commit("updateProhibitedValue", data);
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
    updateCountrySettings({ state, commit }, data) {
      state.tableLoad = true;
      return _put(`/crm/settings/country-setting/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          state.displayCountryDialog = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
    updateCountryState({ state, commit }, data) {
      state.tableLoad = true;
      return _patch(`/crm/settings/country-settings/state/${data.id}`, data)
        .then(async (response) => {
          state.tableLoad = false;
          state.displayCountryDialog = false;
          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    disableCountrySettingsData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _patch(`crm/settings/country-setting/${data.id}`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    disableCouponSettingsData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        _put(`crm/settings/coupon-settings/${data.id}`, data)
          .then(async (response) => {
            if (response && response.status === 200) {
              state.displayDialog = false;
            }
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async commonDisable({ state, commit, dispatch }, data) {
      if (data.type == "CountrySettingsTable") {
        return await dispatch("disableCountrySettingsData", data);
      } else if (data.type == "CouponSettings") {
        return await dispatch("disableCouponSettingsData", data);
      }
    },
  },
};

export default CrmSettings;
