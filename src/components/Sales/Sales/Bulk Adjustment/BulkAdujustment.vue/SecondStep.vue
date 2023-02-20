<template>
  <div class="flex">
    <div class="formgrid grid mt-3 flex align-items-center DiasbledDiv">
      <div class="field col-12 md:col-3">
        <h5 class="required text-style text-left">Batch Name</h5>
        <TextField
          class="color-212121 font-size-14 font-bold mr-3"
          label="companyName"
          v-model="details.batch_name"
          :class="{
            'p-invalid': v$.details.batch_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="text-style text-left required">Batch Date</h5>
        <Calendar
          v-model="details.batch_date"
          :showIcon="true"
          class="width-235"
          :class="{
            'p-invalid': v$.details.batch_date.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="flex field md:col-6 col-6 mt-4">
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="Express"
                  value="Express"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="chargeMinium"
                  >Express</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="Rapido"
                  value="Rapido"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="chargeMinium"
                  >Rapido</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="International"
                  value="International"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="International"
                  >International</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-6 mt-3">
          <TextField
            v-model="details.searcher"
            label="contactsSearch"
            icon="fa fa-search"
            placeholder="Search "
            type="text"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center">
    <DuoSelect
      :options="['Normal', 'Ecommerce']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
    <div class="flex flex-row">
      <div class="flex ml-3">
        <SingleCheckBox
          v-if="defaultTransportType == 'Normal'"
          label="Apply For All"
          v-model="checkBoxClickNormal"
          :value="checkBoxClickNormal"
        />
        <SingleCheckBox
          v-if="defaultTransportType == 'Ecommerce'"
          label="Apply For All"
          v-model="checkBoxClickEcom"
          :value="checkBoxClickEcom"
        />
        <!-- <CheckBox
            v-bind:categories="[
              {
                name: 'Apply For All',
                key: 'a',
              },
            ]"
          /> -->
        <!-- </div>
        <div class="flex">
          <span class="mt-2">Apply For All</span> -->
      </div>
    </div>
  </div>

  <div v-if="defaultTransportType == 'Normal'">
    <div class="row ml-2 table_div color-7e84a7">
      <div class="col-12">
        <!-- <keep-alive> -->
        <DataTable
          formTableDataName="tripFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="trip_id"
          :tableData="NormalProfileData"
          :tableColumns="NormalColumnData"
          storePath="salesQuotationDialog"
          :isAmtDisabled="amountDisabled"
          :isPercentDisabled="persentDisabled"
        />
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
  <div v-if="defaultTransportType == 'Ecommerce'">
    <div class="row ml-2 table_div color-7e84a7">
      <div class="col-12">
        <keep-alive>
          <EcomTable
            :key="tripTableData"
            TableDataName="tripFormTableData"
            :selectionModeState="selectionModeState"
            dataKey="id"
            tableName="EcommerceTable"
            :tableData="EcomProfileData"
            :isAmtDisabled="amountDisabled"
            :isPercentDisabled="persentDisabled"
            :tableColumns="EcomColumnData"
            storePath="bulkAdjustment"
            :class="checkBoxClickEcom == true ? 'applyAll' : 'Disable'"
          />
        </keep-alive>
      </div>
    </div>
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
      <CancelButton
        storePath="salesSales"
        class="color-357dea"
        label="Cancel"
      />
      <Buttons
        label="Next"
        button_class="bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
//import EditTable from "./Edittable.vue"
import DataTable from "./DataTable.vue";
import EcomTable from "./EcomTable.vue";
import DuoSelect from "./Duoselect.vue";
import RadioButton from "primevue/radiobutton";
//import Checkbox from 'primevue/checkbox';
import { mapActions, mapGetters } from "vuex";
export default {
  components: { DuoSelect, DataTable, RadioButton, EcomTable },
  name: "RateAdjustment",
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      defaultTransportType: "Normal",
      checkBoxClickNormal: false,
      checkBoxClickEcom: false,
      selectedCategory: "",
      amountDisabled: false,
      persentDisabled: false,
      tableDataSecondStepper: {},
      details: {
        batch_name: "",
        batch_date: "",
        searcher: "",
      },
      SalesDialogCategories: [
        { name: "Express", key: "CU" },
        { name: "Rapido", key: "IU" },
        { name: "International", key: "CU" },
      ],

      apply: [{ name: "Apply for All", key: "kk" }],

      EcomColumnData: [
        { field: "S_No", header: "S. No" },
        { field: "profile_name", header: "Profile Name" },
        { field: "business_type", header: "Quotation" },
        // { field: "min_units", header: "Min Units" },
        // { field: "unit_cost", header: "Unit Cost $" },
        // { field: "select", header: "Select" },
        { field: "Increment_amount", header: "Increment amount (S$)" },
        { field: "Increment_Percentage", header: "Increment Percentage (%)" },
        { field: "remarks", header: "Remarks" },
        { field: "remove", header: "Remove" },
      ],
      NormalColumnData: [
        { field: "S_No", header: "S. No" },
        { field: "profile_name", header: "Profile Name" },
        { field: "business_type", header: "Quotation" },
        { field: "no_of_units", header: "Min Units" },
        { field: "per_job", header: "Unit Cost $" },
        { field: "Increment_amount", header: "Increment amount (S$)" },
        { field: "Increment_Percentage", header: "Increment Percentage (%)" },
        { field: "new_cost", header: "New Cost $" },
        { field: "remarks", header: "Remarks" },
        { field: "remove", header: "Remove" },
      ],
      NormalProfileData: [],
      EcomProfileData: [],
    };
  },
  validations() {
    return {
      details: {
        batch_name: { required },
        batch_date: { required },
        //searcher:"",
      },
    };
  },
  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
      bulkAdjustmentAddNewPayload: "bulkAdjustment/bulkAdjustmentAddNewData",
      rowEdit: "bulkAdjustment/rowEdit",
      IncrementPercentageDisable: "bulkAdjustment/IncrementPercentageDisable",
      IncrementAmountDisable: "bulkAdjustment/IncrementAmountDisable",
    }),
  },
  watch: {
    "$store.state.bulkAdjustment.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.bulkAdjustment.addRegionDeliveryTransportType;
    },

    "$store.state.bulkAdjustment.rowEdit.Increment_amount": function () {
      if (this.$store.state.bulkAdjustment.rowEdit.Increment_amount != 0) {
        this.disablePercentage();
        if (this.checkBoxClickNormal && this.defaultTransportType == "Normal") {
          this.applyForAll();
        }
        if (
          this.checkBoxClickEcom &&
          this.defaultTransportType == "Ecommerce"
        ) {
          this.applyForAllEcom();
        }
      }
    },
    "$store.state.bulkAdjustment.rowEdit.Increment_Percentage": function () {
      if (this.$store.state.bulkAdjustment.rowEdit.Increment_Percentage != 0) {
        this.disableAmount();
        // this.renderkey++;
        if (this.checkBoxClickNormal && this.defaultTransportType == "Normal") {
          this.applyForAll();
        }
        if (
          this.checkBoxClickEcom &&
          this.defaultTransportType == "Ecommerce"
        ) {
          this.applyForAllEcom();
        }
      }
    },
    "$store.state.bulkAdjustment.rowEdit.remarks": function () {
      if (this.$store.state.bulkAdjustment.rowEdit.remarks) {
        this.disableAmount();
        // this.renderkey++;
        if (this.checkBoxClickNormal && this.defaultTransportType == "Normal") {
          this.applyForAll();
        }
        if (
          this.checkBoxClickEcom &&
          this.defaultTransportType == "Ecommerce"
        ) {
          this.applyForAllEcom();
        }
      }
    },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.batch_name":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.batch_date":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.radiobuttons":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.profiles":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.FirstStepperTableDataSelected": function () {
      this.getSecondTableData();
    },
    "$store.state.bulkAdjustment.normalTableRowDelete.data.id": function () {
      let s_no = 1;
      for (let i in this.NormalProfileData) {
        if (
          this.NormalProfileData[i].id ==
          this.$store.state.bulkAdjustment.normalTableRowDelete.data.id
        ) {
          this.NormalProfileData.splice(
            this.$store.state.bulkAdjustment.normalTableRowDelete.index,
            1
          );
        }
        if (this.NormalProfileData[i]) {
          this.NormalProfileData[i].S_No = s_no++;
        }
      }
    },
    "$store.state.bulkAdjustment.ecomTableRowDelete": function () {
      let s_no = 1;
      for (let i in this.EcomProfileData) {
        if (
          this.EcomProfileData[i].id ==
          this.$store.state.bulkAdjustment.ecomTableRowDelete.data.id
        ) {
          this.EcomProfileData.splice(
            this.$store.state.bulkAdjustment.ecomTableRowDelete.index,
            1
          );
        }
        if (this.EcomProfileData[i]) {
          this.EcomProfileData[i].S_No = s_no++;
        }
      }
    },
    // ecom
    checkBoxClickNormal: function () {
      if (
        this.checkBoxClickNormal &&
        this.bulkAdjustmentAddNewData.profiles.normal[0].Increment_amount
      ) {
        this.applyForAll();
      }
    },
    checkBoxClickEcom: function () {
      this.$store.state.bulkAdjustment.checkBoxClickEcom =
        this.checkBoxClickEcom;
      if (this.checkBoxClickEcom) {
        this.applyForAllEcom();
      }
    },
  },

  methods: {
    ...mapActions({
      getFirstStepperTableData: "bulkAdjustment/getFirstStepperTableData",
      getSecondStepperTableData: "bulkAdjustment/getSecondStepperTableData",
    }),
    goBackHandler() {
      // this.$store.state.sales.stepperNavigation = "Information";
      this.$store.dispatch("salesSales/navigateStepper", {
        step: "Selectprofile",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.bulkAdjustmentAddNewData["table_data"] =
          this.tableDataSecondStepper;
        console.log(this.bulkAdjustmentAddNewData, "Seconstep Data");
        this.$store.dispatch("salesSales/navigateStepper", {
          step: "EffectiveDate",
        });
      }
    },
    applyForAll() {
      this.$confirm.require({
        message:
          "Entered datas will be deleted. Are you sure you want to Delete?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          for (let i in this.bulkAdjustmentAddNewData.profiles.normal) {
            if (
              this.$store.state.bulkAdjustment.editField == "Increment_amount"
            ) {
              this.bulkAdjustmentAddNewData.profiles.normal[
                i
              ].Increment_amount =
                this.bulkAdjustmentAddNewData.profiles.normal[0].Increment_amount;
              if (
                this.bulkAdjustmentAddNewData.profiles.normal[i]
                  .Increment_amount
              ) {
                this.bulkAdjustmentAddNewData.profiles.normal[
                  i
                ].Increment_Percentage = Number(
                  (
                    (this.bulkAdjustmentAddNewData.profiles.normal[i]
                      .Increment_amount /
                      this.bulkAdjustmentAddNewData.profiles.normal[i]
                        .per_job) *
                    100
                  ).toFixed(2)
                );
                this.bulkAdjustmentAddNewData.profiles.normal[i].new_cost =
                  this.bulkAdjustmentAddNewData.profiles.normal[i]
                    .Increment_amount +
                  this.bulkAdjustmentAddNewData.profiles.normal[i].per_job;
              }
              this.bulkAdjustmentAddNewData.profiles.normal[i].remarks =
                this.bulkAdjustmentAddNewData.profiles.normal[0].remarks;
            }
            // inc. Percent
            if (
              this.$store.state.bulkAdjustment.editField ==
              "Increment_Percentage"
            ) {
              this.bulkAdjustmentAddNewData.profiles.normal[
                i
              ].Increment_Percentage =
                this.bulkAdjustmentAddNewData.profiles.normal[0].Increment_Percentage;
              if (
                this.bulkAdjustmentAddNewData.profiles.normal[i]
                  .Increment_Percentage
              ) {
                this.bulkAdjustmentAddNewData.profiles.normal[
                  i
                ].Increment_amount = Number(
                  (
                    (this.bulkAdjustmentAddNewData.profiles.normal[i]
                      .Increment_Percentage /
                      100) *
                    this.bulkAdjustmentAddNewData.profiles.normal[i].per_job
                  ).toFixed(2)
                );
                this.bulkAdjustmentAddNewData.profiles.normal[i].new_cost =
                  this.bulkAdjustmentAddNewData.profiles.normal[i]
                    .Increment_amount +
                  this.bulkAdjustmentAddNewData.profiles.normal[i].per_job;
              }
              this.bulkAdjustmentAddNewData.profiles.normal[i].remarks =
                this.bulkAdjustmentAddNewData.profiles.normal[0].remarks;
            }
          }
        },
      });
    },
    applyForAllEcom() {
      this.$confirm.require({
        message:
          "Entered datas will be deleted. Are you sure you want to Delete?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          for (let i in this.bulkAdjustmentAddNewData.profiles.e_commerce) {
            for (let j in this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
              .e_commerce) {
              //inc Amount
              if (
                this.$store.state.bulkAdjustment.editFieldEcom ==
                "Increment_amount"
              ) {
                this.bulkAdjustmentAddNewData.profiles.e_commerce[
                  i
                ].Increment_amount =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_amount;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[
                  i
                ].Increment_Percentage =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_Percentage;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].remarks =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].remarks;
                //expansion contents
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_amount =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_amount;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_Percentage = Number(
                  (
                    (this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                      .e_commerce[j].Increment_amount /
                      this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                        .e_commerce[j].per_job) *
                    100
                  ).toFixed(2)
                );
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].revised_amount =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].Increment_amount +
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].per_job;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].remarks =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i].remarks;
              } else if (
                this.$store.state.bulkAdjustment.editFieldEcom ==
                "Increment_Percentage"
              ) {
                this.bulkAdjustmentAddNewData.profiles.e_commerce[
                  i
                ].Increment_Percentage =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_Percentage;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[
                  i
                ].Increment_amount =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_amount;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].remarks =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].remarks;
                //expansion contents
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_Percentage =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[0].Increment_Percentage;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_amount = Number(
                  (
                    (this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                      .e_commerce[j].Increment_Percentage /
                      100) *
                    this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                      .e_commerce[j].per_job
                  ).toFixed(2)
                );
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].revised_amount =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].Increment_amount +
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].per_job;
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].remarks =
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i].remarks;
              }
            }
          }
        },
      });
    },
    disablePercentage() {
      this.persentDisabled = true;
      this.amountDisabled = false;
    },
    disableAmount() {
      this.persentDisabled = false;
      this.amountDisabled = true;
    },
    async prefillData() {
      // this.NormalProfileData = this.bulkAdjustmentAddNewData?.profiles?.normal;
      this.EcommerceColumnData = this.bulkAdjustmentAddNewData?.profile;
      this.details.batch_name = this.bulkAdjustmentAddNewData?.batch_name;
      this.details.batch_date = this.bulkAdjustmentAddNewData?.batch_date;
      this.selectedCategory = this.bulkAdjustmentAddNewData?.radiobuttons;
    },
    async getSecondTableData() {
      let payload = { selected_contracts: [] };
      this.$store.state.bulkAdjustment.FirstStepperTableDataSelected.map(
        (list) => {
          payload.selected_contracts.push(list.id);
        }
      );
      try {
        const res = await this.getSecondStepperTableData(payload);
        if (res) {
          this.tableDataSecondStepper = res.data?.results;
          this.bulkAdjustmentAddNewData["profiles"] = {};
          this.bulkAdjustmentAddNewData.profiles["normal"] = [];
          let idNormal = 1;
          res.data?.results?.normal.map((list) => {
            this.bulkAdjustmentAddNewData.profiles.normal.push({
              contract_id: list?.contract_id,
              profile_name: list?.profile_name,
              acknowledged: false,
              sales_person_id: list?.sales_person_id,
              sales_person_name: list?.sales_person?.display_name,
              sales_person_contact: list?.sales_person?.contact_no,
              address: list?.address,
              contract_profile_id: list?.id,
              express_contract_type: "normal",
              remarks: list?.remarks,
              express_service_type: list.service,
              per_job: list?.normal.per_job,
              additional_job: list?.normal?.additional_job,
              no_of_units: list?.normal?.no_of_units,
              amount: list?.normal?.amount,
              Increment_amount: 0,
              Increment_Percentage: 0,
              normal_rate_id: list?.normal?.id,
              new_cost: 0,
              S_No: idNormal++,
              business_type: list.business_type,
              id: list.id,
            });
          });

          // for (let i in res.data?.results?.normal) {
          //   // this.bulkAdjustmentAddNewData.profiles.normal[i]["Others"] =
          //   //   res.data?.results?.normal[i];
          //   this.bulkAdjustmentAddNewData.profiles.normal[i] =
          //     res.data?.results?.normal[i]?.normal;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i]["S_No"] =
          //     idNormal++;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i]["profile_name"] =
          //     res.data?.results?.normal[i]?.profile_name;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i]["business_type"] =
          //     res.data?.results?.normal[i]?.business_type;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i]["remarks"] =
          //     res.data?.results?.normal[i]?.remarks;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i][
          //     "Increment_amount"
          //   ] = 0;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i][
          //     "Increment_Percentage"
          //   ] = 0;
          //   this.bulkAdjustmentAddNewData.profiles.normal[i]["new_cost"] = 0;
          // }
          // E-Commerece
          let idEcom = 1;
          // res.data?.results?.e_commerce.map({
          //   this.bulkAdjustmentAddNewData.profiles.e_commerce.push({

          //   })
          // })
          this.bulkAdjustmentAddNewData.profiles["e_commerce"] = [];
          for (let i in res.data?.results?.e_commerce) {
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i] =
              res.data?.results?.e_commerce[i];
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i]["S_No"] =
              idEcom++;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i][
              "Increment_amount"
            ] = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i][
              "Increment_Percentage"
            ] = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i][
              "disabled"
            ] = false;
            //Expansion Data
            let idEcomExp = 1;
            for (let j in this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
              .e_commerce) {
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ]["S_No"] = idEcomExp++;
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ]["Increment_amount"] = 0;
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ]["Increment_Percentage"] = 0;
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ]["revised_amount"] = 0;
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ]["remarks"] = "Remarks here";
            }
          }
          this.NormalProfileData =
            this.bulkAdjustmentAddNewData?.profiles?.normal;
          this.EcomProfileData =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce;
        }
      } catch (error) {
        this.errMsg = true;
        this.trips = [];
      }
    },
  },

  async created() {
    await this.getSecondTableData();
    await this.prefillData();
    // this.EcomProfileData = this.$store.state.bulkAdjustment.EcomProfileData;
  },
};
</script>

<style scoped>
.DiasbledDiv {
  pointer-events: none;
}
.text-style {
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */

  display: flex;
  align-items: center;

  color: #7a7a7a;
}

.radioButtonsDiv {
  font-weight: 700;
  font-size: 12px;
  /* line-height: 15px; */
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #c4c4c4;
}
::v-deep .p-checkbox-checked.label-text {
  color: #357dea !important;
  font-weight: 700;
  font-size: 14px;
}
::v-deep
  .applyAll
  .p-datatable-wrapper
  .p-datatable-table
  .p-datatable-tbody
  .p-editable-column {
  pointer-events: all;
  /* color: red; */
  /* background: #edf1f7; */
  /* border: 1px solid #357dea !important; */
}
</style>