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
      <div v-if="editData?.type == 'add_surcharges'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Surcharge Name <span class="required-field ml-1">*</span>
        </div>
        <TextField
          label="surcharge_name"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.surcharge_name"
          :classes="{
            'p-invalid': v$.formData.surcharge_name.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Rate (S$) <span class="required-field ml-1">*</span>
        </div>
        <NumberField
          label="rates"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.rates"
          :classes="{
            'p-invalid': v$.formData.rates.$invalid && !isValid,
          }"
        />
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
      isloading: false,
      isValid: true,
      showDialog: this.$props.show,
      formData: {
        surcharge_name: "",
        rates: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        surcharge_name: { required },
        rates: { required },
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
      local_edit: "Outbound/Edit/local_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      postAddSurcharge: "Outbound/Edit/postAddSurcharge",
      editAddSurcharge: "Outbound/Edit/editAddSurcharge",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "add_surcharges") {
        try {
          this.isloading = true;
          await this.editAddSurcharge({
            id: this.editData.data.id,
            data: {
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
          await this.postAddSurcharge({
            charges_id: this.local_edit.type_id,
            ...this.formData,
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
  },
  created() {
    if (this.editData?.type == "add_surcharges") {
      let data = this.editData.data;
      this.formData.surcharge_name = data.surcharge_name;
      this.formData.rates = data.rates;
    }
  },
};
</script>

<style>
</style>
