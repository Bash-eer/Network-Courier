<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '600px',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div v-if="editData?.type == 'overweight_charges'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="flex align-items-end">
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Weight (Kg)</div>
          <NumberField
            @onChange="getUserInput"
            label="weight"
            class="number-field"
            mode="decimal"
            :maxFractionDigits="2"
            v-model="formData.weight"
            :classes="{
              'p-invalid': v$.formData.weight.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Width (cm)</div>
          <NumberField
            @onChange="getUserInput"
            label="width"
            class="number-field"
            :maxFractionDigits="2"
            mode="decimal"
            v-model="formData.width"
            :classes="{
              'p-invalid': v$.formData.width.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex align-items-end">
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Length (cm)</div>
          <NumberField
            @onChange="getUserInput"
            label="length"
            class="number-field"
            mode="decimal"
            :maxFractionDigits="2"
            v-model="formData.length"
            :classes="{
              'p-invalid': v$.formData.length.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Height (cm)</div>
          <NumberField
            @onChange="getUserInput"
            label="height"
            class="number-field"
            :maxFractionDigits="2"
            mode="decimal"
            v-model="formData.height"
            :classes="{
              'p-invalid': v$.formData.height.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex align-items-end">
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Per Kg Document $</div>
          <NumberField
            @onChange="getUserInput"
            label="per_document_rate"
            :maxFractionDigits="2"
            class="number-field"
            mode="decimal"
            v-model="formData.per_document_rate"
            :classes="{
              'p-invalid': v$.formData.per_document_rate.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Per Kg Parcel $</div>
          <NumberField
            @onChange="getUserInput"
            label="per_parcel_rate"
            class="number-field"
            :maxFractionDigits="2"
            mode="decimal"
            v-model="formData.per_parcel_rate"
            :classes="{
              'p-invalid': v$.formData.per_parcel_rate.$invalid && !isValid,
            }"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="save"
        :loading="isloading"
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    Dialog,
  },
  props: ["show"],
  data() {
    return {
      showDialog: this.$props.show,
      isValid: true,
      formData: {
        weight: "",
        width: "",
        length: "",
        height: "",
        per_document_rate: "",
        per_parcel_rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        weight: {},
        width: {},
        length: {},
        height: {},
        per_document_rate: {},
        per_parcel_rate: {},
      },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      if (!value) this.$emit("close");
    },
  },
  computed: {
    ...mapGetters({
      imp_edit: "Outbound/Edit/imp_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      postOverweightCharge: "Outbound/Edit/postOverweightCharge",
      editOverweightCharge: "Outbound/Edit/editOverweightCharge",
    }),
    async save() {
      console.log(this.formData, "--");
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "overweight_charges") {
        try {
          this.isloading = true;
          await this.editOverweightCharge({
            id: this.editData.data.id,
            data: {
              type_id: this.editData.data.type_id,
              ...this.formData,
            },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Details updated successfully",
            life: 3000,
          });
          this.isloading = false;
        } catch (err) {
          this.isloading = false;
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
      } else {
        try {
          this.isloading = true;
          await this.postOverweightCharge({
            data: { type_id: this.imp_edit.type_id, ...this.formData },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "New data added successfully",
            life: 3000,
          });
          this.isloading = false;
        } catch (err) {
          this.isloading = false;
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
      }
    },
    async getCountries() {
      this.countries = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countries.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  async created() {
    await this.getCountries();

    if (this.editData?.type == "overweight_charges") {
      let data = this.editData.data;
      console.log(data, "data");
      this.formData.weight = data.weight;
      this.formData.width = data.width;
      this.formData.length = data.length;
      this.formData.height = data.height;
      this.formData.parcel_rate = data.parcel;
      this.formData.per_document_rate = data.per_document_rate;
      this.formData.per_parcel_rate = data.per_parcel_rate;
    }
  },
};
</script>

<style>
</style>