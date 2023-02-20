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
      <div v-if="editData?.type === 'restricted_charges_bsm'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="label-text mb-2 flex">Add Countries</div>
      <div :key="formData.rates.country_id">
        <DropDownField
          :data="countries"
          v-model="formData.rates.country_id"
          :value="formData.rates.country_id"
          :filter="true"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData.rates.country_id.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          code="country_id"
        />
      </div>

      <div class="flex align-items-end">
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Percentage</div>
          <NumberField
            v-on:childToParent="getUserInput"
            label="percentage"
            class="number-field"
            mode="decimal"
            :maxFractionDigits="2"
            v-model="formData.rates.percentage"
            :classes="{
              'p-invalid': v$.formData.rates.percentage.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col mt-3">
          <div class="label flex align-items-start mb-2">Minimum $</div>
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
import { mapActions, mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
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
      selectedCountries: [],
      formData: {
        rates: {
          country_id: "",
          percentage: "",
          minimum_rate: "",
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
      formData: {
        rates: {
          country_id: {},
          percentage: {},
          minimum_rate: {},
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
      console.log(this.v$.$invalid);
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type === "restricted_charges_bsm") {
        try {
          this.isloading = true;
          await this.editRestrictedcharges({
            type: "base",
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
            type: "base",
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

    if (this.editData?.type === "restricted_charges_bsm") {
      let data = this.editData.data;

      this.formData.rates.country_id = data.country_id;
      this.formData.rates.percentage = data.percentage;
      this.formData.rates.minimum_rate = data.minimum_rate;
    }
  },
};
</script>

<style scoped>
:deep .col {
  padding-left: 0 !important;
}
</style>