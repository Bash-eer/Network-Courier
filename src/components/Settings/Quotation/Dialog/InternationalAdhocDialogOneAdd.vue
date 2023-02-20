<template>
  <div class="flex align-items-end">
    <div class="field col-4">
      <h5 class="required dialog-label-text">Weight (kg)</h5>
      <TextField
        type="number"
        class="inputfield w-full dialog-field-text"
        v-model="details.weight"
        :classes="{
          'p-invalid': v$.details.weight.$invalid && submitted,
        }"
      />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Length (cm)</h5>
      <TextField
        type="number"
        class="inputfield w-full dialog-field-text"
        v-model="details.apple"
        :classes="{
          'p-invalid': v$.details.apple.$invalid && submitted,
        }"
      />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Width (cm)</h5>
      <TextField
        type="number"
        class="inputfield w-full dialog-field-text"
        v-model="details.width"
        :classes="{
          'p-invalid': v$.details.width.$invalid && submitted,
        }"
      />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Height (cm)</h5>
      <TextField
        type="number"
        class="inputfield w-full dialog-field-text"
        v-model="details.height"
        :classes="{
          'p-invalid': v$.details.height.$invalid && submitted,
        }"
      />
    </div>
    <!-- class="pi pi-times col-1 close" -->
    <div
      :class="totalLength.length > 1 ? 'pi pi-times col-1 close' : ''"
      @click="$emit('removeRow', data.id)"
    ></div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data() {
    return {
      details: {
        weight: "",
        apple: "",
        width: "",
        height: "",
      },
      v$: useVuelidate(),
      submitted: false,
    };
  },
  props: ["counting", "data", "totalLength", "Save"],
  validations() {
    return {
      details: {
        weight: { required },
        apple: { required },
        width: { required },
        height: { required },
      },
    };
  },

  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },
  },

  watch: {
    Save() {
      this.submitted = true;
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
.close {
  padding-bottom: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
