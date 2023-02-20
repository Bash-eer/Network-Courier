<template>
 <p class="color-4e5968 font-size-16 bold-700 ml-3 mt-5 add_rates">Multi - Tier Charges</p>
  <div v-for="(rate, index) of addRates" :key="rate">
    <div v-if="index > 0" class="flex justify-content-between ml-2">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="fas fa-times mt-2"></i>
      </div>
    </div>
    <div class="formgrid grid mt-1">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14 bold-500 mt-2 ml-2">
         No of Boxes
        </h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details[defaultRateType][index].min_unit"
              :showButtons="true"
              mode="decimal"
            />
          </div>
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details[defaultRateType][index].max_unit"
              :showButtons="true"
              mode="decimal"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14 bold-500 unit_rates">Rate ($)</h5>
        <TextField
          v-model="details[defaultRateType][index].rate"
          label="UnitRate"
          id="UnitRate"
          type="number"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex justify-content-between add_rate">
    <div class="flex">
      <span class="new_contact Contact" @click="addRate"
        ><b>+ Add Rate</b></span
      >
    </div>
  </div>
  <!-- <div
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
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />

      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div> -->
</template>

<script>
export default {
  name: "Rates",
  data: () => ({
    defaultRateType: "Bike",
    addRates: ["new_rate"],
    details: {
      Bike: [
        {
          min_unit: "",
          max_unit: "",
          rate: "",
        },
      ],
      Van: [
        {
          min_unit: "",
          max_unit: "",
          rate: "",
        },
      ],
    },
  }),
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "Trips";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    addRate() {
      this.addBikeOrVanRates(this.defaultRateType);
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.deleteBikeorVanRates(this.defaultRateType, index);
      this.addRates.splice(index, 1);
    },
    addBikeOrVanRates(type) {
      this.details[type].push({
        min_unit: "",
        max_unit: "",
        rate: "",
      });
    },
    deleteBikeorVanRates(type, index) {
      this.details[type].splice(index, 1);
    },
    bikeOrVanRatesState(type) {
      //eslint-disable-next-line no-unused-vars
      for (let state in this.details[type]) {
        this.addRates.push("new_rate");
      }
    },
    submitData() {
      this.$store.state.masters.expressExpressRatesFormData["van_rates"] =
        this.details.Van;
      this.$store.state.masters.expressExpressRatesFormData["bike_rates"] =
        this.details.Bike;
      this.$store.state.masters.expressExpressRatesFormData["trips"] =
        this.$store.state.masters.formTableData;
      // CRUD - CREATE OPERATION
      // making an add/POST api to create a new rate card
      this.$store.dispatch("masters/expressRateCardsCRUD", {
        tag: "add",
        data: this.$store.state.masters.expressExpressRatesFormData,
      });
    },
  },
  watch: {
    "$store.state.masters.expressRatesAddRateType": function () {
      this.addRates = [];
      this.defaultRateType = this.$store.state.masters.expressRatesAddRateType;
      this.bikeOrVanRatesState(this.defaultRateType);
    },
  },
};
</script>

<style scoped>
.unit_rates {
  margin-top: 2%;
}
.add_rates {
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.add_rate {
  margin-left: 2%;
}
.duoSelect {
  margin-left: 1.5%;
}
</style>
