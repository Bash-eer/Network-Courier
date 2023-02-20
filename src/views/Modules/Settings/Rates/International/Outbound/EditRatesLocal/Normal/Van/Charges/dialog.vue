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
      <div v-if="editData?.type == 'normal_van_box'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Van Job Urgent. Surcharge $
        </div>
        <NumberField
          v-on:childToParent="getJobSurcharges"
          v-model="van_job_urgent_surcharges"
          label="van_job_urgent_surcharges"
          :maxFractionDigits="2"
          mode="decimal"
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
      isValid: true,
      showDialog: this.$props.show,
      van_job_urgent_surcharges: "",
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      van_job_urgent_surcharges: {},
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
      editNormalVanJob: "Outbound/Edit/editNormalVanJob",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "normal_van_box") {
        try {
          this.isloading = true;
          await this.editNormalVanJob({
            id: this.editData.data.id,
            data: {
              min_charge_per_job: this.van_job_urgent_surcharges,
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
    if (this.editData?.type == "normal_van_box") {
      let data = this.editData.data;

      this.van_job_urgent_surcharges = data.min_charge_per_job;
    }
  },
};
</script>

<style>
</style>