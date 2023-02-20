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
      <div v-if="editData?.type == 'normal_van_multi_j'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div
          class="
            color-7a7a7a
            font-size-14
            bold-500
            required
            flex
            align-items-start
            mb-2
          "
        >
          No of Jobs
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_job"
            :showButtons="true"
            mode="decimal"
              :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.min_job"
            :classes="{
              'p-invalid': v$.formData.min_job.$invalid && !isValid,
            }"
          />
          <NumberField
            class="ml-2"
            label="max_job"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            v-model="formData.max_job"
            :classes="{
              'p-invalid': v$.formData.max_job.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div
          class="
            color-7a7a7a
            font-size-14
            bold-500
            required
            flex
            align-items-start
            mb-2
          "
        >
          Rate ($)
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <NumberField
          label="rate"
          mode="decimal"
          v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
          v-model="formData.rate"
          :classes="{
            'p-invalid': v$.formData.rate.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn color-357dea"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
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
      formData: {
        min_job: "",
        max_job: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        min_job: { required },
        max_job: {
          required,
          maxVal: (value) => {
            if (this.formData.min_job >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        rate: { required },
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
      editJobcountMultiTier: "Outbound/Edit/editJobcountMultiTier",
      addJobcountMultiTier: "Outbound/Edit/addJobcountMultiTier",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
      if (this.editData?.type == "normal_van_multi_j") {
        try {
          this.isloading = true;
          await this.editJobcountMultiTier({
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
          await this.addJobcountMultiTier({
            service_id: this.local_edit.type_id,
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
    if (this.editData?.type == "normal_van_multi_j") {
      let data = this.editData.data;

      this.formData.min_job = data.min_job;
      this.formData.max_job = data.max_job;
      this.formData.rate = data.rate;
    }
  },
};
</script>

<style>
</style>