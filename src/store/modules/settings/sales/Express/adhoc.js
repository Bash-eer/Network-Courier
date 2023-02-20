import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const expressAdhoc = {
  namespaced: true,
  state: {
    //form
    addZonalRatesValidation: false,
    addZonalRatesSubmission: false,

    //dialog
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,

    //stepper
    stepperNavigation: "AddZone",

    //dropdown data
    zoneRangeDropDownData: [],
    //adhoc main table
    adhocTableRowRateCardName: null,
    adhocTableRowRateCardIsDefault: null,
    cloneZoneRangeData: null,
    adhocTableRowRateCardId: null,
    //duo selection
    transportType: null,
    zonalRatesDuoType: null,
    normalRatesTransportType: null,
    eCommerceRatesTransportType: null,
    //express adhoc add new data
    expressAdhocAddNewData: {},
    expressAdhocAddNewRateCardName: "",
    expressAdhocAddNewIsDefault: false,
    //adhoc zones data
    addZoneValue: null,
    addZoneError: null,
    addZoneData: {},
    addZoneDeliveryData: [],
    addZoneFormStateData: {},
    //edit zone range dialog data
    zoneRangeEditDialogData: {},
    addZoneBikeDeliveryData: [],
    addZoneVanDeliveryData: [],
    TabChangeValue: "EcomBike",
    addAdditionalSurchargeData: null,
    addSurchargeData: null,
    addZoneBikeTableRows: 0,
    addZoneVanTableRows: null,
    addZoneDeliveryTransportType: null,
    addRateCardNameError: null,
    editEcommerceVanData: {},
    editEcommerceBikeData: {},

    //third page
    triggerThirdPageLoad: false,
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },

    //toggleData
    toggleData: [{ type: "" }],

    ExpressAdhoc: null,

    expressAdhocRatesStatusDropdownData: [
      { name: "Inactive", code: "1" },
      { name: "Active", code: "2" },
    ],

    ContactManagamentInviteesTableDatas: [
      {
        id: 90,
        cod_fee: "fefe",
        sno: "2",
      },
    ],
    ContactManagamentInviteesTableData: [
      {
        id: 90,
        cod_fee: "fefe",
        sno: "2",
      },
    ],
    AdhocRatesOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Clone",
        icon: "far fa-copy",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    ThirdPageDymaniTabTableOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Clone",
        icon: "far fa-copy",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    inspectionsDropDownTableDataColumns: [
      { field: "delivery_type", header: "service" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cut-Off Time" },
      { field: "cut_off_days_count", header: "Cut-Off Days" },
      { field: "rate", header: "Net Charges" },
    ],

    inspectionsDropDownTableDataColumnsOne: [
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cut-Off Time" },
      { field: "cut_off_days_count", header: "Cut-Off Days" },
      { field: "rate", header: "Net Charges" },
    ],

    ExpressAdhocNormalBikeTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "min_charge_per_job", header: "Min Charge Per Job" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocNormalVanTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "van_job_min_cost", header: "Van Job Min Cost $" },
      { field: "maximun_weight", header: "Max Weight (Kg)" },
      { field: "van_job_additional_cost", header: "Van Job Add Cost $" },
      { field: "van_job_additional_weight", header: "Van Job Add Weight (Kg)" },
      { field: "van_job_urgent_surcharges", header: "Van Job Urgent  $" },
      // { field: "", header: "Normal Transit (Hr) " },
      // { field: "", header: "Urgent Transit (Hr) " },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocEcomBikeTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cutoff Time" },
      { field: "cut_off_days_count", header: "Cutoff Days" },
      { field: "rate", header: "Rate $" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocEcomVanTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "delivery_type", header: "Delivery Type" },
      { field: "collect_time", header: "Collection Time" },
      { field: "cut_off_time", header: "Cutoff Time" },
      { field: "cut_off_days_count", header: "Cutoff Days" },
      // { field: "", header: "Van Job Urgent Surcharge $" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocEcomVanSubTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "min_weight", header: "Weight (Kg)" },
      { field: "unit_rate", header: "Rate (S$)" },
    ],
    ExpressAdhocSurchargesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "cod_fee", header: "COD Fee ($)" },
      { field: "cod_fee_percentage", header: "COD Fee %" },
      { field: "standard_liability", header: "Standard Liability (S$)" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocAdditionalSurchargesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "surcharge_name", header: "Additional Rate Name" },
      { field: "rates", header: "Rate (S$)" },

      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ExpressAdhocNormalBikeTableData: [],
    ExpressAdhocNormalVanTableData: [],
    ExpressAdhocEcomVanTableData: [],
    ExpressAdhocEcomBikeTableData: [],
    ExpressAdhocSurchargesTableData: [],
    ExpressAdhocAdditionalSurchargesTableData: [],

    //adhoc rates page tab data
    adhocRatesTabMenuData: [
      {
        label: "Normal",
        tab: "BikeVanTab",
        select: false,
        tabName: "Normal",
        heading: "Normal",
      },
      {
        label: "E-Commerce",
        tab: "BikeVanTab",
        select: true,
        tabName: "E-Commerce",
        heading: "E-Commerce",
      },
      {
        label: "Surcharges",
        tab: "AdhocTable",
        select: true,
        tabName: "Surcharges",
        heading: "Surcharges",
        data: "ExpressAdhocSurchargesTableData",
        columns: "ExpressAdhocSurchargesTableColumnData",
      },
      {
        label: "AdditionalSurcharges",
        tab: "AdhocTable",
        select: true,
        tabName: "Additional Surcharges",
        heading: "AdditionalSurcharges",
        data: "ExpressAdhocAdditionalSurchargesTableData",
        columns: "ExpressAdhocAdditionalSurchargesTableColumnData",
      },
    ],
    adhoc_rates_TableColumnData: [
      { field: "action", header: "Actions" },
      { field: "sno", header: "S.No" },
      { field: "zone_range", header: "Zone Range" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    ThirdPageDymaniTabTableOverlayData2: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
    ],
    ThirdPageDymaniTabTableOverlayData3: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],

    expressAdhocSubTableData: [],
    expressAdhocTableData: [],
    //adhoc zone
    addZoneTableData: [],

    //zone
    adhocRatesSecondPageTableData: [],
  },
  mutations: {
    //FORM
    addZonalRatesValidationMutation(state, bool) {
      state.addZonalRatesValidation = bool;
    },
    addZonalRatesSubmissionMutation(state, bool) {
      state.addZonalRatesSubmission = bool;
    },

    //DIALOGS
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

    //DROPDOWN
    zoneRangeDropDownDataMutation(state, data) {
      state.zoneRangeDropDownData = data;
    },
    //ADHOC MAIN TABLE
    adhocTableRowRateCardNameMutation(state, rate_card_name) {
      state.adhocTableRowRateCardName = rate_card_name;
    },
    adhocTableRowRateCardIsDefaultMutation(state, isDefault) {
      state.adhocTableRowRateCardIsDefault = isDefault;
    },
    //adhoc clone zone range
    adhocCloneZoneRangeDataMutation(state, rowData) {
      state.cloneZoneRangeData = rowData;
    },
    //ADHOC MAIN TABLE
    adhocTableRowRateCardIdMutation(state, rate_card_row_id) {
      state.adhocTableRowRateCardId = rate_card_row_id;
    },
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
    addRateCardNameErrorMutation(state, error) {
      state.addRateCardNameError = error;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
    //ADD Zone
    fetchZonesData(state, data) {
      state.addZoneTableData = data;
    },
    //adhoc table zones
    fetchadhocRatesSecondPageTableData(state, data) {
      state.adhocRatesSecondPageTableData = data;
    },
    //adhoc third page table data
    fetchExpressAdhocSurchargesTableData(state, data) {
      state.ExpressAdhocSurchargesTableData = data;
    },
    fetchExpressAdhocAdditionalSurchargesTableData(state, data) {
      state.ExpressAdhocAdditionalSurchargesTableData = data;
    },
    fetchExpressAdhocNormalBikeTableData(state, data) {
      state.ExpressAdhocNormalBikeTableData = data;
    },
    fetchExpressAdhocNormalVanTableData(state, data) {
      state.ExpressAdhocNormalVanTableData = data;
    },
    fetchExpressAdhocEcomVanTableData(state, data) {
      state.ExpressAdhocEcomVanTableData = data;
    },
    fetchExpressAdhocEcomBikeTableData(state, data) {
      state.ExpressAdhocEcomBikeTableData = data;
    },
    //adhoc table
    fetchAdhocTableData(state, data) {
      state.expressAdhocTableData = data;
    },
    fetchAdhocSubTableData(state, data) {
      state.expressAdhocSubTableData = data;
    },
    //update express adhoc add new
    // updateExpressAdhocAddNewData(state, data) {
    //   state.expressAdhocAddNewData = data;
    //   // Object.assign(state.expressAdhocAddNewData, data);
    //   state.expressAdhocAddNewData[Object.keys(data)] =
    //     state.expressAdhocAddNewData[Object.keys(data)];
    // },
    //add Zone Zone value
    addZoneValueMutation(state, data) {
      state.addZoneValue = data;
    },
    addZoneErrorMutation(state, error) {
      state.addZoneError = error;
    },
    addZoneDeliveryTransportTypeMutation(state, type) {
      state.addZoneDeliveryTransportType = type;
    },
    addZoneBikeTableRowsMutation(state, rows) {
      state.addZoneBikeTableRows = rows;
    },
    addZoneVanTableRowsMutation(state, rows) {
      state.addZoneVanTableRows = rows;
    },
    //edit zone range dialog
    zoneRangeEditDialogDataMutation(state, data) {
      state.zoneRangeEditDialogData = data;
    },
    //third page load trigger
    triggerThirdPageLoadMutation(state) {
      state.triggerThirdPageLoad = !state.triggerThirdPageLoad;
    },

    fetchCreateQuotationExpressAdhoc(state, data) {
      state.ExpressAdhoc = data;
    },
  },
  actions: {
    //FORM
    setAddZonalRatesValidation({ commit }, { bool }) {
      commit("addZonalRatesValidationMutation", bool);
    },
    setAddZonalRatesSubmission({ commit }, { bool }) {
      commit("addZonalRatesSubmissionMutation", bool);
    },
    // updateExpressAdhocAddNewDataAction({ commit }, { data }) {
    //   commit("updateExpressAdhocAddNewData", data);
    // },
    //add zone duo selection
    setZoneDeliveryTransportType({ commit }, { type }) {
      commit("addZoneDeliveryTransportTypeMutation", type);
    },
    // add Zone-second step number of rows in table
    setAddZoneBikeTableRows({ commit }, { rows }) {
      commit("addZoneBikeTableRowsMutation", rows);
    },
    setAddZoneVanTableRows({ commit }, { rows }) {
      commit("addZoneVanTableRowsMutation", rows);
    },
    //add zone zone value

    setAddZoneValue({ commit }, { data }) {
      commit("addZoneValueMutation", data);
    },
    //error for add zone
    setZoneError({ commit }, { error }) {
      commit("addZoneErrorMutation", error);
    },
    //DIALOGS
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },

    //DROPDOWN
    setZoneRangeDropDownData({ commit }, { data }) {
      let dropDownData = [];
      for (let d in data) {
        let obj = {};
        obj["name"] = data[d];
        obj["code"] = d;
        dropDownData.push(obj);
      }
      commit("zoneRangeDropDownDataMutation", dropDownData);
    },
    //zone range edit dialog data
    setZoneRangeEditDialogData({ commit }, { data }) {
      commit("zoneRangeEditDialogDataMutation", data);
    },

    //DUO SELECTION
    //TRANSPORT TYPE (BIKE/VAN)
    setTransportType({ commit }, { type }) {
      commit("transportTypeMutation", type);
    },
    setZonalRates({ commit }, { type }) {
      commit("zonalRatesMutation", type);
    },
    setNormalRatesTransport({ commit }, { type }) {
      commit("normalRatesTransportTypeMutation", type);
    },
    setECommerceRatesTransport({ commit }, { type }) {
      commit("eCommerceRatesTransportTypeMutation", type);
    },
    //ADHOC MAIN TABLE
    setAdhocTableRowRateCardName({ commit }, { rate_card_name }) {
      commit("adhocTableRowRateCardNameMutation", rate_card_name);
    },

    //ADHOC CLONE ZONE RANGE DATA
    setCloneZoneRangeData({ commit }, { rowData }) {
      commit("adhocCloneZoneRangeDataMutation", rowData);
    },
    //ADHOC MAIN TABLE
    setAdhocTableRowRateCardId({ commit }, { rate_card_row_id }) {
      commit("adhocTableRowRateCardIdMutation", rate_card_row_id);
    },
    setRateCardNameError({ commit }, { error }) {
      commit("addRateCardNameErrorMutation", error);
    },
    //create Quotation Express Adhoc
    createQuotationExpressAdhoc({ commit }, { data }) {
      commit("fetchCreateQuotationExpressAdhoc", data);
    },

    loadAdhocDialogEcommerceBike({ commit }, { path, id, payload, mutation }) {
      axios.post(path + id, payload).then((res) => {
        commit(mutation, res.data.results.bike_delivery_type);
      });
    },

    loadAdhocDialogEcommerceVan({ commit }, { path, id, payload }) {
      axios.post(path + id, payload).then((res) => {
        commit(
          "fetchLoadAdhocDialogEcommerceVan",
          res.data.results.van_delivery_type
        );
      });
    },

    loadAdhocDialogNormalBike({ commit }, { path, id, payload, mutation }) {
      axios.post(path + id, payload).then((res) => {
        commit(mutation, res.data.results.bike_delivery_type);
      });
    },

    //CRUD OPERATIONS
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
          res.data.results[c]["createdAt"] = new Date(
            res.data.results[c]["createdAt"]
          );
        }
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
          res.data.results[c]["createdAt"] = new Date(
            res.data.results[c]["createdAt"]
          );
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
          r_obj["zone_range"] =
            res.data.results.zones[c]["zone_from"]["zone_name"] +
            "-" +
            res.data.results.zones[c]["zone_to"]["zone_name"];
          res.data.results.zones[c]["createdAt"] = new Date(
            res.data.results.zones[c]["createdAt"]
          );
        }

        commit(mutation, res.data.results.zones);
      });
    },
    loadZonesData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];
          //created by in expansion
          if (res.data.results[c].services) {
            if (res.data.results[c].services[0]?.trips) {
              res.data.results[c].services[0].trips.map((itm) => {
                itm.created_by = itm.user.display_name;
              });
            }
            if (res.data.results[c].services[1]?.trips) {
              res.data.results[c].services[1].trips.map((itm) => {
                itm.created_by = itm.user.display_name;
              });
            }
          }
        }
        commit(mutation, res.data.results);
      });
    },
    loadExpressAdhocThirdPageData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data.results) {
          //normal data
          if (res.data.results.charge_type[0]) {
            let normalBikeVanArray =
              res.data.results.charge_type[0].normal_charge_services;
            let normalBikeArray = normalBikeVanArray[0].bike_rates;
            let normalVanArray = normalBikeVanArray[1].van_rates;
            //bike
            for (let c in normalBikeArray) {
              normalBikeArray[c]["created_by"] =
                normalBikeArray[c]["user"]["display_name"];
              normalBikeArray[c]["createdAt"] = new Date(
                normalBikeArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < normalBikeArray.length; i++) {
              let r_obj = normalBikeArray[i];

              r_obj["sno"] = i + 1;
            }
            //van
            for (let c in normalVanArray) {
              normalVanArray[c]["created_by"] =
                normalVanArray[c]["user"]["display_name"];
              normalVanArray[c]["createdAt"] = new Date(
                normalVanArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < normalVanArray.length; i++) {
              let r_obj = normalVanArray[i];

              r_obj["sno"] = i + 1;
            }
            commit("fetchExpressAdhocNormalBikeTableData", normalBikeArray);
            commit("fetchExpressAdhocNormalVanTableData", normalVanArray);
          }
          //ecommerce
          //bike

          if (res.data.results.charge_type[1]) {
            //ecom bike
            let ecomBikeVanArray =
              res.data.results.charge_type[1].e_commerce_charge_services;
            let ecomBikeArray = ecomBikeVanArray[0].bike_delivery_type;

            for (let c in ecomBikeArray) {
              ecomBikeArray[c]["created_by"] =
                ecomBikeArray[c]["user"]["display_name"];
              ecomBikeArray[c]["createdAt"] = new Date(
                ecomBikeArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < ecomBikeArray.length; i++) {
              let r_obj = ecomBikeArray[i];

              r_obj["sno"] = i + 1;
            }

            commit("fetchExpressAdhocEcomBikeTableData", ecomBikeArray);
            //ecom van
            let ecomVanArray = ecomBikeVanArray[1].van_delivery_type;

            for (let c in ecomVanArray) {
              ecomVanArray[c]["created_by"] =
                ecomVanArray[c]["user"]["display_name"];
              ecomVanArray[c]["createdAt"] = new Date(
                ecomVanArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < ecomVanArray.length; i++) {
              let r_obj = ecomVanArray[i];

              r_obj["sno"] = i + 1;
            }
            for (let i = 0; i < ecomVanArray.length; i++) {
              for (let r in ecomVanArray[i].rates) {
                let r_obj = ecomVanArray[i].rates;

                r_obj[r]["sno"] = Number(r) + 1;
              }
            }

            commit("fetchExpressAdhocEcomVanTableData", ecomVanArray);
          }
          //surcharge
          if (res.data.results.charge_type[2]) {
            let surchargeArray = res.data.results.charge_type[2].surcharges;

            for (let c in surchargeArray) {
              surchargeArray[c]["created_by"] =
                surchargeArray[c]["user"]["display_name"];
              surchargeArray[c]["createdAt"] = new Date(
                surchargeArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < surchargeArray.length; i++) {
              let r_obj = surchargeArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchExpressAdhocSurchargesTableData",
              res.data.results.charge_type[2].surcharges
            );
          }
          //additional surcharge
          if (res.data.results.charge_type[3]) {
            let additionalSurchargeArray =
              res.data.results.charge_type[3].additional_surcharges;
            for (let c in additionalSurchargeArray) {
              additionalSurchargeArray[c]["created_by"] =
                additionalSurchargeArray[c]["user"]["display_name"];
              additionalSurchargeArray[c]["createdAt"] = new Date(
                additionalSurchargeArray[c]["createdAt"]
              );
            }
            for (let i = 0; i < additionalSurchargeArray.length; i++) {
              let r_obj = additionalSurchargeArray[i];

              r_obj["sno"] = i + 1;
            }
            commit(
              "fetchExpressAdhocAdditionalSurchargesTableData",
              res.data.results.charge_type[3].additional_surcharges
            );
          }
        }
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
          if (err.response) {
            toastData.toastErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastErrorData);
          }
        });
    },

    //post , patch(edit,update)
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
        .catch((err) => {
          // if (err.response) {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
          //   else {
          //     commit("toastMutation", toastData.toastCommonErrorData);
          //   }
          // } else {
          //   commit("toastMutation", toastData.toastCommonErrorData);
          // }
        });
    },
  },
  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};
export default expressAdhoc;
