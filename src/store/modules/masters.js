import axios from "axios";
// import { or } from "ip";
const { URL } = require("../../../config/const");
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

function processFleetCardsLatest(data) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "cost_center" ||
        d_keys == "customer_no" ||
        d_keys == "vendor"
      ) {
        latest[d_keys] = d_obj[d_keys];
      }
    }

    d_obj["latestData"] = latest;
  }
  return data;
}

const masters = {
  namespaced: true,
  state: {
    //fleet masters
    fleetsCardHistoryProcessedData: {},
    //follow up
    RoomsMasterFormStateData: {},
    EventStatusMasterFormStateData: {},
    ThirdPartyIntergrationData: [
      {
        img_url: "/images/payboy.png",
        title: "Payboy",
        content: "Amet minim mollit non deserunt ullamco est sit aliq",
        button_label: "Sync",
      },
      {
        img_url: "/images/xero.png",
        title: "Xero",
        content: "Amet minim mollit non deserunt ullamco est sit aliq",
        button_label: "Sync",
      },
      {
        img_url: "/images/google.png",
        title: "Google",
        content: "Amet minim mollit non deserunt ullamco est sit aliq",
        button_label: "Connect",
      },
    ],
    //fleets
    FuelVisaCardDetails: {
      cardName: "FUEL",
      vendor: "MASTERCARD",
      cardNumber: "1234 5678 9893",
      cardType: "PLATINUM",
      issueDate: "06 / 22",
      expiryDate: "06 / 22",
      usedCredit: "23.800 S$",
      topupCycle: "Weekly",
      topupDay: "Sunday",
    },
    CashVisaCardDetails: {
      cardName: "CASH",
      vendor: "MASTERCARD",
      cardNumber: "1234 5678 9893",
      cardType: "PLATINUM",
      issueDate: "06 / 22",
      expiryDate: "06 / 22",
      usedCredit: "23.800 S$",
      topupCycle: "Weekly",
      topupDay: "Sunday",
    },
    roomsSettingsFiles: [],
    roomsSettingsStateData: {},
    FleetCommonDialogName: null,
    fleetMastersCurrentTab: "Vehicle Types",
    fleetsFormData: {},
    //cash card data
    // fleetsCashCardData : {},
    fleetsCashCardDialogId: null,
    //fuel
    fleetCardType: null,
    fleetsCardData: null,

    expressRegion: null,
    tableLoad: false,
    formTableData: [],
    tripScheduleFormTableData: [],
    contactsFormTableData: [],
    costCentresFormTableData: [],
    //forms state data
    //express rates
    expressRateCardDetails: null,
    expressRatesSubmitted: false,
    expressRatesSubmittedValidation: null,
    expressExpressRatesFormData: {},
    expressRatesAddRateType: null,
    //expres regions
    expressRegionFormData: {},
    //dropdown data
    expressRegionsDropDown: null,
    expressTripCardsDropDown: null,
    //contact settings datas
    ContactSettingsTabMenuData: [
      {
        label: "ContactSettingsRooms",
        tab: "ContactManagementTable",
        select: true,
        heading: "ContactSettingsRooms",
        tabName: "Room Settings",
        data: "RoomsTableData",
        columns: "RoomsTableColumnData",
      },
      {
        label: "ContactSettingsEventStatus",
        tab: "ContactManagementTable",
        select: false,
        heading: "ContactSettingsEventStatus",
        tabName: "Event Status",
        data: "EventStatusTableData",
        columns: "EventStatusTableColumnData",
      },
    ],
    //tab datas
    mastersTabMenuData: [
      {
        label: "International",
        tab: "RatesTables",
        select: true,
        tabName: "International",
        data: "ratesInternationalTableData",
        columns: "ratesInternationalTableColumnData",
      },
      {
        label: "Express",
        tab: "RatesTables",
        select: false,
        tabName: "Express",
        data: "ratesExpressTableData",
        columns: "ratesExpressTableColumnData",
      },
      {
        label: "Rapido",
        tab: "RatesTables",
        select: false,
        tabName: "Rapido",
        data: "expressRatesTableData",
        columns: "ratesExpressExpressRatesTableColumnData",
      },
    ],
    internationalCompaniesTabMenuData: [
      {
        label: "Zones",
        tab: "RatesTables",
        select: true,
        tabName: "Zones",
        data: "zonesTableData",
        columns: "zonesTableColumnData",
      },
      {
        label: "Weights",
        tab: "RatesTables",
        select: false,
        tabName: "Weights",
        data: "weightsTableData",
        columns: "weightsTableColumnData",
      },
    ],
    internationalAddNewTabMenuData: [
      {
        label: "Document",
        tab: "Document",
        select: true,
        tabName: "Document",
      },
      {
        label: "Parcel",
        tab: "Parcel",
        select: false,
        tabName: "Parcel",
      },
      {
        label: "DocumentAndParcel",
        tab: "DocumentAndParcel",
        select: false,
        tabName: "Document and Parcel",
      },
    ],
    ExpressAddNewTabMenuData: [
      {
        label: "Bike",
        tab: "Bike",
        select: true,
        tabName: "Bike",
      },
      {
        label: "Van",
        tab: "Van",
        select: false,
        tabName: "Van",
      },
    ],
    expressSubTabMenuData: [
      {
        label: "Express Rates",
        tab: "RatesTables",
        data: "expressRatesTableData",
        columns: "ratesExpressExpressRatesTableColumnData",
      },
      {
        label: "Multi Tier Rates",
        tab: "ExpressMultiTierPage",
        data: "multiTierRatesTableData",
        columns: "multiTierRatesColumnData",
      },
      {
        label: "Additional Rates",
        tab: "RatesTables",
        data: "additionalRatesTableData",
        columns: "additionalRatesColumnData",
      },
    ],
    expressRatesSubTabMenuData: [
      {
        label: "Service",
        tab: "RatesTables",
        data: "expressRatesServiceTableData",
        columns: "expressRatesRegionSubsTableColumnData",
      },
      {
        label: "Bike",
        tab: "RatesTables",
        data: "expressRatesBikeTableData",
        columns: "expressRatesRegionSubsTableColumnData",
      },
      {
        label: "Van",
        tab: "RatesTables",
        data: "expressRatesVanTableData",
        columns: "expressRatesRegionSubsTableColumnData",
      },
    ],
    expressMultiTierRatesTabMenuData: [
      {
        label: "RatesMultiTier",
        tab: "RatesTables",
        select: true,
        tabName: "Rates",
        data: "expressRatesMultiTierTableData",
        columns: "expressRatesMultiTierTableColumnData",
      },
      {
        label: "Additional",
        tab: "RatesTables",
        select: false,
        tabName: "Additional",
        data: "expressAdditionalTableData",
        columns: "expressAdditionalTableColumnData",
      },
    ],
    expressRatesRegionTabMenuData: [
      { label: "Rates", tab: "Rates", select: true, tabName: "Rates" },
      {
        label: "Trips",
        tab: "RatesTables",
        select: false,
        tabName: "Trips",
        data: "expressTripsTableData",
        columns: "expressTripsTableColumnData",
      },
    ],
    //sub tabs data -> fleet management masters
    fleetManagementSubTabMenuData: [
      {
        label: "Vehicle Type",
        tab: "FleetManagementTables",
        data: "FleetMastersVehicleTableData",
        columns: "FleetMastersVehicleTableColumnData",
      },
      {
        label: "Claim Type",
        tab: "FleetManagementTables",
        data: "FleetMastersClaimTableData",
        columns: "FleetMastersClaimTableColumnData",
      },
      {
        label: "Maintenance Type",
        tab: "FleetManagementTables",
        data: "FleetMastersMaintenanceTableData",
        columns: "FleetMastersMaintenanceTableColumnData",
      },
      {
        label: "Delivery Point",
        tab: "FleetManagementTables",
        data: "FleetMastersDeliveryPointTableData",
        columns: "FleetMastersDeliveryPointTableColumnData",
      },
      {
        label: "Product Name",
        tab: "FleetManagementTables",
        data: "FleetMastersProductNameTableData",
        columns: "FleetMastersProductNameTableColumnData",
      },
      {
        label: "Fuel Card",
        tab: "FleetManagementTables",
        data: "FleetMastersFuelCardTableData",
        columns: "FleetMastersFuelCardTableColumnData",
      },
      {
        label: "Cash Card",
        tab: "FleetManagementTables",
        data: "FleetMastersCashCardTableData",
        columns: "FleetMastersCashCardTableColumnData",
      },
      {
        label: "Inspection Check",
        tab: "FleetManagementTables",
        data: "FleetMastersInspectionChecksTableData",
        columns: "FleetMastersInspectionChecksTableColumnData",
      },
    ],
    //fleet masters table data
    FleetMastersVehicleTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "vehicle_type", header: "Vehicle Type" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersVehicleTableData: [],
    FleetMastersClaimTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "claim_type", header: "Claim Type" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersClaimTableData: [],
    FleetMastersMaintenanceTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "maintenance_type", header: "Maintenance Type" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersMaintenanceTableData: [],
    FleetMastersDeliveryPointTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "delivery_point", header: "Delivery Point" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersDeliveryPointTableData: [],
    FleetMastersProductNameTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "product_name", header: "Product Name" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    RoomsTableData: [],
    RoomsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "image_url", header: "Image" },
      { field: "room_no", header: "Room No" },
      { field: "room_name", header: "Room Name" },
      { field: "occupancy", header: "Occupancy" },
      // { field: "enable", header: "Status" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    EventStatusTableData: [
      // {
      //   actions: "",
      //   sno: "1",
      //   // event_name: "Holiday",
      //   created_by: "keerthi",
      //   createdAt: "16:00",
      //   status: "trying",
      // },
    ],
    EventStatusTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },

      // { field: "event_name", header: "Event Name" },

      { field: "status", header: "Status" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    fleetMaintenanceSettingCashTableColumnData: [
      { field: "date_time", header: "Date & Time" },
      { field: "description", header: "Description" },
      { field: "driver", header: "Driver" },
      { field: "location", header: "Location" },
      { field: "transaction", header: "Transaction" },
      { field: "closing_balance", header: "Closing Balance" },
    ],

    fleetMaintenanceSettingCashTableData: [],
    FleetMastersProductNameTableData: [],
    FleetMastersInspectionChecksTableData: [],
    FleetMastersInspectionChecksTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "inspection_check", header: "Inspection Check" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersFuelCardTableData: [],
    FleetMastersFuelCardTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "card_no", header: "Card No" },
      { field: "issue_date", header: "Issue Date" },
      { field: "expiry_date", header: "Expiry Date" },
      { field: "vehicle", header: "Vehicle" },
      { field: "card_limit", header: "Limit ($)" },
      // { field: "balance", header: "Balance ($)" },
      { field: "enable", header: "Status" },
      { field: "reset_cycle", header: "Topup Cycle" },
      { field: "reset_day", header: "Topup Date/Day" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    FleetMastersCashCardTableData: [],
    FleetMastersCashCardTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S.No." },
      { field: "card_no", header: "Card No" },
      { field: "issue_date", header: "Issue Date" },
      { field: "expiry_date", header: "Expiry Date" },
      { field: "vehicle_no", header: "Vehicle No" },
      { field: "card_limit", header: "Limit ($)" },
      { field: "balance", header: "Balance ($)" },
      { field: "enable", header: "Status" },
      { field: "top_up_cycle", header: "Topup Cycle" },
      { field: "top_up_day", header: "Topup Date/Day" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    //table datas
    expressRegionsTripTableData: null,
    expressRegionsTripTableColumnData: [
      { field: "trip_no", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "day", header: "Trip Days" },
      { field: "type", header: "Trip Type" },
    ],
    rapidoTableData: null,
    rapidoTableDataColumns: null,
    expressAddNewRegionTableData: null,
    expressAddNewRegionTripsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "trip_no", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "day", header: "Trip Days" },
      { field: "type", header: "Trip Type" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
    ],
    expressAddNewRegionTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "region_id", header: "S.No" },
      { field: "region", header: "Regions" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
      { field: "status", header: "Status" },
    ],
    additionalRatesTableData: [
      {
        actions: "",
        s_no: "1",
        additionalRateName: "FTZ",
        rate: "10",
        createdOn: "16:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "2",
        additionalRateName: "Surcharge",
        rate: "20",
        createdOn: "16:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "3",
        additionalRateName: "Island Charges",
        rate: "30",
        createdOn: "16:00",
        status: "Weekdays",
      },
    ],
    additionalRatesColumnData: [
      {
        field: "actions",
        header: "Actions",
      },
      { field: "s_no", header: "S No" },
      { field: "additionalRateName", header: "Additional Rate Name" },
      { field: "rate", header: "Rate ($)" },
      { field: "createdOn", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    expressRatesMultiTierTableData: [
      {
        actions: "",
        s_no: "1",
        noOfBoxes: "1",
        rate: "10:00",
        createdOn: "16:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "2",
        noOfBoxes: "10",
        rate: "100:00",
        createdOn: "18:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "2",
        noOfBoxes: "10",
        rate: "100:00",
        createdOn: "18:00",
        status: "Weekdays",
      },
    ],
    expressRatesMultiTierTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "s_no", header: "S No" },
      { field: "noOfBoxes", header: "No of Boxes" },
      { field: "rate", header: "Rate ($)" },
      { field: "createdOn", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    expressAdditionalTableData: [
      {
        actions: "",
        s_no: "1",
        noOfBoxes: "1",
        rate: "10:00",
        createdOn: "16:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "2",
        noOfBoxes: "10",
        rate: "100:00",
        createdOn: "18:00",
        status: "Weekdays",
      },
      {
        actions: "",
        s_no: "3",
        noOfBoxes: "10",
        rate: "100:00",
        createdOn: "18:00",
        status: "Weekdays",
      },
    ],
    expressAdditionalTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "s_no", header: "S No" },
      { field: "noOfBoxes", header: "No of Boxes" },
      { field: "rate", header: "Rate ($)" },
      { field: "createdOn", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    expressTripsTableData: [
      {
        actions: "",
        s_no: "1",
        tripNo: "1",
        from: "10:00",
        to: "16:00",
        tripDays: "Weekdays",
        tripType: "Open",
        createdBy: "Jake",
        createdOn: "24th June",
      },
      {
        actions: "",
        s_no: "2",
        tripNo: "2",
        from: "10:00",
        to: "16:00",
        tripDays: "Weekdays",
        tripType: "Open",
        createdBy: "Jill",
        createdOn: "24th June",
      },
      {
        actions: "",
        s_no: "3",
        tripNo: "3",
        from: "10:00",
        to: "16:00",
        tripDays: "Weekdays",
        tripType: "Open",
        createdBy: "John",
        createdOn: "24th June",
      },
    ],
    expressTripsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "tripNo", header: "Trip No." },
      { field: "from", header: "From" },
      { field: "to", header: "To" },
      { field: "tripDays", header: "Trip Days" },
      { field: "tripType", header: "Trip Type" },
      { field: "createdBy", header: "Created By" },
      { field: "createdOn", header: "Created On" },
    ],
    expressRatesServiceTableData: [
      {
        actions: "",
        s_no: "1",
        zero2TwentyDispatches: "10",
        twentyone2ThirtyDispatches: "23",
        thirtyone2FiftyDispatches: "32",
        fiftyone2HundredDispatches: "70",
        createdBy: "Jim",
        createdOn: "24th June",
      },
      {
        actions: "",
        s_no: "2",
        zero2TwentyDispatches: "15",
        twentyone2ThirtyDispatches: "23",
        thirtyone2FiftyDispatches: "32",
        fiftyone2HundredDispatches: "70",
        createdBy: "Bob",
        createdOn: "24th June",
      },
      {
        actions: "",
        s_no: "3",
        zero2TwentyDispatches: "4",
        twentyone2ThirtyDispatches: "27",
        thirtyone2FiftyDispatches: "32",
        fiftyone2HundredDispatches: "70",
        createdBy: "Tim",
        createdOn: "24th June",
      },
    ],
    // ThirdPartyIntergrationData:[
    //   {
    //     img_url:"/images/payboy.png",
    //     title:"Payboy",
    //     content:"Amet minim mollit non deserunt ullamco est sit aliq",
    //     button_label:"Sync"
    //   },
    //   {
    //     img_url:"/images/xero.png",
    //     title:"Xero",
    //     content:"Amet minim mollit non deserunt ullamco est sit aliq",
    //     button_label:"Sync"
    //   },
    //   {
    //     img_url:"/images/google.png",
    //     title:"Google",
    //     content:"Amet minim mollit non deserunt ullamco est sit aliq",
    //     button_label:"Connect"
    //   }
    // ],
    expressRatesRegionSubsTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "s_no", header: "S No" },
      { field: "zero2TwentyDispatches", header: "0 - 20 (Dispatches)" },
      { field: "twentyone2ThirtyDispatches", header: "21 - 30 (Dispatches)" },
      { field: "thirtyone2FiftyDispatches", header: "31 - 50 (Dispatches)" },
      { field: "fiftyone2HundredDispatches", header: "51 - 100 (Dispatches)" },
      { field: "createdBy", header: "Created By" },
      { field: "createdOn", header: "Created On" },
    ],
    expressRatesTableData: null,
    ratesInternationalTableData: [
      {
        actions: "",
        s_no: "1",
        agent: "DHL",
        rate_cards: "2",
        createdBy: "John",
        createdOn: "24th June",
        status: "Active",
        rateCards: [
          {
            name: "RATE-C1-90",
            label: "R1",
          },
          {
            name: "RATE-C2-90",
            label: "R2",
          },
        ],
      },
      {
        actions: "",
        s_no: "2",
        agent: "KFC",
        rate_cards: "4",
        createdBy: "Jacob",
        createdOn: "24th June",
        status: "Active",
        rateCards: [
          {
            name: "RATE-C1-92",
            label: "R1",
          },
          {
            name: "RATE-C2-93",
            label: "R2",
          },
        ],
      },
      {
        actions: "",
        s_no: "3",
        agent: "LTT",
        rate_cards: "8",
        createdBy: "Jack",
        createdOn: "24th June",
        status: "Inactive",
        rateCards: [
          {
            name: "RATE-C1-94",
            label: "R1",
          },
          {
            name: "RATE-C2-95",
            label: "R2",
          },
        ],
      },
    ],
    ratesInternationalTableColumnData: [
      { field: "s_no", header: "S No" },
      { field: "agent", header: "Agent" },
      { field: "rate_cards", header: "Rate Cards" },
      { field: "createdBy", header: "Created By" },
      { field: "createdOn", header: "Created On" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Actions" },
    ],
    ratesExpressExpressRatesTableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "region", header: "Regions" },
      { field: "rate_card_count", header: "Rate Cards" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    zonesTableData: [
      {
        actions: "",
        s_no: "1",
        zones: "1",
        numberOfCountries: "10",
        createdBy: "John",
        createdOn: "24th June",
        status: "Active",
        countries: [
          "America",
          "India",
          "Malaysia",
          "America",
          "India",
          "Malaysia",
          "America",
          "India",
          "Malaysia",
        ],
      },
      {
        actions: "",
        s_no: "2",
        zones: "4",
        numberOfCountries: "20",
        createdBy: "Jacob",
        createdOn: "24th June",
        status: "Active",
        countries: ["America", "India", "Malaysia"],
      },
      {
        actions: "",
        s_no: "3",
        zones: "10",
        numberOfCountries: "40",
        createdBy: "Jack",
        createdOn: "24th June",
        status: "Active",
        countries: ["America", "India", "Malaysia"],
      },
    ],
    zonesTableColumnData: [
      { field: "zones", header: "Zones" },
      { field: "numberOfCountries", header: "No of Countries" },
      { field: "createdBy", header: "Created By" },
      { field: "createdOn", header: "Created On" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Actions" },
    ],
    //toggleData
    toggleData: [{ type: "" }],
    //overlay Datas
    RoomSettingsOverlayData: [
      { label: "Edit status", icon: "fas fa-pen" },
      { label: "Invite", icon: "fas fa-user-plus" },
      { label: "Delete", icon: "fas fa-trash-alt" },
    ],
    internationalRatesOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Disable", icon: "far fa-circle" },
      { label: "Delete", icon: "fas fa-trash-alt" },
    ],
    rateCardsOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Set as default", icon: "fas fa-check-square" },
      { label: "Disable", icon: "far fa-circle" },
      { label: "Delete", icon: "fas fa-trash-alt" },
      { label: "Clone", icon: "fas fa-clone" },
      { label: "Export as PDF", icon: "fas fa-file-pdf" },
    ],
    expressRegionsOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Disable", icon: "far fa-circle" },
      { label: "Delete", icon: "fas fa-trash-alt" },
    ],
    zonesOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Add Route",
        icon: "fas fa-route",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
    ],
    commonOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
    ],
    crmSettingOverlay: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Disable",
        icon: "far fa-circle",
      },
    ],
    crmPaymentSettingOverlay: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    customerlaunchBookingOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Clone", icon: "fas fa-clone" },
      { label: "Feedback", icon: "fas fa-comments" },
    ],
    fleetMastersCommonOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      // { label: "Disable", icon: "far fa-circle" },
      { label: "Delete", icon: "fas fa-user-times" },
    ],
    fleetMastersFuelCardOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      //❌please do not delete this👇, we need it in future❌
      // { label: "View History", icon: "fas fa-history" },
      { label: "Delete", icon: "fas fa-user-times" },
    ],
    fleetMastersCashCardOverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "View History", icon: "fas fa-history" },
      { label: "Topup", icon: "fas fa-dollar-sign" },
      { label: "Delete", icon: "fas fa-user-times" },
    ],
    //stepperData
    internationalAddNewStepperData: [
      {
        index: 0,
        label: "1",
        component: "AddZones",
        name: "Zone",
      },
      {
        index: 1,
        label: "2",
        component: "AddWeightsAndRates",
        name: "Weight and Rate",
      },
    ],

    ExpressAddNewStepperData: [
      {
        index: 0,
        label: "1",
        component: "Rates",
        name: "Rates",
      },
      {
        index: 1,
        label: "2",
        component: "Trips",
        name: "Trips",
      },
    ],
    //multi chip data
    multiChipCountriesData: [
      { name: "America", code: "USA" },
      { name: "India", code: "IN" },
      { name: "Malaysia", code: "MAL" },
    ],
    //zone data
    internationalZoneRates: [
      "Zone 1",
      "Zone 2",
      "Zone 3",
      "Zone 4",
      "Zone 5",
      "Zone 6",
      "Zone 7",
      "Zone 8",
      "Zone 9",
    ],
    internationalWeights: ["", ""],
  },
  mutations: {
    //eslint-disable-next-line no-unused-vars
    fetchExpressRegionsData(state, data) {
      state.expressAddNewRegionTableData = data;
    },
    fetchExpressRatesTableData(state, data) {
      for (let rc in data) {
        var rc_obj = data[rc];
        rc_obj["rate_card_count"] = rc_obj["regions_rate_cards"].length;
      }
      state.expressRatesTableData = data;
    },
    fetchTripsScheduleTableData(state, data) {
      state.expressRegionsTripTableData = data;
    },
    fetchRegionsDropDown(state, data) {
      state.expressRegionsDropDown = processDropDownData(data);
    },
    fetchTripCardsDropDown(state, data) {
      state.expressTripCardsDropDown = data;
    },
    fetchFleetMaintenanceSettingCashTableData(state, data) {
      state.fleetMaintenanceSettingCashTableData = data;
    },
    fetchFleetMastersVehicleTypes(state, data) {
      state.FleetMastersVehicleTableData = data;
    },
    fetchFleetMastersClaimTypes(state, data) {
      state.FleetMastersClaimTableData = data;
    },
    fetchFleetMastersMaintenanceType(state, data) {
      state.FleetMastersMaintenanceTableData = data;
    },
    fetchFleetMastersDeliveryPoint(state, data) {
      state.FleetMastersDeliveryPointTableData = data;
    },
    fetchFleetMastersProductName(state, data) {
      state.FleetMastersProductNameTableData = data;
    },
    fetchFleetMastersFuelCards(state, data) {
      state.FleetMastersFuelCardTableData = data;
    },
    fetchFleetMastersCashCards(state, data) {
      state.FleetMastersCashCardTableData = data;
    },
    fetchFleetMastersInspectionCheck(state, data) {
      state.FleetMastersInspectionChecksTableData = data;
    },
    fetchRoomsData(state, data) {
      // console.log(data)
      state.RoomsTableData = data;
    },
    fetchEventStatusData(state, data) {
      state.EventStatusTableData = data;
    },
  },
  actions: {
    setAuthToken() {
      axios.defaults.headers.common = {
        Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
      };
    },
    updateFleetMastersTabsData({ commit }, { data }) {
      commit("fetchFleetMastersData", data);
    },

    //EXPRESS REGIONS API
    loadExpressRegions({ state, commit }) {
      axios.get("rates/express/region").then((res) => {
        if (res.status == 200) {
          for (let i = 0; i < res.data.results.length; i++) {
            let r_obj = res.data.results[i];

            r_obj["sno"] = i + 1;
          }

          for (let r in res.data.results) {
            let obj = res.data.results[r];
            for (let o in obj) {
              if (o == "createdAt" || o == "updatedAt") {
                if (obj[o] != null) {
                  let raw_date = res.data.results[r][o];
                  res.data.results[r][o + "raw_date"] = raw_date;
                  res.data.results[r][o] = new Date(obj[o]);
                }
              }
              if (o == "regions_trips") {
                for (let rt in res.data.results[r][o]) {
                  let rt_obj = res.data.results[r][o][rt];
                  for (let rt_iter in rt_obj) {
                    if (rt_iter == "to" || rt_iter == "from") {
                      let raw_date = rt_obj[rt_iter];
                      rt_obj[rt_iter + "raw_time"] = raw_date;
                      rt_obj[rt_iter] = new Date(rt_obj[rt_iter]);
                    }
                    if (rt_iter == "createdAt" || rt_iter == "updatedAt") {
                      if (rt_obj[rt_iter] != null) {
                        let raw_date = rt_obj[rt_iter];
                        rt_obj[rt + "raw_date"] = raw_date;
                        rt_obj[rt_iter] = new Date(rt_obj[rt_iter]);
                      }
                    }
                  }
                }
              }
            }
          }

          commit("fetchExpressRegionsData", res.data.results);
          state.tableLoad = false;
        }
      });
    },

    //contacts-rooms masters
    loadRoomsData({ commit }, { path, mutation }) {
      axios.get("settings/contacts/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }

        if (res.status == 200) {
          commit(mutation, res.data.results);
          for (let r in res.data.results) {
            let r_obj = res.data.results[r];
            for (let r_keys in r_obj) {
              if (r_keys == "users_settings_rooms") {
                r_obj["created_by"] = r_obj[r_keys]["display_name"];
              }
            }
          }
        }
      });
    },
    //contact-event status
    loadEventStatusData({ commit }, { path, mutation }) {
      axios.get("settings/contacts/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }
        for (let r in res.data.results) {
          let r_obj = res.data.results[r];
          for (let r_keys in r_obj) {
            if (r_keys == "users_settings_event_invitees_status") {
              r_obj["created_by"] = r_obj[r_keys]["display_name"];
            }
          }
        }
        if (res.status == 200) {
          commit(mutation, res.data.results);
        }
      });
    },
    //EXPRESS - EXPRESS RATE API
    //eslint-disable-next-line no-unused-vars
    loadExpressRates({ commit, state }) {
      axios.get("rates/express/rate").then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }

        commit("fetchExpressRatesTableData", res.data.results.rows);
        state.tableLoad = false;
      });
    },

    //DROPDOWN APIS
    //fleet masters
    //vehicle types, claim types, maintenance types, delivery point, product name
    loadFleetMastersCommons(
      { commit, state, rootState },
      { path, nameKey, mutation }
    ) {
      axios.get("settings/fleet/" + path).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
          if (path == "cashCard") {
            if (r_obj.vehicle.length != 0) {
              if (r_obj.vehicle[0].reg_no) {
                r_obj["vehicle_no"] = r_obj.vehicle[0].reg_no;
              }
            }
          }
          if (path == "fuelCard") {
            let vehicleImages = [];
            if (r_obj.vehicle.length != 0) {
              for (let j = 0; j < r_obj.vehicle.length; j++) {
                if (r_obj.vehicle[j].image_url) {
                  vehicleImages.push(r_obj.vehicle[j].image_url);
                }
              }
            }
            r_obj["vehicleImages"] = vehicleImages;
          }
        }

        if (res.status == 200) {
          for (let r in res.data.results) {
            let r_obj = res.data.results[r];
            for (let r_keys in r_obj) {
              if (r_keys == nameKey) {
                r_obj["created_by"] = r_obj[r_keys]["display_name"];
              }
            }
          }
          if (path == "fuelCard" || path == "cashCard") {
            let fleetCardsLatest = [];
            fleetCardsLatest = processFleetCardsLatest(res.data.results);
            commit(mutation, fleetCardsLatest);
          } else {
            commit(mutation, res.data.results);
          }
          rootState["users"].displayDialog = false;
          state.tableLoad = false;
        }
      });
    },

    //REGIONS
    loadRegionsDropDown({ commit }) {
      axios.get("rates/dropdown/express/regions").then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }

        commit("fetchRegionsDropDown", res.data.results);
      });
    },
    //TRIP SCHEDULE
    loadTripSchedules({ commit }, { id }) {
      axios
        .get("rates/dropdown/express/region/tripsSchedule/" + id)
        .then((res) => {
          for (let i = 0; i < res.data.results.length; i++) {
            let r_obj = res.data.results[i];

            r_obj["sno"] = i + 1;
          }

          for (let ts in res.data.results) {
            let ts_obj = res.data.results[ts];
            for (let ts_keys in ts_obj) {
              if (ts_keys == "to" || ts_keys == "from") {
                let raw_date = ts_obj[ts_keys];
                ts_obj[ts_keys + "raw_time"] = raw_date;
                ts_obj[ts_keys] = new Date(ts_obj[ts_keys]);
              }
            }
          }
          commit("fetchTripsScheduleTableData", res.data.results);
        });
    },
    //RATE CARDS
    //eslint-disable-next-line no-unused-vars
    loadTripCardsDropDown({ commit }, { id }) {
      axios.get("rates/dropdown/express/rateCards/" + id).then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
        }

        let tripCardData = [];
        if (res.status == 200) {
          for (let tc in res.data.results) {
            let tc_obj = {};
            tc_obj["name"] = res.data.results[tc]["rate_card_name"];
            tc_obj["code"] = res.data.results[tc]["id"];
            tripCardData.push(tc_obj);
          }
          commit("fetchTripCardsDropDown", tripCardData);
        }
      });
    },
    //RATE CARDS
    //eslint-disable-next-line no-unused-vars
    loadCashCardHistory({ commit, state }, { id }) {
      axios.get("/settings/fleet/cashCards/History/" + id).then((res) => {
        state.fleetsCardHistoryProcessedData = {
          card_no: res.data.results[0].card_no,
          vehicle_img: res.data.results[0].vehicle[0].image_url,
          vehicle_no: res.data.results[0].vehicle[0].reg_no,
        };
        //  console.log(state.fleetsCardHistoryProcessedData);
        // for (let r in res.data.results) {
        //   let obj = res.data.results[r];
        //   for (let o in obj) {
        //     if (o == "date_time") {
        //       if (obj[o] != null) {
        //         let raw_date = res.data.results[r][o];
        //         res.data.results[r][o + "raw_date"] = raw_date;
        //         res.data.results[r][o] = new Date(obj[o]);
        //       }
        //     }
        //   }
        // }
        // console.log(res.data.results , "dat")
        let cashCardHistoryData =
          res.data.results[0].settings_fleet_cash_card_history;

        commit(
          "fetchFleetMaintenanceSettingCashTableData",
          cashCardHistoryData
        );
        // }
      });
    },

    //EXPRESS RATE CARDS CRUD
    expressRateCardsCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "rates/express/rateCard",
          loadApi: "loadExpressRates",
          toastTag: "rate_card",
          tag: tag,
          data: data,
        });
      }
      if (tag == "retrive/" || tag == "modifyStatus/" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "rates/express/rateCard/",
          loadApi: "loadExpressRates",
          toastTag: "rate_card",
          tag: tag,
          data: data,
          id_key: "rate_card_id",
        });
      }
    },
    //EXPRESS REGIONS CRUD
    expressRegionsCRUD({ dispatch }, { tag, data }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "rates/express/region",
          loadApi: "loadExpressRegions",
          toastTag: "region",
          tag: tag,
          data: data,
        });
      }
      if (
        tag == "retrive/" ||
        tag == "modifyStatus/" ||
        tag == "delete" ||
        tag == "update"
      ) {
        dispatch("commonCRUD", {
          basePath: "rates/express/region/",
          loadApi: "loadExpressRegions",
          toastTag: "region",
          tag: tag,
          data: data,
          id_key: "region_id",
        });
      }
    },

    //CONTACTS MASTERS CRUD
    ContactMastersCRUD({ dispatch }, { tag, data, type, loadApi, mutation }) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "settings/contacts/" + type,
          loadApi: loadApi,
          toastTag: type,
          tag: tag,
          data: data,
          mutation: mutation,
        });
      }
      if (tag == "update" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "settings/contacts/" + type + "/",
          loadApi: loadApi,
          toastTag: type,
          tag: tag,
          data: data,
          mutation: mutation,
          id_key: "id",
        });
      }
    },
    //FLEET MASTERS CRUD
    FleetMastersCRUD(
      { dispatch },
      { tag, data, type, loadApi, nameKey, mutation, id }
    ) {
      if (tag == "add") {
        dispatch("commonCRUD", {
          basePath: "settings/fleet/" + type,
          loadApi: loadApi,
          toastTag: type,
          tag: tag,
          data: data,
          namekey: nameKey,
          mutation: mutation,
        });
      }
      if (tag == "update" || tag == "delete") {
        dispatch("commonCRUD", {
          basePath: "settings/fleet/" + type + "/",
          loadApi: loadApi,
          toastTag: type,
          tag: tag,
          data: data,
          namekey: nameKey,
          mutation: mutation,
          id_key: "id",
        });
      }
      if (tag == "topup") {
        console.log(data, id);
        dispatch("commonCRUD", {
          basePath: "/settings/fleet/",
          loadApi: loadApi,
          toastTag: type,
          tag: "cashCard/topUp/",
          data: data,
          namekey: nameKey,
          mutation: mutation,
          id_key: id,
        });
      }
    },

    //COMMON CRUD FUNCTION
    commonCRUD(
      { state, commit, dispatch, rootState },
      { basePath, loadApi, toastTag, tag, data, nameKey, mutation, id_key }
    ) {
      if (tag == "add") {
        //adding new data to the data-base using the axios POST method
        axios.post(basePath, data).then((res) => {
          if (res.status == 200) {
            state.tableLoad = true;
            // if (toastTag == "topup"){
            //   toastTag = "cashCard"
            // }
            if (
              toastTag == "vehicleType" ||
              toastTag == "claimType" ||
              toastTag == "maintenanceType" ||
              toastTag == "deliveryPoint" ||
              toastTag == "productName" ||
              toastTag == "fuelCard" ||
              toastTag == "cashCard" ||
              toastTag == "InspectionCheck"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                nameKey: nameKey,
                mutation: mutation,
              });
            } else if (
              toastTag == "rooms" ||
              toastTag == "EventInviteesStatus"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
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
      if (tag == "cashCard/topUp/") {
        axios
          .patch(basePath + tag + id_key, data)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            let mssg = "Topup updated successfully";
            if (res.status == 200) {
              console.log("successs");
              state.tableLoad = true;
              // dispatch(loadApi);
              dispatch(loadApi, {
                path: "cashCard",
                nameKey: nameKey,
                mutation: mutation,
              });
              commit("users/showToast", ["info", data, mssg, toastTag], {
                root: true,
              });
            }
          });
      }
      if (tag == "retrive/" || tag == "modifyStatus/") {
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
              console.log("successs");
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
            // if (toastTag == "topup"){
            //   toastTag = "cashCard"
            // }
            if (
              toastTag == "vehicleType" ||
              toastTag == "claimType" ||
              toastTag == "maintenanceType" ||
              toastTag == "deliveryPoint" ||
              toastTag == "productName" ||
              toastTag == "fuelCard" ||
              toastTag == "cashCard" ||
              toastTag == "InspectionCheck"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                nameKey: nameKey,
                mutation: mutation,
              });
            } else if (
              toastTag == "rooms" ||
              toastTag == "EventInviteesStatus"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
            commit("users/showToast", ["info", data, "was deleted", toastTag], {
              root: true,
            });
          }
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        axios.patch(basePath + data[id_key], data).then((res) => {
          if (res.data.status == 200) {
            state.tableLoad = true;
            // if (toastTag == "topup"){
            //   toastTag = "cashCard"
            // }
            if (
              toastTag == "vehicleType" ||
              toastTag == "claimType" ||
              toastTag == "maintenanceType" ||
              toastTag == "deliveryPoint" ||
              toastTag == "productName" ||
              toastTag == "fuelCard" ||
              toastTag == "cashCard" ||
              toastTag == "InspectionCheck"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                nameKey: nameKey,
                mutation: mutation,
              });
            } else if (
              toastTag == "rooms" ||
              toastTag == "EventInviteesStatus"
            ) {
              dispatch(loadApi, {
                path: toastTag,
                mutation: mutation,
              });
            } else {
              dispatch(loadApi);
            }
            rootState["users"].displayDialog = false;
            commit("users/showToast", ["info", data, "was edited", toastTag], {
              root: true,
            });
          }
        });
      }
    },
  },
  getters: {},
};

export default masters;
