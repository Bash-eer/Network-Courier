import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const quotation = {
  namespaced: true,
  state: {
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    getTabData: "Van",
    addRegionDeliveryTransportType: null,
    stepperNavigation: null,
    quotationDetails: [],
    selectDropDown: [],
    // internationalAdhocDialogRadio:"Document",
    toggleData: [{ type: "" }],

    addRegionStepperData: [
      {
        index: 0,
        label: "1",
        component: "SalesProjectJobsQuotationDialog",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "SalesProjectJobsSelectMethod",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "SalesProjectJobsTripsDetails",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "SalesProjectJobsCostingDetails",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "SalesProjectJobsSendQuotations",
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
    addSalesFSRVanStepperData: [
      {
        index: 0,
        label: "1",
        component: "FSRVanQuotationDialog",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "FSRVanSelectMethodDialog",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "FSRVanTripDetailsDialog",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "FSRVanCostingDetails",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "FSRVanSendQuotation",
        name: "Contract | Send Quotations",
      },
    ],
    addExpressContractBikeStepperData: [
      {
        index: 0,
        label: "1",
        component: "ContractBikeCostCenter",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "ContractBikeContact",
        name: "Contact Person",
      },
      {
        index: 2,
        label: "3",
        component: "ContractBikeTripDetails",
        name: "Trip Shedule",
      }, 
      {
        index: 3,
        label: "4",
        component: "ContractBikeSendQuotations",
        name: "Site Charges",
      },
    ],

    addContractBikeStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddBikeQuotation",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "AddBikeSelectMethod",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "AddBikeTripDetails",
        name: "Trip Details",
      }, 
      {
        index: 3,
        label: "4",
        component: "AddBikeCostingDetails",
        name: "Costing Details",
      }, 
      {
        index: 4,
        label: "5",
        component: "AddBikeSendQuotation",
        name: "Contract | Send Quotations",
      }, 
    ],
    addSalesInterCompanyChargesStepperData: [
      {
        index: 0,
        label: "1",
        component: "InterCompanyQuotation",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "InterCompanySelectMethod",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "InterCompanyTripDetails",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "InterCompanyCostingDetails",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "InterCompanySendQuotations",
        name: "Contract | Send Quotations",
      },
    ],
    addSalesProjectJobVanFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddAddressDialog",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "AddSelectMethodDialog",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "AddTripDetailsDialog",
        name: "Trip Details",
      }, 
      {
        index: 3,
        label: "4",
        component: "AddCostingDetailsDialog",
        name: "Costing Details",
      }, 
      {
        index: 4,
        label: "5",
        component: "AddContractSendQuotationDialog",
        name: "Contract | Send Quotations",
      }, 
    ],
    addSalesBikeFSRStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddBikeAddress",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "AddBikeSelectMethodDialog",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "AddBikeTripDetailsDialog",
        name: "Trip Details",
      }, 
      {
        index: 3,
        label: "4",
        component: "AddBikeCostingDetailsDialog",
        name: "Costing Details",
      }, 
      {
        index: 4,
        label: "5",
        component: "AddBikeSendQuotationDialog",
        name: "Contract | Send Quotations",
      }, 
    ],
    addSalesInternationalAgentStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddProfileDialog",
        name: "Profile",
      },
      {
        index: 1,
        label: "2",
        component: "AddMethodDialog",
        name: "Method",
      },
      {
        index: 2,
        label: "3",
        component: "AddQuestionnaireDialog",
        name: "Questionnaire",
      }, 
      {
        index: 3,
        label: "4",
        component: "AddCostingDialog",
        name: "Casting",
      }, 
      {
        index: 4,
        label: "5",
        component: "AddPermitSettingsDialog",
        name: "Permit Settings",
      
      }, 
      {
        index: 5,
        label: "6",
        component: "AddOnForwardingDialog",
        name: "Onforwarding",
       
      }, 
      {
        index: 6,
        label: "7",
        component: "AddSendQuotationDialog",
        name: "Send Quotation",
       
      }, 
    ],
    
    inspectionsDropDownTableData: [
      {
        trip_name: "1st",
        from: "Before",
        to: "11:00 AM",
        trip_days: "WeekDays",
        trip_type: "Open"
      },
      {
        trip_name: "2st",
        from: "Before",
        to: "12:00 AM",
        trip_days: "WeekEnd",
        trip_type: "Open"
      }

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
      { field: "trip_name", header: "Trip Name" },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip type" },
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
        address: "ParadiseBuilding,Singapore,23401"
      }
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
      state.stepperNavigation = step; 
    }, 
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
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
    setRegionDeliveryTransportType({commit}, {type}) {
      commit("addRegionDeliveryTransportTypeMutation", type);
    },
     //STEPPER
     navigateStepper({ commit }, { step }) { 
      commit("stepperNavigationMutation", step); 
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
export default quotation;
