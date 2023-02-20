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
      <div v-if="editData?.type == 'normal_bike_rates'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Minimum Monthly Units (Dispatches)
          <span class="ml-1 required-field">*</span>
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            v-model="formData.min_units"
            :classes="{
              'p-invalid': v$.formData.min_units.$invalid && !isValid,
            }"
          />
          <NumberField
            class="ml-2"
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            v-model="formData.max_units"
            :classes="{
              'p-invalid': v$.formData.max_units.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Unit Rate ($)
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
          v-model="formData.unit_rate"
          :classes="{
            'p-invalid': v$.formData.unit_rate.$invalid && !isValid,
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
      isValid: true,
      showDialog: this.$props.show,
      formData: {
        min_units: "",
        max_units: "",
        unit_rate: "",
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
        min_units: { required },
        max_units: {
          required,
          maxVal: (value) => {
            if (this.formData.min_units >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        unit_rate: { required },
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
      postRate: "Outbound/Edit/postRate",
      editRate: "Outbound/Edit/editRate",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "normal_bike_rates") {
        try {
          this.isloading = true;
          await this.editRate({
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
          await this.postRate({
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
    if (this.editData?.type == "normal_bike_rates") {
      let data = this.editData.data;

      this.formData.min_units = data.min_units;
      this.formData.max_units = data.max_units;
      this.formData.unit_rate = data.unit_rate;
    }
  },
};
</script>

<style>
</style>