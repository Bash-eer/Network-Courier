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
      <div v-if="editData?.type == 'restricted_charges_n'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="label-text mb-2 flex">Add Countries</div>
      <div :key="formData.rates.country_id">
        <DropDownField
          :data="countries"
          v-model="formData.rates.country_id"
          :filter="true"
          :value="formData.rates.country_id"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData.rates.country_id.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          code="country_id"
        />
      </div>

      <div class="input-wrapper mt-3">
        <div class="label flex align-items-start mb-2">Weight Range (Kg)</div>
        <div class="flex align-items-center weight_range">
          <NumberField
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            label="min_weight"
            v-on:childToParent="getUserInput"
            v-model="formData.rates.min_weight"
            :classes="{
              'p-invalid': v$.formData.rates.min_weight.$invalid && !isValid,
            }"
          />
          <span class="mx-2">-</span>
          <NumberField
            v-on:childToParent="getUserInput"
            label="max_weight"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            v-model="formData.rates.max_weight"
            :classes="{
              'p-invalid': v$.formData.rates.max_weight.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <div class="flex align-items-end">
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Document $</div>
          <NumberField
            v-on:childToParent="getUserInput"
            label="document_rate"
            class="number-field"
            :maxFractionDigits="2"
            mode="decimal"
            v-model="formData.rates.document_rate"
            :classes="{
              'p-invalid': v$.formData.rates.document_rate.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Parcel $</div>
          <NumberField
            v-on:childToParent="getUserInput"
            label="parcel_rate"
            class="number-field"
            :maxFractionDigits="2"
            mode="decimal"
            v-model="formData.rates.parcel_rate"
            :classes="{
              'p-invalid': v$.formData.rates.parcel_rate.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <!-- <div class="input-wrapper col mt-3">
        <div class="label flex align-items-start mb-2">
          Minimum Rate $ 
        </div>
        <NumberField
          v-on:childToParent="getUserInput"
          label="minimum_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
          v-model="formData.rates.minimum_rate"
          :classes="{
            'p-invalid': v$.formData.rates.minimum_rate.$invalid && !isValid,
          }"
        />
      </div> -->
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
      isloading: false,
      showDialog: this.$props.show,
      isValid: true,
      selectedCountries: [],
      formData: {
        rates: {
          country_id: "",
          min_weight: "",
          max_weight: "",
          document_rate: "",
          parcel_rate: "",
        },
      },
      selectedItems: null,
      selectAll: false,
      countries: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      selectedCountries: { required },
      formData: {
        rates: {
          country_id: {},
          min_weight: {},
          max_weight: {
            maxVal: (value) => {
              if (this.formData.rates.min_weight >= value) {
                return false;
              } else {
                return true;
              }
            },
          },
          document_rate: {},
          parcel_rate: {},
        },
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
      editData: "Outbound/Edit/editData",
      imp_edit: "Outbound/Edit/imp_edit",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      postRestrictedcharges: "Outbound/Edit/postRestrictedcharges",
      editRestrictedcharges: "Outbound/Edit/editRestrictedcharges",
    }),
    async save() {
      console.log(this.v$.formData.rates.$invalid, "valid");

      if (this.v$.formData.rates.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type === "restricted_charges_n") {
        try {
          this.isloading = true;
          await this.editRestrictedcharges({
            type: "normal",
            id: this.editData.data.id,
            data: {
              type_id: this.editData.data.type_id,
              ...this.formData.rates,
            },
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
      } else {
        try {
          this.isloading = true;
          await this.postRestrictedcharges({
            type: "normal",
            data: { type_id: this.imp_edit.type_id, ...this.formData.rates },
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

    if (this.editData?.type === "restricted_charges_n") {
      let data = this.editData.data;

      this.formData.rates.country_id = data.country_id;
      this.formData.rates.min_weight = data.min_weight;
      this.formData.rates.max_weight = data.max_weight;
      this.formData.rates.document_rate = data.document;
      this.formData.rates.parcel_rate = data.parcel;
      // temp fix
    }
  },
};
</script>

<style scoped>
:deep .col {
  padding-left: 0 !important;
}
</style>