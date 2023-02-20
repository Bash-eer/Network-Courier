import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
// function getSNO(data) {
//   for (let d in data) {
//     data[d]["sno"] = parseInt(d) + 1;
//   }
//   return data;
// }
const rapidoAdhoc = {
  namespaced: true,
  state: {
    renderKey: 10,
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    stepperNavigation: null,
    rapdio_adhoc_page_header: null,
    //adhoc zone
    //dropdown data
    zoneRangeEditDialogData: {},
    zoneRangeDropDownData: [],
    rapidoAdhocAddNewIsDefault: false,
    addZoneTableData: [],
    rapidoAdhocTableData: [],
    rapidoAdhocAddNewRateCardName: "",
    adhocTableRowRateCardIsDefault: "",
    adhocZoneTableData: [],
    addAdditionalSurchargeData: null,
    addSurchargeData: null,
    addOnDemandServiceData: null,
    addEcommerceData: null,
    addRapidoAdhocDeliveryTypeRate: null,
    addZonalRatesValidation: false,
    addZonalRatesSubmission: false,
    adhocZonesTableData: [],
    adhocTableData: [],
    rapidoAdhocAddNewData: {},
    addRateCardNameError: null,
    rapidoAdhocEditTableData: [],
    adhocSubTableData: [],
    rapidoAdhocEcommerceType: null,
    //adhoc zones data
    triggerThirdPageLoad: false,

    addZoneValue: null,
    rapidoAdhocRateCardData: [],
    cloneZoneRangeData: null,
    // addZoneError: null,
    //adhoc main table
    adhocTableRowRateCardName: null,
    adhocTableRowRateCardId: null,
    //duo selection
    transportType: null,
    zonalRatesDuoType: null,
    adhocEcommerceData: [],
    rapidoAdhocSubTableData: [],
    rapidoAdhocSubTabsType: "samedaydelivery",
    rapidoAdhocRateCardZoneSurchargeTableData: [],
    rapidoAdhocRateCardZoneOnDemandServiceTableData: [],
    rapidoAdhocRateCardZoneAdditionalSurchargeTableData: [],
    rapidoAdhocRateCardZoneECommerceTableData: [],
    adhocRatesSecondPageTableData: [],
    additionalSurchargesFormStateData: [],
    RapidoAdhocSurchargesTableData: [],
    RapidoAdhocAdditionalSurchargesTableData: [],
    RapidoAdhocOnDemandServiceTableData: [],
    EcommerceDataRapido: [],
    RapidoAdhocEcommerceTableData: [],
    normalRatesTransportType: null,
    eCommerceRatesTransportType: null,
    addZoneData: {},
    addZoneFormStateData: {},
    zonesAdhocFormStateData: {},
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },

    adhocRatesTableData: [
      {
        id: "7",
        actions: "",
        s_no: "1",
        zone_range: "Zone A - Zone B",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
      {
        id: "9",
        actions: "",
        s_no: "2",
        zone_range: "Zone B - Zone C",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    AdhocRateZoneOnDemandServiceTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        weight_range: "0-5",
        van_job_min: "10",
        van_job_add: "10",
        max_kilometer: "10",
        van_job_add_km: "10",
        van_job_urgent: "10",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    AdhocRateZoneSDDTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        Delivery_Type: "Same Day Delivery",
        Cutoff_Time: "10.00",
        Cutoff_Days: "1",
        Rate: "10",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    AdhocRateZoneNDDTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        Delivery_Type: "Same Day Delivery",
        Cutoff_Time: "10.00",
        Cutoff_Days: "1",
        Rate: "10",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    AdhocRateZoneSurchargesTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        cod_fee_dollar: "50",
        cod_fee_percentage: "1",
        standard_liability: "100",
        Timeslot_delivery: "100",
        timeslot_hours: "2",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    AdhocRateZoneAdditionalSurchargesTableData: [
      {
        id: 1,
        actions: "",
        s_no: "1",
        additional_rate: "FTZ",
        rate: "10.00",
        createdAt: "2022-02-04T10:46:28.915Z",
        created_by: "Gianna",
      },
    ],
    RapidoAdhocEcommerceTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "delivery_type", header: "Delivery Type" },
      { field: "cut_off_time", header: "Cutoff Time" },
      { field: "cut_off_days_count", header: "Cutoff Days" },
      { field: "rate", header: "Rate $" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    RapidoAdhocEcommerceSubTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "min_weight", header: "Weight (Kg)" },
      { field: "unit_rate", header: "Rate (S$)" },
    ],
  },

  mutations: {
    //add Zone Zone value
    addZoneValueMutation(state, data) {
      state.addZoneValue = data;
    },
    fetchZonesData(state, data) {
      state.adhocZonesTableData = data;
    },
    fetchAdhocData(state, data) {
      state.adhocTableData = data;
    },
    fetchAdhocSubData(state, data) {
      state.adhocSubTableData = data;
    },
    fetchAdhocZoneTableData(state, data) {
      state.adhocZoneTableData = data;
    },
    fetchAdhocSubTableData(state, data) {
      state.rapidoAdhocSubTableData = data;
    },
    addRateCardNameMutation(state, data) {
      state.rapidoAdhocAddNewRateCardName = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    addZonalRatesValidationMutation(state, bool) {
      state.addZonalRatesValidation = bool;
    },
    addZonalRatesSubmissionMutation(state, bool) {
      state.addZonalRatesSubmission = bool;
    },
    fetchadhocRatesSecondPageTableData(state, data) {
      state.adhocRatesSecondPageTableData = data;
    },
    //ADHOC MAIN TABLE
    adhocTableRowRateCardNameMutation(state, rate_card_name) {
      state.adhocTableRowRateCardName = rate_card_name;
    },
    adhocTableRowRateCardIsDefaultMutation(state, isDefault) {
      state.adhocTableRowRateCardIsDefault = isDefault;
    },
    //edit zone range dialog
    zoneRangeEditDialogDataMutation(state, data) {
      state.zoneRangeEditDialogData = data;
    },
    addRateCardNameErrorMutation(state, error) {
      state.addRateCardNameError = error;
    },
    //ADHOC MAIN TABLE
    adhocTableRowRateCardIdMutation(state, rate_card_row_id) {
      state.adhocTableRowRateCardId = rate_card_row_id;
    },
    //adhoc clone zone range
    adhocCloneZoneRangeDataMutation(state, rowData) {
      state.cloneZoneRangeData = rowData;
    },
    // fetchRapidoAdhocRateCardZoneData(state, data) {
    //   const {type, tableData} = data;
    //   for (let i = 0; i < tableData.length; i++) {
    //     let r_obj = tableData[i];
    //     r_obj["sno"] = parseInt(i) + 1;
    //   }
    //   console.log(tableData);
    //   switch (type) {
    //     case "e_commerce":
    //       state.rapidoAdhocRateCardZoneECommerceTableData = tableData;
    //       break;
    //     case "on_demand_services":
    //       state.rapidoAdhocRateCardZoneOnDemandServiceTableData = tableData;
    //       break;
    //     case "surcharges":
    //       state.rapidoAdhocRateCardZoneSurchargeTableData = tableData;
    //       break;
    //     case "additional_surcharges":
    //       state.rapidoAdhocRateCardZoneAdditionalSurchargeTableData = tableData;
    //       break;
    //   }
    // },
    //DUO SELECTION
    //TRANSPORT TYPE (BIKE/VAN)
    transportTypeMutation(state, type) {
      state.transportType = type;
    },
    zonalRatesMutation(state, type) {
      state.zonalRatesDuoType = type;
    },
    normalRatesTransportTypeMutation(state, type) {
      state.normalRatesTransportType = type;
    },
    eCommerceRatesTransportTypeMutation(state, type) {
      state.eCommerceRatesTransportType = type;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchAdhocEcommerceData(state, data) {
      state.adhocEcommerceData = data;
    },
    fetchRapidoAdhocSurchargesTableData(state, data) {
      state.RapidoAdhocSurchargesTableData = data;
    },
    fetchRapidoAdhocAdditionalSurchargesTableData(state, data) {
      state.RapidoAdhocAdditionalSurchargesTableData = data;
    },
    fetchRapidoAdhocOnDemandServiceTableData(state, data) {
      state.RapidoAdhocOnDemandServiceTableData = data;
    },
    fetchRapidoAdhocEcommerceTableData(state, data) {
      console.log(data);
      state.RapidoAdhocEcommerceTableData = data;
    },
    //DROPDOWN
    zoneRangeDropDownDataMutation(state, data) {
      state.zoneRangeDropDownData = data;
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    adhocTableHeaderMutation(state, type) {
      state.rapdio_adhoc_page_header = type;
    },
    setAdhocZonesFormStateDataMutation(state, data) {
      state.addZoneFormStateData = data;
    },
    setAdditionalSurchargesFormStateDataMutation(state, data) {
      state.additionalSurchargesFormStateData = data;
    },
    fetchAdhocTableData(state, data) {
      state.rapidoAdhocTableData = data;
    },
    fetchAdhocEditTableData(state, data) {
      state.rapidoAdhocEditTableData = data;
    },
    triggerThirdPageLoadMutation(state) {
      state.triggerThirdPageLoad = !state.triggerThirdPageLoad;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },

    fetchCreateQuotationRapidoAdhoc(state, data) {
      state.RapidoAdhoc = data;
    },
    fetchLoadAdhocDialogEcommerce(state, data) {
      state.inspectionsDropDownTableDataOne = data;
    },
  },
  actions: {
    setAddZoneValue({ commit }, { data }) {
      commit("addZoneValueMutation", data);
    },
    setAdhocZonesFormStateData({ commit }, { data }) {
      commit("setAdhocZonesFormStateDataMutation", data);
    },
    setAddZonalRatesValidation({ commit }, { bool }) {
      commit("addZonalRatesValidationMutation", bool);
    },
    //zone range edit dialog data
    setZoneRangeEditDialogData({ commit }, { data }) {
      commit("zoneRangeEditDialogDataMutation", data);
    },
    //DROPDOWN
    setZoneRangeDropDownData({ commit }, { data }) {
      let dropDownData = [];
      console.log(data);
      for (let d in data) {
        let obj = {};
        obj["name"] = data[d];
        obj["code"] = d;
        dropDownData.push(obj);
      }
      commit("zoneRangeDropDownDataMutation", dropDownData);
    },
    setAdhocTableRowRateCardName({ commit }, { rate_card_name }) {
      commit("adhocTableRowRateCardNameMutation", rate_card_name);
    },
    //DUO SELECTION
    //TRANSPORT TYPE (BIKE/VAN)
    setTransportType({ commit }, { type }) {
      commit("transportTypeMutation", type);
    },
    setZonalRates({ commit }, { type }) {
      commit("zonalRatesMutation", type);
    },
    setAddRateCardName({ commit }, { data }) {
      commit("addRateCardNameMutation", data);
    },
    setRateCardNameError({ commit }, { error }) {
      commit("addRateCardNameErrorMutation", error);
    },
    setNormalRatesTransport({ commit }, { type }) {
      commit("normalRatesTransportTypeMutation", type);
    },
    setECommerceRatesTransport({ commit }, { type }) {
      commit("eCommerceRatesTransportTypeMutation", type);
    },
    setAdditionalSurchargesFormStateData({ commit }, { data }) {
      commit("setAdditionalSurchargesFormStateDataMutation", data);
    },
    //ADHOC MAIN TABLE
    setAdhocTableRowRateCardId({ commit }, { rate_card_row_id }) {
      commit("adhocTableRowRateCardIdMutation", rate_card_row_id);
    },
    //DIALOGS
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },

    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    setAdhocTableHeader({ commit }, { type }) {
      commit("adhocTableHeaderMutation", type);
    },
    //ADHOC CLONE ZONE RANGE DATA
    setCloneZoneRangeData({ commit }, { rowData }) {
      commit("adhocCloneZoneRangeDataMutation", rowData);
    },
    setAddZonalRatesSubmission({ commit }, { bool }) {
      commit("addZonalRatesSubmissionMutation", bool);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },

    //create Quotation Rapdio Adhoc
    createQuotationRapidoAdhoc({ commit }, { data }) {
      commit("fetchcreateQuotationRapidoAdhoc", data);
    },

    loadAdhocDialogEcommerce({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          for (let i = 0; i < res.data?.results?.length; i++) {
            let r_obj = res?.data?.results[i];

            r_obj["sno"] = i + 1;
          }

          console.log(res?.data?.results);
          commit(mutation, res?.data?.results);
        }
      });
    },
    loadAdhocZonesData({ commit }, { path }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];
          r_obj["sno"] = i + 1;
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];
        }
        //process data
        commit("fetchZonesData", res.data.results);
      });
    },
    //GET API-ZONE
    loadAdhocTableData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];
            res.data.results[c]["createdAt"] = new Date(res.data.results[c]['createdAt']);
        }
        commit(mutation, res.data.results);
      });
    },
    loadEditAdhocTableData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        console.log(res.data.results);
        commit(mutation, res.data.results);
      });
    },
    loadAdhocSubTableData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];
        }
        commit(mutation, res.data.results);
      });
    },
    async loadAdhocSecondPageData({ commit }, { path, mutation }) {
      await axios.get(path).then((res) => {
        commit(
          "adhocTableRowRateCardNameMutation",
          res.data.results.rate_card_name
        );
        commit(
          "adhocTableRowRateCardIsDefaultMutation",
          res.data.results.default
        );
        for (let i = 0; i < res.data.results.zones.length; i++) {
          let r_obj = res.data.results.zones[i];
          r_obj["sno"] = i + 1;
        }
        //proc
        for (let c in res.data.results.zones) {
          res.data.results.zones[c]["created_by"] =
            res.data.results.zones[c]["user"]["display_name"];
          let r_obj = res.data.results.zones[c];
          r_obj["zones"] =
            res.data.results.zones[c]["zone_from"]["zone_name"] +
            "-" +
            res.data.results.zones[c]["zone_to"]["zone_name"];
        }

        commit(mutation, res.data.results.zones);
      });
    },
    async getRapidoAdhocThirdPageDetails(_, { id, type }) {
      return await axios.get(
        `/settings/sales/rates/rapido/adhoc/ratecards/zone/${id}?chargeType=${type}`
      );
    },
    loadRapidoAdhocThirdPageData({ commit }, { path }) {
      console.log(path);
      axios.get(path).then((res) => {
        if (res.data.results) {
          if (res.data.results.charge_type[0]) {
            let onDemandServiceArray =
              res.data.results.charge_type[0].on_demand_services;

            for (let c in onDemandServiceArray) {
              onDemandServiceArray[c]["created_by"] =
                onDemandServiceArray[c]["user"]["display_name"];
            }
            for (let i = 0; i < onDemandServiceArray.length; i++) {
              let r_obj = onDemandServiceArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchRapidoAdhocOnDemandServiceTableData",
              res.data.results.charge_type[0].on_demand_services
            );
          }
          if (res.data.results.charge_type[1]) {
            let eCommerceArray = res.data.results.charge_type[1].e_commerce;
            console.log(eCommerceArray);
            for (let c in eCommerceArray) {
              eCommerceArray[c]["created_by"] =
                eCommerceArray[c]["user"]["display_name"];
            }
            for (let i = 0; i < eCommerceArray.length; i++) {
              let r_obj = eCommerceArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchRapidoAdhocEcommerceTableData",
              res.data.results.charge_type[1].e_commerce
            );
          }
          if (res.data.results.charge_type[2]) {
            let surchargeArray = res.data.results.charge_type[2].surcharges;

            for (let c in surchargeArray) {
              surchargeArray[c]["created_by"] =
                surchargeArray[c]["user"]["display_name"];
            }
            for (let i = 0; i < surchargeArray.length; i++) {
              let r_obj = surchargeArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchRapidoAdhocSurchargesTableData",
              res.data.results.charge_type[2].surcharges
            );
          }
          if (res.data.results.charge_type[3]) {
            let additionalSurchargeArray =
              res.data.results.charge_type[3].additional_surcharges;
            for (let c in additionalSurchargeArray) {
              additionalSurchargeArray[c]["created_by"] =
                additionalSurchargeArray[c]["user"]["display_name"];
            }
            for (let i = 0; i < additionalSurchargeArray.length; i++) {
              let r_obj = additionalSurchargeArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchRapidoAdhocAdditionalSurchargesTableData",
              res.data.results.charge_type[3].additional_surcharges
            );
          }
        }
      });
    },
    loadAdhocZoneData({ commit }, { path }) {
      axios.get(path).then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.results.zones.length; i++) {
          let r_obj = res.data.results.zones[i];
          r_obj["sno"] = i + 1;
        }
        //process data
        commit("fetchAdhocZoneTableData", res.data.results.zones);
      });
    },
    //delete
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData, triggered }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit("toastMutation", toastData.toastSuccessData);
            if (triggered) {
              commit("triggerThirdPageLoadMutation");
            } else {
              dispatch(loadData.loadApi, {
                path: loadData.loadPath,
                mutation: loadData.loadMutation,
              });
            }
          }
        })
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err.response.data.message;
          commit("toastMutation", toastData.toastErrorData);
        });
    },
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData, triggered }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          if (triggered) {
            commit("triggerThirdPageLoadMutation");
          } else {
            dispatch(loadData.loadApi, {
              path: loadData.loadPath,
              mutation: loadData.loadMutation,
            });
          }
          commit("toastMutation", toastData.toastSuccessData);

          dispatch("closeDialog");
        })
        // .catch((err) => {
        //   if (err.response.status) {
        //     if (err.response.status == 409) {
        //       commit("toastMutation", toastData.toastDuplicateErrorData);
        //     } else {
        //       commit("toastMutation", toastData.toastCommonErrorData);
        //     }
        //   } else {
        //     commit("toastMutation", toastData.toastCommonErrorData);
        //   }
        // });
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },
  },

  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    rapidoAdhocEditTableData: ({ rapidoAdhocEditTableData }) =>
      rapidoAdhocEditTableData,
    rapidoAdhocTableData: ({ rapidoAdhocTableData }) => rapidoAdhocTableData,
    adhocRatesSecondPageTableData: ({ adhocRatesSecondPageTableData }) =>
      adhocRatesSecondPageTableData,
  },
};
export default rapidoAdhoc;
