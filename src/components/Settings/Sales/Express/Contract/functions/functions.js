import {
  //normal tab
  //BIKE
  normalBikeTripsTableColumnData,
  normalBikeRatesTableColumnData,
  normalBikeBikeCustomerVanJobTableColumnData,
  //VAN
  normalVanTripsTableColumnData,
  normalVanRatesTableColumnData,
  normalVanVanCustomerBikeJobTableColumnData,
  normalVanTwoTierChargeByWeightTableColumnData,
  normalVanTwoTierChargeByQuantityTableColumnData,
  normalVanMultiTierChargeByQuantityTableColumnData,
  normalVanMultiTierChargeByJobCountTableColumnData,
  //e-commerce tab
  eCommerceBikeDeliveryTableColumnsData,
  eCommerceVanDeliveryTableColumnsData,
  //surcharges tab
  surchargesTableColumnData,
  //additional surcharges tab
  additionalSurchargesTableColumnData,
} from "../const/const.js";

//fetch table
export function getTableInput(storeData, format, transport, type, label) {
  let tableDetails = getTableDetails(storeData, format, transport, type, label);
  return tableDetails;
}

//fetch table details
function getTableDetails(storeData, format, transport, type, tab) {
 
  let columns = [];
  let data = [];
  let tableDetails = [];

  data = getTableData(storeData, type, transport, tab);

  if (type == "surcharges") {
    columns = surchargesTableColumnData;
  }

  if (type == "additional_surcharges") {
    columns = additionalSurchargesTableColumnData;
  }

  if (type == "normal") {
    switch (tab) {
      case "trips":
        columns = transport == "Bike" ? normalBikeTripsTableColumnData : normalVanTripsTableColumnData;
        break;
      case "rates":
        columns =
          transport == "Bike"
            ? normalBikeRatesTableColumnData
            : normalVanRatesTableColumnData;
        break;
      case "bike_van_job_rates":
        columns = normalBikeBikeCustomerVanJobTableColumnData;
        break;
      case "van_customer_bike_job":
        columns = normalVanVanCustomerBikeJobTableColumnData;
        break;
      case "van_2_tire_rates_charge_by_weight":
        columns = normalVanTwoTierChargeByWeightTableColumnData;
        break;
      case "van_2_tire_rates_charge_by_quantity":
        columns = normalVanTwoTierChargeByQuantityTableColumnData;
        break;
      case "van_Multi_tire_rates_charge_by_quantity":
        columns = normalVanMultiTierChargeByQuantityTableColumnData;
        break;
      case "van_Multi_tire_rates_charge_by_job_count":
        columns = normalVanMultiTierChargeByJobCountTableColumnData;
        break;
    }
  }

  tableDetails = format == "data" ? data : columns;
  return tableDetails;
}

// fetch the table data
function getTableData(storeData, charge_type, transport, tab) {
 
  let chargeTypeData = getChargeType(storeData, charge_type);

  if (tab == "surcharges" || tab == "additional_surcharges") {
    for (let c in chargeTypeData) {
      chargeTypeData[c]["s_no"] = parseInt(c) + 1;
    }
    return chargeTypeData;
  } else {
    for (let c in chargeTypeData) {
      if (chargeTypeData[c]["service_type"] == transport.toLowerCase()) {
        for (let ot in chargeTypeData[c][tab]) {
          chargeTypeData[c][tab][ot]["s_no"] = parseInt(ot) + 1;
        }

        //trips data processing
        if (tab == "trips") {
        
          let tripsData = [];
          for (let t in chargeTypeData[c][tab]) {
            let t_obj = chargeTypeData[c][tab][t];
            let trips_data_obj = {};
            for (let t_keys in t_obj) {
              if (t_keys == "trips") {
                for (let st in t_obj[t_keys]) {
                  trips_data_obj[st] = t_obj[t_keys][st];
                }
              } else {
                trips_data_obj[t_keys] = t_obj[t_keys];
              }

            }
            trips_data_obj['id']=t_obj.id
            tripsData.push(trips_data_obj);
          }
          return tripsData;
        }
        if (tab != "trips") {
          return chargeTypeData[c][tab];
        }
      }
    }
  }
}

//fetch the charge type
function getChargeType(storeData, charge_type) {
  for (let r in storeData["charge_types"]) {
    if (storeData["charge_types"][r]["charge_type"] == charge_type) {
      if (
        charge_type == "surcharges" ||
        charge_type == "additional_surcharges"
      ) {
        return storeData["charge_types"][r][charge_type];
      } else {
        let charge_services_type =
          charge_type == "normal"
            ? "normal_charge_services"
            : "e_commerce_services";

        return storeData["charge_types"][r][charge_services_type];
      }
    }
  }
}

//fetch dynamic tabs
export function generateDynamicSubTabs(data, tab, transport, type) {
  let dynamicSubTabsData = [];
  for (let s in data) {
    data[s]["s_no"] = 1;
    let dynamicSubTabsDataObj = {};
    dynamicSubTabsDataObj["label"] = data[s]["delivery_type"];
    dynamicSubTabsDataObj["tab"] = tab;
    dynamicSubTabsDataObj["transport"] = transport;
    dynamicSubTabsDataObj["type"] = type;
    dynamicSubTabsDataObj["data"] = [data[s]];
    dynamicSubTabsDataObj["columns"] =
      transport == "Bike"
        ? eCommerceBikeDeliveryTableColumnsData
        : eCommerceVanDeliveryTableColumnsData;
    dynamicSubTabsData.push(dynamicSubTabsDataObj);
  }
  return dynamicSubTabsData;
}
