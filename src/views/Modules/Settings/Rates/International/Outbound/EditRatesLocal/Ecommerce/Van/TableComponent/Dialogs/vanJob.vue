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
      <div v-if="mode === 'Edit'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Min Charge per Job
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="min_charge_per_job"
          mode="decimal"
          v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
          v-model="min_charge_per_job"
          :classes="{
            'p-invalid': v$.min_charge_per_job.$invalid && !isValid,
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
  props: ["show", "mode"],
  data() {
    return {
      isValid: true,
      showDialog: this.$props.show,
      min_charge_per_job: "",
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
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      min_charge_per_job: { required },
    };
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      editVanCustomerJob: "Outbound/Edit/editVanCustomerJob",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.mode === "Edit") {
        try {
          this.isloading = true;
          await this.editVanCustomerJob({
            id: this.editData.data.id,
            data: {
              min_charge_per_job: this.min_charge_per_job,
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
      }
    },
  },
  created() {
    if (this.mode === "Edit") {
      let data = this.editData.data;

      this.min_charge_per_job = data.min_charge_per_job;
    }
  },
};
</script>

<style>
</style>