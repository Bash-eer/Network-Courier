<template>
  <div>
    <div class="flex align-items-end">
      <div class="field col">
        <h5 class="required dialog-label-text">Origin Country</h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.origin_country"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid': v$.details.origin_country.$invalid && Submitted,
          }"
        />
      </div>
      <div class="field col">
        <h5 class="required dialog-label-text">Origin City</h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.origin_city"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid': v$.details.origin_city.$invalid && Submitted,
          }"
        />
      </div>

      <div class="field col">
        <h5 class="required dialog-label-text">Origin Country Postal Code</h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.origin_country_postal_code"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid':
              v$.details.origin_country_postal_code.$invalid && Submitted,
          }"
        />
      </div>
    </div>
    <div class="flex align-items-end">
      <div class="field col">
        <h5 class="required dialog-label-text">Destination Country</h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.destination_country"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid': v$.details.destination_country.$invalid && Submitted,
          }"
        />
      </div>
      <div class="field col">
        <h5 class="required dialog-label-text">Destination City</h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.destination_city"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid': v$.details.destination_city.$invalid && Submitted,
          }"
        />
      </div>
      <div class="field col">
        <h5 class="required dialog-label-text">
          Destination Country Postal Code
        </h5>
        <DropDown
          :data="Origin_country"
          placeholder="Please Select"
          v-model="details.destination_country_postal_code"
          class="inputfield w-full dialog-field-text"
          :classes="{
            'p-invalid':
              v$.details.destination_country_postal_code.$invalid && Submitted,
          }"
        />
      </div>
    </div>
  </div>

  <div class="weight-dimensions">Weight and Dimensions</div>
  <div v-for="item of addById" :key="item">
    <InternationalAdhocDialogOneAdd
      @removeRow="deleteWeightRow"
      :totalLength="addById"
      :data="item"
      :Save="save"
    />
  </div>
  <div class="flex align-items-center">
    <p class="col-4 weight">Total Weight: 50 kg</p>
    <p class="col-3 weight">Vol. Weight: 10 kg</p>
    <p class="col-5 chargable-weight">Chargeable Weight: 50 kg</p>
  </div>
  <div class="add_weight pointer" v-on:click="addRow">+ Add More Weight</div>

  <div class="field col">
    <h5 class="required dialog-label-text">Select Service Provider</h5>
    <TextField
      type="text"
      v-model="details.select_service_provider"
      class="inputfield w-full dialog-field-text"
      :classes="{
        'p-invalid': v$.details.select_service_provider.$invalid && Submitted,
      }"
    />
  </div>

  <div class="card">
    <DataTable
      :value="products"
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex">
          <div class="flex md:mr-2 mr-6">
            <p class="col result">Results</p>
            <p class="col import">Import</p>
          </div>
          <p class="col weight">Total Weight: 50 kg</p>
          <p class="col weight">Vol. Weight: 10 kg</p>
          <p class="col-3 chargable-weight">Chargeable Weight: 50 kg</p>
        </div>
      </template>

      <template class="flex">
        <Column
          class="chargable-weight"
          field="service_provider"
          header="Service Provider"
        ></Column>
        <Column field="Transit_Days" header="Transit Days"></Column>
        <Column field="Delivery_Charges" header="Delivery Charges"></Column>
        <Column field="Fuel_Charges" header="Fuel Charges"></Column>

        <Column
          field="Over_weight_Charges"
          header="Over weight Charges"
        ></Column>
        <Column
          field="Remote_Area_Charges"
          header="Remote Area Charges"
        ></Column>
        <Column field="Others_Charges" header="Others Charges"></Column>
        <Column field="Emergency_Charges" header="Emergency Charges"></Column>
        <Column field="Net_Charges" header="Net Charges"></Column>
      </template>
    </DataTable>
  </div>

  <div class="field col">
    <h5 class="required dialog-label-text">Remarks</h5>
    <TextAreaField
      type="text"
      v-model="details.remark"
      class="inputfield w-full dialog-field-text"
      :classes="{
        'p-invalid': v$.details.remark.$invalid && Submitted,
      }"
    />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InternationalAdhocDialogOneAdd from "../Dialog/InternationalAdhocDialogOneAdd.vue";
export default {
  components: {
    DataTable,
    Column,
    InternationalAdhocDialogOneAdd,
  },
  props: ["saveOne"],
  data() {
    return {
      refreshKey: 10,
      totalDocument: [],
      Submitted: false,
      save: false,
      addById: [{ id: 1, valid: false }],

      details: {
        origin_country: "",
        origin_city: "",
        origin_country_postal_code: "",
        destination_country: "",
        destination_city: "",
        destination_country_postal_code: "",
        addWeightRow: [],
        select_service_provider: "",
        remark: "",
      },

      Origin_country: [
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
    };
  },

  validations() {
    return {
      details: {
        origin_country: { required },
        origin_city: { required },
        origin_country_postal_code: { required },
        destination_country: { required },
        destination_city: { required },
        destination_country_postal_code: { required },
        select_service_provider: { required },
        remark: { required },
      },
    };
  },

  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },

    addRow() {
      let count = this.addById.length + 1;

      // let exist = this.addById.find((list) => {
      //   if (list.id === count) {
      //     return list;
      //   }
      // });

      // if (exist) {
      //   this.addById.push({ id: this.addById.length + exist.id, valid: false });
      // } else {
      //   this.addById.push({ id: this.addById.length + 1, valid: false });
      // }
      this.addById.push({ id: count, valid: false });
    },

    deleteWeightRow(index) {
      this.addById = this.addById.filter((list) => list.id != index);
    },
  },

  watch: {
    // v$: {
    //   handler() {
    //     this.submitData();
    //   },
    //   deep: true,
    // },
    saveOne() {
      this.Submitted = true;
      this.save = true;
      this.$emit("outputValue", this.details);
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
