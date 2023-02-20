<template>
<div  :key="render"> 
  <DataTable
    :class="'region-rates-table'"
    class="p-datatable-sm"
    :key="render"
    id="formTable"
    :value="tableData"
    responsiveLayout="scroll"
    :filterDisplay="filtersMenuModule"
    v-model:filters='filters1'
    :globalFilterFields="getGlobalFields()"
    editMode="row"
    v-model:selection="selectedRows"
    selectionMode="single"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="rowEditCancel"
  >
  <template #header>
        <!--FOR VAN-->
        <!--TEMPLATE : 2-TIER RATES, MULTI-TIER RATE-->
        <span v-if="tableName == '2-Tier' || tableName == 'Multi Tier Rates'">
          <ExpressContractPageTabs
            v-bind:tabMenuData="getTabMenuData()"
            type="regionRatesSubTabs"
            defaultTab=""
            storePath=""
          />
        </span>
        <!--FOR VAN-->
      </template>
      <Column
        :expander="
          tableName == 'VanTwoTierRatesChargeByQuantity' || type == 'e_commerce'
            ? true
            : false
        "
        class="expander"
      />
      <Column
        v-if="tableName != 'Trips'"
        :rowEditor="true"
        headerStyle="min-width: 90px"
        bodyStyle="text-align:center"
      ></Column>

      <Column
        v-for="col of tableColumns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
        :sortable="col.header != 'Actions' ? true : false"
        :showFilterMenu="
          col.header != 'Actions' &&
          col.header !== 'Created By' &&
          col.header !== 'From' &&
          col.header !== 'To'
            ? true
            : false
        "
      >
        <!--BODY TEMPLATE-->
        <template #body="slotProps">
          <!--date formatter template-->
          <span v-if="col.header == 'Created On'">
            {{ dateFormater(slotProps.data[col.field]) }}
          </span>
          <span v-if="col.header == 'S.No.'">
            {{ serialNo(slotProps.data) }}
          </span>
          <!--Additional Rate Name-->
          <span v-if="col.header == 'Additional Rate Name'">
            {{ slotProps.data["surcharge_name"] }}
          </span>
          <span v-if="col.header == 'Actions'" class="flex align-items-center">
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
          <!-- ranges template -->
          <span
            v-if="
              col.header == 'No of Boxes' ||
              col.header == 'No of Job Count' ||
              col.header == 'Monthly Minimum Dispatches'
            "
          >
            {{ slotProps.data["min_" + getRangeKeys(col.header)] }} -
            {{ slotProps.data["max_" + getRangeKeys(col.header)] }}
          </span>

          <!-- created by template -->
          <span v-if="col.header == 'Created By' && slotProps.data[col.field]">
            {{ slotProps.data[col.field].display_name }}
          </span>


        <span
          v-if="
            col.header != 'Created By' &&
            col.header != 'Created On' &&
           
            col.header != 'No of Boxes' &&
            col.header != 'No of Job Count' &&
            col.header != 'Monthly Minimum Dispatches' &&
            col.header != 'Additional Rate Name'
          "
          >{{ slotProps.data[col.field] }}
          </span>
      </template>

        <!--COLUMN WISE FILTER TEMPLATE-->
        <template #filter="{ filterModel }">
          <span
            v-if="
              col.header == 'Rates' ||
              col.header == 'Trip No.' ||
              col.header == 'Van Job Min Cost $' ||
              col.header == 'Maximum Weight (Kg)' ||
              col.header == 'Van Job Add Cost $' ||
              col.header == 'Van Job Add Weight (Kg)' ||
              col.header == 'Van Job Urgent  $' ||
              col.header == 'Maximum Weight' ||
              col.header == 'Van Job Addl. Weight (Kg)' ||
              col.header == 'Van Job Addl. Cost ($)' ||
              col.header == 'Maximum Quantity' ||
              col.header == 'Van Job Addl. Quantity' ||
              col.header == 'Rate (S$)' ||
              col.header == 'Min Charge per Job (S$)' ||
              col.header == 'S.No.' ||
              col.header == 'COD Fee ($)' ||
              col.header == 'COD Fee %' ||
              col.header == 'Standard Liability (S$)'
            "
          >
            <InputNumber
              v-model="filterModel.value"
              class="number-field"
              mode="decimal"
              :min="0"
              :placeholder="getFilterPlaceHolder(col.header)"
              :maxFractionDigits="2"
            />
          </span>

          <span v-if="col.header == 'Additional Rate Name'">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              :placeholder="getFilterPlaceHolder(col.header)"
            />
          </span>

        <span v-if="col.header == 'Trip Days' || col.header == 'Trip Type'">
          <DropDown
            code="name"
            :state="data[field]"
            :data="getDropDownData(col.header)"
            v-model="filterModel.value"
            :placeholder='getFilterPlaceHolder(col.header)'
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </span>

        <span v-if="  col.header == 'Monthly Minimum Dispatches' ||
            col.header == 'No of Boxes' ||
            col.header == 'No of Job Count'">
          <InputNumber
                  v-model="filterModel.value"
                  class="number-field"
                  mode="decimal"
                  :min='0'
                  :placeholder='getFilterPlaceHolder(col.header)'
                  :maxFractionDigits="2"
                />
        </span>
        

        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
           <Calendar
            id="range"
            v-model="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
          <!-- <Calendars :state="filterModel.value" v-model="filterModel.value" /> -->
        </span>
      </template>


        <!--EDITOR TEMPLATE-->
        <template #editor="{ data, field }">
          <!--range template-->
          <span
            v-if="
              col.header == 'Monthly Minimum Dispatches' ||
              col.header == 'No of Boxes' ||
              col.header == 'No of Job Count'
            "
          >
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

          <span v-if="col.header == 'Cutoff Time'">
            <div class="formgrid grid">
            <div class="field col-12">
            <TimePicker24
              v-model="data[field]"
              :state="data[field]"
              :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
            </div>
          </div>
        </span>


        <!--Additional Rate Name-->
        <span v-if="col.header == 'Additional Rate Name'">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <!-- <TextField
                v-model="data['surcharge_name']"
                
                :classes="{ 'inputfield w-full dialog-field-text ': true }"
              /> -->
               <AddNewDropDownTextField
               type="Surcharge"
               :optionClose="true"
        stateName="addNewSurchargeName"
        :state="data['surcharge_name']"
        :data="addNewSurchargeName"
        :placeholder="data['surcharge_name']==''?'Choose a Surcharge Name':data['surcharge_name']"
        storePath="expressContract"
        v-model="data['surcharge_name']"
        @addNewValue="addNewSurcharge"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
            </div>
          </div>
        </span>

          <!--text-field template : numbers-->
          <span
            v-if="
              col.header == 'Rates' ||
              col.header == 'Van Job Min Cost $' ||
              col.header == 'Maximum Weight (Kg)' ||
              col.header == 'Van Job Add Cost $' ||
              col.header == 'Van Job Add Weight (Kg)' ||
              col.header == 'Van Job Urgent  $' ||
              col.header == 'Maximum Weight' ||
              col.header == 'Van Job Addl. Weight (Kg)' ||
              col.header == 'Van Job Addl. Cost ($)' ||
              col.header == 'Maximum Quantity' ||
              col.header == 'Van Job Addl. Quantity' ||
              col.header == 'Rate (S$)' ||
              col.header == 'Min Charge per Job (S$)' ||
              col.header == 'Cutoff Days' ||
              col.header == 'Timeslot Delivery $' ||
              col.header == 'Timeslot Delivery Hours (Fixed)' ||
              col.header == 'COD Fee ($)' ||
              col.header == 'COD Fee %' ||
              col.header == 'Standard Liability (S$)'
            "
          >
            <div class="formgrid grid">
              <div class="field col-12 md:col-12">
                <InputNumber
                  v-model="data[field]"
                  class="number-field"
                  mode="decimal"
                  :min="0"
                  :maxFractionDigits="2"
                  :class="{ 'inputfield w-full dialog-field-text': true }"
                />
              </div>
            </div>
          </span>

          <!--dropdown template-->
          <span v-if="col.header == 'Trip Days'">
            <DropDown
              code="name"
              :state="data[field]"
              :data="getDropDownData(col.header)"
              v-model="data[field]"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
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

      <template #expansion="slotProps">
        <!--TEMPLATE : NORMAL : STARTS HERE-->
        <span v-if="type == 'normal'">
          <!--Van 2 Tier Charge By quantity-->
          <span v-if="tableName == 'VanTwoTierRatesChargeByQuantity'">
            <!-- <span style="padding-left: 680px; padding-bottom: 10px">
            <Button label="Add New" @click="handleClick($event)" />
          </span> -->

            <div class="m-3">
              <span>Box Count Charges</span>
              <div class="mt-3">
                <ExpansionTables
                  :tableDataName="'BoxCountCharges'"
                  :tableName="'Box Count Charges'"
                  :tableData="
                    getExpansionTableData(slotProps.data['box_count_charges'])
                  "
                  :tableColumns="getExpansionTableColumnData()"
                  :type="type"
                  transport="Van"
                />
              </div>
            </div>
          </span>
        </span>
        <!--TEMPLATE : NORMAL : STARTS HERE-->

        <!--TEMPLATE : E-COMMERCE : STARTS HERE-->
        <span v-if="type == 'e_commerce'">
          <!--BIKE/VAN-->
          <span v-if="transport == 'Bike' || transport == 'Van'">
            <TableExpansionTabs
              v-bind:tabMenuData="getExpansionTabMenuData(slotProps.data)"
              tableName
              type="regionRates"
              defaultTab=""
              storePath=""
            />
          </span>
        </span>
        <!--TEMPLATE : E-COMMERCE : ENDS HERE-->
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Column from "primevue/column";
import { RegionalRatesData, tripTypeDropDownData } from "../const/const";
import CustomSpeedDials from "../CustomSpeedDial.vue";
import InputNumber from "primevue/inputnumber";
import TableExpansionTabs from "../Tabs/TableExpansionTabs.vue";
import { mapActions, mapState } from "vuex";
import ExpansionTables from "../Tables/ExpansionTables.vue";
import InputText from "primevue/inputtext";
import moment from "moment";
import {exc_master,ex_state_master} from "../../../../../../store/helper"
// import Button from "primevue/button";
//data imports
import {
  normalVanTwoTierTabMenuData,
  normalVanMultiTierTabMenuData,
  normalVanTwoTierChargeByQuantityBoxCountChargesTableColumnData,
  eCommerce_Bike_Rates_TableColumnData,
  eCommerce_Bike_BikeCustomerVanJob_TableColumnData,
  eCommerce_Van_Rates_TableColumnData,
  eCommerce_Van_ChargeByWeight_TableColumnData,
  eCommerce_Van_ChargeByQuantity_TableColumnData,
  eCommerce_Van_BoxCountCharges_TableColumnData,
  eCommerce_Van_VanCustomerBikeJob_TableColumnData,
  tripDaysDropDownData,
} from "../const/const.js";
export default {
  name: "ContactLabelsTable",
  components: {
    DataTable,
    Column,
    // Button,
    InputNumber,
    InputText,
    // InputText,
    TableExpansionTabs,
    CustomSpeedDials,
    ExpansionTables,
  },
  props: [
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "selectionModeState",
    "formTableDataName",
    "apiKey",
  ],
  data() {
    return {
      data: [],
      sNo: 0,
      render: 0,
      selectedRows: null,
      expandedRows: [],
      editingRows: [],
      boxData: [],
      filters1: null,
      tier2TabName: [
        {
          label: "VanTwoTierRatesChargeByWeight",
          apiKey: "van_2_tire_rates_charge_by_weight",
          tab: "RegionRatesTable",
          select: false,
          tabName: "Weight",
          heading: "VanTwoTierRatesChargeByWeight",
          transport: "Van",
          type: "normal",
        },
        {
          label: "VanTwoTierRatesChargeByQuantity",
          apiKey: "van_2_tire_rates_charge_by_quantity",
          tab: "RegionRatesTable",
          select: true,
          tabName: "Quantity",
          heading: "VanTwoTierRatesChargeByQuantity",
          transport: "Van",
          type: "normal",
        },
      ],
      multiTierTabName: [
        {
          label: "VanMultiTierRatesChargeByQuantity",
          apiKey: "van_Multi_tire_rates_charge_by_quantity",
          tab: "RegionRatesTable",
          select: true,
          tabName: "Quantity",
          heading: "VanMultiTierRatesChargeByQuantity",
          transport: "Van",
          type: "normal",
        },
        {
          label: "VanMultiTierRatesChargeByJobCount",
          apiKey: "van_Multi_tire_rates_charge_by_job_count",
          tab: "RegionRatesTable",
          select: false,
          tabName: "Job Count",
          heading: "VanMultiTierRatesChargeByJobCount",
          transport: "Van",
          type: "normal",
        },
      ],
      tabName: null,
      regionalOverlayData: RegionalRatesData,
    };
  },
  computed: {
    ...ex_state_master,
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
    filtersMenuModule() {
      let data = "";
      if (this.type !== "e_commerce") {
        data = "menu";
      }
      return data;
    },
  },
  mounted() {
    this.tabName = this.getTabMenuData();
    this.initialised();
  },
  methods: {
    ...exc_master,
    ...mapActions("express", ["createNormalBikeRates"]),
    ...mapActions("express", [
      "getRegionRatesById",
      "createNormalVanRates",
      "createMultiTierVanJob",
      "createMultiTierQuantity",
    ]),
    serialNo(data) {
      //     this.sNo++;
      // return this.sNo.toString();
    },

    editDateFormatter(data) {
      let datatype = typeof data
      if (data == null) {
        return "00:00";
      } else if(datatype == 'object'){
        let formattedTime = moment(data).format("HH:mm");
        return formattedTime;
      } else if (data.toString().includes("Z", "T")) {
        let formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      } else if (data.includes(":") && datatype == 'string') {
        return data;
      } else {
        let formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },

    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
        globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      };
      this.filters1 = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      };
      for (let c in this.tableColumns) {
        this.filters1[this.tableColumns[c]["field"]] = obj;
        if (["createdAt"].includes(this.tableColumns[c]["field"])) {
          this.filters1[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
      }
    },
    initialised() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (
            this.regionRatesByIdData.charge_types[i].charge_type == "normal"
          ) {
            for (
              var j = 0;
              j <
              this.regionRatesByIdData.charge_types[i].normal_charge_services
                .length;
              j++
            ) {
              if (
                this.regionRatesByIdData.charge_types[i].normal_charge_services[
                  j
                ].service_type == "van"
              ) {
                if (this.$store.state.express.currentIndex == 2) {
                  for (
                    let r = 0;
                    r <
                    this.regionRatesByIdData.charge_types[i]
                      .normal_charge_services[j]
                      .van_2_tire_rates_charge_by_quantity.length;
                    r++
                  ) {
                    this.boxData[r] =
                      this.regionRatesByIdData.charge_types[
                        i
                      ].normal_charge_services[
                        j
                      ].van_2_tire_rates_charge_by_quantity[
                        r
                      ].box_count_charges;
                  }
                }
              }
            }
          }
        }
      });
    },

    handleClick(args) {},
    getApiKey() {
      switch (this.tableName) {
        case "Trips":
          return "trips";
        case "Rates":
          return "rates";
        case "Bike Customer Van Job":
          return "bikeCustomerVanJob";
        case "Van Customer Bike Charges":
          return "vanCustomerBikeJob";
        case "VanTwoTierRatesChargeByWeight":
          return "twoTireRate/weight";
        case "VanTwoTierRatesChargeByQuantity":
          return "twoTireRate/quantity";
        case "VanMultiTierRatesChargeByQuantity":
          return "multiTireRate/quantity";
        case "VanMultiTierRatesChargeByJobCount":
          return "multiTireRate/jobCount";
      }
    },
    getPath() {
      let path;
      switch (this.type) {
        //for normal tab
        case "normal":
          path =
            "normal/" + this.transport.toLowerCase() + "/" + this.getApiKey();
          return path;

        //for ecommerce
        case "e_commerce":
          path = "eCommerce/deliveryType/" + this.transport.toLowerCase();
          return path;
        //for surcharges tab
        case "surcharges":
          path = "surcharges";
          return path;
        //for additonal surcharges tab
        case "additional_surcharges":
          path = "additionalSurcharges";
          return path;
      }
    },
    getRoute(charge_types_index, property, normal_charge_services_index) {
      let path = {
        charge_types_index: charge_types_index,
        property: property,
        normal_charge_services_index: normal_charge_services_index,
      };
      return path;
    },
    rowEditCancel() {},
    onRowEditSave(event) {
      let { newData, index } = event;
      this.data[index] = newData;

      let path =
        "settings/salesSettings/rates/express/contract/rateCards/" +
        this.getPath() +
        "/";
        if(this.type == 'additional_surcharges'){
        let f_data=this.addNewSurchargeName[0].items.find((i)=>i.name==newData.surcharge_name?.surcharge_name);
        newData["geo_fencing_id"]=f_data.geo_fencing_id;
        newData["surcharge_name"]=f_data.surcharge_name;
        }
      let toastData = {
        toastSuccessData: {
          toastMsg: "",
          toastSeverity: "success",
        },
        toastDuplicateErrorData: {
          toastMsg: "",
          toastSeverity: "",
        },
      };

      //POST
      if (!newData.id) {
        let loadData;
        toastData.toastSuccessData.toastMsg =
          "A new record was created successfully!";
        switch (this.$store.state.expressContract.regionRatesRateTab) {
          case "normal":
            switch (this.$store.state.expressContract.regionRatesTransportTab) {
              case "bike":
                switch (this.$store.state.expressContract.regionRatesSubTab) {
                  case "rates":
                    loadData = {
                      path: this.getRoute(0, "rates", 0),
                      data: newData,
                      type: "regionRates",
                    };
                    break;
                }
                break;
              case "van":
                switch (this.$store.state.expressContract.regionRatesSubTab) {
                  case "rates":
                    loadData = {
                      path: this.getRoute(0, "rates", 1),
                      data: newData,
                      type: "regionRates",
                    };
                    break;
                  case "multiTierRate":
                    loadData = {
                      path: this.getRoute(
                        0,
                        this.$store.state.expressContract
                          .regionRatesMultiTierSubTab,
                        1
                      ),
                      data: newData,
                      type: "regionRates",
                    };
                    break;
                }
                break;
            }
            break;
        }
        this.$store.dispatch("expressContract/POSTPATCHCRUDOPERATION", {
          path: path + newData.service_id,
          method: "POST",
          data: newData,
          loadData: loadData,
          toastData: toastData,
        });
      }

      //PATCH
      if (newData.id) {
        if (newData.collect_time || newData.cut_off_time) {
          newData.collect_time = this.editDateFormatter(newData.collect_time);
          newData.cut_off_time = this.editDateFormatter(newData.cut_off_time);
        }
        toastData.toastSuccessData.toastMsg = "The row was updated successfully!";
        this.$store.dispatch("expressContract/POSTPATCHCRUDOPERATION", {
          path: path + newData.id,
          method: "PATCH",
          data: newData,
          loadData: {},
          toastData: toastData,
        });
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
    },
    getDropDownData(type) {
      switch (type) {
        case "Trip Days":
          return tripDaysDropDownData;
        case "Trip Type":
          return tripTypeDropDownData;
      }
    },
    timeFormatter(type, data) {
      if (type == "Cutoff Time") {
        var newData;
        if (data.toString().includes("Z")) {
          newData = data.replace("Z", "");
        } else {
          newData = data;
        }

        var getTime = new Date(newData);
        if (data == null) {
          return "00:00";
        } else if (moment(getTime, "DD/MM/YYYY", true).isValid()) {
          var formattedTime = moment(newData).format("HH:mm");

          return formattedTime;
        } else {
          return data;
        }
      } else {
        return moment(data).format("HH");
      }
    },
    getTabMenuData() {
      switch (this.type) {
        case "normal":
          if (this.tableName == "2-Tier") {
            return normalVanTwoTierTabMenuData;
          }
          if (this.tableName == "Multi Tier Rates") {
            return normalVanMultiTierTabMenuData;
          }
          break;
      }
    },
    getRangeKeys(type) {
      switch (type) {
        case "Monthly Minimum Dispatches":
          return "units";
        case "No of Boxes":
          return "box";
        case "No of Job Count":
          return "job";
      }
    },
    getExpansionTableData(data) {
      for (let d in data) {
        data[d]["s_no"] = parseInt(d) + 1;
      }
      return data;
    },
    insertSerialNo(data, subData, subData1) {
      let newData = {};
      newData = data[subData].map((itm, idx) => {
        itm.s_no = idx + 1;
      });
      newData = data[subData1].map((item, indx) => {
        item.s_no = indx + 1;
      });
      return newData;
    },

    formatCutOffTimeInObjects(object, key){
      let objects = object;
        for(let item in objects){
          if(item == key){
            objects[item] = this.timeFormatter('Cutoff Time', objects[item]);
        }
      }
      return objects
    },

    getExpansionTableColumnData() {
      switch (this.tableName) {
        case "VanTwoTierRatesChargeByQuantity":
          return normalVanTwoTierChargeByQuantityBoxCountChargesTableColumnData;
      }
    },
    getExpansionTabMenuData(data) {
      switch (this.transport) {
        case "Bike":
          this.insertSerialNo(data, "rates", "bike_customer_van_job");
          return [
            {
              label: "Rates",
              tab: "ExpansionTables",
              data: data["rates"],
              columns: eCommerce_Bike_Rates_TableColumnData,
              select: true,
              tabName: "Rates",
              heading: "Rates",
              apiKey: "e_commmerce_bike_rates",
              transport: this.transport,
              type: "e_commerce",
            },
            {
              label: "BikeCustomerVanJob",
              tab: "ExpansionTables",
              data: data["bike_customer_van_job"],
              columns: eCommerce_Bike_BikeCustomerVanJob_TableColumnData,
              select: false,
              tabName: "Bike Customer Van Job",
              heading: "BikeCustomerVanJob",
              apiKey: "bike_customer_van_job",
              transport: this.transport,
              type: "e_commerce",
            },
          ];
        case "Van":
          return [
            {
              label: "Rates",
              tab: "ExpansionTables",
              data: data["rates"],
              columns: eCommerce_Van_Rates_TableColumnData,
              select: true,
              tabName: "Rates",
              heading: "Rates",
              apiKey: "e_commmerce_van_rates",
              transport: this.transport,
              type: "e_commerce",
            },
            {
              label: "ChargeByWeight",
              tab: "ExpansionTables",
              data: data["van_charge_by_weight"],
              columns: eCommerce_Van_ChargeByWeight_TableColumnData,
              select: false,
              tabName: "Charge by Weight",
              heading: "ChargeByWeight",
              apiKey: "van_charge_by_weight",
              transport: this.transport,
              type: "e_commerce",
            },
            {
              label: "ChargeByQuantity",
              tab: "ExpansionTables",
              data: data["van_charge_by_quantity"],
              columns: [
                eCommerce_Van_ChargeByQuantity_TableColumnData,
                eCommerce_Van_BoxCountCharges_TableColumnData,
              ],
              select: false,
              tabName: "Charge by Quantity",
              heading: "ChargeByQuantity",
              apiKey: "van_charge_by_quantity",
              transport: this.transport,
              type: "e_commerce",
            },
            {
              label: "VanCustomerBikeJob",
              tab: "ExpansionTables",
              data: data["van_customer_bike_job"],
              columns: eCommerce_Van_VanCustomerBikeJob_TableColumnData,
              select: false,
              tabName: "Van Customer Bike Job",
              heading: "VanCustomerBikeJob",
              apiKey: "van_customer_bike_job",
              transport: this.transport,
              type: "e_commerce",
            },
          ];
      }
    },
  },
  async created() {
    await this.getSurchargeNames();
    this.data = this.tableData;
    if(this.type == 'e_commerce'){
    for(let i=0; i< this.data.length; i++){
      this.data[i] = this.formatCutOffTimeInObjects(this.data[i], 'cut_off_time')
      }
    }
    this.initilaizeFilters();
    this.expandedRows = this.data;
  },
  watch: {
    tableData: function () {
      this.data = this.tableData;
      if(this.type == 'e_commerce'){
      for(let i=0; i< this.data.length; i++){
      this.data[i] = this.formatCutOffTimeInObjects(this.data[i], 'cut_off_time')
      }
    }
      this.initilaizeFilters();
    },
    "$store.state.express.new1": function () {
      this.render++;
    },
    "$store.state.express.norBikeNew": function () {
      this.render++;
    },
    "$store.state.express.new": function () {
      this.render++;
    },
    "$store.state.express.new3": function () {
      this.render++;
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
::v-deep .p-datatable-thead > tr > th {
  color: #7e84a7 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}
.region-rates-table .p-datatable-header {
  padding: 0 !important;
}
</style>
