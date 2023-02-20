<template>
  <div>
    <!-- <div class="flex"> -->
    <div class="formgrid grid mt-3 col-12 flex align-items-center">
      <div class="field col-12 md:col-3">
        <h5 class="required text-style text-left">Batch Name</h5>
        <TextField
          class="color-212121 font-size-14 font-bold mr-3"
          label="companyName"
          v-model="details.batch_name"
          :classes="{
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
      <div class="flex field col-12 md:col-4 align-items-center mt-6">
        <div
          :key="renderKey"
          class="
            flex
            field
            col-12
            md:col-4
            flex-row
            justify-content-between
            radioButtonsDiv
            ml-4
          "
        >
          <RadioButtons
            label="disabled platform"
            state="radioButtonCompany"
            v-bind:radioButtonData="SalesDialogCategories"
            v-model="details.radiobuttons"
            :selectedRadioButton="selectedRadioButton"
          />
        </div>
      </div>

      <div class="field col-12 md:col-2 margin-top-30">
        <SearchField storePath="bulkAdjustment" />
      </div>
    </div>
    <div class="row ml-2 table_div color-7e84a7">
      <div class="col-12">
        <div v-if="errMsg" class="color-red mt-2">Table data not found</div>
        <keep-alive>
          <EditTable
            :key="tripTableData"
            formTableDataName="tripFormTableData"
            :selectionModeState="selectionModeState"
            dataKey="id"
            :tableData="trips"
            :tableColumns="tripColumnData"
            storePath="bulkAdjustment"
          />
        </keep-alive>
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
      <div class="align-self-center flex"></div>
      <div class="flex flex-column justify-content-end mb-2">
        <span v-if="submitted == true && isTableData == false" class="red"
          >Please Select any table Data</span
        >
        <span v-if="submitted == true && !v$.$invalid == false" class="red"
          >Required fields are missing. Please fill Required fields</span
        >
        <div class="flex justify-content-end">
          <CancelButton
            storePath="salesSales"
            label="Cancel"
            class="color-357dea"
          />
          <Buttons
            label="Next"
            button_class="bg-357dea"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import EditTable from "./Edittable.vue";
import RadioButtons from "../../../../Reusables/RadioButtons.vue";
export default {
  components: { EditTable, RadioButtons },
  props: ["storePath"],
  name: "Selectprofile",
  data() {
    return {
      searcher: "",
      v$: useVuelidate(),
      isTableData: false,
      submitted: false,
      renderKey: 10,
      radiobuttons: null,
      radiobuttonsTwo: null,
      payloadData: {},
      trips: [],
      errMsg: false,
      selectionModeState: [],
      details: {
        batch_name: "",
        batch_date: "",
        // searcher: "",
        customer_type: "",
        express: false,
        international: false,
        rapido: false,
        business_type: "",
        radiobuttons: null,
      },
      SalesDialogCategories: [
        { name: "Express", key: "CU" },
        { name: "Rapido", key: "IU" },
        { name: "International", key: "CU" },
      ],
      BusinessType: [
        { name: "Normal", key: "CU" },
        { name: "E-commerce", key: "IU" },
        //{ name: "International", key: "CU" },
      ],
      tripColumnData: [
        { field: "s_no", header: "S. No" },
        { field: "profile_name", header: "Profile Name" },
        { field: "business_type", header: "Quotation" },
        { field: "address", header: "Address" },
        //{ field: "trip_type", header: "Trip type" },
      ],
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

  methods: {
    ...mapActions({
      getFirstStepperTableData: "bulkAdjustment/getFirstStepperTableData",
      getSecondStepperTableData: "bulkAdjustment/getSecondStepperTableData",
    }),
    async getExpressTableData() {
      try {
        const res = await this.getFirstStepperTableData();
        if (res) {
          this.trips = res.data?.results;
          let id = 1;
          for (let i in this.trips) {
            this.trips[i]["s_no"] = id++;
          }
          this.details.customer_type = this.trips[0].customer_type;
          this.details.business_type = this.trips[0].business_type;
          this.errMsg = false;
        }
      } catch (error) {
        this.errMsg = true;
        this.trips = [];
      }
    },
    nextStepHandler() {
      if (this.v$.$invalid || !this.isTableData) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.isTableData) {
        for (let i in this.details) {
          this.bulkAdjustmentAddNewData[i] = this.details[i];
          if (i != "radiobuttons") {
            this.bulkAdjustmentAddNewPayload[i] = this.details[i];
          }
        }
        this.$store.dispatch("salesSales/navigateStepper", {
          step: "RateAdjustment",
        });
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("YYYY-MM-DD");
        return formattedDate;
      }
    },
  },

  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
      bulkAdjustmentAddNewPayload: "bulkAdjustment/bulkAdjustmentAddNewPayload",
    }),
  },
  watch: {
    "details.radiobuttons": function () {
      if (this.details.radiobuttons == "Express") {
        this.details.express = true;
        this.getExpressTableData();
        this.details.radiobuttons = "Express";
        this.renderKey++;
      } else {
        this.trips = [];
      }
    },
    "details.batch_date": function () {
      this.details.batch_date = this.dateFormater(this.details.batch_date);
    },
    "$store.state.bulkAdjustment.FirstStepperTableDataSelected": function () {
      if (
        this.$store.state.bulkAdjustment.FirstStepperTableDataSelected.length !=
        0
      ) {
        this.isTableData = true;
      } else {
        this.isTableData = false;
      }
    },
  },
  created() {
    this.details.radiobuttons = "Express";
    this.selectedRadioButton = this.SalesDialogCategories[0];
    this.renderKey++;
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
/* .radioButtonsDiv {
  pointer-events: none;
} */
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
</style>