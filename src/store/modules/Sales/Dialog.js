import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const salesQuotationDialog = {
  namespaced: true,
  state: {
    inspectionsFormTableData: null,
    rapidoContractStep: 1,
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    getTabData: "Van",
    addRegionDeliveryTransportType: null,
    stepperNavigation: null,
    quotationDetails: [],
    selectDropDown: [],
    internationalAdhocDialogRadio: "Document",
    toggleData: [{ type: "" }],

    ExpressContractProjectjobsStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractProjectjobsFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractProjectjobsSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractProjectjobsThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractProjectjobsFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractProjectjobsFifthStep",
        name: "Contract | Send Quotations",
      },
    ],

    addSalesFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "FSRQuotationDialog",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "FSRSelectMethodDialog",
        name: "Select Method",
      },

      {
        index: 2,
        label: "3",
        component: "FSRCostingDetailsDialog",
        name: "Costing Details",
      },
      {
        index: 3,
        label: "4",
        component: "FSRSendQuotationsDialog",
        name: "Contract | Send Quotations",
      },
    ],

    // addExpressContractBikeStepperData: [
    //   {
    //     index: 0,
    //     label: "1",
    //     component: "Contract",
    //     name: "Add Address",
    //   },
    //   {
    //     index: 1,
    //     label: "2",
    //     component: "ContractBikeContact",
    //     name: "Contact Person",
    //   },
    //   {
    //     index: 2,
    //     label: "3",
    //     component: "ContractBikeTripDetails",
    //     name: "Trip Shedule",
    //   },
    //   {
    //     index: 3,
    //     label: "4",
    //     component: "ContractBikeSendQuotations",
    //     name: "Site Charges",
    //   },
    // ],
    //express-contract-bike
    ExpressContractProjectJobBikeStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractBikeProjectJobsFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractBikeProjectJobsSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractBikeProjectJobsThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractBikeProjectJobsFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractBikeProjectJobsFifthStep",
        name: "Contract | Send Quotations",
      },
    ],

    ExpressContractBikeStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractBikeFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractBikeSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractBikeThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractBikeFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractBikeFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    //express-contract-van
    ExpressContractVanStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractVanFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractVanSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractVanThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractVanFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractVanFifthStep",
        name: "Contract | Send Quotations",
      },
    ],

    ExpressContractInterCompanyChargesStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractInterChargesFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractInterChargesSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractInterChargesThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractInterChargesFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractInterChargesFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    ExpressContractVanFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractVanFSRFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractVanFSRSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractVanFSRThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractVanFSRFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractVanFSRFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    ExpressContractProjectJobVanStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractVanProjectJobsFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractVanProjectJobsSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractVanProjectJobsThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractVanProjectJobsFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractVanProjectJobsFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    ExpressContractBikeFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesExpressContractBikeFSRFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesExpressContractBikeFSRSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesExpressContractBikeFSRThirdStep",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesExpressContractBikeFSRFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesExpressContractBikeFSRFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    InternationalAgentStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesInternationalAgentFirstStep",
        name: "Profile",
      },
      {
        index: 1,
        label: "2",
        component: "SalesInternationalAgentSecondStep",
        name: "Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesInternationalAgentThirdStep",
        name: "Questionnaire",
      },
      {
        index: 3,
        label: "4",
        component: "SalesInternationalAgentFourthStep",
        name: "Casting",
      },
      {
        index: 4,
        label: "5",
        component: "SalesInternationalAgentFifthStep",
        name: "Permit Settings",
      },
      {
        index: 5,
        label: "6",
        component: "SalesInternationalAgentSixthStep",
        name: "Onforwarding",
      },
      {
        index: 6,
        label: "7",
        component: "SalesInternationalAgentSeventhStep",
        name: "Send Quotation",
      },
    ],
    InternationalContractStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesInternationalContractFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesInternationalContractSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesInternationalContractThirdStep",
        name: "Service Provider",
      },
      {
        index: 3,
        label: "4",
        component: "SalesInternationalContractFourthStep",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesInternationalContractFifthStep",
        name: "Contract | Send Quotations",
      },
    ],
    RapidoContractStepperData: [
      {
        index: 0,
        label: 1,
        component: "SalesRapidoContractFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: 2,
        component: "SalesRapidoContractSecondStep",
        name: "Select Method",
      },
      {
        index: 2,
        label: 3,
        component: "SalesRapidoContractThirdStep",
        name: "Product Details",
      },
      {
        index: 3,
        label: 4,
        component: "SalesRapidoContractFourthStep",
        name: "Charges",
      },
      {
        index: 4,
        label: "5",
        component: "SalesRapidoContractFifthStep",
        name: "Contract | Send Quotations",
      },
    ],

    inspectionsDropDownTableData: [
      {
        delivery_type: "Same Day Delivery",
        collection_time: "10:00",
        cut_off_time: "10:00",
        cut_off_days: "2",
        net_charges: "$251",
        id:1
      },
      {
        delivery_type: "Next Day Delivery",
        collection_time: "10:00",
        cut_off_time: "10:00",
        cut_off_days: "2",
        net_charges: "$251",
        id:2
      },
    ],

    internationalAgentDropDownTableDate: [
      {
        delivery_name: "Sunday Delivery Charges",
        charges: "$20",
      },
      {
        delivery_name: "Holiday Delivery Charges",
        charges: "$40",
      },
    ],

    inspectionsDropDownTableDataColumns: [
      { field: "delivery_type", header: "Trip Name" },
      { field: "collection_time", header: "From " },
      { field: "cut_off_time", header: "To" },
      { field: "cut_off_days", header: "Trip Type" },
      { field: "net_charges", header: "Trip Time" },
    ],

    internationalAgentDropDownTableColumns: [
      { field: "delivery_name", header: "Delivery Name" },
      { field: "charges", header: "Charges" },
    ],
    expressQuotationContactsTableData: [
      {
        name: "Shane Warne",
        contact: "9874653210",
        e_mail: "dev@yahoo.com",
        address: "ParadiseBuilding,Singapore,23401",
      },
    ],
    expressQuotationContactsTableColumnData: [
      { field: "name", header: "Name" },
      { field: "contact", header: "Contact" },
      { field: "e_mail", header: "E-Mail" },
      { field: "address", header: "Address" },
    ],
  },
  mutations: {
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      console.log("steppereeeeeeeeeeeeeeeeeeeeeeee", step);
      state.stepperNavigation = step;
    },
    // apple(state, type) {
    //   state.internationalAdhocDialogRadio = type;
    // },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
    setRapidoContractStep(state, payload) {
      state.rapidoContractStep = state.rapidoContractStep + payload;
    },
    setRapidoContractStepNum(state, payload) {
      state.rapidoContractStep = payload;
    },
  },
  actions: {
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    //add region duo selection
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit("addRegionDeliveryTransportTypeMutation", type);
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit("stepperNavigationMutation", step);
    },
    addRegionDeliveryTransportTypeMutation({ commit }, type) {
      //  internationalAdhocDialogRadio = type;
      commit("apple", type);
    },
    setRapidoContractStep({ commit }, payload) {
      commit("setRapidoContractStep", payload);
    },
    setRapidoContractStepNum({ commit }, payload) {
      commit("setRapidoContractStepNum", payload);
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    rapidoContractStep: ({ rapidoContractStep }) => rapidoContractStep,
  },
};
export default salesQuotationDialog;
