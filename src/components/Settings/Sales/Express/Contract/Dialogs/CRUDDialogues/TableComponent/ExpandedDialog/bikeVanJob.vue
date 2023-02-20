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
      <div class="flex">
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Min. Cost $
            <span class="ml-1 required-field">*</span>
          </div>
          <NumberField
            label="van_job_min_cost"
            mode="decimal"
             :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.van_job_min_cost"
            :classes="{
              'p-invalid': v$.formData.van_job_min_cost.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Max Weight
            <span class="ml-1 required-field">*</span>
          </div>
          <NumberField
            label="maximum_weight"
            mode="decimal"
            :max='0'
             :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.maximum_weight"
            :classes="{
              'p-invalid': v$.formData.maximum_weight.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex">
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Surcharges
            <span class="ml-1 required-field">*</span>
          </div>
          <NumberField
            label="van_job_urgent_surcharges"
            mode="decimal"
            :max='0'
             :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.van_job_urgent_surcharges"
            :classes="{
              'p-invalid':
                v$.formData.van_job_urgent_surcharges.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Add Cost
            <span class="ml-1 required-field">*</span>
          </div>
          <NumberField
            label="van_job_add_cost"
            mode="decimal"
            :max='0'
            :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.van_job_add_cost"
            :classes="{
              'p-invalid': v$.formData.van_job_add_cost.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col-6">
        <div class="label flex align-items-start mb-2">
          Van Job Add Weight
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="van_job_add_weight"
          mode="decimal"
          :max='0'
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_weight"
          :classes="{
            'p-invalid': v$.formData.van_job_add_weight.$invalid && !isValid,
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
      formData: {
        van_job_min_cost: "",
        maximum_weight: "",
        van_job_add_cost: "",
        van_job_urgent_surcharges: "",
        van_job_add_weight: "",
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
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        van_job_min_cost: { required },
        maximum_weight: { required },
        van_job_add_cost: { required },
        van_job_urgent_surcharges: { required },
        van_job_add_weight: { required },
      },
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
      editEBikeVanJob: "Outbound/Edit/editEBikeVanJob",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.mode === "Edit") {
        try {
          this.isloading = true;
          await this.editEBikeVanJob({
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
      }
    },
  },
  created() {
    if (this.mode === "Edit") {
      let data = this.editData.data;

      this.formData.van_job_min_cost = data.van_job_min_cost;
      this.formData.maximum_weight = data.maximum_weight;
      this.formData.van_job_add_cost = data.van_job_add_cost;
      this.formData.van_job_urgent_surcharges = data.van_job_urgent_surcharges;
      this.formData.van_job_add_weight = data.van_job_add_weight;
    }
  },
};
</script>

<style>
</style>