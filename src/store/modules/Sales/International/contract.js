import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesInternationalContract = {
  namespaced: true,

  state: {
    currentStep: 1,
    expressTimeLineCurrentTab: "Overview",
    rawBillingPreferencesData: null,
    selectedContacts: [],
    billingPreferencesData: [],
    addClearanceChargesType: null,
    addCODChargesType: null,
    addDeliveryChargesType: null,
    eCommerceVanDuoType: null,
    dropDownData: [],
    quotationOverlayData: [{ label: "Edit", icon: "fas fa-pen" }],
    dialogComponent: null,
    dialogHeader: null,
    StepperIdData: "SalesInternationalContractFirstStep",
    profileCreationData: [],
    CreateQuotationContractData: {},
    SalesPersonData: [],
    dropReferenceDownData: [],
    dropCompetitorDownData: [],
    dropFestivalDownData: [],
    InternationalRowData: [],
    //attachment
    InternationalContractQuotationFiles: [],
    deletedInternationalContractQuotationFiles: [],
    internationalContractAttachmentsStateData: {},

    SalesPersonDataPatch: null,
    SalesPersonDataTimeLineHeader: {},
    SalesPersonDataDropdown: {},
    internationalContractOverviewData: [],
    // SalesPersonDataCostCenterGet: null,
    commonAttachmentStateData: {},
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },

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

    //table datas
    internationalRegionsTripTableData: null,
    sendQuatitionTableDataColumns: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile" },
    ],
    internationalRegionsTripTableColumnData: [
      { field: "trip_no", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "day", header: "Trip Days" },
      { field: "type", header: "Trip Type" },
    ],

    timeLineInternationalCostCenterTableData: [
      {
        trip_schedule: [
          {
            id: "1",
            trip_no: 1,
            from: "1970-01-01T14:46:00.000Z",
            to: "1970-01-01T15:46:00.000Z",
            day: "Weekdays",
            type: "Open",
            fromraw_time: "1970-01-01T14:46:00.000Z",
            toraw_time: "1970-01-01T15:46:00.000Z",
          },
        ],
        id: "2",
        cost_centre_name: "Cost Center Two",
        postal_code: "1",
        country: "C1",
        state: "C1",
        building_name: "test9",
        floor_no: "",
        unit_no: "56",
        address: "NC TOWers",
        site_office: true,
        region: null,
        route: null,
        charge_per_trip: null,
        head_off_delivery_charge: 1,
        return_trip_charge: 2,
        return_trip_chargable: true,
        collection_chargable: true,
        headoff_delivery_charges: false,
        headoff_return_trip_waived: false,
        quotation_id: "1",
        contact_person: [
          {
            id: "6",
            profile_url: null,
            person_name: "Josh",
            profile: null,
            email: "josh@nc.com",
            contact_no: "11",
            designation: "admin",
            type: "cost_centre",
            type_id: "2",
          },
        ],
        siteOfficeCharges: {
          "Charge Per Trip": null,
          "Return Trip Charge (By Amount)": 2,
          "Head Off Delivery Charges": 1,
        },
        siteOfficeChargesPreferences: {
          "Return Trip Chargeable (Per Trip)": true,
          "Collection Chargable": true,
        },
      },
      //
    ],

    defaultInternationalContractTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    InternationalContractTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "CostingDetail",
      },
      {
        index: 2,
        color: "#ffff",
        markerComponent: "TripSchedules",
      },
      {
        index: 3,
        color: "#ffff",
        markerComponent: "BillSettings",
      },
      {
        index: 4,
        color: "#ffff",
      },
    ],
  },
  mutations: {
    setSelectedContacts(state, payload) {
      state.selectedContacts = payload;
    },
    fetchInternationalContractTimeLineData(state, data) {
      state.InternationalContractTimeLine.push(data);
    },
    fetchDefaultInternationalContractTimeLineData(state, data) {
      state.InternationalContractTimeLine = [];
      state.InternationalContractTimeLine = data;
    },
    fetchBillingPreferencesData(state, data) {
      state.billingPreferencesData = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchInternationalContractOverviewData(state, data) {
      state.internationalContractOverviewData = data;
    },
    fetchtimeLineInternationalCostCenterTableData(state, data) {
      state.timeLineInternationalCostCenterTableData = data;
    },
    fetchDropDown(state, data) {
      console.log(data);
      state.dropDownData = data;
    },
    fetchFestivalDropDown(state, data) {
      state.dropFestivalDownData = data;
    },
    fetchCompetitorDropDown(state, data) {
      state.dropCompetitorDownData = data;
    },
    fetchReferenceDropDown(state, data) {
      state.dropReferenceDownData = data;
    },
    fetchProfileCreationData(state, data) {
      state.profileCreationData = data;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },
    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },
    fetchSalesPersonDataTimeLineHeader(state, data) {
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.SalesPersonDataDropdown = data;
    },
    fetchRowData(state, data) {
      state.InternationalRowData = data;
    },
    resetDialogData(state) {
      state.currentStep = 1;
      // state.CreateQuotationContractData = null;
    },
    // fetchSalesPersonDataCostCenterGet(state, data) {
    //   state.SalesPersonDataCostCenterGet = data;
    // },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    setCurrentStep(state, payload) {
      state.currentStep = payload;
    },
  },
  actions: {
    setSelectedContacts({ commit }, payload) {
      commit("setSelectedContacts", payload);
    },
    resetInternationalContractTimeLineData({ commit }, { data }) {
      commit("fetchDefaultInternationalContractTimeLineData", data);
    },
    updateInternationalContractTimeLineData({ commit }, { data }) {
      commit("fetchInternationalContractTimeLineData", data);
    },

    resetDialogData({ commit }) {
      commit("resetDialogData");
    },
    openDialog({ commit }, { dialogDetails }) {
      console.log("openDialog", dialogDetails);
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    async loadInternationalContractOverviewData({ commit }, { id, type }) {
      let processedType;
      console.log(type, "////////////////////////////////////");
      if (type == "quotation") {
        processedType = "quotations";
      }
      if (type == "contract") {
        processedType = "contract";
      } else processedType = "quotations";
      console.log(type, "I am working here");
      await axios
        .get("/sales/" + processedType + "/overview/" + id)
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "resultOverview");
            commit("fetchInternationalContractOverviewData", res.data.results);
          }
        });
    },
    loadSalesPersonDataTimeLineHeader({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },
    loadSalesPersonDataDropdown({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchloadSalesPersonDataDropdown", res?.data?.results);
        }
      });
    },
    async loadtimeLineInternationalCostCenterTableData({ commit }, { id }) {
      await axios
        .get("/sales/quotation/cost-centers/international/" + id)
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "resultCC");
            let resultRows = res.data.results;
            // for (let c in resultRows) {
            //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            // }
            for (let i = 0; i < resultRows.length; i++) {
              let r_obj = resultRows[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchtimeLineInternationalCostCenterTableData",
              res.data.results
            );
          }
        });
    },
    setCurrentStep({ commit }, payload) {
      commit("setCurrentStep", payload);
    },
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          // dispatch(loadData);
          console.log("loaddata", loadData);
          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },
    SENDCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          // dispatch(loadData);
          console.log("loaddata", loadData);

          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },
    getProfileCreationData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchProfileCreationData", res.data.results);
        }
      });
    },
    loadSalesPersonData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchSalesPersonData", res.data.results);
        }
      });
    },
    loadDropdown({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchDropDown", res.data.results);
        }
      });
    },
    loadFestivalDropdown({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchFestivalDropDown", res.data.results);
        }
      });
    },
    loadCompetitorDropdown({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchCompetitorDropDown", res.data.results);
        }
      });
    },
    loadReferenceDropdown({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchReferenceDropDown", res.data.results);
        }
      });
    },

    loadRowData({ commit, dispatch }, { path }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          dispatch(
            "salesSales/openDialog",
            {
              dialogDetails: {
                dialogName: "InternationalContractQuotationDialog",
                dialogHeader: "Quotation",
              },
            },
            {
              root: true,
            }
          );
          commit("fetchRowData", res?.data?.results);
        }
      });
    },
    // loadSalesPersonDataCostCenterGet({commit}, {path, id}){
    //   axios.get(path + id).then((res) => {
    //     if (res?.data?.results) {
    //       console.log("fetchSalesPersonDataCostCenterGet", res.data.results)
    //       commit("fetchSalesPersonDataCostCenterGet", res.data.results);
    //     }
    //   });
    // },

    // POSTPATCHCRUDOPERATION(
    //   {dispatch, commit},
    //   {path, method, data, loadData, toastData}
    // ) {
    //   axios({
    //     url: path,
    //     method: method,
    //     data: data,
    //   })
    //     .then(() => {
    //       dispatch("closeDialog");
    //       dispatch(loadData);
    //       commit("toastMutation", toastData.toastSuccessData);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toastData.toastCommonErrorData.toastMsg = err.response.data.message;
    //       commit("toastMutation", toastData.toastCommonErrorData);
    //       // }
    //     });
    // },

    loadSalesPersonDataPatch({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        commit("fetchSalesPersonDataPatch", res.data);
      });
    },

    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      console.log("delete", path);
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit("toastMutation", toastData.toastSuccessData);

            dispatch(loadData);
          }
        })
        .catch(() => {
          commit("toastMutation", toastData.toastErrorData);
        });
    },
  },
  getters: {
    internationalContractAttachmentsStateData: ({
      internationalContractAttachmentsStateData,
    }) => internationalContractAttachmentsStateData,

    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    currentStep: ({ currentStep }) => currentStep,
    profileCreationData: ({ profileCreationData }) => profileCreationData,
    selectedContacts: ({ selectedContacts }) => selectedContacts,

    internationalContractOverviewData: ({
      internationalContractOverviewData,
    }) => internationalContractOverviewData,
  },
};
export default salesInternationalContract;
