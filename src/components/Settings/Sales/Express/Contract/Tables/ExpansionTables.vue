<template>
<div
    v-if="btn && editEnable != 'noEdit'"
    class="right-content flex align-items-center"
  >
    <span style="padding-left: 1180px; padding-bottom: 10px">
      <Button label="Add New" @click="handleClick($event)" />
    </span>
  </div>
<div :key="render" >
  <DataTable
    :class="tableClass"
    id="formTable"
    :key="$store.state.express.new"
    :value="tableData"
    :rowClass="rowClass"
    :dataKey="dataKey"
    filterDisplay="menu"
    v-model:expandedRows="expandedRows"
    @rowCollapse="onRowCollapse"
    @rowExpand="onRowExpand"
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="rowEditCancel"
  >
    <Column
      :expander="tableName == 'Bike' || tableName == 'Van' ? true : false"
      headerStyle="width: 1rem"
      class="expander"
    />
    <Column
        v-if="editEnable != 'noEdit'"
        :rowEditor="true"
        style="width: 10%; min-width: 5rem"
        bodyStyle="text-align:center"
      ></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="expressContract"
           :dataName="tableDataName"
            :tableName="tableName"
            :transport="transport"
            :type="type"
            :tabName="tabName"
            :formTableDataName="formTableDataName"
            :rowData="slotProps"
            :customDialData="regionalOverlayData"
            :upperLevelData="slotProps.data"
          />
        </span>
        <!-- DATES TEMPLATE -->
        <span v-if="tableName == 'Bike' || tableName == 'Van'">
          <span v-if="col.header == 'From' || col.header == 'To'">
            {{ TimeFormater(slotProps.data[col.field]) }}
          </span>
        </span>
        <!-- DATES TEMPLATE -->
        <span v-else>
          <span
            v-if="
              col.header == 'Created On' ||
              col.header == 'From' ||
              col.header == 'To'
            "
          >
            {{ dateFormater(slotProps.data[col.field]) }}
          </span>
        </span>

        <!-- created by template -->
        <span v-if="col.header == 'Created By' && slotProps.data[col.field]">
          {{ slotProps.data[col.field].display_name }}
        </span>

        <!-- ranges template -->
        <span v-if="col.header == 'Dispatches'">
          {{slotProps.data[`min_${getRangeKeys(col.header)}`]}} - 
          {{slotProps.data[`max_${getRangeKeys(col.header)}`]}}
        </span>


        <span v-if="col.header == 'No of Boxes'">
            <span v-if='slotProps.data.min_box !== null && slotProps.data.max_box !== null'>
              {{slotProps.data[`min_${getRangeKeys(col.header)}`]}} - 
              {{slotProps.data[`max_${getRangeKeys(col.header)}`]}}
            </span>
            <span v-else-if='slotProps.data.box_under && slotProps.data.box_under != null'>
              {{slotProps.data.box_under}}
            </span>
            <span v-else-if='slotProps.data.boxes_under && slotProps.data.boxes_under !== null'>
              {{slotProps.data.boxes_under}}
            </span>
        </span>

        

        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Created By'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <!--EDITOR TEMPLATE-->
      <template #editor="{ data, field }">
        <!--range template-->
        <span v-if="col.header == 'Dispatches'">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <NumberField
                :max="0"
                v-model="data[`min_${getRangeKeys(col.header)}`]"
                :classes="{ 'inputfield w-full dialog-field-text ': true }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <NumberField
                :max="0"
                v-model="data[`max_${getRangeKeys(col.header)}`]"
                :classes="{ 'inputfield w-full dialog-field-text ': true }"
              />
            </div>
          </div>
        </span>

        <span v-if="col.header == 'No of Boxes'">
          <div v-if="data.min_box >= 0  || data.max_box >= 0" class="formgrid grid">
            <div class="field col-12 md:col-6">
              <NumberField
                :max="0"
                v-model="data[`min_${getRangeKeys(col.header)}`]"
                :classes="{ 'inputfield w-full dialog-field-text ': true }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <NumberField
                :max="0"
                v-model="data[`max_${getRangeKeys(col.header)}`]"
                :classes="{ 'inputfield w-full dialog-field-text ': true }"
              />
            </div>
          </div>
        </span>

        <!--text field-->
        <span
          v-if="
            col.header == 'Rate (S$)' ||
            col.header == 'Van Job Addl. Cost ($)' ||
            col.header == 'Max Weight' ||
            col.header == 'Van Job Addl. Weight (Kg)' ||
            col.header == 'Van Job Min Cost $' ||
            col.header == 'Van Job Urg. Surcahrge ($)' ||
            col.header == 'Van Job Addl. Quantity (Kg)' ||
            col.header == 'Min. Charge Per Job (S$)'
          "
        >
          <div class="formgrid grid">   
            <div class="field col-12 md:col-6">
              <InputNumber
                  v-model="data[field]"
                  class="number-field"
                  mode="decimal"
                  :min='0'
                  :maxFractionDigits="2"
                  :class="{ 'inputfield w-full dialog-field-text': true }"
                />
            </div>
          </div>
        </span>

        <!--date formatter template-->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(data[field]) }}
        </span>

        <!-- created by template -->
        <span v-if="col.header == 'Created By' && data[field]">
          {{ data[field].display_name }}
        </span>

        <!-- id template -->
        <span v-if="col.header == 'S.No.'">
          {{ data[field] }}
        </span>
      </template>
    </Column>

    <!--Expanded row content -->
    <template
      v-if="tableName == 'Bike' || tableName == 'Van'"
      #expansion="slotProps"
    >
      <RegionExpansionTemplate :data="slotProps.data.deliveries[0]" />
    </template>
  </DataTable>
      </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Button from 'primevue/button';
import InputNumber from "primevue/inputnumber";
import CustomSpeedDials from "../CustomSpeedDial.vue";
import { RegionalRatesData } from "../const/const";
import RegionExpansionTemplate from "./RegionExpansionTemplate.vue";
export default {
  components: { DataTable, Column, RegionExpansionTemplate,Button,CustomSpeedDials, InputNumber },

  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "editEnable",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
    "dataKey",
    "type",
    "transport",
    "tableSubExpansion"
  ],
  data() {
    return {
      expandedRows: [],
      editingRows: [],
      render:0,
      regionalOverlayData: RegionalRatesData,
    };
  },

  methods: {
    getApiPath() {
      switch (this.tableName) {
        case "Box Count Charges":
          break;
      }
    },
    getPath(data) {
      let common_path_string = "normal/van/twoTireRate/quantities/rates/";
      let path;
      switch (this.type) {
        //for normal tab
        case "normal":
          switch (this.transport) {
            case "Van":
              switch (
              this.$store.state.express.tier2Tab
              ) {
                case "Weight":
                  path = data.charge_by_quantity_id
                    ? common_path_string + data.charge_by_quantity_id
                    : common_path_string;
                  return path;
                case "Quantity":
                  if(data.min_box || data.max_box){
                    path = common_path_string + data.id;
                    return path;
                  } else {
                    path =  data.id ? common_path_string + data.id : common_path_string + data.service_id;
                    return path;
                  }
              }
          }
          break;
        //for e_commerce tab
        case "e_commerce":
          switch (this.transport) {
            case "Bike":
              switch (
                this.$store.state.expressContract
                  .regionRatesECommerceBikeTableExpansionTab
              ) {
                case "e_commmerce_bike_rates":
                  path =
                    "eCommerce/deliveryTypes/rate/" +
                    this.transport.toLowerCase();
                  if (!data.id) {
                    return path;
                  } else {
                    return path + "/" + data.id;
                  }
                case "bike_customer_van_job":
                  return (
                    "eCommerce/bike/deliveryTypes/bikeCustomerVanJob/" + data.id
                  );
              }
              break;
            case "Van":
              common_path_string = "eCommerce/van/deliveryTypes/";
              switch (
                this.$store.state.expressContract
                  .regionRatesECommerceVanTableExpansionTab
              ) {
                case "e_commmerce_van_rates":
                  if (!data.id) {
                    return "eCommerce/deliveryTypes/rate/van";
                  } else {
                    return "eCommerce/deliveryTypes/rate/van/" + data.id;
                  }
                case "van_charge_by_weight":
                  return common_path_string + "chargeByWeight/" + data.id;
                case "van_charge_by_quantity":
                  //for boxes under
                  if (data.min_box && data.max_box) {
                    if (data.id) {
                      return (
                        "eCommerce/van/deliveryTypes/chargeByQuantities/rates/" +
                        data.id
                      );
                    }
                    if (!data.id) {
                      return "eCommerce/van/deliveryTypes/chargeByQuantities/rates/";
                    }
                  }
                  //for charge by quantity
                  else {
                    if (data.id) {
                      return (
                        "eCommerce/van/deliveryTypes/chargeByQuantity/" +
                        data.id
                      );
                    }
                  }
                  break;
                case "van_customer_bike_job":
                  return common_path_string + "vanCustomerBikeJob/" + data.id;
              }
              break;
          }
      }
    },
    getNormalRoute(charge_types_index, property, normal_charge_services_index) {
      switch (property) {
        case "van_2_tire_rates_charge_by_quantity":
          return {
            charge_types_index: charge_types_index,
            property: property,
            normal_charge_services_index: normal_charge_services_index,
            addTo: "box_count_charges_array",
          };
      }
    },
    getECommerceRoute(
      charge_types_index,
      property,
      delivery_type,
      ecommerce_charge_services_index
    ) {
      switch (property) {
        case "delivery_type":
          return {
            charge_types_index: charge_types_index,
            property: "delivery_type",
            delivery_type: delivery_type,
            ecommerce_charge_services_index: ecommerce_charge_services_index,
            addTo: "rates",
          };
      }
    },
    getRangeKeys(type) {
      switch (type) {
        case "Dispatches":
          return "units";
        case "No of Boxes":
          return "box";
        case "No of Job Count":
          return "job";
      }
    },
   async onRowEditSave(event) {
      let { newData, index } = event;
      this.data[index] = newData;
      let path = 
      "settings/salesSettings/rates/express/contract/rateCards/" + 
      this.getPath(newData);
      let toastData = {
        toastSuccessData: {
          toastMsg: "",
          toastSeverity: "success",
        },
        toastDuplicateErrorData: {
          toastMsg: "",
          toastSeverity: "",
        },
        toastCommonErrorData: {
          toastMsg: "There was an error in updating, try again!",
          toastSeverity: "error",
        },
      };

      //POST
      if (!newData.id) {
        let loadData;
        toastData.toastSuccessData.toastMsg =
          "A new record was created successfully!";
        switch (this.$store.state.expressContract.regionRatesRateTab) {
          case "normal":
            loadData = {
              path: this.getNormalRoute(
                0,
                "van_2_tire_rates_charge_by_quantity",
                1
              ),
              data: newData,
              type: "regionRates",
            };
            break;
          case "e_commerce":
            switch (this.transport) {
              case "bike":
                loadData = {
                  path: this.getECommerceRoute(
                    1,
                    "delivery_type",
                    this.$store.state.expressContract
                      .regionRatesECommerceSubTab,
                    0
                  ),
                  data: newData,
                  type: "regionRates",
                };
                break;
              case "van":
                break;
            }
            break;
        }
        this.$store.dispatch("expressContract/POSTPATCHCRUDOPERATION", {
          path: path,
          method: "POST",
          data: newData,
          loadData: loadData,
          toastData: toastData,
        });
      }
      //PATCH
      if (newData.id) {
        toastData.toastSuccessData.toastMsg =
          "The row was updated successfully!";
        this.$store.dispatch("expressContract/POSTPATCHCRUDOPERATION", {
          path: path,
          method: "PATCH",
          data: newData,
          loadData: {},
          toastData: toastData,
        });
      }
    },
    rowClass() {
      return "formRows";
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
    },

    TimeFormater(data) {
    if (data == null) {
        return "00:00";

      } else if(data=='After'||data=='Before'||!(moment(data, 'DD/MM/YYYY',true).isValid())){
      return data;
      }
       else if(moment(data, 'DD/MM/YYYY',true).isValid()){

        var formattedTime = moment(data).format("HH:mm");
        return formattedTime;
      }
     
    },
  },
  created() {
    this.data = this.tableData;
    this.expandedRows = this.data;
  },
  watch: {
     "$store.state.express.new1":function(){
  
 this.render++
    },
    "$store.state.expressContract.regionRatesTableDataChange": function () {
      for (let d in this.data) {
        if (!this.data[d].id) {
          if (this.editingRows.indexOf(this.data[d]) === -1) {
            this.editingRows.push(this.data[d]);
          }
        }
      }
    },
     
  },
};

</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover {
  background-color: #fff !important;
}
.RegionsTable .button.p-row-editor-init.p-link {
    display: none;
}
::v-deep [data-v-1596eb22] .p-datatable-row-expansion {
  background-color: #fff !important;
}
</style>
