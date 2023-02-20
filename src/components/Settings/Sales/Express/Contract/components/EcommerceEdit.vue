<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Delivery Type</h5>
      <TextField v-model="details.ecommercebike.Maximum_Weight" />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Collect Time</h5>
      <NumberField
        mode="decimal"
        :showButtons="true"
        v-model="details.ecommercebike.Collect_Time"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Cut Off Time</h5>
      <NumberField
        mode="decimal"
        :showButtons="true"
        v-model="details.ecommercebike.Cut_Off_Time"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Cut Off Days</h5>
      <TextField
        mode="decimal"
        :showButtons="true"
        v-model="details.ecommercebike.Cut_Off_Days"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">
        Minimum Monthly Units (Dispatches)
      </h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.ecommercebike.Minimum_Monthly_Units"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.ecommercebike.Minimum_Monthly_Units"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Units Rate($)</h5>
      <TextField type="number" v-model="details.ecommercebike.Units_Rate" />
    </div>
  </div>
  <div class="flex justify-content-between add_rate ml-3">
    <div class="flex">
      <span class="new-field" @click="addVanRate('rate', dIndex)"
        ><b>+ Add Rate</b></span
      >
    </div>
  </div>
  <hr class="divider w-100" />
  <!-- DuoSelection -->
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Charge by weight', 'Charge by quantity']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <div v-if="defaultTransportType == 'Charge by weight'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Maximum Weight (Kg)</h5>
        <TextField
          type="number"
          v-model="details.chargesByWeight.Maximum_Weight"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van Job Add. Weight (Kg)</h5>
        <TextField
          type="number"
          v-model="details.chargesByWeight.Van_Job_Add_Weight"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van Job Add. Cost $</h5>
        <TextField
          type="number"
          v-model="details.chargesByWeight.Van_Job_Add_Cost"
        />
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <span class="section-text">Van Customer Bike job</span>
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-5">
        <h5 class="dialog-label-text required">Min Charge per Job ($)</h5>
        <TextField
          v-model="details.chargesByWeight.Min_Charge_per_Job"
          type="number"
        />
      </div>
    </div>
  </div>

  <div v-if="defaultTransportType == 'Charge by quantity'">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Maximum Quantity</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.chargesByQuantity.Maximum_Quantity"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van Job Add. Quantity</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.chargesByQuantity.Van_Job_Add_Quantity"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Van Job Add. Cost $</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.chargesByQuantity.Van_Job_Add_Cost"
        />
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <span class="section-text">Box Count Charges</span>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Boxes under</h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.chargesByQuantity.Boxes_under"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Rate ($)</h5>
          <TextField v-model="details.chargesByQuantity.Rate" />
        </div>
      </div>
    </div>
    <div class="flex justify-content-between add_rate ml-3">
      <div class="flex">
        <span class="new-field"><b>+ Add Rate</b></span>
      </div>
    </div>
    <hr class="divider w-100" />
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <span class="section-text">Van Customer Bike job</span>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Timeslot Delivery ($)</h5>
        <TextField
          v-model="details.chargesByQuantity.Timeslot_Delivery"
          type="number"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Timeslot Delivery Fixed Hours</h5>
        <TextField
          v-model="details.chargesByQuantity.Timeslot_Delivery_Fixed_Hours"
        />
      </div>
    </div>
    <div class="flex justify-content-between add_rate ml-3 mt-2">
      <div class="flex">
        <span class="new-field"><b>+ Add Delivery Type</b></span>
      </div>
    </div>
    <hr class="divider w-100" />
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="expressContract" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import DuoSelection from "../DuoSelect.vue";
export default {
  components: { DuoSelection },
  data() {
    return {
      defaultTransportType: "Charge by weight",
      details: {
        ecommercebike: {
          Maximum_Weight: "",
          Collect_Time: "",
          Cut_Off_Time: "",
          Cut_Off_Days: "",
          Minimum_Monthly_Units: "",
          Units_Rate: "",
        },
        chargesByWeight: {
          Maximum_Weight: "",
          Van_Job_Add_Weight: "",
          Van_Job_Add_Cost: "",
          Min_Charge_per_Job: "",
        },
        chargesByQuantity: {
          Maximum_Quantity: "",
          Van_Job_Add_Quantity: "",
          Van_Job_Add_Cost: "",
          Boxes_under: "",
          Rate: "",
          Timeslot_Delivery: "",
          Timeslot_Delivery_Fixed_Hours: "",
        },
      },
    };
  },

  methods: {
    submitData() {
      //   if (this.v$.$invalid) {
      //     this.submitted = true;
      //   }
      {
        console.log("Hi");
        console.log(this.details.ecommercebike);
      }
    },
  },
  watch: {
    "$store.state.expressContract.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.expressContract.addRegionDeliveryTransportType;
    },
  },
};
</script>

<style></style>
