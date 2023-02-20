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
          <NumberField :showButtons="true" mode="decimal" />
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
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <span class="section-text">Bike Customer Van job</span>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-5">
      <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
      <TextField
        v-model="details.BikeCustomerVanJob.Van_Job_Min_Cost"
        type="number"
      />
    </div>
    <div class="field col-12 md:col-5">
      <h5 class="dialog-label-text">Kgs</h5>
      <TextField v-model="details.BikeCustomerVanJob.Kgs" type="number" />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-5">
      <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
      <TextField
        v-model="details.BikeCustomerVanJob.Van_Job_Add_Cost"
        type="number"
      />
    </div>
    <div class="field col-12 md:col-5">
      <h5 class="dialog-label-text">Kgs $</h5>
      <TextField v-model="details.BikeCustomerVanJob.KgsOne" type="number" />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-5">
      <h5 class="dialog-label-text">Van Job Urgent. Surcharge $</h5>
      <TextField
        v-model="details.BikeCustomerVanJob.Van_Job_Urgent_Surcharge"
        type="number"
      />
    </div>
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
export default {
  name: "ECommerceEditTwo",
  data() {
    return {
      details: {
        ecommercebike: {
          Maximum_Weight: "",
          Collect_Time: "",
          Cut_Off_Time: "",
          Cut_Off_Days: "",
          Minimum_Monthly_Units: "",
          Units_Rate: "",
        },
        BikeCustomerVanJob: {
          Van_Job_Min_Cost: "",
          Kgs: "",
          KgsOne: "",
          Van_Job_Add_Cost: "",
          Van_Job_Urgent_Surcharge: "",
        },
      },
    };
  },
};
</script>

<style></style>
