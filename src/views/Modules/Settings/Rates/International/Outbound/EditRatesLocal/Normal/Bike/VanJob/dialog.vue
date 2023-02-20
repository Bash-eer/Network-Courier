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
      <div v-if="editData?.type == 'normal_bike_jobs'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="flex align-items-end">
        <div class="input-wrapper col-6">
          <div class="label flex align-items-start mb-2">
            Van Job Min. Cost $
          </div>
          <NumberField
            label="min_weight"
            mode="decimal"
            :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="vanJobData.van_job_min_cost"
            :classes="{
              'p-invalid': v$.vanJobData.van_job_min_cost.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col-6">
          <div class="label flex align-items-start mb-2">
            Maximum Weight (Kg)
          </div>
          <NumberField
            label="min_weight"
            mode="decimal"
            :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="vanJobData.maximum_weight"
            :classes="{
              'p-invalid': v$.vanJobData.maximum_weight.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex align-items-end">
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Add. Cost $
          </div>
          <NumberField
            label="min_weight"
            mode="decimal"
            :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="vanJobData.van_job_add_cost"
            :classes="{
              'p-invalid': v$.vanJobData.van_job_add_cost.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Add. Weight (Kg)
          </div>
          <NumberField
            label="min_weight"
            :maxFractionDigits="2"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="vanJobData.van_job_add_weight"
            :classes="{
              'p-invalid':
                v$.vanJobData.van_job_add_weight.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex">
        <div class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Van Job Urgent. Surcharge $
          </div>
          <NumberField
            label="min_weight"
            :maxFractionDigits="2"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="vanJobData.van_job_urgent_surcharges"
            :classes="{
              'p-invalid':
                v$.vanJobData.van_job_urgent_surcharges.$invalid && !isValid,
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
      rowData: [],
      vanJobData: {
        van_job_min_cost: "",
        maximum_weight: "",
        van_job_add_cost: "",
        van_job_add_weight: "",
        van_job_urgent_surcharges: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      vanJobData: {
        van_job_min_cost: {},
        maximum_weight: {},
        van_job_add_cost: {},
        van_job_add_weight: {},
        van_job_urgent_surcharges: {},
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
      editBikeJob: "Outbound/Edit/editBikeJob",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "normal_bike_jobs") {
        try {
          this.isloading = true;
          await this.editBikeJob({
            id: this.editData.data.id,
            data: {
              ...this.vanJobData,
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
    if (this.editData?.type == "normal_bike_jobs") {
      let data = this.editData.data;
      this.vanJobData.van_job_min_cost = data.van_job_min_cost;
      this.vanJobData.maximum_weight = data.maximum_weight;
      this.vanJobData.van_job_add_cost = data.van_job_add_cost;
      this.vanJobData.van_job_add_weight = data.van_job_add_weight;
      this.vanJobData.van_job_urgent_surcharges =
        data.van_job_urgent_surcharges;
    }
  },
};
</script>

<style>
</style>