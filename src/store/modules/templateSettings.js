// import moment from "moment";
import axios from "axios";

const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const templateSettings = {
  namespaced: true,
  state: {

    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    bootstrapTabsTemplateSettingsKey: false,
    breadcrumbPath: "TemplateSettings",
    addRegionDeliveryTransportType: null,
    documentRowData: {},
    emailRowData: {},
    documentmoduleEditData: {},
    emailmoduleEditData: {},
    templateEditData: {},
    emailTemplateEditData: {},
    templateCreateResponseData: {},
    AllTemplatesData: [],
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    // Attachment
    templateSettingsAttachmentsStateData: {},
    templateSettingsAttachmentsFiles: [],
    deletedtemplateSettingsAttachmentsFiles: [],
    attachURL: {},
    //tables column data
    TableColumnData: [
      { field: "s_no", header: "S.No" },
      { field: "actions", header: "Actions" },
      { field: "module_name", header: "Module" },
      { field: "templates_count", header: "No. of Templates" },
    ],
    emailTableColunmData: [
      { field: "actions", header: "Actions" },
      { field: "s_no", header: "S.No" },
      { field: "template_name", header: "Email Template Name" },
      { field: "template_id", header: "Template ID" },
      { field: "email_template_id", header: "Mailjet Template ID" },
    ],
    documentTableColunmData: [
      { field: "s_no", header: "S.No" },
      { field: "actions", header: "Actions" },
      { field: "template_name", header: "Template Name" },
      { field: "template_id", header: "Template ID" },
      { field: "document", header: "Document" },
    ],
    //tableData
    documentTableData: [
      {
        id: 1,
        s_no: 1,
        module_name: "Sales",
        templates: 10
      },
      {
        id: 2,
        s_no: 2,
        module_name: "operations",
        templates: 12
      },
      {
        id: 3,
        s_no: 3,
        role_name: "CRM",
        templates: 14
      },
      {
        id: 4,
        s_no: 4,
        role_name: "HRMS",
        templates: 16
      }
    ],
    eMailTableData: [
      {
        id: 1,
        s_no: 1,
        role_name: "Sales",
        templates: 11
      },
      {
        id: 2,
        s_no: 2,
        role_name: "operations",
        templates: 12
      },
      {
        id: 3,
        s_no: 3,
        role_name: "CRM",
        templates: 14
      },
      {
        id: 4,
        s_no: 4,
        role_name: "HRMS",
        templates: 16
      }
    ],
    profileTableDataEmail: [],
    profileTableData: [
      {
        id: 1,
        s_no: 1,
        role_name: "Sales",
        template_id: 10,
        document: 1,
      },
      {
        id: 1,
        s_no: 1,
        role_name: "Sales",
        template_id: 10,
        document: 1,
      },
      {
        id: 1,
        s_no: 1,
        role_name: "Sales",
        template_id: 10,
        document: 1,
      },
      {
        id: 1,
        s_no: 1,
        role_name: "Sales",
        template_id: 10,
        document: 1,
      },
    ],
  },
  getters: {
    globalSearch: ({ globalSearch }) => globalSearch,
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    documentRowData: ({ documentRowData }) =>
      documentRowData,
    emailRowData: ({ emailRowData }) =>
      emailRowData,
    templateSettingsAttachmentsStateData: ({ templateSettingsAttachmentsStateData }) =>
      templateSettingsAttachmentsStateData,
    documentmoduleEditData: ({ documentmoduleEditData }) =>
      documentmoduleEditData,
    emailmoduleEditData: ({ emailmoduleEditData }) =>
      emailmoduleEditData,
    templateEditData: ({ templateEditData }) =>
      templateEditData,
    emailTemplateEditData: ({ emailTemplateEditData }) =>
      emailTemplateEditData,
  },
  mutations: {
    updateBreadCrumb(state, value) {
      state.breadcrumbPath = value;
    },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    //toast
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
      //console.log("toasttt")
    },
    fetchDocumentsModulesData(state, data) {
      state.documentTableData = data;
    },
    fetchEmailModulesData(state, data) {
      state.eMailTableData = data;
    },
    templateResponseData(state, data) {
      state.templateCreateResponseData = data;
    },
    fetchAllTemplates(state, data) {
      state.AllTemplatesData = data;
    },
  },
  actions: {
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit('addRegionDeliveryTransportTypeMutation', type);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    // Update BreadCrumb value
    updateBreadCrumb({ commit }, data) {
      commit("updateBreadCrumb", data);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    //Api calls
    getDocumentsModulesData({ commit }) {
      axios.get(
        '/settings/templates/document/module'
      ).then((res) => {
        if (res.data.results) {
          commit('fetchDocumentsModulesData', res.data.results);
        }
      });
    },
    getEmailModulesData({ commit }) {
      axios.get(
        '/settings/templates/email/module'
      ).then((res) => {
        if (res.data.results) {
          commit('fetchEmailModulesData', res.data.results);
        }
      });
    },
    async getTemplatesData(_, id) {
      return await axios.get(
        '/settings/templates/modules/template/' + id
      );
    },
    getAllTemplatesData({ commit }, id) {
      axios.get(
        '/settings/templates/modules/all-template/' + id
      )
        .then((res) => {
          if (res.data.results) {
            commit('fetchAllTemplates', res.data.results);
          }
        });
    },
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData, id, loadDiffStore }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            if (loadDiffStore) {
              commit("toastMutation", toastData.toastSuccessData);
              dispatch(loadData, id, { root: true });
            } else {
              commit('toastMutation', toastData.toastSuccessData);

              dispatch(loadData);
            }
          }
        })
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err.response.data.message;
          commit('toastMutation', toastData.toastErrorData);
        });
    },
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, id, type, toastMutationData, toastData, loadDiffStore, closeDialogue }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          commit("templateResponseData", res);
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData, id, { root: true });
            dispatch("closeDialog");
            // dispatch(closeDialogue, "closeDialog", { root: true });

          } else {
            dispatch(loadData, { root: true });
            // dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });

            commit("toastMutation", toastData.toastSuccessData);

            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastCommonErrorData);
            // dispatch(toastMutationData, { data: toastData.toastCommonErrorData }, { root: true });
          }
        });

    },
  },
};

export default templateSettings;
