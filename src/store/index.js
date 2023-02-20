import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import fleets from "./modules/fleets";
import sales from "./modules/sales";
import dashboard from "./modules/Sales/Dashboard";
import users from "./modules/users";
import masters from "./modules/masters";
import contacts from "./modules/contacts";
import profile from "./Profile";
import calendar from "./calendar";
import commonStore from "./modules/commonStore";
import templateSettings from "./modules/templateSettings";
//Common Dialog
import common from "./modules/common.js";

//Masters
//Rates
import rates from "./modules/settings/sales/Rates/rates";

import express from "./modules/settings/express";

//Express
import expressAdhoc from "./modules/settings/sales/Express/adhoc.js";
import expressContract from "./modules/settings/sales/Express/contract.js";
import expressToast from "./modules/settings/sales/Express/toast.js";
//International
import internationalInbound from "./modules/settings/sales/International/inbound.js";
import internationalToast from "./modules/settings/sales/International/toast.js";
import AddNewInternational from "./modules/settings/sales/International/AddNew/index";
import AddNewInternationalLocal from "./modules/settings/sales/International/AddNewLocal/index";
import InternationalCountries from "./modules/settings/sales/International/countries";

import Outbound from "./modules/settings/sales/International/Outbound/index";

//Rapido
import rapidoAdhoc from "./modules/settings/sales/Rapido/adhoc.js";
import rapidoContract from "./modules/settings/sales/Rapido/contract";
//others -- sales settings
import others from "./modules/others/others.js";
import othersToast from "./modules/others/toast.js";

import geoFencing from "./modules/GeoFecing/geoFencing.js";
//sales
import salesSales from "./modules/Sales/Sales.js";
import bulkAdjustment from "./modules/Sales/Bulkadjustment";
import salesInternationalContract from "./modules/Sales/International/contract.js";
import salesInternationalAdhoc from "./modules/Sales/International/adhoc";
import salesInternationalAgent from "./modules/Sales/International/agent";
import salesExpressBike from "./modules/Sales/Express/bike";
import salesExpressContractVan from "./modules/Sales/Express/van";
import salesExpressContract from "./modules/Sales/Express/contract";
import salesExpressContractInterCompany from "./modules/Sales/Express/interCompany";
import salesExpressContractBikeFSR from "./modules/Sales/Express/bikeFSR";
import salesExpressContractVanFSR from "./modules/Sales/Express/vanFSR";
import salesExpressContractFSR from "./modules/Sales/Express/fsr";
import salesExpressContractBikeProjectJobs from "./modules/Sales/Express/bikeProjectJobs";
import salesExpressContractVanProjectJobs from "./modules/Sales/Express/vanProjectJobs";
import salesExpressContractProjectJobs from "./modules/Sales/Express/projectJobs";
import salesExpressAdhoc from "./modules/Sales/Express/expressAdhoc";
import salesRapidoContract from "./modules/Sales/Rapido/rapidoContract";
import salesRapidoAdhoc from "./modules/Sales/Rapido/adhoc.js";
import salesQuotationDialog from "./modules/Sales/Dialog.js";
//
import salesCommon from "./modules/Sales/Common";
import SalesQuotation from "./modules/Sales/Quotations";
import salesReport from "./modules/Sales/Reports";
import salesContract from "./modules/Sales/Contracts";
import salesApproval from "./modules/Sales/Approvals";
import AdhocProfile from "./modules/Sales/AgentProfile";
//
import quotation from "./modules/Quotation/quotation.js";
import operationZones from "./modules/Operations/Zones";
import operationZonesRoute from "./modules/Operations/ZoneRoute";
import assignRouteArea from "./modules/Operations/AssignRouteArea";
import zoneAreaList from "./modules/Operations/AreaList";
import operationAllotment from "./modules/Operations/Allotment";
import TypeSetting from "./modules/Operations/TypeSetting";
import DriverMovement from "./modules/Operations/DriverMovement";
import Checkout from './modules/Operations/checkout';

import CustomerLaunchStore from "../store/modules/CRM/CustomerLaunch";
import customerLaunchBookingHistory from "./modules/CRM/customerLaunchBookingHistory";
import supervisorAllotment from "./modules/Operations/SupervisorAllotment";
import operationsStatusSettings from "./modules/Operations/StatusSettings";
import rapidoRiderAllotment from "./modules/Operations/RapidoRiderAllotment";
import CrmSettings from "./modules/CRM/crmSettings";
import CrmFeedback from "./modules/CRM/crmfeedback";
import specialRiderAllotment from "./modules/Operations/SpecialRiderAllotment";
import jobsheetPrinting from "./modules/Operations/jobsheetPrinting";
import operationsSpecialJobEntry from "./modules/Operations/SpecialJobEntry";
import CheckInTab from "./modules/Operations/checkIn";

import CRMClients from "./modules/CRM/crmClients";
import liveJobStatus from "./modules/Operations/LiveJobStatus";
import Masscollection from "../store/modules/CRM/MassCollection";
import CsrActivityStore from "../store/modules/CRM/CsrActivityStore";

import LiveMapStore from "../store/modules/FleetManagement/liveMapStore";
import operationsMovementChart from "./modules/Operations/MovementChart";
export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ["AddNewInternational", "AddNewInternationalLocal"],
      reducer(val, paths) {
        if (val.AddNewInternational.cancelled) {
          return {};
        }

        let reducer = {};

        Object.entries(val).forEach((entry) => {
          const [key, value] = entry;
          if (paths.includes(key)) {
            reducer[key] = value;
          }
        });
        return reducer;
      },
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    fleets,
    users,
    sales,
    dashboard,
    masters,
    profile,
    contacts,
    calendar,
    commonStore,
    templateSettings,

    //Masters
    //Rates
    rates,
    //Express
    express,
    //others sales settings
    others,
    othersToast,
    //geo fencing
    geoFencing,
    expressAdhoc,
    expressContract,
    expressToast,
    internationalInbound,
    internationalToast,
    rapidoAdhoc,
    rapidoContract,
    //sales
    bulkAdjustment,
    salesSales,
    salesInternationalContract,
    salesInternationalAdhoc,
    salesInternationalAgent,
    salesExpressBike,
    AddNewInternational,
    AddNewInternationalLocal,
    Outbound,
    InternationalCountries,
    salesExpressContractVan,
    salesExpressContract,
    salesExpressContractInterCompany,
    salesExpressContractBikeFSR,
    salesExpressContractVanFSR,
    salesExpressContractFSR,
    salesExpressContractProjectJobs,
    salesExpressAdhoc,
    salesExpressContractBikeProjectJobs,
    salesExpressContractVanProjectJobs,
    salesRapidoContract,
    salesRapidoAdhoc,
    // Quotation
    quotation,
    SalesQuotation,
    salesReport,
    salesContract,
    salesApproval,
    salesQuotationDialog,
    salesCommon,
    AdhocProfile,
    //Common
    common,
    operationZones,
    operationZonesRoute,
    assignRouteArea,
    zoneAreaList,
    //Operations
    operationAllotment,
    TypeSetting,
    DriverMovement,
    jobsheetPrinting,
    Checkout,
    //CRM
    CRMClients,
    CustomerLaunchStore,
    customerLaunchBookingHistory,
    supervisorAllotment,
    operationsStatusSettings,
    rapidoRiderAllotment,
    CrmSettings,
    CrmFeedback,
    specialRiderAllotment,
    liveJobStatus,
    Masscollection,
    CsrActivityStore,
    operationsSpecialJobEntry,
    CheckInTab,

    //Fleet Live map Store
    LiveMapStore,
    operationsMovementChart,
  },
});
