import axios from "axios";
const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const sales = {
  FilesToUpload: null,
  namespaced: true,
  state: {
    salesCurrentTabs: null,
    stepperEditMode: false,
    quotationFileUpload: null,
    test: "Hello",
    stepperNavigation: null,
    salesHomeDialogData: null,
    expressTimeLineCurrentTab: "Overview",
    tableLoad: false,
    salesQuotationId: null,
    salesCompanyid: null,
    //formData
    quotationDialogLoadState: null,
    // quotationExpressContractBikeFormData={};
    companyCreationFormData: {},
    quotationExpressContractFormData: {},
    quotationCreationFormData: {},
    companyCreationStateData: {},
    quotationCreationStateData: {},
    contactsStateData: [],
    radioButtonSalesState: null,
    toggleData: [{ type: "" }],
    //time line data
    //quotation overview
    expressQuotationOverviewData: [],
    //billing preferences
    rawBillingPreferencesData: null,
    billingPreferencesData: [],
    //cost center
    costCentresContactData: [],
    costingCentreCreationStateData: {},
    costCenterFormData: {},
    costCentreId: null,
    //overlay data
    quotationOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Update Status", icon: "fa fa-adjust" },
      
    ],
    //stepper data
    quotationStepperItems: [
      {
        index: 0,
        label: "1",
        component: "selectMethod",
        name: "Select Method",
      },
      {
        index: 1,
        label: "2",
        component: "tripDetails",
        name: "Trip Details",
      },
      {
        index: 2,
        label: "3",
        component: "costingDetails",
        name: "Costing Details",
      },
      {
        index: 3,
        label: "4",
        component: "contract",
        name: "Contract | Send Quotations",
      },
    ],
    //table data
    timeLineExpressCostCenterTableData: [],
    timeLineExpressCostCenterTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "s_no", header: "S. No" },
      { field: "cost_centre_name", header: "Cost Center Name" },
      { field: "building_name", header: "Building Name" },
      { field: "unit_no", header: "Unit No" },
      { field: "floor_no", header: "Floor No" },
      { field: "state", header: "State" },
      { field: "country", header: "Country" },
      { field: "postal_code", header: "Postal Code" },
      { field: "contact_person", header: "Members" },
      { field: "site_office", header: "Site Office" },
    ],
    expressQuotationContactsTableColumnData: [
      { field: "person_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "designation", header: "Designation" },
    ],

    expressQuotationContactsTableData: null,
    tripDetailsDialogTableData: [
      {
        id: "1",
        tripName: "1st",
        From: "",
        To: "",
        tripDays: "Weekdays",
        tripType: "Open",
      },
      {
        id: "2",
        tripName: "2nd",
        From: "",
        To: "",
        tripDays: "Weekdays",
        tripType: "Open",
      },
      {
        id: "3",
        tripName: "3rd",
        From: "",
        To: "",
        tripDays: "Weekdays",
        tripType: "Open",
      },
    ],
    contractOrSendQuotationTable: [
      {
        id: "1",
        name: "Brad Simsons",
        contact: "5656464646",
        email: "simson@gmail.com",
        address: "CAG",
      },
      {
        id: "2",
        name: "Jossh",
        contact: "987897",
        email: "Josh@gmail.com",
        address: "CAG",
      },
    ],

    tripDetailsDialogTableColumnData: [
      { field: "tripName", header: "Trip Name" },
      { field: "From", header: "From" },
      { field: "To", header: "To" },
      { field: "tripDays", header: "Trip Days" },
      { field: "tripType", header: "Trip Type" },
    ],
    salesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "id", header: "S. No" },
      { field: "company_name", header: "Company Name" },
      { field: "address", header: "Address" },
      { field: "contact", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile No" },
      { field: "createdAt", header: "Created On" },
      { field: "company_status", header: "Status" },
    ],
    contractOrSendQuotationTableColumnData: [
      { field: "name", header: "Name" },
      { field: "contact", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "address", header: "Address" },
    ],
    FollowUpTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "id", header: "S. No" },
      { field: "internal_call_received_by", header: "Sales Person" },
      { field: "call_type", header: "Call Type" },
      { field: "date_and_time", header: "Date & Time" },
      { field: "customer_name", header: "Contact's" },
      { field: "subject", header: "Subject" },
      { field: "discussion_detaits", header: "Discussion Details" },
      { field: "attachments", header: "Attachments" },
      { field: "created_on", header: "Created On" },
    ],
    FollowUpTableData: [],
    // {
    //   Actions: "",
    //   sno: 1,
    //   sales_person: "Jasmine",

    //   call_type: "Called",
    //   date_and_time: "24th Apr, 2021",
    //   customer_contact: "jasmine",
    //   customer_contact_number: "9876543210",
    //   subject: "lorem ipsum",
    //   discussion_details: "Lorem Ipsum Doret Dexi",
    //   createdAt: "24th April 2021",
    //   attachments: "New",
    //   created_on: "24th Apr 2021",
    // },

    AttachmentTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "id", header: "S. No" },
      { field: "uploaded_in", header: "Uploaded in" },
      { field: "remarks", header: "Remarks" },
      { field: "attachments", header: "Attachments" },
      { field: "created_on", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    AttachmentTableData: [],
    // [
    //   {
    //     Actions: "",
    //     id: 1,
    //     uploaded_in: "Quotation",
    //     remarks: "Lorem Ipsum Doret Dexi",
    //     created_by: "Jasmine",
    //     attachments: "New",
    //     created_on: "24th Apr, 2021",
    //   },
    // ],
    dashboardTableData: [
      {
        "S.no": 1,
        sales_person: "Jasmine",
        company_name: "Dell",
        address: "2nd Chin Bee",
        cus_contact: "1234567890",
        quotation: "Adhoc",
        email: "jasmine@gmail.com",
        telephone: "123456",
        createdAt: "24th April 2021",
        status: "New",
        Actions: "",
      },
    ],
    quotationTableData: [],
    quotationTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "quotation_id", header: "S. No" },
      { field: "name_of_the_profile", header: "Profile Name" },
      { field: "customer_type", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "createdBy", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "contact_person", header: "Members" },
    ],
    quotationSubTableColumnData: [
      { field: "name_of_the_profile", header: "Profile Name" },
      { field: "customer_type", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "createdBy", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "contact_person", header: "Members" },
    ],
    //tabs data
    salesTabMenuData: [
      {
        label: "SalesTab",
        tab: "SalesTables",
        select: false,
        tabName: "Sales",
        data: "salesTableData",
        columns: "salesTableColumnData",
      },
      {
        label: "DashboardTab",
        tab: "SalesTables",
        select: true,
        tabName: "Dashboard",
        data: "dashboardTablesData",
        columns: "salesTableColumnData",
      },
      {
        label: "ContractsTab",
        tab: "SalesTables",
        select: true,
        tabName: "Contracts",
        data: "contractsTableData",
        columns: "salesTableColumnData",
      },
      {
        label: "ReportsTab",
        tab: "SalesTables",
        select: true,
        tabName: "Reports",
        data: "reportsTableData",
        columns: "salesTableColumnData",
      },
      {
        label: "ApprovalsTab",
        tab: "SalesTables",
        select: true,
        tabName: "Approvals",
        data: "approvalsTableData",
        columns: "salesTableColumnData",
      },
    ],
    salesTableData: null,
    QuotationTabMenuData: [
      {
        label: "Quotation",
        tab: "QuotationTab",
        select: true,
        tabName: "Quotation",
      },
      {
        label: "Contract",
        tab: "ContractTab",
        select: false,
        tabName: "Contract",
      },
    ],
    expressTimeLineTabMenuData: [
      {
        label: "Overview",
        tab: "",
        select: true,
        tabName: "Overview",
      },
      {
        label: "CostCenter",
        tab: "",
        select: false,
        tabName: "Cost Center",
      },
      {
        label: "BillPreferences",
        tab: "",
        select: false,
        tabName: "Bill Preferences",
      },
      {
        label: "FollowUp",
        tab: "",
        select: false,
        tabName: "Follow Up",
      },
      {
        label: "Attachments",
        tab: "",
        select: false,
        tabName: "Attachments",
      },
    ],
    //timeLineData
    defaultExpressTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    expressTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetails",
      },
      {
        index: 2,
        color: "#ffff",
        markerComponent: "TripSchedule",
      },
      {
        index: 3,
        color: "#ffff",
      },
    ],
    expressOveriewData: [
      { header: "Priority", value: "High" },
      { header: "Previously Served By", value: "Jamine" },
      { header: "Referred By", value: "Rider" },
      { header: "Referral Person Name", value: "Natali Trump" },
    ],
    costingDetailsData: [
      { header: "Per Job", value: "$10.00" },
      { header: "Additional Job", value: "$10.00" },
      { header: "No of Jobs", value: "80" },
      { header: "Amount", value: "800.00" },
      { header: "Effective Start Date (Tentative)", value: "21 July 2021" },
      { header: "Charge Min( Min Qty)", value: "80" },
      { header: "Amount", value: "$80" },
    ],
    siteOfficeChargesData: [
      { header: "Charge Per Trip", value: "$6.00" },
      { header: "Return Trip Charge (By Amount)", value: "$4.44" },
      { header: "Head Off Delivery Charges", value: "$4.44" },
    ],
    siteofficeInclusionsData: [
      "Return Trip Chargeable (Per Trip)",
      "Collection Chargable",
      "Head Off Delivery Charges",
      "Head Off Return Trip Waived",
    ],
  },
  mutations: {
    fetchExpressTimeLineData(state, data) {
      state.expressTimeLine.push(data);
    },
    fetchDefaultExpressTimeLineData(state, data) {
      state.expressTimeLine = [];
      state.expressTimeLine = data;
    },
    fetchSalesCompanyData(state, data) {
      state.salesTableData = data;
    },
    fetchContactsStateData(state, data) {
      state.contactsStateData = data;
    },
    fetchQuotationTableData(state, data) {
      state.quotationTableData = data;
    },
    fetchBillingPreferencesData(state, data) {
      state.billingPreferencesData = data;
    },
    fetchAttachmentsTableData(state, data) {
      state.AttachmentTableData = data;
    },
    fetchFollowUp(state, data) {
      for (let f in data) {
        let f_obj = data[f];
        for (let f_keys in f_obj) {
          if (
            f_keys == "called" ||
            f_keys == "call_received" ||
            f_keys == "meeting" ||
            f_keys == "followUp"
          ) {
            if (f_obj[f_keys] == true) {
              f_obj["call_type"] = f_keys;
            }
          }
        }
      }
      state.FollowUpTableData = data;
    },
    fetchCostCentresTableData(state, data) {
      for (let cs in data) {
        let csObj = data[cs];
        let siteOfficeCharges = {};
        siteOfficeCharges["Charge Per Trip"] = csObj["charge_per_trip"];
        siteOfficeCharges["Return Trip Charge (By Amount)"] =
          csObj["return_trip_charge"];
        siteOfficeCharges["Head Off Delivery Charges"] =
          csObj["head_off_delivery_charge"];
        data[cs]["siteOfficeCharges"] = siteOfficeCharges;
        let siteOfficeChargesPreferences = {};
        if (csObj["return_trip_chargable"] == true) {
          siteOfficeChargesPreferences["Return Trip Chargeable (Per Trip)"] =
            csObj["return_trip_chargable"];
        }
        if (csObj["collection_chargable"] == true) {
          siteOfficeChargesPreferences["Collection Chargable"] =
            csObj["collection_chargable"];
        }
        if (csObj["headoff_delivery_charges"] == true) {
          siteOfficeChargesPreferences["Head Off Delivery Charges"] =
            csObj["headoff_delivery_charges"];
        }
        if (csObj["headoff_return_trip_waived"] == true) {
          siteOfficeChargesPreferences["Head Off Return Trip Waived"] =
            csObj["headoff_return_trip_waived"];
        }
        data[cs]["siteOfficeChargesPreferences"] = siteOfficeChargesPreferences;
      }
      if (Array.isArray(data[0]["contact_person"]) == true) {
        state.timeLineExpressCostCenterTableData = data;
      }
    },
  },
  actions: {
    setAuthToken() {
      axios.defaults.headers.common = {
        Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
      };
    },

    resetExpressTimeLineData({ commit }, { data }) {
      commit("fetchDefaultExpressTimeLineData", data);
    },
    updateExpressTimeLineData({ commit }, { data }) {
      commit("fetchExpressTimeLineData", data);
    },

    //SALES COMPANIES API
    loadSalesCompanies({ state, commit }) {
      axios.get("salesCompany?offset=0&limit=0").then((res) => {
        for (let r in res.data.results.rows) {
          let obj = res.data.results.rows[r];
          for (let o in obj) {
            if (o == "createdAt" || o == "updatedAt") {
              if (obj[o] != null) {
                let raw_date = res.data.results.rows[r][o];
                res.data.results.rows[r][o + "raw_date"] = raw_date;
                res.data.results.rows[r][o] = new Date(obj[o]);
              }
            }
          }
        }
        commit("fetchSalesCompanyData", res.data.results.rows);
        state.tableLoad = false;
      });
    },

    //QUOTATION API
    //load quotation api
    //eslint-disable-next-line no-unused-vars
    loadQuotationApi({ state, commit }) {
      axios
        .get("quotation?company_id=" + state.salesCompanyid + "&type=quotation")
        .then((res) => {
          console.log(res);
          let quotationData = [];
          for (let d in res.data.results) {
            let quotationObj = {};
            quotationObj["quotation_id"] = res.data.results[d]["quotation_id"];
            for (let q in res.data.results[d]["quotation_contract_express"]) {
              let qObj = res.data.results[d]["quotation_contract_express"][q];
              for (let qKeys in qObj) {
                quotationObj[qKeys] = qObj[qKeys];
              }
            }
            quotationData.push(quotationObj);
          }
          for (let qd in quotationData) {
            axios
              .get(
                "quotation?quotation_id=" +
                  quotationData[qd]["quotation_id"] +
                  "&type=quotation"
              )
              // eslint-disable-next-line no-unused-vars
              .then((res) => {
                console.log(res, "res");
                quotationData[qd]["revisions"] = [];
                for (let r in res.data.results[0][
                  "quotation_contract_express"
                ]) {
                  let r_array = [];
                  if (
                    res.data.results[0]["quotation_contract_express"][r]
                      .update == "revision"
                  ) {
                    r_array.push(
                      res.data.results[0]["quotation_contract_express"][r]
                    );
                    quotationData[qd]["revisions"].push(r_array);
                  }
                }
              });
          }
          commit("fetchQuotationTableData", quotationData);
          state.tableLoad = false;
        });
    },

    //CONTACTS API
    // eslint-disable-next-line no-unused-vars
    loadContactsApi({ state, commit }, { apiPath }) {
      axios.get("contact/person" + apiPath).then((res) => {
        commit("fetchContactsStateData", res.data.results);
      });
    },

    //TIME LINE APIS
    //Bill Preferences
    // eslint-disable-next-line no-unused-vars
    loadBillPreferences({ commit, state }) {
      state.billingPreferencesData = [];
      state.rawBillingPreferencesData = null;
      axios.get("billPreferences/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          if (res.data.results != null) {
            state.rawBillingPreferencesData = res.data.results;
            let billPreferenceDetails = [];
            let billPreferncesData = res.data.results;
            let billPreferenceDetailsObj = {};
            let invoiceNotificationsObj = {};
            let invoiceAttachmentsObj = {};
            let attachmentFormatsObj = {};
            for (let bp in billPreferncesData) {
              if (bp == "billing_address") {
                billPreferenceDetailsObj[bp] = billPreferncesData[bp];
              }
              if (bp == "email" || bp == "by_sms" || bp == "by_post") {
                if (billPreferncesData[bp] == true) {
                  invoiceNotificationsObj[bp] = billPreferncesData[bp];
                }
              }
              if (
                bp == "costing_work_sheet" ||
                bp == "groupwise_costing_work_sheet" ||
                bp == "for_less_than_min_qty" ||
                bp == "detailed_job_summary" ||
                bp == "groupwise_detailed_job_summary" ||
                bp == "caller_costing_work_sheet" ||
                bp == "job_detail_report"
              ) {
                if (billPreferncesData[bp] == true) {
                  invoiceAttachmentsObj[bp] = billPreferncesData[bp];
                }
              }
              if (
                bp == "rich_text_format" ||
                bp == "microsoft_word" ||
                bp == "excel_file" ||
                bp == "html" ||
                bp == "pdf" ||
                bp == "view_attachment_online"
              ) {
                if (billPreferncesData[bp] == true) {
                  attachmentFormatsObj[bp] = billPreferncesData[bp];
                }
              }
            }
            billPreferenceDetailsObj["invoice_notifications"] = [
              invoiceNotificationsObj,
            ];
            billPreferenceDetailsObj["invoice_attachments"] = [
              invoiceAttachmentsObj,
            ];
            billPreferenceDetailsObj["attachment_formats"] = [
              attachmentFormatsObj,
            ];
            billPreferenceDetails.push(billPreferenceDetailsObj);
            commit("fetchBillingPreferencesData", billPreferenceDetails);
            state.tableLoad = false;
          }
        }
      });
    },
    //attachments
    // eslint-disable-next-line no-unused-vars
    loadAttachments({ dispatch, commit, state, rootState }) {
      // eslint-disable-next-line no-unused-vars
      axios.get("attachment/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          commit("fetchAttachmentsTableData", res.data.results);
          rootState["users"].displayDialog = false;
          state.tableLoad = false;
        }
      });
    },
    //followUp
    // eslint-disable-next-line no-unused-vars
    loadFollowUp({ dispatch, commit, state, rootState }) {
      // eslint-disable-next-line no-unused-vars
      axios.get("followUp/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          console.log(res);
          commit("fetchFollowUp", res.data.results);
          rootState["users"].displayDialog = false;
          state.tableLoad = false;
        }
      });
    },
    //Cost Centers
    // eslint-disable-next-line no-unused-vars
    loadCostCentres({ dispatch, commit, state }) {
      // eslint-disable-next-line no-unused-vars
      axios.get("costCentre/" + state.salesQuotationId).then((res) => {
        if (res.status == 200) {
          for (let cs in res.data.results) {
            let apiPath;
            apiPath = "?type=cost_centre&type_id=" + res.data.results[cs].id;
            axios.get("contact/person" + apiPath).then((contacts_res) => {
              res.data.results[cs]["contact_person"] =
                contacts_res.data.results;
            });
          }
          setTimeout(() => {
            commit("fetchCostCentresTableData", res.data.results);
            state.tableLoad = false;
          }, 1000);
        }
      });
    },

    //CONTACTS CRUD
    // eslint-disable-next-line no-unused-vars
    contactsCRUD({ state, commit, dispatch, rootState }, { tag, data, id }) {
      //adding new data to the data-base using the axios POST method
      if (tag == "add") {
        axios
          .post("contact/person/", data)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {});
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        axios
          .put("contact/person/" + id, data)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {});
      }
    },

    //SALES COMPANIES CRUD
    salesCompaniesCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "salesCompany/",
          loadApi: "loadSalesCompanies",
          toastTag: "sales",
          tag: tag,
          data: data,
        });
      }
      if (
        tag == "update" ||
        tag == "delete/" ||
        tag == "retrive/" ||
        tag == "modifystatus/"
      ) {
        dispatch("commonCRUD", {
          basePath: "salesCompany/",
          loadApi: "loadSalesCompanies",
          toastTag: "sales",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },

    //QUOTATIONS CRUD
    //Express
    expressQuotationCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "quotation/express",
          loadApi: "loadQuotationApi",
          toastTag: "quotation",
          tag: tag,
          data: data,
        });
      }
      if (tag == "update") {
        dispatch("commonCRUD", {
          basePath: "quotation/express/",
          loadApi: "loadQuotationApi",
          toastTag: "quotation",
          tag: tag,
          data: data,
          id_key: "id_key",
        });
      }
    },

    //TIME LINE CRUDS
    //bill preferences
    billPreferencesCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "billPreferences",
          loadApi: "loadBillPreferences",
          toastTag: "billPreference",
          tag: tag,
          data: data,
        });
      }
      if (tag == "update") {
        dispatch("commonCRUD", {
          basePath: "billPreferences/",
          loadApi: "loadBillPreferences",
          toastTag: "billPreference",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },
    //cost centers
    costCentresCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "costCentre",
          loadApi: "loadCostCentres",
          toastTag: "costCenter",
          tag: tag,
          data: data,
        });
      }
      if (tag == "update") {
        dispatch("commonCRUD", {
          basePath: "costCentre/",
          loadApi: "loadCostCentres",
          toastTag: "costCenter",
          tag: tag,
          data: data,
          id_key: "id",
        });
      }
    },
    //attachments
    AttachmentsCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "attachment/",
          loadApi: "loadAttachments",
          toastTag: "attachments",
          tag: tag,
          data: data,
        });
      }
      // if (tag == "update") {
      //   dispatch("commonCRUD", {
      //     basePath: "costCentre/",
      //     loadApi: "loadCostCentres",
      //     toastTag: "costCenter",
      //     tag: tag,
      //     data: data,
      //     id_key: "id",
      //   });
      // }
    },
    //FollowUpCRUD
    FollowUpCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "followUp/",
          loadApi: "loadFollowUp",
          toastTag: "followUp",
          tag: tag,
          data: data,
        });
      }
      // if (tag == "update") {
      //   dispatch("commonCRUD", {
      //     basePath: "costCentre/",
      //     loadApi: "loadCostCentres",
      //     toastTag: "costCenter",
      //     tag: tag,
      //     data: data,
      //     id_key: "id",
      //   });
      // }
    },

    //COMMON CRUD FUNCTION
    commonCRUD(
      { state, commit, dispatch, rootState },
      { basePath, loadApi, toastTag, tag, data, id_key }
    ) {
      if (tag == "add") {
        //adding new data to the data-base using the axios POST method
        axios.post(basePath, data).then((res) => {
          if (res.status == 200) {
            state.tableLoad = true;
            dispatch(loadApi);
            rootState["users"].displayDialog = false;
            commit(
              "users/showToast",
              ["success", data, "was added", toastTag],
              {
                root: true,
              }
            );
          }
        });
      }
      if (
        tag == "retrive/" ||
        tag == "modifyStatus/" ||
        tag == "modifystatus/"
      ) {
        let mssg;
        if (tag == "modifyStatus/") {
          if (data.status == "Active") {
            mssg = "was deactivated! ";
          }
          if (data.status == "Inactive") {
            mssg = "was activated!";
          }
        }
        //retrieving a deleted data from the data-base using the axios PATCH method
        //disabling an existing data from the data-base using the axios PATCH method
        axios
          .patch(basePath + tag + data[id_key])
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            if (res.status == 200) {
              state.tableLoad = true;
              dispatch(loadApi);
              commit("users/showToast", ["info", data, mssg, toastTag], {
                root: true,
              });
            }
          });
      }
      if (tag == "delete") {
        //deleting an existing data in the data-base using the axios DELETE method
        axios.delete(basePath + data[id_key]).then((res) => {
          if (res.status == 200) {
            state.tableLoad = true;
            dispatch(loadApi);
            commit("users/showToast", ["info", data, "was deleted", toastTag], {
              root: true,
            });
          }
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        axios.put(basePath + data[id_key], data).then((res) => {
          if (res.data.status == 200) {
            state.tableLoad = true;
            dispatch(loadApi);
            rootState["users"].displayDialog = false;
            commit("users/showToast", ["info", data, "was edited", toastTag], {
              root: true,
            });
          }
        });
      }
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};

export default sales;
