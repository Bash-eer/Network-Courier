import { createRouter, createWebHashHistory } from "vue-router";
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import routes from "./routes";
import ResetConfirmation from "../components/Dialogs/Users/ResetConfirmation.vue";
//dashboard
import Dashboard from "../views/Dashboard.vue";
//calendar
import Calendar from "../views/Calendar.vue";

//fleet mangement
import FleetManagementHome from "../views/Modules/FleetManagement/FleetManagementHome.vue";
import FleetVehicles from "../views/Modules/FleetManagement/FleetVehicles.vue";
import FleetMaintenance from "../views/Modules/FleetManagement/FleetMaintenance.vue";
import FleetExpenditure from "../views/Modules/FleetManagement/FleetExpenditure.vue";
import FleetFuel from "../views/Modules/FleetManagement/FleetFuel.vue";
import LiveMapStatus from "../views/Modules/FleetManagement/LiveMapStatus.vue";
//for sales
import ExpressTracker from "../views/Modules/Sale/Express/ExpressTracker.vue";

//for settings->users module
import UsersHome from "../views/Modules/Settings/Users/UsersHome.vue";
import UsersRoles from "../views/Modules/Settings/Users/UsersRoles.vue";
import UsersTypesRoles from "../views/Modules/Settings/Users/UsersTypesRoles.vue";
import UsersAgents from "../views/Modules/Settings/Users/UsersAgents.vue";
import UsersModuleRights from "../views/Modules/Settings/Users/UsersModuleRights.vue";
import UsersTypesRolesModuleRights from "../views/Modules/Settings/Users/UsersTypesRolesModuleRights.vue";

//for settings->masters module
import Rates from "../views/Modules/Settings/Rates/Rates.vue";
//for settings-> TemplateSettings
import TemplateSettings from "../views/Modules/Settings/TemplateSettings/templateSettings.vue";
import DocumentRowProfile from "../views/Modules/Settings/TemplateSettings/documentProfile.vue";
import EmailRowProfile from "../views/Modules/Settings/TemplateSettings/emailProfile.vue";
import DocumentTemplate from "../views/Modules/Settings/TemplateSettings/DocumentTemplateCreate.vue";
//for international
import Companies from "../views/Modules/Settings/Rates/International/Companies.vue";
import AddNew from "../views/Modules/Settings/Rates/International/AddNew/index.vue";
import AddNewZone from "../views/Modules/Settings/Rates/International/AddNew/Zone/index.vue";
import AddNewWeightRates from "../views/Modules/Settings/Rates/International/AddNew/WeightAndRates/index.vue";
import AddNewSurcharges from "../views/Modules/Settings/Rates/International/AddNew/Surcharges/index.vue";
import AddNewAdditionalSurcharges from "../views/Modules/Settings/Rates/International/AddNew/AdditionalSurcharges/index.vue";
import countryList from "../views/Modules/Settings/Rates/International/Countries/index.vue";
import AddNewCountry from "../views/Modules/Settings/Rates/International/Countries/AddNew/index.vue";

// sales/outbound
import EditRates from "../views/Modules/Settings/Rates/International/Outbound/EditRates/index.vue";

//for express
import Regions from "../views/Modules/Settings/Rates/Express/Regions.vue";
import AddRegion from "../views/Modules/Settings/Rates/Express/AddRegion.vue";

//for fleet masters
import FleetMasters from "../views/Modules/Settings/Fleets/FleetMasters.vue";
import RoomsMaster from "../views/Modules/Settings/Rooms/RoomsMaster.vue";
import ThirdPartyIntegrationMaster from "../views/Modules/Settings/ThirdPartyIntegration/ThirdPartyIntegrationMaster.vue";

import Login from "../views/Modules/Login/Login.vue";
import Profile from "../views/Profile.vue";
//for sales module
import ExSalesHome from "../views/Modules/Sale/SalesHome.vue";
import Quotation from "../views/Modules/Sale/Quotation.vue";

//contact management module
import ContactManagementHome from "../views/Modules/ContactManagement/ContactManagementHome.vue";
import EventsOverview from "../views/Modules/ContactManagement/EventsOverview.vue";
import AddEvent from "../components/Dialogs/ContactManagement/Events/AddEvent.vue";
import BookMeetings from "../components/Dialogs/ContactManagement/Meetings/BookMeetings.vue";
import ContactsTracker from "../views/Modules/ContactManagement/ContactsTracker.vue";
import EDMTabs from "../views/Modules/ContactManagement/EDMTabs.vue";

//Setting
import GeoFencing from "../views/Modules/Settings/GeoFencing/GeoFencing.vue";

// Quotation
import SettingsQuotation from "../views/Modules/Settings/Quotation/SettingsQuotation.vue";

//Sales
//Rates
import salesRates from "../views/Modules/Settings/Sales/Rates.vue";
//Region Rates
import RegionRates from "../components/Settings/Sales/Express/Contract/RegionRates/RegionRates.vue";
//ZonesAdhoc->Rapido
import ZonesAdhoc from "../components/Settings/Sales/Rapido/Adhoc/ZonesAdhoc.vue";

//Settings--> Sales --> others
import Others from "../views/Modules/Settings/Others/Others.vue";

//settings-Rates-Rapido-Adhoc-Rates
import RapidoAdhocRateCard from "../views/Modules/Settings/Sales/Rapido/Adhoc/RateCard.vue";
import RateOverview from "../views/Modules/Settings/Sales/Rapido/Adhoc/RatesOverview.vue";
//region
import salesRatesRegion from "../views/Modules/Settings/Sales/Express/Contract/Region.vue";
//zones
import salesRatesZones from "../views/Modules/Settings/Sales/Express/Adhoc/Zone.vue";
import salesAdhocRates from "../views/Modules/Settings/Sales/Express/Adhoc/AdhocRates.vue";
import salesAdhocRatesOverview from "../views/Modules/Settings/Sales/Express/Adhoc/SalesAdhocRatesOverview.vue";

//SALES
import SalesHome from "../views/Modules/Sales/SalesHome.vue";
import QuotationContract from "../views/Modules/Sales/QuotationContract.vue";
import QuotationOverview from "../views/Modules/Sales/QuotationOverview.vue";
import ExpressContractBikeQuotationOverview from "../components/Sales/QuotationTypes/Express/Contract/Bike/Overview/Index.vue";
import InternationalContractOverview from "../components/Sales/QuotationTypes/International/Contract/Overview/Index.vue";
import InternationalAdhoc from "../components/Sales/QuotationTypes/International/Adhoc/Overview/Index.vue";
import InternationalAgent from "../components/Sales/QuotationTypes/International/Agent/Overview/Index.vue";
import ExpressContractVanQuotataionOverview from "../components/Sales/QuotationTypes/Express/Contract/Van/Overview/index.vue";
import ExpressContractInterCompanyOverview from "../components/Sales/QuotationTypes/Express/Contract/InterCompany/Overview/index.vue";
import ExpressContractBikeFSRQuotationOverview from "../components/Sales/QuotationTypes/Express/Contract/BikeFSR/Overview/Index.vue";
import ExpressContractVanFSROverview from "../components/Sales/QuotationTypes/Express/Contract/VanFSR/Overview/Index.vue";
import ExpressConractFSROverview from "../components/Sales/QuotationTypes/Express/Contract/FSR/Overview/Index.vue";
import ExpressContractProjectJobsOverview from "../components/Sales/QuotationTypes/Express/Contract/ProjectJobs/Overview/Index.vue";
import ExpressAdhocOverview from "../components/Sales/QuotationTypes/Express/Adhoc/Overview/Index.vue";
import RapidoRapidoAdhocOverview from "../components/Sales/QuotationTypes/Rapido/RapidoAdhoc/Overview/Index.vue";
import RapidoRapidoContractOverview from "../components/Sales/QuotationTypes/Rapido/RapidoContract/Overview/Index.vue";
import ExpressContractBikeProjectJobsOverview from "../components/Sales/QuotationTypes/Express/Contract/BikeProjectJobs/Overview/Index.vue";
import ExpressContractVanProjectJobsOverview from "../components/Sales/QuotationTypes/Express/Contract/VanProjectJobs/Overview/Index.vue";
import BulkAdjustmentRowProfile from "../components/Sales/Sales/Bulk Adjustment/BulkAdjustment.vue";
import ExpressContract from "../components/Sales/QuotationTypes/Express/Contract/Overview/index.vue";

//International add new local
import AddNewInternationalLocal from "../views/Modules/Settings/Rates/International/AddNewLocal";
import AddNewInternationalLocalNormal from "../views/Modules/Settings/Rates/International/AddNewLocal/Normal/index.vue";
import AddNewInternationalLocalEcommerce from "../views/Modules/Settings/Rates/International/AddNewLocal/Ecommerce/index.vue";
import AddNewInternationalLocalSurcharges from "../views/Modules/Settings/Rates/International/AddNewLocal/Surcharges/index.vue";
import AddNewInternationalLocalAddSurcharges from "../views/Modules/Settings/Rates/International/AddNewLocal/AdditionalSurcharges/index.vue";

// Edit pages - international outbound
import FuelCharges from "../views/Modules/Settings/Rates/International/Outbound/FuelCharges/index.vue";
import TransitDays from "../views/Modules/Settings/Rates/International/Outbound/TransitDays/index.vue";
import AddNewTransitDays from "../views/Modules/Settings/Rates/International/Outbound/TransitDays/AddNew/index.vue";
import EditZones from "../views/Modules/Settings/Rates/International/Outbound/EditRates/Zones/index.vue";
import EditWeights from "../views/Modules/Settings/Rates/International/Outbound/EditRates/Weights/index.vue";
import EditSurcharges from "../views/Modules/Settings/Rates/International/Outbound/EditRates/Surcharges/index.vue";
import AdditionalSurcharges from "../views/Modules/Settings/Rates/International/Outbound/EditRates/AdditionalSurcharges/index.vue";

// Edit pages - international outbound local card
import EditRatesLocal from "../views/Modules/Settings/Rates/International/Outbound/EditRatesLocal/index.vue";
import LocalEditNormal from "../views/Modules/Settings/Rates/International/Outbound/EditRatesLocal/Normal/index.vue";
import LocalEditEcommerce from "../views/Modules/Settings/Rates/International/Outbound/EditRatesLocal/Ecommerce/index.vue";
import LocalEditSurcharges from "../views/Modules/Settings/Rates/International/Outbound/EditRatesLocal/Surcharges/index.vue";
import LocalEditAddSurcharges from "../views/Modules/Settings/Rates/International/Outbound/EditRatesLocal/AddSurcharges/index.vue";

//Route Planning Operations
import RoutePlanningZones from "../views/Modules/Operations/index.vue";
import ZonesRoute from "../views/Modules/Operations/zonesRoute/zonesRoute.vue";
import AssignArea from "../views/Modules/Operations/assignArea/assignArea.vue";
import AreaList from "../views/Modules/Operations/areaList/areaList.vue";

// CRM - Express Module
import CustomerLaunchBookings from "../views/Modules/CRM/CustomerLaunch/CustomerLaunchBookings.vue";
import CustomerBookingHistory from "../views/Modules/CRM/CustomerLaunch/CustomerBookingHistory.vue";
import CustomerDataCard from "../views/Modules/CRM/CustomerLaunch/CustomerDataCard.vue";
import CustomerLeave from "../views/Modules/CRM/CustomerSettings/CustomerLeave.vue";
import ClientDetails from "../views/Modules/CRM/CustomerSettings/ClientDetails.vue";
import ClientContact from "../views/Modules/CRM/CustomerSettings/ClientContact.vue";
import CustomerSuspension from "../views/Modules/CRM/CustomerSettings/CustomerSuspension.vue";
import standardCollection from "../views/Modules/CRM/StandardCollectionSlips/index.vue";
import massCollectionContract from "../views/Modules/CRM/massCollection/index.vue";
import bulkActions from "../views/Modules/CRM/BulkActions/index.vue";
import jobsheetPrinting from "../views/Modules/CRM/JobsheetPrinting/jobsheetPrinting.vue";
//Bulk adjustment
import BulkAdjustmentDialog from "../components/Sales/Sales/Bulk Adjustment/BulkAdujustment.vue/BulkSAdjustmentDialog.vue";
//Operations
import RiderAllotment from "../components/Operations/RiderAllotment/index.vue";
import SupervisorTab from "../views/Modules/Operations/supervisorAllotment/supervisorTab.vue";
import CheckInTab from "../views/Modules/Operations/checkIn/index.vue";
import RiderZoneAllotment from "../components/Operations/RiderAllotment/RiderZoneAllotment/index.vue";
import DefaultRiderAllotment from "../components/Operations/DefaultRiderAllotment/index.vue";
import StatusSettings from "../views/Modules/Operations/statusSettings/statusSettingsTab.vue";
import StandbyRiderAllotment from "../components/Operations/StandbyRiderAllotment/index.vue";
import DeliveryTypeSettings from "../components/Operations/DeliveryTypeSetting/index.vue";
import CRMSettings from "../views/Modules/CRM/CRMSettings/index.vue";
import CRMFeedback from "../views/Modules/CRM/feedback.vue";
import SpecialRiderTab from "../views/Modules/Operations/specialRiderAllotment/specialRiderTab.vue";
import DriverMovementChart from "../components/Operations/DriverMovementChart/index.vue";
import DeliverydataTablepage from "../components/Operations/DefaultRiderAllotment/rapidotab/DeliveryDataTablePage.vue";
import Collection from "../components/Operations/DefaultRiderAllotment/rapidotab/collection.vue";
import LiveJobStatus from "../views/Modules/Operations/liveJobStatus/liveJobStatusTab.vue";
import TransferJob from "../views/Modules/Operations/transferJob/index.vue";
import SpecialJobEntryParent from "../views/Modules/Operations/specialJobEntry/SpecialJobEntryParent.vue";
import CheckOut from '../views/Modules/Operations/checkOut/index.vue';
// CSR Activity
import CSRActivityIndex from "../views/Modules/CRM/CSRActivity/CSRActivityIndex.vue";

import MovementChartTab from "../views/Modules/Operations/movementChart/movementChartTab.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { sidebar: false, routePath: "login" },
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: Login,
    meta: { sidebar: false, routePath: "forgot", noAuthenticationNeeded: true },
  },
  {
    path: "/success",
    name: "Success",
    component: Login,
    meta: {
      sidebar: false,
      routePath: "success",
      noAuthenticationNeeded: true,
    },
  },
  { path: "/reset", name: "Reset", component: ResetConfirmation },
  //calendar
  { path: "/calendar", name: "Calendar", component: Calendar },

  //................................Fleet Management.............................................//
  {
    path: "/fleet-management",
    name: "VehiclesDashBoard",
    component: FleetManagementHome,
  },
  {
    path: "/fleet-management/liveMapStatus",
    name: "LiveMapStatus",
    component: LiveMapStatus,
  },
  {
    path: "/fleet-management/vehicles",
    name: "FleetVehicles",
    component: FleetVehicles,
  },
  {
    path: "/fleet-management/maintenance",
    name: "FleetMaintenance",
    component: FleetMaintenance,
  },
  {
    path: "/fleet-management/expenditure",
    name: "FleetExpenditure",
    component: FleetExpenditure,
  },
  {
    path: "/fleet-management/fuel",
    name: "FleetFuel",
    component: FleetFuel,
  },
  //................................Fleet Management.............................................//

  //................................Dashboard.............................................//
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/profile", name: "Profile", component: Profile },

  //-----------page not found----------//
  // {
  //   path: "/:catchAll(.*)*",
  //   name: "PageNotFound",
  //   component: PageNotFound,
  //   meta: { sidebar: false },
  // },

  //--------------------------------------------sales----------------------------------------------------//
  { path: "/saless", name: "ExSalesHome", component: ExSalesHome },
  { path: "/sale/quotation", name: "Quotation", component: Quotation },
  {
    path: "/sale/express",
    name: "expressTracker",
    component: ExpressTracker,
  },
  //--------------------------------------------sales----------------------------------------------------//

  //--------------------------------settings -> users module--------------------------------------------//
  {
    path: "/settings/users",
    name: "Users",
    component: UsersHome,
  },
  {
    path: "/settings/roles",
    name: "Roles",
    component: UsersRoles,
  },
  {
    path: "/settings/users/roles/online_customer/roles",
    name: "UsersTypesRoles",
    component: UsersTypesRoles,
    props: { usersPath: "UsersTypesRoles" },
  },
  {
    path: "/settings/users/online_customer",
    name: "Agent",
    component: UsersAgents,
  },
  {
    path: "/settings/roles/network_courier/:id",
    name: "UsersModuleRights",
    component: UsersModuleRights,
    props: { usersPath: "UsersModuleRights" },
  },
  {
    path: "/settings/users/roles/online_customer/:id",
    name: "UsersTypesRolesModuleRights",
    component: UsersTypesRolesModuleRights,
    props: { usersPath: "UsersTypesRolesModuleRights" },
  },
  //--------------------------------settings -> users module--------------------------------------------//

  //--------------------------------settings -> masters module--------------------------------------------//
  {
    path: "/settings/rates",
    name: "Rates",
    component: Rates,
  },
  //Setting -> TemplateSettings
  {
    path: "/settings/templateSettings",
    name: "TemplateSettings",
    component: TemplateSettings,
  },
  {
    path: "/settings/templateSettings/:type/:module/:id",
    name: "DocumentRowProfile",
    component: DocumentRowProfile,
  },
  {
    path: "/settings/templateSettings/:type/:module/:id",
    name: "EmailRowProfile",
    component: EmailRowProfile,
  },
  {
    path: "/settings/templateSettings/:type/:module/template/:id",
    name: "DocumentTemplate",
    component: DocumentTemplate,
  },
  //for international
  {
    path: "/settings/rates/international/rate-card",
    name: "Companies",
    component: Companies,
  },
  {
    path: "/settings/rates/international/rate-card",
    name: "Companies",
    component: Companies,
  },
  {
    path: "/settings/rates/international/addnew",
    name: "AddNew",
    component: AddNew,
    children: [
      {
        path: "/settings/rates/international/addnew/zone",
        name: "AddNewZone",
        component: AddNewZone,
      },
      {
        path: "/settings/rates/international/addnew/weight-rates",
        name: "AddNewWeightRates",
        component: AddNewWeightRates,
      },
      {
        path: "/settings/rates/international/addnew/surcharges",
        name: "AddNewSurcharges",
        component: AddNewSurcharges,
      },
      {
        path: "/settings/rates/international/addnew/additional-surcharges",
        name: "AddNewAdditionalSurcharges",
        component: AddNewAdditionalSurcharges,
      },
    ],
  },
  {
    path: "/settings/rates/international/addnew-local",
    name: "AddNewInternationalLocal",
    component: AddNewInternationalLocal,
    children: [
      {
        path: "/settings/rates/international/addnew-local/normal",
        name: "AddNewInternationalLocalNormal",
        component: AddNewInternationalLocalNormal,
      },
      {
        path: "/settings/rates/international/addnew-local/ecommerce",
        name: "AddNewInternationalLocalEcommerce",
        component: AddNewInternationalLocalEcommerce,
      },
      {
        path: "/settings/rates/international/addnew-local/surcharges",
        name: "AddNewInternationalLocalSurcharges",
        component: AddNewInternationalLocalSurcharges,
      },
      {
        path: "/settings/rates/international/addnew-local/additional-surcharges",
        name: "AddNewInternationalLocalAddSurcharges",
        component: AddNewInternationalLocalAddSurcharges,
      },
    ],
  },
  //for express
  {
    path: "/settings/rates/express/regions",
    name: "Regions",
    component: Regions,
  },
  {
    path: "/settings/rates/express/addregions",
    name: "AddRegion",
    component: AddRegion,
  },
  //------settings -> fleet management ---------//
  {
    path: "/settings/fleet-management",
    name: "FleetManagementMasters",
    component: FleetMasters,
  },
  {
    path: "/settings/contact-management",
    name: "RoomsSettingsMasters",
    component: RoomsMaster,
  },
  {
    path: "/settings/rates/rapido/adhoc/rates/:id",
    name: "RapidoAdhocRateCardPage",
    component: RapidoAdhocRateCard,
  },
  {
    path: "/settings/rates/rapido/adhoc/rates/zones/:id/:zoneId",
    name: "RapidoAdhocRateOverview",
    component: RateOverview,
  },
  {
    path: "/settings/contact-management",
    name: "GeoFencingMasters",
    component: GeoFencing,
  },
  {
    path: "/settings/quotation-approval",
    name: "SettingsQuotationMaster",
    component: SettingsQuotation,
  },
  {
    path: "/settings/third-party-integration",
    name: "ThirdPartyIntegrationMaster",
    component: ThirdPartyIntegrationMaster,
  },
  //--------------------------------settings -> masters module--------------------------------------------//

  //--------------------------------contact management module---------------------------------------------- //
  {
    path: "/contact-management",
    name: "ContactManagementHome",
    component: ContactManagementHome,
  },
  {
    path: "/contact-management/event",
    name: "EventsOverview",
    component: EventsOverview,
  },
  {
    path: "/contact-management/event/add-event",
    name: "AddEvent",
    component: AddEvent,
  },

  {
    path: "/contact-management/book-meeting-rooms",
    name: "BookMeetings",
    component: BookMeetings,
  },
  {
    path: "/contact-management/contactsTracker",
    name: "ContactsTracker",
    component: ContactsTracker,
  },
  {
    path: "/contact-management/EDMTabs",
    name: "EDMTabs",
    component: EDMTabs,
  },
  //--------------------------------contact management module---------------------------------------------- //

  //Setting
  //Sales
  //Rates
  {
    path: "/settings/sales-settings/rates",
    name: "salesRates",
    component: salesRates,
  },
  {
    path: "/settings/sales-settings/rates/outbound/:id/fuel-charges",
    name: "FuelCharges",
    component: FuelCharges,
  },
  {
    path: "/settings/sales-settings/rates/outbound/:id/transit-days",
    name: "TransitDays",
    component: TransitDays,
  },
  {
    path: "/settings/sales-settings/rates/outbound/:id/transit-days/add-new",
    name: "AddNewTransitDays",
    component: AddNewTransitDays,
  },
  {
    path: "/settings/sales-settings/rates/outbound/:id/",
    name: "outBoundEditRates",
    component: EditRates,
    children: [
      {
        path: "/settings/sales-settings/rates/outbound/:id/zone",
        name: "outboundEditZones",
        component: EditZones,
      },
      {
        path: "/settings/sales-settings/rates/outbound/:id/weights",
        name: "outboundEditWeights",
        component: EditWeights,
      },
      {
        path: "/settings/sales-settings/rates/outbound/:id/surcharges",
        name: "outboundEditSurcharges",
        component: EditSurcharges,
      },
      {
        path: "/settings/sales-settings/rates/outbound/:id/additional-surcharges",
        name: "outboundEditAddSurcharges",
        component: AdditionalSurcharges,
      },
    ],
  },
  {
    path: "/settings/sales-settings/rates/outbound/local/:id/",
    name: "outBoundEditRatesLocal",
    component: EditRatesLocal,
    children: [
      {
        path: "/settings/sales-settings/rates/outbound/local/:id/normal",
        name: "outboundLocalEditNormal",
        component: LocalEditNormal,
      },
      {
        path: "/settings/sales-settings/rates/outbound/local/:id/ecommerce",
        name: "outboundLocalEditEcommerce",
        component: LocalEditEcommerce,
      },
      {
        path: "/settings/sales-settings/rates/outbound/local/:id/surcharges",
        name: "outboundLocalEditSurcharges",
        component: LocalEditSurcharges,
      },
      {
        path: "/settings/sales-settings/rates/outbound/local/:id/add-ecommerce",
        name: "outboundLocalEditAddSurcharges",
        component: LocalEditAddSurcharges,
      },
    ],
  },
  {
    path: "/settings/sales-settings/rates/international/countries",
    name: "internationalCountryList",
    component: countryList,
  },
  {
    path: "/settings/sales-settings/rates/international/countries/add-new",
    name: "AddNewCountry",
    component: AddNewCountry,
  },
  //Settings->Sales->Others
  {
    path: "/settings/sales-settings/others",
    name: "Others",
    component: Others,
  },

  //bulk adjustment
  {
    path: "/sales/bulkAdjustment/profile/create",
    name: "BulkAdjustmentDialog",
    component: BulkAdjustmentDialog,
  },
  //Settings->Geo-Fencing
  {
    path: "/settings/Geo-Fencing",
    name: "GeoFencing",
    component: GeoFencing,
  },
  // Quotation
  {
    path: "/settings/Quotation",
    name: "SettingsQuotation",
    component: SettingsQuotation,
  },

  //Region
  {
    path: "/settings/sales/express/contract/regions",
    name: "salesRatesRegion",
    component: salesRatesRegion,
  },
  //Zones
  {
    path: "/settings/sales/express/adhoc/zones",
    name: "salesRatesZones",
    component: salesRatesZones,
  },
  //adhoc table row rates
  {
    path: "/settings/sales/express/adhoc/zones/:id",
    name: "salesAdhocRates",
    component: salesAdhocRates,
  },
  {
    path: "/settings/sales/express/adhoc/zones/:id/:zoneId",
    name: "salesAdhocRatesOverview",
    component: salesAdhocRatesOverview,
  },
  //Region Rates
  {
    path: "/settings/sales-settings/regions/rates/:id",
    name: "RegionRates",
    component: RegionRates,
  },
  //Zones adhoc
  {
    path: "/settings/sales-settings/rates/rapido",
    name: "ZonesAdhoc",
    component: ZonesAdhoc,
  },

  //--------------------------Operations-------------------------------//

  {
    path: "/Operation/RiderAllotment",
    name: "RiderAllotment",
    component: RiderAllotment,
  },
  {
    path: "/Operation/RiderZoneAllotment",
    name: "RiderZoneAllotment",
    component: RiderZoneAllotment,
  },
  {
    path: "/Operation/DriverMovementChart",
    name: "DriverMovementChart",
    component: DriverMovementChart,
  },
  {
    path: "/Operation/DeliverydataTablepage",
    name: "DeliverydataTablepage",
    component: DeliverydataTablepage,
  },
  {
    path: "/Operation/Collection",
    name: "Collection",
    component: Collection,
  },
  {
    path: "/Operation/StandbyRiderAllotment",
    name: "StandbyRiderAllotment",
    component: StandbyRiderAllotment,
  },
  {
    path: "/Operation/DeliveryTypeSettings",
    name: "DeliveryTypeSettings",
    component: DeliveryTypeSettings,
  },

  {
    path: "/Operation/DefaultRiderAllotment",
    name: "DefaultRiderAllotment",
    component: DefaultRiderAllotment,
  },
  {
    path: "/Operation/DefaultRiderAllotment",
    name: "DefaultRiderAllotment",
    component: DefaultRiderAllotment,
  },
  {
    path: "/Operation/Check-out",
    name: "CheckOut",
    component: CheckOut,
  },

  //---------------------------Sales--------------------------------------//
  { path: "/sales", name: "SalesHome", component: SalesHome },
  {
    path: "/sales/details/:id/:actionType?",
    name: "QuotationContract",
    component: QuotationContract,
  },
  {
    path: "/sales/details/:id/:actionType",
    name: "AdhocProfile",
    component: QuotationContract,
  },
  {
    path: "/sales/details/overview",
    name: "QuotationOverview",
    component: QuotationOverview,
  },
  {
    path: "/sales/express/contract/bike/:type/overview/:id/:mode",
    name: "ExpressContractBikeQuotationOverview",
    component: ExpressContractBikeQuotationOverview,
  },
  {
    path: "/sales/express/adhoc/:type/overview/:p_id/:id/:mode",
    name: "ExpressAdhocOverview",
    component: ExpressAdhocOverview,
  },
  {
    path: "/sales/international/contract/:type/overview/:id/:pid/:mode",
    name: "InternationalContractOverview",
    component: InternationalContractOverview,
  },
  {
    path: "/sales/international/adhoc/:type/overview/:id/:pid/:mode",
    name: "InternationalAdhoc",
    component: InternationalAdhoc,
  },
  {
    path: "/sales/international/agent/:type/overview/:id/:mode",
    name: "InternationalAgent",
    component: InternationalAgent,
  },
  {
    path: "/sales/express/contract/van/:type/overview/:id/:mode",
    name: "ExpressContractVanQuotataionOverview",
    component: ExpressContractVanQuotataionOverview,
  },
  {
    path: "/sales/express/contract/intercompany/:type/overview/:id/:mode",
    name: "ExpressContractInterCompanyOverview",
    component: ExpressContractInterCompanyOverview,
  },
  {
    path: "/sales/express/contract/bike+fsr/:type/overview/:id/:mode",
    name: "ExpressContractBikeFSRQuotationOverview",
    component: ExpressContractBikeFSRQuotationOverview,
  },
  {
    path: "/sales/express/contract/van+fsr/:type/overview/:id/:mode",
    name: "ExpressContractVanFSROverview",
    component: ExpressContractVanFSROverview,
  },
  {
    path: "/sales/express/contract/:type/overview/:id/:mode",
    name: "ExpressContract",
    component: ExpressContract,
  },
  // {
  //   path: "/sales/express/contract/fsr/:type/overview/:id/:mode",
  //   name: "ExpressContract",
  //   component: ExpressContract,
  // },
  {
    path: "/sales/express/contract/bike+projectjobs/:type/overview/:p_id/:id/:mode",
    name: "ExpressContractBikeProjectJobsOverview",
    component: ExpressContractBikeProjectJobsOverview,
  },
  {
    path: "/sales/express/contract/van+projectjobs/:type/overview/:id/:mode",
    name: "ExpressContractVanProjectJobsOverview",
    component: ExpressContractVanProjectJobsOverview,
  },

  {
    path: "/sales/express/contract/projectjobs/:type/overview/:id/:mode",
    name: "ExpressContractProjectJobsOverview",
    component: ExpressContractProjectJobsOverview,
  },

  {
    path: "/sales/rapido/adhoc/:type/overview/:id/:pid/:mode",
    name: "RapidoRapidoAdhocOverview",
    component: RapidoRapidoAdhocOverview,
  },

  {
    path: "/sales/rapido/contract/:type/:p_id/:id/:mode",
    name: "RapidoRapidoContractOverview",
    component: RapidoRapidoContractOverview,
  },
  {
    path: "/zones",
    name: "operations",
    component: RoutePlanningZones,
  },
  {
    path: "/zones/zonesRoute/:tab/:id/:zoneName",
    name: "zoneRouteoperations",
    component: ZonesRoute,
  },
  {
    path: "/sales/bulkAdjustment/profile/:id",
    name: "BulkAdjustmentRowProfile",
    component: BulkAdjustmentRowProfile,
  },
  {
    path: "/CustomerLaunch",
    name: "CustomerLaunchBookings",
    component: CustomerLaunchBookings,
  },
  {
    path: "/CustomerBookingHistory/:type/:id",
    name: "CustomerBookingHistory",
    component: CustomerBookingHistory,
  },
  {
    path: "/crm-settings",
    name: "CRMSettings",
    component: CRMSettings,
  },
  {
    path: "/crm-feedback",
    name: "CRMFeedback",
    component: CRMFeedback,
  },
  {
    path: "/CsrActivity",
    name: "CsrActivity",
    component: CSRActivityIndex,
  },
  {
    path: "/CustomerLeave",
    name: "CustomerLeave",
    component: CustomerLeave,
  },
  {
    path: "/crm-jobsheetPrinting",
    name: "JobsheetPrinting",
    component: jobsheetPrinting,
  },
  {
    path: "/ClientDetails",
    name: "ClientDetails",
    component: ClientDetails,
  },
  {
    path: "/ClientDetails/:id/:customerName?/:cusId?/:address?",
    name: "ClientContact",
    component: ClientContact,
  },
  {
    path: "/CustomerSuspension",
    name: "CustomerSuspension",
    component: CustomerSuspension,
  },
  {
    path: "/CRM/standardCollectionslips",
    name: "standardCollection",
    component: standardCollection,
  },
  {
    path: "/CRM/bulkActions",
    name: "bulkActions",
    component: bulkActions,
  },
  {
    path: "/CRM/massCollection/:type",
    name: "massCollectionContract",
    component: massCollectionContract,
  },

  {
    path: "/customer-details-crm/:type?/:mode?",
    name: "customerDetailsCrm",
    component: CustomerDataCard,
  },
  {
    path: "/zones/assignArea",
    name: "assignArea",
    component: AssignArea,
  },
  {
    path: "/zones/areaList",
    name: "areaList",
    component: AreaList,
  },
  {
    path: "/supervisorAllotment",
    name: "supervisor",
    component: SupervisorTab,
  },
  {
    path: "/Operation/check-in",
    name: "checkIn",
    component: CheckInTab,
  },
  {
    path: "/specialRiderAllotment",
    name: "specialRider",
    component: SpecialRiderTab,
  },

  {
    path: "/statusSettings",
    name: "statusSettings",
    component: StatusSettings,
  },
  {
    path: "/specialJobEntry",
    name: "specialJobEntry",
    component: SpecialJobEntryParent,
  },
  {
    path: "/Operation/liveJobStatus",
    name: "liveJobStatus",
    component: LiveJobStatus,
  },
  {
    path: "/Operation/transferJob",
    name: "transferJob",
    component: TransferJob,
  },
  {
    path: "/Operation/movementChart",
    name: "movementChart",
    component: MovementChartTab,
  },
];

//CustomerLaunchBookings

const router = createRouter({
  history: createWebHashHistory(),
  mode: "history",
  routes,
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  let accessCode = localStorage.getItem("AccessToken");
  let isAuthenticated;
  if (accessCode) {
    isAuthenticated = true;
  }
  if (to.meta.noAuthenticationNeeded != true) {
    if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
    else next();
  } else next();
});
// Vue.use(VueRouter)

// const router = new VueRouter({
//   mode: 'history',
//   routes
// })

// export default router
export default router;
