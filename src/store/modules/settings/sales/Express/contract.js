import axios from "axios";
import { errhandler } from "@/services/httpClient";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
function processDropDownData(data) {
  var processedDropDownArray = [];
  for (let d in data) {
    var d_obj = {};
    d_obj["name"] = data[d]["region"];
    d_obj["code"] = data[d]["id"];
    processedDropDownArray.push(d_obj);
  }
  return processedDropDownArray;
}
const expressContract = {
  namespaced: true,
  state: {
    tableLoad: false,
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    stepperNavigation: null,
    //toggleData
    toggleData: [{ type: "" }],
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    //clone rate card data
    cloneRateCardDialogData: {
      cloneRateCardRegionName: null,
      cloneRateCardRateCardName: null,
      cloneRateCardRateCardId: null,
    },
    //dropdown data
    contractCloneRateCardDropdownData: [],
    //add region - region field value
    addRegionValue: null,
    addRegionError: null,
    addRegionBikeTableRows: 0,
    addRegionVanTableRows: null,
    addRegionDeliveryTransportType: null,
    addRegionBikeDeliveryData: [],
    addRegionVanDeliveryData: [],
    addRegionData: {},
    addRegionFormStateData: {},
    //DUO SELECT
    tripsOrRatesType: null,
    transportType: null,
    twoTierRateType: null,
    multiTierRateType: null,
    eCommerceTransportType: null,
    eCommerceVanDuoType: null,

    //Region Rates Tab State
    regionRatesRateTab: "normal",
    regionRatesTransportTab: "bike",
    regionRatesSubTab: "trips",
    regionRatesTwoTierSubTab: "van_2_tire_rates_charge_by_weight",
    regionRatesMultiTierSubTab: "van_Multi_tire_rates_charge_by_quantity",
    regionRatesECommerceSubTab: "",
    regionRatesECommerceBikeTableExpansionTab: "e_commmerce_bike_rates",
    regionRatesECommerceVanTableExpansionTab: "e_commmerce_van_rates",

    //Form Data
    regionRatesNormalStepValidation: null,
    regionRatesNormalStepSubmitted: false,

    //table data
    regionRatesTableData: [],
    regionRatesTableDataChange: 0,
    regionRatesAddNewButtonControl: false,
    regionRatesDataChange: 0,

    //STEPPER DATA
    addRegionStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddRegionTrips",
        name: "Trips",
      },
      {
        index: 1,
        label: "2",
        component: "AddRegionDelivery",
        name: "Delivery",
      },
    ],

    //TABLE DATA
    //region:
    addRegionTableData: [],
    //contract
    expressContractTableData: [
      {
        id: 90,
        actions: "",
        sno: "2",
        region: "KFC",
        rate_cards_count: "4",
        created_by: "Jacob",
        createdAt: "24th June",
        status: "Active",
        rate_cards: [
          {
            rate_card_name: "RATE-C1-92",
            id: 1,
            default: true,
          },
          {
            rate_card_name: "RATE-C3-97",
            id: 2,
            default: false,
          },
        ],
      },
    ],
    //REGION RATES
    //Normal
    addNewSurchargeName: [
      {
        name: "Add New",
        code: "Add",
        items: [],
      },
    ],
  },
  mutations: {
    setStateValue(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
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

    editMutliTierSubTab(state, payload){
    state.regionRatesMultiTierSubTab = payload;
    },

    //ADD RATES
    //---------------------NORMAL STEP----------------------//
    //TRIPS/RATES TYPE
    tripsOrRatesTypeMutation(state, type) {
      state.tripsOrRatesType = type;
    },
    //TRANSPORT TYPE (BIKE/VAN)
    transportTypeMutation(state, type) {
      state.transportType = type;
    },
    //add region region value
    addRegionValueMutation(state, data) {
      state.addRegionValue = data;
    },
    addRegionErrorMutation(state, error) {
      state.addRegionError = error;
    },
    cloneRateCardRegionMutation(state, data) {
      state.cloneRateCardDialogData.cloneRateCardRegionName = data.region;
      state.cloneRateCardDialogData.cloneRateCardRateCardName =
        data.rate_card_name;
      state.cloneRateCardDialogData.cloneRateCardRateCardId = data.rate_card_id;
    },
    addRegionBikeTableRowsMutation(state, rows) {
      state.addRegionBikeTableRows = rows;
    },
    addRegionVanTableRowsMutation(state, rows) {
      state.addRegionVanTableRows = rows;
    },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
    //2 TIER RATE TYPE (VAN)
    twoTierRateTypeMutation(state, type) {
      state.twoTierRateType = type;
    },
    //MULTI TIER RATE TYPE (VAN)
    multiTierRateTypeMutation(state, type) {
      state.multiTierRateType = type;
    },
    //---------------------NORMAL STEP----------------------//

    //---------------------E COMMERCE STEP------------------//
    eCommerceTransportTypeMutation(state, type) {
      state.eCommerceTransportType = type;
    },
    eCommerceVanDuoTypeMutation(state, type) {
      state.eCommerceVanDuoType = type;
    },
    //---------------------E COMMERCE STEP------------------//
    //tabsState
    regionRatesTabStateMutation(state, data) {
      state[data[0]] = data[1];
    },
    //ADD RATES

    regionRatesTableDataMutation(state, data) {
      state.regionRatesTableData = data;
    },
    addToRegionRatesTableMutation(state, details) {
      switch (Number(details[0].charge_types_index)) {
        //normal tab
        case 0:
          details[1]["service_id"] =
            state.regionRatesTableData.charge_types[0].normal_charge_services[
              details[0].normal_charge_services_index
            ]["id"];

          if (!details[1].id) {
            switch (details[0].addTo) {
              case "rates_array":
                state.regionRatesTableData.charge_types[0].normal_charge_services[
                  details[0].normal_charge_services_index
                ][details[0].property].push(details[1]);
                break;
              case "box_count_charges_array":
                state.regionRatesTableData.charge_types[0].normal_charge_services[
                  details[0].normal_charge_services_index
                ][details[0].property][0]["box_count_charges"].push(details[1]);
                break;
              case "van_Multi_tire_rates_charge_by_quantity":
                state.regionRatesTableData.charge_types[0].normal_charge_services[
                  details[0].normal_charge_services_index
                ][details[0].property].push(details[1]);
                break;
              case "van_Multi_tire_rates_charge_by_job_count":
                state.regionRatesTableData.charge_types[0].normal_charge_services[
                  details[0].normal_charge_services_index
                ][details[0].property].push(details[1]);
                break;
            }
          } else {
            state.regionRatesTableData.charge_types[0].normal_charge_services[
              details[0].normal_charge_services_index
            ][details[0].property][details[1].s_no - 1] = details[1];
            state.regionRatesAddNewButtonControl = false;
          }
          state.regionRatesTableDataChange++;
          break;
        //e-commerce tab
        case 1:
          details[1]["delivery_type_id"] =
            state.regionRatesTableData.charge_types[1].e_commerce_services[
              details[0].ecommerce_charge_services_index
            ][details[0].property][details[0].delivery_type]["id"];

          switch (details[0].type) {
            case "delivery_rates":
              state.regionRatesTableData.charge_types[1].e_commerce_services[
                details[0].ecommerce_charge_services_index
              ][details[0].property][details[0].delivery_type][
                details[0].addTo
              ].push(details[1]);
              break;
            case "box_rates":
              details[1]["charge_quantity_id"] =
                state.regionRatesTableData.charge_types[1].e_commerce_services[
                  details[0].ecommerce_charge_services_index
                ][details[0].property][details[0].delivery_type][
                  "van_charge_by_quantity"
                ][0].id;

              state.regionRatesTableData.charge_types[1].e_commerce_services[
                details[0].ecommerce_charge_services_index
              ][details[0].property][details[0].delivery_type][
                "van_charge_by_quantity"
              ][0][details[0].addTo].push(details[1]);
              break;
          }
          break;
        //additional surcharges
        case 3:
          state.regionRatesTableData.charge_types[3][
            "additional_surcharges"
          ].push(details[1]);
          break;
      }
    },
    regionRatesAddNewButtonControlMutation(state, bool) {
      state.regionRatesAddNewButtonControl = bool;
    },

    //ADD REGION
    fetchRegionsData(state, data) {
      state.addRegionTableData = data;
    },
    //contract table data
    fetchContractTableData(state, data) {
      state.expressContractTableData = data;
      state.regionRatesDataChange++;
    },
    //fetch clone rate cards region dropdown data
    fetchContractCloneRateCardDropdownData(state, data) {
      state.contractCloneRateCardDropdownData = processDropDownData(data);
    },
    //toast
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
    },
  },
  actions: {
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

    //ADD RATES
    regionRatesTabStateAction({ commit }, { variable, value }) {
      commit("regionRatesTabStateMutation", [variable, value]);
    },

    //---------------------NORMAL STEP----------------------//
    //TRIPS/RATES TYPE
    setTripsOrRates({ commit }, { type }) {
      commit("tripsOrRatesTypeMutation", type);
    },
    //TRANSPORT TYPE (BIKE/VAN)
    setTransportType({ commit }, { type }) {
      commit("transportTypeMutation", type);
    },
    //add region region value

    setAddRegionValue({ commit }, { data }) {
      commit("addRegionValueMutation", data);
    },

    //error for add region region
    setRegionError({ commit }, { error }) {
      commit("addRegionErrorMutation", error);
    },
    //clone rate card
    setCloneRateCardRegion({ commit }, { data }) {
      commit("cloneRateCardRegionMutation", data);
    },
    // add region-second step number of rows in table
    setAddRegionBikeTableRows({ commit }, { rows }) {
      commit("addRegionBikeTableRowsMutation", rows);
    },
    setAddRegionVanTableRows({ commit }, { rows }) {
      commit("addRegionVanTableRowsMutation", rows);
    },
    //add region duo selection
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit("addRegionDeliveryTransportTypeMutation", type);
    },
    //2 TIER RATE TYPE (VAN)
    setTwoTierRateType({ commit }, { type }) {
      commit("twoTierRateTypeMutation", type);
    },
    //MULTI TIER RATE TYPE (VAN)
    setMultiTierRateType({ commit }, { type }) {
      commit("multiTierRateTypeMutation", type);
    },
    //---------------------NORMAL STEP----------------------//

    //---------------------E COMMERCE STEP------------------//
    setECommerceTransportType({ commit }, { type }) {
      commit("eCommerceTransportTypeMutation", type);
    },
    setECommerceVanDuoType({ commit }, { type }) {
      commit("eCommerceVanDuoTypeMutation", type);
    },
    //---------------------E COMMERCE STEP------------------//

    //---------------------TABLES----------------------------//
    loadRegionRatesTable({ commit }, regionId) {
      axios
        .get(
          `/settings/salesSettings/rates/express/contract/rateCard/${regionId}`
        )
        .then((res) => {
          if (res.status == 200) {
            commit("regionRatesTableDataMutation", res.data.results);
          }
        });
    },
    getSurchargeNames({ commit }) {
      axios
        .get(`/settings/salesSettings/rates/express/contracts/surcharges`)
        .then((res) => {
          if (res.status == 200) {
            let data = [];
            res.data.results.map((i) => {
              data.push({
                code: i.id ? i.id : i.geo_fencing_id,
                name: i.surcharge_name,
                ...i,
              });
            });
            let final_data = [
              {
                name: "Add New",
                code: "Add",
                items: data,
              },
            ];
            commit("setStateValue", { addNewSurchargeName: final_data });
          }
        });
    },
    addSurchargeName({ dispatch, commit }, { payload, toast }) {
      axios
        .post(
          `/settings/salesSettings/rates/express/contracts/surcharges`,
          payload
        )
        .then((res) => {
          if (res.status == 200) {
            toast.add({
              severity: "success",
              summary: "Success",
              detail: "New data added successfully",
              life: 3000,
            });
            dispatch("getSurchargeNames");
            // this.getSurchargeNames();
            // commit("setStateValue", {addNewSurchargeName:res.data.results});
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
    removeSurchargeName({ dispatch, commit }, { id, toast }) {
      axios
        .delete(
          `/settings/salesSettings/rates/express/contracts/surcharges/${id}`
        )
        .then((res) => {
          if (res.status == 200) {
            toast.add({
              severity: "success",
              summary: "Success",
              detail: "Data removed successfully",
              life: 3000,
            });
            dispatch("getSurchargeNames");
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
    addToRegionRatesTable({ commit }, { path, data }) {
      commit("addToRegionRatesTableMutation", [path, data]);
    },
    regionRatesAddNewButtonControlAction({ commit }, { bool }) {
      commit("regionRatesAddNewButtonControlMutation", bool);
    },

    //---------------------TABLES----------------------------//
    //wireup stuff
    //GET API-REGION
    loadRegionsData({ commit }, { path, mutation }) {
      axios.get(path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
          r_obj["createdAt"] = new Date(res.data.results[i].createdAt);
          // createdAt: new Date(list.createdAt),
        }

        if (res.status == 200) {
          commit(mutation, res.data.results);
          for (let r in res.data.results) {
            //processing created by for bike tab names
            let r_obj = res.data.results[r].services[0].trips;
            for (let i in r_obj) {
              for (let r_keys in r_obj[i]) {
                if (r_keys == "user") {
                  r_obj[i]["created_by"] = r_obj[i][r_keys]["display_name"];
                }
              }
            }
            //processing created by for van tab names
            let r_objj = res.data.results[r].services[1].trips;
            for (let i in r_objj) {
              for (let r_keys in r_objj[i]) {
                if (r_keys == "user") {
                  r_objj[i]["created_by"] = r_objj[i][r_keys]["display_name"];
                }
              }
            }
          }
        }
      });
    },
    //load contract region rates
    loadContractTableData({ commit }, { path }) {
      axios.get(path).then((res) => {
        commit("fetchContractTableData", res.data.results);
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
          r_obj["createdAt"] = new Date(res.data.results[i].createdAt);
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];

          res.data.results[c]["rate_cards_count"] =
            res.data.results[c]["rate_cards"].length;
        }
      });

    },
    //load contract ratecard region dropdown data
    loadContractRateCardRegionData({ commit }) {
      axios
        .get("/settings/sales/rates/express/contract/dropdowns/regions")
        .then((res) => {
          commit("fetchContractCloneRateCardDropdownData", res.data.results);
        });
    },

    //CRUD OPERATIONS
    //delete
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            // state.tableLoad = true;
            commit("toastMutation", toastData.toastSuccessData);
            dispatch(loadData.loadApi, {
              path: loadData.loadPath,
              mutation: loadData.loadMutation,
            });
          }
        })
        .catch((err) => {
          commit("toastMutation", toastData.toastErrorData);
        });
    },

    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          if (res.data.status == 200) {
            // state.tableLoad = true;
            if (Object.keys(loadData).length != 0) {
              //for region rates
              if (loadData.type) {
                res.data.results["s_no"] = loadData.data["s_no"];
                loadData.data = res.data.results;
                dispatch("addToRegionRatesTable", loadData);
              } else {
                dispatch(loadData.loadApi, {
                  path: loadData.loadPath,
                  mutation: loadData.loadMutation,
                });
              }
            }

            commit("toastMutation", toastData.toastSuccessData);
            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 409) {
              commit("toastMutation", toastData.toastDuplicateErrorData);
            } else {
              commit("toastMutation", toastData.toastCommonErrorData);
            }
          }
        });
    },
  },
  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    addNewSurchargeName: ({ addNewSurchargeName }) => addNewSurchargeName,
  },
};
export default expressContract;
