<template>
  <div class="flex main">
    <div>
      <p class="quotation">Quotation</p>
      <p class="id">NEC/SQ00370/2021</p>
    </div>
    <div class="flex">
      <div class="mr-2 image"><img src="../../../../assets/box.png" /></div>
      <div>
        <p class="id">24th Apr, 2021</p>
        <p class="sales-person">Sales person</p>
        <p class="id">jasmine</p>
      </div>
    </div>
  </div>

  <div class="flex">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Customer Type</h5>
      <DropDown
        :data="Customer_type"
        placeholder="Please Select"
        v-model="details.customer_type"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Business Method</h5>
      <DropDown
        :data="Customer_type"
        placeholder="Please Select"
        v-model="details.business_method"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.business_method.$invalid && submitted,
        }"
      />
    </div>
  </div>
  <div class="flex">
    <div class="field col">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        :data="Customer_type"
        placeholder="Please Select"
        v-model="details.status"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
        }"
      />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Priority</h5>
      <DropDown
        :data="Customer_type"
        placeholder="Please Select"
        v-model="details.priority"
        class="inputfield w-full dialog-field-text"
        :classes="{
          'p-invalid': v$.details.priority.$invalid && submitted,
        }"
      />
    </div>
  </div>
  <div class="field col-6">
    <h5 class="required dialog-label-text">Expected Date of Shipment</h5>
    <TextField
      type="date"
      v-model="details.date"
      class="inputfield w-full dialog-field-text"
      :classes="{
        'p-invalid': v$.details.date.$invalid && submitted,
      }"
    />
  </div>

  <div class="flex mt-2">
    <RadioButton value="Document" v-model="document_type" />
    <label class="ml-2 document-parcel" for="rich_text_format">Document</label>

    <RadioButton class="ml-3" value="Parcel" v-model="document_type" />
    <label class="ml-2 document-parcel" for="rich_text_format">Parcel</label>
  </div>

  <div
    v-if="$store.state.quotation.internationalAdhocDialogRadio == 'Document'"
  >
    <InternationalAdhocDialogOne
      :saveOne="saveOne"
      v-on:outputValue="outputValue"
    />
  </div>

  <div v-if="$store.state.quotation.internationalAdhocDialogRadio == 'Parcel'">
    <InternationalAdhocDialogTwo />
  </div>

  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text"
    />

    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InternationalAdhocDialogOne from "../Dialog/InternationalAdhocDialogOne.vue";
import InternationalAdhocDialogTwo from "../Dialog/InternationalAdhocDialogTwo.vue";

export default {
  name: "InternationalAdhocDialog",

  components: {
    RadioButton,
    InternationalAdhocDialogOne,
    InternationalAdhocDialogTwo,
  },

  data() {
    return {
      details: {
        customer_type: "",
        business_method: "",
        status: "",
        priority: "",
        city: "",
        date: "",
      },

      saveOne: false,

      document_type: "Document",
      actions: {},

      Customer_type: [
        { name: "International", code: "1" },
        { name: "Adhoc", code: "2" },
      ],

      products: [
        {
          service_provider: "FEDEX",
          Transit_Days: "01",
          Delivery_Charges: "251",
          Fuel_Charges: "251",
          Over_weight_Charges: "251",
          Remote_Area_Charges: "251",
          Others_Charges: "251",
          Emergency_Charges: "251",
          Net_Charges: "251",
        },
        {
          service_provider: "FEDEX",
          Transit_Days: "01",
          Delivery_Charges: "251",
          Fuel_Charges: "251",
          Over_weight_Charges: "251",
          Remote_Area_Charges: "251",
          Others_Charges: "251",
          Emergency_Charges: "251",
          Net_Charges: "251",
        },
      ],

      v$: useVuelidate(),
      submitted: false,
    };
  },

  validations() {
    return {
      details: {
        customer_type: { required },
        business_method: { required },
        status: { required },
        priority: { required },
        city: { required },
        date: { required },
      },
    };
  },

  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.saveOne = true;
        console.log(this.details)
       
      }
    },

    // outputValue(value) {
    //   if (value == true && this.submitted == true) {
    //     this.saveOne = false;
    //     console.log("//////////////////", value);

    //     return;
    //   } else if (value == true && this.submitted == false) {
    //     this.saveOne = false;
    //     console.log("//////////////////", value);
    //     return;
    //   } else if (value == false && this.submitted == true) {
    //     this.submitted = false;
    //     this.saveOne = false;
    //     console.log("//////////////////", value);
    //     return;
    //   } else {
    //     console.log("//////////////////", value);
    //     this.saveOne = true;
    //     return;
    //   }
    // },
    // saveOne(name) {
    //   if (name == true) {
    //     console.log("======================22", name);
    //   } else {
    //     console.log("======================33", name);
    //   }
    // },

    // console.log("//////////////////", this.saveOne);
  },

  watch: {
    document_type: function () {
      this.$store.state.quotation.internationalAdhocDialogRadio =
        this.document_type;
    },
  },
};
</script>

<style scoped>
.main {
  justify-content: space-between;
}
.quotation {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #4e5868;
  margin-bottom: 0;
}
.id {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
  margin-bottom: 0;
}
.image {
  display: flex;
  align-items: flex-end !important;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  /* border: none;                                                                      */
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}
.sales-person {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  margin-bottom: 0;
}
.add_weight {
  width: 140px;
  height: 17px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3057ff;
}
.chargable-weight {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #66c11e;
}
.weight {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4e5868;
}
.weight-dimensions {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #343434;
}
.result {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #4e5868;
}
.tabel-heading {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
}
::v-deep.p-datatable .p-column-header-content {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
  white-space: pre-wrap;
}
.export {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #eb9546;
  width: 66px;
  background-color: #fff8ec !important;
  height: 35px;
  display: flex;
  justify-content: center;
}
.import {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #8f46eb;
  width: 66px;
  background-color: #f4ecff !important;
  height: 35px;
  display: flex;
  justify-content: center;
}
::v-deep.field {
  margin-bottom: 0;
}
.document-parcel {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #212121;
}
</style>
