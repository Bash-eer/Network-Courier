<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-6 md:col-4">
        <h5 class="dialog-label-text">Maximum Quantity</h5>
        <TextField
          label="maximum_quantity"
          v-model="details.maximum_quantity"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-6 md:col-4">
        <h5 class="dialog-label-text">Van Job Min Cost ($)</h5>
        <TextField
          label="van_job_min_cost"
          v-model="details.van_job_min_cost"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-6 md:col-4">
        <h5 class="dialog-label-text">Van Job Add. Quantity</h5>
        <TextField
          label="van_job_add_quantity"
          v-model="details.van_job_add_quantity"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-6 md:col-4">
        <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
        <TextField
          label="van_job_add_cost"
          type="number"
          v-model="details.van_job_add_cost"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <p>Additional Charges</p>
    <div v-for="(rate, index) of addRates" :key="rate">
      <div v-if="index > 0" class="flex justify-content-between ml-2">
        <div class="flex"></div>
        <div class="flex delete" @click="deleteRate(index)">
          <i class="fas fa-times mt-2"></i>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-4 md:col-3">
          <h5 class="required dialog-label-text">Boxes under</h5>
          <!---- for validation
         @blur="v$.details.additional[index].boxes_under.$model;" 
          'p-invalid': v$.details.additional.boxes_under.$invalid && submitted,
          -->
          <TextField
            label="boxes_under"
            v-model="details.additional[index].boxes_under"
            v-on:childToParent="getUserInput"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-4 md:col-3">
          <h5 class="required dialog-label-text">Rate ($)</h5>
          <TextField
            label="rate"
            v-model="details.additional[index].rate"
            v-on:childToParent="getUserInput"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="flex justify-content-between add_rate">
        <div class="flex">
          <span class="new_contact Contact" @click="addRate"
            ><b>+ Add Rate</b></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";
export default {
  name: "Company",
  data: () => ({
    //sample value given to array for index 0
    addRates: ["new_rate"],

    tradeData: [
      { name: "Bank", code: "B" },
      { name: "Private", code: "P" },
    ],
    v$: useVuelidate(),
    details: {
      maximum_quantity: "",
      van_job_min_cost: "",
      van_job_add_quantity: "",
      van_job_add_cost: "",
      additional: [
        {
          boxes_under: "",
          rate: "",
        },
      ],
    },
    email: "",
    submitted: false,
  }),
  // validations() {
  //   return {
  //     details: {
  //       company_name: { required },
  //       contact_name: { required },
  //       contact_no: { required },
  //       email: {
  //         required,
  //         email,
  //       },
  //     },
  //   };
  // },
  methods: {
    addRate() {
      this.details.additional.push({
        boxes_under: "",
        rate: "",
      });
      //push text into array , so iindex will be increasing
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      //splice  item from array
      this.details.additional.splice(index, 1);
      this.addRates.splice(index, 1);
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (var t in this.tradeData) {
          if (this.details.Trade == this.tradeData[t].code) {
            this.details.Trade = this.tradeData[t].name;
          }
        }
        this.details.status = "company";
        for (var d in this.details) {
          this.$store.state.sales.companyCreationFormData[d] = this.details[d];
        }
        this.$store.state.sales.stepperNavigation = "Address";
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["sales"].companyCreationStateData).length !=
      0
    ) {
      for (var state in this.details) {
        this.details[state] =
          this.$store.state["sales"].companyCreationStateData[state];
      }
    }
  },
};
</script>

<style scoped>
.add_rates {
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.p-multiselect-label {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: left;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
