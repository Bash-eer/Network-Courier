import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//reusables
import EmptyTemplate from "./components/Reusables/EmptyTemplate.vue";
import StatusTag from "./components/Reusables/StatusTag.vue";
import CancelButton from "./components/Reusables/CancelButton.vue";
import CloseButton from "./components/Reusables/CloseButton.vue";
import ToolBar from "./components/ToolBar/ToolBar.vue";
import BootstrapTabs from "./components/Reusables/BootstrapTabs";
import RatesTabs from "./components/Reusables/Rates/RatesTabs.vue";
import SalesTabs from "./components/Reusables/Sales/SalesTabs.vue";
import FleetManagementTabs from "./components/Reusables/FleetManagement/FleetManagementTabs.vue";
import FleetManagementHomeTabs from "./components/Reusables/FleetManagement/FleetManagementHomeTabs.vue";
import ContactManagementTab from "./components/Reusables/ContactManagement/ContactManagementTab.vue";
import Tabs from "./components/Reusables/Tabs.vue";
import RatesSubTabs from "./components/Reusables/Rates/RatesSubTabs.vue";
import FleetsSubTabs from "./components/Reusables/FleetManagement/FleetsSubTabs.vue";
import SideDrawer from "./components/SideBar/SideDrawer.vue";
import CustomSpeedDial from "./components/Reusables/CustomSpeedDial.vue";
import BadgeDirective from "primevue/badgedirective";
import Badges from "./components/Reusables/Badges.vue";
import NormalBadge from "./components/Reusables/NormalBadge.vue";
import AvatarLabel from "./components/Reusables/AvatarLabel.vue";
import CreatedByBadge from "./components/Reusables/CreatedByBadge.vue";
import Toggle from "./components/Reusables/Toggle.vue";
import Buttons from "./components/Reusables/Buttons.vue";
import TextField from "./components/Reusables/TextField.vue";
import CustomerTags from "./components/Reusables/CustomerTags.vue";
import CompanyNames from "./components/Reusables/CompanyNames.vue";
import ChoiceSelection from "./components/Reusables/ChoiceSelection.vue";
import ChoiceSelect from "./components/Reusables/ChoiceSelect.vue";
import ToastMessages from "./components/Reusables/ToastMessages.vue";
import Stepper from "./components/Reusables/Stepper.vue";
import MultiSelectChips from "./components/Reusables/MultiSelectChips.vue";
import MultiChipCountrySelect from "./components/Reusables/MultiChipCountrySelect.vue";
import NumberField from "./components/Reusables/NumberField.vue";
import DropDown from "./components/Reusables/DropDown.vue";
import CountryDrop from "./components/Reusables/CountryDrop.vue";
import AddressArea from "./components/Reusables/Address.vue";
import DropDownField from "./components/Reusables/DropdownField.vue";
import AddNewDropDown from "./components/Reusables/AddNewDropDown.vue";
import AddNewDropDownTextField from "./components/Reusables/AddNewDropDownTextField.vue";
import StatusDropDown from "./components/Reusables/StatusDropDown.vue";
import RadioButtons from "./components/Reusables/RadioButtons.vue";
import CheckBox from "./components/Reusables/CheckBox.vue";
import SingleCheckBox from "./components/Reusables/SingleCheckBox.vue";
import ChartTemplate from "./components/Reusables/ChartTemplate.vue";
import Carousels from "./components/Login/Carousels.vue";
import Calendars from "./components/Reusables/Calendars.vue";
import Calendar from "primevue/calendar";
import CascadeSelector from "./components/Reusables/CascadeSelector.vue";
import Chips from "./components/Reusables/Chips.vue";
import StatusTags from "./components/Reusables/StatusTags.vue";
import Preview from "./components/Reusables/Preview.vue";
import GroupedAvatars from "./components/Reusables/GroupedAvatars.vue";
import PrimeGroupedAvatars from "./components/Reusables/PrimeGroupedAvatars.vue";
import GroupedFiles from "./components/Reusables/GroupedFiles.vue";
import ImgUpload from "./components/Reusables/ImgUpload.vue";
import MultiImagesUpload from "./components/Reusables/MultiImagesUpload.vue";
import RemovableImageChips from "./components/Reusables/RemovableImageChips.vue";
import DragAndDropUpload from "./components/Reusables/DragAndDropUpload.vue";
import DuoSelect from "./components/Reusables/DuoSelect.vue";
import TimePicker from "./components/Reusables/TimePicker.vue";
import TimePicker24 from "./components/Reusables/TimePicker24.vue";
import TextAreaField from "./components/Reusables/TextAreaField.vue";
import CircularProgress from "./components/Reusables/CircularProgress.vue";
import Map from "./components/Dashboard/MapCard.vue";
import List from "./components/Reusables/List.vue";
import StepperRoute from "./components/Reusables/StepperRoute.vue";
import ZoneChips from "./components/Settings/Sales/Express/Adhoc/SelectionChips/ZoneChips.vue";

//charts
import MultiLineChart from "./components/Reusables/Charts/MultiLineChart";

//tabs
import ExpressContractPageTabs from "./components/Settings/Sales/Express/Contract/Tabs/PageTabs.vue";
import RegularTabs from "./components/Settings/Quotation/Tabs/RegularTabs.vue";
import InternationalRegularTabs from "./components/Settings/Sales/International/Tabs/InternationalRegularTabs.vue";
import InternationalClearanceAndAdditioanlTabs from "./components/Settings/Sales/International/Tabs/InternationalClearanceAndAdditioanlTabs.vue";
//tables
import DataTables from "./components/Reusables/DataTables.vue";
import FormTable from "./components/Reusables/FormTables/FormTable.vue";
import TimeLineTable from "./components/Reusables/TimeLineTables/TimeLineTable.vue";
import RatesTables from "./components/Reusables/Rates/RatesTables.vue";
import SalesTables from "./components/Reusables/Sales/SalesTables.vue";
import FleetManagementTables from "./components/Reusables/FleetManagement/FleetManagementTables.vue";
import FleetManagementSubTables from "./components/Reusables/FleetManagement/FleetManagementSubTables.vue";
import TreeTables from "./components/Reusables/TreeTables.vue";
import CustomTreeTable from "./components/Reusables/CustomTreeTable.vue";
import ContactManagementTable from "./components/Reusables/ContactManagement/Tables/ContactManagementTable.vue";
import ContactTables from "./components/Reusables/ContactManagement/Tables/ContactTables.vue";
import ContactSubTables from "./components/Reusables/ContactManagement/Tables/ContactSubTables.vue";
import ContactLabelsTable from "./components/Reusables/ContactManagement/Tables/ContactLabelsTable.vue";

//contacts
import ContactsSelection from "./components/Reusables/ContactManagement/ContactsSelection.vue";
import Invitees from "./components/Reusables/ContactManagement/Invitees.vue";
import EventGroups from "./components/Reusables/ContactManagement/EventGroups.vue";

//fleet
import DashboardVehicleLog from "./views/Modules/FleetManagement/Dashboard/DashboardVehicleLog.vue";
import DashboardVehicleDetails from "./views/Modules/FleetManagement/Dashboard/DashboardVehicleDetails.vue";
import DashboardMaintenance from "./views/Modules/FleetManagement/Dashboard/DashboardMaintenance.vue";
import DashboardFuel from "./views/Modules/FleetManagement/Dashboard/DashboardFuel.vue";
import DashboardInsurance from "./views/Modules/FleetManagement/Dashboard/DashboardInsurance.vue";
import DashboardRoadTax from "./views/Modules/FleetManagement/Dashboard/DashboardRoadTax.vue";
import DashboardCOE from "./views/Modules/FleetManagement/Dashboard/DashboardCOE.vue";
import DashboardSummon from "./views/Modules/FleetManagement/Dashboard/DashboardSummon.vue";
import DashboardAccidents from "./views/Modules/FleetManagement/Dashboard/DashboardAccidents.vue";

//fleet table expansion templates
import ExpansionTemplateOne from "./components/Reusables/FleetManagement/ExpansionTemplates/ExpansionTemplateOne.vue";
import ExpansionTemplateTwo from "./components/Reusables/FleetManagement/ExpansionTemplates/ExpansionTemplateTwo.vue";
import ExpansionTemplateThree from "./components/Reusables/FleetManagement/ExpansionTemplates/ExpansionTemplateThree.vue";
import AttachmentsTemplate from "./components/Reusables/FleetManagement/ExpansionTemplates/AttachmentsTemplate.vue";
import LatestFleetTemplate from "./components/Reusables/FleetManagement/ExpansionTemplates/LatestFleetTemplate.vue";
import LatestInspectionsTemplate from "./components/Reusables/FleetManagement/ExpansionTemplates/LatestInspectionsTemplate.vue";
import OtherInspectionsTemplate from "./components/Reusables/FleetManagement/ExpansionTemplates/OtherInspectionsTemplate.vue";
import HistoryFleetTemplate from "./components/Reusables/FleetManagement/ExpansionTemplates/HistoryFleetTemplate.vue";

//for dialogs
import Dialogs from "./components/Reusables/Dialogs.vue";
import UserSettingsDialog from "./components/Dialogs/Users/UserSettingsDialog.vue";
import CreateRoleDialog from "./components/Dialogs/Users/CreateRoleDialog.vue";
import AgentDialog from "./components/Dialogs/Users/AgentDialog.vue";
import OrganizationDialog from "./components/Dialogs/Users/OrganizationDialog.vue";
import ResetConfirmation from "./components/Dialogs/Users/ResetConfirmation.vue";
import ProfileVerifyEmailDialog from "./components/Dialogs/Profile/ProfileVerifyEmailDialog.vue";
import ProfileResetPasswordDialog from "./components/Dialogs/Profile/ProfileResetPasswordDialog.vue";
import zoneCreationDialog from "./components/Operations/Dialogs/Zones/zoneCreationDialog.vue";
import newRouteZoneDialog from "./components/Operations/Dialogs/Zones/newRouteZoneDialog.vue";

//sales - create company dialog
import companyCreationDialog from "./components/Dialogs/Sales/CompanyCreation/companyCreationDialog.vue";
import Information from "./components/Dialogs/Sales/CompanyCreation/Information.vue";
import Address from "./components/Dialogs/Sales/CompanyCreation/Address.vue";
import Contact from "./components/Dialogs/Sales/CompanyCreation/Contact.vue";
import CompanyCategory from "./components/Dialogs/Sales/CompanyCreation/CompanyCategory.vue";
import IndividualCategory from "./components/Dialogs/Sales/CompanyCreation/IndividualCategory.vue";

import GeneralQuotationDialog from "./components/Dialogs/Sales/Quotation/generalQuotationDialog.vue";
import QuotationAddAddress from "./components/Dialogs/Sales/Quotation/CommonFields/QuotationAddAddress.vue";
import QuotationCostingDetails from "./components/Dialogs/Sales/Quotation/CommonFields/QuotationCostingDetails.vue";
import QuotationSelectMethod from "./components/Dialogs/Sales/Quotation/CommonFields/QuotationSelectMethod.vue";
import QuotationTripDetails from "./components/Dialogs/Sales/Quotation/CommonFields/QuotationTripDetails.vue";
import QutationContractOrSendQuotations from "./components/Dialogs/Sales/Quotation/CommonFields/QutationContractOrSendQuotations.vue";
//sales quotation dialogs
//sales quotation dialogs
//timeline dialog
//attachment
import AttachmentDialog from "./components/Dialogs/Sales/TimeLine/AttachmentDialog.vue";
//follow up
import FollowUpDialog from "./components/Dialogs/Sales/TimeLine/FollowUpDialog.vue";
//bill preferences
import BillingPreferencesDialog from "./components/Dialogs/Sales/TimeLine/BillingPreferencesDialog.vue";
//cost centres
import CostCentresDialog from "./components/Dialogs/Sales/TimeLine/CostCentre/CostCentresDialog.vue";
import CostCentresAddAddress from "./components/Dialogs/Sales/TimeLine/CostCentre/CostCentresAddAddress.vue";
import CostCentresContactPerson from "./components/Dialogs/Sales/TimeLine/CostCentre/CostCentresContactPerson.vue";
import CostCentresTripSchedule from "./components/Dialogs/Sales/TimeLine/CostCentre/CostCentresTripSchedule.vue";
import CostCentresSiteCharges from "./components/Dialogs/Sales/TimeLine/CostCentre/CostCentresSiteCharges.vue";
//express dialogs
//express contract bike
import ExpressContractBikeTripDetails from "./components/Dialogs/Sales/Quotation/Express/ExpressContractBike/ExpressContractBikeTripDetails.vue";
import ExpressContractBikeCostingDetails from "./components/Dialogs/Sales/Quotation/Express/ExpressContractBike/ExpressContractBikeCostingDetails.vue";
import ExpressContractBikeContractOrSendQuotation from "./components/Dialogs/Sales/Quotation/Express/ExpressContractBike/ExpressContractBikeContractOrSendQuotation.vue";
//express contract Van;
import ExpressContractVanTripDetails from "./components/Dialogs/Sales/Quotation/Express/ExpressContractVan/ExpressContractVanTripDetails.vue";
import ExpressContractVanCostingDetails from "./components/Dialogs/Sales/Quotation/Express/ExpressContractVan/ExpressContractVanCostingDetails.vue";
import ExpressContractVanContractOrSendQuotation from "./components/Dialogs/Sales/Quotation/Express/ExpressContractVan/ExpressContractVanContractOrSendQuotation.vue";
//sales - international adhoc dialog
import SalesInternationalAdhocDialog from "./components/Dialogs/Sales/Quotation/International/InternationalAdhoc/InternationalAdhocDialog.vue";
//sales
import QuotationHeader from "./views/Modules/Sale/QuotationHeader.vue";
import QuotationTab from "./views/Modules/Sale/QuotationTab.vue";
import ContractTab from "./views/Modules/Sale/ContractTab.vue";
import ExpressTimeLineHeader from "./views/Modules/Sale/ExpressTimeLineHeader.vue";
//sales -> express
import OverView from "./views/Modules/Sale/Express/OverView.vue";
import CostCentre from "./views/Modules/Sale/Express/CostCentre.vue";
import BillPreferences from "./views/Modules/Sale/Express/BillPreferences.vue";
import FollowUp from "./views/Modules/Sale/Express/FollowUp.vue";
import Attachments from "./views/Modules/Sale/Express/Attachments.vue";
import CostingDetails from "./views/Modules/Sale/Express/CostingDetails.vue";
import TripSchedule from "./views/Modules/Sale/Express/TripSchedule.vue";

//masters
//fleet masters
//common fleets dialog
import FleetCommonDialog from "./components/Dialogs/FleetManagement/FleetMasters/FleetCommonDialog.vue";
//fuel card
import FuelCardDialog from "./components/Dialogs/FleetManagement/FleetMasters/Fuel/FuelCardDialog.vue";
import FuelVisaCardDialog from "./components/Dialogs/FleetManagement/FleetMasters/Fuel/FuelVisaCardDialog.vue";
import FuelHistoryDialog from "./components/Dialogs/FleetManagement/FleetMasters/Fuel/FuelHistoryDialog.vue";
//cash card
import CashCardDialog from "./components/Dialogs/FleetManagement/FleetMasters/Cash/CashCardDialog.vue";
import CashVisaCardDialog from "./components/Dialogs/FleetManagement/FleetMasters/Cash/CashVisaCardDialog.vue";
import CashTopUpDialog from "./components/Dialogs/FleetManagement/FleetMasters/Cash/CashTopUpDialog.vue";
import CashHistoryDialog from "./components/Dialogs/FleetManagement/FleetMasters/Cash/CashHistoryDialog.vue";

const app = createApp(App);
app.directive("badge", BadgeDirective);

//express dialogs
//express rates
import AddNewExpressRateDialog from "./components/Dialogs/Rates/Express/ExpressRates/AddNewExpressRateDialog.vue";
import Rates from "./components/Dialogs/Rates/Express/ExpressRates/Rates.vue";
import Trips from "./components/Dialogs/Rates/Express/ExpressRates/Trips.vue";
import AddNewMultiTierRate from "./components/Dialogs/Rates/Express/AddNewMultiTierRate.vue";

//regions
import AddNewRegion from "./components/Dialogs/Rates/Express/AddNewRegion.vue";

//for masters add new pages
// - for international

// - for express
import Regions from "./views/Modules/Settings/Rates/Express/Regions.vue";
import ExpressMultiTierPage from "./views/Modules/Settings/Rates/Express/ExpressMultiTierPage.vue";
import EmptyComponent from "./components/Reusables/EmptyComponent.vue";

// for fleet management
//add new vehicle dialog
import VehicleDetailsDialog from "./components/Dialogs/FleetManagement/VehiclesDetails/VehicleDetailsDialog";
import VehicleDetails from "./components/Dialogs/FleetManagement/VehiclesDetails/VehicleDetails.vue";
import InsuranceDetails from "./components/Dialogs/FleetManagement/VehiclesDetails/InsuranceDetails.vue";
import RoadTaxDetails from "./components/Dialogs/FleetManagement/VehiclesDetails/RoadTaxDetails.vue";
import CoeDetails from "./components/Dialogs/FleetManagement/VehiclesDetails/CoeDetails.vue";
//expenditure
import SummonsDialog from "./components/Dialogs/FleetManagement/Expenditure/SummonsDialog";
import ClaimDialog from "./components/Dialogs/FleetManagement/Expenditure/ClaimDialog";
import CoeDialog from "./components/Dialogs/FleetManagement/Expenditure/CoeDialog";
import InsuranceDialog from "./components/Dialogs/FleetManagement/Expenditure/InsuranceDialog";
import RoadTaxDialog from "./components/Dialogs/FleetManagement/Expenditure/RoadTaxDialog";
import AccidentsDialog from "./components/Dialogs/FleetManagement/Expenditure/AccidentsDialog";

//for Contact Management
import RoomSettingsDialog from "./components/Dialogs/ContactManagement/RoomSettingsDialog";
import EventStatusDialog from "./components/Dialogs/ContactManagement/EventStatusDialog";

//fuel
import FleetFuelDialog from "./components/Dialogs/FleetManagement/FleetFuelDialog.vue";
//maintenance
import FleetMaintenanceDialog from "./components/Dialogs/FleetManagement/FleetMaintenanceDialog.vue";
//inspection
import FleetInspectionDialog from "./components/Dialogs/FleetManagement/FleetInspectionDialog.vue";
//claims
import FleetClaims from "./views/Modules/FleetManagement/Claims/FleetClaims.vue";
import NewClaimDialog from "./components/Dialogs/FleetManagement/Claims/NewClaimDialog.vue";

//contact management
import ContactManagementEvent from "./views/Modules/ContactManagement/ContactManagementEvent.vue";
import Attendance from "./components/ContactManagement/Attendance.vue";
import EDMDialog from "./components/Dialogs/ContactManagement/EDMDialog.vue";
import EDMTab from "./components/ContactManagement/EDM/EDMTab.vue";
import EmbedCodeTab from "./components/ContactManagement/EDM/EmbedCodeTab.vue";
import ThanksMessageTab from "./components/ContactManagement/EDM/ThanksMessageTab.vue";
import NoWorriesMessageTab from "./components/ContactManagement/EDM/NoWorriesMessageTab.vue";
import MeetingRooms from "./views/Modules/ContactManagement/MeetingRooms.vue";
import CurrentStatus from "./components/ContactManagement/MeetingRooms/CurrentStatus.vue";
import AvailableRooms from "./components/ContactManagement/MeetingRooms/AvailableRooms.vue";
//contacts
import ContactsDialog from "./components/Dialogs/ContactManagement/Contacts/ContactsDialog.vue";
import BasicDetails from "./components/Dialogs/ContactManagement/Contacts/BasicDetails.vue";
import ResidenceDetails from "./components/Dialogs/ContactManagement/Contacts/ResidenceDetails.vue";
import OfficeDetails from "./components/Dialogs/ContactManagement/Contacts/OfficeDetails.vue";
import PersonalInfo from "./components/Dialogs/ContactManagement/Contacts/PersonalInfo.vue";
//contact groups
import ContactsGroupDialog from "./components/Dialogs/ContactManagement/ContactGroups/ContactsGroupDialog.vue";
import ContactsMainGroup from "./components/Dialogs/ContactManagement/ContactGroups/ContactsMainGroup.vue";
import ContactsSubGroup from "./components/Dialogs/ContactManagement/ContactGroups/ContactsSubGroup.vue";
import MembersDialog from "./components/Dialogs/ContactManagement/ContactGroups/MembersDialog.vue";
//donations
import DonationDialog from "./components/Dialogs/ContactManagement/DonationDialog.vue";
import AppointmentDialog from "./components/Dialogs/ContactManagement/AppointmentDialog.vue";
//events
import CreateEventGroupsDialog from "./components/Dialogs/ContactManagement/Events/EventGroups/CreateEventGroupsDialog.vue";
import EventMainGroup from "./components/Dialogs/ContactManagement/Events/EventGroups/EventMainGroup.vue";
import EventSubGroup from "./components/Dialogs/ContactManagement/Events/EventGroups/EventSubGroup.vue";
//invitees
import InviteesDialog from "./components/Dialogs/ContactManagement/Invitees/InviteesDialog.vue";
import InviteesStatusDialog from "./components/Dialogs/ContactManagement/Invitees/InviteesStatusDialog.vue";
import PrintLabelDialog from "./components/Dialogs/ContactManagement/Invitees/PrintLabelDialog.vue";
import ContactsFollowUpDialog from "./components/Dialogs/ContactManagement/Invitees/ContactsFollowUpDialog.vue";
//export report
import ReportExport from "./components/Reusables/ExportReport.vue";
import SearchField from "./components/Reusables/SearchField.vue";
import SearchContact from "./components/Reusables/SearchContact.vue";

// Others DataTable
import Otherstable from "./components/Settings/Sales/Others/OthersTable.vue";

//Route Planning Operations zones
import ZonesTab from "./components/Reusables/Operations/ZonesTab.vue";
import ZoneTables from "./components/Reusables/Operations/ZoneTables.vue";
import ZonesRoute from "./views/Modules/Operations/zonesRoute/zonesRoute.vue";
import ZoneRouteTable from "./views/Modules/Operations/zonesRoute/zoneRouteTables/zoneRouteTable.vue";

//Route Assign Area
import AvailableAreaName from "./views/Modules/Operations/assignArea/availableAreaName.vue";
import SelectedAreaName from "./views/Modules/Operations/assignArea/selectedAreaName.vue";

//Route Area List
import AreaListTable from "./views/Modules/Operations/areaList/areaListTable";

app.component("EmptyTemplate", EmptyTemplate);
app.component("StatusTag", StatusTag);
app.component("CancelButton", CancelButton);
app.component("CloseButton", CloseButton);
app.component("ToolBar", ToolBar);
app.component("BootstrapTabs", BootstrapTabs);
app.component("RatesTabs", RatesTabs);
app.component("SalesTabs", SalesTabs);
app.component("ZonesTab", ZonesTab);
app.component("ZonesRoute", ZonesRoute);

app.component("FleetManagementTabs", FleetManagementTabs);
app.component("FleetManagementHomeTabs", FleetManagementHomeTabs);
app.component("ContactManagementTab", ContactManagementTab);
app.component("TextField", TextField);
app.component("Tabs", Tabs);
app.component("RatesSubTabs", RatesSubTabs);
app.component("FleetsSubTabs", FleetsSubTabs);
app.component("SideDrawer", SideDrawer);
app.component("CustomSpeedDial", CustomSpeedDial);
app.component("NormalBadge", NormalBadge);
app.component("Badges", Badges);
app.component("AvatarLabel", AvatarLabel);
app.component("CreatedByBadge", CreatedByBadge);
app.component("Toggle", Toggle);
app.component("Buttons", Buttons);
app.component("CustomerTags", CustomerTags);
app.component("CompanyNames", CompanyNames);
app.component("ChoiceSelection", ChoiceSelection);
app.component("CheckBox", CheckBox);
app.component("SingleCheckBox", SingleCheckBox);
app.component("ChoiceSelect", ChoiceSelect);
app.component("ToastMessages", ToastMessages);
app.component("Stepper", Stepper);
app.component("MultiSelectChips", MultiSelectChips);
app.component("MultiChipCountrySelect", MultiChipCountrySelect);
app.component("NumberField", NumberField);
app.component("DropDown", DropDown);
app.component("AddressArea", AddressArea);
app.component("CountryDrop", CountryDrop);
app.component("DropDownField", DropDownField);
app.component("AddNewDropDown", AddNewDropDown);
app.component("AddNewDropDownTextField", AddNewDropDownTextField);
app.component("StatusDropDown", StatusDropDown);
app.component("CreateRoleDialog", CreateRoleDialog);
app.component("RadioButtons", RadioButtons);
app.component("ChartTemplate", ChartTemplate);
app.component("Carousels", Carousels);
app.component("Calendars", Calendars);
app.component("Calendar", Calendar);
app.component("CascadeSelector", CascadeSelector);
app.component("Chips", Chips);
app.component("StatusTags", StatusTags);
app.component("Preview", Preview);
app.component("GroupedAvatars", GroupedAvatars);
app.component("PrimeGroupedAvatars", PrimeGroupedAvatars);
app.component("GroupedFiles", GroupedFiles);
app.component("ImgUpload", ImgUpload);
app.component("MultiImagesUpload", MultiImagesUpload);
app.component("RemovableImageChips", RemovableImageChips);
app.component("DragAndDropUpload", DragAndDropUpload);
app.component("DuoSelect", DuoSelect);
app.component("TimePicker", TimePicker);
app.component("TimePicker24", TimePicker24);
app.component("TextAreaField", TextAreaField);
app.component("CircularProgress", CircularProgress);
app.component("Map", Map);
app.component("List", List);
app.component("ZoneChips", ZoneChips);

//charts
app.component("MultiLineChart", MultiLineChart);

//tabs
app.component("ExpressContractPageTabs", ExpressContractPageTabs);
app.component("InternationalRegularTabs", InternationalRegularTabs);
app.component("RegularTabs", RegularTabs);
app.component(
  "InternationalClearanceAndAdditioanlTabs",
  InternationalClearanceAndAdditioanlTabs
);

//tables
app.component("DataTables", DataTables);
app.component("FormTable", FormTable);
app.component("FleetManagementTables", FleetManagementTables);
app.component("FleetManagementSubTables", FleetManagementSubTables);
app.component("ContactManagementTable", ContactManagementTable);
app.component("TimeLineTable", TimeLineTable);
app.component("RatesTables", RatesTables);
app.component("SalesTables", SalesTables);
app.component("TreeTables", TreeTables);
app.component("CustomTreeTable", CustomTreeTable);
app.component("ContactTables", ContactTables);
app.component("ContactSubTables", ContactSubTables);
app.component("ContactLabelsTable", ContactLabelsTable);
app.component("ZoneTables", ZoneTables);
app.component("ZoneRouteTable", ZoneRouteTable);
//contacts
app.component("ContactsSelection", ContactsSelection);
app.component("Invitees", Invitees);
app.component("EventGroups", EventGroups);

//fleet
app.component("DashboardVehicleLog", DashboardVehicleLog);
app.component("DashboardVehicleDetails", DashboardVehicleDetails);
app.component("DashboardMaintenance", DashboardMaintenance);
app.component("DashboardFuel", DashboardFuel);
app.component("DashboardInsurance", DashboardInsurance);
app.component("DashboardRoadTax", DashboardRoadTax);
app.component("DashboardCOE", DashboardCOE);
app.component("DashboardSummon", DashboardSummon);
app.component("DashboardAccidents", DashboardAccidents);

//fleet table expansion templates
app.component("ExpansionTemplateOne", ExpansionTemplateOne);
app.component("ExpansionTemplateTwo", ExpansionTemplateTwo);
app.component("ExpansionTemplateThree", ExpansionTemplateThree);
app.component("AttachmentsTemplate", AttachmentsTemplate);
app.component("LatestFleetTemplate", LatestFleetTemplate);
app.component("LatestInspectionsTemplate", LatestInspectionsTemplate);
app.component("OtherInspectionsTemplate", OtherInspectionsTemplate);
app.component("HistoryFleetTemplate", HistoryFleetTemplate);

//for dialogs
app.component("Dialogs", Dialogs);
app.component("UserSettingsDialog", UserSettingsDialog);
app.component("AgentDialog", AgentDialog);
app.component("OrganizationDialog", OrganizationDialog);
app.component("ResetConfirmation", ResetConfirmation);
app.component("ProfileVerifyEmailDialog", ProfileVerifyEmailDialog);
app.component("ProfileResetPasswordDialog", ProfileResetPasswordDialog);

//sales - create company dialog
app.component("companyCreationDialog", companyCreationDialog);
app.component("Information", Information);
app.component("Address", Address);
app.component("CompanyCategory", CompanyCategory);
app.component("IndividualCategory", IndividualCategory);
app.component("Contact", Contact);

app.component("GeneralQuotationDialog", GeneralQuotationDialog);
app.component("QuotationAddAddress", QuotationAddAddress);
app.component("QuotationCostingDetails", QuotationCostingDetails);
app.component("QuotationSelectMethod", QuotationSelectMethod);
app.component("QuotationTripDetails", QuotationTripDetails);
app.component(
  "QutationContractOrSendQuotations",
  QutationContractOrSendQuotations
);

//Zones - Dialogs
app.component("zoneCreationDialog", zoneCreationDialog);

//Zone route - Dialogs
app.component("newRouteZoneDialog", newRouteZoneDialog);

//sales quotation dialogs
//time line dialog
//attachment
app.component("AttachmentDialog", AttachmentDialog);
//follow up
app.component("FollowUpDialog", FollowUpDialog);
//bill preferences
app.component("BillingPreferencesDialog", BillingPreferencesDialog);
//cost centres
app.component("CostCentresDialog", CostCentresDialog);
app.component("CostCentresAddAddress", CostCentresAddAddress);
app.component("CostCentresContactPerson", CostCentresContactPerson);
app.component("CostCentresTripSchedule", CostCentresTripSchedule);
app.component("CostCentresSiteCharges", CostCentresSiteCharges);
//express dialogs
//express contract bike
app.component("ExpressContractBikeTripDetails", ExpressContractBikeTripDetails);
app.component(
  "ExpressContractBikeCostingDetails",
  ExpressContractBikeCostingDetails
);
app.component(
  "ExpressContractBikeContractOrSendQuotation",
  ExpressContractBikeContractOrSendQuotation
);
//express contract Van
app.component("ExpressContractVanTripDetails", ExpressContractVanTripDetails);
app.component(
  "ExpressContractVanCostingDetails",
  ExpressContractVanCostingDetails
);
app.component(
  "ExpressContractVanContractOrSendQuotation",
  ExpressContractVanContractOrSendQuotation
);

//sales
app.component("QuotationHeader", QuotationHeader);
app.component("QuotationTab", QuotationTab);
app.component("ContractTab", ContractTab);
//sales -> express
app.component("OverView", OverView);
app.component("CostCentre", CostCentre);
app.component("BillPreferences", BillPreferences);
app.component("FollowUp", FollowUp);
app.component("Attachments", Attachments);
app.component("ExpressTimeLineHeader", ExpressTimeLineHeader);
app.component("CostingDetails", CostingDetails);
app.component("TripSchedule", TripSchedule);
//sales -> international adhoc
app.component("SalesInternationalAdhocDialog", SalesInternationalAdhocDialog);

//masters
//fleet masters
app.component("FleetCommonDialog", FleetCommonDialog);
app.component("FuelVisaCardDialog", FuelVisaCardDialog);
app.component("CashVisaCardDialog", CashVisaCardDialog);
app.component("CashTopUpDialog", CashTopUpDialog);

//express dialogs
//express rates
app.component("AddNewExpressRateDialog", AddNewExpressRateDialog);
app.component("Rates", Rates);
app.component("Trips", Trips);

app.component("AddNewMultiTierRate", AddNewMultiTierRate);

//regions
app.component("AddNewRegion", AddNewRegion);

//for masters add new pages
// - for international

//for express
app.component("Regions", Regions);
app.component("ExpressMultiTierPage", ExpressMultiTierPage);
app.component("EmptyComponent", EmptyComponent);

//for fleet management
//add new vehicle dialog
app.component("VehicleDetailsDialog", VehicleDetailsDialog);
app.component("VehicleDetails", VehicleDetails);
app.component("CoeDetails", CoeDetails);
app.component("RoadTaxDetails", RoadTaxDetails);
app.component("InsuranceDetails", InsuranceDetails);

//expenditure dialogs
app.component("SummonsDialog", SummonsDialog);
app.component("CoeDialog", CoeDialog);
app.component("ClaimDialog", ClaimDialog);
app.component("InsuranceDialog", InsuranceDialog);
app.component("RoadTaxDialog", RoadTaxDialog);
app.component("AccidentsDialog", AccidentsDialog);
//fuel
app.component("FleetFuelDialog", FleetFuelDialog);
//maintenance
app.component("FleetMaintenanceDialog", FleetMaintenanceDialog);
//inspection
app.component("FleetInspectionDialog", FleetInspectionDialog);
//claims
app.component("FleetClaims", FleetClaims);
app.component("NewClaimDialog", NewClaimDialog);

//fleet masters
app.component("FuelCardDialog", FuelCardDialog);
app.component("CashCardDialog", CashCardDialog);
app.component("CashHistoryDialog", CashHistoryDialog);
app.component("FuelHistoryDialog", FuelHistoryDialog);

//contact management
app.component("ContactManagementEvent", ContactManagementEvent);
app.component("Attendance", Attendance);
app.component("RoomSettingsDialog", RoomSettingsDialog);
app.component("EventStatusDialog", EventStatusDialog);
app.component("EDMDialog", EDMDialog);
app.component("EDMTab", EDMTab);
app.component("EmbedCodeTab", EmbedCodeTab);
app.component("ThanksMessageTab", ThanksMessageTab);
app.component("NoWorriesMessageTab", NoWorriesMessageTab);
app.component("MeetingRooms", MeetingRooms);
app.component("CurrentStatus", CurrentStatus);
app.component("AvailableRooms", AvailableRooms);
//contacts
app.component("ContactsDialog", ContactsDialog);
app.component("BasicDetails", BasicDetails);
app.component("ResidenceDetails", ResidenceDetails);
app.component("OfficeDetails", OfficeDetails);
app.component("PersonalInfo", PersonalInfo);
//contact groups
app.component("ContactsGroupDialog", ContactsGroupDialog);
app.component("ContactsMainGroup", ContactsMainGroup);
app.component("ContactsSubGroup", ContactsSubGroup);
app.component("MembersDialog", MembersDialog);
//donations
app.component("DonationDialog", DonationDialog);
app.component("AppointmentDialog", AppointmentDialog);

//event groups
app.component("CreateEventGroupsDialog", CreateEventGroupsDialog);
app.component("EventMainGroup", EventMainGroup);
app.component("EventSubGroup", EventSubGroup);
//invitees
app.component("InviteesDialog", InviteesDialog);
app.component("InviteesStatusDialog", InviteesStatusDialog);
app.component("PrintLabelDialog", PrintLabelDialog);
app.component("ContactsFollowUpDialog", ContactsFollowUpDialog);
//export report
app.component("ReportExport", ReportExport);
app.component("SearchField", SearchField);
app.component("SearchContact", SearchContact);
app.component("SearchContact", SearchContact);

// Others sale tabel
app.component("StepperRoute", StepperRoute);

//Others Datatable
app.component("Otherstable", Otherstable);

//Assign Area
app.component("AvailableAreaName", AvailableAreaName);
app.component("SelectedAreaName", SelectedAreaName);

//Area List
app.component("AreaListTable", AreaListTable);

app
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(ConfirmationService)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAwCFzc4dPJim1jLtIk7ZU1PgAGWWEEQ48",
      useBetaRenderer: true,
      libraries: "places",
      language: "en",
    },
    autobindAllEvents: true,
  })
  .mount("#app");
